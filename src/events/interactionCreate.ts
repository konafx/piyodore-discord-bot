import { BotEvent } from '../types';
import { Events, Interaction } from 'discord.js';

const event: BotEvent = {
  name: Events.InteractionCreate,
  execute: (i: Interaction) => {
    if (i.isChatInputCommand()) {
      const command = i.client.commands.get(i.commandName);
      if (!command) {
        console.error('undefined command?')
        return
      }
      command.execute(i);
    }
    if (i.isButton()) {
      const command = i.client.commands.get()
    }
    return;
  },
};

export { event as interactionCreateEvent };
