import { Prisma, PrismaClient } from '@prisma/client'
import { Random } from 'mockjs'
import user from './seed/user'
import { soft } from './seed/soft'
const prisma = new PrismaClient()
async function run() {
    await user()
    await soft()
}
run()