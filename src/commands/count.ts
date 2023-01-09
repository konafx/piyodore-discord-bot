import { SlashCommandBuilder } from 'discord.js';
import { BotCommand } from '../types';
import { prisma } from '../lib/db';

export const CountCommand: BotCommand = {
  command: new SlashCommandBuilder().setName('count').setDescription('count'),
  execute: async (interaction) => {
    const userId = interaction.user.id;
    const guildId = interaction.guild?.id;
    if (!guildId) {
      interaction.reply({
        content: "Failed",
        ephemeral: true,
      })
      return
    }

    const countData = await prisma.count.upsert({
      where: {
        userId_guildId: {
          userId,
          guildId
        }
      },
      update: {},
      create: {
        userId,
        guildId,
        count: 0,
      }
    })

    const incrementedData = await prisma.count.update({
      where: {
        userId_guildId: {
          userId,
          guildId
        }
      },
      data: {
        count: countData.count + 1
      }
    })

    interaction.reply(`Your count is ${incrementedData.count}!`);
  },
};
