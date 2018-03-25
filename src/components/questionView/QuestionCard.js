import React, {Component} from 'react';
import {
  NavigationButton
} from '../common';

export default class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
    console.log(props);
  }

  checkIt() {
    this.props.callback(this.props.index, !this.props.checked);
    return;
  }

  handleClick() {
    this.props.handleClick()
  }

  render() {
    const {item, deleteQuestion, type} = this.props;
    return (
      <div className="d-flex flex-row align-items-md-center">
        {!type ?
          <div className="d-flex flex-row align-items-md-center" style={{paddingRight: 10}}>
            <input style={{marginRight: 10}} type="checkbox" checked={this.props.checked} onChange={this.checkIt.bind(this)}/>
            <NavigationButton title="edit" path="/question-builder" id={item._id}/>
            <button type="button" className="btn btn-outline-dark login-btn" onClick={()=> deleteQuestion(item._id)}>delete</button>
          </div>
          : <div className="d-flex flex-row align-items-md-center" style={{paddingRight: 10}}>
              <NavigationButton title="View" path="/questions" id={item._id}/>
            </div>
        }
        <div className="d-flex question-card-body" style={{flex: '1 0 auto'}}>
          <div className="p-2">
            <span>S.No.</span><br/>
            <h4>{this.props.index+1}</h4>
          </div>
          <div className="p-2">
            <span><strong>{item.questionTitle}</strong></span><br />
            <small>{item.questionDescription}</small>
          </div>
          <div className="ml-auto p-2">
            <span>QUESTION TYPE</span><br/>
            <small>{item.type}</small>
          </div>
        </div>
      </div>
    )
  }
}
