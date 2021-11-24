const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  Tray,
  Menu,
  MenuItem,
  shell,
  globalShortcut,
  BrowserView,
} = require("electron");
const electronReload = require("electron-reload");
const path = require("path");
const fs = require("fs");
const isDev = require("electron-is-dev");
const resources = path.join(__dirname, "contents");
const crypto = require("crypto");
const hash = crypto.createHash("sha256");
const gTTS = require("gtts");
const http = require("http");
var cors = require("cors");
const querystring = require("querystring");
const validate = require("./activate");
const { connected } = require("process");
const si = require("systeminformation");

//key
hash.update("mySecretkey1234");
const key = hash.digest();

const env = process.env.NODE_ENV || "development";
app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");

let win = null;
let expired;
let noLicense;
let licenseExist;
let progressInterval;
let licenceDetails;
let remainingDays;
const NOTIFICATION_TITLE = "ECA ";
const NOTIFICATION_BODY =
  "Welcome to Eca Computer Training Application " + app.getVersion();

function showNotification() {
  new Notification({
    title: NOTIFICATION_TITLE,
    body: NOTIFICATION_BODY,
  }).show();
}

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    minHeight: 600,
    minWidth: 800,
    title: "ECA TRAINING APPLICATION",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  const isMac = process.platform === "darwin";
  const template = [
    {
      label: "Options",
      submenu: [
        { role: "minimize" },
        ...(isMac
          ? [
              { type: "separator" },
              { role: "front" },
              { type: "separator" },
              { role: "window" },
            ]
          : [{ role: "close" }]),
      ],
    },
    {
      role: "help",
      submenu: [
        {
          label: "Conctact Us",
          click: async () => {
            const { shell } = require("electron");
            await shell.openExternal("https://www.ecanagaland.com/contact");
          },
        },
      ],
    },
  ];
  // win.webContents.openDevTools();
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  win.setContentProtection(true);
  // win.setMenu(null);

  try {
    let today = new Date();
    if (
      fs.existsSync(
        path.join(
          process.env.programData,
          "/eca-training-app/license_info.json"
        )
      )
    ) {
      console.log("entered in licence exist");
      const file = fs.readFileSync(
        path.join(
          process.env.programData,
          "/eca-training-app/license_info.json"
        )
      );

      // // Decrypt
      // var bytes = CryptoJS.AES.decrypt(file, "secret key 123");
      // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      // console.log(decryptedData);
      let licenceDetails = JSON.parse(file);
      let today = new Date();
      remainingDays = Math.floor(
        (new Date(licenceDetails.Expire_Date) - today) / (1000 * 60 * 60 * 24)
      );
      console.log(remainingDays.toString());
      // return dff.toString();
      licenseExist = true;

      if (
        /*data.Baseboard_serial === serial.getBaseboardSerial() && */ today <
        new Date(licenceDetails.Expire_Date)
      ) {
        licenseExist = true;
        expired = false;
      } else if (today > new Date(licenceDetails.Expire_Date)) {
        licenseExist = true;
        expired = true;
      }
    } else {
      expired = true;
      licenseExist = false;
    }
  } catch (err) {
    console.log(err);
  }
  win.minimize();
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  const INCREMENT = 0.03;
  const INTERVAL_DELAY = 100; // ms

  let c = 0;
  progressInterval = setInterval(() => {
    c += INCREMENT;
    win.setProgressBar(c);
    if (c > 1) {
      win.setProgressBar(-1);
      clearInterval(progressInterval);
      win.show();
    }
  }, INTERVAL_DELAY);

  const icon = path.join(__dirname, "images", "eca.png");
  tray = new Tray(icon);

  tray.on("click", () => {
    if (win.isVisible() == true) {
      win.hide();
    } else {
      win.show();
    }
  });
  tray.on("right-click", () => {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: "Quit",
        click: () => {
          app.isQuiting = true;
          app.quit();
        },
      },
      { type: "separator" },
      {
        label: "About Us",
        click: () => {},
      },
    ]);
    tray.setToolTip("ECA Training Application");
    tray.popUpContextMenu(contextMenu);
  });
}

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

  app
    .whenReady()
    .then(() => {
      globalShortcut.register("CommandOrControl+Q", () => {
        app.quit();
      });
      globalShortcut.register("Control+M", () => {
        if (win.isVisible()) win.hide();
        else win.show();
      });
      // globalShortcut.register("Control+R", () => {
      //   app.quit();
      //   app.relaunch();
      // });
    })
    .then(createWindow)
    .then(showNotification);
}
console.log(app.getVersion());
console.log(app.isPackaged);

