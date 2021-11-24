import React, { useContext, useState } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeContext } from "../../context/themeContext";
import { ProfileContext } from "../../context/profileContext";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    position: "absolute",
    width: 700,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
function ProfileModal(props) {
  const [modalStyle] = React.useState(getModalStyle);
  const [profile, setProfile] = useState([]);
  const { darkState } = useContext(ThemeContext);
  const { dispatchModalEvent } = useContext(ProfileContext);

  const classes = useStyles();
  const [inputs, setInputs] = useState({});
  React.useEffect(() => {
    async function fetchUserDetails() {
      const res1 = await window.electron.database.insertUserDetail(inputs);
      const res = await window.electron.database.fetchUserDetails();
      console.log(res);
      setProfile(res);
    }
    fetchUserDetails();
  }, [profile]);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit");
    console.log(inputs);
    const res = await window.electron.database.insertUserDetail(inputs);
    console.log(res);
  };

  return (
    <Modal
      open={props.open}
      onClose={props.close}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          variant="outlined"
          value={profile.enrolledDate}
          onChange={handleChange}
        />
        <p>{profile.enrolledDate}</p>
      </div>
    </Modal>
  );
}
export default ProfileModal;
