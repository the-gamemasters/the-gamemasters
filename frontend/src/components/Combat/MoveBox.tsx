import React, { ReactElement } from "react"
import "./styles/combat.css"

interface Props {
	handleAction: any
	myTurn: boolean
	openSelectModal: any
}

//TODO Need to optimize this function heavily

export default function MoveBox(props: Props): ReactElement {
	const setDisabledButtonClass = (): any => {
		if (props.myTurn) {
			return null
		} else {
			return "is-disabled"
		}
	}

	return (
		<div className="moves-container">
			<button
				type="button"
				className={`nes-btn ${setDisabledButtonClass()}`}
				id="attack-btn"
				onClick={
					props.myTurn
						? () => props.handleAction("attack", "")
						: undefined
				}
			>
				Attack
			</button>
			<button
				type="button"
				className={`nes-btn ${setDisabledButtonClass()}`}
				id="spells-btn"
				onClick={
					props.myTurn
						? () => props.openSelectModal("spell")
						: undefined
				}
			>
				Spells
			</button>
			<button
				type="button"
				className={`nes-btn ${setDisabledButtonClass()}`}
				id="item-btn"
				onClick={
					props.myTurn
						? () => props.openSelectModal("item")
						: undefined
				}
			>
				Items
			</button>
			<button
				type="button"
				className={`nes-btn  ${setDisabledButtonClass()}`}
				id="evade-btn"
				onClick={
					props.myTurn
						? () => props.handleAction("evade", "")
						: undefined
				}
			>
				Evade
			</button>
		</div>
	)
}
