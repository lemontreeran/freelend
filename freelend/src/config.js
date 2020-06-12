export const LENDING_DAO_MANAGER_ADDRESS = "0.0.68354"
export const LENDING_DAO_ADDRESS = "0.0.68352"

export const LENDING_DAO_MANAGER_ABI = [
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "DAOName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "ownerName",
          "type": "string"
        }
      ],
      "name": "createDAO",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getDAONum",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "getDAO",
      "outputs": [
        {
          "internalType": "contract LendingDAO",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "getDAOName",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
]

export const LENDING_DAO_ABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_DAOName",
        "type": "string"
      },
      {
        "name": "_ownerName",
        "type": "string"
      },
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "amountRequested",
        "type": "uint256"
      }
    ],
    "name": "newRequest",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "member",
        "type": "address"
      }
    ],
    "name": "getRequest",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "member",
        "type": "address"
      }
    ],
    "name": "getBalance",
    "outputs": [
      {
        "name": "",
        "type": "int256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "memberAdd",
        "type": "address"
      }
    ],
    "name": "getMember",
    "outputs": [
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "int256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getMemberAddresses",
    "outputs": [
      {
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "questionable",
        "type": "address"
      }
    ],
    "name": "memberInDAO",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_memberAddress",
        "type": "address"
      },
      {
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "addMember",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "requestMoney",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "member",
        "type": "address"
      }
    ],
    "name": "giveMoney",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  }
]
