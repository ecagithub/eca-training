import React, { createContext } from "react";
export const SideBarContext = createContext();
class SideBarContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
    };
  }

  dispatchUserEvent = (actionType) => {
    switch (actionType) {
      case "OPEN_DRAWER":
        this.setState({ open: true });
        return;
      case "CLOSE_DRAWER":
        this.setState({ open: false });
        return;
      case "CLOSE":
        this.setState({ anchorEl: null });
        return;
      default:
        return;
    }
  };
  render() {
    return (
      <SideBarContext.Provider
        value={{
          open: this.state.open,
          dispatchUserEvent: this.dispatchUserEvent,
        }}
      >
        {this.props.children}
      </SideBarContext.Provider>
    );
  }
}
export default SideBarContextProvider;
