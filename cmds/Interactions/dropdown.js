const { InteractionBuilder, Interactions, StringSelectMenuInteraction, EmbedBuilder } = require("erine");
const { Auxiliar } = require("../../index")
module.exports["data"] = {
    data: new InteractionBuilder({
        name: "ID_DROPDOWNS",
        type: Interactions.StringSelectMenu
    }),
    /**
     * @param {StringSelectMenuInteraction} i 
     */
    async code(i) {
        let msgs = []
        for(const roleId of i.values) {
            let role = i.guild.roles.cache.get(roleId) || await i.guild.roles.fetch(roleId).catch(() => null);
            if(i.member.roles.cache.has(roleId)) {
                msgs.push(new EmbedBuilder().setDescription("<:cyaddons_plus:1057545930443870208> | ***Rol añadido a tu lista.***").setColor(Auxiliar.Colors.cyan))
                await i.member.roles.remove(role)
            }
            else {
                msgs.push(new EmbedBuilder().setDescription("<:cyaddons_minus:1057546000622964746> | ***Rol removido de tu lista.***").setColor(Auxiliar.Colors.red))
                await i.member.roles.add(role)
            };
        }
        return i.reply({ embeds: [msgs.join("\n")], ephemeral: true })
    }
}
