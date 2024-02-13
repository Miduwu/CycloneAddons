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
        let [added, removed] = [[], []]
        for(const roleId of i.values) {
            let role = i.guild.roles.cache.get(roleId) || await i.guild.roles.fetch(roleId).catch(() => null);
            if(i.member.roles.cache.has(roleId)) {
                removed.push(role.mention)
                await i.member.roles.remove(role)
            }
            else {
                added.push(role.mention)
                await i.member.roles.add(role)
            };
        }
        const AddedEmbed = new EmbedBuilder()
        .setDescription(added.length ? `<:cyaddons_plus:1057545930443870208> | ***Rol añadido a tu lista.***`)
        .setColor(Auxiliar.Colors.cyan)
        const RemovedEmbed = new EmbedBuilder()
        .setDescription(removed.length ? `<:cyaddons_minus:1057546000622964746> | ***Rol removido de tu lista.***`)
        .setColor(Auxiliar.Colors.red)
        return i.reply({ embeds: [AddedEmbed, RemovedEmbed], ephemeral: true })
    }
}
