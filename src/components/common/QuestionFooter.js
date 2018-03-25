import React, {Component} from 'react';

export default class QuestionFooter extends Component {
  constructor(props) {
    super(props);
    console.log('QuestionFooter props', props);
  }

  render() {
    const {onCancelClick, onClick, onUpdateClick} = this.props;
    return (
      <div className="question-builder-footer">
        <div className="card">
          <div className="card-footer d-flex flex-row justify-content-between">
            <div>
              <small className="text-muted">Click author to create a new question and will be added automatically to the question list</small>
            </div>
            <div>
              <button type="button" className="btn btn-outline-dark login-btn" onClick={onCancelClick}>Cancel</button>
              {
                this.props.data ?
                <button type="button" className="btn btn-warning login-btn" onClick={onUpdateClick}>Update</button>

                :<button type="button" className="btn btn-primary login-btn" onClick={onClick}>Author</button>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
