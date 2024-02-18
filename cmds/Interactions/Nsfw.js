const { Interactions, InteractionBuilder, EmbedBuilder } = require("erine")
const { Auxiliar } = require("../../index")
module.exports["data"] = {
data: new InteractionBuilder({
name: "nsfw",
type: Interactions.Button
}),
async code(interaction) {
  let nsfwRole = interaction.guild.roles.cache.get("917661809455034428") || await interaction.guild.roles.fetch("917661809455034428")
  if(!interaction.member.roles.cache.has(nsfwRole)) {
    await interaction.member.roles.add(nsfwRole)
    await interaction.reply({embeds: [new EmbedBuilder().setDescription("<:cyaddons_nsfw:1206059710382608394> | ***Rol añadido a tu lista.***").setColor(Auxiliar.Colors.red)], ephemeral: true})
  } else {
    await interaction.member.roles.remove(nsfwRole)
    await interaction.reply({embeds: [new EmbedBuilder().setDescription("<:cyaddons_minus:1057546000622964746> | ***Rol removido de tu lista.***").setColor(Auxiliar.Colors.red)], ephemeral: true})
  }
 }
  }
  
