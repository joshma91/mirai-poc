const Products = artifacts.require("Products");

contract('Testing Products contract', function(accounts) {
  let products

  it('should retrieve the product information', async () => {

    products = await Products.new()
    const firstProduct = {
      price: 1,
      owner: accounts[0],
      available: true
    }

    const secondProduct = {
      price: 3,
      owner: accounts[0],
      available: true
    }

    const thirdProduct = {
      price: 2,
      owner: accounts[1],
      available: true
    }

    await products.createProduct(
      firstProduct.price, 
      firstProduct.owner,
      firstProduct.available,
      { from: accounts[0] })
  
    await products.createProduct(
      secondProduct.price, 
      secondProduct.owner,
      secondProduct.available,
      { from: accounts[0] })

    await products.createProduct(
      thirdProduct.price, 
      thirdProduct.owner,
      thirdProduct.available,
      { from: accounts[0] })

    const productIdsAcct0 = await products.getProductIdsByOwner.call( accounts[0], { from: accounts[0] })
    const productIdsNumAcct0 = productIdsAcct0.map(x => x.toNumber()) 
    
    const allProductIds = await products.getAllProductIds.call ({ from: accounts[0] })
    const allProductIdsNum = allProductIds.map(x => x.toNumber())

    const price = await products.getPriceById.call(3, { from: accounts[0] })
    
    const prod1 = await products.getProductById.call(2, { from: accounts[0] })
    const prod1Owner = prod1[1];

    expect(productIdsNumAcct0.toString()).to.equal("1,2")
    expect(allProductIdsNum.toString()).to.equal("1,2,3")
    expect(price.toNumber()).to.equal(2)
    expect(prod1Owner).to.equal(accounts[0])

  })
})