const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index,timestamp, data, previousHash ='')
     {
      this.index=index;
      this.timestamp=timestamp;
      this.data=data;
      this.previousHash = previousHash;
      this.hash = this.calculateHash();
      this.nonce=0;  
    }
   
    calculateHash(){
       return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)+this.nonce).toString();
    }
   
    mineBlock(difficulty){
        let start = Date.now();
       while(this.hash.substring(0,difficulty)!== Array(difficulty+1).join("0")){
           this.hash=this.calculateHash();
                  this.nonce++; 
       }
       console.log("Block mined "+this.hash );
       let timeTaken = Date.now() - start;
       console.log("Total time taken : " + timeTaken + " milliseconds");
    }    
   }

class Blockchain {
   constructor() {
       this.chain = [this.createGenesisBlock()];
       this.difficulty = 4;
   }

   createGenesisBlock() {
       return new Block(0,"03/01/2009","Genesis Block","0");
   }

   getLatestBlock() {
    return this.chain[this.chain.length-1];
   }

   addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
   }

   isChainValid(){
    for(let i = 1; i<this.chain.length; i++) {
        const currentBlock = this.chain[i];
        const prevBlock= this.chain[i-1];
        if (currentBlock.previousHash === prevBlock.calculateHash()) {
           
        } else {
            return false;
        }
     }
     return true;
    }
}

let btCoin = new Blockchain();
console.log("Mining block 1")
btCoin.addBlock(new Block(1, "1/2/2022", {name:"TK", amount:4}));
//Uncomment the code below to tamper with the chain
//btCoin.chain[1].hash = "examplefakehash";
//btCoin.chain[1].data.amount = 100000;
console.log("Mining block 2")
btCoin.addBlock(new Block(2, "2/2/2022", {name:"TM1", amount:4}));
console.log("Is this chain valid?: "+btCoin.isChainValid());


