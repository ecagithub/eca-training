const utility = require("./utility");
const execSync = require("child_process").execSync;
function getBaseboardSerial() {
  try {
    let serial = execSync("wmic baseboard get /value").toString().split("\r\n");
    let data = utility.getValue(serial, "serialnumber", "=");
    return data;
  } catch (err) {
    console.log(err);
    return "NA";
  }
}
module.exports = { getBaseboardSerial };
