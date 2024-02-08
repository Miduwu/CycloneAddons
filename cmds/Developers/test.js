const { CommandBuilder, Context, Plugins, StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder } = require("erine");

const Roles = {
    AOIJS: "917210559324229643",
    BDFD: "917210550843355156",
    DJS: "917210532052873236",
    DPY: "966429903379648552"
}

module.exports["data"] = {
    data: new CommandBuilder({
        name: "test",
        description: "Desc"
    }),
    plugins: [Plugins.isOwner],
    /**
     * @param {Context} ctx 
     */
    async code(ctx) {

        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId("ID_DROPDOWN_LIBRERIAS")
                .setPlaceholder("Selecciona tus librerías")
                .addOptions(
                    new StringSelectMenuOptionBuilder().setLabel("Aoi.JS").setValue(Roles.AOIJS).setEmoji("976625437214122094"),
                    new StringSelectMenuOptionBuilder().setLabel("BDFD").setValue(Roles.BDFD).setEmoji("1200693584186322954"),
                    new StringSelectMenuOptionBuilder().setLabel("Discord.js").setValue(Roles.DJS).setEmoji("1083038885136830645"),
                    new StringSelectMenuOptionBuilder().setLabel("Discord.py").setValue(Roles.DPY).setEmoji("1200692363639652382")
                )
            );

        ctx.send({ content: "HOLA", components: [row] })
    }
}