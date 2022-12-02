import { Fragment } from "react"
import { Disclosure, Menu, Transition, Popover } from "@headlessui/react"
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import Spinner from "./Spinner"
import { useLoading } from "./LoadingContext"
import logo from "../public/logoBordered.png"

const navigation = [
	{ name: "External Tools", href: "/externalTools", current: false },
	// { name: "Learn", href: "#", current: false },
	// { name: "About", href: "/about", current: false },
]

const labs = [
	{
		name: "DNA Extractor",
		description: "Stake or use Mutants for DNA extraction",
		href: "/labs/dnaExtractor",
	},
]

function classNames(...classes) {
	return classes.filter(Boolean).join(" ")
}

export default function NavBar() {
	const { loading } = useLoading()
	return (
		<>
			{loading && <Spinner />}
			<Disclosure as="nav" className="bg-black-800 z-50 inset-0 absolute w-full h-16">
				{({ open }) => (
					<>
						<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
							<div className="relative flex h-16 items-center justify-between">
								{/* Mobile menu button*/}
								<div className="absolute inset-y-0 left-0 flex items-center md:hidden">
									<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
										) : (
											<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
										)}
									</Disclosure.Button>
								</div>

								<div className="flex flex-1 items-center justify-center sm:items-stretch md:justify-start">
									<div className="flex flex-shrink-0 items-center">
										<img className="block h-8 w-auto lg:hidden" src={logo.src} alt="Lab214" />
										<img className="hidden h-8 w-auto lg:block" src={logo.src} alt="Lab214" />
									</div>
									<div className="hidden sm:ml-6 sm:block">
										<div className="flex space-x-4">
											<Popover.Group as="nav" className="hidden space-x-10 md:flex">
												<Popover className="relative">
													{({ open }) => (
														<>
															<Popover.Button
																className={classNames(
																	open
																		? "bg-gray-900 text-white"
																		: "bg-slate-900 bg-opacity-40 text-white hover:bg-slate-900 hover:text-gray-300 hover:bg-opacity-70",
																	"px-3 py-2 rounded-md text-md font-medium flex items-center"
																)}
															>
																<span>Labs</span>
																<ChevronDownIcon
																	className={classNames(
																		open ? "text-gray-300" : "text-gray-300",
																		"mt-1 ml-2 h-5 w-5 group-hover:text-gray-700"
																	)}
																	aria-hidden="true"
																/>
															</Popover.Button>

															<Transition
																as={Fragment}
																enter="transition ease-out duration-200"
																enterFrom="opacity-0 translate-y-1"
																enterTo="opacity-100 translate-y-0"
																leave="transition ease-in duration-150"
																leaveFrom="opacity-100 translate-y-0"
																leaveTo="opacity-0 translate-y-1"
															>
																<Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0  ">
																	<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
																		<div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
																			{labs.map((lab) => (
																				<a
																					key={lab.name}
																					href={lab.href}
																					className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
																				>
																					<div className="ml-4">
																						<p className="text-base font-medium text-gray-900">{lab.name}</p>
																						<p className="mt-1 text-sm text-gray-500">{lab.description}</p>
																					</div>
																				</a>
																			))}
																		</div>
																	</div>
																</Popover.Panel>
															</Transition>
														</>
													)}
												</Popover>
											</Popover.Group>

											{navigation.map((item) => (
												<Link
													key={item.name}
													href={item.href}
													className={classNames(
														item.current
															? "bg-gray-900 text-white"
															: "bg-slate-900 bg-opacity-40 text-white hover:bg-slate-900 hover:text-gray-300 hover:bg-opacity-70",
														"px-3 py-2 rounded-md text-md font-medium"
													)}
													aria-current={item.current ? "page" : undefined}
												>
													{item.name}
												</Link>
											))}
										</div>
									</div>
								</div>
								<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
									<ConnectButton label="Connect Wallet" showBalance={false} accountStatus="address" />
								</div>
							</div>
						</div>

						{/* Mobile */}
						{open ? (
							<div className="h-screen">
								<Disclosure.Panel className="md:hidden bg-slate-900 min-h-[30%]">
									<Disclosure>
										<Disclosure.Button className="pt-2 px-5 font-bold text-white flex flex-row items-center justify-center">
											Labs
											<ChevronDownIcon
												className={classNames(
													open ? "text-gray-300" : "text-gray-300",
													"mt-1 ml-2 h-5 w-5 group-hover:text-gray-700"
												)}
												aria-hidden="true"
											/>
										</Disclosure.Button>
										<Disclosure.Panel className="text-gray-500">
											<div className="overflow-hidden m-4 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
												<div className="relative grid gap-6 bg-slate-800 px-5 py-6 sm:gap-8 sm:p-8">
													{labs.map((lab) => (
														<a
															key={lab.name}
															href={lab.href}
															className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-700"
														>
															<div className="ml-4">
																<p className="text-base font-medium text-white">{lab.name}</p>
																<p className="mt-1 text-sm text-gray-300">{lab.description}</p>
															</div>
														</a>
													))}
												</div>
											</div>
										</Disclosure.Panel>
									</Disclosure>
									<div className="space-y-1 px-2 pt-2 pb-3">
										{navigation.map((item) => (
											<Disclosure.Button
												key={item.name}
												as="a"
												href={item.href}
												className={classNames(
													item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
													"block px-3 py-2 rounded-md text-base font-medium"
												)}
												aria-current={item.current ? "page" : undefined}
											>
												{item.name}
											</Disclosure.Button>
										))}
									</div>
								</Disclosure.Panel>
								<Disclosure.Button className="md:hidden h-full w-full cursor-default"></Disclosure.Button>
							</div>
						) : null}
					</>
				)}
			</Disclosure>
		</>
	)
}
