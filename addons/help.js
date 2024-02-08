const { HelpCommand, Context } = require("erine")

class CustomHelpCommand extends HelpCommand {

    /**
     * @param {Context} ctx
     */
    async sendEmpty(ctx) {
        await ctx.send("Hola")
    }
}

module.exports = { CustomHelpCommand }