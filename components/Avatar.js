import Jazzicon, { jsNumberForAddress } from "react-jazzicon"
import { ethers } from "ethers"

const Avatar = ({ address, ensImage, size }) => {
	return ensImage ? (
		<img src={ensImage} width={size} height={size} style={{ borderRadius: size }} />
	) : (
		<Jazzicon diameter={size} seed={jsNumberForAddress(address) || ethers.constants.AddressZero} />
	)
}

export default Avatar
