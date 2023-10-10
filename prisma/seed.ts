import { Prisma, PrismaClient } from '@prisma/client'
import { Random } from 'mockjs'
import user from './seed/user'
import { soft } from './seed/soft'
import { comment } from './seed/comment'
const prisma = new PrismaClient()
async function run() {
    // await user()
    // await soft()
    // await comment()
}
run()