const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({ authStrategy: new LocalAuth(), puppeteer: { args: ['--no-sandbox','--disable-setuid-sandbox'] } });

client.on('qr', (qr) => {
  console.log('QR LINK: https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + encodeURIComponent(qr));
});
client.on('ready', () => { console.log('DOT-xtermin ONLINE!'); });
client.on('message', async (msg) => {
  let text = msg.body.toLowerCase().trim();
  if(text === 'hi') msg.reply('Hi! Mama DOT°xtermin 👋 menu kiyanna');
  if(text === 'menu') msg.reply('DOT°xtermin MENU\n1. hi\n2. alive\n3. time\n4. sticker - photo ekak ekka\n5. game\n6. song + nama');
  if(text === 'alive') msg.reply('DOT°xtermin Alive! 🔥');
  if(text === 'time') msg.reply('Time: ' + new Date().toLocaleString());
  if(text === 'game') msg.reply('Game: .dice / .coin kiyanna');
  if(text === '.dice') msg.reply('Dice: ' + (Math.floor(Math.random()*6)+1));
  if(text === '.coin') msg.reply('Coin: ' + (Math.random()>0.5?'Head':'Tail'));
  if(text.startsWith('song ')) msg.reply('Song: https://www.youtube.com/results?search_query=' + encodeURIComponent(msg.body.slice(5)));
  if(text === 'sticker' && msg.hasMedia) {
    const media = await msg.downloadMedia();
    const { MessageMedia } = require('whatsapp-web.js');
    const s = new MessageMedia(media.mimetype, media.data);
    (await msg.getChat()).sendMessage(s, {sendMediaAsSticker:true});
  }
});
client.initialize();
