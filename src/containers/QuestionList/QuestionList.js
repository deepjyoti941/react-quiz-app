import React, {Component} from 'react';
import {
  QuestionCard,
  NavigationButton,
  DropdownMenu
} from '../../components';
import {StorageHelper} from '../../helpers';

export default class QuestionList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      checkAll: false,
      questions: [],
      students:[],
      dummyStudentList: []
    }
  }

  componentDidMount() {
    StorageHelper.getItem('questions').then((response) => {
      let questions = JSON.parse(response);
      if(!questions) return;
      questions.map((item) => {
        return item.rowState = false
      })
      console.log(questions);
      this.setState({questions})
    })

    StorageHelper.studentList().then((response) => {
      console.log(response);
      this.setState({dummyStudentList:response})
    })
  }

  navigateTo(path) {
    this.props.history.push(path);
  }

  checkRow(id, value) {
    this.state.questions[id].rowState = value;
    this.setState({
      questions: this.state.questions
    })
  }

  checkAll() {
    let newQuestionState = this.state.questions.slice();
    let checkState = !this.state.checkAll;
    this.state.checkAll = checkState;
    newQuestionState.map((item) => {
      return item.rowState = checkState
    })
    this.setState({
      checkAll: this.state.checkAll,
      questions: newQuestionState
    });
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    let studentsCopy = this.state.students.slice();
    if (!value) return;
    if(studentsCopy.indexOf(value) < 0) {
      studentsCopy.push(value);
    }
    this.setState({students: studentsCopy})
  }

  handleDelete(id) {
    if (window.confirm('Are you sure you want to delete?')) {
      let newQuestionState = this.state.questions.slice();
      newQuestionState = newQuestionState.filter((item) => item._id !== id);
      console.log(newQuestionState);
      this.setState({
        questions: newQuestionState
      });
    }
  }

  deleteStudent(id) {
    let studentsCopy = this.state.students.slice();
    studentsCopy.splice(studentsCopy.indexOf(id), 1)
    this.setState({
      students: studentsCopy
    });
  }

  assignQuestions() {
    let students = this.state.students.slice();
    let questions = this.state.questions
    .filter((item) =>  item.rowState)
    .reduce((qstns, question, index) => {
      qstns.push(question._id);
      return qstns;
    },[])

    let studentsWithQstn = students.reduce((newStudents, item, index)=> {
      console.log(item);
      newStudents[item] = questions;
      return newStudents;
    }, {})

    StorageHelper.getItem('studentsWithQstn').then((response) => {
      let results = JSON.parse(response) || {};
      results = {...results, ...studentsWithQstn}
      StorageHelper.setItem('studentsWithQstn', JSON.stringify(results)).then(() => {
        alert('new questions has been assigned');
      })
    })
  }

  render() {

    let rows = this.state.questions.map((row,index) => {
      return (<QuestionCard deleteQuestion={this.handleDelete.bind(this)} item={row} index={index} key={row._id} checked={row.rowState} callback={this.checkRow.bind(this)} />);
    });

    let studentList = this.state.students.map((row,index) => {
      return (<span key={index} className="badge badge-info"style={{padding:10, margin:5}} >{row}<a style={{padding:5}} onClick={()=>this.deleteStudent(row)}><i className="fas fa-times" /></a></span>)
    })

    console.log(this.state.dummyStudentList);

    return (
      <div>
        <div className="d-flex flex-row justify-content-stretch">
          <DropdownMenu
            name="FirstDropdown"
            selectableData={this.state.dummyStudentList}
            handleInputChange={this.handleInputChange.bind(this)}
          />
          <div className="form-group student-list-container">
            {studentList}
          </div>
        </div>
        <div className="d-flex question-card-header">
          <div className="p-2 question-actions">
            <input style={{'marginRight': '10px'}} type="checkbox"
              checked={this.state.checkAll} onChange={this.checkAll.bind(this)}/>
              <label>Select All</label>
          </div>
          <div className="p-2">
            <span>Select questions to Assign</span>
          </div>
          <div className="ml-auto p-2">
            <button type="button" className="btn btn-primary login-btn" onClick={this.assignQuestions.bind(this)}>Assign</button>
          </div>
          <div className="p-2">
            <NavigationButton title="Author New Question" path="/question-builder"/>
          </div>
        </div>
          {this.state.questions.length > 0 ? rows:
            <p style={{'textAlign': 'center'}}>Sorry no questions to display</p>
          }
      </div>
    )
  }

}
