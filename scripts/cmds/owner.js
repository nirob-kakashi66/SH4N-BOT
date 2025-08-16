const { GoatWrapper } = require('fca-liane-utils');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "owner",
    author: "ShAn",
    role: 0,
    shortDescription: "Show Owner Info",
    longDescription: "Displays information about the owner with style + video",
    category: "admin",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    try {
      const ownerInfo = {
        name: '✦ NIROB ✦',
        gender: '♂ MALE',
        Birthday: '🎂 18-11-2005',
        religion: '☪ ISLAM',
        hobby: '💤 SLEEPING',
        Fb: '🌐 facebook.com/hatake.kakashi.NN',
        Relationship: '💔 CINGLE',
        Height: '📏 Around 5.5'
      };

      // ✅ GitHub raw video link system
      const githubRawVideo = "https://raw.githubusercontent.com/kakashiNN/Animepic.json/main/ownerVideo_API.json";
      const tmpFolderPath = path.join(__dirname, 'tmp');

      if (!fs.existsSync(tmpFolderPath)) {
        fs.mkdirSync(tmpFolderPath);
      }

      const videoResponse = await axios.get(githubRawVideo, { responseType: 'arraybuffer' });
      const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');
      fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

      // ✅ Aesthetic Styled Response
      const response = `
『 🌸 𝑶𝒘𝒏𝒆𝒓 𝑰𝒏𝒇𝒐 🌸 』

✧ Name: ${ownerInfo.name}
✧ Gender: ${ownerInfo.gender}
✧ Birthday: ${ownerInfo.Birthday}
✧ Religion: ${ownerInfo.religion}
✧ Relationship: ${ownerInfo.Relationship}
✧ Hobby: ${ownerInfo.hobby}
✧ Facebook: ${ownerInfo.Fb}
✧ Height: ${ownerInfo.Height}

༺──────────────༻
        `;

      await api.sendMessage({
        body: response,
        attachment: fs.createReadStream(videoPath)
      }, event.threadID, event.messageID);

      fs.unlinkSync(videoPath);

      api.setMessageReaction('✨', event.messageID, (err) => {}, true);

    } catch (error) {
      console.error('Error in owner command:', error);
      return api.sendMessage('⚠️ An error occurred while processing the command.', event.threadID);
    }
  }
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
