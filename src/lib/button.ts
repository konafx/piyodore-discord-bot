import { ButtonBuilder, ButtonInteraction, ButtonComponent, ComponentEmojiResolvable } from 'discord.js';
import { Route } from '~/types';
import { createRoute, routeCommandName, routeCustomId, routeStringify } from './route';

export type ButtonHandler = (i: ButtonInteraction) => Promise<void>;
export type ButtonBuilderProps = Partial<ButtonComponent & { emoji: ComponentEmojiResolvable }>;

export class Button {
  route?: Route;
  handler?: ButtonHandler;
  private _customButton?: ButtonBuilder;

  constructor(init: Pick<Button, 'route' | 'handler'>, props: ButtonBuilderProps) {
    this.route = init.route;
    if (init.handler) {
      this.handler = init.handler;
    }

    this.buildButton(props);
  }

  private buildButton(props: ButtonBuilderProps) {
    this._customButton = new ButtonBuilder();

    if (this.route && props.url) {
      throw new Error('customIdとurlがどちらも指定されている');
    }

    if (this.route) {
      this.customButton.setCustomId(routeStringify(this.route));
    }
    if (props.label) this._customButton.setLabel(props.label);
    if (props.emoji) this._customButton.setEmoji(props.emoji);
    if (props.style) this._customButton.setStyle(props.style);
    if (props.disabled) this._customButton.setDisabled();
    if (props.url) this._customButton.setURL(props.url);

    return;
  }

  get customButton(): ButtonBuilder {
    if (!this._customButton) {
      throw new Error('undefined');
    }

    return this._customButton;
  }
}

export function PrepareCreateButton(customId: string, handler: ButtonHandler, _props?: ButtonBuilderProps) {
  const _customId = routeCustomId(customId);
  return function (commandName: string, __props?: ButtonBuilderProps) {
    const _commandName = routeCommandName(commandName);
    const route = createRoute(_commandName, _customId);
    const props = { ..._props, ...__props };
    return new Button({ route, handler }, props);
  };
}
