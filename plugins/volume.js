const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { pickRandom } = require('../lib/function');

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (!args[0]) return m.reply(`Contoh: ${usedPrefix + command} 10`);

    const isQuotedAudio = m.quoted && m.quoted.mimetype.includes('audio');
    const isQuotedVideo = m.quoted && m.quoted.mimetype.includes('video');

    if (!isQuotedAudio && !isQuotedVideo) {
        return m.reply("Mohon kirimkan video/audio yang ingin dikonversi.");
    }

    let media = await conn.downloadAndSaveMediaMessage(m.quoted, "volume");
    let rname, mimetype;

    if (isQuotedAudio) {
        rname = `${pickRandom(['.mp3'])}`;
        mimetype = 'audio/mp4';
    } else if (isQuotedVideo) {
        rname = `${pickRandom(['.mp4'])}`;
        mimetype = 'video/mp4';
    }

    exec(`ffmpeg -i ${media} -filter:a volume=${args[0]} ${rname}`, (err, stderr, stdout) => {
        fs.unlinkSync(media);
        if (err) return m.reply('Terjadi kesalahan saat mengkonversi.');

        let jadie = fs.readFileSync(rname);
        conn.sendMessage(m.chat, { [isQuotedAudio ? 'audio' : 'video']: jadie, mimetype }, { quoted: m });
        fs.unlinkSync(rname);
    });
};
handler.help = ['volume'].map(v => v + ' <10>')
handler.tags = ['tools']
handler.command = /^(volume)$/i;
handler.limit = true
module.exports = handler;

/*


Di Record : Zyko MD
©Zyko MD 2024

 * ig: @zzyko_04
 * yt: @zykobotz
 * tt: @zzyko_04

Jangan di hapus creatornya kack
Saya capek ngetik kode 

"Wahai orang-orang yang beriman, mengapakah kamu mengatakan sesuatu yang tidak kamu kerjakan?
Amat besar kebencian di sisi Allah bahwa kamu mengatakan apa-apa yang tidak kamu kerjakan."
(QS ash-Shaff: 2-3).
*/