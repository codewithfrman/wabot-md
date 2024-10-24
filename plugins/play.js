const ytdl = require('ytdl-core');
const yts = require('yt-search');
const fs = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const os = require('os');
const streamPipeline = promisify(pipeline);

var handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Use example ${usedPrefix}${command} naruto blue bird`;
  
  // Send reaction
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });

  try {
    let search = await yts(text);
    let vid = search.videos[Math.floor(Math.random() * search.videos.length)];
    if (!vid) throw 'Video Not Found, Try Another Title';

    let { title, description, videoId, thumbnail, timestamp, views, ago, url } = vid;

    let cop = `
🎬 Title: ${title}
🔍 Ext: Search
🔗 ID: ${videoId}
⏱️ Duration: ${timestamp}
👀 Viewers: ${views}
📅 Upload At: ${ago}
🧑‍💻 Author: ${vid.author.name}
📺 Channel: ${vid.author.url}
🔗 Url: ${url}`;
    
    const audioStream = ytdl(url, {
      filter: 'audioonly',
      quality: 'highestaudio',
    });
    const tmpDir = os.tmpdir();
    const writableStream = fs.createWriteStream(`${tmpDir}/${title}.mp3`);
    await streamPipeline(audioStream, writableStream);

    let doc = {
      audio: {
        url: `${tmpDir}/${title}.mp3`
      },
      mimetype: 'audio/mp4',
      fileName: `${title}`,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: url,
          title: title,
          body: title,
          sourceUrl: url,
          thumbnail: await (await conn.getFile(thumbnail)).data
        }
      }
    };

    await conn.sendMessage(m.chat, {
      text: cop,
      contextInfo: {
        externalAdReply: {
          title: title,
          thumbnailUrl: thumbnail,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });
    
    await conn.sendMessage(m.chat, doc, { quoted: m });
    
    fs.unlink(`${tmpDir}/${title}.mp3`, (err) => {
      if (err) {
        console.error(`Failed to delete audio file: ${err}`);
      } else {
        console.log(`Deleted audio file: ${tmpDir}/${title}.mp3`);
      }
    });

  } catch (e) {
    console.log(e);
    m.reply(`*Error: ${e.message}*`);
  }
};

handler.help = ['play'].map(v => v + ' <query>');
handler.tags = ['downloader'];
handler.command = /^play$/i;
handler.exp = 0;
handler.limit = true;
handler.register = true;

module.exports = handler;