import React, { useContext, useEffect, useState } from "react";
import ReactCodeInput from "react-code-input";
import Button from "@material-ui/core/Button";
import { Drawer } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import BackDrop from "../components/loader/backdrop";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Toast from "../components/toast/snackbar";
import { ActivationContext } from "../context/activationContext";
import { SideBarContext } from "../context/sidebarContext";
import { BackDropContext } from "../context/backdropContext";
import { ToastContext } from "../context/toastContext";
import Footer from "../components/footer/footer";
import clsx from "clsx";
//const si = require("systeminformation");
const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  root1: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function ActivationPage() {
  const [isPinCodeValid, setIsPinCodeValid] = useState(true);
  const [verificationCode, setPinCode] = useState("");
  const [disableBtn, setdisableBtn] = useState(true);
  const { dispatchUserEvent, open } = useContext(SideBarContext);
  const { dispatchActivationEvent } = useContext(ActivationContext);
  const { showBackDrop, dispatchBackDropEvent } = useContext(BackDropContext);
  const { toastOpen, classType, dispatchSnackBarEvent } =
    useContext(ToastContext);
  const classes = useStyles();
  const theme = useTheme();
  const handleDrawerClose = () => {
    dispatchUserEvent("CLOSE_DRAWER");
  };

  const checkVerificationCode = async () => {
    dispatchBackDropEvent("OPEN_BACKDROP");
    const res = await window.electron.license.activateLicense(verificationCode);
    console.log(res);

    if (res === "success") {
      dispatchBackDropEvent("CLOSE_BACKDROP");
      dispatchSnackBarEvent(
        "SHOW_SNACKBAR",
        "success",
        "successfully activated"
      );

      dispatchActivationEvent("ACTIVATION_SUCCESS_CALL");
    } else if (res === "no") {
      setTimeout(() => {
        dispatchBackDropEvent("CLOSE_BACKDROP");
        dispatchSnackBarEvent(
          "SHOW_SNACKBAR",
          "error",
          "Invalid Activation key"
        );
      }, 3000);
    }
  };

  return (
    <>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <BackDrop open={showBackDrop} />
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "80vh" }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h4" gutterBottom>
              Enter the Activation Code wihout - to Activate it
            </Typography>
            <ReactCodeInput
              type="array"
              filterChars="."
              fields={20}
              isValid={isPinCodeValid}
              filterCharsIsWhitelist={true}
              onChange={(data) => {
                if (data.length === 20) {
                  let licenseFormatData = data.match(/.{1,5}/g);
                  const verificCode = licenseFormatData.join("-");
                  setPinCode(verificCode);
                  setdisableBtn(false);
                } else {
                  setdisableBtn(true);
                }
              }}
            />

            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={checkVerificationCode}
              disabled={disableBtn}
            >
              Activate
            </Button>

            <Toast />
          </Grid>
        </Grid>
        <Footer />
      </main>
    </>
  );
}
