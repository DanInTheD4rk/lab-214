import { importAllImages } from "utils/utils"
import { PROJECTS } from "constants/projectInfo"
import { CONTRIBUTORS } from "constants/contributorInfo"
import Profile from "components/appInfo/Profile"

const previews = importAllImages(require.context("../public/projectPreviews", false, /\.(png|jpe?g|svg)$/))
const externalTools = [9, 4, 3, 6, 7, 5, 2]

const External = () => {
	return (
		<>
			<div className="mx-4 mt10 lg:mx-10 lg:mt-10 flex justify-center">
				<div className="flex flex-wrap">
					<div className="w-fit">
						<div className="unset flex flex-col min-w-0 break-words bg-white w-full mb-6 mt-20 shadow-lg rounded bg-opacity-25">
							<div className="px-4 py-5 flex-auto">
								{externalTools.map((project) => {
									return <ProjectTile preview={previews[PROJECTS[project].preview].src} info={PROJECTS[project]} />
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

const ProjectTile = ({ preview, info }) => {
	return (
		<div className="flex flex-wrap w-full p-5 bg-gray-900 rounded my-7">
			<a href={info.url}>
				<img src={preview} className="w-96 y-auto rounded-md mb-2" />
			</a>
			<div className="md:ml-6 text-2xl text-white">
				<a href={info.url} className="hover:underline">
					{info.name}
				</a>
				<div className="flex flex-wrap flex-row text-base items-center mt-2">
					<p className="mr-3">Contributors:</p>
					{info.contributorIds.map((id) => (
						<Profile user={CONTRIBUTORS[id].name} />
					))}
				</div>
				<div className="flex flex-wrap flex-row text-base items-center mb-4">
					{info.auditorIds.length > 0 ? (
						<div className="flex flex-row flex-wrap">
							<div className="flex flex-row items-center text-white mr-2">Audited By: </div>
							{info.auditorIds.map((id) => (
								<Profile user={CONTRIBUTORS[id].name} />
							))}
						</div>
					) : null}
				</div>
				<p className="text-sm max-w-lg">{info.description}</p>
			</div>
		</div>
	)
}

export default External
