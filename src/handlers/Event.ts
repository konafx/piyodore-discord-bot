import { Client } from "discord.js";
import { interactionCreateEvent } from "../events";
import { BotEvent } from "../types";

const events: Array<BotEvent> = [
  interactionCreateEvent
]

export default function handler(client: Client) {
  for (const event of events) {
    event.once ?
      client.once(event.name, (...args) => event.execute(...args))
    :
      client.on(event.name, (...args) => event.execute(...args))

    console.log(`🌠 Successfully loaded event ${event.name}`)
  }
}
