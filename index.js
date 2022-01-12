const Discord = require('discord.js')
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]})

const config = require('./config.json')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)
})

//function definitions
var caesarShift = function (str, amount) {
    if (amount < 0) {
        return caesarShift(str, amount + 26);
    }
    var output = "";
    for (var i = 0; i < str.length; i++) {
        var c = str[i];
        if (c.match(/[a-z]/i)) {
            var code = str.charCodeAt(i);
            if (code >= 65 && code <= 90) {
                c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
            }
            else if (code >= 97 && code <= 122) {
                c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
            }
        }
        output += c;
    }
    return output;
}

//this part checks for and responds to valid commands
client.on('message', (msg) => {
  if (msg.author.bot) return

  const content = msg.content.trim().toLowerCase()
  //day-trader code goes here

  if (!content.startsWith(config.prefix)) return

  // Separate name of command and arguments to make
  // it easier to work with
  const [command, ...args] = content
    .slice(config.prefix.length)
    .replace(/\s+?/g, ' ')
    .trim()
    .split(' ')

    if (command == "bingbong") {
      msg.reply('F*ck ya life');
    }
    if (command == "ping") {
      const timeTaken = Date.now() - msg.createdTimestamp;
      msg.reply(`pong. latency: ${timeTaken}ms.`);
    }
    if (command == "caesar") {
        var shift_num = parseInt(args[0], 10);
        var enc_string = args[1];
        msg.reply(caesarShift(enc_string, shift_num));
    }
});

client.login(config.token);
