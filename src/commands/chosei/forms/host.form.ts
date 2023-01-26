import { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ModalSubmitInteraction } from 'discord.js';
import { connectTentativeEventToMessageIdsService } from '~/services/connectTentativeEventToMessageIds';
import { createTentativeEventService } from '~/services/createTentativeEvent';
import { ChoseiHostPage } from '../pages/host.page';

const customId = 'hostForm';

type ModalProps = {
  form: {
    title?: string;
  };
  input: {
    name?: string;
    detail?: string;
  };
};

export const getInputsChoseiHostForm = (i: ModalSubmitInteraction) => ({
  name: i.fields.getTextInputValue('eventNameInput'),
  detail: i.fields.getTextInputValue('eventDetailInput'),
});

export const ChoseiHostForm = {
  modal: (props: ModalProps) => {
    const modal = new ModalBuilder().setCustomId(customId).setTitle(props.form.title ?? 'Host new event');

    const eventNameInput = new TextInputBuilder()
      .setCustomId('eventNameInput')
      .setLabel('What name of event')
      .setRequired()
      .setStyle(TextInputStyle.Short);

    if (props.input.name) {
      eventNameInput.setValue(props.input.name);
    }

    const eventDetailInput = new TextInputBuilder()
      .setCustomId('eventDetailInput')
      .setLabel('detail')
      .setMaxLength(100)
      .setRequired(false)
      .setStyle(TextInputStyle.Paragraph);

    if (props.input.detail) {
      eventDetailInput.setValue(props.input.detail);
    }

    modal.addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(eventNameInput),
      new ActionRowBuilder<TextInputBuilder>().addComponents(eventDetailInput)
    );

    return modal;
  },
  handler: async (i: ModalSubmitInteraction) => {
    const inputs = getInputsChoseiHostForm(i);

    const tentativeEvent = await createTentativeEventService({
      discordHostUserId: i.user.id,
      tentativeEventName: inputs.name,
    });

    const m = await i.reply(ChoseiHostPage(inputs.name, inputs.detail));
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
  },
};
