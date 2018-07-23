const { getWeb3, getContractInstance } = require("./helpers");
const web3 = getWeb3();
const getInstance = getContractInstance(web3);
const testToken = getInstance("TestToken");
const pop = getInstance("MiraiOwnership");

contract("Testing MiraiOwnership contract", function(accounts) {
  it("should have issued TST tokens after minting", async () => {
    // mint new TST tokens to accounts[0]
    await testToken.methods.mint(accounts[0], 100000).send({ from: accounts[0] });
    const balance = await testToken.methods.balanceOf(accounts[0]).call({
      from: accounts[0]
    });
    expect(parseInt(balance)).to.equal(100000);
  });

  it("should use approved TST tokens to purchase a POP", async () => {
    // approval for retrieval of 1 TST from pop contract
    testToken.methods
      .approve(pop._address, 1)
      .send({ from: accounts[0], gas: 3000000 });

    const before = await pop.methods
      .balanceOf(accounts[0])
      .call({ from: accounts[0] });

    await pop.methods.buyPOP().send({ from: accounts[0], gas: 3000000 });

    const after = await pop.methods
      .balanceOf(accounts[0])
      .call({ from: accounts[0], gas: 3000000 });

    const tstBalanceAfter = await testToken.methods.balanceOf(accounts[0]).call({
      from: accounts[0],
      gas: 3000000
    });

    expect(parseInt(before)).to.equal(0);
    expect(parseInt(after)).to.equal(1);
    expect(parseInt(tstBalanceAfter)).to.equal(99999);
  });
});
