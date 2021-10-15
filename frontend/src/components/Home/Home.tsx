import React, { ReactElement } from "react";
import styled from "styled-components";
import Community from "./Community";
import User from "./User";
import ShopPreview from "./ShopPreview";
import Character from "./Character";
import HomeAction from "./HomeAction";

interface Props {}

const PageContainer = styled.div`
	height: 100vh;
	width: 100vw;
`;

const HomeContainer = styled.div`
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 60% 40%;
`;

const HomeTop = styled.div`
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 3fr;
	grid-template-rows: 1fr;
`;

const HomeBottom = styled.div`
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-template-rows: 1fr;
`;

const TopRight = styled.div`
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 20% 80%;
	background-image: url("https://mir-s3-cdn-cf.behance.net/project_modules/1400/8fa7126910307.5a212a61b74ce.jpg");
	background-position: bottom;
	background-size: contain;
	color: white;
`;

export default function Home(props: Props): ReactElement {
	return (
		<PageContainer>
			<HomeContainer>
				<HomeTop>
					<Community />
					<TopRight>
						<div>WorldName</div>
						<User />
						<div>(Empty)</div>
						<ShopPreview />
					</TopRight>
				</HomeTop>
				<HomeBottom>
					<Character />
					<HomeAction />
				</HomeBottom>
			</HomeContainer>
		</PageContainer>
	);
}
