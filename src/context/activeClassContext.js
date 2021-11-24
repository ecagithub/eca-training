import React, { createContext } from "react";
export const ActiveClassContext = createContext();
class ActiveClassProvider extends React.Component {
  state = {
    id: [],
    isActive: false,
    activeClass: {
      text: "white",
      backgroundColor: "green",
    },
    nonActiveClass: {
      text: "#000",
      backgroundColor: "none",
    },
  };
  makeActiveClass = (Id) => {
    this.setState({ id: Id });
  };
  //   changeTheme = () => {
  //     this.setState({ isDarkTheme: !this.state.isDarkTheme });
  //   };
  render() {
    return (
      <ActiveClassContext.Provider
        value={{ ...this.state, makeActiveClass: this.makeActiveClass }}
      >
        {this.props.children}
      </ActiveClassContext.Provider>
    );
  }
}
export default ActiveClassProvider;
