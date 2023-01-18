import { ButtonBuilder, ButtonInteraction } from 'discord.js';
import { botButtonStringify, botButtonCustomId, botButtonCommandName } from '~/lib/botButton';

const customId = 'edit';

export const ChoseiEditButton = {
  customId,
  customButton: (commandName: string) =>
    new ButtonBuilder()
      .setCustomId(botButtonStringify(botButtonCommandName(commandName), botButtonCustomId(customId)))
      .setLabel('Edit'),
  handler: async (i: ButtonInteraction) => {
    i.reply({
      content: '[TODO] form',
    });
  },
};
