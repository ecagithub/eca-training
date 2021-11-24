import React, { useState, useContext } from "react";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Dialog from "@material-ui/core/Dialog";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { useHistory } from "react-router-dom";
import { ActivationContext } from "../../context/activationContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  topScrollPaper: {
    alignItems: "flex-start",
  },
  topPaperScrollBody: {
    verticalAlign: "top",
  },
}));

export default function SearchAppBar() {
  let history = useHistory();
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchLength, setSearchLength] = useState("");
  const [open, setOpen] = React.useState(false);
  const [license, setLicense] = React.useState(false);
  const { license_data } = useContext(ActivationContext);
  React.useEffect(() => {
    setLicense(license_data.expired);
  }, []);
  const handleClose = () => {
    let searchValue = document.getElementById("searchInput");
    searchValue.value = "";
    setOpen(false);
    searchResult.length = 0;
  };

  const handleListItemClick = (value) => {
    console.log(value);
    let list = value.split("/");
    console.log(list);
    let searchValue = document.getElementById("searchInput");
    switch (list.length) {
      case 1:
        history.push("/subjects/" + list[0]);
        setOpen(false);
        searchResult.length = 0;
        searchValue.value = "";

        break;
      case 2:
        history.push("/chapters/" + list[0] + "/" + list[1]);
        setOpen(false);
        searchResult.length = 0;
        searchValue.value = "";

        break;
      case 3:
        history.push("/mainPage/" + list[0] + "/" + list[1] + "/" + list[2]);
        setOpen(false);
        searchResult.length = 0;
        searchValue.value = "";
        break;
      case 4:
        history.push(
          "/showContent/" +
            list[0] +
            "/" +
            list[1] +
            "/" +
            list[2] +
            "/" +
            list[3]
        );
        setOpen(false);
        searchResult.length = 0;
        searchValue.value = "";
        break;
      default:
        break;
    }
  };
  const onKeyUp = async (event) => {
    if (event.charCode === 13) {
      setSearchValue(event.target.value);
      let data = await window.electron.search.searchFunction(
        event.target.value
      );
      console.log(data);
      if (data.length < 1) {
        setSearchLength(data.length);
        setOpen(true);
      } else {
        data.forEach((data, index) => {
          let arr = data.split("\\");
          let text = "";
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "contents") {
              arr.splice(0, i + 1);
              continue;
            }
          }
          for (let i = 0; i < arr.length; i++) {
            if (i === arr.length - 1) text += arr[i];
            else text += arr[i] + "/";
          }
          searchResult.push(text);
        });
        setSearchResult(searchResult);
        setSearchLength(data.length);
        setOpen(true);
      }
    }
  };
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon style={{ cursor: "pointer" }} />
      </div>
      <InputBase
        placeholder="Press Enter to Search..."
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        disabled={license ? true : false}
        id="searchInput"
        inputProps={{ "aria-label": "search" }}
        onKeyPress={onKeyUp}
      />
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
        scroll="paper"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <DialogTitle id="simple-dialog-title">
          {searchLength > 0 ? (
            <p>
              {" "}
              {searchLength} Search Result for {searchValue}
            </p>
          ) : (
            <p>Oops No Result for {searchValue}</p>
          )}{" "}
        </DialogTitle>
        <List>
          {searchResult.length > 0 ? (
            searchResult.map((data) => (
              <ListItem
                button
                onClick={() => handleListItemClick(data)}
                key={data}
              >
                <ListItemAvatar>
                  {(() => {
                    switch (data.split(".").pop()) {
                      case "pdf":
                        return <PictureAsPdfIcon />;
                        break;
                      case "mp4":
                        return <PlayCircleOutlineIcon />;
                      default:
                        return <FolderIcon />;
                    }
                  })()}
                </ListItemAvatar>
                <ListItemText primary={data} />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PriorityHighIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={searchValue} />
            </ListItem>
          )}
        </List>
      </Dialog>
    </div>
  );
}
