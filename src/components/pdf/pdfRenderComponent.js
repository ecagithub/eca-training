import React, { useState, useRef, useEffect, useContext } from "react";
import { Document, Page, Outline, pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { alpha, makeStyles } from "@material-ui/core/styles";
import throttle from "lodash/throttle";
import Loader from "../loader/loader";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { BackDropContext } from "../../context/backdropContext";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
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
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  html: {
    scrollBehavior: "smooth",
  },
}));
export default function PdfRenderComponent(props) {
  const { dispatchBackDropEvent, showBackDrop } = useContext(BackDropContext);
  const classes = useStyles();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [initialWidth, setInitialWidth] = useState();
  const [pdfPath, setpdfPath] = React.useState();
  const pdfWrapper = useRef(null);
  const scrollDiv = useRef();
  const [searchText, setSearchText] = useState("document");
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    // console.log(scrollDiv.current.getBoundingClientRect().top);
    // window.scrollTo(0, scrollDiv.current.getBoundingClientRect().top);
    changePage(-1);
  }

  function nextPage() {
    var el = document.getElementById("scrollTarget");
    el.scrollTop = el.scrollHeight;

    setTimeout(function () {
      el.scrollTop = 0;
    }, 1000);
    changePage(1);

    //window.scroll({ top: 0, behavior: "smooth" });
  }
  function onItemClick({ pageNumber: itemPageNumber }) {
    setPageNumber(itemPageNumber);
  }

  React.useEffect(() => {
    console.log("useEffectCalled");
    const fetchData = async () => {
      console.log(props.courseName);
      console.log(props.subjectName);
      console.log(props.chapterName);
      console.log(props.topic);
      const pdfPaths =
        "http://localhost:8000/?course=" +
        props.courseName +
        "&sub=" +
        props.subjectName +
        "&chap=" +
        props.chapterName +
        "&file=" +
        props.topic;
      const pathValue = await pdfPaths.replace(/ /g, "+");
      console.log(pathValue);
      setpdfPath(pathValue);
    };

    const timer = setTimeout(() => {
      fetchData();
      dispatchBackDropEvent("CLOSE_BACKDROP");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const setPdfSize = () => {
    if (pdfWrapper && pdfWrapper.current) {
      console.log(pdfWrapper.current.getBoundingClientRect().width);
      setInitialWidth(pdfWrapper.current.getBoundingClientRect().width);
    }
  };
  const highlightPattern = (text, pattern) => {
    const splitText = text.split(pattern);
    if (splitText.length <= 1) {
      return text;
    }
    const matches = text.match(pattern);
    return splitText.reduce(
      (arr, element, index) =>
        matches[index]
          ? [...arr, element, <mark>{matches[index]}</mark>]
          : [...arr, element],
      []
    );
  };
  const makeTextRenderer = (searchText) => (textItem) =>
    highlightPattern(textItem.str, searchText);
  const onKeyUp = async (event) => {
    if (event.charCode === 13) {
    }
  };
  useEffect(() => {
    window.addEventListener("resize", throttle(setPdfSize, 3000));
    setPdfSize();
    return () => {
      window.removeEventListener("resize", throttle(setPdfSize, 3000));
    };
  }, []);

  return (
    <Grid
      xs={12}
      md={12}
      lg={12}
      ref={pdfWrapper}
      key={props.key}
      className={classes.root}
    >
      <Paper
        elevation={5}
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2px",
        }}
      >
        <Button
          variant="contained"
          size="small"
          color="primary"
          className={classes.margin}
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          Previous Page
        </Button>
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        {/* <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon style={{ cursor: "pointer" }} />
          </div>
          <InputBase
            placeholder="Press Enter to Search..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            id="searchInput"
            inputProps={{ "aria-label": "search" }}
          />
        </div> */}
        <Button
          variant="contained"
          size="small"
          color="primary"
          className={classes.margin}
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next Page
        </Button>
      </Paper>
      <Paper
        id="scrollTarget"
        ref={scrollDiv}
        style={{ height: "90vh", overflow: "scrollY", overflowX: "hidden" }}
      >
        <Paper>
          <Document
            file={pdfPath}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<Loader />}
          >
            <Outline onItemClick={onItemClick} />
            <Page
              pageNumber={pageNumber}
              size="A4"
              width={initialWidth}
              customTextRenderer={makeTextRenderer(searchText)}
            />
          </Document>
        </Paper>
      </Paper>
      {/* <Fab color="primary" aria-label="add" className={classes.fab}>
        <AddIcon />
      </Fab> */}
    </Grid>
  );
}
