import { Client, REST, Routes } from 'discord.js';
import { RESTPutAPIApplicationGuildCommandsResult } from 'discord-api-types/v10';
import Config from '~/config';
import { BotCommand } from '~/types';

import { ChoseiCommand } from '~/commands';

const commands: Array<BotCommand> = [ChoseiCommand];

const registerCommand = async (client: Client) => {
  console.log('registerCommand');
  const rest = new REST({ version: '10' }).setToken(Config.token);

  /**
  for (const command of commands) {
    const result: unknown = await rest.post(
      Routes.applicationGuildCommands(Config.clientId, Config.guildId),
      {
        body: command.command.toJSON()
      }
    ).catch(err => {
      console.error(err)
      return
    })
    const data = result as any as RESTPostAPIApplicationGuildCommandsResult
    console.log(`🔥 Successfully loaded ${data.name} slash command`)
  }
  **/

  const result: unknown = await rest
    .put(Routes.applicationGuildCommands(Config.clientId, Config.guildId), {
      body: commands.map((command) => command.command.toJSON()),
    })
    .catch((err) => {
      console.error(err);
      return;
    });

  const data = result as any as RESTPutAPIApplicationGuildCommandsResult;
  for (const command of commands) {
    command.id = data.find((d) => d.name === command.command.name)?.id;
    client.commands.set(command.command.name, command);
    client.cooldowns.set(command.command.name, command.cooldown);
  }
  console.log(`🔥 Successfully loaded ${data.length} slash command(s)`);
};

export default async function handler(client: Client) {
  await registerCommand(client);
}
