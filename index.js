const { Erine, EmbedBuilder, ActivityType, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("erine");
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
module.exports = {
    bot,
    Auxiliar
}

bot.on("interactionCreate", async i => {
    if(!i.isButton()) return;
    if(i.customId?.split("_")[0] == "accept") {
        let botid = i.customId?.split("_")[1]
        const commentinput = new TextInputBuilder()
        .setCustomId("comments")
        .setLabel("Comentarios")
        .setPlaceholder("Deja cualquier comentario extra acerca del bot.")
        .setRequired(false)
        .setStyle(TextInputStyle.Paragraph)
        const modal = new ModalBuilder()
        .setTitle("Aceptar Bot")
        .setCustomId(`ACCEPT_${botid}`)
        .addComponents(new ActionRowBuilder().addComponents(commentinput))
        i.showModal(modal).catch(console.log)
    }
})
bot.on("interactionCreate", async i => {
    if(!i.isModalSubmit()) return;
    if(i.customId.split("_")[0] == "ACCEPT") {
        let abot = i.client?.users?.cache?.get(`${i.customId.split("_")[1]}`) || await i.client?.users?.fetch(`${i.customId.split("_")[1]}`)
        let dbc = i.client?.channels?.cache?.get("965406995849052160") || await i.client?.channels?.fetch("965406995849052160")
        let aowner = i.client?.users?.cache?.get(db.get(`owner_${abot.id}`)) || await i.client?.users?.fetch(db.get(`owner_${abot.id}`))
        let embed = new EmbedBuilder()
        .setAuthor({name: abot.username, iconURL: abot.displayAvatarURL({size: 4096})})
        .setTitle("<:cyaddons_plus:1057545930443870208> | Comentarios Extra")
        .setDescription(i.fields.getField("comments").value)
        .setImage(abot.displayAvatarURL({size: 4096}))
        .setColor(Auxiliar.Colors.cyan)
        .setFooter({text: i.user.username, iconURL: i.user.displayAvatarURL({size: 4096})})
        await i.reply({embeds: [new EmbedBuilder().setDescription("<:cyaddons_check:1060662306507333753> | ***`El bot fue aceptado.`***").setColor(Auxiliar.Colors.cyan)], ephemeral: true})
        dbc.send({content: `<@${aowner.id}>`, embeds: [embed]})
    }
})
// Commands & Events Handler
bot.load("./cmds")
bot.login(process.env.TOKEN)
