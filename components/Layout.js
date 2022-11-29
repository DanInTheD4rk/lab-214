import NavBar from "./NavBar"
import bg from "../public/bgLogoless.png"

const Layout = ({ children }) => {
	return (
		<div
			className="absolute bg-no-repeat bg-center bg-cover min-w-full min-h-full overflow:clip"
			style={{ backgroundImage: `url(${bg.src})` }}
		>
			<NavBar />
			{children}
		</div>
	)
}

export default Layout
