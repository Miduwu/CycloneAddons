const { CommandBuilder, Plugins, Context, ParamsBuilder, AttachmentBuilder } = require("erine");
const { inspect } = require("util");

/**
 * @param {String} text 
 */
const CleanCodeblockCode = (text) => {
    if(text.startsWith("```") && text.endsWith("```")) return text.split(" ").slice(1).join(" ").slice(0, -3)
    else return text;
}

module.exports["data"] = {
    data:  new CommandBuilder({
        name: "eval",
        aliases: ["try"],
        description:  "Evaluates JavaScript code.",
    }),
    plugins: [Plugins.isOwner],
    params: new ParamsBuilder()
    .addString({ name: "code", description: "El código a evaluar", required: true, ellipsis: true }),
    /**
     * @param {Context} ctx
     */
    async code(ctx) {
        try {
            let result = await eval(CleanCodeblockCode(ctx.get("code"))),
            clean = inspect(result, { depth: 2 });
            if(clean.length >= 1975) {
                let file = new AttachmentBuilder(Buffer.from(clean)).setName("eval.txt")
                ctx.send({ files: [file], content: ctx.author.toString() })
            } else {
                let formatted = "```js\n" + clean + "```"
                ctx.send({ content: `${ctx.author}\n${formatted}` })
            }
        } catch(err) {
            let error = inspect(err, { depth: 2 })
            let formattedError = `**ERROR** \`\`\`js\n${error.slice(0, 1975)}\n\`\`\``
            await ctx.send({ content:  `${ctx.author}\n${formattedError}`})
        }
    }
}