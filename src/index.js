import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ThemeContextProvider from "./context/themeContext";
import BreadCumbCompContextProvider from "./context/breadcumbContext";
import SideBarContextProvider from "./context/sidebarContext";
import ActiveClassProvider from "./context/activeClassContext";
import ProfileContextProvider from "./context/profileContext";
import NotificationContextProvider from "./context/notificationContext";
import ActivationContextProvider from "./context/activationContext";
import BackDropContextProvider from "./context/backdropContext";
import ToastContextProvider from "./context/toastContext";
import QuizBackDropContextProvider from "./context/quizModalContext";

ReactDOM.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <BreadCumbCompContextProvider>
        <SideBarContextProvider>
          <ActiveClassProvider>
            <ProfileContextProvider>
              <NotificationContextProvider>
                <ActivationContextProvider>
                  <BackDropContextProvider>
                    <ToastContextProvider>
                      <QuizBackDropContextProvider>
                        <App />
                      </QuizBackDropContextProvider>
                    </ToastContextProvider>
                  </BackDropContextProvider>
                </ActivationContextProvider>
              </NotificationContextProvider>
            </ProfileContextProvider>
          </ActiveClassProvider>
        </SideBarContextProvider>
      </BreadCumbCompContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
