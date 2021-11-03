import React, { ReactElement } from "react"
import styled from "styled-components"
import { classList } from "./classes"
import { SKILLS } from "./skills"

interface Props {
	currentClass: "KNIGHT" | "ROGUE" | "BARBARIAN" | "MAGE" | "NONE"
}

function CharacterInfo(props: Props): ReactElement {
	let currentClass = classList[props.currentClass]

	return (
		<div>
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
							<div key={i}>
								<p>{val.toUpperCase()}</p>
								<span>{currentClass[val]}</span>
							</div>
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
