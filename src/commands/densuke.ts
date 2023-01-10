import { ActionRowBuilder, ButtonBuilder, Interaction, SlashCommandBuilder, SlashCommandSubcommandBuilder } from 'discord.js';
import { BotCommand } from '../types';
// import { prisma } from '../lib/db';
import { when, eq } from "../lib/switch";
import { DensukeUsecase as Usecase } from "./densuke.usecase";

export const DensukeCommand: BotCommand = {
  command: new SlashCommandBuilder()
    .setName('densuke')
    .setDescription('poll schedule plan')
    .addSubcommand((cmd: SlashCommandSubcommandBuilder) =>
      cmd
        .setName('create')
        .setNameLocalization('ja', '作成')
        .setDescription('event create')
        .setDescriptionLocalization('ja', 'イベントの予定を作成します')
    )
    .addSubcommand((cmd: SlashCommandSubcommandBuilder) =>
      cmd
        .setName('list')
        .setDescription('show list')
    ),
  execute: async (interaction: Interaction) => {
    if (interaction.isChatInputCommand()) {
      const result = when(interaction.options.getSubcommand())
        .on(eq('create'), () => {
          const row = ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
                .setCustomId('test')
                .setEmoji(":party:")
                .setName('testname')
            )
          interaction.reply({
            content: 'create',
            components: [row]
          })
          return 'create'
        })
        .otherwise(() => {
          interaction.reply({
            content: 'otherwise',
            ephemeral: true
          })
          return 'otherwise'
        })
      console.log(result)
    }
  },
};
