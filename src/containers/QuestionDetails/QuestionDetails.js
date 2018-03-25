import React, {Component} from 'react';
import {
  QuestionCard,
  NavigationButton,
  DropdownMenu,
  McqQuestion,
  PassageQuestion,
  SubmissionQuestion
} from '../../components';
import {StorageHelper} from '../../helpers';

export default class QuestionDetails extends Component {
  constructor(props) {
    super(props);
    this.questionId = window.location.search
      ? window.location.search.split('=')[1]
      : undefined;

    this.state = {
      questionDetails: undefined
    }
  }

  getQuestionDetails(id) {
    return StorageHelper.getItem('questions').then((response) => {
      let questions = JSON.parse(response) || [];
      return questions.find((item) => item._id == id);
    })
  }

  componentDidMount() {
    console.log(this.questionId);
    this.getQuestionDetails(this.questionId).then((response) => {
      this.setState({questionDetails: response})
    })
  }

  renderQuestions(type) {
    switch (type) {
      case "Passage(text)":
        return <PassageQuestion data={this.state.questionDetails}/>
        break;
      case "Submission":
        return <PassageQuestion data={this.state.questionDetails}/>
        break;
      default:
        return <McqQuestion data={this.state.questionDetails}/>

    }
  }

  render() {
    console.log(this.state.questionDetails);
    const {questionTitle, questionDescription, options, type} = this.state.questionDetails || {}
    return (
      <div>
        {this.renderQuestions(type)}
      </div>
    )
  }
}
