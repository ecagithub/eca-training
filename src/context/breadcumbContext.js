import React, { createContext } from "react";

export const BreadcumbCompContext = createContext();
class BreadCumbCompContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcumb: [],
    };
  }
  resetTheBreadComb = () => {
    this.setState({
      breadcumb: [],
    });
  };

  changeBreadCumbContext = (data) => {
    console.log(this.state.breadcumb.lenght);
    this.setState({
      breadcumb: this.state.breadcumb.concat([data]),
    });
    console.log(this.state.breadcumb);
  };
  render() {
    return (
      <BreadcumbCompContext.Provider
        value={{
          ...this.state.breadcumb,
          changeBreadCumbContext: this.changeBreadCumbContext,
          resetTheBreadComb: this.resetTheBreadComb,
        }}
      >
        {this.props.children}
      </BreadcumbCompContext.Provider>
    );
  }
}
export default BreadCumbCompContextProvider;
