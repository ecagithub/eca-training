import React from "react";
import { Component } from "react";

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

const MyContext = React.createContext();
class MyProvider extends Component {
  state = {
    users: [],
  };
  render() {
    return (
      <MyContext.Provider value={{ users: this.state.users }}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export { MyContext, MyProvider };
