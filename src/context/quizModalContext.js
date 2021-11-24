import React, { createContext } from "react";
export const QuizBackDropContext = createContext();
class QuizBackDropContextProvider extends React.Component {
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
      <QuizBackDropContext.Provider
        value={{
          showBackDrop: this.state.showBackDrop,
          dispatchBackDropEvent: this.dispatchBackDropEvent,
        }}
      >
        {this.props.children}
      </QuizBackDropContext.Provider>
    );
  }
}
export default QuizBackDropContextProvider;
