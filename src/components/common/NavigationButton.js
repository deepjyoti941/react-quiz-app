import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'

const NavigationButton = ({title, history, path, id, doLogin, doLogOut, type }) => (
  <button type="button"
    className="btn btn-outline-dark login-btn"
    disabled={doLogin && !type ? true: false}
    onClick={() => {
      if(doLogin) doLogin({type, id, loggedIn: true});
      if (doLogOut) doLogOut(true)
      history.push({
        pathname: path,
        search: id ?'?id='+id: null,
      })
    }
  }
    >
    {title}
    </button>
);

export default withRouter(NavigationButton);
