import {
  ActionRowBuilder,
  APIEmbedField,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  InteractionReplyOptions,
} from 'discord.js';
import { CreateEditButton } from '../buttons/edit.button';
import { CreateAddButton } from '../buttons/add.button';
import { CreateConfirmButton } from '../buttons/confirm.button';
import { CreateReplyButton } from '../buttons/reply.button';
import { CreateHeartButton } from '../buttons/heart.button';
import { CreateSorryButton } from '../buttons/sorry.button';
import { emojify } from 'node-emoji';

type Option = {
  date: Date;
  countOk: number;
  countNg: number;
};
const table = (...options: Option[]) =>
  options
    .map(
      ({ date, countOk, countNg }) =>
        `・<t:${Math.ceil(date.getTime() / 1000)}:d> ${emojify(':heartpulse:')}${countOk} ${emojify(
          ':man-bowing:'
        )}${countNg}`
    )
    .join('\n');

const fieldsTable = (...options: Option[]) => {
  return [
    {
      name: 'date',
      inline: true,
      value: options.map(({ date }) => `<t:${Math.ceil(date.getTime() / 1000)}:d>`).join('\n'),
    },
    {
      name: 'ok',
      inline: true,
      value: options.map(({ countOk }) => `${emojify(':heartpulse:')}\`${countOk}\``).join('\n'),
    },
    {
      name: 'ng',
      inline: true,
      value: options.map(({ countNg }) => `${emojify(':man-bowing:')}\`${countNg}\``).join('\n'),
    },
  ] as APIEmbedField[];
};

const sampleTable: Option[] = [
  {
    date: new Date('2022-11-20'),
    countOk: 3,
    countNg: 2,
  },
  {
    date: new Date('2022-11-21'),
    countOk: 4,
    countNg: 1,
  },
];
console.log(sampleTable);

const buttons = {
  host: [
    CreateEditButton('chosei', { style: ButtonStyle.Secondary }),
    CreateAddButton('chosei', { style: ButtonStyle.Secondary }),
    CreateConfirmButton('chosei', { style: ButtonStyle.Success }),
  ],
  reply: [
    CreateReplyButton('chosei', { style: ButtonStyle.Primary }),
    CreateHeartButton('chosei', { style: ButtonStyle.Secondary }),
    CreateSorryButton('chosei', { style: ButtonStyle.Secondary }),
  ],
};

export { buttons as HostPageButtons };

export const ChoseiHostPage = (name: string, detail: string): InteractionReplyOptions => ({
  ephemeral: false,
  embeds: [
    new EmbedBuilder()
      .setTitle(name)
      .setFields({ name: 'hoge', value: table(...sampleTable) }, ...fieldsTable(...sampleTable))
      .setDescription(detail),
  ],
  components: [
    new ActionRowBuilder<ButtonBuilder>().addComponents(...buttons.host.map((btn) => btn.customButton)),
    new ActionRowBuilder<ButtonBuilder>().addComponents(...buttons.reply.map((btn) => btn.customButton)),
  ],
});
