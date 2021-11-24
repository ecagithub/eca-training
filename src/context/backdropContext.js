import React, { createContext } from "react";
export const BackDropContext = createContext();
class BackDropContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBackDrop: false,
    };
  }

  dispatchBackDropEvent = (actionType) => {
    switch (actionType) {
      case "OPEN_BACKDROP":
        console.log("open BaCJDEOP");
        this.setState({ showBackDrop: true });
        return;
      case "CLOSE_BACKDROP":
        this.setState({ showBackDrop: false });
        return;
      default:
        return;
    }
  };
  render() {
    return (
      <BackDropContext.Provider
        value={{
          showBackDrop: this.state.showBackDrop,
          dispatchBackDropEvent: this.dispatchBackDropEvent,
        }}
      >
        {this.props.children}
      </BackDropContext.Provider>
    );
  }
}
export default BackDropContextProvider;
