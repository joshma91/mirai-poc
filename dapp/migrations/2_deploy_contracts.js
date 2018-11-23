const MiraiOwnership = artifacts.require("./tokens/MiraiOwnership.sol");
const MiraiCore = artifacts.require("./tokens/MiraiCore");

module.exports = deployer => {
  deployer.deploy(MiraiCore).then(core => {
    console.log(core.address)
    return deployOwnership(deployer, core.address).then(x => {
      Promise.resolve()
    })
  });
};

const deployOwnership = (deployer, coreAddress) => new Promise((resolve,reject) => {
  resolve(deployer.deploy(
    MiraiOwnership,
    "MiraiOwnership",
    "POP",
    coreAddress,
  ));
})