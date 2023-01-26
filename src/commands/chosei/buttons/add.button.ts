import { ButtonBuilder, ButtonInteraction } from 'discord.js';
import { routeStringify, routeCustomId, routeCommandName } from '~/lib/route';

const customId = 'addButton';

export const ChoseiAddButton = {
  customId,
  customButton: (commandName: string) =>
    new ButtonBuilder()
      .setCustomId(routeStringify(routeCommandName(commandName), routeCustomId(customId)))
      .setLabel('Add'),
  handler: async (i: ButtonInteraction) => {
    i.reply({
      content: '[TODO] form',
    });
  },
};
