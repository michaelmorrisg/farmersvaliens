import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {addPlayers} from '../../ducks/reducer'
import io from 'socket.io-client'
import Timer from '../Timer/Timer'
import './MultipleChoice.css'

const socket = io.connect("http://localhost:3020")

class MultipleChoice extends Component {
    constructor(){
        super()
        this.state = {
            question: '',
            correctAnswer: '',
            correctAnswerIndex: 0,
            allAnswers: [],
        }
        socket.on("logging-answer", data => {
            console.log(typeof data.answer, "data.answer")
            const tempPlayers = this.props.players.map(player => {
                if(player.username === data.player){
                    if(data.answer !== this.state.correctAnswerIndex){
                        player.initialQuestionRight = false
                    }
                }
                return player
            })
            this.props.addPlayers(tempPlayers)
        })

    }

    componentDidMount(){
        socket.emit('join-room', {roomId: this.props.roomId})
        axios.get('https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple')
        .then(res => {
            let tempAnswer = res.data.results[0].correct_answer
            let tempWrong = res.data.results[0].incorrect_answers
            let randomNum = Math.floor(Math.random() * Math.floor(4))
            tempWrong.splice(randomNum, 0, tempAnswer)
            tempWrong.forEach(element => {
                element = element.replace(/&quot;/g,'"')
                element = element.replace(/&#039;/g,"'")
                element = element.replace(/&amp;/g,"&")
            });
            var editedQuestion = res.data.results[0].question.replace(/&#039;/g,"'")
            editedQuestion = editedQuestion.replace(/&quot;/g,'"')
            editedQuestion = editedQuestion.replace(/&amp;/g,'&')
            let correctAnswerIndex = tempWrong.indexOf(res.data.results[0].correct_answer)
            this.setState({
                question: editedQuestion,
                correctAnswer: res.data.results[0].correct_answer,
                allAnswers: tempWrong,
                correctAnswerIndex: correctAnswerIndex
            })

        })
        socket.emit('question-sent', {roomId:this.props.roomId})
    }

    render(){
        return(
            <div className="multiplechoice-main">

                <p>{this.state.question}</p>
                {this.state.allAnswers.map((answers,i) => {
                    let numsArr = ['A', 'B', 'C', 'D']
                    return(
                        <p key={i}>{numsArr[i]}: {answers}</p>
                    )
                })}
                <p>{this.state.timer}</p>
                <Timer />
            </div>
        )
    }
}
function mapStateToProps(state){
    const {roomId, players} = state
    return {roomId, players}
}
export default connect(mapStateToProps, {addPlayers})(MultipleChoice)