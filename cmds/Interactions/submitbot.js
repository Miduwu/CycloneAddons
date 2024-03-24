const { InteractionBuilder,
    Interactions,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder
} = require("erine");
const { Auxiliar } = require("../../index");
const { Database } = require("midb")
const db = new Database();
module.exports["data"] = {
    data: new InteractionBuilder({
        name: "ID_ADDBOT_MODAL",
        type: Interactions.Modal
    }),
    async code(i) {
        const botId = i.fields.getField("ID_ID").value
        const addbotchannel = i?.client?.channels?.cache?.get("1206725863757058059") || await i.client?.channels?.fetch("1206725863757058059").catch(e=>null)
        const botUser = i.client?.users?.cache?.get(botId) || await i.client?.users?.fetch(botId).catch(e=>null)
        //console.log(`${botUser?.bot}, ${i.getTextInputValue("ID_ID")}`)
        if(!botUser?.bot) return i.reply({ embeds: [new EmbedBuilder().setDescription("<:cyaddons_error:1060665620468863096> | ***`El usuario no es un bot.`***").setColor(Auxiliar.Colors.red)], ephemeral: true })
        let possibleMember = i.guild?.members?.cache?.get(botUser?.id)
        if(possibleMember) return i.reply({ embeds: [new EmbedBuilder().setDescription("<:cyaddons_error:1060665620468863096> | ***`El bot ya está unido al servidor.`***").setColor(Auxiliar.Colors.red)], ephemeral: true })
        await db.set(`botexists_${botUser.id}`, "true")
        await db.set(`owner_${botUser.id}`, `${i.user?.id}`)
        const embed = new EmbedBuilder()
        .setAuthor({name: "Se enlistó a un nuevo bot.", iconURL: `${i.guild?.iconURL({size: 4096})}`})
        .setDescription(`<:cyaddons_dbclock:1221320187333312542> | <t:${parseInt(Date.now() / 1000)}:R>`)
        .setThumbnail(`${botUser.displayAvatarURL({size: 4096})}`)
        .setColor("FF00EE")
        .setTitle(`${botUser.username}`)
        .setURL(`https://discord.com/users/${botUser.id}`)
        .setFields({ name: "<:cyaddons_dbowner:1221172734336303192> | Propietario", value: `- [${i.user?.username}](https://discord.com/users/${i.user?.id}/) (\`${i.user?.id}\`)`},{name: "<:cyaddons_dbplus:1216132261351522324> | Prefijo",  value: `\`${i.fields.getTextInputValue("ID_PREFIX")}\``},{name: "<:cyaddons_dbmessage:1217257122031472640> | Descripción", value: `${i.fields.getTextInputValue("ID_DESC")}` || "`(Nada Adjunto)`"})
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setLabel("Invitar Al Servidor")
            .setStyle(5)
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${botId}&permissions=0&scope=bot&guild_id=917153701637013535`)
        );
        await addbotchannel.send({ embeds: [embed], components: [row] }).catch(console.log)
        await i.reply({ embeds: [new EmbedBuilder().setDescription("<:cyaddons_dbverify:1207744901865938964> | ***`El bot fue enlistado.`***").setColor(Auxiliar.Colors.pink)], ephemeral: true }).catch(console.log)
    }
}
