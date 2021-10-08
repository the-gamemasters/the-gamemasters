import React, { ReactElement } from "react"
import { classList } from "./classes"
import { SKILLS } from "./skills"

interface Props {
	currentClass: "KNIGHT" | "ROGUE" | "BARBARIAN" | "MAGE" | "NONE"
}

function CharacterInfo(props: Props): ReactElement {
	// the lines below, Current class should be an object (Record), the keys should be strings, and the values should be string or number
	let currentClass = classList.filter((val) => {
		return val.class.toUpperCase() === props.currentClass
	})[0]

	return (
		<div>
			<h1>test</h1>
			<h2>{currentClass.class}</h2>
			{currentClass.img ? (
				<>
					<img
						src={`${currentClass.img}`}
						alt={`${currentClass.class}`}
						width="500"
						height="600"
					/>
					<h3>Skills</h3>

					{SKILLS.map((val, i) => {
						return (
							<>
								<p key={i}>{val.toUpperCase()}</p>
								<span>{currentClass[val]}</span>
							</>
						)
					})}
					<h3>Passive Skill</h3>
					<p>{currentClass.passive}</p>
				</>
			) : null}
		</div>
	)
}

export default CharacterInfo
