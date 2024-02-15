const { EmbedBuilder, Interactions, InteractionBuilder } = require("erine")
const { Auxiliar } = require("../../index")
module.exports["data"] = {
data: new InteractionBuilder({
name: "verify_button",
type: Interactions.Button
}),
async code(interaction) {
let verifyrole = interaction.guild.roles.cache.get("917164283677278279") || await interaction.guild.roles.fetch("917164283677278279")
if(!interaction.member.roles.has(verifyrole)) {
await interaction.member.roles.add(verifyrole)
await interaction.reply({embeds: [new EmbedBuilder().setDescription("<:cyaddons_check:1060662306507333753> | ***Te verificaste exitosamente.***").setColor(Auxiliar.Colors.cyan)], ephemeral: true})
  } else {
await interaction.reply({embeds: [new EmbedBuilder().setDescription("<:cyaddons_error:1060665620468863096> | ***No es necesario, ya te verificaste.***").setColor(Auxiliar.Colors.red)], ephemeral: true})
}
   }
}
