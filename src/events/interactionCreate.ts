import { Events, Interaction } from 'discord.js';
import { Button } from '~/lib/button';
import { Form } from '~/lib/form';
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
      const button = command.reactables?.find((btn) => btn.route?.customId == route.customId);
      if (!button || !button.handler) {
        console.error('nyaa');
        return;
      }
      if (!(button instanceof Button)) {
        console.error('nande button igai ga arundesuka');
        return;
      }
      await button.handler(i);
    }
    if (i.isModalSubmit()) {
      const route = routeParse(i.customId);
      const command: BotCommand = i.client.commands.get(route.commandName);
      const form = command.reactables?.find((form) => form.route?.customId == route.customId);
      if (!form || !form.handler) {
        console.error('is modal submit mya');
        return;
      }
      if (!(form instanceof Form)) {
        console.error('nande form igai ga arundesuka');
        return;
      }
      await form.handler(i);
    }
    return;
  },
};

export { event as interactionCreateEvent };
