import { Route, Switch } from "react-router-dom"
import CharacterCreation from "./components/CharacterCreation/CharacterCreation"
import CombatHome from "./components/Combat/CombatHome"
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"

export default (
	<Switch>
		<Route exact path="/" component={Login} />
		<Route path="/home" component={Home} />
		<Route path="/combat" component={CombatHome} />
		<Route path="/char" component={CharacterCreation} />
	</Switch>
)
