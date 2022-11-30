import NavBar from "./NavBar"
import bg from "../public/bgLogoless.png"

const Layout = ({ children }) => {
	return (
		<div
			className="fixed bg-no-repeat bg-center bg-cover min-w-full min-h-screen"
			style={{ backgroundImage: `url(${bg.src})` }}
		>
			<NavBar />
			{children}
		</div>
	)
}

export default Layout
