import { ButtonBuilder, ButtonInteraction } from 'discord.js';
import emoji from 'node-emoji';
import { botButtonStringify, botButtonCustomId, botButtonCommandName } from '~/lib/botButton';

const customId = 'sorry';

export const ChoseiSorryButton = {
  customId,
  customButton: (commandName: string) =>
    new ButtonBuilder()
      .setCustomId(botButtonStringify(botButtonCommandName(commandName), botButtonCustomId(customId)))
      .setEmoji(emoji.get('man-bowing')),
  handler: async (i: ButtonInteraction) => {
    i.reply({
      content: '[TODO] reply all x',
    });
  },
};
