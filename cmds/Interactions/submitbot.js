const { InteractionBuilder,
    Interactions,
    ModalSubmitInteraction,
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
    /**
     * @param {ModalSubmitInteraction} i 
     */
    async code(i) {
        const botId = i.fields.getField("ID_ID").value
        const INVITE_URL = `https://discord.com/api/oauth2/authorize?client_id=${botId}&permissions=0&scope=bot`
        const CHANNEL_ID = "1206725863757058059"
        const botUser =  await i.bot.users.fetch(botId).catch(e=>null);
        if(!botUser) return i.reply({ embeds: [new EmbedBuilder().setDescription("<:cyaddons_search:1082030058375491724> | ***`La ID no fue encontrada.`***").setColor(Auxiliar.Colors.red)], ephemeral: true })
        if(!botUser.bot) return i.reply({ embeds: [new EmbedBuilder().setDescription("<:cyaddons_error:1060665620468863096> | ***`El usuario no es un bot.`***").setColor(Auxiliar.Colors.red)], ephemeral: true })
        let possibleMember = i.guild.members.cache.get(botUser.id)
        if(possibleMember) return i.reply({ embeds: [new EmbedBuilder().setDescription("<:cyaddons_error:1060665620468863096> | ***`El bot ya está unido al servidor.`***").setColor(Auxiliar.Colors.red)], ephemeral: true })
        const embed = new EmbedBuilder()
        .setAuthor({name: "Se enlistó a un nuevo bot.", iconURL: `${i.guild.iconURL({size: 4096})}`})
        .addFields({ text: `Propietario | ${i.user.username}`, value: `${botUser.username}`})
        .setColor(Auxiliar.Colors.pink)
        .setFooter({text: await i.bot.users.fetch(botId).username, iconURL: i.bot.users.fetch(botId).displayAvatarURL({size: 4096})})
        .addFields({ name: "<:cyaddons_dbplus:1216132261351522324> | Prefijo",  value: i.fields.getField("ID_PREFIX").value })
        .addFields({ name: "<:cyaddons_dbinfo:1207745246331666442> | Descripción", value:  i.fields.getField("ID_DESC").value });
        
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setLabel("Invitar Al Servidor")
            .setStyle(5)
            .setURL(INVITE_URL)
        );

        const channel =  await i.bot.channels.fetch(CHANNEL_ID);
        await channel.send({ embeds: [embed], components: [row] }).catch(console.log)
        await i.reply({ embeds: [new EmbedBuilder().setDescription("<:cyaddons_dbverify:1207744901865938964> | ***`El bot se añadió a lista.`***").setColor(Auxiliar.Colors.pink)], ephemeral: true }).catch(console.log)
    }
}
