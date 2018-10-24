import React, {Component} from 'react'
import MultipleChoice from '../MultipleChoice/MultipleChoice'
import PlayerStatus from '../PlayerStatus/PlayerStatus'
import "./HostingQuestionPlayer.css"

class HostingQuestionPlayer extends Component {


    render(){
        return (
            <div className="hostingquestionplayer-main">
                <PlayerStatus />
                <MultipleChoice />
            </div>
        )
    }
}
export default HostingQuestionPlayer