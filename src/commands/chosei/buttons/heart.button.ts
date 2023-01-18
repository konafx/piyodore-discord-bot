import { ButtonBuilder, ButtonInteraction } from 'discord.js';
import emoji from 'node-emoji';
import { botButtonStringify, botButtonCustomId, botButtonCommandName } from '~/lib/botButton';

const customId = 'heart';

export const ChoseiHeartButton = {
  customId,
  customButton: (commandName: string) =>
    new ButtonBuilder()
      .setCustomId(botButtonStringify(botButtonCommandName(commandName), botButtonCustomId(customId)))
      .setEmoji(emoji.get('heartpulse')),
  handler: async (i: ButtonInteraction) => {
    i.reply({
      content: '[TODO] reply all ok',
    });
  },
};
