import React, { useState, useContext, useEffect } from "react";
import { emphasize, withStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Chip from "@material-ui/core/Chip";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory, useParams } from "react-router-dom";
import { BreadcumbCompContext } from "../../context/breadcumbContext";
//hooks
const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.grey[300],
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

export default function CustomizedBreadcrumbs() {
  const [nav, setNav] = useState({});
  const context = useContext(BreadcumbCompContext);

  console.log(context.breadcumb);
  const history = useHistory();
  useEffect(() => {
    setNav(context);
  }, []);
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <StyledBreadcrumb
        component="a"
        href="/"
        label="Home"
        icon={<HomeIcon fontSize="small" />}
        onClick={() => {
          context.resetTheBreadComb;
          history.goBack();
        }}
      />
      {Object.keys(context).length !== 0 &&
        Object.keys(context).map((data, index) => (
          <StyledBreadcrumb
            component="a"
            href={context[data].link}
            label={context[data].label}
          />
        ))}
    </Breadcrumbs>
  );
}
