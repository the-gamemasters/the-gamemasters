import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { HashRouter } from "react-router-dom"
import App from "./App"
import { store } from "./redux/store"
import "./css/index.css"

ReactDOM.render(
	<HashRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</HashRouter>,
	document.getElementById("root")
)
