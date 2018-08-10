const TokenRegistry = artifacts.require("./tokens/TokenRegistry.sol");
const DSToken = artifacts.require("./tokens/DSToken.sol");
const MiraiOwnership = artifacts.require("./tokens/MiraiOwnership.sol");
const MiraiCore = artifacts.require("./tokens/MiraiCore");

module.exports = function(deployer) {
  deployer.deploy(TokenRegistry).then(async registry => {
    const daiToken = await deployer.deploy(DSToken);
    const account = web3.eth.accounts[0];

    await deployer.deploy(MiraiOwnership, "MiraiOwnership", "POP", registry.address);
    await deployer.deploy(MiraiCore);
    await setRegistry(daiToken, registry);
    
    await daiToken.mint(account, 100000, { from: account });
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

