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

  event PriceChanged(
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
  function createProduct(uint256 _price, address _owner, bool _available) public {
    
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
  function getProductIdsByOwner(address _owner) public view returns (uint256[]) {
    return productIdsByOwner[_owner];
  }

  /**
   * @notice getPriceById returns a product's price
   * @param _id - the product id we're querying for
   * @return the price of the queried product
   */
  function getPriceById(uint256 _id) public view returns (uint256) {
    return products[_id].price;
  }

    /**
   * @notice getAllProductIds returns all created product ids
   * @return array of all product ids
   */
  function getAllProductIds() public view returns (uint256[]) {
    return allProductIds;
  }

  /**
   * @notice getProductById returns the product struct
   * @param _productId - the product id we're querying for
   * @return all the attributes of the queried product
   */
  function getProductById(uint256 _productId) public view returns (
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
  
    /**
   * @notice getAvailableProductIds returns all created product ids
   * @return array of all availalbe product ids
   */
  function getAvailableProductIds() public view returns (
    int[]
  ) {
    int[] memory availableProductIds = new int[](productLength);
    for(uint256 i = 0; i < productLength; i++){
      Product memory currProd = products[i];
      if(currProd.available) {
        availableProductIds[i] = int(currProd.id);
      } else {
        availableProductIds[i] = -1;
      }
    }
    return availableProductIds;
  }

  /**
   * @notice incrementNumberSold increases the numberSold attribute by 1
   * @param _productIdStr - the product we're incrementing
   */
  function incrementNumberSold(string _productIdStr) external {
    uint _productId = parseInt(_productIdStr);
    Product memory _product = products[_productId];
    _product.numberSold++;
    products[_productId] = _product;
  }

  modifier onlySeller(address _seller) {
    require(
      msg.sender == _seller
    );
    _;
  }

 /**
   * @notice editProductPrice changes the price of a given product
   * @param _seller - the account that created the product
   * @param _productId - the product being changed
   * @param _newPrice - what the new price should be
   */
  function editProductPrice(address _seller, uint256 _productId, uint256 _newPrice) public onlySeller(_seller) {
    Product memory _product = products[_productId];
    _product.price = _newPrice;
    products[_productId] = _product;
    emit PriceChanged(
      _product.id,
      _product.owner, 
      _product.price,
      _product.available,
      _product.numberSold
    );
  }

  // Copyright (c) 2015-2016 Oraclize srl, Thomas Bertani
  function parseInt(string _a) internal returns (uint) {
    bytes memory bresult = bytes(_a);
    uint mint = 0;
    uint _b = 0;
    bool decimals = false;
    for (uint i = 0; i < bresult.length; i++) {
      if ((bresult[i] >= 48) && (bresult[i] <= 57)) {
        if (decimals) {
          if (_b == 0) break;
            else _b--;
        }
        mint *= 10;
        mint += uint(bresult[i]) - 48;
      } else if (bresult[i] == 46) decimals = true;
    }
    return mint;
  }
}      