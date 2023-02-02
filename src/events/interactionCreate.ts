import { Events, Interaction } from 'discord.js';
import { ChoseiHostForm } from '~/commands/chosei/forms/host.form';
import { routeParse } from '~/lib/route';
import { BotCommand, BotEvent } from '~/types';

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
      const route = routeParse(i.customId);
      const command: BotCommand = i.client.commands.get(route.commandName);
      const button = command.buttons?.find((btn) => btn.route?.customId == route.customId);
      if (!button || !button.handler) {
        console.error('nyaa');
        return;
      }
      await button.handler(i);
    }
    if (i.isModalSubmit()) {
      await ChoseiHostForm.handler(i);
    }
    return;
  },
};

export { event as interactionCreateEvent };
