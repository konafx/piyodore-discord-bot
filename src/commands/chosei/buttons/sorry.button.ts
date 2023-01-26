import { ButtonBuilder, ButtonInteraction } from 'discord.js';
import emoji from 'node-emoji';
import { routeStringify, routeCustomId, routeCommandName } from '~/lib/route';

const customId = 'sorryButton';

export const ChoseiSorryButton = {
  customId,
  customButton: (commandName: string) =>
    new ButtonBuilder()
      .setCustomId(routeStringify(routeCommandName(commandName), routeCustomId(customId)))
      .setEmoji(emoji.get('man-bowing')),
  handler: async (i: ButtonInteraction) => {
    i.reply({
      content: '[TODO] reply all x',
    });
  },
};
