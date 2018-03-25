import React, {Component} from 'react';
import {
  DropdownMenu,
  NavigationButton
} from '../../components';
import {StorageHelper} from '../../helpers';

const loginTypes = [{NAME: 'Student', id: 0}, {NAME: 'Author', id: 1}];

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginType: undefined,
      currentUser: undefined,
      dummyStudentList: [],
      navigationPath: undefined
    }
  }

  componentDidMount() {
    StorageHelper.studentList().then((response) => {
      console.log(response);
      this.setState({dummyStudentList:response})
    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      loginType: nextProps.loginType
    })
    console.log(nextProps);
  }

  handleInputChange(e) {
    this.setState({
      currentUser: e.target.value
    })
  }

  onTypeChanged(e) {
    console.log(e.currentTarget.value);
    if (e.currentTarget.value == 'Student') {
      this.setState({
        loginType: e.currentTarget.value,
        navigationPath: '/student-page'
        });
    } else {
      this.setState({
        loginType: e.currentTarget.value,
        navigationPath: '/questions-list'
        });
    }
  }

  renderLoginView() {
    return loginTypes.map((item, i) => {
      return <div style={{padding: 10}} key={i}>
        <input type="radio"
          name="site_name"
          value={item.NAME}
          checked={this.state.loginType === item.NAME}
          onChange={this.onTypeChanged.bind(this)}/>
        <span style={{marginLeft: 10}}>{item.NAME}</span>
      </div>
    })
  }

  render() {

    return (
      <div className="d-flex justify-content-md-center">
        <div className="col-md-6 col-sm-6">
          <div className="card">
            <div className="card-header">Please Select Login</div>
            <div className="card-body">
              <small className="text-muted" style={{padding: 10}}>I am a..</small><br/>

              {this.renderLoginView()}
              {this.state.loginType == 'Student' ?
                <div style={{marginTop: 10}}>
                  <DropdownMenu
                    name="FirstDropdown"
                    selectableData={this.state.dummyStudentList}
                    type={'login'}
                    handleInputChange={this.handleInputChange.bind(this)}
                  />
                </div>
                : null
              }
            </div>
            <div className="card-footer d-flex flex-row justify-content-between">
              <div>
                <small className="text-muted">Please login to continue</small>
              </div>
              <div>
                <button type="button" className="btn btn-outline-dark login-btn">Cancel</button>
                <NavigationButton
                  type={this.state.loginType}
                  doLogin={this.props.doLogin}
                  title="Login" path={this.state.navigationPath}
                  id={this.state.currentUser || null}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
