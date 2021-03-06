const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const DB = require("../../Structures/Schemas/SuggestDB");

module.exports = {
    name: "suggest",
    description: "Membuat Saran",
    options: [
        {
            name: "type",
            description: "Pilih Opsi",
            type: "STRING",
            required: true,
            choices: [
                {name: "Command", value: "Command"},
                {name: "Event Listener", value: "Event Listener"},
                {name: "System", value: "System"},
                {name: "Other", value: "Other"}
            ]
        },
        {
            name: "suggestion",
            description: "Deskripsi saranmu",
            type: "STRING",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const {options, guildId, member, user} = interaction;

        const Type = options.getString("type");
        const Suggestion = options.getString("suggestion");

        const Embed = new MessageEmbed()
        .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({dynamic: true})})
        .setColor("NAVY")
        .addFields(
            {name: "Suggestion", value: Suggestion, inline: false},
            {name: "Type", value: Type, inline: true},
            {name: "Status", value: "Pending", inline: true}
        )
        .setTimestamp()

        const Buttons = new MessageActionRow();
        Buttons.addComponents(
            new MessageButton().setCustomId("suggest-accept").setLabel("✅ Accept").setStyle("PRIMARY"),
            new MessageButton().setCustomId("suggest-decline").setLabel("❎ Decline").setStyle("SECONDARY")
        )

        try {
            const M = await interaction.reply({embeds: [Embed], components: [Buttons], fetchReply: true});
            await DB.create({GuildID: guildId, MessageID: M.id, Details: [
                {
                    MemberID: member.id,
                    Type: Type,
                    Suggestion: Suggestion
                }
            ]})
        } catch (err) {
            console.log(err);
        }
    }
}
