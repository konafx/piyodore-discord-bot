import { SlashCommandBuilder } from "discord.js";
import { BotCommand } from "../types";

export const UserCommand: BotCommand = {
  command: new SlashCommandBuilder()
    .setName('user')
    .setDescription('get user'),
  execute: (interaction) => {
    interaction.reply('get user')
  }
}
