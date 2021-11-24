import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import SidebarComponent from "./sidebarContent";
import { ActiveClassContext } from "../../context/activeClassContext";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minHeight: 290,
  },
  media: {
    height: 140,
  },
  activeClass: {
    backgroundColor: "green !important",
    color: "white",
  },
});
export default function Sidebar(props) {
  const classes = useStyles();
  const context = useContext(ActiveClassContext);
  console.log(context.activeClass);
  const { courseName, subjectName, chapterName } = useParams();
  const [content, setContent] = useState([]);
  React.useEffect(() => {
    async function fechSubjects() {
      let chap_list = {
        course: courseName,
        sub: subjectName,
        chap: chapterName,
      };
      const res = await window.electron.file.fetchFile(chap_list);
      setContent(res);
    }

    fechSubjects();
  }, []);
  const showElement = (event, course, subject, chapter, file) => {
    console.log(event.target.parentNode);
    console.log(event.target.id);
    event.stopPropagation();

    // var topMostDiv = event.target.parents("div").last();
    // console.log(topMostDiv);
    // var btns = document.getElementsByClassName("MuiListItem-button");

    // btns.classList.contains(".activeClass")

    // var elems = document.querySelectorAll(".activeClass");
    // [].forEach.call(elems, function (el) {
    //   el.classList.remove(classes.activeClass);
    // });
    // event.target.classList.add(classes.activeClass);
    // const element = document.getElementById(event.target.id);
    //element.style.backgroundColor = "green";
    //element.style.color = "white";

    props.getOnclickData(event, course, subject, chapter, file);
  };
  return (
    <React.Fragment>
      {content.map((topic, index) => (
        <SidebarComponent
          courseName={courseName}
          subject={subjectName}
          chapter={chapterName}
          topicName={topic}
          index={index}
          showElement={showElement}
        />
      ))}
    </React.Fragment>
  );
}
