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
        .setTitle(`<:cyaddons_dbmember:1212222400163221514> | Propietario`)
        .setDescription(`- ***\`${i.user?.username}\`***`)
        .setThumbnail(`${i.user.displayAvatarURL({size: 4096})}`)
        .setColor("FF00EE")
        .setFooter({text: `${botUser?.username}`, iconURL: `${botUser?.displayAvatarURL({size: 4096})}`})
        .addFields({ name: "<:cyaddons_dbplus:1216132261351522324> | Prefijo",  value: i.fields.getTextInputValue("ID_PREFIX")})
        .addFields({ name: "<:cyaddons_dbinfo:1207745246331666442> | Descripción", value:  i.fields.getTextInputValue("ID_DESC") });
        
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setLabel("Invitar Al Servidor")
            .setStyle(5)
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${botId}&permissions=0&scope=bot`)
        );
        await addbotchannel.send({ embeds: [embed], components: [row] }).catch(console.log)
        await i.reply({ embeds: [new EmbedBuilder().setDescription("<:cyaddons_dbverify:1207744901865938964> | ***`El bot se añadió a lista.`***").setColor(Auxiliar.Colors.pink)], ephemeral: true }).catch(console.log)
    }
}
