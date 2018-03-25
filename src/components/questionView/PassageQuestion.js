import React, {Component} from 'react';

export default class PassageQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionDetails: props.data,
      answer: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      questionDetails: nextProps.data
    })
  }

  onTextChange(e, type) {
    let newStateObj = {};
    newStateObj[type] = e.target.value;
    this.setState({...newStateObj});
  }

  submitAnswer() {
    console.log(this.state);
  }

  render() {
    const {questionTitle, questionDescription, type} = this.state.questionDetails || {};
    return (
      <div>
        {this.state.questionDetails ?
          <div>
            <div className="d-flex flex-column">

              <div className="p-0">
                <h5>{questionTitle}</h5>
                {questionDescription}
              </div>
              <div className="p-0">
                <div class="form-group">
                  <textarea className="form-control" rows="5" value={this.state.answer}
                    onChange={(e) => this.onTextChange(e, 'answer')}></textarea>
                </div>
              </div>
              <div className="align-self-end">
                <button className='btn btn-outline-dark login-btn' onClick={this.submitAnswer.bind(this)}>Submit</button>
              </div>
            </div>
          </div>
          : null
        }
      </div>
    )
  }
}
