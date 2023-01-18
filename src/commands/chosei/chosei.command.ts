import {
  ActionRowBuilder,
  Interaction,
  ModalBuilder,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { eq, when } from '~/lib/when';
import { BotCommand } from '~/types';
import { ChoseiHostPage } from './pages/host.page';

export const ChoseiCommand: BotCommand = {
  command: new SlashCommandBuilder()
    .setName('chosei')
    .setNameLocalization('ja', '調整')
    .setDescription('Adjustment schedule')
    .addSubcommand((cmd: SlashCommandSubcommandBuilder) =>
      cmd.setName('host').setDescription('create event to adjust schedule')
    )
    .addSubcommand((cmd: SlashCommandSubcommandBuilder) =>
      cmd
        .setName('modal')
        .setDescription('create event to adjust schedule')
        .addStringOption((options) =>
          options.setName('name').setDescription('set event name').setMaxLength(20).setRequired(false)
        )
        .addStringOption((options) =>
          options.setName('detail').setDescription('set event detail').setMaxLength(100).setRequired(false)
        )
    ),
  execute: async (interaction: Interaction) => {
    console.log(interaction);
    if (interaction.isChatInputCommand()) {
      const result = when(interaction.options.getSubcommand())
        .on(eq('host'), async () => {
          await interaction.reply(ChoseiHostPage('test', 'sample'));
          return 'host';
        })
        .on(eq('modal'), async () => {
          const name = interaction.options.getString('name');
          const detail = interaction.options.getString('detail');

          if (name && detail) {
            await interaction.reply(ChoseiHostPage(name, detail));
          }

          const modal = new ModalBuilder().setCustomId('hostForm').setTitle('Host new event');

          const eventNameInput = new TextInputBuilder()
            .setCustomId('eventNameInput')
            .setLabel('What name of event')
            .setRequired()
            .setStyle(TextInputStyle.Short);

          if (name) {
            eventNameInput.setValue(name);
          }

          const eventDetailInput = new TextInputBuilder()
            .setCustomId('eventDetailInput')
            .setLabel('detail')
            .setMaxLength(100)
            .setRequired(false)
            .setStyle(TextInputStyle.Paragraph);

          if (detail) {
            eventDetailInput.setValue(detail);
          }

          modal.addComponents(
            new ActionRowBuilder<TextInputBuilder>().addComponents(eventNameInput),
            new ActionRowBuilder<TextInputBuilder>().addComponents(eventDetailInput)
          );

          await interaction.showModal(modal);
          return 'modal';
        })
        .otherwise(async () => {
          const message = `[chosei] otherwise: ${interaction.options.getSubcommand()}`;
          await interaction.reply({
            content: message,
            ephemeral: true,
          });
          return message;
        });
      console.log(`result :${result}`);
      return;
    }
    if (interaction.isButton()) {
      console.log(interaction.customId);
      await interaction.reply({
        content: `button: ${interaction.customId}`,
        ephemeral: true,
      });
      return;
    }
    if (interaction.isModalSubmit()) {
      const name = interaction.fields.getTextInputValue('eventNameInput');
      const detail = interaction.fields.getTextInputValue('eventDetailInput');
      await interaction.reply(ChoseiHostPage(name, detail));
      return 'modal submit';
    }
  },
};
