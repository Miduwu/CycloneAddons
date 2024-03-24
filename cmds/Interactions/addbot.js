const { InteractionBuilder, Interactions, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("erine");

module.exports["data"] = {
    data: new InteractionBuilder({
        name: "ID_ADDBOT_BUTTON",
        type: Interactions.Button
    }),
    /**
     * @param {ButtonInteraction} i 
     */
    async code(i) {
        const ID_Input = new TextInputBuilder()
        .setCustomId("ID_ID")
        .setLabel("ID Del Bot")
        .setPlaceholder("La ID del bot que añadirás.")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

        const PREFIX_Input = new TextInputBuilder()
        .setCustomId("ID_PREFIX")
        .setLabel("Prefijo")
        .setPlaceholder("El prefijo del bot. (Pon \"/\" si usa Slash)")
        .setRequired(true)
        .setStyle(TextInputStyle.Short)
        .setMaxLength(10);
        const DESC_Input = new TextInputBuilder()
        .setCustomId("ID_DESC")
        .setLabel("Descripción")
        .setPlaceholder("Características del bot, librería, lenguaje de programación, etc.")
        .setRequired(true)
        .setStyle(TextInputStyle.Paragraph)
        .setMaxLength(1000)
        const [row1, row2, row3] = [new ActionRowBuilder().addComponents(ID_Input), new ActionRowBuilder().addComponents(PREFIX_Input), new ActionRowBuilder().addComponents(DESC_Input)]

        const modal = new ModalBuilder()
        .setTitle("Añadir Bot")
        .setCustomId("ID_ADDBOT_MODAL")
        .addComponents(row1, row2, row3)

        i.showModal(modal).catch(console.log)
    }
}
