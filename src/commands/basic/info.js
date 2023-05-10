const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 10,
	data: new SlashCommandBuilder()
	.setName('info')
	.setDescription('get info about you or another duck')
	.addUserOption(option =>
		option
		.setName('user')
		.setDescription('who do you want spy on?')
    ),
	async execute(interaction) {
    const target = interaction.options.getUser('user') || null;

    const replyEmbed = new EmbedBuilder()
  	 .setTimestamp();

    await interaction.deferReply({ephemeral: true});

    if (target != null) {
          replyEmbed
            .setColor('Green')
            .setDescription('')
            .setTitle('your Info');
          interaction.editReply({ content: "", embeds: [replyEmbed] });
    } else {
      let counter = 0;
      let interval = setInterval(() => {
        interaction.editReply('Gathering Info: '+ progressBar(counter, 100, 30) ); // todo: make this look better lol
        if (counter >= Math.round(Math.random() * (86 - 30) + 30)) {
          clearInterval(interval);
          replyEmbed
            .setColor('Green')
            .setDescription('')
            .setTitle(target.tag +'\'s Info');
          interaction.editReply({ content: "", embeds: [replyEmbed] });
        } else {
          counter += 5;
        }
      }, 250)
    }
  },
};
