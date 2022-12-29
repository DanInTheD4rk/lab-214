import React, { useEffect, useState, useCallback } from "react"
import "mapbox-gl/dist/mapbox-gl.css"
import mapboxgl from "!mapbox-gl"
import Profile from "../../components/appInfo/Profile"
import AppInfo from "../../components/appInfo/AppInfo"
import Map, { Marker } from "react-map-gl"
import marker from "../../public/marker.png"
import { signIn, useSession } from "next-auth/react"

const styles = {
	button:
		"px-6 py-2.5 w-full bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out",
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX
const contributors = [<Profile user="DanInTheD4rk" />]

const locator = () => {
	const { data: session } = useSession()
	const [coordinates, setCoordinates] = useState({ longitude: 139.8, latitude: 35.68 })
	const [points, setPoints] = useState([])

	useEffect(() => {
		console.log(coordinates)
	}, [coordinates])

	const test = () => {
		let t = {
			id: 1,
			longitude: coordinates.longitude,
			latitude: coordinates.latitude,
		}
		console.log(coordinates)
		setPoints([t])
	}

	const onMarkerDragEnd = useCallback((event) => {
		setCoordinates({
			longitude: event.lngLat.lng,
			latitude: event.lngLat.lat,
		})
	}, [])

	return (
		<>
			<div className="mx-10 my-20">
				<AppInfo contracts={[]} contributors={contributors} />

				<div className="flex flex-wrap mt-6">
					{!session && (
						<button
							type="button"
							className={`m-10 ${styles.button}`}
							onClick={() => signIn("discord", { callbackUrl: "", redirect: true }, { prompt: "none" })}
						>
							Log In
						</button>
					)}
					<button type="button" className={`m-10 ${styles.button}`} onClick={() => test()}>
						Add Test
					</button>
					{session && (
						<div className="w-full min-h-[600px]">
							<Map
								reuseMaps
								initialViewState={{
									longitude: 139.8,
									latitude: 35.68,
									zoom: 2,
									minZoom: 2,
									maxZoom: 15,
								}}
								mapStyle="mapbox://styles/mapbox/streets-v12"
							>
								{points.length === 0 && (
									<Marker
										longitude={coordinates.longitude}
										latitude={coordinates.latitude}
										anchor="bottom"
										draggable={true}
										onDragEnd={onMarkerDragEnd}
									>
										<img className="max-h-[24px]" src={marker.src} />
									</Marker>
								)}
								{points.map((point) => (
									<Marker key={point.id} longitude={point.longitude} latitude={point.latitude}>
										<img className="max-h-[24px] rounded-full border-2 border-red-600" src={session.user.image} />
									</Marker>
								))}
							</Map>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default locator
