const { CommandBuilder, ParamsBuilder, EmbedBuilder, Context, ActionRowBuilder, ButtonBuilder } = require("erine");
const { Database } = require("midb")
const db = new Database();
const { Auxiliar } = require("../index")
module.exports["data"] = {
    data:  new CommandBuilder({
        name: "memberbot",
        description:  "Evalúa un código de JavaScript.",
    }),
    params: new ParamsBuilder()
    .addMember({ name: "bot", description: "El bot en prueba que se verá.", required: true}),
    async code(ctx) {
      let mbot = ctx.bot.users.cache.get(ctx.get("bot").user?.id) || await ctx.bot.users.fetch(ctx.get("bot").user?.id)
    if(!await db.has(`botexists_${mbot.id}`)) return ctx.send({embeds: [new EmbedBuilder().setDescription("<:cyaddons_error:1060665620468863096> | ***`El bot no está enlistado.`***").setColor(Auxiliar.Colors.red)]})
      let mowner = ctx.bot.users.cache.get(await db.get(`owner_${mbot.id}`)) || await ctx.bot.users.fetch(await db.get(`owner_${mbot.id}`))
   if(!mbot.bot) return await ctx.send({embeds: [new EmbedBuilder().setDescription("<:cyaddons_search:1082030058375491724> | ***`El bot no existe.`***").setColor(Auxiliar.Colors.red)]}) 
  let embed = new EmbedBuilder()
      .setAuthor({name: mbot.username, iconURL: mbot.displayAvatarURL({size: 4096})})
      .setTitle("<:cyaddons_dbidle:1220959205372989460> | Pendiente")
      .setThumbnail(mowner.displayAvatarURL({size: 4096}))
      .setColor("FF00EE")
      .addFields({name: "<:cyaddons_dbmember:1212222400163221514> | Propietario", value: `- ***\`${mowner.username}\`***`})
      let row = new ActionRowBuilder()
      .addComponents(
      new ButtonBuilder().setLabel("Aceptar").setStyle(2).setCustomId(`accept_${mbot.id}`),
      new ButtonBuilder().setLabel("Declinar").setStyle(4).setCustomId(`decline_${mbot.id}`)
      )
      await ctx.send({embeds: [embed], components: [row]})
}
}
