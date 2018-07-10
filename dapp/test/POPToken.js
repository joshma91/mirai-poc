const POPToken = artifacts.require("POPToken");
const DSToken = artifacts.require("DSToken");
const TokenRegistry = artifacts.require("TokenRegistry");

contract('Testing POPToken contract', function(accounts) {
  let registry
  let daiToken 
  let pop 

  it('should have issued DAI tokens after minting', async () => {

    registry = await TokenRegistry.new()
    daiToken = await DSToken.new("DAI")
    await setRegistry(daiToken, registry)
    pop = await POPToken.new("POPToken", "POP", registry.address)
    
    // mint new DAI tokens to accounts[0]
    await daiToken.mint(100000, { from: accounts[0] })
    const balance = await daiToken.balanceOf.call(accounts[0], { from: accounts[0] })
    
    expect(balance.toNumber()).to.equal(100000)
  })

  it('should ensure that the token registry has stored the right address', async () => {    
    const registryAddress = await registry.getTokenAddressBySymbol("DAI")
    expect(registryAddress).to.equal(daiToken.address)
  })
  
  it('should use approved DAI tokens to purchase a POP', async () => {
    
    // approval for retrieval of 1 Dai from pop contract
    daiToken.approve(pop.address, 1, { from: accounts[0] })
    
    const before = await pop.balanceOf.call(accounts[0], { from: accounts[0] })
    await pop.buyPOP({ from: accounts[0] })
    
    const after = await pop.balanceOf.call(accounts[0], { from: accounts[0] })
    const daiBalanceAfter = await daiToken.balanceOf.call(accounts[0], { from: accounts[0] })

    expect(before.toNumber()).to.equal(0)
    expect(after.toNumber()).to.equal(1)
    expect(daiBalanceAfter.toNumber()).to.equal(99999)
  })
})

async function setRegistry(contract, registry) {
  const contractName = web3.toAscii(await contract.name())
  const contractSymbol = web3.toAscii(await contract.symbol.call())
  const contractDecimals = await contract.decimals()

  await registry.addToken(contract.address, contractName, contractSymbol, contractDecimals)
}
