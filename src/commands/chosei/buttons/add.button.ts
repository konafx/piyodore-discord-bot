import { ButtonBuilder, ButtonInteraction } from 'discord.js';
import { botButtonStringify, botButtonCustomId, botButtonCommandName } from '~/lib/botButton';

const customId = 'add';

export const ChoseiAddButton = {
  customId,
  customButton: (commandName: string) =>
    new ButtonBuilder()
      .setCustomId(botButtonStringify(botButtonCommandName(commandName), botButtonCustomId(customId)))
      .setLabel('Add'),
  handler: async (i: ButtonInteraction) => {
    i.reply({
      content: '[TODO] form',
    });
  },
};
