import { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js';

const customId = 'hostForm';

type Props = {
  form: {
    title?: string;
  };
  input: {
    name?: string;
    detail?: string;
  };
};

export const ChoseiHostForm = (props: Props) => {
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
};
