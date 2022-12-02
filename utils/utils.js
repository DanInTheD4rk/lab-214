export const checkIfZeroAddress = (address) => {
	const splitAddress = address.split("")
	let unique = new Set(splitAddress)
	return unique.size < 3
}

export const importAllImages = (context) => {
	let images = {}
	context.keys().forEach((item) => {
		images[item.slice(0, item.lastIndexOf(".")).replace("./", "")] = context(item).default
	})
	return images
}
