import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Interaction,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from 'discord.js';
import { eq, when } from '~/lib/when';
import { BotCommand } from '~/types';
import emoji from 'node-emoji';

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
          const adminMenu = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder().setCustomId('edit').setLabel('Edit').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('add').setLabel('Add').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('confirm').setLabel('Confirm').setStyle(ButtonStyle.Success)
          );
          const replyMenu = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder().setCustomId('reply').setLabel('Reply').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('heart').setEmoji(emoji.get('heartpulse')).setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('sorry').setEmoji(emoji.get('man-bowing')).setStyle(ButtonStyle.Secondary)
          );
          await interaction.reply({
            content: 'hello',
            components: [adminMenu, replyMenu],
          });
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
  },
};
