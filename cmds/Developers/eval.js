const { CommandBuilder, Plugins, Context, ParamsBuilder, AttachmentBuilder } = require("erine");

/**
 * @param {String} text 
 */

module.exports["data"] = {
    data:  new CommandBuilder({
        name: "eval",
        aliases: ["try"],
        description:  "Evalúa un código de JavaScript.",
    }),
    plugins: [Plugins.isOwner],
    params: new ParamsBuilder()
    .addString({ name: "código", description: "El código a evaluar", required: true }),
    /**
     * @param {Context} ctx
     */
    async code(ctx) {
        let evaled = eval(`${ctx.get("código")}`)
        await ctx.send(evaled)
        
    }
}
