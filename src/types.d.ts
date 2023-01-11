import { AutocompleteInteraction, CommandInteraction } from 'discord.js';

// https://stackoverflow.com/questions/51813272/declaring-string-type-with-min-max-length-in-typescript
type StringOfLength<Min, Max> = string & {
  StringOfLength: unique symbol; // this is the phantom type
};

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

type BotButtonCommandName = StringOfLength<1, 32>;
type BotButtonCustomId = StringOfLength<1, 36>;

interface BotButton {
  commandName: BotButtonCommandName;
  customId: BotButtonCustomId;
}

declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, BotCommand>;
    cooldowns: Collection<string, number>;
  }
}
