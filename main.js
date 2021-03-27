const SHA256 = require("crypto-js/sha256")

class Block {
	constructor(index, timestamp, data, previousHash = "") {
		this.index = index
		this.timestamp = timestamp
		this.data = data
		this.previousHash = previousHash
		this.hash = this.calculateHash()
		this.nonce = 0
	}

	calculateHash() {
		return SHA256(
			this.index +
				this.previousHash +
				this.timestamp +
				JSON.stringify(this.data) +
				this.nonce
		).toString()
	}

	mineBlock(difficult) {
		while (
			this.hash.substring(0, difficult) !== Array(difficult + 1).join("0")
		) {
			this.nonce++
			this.hash = this.calculateHash()
		}
		console.log("Block mined: " + this.hash)
	}
}

class Blockchain {
	constructor() {
		this.chain = [this.createGenesisBlock()]
		this.difficult = 5
	}

	createGenesisBlock() {
		return new Block(0, "01/01/2021", "Genesis block", "0")
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1]
	}

	addBlock(newBlock) {
		newBlock.previousHash = this.getLatestBlock().hash
		newBlock.mineBlock(this.difficult)

		this.chain.push(newBlock)
	}

	isChainValid() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i]
			const previousBlock = this.chain[i - 1]

			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false
			}
			if (currentBlock.previousHash !== previousBlock.hash) {
				return false
			}
		}
		return true
	}
}

let monkeCoin = new Blockchain()
console.log("Mining block 1...")
monkeCoin.addBlock(new Block(1, "26/03/2021", { amount: 3 }))
console.log("Mining block 2...")
monkeCoin.addBlock(new Block(2, "27/03/2021", { amount: 6 }))
console.log("Mining block 3...")
monkeCoin.addBlock(new Block(2, "28/03/2021", { amount: 9 }))
