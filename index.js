const { Erine, HelpCommand, ActivityType } = require("erine");
const { Utils } = require("./addons/utils")

require('dotenv').config();

const bot = new Erine({
    prefix: "dank!",
    owners: ["914541839774801990", "664261902712438784"],
    replyOnEdit: true,
    helpCommand: HelpCommand,
    guildOnly: true,
    intents: ["Guilds", "GuildMembers", "MessageContent", "GuildMessages"],
    presence: {
        activities: [{ type: ActivityType.Playing, name: "Cyclone Addons | Under Maintenance" }]
    }
})

const Auxiliar = new Utils()

// Commands & Events Handler
bot.load("./cmds")

bot.login(process.env.TOKEN)

module.exports = {
    bot,
    Auxiliar
}
