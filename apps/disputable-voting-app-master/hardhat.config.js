require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-ethers")
require("@aragon/hardhat-aragon")

const { homedir } = require("os");
const { join } = require("path");

// get the network url and account private key from ~/.aragon/network_key.json
function getNetworkConfig(network) {
  // default to mumbai
  let url = "";
  let accounts = [];

  try {
    const networkConfig = require(join(
      homedir(),
      `.aragon/${network}_key.json`
    ));
    url = networkConfig.rpc;
    accounts = networkConfig.keys;
  } catch (_) {}

  return { url, accounts };
}

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.4.24",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000, // Set to 1000 for bytesize restricted envs
          },
        },
      },
      {
        version: "0.5.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 10000,
          },
        },
      },
    ],
  },
  aragon: {
    appEnsName: "disputable-voting.aragonpm.eth",
    appContractName: "DisputableVoting",
    appRoles: [
      {
        name: "Create new votes",
        id: "CREATE_VOTES_ROLE",
        params: ["Sender"],
      },
      {
        name: "Challenge votes",
        id: "CHALLENGE_ROLE",
        params: [],
      },
      {
        name: "Modify vote time",
        id: "CHANGE_VOTE_TIME_ROLE",
        params: ["New vote time"],
      },
      {
        name: "Modify support",
        id: "CHANGE_SUPPORT_ROLE",
        params: ["New required support"],
      },
      {
        name: "Modify quorum",
        id: "CHANGE_QUORUM_ROLE",
        params: ["New minimum acceptance quorum"],
      },
      {
        name: "Modify delegated voting period",
        id: "CHANGE_DELEGATED_VOTING_PERIOD_ROLE",
        params: ["New delegated voting period"],
      },
      {
        name: "Modify quiet ending configuration",
        id: "CHANGE_QUIET_ENDING_ROLE",
        params: ["New quiet ending period", "New quiet ending extension"],
      },
      {
        name: "Modify execution delay",
        id: "CHANGE_EXECUTION_DELAY_ROLE",
        params: ["New execution delay"],
      },
      {
        name: "Set agreement",
        id: "SET_AGREEMENT_ROLE",
        params: [],
      },
    ],
  },
  namedAccounts: {
    deployer: 0,
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      allowUnlimitedContractSize: true,
    },
    mainnet: getNetworkConfig("mainnet"),
    rinkeby: getNetworkConfig("rinkeby"),
    mumbai: getNetworkConfig("mumbai"),
    matic: getNetworkConfig("matic"),
    dijets: getNetworkConfig("dijets"),
    harmony: getNetworkConfig('harmony'),
    harmonyTest: getNetworkConfig('harmonyTest'),
    bsc: getNetworkConfig('bsc'),
    bscTest: getNetworkConfig('bscTest'),
    stardust: getNetworkConfig('stardust'),
    andromeda: getNetworkConfig('andromeda'),
  },
  ipfs: {
    gateway: "https://ipfs.blossom.software/",
    pinata: {
      key: process.env.PINATA_KEY || "4ebc0d7bfa259c115df2",
      secret: process.env.PINATA_SECRET_KEY || "354a76025f810e793d45703730bd0fc3d26f7a4fcb2193a028da6ca0420f9986",
    },
  },
  mocha: {
    timeout: 30000,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
