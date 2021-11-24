import React, { createContext } from "react";
export const ToastContext = createContext();
class ToastContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toastOpen: false,
      classType: "success",
      message: "",
    };
  }

  dispatchSnackBarEvent = (actionType, classType, message) => {
    switch (actionType) {
      case "SHOW_SNACKBAR":
        this.setState({
          toastOpen: true,
          classType: classType,
          message: message,
        });
        return;
      case "CLOSE_SNACKBAR":
        this.setState({ toastOpen: false });
        return;
      default:
        return;
    }
  };
  render() {
    return (
      <ToastContext.Provider
        value={{
          toastOpen: this.state.toastOpen,
          classType: this.state.classType,
          message: this.state.message,
          dispatchSnackBarEvent: this.dispatchSnackBarEvent,
        }}
      >
        {this.props.children}
      </ToastContext.Provider>
    );
  }
}
export default ToastContextProvider;
