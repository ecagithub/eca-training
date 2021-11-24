const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  course: {
    fetchAllCourse: async () => {
      const data = await ipcRenderer.invoke("course");
      return data;
    },

    countModules: async () => {
      const data = await ipcRenderer.invoke("module_count");
      return data;
    },
  },

  subject: {
    fetchSubjects: async (args) => {
      console.log("subject called");
      console.log(args);
      const data = await ipcRenderer.invoke("sub", args);
      console.log(data);
      return data;
    },
  },

  chapter: {
    fetchChapters: async (args) => {
      const data = await ipcRenderer.invoke("chap", args);
      return data;
    },
  },

  file: {
    fetchFile: async (args) => {
      const data = await ipcRenderer.invoke("fetch_file", args);
      return data;
    },
  },
  database: {
    fetchUserDetails: async () => {
      return new Promise(async (resolve, reject) => {
        ipcRenderer.invoke("getUser");
        ipcRenderer.on("user_data", (event, data) => {
          console.log("DATA:", data);
          resolve(data);
        });
      });
    },
    insertUserDetail: async (args) => {
      const data = await ipcRenderer.invoke("insertUserDetail", args);
      console.log(data);
      return data;
    },
  },

  quiz: {
    fetchQuiz: async (args) => {
      // const data = ipcRenderer.invoke("load-QuizQuestion", args);
      // console.log
      return new Promise(async (resolve, reject) => {
        ipcRenderer.send("load-QuizQuestion", args);
        ipcRenderer.on("quiz_response", (event, data) => {
          console.log("DATA:", data);
          resolve(data);
        });
      });
    },
  },

  license: {
    fetchActivationDetails: () => {
      const data = ipcRenderer.sendSync("license_data");
      return data;
    },

    activateLicense: async (args) => {
      // const response = await ipcRenderer.invoke("key", args);
      // console.log(response);
      // return response;

      return new Promise(async (resolve, reject) => {
        ipcRenderer.invoke("key", args);
        ipcRenderer.on("key_response", (event, data) => {
          console.log("DATA:", data);
          resolve(data);
        });
      });
    },
    activationSuccessCall: () => {
      ipcRenderer.invoke("success");
    },
  },

  search: {
    searchFunction: async (args) => {
      return new Promise(async (resolve, reject) => {
        ipcRenderer.send("search", args);
        ipcRenderer.on("search_rep", (event, data) => {
          console.log("DATA:", data);
          resolve(data);
        });
      });
    },
  },
  notification: {
    reminder: () => {
      const data = ipcRenderer.invoke("noti");

      console.log(data);
      return data;
    },
  },
  externalLinks: {
    aboutUs: () => {
      ipcRenderer.invoke("aboutUs");
    },
    officialSite: () => {
      ipcRenderer.invoke("officialSite");
    },
  },
});
