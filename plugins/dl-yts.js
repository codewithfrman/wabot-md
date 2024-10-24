let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply(`Example : ${usedPrefix + command} story wa anime`)
let yts = require("yt-search")
let search = await yts(text)
let teks = 'YouTube Search\n\n Result From '+text+'\n\n'
let no = 1
for (let i of search.all) {
    let typeEmoji = i.type === 'video' ? '🎥' : '🖼';
    let viewsEmoji = '👀';
    let durationEmoji = '⏱';
    let uploadedEmoji = '📅';
    let urlEmoji = '🔗';
    teks += `${typeEmoji} No: ${no++}\n`;
    teks += `${typeEmoji} Type: ${i.type}\n`;
    teks += `${typeEmoji} Video ID: ${i.videoId}\n`;
    teks += `${typeEmoji} Title: ${i.title}\n`;
    teks += `${viewsEmoji} Views: ${i.views}\n`;
    teks += `${durationEmoji} Duration: ${i.timestamp}\n`;
    teks += `${uploadedEmoji} Uploaded: ${i.ago}\n`;
    teks += `${urlEmoji} Url: ${i.url}\n`;
    teks += `\n========================\n`;
}
conn.sendMessage(m.chat, { image: { url: search.all[0].thumbnail },  caption: teks }, { quoted: m })
}
handler.help = ['', 'earch'].map(v => 'yts' + v + ' <pencarian>')
handler.tags = ['tools']
handler.command = /^yts(earch)?$/i
handler.limit = true

module.exports = handler