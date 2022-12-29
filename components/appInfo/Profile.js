import Avatar from "../Avatar"
import { importAllImages } from "../../utils/utils"

const pfps = importAllImages(require.context("../../public/profilePics", false, /\.(png|jpe?g|svg)$/))

const Profile = ({ user, size = 30, pfp }) => {
	return (
		<div className="m-1 rounded-full bg-gray-700 flex flex-row p-2 items-center w-fit text-white hover:bg-gray-600">
			<Avatar ensImage={(pfps[user] && pfps[user].src) || pfp} size={size} />
			<div className="text-base mx-3">{user}</div>
		</div>
	)
}

export default Profile
