const { InteractionBuilder, Interactions, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("erine");
module.exports["data"] = {
    data: new InteractionBuilder({
        type: Interactions.Button
    }),
    async code(i) {
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
    }
}
