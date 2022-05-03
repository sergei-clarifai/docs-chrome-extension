import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Options from './Options';
import Popup from './Popup';
import Tab from './Tab';
import Foreground from './Foreground';

function Main() {
  return (
    <Router>
      <div style={styles.container}>
        <div style={styles.nav_bar}>
          <h1>Chrome Ext - Options</h1>
            <nav>
              <ul>
                <li>
                  <Link to="/options">Options</Link>
                </li>
                <li>
                  <Link to="/popup">Popup</Link>
                </li>
                <li>
                  <Link to="/foreground">Foreground</Link>
                </li>
                <li>
                  <Link to="/tab">Tab</Link>
                </li>
              </ul>
            </nav>
            </div>
        <Switch>
          <Route exact path="/popup">
            <Popup />
          </Route>
          <Route exact path="/foreground">
            <Foreground />
          </Route>
          <Route exact path="/tab">
            <Tab />
          </Route>
          <Route exact path="/options">
            <Options />
          </Route>
          <Route exact path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    nav_bar: {
        // position: 'relative',
        // left: '50%',
        // transform: 'translate(-50%, 0%)',
        // width: 'fit-content',
        marginBottom: '50px',
        flex: 1,
    }
}

export default Main;