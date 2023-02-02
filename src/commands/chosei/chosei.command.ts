import { Interaction, SlashCommandBuilder } from 'discord.js';
import { BotCommand } from '~/types';
import { HostPageButtons } from './pages/host.page';
import { HostSubCommand } from './subCommands/host.command';

const subCommands = [HostSubCommand];
const command = new SlashCommandBuilder()
  .setName('chosei')
  .setNameLocalization('ja', '調整')
  .setDescription('Adjustment schedule');

for (const subCommand of subCommands) {
  command.addSubcommand(subCommand.command);
}

export const ChoseiCommand: BotCommand = {
  buttons: [...HostPageButtons.host, ...HostPageButtons.reply],
  subCommands,
  command,
  execute: async (i: Interaction) => {
    if (i.isChatInputCommand()) {
      const subCommandName = i.options.getSubcommand();
      const subCommand = subCommands.find((cmd) => cmd.name === subCommandName);
      if (!subCommand) {
        await i.reply({
          content: `cannot find command ${subCommandName}`,
          tts: false,
          ephemeral: true,
        });
        return;
      }
      await subCommand.handler(i);
      return;
    }
    if (i.isButton()) {
      console.log(i.customId);
      await i.reply({
        content: `button: ${i.customId}`,
        ephemeral: true,
      });
      return;
    }
  },
};
