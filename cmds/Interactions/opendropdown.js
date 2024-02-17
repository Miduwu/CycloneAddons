const { EmbedBuilder, ActionRowBuilder, Interactions, InteractionBuilder } = require("erine")
const { Auxiliar } = require("../../index")
module.exports["data"] = {
data: new InteractionBuilder({
type: Interactions.Button
}),
async code(interaction) {
if(interaction.customId.split("_")[1] == "gender") {
await interaction.reply({content: "hola"})
}
}
}
