const { CommandBuilder, Plugins, Context, ParamsBuilder, AttachmentBuilder } = require("erine");

/**
 * @param {String} text 
 */

module.exports["data"] = {
    data:  new CommandBuilder({
        name: "eval",
        aliases: ["try"],
        description:  "Evalúa un código de JavaScript."
    }),
    plugins: [Plugins.isOwner],
    params: new ParamsBuilder()
    .addString({ name: "código", description: "El código a evaluar", required: true, ellipsis: true }),
    /**
     * @param {Context} ctx
     */
    async code(ctx) {
        let c = ctx.get("código")
        try {
        let evaled = eval(c);
        ctx.send(evaled.toString())
        } catch(error) {
            ctx.send(error.toString().slice(0, 1000))
        }
    }
}
