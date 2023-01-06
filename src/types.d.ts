import { AutocompleteInteraction, CommandInteraction } from "discord.js";

interface BotCommand {
  command: SlashCommandBuilder;
  execute: (interation: CommandInteraction) => void;
  autocomplete?: (interation: AutocompleteInteraction) => void;
  cooldown?: number;
}

interface BotEvent {
  name: string;
  once?: boolean | false;
  execute: (...args?) => void;
}

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, BotCommand>,
    cooldowns: Collection<string, number>
  }
}
