import { PrismaService } from "./common/prisma.service";

function getTime() {
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1);
    const currentMonth = new Date().getMonth() + 1;
    return {
        currentYear,
        startDate,
        currentMonth
    }
}

async function getData(prisma: PrismaService, table: string) {
    const { currentYear,
        startDate,
        currentMonth } = getTime()
    const userCounts = await prisma[table].groupBy({
        by: ['createdAt'],
        _count: {
            createdAt: true,
        },
        where: {
            createdAt: {
                gte: startDate,
            },
        },
    });

    const monthsPassed = currentMonth;

    const data = Array.from({ length: monthsPassed }, (_, index) => {
        const month = index + 1;
        const monthFormatted = month.toString().padStart(2, '0');
        const name = `${currentYear}-${monthFormatted}`;
        const matchingUserCount = userCounts.filter((item) => {
            const itemMonth = new Date(item.createdAt).getMonth() + 1;
            return itemMonth === month;
        });
        const value = matchingUserCount.reduce((total, item) => {
            return total + item._count.createdAt;
        }, 0);
        return { name, value };
    });
    return data;
}
async function getData_Commet(prisma: PrismaService, table: string) {
    const { currentYear,
        startDate,
        currentMonth } = getTime()
    const commentCounts = await prisma[table].groupBy({
        by: ['createdAt', 'softId'],
        _count: {
            createdAt: true,
        },
        where: {
            createdAt: {
                gte: startDate,
            },
            commentId: null,
        },
    });

    const commentCountsBySoftId = {};

    commentCounts.forEach((item) => {
        const { createdAt, softId, _count } = item;
        const month = new Date(createdAt).getMonth() + 1;
        const monthFormatted = month.toString().padStart(2, '0');
        const time = `${currentYear}-${monthFormatted}`;

        if (!commentCountsBySoftId[softId]) {
            commentCountsBySoftId[softId] = {};
        }

        if (!commentCountsBySoftId[softId][time]) {
            commentCountsBySoftId[softId][time] = 0;
        }

        commentCountsBySoftId[softId][time] += _count.createdAt;
    });

    const result = [];

    for (const softId of Object.keys(commentCountsBySoftId)) {
      const data = [];
    
      for (let month = 1; month <= currentMonth; month++) {
        const monthFormatted = month.toString().padStart(2, '0');
        const name = `${currentYear}-${monthFormatted}`;
        const value = commentCountsBySoftId[softId][name] || 0;
    
        data.push({ name, value });
      }
    
      const soft = await prisma.soft.findUnique({
        where: {
          id: +softId,
        },
        select: {
          name: true,
        },
      });
    
      result.push({ softId, name: soft.name, data });
    }
    return result;
}

export {
    getData,
    getData_Commet
}