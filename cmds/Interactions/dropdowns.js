const { InteractionBuilder, EmbedBuilder, Interactions, StringSelectMenuInteraction} = require("erine")
const { Auxiliar } = require("../../index")
module.exports["data"] = {
    data: new InteractionBuilder({
        name: "ID_DROPDOWNS",
        type: Interactions.StringSelectMenu
    }),
    async code(interaction) {
   if(interaction.customId == "ID_DROPDOWNS") return
        let value = interaction.values[0]
   if(interaction.member.roles.cache.has(`${value}`) == false) {
interaction.member.roles.add(`${value}`)
interaction.reply({embeds: [new EmbedBuilder().setDescription("<:cyaddons_plus:1057545930443870208> | ***Rol añadido a tu lista.***").setColor(Auxiliar.Colors.cyan)], ephemeral: true})
} else {
interaction.member.roles.remove(`${value}`)
interaction.reply({embeds: [new EmbedBuilder().setDescription("<:cyaddons_minus:1057546000622964746> | ***Rol removido de tu lista.***").setColor(Auxiliar.Colors.red)], ephemeral: true})
    }
  }
}
