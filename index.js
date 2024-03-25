const { Erine, ActivityType, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("erine");
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

bot.on("interactionCreate", async i => {
    if(!i.isButton()) return;
    if(i.customId?.split("_")[0] == "accept") {
       let botid = i.customId?.split("_")[1]
        const commentinput = new TextInputBuilder()
        .setCustomId("comments")
        .setLabel("Comentarios")
        .setPlaceholder("Deja cualquier comentario extra acerca del bot que se aceptará.")
        .setRequired(false)
        .setStyle(TextInputStyle.Paragraph)
        const modal = new ModalBuilder()
        .setTitle("Aceptar Bot")
        .setCustomId(`ACCEPT_${botid}`)
        .addComponents(new ActionRowBuilder().addComponents(commentinput))
        i.showModal(modal).catch(console.log)
    }
})

module.exports = {
    bot,
    Auxiliar
}
