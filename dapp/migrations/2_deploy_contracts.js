const TokenRegistry = artifacts.require("./tokens/TokenRegistry.sol");
const DSToken = artifacts.require("./tokens/DSToken.sol");
const POPToken = artifacts.require("./tokens/POPToken.sol");
const Products = artifacts.require("./tokens/Products");
const SimpleStorage = artifacts.require("./tokens/SimpleStorage");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(TokenRegistry).then(async registry => {
    const daiToken = await deployer.deploy(DSToken, "DAI");
    await deployer.deploy(POPToken, "POPToken", "POP", registry.address);
    await deployer.deploy(Products);
    await setRegistry(daiToken, registry);
  });
};

async function setRegistry(contract, registry) {
  const contractName = web3.toAscii(await contract.name());
  const contractSymbol = web3.toAscii(await contract.symbol.call());
  const contractDecimals = await contract.decimals();

  await registry.addToken(
    contract.address,
    contractName,
    contractSymbol,
    contractDecimals
  );
}

