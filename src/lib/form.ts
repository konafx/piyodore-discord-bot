import {
  ModalBuilder,
  ModalSubmitInteraction,
  ModalComponentData,
  TextInputComponentData,
  TextInputBuilder,
  ActionRowBuilder,
} from 'discord.js';
import { Route } from '~/types';
import { routeStringify } from './route';

export type ModalSubmitHandler = (i: ModalSubmitInteraction) => Promise<void>;
type InputProps<T> = Partial<TextInputComponentData> & { name: T };
type ModalBuilderProps<T> = Partial<ModalComponentData> & {
  inputs: InputProps<T>[];
};

export class Form<T extends string> {
  route: Route;
  handler: ModalSubmitHandler;
  private modal: ModalBuilder;
  private isBuilt = false;
  private inputs?: { [K in string]: TextInputBuilder };

  constructor(init: Pick<Form<T>, 'route' | 'handler'>, props: ModalBuilderProps<T>) {
    this.route = init.route;
    this.handler = init.handler;

    this.modal = this.buildModal(props);
  }

  private buildModal(props: ModalBuilderProps<T>) {
    if (this.isBuilt) return this.modal;

    const modal = new ModalBuilder();

    if (this.route) {
      modal.setCustomId(routeStringify(this.route));
    }
    if (props.title) modal.setTitle(props.title);

    if (!props.inputs) {
      throw new Error('hoge');
    }

    this.inputs = this.buildInputs(props.inputs);

    this.isBuilt = true;
    return modal;
  }

  private buildInputs(inputs: InputProps<T>[]) {
    return inputs
      .map(({ name, ...props }) => {
        return { [name]: new TextInputBuilder(props) };
      })
      .reduce((acc, val) => ({ ...acc, ...val }));
  }

  public cloneModal(values: { [key in T]: string | null }): ModalBuilder {
    /**
     * 今の実装
     * constructorで宣言した modal, inputsの中身のデータだけ抜き取って
     * cloneを作っている。
     * なんか二度手間だな………
     **/
    if (!this.isBuilt) throw new Error('naa');
    if (!this.inputs) throw new Error('todo: remove this');

    const modal = new ModalBuilder(this.modal.data);
    const inputs = this.buildInputs(
      Object.entries<TextInputBuilder>(this.inputs).map(([name, input]) => ({ name, ...input.data } as InputProps<T>))
    );

    for (const [name, value] of Object.entries<string | null>(values)) {
      if (!value) continue;
      inputs[name].setValue(value);
    }
    console.log(inputs);
    modal.setComponents(
      Object.values<TextInputBuilder>(inputs).map((input) =>
        new ActionRowBuilder<TextInputBuilder>().setComponents(input)
      )
    );
    return modal;
  }
}
