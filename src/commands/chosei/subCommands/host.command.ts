import { ChatInputCommandInteraction, SlashCommandSubcommandBuilder } from 'discord.js';
import { connectTentativeEventToMessageIdsService } from '~/services/connectTentativeEventToMessageIds';
import { createTentativeEventService } from '~/services/createTentativeEvent';
import { ChoseiHostForm } from '../forms/host.form';
import { ChoseiHostPage } from '../pages/host.page';

export const HostSubCommand = {
  command: (cmd: SlashCommandSubcommandBuilder) =>
    cmd
      .setName('host')
      .setDescription('create event to adjust schedule')
      .addStringOption((options) =>
        options.setName('name').setDescription('set event name').setMaxLength(20).setRequired(false)
      )
      .addStringOption((options) =>
        options.setName('detail').setDescription('set event detail').setMaxLength(100).setRequired(false)
      ),
  name: 'host',
  handler: async (i: ChatInputCommandInteraction) => {
    const name = i.options.getString('name');
    const detail = i.options.getString('detail');

    if (name && detail) {
      const tentativeEvent = await createTentativeEventService({
        discordHostUserId: i.user.id,
        tentativeEventName: name,
      });

      const m = await i.reply(ChoseiHostPage(name, detail));
      if (!m) {
        i.followUp({
          content: 'something happen, failed update tentative event',
          ephemeral: true,
        });
        return;
      }

      await connectTentativeEventToMessageIdsService({
        tentativeEvent,
        guildChannelMessageId: {
          guildId: m.interaction.guildId as string,
          channnelId: m.interaction.channelId as string,
          messageId: m.id,
          postedAt: m.interaction.createdAt,
        },
      });

      i.followUp({
        content: 'success create tentative-event',
        ephemeral: true,
      });
      return;
    }
    const modal = ChoseiHostForm.cloneModal({ name, detail });

    const result = await i.showModal(modal);
    console.log({ result });
  },
};
