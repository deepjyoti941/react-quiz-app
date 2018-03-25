import React, {Component} from 'react';
import {QuestionFooter} from '../common';

export default class McqType extends Component {
  constructor(props) {
    super(props);
    console.log('McqType props',props);
    this.state = {
      questionTitle: '',
      questionDescription: '',
      questionInstructions: '',
      options: [
        {
          key: 'Option_A',
          value: '',
          is_right: false
        }, {
          key: 'Option_B',
          value: '',
          is_right: false
        }, {
          key: 'Option_C',
          value: '',
          is_right: false
        }, {
          key: 'Option_D',
          value: '',
          is_right: false
        }
      ],
      correctAnswers: [],
      type: 'MCQ(Quiz)'

    }

  }

  componentDidMount() {
    this.setState({...this.props.data})
  }

  checkAnswer(event, index) {
    let options = this.state.options.slice();
    options[index].is_right = event.target.checked;
    this.setState({options});
  }

  onTextChange(event, index, type) {
    if (type === 'options') {
      let options = this.state.options.slice();
      options[index].value = event.target.value;
      this.setState({options});
    } else {
      let newStateObj = {};
      newStateObj[type] = event.target.value;
      this.setState({...newStateObj});
    }
  }

  renderOptions() {
    return this.state.options.map((option, index) => {
      return (<tr key={index} className="d-flex">
        <td className="col-10">
          <div className="form-group">
            <input type="text" className="form-control"
              placeholder={'Type ' + option.key.split('_').join(' ') + ' here'}
              value={option.value}
              onChange={(e) => this.onTextChange(e, index, 'options')}/>
          </div>
        </td>
        <td className="col-2 text-center">
          <input className="form-check-input" style={{
              float: 'right'
            }} type="checkbox" checked={option.is_right}
            onChange={(e) => this.checkAnswer(e, index)}/>
        </td>
      </tr>)
    })
  }

  render() {
    const {onDataChange, updateData} = this.props;
    return (<div>
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
      <table className="table borderless">
        <thead >
          <tr className="d-flex">
            <th className="col-10">Answer Options:</th>
            <th className="col-2 text-center">Right Answers:</th>
          </tr>
        </thead>
        <tbody>
          {this.renderOptions()}
        </tbody>
      </table>
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
        data={this.props.data} />
    </div>)
  }
}
