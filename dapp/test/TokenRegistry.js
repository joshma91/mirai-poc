const DSToken = artifacts.require("DSToken");
const TokenRegistry = artifacts.require("TokenRegistry");

contract('Testing POPToken contract', function(accounts) {
  let registry
  let daiToken 

  it('should ensure that the token registry has stored the right address', async () => {    
    registry = await TokenRegistry.new()
    daiToken = await DSToken.new("DAI")
    await setRegistry(daiToken, registry)
  
    // mint new DAI tokens to accounts[0]
    const registryAddress = await registry.getTokenAddressBySymbol("DAI")
    expect(registryAddress).to.equal(daiToken.address)
  })
})

async function setRegistry(contract, registry) {
  const contractName = web3.toAscii(await contract.name())
  const contractSymbol = web3.toAscii(await contract.symbol.call())
  const contractDecimals = await contract.decimals()

  await registry.addToken(contract.address, contractName, contractSymbol, contractDecimals)
}