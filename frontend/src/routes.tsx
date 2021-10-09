import { Route, Switch } from "react-router-dom"
import Login from "./components/Login/Login"
import Home from "./components/Home/Home"
import CharacterCreation from "./components/CharacterCreation/CharacterCreation"
import Combat from "./components/Combat/Combat"

export default (
	<Switch>
		<Route exact path="/" component={Login} />
		<Route path="/home" component={Home} />
		<Route path="/combat" component={Combat} />
		<Route path="/char" component={CharacterCreation} />
	</Switch>
)
