import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addPlayers} from '../../ducks/reducer'
import axios from 'axios'
import io from 'socket.io-client'
import {Redirect} from 'react-router-dom'
import "./HostingMain.css"

const socket = io.connect("http://localhost:3020")

class HostingMain extends Component {
    constructor(){
        super()
        this.state = {
            players: [],
            toStoryStart: false
        }

        socket.on('add-player', ()=>{
            axios.get(`/api/getplayers/${this.props.roomId}`).then(res => {
                this.setState({
                    players: res.data
                })
                //THIS IS THE PLACE TO ADD PLAYER VALUES TO REDUX
                res.data.forEach(element => {
                    element.initialQuestionRight = true
                })
                this.props.addPlayers(res.data)
            })
        })

        socket.on('going-to-player-passive', ()=>{
            this.setState({
                toStoryStart: true
            })
        })
    }
    componentDidMount(){
        socket.emit('join-room', {roomId: this.props.roomId})
    }

    render(){
        return(
            <div>
                <h1>Hosting Main</h1>
                <h2>Room: {this.props.roomId}</h2>
                {this.state.players.map((player,i) => {
                    return(
                        <div>
                            <h3 key={i}>{player.username}</h3>
                        </div>
                    )
                })}
                {this.state.toStoryStart ? <Redirect to="/storystart"/> : ''}
                <div className="face-wrapper">
                    <div id="head1">
                        <div id="leye1">
                            <div className="pupil"></div>
                        </div>
                        <div id="reye1">
                            <div className="pupil"></div>
                        </div>
                        <img id="nose1" src={require('../../Assets/nose1.png')}/>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    const {roomId} = state
    return {roomId}
}
export default connect(mapStateToProps, {addPlayers})(HostingMain)