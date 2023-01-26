import { Route, RouteCommandName, RouteCustomId } from '../types';
import { stringOfLength } from './string';

export const routeCommandName = (commandName: string): RouteCommandName => stringOfLength(commandName, 1, 32);
export const routeCustomId = (customId: string): RouteCustomId => stringOfLength(customId, 1, 32);

export const routeStringify = (routeCommandName: RouteCommandName, routeCustomId: RouteCustomId): string => {
  const route: Route = {
    commandName: routeCommandName,
    customId: routeCustomId,
  };

  const customId = JSON.stringify(route);
  if (customId.length > 100) {
    throw new Error('commandName and customId string length must be less than 100 chars');
  }

  return customId;
};
