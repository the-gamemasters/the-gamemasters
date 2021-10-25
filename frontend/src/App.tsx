import styled from "styled-components"
import routes from "./routes"
import "nes.css/css/nes.min.css"

const AppContainer = styled.div`
	text-align: center;
	background-color: white;
	height: 100%;
	min-height: 100vh;
`

function App() {
	return <AppContainer className="App">{routes}</AppContainer>
}

export default App
