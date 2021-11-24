import React, { useContext } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import { ActiveClassContext } from "../../context/activeClassContext";
function SidebarComponent(props) {
  const context = useContext(ActiveClassContext);
  const updateID = (Id) => {
    context.makeActiveClass(Id);
  };

  const onDrageStart = (event, course, subject, chapter, topic) => {
    if (topic.split(".").pop() === "pdf") {
      console.log("dragstarted");
      var pdf_data = {
        course: course,
        sub: subject,
        chap: chapter,
        fileName: topic,
        id: event.target.id,
      };
      console.log(pdf_data);
      event.dataTransfer.setData("pdf", JSON.stringify(pdf_data));
    } else if (topic.split(".").pop() === "mp4") {
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
  switch (props.topicName.split(".").pop()) {
    case "pdf":
      return (
        // <Link
        //   className="btn btn-outline-primary"
        //   to={`/showContent/${props.courseName}/${props.subject}/${props.chapter}/${props.topicName}`}
        //   style={{ textDecoration: "none" }}
        //   id={props.topicName}
        //   onClick={() => {
        //     updateID(props.topicName);
        //   }}
        // >
        <Tooltip title={props.topicName} placement="right">
          <ListItem
            button
            key={props.topicName}
            draggable
            onDragStart={(e) => {
              onDrageStart(
                e,
                props.courseName,
                props.subject,
                props.chapter,
                props.topicName
              );
            }}
            id={props.course + props.topicName}
            onClick={(e) => {
              console.log("clicked");
              console.log(e.target.id);
              props.getOnclickData(
                e,
                props.courseName,
                props.subject,
                props.chapter,
                props.topicName
              );
            }}
          >
            <ListItemIcon>
              {" "}
              <PictureAsPdfIcon />
            </ListItemIcon>
            <ListItemText primary={props.topicName} />
          </ListItem>
        </Tooltip>
        // </Link>
      );

    case "mp4":
      return (
        // <Link
        //   className="btn btn-outline-primary"
        //   to={`/showContent/${props.courseName}/${props.subject}/${props.chapter}/${props.topicName}`}
        //   style={{ textDecoration: "none" }}
        // >
        <Tooltip title={props.topicName} placement="right">
          <ListItem
            button
            key={props.topicName}
            draggable
            onDragStart={(e) => {
              onDrageStart(
                e,
                props.courseName,
                props.subject,
                props.chapter,
                props.topicName
              );
            }}
            id={props.course + props.topicName}
            onClick={(e) => {
              console.log("clicked");
              console.log(e.target.id);
              props.getOnclickData(
                e,
                props.courseName,
                props.subject,
                props.chapter,
                props.topicName
              );
            }}
          >
            <ListItemIcon>
              {" "}
              <PlayCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={props.topicName} />
          </ListItem>
        </Tooltip>
        // </Link>
      );

    case "json":
      return (
        // <Link
        //   className="btn btn-outline-primary"
        //   to={`/quiz/${props.courseName}/${props.subject}/${props.chapter}`}
        //   style={{ textDecoration: "none" }}
        // >
        <Tooltip title={props.topicName} placement="right">
          <ListItem
            button
            key={props.topicName}
            draggable
            onClick={(e) => {
              console.log("json clicked");
              console.log(e.target.id);
              props.getOnclickData(
                e,
                props.courseName,
                props.subject,
                props.chapter,
                props.topicName
              );
            }}
          >
            <ListItemIcon>
              {" "}
              <TurnedInIcon />
            </ListItemIcon>
            <ListItemText primary={props.topicName} />
          </ListItem>
        </Tooltip>
        // </Link>
      );
    default:
      return (
        // <Link className="btn btn-outline-primary">
        <Tooltip title="Home" placement="right">
          <ListItem button key="Home">
            <ListItemIcon>
              <TurnedInIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Tooltip>
        // </Link>
      );
  }
}

export default SidebarComponent;
