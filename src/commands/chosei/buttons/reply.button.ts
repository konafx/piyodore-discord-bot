import { ButtonBuilder, ButtonInteraction } from 'discord.js';
import { routeStringify, routeCustomId, routeCommandName } from '~/lib/route';

const customId = 'replyButton';

export const ChoseiReplyButton = {
  customId,
  customButton: (commandName: string) =>
    new ButtonBuilder()
      .setCustomId(routeStringify(routeCommandName(commandName), routeCustomId(customId)))
      .setLabel('Reply'),
  handler: async (i: ButtonInteraction) => {
    i.reply({
      content: '[TODO] form',
    });
  },
};
