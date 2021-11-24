import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { ActivationContext } from "../../context/activationContext";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit, // You might not need this now
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  footer: {
    margin: theme.spacing.unit, // You might not need this now
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function Footer() {
  const classes = useStyles();
  const license_data = useContext(ActivationContext);
  const [alignment, setAlignment] = useState("center");
  return (
    <div className={classes.root} style={{ marginBottom: "0px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align={alignment}>
            {license_data.license_data.appName} Version:
            {license_data.license_data.appVersion}
          </Typography>
          <Typography variant="subtitle2">
            License :
            {license_data.license_data.remainingDays}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
