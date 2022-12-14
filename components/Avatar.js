import Jazzicon, { jsNumberForAddress } from "react-jazzicon"
import { ethers } from "ethers"
import failed from "../public/failed.png"

const Avatar = ({ address, ensImage, size }) => {
	if (ensImage) {
		return <img src={ensImage} width={size} height={size} style={{ borderRadius: size }} />
	} else if (address) {
		return <Jazzicon diameter={size} seed={jsNumberForAddress(address) || ethers.constants.AddressZero} />
	} else {
		return <img src={failed.src} width={size} height={size} style={{ borderRadius: size }} />
	}
}

export default Avatar
