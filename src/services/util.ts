export type DiscordMessageId = {
  guildId: string;
  channnelId: string;
  messageId: string;
  postedAt: Date;
};

export const jsonDiscordMessageIdsOnTentativeEvent = {
  parse: (messageIds: string) => JSON.parse(messageIds) as Array<DiscordMessageId>,
  strigify: (messageIds: Array<DiscordMessageId>) => JSON.stringify(messageIds),
};
