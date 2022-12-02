import Avatar from "../Avatar"
import { importAllImages } from "../../utils/utils"

const pfps = importAllImages(require.context("../../public/profilePics", false, /\.(png|jpe?g|svg)$/))

// "user" must have an image in profilePics with matching name
const Contributor = ({ user, size = 30 }) => {
	return (
		<div className="m-1 rounded-full bg-gray-700 flex flex-row p-2 items-center w-fit text-white hover:bg-gray-600">
			<Avatar ensImage={pfps[user].src} size={size} />
			<div className="text-base mx-3">{user}</div>
		</div>
	)
}

export default Contributor
