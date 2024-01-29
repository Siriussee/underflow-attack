import { ethers } from "hardhat";

async function main() {
  let time = Date.now();
  const AMOUNT = ethers.parseEther("1"); //bignumber

  let vault;
  const [owner] = await ethers.getSigners();
  vault = await ethers.getContractAt(
    "InsecureEtherVault", 
    "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c",  
    // make sure this address is the address you just deployed
    owner
  );

  const txn2 = await vault.withdraw(AMOUNT);
  await txn2.wait(1);

  console.log("Time taken:", Date.now() - time);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
