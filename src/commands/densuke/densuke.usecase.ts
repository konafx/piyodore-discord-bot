import { prisma, Event, User, Attendance } from '~/lib/db';

type HostProps = {
  eventName: string;
  hostUserId: string;
  plans: Array<{ start: Date | string; end?: Date | string }>;
};

type AttendProps = {
  userId: string;
  attendances: Array<{
    planId: number;
    odds: number;
  }>;
};

export const DensukeUsecase = {
  host: async (props: HostProps): Promise<Event> => {
    const host = await prisma.user.upsert({
      where: {
        userId: props.hostUserId,
      },
      create: {
        userId: props.hostUserId,
      },
      update: {},
    });

    const event = await prisma.event.create({
      data: {
        name: props.eventName,
        hostId: host.id,
        plans: {
          create: props.plans,
        },
      },
      include: {
        plans: true,
      },
    });

    return event;
  },
  attend: async (props: AttendProps): Promise<Attendance[]> => {
    const result = await Promise.all(
      props.attendances.map((attendance): Promise<Attendance> => {
        return prisma.attendance.create({
          data: {
            odds: attendance.odds,
            plan: {
              connect: { id: attendance.planId },
            },
            user: {
              connect: { userId: props.userId },
            },
          },
        });
      })
    );
    console.log(result);
    return result;
  },
};
