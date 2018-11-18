const { getWeb3, getContractInstance } = require("./helpers");
const web3 = getWeb3();
const getInstance = getContractInstance(web3);
const registry = getInstance("TokenRegistry");

contract("Testing TokenRegistry contract", function(accounts) {
  it("should ensure that the token registry has stored the correct test token address", async () => {
    const registryAddress = await registry.methods
      .getTokenAddressBySymbol("DAI")
      .call({ from: accounts[0] });
    
    expect(registryAddress).to.equal(daiToken._address);
  });
});
