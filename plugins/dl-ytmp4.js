let ytdl = require("ytdl-core");

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) return conn.reply(m.chat, `• *Example :* .${command} link`, m)
	conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
	try {
	let obj = await ytmp3(text);
	let title = obj.meta.title;
	let channel = obj.meta.channel;
	let duration = obj.meta.seconds;
    let desk = obj.meta.description;
    let capt = `乂  *Y T - M P 4*\n\n`
    capt += `┌  ◦ *Title* : ${title}\n`
    capt += `│  ◦ *Description* : ${desk}\n`
    capt += `└  ◦ *Chanel* : ${channel}\n\n`
    capt += `© ytmp4 fixed by ー Mαnzz`
	conn.sendFile(m.chat, obj.buffer, `${title}.mp4`, capt, m);
	} catch (e) {
    console.log(e);
    m.reply(`🚩 Error!`);
  }
};

handler.help = ['mp4', 'a'].map(v => 'yt' + v + ` <url>`)
handler.tags = ['downloader']
handler.command = /^yt(a|mp4)$/i

handler.exp = 0
handler.register = true
handler.limit = true
module.exports = handler;

async function ytmp3(url) {
	try {
		const { videoDetails } = await ytdl.getInfo(url, {
			lang: "id",
		});
		const stream = ytdl(url, {
			filter: "videoandaudio",
		});
		const chunks = [];
		stream.on("data", (chunk) => {
			chunks.push(chunk);
		});
		await new Promise((resolve, reject) => {
			stream.on("end", resolve);
			stream.on("error", reject);
		});
		const buffer = Buffer.concat(chunks);
		return {
			meta: {
				title: videoDetails.title,
				channel: videoDetails.author.name,
				seconds: videoDetails.lengthSeconds,
				description: videoDetails.description,
				image: videoDetails.thumbnails.slice(-1)[0].url,
			},
			buffer: buffer,
			size: buffer.length,
		};
	} catch (error) {
		throw error;
	}
}