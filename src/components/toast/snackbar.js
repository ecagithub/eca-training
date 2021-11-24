import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContext } from "../../context/toastContext";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles();
  const { toastOpen, classType, message, dispatchSnackBarEvent } =
    useContext(ToastContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatchSnackBarEvent("CLOSE_SNACKBAR");
  };

  return (
    <div className={classes.root}>
      <Snackbar open={toastOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={classType}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
