import emoji from 'node-emoji';
import { ButtonInteraction } from 'discord.js';
import { ButtonHandler, PrepareCreateButton } from '~/lib/button';

const handler: ButtonHandler = async (i: ButtonInteraction) => {
  i.reply({
    content: '[TODO] form',
  });
};

export const CreateSorryButton = PrepareCreateButton('sorryButton', handler, { emoji: emoji.get('man-bowing') });
