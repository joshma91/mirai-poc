pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/**
 * @title Products
 * @notice Products controls the products and their inventory
 **/
contract Products is Ownable {

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
  function createProduct(_price, _owner, _available) public onlyOwner {
    uint256 memory _productId = allProductIds.length; 
    Product memory _product = Product({
      id: _productId,
      owner: _owner,
      price: _price,
      available: _available,
      numberSold: 0
    });

    products[_productId] = _product;
    allProductIs.push(_productId);
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
}