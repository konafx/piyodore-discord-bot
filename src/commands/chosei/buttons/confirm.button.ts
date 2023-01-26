import { ButtonBuilder, ButtonInteraction } from 'discord.js';
import { routeStringify, routeCustomId, routeCommandName } from '~/lib/route';

const customId = 'confirmButton';

export const ChoseiConfirmButton = {
  customId,
  customButton: (commandName: string) =>
    new ButtonBuilder()
      .setCustomId(routeStringify(routeCommandName(commandName), routeCustomId(customId)))
      .setLabel('Confirm'),
  handler: async (i: ButtonInteraction) => {
    i.reply({
      content: '[TODO] form',
    });
  },
};
