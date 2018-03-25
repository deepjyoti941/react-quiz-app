import React from 'react'
import Image from './assets/images/upgrad_logo.png';
import {Login} from "./containers";
import {StorageHelper} from './helpers';
import {
  NavigationButton
} from './components';
import {
  QuestionBuilder,
  QuestionList,
  QuestionDetails,
  StudentPage
} from "./containers";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import './App.css';

export default class AuthExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }

  componentDidMount() {
    StorageHelper.getItem('loginDetails').then((response) => {
      const loginDetails = JSON.parse(response);
      console.log(loginDetails);
      if (loginDetails) {
        this.setState(loginDetails);

      }
      // console.log(response);
    });
  }

  doLogin(loginObj) {
    console.log(loginObj);
    this.setState({
      type: loginObj.type,
      loggedIn: loginObj.loggedIn,
      id: loginObj.id
    });
    if (loginObj.loggedIn) {

      StorageHelper.setItem('loginDetails', JSON.stringify(loginObj))
    }
  }

  renderDefaultView() {
    if(!this.state.loggedIn) {
      return <Login doLogin={this.doLogin.bind(this)}/>
    } else if (this.state.loggedIn && this.state.type == 'Author') {
      return <Redirect to='/questions-list' />
    } else {
      const redirectTo = '/student-page?id='+this.state.id
      return <Redirect to={redirectTo} />
    }
  }

  logOut() {
    StorageHelper.deleteItem('loginDetails').then(() => {
      console.log('logged out');
      this.setState({loggedIn: false})
    })
  }

  render() {
    console.log('app is rerendering');
    return (
      <Router>
      <div>
        <nav className="navbar">
          <div className="container-fluid">
            <div className="navbar-header">
              <img src={Image} width="150"/>
            </div>
            {this.state.loggedIn ?
              <ul className="nav navbar-nav navbar-right">
                <li><NavigationButton title="Logout" path="/" doLogOut={this.logOut.bind(this)}/></li>
              </ul>
            : null}

          </div>
        </nav>

        <div className="container">

          {this.renderDefaultView()}
          {/* {!this.state.loggedIn ?
            <Login doLogin={this.doLogin.bind(this)}/>
            : null
          } */}

          <Route path="/question-builder" render={()=>
            <QuestionBuilder />
          }/>

          <Route path="/questions-list" render={()=>
            <QuestionList />
          }/>
          <Route path="/student-page" render={()=>
            <StudentPage />
          }/>
          <Route path="/login" render={()=>
            <Login />
          }/>
          <Route path="/questions" render={()=>
            <QuestionDetails />
          }/>
        </div>

      </div>
    </Router>
    )
  }
}
