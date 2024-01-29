# Underflow Demo in Hardhat

## Initialize Everything
Follow only if you start from scratch. If you clone this GitHub repo, skip this section.

```
npm install -g yarn
yarn init --yes
yarn add -D hardhat
npx hardhat init
```

## Deploy and Interact with Vault

```
// in terminal 1, start a localhost hardhat ethereum node
npx hardhat node

// in terminal 2, do
npx hardhat run --network localhost .\scripts\deploy.ts
npx hardhat run --network localhost .\scripts\query.ts
npx hardhat run --network localhost .\scripts\deposit.ts
```

## Attack the Vault

```
// deploy a new instance of Vault
npx hardhat run --network localhost .\scripts\deploy.ts
```

```
// give it some initial value
npx hardhat run --network localhost .\scripts\deposit.ts
npx hardhat run --network localhost .\scripts\query.ts
```

```
// output
owner address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
attacker address: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
vault balance: 1000000000000000000
owner balance: 1000000000000000000
attacker balance: 0
```

```
// then run the full attack script
npx hardhat run --network localhost .\scripts\attack.ts
```
```
// output
--- attacker deposit ---
vault balance:  2000000000000000000n
owner balance:  2000000000000000000n
--- attacker deposit ---
vault balance:  3000000000000000000n
attacker balance:  1000000000000000000n
--- attacker withdraw ---
vault balance:  1000000000000000000n
attacker balance:  115792089237316195423570985008687907853269984665640564039456584007913129639936n  
// ^^^ this value screw up because of the underflow 
```

## BONUS POINTS HERE!
You win bonus points if you are first to finish the following tasks correctly (any).

**To claim the bonus and secure your position, submit an issue to THIS repo. Include the link to you solution (in a separate github repo). The repo must come with full hack/defence explaination and step by step tutorial on how to run it. The last commit timestamp to the repo must in PRIOR to your issue timestamp (surely you can continue to work on another branch, I will look at the main branch only). Failures to follow the rules disqualify your submission.**

1. How to defend reentrancy attack for this vault? The submission should come with (1) a secured vault contract source code; (2) a script trying to attack (just like the one i provided) but fails; and (3) explaination on how you do it.
2. Is there any other vulnerabilities (bug) in the code of [Vault.sol](https://github.com/Siriussee/reentrancy-attack/blob/main/contracts/InsecureEtherVault.sol) and [Attack.sol
](https://github.com/Siriussee/reentrancy-attack/blob/main/contracts/Attack.sol)? The submission should come with (1) a bug report, where is the bug, why it is a bug, what is the consequnece of the bug? (2) a script that exploits the bug; and (3) a secured version of the contract source code.

NB: There are MORE THAN ONE answers to each question. Points go to the first submissions of each unique answer.
