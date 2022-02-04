// const { network } = require('hardhat');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle")
const ALCHEMY_API_KEY = "4mJl2f8qAOow9Fwq7jC1jCrdd7iFdYky";
const RINKEBY_PRIVATE_KEY ="3cb2e5992da5b0cb33f1c8d4d1d558d87f348b651b89c653f5c5545522400993";
module.exports = {
  solidity: "0.8.9",
  networks:{
    rinkeby:{
      url:`https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts:[`0x${RINKEBY_PRIVATE_KEY}`]
    }
  }
};
