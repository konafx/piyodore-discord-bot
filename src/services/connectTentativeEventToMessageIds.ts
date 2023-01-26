import { prisma, ProspectiveDate, TentativeEvent } from '~/lib/db';

import { DiscordMessageId, jsonDiscordMessageIdsOnTentativeEvent } from './util';

type Props = {
  tentativeEvent: TentativeEvent;
  guildChannelMessageId: DiscordMessageId;
};

type Return = TentativeEvent & { prospectiveDates: ProspectiveDate[] };

export const connectTentativeEventToMessageIdsService = async (props: Props): Promise<Return> => {
  let messageIds: Array<DiscordMessageId> = [];

  if (props.tentativeEvent.jsonDiscordMessageIds) {
    messageIds = jsonDiscordMessageIdsOnTentativeEvent.parse(props.tentativeEvent.jsonDiscordMessageIds);
  }

  for (const m of messageIds) {
    if (
      m.messageId == props.guildChannelMessageId.messageId &&
      m.channnelId == props.guildChannelMessageId.channnelId &&
      m.messageId == props.guildChannelMessageId.messageId
    ) {
      // todo: Do not append
    }
  }

  messageIds.push(props.guildChannelMessageId);
  const jsonDiscordMessageIds = jsonDiscordMessageIdsOnTentativeEvent.strigify(messageIds);

  const tentativeEvent = await prisma.tentativeEvent.update({
    where: {
      id: props.tentativeEvent.id,
    },
    data: {
      jsonDiscordMessageIds: jsonDiscordMessageIds,
    },
    include: {
      prospectiveDates: true,
    },
  });

  return tentativeEvent;
};
