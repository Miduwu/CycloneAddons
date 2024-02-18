const { Interactions, ActionRowBuilder, ButtonBuilder, StringSelectMenuOptionBuilder, StringSelectMenuBuilder, InteractionBuilder, EmbedBuilder } = require("erine")
const { Auxiliar } = require("../../index")
let roles = { Female: "917435110591189052", Male: "917435094409564230", Neutral: "917435095172911135", Revive: "1208617632237101137", Anuncios: "917659645382901810", Alianzas: "919702909346803843", AOIJS: "917210559324229643", BDFD: "917210550843355156", DJS: "917210532052873236", DPY: "966429903379648552"}
module.exports["data"] = [{
data: new InteractionBuilder({
name: "genders",
type: Interactions.Button
}),
async code(interaction) {
        if(interaction.member.roles.cache.has(roles.Famale || roles.Male || roles.Neutral)) return await interaction.reply({embeds: [new EmbedBuilder().setTitle("<:cyaddons_dbgenders:1208608303819661332> | Géneros").setDescription("<:cyaddons_dbwarning:1208648325814030427> | ***`Ya posees un rol de género.`***").setColor(Auxliar.Colors.red)], components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel("Remover").setCustomId("deletegender").setStyle(2).setEmoji("<:cyaddons_dberror:1208648660779270164>"))], ephemeral: true})
        let row = new ActionRowBuilder()
            .addComponents(new StringSelectMenuBuilder()
                .setCustomId("ID_DROPDOWNS")
                .setPlaceholder("Selecciona Tu Género")
      .addOptions(new StringSelectMenuOptionBuilder().setLabel("Femenino").setValue(roles.Female).setEmoji("<:cyaddons_female:1097701202457788516>"),
new StringSelectMenuOptionBuilder().setLabel("Masculino").setValue(roles.Male).setEmoji("<:cyaddons_male:1097701261362606190>"),
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
}
},{
data: new InteractionBuilder({
name: "libraries",
type: Interactions.Button
}),
async code(interaction) {
        let row = new ActionRowBuilder()
            .addComponents(new StringSelectMenuBuilder()
                .setCustomId("ID_DROPDOWNS")
                .setPlaceholder("Selecciona Una Librería")
      .addOptions(new StringSelectMenuOptionBuilder().setLabel("Bot Designer For Discord").setValue(roles.BDFD).setEmoji("<:cyaddons_bdfd:1057017084548235356>"),
new StringSelectMenuOptionBuilder().setLabel("Aoi.js").setValue(roles.AOIJS).setEmoji("<:cyaddons_aoi:1204956333808418866>"),
new StringSelectMenuOptionBuilder().setLabel("Discord.js").setValue(roles.DJS).setEmoji("<:cyaddons_djs:1208650942128586803>"),
new StringSelectMenuOptionBuilder().setLabel("Discord.py").setValue(roles.DPY).setEmoji("<:cyaddons_dpy:1057016962791772200>")))
let embed = new EmbedBuilder()
.setTitle("<:cyaddons_dbscript:1208647931704639578> | Librerías")
.setDescription("<:cyaddons_dbinfo:1207745246331666442> | ***`Selecciona tus librerías favoritas o de las que tengas conocimiento.`***")
.setColor(Auxiliar.Colors.pink)
 await interaction.reply({embeds: [embed], components: [row], ephemeral: true})
}
},{
data: new InteractionBuilder({
name: "colors",
type: Interactions.Button
}),
async code(interaction) {
await interaction.reply({embeds: [new EmbedBuilder().setTitle("<:cyaddons_dbcolors:1208647907281080370> | Colores").setDescription("<:cyaddons_dbwarning:1208648325814030427> | ***`Esta categoría no está disponible.`***").setColor("FF46DA")], ephemeral: true})
}
},{
data: new InteractionBuilder({
name: "deletegender",
type: Interactions.Button
}),
async code(interaction) {
await interaction.member.roles.remove(roles.Male) || await interaction.member.roles.remove(roles.Neutral) || await interaction.member.roles.remove(roles.Female)
await interaction.update({embeds: [new EmbedBuilder().setDescription("<:cyaddons_minus:1057546000622964746> | ***`Rol removido de tu lista.`***").setColor(Auxiliar.Colors.red)], components: []})
}
}]
