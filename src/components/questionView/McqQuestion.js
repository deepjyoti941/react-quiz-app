import React, {Component} from 'react';

export default class McqQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: [],
      questionDetails: props.data
    }
  }

  componentWillReceiveProps(nextProps) {
    let dataNew =  Object.assign({}, nextProps.data)
    let {options} = dataNew;
    options.map((item) => {
      return item.is_right = false;
    });
    dataNew.options = options
    console.log(options);
    this.setState({
      questionDetails: dataNew
    })
  }

  checkAnswer(event, index) {
    let options = this.state.questionDetails.options.slice();
    options[index].is_right = event.target.checked;
    this.setState({options});
  }

  onTypeChanged(e) {
    console.log(e.currentTarget.id);
    this.setState({
      selectedOption: e.currentTarget.id
      });
  }

  submitAnswer() {
    console.log(this.state);
  }

  render() {
    const {questionTitle, questionDescription, options, type} = this.state.questionDetails || {};
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
                <ul className="p-0" style={{marginTop: 10}}>
                  {
                    options.map((item, index) => {
                      return (
                        <li key={index} className="list-group-item" style={{paddingLeft: 30}}>
                          <input className="form-check-input" style={{}}
                            type="checkbox" checked={item.is_right}
                            onChange={(e) => this.checkAnswer(e, index)}/>
                            <span className="questionText">{item.value}</span>
                        </li>
                      )
                    })
                  }
                </ul>
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
