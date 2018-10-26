import React, {Component} from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import './JoinGame.css'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {createRoom, makeAdmin, addPlayer} from '../../ducks/reducer'

const socket = io.connect("http://localhost:3020")

class JoinGame extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            roomId: '',
            eyes: 0,
            activeEyes: false,
            toWaiting: false
        }
    }

    handleUser(input){
        this.setState(function(state,props) {
            return{
                username: input,
                eyes: this.state.username.length * .75
            }
        })
    }
    handleRoom(input){
        this.setState({
            roomId: input
        })
    }
    joinGame(){
        axios.post('/api/joingame', this.state).then(res => {
            if(res.data === 'room not found'){
                alert('Room not found, ya bumkin')
            } else {
                axios.get(`/api/getplayers/${this.state.roomId}`).then(res => {
                    if(res.data.length === 1){
                        this.props.makeAdmin(true)
                    }
                    this.props.createRoom(this.state.roomId)
                    this.props.addPlayer(this.state.username)
                    socket.emit('player-joined', {roomId: this.state.roomId})
                    this.setState({
                        toWaiting: true
                    })
                })

            }
        })
    }
    moveEyes(){
        document.getElementById("passive-left").id = 'looking-left'
        document.getElementById("passive-right").id = 'looking-right'
        document.getElementById("closed").id = 'open'
        this.setState({
            activeEyes: true
        })
    }
    passiveEyes(){
        document.getElementById("looking-left").id = 'passive-left'
        document.getElementById("looking-right").id = 'passive-right'
        document.getElementById("open").id = 'closed'
        this.setState({
            activeEyes: false
        })
    }

    render(){
        return(
            <div className="joingame-main">
                        <div className="blinky-eyes-top">
                        </div>
                        <div className="blinky-eyes-bottom">
                        </div>
                        <div className="joingame-content">
                        <div className="tablet-rim">
                        <div className="tablet-screen">
                        <div className="tablet-content">
                        <div id="streak1"></div>
                        <div id="streak2"></div>
                        <div id="streak3"></div>
                        <div id="streak4"></div>
                        <div id="streak5"></div>
                            <div className="alien-area">
                            <div className="antenna-box">
                            <div className="antenna-top-left"></div>
                            <div className="antenna-top-right"></div>
                            <div className="antenna-bottom-left"></div>
                            <div className="antenna-bottom-right"></div>
                            </div>
                                <div className="alien-head">
                                    <div className="left-eye">
                                        <div className="left-pupil" id="passive-left" style={this.state.activeEyes ? {marginLeft:`${this.state.eyes}px`} : {marginLeft: "0px"}}></div>
                                    </div>
                                    <div className="right-eye">
                                    <div className="left-pupil" id="passive-right" style={this.state.activeEyes ? {marginLeft:`${this.state.eyes}px`} : {marginLeft: "0px"}}></div>
                                    </div>
                                    <div className="mouth" id="closed">
                                    </div>
                                </div>
                            </div>
                            <h2>Earth Name</h2>
                            <input onFocus={()=>this.moveEyes()} onBlur={()=>this.passiveEyes()}onChange={(e)=>this.handleUser(e.target.value)} placeholder="Username..."/>
                            <h2>Room ID</h2>
                            <input onChange={(e)=>this.handleRoom(e.target.value)} placeholder="Room ID..."/>
                            <br/>
                            <button onClick={()=>this.joinGame()}>Join Game</button>
                            </div>
                            </div>
                            </div>
                    </div>
                    {this.state.toWaiting ? <Redirect to="/waiting"/> : ''}
            </div>
        )
    }
}
export default connect(null, {createRoom, makeAdmin, addPlayer})(JoinGame)