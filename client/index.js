const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

const Tree = new MerkleTree(niceList);

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const name = "Paula Pagac DVM";
  const proof = Tree.getProof(niceList.findIndex((n) => n === name));

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof,
    name,
  });

  console.log({ gift });
}

main();
