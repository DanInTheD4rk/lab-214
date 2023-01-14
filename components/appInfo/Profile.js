import Avatar from "../Avatar"
import { importAllImages } from "utils/utils"

const pfps = importAllImages(require.context("public/profilePics", false, /\.(png|jpe?g|svg)$/))

const Profile = ({ user, size = 30, pfp }) => {
	const displayName = user.length > 15 ? user.slice(0, 15) + "..." : user
	return (
		<div className="m-1 rounded-full bg-gray-700 flex flex-row p-2 items-center w-fit text-white hover:bg-gray-600">
			<Avatar ensImage={(pfps[user] && pfps[user].src) || pfp} size={size} />
			<div className="whitespace-nowrap text-sm mx-3">{displayName}</div>
		</div>
	)
}

export default Profile
