import React, { createContext } from "react";
export const NotificationContext = createContext();
class NotificationContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  dispatchNotificationEvent = (actionType, event) => {
    switch (actionType) {
      case "SHOW_NOTIICATION":
        console.log("open Notification");
        console.log(event.currentTarget);
        this.setState({ anchorEl: event.currentTarget });
        return;
      case "CLOSE_NOTIICATION":
        this.setState({ anchorEl: null });

        return;
      case "CUSTOM_SHOW":
        this.setState({ anchorEl: event });
        return;
      default:
        return;
    }
  };
  render() {
    return (
      <NotificationContext.Provider
        value={{
          anchorEl: this.state.anchorEl,
          dispatchNotificationEvent: this.dispatchNotificationEvent,
        }}
      >
        {this.props.children}
      </NotificationContext.Provider>
    );
  }
}
export default NotificationContextProvider;
