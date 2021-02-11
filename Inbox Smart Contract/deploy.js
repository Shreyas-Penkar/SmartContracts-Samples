const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');


const provider = new HDWalletProvider(
  'swear east pumpkin marine goose mother job rocket impact glide coffee inner',
  '<rinkeby link infuria>'
);

const web3 =  new Web3(provider);
let message = "Hello There!"

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from ',accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [message] })
    .send({ gas:'1000000', from:accounts[0] });

  console.log('Contract deployed to',result.options.address);
};

deploy();
