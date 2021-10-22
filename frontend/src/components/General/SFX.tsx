import React, { ReactElement } from "react";
import ReactHowler from "react-howler";
import styled from "styled-components";

const Container = styled.div`
	position: fixed;
	top: 0em;
	left: 0em;
`;

interface Props {
	sfxSrc: string;
	handleEndSFX: any;
}

export default function SFX(props: Props): ReactElement {
	return (
		<Container>
			<ReactHowler
				onEnd={() => props.handleEndSFX()}
				preload
				src={props.sfxSrc}
				playing
				volume={0.1}
			/>
		</Container>
	);
}
