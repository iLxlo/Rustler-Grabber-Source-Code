const Discord = require("discord.js");
const moment = require("moment");
const config = require('../config.json');
require("moment-duration-format");

module.exports = message => {

  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(config.PREFIX)) return;
  let command = message.content.split(' ')[0].slice(config.PREFIX.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    if (client.cooldowns.has(`${command}_${message.author.id}`)) {

        const finish = client.cooldowns.get(`${command}_${message.author.id}`)
        const date = new Date();
      const kalan = moment
      .duration(finish - date)
      .format(" D [Day], H [Hours], m [Minutes], s [Second]");
      const NoNoNo = new Discord.MessageEmbed()
      
      .setColor("#ffffff")
      .setTimestamp()
      .setTitle("This Command has Cooldown!")
      .setFooter("© 2020 2305-BOTS", client.user.avatarURL())
      .setDescription(`You need to wait for **${kalan}** to be able to use this Command again.`)

        return message.channel.send(NoNoNo);
    };
    
    const finish = new Date();
    finish.setSeconds(finish.getSeconds() + cmd.help.cooldown);
    cmd.run(client, message, params, perms);
    if (cmd.help.cooldown > 0) {
        client.cooldowns.set(`${command}_${message.author.id}`, finish);
        setTimeout(() => {
          client.cooldowns.delete(`${command}_${message.author.id}`);
        }, cmd.help.cooldown * 1000);
      }
  }

};