ipcMain.handle("officialSite", () => {
  // const view = new BrowserView();
  // win.setBrowserView(view);
  // view.setBounds({ x: 0, y: 0, width: 300, height: 300 });
  // view.webContents.loadURL("https://www.ecanagaland.com");
  shell.openExternal("https://www.ecanagaland.com");
});

// This method will be called when Electron has finished
ipcMain.on("license_data", async (event, args) => {
  si.mem()
    .then((data) => {
      const licenceData = {
        expired: expired,
        noLicense: noLicense,
        licenseExist: licenseExist,
        appName: app.getName(),
        appVersion: app.getVersion(),
        remainingDays:
          remainingDays != null || undefined
            ? remainingDays.toString() + " Days"
            : "No License Found",
        osDetails: data,
        licenceDetails: licenseExist ? licenceDetails : "No Data",
      };
      event.returnValue = licenceData;
    })
    .catch((error) => console.error(error));
});

//course
ipcMain.handle("course", async (event, args) => {
  let dir_array = new Array();
  const response = await fetchCourse();
  return response;
  function fetchCourse() {
    try {
      const course = fs.readdirSync(resources);
      course.forEach((file, index) => {
        if (fs.statSync(path.join(resources, file)).isDirectory) {
          dir_array.push(file);
        }
      });
      return dir_array;
    } catch (err) {}
  }
});

//fetch chapter
ipcMain.handle("chap", async (event, args) => {
  const response = fetchChapter(args);
  return response;
  function fetchChapter(args) {
    let chap_path = path.join(resources, args.course + "/" + args.sub);
    let chap_arr = new Array();
    try {
      let chap_dir = fs.readdirSync(chap_path);
      chap_dir.forEach((chap) => {
        if (fs.statSync(path.join(chap_path, chap)).isDirectory) {
          chap_arr.push(chap);
        }
      });
      return chap_arr;
    } catch (err) {}
  }
});

//return subject
ipcMain.handle("sub", async (event, args) => {
  const response = fetchSubject(args);
  return response;
  function fetchSubject(args) {
    let dir_array = new Array();
    let dir_path = path.join(resources, args.replace(/%20/g, " "));
    try {
      const course = fs.readdirSync(dir_path);
      course.forEach((file) => {
        if (fs.statSync(path.join(dir_path, file)).isDirectory) {
          dir_array.push(file);
        }
      });
      return dir_array;
    } catch (err) {}
  }
});

// fetch file
ipcMain.handle("fetch_file", async (event, args) => {
  const response = fetchFile(args);
  return response;
  function fetchFile(args) {
    let File_path = path.join(
      resources,
      args.course + "/" + args.sub + "/" + args.chap
    );
    let file_arr = new Array();
    try {
      let files = fs.readdirSync(File_path);
      files.forEach((file) => {
        if (fs.statSync(path.join(File_path, file)).isFile) {
          file_arr.push(file);
        }
      });
      return file_arr;
    } catch (err) {
      return;
    }
  }
});

//search function
ipcMain.on("search", async (event, args) => {
  searchFile(resources, args, (err, data) => {
    if (err) {
      return err.message;
    }
    event.sender.send("search_rep", data);
  });
});
//fetching quiz question paper
ipcMain.on("load-QuizQuestion", async (event, args) => {
  fetchQuiz(args, (err, data) => {
    if (err) {
      return err.message;
    }
    event.sender.send("quiz_response", data);
  });
});
//quiz
function fetchQuiz(args, done) {
  try {
    let file_path = path.join(
      __dirname,
      "contents/" +
        args.course +
        "/" +
        args.sub +
        "/" +
        args.chap +
        "/question.json"
    );
    fs.readFile(file_path, "utf8", function (err, data) {
      if (err) {
        return done(err);
      }
      return done(null, JSON.parse(data));
    });
  } catch (err) {
    return done(err);
  }
}
//search file and Directory
function searchFile(dir, name, done) {
  let result = [];
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, result);

    list.forEach(function (file) {
      //file_path = path.resolve(resources, file);

      fs.stat(path.join(dir, file), (err, stat) => {
        // If directory, execute a recursive call
        if (stat && stat.isDirectory()) {
          // Add directory to array if it mathch the search keyword
          if (file.toLowerCase().includes(name.toLowerCase())) {
            result.push(path.join(dir, file));
          }
          searchFile(path.resolve(dir, file), name, (err, res) => {
            result = result.concat(res);
            if (!--pending) done(null, result);
          });
        } else {
          //push file to array if it match the search keyword
          let file_dt = file.split(".");
          if (
            file_dt[0].toLowerCase().includes(name.toLowerCase()) &&
            (file_dt[1] === "pdf" || file_dt[1] === "mp4")
          ) {
            result.push(path.join(dir, file));
          }

          if (!--pending) done(null, result);
        }
      });
    });
  });
}

