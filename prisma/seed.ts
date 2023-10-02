import { Prisma, PrismaClient } from '@prisma/client'
import { Random } from 'mockjs'
import user from './seed/user'
const prisma = new PrismaClient()
async function run() {
    for (let i = 0; i < 30; i++) {
        await prisma.user.create({
            data: {
                name: Random.cname(),
                password: Random.string(),
                app: {
                    create: {
                        title: Random.csentence(),
                        content: Random.cparagraph(),
                        preview: Random.image('100x100', '#000', 'Hello xiaoxie')
                    }
                }
            }
        })
    }
    await user()
}
run()