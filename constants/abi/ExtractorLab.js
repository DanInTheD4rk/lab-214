const extractorLabAbis = {
	31337: [
		{
			inputs: [],
			name: "ExtractorLab__CoolDownOngoing",
			type: "error",
		},
		{
			inputs: [],
			name: "ExtractorLab__IncorrectMutant",
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
			],
			name: "extractDna",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "getExtractionCost",
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
					name: "operator",
					type: "address",
				},
				{
					internalType: "address",
					name: "from",
					type: "address",
				},
				{
					internalType: "uint256[]",
					name: "ids",
					type: "uint256[]",
				},
				{
					internalType: "uint256[]",
					name: "values",
					type: "uint256[]",
				},
				{
					internalType: "bytes",
					name: "data",
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
			inputs: [
				{
					internalType: "uint256",
					name: "_mutantId",
					type: "uint256",
				},
			],
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
				{
					internalType: "uint256",
					name: "rwaste",
					type: "uint256",
				},
			],
			name: "withdraw",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
	],
}

export default ExtractorLabAbis
