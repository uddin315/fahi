const moment = require("moment-timezone");
const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports.config = {
  name: "admin",
  version: "1.0.1",
  credit: "Fahim",
  permission: 0,
  description: "Shows admin personal information",
  category: "info",
  prefix: true,
  cooldown: 5
};

module.exports.run = async function ({ api, event }) {
  try {
    const currentTime = moment
      .tz("Asia/Dhaka")
      .format("DD MMM YYYY, hh:mm:ss A");

    const imageUrl =
      "https://i.ibb.co/ynwc6BHS/962bbe1d40b0.jpg";

    const cacheDir = path.join(__dirname, "cache");
    const imgPath = path.join(cacheDir, "admin_avatar.png");

    // cache folder না থাকলে তৈরি করবে
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir);
    }

    const infoText = `
╭╼|━━━━━━━━━━━━━━|╾╮
👑 𝗔𝗱𝗺𝗶𝗻: MEZBAH Uddin 
🌐 𝗡𝗮𝗺𝗲: FAHIM 
🕋 𝗥𝗲𝗹𝗶𝗴𝗶𝗼𝗻: Islam | 🚹 𝗚𝗲𝗻𝗱𝗲𝗿: Male
🎂 𝗔𝗴𝗲: 16+ | 🎓 𝗪𝗼𝗿𝗸: Student
🏠 𝗙𝗿𝗼𝗺: Begumganj , Noakhali 
📍 𝗖𝘂𝗿𝗿𝗲𝗻𝘁: chowmuhoni , Begumganj 
💘 𝗦𝘁𝗮𝘁𝘂𝘀: Single
📧 𝗘𝗺𝗮𝗶𝗹: mezbahuddin306@gmail.com
📞 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽: +393509922751
✈️ 𝗧𝗲𝗹𝗲𝗴𝗿𝗮𝗺: 🚫🚫
🔗 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: https://www.facebook.com/share/1CTuzBshsk/
⏰ 𝗧𝗶𝗺𝗲: ${currentTime}
╰╼|━━━━━━━━━━━━━━|╾╯`;

    const sendMsg = () => {
      api.sendMessage(
        {
          body: infoText,
          attachment: fs.createReadStream(imgPath)
        },
        event.threadID,
        () => {
          if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        }
      );
    };

    request(imageUrl)
      .pipe(fs.createWriteStream(imgPath))
      .on("close", sendMsg)
      .on("error", () => {
        api.sendMessage(infoText, event.threadID);
      });

  } catch (err) {
    api.sendMessage("❌ Admin command error!", event.threadID);
    console.error(err);
  }
};
