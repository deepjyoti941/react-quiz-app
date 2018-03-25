import React, {Component} from 'react';
import {
  McqType,
  PassageType,
  SubmissionType
} from '../../components';
import {StorageHelper, IdGenerator} from '../../helpers';
const questionTypes = [
  {NAME: 'Multiple choice question', id: 0},
  {NAME: 'Submission type question', id: 1},
  {NAME: 'Passage (text) type question', id: 2},
];

export default class QuestionBuilder extends Component{
  constructor(props) {
    super(props);
    this.qstnId = window.location.search ? window.location.search.split('=')[1]: undefined;
    this.questionTypes = {"MCQ(Quiz)": '0', "Submission": '1', "Passage(text)": '2'}
    this.state = {
      questionType: undefined,
      questionToUpdate: {}
    }

  }

  getQuestionById(id) {
    console.log('question id', id);
    StorageHelper.getItem('questions').then((response) => {
      let questions = JSON.parse(response) || [];
      let qstnById = questions.find((item) => item._id == id);
      if (qstnById) {
        let obj = {};
        obj[this.questionTypes[qstnById.type]] = qstnById
        this.setState({
          questionType: this.questionTypes[qstnById.type],
          questionToUpdate:obj})
      }
    })
  }

  componentDidMount() {
    console.log(this.props);
    this.getQuestionById(this.qstnId)
  }

  handleDataChange(data) {
    if (!data.questionTitle) {
      alert('question title can not be empty');
      return;
    }
    data._id = IdGenerator();
    StorageHelper.getItem('questions').then((response) => {
      // console.log(response);
      let questions = JSON.parse(response) || [];
      console.log(questions);
      questions.push(data)
      console.log('store new data');
      StorageHelper.setItem('questions', JSON.stringify(questions)).then(() => {
        alert('new question has been saved')
      })
    })
    console.log('data received', data);
    // StorageHelper.setItem('mykey', data).then(function () {
    //   console.log('question has been saved');
    // })
  }

  handleDataUpdate(data) {
    console.log('handleDataUpdate', data);
  }



  onTypeChanged(e) {
    console.log(e.currentTarget.id);
    this.setState({
      questionType: e.currentTarget.id
      });
  }

  renderQuestionTemplate() {
    console.log('from renderQuestionTemplate', this.state.questionType,);
    switch (this.state.questionType) {
      case '0':
        return <McqType
          onDataChange={this.handleDataChange}
          updateData={this.handleDataUpdate}
          data={this.state.questionToUpdate[this.state.questionType]}/>
        break;
      case '1':
        return <SubmissionType
          onDataChange={this.handleDataChange}
          updateData={this.handleDataUpdate}
          data={this.state.questionToUpdate[this.state.questionType]}/>
        break;
      case '2':
        return <PassageType
          onDataChange={this.handleDataChange}
          updateData={this.handleDataUpdate}
          data={this.state.questionToUpdate[this.state.questionType]}/>
        break;
      default:
        return null;
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="d-flex flex-column">
        <h5>Question Builder</h5>
        <div className="p-0">
          <p>What type of question you want to create?</p>
          <ul className="list-group p-0">
            {
              questionTypes.map((item, i) => {
                return (
                  <li key={i} className="list-group-item">
                    <input type="radio"
                      name="question_type"
                      id={item.id}
                      value={item.NAME}
                      checked={this.state.questionType == item.id}
                      onChange={this.onTypeChanged.bind(this)}/>
                      <span className="questionText">{item.NAME}</span>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="p-0">
          {this.renderQuestionTemplate()}
        </div>
      </div>
    )
  }

}
