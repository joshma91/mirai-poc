pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";


/**
 * @title DSToken 
 * @notice generic ERC20 token implementation for use in tests
 */

contract DSToken is MintableToken {
  string public symbol = "DAI";
  string public constant name = "DSToken";
  uint8 public constant decimals = 18;

  constructor() public {
  }
}  