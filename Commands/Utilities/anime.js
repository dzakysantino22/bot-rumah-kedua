const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const config = require ('../../Structures/config.json');
const anime = require("anime-actions");
const axios = require("axios");
module.exports = { 
    name: 'anime', 
    description: 'Get some gifs, picture, and sentence from an anime character',
    options: [
        {
            name: "baka",
            description: "Send a baka gif",
            type: "SUB_COMMAND"
        },
        {
            name: "dance",
            description: "Send a dance gif",
            type: "SUB_COMMAND"
        },
        {
            name: "bite",
            description: "Send a bite gif",
            type: "SUB_COMMAND"
        },
        {
            name: "blush",
            description: "Send a blush gif",
            type: "SUB_COMMAND"
        },
        {
            name: "bonk",
            description: "Send a bonk gif",
            type: "SUB_COMMAND"
        },
        {
            name: "cuddle",
            description: "Send a cuddle gif",
            type: "SUB_COMMAND"
        },
        {
            name: "hug",
            description: "Send a hug gif",
            type: "SUB_COMMAND"
        },
        {
            name: "quote",
            description: "Send a quote from an anime character",
            type: "SUB_COMMAND"
        },
        {
            name: "sad",
            description: "Send a sad gif",
            type: "SUB_COMMAND"
        },
        {
            name: "slap",
            description: "Send a slap gif",
            type: "SUB_COMMAND"
        },
        {
            name: "waifu",
            description: "Send a waifu gif",
            type: "SUB_COMMAND"
        },
        {
            name: "wallpaper",
            description: "Send an anime wallpaper",
            type: "SUB_COMMAND"
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const subc = interaction.options.getSubcommand();
        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setFooter({text: `Executed by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        .setTimestamp()

        try {
            switch(subc) {
                case "baka" : {
                    embed.setAuthor({name: "Baka! >,<", iconURL: client.user.avatarURL({ format: "png" })})
                    .setImage(await anime.baka())
                    return interaction.reply({ embeds: [embed] })
                }
                case "bite" : {
                    embed.setAuthor({name: "Yummy~ 🦷", iconURL: client.user.avatarURL({ format: "png" })})
                    .setImage(await anime.bite())
                    return interaction.reply({ embeds: [embed] })
                }
                case "blush" : {
                    embed.setAuthor({name: "Shy~ (/▽＼)", iconURL: client.user.avatarURL({ format: "png" })})
                    .setImage(await anime.blush())
                    return interaction.reply({ embeds: [embed] })
                }
                case "bonk" : {
                    embed.setAuthor({name: "Bonk! 🪓😡", iconURL: client.user.avatarURL({ format: "png" })})
                    .setImage(await anime.bonk())
                    return interaction.reply({ embeds: [embed] })
                }
                case "cuddle" : {
                    embed.setAuthor({name: "Ahh yes~ §(*￣▽￣*)§", iconURL: client.user.avatarURL({ format: "png" })})
                    .setImage(await anime.cuddle())
                    return interaction.reply({ embeds: [embed] })
                }
                case "dance" : {
                    embed.setAuthor({name: "Letsgoo~ 💃🕺", iconURL: client.user.avatarURL({ format: "png" })})
                    .setImage(await anime.dance())
                    return interaction.reply({ embeds: [embed] })
                }
                case "hug" : {
                    embed.setAuthor({name: "So comfy~ (∪.∪ )...zzz", iconURL: client.user.avatarURL({ format: "png" })})
                    .setImage(await anime.hug())
                    return interaction.reply({ embeds: [embed] })
                }
                case "quote" : {
                    const r1 = await axios.get(`https://some-random-api.ml/animu/quote`);

                    embed.setAuthor({name: "Anime quotes <3!", iconURL: client.user.avatarURL({ format: "png" })})
                    .addFields(
                        {
                            name: "Character",
                            value: `${r1.data.character}`,
                            inline: true
                        },
                        {
                            name: "Anime",
                            value: `${r1.data.anime}`,
                            inline: true
                        }, 
                        {
                            name: "Sentence",
                            value: `${r1.data.sentence}`
                        }
                    )
                    return interaction.reply({ embeds: [embed] })
                }
                case "sad" : {
                    embed.setAuthor({name: "Crying~ 😢", iconURL: client.user.avatarURL({ format: "png" })})
                    .setImage(await anime.cry())
                    return interaction.reply({ embeds: [embed] })
                }
                case "slap" : {
                    embed.setAuthor({name:"You naughty!! 😡🤚", iconURL: client.user.avatarURL({ format: "png" })})
                    .setImage(await anime.slap())
                    return interaction.reply({ embeds: [embed] })
                }
                case "waifu" : {
                    embed.setAuthor({name: "Here's your waifu 💘", iconURL: client.user.avatarURL({ format: "png" })})
                    .setImage(await anime.smile())
                    return interaction.reply({ embeds: [embed] })
                }
                case "wallpaper" : {
                    embed.setAuthor({name: "Here's your wallpaper 🖼", iconURL: client.user.avatarURL({ format: "png" })})
                    .setImage(await anime.wallpaper())
                    return interaction.reply({ embeds: [embed] })
                }
            }
        } catch (e) {
            embed.setTitle("⚠ An error occurred ⚠")
            .setColor("YELLOW")
            .setDescription(`${e}`)
            .setFooter({text: "🔍"})
            .setTimestamp();
        interaction.reply({embeds: [embed], ephemeral: true});
        }
    }
}