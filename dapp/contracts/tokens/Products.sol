pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/**
 * @title Products
 * @notice Products controls the products and their inventory
 **/
contract Products is Ownable {

  constructor () public {
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

 /**
   * @notice createProduct creates a new product 
   * @param _price - the starting price (price can be changed)
   * @param _owner - the owner of the product
   * @param _available - whether the product should be available for sale (can be changed)
   */
  function createProduct(uint256 _price, address _owner, bool _available) public onlyOwner {
    uint256 _productId = allProductIds.length + 1; 
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
   * @notice getPrice returns the product struct
   * @param _id - the product id we're querying for
   * @return all the attributes of the queried product
   */
  function getPriceById(uint256 _id) public view onlyOwner returns (uint256) {
    return products[_id].price;
  }
}