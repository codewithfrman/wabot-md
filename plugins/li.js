const { proto, generateWAMessageFromContent, prepareWAMessageMedia } = require('@adiwajshing/baileys');
let handler = async (m, { conn, usedPrefix, command }) => {
const namae = 'Anu';
const data = {
title: "LIST MENU ⎙",
sections: [
{
title: "Menu All 🔥",
rows: [{ title: "Lihat semua menu", description: "Klik untuk melihat semua menu yang tersedia", id: '.allmenu' }]
},
{
title: "📞| Hubungi Owner",
rows: [{ title: "Hubungi owner bot", description: "Klik untuk nomor owner", id: '.menulist' }]
},
{
title: "ℹ️| Tentang Kami",
rows: [{ title: "Tentang kami", description: "Klik untuk mengetahui lebih lanjut tentang kami", id: '.about' }]
},
// Tambahan menu lainnya
]
};
const thumbnailUrl = 'https://pomf2.lain.la/f/rjd59gsn.jpg';  // URL gambar thumbnail
const linkUrl = 'https://astro.build';  // URL tujuan
// Menyiapkan media gambar (thumbnail)
const media = await prepareWAMessageMedia({ image: { url: thumbnailUrl } }, { upload: conn.waUploadToServer });
let msgs = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
"messageContextInfo": {
"deviceListMetadata": {},
"deviceListMetadataVersion": 2
},
interactiveMessage: proto.Message.InteractiveMessage.create({
body: proto.Message.InteractiveMessage.Body.create({
text: 'Bot WhatsApp adalah sebuah program otomatis yang dapat menanggapi pesan dan menyediakan berbagai fitur seperti informasi, hiburan, download, dan banyak lagi. Gunakan menu di bawah ini untuk eksplorasi lebih lanjut.'
}),
footer: proto.Message.InteractiveMessage.Footer.create({
text: '© 2024'
}),
contextInfo: {
forwardingScore: 9999,
isForwarded: false,
mentionedJid: conn.parseMention(m.sender)
},
externalAdReply: {
title: ` 📡`,
thumbnailUrl: 'https://pomf2.lain.la/f/rjd59gsn.jpg',  // URL gambar thumbnail
mediaType: 1,  // Tipe media: 1 untuk gambar
renderLargerThumbnail: true  // Thumbnail besar
},
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
buttons: [{
"name": "single_select",
"buttonParamsJson": JSON.stringify(data)
}],
})
})
}
}
}, {});
conn.relayMessage(m.chat, msgs.message, {});
};
handler.help = ['help'];
handler.tags = ['main'];
handler.command = /^(li)$/i;
module.exports = handler;