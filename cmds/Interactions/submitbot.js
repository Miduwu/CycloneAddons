const { InteractionBuilder,
    Interactions,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder
} = require("erine");
const { Auxiliar } = require("../../index");

module.exports["data"] = {
    data: new InteractionBuilder({
        name: "ID_ADDBOT_MODAL",
        type: Interactions.Modal
    }),
    async code(i) {
        const botId = i.fields.getField("ID_ID").value
        const addbotchannel = i.bot?.channels?.cache?.get("1206725863757058059") || await i.bot?.channels?.fetch("1206725863757058059")
        const botUser =  i.bot?.users?.cache?.get(botId) || await i.bot?.users?.fetch(botId)
        if(!botUser) return i.reply({ embeds: [new EmbedBuilder().setDescription("<:cyaddons_search:1082030058375491724> | ***`La ID no fue encontrada.`***").setColor(Auxiliar.Colors.red)], ephemeral: true })
        if(!botUser.bot) return i.reply({ embeds: [new EmbedBuilder().setDescription("<:cyaddons_error:1060665620468863096> | ***`El usuario no es un bot.`***").setColor(Auxiliar.Colors.red)], ephemeral: true })
        let possibleMember = i.guild.members.cache.get(botUser.id)
        if(possibleMember) return i.reply({ embeds: [new EmbedBuilder().setDescription("<:cyaddons_error:1060665620468863096> | ***`El bot ya está unido al servidor.`***").setColor(Auxiliar.Colors.red)], ephemeral: true })
        const embed = new EmbedBuilder()
        .setAuthor({name: "Se enlistó a un nuevo bot.", iconURL: `${i.guild.iconURL({size: 4096})}`})
        .addFields({ text: `Propietario | ${i.user.username}`, value: `${botUser.username}`})
        .setColor(Auxiliar.Colors.pink)
        .setFooter({text: `${botUser.username}`, iconURL: `${botUser.displayAvatarURL({size: 4096})}`})
        .addFields({ name: "<:cyaddons_dbplus:1216132261351522324> | Prefijo",  value: i.fields.getField("ID_PREFIX").value })
        .addFields({ name: "<:cyaddons_dbinfo:1207745246331666442> | Descripción", value:  i.fields.getField("ID_DESC").value });
        
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
