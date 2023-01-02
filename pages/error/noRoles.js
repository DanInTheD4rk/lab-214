const NoRoles = () => {
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<h1 className="text-white text-2xl border-r-[1px] border-r-slate-500 mr-6 px-6 py-2">401</h1>
			<div className="text-white text-sm">
				<div>Must be a part of the Kaiju Kingz server and have a Genesis, Baby, or Mutant role</div>
				<div>
					<span>Join the discord here:</span>
					<a href="https://discord.gg/kaiju-kingz" className="ml-2 text-blue-600 text-sm hover:text-white">
						https://discord.gg/kaiju-kingz
					</a>
				</div>
			</div>
		</div>
	)
}

export default NoRoles
