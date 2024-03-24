const { CommandBuilder, ParamsBuilder, EmbedBuilder, Context, ActionRowBuilder, ButtonBuilder } = require("erine");
const { Database } = require("midb")
const db = new Database();
const { Auxiliar } = require("../index")
module.exports["data"] = {
    data:  new CommandBuilder({
        name: "memberbot",
        description:  "Muestra la información de un bot enlistado.",
    }),
    params: new ParamsBuilder()
    .addMember({ name: "bot", description: "El bot en prueba que se verá.", required: true}),
    async code(ctx) {
      let mbot = ctx.bot.users.cache.get(ctx.get("bot").user?.id) || await ctx.bot.users.fetch(ctx.get("bot").user?.id)
    if(!await db.has(`botexists_${mbot.id}`)) return ctx.send({embeds: [new EmbedBuilder().setDescription("<:cyaddons_error:1060665620468863096> | ***`El bot no está enlistado.`***").setColor(Auxiliar.Colors.red)], ephemeral: true})
      let mowner = ctx.bot.users.cache.get(await db.get(`owner_${mbot.id}`)) || await ctx.bot.users.fetch(await db.get(`owner_${mbot.id}`))
   if(!mbot.bot) return await ctx.send({embeds: [new EmbedBuilder().setDescription("<:cyaddons_search:1082030058375491724> | ***`El bot no existe.`***").setColor(Auxiliar.Colors.red)], ephemeral: true}) 
  let embed = new EmbedBuilder()
      .setAuthor({name: mbot.username, iconURL: mbot.displayAvatarURL({size: 4096})})
      .setThumbnail(mowner.displayAvatarURL({size: 4096}))
      .setColor(Auxiliar.Colors.pink)
      .setFooter({text: "El bot se encuentra pendiente.", iconURL: `https://i.imgur.com/IybEVW0.png`})
      .addFields({name: "<:cyaddons_dbowner:1221172734336303192> | Propietario", value: `<:cyaddons_dbmember:1212222400163221514> | ***[${mowner.username}](https://discord.com/users/${mowner.id})***`})
      let row = new ActionRowBuilder()
      .addComponents(
      new ButtonBuilder().setLabel("Aceptar").setStyle(3).setCustomId(`accept_${mbot.id}`),
      new ButtonBuilder().setLabel("Declinar").setStyle(4).setCustomId(`decline_${mbot.id}`)
      )
      await ctx.send({embeds: [embed], components: [row]})
}
}
