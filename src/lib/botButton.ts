import { BotButton, BotButtonCommandName, BotButtonCustomId } from '../types';
import { stringOfLength } from './string';

export const botButtonCommandName = (commandName: string): BotButtonCommandName => stringOfLength(commandName, 1, 32);
export const botButtonCustomId = (customId: string): BotButtonCustomId => stringOfLength(customId, 1, 32);

export const botButtonStringify = (commandName: BotButtonCommandName, customId: BotButtonCustomId): string => {
  const botButton: BotButton = {
    commandName: commandName,
    customId: customId,
  };

  const botButtonString = JSON.stringify(botButton);
  if (botButtonString.length > 100) {
    throw new Error('bot botton string length must be less than 100 chars');
  }

  return botButtonString;
};
