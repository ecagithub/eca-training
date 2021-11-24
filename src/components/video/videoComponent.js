import React, { useState, useContext } from "react";
import VideoJS from "./video";
import Loader from "../loader/loader";
import Grid from "@material-ui/core/Grid";
import { BackDropContext } from "../../context/backdropContext";
function VideoComponent(props) {
  const { dispatchBackDropEvent, showBackDrop } = useContext(BackDropContext);
  const [videoPath, setVideoPath] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      console.log(props.courseName);
      console.log(props.subjectName);
      console.log(props.chapterName);
      console.log(props.topic);
      const pdfPaths =
        "http://localhost:8000/video?course=" +
        props.courseName +
        "&sub=" +
        props.subjectName +
        "&chap=" +
        props.chapterName +
        "&file=" +
        props.topic;
      const pathValue = await pdfPaths.replace(/ /g, "+");
      setVideoPath(pathValue);
    };
    const timer = setTimeout(() => {
      fetchData();
      dispatchBackDropEvent("CLOSE_BACKDROP");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  const videoJsOptions = {
    controls: true,
    resizeManager: true,
    responsive: true,
    fluid: true,
    techOrder: ["html5"],
    class: "video-js vjs-default-skin",
    sources: [
      {
        src: videoPath,
        type: "video/mp4",
      },
    ],
  };
  return (
    <React.Fragment>
      <Grid xs={12} md={12} lg={12}>
        <VideoJS options={videoJsOptions} />
      </Grid>
    </React.Fragment>
  );
}

export default VideoComponent;
