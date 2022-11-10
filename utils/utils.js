export const checkIfZeroAddress = (address) => {
	const splitAddress = address.split("")
	let unique = new Set(splitAddress)
	return unique.size < 3
}
