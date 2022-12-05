import Head from "next/head"
import styles from "../styles/Home.module.css"
import TWHeader from "../components/NavBar"
import logo from "../public/logoBordered.png"
import github from "../public/github.png"

export default function Home() {
	return (
		<>
			<div className="absolute flex flex-col justify-center items-center content-center h-full w-full min-w-max min-h-100">
				<img className="h-44 w-auto" src={logo.src}></img>
			</div>
			<a href="https://github.com/DanInTheD4rk/lab-214-client">
				<img className="absolute left-12 bottom-5 h-10 w-auto rounded-full" src={github.src}></img>
			</a>
		</>
	)
}
