const { getWeb3, getContractInstance } = require("./helpers");
const web3 = getWeb3();
const getInstance = getContractInstance(web3);
const pop = getInstance("MiraiOwnership");

contract("Testing MiraiOwnership contract", function(accounts) {
  let tokenId;
  const testURI = "URI Test"

  it("should confirm that 10000 tokens were minted at deployment", async () => {
    const balance = await daiToken.methods.balanceOf(accounts[0]).call({
      from: accounts[0]
    });
    expect(parseInt(balance)).to.equal(100000);
  });

  it("should use approved DAI tokens to purchase a POP", async () => {
    const popPrice = 5;

    // approval for retrieval of 5 DAI from pop contract
    daiToken.methods
      .approve(pop._address, popPrice)
      .send({ from: accounts[0], gas: 3000000 });

    const before = await pop.methods
      .balanceOf(accounts[0])
      .call({ from: accounts[0] });

    await pop.methods
      .buyPOP(testURI, popPrice)
      .send({ from: accounts[0], gas: 3000000 })
      .on("receipt", function(receipt) {
        tokenId = receipt.events.POPIssued.returnValues.tokenId;
      });

    const after = await pop.methods
      .balanceOf(accounts[0])
      .call({ from: accounts[0], gas: 3000000 });

    const daiBalanceAfter = await daiToken.methods.balanceOf(accounts[0]).call({
      from: accounts[0],
      gas: 3000000
    });

    expect(parseInt(before)).to.equal(0);
    expect(parseInt(after)).to.equal(1);
    expect(parseInt(daiBalanceAfter)).to.equal(99995);
  });

  it("should return the stored URI from the previous step", async () => {
    const retrievedURI = await pop.methods.tokenURI(tokenId).call({
      from: accounts[0],
      gas: 3000000
    });
    expect(retrievedURI).to.equal(testURI)
  });
});
