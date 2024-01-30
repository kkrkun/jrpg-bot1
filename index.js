const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js'); //discord.js から読み込む
const http = require('http');
http.createServer(function(request, response)
{
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Bot is online!');
}).listen(3000);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildScheduledEvents,
    ],
    partials: [
        Partials.User,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.ThreadMember,
    ],
}); //clientインスタンスを作成する
client.on("messageCreate", async (message) => {
  const VCID = "1064461324135960617";
  if (message.content === "!m on" || message.content === "[人狼RPG] ☽夜になりました☽") {
    const voiceChannel = message.guild.channels.cache.get(VCID);
    if (voiceChannel && voiceChannel.members.size > 0) {
      var ok = ['なし'];
      var no = ['なし'];
      for (const member of voiceChannel.members.values()) {
        try{
        await member.voice.setMute(true);
        ok.push(member.nickname);
        } catch {
        no.push(member.nickname);
        }
      }
      if (ok.length > 1) {
        ok.shift();
      }
    　if (no.length > 1) {
        no.shift();
      }
      console.log(no)
      const embed = new EmbedBuilder()
         .setTitle('ミュートが完了しました。')
         .addFields({ name: `成功した人`, value: `${ok}`, inline: true},{ name: `失敗した人`, value: `${no}`, inline: true})
         .setColor('#48f542')
         message.channel.send({embeds: [embed] });
    } else {
     　const embed = new EmbedBuilder()
         .setTitle('VCに誰もいないため実行できませんでした。')
         .setColor('#f54242')
       message.channel.send({embeds: [embed] });
    }
  }

  else if (message.content === "!m off" || message.content === "[人狼RPG] ☀昼になりました☀") {
    const voiceChannel = message.guild.channels.cache.get(VCID);
    if (voiceChannel && voiceChannel.members.size > 0) {
      var ok = ['なし'];
      var no = ['なし'];
      for (const member of voiceChannel.members.values()) {
        try{
        await member.voice.setMute(false);
        ok.push(member.nickname);
        } catch {
        no.push(member.nickname);
        }
      }
      if (ok.length > 1) {
        ok.shift();
      }
    　if (no.length > 1) {
        no.shift();
      }
      const embed = new EmbedBuilder()
         .setTitle('ミュート解除が完了しました。')
         .addFields({ name: `成功した人`, value: `${ok}`, inline: true},{ name: `失敗した人`, value: `${no}`, inline: true})
         .setColor('#48f542')
         message.channel.send({embeds: [embed] });
    } else {
     　const embed = new EmbedBuilder()
         .setTitle('VCに誰もいないため実行できませんでした。')
         .setColor('#f54242')
       message.channel.send({ embeds: [embed] });
    }
  }
});

client.login("MTA3Nzk0OTYyNTAxODg5MjMzOA.Gw51Io.AoQvtvk9o_dXTk8SMys653_wTYZgn7h3lHESJ8");