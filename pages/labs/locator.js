import React, { useEffect, useState, useCallback, useMemo } from "react"
import "mapbox-gl/dist/mapbox-gl.css"
import mapboxgl from "!mapbox-gl"
import Profile from "../../components/appInfo/Profile"
import AppInfo from "../../components/appInfo/AppInfo"
import Map, { Marker, Layer, Feature, Popup } from "react-map-gl"
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
	const [locations, setLocations] = useState([])
	const [hasUserLocation, setHasUserLocation] = useState(false)
	const [popupInfo, setPopupInfo] = useState()

	const markers = useMemo(
		() =>
			locations.map((location) => (
				<Marker
					key={location.userId}
					longitude={location.longitude}
					latitude={location.latitude}
					onClick={async (e) => {
						e.originalEvent.stopPropagation()
						setPopupInfo(location)
					}}
					anchor="top"
				>
					<img className="z-40 max-h-[24px] rounded-full" src={location.imageUrl} />
				</Marker>
			)),
		[locations]
	)

	useEffect(() => {
		if (session && session.user) {
			const userLocation = locations.find((location) => location.userId === session.user.id)
			setHasUserLocation(userLocation ? true : false)
		}
	}, [session, locations])

	useEffect(() => {
		;(async () => {
			await fetch("/api/location")
				.then(async (res) => {
					setLocations(await res.json())
				})
				.catch((e) => console.log(e))
		})()
	}, [])

	const saveLocation = () => {
		const body = {
			userId: session.user.id,
			longitude: coordinates.longitude,
			latitude: coordinates.latitude,
			imageUrl: session.user.image,
			user: { name: session.user.name },
		}

		fetch("/api/location", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		}).then(setLocations([...locations, body]))
	}

	const removeLocation = () => {
		fetch("/api/location", {
			method: "DELETE",
			body: JSON.stringify({
				userId: session.user.id,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		}).then(setLocations(locations.filter((location) => location.userId !== session.user.id)))
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
					<button
						type="button"
						className={`m-10 ${styles.button}`}
						onClick={hasUserLocation ? () => removeLocation() : () => saveLocation()}
					>
						{hasUserLocation ? "Remove Location" : "Save Location"}
					</button>
					{session && (
						<div className="w-full min-h-[600px]">
							<Map
								reuseMaps
								{...coordinates}
								initialViewState={{
									longitude: 139.8,
									latitude: 35.68,
									zoom: 2,
									minZoom: 2,
									maxZoom: 15,
								}}
								onMove={(evt) => setCoordinates(evt.viewState)}
								mapStyle="mapbox://styles/mapbox/streets-v12"
							>
								{!hasUserLocation && (
									<Marker
										longitude={coordinates.longitude}
										latitude={coordinates.latitude}
										draggable={true}
										onDragEnd={onMarkerDragEnd}
									>
										<img className="max-h-[24px]" src={marker.src} />
									</Marker>
								)}
								{markers}
								{popupInfo && (
									<Popup
										anchor="bottom"
										longitude={popupInfo.longitude}
										latitude={popupInfo.latitude}
										onClose={() => setPopupInfo(null)}
									>
										<h3 className="mr-2 font-bold">{popupInfo.user.name}</h3>
									</Popup>
								)}
							</Map>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default locator
