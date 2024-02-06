const { InteractionBuilder,
    Interactions,
    ModalSubmitInteraction,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder
} = require("erine");
const { Auxiliar } = require("../../index");

const INVITE_URL = "https://discord.com/api/oauth2/authorize?client_id={id}&permissions=0&scope=bot"
const CHANNEL_ID = "965406359514406923"

module.exports["data"] = {
    data: new InteractionBuilder({
        name: "ID_ADDBOT_MODAL",
        type: Interactions.Modal
    }),
    /**
     * @param {ModalSubmitInteraction} i 
     */
    async code(i) {
        console.log("OKS")
        const botId = i.fields.getField("ID_ID").value
        const botUser =  await i.client.users.fetch(botId).catch(e=>null);
        if(!botUser) return i.reply({ content: "El bot proporcionado no existe o el ID es incorrecto.", ephemeral: true });

        const embed = new EmbedBuilder()
        .setTitle("| Bot Enlistado")
        .setAuthor({ name: i.user.username, iconURL: i.user.displayAvatarURL()})
        .setFooter({ text: botUser.username, iconURL: botUser.displayAvatarURL() })
        .setColor(Auxiliar.Colors.yellow)
        .addFields({ name: "Prefix",  value: i.fields.getField("ID_PREFIX").value })
        .addFields({ name: "Descripción", value:  i.fields.getField("ID_DESC").value });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setLabel("Invitar")
            .setStyle(5)
            .setEmoji("📨")
            .setURL(INVITE_URL.replace("{id}", botUser.id))
        );

        const channel =  i.guild.channels.cache.get(CHANNEL_ID);
        await channel.send({ embeds: [embed], components: [row] }).catch(console.log)
        await i.reply({ content: "Ahora necesitas esperar a que un moderador apruebe tu bot! Suerte", ephemeral: true }).catch(console.log)
    }
}