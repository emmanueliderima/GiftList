const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const serverUrl = "http://localhost:1225";

const Tree = new MerkleTree(niceList);

readline.question("Enter Your Name: ", (name) => {
  main(name);
  readline.close();
});

async function main(name) {
  // TODO: how do we prove to the server we're on the nice list?
  const proof = Tree.getProof(niceList.findIndex((n) => n === name));

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof,
    name,
  });

  console.log({ gift });
}
