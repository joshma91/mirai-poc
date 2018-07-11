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

    const productIds = await products.getProductIdsByOwner.call( accounts[0], { from: accounts[0] })
    const productIdsNum = productIds.map(x => x.toNumber()) 
    
    const price = await products.getPriceById.call(3, { from: accounts[0] })
    
    expect(productIdsNum.toString()).to.equal("1,2")
    expect(price.toNumber()).to.equal(2)

  })
})