import { Events, Interaction } from 'discord.js';
import { ChoseiHostForm } from '~/commands/chosei/forms/host.form';
import { BotEvent } from '~/types';

const event: BotEvent = {
  name: Events.InteractionCreate,
  execute: async (i: Interaction) => {
    if (i.isChatInputCommand()) {
      const command = i.client.commands.get(i.commandName);
      if (!command) {
        console.error('undefined command?');
        return;
      }
      command.execute(i);
    }
    if (i.isButton()) {
      await i.reply({ content: 'test', ephemeral: true });
    }
    if (i.isModalSubmit()) {
      await ChoseiHostForm.handler(i);
    }
    return;
  },
};

export { event as interactionCreateEvent };
