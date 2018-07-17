const { getWeb3, getContractInstance } = require("./helpers");
const web3 = getWeb3();
const getInstance = getContractInstance(web3);
const productsContract = getInstance("Products");

contract("Testing Products contract", function(accounts) {
  const product0 = {
    price: 1,
    owner: accounts[0],
    available: true
  };

  const product1 = {
    price: 3,
    owner: accounts[0],
    available: true
  };

  const product2 = {
    price: 2,
    owner: accounts[1],
    available: true
  };

  const product3 = {
    price: 10,
    owner: accounts[0],
    available: true
  };

  it("should retrieve the product information", async () => {
    await productsContract.methods
      .createProduct(product0.price, product0.owner, product0.available)
      .send({ from: accounts[0], gas: 3000000 });

    await productsContract.methods
      .createProduct(product1.price, product1.owner, product1.available)
      .send({ from: accounts[0], gas: 3000000 });

    await productsContract.methods
      .createProduct(product2.price, product2.owner, product2.available)
      .send({ from: accounts[0], gas: 3000000 });

    await productsContract.methods
      .createProduct(product3.price, product3.owner, product3.available)
      .send({ from: accounts[0], gas: 3000000 });

    const product2Price = await productsContract.methods
      .getPriceById(2)
      .call({ from: accounts[0], gas: 3000000 });

    const prod1 = await productsContract.methods
      .getProductById(1)
      .call({ from: accounts[0], gas: 3000000 });
    const product1Owner = prod1[1];

    expect(parseInt(product2Price)).to.equal(2);
    expect(product1Owner.toUpperCase()).to.equal(
      accounts[0].toString().toUpperCase()
    );
  });

  it("should retrieve all productIds owned by a specified address", async () => {
    const productIdsAcct0 = await productsContract.methods
      .getProductIdsByOwner(accounts[0])
      .call({ from: accounts[0] });
    const productIdsNumAcct0 = productIdsAcct0.map(x => parseInt(x));

    expect(productIdsNumAcct0.toString()).to.equal("0,1,3");
  });

  it("should retrieve all productIds and iterate on them to get information of all created products", async () => {
    const allProductIds = await productsContract.methods
      .getAllProductIds()
      .call({ from: accounts[0] });

    const allProductsPromise = allProductIds.map(x => {
      return productsContract.methods
        .getProductById(x)
        .call({ from: accounts[0], gas: 3000000 });
    });

    const allProducts = await Promise.all(allProductsPromise);

    const retrievedProduct0 = {
      price: parseInt(allProducts[0].price),
      owner: allProducts[0].owner.toLowerCase(),
      available: allProducts[0].available
    };

    const retrievedProduct3 = {
      price: parseInt(allProducts[3].price),
      owner: allProducts[3].owner.toLowerCase(),
      available: allProducts[3].available
    };

    expect(allProductIds.toString()).to.equal("0,1,2,3");
    expect(JSON.stringify(retrievedProduct0)).to.equal(
      JSON.stringify(product0)
    );
    expect(JSON.stringify(retrievedProduct3)).to.equal(
      JSON.stringify(product3)
    );
  });
});
