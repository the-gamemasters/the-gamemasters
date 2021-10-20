import styled from "styled-components";
import routes from "./routes";
import "nes.css/css/nes.min.css";

const AppContainer = styled.div`
	text-align: center;
	background-image: url("/images/login-background.gif");
	background-size: cover;
	background-position: center bottom;
	height: 100%;
	min-height: 100vh;
`;

function App() {
	return <AppContainer className="App">{routes}</AppContainer>;
}

export default App;
