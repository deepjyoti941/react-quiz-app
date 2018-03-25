import React, {Component} from 'react';
import {QuestionFooter} from '../common';

export default class PassageType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionTitle: '',
      questionDescription: '',
      idealAnswer: '',
      questionInstructions: '',
      type: 'Passage(text)'
    }

    console.log('PassageType props',props);
  }

  componentDidMount() {
    this.setState({...this.props.data})
  }

  onTextChange(event, index, type) {
    let newStateObj = {};
    newStateObj[type] = event.target.value;
    this.setState({...newStateObj});
  }

  render() {
    const {onDataChange, updateData} = this.props;
    return (
      <div>
        <div className="form-group">
          <label>Question Title:</label>
          <input type="text" className="form-control" placeholder="Type your question title here"
            value={this.state.questionTitle}
            onChange={(e) => this.onTextChange(e, null, 'questionTitle')}
          />
        </div>
        <div className="form-group">
          <label>Question Description:</label>
          <input type="text" className="form-control" placeholder="Type your question description here"
            value={this.state.questionDescription}
            onChange={(e) => this.onTextChange(e, null, 'questionDescription')}
          />
        </div>
        <div className="form-group">
          <label>Ideal Answer:</label>
          <input type="text" className="form-control" placeholder="Type your answer here"
            value={this.state.idealAnswer}
            onChange={(e) => this.onTextChange(e, null, 'idealAnswer')}
          />
        </div>
        <div className="form-group">
          <label>Question Instruction:</label>
          <input type="text" className="form-control" placeholder="Type instruction here..(e.g. file size,file format, etc.)"
            value={this.state.questionInstructions}
            onChange={(e) => this.onTextChange(e, null, 'questionInstructions')}
          />
        </div>
        <QuestionFooter
          onClick={()=>onDataChange(this.state)}
          onUpdateClick={() => updateData(this.state)}
          onCancelClick={()=> console.log('cancel clicked')}
          data={this.props.data}
        />
      </div>
    )
  }
}
