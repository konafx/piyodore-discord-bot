import { ButtonInteraction } from 'discord.js';
import { ButtonHandler, PrepareCreateButton } from '~/lib/button';

const handler: ButtonHandler = async (i: ButtonInteraction) => {
  i.reply({
    content: '[TODO] form',
  });
};

export const CreateReplyButton = PrepareCreateButton('replyButton', handler, { label: 'reply' });
