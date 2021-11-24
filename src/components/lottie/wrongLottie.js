import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import lottie from "lottie-web";
import Wrong from "../../static/lottie/wrong.json";

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

export default function WrongLottie() {
  const classes = useStyles();
  React.useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#wrong_anim"),
      animationData: Wrong,
      loop: false,
      autoplay: true,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    });
  });
  return (
    <div className={classes.root}>
      <div id="wrong_anim"></div>
    </div>
  );
}
