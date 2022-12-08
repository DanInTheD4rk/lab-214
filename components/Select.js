import { useMemo, Fragment, useState, useEffect } from "react"
import { FaChevronDown, FaCheck } from "react-icons/fa"
import { Listbox, Transition } from "@headlessui/react"

const Select = ({ value, setValue, options, className = "", disabled, placeholder }) => {
	const selectedOption = useMemo(() => options.find((o) => o.id === value), [options, value])

	return (
		<Listbox value={selectedOption} onChange={setValue} disabled={disabled}>
			<div className={`relative w-max ${className}`}>
				<Listbox.Button
					className={`relative py-3 pl-3 pr-10 text-base text-gray-700 text-left shadow-[0_4px_10px_rgba(0,0,0,0.08)] focus:outline-none
          				${disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white cursor-default"}`}
				>
					<span className="block truncate">{value ? value.name : placeholder}</span>
					<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
						<FaChevronDown size="12px" className="text-gray-400" aria-hidden="true" />
					</span>
				</Listbox.Button>
				<Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
					<Listbox.Options className="absolute z-10 w-full overflow-auto max-h-40 mt-1 bg-white text-base shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none">
						{options.map((option) => (
							<Listbox.Option
								key={option.id}
								className={({ active }) =>
									`relative cursor-default select-none py-3 pl-10 pr-4 ${active ? "bg-red-100" : ""}`
								}
								value={option}
							>
								{({ selected }) => (
									<>
										<span className={`block truncate font-normal`}>{option.name}</span>
										{selected ? (
											<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-400">
												<FaCheck size="0.5rem" aria-hidden="true" />
											</span>
										) : null}
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	)
}

export default Select
