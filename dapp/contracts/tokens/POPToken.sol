pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "./TokenRegistry.sol";

contract POPToken is ERC721Token {
  TokenRegistry registry;

  constructor (string _name, string _symbol, address _registryAddress) public ERC721Token(_name, _symbol){
    registry = TokenRegistry(_registryAddress);
  }

  function _getTokenAddress(string _symbol) private view returns (address _tokenAddr) {
    _tokenAddr = registry.getTokenAddressBySymbol(_symbol);
  }

  function buyPOP() public {

    bool coinTransferSuccessful; 
    ERC20 coin = ERC20(_getTokenAddress("DAI"));

    // price hard-coded at 1 for now
    coinTransferSuccessful = coin.transferFrom(msg.sender, this, 1);
    require(coinTransferSuccessful);

    uint256 newTokenId = super.totalSupply() + 1;
    super._mint(msg.sender, newTokenId);
  }
}

