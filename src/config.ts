const Config = {
  token: process.env.DISCORD_BOT_TOKEN || '',
  clientId: process.env.DISCORD_BOT_CLIENT_ID || '',
  guildId: process.env.DISCORD_BOT_GUILD_ID || '',
}
console.log(Config)

export default Config;
