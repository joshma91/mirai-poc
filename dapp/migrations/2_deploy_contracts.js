const TokenRegistry = artifacts.require('./tokens/TokenRegistry.sol')
const DSToken = artifacts.require('./tokens/DSToken.sol')
const POPToken = artifacts.require('./tokens/POPToken.sol')
const Products = artifacts.require('./tokens/Products')

module.exports = function (deployer) {
  deployer.deploy(TokenRegistry).then(async (registry) => {
   await deployer.deploy(DSToken, "DAI")
   await deployer.deploy(POPToken, "POPToken", "POP", registry.address)
   await deployer.deploy(Products)
  })
}
