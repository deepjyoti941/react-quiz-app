import React, {Component} from 'react';

export default class SubmissionQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionDetails: props.data
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      questionDetails: nextProps.data
    })
  }

  render() {
    return (
      <div>SubmissionQuestion</div>
    )
  }
  
}
