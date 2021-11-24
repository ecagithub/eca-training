import React, { createContext } from "react";
export const ActivationContext = createContext();

class ActivationContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      license_data: window.electron.license.fetchActivationDetails(),
      response: [],
    };
  }

  dispatchActivationEvent = async (actionType, ActivationCode) => {
    switch (actionType) {
      case "ACTIVATE_KEY":
        console.log("ACTIVATE_KEY");
        const res = await window.electron.license.activateLicense(
          ActivationCode
        );

        //let res = window.electron.license.activateLicense(ActivationCode);
        this.setState({ response: res });
        return;
      case "ACTIVATION_SUCCESS_CALL":
        console.log("ACTIVATION_SUCCESS_CALL");
        window.electron.license.activationSuccessCall();
        return;
      default:
        return;
    }
  };
  render() {
    return (
      <ActivationContext.Provider
        value={{
          license_data: this.state.license_data,
          response: this.state.response,
          dispatchActivationEvent: this.dispatchActivationEvent,
        }}
      >
        {this.props.children}
      </ActivationContext.Provider>
    );
  }
}
export default ActivationContextProvider;
