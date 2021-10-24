import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import ReactHowler from "react-howler";

const SpeakerContainer = styled.div`
	position: fixed;
	top: 0.5em;
	left: 0.5em;
`;

const SpeakerIcon = styled.img`
	height: 3rem;
	width: 3rem;
	cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
			14 0,
		pointer;
	border: 4px black solid;
	border-radius: 5px;
	background-color: white;
`;

interface Props {
	musicSrc: string;
}

export default function BackgroundMusic(props: Props): ReactElement {
	const [musicPlaying, setMusicPlaying] = useState(false);

	const handleSpeakerClick = () => {
		setMusicPlaying(!musicPlaying);
	};

	return (
		<SpeakerContainer>
			<SpeakerIcon
				className={musicPlaying ? "" : "muted"}
				src={
					musicPlaying
						? "images/speaker-on.png"
						: "images/speaker-off.png"
				}
				alt="speaker"
				onClick={() => handleSpeakerClick()}
			/>
			<ReactHowler
				src={props.musicSrc}
				playing
				loop
				preload
				mute={!musicPlaying}
				volume={0.1}
			/>
		</SpeakerContainer>
	);
}
