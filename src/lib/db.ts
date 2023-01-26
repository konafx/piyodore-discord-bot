import { User, TentativeEvent, ProspectiveDate, Reply, PrismaClient } from '../api/server/generated';
export const prisma = new PrismaClient();
export { User, TentativeEvent, ProspectiveDate, Reply };
