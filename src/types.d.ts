import { AutocompleteInteraction } from 'discord.js';

interface BotCommand {
  id?: string;
  command: SlashCommandBuilder;
  execute: (interation: Interaction) => void;
  autocomplete?: (interation: AutocompleteInteraction) => void;
  buttons?: BotButton[];
  cooldown?: number;
}

interface BotEvent {
  name: string;
  once?: boolean | false;
  execute: (...args) => void;
}

type RouteCommandName = StringOfLength<1, 32>;
type RouteCustomId = StringOfLength<1, 36>;

interface Route {
  commandName: RouteCommandName;
  customId: RouteCustomId;
}

declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, BotCommand>;
    cooldowns: Collection<string, number>;
  }
}
