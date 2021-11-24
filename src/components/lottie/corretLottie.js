import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import lottie from "lottie-web";
import correctAnswerAnim from "../../static/lottie/correct.json";

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

export default function CorrectLottie() {
  const classes = useStyles();
  React.useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#correct_anim"),
      animationData: correctAnswerAnim,
      loop: false,
      autoplay: true,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    });
  });
  return (
    <div className={classes.root}>
      <div id="correct_anim"></div>
    </div>
  );
}
