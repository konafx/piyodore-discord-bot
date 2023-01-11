import { Client, REST, Routes } from 'discord.js';
import Config from '~/config';
import { BotCommand } from '~/types';

export default async function handler(client: Client) {
  const rest = new REST({ version: '10' }).setToken(Config.token);
  const routeApplicationGuildCommand = (commandId: string) =>
    Routes.applicationGuildCommand(Config.clientId, Config.guildId, commandId);
  await Promise.all(
    client.commands.map(async (command: BotCommand) => {
      if (!command.id) {
        return Promise.resolve({ content: 'no data' });
      }
      return rest
        .delete(routeApplicationGuildCommand(command.id))
        .then((data) => {
          console.log(`💤 Succesfully deleted ${command.command.name} slash command`);
          Promise.resolve(data);
        })
        .catch((err) => {
          console.error(err);
          Promise.reject(err);
        });
    })
  );
}
