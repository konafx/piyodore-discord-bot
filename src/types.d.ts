import { AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandSubcommandBuilder } from 'discord.js';
import { Button } from './lib/button';
import { Form } from './lib/form';

type ReactableWithHandler = Button | Form;

interface BotCommand {
  id?: string;
  command: SlashCommandBuilder;
  reactables?: ReactableWithHandler[];
  execute: (interation: Interaction) => void;
  autocomplete?: (interation: AutocompleteInteraction) => void;
  actions?: BotAction[];
  cooldown?: number;
  subCommands?: BotSubCommand[];
}

interface BotSubCommand {
  name: string;
  command: (cmd: SlashCommandSubcommandBuilder) => SlashCommandSubcommandBuilder;
  handler: (i: ChatInputCommandInteraction) => void;
}

interface BotEvent {
  name: string;
  once?: boolean | false;
  execute: (...args) => void;
}

interface BotAction {
  route: Route;
  handler: (...args) => void;
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
