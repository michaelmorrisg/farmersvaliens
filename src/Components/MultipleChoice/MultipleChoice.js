import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3020")

class MultipleChoice extends Component {
    constructor(){
        super()
        this.state = {
            question: '',
            correctAnswer: '',
            allAnswers: []
        }
    }

    componentDidMount(){
        axios.get('https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple')
        .then(res => {
            let tempAnswer = res.data.results[0].correct_answer
            let tempWrong = res.data.results[0].incorrect_answers
            let randomNum = Math.random(4)
            tempWrong.splice(randomNum, 0, tempAnswer)
            tempWrong.forEach(element => {
                element = element.replace(/&quot;/g,'"')
                element = element.replace(/&#039;/g,"'")
                element = element.replace(/&amp;/g,"&")
            });
            var editedQuestion = res.data.results[0].question.replace(/&#039;/g,"'")
            editedQuestion = editedQuestion.replace(/&quot;/g,'"')
            editedQuestion = editedQuestion.replace(/&amp;/g,'&')
            this.setState({
                question: editedQuestion,
                correctAnswer: res.data.results[0].correct_answer,
                allAnswers: tempWrong
            })
        })
        socket.emit('question-sent', {roomId:this.props.roomId})
    }

    render(){
        return(
            <div>
                <h1>MultipleChoice</h1>
                <p>{this.state.question}</p>
                {this.state.allAnswers.map((answers,i) => {
                    let numsArr = ['A', 'B', 'C', 'D']
                    return(
                        <p key={i}>{numsArr[i]}: {answers}</p>
                    )
                })}
            </div>
        )
    }
}
function mapStateToProps(state){
    const {roomId} = state
    return {roomId}
}
export default connect(mapStateToProps)(MultipleChoice)