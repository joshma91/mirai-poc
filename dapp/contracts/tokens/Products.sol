pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/**
 * @title Products
 * @notice Products controls the products and their inventory
 **/
contract Products is Ownable {

  constructor () public {
    productLength = 0;
  }

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

  uint256 productLength;

 /**
   * @notice createProduct creates a new product 
   * @param _price - the starting price (price can be changed)
   * @param _owner - the owner of the product
   * @param _available - whether the product should be available for sale (can be changed)
   */
  function createProduct(uint256 _price, address _owner, bool _available) public onlyOwner {
    productLength += 1;
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
   * @param _id - the product id we're querying for
   * @return all the attributes of the queried product
   */
  function getProductById(uint256 _productId) public view onlyOwner returns (
    uint256 _id, 
    address _owner, 
    uint256 _price, 
    bool _available, 
    uint256 _numberSold) {

    Product memory _product = products[_productId];
    _id = _product.id;
    _owner = _product.owner;
    _price = _product.price;
    _available = _product.available;
    _numberSold = _product.numberSold;
  }

  /**
   * @notice getAllProducts returns the product struct for all products
   * @return all the attributes of all created products
   */
  function getAllProducts() public view onlyOwner returns (
    uint256[] productIds, 
    address[] owners, 
    uint256[] prices, 
    bool[] available, 
    uint256[] numberSold) {

    productIds = new uint256[](productLength);
    owners = new address[](productLength);
    prices = new uint256[](productLength);
    available = new bool[](productLength);
    numberSold = new uint256[](productLength);

    for(uint256 i = 0; i < productLength; i++) {
      // the +1 is necessary because productIds are not 0-indexed 
      uint256 productId = i + 1;

      Product memory product = products[productId];
      productIds[i] = product.id;
      owners[i] = product.owner;
      prices[i] = product.price;
      available[i] = product.available;
      numberSold[i] = product.numberSold;
    }

  }
}      