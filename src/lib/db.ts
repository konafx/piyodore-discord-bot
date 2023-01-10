import { User, Event, SchedulePlan, Attendance, PrismaClient } from "../api/server/generated"
export const prisma = new PrismaClient()
export { User, Event, SchedulePlan, Attendance }
