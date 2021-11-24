import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SendIcon from "@material-ui/icons/Send";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const SubjectListItem = (props) => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Link
        className="btn btn-outline-primary"
        style={{ textDecoration: "none" }}
        to={`/mainPage/${props.courseName}/${props.subjectName}/${props.chapterName}`}
      >
        <Paper className={classes.paper}>
          <ListItem button index={props.index}>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary={props.chapterName} />
          </ListItem>
        </Paper>
      </Link>
    </Grid>
  );
};

export default SubjectListItem;
