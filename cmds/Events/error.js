const { EventBuilder, Erine, EmbedBuilder, Errors } = require("erine");
const { Auxiliar } = require("../../index")
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
            return await error.ctx.send({embeds: [new EmbedBuilder().setDescription("<:cyaddons_error:1060665620468863096> | ***No tienes permitido usar esto.***").setColor(Auxiliar.Colors.red)]})
        else if(error instanceof Errors.MissingRequiredParam)
            return await error.ctx.send({embeds: [new EmbedBuilder().setDescription(`<:cyaddons_warn:1057720067783135363> | ***El parámetro \`${error.param.name}\` está vacío.***`).setColor(Auxiliar.Colors.red)]})
        else if(error instanceof Errors.MissingPermission)
            return await error.ctx.send(`Necesitas de los permisos (${error.permissions.join(", ")}) para poder ejecutar el comando.`)
        else
            console.log(error)
    }
}
