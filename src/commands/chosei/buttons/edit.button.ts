import { ButtonBuilder, ButtonInteraction } from 'discord.js';
import { routeStringify, routeCustomId, routeCommandName } from '~/lib/route';

const customId = 'editButton';

export const ChoseiEditButton = {
  customId,
  customButton: (commandName: string) =>
    new ButtonBuilder()
      .setCustomId(routeStringify(routeCommandName(commandName), routeCustomId(customId)))
      .setLabel('Edit'),
  handler: async (i: ButtonInteraction) => {
    i.reply({
      content: '[TODO] form',
    });
  },
};
