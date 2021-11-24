import React, { createContext } from "react";
export const ProfileContext = createContext();
class ProfileContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      anchorEl: null,
    };
  }

  dispatchModalEvent = (actionType) => {
    switch (actionType) {
      case "OPEN_PROFILE_MODAL":
        console.log("open Modal");
        this.setState({ modalOpen: true });
        return;
      case "CLOSE_PROFILE_MODAL":
        console.log("close modal");
        this.setState({ modalOpen: false, anchorEl: null });

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
      <ProfileContext.Provider
        value={{
          modalOpen: this.state.modalOpen,
          dispatchModalEvent: this.dispatchModalEvent,
        }}
      >
        {this.props.children}
      </ProfileContext.Provider>
    );
  }
}
export default ProfileContextProvider;
