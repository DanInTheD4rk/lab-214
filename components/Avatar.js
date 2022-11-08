import Jazzicon, { jsNumberForAddress } from "react-jazzicon"

const Avatar = ({ address, ensImage, size }) => {
	return ensImage ? (
		<img src={ensImage} width={size} height={size} style={{ borderRadius: size }} />
	) : (
		<Jazzicon diameter={size} seed={jsNumberForAddress(address)} />
	)
}

export default Avatar
