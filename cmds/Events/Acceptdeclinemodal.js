const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("erine")
const event = {
  name: "interactionCreate",
  async code(client, i) {
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
}
}
module.exports = { data: event }
