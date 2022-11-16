import { createContext, useContext, useState } from "react"
import Modal from "./Modal"

const ModalContext = createContext({
	open: false,
	setOpen: null,
	setContents: null,
})

export function ModalProvider({ children }) {
	const [open, setOpen] = useState(false)
	const [contents, setContents] = useState()
	const value = { open, setOpen, setContents }
	return (
		<ModalContext.Provider value={value}>
			<Modal open={open} setOpen={setOpen} modalInfo={contents} />
			{children}
		</ModalContext.Provider>
	)
}

export function useModal() {
	const context = useContext(ModalContext)
	if (!context) {
		throw new Error("useModal must be used within ModalProvider")
	}
	return context
}
