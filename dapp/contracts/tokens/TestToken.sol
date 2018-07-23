pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";


/**
 * @title TestToken 
 * @notice generic ERC20 token implementation for use in tests
 */

contract TestToken is MintableToken {
  string public symbol = "TST";
  string public constant name = "TestToken";
  uint8 public constant decimals = 18;

  constructor() public {
  }
}  