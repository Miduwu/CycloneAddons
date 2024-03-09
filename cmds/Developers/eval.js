const { CommandBuilder, Plugins, Context, ParamsBuilder, AttachmentBuilder } = require("erine");
const { inspect } = require("util");

/**
 * @param {String} text 
 */
const CleanCodeblockCode = (text) => {
    if(text.startsWith("codeblock symbols") && text.endsWith("cc")) {
        let lines = text.split("\n")
        return lines.slice(1, lines.length - 1).join("\n")
    } else return text;
}

module.exports["data"] = {
    data:  new CommandBuilder({
        name: "eval",
        aliases: ["try"],
        description:  "Evalúa un código de JavaScript.",
    }),
    plugins: [Plugins.isOwner],
    params: new ParamsBuilder()
    .addString({ name: "code", description: "El código a evaluar.", required: true, ellipsis: true }),
    /**
     * @param {Context} ctx
     */
    async code(ctx) {
        try {
            let result = await eval(CleanCodeblockCode(ctx.args.get("code"))),
            clean = inspect(result, { depth: 2 });
            if(clean.length >= 1975) {
                let file = new AttachmentBuilder(Buffer.from(clean)).setName("eval.txt")
                ctx.send({ files: [file], content: ctx.author.toString() })
            } else {
                let formatted = "cosas de codeblocks aqui"
                ctx.send({ content: `${ctx.author}\n${formatted}` })
            }
        } catch(err) {
            let error = inspect(err, { depth: 2 })
            let formattedError = `**ERROR** ...`
            await ctx.send({ content:  `${ctx.author}\n${formattedError}`})
        }
    }
}
