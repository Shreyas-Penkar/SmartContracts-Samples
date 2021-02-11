const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');
// const mocha = require('mocha');
let accounts;
let inbox;
let newData = "Bye There!";
let inititalString='Hi There!';
beforeEach(async () => {
  // get list of all accounts
  accounts = await web3.eth.getAccounts();

  // using promises
  // web3.eth.getAccounts()
  //   .then(fetchedAccounts => {
  //     console.log(fetchedAccounts);
  //   });

  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [inititalString] })
    .send({ from: accounts[0], gas: '1000000' })
});

describe('inbox',() => {
  it('deploy a contract', () => {
    assert.ok(inbox.options.address);
  });
  it('it has a default message',async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message,inititalString);
  });
  it('can change the message',async () => {
    await inbox.methods.setMessage(newData).send({ from:accounts[0] })
    const newString = await inbox.methods.message().call()
    assert.equal(newString,newData);
  });
});
