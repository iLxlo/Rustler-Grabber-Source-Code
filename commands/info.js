const Discord = require("discord.js");
const moment = require("moment");
const profiles = require("../tables/profiles");
const os = require("os");
var randomstring = require("randomstring");
require("moment-duration-format");

exports.run = async (client, message, args) => {
  const user = message.guild.members.cache.get(args[0]);
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["i","info"],
  permLevel: 0
};

exports.help = {
  name: "info",
  description: "Botun istatistiklerini gösterir",
  usage: "info"
};