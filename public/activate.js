const fs = require("fs");
const path = require("path");
const serial = require("./commonservice.js");
//function to validate key
function validate_key(key) {
  let flag1,
    flag2,
    ele,
    str = "";
  if (key.length === 23) {
    if (!key.match(/-/g) || key.match(/-/g).length != 3) return "no";
    else {
      let key_arr = key.trim().split("-");
      key_arr.forEach((item) => {
        if (item.length != 5) return "no";
        else str += item[2];
      });
      flag1 = (str) =>
        typeof str === "string" &&
        str.length === 4 &&
        !isNaN(Number("0x" + str));
      ele = key_arr[0];
      if (
        ele.substring(0, 2) === "E".charCodeAt(0).toString(16) &&
        ele.substring(3, 5) === "k".charCodeAt(0).toString(16)
      )
        flag2 = true;
      else return "no"; //flag2 = false;
      ele = key_arr[1];
      if (ele.substring(3, 5) === "C".charCodeAt(0).toString(16)) flag2 = true;
      else return "no";
      ele = key_arr[2];
      if (ele.substring(0, 2) === "A".charCodeAt(0).toString(16)) flag2 = true;
      else return "no";
      ele = key_arr[3];
      if (
        ele.substring(0, 2) === "O".charCodeAt(0).toString(16) &&
        ele.substring(3, 5) === "h".charCodeAt(0).toString(16)
      )
        flag2 = true;
      else return "no";
      console.log(flag1 + " " + flag2);
      if (flag1 && flag2) {
        let serial_no = serial.getBaseboardSerial();
        let today = new Date();
        let newdate = new Date();
        newdate.setDate(today.getDate() + 365);
        console.log(serial_no);
        let f_path = "/eca-training-app/license_info.json";
        if (fs.existsSync(path.join(process.env.programData, f_path))) {
          console.log("exist");
          try {
            let file = fs.readFileSync(
              path.join(process.env.programData, f_path)
            );
            let data = JSON.parse(file);
            if (
              data.license_key.toLowerCase() === key.toLowerCase() &&
              today < new Date(data.Expire_Date) &&
              data.Baseboard_serial === serial_no
            ) {
              console.log("yes");
              return "success";
            } else if (
              data.license_key.toLowerCase() != key.toLowerCase() &&
              today > new Date(data.Expire_Date) &&
              data.Baseboard_serial === serial_no
            ) {
              let exp_date = new Date();
              exp_date.setDate(today.getDate() + 365);
              data.license_key = key;
              data.Expire_Date = exp_date.toString();
              data.Start_Date = today.toString();
              let file = JSON.stringify(data);
              fs.writeFileSync(
                path.join(
                  process.env.programData,
                  "/eca-training-app/license_info.json"
                ),
                file
              );
              return "success";
            } else {
              console.log("ok");
              return "no";
            }
          } catch (err) {
            console.log("catching error");
            return "error";
          }
        } else {
          let license_info = {
            license_key: key,
            Start_Date: today.toString(),
            Expire_Date: newdate.toString(),
            Baseboard_serial: serial_no,
          };
          let data = JSON.stringify(license_info);
          try {
            fs.mkdirSync(
              path.join(process.env.programData, "eca-training-app")
            );
            fs.writeFileSync(
              path.join(
                process.env.programData,
                "/eca-training-app/license_info.json"
              ),
              data
            );

            return "success";
          } catch (err) {
            console.log(err);
            return "error";
          }
        }
      } else {
        console.log("no way");
        return "no";
      }
    }
  } else {
    console.log("something is fishy");
    return "no";
  }
}

//export function for nodejs
module.exports = { validate_key };
