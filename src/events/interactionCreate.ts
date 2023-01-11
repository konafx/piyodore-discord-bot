import { Events, Interaction, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { BotEvent } from '~/types';

import { DensukeCommand } from '~/commands';

const event: BotEvent = {
  name: Events.InteractionCreate,
  execute: async (i: Interaction) => {
    DensukeCommand.execute(i);
    return;

    /*
    if (i.isChatInputCommand()) {
      const command = i.client.commands.get(i.commandName);
      if (!command) {
        console.error('undefined command?')
        return
      }
      command.execute(i);
    }
    if (i.isButton()) {
    console.log(i)
      const commandName = i.message.interaction?.commandName
      const command = i.client.commands.get(commandName)
      if (!command) {
        console.error('undefined message.interaction.commandName')
          const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
              new ButtonBuilder()
                .setCustomId('party2')
                .setEmoji("🥳")
                .setStyle(ButtonStyle.Primary)
              ,
              new ButtonBuilder()
                .setCustomId('test2')
                .setEmoji('✨')
                .setStyle(ButtonStyle.Secondary)
            )
        await i.reply({content: 'test', components: [row]})
        return
      }
      command.execute(i)
    }
    return;
    */
  },
};

export { event as interactionCreateEvent };
