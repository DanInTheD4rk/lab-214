import { useEffect, useState } from "react"
import MutantTile from "./MutantTile"
import PropTypes from "prop-types"

const styles = {
	button:
		"px-6 py-2.5 bg-gray-600 text-white font-medium text-xs font-bold leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out",
	tierButton:
		"w-full hover:bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out",
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const Extraction = (props) => {
	const [mutantTiles, setMutantTiles] = useState(null)

	useEffect(() => {
		const tiles = {}
		fetch(BASE_URL + "/mutant/staked/all")
			.then((resp) => resp.json())
			.then((stakedMutants) => {
				stakedMutants.forEach((mutant) => {
					tiles[mutant.id] = (
						<MutantTile
							key={mutant.id}
							provider={props.provider}
							signerAddress={props.signerAddress}
							contracts={props.contracts}
							mutant={mutant}
						/>
					)
				})
				setMutantTiles(tiles)
			})
			.catch((error) => {
				// enter your logic for when there is an error (ex. error toast)
				console.log(error)
			})
	}, [])

	return (
		<div>
			<div className="flex flex-row flex-wrap justify-center">{mutantTiles && [...Object.values(mutantTiles)]}</div>
		</div>
	)
}

export default Extraction

Extraction.propTypes = {
	signerAddress: PropTypes.string,
	provider: PropTypes.object,
	contracts: PropTypes.object,
}
