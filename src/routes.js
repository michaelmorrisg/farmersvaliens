import React from 'react'
import {Switch, Route} from 'react-router-dom'

import WelcomeUser from './Components/WelcomeUser/WelcomeUser'
import JoinGame from './Components/JoinGame/JoinGame'
import HostGame from './Components/HostGame/HostGame'
import HostingMain from './Components/HostingMain/HostingMain'
import PlayerWaiting from './Components/PlayerWaiting/PlayerWaiting'

export default(
    <Switch>
        <Route path="/" exact component={WelcomeUser}/>
        <Route path="/join" exact component={JoinGame}/>
        <Route path="/host" exact component={HostGame}/>
        <Route path="/hosting" exact component={HostingMain}/>
        <Route path="/waiting" exact component={PlayerWaiting}/>
    </Switch>
)