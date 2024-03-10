const { CommandBuilder, Plugins, Context, ParamsBuilder, AttachmentBuilder } = require("erine");

module.exports["data"] = {
    data:  new CommandBuilder({
        name: "eval",
        aliases: ["try"],
        description:  "Evalúa un código de JavaScript.",
    }),
    plugins: [Plugins.isOwner],
    params: new ParamsBuilder()
    .setQuoted(false)
    .addString({ name: "código", description: "El código a evaluar.", required: true, ellipsis: true }),
    /**
     * @param {Context} ctx
     */
    async code(ctx) {
        let evaled = eval(ctx.get("código"))
        try {
            ctx.send(evaled)
        } catch(err) {
            ctx.send(err)
            console.log(err)
        }
    }
}
