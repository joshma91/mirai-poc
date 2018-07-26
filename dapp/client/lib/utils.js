
export const getAccounts = web3 =>
  new Promise((resolve, reject) => {
    web3.eth.getAccounts(
      (error, accounts) => (error ? reject(error) : resolve(accounts))
    );
  });

// assumes passed-in web3 is v1.0 and creates a function to receive contract name
export const getContractInstance = web3 => async contractJSON => {
  const networkId = await web3.eth.net.getId()
  const deployedAddress = contractJSON.networks[networkId].address
  const instance = new web3.eth.Contract(contractJSON.abi, deployedAddress);
  return instance;
};
