const { Interactions, InteractionBuilder, EmbedBuilder } = require("erine")
const { Auxiliar } = require("../../index")
module.exports["data"] = {
data: new InteractionBuilder({
name: "nsfwaccess",
type: Interactions.Button
}),
async code(interaction) {
  let nsfwRole = interaction.guild.roles.cache.get("917661809455034428") || await interaction.guild.roles.fetch("917661809455034428")
  if(!interaction.member.roles.cache.has(nsfwRoles)) {
    await interaction.member.roles.add(nsfwRole)
    let embed = new EmbedBuilder()
      .setDescription("<:cyaddons_plus:1057545930443870208> | ***Rol añadido a tu lista.***")
      .setColor(Auxiliar.Colors.cyan)
  } else {
    await interaction.member.roles.remove(nsfwRole)
    let embed = new EmbedBuilder()
      .setDescription("<:cyaddons_minus:1057546000622964746> | ***Rol removido de tu lista.***")
      .setColor(Auxiliar.Colors.red)
  }
  return interaction.reply({embeds: [embed], ephemeral: true})
 }
  }
  
