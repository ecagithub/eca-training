import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    loader: {
      position: "absolute",
    },
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
export default function CircularIndeterminate() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  return (
    <div className={classes.root}>
      <CircularProgress style={modalStyle} />
    </div>
  );
}
