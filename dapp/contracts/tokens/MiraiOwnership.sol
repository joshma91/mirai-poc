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
  * @param owner the owner of the product - who to send the ETH to
   */
  function buyPOP(string _uri, address owner) public payable {
    
    uint256 newTokenId = super.totalSupply();
    super._mint(msg.sender, newTokenId);

    super._setTokenURI(newTokenId, _uri);
    emit POPIssued(newTokenId, msg.sender, _uri, block.timestamp);

    owner.transfer(msg.value);   
  }

    /**
  * @notice retrieves array of owned tokensIds. Uses inhereted mapping ownedTokens
  * @param _owner the address to find owned tokenIds
   */
  function getTokensByOwner(address _owner) public view returns (uint256[]) {
    return ownedTokens[_owner];
  }
}

