const { EventBuilder, Erine } = require("erine");

module.exports["data"] = {
    data: new EventBuilder({
        name: "ready",
        once: true
    }),
    /**
     * @param {Erine} client 
     */
    async code(client) {
        console.log(`${client.user.displayName} is online!`)
        await client.sync().then(() => console.log("Commands uploaded"))
    }
}