http
  .createServer((req, res) => {
    let query = req.url.split("?");
    let result = querystring.parse(query[1].toString());
    let fileExtension = result.file.split(".").pop();
    let ph = path.join(
      __dirname,
      "contents/" +
        result.course +
        "/" +
        result.sub +
        "/" +
        result.chap +
        "/" +
        result.file
    );
    if (fileExtension === "mp4") {
      fs.stat(ph, (err, stats) => {
        if (err) {
          console.log(err);
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Could not read file");
          return;
        }
        let range = req.headers.range;
        let total = stats.size - 16;
        if (range) {
          let parts = range.replace(/bytes=/, "").split("-");
          let start =
            parseInt(parts[0], 10) === 0
              ? parseInt(parts[0], 10)
              : calStart(parseInt(parts[0], 10));
          let end = parts[1] ? parseInt(parts[1], 10) : total - 1;
          let chunksize = end - start + 1;

          headers = {
            "Content-Range": "bytes " + start + "-" + end + "/" + total,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Type": "video/mp4",
          };
          res.writeHead(206, headers);
          const rs = fs.createReadStream(ph, { end: 15 });
          let iv;
          rs.on("data", (chunk) => {
            iv = chunk;
          });
          rs.on("close", () => {
            const rsf = fs.createReadStream(ph, { start: start + 16 });
            const decipher = crypto.createDecipheriv("aes-256-cfb", key, iv);
            rsf.pipe(decipher).pipe(res);
          });
        } else {
          headers = {
            "Accept-Ranges": "bytes",
            "Content-Length": total,
            "Content-Type": "video/mp4",
          };
          res.writeHead(200, headers);
          const rs = fs.createReadStream(ph, { end: 15 });
          let iv;
          rs.on("data", (chunk) => {
            iv = chunk;
          });
          rs.on("close", () => {
            const rsf = fs.createReadStream(ph, { start: 16 });
            const decipher = crypto.createDecipheriv("aes-256-cfb", key, iv);
            rsf.pipe(decipher).pipe(res);
          });
        }
      });
    } else if (fileExtension === "pdf") {
      const rs = fs.createReadStream(ph, { end: 15 });
      let iv;
      rs.on("data", (chunk) => {
        iv = chunk;
      });
      rs.on("close", () => {
        const rsf = fs.createReadStream(ph, { start: 16 });
        const decipher = crypto.createDecipheriv("aes-256-cfb", key, iv);
        rsf.pipe(decipher).pipe(res);
      });
    } else {
      res.writeHead(400, { "Content-Type": "text/html" });
      res.end("your requested url " + req.url + " not found.");
    }
  })
  .listen(8000);
function calStart(start) {
  let st = start % 16;
  return start - st;
}

//listen to key activation
ipcMain.handle("key", async (event, args) => {
  console.log("entered into license activation");
  let res = validate.validate_key(args);
  console.log(res);
  event.sender.send("key_response", res);
  //return res;
});

function successFullNotification() {
  new Notification({
    title: "License successfully installed",
    body: "The License has been successfully installed on your System",
  }).show();
}
//installaton success
ipcMain.handle("success", () => {
  successFullNotification();
  app.relaunch();
  app.quit();
});

//licence check scheduler
ipcMain.handle("noti", async (event, args) => {
  try {
    let file = fs.readFileSync(
      path.join(process.env.programData, "/eca-training-app/license_info.json")
    );
    let data = JSON.parse(file);
    let today = new Date();
    let dff = Math.floor(
      (new Date(data.Expire_Date) - today) / (1000 * 60 * 60 * 24)
    );
    return dff.toString();
  } catch (err) {
    return;
  }
});
// before the app is terminated, clear both timers
app.on("before-quit", () => {
  clearInterval(progressInterval);
});
ipcMain.on("notify", (e, data) => {
  console.log(" called");
  const { title, message, duration } = data;
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
