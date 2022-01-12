const Discord = require('discord.js')
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]})

const config = require('./config.json')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)
})

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
        var enc_string = args[1].toUpperCase();
        function rotate(input) {
            const charCode = input.charCodeAt();
            return String.fromCharCode(
                ((charCode + shift_num) <= 90) ? charCode + shift_num : (charCode + shift_num) % 90 + 64
            );
        }
        msg.reply(enc_string.replace(/A-Z/g, rotate))

    }
});

client.login(config.token);
