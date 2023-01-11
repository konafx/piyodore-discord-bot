import { BotButtonCommandName, BotButtonCustomId } from '../types';
import { stringOfLength } from './string';

export const botButtonCommandName = (commandName: string): BotButtonCommandName => stringOfLength(commandName, 1, 32);
export const botButtonCustomId = (customId: string): BotButtonCustomId => stringOfLength(customId, 1, 32);
