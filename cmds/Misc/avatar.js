const { CommandBuilder, ParamsBuilder, Context, EmbedBuilder, GuildMember } = require("erine");
const { Auxiliar } = require("../../index")

module.exports["data"] = {
    data:  new CommandBuilder({
        name: "avatar",
        aliases: ["pfp"],
        description: "Muestra el avatar de un miembro"
    }),
    params: new ParamsBuilder()
    .addMember({ name: "miembro", description: "El miembro para mostrar el avatar", required: false }),
    /**
     * @param {Context} ctx
     */
    async code(ctx) {
        /**
         * @type {GuildMember}
         */
        let user = ctx.get("miembro") || ctx.member
        let embed = new EmbedBuilder()
        .setAuthor({ name: user.user.displayName, iconURL: user.user.displayAvatarURL() })
        .setImage(user.user.displayAvatarURL({ size: 512, extension: "png" }))
        .setColor(Auxiliar.Colors.cyan);

        await ctx.send({ embeds: [embed] })
    }
}