const Products = artifacts.require("Products");

contract("Testing Products contract", function(accounts) {
  let productsContract;
  const product1 = {
    price: 1,
    owner: accounts[0],
    available: true
  };
  const product2 = {
    price: 3,
    owner: accounts[0],
    available: true
  };

  const product3 = {
    price: 2,
    owner: accounts[1],
    available: true
  };

  const product4 = {
    price: 10,
    owner: accounts[0],
    available: true
  };

  it("should retrieve the product information", async () => {
    productsContract = await Products.deployed();
    await productsContract.createProduct(
      product1.price,
      product1.owner,
      product1.available,
      { from: accounts[0] }
    );

    await productsContract.createProduct(
      product2.price,
      product2.owner,
      product2.available,
      { from: accounts[0] }
    );

    await productsContract.createProduct(
      product3.price,
      product3.owner,
      product3.available,
      { from: accounts[0] }
    );

    await productsContract.createProduct(
      product4.price,
      product4.owner,
      product4.available,
      { from: accounts[0] }
    );

    const product3Price = await productsContract.getPriceById.call(3, {
      from: accounts[0]
    });

    const product2Object = await productsContract.getProductById.call(2, {
      from: accounts[0]
    });
    const product2Owner = product2Object[1];

    expect(product3Price.toNumber()).to.equal(2);
    expect(product2Owner).to.equal(accounts[0]);
  });

  it("should retrieve all productIds and productIds owned by a specified address", async () => {
    const productIdsAcct0 = await productsContract.getProductIdsByOwner.call(
      accounts[0],
      { from: accounts[0] }
    );
    const productIdsNumAcct0 = productIdsAcct0.map(x => x.toNumber());

    const allProductIds = await productsContract.getAllProductIds.call({
      from: accounts[0]
    });
    const allProductIdsNum = allProductIds.map(x => x.toNumber());

    expect(productIdsNumAcct0.toString()).to.equal("1,2,4");
    expect(allProductIdsNum.toString()).to.equal("1,2,3,4");
  });

  it("should retrieve product information of all created products", async () => {
    const productRange = await productsContract.getAllProducts.call({
      from: accounts[0]
    });

    // this takes the destructured output from solidity and re-creates the Product struct
    const organizedProducts = productRange.reduce((acc, curr) => {
      return curr.reduce((acc2, curr2, j) => {
        if (!acc2[j]) acc2.push([]);
        acc2[j].push(curr2);
        return acc2;
      }, acc);
    }, []);

    // assign products to an object with 0-indexed keys
    const productObjects = organizedProducts.map(x => {
      return x.reduce((acc, curr, i) => {
        acc[i] = curr;
        return acc;
      }, {});
    });

    // first dimension represents the product
    // second dimension represents an attribute:
    // 0: productId
    // 1: ownerAddress
    // 2: price
    // 3: available (bool)
    // 4: numberSold
    const retrievedFristProduct = {
      price: productObjects[0][2].toNumber(),
      owner: productObjects[0][1],
      available: productObjects[0][3]
    };

    const retrievedFourthProduct = {
      price: productObjects[3][2].toNumber(),
      owner: productObjects[3][1],
      available: productObjects[3][3]
    };

    expect(JSON.stringify(retrievedFristProduct)).to.equal(
      JSON.stringify(product1)
    );
    expect(JSON.stringify(retrievedFourthProduct)).to.equal(
      JSON.stringify(product4)
    );
  });
});
