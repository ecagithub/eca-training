import React, { createContext } from "react";

export const ThemeContext = createContext();
class ThemeContextProvider extends React.Component {
  state = {
    darkMode: false,
    isDarkTheme: true,
    darkState: false,
    palletType: "light",
    mainPrimaryColor: "#ffffff",
    mainSecondaryColor: "#000000",
  };

  themeReducer = (action) => {
    switch (action) {
      case "LIGHTMODE":
        console.log("entered in light mode");
        this.setState({
          darkState: false,
          palletType: "light",
          mainPrimaryColor: "#ffffff",
          mainSecondaryColor: "#000000",
        });
        return;
      case "DARKMODE":
        console.log("entered in dark mode");
        this.setState({
          darkState: true,
          palletType: "dark",
          mainPrimaryColor: "#000000",
          mainSecondaryColor: "#ffffff",
        });
        return;
      default:
        return this.state;
    }
  };

  render() {
    return (
      <ThemeContext.Provider
        value={{ ...this.state, themeReducer: this.themeReducer }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}
export default ThemeContextProvider;
