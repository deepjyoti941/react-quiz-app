import React, {Component} from 'react';
import {StorageHelper} from '../../helpers';
import {QuestionCard, NavigationButton} from '../../components';
export default class StudentPage extends Component {
  constructor(props) {
    super(props);
    this.userId = window.location.search
      ? window.location.search.split('=')[1]
      : undefined;
    this.state = {
      qstnsAssociated: []
    }
  }

  getQuestionByUserId(id) {
    if (!id)
      return;
    StorageHelper.getItem('studentsWithQstn').then((response) => {
      let users = JSON.parse(response) || [];
      console.log(users[id]);
      if (!users[id]) return;

      let qstnsAssociated = users[id];
      StorageHelper.getItem('questions').then((response) => {
        let questions = JSON.parse(response) || [];
        qstnsAssociated = qstnsAssociated.map((qstnId) => {
          let question = questions.find((question) => {
            return question._id == qstnId
          })
          return question;
        })
      }).then((data) => {
        console.log('qstnsAssociated', qstnsAssociated);
        this.setState({qstnsAssociated})
      })
    })
  }

  handleQuestionClick(questionId) {
    console.log('questionId', questionId);
  }

  componentDidMount() {
    this.getQuestionByUserId(this.userId)
  }

  render() {
    console.log(this.state.qstnsAssociated);
    let rows = this.state.qstnsAssociated.map((row, index) => {
      return (<QuestionCard item={row} index={index} key={row._id} handleClick={this.handleQuestionClick.bind(this)} type={'studentCard'}/>);
    });

    return (<div>
      {
        this.state.qstnsAssociated.length > 0
          ? rows
          : <p style={{
                'textAlign' : 'center'
              }}>Sorry no questions to display</p>
      }
    </div>)
  }

}
