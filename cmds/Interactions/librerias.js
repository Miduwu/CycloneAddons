const { InteractionBuilder, Interactions, StringSelectMenuInteraction} = require("erine");

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
                msgs.push(`Se te removió el rol ${role}`)
                await i.member.roles.remove(role)
            }
            else {
                msgs.push(`Se te concedió el rol ${role}`)
                await i.member.roles.add(role)
            };
        }
        return i.reply({ content: msgs.join("\n"), ephemeral: true })
    }
}