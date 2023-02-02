import { Route, RouteCommandName, RouteCustomId } from '../types';
import { stringOfLength } from './string';

export const routeCommandName = (commandName: string): RouteCommandName => stringOfLength(commandName, 1, 32);
export const routeCustomId = (customId: string): RouteCustomId => stringOfLength(customId, 1, 32);

export const createRoute = (routeCommandName: RouteCommandName, routeCustomId: RouteCustomId): Route => {
  const route: Route = {
    commandName: routeCommandName,
    customId: routeCustomId,
  };

  const customId = JSON.stringify(route);
  if (customId.length > 100) {
    throw new Error('commandName and customId string length must be less than 100 chars');
  }
  return route;
};
export const routeStringify = (route: Route): string => {
  const customId = JSON.stringify(route);
  if (customId.length > 100) {
    throw new Error('commandName and customId string length must be less than 100 chars');
  }
  return customId;
};

export const routeParse = (customId: string) => {
  const route: Route = JSON.parse(customId);

  return route;
};
