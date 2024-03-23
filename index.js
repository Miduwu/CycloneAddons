const { Erine, ActivityType } = require("erine");
const { Utils } = require("./addons/utils")
const { Database } = require("midb")
const { CustomHelpCommand } = require("./addons/help")
const db = new Database({
    path: "./database",
    tables: ["main"]
})
db.on("ready", () => {
    console.log("Database is ready.")
})
db.start()
require('dotenv').config();

const bot = new Erine({
    prefix: "dank!",
    owners: ["914541839774801990", "664261902712438784"],
    replyOnEdit: true,
    helpCommand: CustomHelpCommand,
    guildOnly: true,
    intents: ["Guilds", "GuildMembers", "MessageContent", "GuildMessages"],
    presence: {
        activities: [{ type: ActivityType.Playing, name: "Cyclone Addons | ErineClient" }]
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
