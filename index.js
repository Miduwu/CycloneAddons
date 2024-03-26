const { Erine, EmbedBuilder, ActivityType, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("erine");
const { Utils } = require("./addons/utils")
const { Database } = require("midb")
const colors = require("colors/safe")
const { CustomHelpCommand } = require("./addons/help")
const db = new Database({
    path: "./database",
    tables: ["main"]
})
db.on("ready", () => {
    console.log(colors.green("Starting Database"), "||", colors.green("Midb"))
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
        if(!await db.has(`botexists_${botid}`)) return i.reply({ embeds: [new EmbedBuilder().setDescription("<:cyaddons_dberror:1221503917091717182> | ***`El bot no está enlistado.`***").setColor("FF00EE")], ephemeral: true })
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
        let abot = i.client?.users?.cache?.get(`${i.customId.split("_")[1]}`) || await i.client?.users?.fetch(`${i.customId.split("_")[1]}`).catch(e=>null)
        let memberbot = i.guild?.members?.cache?.get(`${i.customId.split("_")[1]}`) || await i.guild?.members?.fetch(`${i.customId.split("_")[1]}`).catch(e=>null)
        let roles = {
        one: i.guild?.roles?.cache?.get("917177815454068786") || await i.guild?.roles?.fetch("917177815454068786").catch(e=>null),
        two: i.guild?.roles?.cache?.get("926881104974213130") || await i.guild?.roles?.fetch("926881104974213130").catch(e=>null)
        }
        let dbc = i.client?.channels?.cache?.get("965406995849052160") || await i.client?.channels?.fetch("965406995849052160").catch(e=>null)
        let aowner = i.client?.users?.cache?.get(await db.get(`owner_${abot?.id}`)) || await i.client?.users?.fetch(await db.get(`owner_${abot.id}`)).catch(e=>null)
        let embed = new EmbedBuilder()
        .setAuthor({name: abot.username, iconURL: abot.displayAvatarURL({size: 4096})})
        .setTitle("<:cyaddons_plus:1057545930443870208> | Comentarios Extra")
        .setDescription(i.fields.getField("comments").value)
        .setImage(abot.displayAvatarURL({size: 4096}))
        .setColor(Auxiliar.Colors.cyan)
        .setFooter({text: i.user?.username, iconURL: i.user?.displayAvatarURL({size: 4096})})
        await i.update({embeds: [new EmbedBuilder().setDescription("<:cyaddons_check:1060662306507333753> | ***`El bot fue aceptado.`***").setColor(Auxiliar.Colors.cyan)], components: []})
        memberbot.roles.add(roles.one)
        memberbot.roles.remove(roles.two)
        dbc.send({content: `<@${aowner?.id}>`, embeds: [embed]})
        await db.delete(`owner_${abot?.id}`)
        await db.delete(`botexists_${abot?.id}`)
    }
})
bot.on("interactionCreate", async i => {
    if(!i.isButton()) return;
    if(i.customId?.split("_")[0] == "decline") {
        let botid = i.customId?.split("_")[1]
        if(!await db.has(`botexists_${botid}`)) return i.reply({ embeds: [new EmbedBuilder().setDescription("<:cyaddons_dberror:1221503917091717182> | ***`El bot no está enlistado.`***").setColor("FF00EE")], ephemeral: true })
        const reasoninput = new TextInputBuilder()
        .setCustomId("reason")
        .setLabel("Motivo")
        .setPlaceholder("Comenta el motivo de la declinación o los errores del bot.")
        .setRequired(true)
        .setStyle(TextInputStyle.Paragraph)
        const modal = new ModalBuilder()
        .setTitle("Declinar Bot")
        .setCustomId(`DECLINE_${botid}`)
        .addComponents(new ActionRowBuilder().addComponents(reasoninput))
        i.showModal(modal).catch(console.log)
    }
})
bot.on("interactionCreate", async i => {
    if(!i.isModalSubmit()) return;
    if(i.customId.split("_")[0] == "DECLINE") {
        let dbot = i.client?.users?.cache?.get(`${i.customId.split("_")[1]}`) || await i.client?.users?.fetch(`${i.customId.split("_")[1]}`).catch(e=>null)
        let memberbot = i.guild?.members?.cache?.get(`${i.customId.split("_")[1]}`) || await i.guild?.members?.fetch(`${i.customId.split("_")[1]}`).catch(e=>null)
        let dbc = i.client?.channels?.cache?.get("965408092588228658") || await i.client?.channels?.fetch("965408092588228658").catch(e=>null)
        let downer = i.client?.users?.cache?.get(await db.get(`owner_${dbot?.id}`)) || await i.client?.users?.fetch(await db.get(`owner_${dbot.id}`)).catch(e=>null)
        let embed = new EmbedBuilder()
        .setAuthor({name: dbot.username, iconURL: dbot.displayAvatarURL({size: 4096})})
        .setTitle("<:cyaddons_plus:1057545930443870208> | Motivo De La Declinación")
        .setDescription(i.fields.getField("reason").value)
        .setImage(dbot.displayAvatarURL({size: 4096}))
        .setColor(Auxiliar.Colors.red)
        .setFooter({text: i.user?.username, iconURL: i.user?.displayAvatarURL({size: 4096})})
        await i.update({embeds: [new EmbedBuilder().setDescription("<:cyaddons_error:1060665620468863096> | ***`El bot fue declinado.`***").setColor(Auxiliar.Colors.red)], components: []})
        memberbot.kick()
        dbc.send({content: `<@${downer?.id}>`, embeds: [embed]})
        await db.delete(`owner_${dbot?.id}`)
        await db.delete(`botexists_${dbot?.id}`)
    }
})
// Commands & Events Handler
bot.load("./cmds")
bot.login(process.env.TOKEN)
