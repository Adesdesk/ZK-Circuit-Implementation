import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config({ path: ".env" });
// https://github.com/projectsophon/hardhat-circom
import "hardhat-circom";
// circuits
import circuits = require('./circuits.config.json');
require("hardhat-deploy")
// set env var to the root of the project
process.env.BASE_PATH = __dirname;
const {
  GOERLI_URL,
  PRIVATE_KEY,
  MUMBAI_URL,
} = process.env as {
  MUMBAI_URL: string;
  GOERLI_URL: string;
  PRIVATE_KEY: string;
};

// tasks
import "./tasks/newcircuit"

// Define the custom circom property
interface CustomCircomConfig {
  inputBasePath: string;
  ptau: string;
  circuits: any;
}

// Extend HardhatUserConfig with the custom circom property
interface ExtendedConfig extends HardhatUserConfig {
  circom: CustomCircomConfig;
}

const config: ExtendedConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
      },
      {
        version: "0.6.11",
      }
    ]
  },
  circom: {
    // (optional) Base path for input files, defaults to `./circuits/`
    inputBasePath: "./circuits",
    // (required) The final ptau file, relative to inputBasePath, from a Phase 1 ceremony
    ptau: "powersOfTau28_hez_final_12.ptau",
    // (required) Each object in this array refers to a separate circuit
    circuits: JSON.parse(JSON.stringify(circuits))
  },
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: [ PRIVATE_KEY ],
    },
    mumbai: {
      url: MUMBAI_URL,
      accounts: [ PRIVATE_KEY ],
    },
  },
};

export default config;
