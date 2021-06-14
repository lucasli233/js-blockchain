const { Blockchain, Transaction } = require("./blockchain")
const EC = require("elliptic").ec
const ec = new EC("secp256k1")

const myKey = ec.keyFromPrivate(
	"0b65ada561dacb10a528b15c27ac0bdf5b4c4bf4540967c99eff08262dcfb279"
)


const myWalletAddress = myKey.getPublic("hex")

let monkeCoin = new Blockchain()

const tx1 = new Transaction(myWalletAddress, "public key goes here", 10)

tx1.signTransaction(myKey)
monkeCoin.addTransaction(tx1)

console.log("Starting the miner...")
monkeCoin.minePendingTransactions(myWalletAddress)

console.log(
	"Balance of Lucas is ",
	monkeCoin.getBalanceOfAddress(myWalletAddress)
)

monkeCoin.chain[1].transactions[0].amount = 1

console.log("Is chain valid? ", monkeCoin.isChainValid())
