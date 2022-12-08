export const ACTION_TYPES = {
	CREATE: "Create Lab",
	STAKE: "Stake",
	UNSTAKE: "Unstake",
}

export const MUTANT_TIERS = {
	0: "F",
	1: "E",
	2: "D",
	3: "C",
	4: "B",
	5: "A",
	6: "S",
}

export const BOOST_OPTIONS = [
	{ id: 0, value: "0", name: "Default", probability: "(1%, 4%, 15%, 30%, 50%)" },
	{ id: 1, value: "200", name: "Basic Boost", probability: "(2%, 8%, 25%, 45%, 20%)" },
	{ id: 2, value: "100", name: "No Commons", probability: "(1%, 4%, 15%, 80%, 0%)" },
	{ id: 3, value: "75", name: "50/50 Rare/Common", probability: "(0%, 0%, 50%, 0%, 50%)" },
	{ id: 4, value: "500", name: "Flattened", probability: "(20%, 20%, 20%, 20%, 20%)" },
	{ id: 5, value: "750", name: "Always Epic", probability: "(0%, 100%, 0%, 0%, 0%)" },
]
