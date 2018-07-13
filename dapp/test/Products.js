const Products = artifacts.require("Products");

contract('Testing Products contract', function(accounts) {
  let products
  let firstProduct
  let secondProduct
  let thirdProduct
  let fourthProduct

  it('should retrieve the product information', async () => {

    products = await Products.new()
    firstProduct = {
      price: 1,
      owner: accounts[0],
      available: true
    }

    secondProduct = {
      price: 3,
      owner: accounts[0],
      available: true
    }

    thirdProduct = {
      price: 2,
      owner: accounts[1],
      available: true
    }

    fourthProduct = {
      price: 10,
      owner: accounts[0],
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

    await products.createProduct(
      fourthProduct.price, 
      fourthProduct.owner,
      fourthProduct.available,
      { from: accounts[0] })



    const price = await products.getPriceById.call(3, { from: accounts[0] })
    
    const prod1 = await products.getProductById.call(2, { from: accounts[0] })
    const prod1Owner = prod1[1];

    expect(price.toNumber()).to.equal(2)
    expect(prod1Owner).to.equal(accounts[0])
  })

  it('should retrieve all productIds and productIds owned by a specified address', async () => {
    
    const productIdsAcct0 = await products.getProductIdsByOwner.call( accounts[0], { from: accounts[0] })
    const productIdsNumAcct0 = productIdsAcct0.map(x => x.toNumber()) 
    
    const allProductIds = await products.getAllProductIds.call ({ from: accounts[0] })
    const allProductIdsNum = allProductIds.map(x => x.toNumber())

    expect(productIdsNumAcct0.toString()).to.equal("1,2,4")
    expect(allProductIdsNum.toString()).to.equal("1,2,3,4")
  })

  it('should retrieve product information of all created products', async () => {

    const productRange = await products.getAllProducts.call({from: accounts[0] })

    // this takes the destructured output from solidity and re-creates the Product struct
    const organizedProducts = productRange.reduce((acc, curr) => {
      return curr.reduce((acc2, curr2, j) => {
        if(!acc2[j]) acc2.push([])
        acc2[j].push(curr2)
        return acc2
      }, acc)
    }, [])

    // assign products to an object with 0-indexed keys
    const productObjects = organizedProducts.map(x => {
      return x.reduce((acc, curr, i) => {
        acc[i] = curr
        return acc
      }, {})
    })

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
    }

    const retrievedFourthProduct = {
      price: productObjects[3][2].toNumber(),
      owner: productObjects[3][1],
      available: productObjects[3][3]
    }

    expect(JSON.stringify(retrievedFristProduct)).to.equal(JSON.stringify(firstProduct))
    expect(JSON.stringify(retrievedFourthProduct)).to.equal(JSON.stringify(fourthProduct))    
  })
})

