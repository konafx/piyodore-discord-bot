import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Interaction,
  ModalBuilder,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { BotCommand } from '~/types';
import { when, eq } from '~/lib/when';
import { DensukeUsecase as Usecase } from './densuke.usecase';

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
    .addSubcommand((cmd: SlashCommandSubcommandBuilder) => cmd.setName('list').setDescription('show list')),
  execute: async (interaction: Interaction) => {
    if (interaction.isChatInputCommand()) {
      const result = when(interaction.options.getSubcommand())
        .on(eq('create'), async () => {
          const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder().setCustomId('party').setEmoji('🥳').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('parties').setEmoji('🥳').setLabel('SUPER').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('test').setEmoji('✨').setStyle(ButtonStyle.Secondary)
          );
          await interaction.reply({
            content: 'create',
            components: [row],
          });
          return 'create';
        })
        .otherwise(() => {
          interaction.reply({
            content: 'otherwise',
            ephemeral: true,
          });
          return 'otherwise';
        });
      console.log(result);
    }
    if (interaction.isStringSelectMenu()) {
      if (interaction.customId === 'partiesSelect') {
        await interaction.reply('選びすぎ');
        return;
      }
      when(interaction.values[0])
        .on(eq('building'), async () => {
          await interaction.reply({
            content: '東京タワー',
            ephemeral: true,
            tts: true,
          });
        })
        .on(eq('forest'), async () => {
          await interaction.reply({
            content: '森もり',
            ephemeral: true,
            tts: true,
          });
        })
        .on(eq('sea'), async () => {
          await interaction.reply({
            content: '海！正解',
            ephemeral: true,
            tts: false,
          });
        })
        .otherwise(async () => {
          await interaction.reply({
            content: 'は？ otherwise',
            ephemeral: true,
          });
        });
      return;
    }
    if (interaction.isButton()) {
      when(interaction.customId)
        .on(eq('party'), async () => {
          const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            new StringSelectMenuBuilder()
              .setCustomId('partySelect')
              .setPlaceholder('Select party time')
              .addOptions(
                new StringSelectMenuOptionBuilder().setLabel('building').setValue('building').setDefault(),
                new StringSelectMenuOptionBuilder().setLabel('forest').setValue('forest'),
                new StringSelectMenuOptionBuilder().setLabel('sea').setValue('sea')
              )
          );
          await interaction.reply({
            content: 'party time',
            components: [row],
          });
        })
        .on(eq('parties'), async () => {
          const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            new StringSelectMenuBuilder()
              .setCustomId('partiesSelect')
              .setPlaceholder('Select party time')
              .setMinValues(3)
              .setMaxValues(5)
              .addOptions(
                new StringSelectMenuOptionBuilder().setLabel('building').setValue('building').setDefault(),
                new StringSelectMenuOptionBuilder().setLabel('forest').setValue('forest'),
                new StringSelectMenuOptionBuilder().setLabel('sea').setValue('sea'),
                new StringSelectMenuOptionBuilder().setLabel('river').setValue('river'),
                new StringSelectMenuOptionBuilder().setLabel('jungle').setValue('jungle'),
                new StringSelectMenuOptionBuilder().setLabel('drug').setValue('drug')
              )
          );
          await interaction.reply({
            content: 'party never end!',
            components: [row],
          });
        })
        .on(eq('test'), async () => {
          const modal = new ModalBuilder()
            .setCustomId('modal')
            .setTitle('Modal')
            .setComponents(
              new ActionRowBuilder<TextInputBuilder>().setComponents(
                new TextInputBuilder()
                  .setCustomId('modalInputName')
                  .setLabel('Name')
                  .setRequired()
                  .setStyle(TextInputStyle.Short)
              ),
              new ActionRowBuilder<TextInputBuilder>().setComponents(
                new TextInputBuilder()
                  .setCustomId('modalInputDesc')
                  .setLabel('Description')
                  .setMaxLength(100)
                  .setStyle(TextInputStyle.Paragraph)
              )
            );
          await interaction.showModal(modal);
        });
    }
  },
};
