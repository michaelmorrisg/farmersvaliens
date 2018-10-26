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
        this.dark1 = setTimeout(()=>{
            document.getElementById('on').id = "dark"
        },1500)
        this.dark2 = setTimeout(()=>{
            document.getElementById('kitchen-on').id = "dark-side"
            document.getElementById('kitchen2-on').id = "dark-side2"
        },2000)
        this.beam = setTimeout(()=>{
            document.getElementById("chimney-dark").id="chimney-beam"
            document.getElementById("roof-dark").id="roof-beam"
            document.getElementById("main-floor-dark").id="main-floor-beam"
            document.getElementById("dark").id="window-lit1"
            document.getElementById("dark-side").id="window-lit2"
            document.getElementById("dark-side2").id="window-lit3"
        },7030)
        this.floating = setTimeout(()=>{
            document.getElementById("house-wrapper-stays").id="house-wrapper-floats"
        },9000)
        this.shrinky = setTimeout(()=>{
            document.getElementById("changeMe").id="shrinkyBeam"
            document.getElementById("changeMeToo").id="shrinkyBeamBottom"
        },8000)
    }
    componentWillUnmount(){
        clearTimeout(this.dark1)
        clearTimeout(this.dark2)
        clearTimeout(this.beam)
        clearTimeout(this.floating)
        clearTimeout(this.shrinky)
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
            <div>
                <div className="initial-beam">
                    <div className="initial-beam-bottom"></div>
                </div>
                <div className="beam-main" id="changeMe">
                    <div className='beam-bottom' id="changeMeToo"></div>
                </div>
                <div className="hostgame-content">
                    <h2 className="h2-title">Enter Room ID</h2>
                    <div>
                        <input onChange={(e)=>this.handleInput(e.target.value)} placeholder="Room ID..." />
                        <button onClick={()=>this.createGame(this.state.roomId)}>Create Game</button>
                    </div>
                </div>
                {this.state.toHost ? <Redirect to="/hosting"/> : ''}
                <div id="moon-div">
                    <img id="moon" src={require('../../Assets/Moon.png')}/>
                </div>
                <div className="house-wrapper" id="house-wrapper-stays">
                    <div className="chimney" id="chimney-dark"></div>
                    <div className="roof" id="roof-dark"></div>
                    <div className="main-floor" id="main-floor-dark">
                        <div className="left-window" id="on"></div>
                        <div className="kitchen-left" id="kitchen-on"></div>
                        <div className="kitchen-right" id="kitchen2-on"></div>
                    </div>
                </div>
                <div>
                </div>
                <div className="corn-main">
                <img id="corn" src={require('../../Assets/corn.png')}/>
                <img id="corn" src={require('../../Assets/corn.png')}/>
                <img id="corn" src={require('../../Assets/corn.png')}/>
                <img id="corn" src={require('../../Assets/corn.png')}/>
                <img id="corn" src={require('../../Assets/corn.png')}/>
                </div>
                <div className="WelcomeUser-ground"></div>
                </div>
            </div>
        )
    }
}
export default connect(null,{createRoom})(HostGame)