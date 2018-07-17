const { getWeb3, getContractInstance } = require("./helpers");
const web3 = getWeb3();
const getInstance = getContractInstance(web3);
const daiToken = getInstance("DSToken");
const registry = getInstance("TokenRegistry");

contract("Testing TokenRegistry contract", function(accounts) {
  it("should ensure that the token registry has stored the right address", async () => {
    // mint new DAI tokens to accounts[0]
    const registryAddress = await registry.methods
      .getTokenAddressBySymbol("DAI")
      .call({ from: accounts[0] });
    expect(registryAddress).to.equal(daiToken._address);
  });
});
