import React from 'react'
import {Switch, Route} from 'react-router-dom'

import WelcomeUser from './Components/WelcomeUser/WelcomeUser'
import JoinGame from './Components/JoinGame/JoinGame'
import HostGame from './Components/HostGame/HostGame'
import HostingMain from './Components/HostingMain/HostingMain'
import PlayerWaiting from './Components/PlayerWaiting/PlayerWaiting'
import MultipleChoice from './Components/MultipleChoice/MultipleChoice';
import PlayerAnswer from './Components/PlayerAnswer/PlayerAnswer';
import PlayerPassive from './Components/PlayerPassive/PlayerPassive';
import StoryStart from './Components/StoryStart/StoryStart';
import HostingQuestionPlayer from './Components/HostingQuestionPlayer/HostingQuestionPlayer'
import DrawingComponent from './Components/DrawingComponent/DrawingComponent'

export default(
    <Switch>
        <Route path="/" exact component={WelcomeUser}/>
        <Route path="/join" component={JoinGame}/>
        <Route path="/host" component={HostGame}/>
        <Route path="/hosting" component={HostingMain}/>
        <Route path="/waiting" component={PlayerWaiting}/>
        <Route path="/multiplechoice" component={HostingQuestionPlayer}/>
        <Route path="/playeranswer" component={PlayerAnswer}/>
        <Route path="/playerpassive" component={PlayerPassive}/>
        <Route path="/storystart" component={StoryStart}/>
        <Route path="/drawing" component={DrawingComponent}/>

    </Switch>
)