import { TextInputStyle, ModalSubmitInteraction } from 'discord.js';
import { Form, ModalSubmitHandler } from '~/lib/form';
import { createRoute, routeCommandName, routeCustomId } from '~/lib/route';
import { connectTentativeEventToMessageIdsService } from '~/services/connectTentativeEventToMessageIds';
import { createTentativeEventService } from '~/services/createTentativeEvent';
import { ChoseiHostPage } from '../pages/host.page';

const route = createRoute(routeCommandName('chosei'), routeCustomId('hostForm'));

type Inputs = {
  name?: string;
  detail?: string;
};

const getInputsChoseiHostForm = (i: ModalSubmitInteraction): Required<Inputs> => ({
  name: i.fields.getTextInputValue('eventNameInput'),
  detail: i.fields.getTextInputValue('eventDetailInput'),
});

const handler: ModalSubmitHandler = async (i: ModalSubmitInteraction) => {
  const inputs = getInputsChoseiHostForm(i);

  //validate
  if (inputs.name.length == 0) {
    i.followUp({
      content: 'Need name',
      ephemeral: true,
    });
  }

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
};

export const ChoseiHostForm: Form<keyof Inputs> = new Form<keyof Inputs>(
  { route, handler },
  {
    title: 'Host new Event',
    inputs: [
      {
        name: 'name',
        customId: 'eventNameInput',
        label: 'Name',
        required: true,
        style: TextInputStyle.Short,
      },
      {
        name: 'detail',
        customId: 'eventDetailInput',
        label: 'Detail',
        maxLength: 100,
        required: false,
        style: TextInputStyle.Paragraph,
      },
    ],
  }
);
