import Head from "next/head"
import logo from "public/icons/logoBordered.png"
import github from "public/icons/github.png"

export default function Home() {
	return (
		<>
			<Head>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff" />
			</Head>
			<div className="absolute flex flex-col justify-center items-center content-center h-full w-full min-w-max min-h-100">
				<img className="h-44 w-auto" src={logo.src}></img>
			</div>
			<a href="https://github.com/DanInTheD4rk/lab-214">
				<img className="absolute left-12 bottom-5 h-10 w-auto rounded-full" src={github.src}></img>
			</a>
		</>
	)
}
