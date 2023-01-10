import { AutocompleteInteraction, CommandInteraction } from 'discord.js';
import { RawApplicationCommandData } from 'discord.js/typings/rawDataTypes';

interface BotCommand {
  command: SlashCommandBuilder;
  execute: (interation: Interaction) => void;
  autocomplete?: (interation: AutocompleteInteraction) => void;
  cooldown?: number;
  data?: RawApplicationCommandData
}

interface BotEvent {
  name: string;
  once?: boolean | false;
  execute: (...args) => void;
}

declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, BotCommand>;
    cooldowns: Collection<string, number>;
  }
}
