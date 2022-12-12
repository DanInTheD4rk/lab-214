const abis = {
	mutant: [
		{
			inputs: [],
			stateMutability: "nonpayable",
			type: "constructor",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "owner",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "approved",
					type: "address",
				},
				{
					indexed: true,
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "Approval",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "owner",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "operator",
					type: "address",
				},
				{
					indexed: false,
					internalType: "bool",
					name: "approved",
					type: "bool",
				},
			],
			name: "ApprovalForAll",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "previousOwner",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "newOwner",
					type: "address",
				},
			],
			name: "OwnershipTransferred",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "from",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "to",
					type: "address",
				},
				{
					indexed: true,
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "Transfer",
			type: "event",
		},
		{
			inputs: [],
			name: "CLAIM_LIMIT",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "MAX_MINTABLE",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "MAX_SUPPLY",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "MAX_TIER",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "MINT_PRICE",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "SCALES",
			outputs: [
				{
					internalType: "contract IScales",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "UPGRADE_COST",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "to",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "approve",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "owner",
					type: "address",
				},
			],
			name: "balanceOf",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "downgrade",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "flipRevealed",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "bytes4",
					name: "",
					type: "bytes4",
				},
			],
			name: "functionLocked",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "getApproved",
			outputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "owner",
					type: "address",
				},
				{
					internalType: "address",
					name: "operator",
					type: "address",
				},
			],
			name: "isApprovedForAll",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "bytes4",
					name: "id",
					type: "bytes4",
				},
			],
			name: "lockFunction",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "metadataURI",
			outputs: [
				{
					internalType: "string",
					name: "",
					type: "string",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "amount",
					type: "uint256",
				},
			],
			name: "mint",
			outputs: [],
			stateMutability: "payable",
			type: "function",
		},
		{
			inputs: [],
			name: "mintableSupply",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "name",
			outputs: [
				{
					internalType: "string",
					name: "",
					type: "string",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "owner",
			outputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "ownerOf",
			outputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "placeholderURI",
			outputs: [
				{
					internalType: "string",
					name: "",
					type: "string",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "renounceOwnership",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "revealed",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "from",
					type: "address",
				},
				{
					internalType: "address",
					name: "to",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "safeTransferFrom",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "from",
					type: "address",
				},
				{
					internalType: "address",
					name: "to",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
				{
					internalType: "bytes",
					name: "data",
					type: "bytes",
				},
			],
			name: "safeTransferFrom",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "operator",
					type: "address",
				},
				{
					internalType: "bool",
					name: "approved",
					type: "bool",
				},
			],
			name: "setApprovalForAll",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "string",
					name: "URI",
					type: "string",
				},
			],
			name: "setBaseTokenURI",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "string",
					name: "URI",
					type: "string",
				},
			],
			name: "setMetadataURI",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "string",
					name: "URI",
					type: "string",
				},
			],
			name: "setPlaceholderURI",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "scales",
					type: "address",
				},
			],
			name: "setScales",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "bytes",
					name: "",
					type: "bytes",
				},
			],
			name: "signatureUsed",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "signer",
			outputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "bytes4",
					name: "interfaceId",
					type: "bytes4",
				},
			],
			name: "supportsInterface",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "symbol",
			outputs: [
				{
					internalType: "string",
					name: "",
					type: "string",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			name: "tier",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "tokenURI",
			outputs: [
				{
					internalType: "string",
					name: "",
					type: "string",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "totalSupply",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "from",
					type: "address",
				},
				{
					internalType: "address",
					name: "to",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "transferFrom",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "newOwner",
					type: "address",
				},
			],
			name: "transferOwnership",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "upgrade",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "withdraw",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
	],
	dna: [
		{
			inputs: [
				{
					internalType: "string",
					name: "uri",
					type: "string",
				},
				{
					internalType: "address",
					name: "vrfCoordinator",
					type: "address",
				},
				{
					internalType: "bytes32",
					name: "keyHash",
					type: "bytes32",
				},
				{
					internalType: "uint64",
					name: "subId",
					type: "uint64",
				},
			],
			stateMutability: "nonpayable",
			type: "constructor",
		},
		{
			inputs: [],
			name: "DNA_BatchNotSeeded",
			type: "error",
		},
		{
			inputs: [],
			name: "DNA_CoolDownOngoing",
			type: "error",
		},
		{
			inputs: [],
			name: "DNA_ExceedsMaximumTier",
			type: "error",
		},
		{
			inputs: [],
			name: "DNA_ExtractionOngoing",
			type: "error",
		},
		{
			inputs: [],
			name: "DNA_IncorrectValue",
			type: "error",
		},
		{
			inputs: [],
			name: "DNA_IndexOutOfRange",
			type: "error",
		},
		{
			inputs: [],
			name: "DNA_NothingToReveal",
			type: "error",
		},
		{
			inputs: [],
			name: "DNA_SenderNotAllowed",
			type: "error",
		},
		{
			inputs: [],
			name: "DNA_SenderNotTokenOwner",
			type: "error",
		},
		{
			inputs: [],
			name: "DNA_ValueOutOfRange",
			type: "error",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "have",
					type: "address",
				},
				{
					internalType: "address",
					name: "want",
					type: "address",
				},
			],
			name: "OnlyCoordinatorCanFulfill",
			type: "error",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "account",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "operator",
					type: "address",
				},
				{
					indexed: false,
					internalType: "bool",
					name: "approved",
					type: "bool",
				},
			],
			name: "ApprovalForAll",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "receiver",
					type: "address",
				},
				{
					indexed: true,
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "DNAStolen",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "uint256",
					name: "mutantId",
					type: "uint256",
				},
				{
					indexed: true,
					internalType: "uint64",
					name: "batchId",
					type: "uint64",
				},
				{
					indexed: true,
					internalType: "uint16",
					name: "boostId",
					type: "uint16",
				},
				{
					components: [
						{
							internalType: "uint256",
							name: "tokenId",
							type: "uint256",
						},
						{
							internalType: "uint16",
							name: "criticality",
							type: "uint16",
						},
						{
							internalType: "bool",
							name: "success",
							type: "bool",
						},
					],
					indexed: false,
					internalType: "struct DNA.ExtractionResults",
					name: "results",
					type: "tuple",
				},
			],
			name: "ExtractionComplete",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "previousOwner",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "newOwner",
					type: "address",
				},
			],
			name: "OwnershipTransferred",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "operator",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "from",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "to",
					type: "address",
				},
				{
					indexed: false,
					internalType: "uint256[]",
					name: "ids",
					type: "uint256[]",
				},
				{
					indexed: false,
					internalType: "uint256[]",
					name: "values",
					type: "uint256[]",
				},
			],
			name: "TransferBatch",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "operator",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "from",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "to",
					type: "address",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "id",
					type: "uint256",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "value",
					type: "uint256",
				},
			],
			name: "TransferSingle",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: false,
					internalType: "string",
					name: "value",
					type: "string",
				},
				{
					indexed: true,
					internalType: "uint256",
					name: "id",
					type: "uint256",
				},
			],
			name: "URI",
			type: "event",
		},
		{
			inputs: [],
			name: "CRITICALITY_ENTROPY",
			outputs: [
				{
					internalType: "bytes32",
					name: "",
					type: "bytes32",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "MAX_MUTANT_TIER",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "TOKEN_ELEMENT_ENTROPY",
			outputs: [
				{
					internalType: "bytes32",
					name: "",
					type: "bytes32",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "TOKEN_RARITY_ENTROPY",
			outputs: [
				{
					internalType: "bytes32",
					name: "",
					type: "bytes32",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "account",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "id",
					type: "uint256",
				},
			],
			name: "balanceOf",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address[]",
					name: "accounts",
					type: "address[]",
				},
				{
					internalType: "uint256[]",
					name: "ids",
					type: "uint256[]",
				},
			],
			name: "balanceOfBatch",
			outputs: [
				{
					internalType: "uint256[]",
					name: "",
					type: "uint256[]",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint64",
					name: "",
					type: "uint64",
				},
			],
			name: "batch",
			outputs: [
				{
					internalType: "uint256",
					name: "size",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "seed",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "batchId",
			outputs: [
				{
					internalType: "uint64",
					name: "",
					type: "uint64",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			name: "boosts",
			outputs: [
				{
					internalType: "uint256",
					name: "cost",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "mutantId",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "num",
					type: "uint256",
				},
			],
			name: "completeExtraction",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "mutantId",
					type: "uint256",
				},
			],
			name: "completeExtraction",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "contracts",
			outputs: [
				{
					internalType: "contract IMutants",
					name: "Mutants",
					type: "address",
				},
				{
					internalType: "contract IRWaste",
					name: "RWaste",
					type: "address",
				},
				{
					internalType: "contract IScales",
					name: "Scales",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "coolDown",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "extractionCost",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "freeBoostConfig",
			outputs: [
				{
					internalType: "uint16",
					name: "boostId",
					type: "uint16",
				},
				{
					internalType: "uint64",
					name: "minimumBatchSize",
					type: "uint64",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "index",
					type: "uint256",
				},
			],
			name: "getBoostCost",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "account",
					type: "address",
				},
				{
					internalType: "address",
					name: "operator",
					type: "address",
				},
			],
			name: "isApprovedForAll",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "mutantId",
					type: "uint256",
				},
			],
			name: "isCooledDown",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			name: "mutantInfo",
			outputs: [
				{
					internalType: "uint64",
					name: "batchId",
					type: "uint64",
				},
				{
					internalType: "uint128",
					name: "coolDownStarted",
					type: "uint128",
				},
				{
					internalType: "uint16",
					name: "boostId",
					type: "uint16",
				},
				{
					internalType: "uint8",
					name: "tier",
					type: "uint8",
				},
				{
					internalType: "bool",
					name: "extractionOngoing",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "mutantUpgradeCost",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "owner",
			outputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "requestId",
					type: "uint256",
				},
				{
					internalType: "uint256[]",
					name: "randomWords",
					type: "uint256[]",
				},
			],
			name: "rawFulfillRandomWords",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "renounceOwnership",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "requestConfig",
			outputs: [
				{
					internalType: "bytes32",
					name: "keyHash",
					type: "bytes32",
				},
				{
					internalType: "uint64",
					name: "subId",
					type: "uint64",
				},
				{
					internalType: "uint32",
					name: "callbackGasLimit",
					type: "uint32",
				},
				{
					internalType: "uint16",
					name: "requestConfirmations",
					type: "uint16",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			name: "requestIdToBatchId",
			outputs: [
				{
					internalType: "uint64",
					name: "",
					type: "uint64",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "mutantId",
					type: "uint256",
				},
				{
					internalType: "uint16",
					name: "boostId",
					type: "uint16",
				},
			],
			name: "runExtraction",
			outputs: [],
			stateMutability: "payable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "from",
					type: "address",
				},
				{
					internalType: "address",
					name: "to",
					type: "address",
				},
				{
					internalType: "uint256[]",
					name: "ids",
					type: "uint256[]",
				},
				{
					internalType: "uint256[]",
					name: "amounts",
					type: "uint256[]",
				},
				{
					internalType: "bytes",
					name: "data",
					type: "bytes",
				},
			],
			name: "safeBatchTransferFrom",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "from",
					type: "address",
				},
				{
					internalType: "address",
					name: "to",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "id",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "amount",
					type: "uint256",
				},
				{
					internalType: "bytes",
					name: "data",
					type: "bytes",
				},
			],
			name: "safeTransferFrom",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "operator",
					type: "address",
				},
				{
					internalType: "bool",
					name: "approved",
					type: "bool",
				},
			],
			name: "setApprovalForAll",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					components: [
						{
							internalType: "contract IMutants",
							name: "Mutants",
							type: "address",
						},
						{
							internalType: "contract IRWaste",
							name: "RWaste",
							type: "address",
						},
						{
							internalType: "contract IScales",
							name: "Scales",
							type: "address",
						},
					],
					internalType: "struct DNA.Contracts",
					name: "_contracts",
					type: "tuple",
				},
			],
			name: "setContracts",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "cost",
					type: "uint256",
				},
			],
			name: "setExtractionCost",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					components: [
						{
							internalType: "bytes32",
							name: "keyHash",
							type: "bytes32",
						},
						{
							internalType: "uint64",
							name: "subId",
							type: "uint64",
						},
						{
							internalType: "uint32",
							name: "callbackGasLimit",
							type: "uint32",
						},
						{
							internalType: "uint16",
							name: "requestConfirmations",
							type: "uint16",
						},
					],
					internalType: "struct DNA.RequestConfig",
					name: "_requestConfig",
					type: "tuple",
				},
			],
			name: "setRequestConfig",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					components: [
						{
							internalType: "uint256",
							name: "fee",
							type: "uint256",
						},
						{
							internalType: "bool",
							name: "userFunded",
							type: "bool",
						},
					],
					internalType: "struct DNA.VRFFundingConfig",
					name: "_vrfFundingConfig",
					type: "tuple",
				},
			],
			name: "setVRFFundingConfig",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "bytes4",
					name: "interfaceId",
					type: "bytes4",
				},
			],
			name: "supportsInterface",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "newOwner",
					type: "address",
				},
			],
			name: "transferOwnership",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
				{
					internalType: "uint8",
					name: "tiers",
					type: "uint8",
				},
			],
			name: "upgradeMutant",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			name: "uri",
			outputs: [
				{
					internalType: "string",
					name: "",
					type: "string",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "vrfFundingConfig",
			outputs: [
				{
					internalType: "uint256",
					name: "fee",
					type: "uint256",
				},
				{
					internalType: "bool",
					name: "userFunded",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "withdraw",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
	],
	extractorLab: [
		{
			inputs: [],
			name: "ExtractorLab__CoolDownOngoing",
			type: "error",
		},
		{
			inputs: [],
			name: "ExtractorLab__InvalidTokenAmount",
			type: "error",
		},
		{
			inputs: [],
			name: "ExtractorLab__Paused",
			type: "error",
		},
		{
			inputs: [],
			name: "ExtractorLab__SenderNotTokenOwner",
			type: "error",
		},
		{
			inputs: [],
			name: "ExtractorLab__TokenNotStranded",
			type: "error",
		},
		{
			inputs: [],
			name: "ExtractorLab__TokenNotSupported",
			type: "error",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: false,
					internalType: "uint8",
					name: "version",
					type: "uint8",
				},
			],
			name: "Initialized",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "previousOwner",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "newOwner",
					type: "address",
				},
			],
			name: "OwnershipTransferred",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "uint256",
					name: "mutantId",
					type: "uint256",
				},
				{
					indexed: true,
					internalType: "address",
					name: "mutantOwner",
					type: "address",
				},
			],
			name: "Staked",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "uint256",
					name: "mutantId",
					type: "uint256",
				},
				{
					indexed: true,
					internalType: "address",
					name: "mutantOwner",
					type: "address",
				},
			],
			name: "Unstaked",
			type: "event",
		},
		{
			inputs: [],
			name: "contracts",
			outputs: [
				{
					internalType: "contract IDNA",
					name: "DNA",
					type: "address",
				},
				{
					internalType: "contract IRWaste",
					name: "RWaste",
					type: "address",
				},
				{
					internalType: "contract IScales",
					name: "Scales",
					type: "address",
				},
				{
					internalType: "contract IMutants",
					name: "Mutant",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "_mutantId",
					type: "uint256",
				},
				{
					internalType: "uint16",
					name: "boostId",
					type: "uint16",
				},
				{
					internalType: "uint256",
					name: "_fee",
					type: "uint256",
				},
			],
			name: "extractDna",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "getExtractedDnaId",
			outputs: [
				{
					internalType: "int256",
					name: "",
					type: "int256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "getFee",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "getLastExtractor",
			outputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "getMutantId",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "getMutantOwner",
			outputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "getPauseState",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "getTotalExtractionCost",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					components: [
						{
							internalType: "contract IDNA",
							name: "DNA",
							type: "address",
						},
						{
							internalType: "contract IRWaste",
							name: "RWaste",
							type: "address",
						},
						{
							internalType: "contract IScales",
							name: "Scales",
							type: "address",
						},
						{
							internalType: "contract IMutants",
							name: "Mutant",
							type: "address",
						},
					],
					internalType: "struct KaijuContracts.Contracts",
					name: "_contracts",
					type: "tuple",
				},
				{
					internalType: "uint256",
					name: "_mutantId",
					type: "uint256",
				},
				{
					internalType: "address",
					name: "owner",
					type: "address",
				},
			],
			name: "initialize",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
				{
					internalType: "address",
					name: "",
					type: "address",
				},
				{
					internalType: "uint256[]",
					name: "",
					type: "uint256[]",
				},
				{
					internalType: "uint256[]",
					name: "",
					type: "uint256[]",
				},
				{
					internalType: "bytes",
					name: "",
					type: "bytes",
				},
			],
			name: "onERC1155BatchReceived",
			outputs: [
				{
					internalType: "bytes4",
					name: "",
					type: "bytes4",
				},
			],
			stateMutability: "pure",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
				{
					internalType: "address",
					name: "",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "id",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
				{
					internalType: "bytes",
					name: "",
					type: "bytes",
				},
			],
			name: "onERC1155Received",
			outputs: [
				{
					internalType: "bytes4",
					name: "",
					type: "bytes4",
				},
			],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
				{
					internalType: "address",
					name: "",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
				{
					internalType: "bytes",
					name: "",
					type: "bytes",
				},
			],
			name: "onERC721Received",
			outputs: [
				{
					internalType: "bytes4",
					name: "",
					type: "bytes4",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "owner",
			outputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "to",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "recoveryTransferMutant",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "renounceOwnership",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "setExtractionCost",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "_fee",
					type: "uint256",
				},
			],
			name: "setFee",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "_mutantId",
					type: "uint256",
				},
			],
			name: "stakeMutant",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "bytes4",
					name: "interfaceId",
					type: "bytes4",
				},
			],
			name: "supportsInterface",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "togglePauseState",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "transferDna",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "newOwner",
					type: "address",
				},
			],
			name: "transferOwnership",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "_mutantId",
					type: "uint256",
				},
			],
			name: "unstakeMutant",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "scales",
					type: "uint256",
				},
			],
			name: "withdraw",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
	],
	extractorLabFactory: [
		{
			inputs: [
				{
					internalType: "address",
					name: "_extractorLabAddress",
					type: "address",
				},
			],
			stateMutability: "nonpayable",
			type: "constructor",
		},
		{
			inputs: [],
			name: "ExtractorLabFactory__CloneExists",
			type: "error",
		},
		{
			inputs: [],
			name: "ExtractorLabFactory__SenderNotTokenOwner",
			type: "error",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "uint256",
					name: "mutantId",
					type: "uint256",
				},
				{
					indexed: true,
					internalType: "address",
					name: "contractAddress",
					type: "address",
				},
			],
			name: "LabCreated",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "previousOwner",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "newOwner",
					type: "address",
				},
			],
			name: "OwnershipTransferred",
			type: "event",
		},
		{
			inputs: [],
			name: "ExtractorLab",
			outputs: [
				{
					internalType: "contract IExtractorLab",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "contracts",
			outputs: [
				{
					internalType: "contract IDNA",
					name: "DNA",
					type: "address",
				},
				{
					internalType: "contract IRWaste",
					name: "RWaste",
					type: "address",
				},
				{
					internalType: "contract IScales",
					name: "Scales",
					type: "address",
				},
				{
					internalType: "contract IMutants",
					name: "Mutant",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "mutantId",
					type: "uint256",
				},
			],
			name: "createLab",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "extractorLabAddress",
			outputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "getMutantIds",
			outputs: [
				{
					internalType: "uint256[]",
					name: "",
					type: "uint256[]",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			name: "mutantIds",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			name: "mutantToLab",
			outputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "owner",
			outputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "renounceOwnership",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					components: [
						{
							internalType: "contract IDNA",
							name: "DNA",
							type: "address",
						},
						{
							internalType: "contract IRWaste",
							name: "RWaste",
							type: "address",
						},
						{
							internalType: "contract IScales",
							name: "Scales",
							type: "address",
						},
						{
							internalType: "contract IMutants",
							name: "Mutant",
							type: "address",
						},
					],
					internalType: "struct KaijuContracts.Contracts",
					name: "_contracts",
					type: "tuple",
				},
			],
			name: "setContracts",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "_extractorLabAddress",
					type: "address",
				},
			],
			name: "setExtractorLabAddress",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "newOwner",
					type: "address",
				},
			],
			name: "transferOwnership",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
	],
	scales: [
		{
			inputs: [
				{
					internalType: "address",
					name: "kaiju",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "genesisSupply",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "maxSupply",
					type: "uint256",
				},
				{
					internalType: "address",
					name: "rwaste",
					type: "address",
				},
			],
			stateMutability: "nonpayable",
			type: "constructor",
		},
		{
			inputs: [],
			name: "Scales_FunctionLocked",
			type: "error",
		},
		{
			inputs: [],
			name: "Scales_InsufficientFunds",
			type: "error",
		},
		{
			inputs: [],
			name: "Scales_InvalidTokenAmount",
			type: "error",
		},
		{
			inputs: [],
			name: "Scales_SenderNotTokenOwner",
			type: "error",
		},
		{
			inputs: [],
			name: "Scales_TokenNotStranded",
			type: "error",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "owner",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "spender",
					type: "address",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "value",
					type: "uint256",
				},
			],
			name: "Approval",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: false,
					internalType: "address",
					name: "account",
					type: "address",
				},
			],
			name: "Paused",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "bytes32",
					name: "role",
					type: "bytes32",
				},
				{
					indexed: true,
					internalType: "bytes32",
					name: "previousAdminRole",
					type: "bytes32",
				},
				{
					indexed: true,
					internalType: "bytes32",
					name: "newAdminRole",
					type: "bytes32",
				},
			],
			name: "RoleAdminChanged",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "bytes32",
					name: "role",
					type: "bytes32",
				},
				{
					indexed: true,
					internalType: "address",
					name: "account",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "sender",
					type: "address",
				},
			],
			name: "RoleGranted",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "bytes32",
					name: "role",
					type: "bytes32",
				},
				{
					indexed: true,
					internalType: "address",
					name: "account",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "sender",
					type: "address",
				},
			],
			name: "RoleRevoked",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
				{
					indexed: true,
					internalType: "address",
					name: "from",
					type: "address",
				},
			],
			name: "Stake",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "from",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "to",
					type: "address",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "value",
					type: "uint256",
				},
			],
			name: "Transfer",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: false,
					internalType: "address",
					name: "account",
					type: "address",
				},
			],
			name: "Unpaused",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
				{
					indexed: true,
					internalType: "address",
					name: "to",
					type: "address",
				},
			],
			name: "Unstake",
			type: "event",
		},
		{
			inputs: [],
			name: "BASE_RATE",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "CREDITOR_ROLE",
			outputs: [
				{
					internalType: "bytes32",
					name: "",
					type: "bytes32",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "DEFAULT_ADMIN_ROLE",
			outputs: [
				{
					internalType: "bytes32",
					name: "",
					type: "bytes32",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "GENESIS_BONUS",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "KAIJU",
			outputs: [
				{
					internalType: "contract IKaijuKingz",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "MAX_PER_TX",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "RWASTE",
			outputs: [
				{
					internalType: "contract IRWaste",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "RWASTE_MANAGER",
			outputs: [
				{
					internalType: "bytes32",
					name: "",
					type: "bytes32",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "SPENDER_ROLE",
			outputs: [
				{
					internalType: "bytes32",
					name: "",
					type: "bytes32",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
			],
			name: "accountInfo",
			outputs: [
				{
					internalType: "uint16",
					name: "shares",
					type: "uint16",
				},
				{
					internalType: "uint128",
					name: "lastUpdate",
					type: "uint128",
				},
				{
					internalType: "uint256",
					name: "stash",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "owner",
					type: "address",
				},
				{
					internalType: "address",
					name: "spender",
					type: "address",
				},
			],
			name: "allowance",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "spender",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "amount",
					type: "uint256",
				},
			],
			name: "approve",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "spender",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "amount",
					type: "uint256",
				},
			],
			name: "approveRWaste",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "account",
					type: "address",
				},
			],
			name: "balanceOf",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "claimRWaste",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "to",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "amount",
					type: "uint256",
				},
			],
			name: "credit",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "decimals",
			outputs: [
				{
					internalType: "uint8",
					name: "",
					type: "uint8",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "spender",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "subtractedValue",
					type: "uint256",
				},
			],
			name: "decreaseAllowance",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "amount",
					type: "uint256",
				},
			],
			name: "deposit",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "flipPaused",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "bytes4",
					name: "",
					type: "bytes4",
				},
			],
			name: "functionLocked",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "account",
					type: "address",
				},
			],
			name: "getAllOwned",
			outputs: [
				{
					internalType: "uint256[]",
					name: "",
					type: "uint256[]",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "bytes32",
					name: "role",
					type: "bytes32",
				},
			],
			name: "getRoleAdmin",
			outputs: [
				{
					internalType: "bytes32",
					name: "",
					type: "bytes32",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "account",
					type: "address",
				},
			],
			name: "getSpendable",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "bytes32",
					name: "role",
					type: "bytes32",
				},
				{
					internalType: "address",
					name: "account",
					type: "address",
				},
			],
			name: "grantRole",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "bytes32",
					name: "role",
					type: "bytes32",
				},
				{
					internalType: "address",
					name: "account",
					type: "address",
				},
			],
			name: "hasRole",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "spender",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "addedValue",
					type: "uint256",
				},
			],
			name: "increaseAllowance",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "bytes4",
					name: "id",
					type: "bytes4",
				},
			],
			name: "lockFunction",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "name",
			outputs: [
				{
					internalType: "string",
					name: "",
					type: "string",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
				{
					internalType: "address",
					name: "",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
				{
					internalType: "bytes",
					name: "",
					type: "bytes",
				},
			],
			name: "onERC721Received",
			outputs: [
				{
					internalType: "bytes4",
					name: "",
					type: "bytes4",
				},
			],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "ownerOf",
			outputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "paused",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "to",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
			],
			name: "recoveryTransfer",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "bytes32",
					name: "role",
					type: "bytes32",
				},
				{
					internalType: "address",
					name: "account",
					type: "address",
				},
			],
			name: "renounceRole",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "bytes32",
					name: "role",
					type: "bytes32",
				},
				{
					internalType: "address",
					name: "account",
					type: "address",
				},
			],
			name: "revokeRole",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "from",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "amount",
					type: "uint256",
				},
			],
			name: "spend",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256[]",
					name: "tokenIds",
					type: "uint256[]",
				},
			],
			name: "stake",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "account",
					type: "address",
				},
			],
			name: "stash",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "bytes4",
					name: "interfaceId",
					type: "bytes4",
				},
			],
			name: "supportsInterface",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "symbol",
			outputs: [
				{
					internalType: "string",
					name: "",
					type: "string",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			name: "tokenOwners",
			outputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "totalSupply",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "to",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "amount",
					type: "uint256",
				},
			],
			name: "transfer",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "from",
					type: "address",
				},
				{
					internalType: "address",
					name: "to",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "amount",
					type: "uint256",
				},
			],
			name: "transferFrom",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256[]",
					name: "tokenIds",
					type: "uint256[]",
				},
			],
			name: "unstake",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "withdraw",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "amount",
					type: "uint256",
				},
			],
			name: "withdrawSome",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
	],
	rwaste: [
		{
			inputs: [
				{
					internalType: "address",
					name: "kaijuAddress",
					type: "address",
				},
			],
			stateMutability: "nonpayable",
			type: "constructor",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "owner",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "spender",
					type: "address",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "value",
					type: "uint256",
				},
			],
			name: "Approval",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "previousOwner",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "newOwner",
					type: "address",
				},
			],
			name: "OwnershipTransferred",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "from",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "to",
					type: "address",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "value",
					type: "uint256",
				},
			],
			name: "Transfer",
			type: "event",
		},
		{
			inputs: [],
			name: "BASE_RATE",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "KaijuKingz",
			outputs: [
				{
					internalType: "contract iKaijuKingz",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "START",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "owner",
					type: "address",
				},
				{
					internalType: "address",
					name: "spender",
					type: "address",
				},
			],
			name: "allowance",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
			],
			name: "allowedAddresses",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "spender",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "amount",
					type: "uint256",
				},
			],
			name: "approve",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "account",
					type: "address",
				},
			],
			name: "balanceOf",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "user",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "amount",
					type: "uint256",
				},
			],
			name: "burn",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "_address",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "_amount",
					type: "uint256",
				},
			],
			name: "claimLaboratoryExperimentRewards",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "claimReward",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "decimals",
			outputs: [
				{
					internalType: "uint8",
					name: "",
					type: "uint8",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "spender",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "subtractedValue",
					type: "uint256",
				},
			],
			name: "decreaseAllowance",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "user",
					type: "address",
				},
			],
			name: "getTotalClaimable",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "spender",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "addedValue",
					type: "uint256",
				},
			],
			name: "increaseAllowance",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
			],
			name: "lastUpdate",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "name",
			outputs: [
				{
					internalType: "string",
					name: "",
					type: "string",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "owner",
			outputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "renounceOwnership",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
			],
			name: "rewards",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "_address",
					type: "address",
				},
				{
					internalType: "bool",
					name: "_access",
					type: "bool",
				},
			],
			name: "setAllowedAddresses",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "symbol",
			outputs: [
				{
					internalType: "string",
					name: "",
					type: "string",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "toggleReward",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "totalSupply",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "to",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "amount",
					type: "uint256",
				},
			],
			name: "transfer",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "from",
					type: "address",
				},
				{
					internalType: "address",
					name: "to",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "amount",
					type: "uint256",
				},
			],
			name: "transferFrom",
			outputs: [
				{
					internalType: "bool",
					name: "",
					type: "bool",
				},
			],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "newOwner",
					type: "address",
				},
			],
			name: "transferOwnership",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "from",
					type: "address",
				},
				{
					internalType: "address",
					name: "to",
					type: "address",
				},
			],
			name: "updateReward",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
	],
}

export default abis
