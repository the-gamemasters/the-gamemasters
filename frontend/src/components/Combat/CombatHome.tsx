import React, { ReactElement } from "react"
import Combat from "./Combat"
import NPC from "./NPC"

interface Props {}

function CombatHome({}: Props): ReactElement {
	return (
		<div>
			<Combat />
			{/* <NPC /> */}
		</div>
	)
}

export default CombatHome
