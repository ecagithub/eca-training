import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
const styles = () => ({
  root: {
    maxWidth: 345,
    transition: "transform 0.15s ease-in-out",
  },
  media: {
    height: 140,
  },
  customMargin: {
    marginBottom: "10px",
  },
  cardHovered: {
    transform: "scale3d(1.05, 1.05, 1)",
  },
});

const Subjects = (props) => {
  const classes = styles();
  const [state, setState] = useState({
    raised: false,
    shadow: 1,
  });
  return (
    <React.Fragment>
      <Grid item xs={12} sm={3} md={3}>
        <Link
          className="btn btn-outline-primary"
          to={`/chapters/${props.courseName}/${props.subjectName}`}
          style={{ textDecoration: "none" }}
        >
          <Card
            className={classes.root}
            classes={{ root: state.raised ? classes.cardHovered : "" }}
            key={props.index}
            onMouseOver={() => setState({ raised: true, shadow: 3 })}
            onMouseOut={() => setState({ raised: false, shadow: 1 })}
            raised={state.raised}
            zDepth={state.shadow}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                className={classes.media}
                image={
                  process.env.PUBLIC_URL +
                  "/images/" +
                  props.subjectName +
                  ".jpg"
                }
                height="250"
                title={props.subjectName}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {props.subjectName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {props.courseName}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" variant="outlined" color="secondary">
                Start Learning
              </Button>
            </CardActions>
          </Card>
        </Link>
      </Grid>
    </React.Fragment>
  );
};

export default Subjects;
