import emoji from 'node-emoji';
import { ButtonInteraction } from 'discord.js';
import { ButtonHandler, PrepareCreateButton } from '~/lib/button';

const handler: ButtonHandler = async (i: ButtonInteraction) => {
  i.reply({
    content: '[TODO] form',
  });
};

export const CreateHeartButton = PrepareCreateButton('heartButton', handler, { emoji: emoji.get('heartpulse') });
