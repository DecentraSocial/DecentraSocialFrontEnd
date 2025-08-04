const { ethers } = require("hardhat");

async function main() {
  const contractFactory = await ethers.getContractFactory("CrowdFunding");
  const contract = await contractFactory.deploy();
  await contract.getDeployedCode();
  console.log("Contract deployed to:", contract.target);
  //   0xBEDb26fBcF4cF073D70E214E9EB224b29Fce96E0
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
