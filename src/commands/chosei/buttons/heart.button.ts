import { ButtonBuilder, ButtonInteraction } from 'discord.js';
import emoji from 'node-emoji';
import { routeStringify, routeCustomId, routeCommandName } from '~/lib/route';

const customId = 'heartButton';

export const ChoseiHeartButton = {
  customId,
  customButton: (commandName: string) =>
    new ButtonBuilder()
      .setCustomId(routeStringify(routeCommandName(commandName), routeCustomId(customId)))
      .setEmoji(emoji.get('heartpulse')),
  handler: async (i: ButtonInteraction) => {
    i.reply({
      content: '[TODO] reply all ok',
    });
  },
};
