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
        .setLabel("ID del bot")
        .setPlaceholder("Snowflake")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

        const PREFIX_Input = new TextInputBuilder()
        .setCustomId("ID_PREFIX")
        .setLabel("Prefijo")
        .setPlaceholder("El prefijo del bot o / si es con slash")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

        const DESC_Input = new TextInputBuilder()
        .setCustomId("ID_DESC")
        .setLabel("Descripción del bot")
        .setPlaceholder("Características del bot, lenguaje/librería de programación, etc.")
        .setRequired(true)
        .setStyle(TextInputStyle.Paragraph)

        const [row1, row2, row3] = [new ActionRowBuilder().addComponents(ID_Input), new ActionRowBuilder().addComponents(PREFIX_Input), new ActionRowBuilder().addComponents(DESC_Input)]

        const modal = new ModalBuilder()
        .setTitle("Añade tu bot")
        .setCustomId("ID_ADDBOT_MODAL")
        .addComponents(row1, row2, row3)

        i.showModal(modal).catch(console.log)
    }
}