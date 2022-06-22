const profiles = require("../tables/profiles");
var randomstring = require("randomstring");

exports.run = async (client, message, args) => {
    const user = message.guild.members.cache.get(args[0]);

    if (!args[0]) {
        message.channel.send("Invalid arguments! Use: $deletekey <customerid>")
      } else {
        if (message.author.id == "975457597014564995" || message.author.id =="966091205995794443"   || message.author.id =="985251600144674897") { 
          
         
    const user = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
    if (!user) return message.channel.send("USerID")
    let keyProd = await profiles.findOne({ userid: user })
    if (!keyProd) return message.channel.send("no key data")

  //  let Key = await profiles.findOne({ key: key })

    await profiles.deleteOne({ userid: user })
    await message.channel.send("the key was successfully deleted")
    await user.roles.remove("986153010507968512")

    await message.guild.channels.cache.get("986153544975523881").send(`${message.author} Adlı kullanıcı tarafından👌 ${user} \`${user.id}\` Adlı kulanıcının keyi silindi `)

    //\`${Key.key}\`
}
}
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["deletekey", "keysil","sil"],
    permLevel: 0
};

exports.help = {
    name: "deletekey",
    description: "Botun istatistiklerini gösterir",
    usage: "istatistik"
};