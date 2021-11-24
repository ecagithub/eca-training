import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import WebIcon from "@material-ui/icons/Web";
import TocIcon from "@material-ui/icons/Toc";

import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";

import { Switch } from "@material-ui/core";

const aboutusClick = () => {};
function TopicComponent() {
  return (
    <React.Fragment>
      <List>
        <Tooltip title="Official Website" placement="right">
          <ListItem
            button
            key="Official Website"
            onClick={(e) => {
              console.log("clicked");
              window.electron.externalLinks.officialSite();
            }}
          >
            <ListItemIcon>
              <WebIcon />
            </ListItemIcon>
            <ListItemText primary="Official Website" />
          </ListItem>
        </Tooltip>
        {/* <Tooltip title={onlineStatus ? "Online" : "Offline"} placement="right">
          <ListItem button key={onlineStatus ? "Online" : "Offline"}>
            <ListItemIcon>
              <WebIcon />
            </ListItemIcon>
            <ListItemText primary={onlineStatus ? "Online" : "Offline"} />
          </ListItem>
        </Tooltip> */}
      </List>
      <Divider />
    </React.Fragment>
  );
}

export default TopicComponent;
