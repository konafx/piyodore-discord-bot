import { BotEvent } from '../types';
import { Events, Interaction } from 'discord.js';

const event: BotEvent = {
  name: Events.InteractionCreate,
  execute: (i: Interaction) => {
    if (i.isCommand()) {
      const command = i.client.commands.get(i.commandName);
      command.execute(i);
    }
    console.log(i);
    return;
  },
};

export { event as interactionCreateEvent };