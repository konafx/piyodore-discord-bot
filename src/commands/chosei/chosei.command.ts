import { Interaction, SlashCommandBuilder, SlashCommandSubcommandBuilder } from 'discord.js';
import { eq, when } from '~/lib/when';
import { BotCommand } from '~/types';
import { ChoseiHostPage } from './pages/host.page';

export const ChoseiCommand: BotCommand = {
  command: new SlashCommandBuilder()
    .setName('chosei')
    .setNameLocalization('ja', '調整')
    .setDescription('Adjustment schedule')
    .addSubcommand((cmd: SlashCommandSubcommandBuilder) =>
      cmd.setName('host').setDescription('create event to adjust schedule')
    ),
  execute: async (interaction: Interaction) => {
    console.log(interaction);
    if (interaction.isChatInputCommand()) {
      const result = when(interaction.options.getSubcommand())
        .on(eq('host'), async () => {
          await interaction.reply(ChoseiHostPage('test', 'sample'));
          return 'host';
        })
        .otherwise(async () => {
          const message = `[chosei] otherwise: ${interaction.options.getSubcommand()}`;
          await interaction.reply({
            content: message,
            ephemeral: true,
          });
          return message;
        });
      console.log(`result :${result}`);
      return;
    }
    if (interaction.isButton()) {
      console.log(interaction.customId);
      await interaction.reply({
        content: `button: ${interaction.customId}`,
        ephemeral: true,
      });
      return;
    }
    if (interaction.isModalSubmit()) {
      const name = interaction.fields.getTextInputValue('eventNameInput');
      const detail = interaction.fields.getTextInputValue('eventDetailInput');
      await interaction.reply(ChoseiHostPage(name, detail));
      return 'modal submit';
    }
  },
};