import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
const { ipcRenderer } = window.require("electron");
const styles = () =>({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  
});
let course = ipcRenderer.sendSync('course');
class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseData: [], 
             subject: []
          
          };
      }

componentDidMount() {
    this.setState({
        courseData : course
      })
  }

  fetchSub = (e) =>{

   
  //   console.log(e.currentTarget.name)
  //   console.log(e.target.getAttribute("data-id"))
  // let sub = ipcRenderer.sendSync('sub', e.target.getAttribute("data-id"));
  //  this.setState({
  //   subject: sub
  //  })
  //  console.log(this.state.subject)
  }
 render(){
    const { classes } = this.props;
    return (
        <>
         
          
         {Object.keys(this.state.courseData).map((data, index) =>(
           <Grid item xs={12} sm={6} md={4}  data-id={this.state.courseData[data]} onClick={this.fetchSub} >
            <Card className={classes.root}  key={index} data-id={this.state.courseData[data]} onClick={this.fetchSub}>
            <CardActionArea data-id={this.state.courseData[data]} onClick={this.fetchSub} >
              <CardMedia
                className={classes.media}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
                data-id={this.state.courseData[data]} onClick={this.fetchSub} 
              />
              <CardContent data-id={this.state.courseData[data]} onClick={this.fetchSub} >
                <Typography gutterBottom variant="h5" component="h2" data-id={this.state.courseData[data]} onClick={this.fetchSub}>
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" data-id={this.state.courseData[data]} onClick={this.fetchSub}>
                {this.state.courseData[data] }
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions data-id={this.state.courseData[data]} onClick={this.fetchSub}>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
            
          </Card>
          </Grid>
          ))}
     
     
     
     
    </>
    
      );
 }


}
export default withStyles(styles)(Courses)
