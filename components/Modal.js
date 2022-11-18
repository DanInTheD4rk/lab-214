import { Fragment, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import PropTypes from "prop-types"

const defaultContents = {
	title: "",
	actionName: "",
	action: () => {},
	actionColor: "gray",
	component: <></>,
}

const Modal = (props) => {
	const cancelButtonRef = useRef(null)
	const { title, actionName, action, actionColor, component } = props.modalInfo || defaultContents

	const actionButtonClass = `inline-flex w-full justify-center rounded-md border border-transparent ${
		"bg-" + actionColor + "-700 hover:bg-" + actionColor + "-100"
	} px-4 py-2 text-base font-medium text-white leading-tight uppercase shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`
	if (props.modalInfo) {
		return (
			<Transition.Root show={props.open} as={Fragment}>
				<Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={props.setOpen}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-0 z-10 overflow-y-auto">
						<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
									<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
										<div className="sm:flex sm:items-start">
											{/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
											<ExclamationTriangleIcon className={`h-6 w-6 text-${actionColor}-600`} aria-hidden="true" />
										</div> */}
											<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
												<Dialog.Title as="h3" className="text-xl font-bold leading-6 text-gray-900 mb-4">
													{title}
												</Dialog.Title>
												<div className="mt-2">{component}</div>
											</div>
										</div>
									</div>
									<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
										<button
											type="button"
											// TODO: fix hover color
											// className={`inline-flex w-full justify-center rounded-md border border-transparent ${
											// 	"bg-" + actionColor + "-700 hover:bg-" + actionColor + "-100"
											// } px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
											className={actionButtonClass}
											onClick={() => {
												action()
												props.setOpen(false)
											}}
										>
											{actionName ? actionName : "OK"}
										</button>
										{actionName && (
											<button
												type="button"
												className="mt-3 leading-tight uppercase inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
												onClick={() => props.setOpen(false)}
												ref={cancelButtonRef}
											>
												Cancel
											</button>
										)}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		)
	} else null
}

export default Modal

Modal.propTypes = {
	open: PropTypes.bool,
	setOpen: PropTypes.func,
	modalInfo: PropTypes.shape({
		title: PropTypes.string,
		actionName: PropTypes.string,
		action: PropTypes.func,
		actionColor: PropTypes.string,
		component: PropTypes.element,
	}),
}
