import React, {Component} from 'react'
import {connect} from 'react-redux'
import './PlayerStatus.css'

class PlayerStatus extends Component {


    render(){
        return(
            <div>
                <h1>Players</h1>
                {this.props.players.map(player => {
                    return (
                        <div>
                            <p className={player.initialQuestionRight ? "green" : "red"}>{player.username}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}
function mapStateToProps(state){
    const {players} = state
    return {players}
}
export default connect(mapStateToProps)(PlayerStatus)