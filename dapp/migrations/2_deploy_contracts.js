const TokenRegistry = artifacts.require("./tokens/TokenRegistry.sol");
const TestToken = artifacts.require("./tokens/TestToken.sol");
const MiraiOwnership = artifacts.require("./tokens/MiraiOwnership.sol");
const MiraiCore = artifacts.require("./tokens/MiraiCore");

module.exports = function(deployer) {
  deployer.deploy(TokenRegistry).then(async registry => {
    const testToken = await deployer.deploy(TestToken);
    await deployer.deploy(MiraiOwnership, "MiraiOwnership", "POP", registry.address);
    await deployer.deploy(MiraiCore);
    await setRegistry(testToken, registry);
  });
};

async function setRegistry(contract, registry) {
  const contractName = await contract.name.call();
  const contractSymbol = await contract.symbol.call();
  const contractDecimals = await contract.decimals.call();

  await registry.addToken(
    contract.address,
    contractName,
    contractSymbol,
    contractDecimals
  );
}
