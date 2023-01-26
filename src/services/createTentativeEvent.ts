import { prisma, ProspectiveDate, TentativeEvent } from '~/lib/db';

type Props = {
  discordHostUserId: string;
  tentativeEventName: string;
  prospectiveStartDates?: string[];
};
type Return = TentativeEvent & { prospectiveDates: ProspectiveDate[] };

export const createTentativeEventService = async (props: Props): Promise<Return> => {
  const user = await prisma.user.upsert({
    where: {
      discordUserId: props.discordHostUserId,
    },
    create: {
      discordUserId: props.discordHostUserId,
    },
    update: {},
  });

  const tentativeEvent = await prisma.tentativeEvent.create({
    data: {
      name: props.tentativeEventName,
      hostUserId: user.id,
      prospectiveDates: {
        create: props.prospectiveStartDates?.map((pd) => ({ start: pd })),
      },
    },
    include: {
      prospectiveDates: true,
    },
  });

  return tentativeEvent;
};
