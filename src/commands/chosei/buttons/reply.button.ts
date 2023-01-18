import { ButtonBuilder, ButtonInteraction } from 'discord.js';
import { botButtonStringify, botButtonCustomId, botButtonCommandName } from '~/lib/botButton';

const customId = 'reply';

export const ChoseiReplyButton = {
  customId,
  customButton: (commandName: string) =>
    new ButtonBuilder()
      .setCustomId(botButtonStringify(botButtonCommandName(commandName), botButtonCustomId(customId)))
      .setLabel('Reply'),
  handler: async (i: ButtonInteraction) => {
    i.reply({
      content: '[TODO] form',
    });
  },
};
