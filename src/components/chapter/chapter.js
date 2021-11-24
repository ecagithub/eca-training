import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ChapterListItem from "./chpaterListComponent";
import lottie from "lottie-web";
import NotFoundData from "../../static/lottie/notFound.json";
const useStyles = makeStyles((theme) => ({
  root1: {
    flexGrow: 1,
  },
}));
export default function Chapters() {
  const { courseName, subjectName } = useParams();
  const classes = useStyles();
  const [chapters, setChapters] = React.useState([]);
  React.useEffect(() => {
    async function fechSubjects() {
      let chap_list = {
        course: courseName,
        sub: subjectName,
      };
      lottie.loadAnimation({
        container: document.querySelector("#notFound"),
        animationData: NotFoundData,
        loop: false,
        autoplay: true,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      });
      console.log(chap_list);

      const res = await window.electron.chapter.fetchChapters(chap_list);
      console.log(res);
      console.log(typeof res);
      setChapters(res);
      //ipcRenderer.removeListener("chap", chap_list)
      console.log([...chapters]);
    }

    fechSubjects();
  }, []);
  return chapters.length > 0 ? (
    <React.Fragment>
      <div className={classes.root1}>
        <Grid container spacing={3}>
          {chapters.map((chapter, index) => (
            <ChapterListItem
              courseName={courseName}
              subjectName={subjectName}
              chapterName={chapter}
              index={index}
            />
          ))}
        </Grid>
      </div>
    </React.Fragment>
  ) : (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h5" gutterBottom>
        <sapn style={{ color: "red" }}>Opps No Chapter found</sapn> for subject{" "}
        <span style={{ color: "green" }}>{subjectName}</span> inside{" "}
        <sapn style={{ color: "green" }}>{courseName}</sapn> Course
      </Typography>
      <div id="notFound"></div>
    </Grid>
  );
}
