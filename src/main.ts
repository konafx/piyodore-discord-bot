import { Events, Client, GatewayIntentBits, Collection } from 'discord.js';
import Config from './config';
import { BotCommand } from './types';
import { CommandHandler, EventHandler } from './handlers';

(async () => {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  client.login(Config.token);

  client.commands = new Collection<string, BotCommand>();
  client.cooldowns = new Collection<string, number>();

  CommandHandler(client);
  EventHandler(client);

  client.once(Events.ClientReady, async (c) => {
    console.log(`Ready! Logged in as ${c.user?.tag}`);
  });
})();
