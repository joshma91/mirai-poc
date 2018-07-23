pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/**
 * @title MiraiCore
 * @notice MiraiCore controls the products and their inventory
 **/
contract MiraiCore is Ownable {

  uint256 productLength = 0;

  event ProductCreated();

 /**
   * @notice Product defines a product
  */
  struct Product {
    uint256 id;
    address owner; 
    uint256 price;
    bool available;
    uint256 numberSold;
  }

  event ProductCreated(
    uint256 id,
    address owner, 
    uint256 price,
    bool available,
    uint256 numberSold
  );

  // @notice A mapping from product id to Product
  mapping (uint256 => Product) public products;
  
  // @notice All products owned by a certain address
  mapping (address => Product[]) public productsByOwner;

  // @notice All product ids owned by a certain address
  mapping (address => uint256[]) public productIdsByOwner;
  
  // @notice All product ids in existence
  uint256[] public allProductIds;

  // @notice Arrays to store owner addresses
  address[] public ownerList;

 /**
   * @notice createProduct creates a new product 
   * @param _price - the starting price (price can be changed)
   * @param _owner - the owner of the product
   * @param _available - whether the product should be available for sale (can be changed)
   */
  function createProduct(uint256 _price, address _owner, bool _available) public onlyOwner {
    
    uint256 _productId = productLength; 
    Product memory _product = Product({
      id: _productId,
      owner: _owner,
      price: _price,
      available: _available,
      numberSold: 0
    });

    products[_productId] = _product;
    allProductIds.push(_productId);
    productsByOwner[_owner].push(_product);
    productIdsByOwner[_owner].push(_productId);

    productLength++;
    emit ProductCreated(
      _product.id,
      _product.owner, 
      _product.price,
      _product.available,
      _product.numberSold
    );
  }

  /**
   * @notice getProductIdsByOwner returns an array of the product ids owned by an address 
   * @param _owner - the product owner we're querying for
   * @return the array of product ids 
   */
  function getProductIdsByOwner(address _owner) public view onlyOwner returns (uint256[]) {
    return productIdsByOwner[_owner];
  }

  /**
   * @notice getPriceById returns a product's price
   * @param _id - the product id we're querying for
   * @return the price of the queried product
   */
  function getPriceById(uint256 _id) public view onlyOwner returns (uint256) {
    return products[_id].price;
  }

    /**
   * @notice getAllProductIds returns all created product ids
   * @return array of all product ids
   */
  function getAllProductIds() public view onlyOwner returns (uint256[]) {
    return allProductIds;
  }

  /**
   * @notice getProductById returns the product struct
   * @param _productId - the product id we're querying for
   * @return all the attributes of the queried product
   */
  function getProductById(uint256 _productId) public view onlyOwner returns (
    uint256 id, 
    address owner, 
    uint256 price, 
    bool available, 
    uint256 numberSold) {

    Product memory _product = products[_productId];
    id = _product.id;
    owner = _product.owner;
    price = _product.price;
    available = _product.available;
    numberSold = _product.numberSold;
  }
}      