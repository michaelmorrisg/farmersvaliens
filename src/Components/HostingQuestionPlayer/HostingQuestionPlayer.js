import React, {Component} from 'react'
import MultipleChoice from '../MultipleChoice/MultipleChoice'
import PlayerStatus from '../PlayerStatus/PlayerStatus'

class HostingQuestionPlayer extends Component {


    render(){
        return (
            <div>
                <PlayerStatus />
                <MultipleChoice />
            </div>
        )
    }
}
export default HostingQuestionPlayer