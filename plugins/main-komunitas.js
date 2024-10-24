let handler = async (m, { conn, text, usedPrefix, command }) => {
    
    m.reply(`Mengirim 🛩️...`)
    conn.sendFile(m.sender, 'https://telegra.ph/file/5753b06a866bed1ec3e28.jpg', 'https://telegra.ph/file/5753b06a866bed1ec3e28.jpg', `
👥 Join Group Official Bot: 
https://chat.whatsapp.com/Gtcectx7SUcAy21Rk4s851
`.trim(), m)
}

handler.help = ['komunitas']
handler.tags = ['main']

handler.command = /^komunitas|community/i

module.exports = handler