import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackTwoToneIcon from "@material-ui/icons/ArrowBackTwoTone";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function IconLabelButtons() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Button
      onClick={() => {
        console.log(history.length);
        history.goBack();
      }}
      disabled={history.length < 1}
      variant="contained"
      color="default"
      className={classes.button}
      style={{ marginRight: "10px" }}
      startIcon={<ArrowBackTwoToneIcon />}
    >
      Back
    </Button>
  );
}
