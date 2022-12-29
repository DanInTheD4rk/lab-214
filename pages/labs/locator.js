import React, { useRef, useEffect, useState } from "react"
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

	return (
		<>
			<div className="mx-10 my-20">
				<AppInfo contracts={[]} contributors={contributors} />

				<div className="flex flex-wrap mt-6">
					{!session && (
						<button type="button" className={`m-10 ${styles.button}`} onClick={() => signIn()}>
							Log In
						</button>
					)}
					{session && (
						<div className="w-full min-h-[600px]">
							<Map
								initialViewState={{
									longitude: 139.8,
									latitude: 35.68,
									zoom: 2,
									minZoom: 2,
									maxZoom: 15,
								}}
								mapStyle="mapbox://styles/mapbox/streets-v12"
							>
								<Marker longitude={139.8} latitude={35.68} anchor="bottom" draggable={true}>
									<img className="max-h-[24px]" src={marker.src} />
								</Marker>
							</Map>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default locator
