import React, { ReactElement } from "react"

interface Props {
	closeModal: any
}

export default function CloseButton(props: Props): ReactElement {
	return (
		<button
			style={{
				position: "fixed",
				right: "0%",
				top: "0%",
			}}
			onClick={() => props.closeModal()}
			type="button"
			className="nes-btn is-error"
		>
			<i className="nes-icon close is-small"></i>
		</button>
	)
}
