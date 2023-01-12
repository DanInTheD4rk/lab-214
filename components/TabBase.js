import { useState } from "react"
import AppInfo from "./appInfo/AppInfo"
import PropTypes from "prop-types"

const TabBase = ({ tabs: tabs, appInfo: { contributors, contracts, projectId } }) => {
	const [openTab, setOpenTab] = useState(0)

	const tabTitles = []
	const tabContent = []

	tabs.forEach((tab, idx) => {
		tabTitles.push(
			<li key={idx} className="-mb-px mr-2 last:mr-0 flex-auto text-center">
				<a
					className={
						"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
						(openTab === idx ? "text-black bg-white bg-opacity-80" : "text-white bg-gray-800 bg-opacity-60")
					}
					onClick={(e) => {
						e.preventDefault()
						setOpenTab(idx)
					}}
					data-toggle="tab"
					href={"#link" + idx}
					role="tablist"
				>
					<i className="text-base mr-1"></i> {tab.title}
				</a>
			</li>
		)
		tabContent.push(
			<div key={idx} className={openTab === idx ? "block" : "hidden"} id={"link" + idx}>
				{tab.content}
			</div>
		)
	})

	return (
		<div className="mx-10 my-20">
			<AppInfo contributors={contributors} projectId={projectId} />

			<div className="flex flex-wrap">
				<div className="w-full">
					<ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
						{tabTitles}
					</ul>

					<div className="unset flex flex-col min-w-0 break-words bg-gray-800 w-full mb-6 shadow-lg rounded bg-opacity-60">
						<div className="px-4 py-5 flex-auto">
							<div className="tab-content tab-space">{tabContent}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TabBase

TabBase.propTypes = {
	tabs: PropTypes.array,
	contributors: PropTypes.array,
	projectId: PropTypes.number,
}
