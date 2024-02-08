const { EventBuilder, Erine, Errors } = require("erine");

module.exports["data"] = {
    data: new EventBuilder({
        name: "error"
    }),
    /**
     * @param {Erine} client
     * @param {*} error
     */
    async code(client, error) {
        if(error instanceof Errors.CommandNotFound)
            return await error.ctx.send(`Ningun **${error.provided}** comando fue encontrado.`)
        else if(error instanceof Errors.InvalidParamMember)
            return await error.ctx.send(`El parametro \`${error.param.name}\` debe ser un miembro de **${error.ctx.guild.name}**.`)
        else if(error instanceof Errors.NotOwner)
            return await error.ctx.send(`No eres desarrollador de este bot.`)
        else if(error instanceof Errors.MissingRequiredParam)
            return await error.ctx.send(`Necesitas proporcionarle un valor al parametro \`${error.param.name}\``)
        else if(error instanceof Errors.MissingPermission)
            return await error.ctx.send(`Necesitas de los permisos (${error.permissions.join(", ")}) para poder ejecutar el comando.`)
        else
            console.log(error)
    }
}