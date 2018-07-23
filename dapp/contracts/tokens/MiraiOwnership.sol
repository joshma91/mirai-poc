pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "./TokenRegistry.sol";

/**
 * @title MiraiOwnership
 * @notice MiraiOwnership is the entry point for interacting with the Mirai backend
 **/
contract MiraiOwnership is ERC721Token {
  TokenRegistry registry;

  constructor (string _name, string _symbol, address _registryAddress) public ERC721Token(_name, _symbol){
    registry = TokenRegistry(_registryAddress);
  }

  function buyPOP() public {

    bool coinTransferSuccessful; 
    address testTokenAddr = registry.getTokenAddressBySymbol("TST");
    ERC20 testToken = ERC20(testTokenAddr);

    // price hard-coded at 1 for now
    coinTransferSuccessful = testToken.transferFrom(msg.sender, this, 1);
    require(coinTransferSuccessful, "Transfer of coins from ERC20 contract unsuccessful");

    uint256 newTokenId = super.totalSupply() + 1;
    super._mint(msg.sender, newTokenId);
  }
}

