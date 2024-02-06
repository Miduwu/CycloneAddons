const { CommandBuilder, Plugins, Context, ActionRowBuilder, ButtonBuilder } = require("erine");

module.exports["data"] = {
    data:  new CommandBuilder({
        name: "ping",
        aliases: ["latency"],
        description: "Responde con la latencia"
    }),
    plugins: [Plugins.isOwner],
    /**
     * @param {Context} ctx
     */
    async code(ctx) {
        await ctx.send(`Pong! ${ctx.bot.ws.ping}`)
    }
}