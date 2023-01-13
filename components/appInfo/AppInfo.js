import { Fragment } from "react"
import { Disclosure, Transition } from "@headlessui/react"
import { InformationCircleIcon } from "@heroicons/react/20/solid"
import { PROJECTS } from "constants/projectInfo"

const styles = {
	infoTitle: "flex flex-row items-center text-white mr-2",
	infoBlock: "flex flex-row flex-wrap ",
}

function classNames(...classes) {
	return classes.filter(Boolean).join(" ")
}

const NETWORK = process.env.NEXT_PUBLIC_NETWORK

const AppInfo = ({ contracts = [], contributors = [], auditors = [], projectId }) => {
	const contractLinks = contracts.map((address) => {
		let url = NETWORK === "homestead" ? "https://" : "https://goerli."
		url += `etherscan.io/address/${address}#code`
		return (
			<>
				<a
					className="hidden md:block text-gray-300 hover:text-white hover:underline"
					href={url}
					target="_blank"
					rel="noopener noreferrer"
				>
					{address}
				</a>
				<a
					className="md:hidden text-gray-300 hover:text-white hover:underline"
					href={url}
					target="_blank"
					rel="noopener noreferrer"
				>
					{address.slice(0, 6) + "..." + address.slice(-4)}
				</a>
			</>
		)
	})

	return (
		<Disclosure>
			{({ open }) => (
				<>
					<Disclosure.Button className="pt-2 px-5 font-bold text-white flex flex-row items-center justify-center">
						Application Info
						<InformationCircleIcon
							className={classNames(
								open ? "text-gray-300" : "text-gray-300",
								"mt-1 ml-2 h-5 w-5 group-hover:text-gray-700"
							)}
							aria-hidden="true"
						/>
					</Disclosure.Button>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-300"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1"
					>
						<Disclosure.Panel className="fixed z-10 text-gray-500">
							<div className="overflow-hidden m-4 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
								<div className="relative grid gap-6 bg-slate-800 px-5 py-6 sm:gap-8 sm:p-8">
									{PROJECTS[projectId].description && (
										<div className={styles.infoBlock}>
											<div className={styles.infoTitle + " items-baseline"}>About: </div>
											<div className="max-w-md text-white text-sm">{PROJECTS[projectId].description}</div>
										</div>
									)}

									<div className={styles.infoBlock}>
										<div className={styles.infoTitle}>Contributors: </div>
										{contributors.slice(0, 5).map((contributor, idx) => (
											<div key={idx}>{contributor}</div>
										))}
									</div>

									{auditors.length > 0 ? (
										<div className={styles.infoBlock}>
											<div className={styles.infoTitle}>Audited By: </div>
											{auditors.slice(0, 5).map((auditor, idx) => (
												<div key={idx}>{auditor}</div>
											))}
										</div>
									) : null}

									{contracts.length > 0 ? (
										<div className={styles.infoBlock}>
											<div className={styles.infoTitle + " items-baseline"}>Contracts: </div>
											<div className="flex flex-col">
												{contractLinks.map((link, idx) => (
													<div key={idx}>{link}</div>
												))}
											</div>
										</div>
									) : null}
								</div>
							</div>
						</Disclosure.Panel>
					</Transition>
				</>
			)}
		</Disclosure>
	)
}

export default AppInfo
