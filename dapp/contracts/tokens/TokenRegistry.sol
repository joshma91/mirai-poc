pragma solidity ^0.4.24; 

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/**
 * @title TokenRegistry
 * @notice TokenRegistry manages the addition and retrieval of ERC20 tokens 
 **/
contract TokenRegistry is Ownable {

    event LogAddToken(
        address indexed token,
        string name,
        string symbol,
        uint8 decimals
    );

    mapping (address => TokenData) public tokens;
    mapping (string => address) internal tokenBySymbol;
    mapping (string => address) internal tokenByName;

    address[] public tokenAddresses;

    struct TokenData {
        address tokenAddress;
        string name;
        string symbol;
        uint8 decimals;
    }

    /// @notice Allows owner to add a new token to the registry.
    /// @param _tokenAddress Address of new token.
    /// @param _name Name of new token.
    /// @param _symbol Symbol for new token.
    /// @param _decimals Number of decimals, divisibility of new token.
    function addToken(
        address _tokenAddress,
        string _name,
        string _symbol,
        uint8 _decimals
        ) public onlyOwner {
        tokens[_tokenAddress] = TokenData({
            tokenAddress: _tokenAddress,
            name: _name,
            symbol: _symbol,
            decimals: _decimals
        });
        tokenAddresses.push(_tokenAddress);
        tokenBySymbol[_symbol] = _tokenAddress;
        tokenByName[_name] = _tokenAddress;
        emit LogAddToken(_tokenAddress, _name, _symbol, _decimals);
    }

    /*
     * View functions
     */
    /// @notice Provides a registered token's address when given the token symbol.
    /// @param _symbol Symbol of registered token.
    /// @return Token's address.
    function getTokenAddressBySymbol(string _symbol) public view returns (address) {
        return tokenBySymbol[_symbol];
    }

    /// @notice Provides a registered token's address when given the token name.
    /// @param _name Name of registered token.
    /// @return Token's address.
    function getTokenAddressByName(string _name) public view returns (address) {
        return tokenByName[_name];
    }

    /// @notice Returns an array containing all token addresses.
    /// @return Array of token addresses.
    function getTokenAddresses() public view returns (address[]) {
        return tokenAddresses;
    }
}