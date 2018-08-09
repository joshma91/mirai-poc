pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "./TokenRegistry.sol";

/**
 * @title MiraiOwnership
 * @notice MiraiOwnership is the entry point for interacting with the Mirai backend
 **/
contract MiraiOwnership is ERC721Token {

  /**
  * @notice Issued is emitted when a new POP is issued
  */
  event POPIssued(
    uint256 tokenId,
    address purchaser,
    string productId,
    uint256 issuedTime
  );

  TokenRegistry registry;

  constructor (string _name, string _symbol, address _registryAddress) public ERC721Token(_name, _symbol){
    registry = TokenRegistry(_registryAddress);
  }

  /**
  * @notice Makes a purchase of a product, issuing a proof of purchase token
  * @param _uri the string of the productId to purchase
  * @param _price the purchase product of the product
   */
  function buyPOP(string _uri, uint256 _price) public {

    _approveDaiTransfer(_price);

    uint256 newTokenId = super.totalSupply();
    super._mint(msg.sender, newTokenId);

    super._setTokenURI(newTokenId, _uri);
    emit POPIssued(newTokenId, msg.sender, _uri, block.timestamp);
  }

  /**
  * @notice transfers a pre-approved amount of dai equal to the purchase price from the sender to this contract
  * @param _price the purchase product of the product
   */
  function _approveDaiTransfer(uint256 _price) private returns (bool) {
    
    address daiTokenAddr = registry.getTokenAddressBySymbol("DAI");
    ERC20 daiToken = ERC20(daiTokenAddr);

    bool coinTransferSuccessful = daiToken.transferFrom(msg.sender, this, _price);
    require(coinTransferSuccessful, "Transfer of coins from ERC20 contract unsuccessful");   
  }
}

