const Spinner = () => {
	return (
		<div className="fixed z-50 bg-opacity-50 grid w-screen h-screen place-content-center bg-gray-900">
			<div className="flex items-center gap-2 text-gray-500">
				<span className="h-10 w-10 block rounded-full border-4 border-t-blue-300 animate-spin"></span>
			</div>
		</div>
	)
}

export default Spinner
