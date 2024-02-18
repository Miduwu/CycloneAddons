const { Interactions, ActionRowBuilder, ButtonBuilder, StringSelectMenuOptionBuilder, StringSelectMenuBuilder, InteractionBuilder, EmbedBuilder } = require("erine")
const { Auxiliar } = require("../../index")
let roles = { Female: "917435110591189052", Male: "917435094409564230", Neutral: "917435095172911135", Revive: "1208617632237101137", Anuncios: "917659645382901810", Alianzas: "919702909346803843" }
module.exports["data"] = [{
data: new InteractionBuilder({
name: "genders",
type: Interactions.Button
}),
async code(interaction) {
        let row = new ActionRowBuilder()
            .addComponents(new StringSelectMenuBuilder()
                .setCustomId("ID_DROPDOWNS")
                .setPlaceholder("Selecciona Tu Género")
      .addOptions(new StringSelectMenuOptionBuilder().setLabel("Femenino").setValue(roles.Female).setEmoji("<:cyaddons_female:1097701202457788516> "),
new StringSelectMenuOptionBuilder().setLabel("Masculino").setValue(roles.Male).setEmoji("<:cyaddons_male:1097701261362606190> "),
new StringSelectMenuOptionBuilder().setLabel("No Identificado").setValue(roles.Neutral).setEmoji("<:cyaddons_nonbinary:1097701322788184107>")))
let embed = new EmbedBuilder()
.setTitle("<:cyaddons_dbgenders:1208608303819661332> | Géneros")
.setDescription("<:cyaddons_dbinfo:1207745246331666442> | ***`Selecciona tu género para evitar confusiones.`***")
.setColor(Auxiliar.Colors.pink)
 await interaction.reply({embeds: [embed], components: [row], ephemeral: true})
 }
  },{
data: new InteractionBuilder({
name: "pings",
type: Interactions.Button
}),
async code(interaction) {
        let row = new ActionRowBuilder()
            .addComponents(new StringSelectMenuBuilder()
                .setCustomId("ID_DROPDOWNS")
                .setPlaceholder("Selecciona Una Mención")
      .addOptions(new StringSelectMenuOptionBuilder().setLabel("Anuncios").setValue(roles.Anuncios).setEmoji("<:cyaddons_dbannouncement:1208616564614635570>"),
new StringSelectMenuOptionBuilder().setLabel("Alianzas").setValue(roles.Alianzas).setEmoji("<:cyaddons_dballiance:1208616603411939379>"),
new StringSelectMenuOptionBuilder().setLabel("Revivir Chat").setValue(roles.Revive).setEmoji("<:cyaddons_dbmessage:1208616584919253053>")))
let embed = new EmbedBuilder()
.setTitle("<:cyaddons_dbping:1208616544612126720> | Menciones")
.setDescription("<:cyaddons_dbinfo:1207745246331666442> | ***`Selecciona una mención para evitar el uso de @everyone.`***")
.setColor(Auxiliar.Colors.pink)
 await interaction.reply({embeds: [embed], components: [row], ephemeral: true})
}]
