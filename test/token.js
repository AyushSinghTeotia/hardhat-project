// const {expect}= require("chai");
// const { ethers } = require("ethers");
// const { ethers } = require("ethers");
// describe("Token contract",function(){


//const { ethers } = require("ethers");

//     it("Deployment should assign the total supply of tokens to the owner",async function(){
//         const[owner]=await ethers.getSigners();
//         //console.log("Signers object",owner);
//         const Token= await ethers.getContractFactory("Token"); // instance contract
        
//         const hardhatToken=await Token.deploy(); //deploy contract
//         const ownerBalance=await hardhatToken.balanceof(owner.address); //owner balance =10000
//         //console.log("balance",ownerBalance);
//       expect(await hardhatToken.totalSupply()).to.equal(ownerBalance); //total supply=10000
//     });
 
//     it("Should transfer token between accounts",async function(){
//         const [owner,add1,add2] =await ethers.getSigners();
//         const Token = await ethers.getContractFactory("Token");
//         const hardhatToken= await Token.deploy(); 
//         // Transfer 10 tokens from owner to add1
//         await hardhatToken.transfer(add1.address,10);
//         expect(await hardhatToken.balanceof(add1.address)).to.equal(10);
//         //Transfer 5 tokens from add1 to add2
//         await hardhatToken.connect(add1).transfer(add2.address,5)
//         expect (await hardhatToken.balanceof(add2.address)).to.equal(5)
//     });
// });
var { expect } = require("chai");
describe("Token Contract",function(){
    let Token;
    let hardhatToken;
    let owner;
    let add1;
    let add2;
    let addrs;
    beforeEach(async function(){
      Token = await ethers.getContractFactory("Token");//instance create
      hardhatToken =await Token.deploy(); //contract deploy
      console.log("token address",hardhatToken.address);
      [owner,add1,add2,...addrs]= await ethers.getSigners();//signer objet (address or other contract information)
      
    });
    describe("deployment",function(){
        it("should set the right owner",async function(){
            expect(await hardhatToken.owner()).to.equal(owner.address);

        })
        it("should assign the total supply of tokes to the owner",async function(){
            const ownerBalance=await hardhatToken.balanceof(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);

        });
    });
    describe("Transaction",function(){
        it("should transfer tokens between accounts",async function(){
            //owner account to add1.address
            await hardhatToken.transfer(add1.address,5);
            const add1balance=await hardhatToken.balanceof(add1.address);
            expect(add1balance).to.equal(5);
            await hardhatToken.connect(add1).transfer(add2.address,5);
            const add2balance = await hardhatToken.balanceof(add2.address);
            expect(add2balance).to.equal(5);
            
        });
        it("should fail if sender does not have enough tokens",async function(){
            const initialOwnerBalance=await hardhatToken.balanceof(owner.address);
            console.log(initialOwnerBalance);
            await expect(hardhatToken.connect(add1).transfer(owner.address,1)).to.be.revertedWith("Not enough tokens");
           // initialy - 0 tokens add1
            expect(await hardhatToken.balanceof(owner.address)).to.equal(initialOwnerBalance);


        });

        it("should update balance after transfer",async function(){
            const initialOwnerBalance=await hardhatToken.balanceof(owner.address);
            await hardhatToken.transfer(add1.address,5);
            await hardhatToken.transfer(add2.address,10);
            const finalOwnerBalance =await hardhatToken.balanceof(owner.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBalance-15);
            const add1balance = await hardhatToken.balanceof(add1.address);
            expect(add1balance).to.equal(5);
            const add2balance = await hardhatToken.balanceof(add2.address);
            expect(add2balance).to.equal(10);
        })
    });
});
