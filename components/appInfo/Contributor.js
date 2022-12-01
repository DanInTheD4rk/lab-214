import Avatar from "../Avatar"

function importAll(context) {
	let images = {}
	context.keys().forEach((item) => {
		images[item.slice(0, item.lastIndexOf(".")).replace("./", "")] = context(item).default
	})
	return images
}

const pfps = importAll(require.context("../../public/profilePics", false, /\.(png|jpe?g|svg)$/))

// "user" must have an image in profilePics with matching name
const Contributor = ({ user, size = 30 }) => {
	return (
		<div className="m-1 rounded-full bg-gray-700 flex flex-row p-2 items-center w-fit text-white hover:bg-gray-600">
			<Avatar ensImage={pfps[user].src} size={size} />
			<div className="mx-3">{user}</div>
		</div>
	)
}

export default Contributor
