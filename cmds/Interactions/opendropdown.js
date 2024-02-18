const { Interactions, ActionRowBuilder, ButtonBuilder, StringSelectMenuOptionBuilder, StringSelectMenuBuilder, InteractionBuilder, EmbedBuilder } = require("erine")
const { Auxiliar } = require("../../index")
module.exports["data"] = [{
data: new InteractionBuilder({
name: "genders",
type: Interactions.Button
}),
async code(interaction) {
  let roles = {
Female: "917435110591189052",
Male: "917435094409564230",
Neutral: "917435095172911135"
}
        let row = new ActionRowBuilder()
            .addComponents(new StringSelectMenuBuilder()
                .setCustomId("ID_DROPDOWNS")
                .setPlaceholder("Selecciona Tu Género")
      .addOptions(new StringSelectMenuOptionBuilder().setLabel("Femenino").setValue(Roles.Female).setEmoji("<:cyaddons_female:1097701202457788516> "),
new StringSelectMenuOptionBuilder().setLabel("Masculino").setValue(Roles.Male).setEmoji("<:cyaddons_male:1097701261362606190> "),
new StringSelectMenuOptionBuilder().setLabel("No Identificado").setValue(Roles.Neutral).setEmoji("<:cyaddons_nonbinary:1097701322788184107>")))
let embed = new EmbedBuilder()
.setTitle("<:cyaddons_dbgenders:1208608303819661332> | Géneros")
.setDescription("<:cyaddons_dbinfo:1207745246331666442> | ***`Selecciona tu género para evitar confusiones.`***")
.setColor(Auxiliar.Colors.pink)
 }
  },{
data: new InteractionBuilder({
name: "pings",
type: Interactions.Button
}),
async code(interaction) {
  let nsfwRole = interaction.guild.roles.cache.get("917661809455034428") || await interaction.guild.roles.fetch("917661809455034428")
  if(!interaction.member.roles.cache.has(nsfwRole)) {
    await interaction.member.roles.add(nsfwRole)
    await interaction.reply({embeds: [new EmbedBuilder().setDescription("<:cyaddons_plus:1057545930443870208> | ***Rol añadido a tu lista.***").setColor(Auxiliar.Colors.cyan)], ephemeral: true})
 }
}]
