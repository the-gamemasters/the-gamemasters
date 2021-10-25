import React, { ReactElement } from "react"
import styled from "styled-components"

const ListItemTitle = styled.div`
	font-size: 1.2em;
`

const ListItemTimestamp = styled.div`
	font-size: 0.7em;
`

const ListItemDivider = styled.hr`
	width: 70%;
	margin: 1em 0;
`

const ListItemBody = styled.div`
	font-size: 0.85em;
`

interface Props {
	announcement: {
		title: string
		date: string
		body: string
	}
}

export default function CommunityListItem(props: Props): ReactElement {
	return (
		<div>
			<ListItemTitle className="nes-text is-primary">
				{props.announcement.title}
			</ListItemTitle>
			<ListItemTimestamp className="nes-text is-disabled">
				{props.announcement.date}
			</ListItemTimestamp>
			<ListItemDivider />
			<ListItemBody className="nes-text">
				{props.announcement.body}
			</ListItemBody>
		</div>
	)
}
