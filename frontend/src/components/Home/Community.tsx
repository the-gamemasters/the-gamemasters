import React, { ReactElement } from "react"
import styled from "styled-components"
import CommunityListItem from "./CommunityListItem"
import { announcements } from "./Announcements"

const CommunityContainer = styled.div`
	height: 100%;
	width: 100%;
	background-color: white;
`

const CommunityList = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
	text-align: left;
	padding: 0.5em 0.5em;
`

interface Props {}

export default function Community(props: Props): ReactElement {
	return (
		<CommunityContainer>
			Community
			<CommunityList>
				{announcements.map((ele, i) => {
					return <CommunityListItem announcement={ele} key={i} />
				})}
			</CommunityList>
		</CommunityContainer>
	)
}
