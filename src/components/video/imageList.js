import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    marginLeft: "10px",
  },
  imageList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export default function TitlebarImageList(props) {
  const classes = useStyles();

  const onDrageStart = (event, course, subject, chapter, topic) => {
    if (topic.split(".").pop() === "mp4") {
      console.log("video dragged");
      let video_data = {
        course: course,
        sub: subject,
        chap: chapter,
        fileName: topic,
        id: event.target.id,
      };
      event.dataTransfer.setData("video", JSON.stringify(video_data));
    }
  };

  return (
    <div className={classes.root}>
      <ImageList style={{ height: "79vh" }} className={classes.imageList}>
        <ImageListItem key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div" variant="h1">
            Videos Tutorials
          </ListSubheader>
        </ImageListItem>

        {props.images.length > 0 ? (
          props.images.map(
            (item) =>
              item.split(".").pop() === "mp4" && (
                <ImageListItem
                  key={item}
                  draggable
                  onDragStart={(e) => {
                    onDrageStart(
                      e,
                      props.courseName,
                      props.subject,
                      props.chapter,
                      item
                    );
                  }}
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    console.log("clicked video");
                    console.log(e.target.id);
                    props.getOnclickData(
                      e,
                      props.courseName,
                      props.subject,
                      props.chapter,
                      item
                    );
                  }}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/images/thumbnails/" +
                      item.substr(0, item.lastIndexOf(".")) +
                      ".png"
                    }
                    alt={item}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={item}
                    subtitle={<span>by: {item.author}</span>}
                    actionIcon={
                      <IconButton
                        aria-label={`info about ${item}`}
                        className={classes.icon}
                      >
                        <PlayCircleOutlineIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              )
          )
        ) : (
          <p>NO tutorila for this chapter</p>
        )}
      </ImageList>
    </div>
  );
}
