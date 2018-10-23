import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {createRoom} from '../../ducks/reducer'
import {connect} from 'react-redux'
import './HostGame.css'

class HostGame extends Component {
    constructor(){
        super()
        this.state = {
            roomId: '',
            toHost: false
        }
    }
    componentDidMount(){
        setTimeout(function(){
            document.getElementById('on').id = "dark"
        },1500)
        setTimeout(function(){
            document.getElementById('kitchen-on').id = "dark-side"
            document.getElementById('kitchen2-on').id = "dark-side2"
        },2000)
        setTimeout(function(){
            document.getElementById("chimney-dark").id="chimney-beam"
            document.getElementById("roof-dark").id="roof-beam"
            document.getElementById("main-floor-dark").id="main-floor-beam"
            document.getElementById("dark").id="window-lit1"
            document.getElementById("dark-side").id="window-lit2"
            document.getElementById("dark-side2").id="window-lit3"
        },7010)
    }

    handleInput(input){
        this.setState({
            roomId: input
        })
    }

    createGame(id){
        if(id){
            axios.post('/api/hostgame', {roomId:id}).then(res => {
                if(res.data === 'room exists'){
                    alert('Oops! Room already taken!')
                } else {
                    this.props.createRoom(this.state.roomId)
                    this.setState({
                        toHost: true
                    })
                }
            })
        } else {
            alert('Enter an ID, ya bumkin')
        }
    }

    render(){

        return(
            <div className="WelcomeUser-main">
                <div className="initial-beam">
                    <div className="initial-beam-bottom"></div>
                </div>
                <div className="beam-main">
                    <div className='beam-bottom'></div>
                </div>
                <h1>Host Game</h1>
                <h2>Enter Room ID</h2>
                <input onChange={(e)=>this.handleInput(e.target.value)} placeholder="Room ID..." />
                <button onClick={()=>this.createGame(this.state.roomId)}>Create Game</button>
                {this.state.toHost ? <Redirect to="/hosting"/> : ''}
                <div className="house-wrapper">
                    <div className="chimney" id="chimney-dark"></div>
                    <div className="roof" id="roof-dark"></div>
                    <div className="main-floor" id="main-floor-dark">
                        <div className="left-window" id="on"></div>
                        <div className="kitchen-left" id="kitchen-on"></div>
                        <div className="kitchen-right" id="kitchen2-on"></div>
                    </div>
                </div>
                <div className="WelcomeUser-ground"></div>
            </div>
        )
    }
}
export default connect(null,{createRoom})(HostGame)