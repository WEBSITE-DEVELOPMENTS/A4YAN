module.exports = {
  config: {
    name: "shoti",
    version: "1.0",
    author: "Yosh Alterado", //tangina neto oh magtitikol nanga lang chachange pa creds ayusin mo par
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "PAnh TIhKol",
      en: "pantikol",
    },
    longDescription: {
      vi: "pantikol",
      en: "pantikol",
    },
    category: "chatbox",
    guide: {
      vi: "tikol",
      en: "tikol",
    },
  },

  langs: {
    vi: {
     
    },
    en: {
    
    },
  },

  onStart: async function ({ api, args, message, event, threadsData, usersData, dashBoardData, globalData, threadModel, userModel, dashBoardModel, globalModel, role, commandName, getLang }) {
    api.sendMessage("SIMP!", event.threadID);
    const axios = require("axios");
    const request = require('request');
    const fs = require("fs");

    try {
      const response = await axios.get('http://linda.hidencloud.com:25636/shoti');

      if (response.data && response.data.code === 200 && response.data.data) {
        const videoURL = response.data.data.url;
        const userName = response.data.user.username;
        const userNickname = response.data.user.nickname;

        const file = fs.createWriteStream(__dirname + "/cache/shoti.mp4");
        const rqs = request(encodeURI(videoURL));
        console.log('Shoti Downloaded >>> ' + response.data.data.id);

        rqs.pipe(file);
        file.on('finish', () => {
          const messageToSend = {
            body: `Shoti Video for ${userName} (${userNickname}) [ 🐦‍⬛ | Komatsu]:`,
            attachment: fs.createReadStream(__dirname + '/cache/shoti.mp4')
          };

          api.sendMessage(messageToSend, event.threadID, event.messageID);
        });
      } else {
        api.sendMessage("Failed to fetch the video.", event.threadID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while fetching the video.", event.threadID);
    }
  },
};
