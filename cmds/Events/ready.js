const { EventBuilder, Erine } = require("erine");
const colors = require("colors/safe")
module.exports["data"] = {
    data: new EventBuilder({
        name: "ready",
        once: true
    }),
    /**
     * @param {Erine} client 
     */
    async code(client) {
        console.log(colors.cyan("Starting On"), colors.blue("ErineClient"), "||", colors.red(`${client.user.displayName}`))
        await client.sync().then(() => console.log("[/] Commands Uploaded"))
    }
}
