import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'

const prisma = new PrismaClient()

async function main() {
  prisma.$transaction([])
  const user = await prisma.user.upsert({
    where: { email: 'tim@timfeeley.com' },
    update: {},
    create: {
      name: 'Tim Feeley',
      email: 'tim@timfeeley.com',
      emailVerified: null,
      image:
        'https://lh3.googleusercontent.com/a-/AOh14Gh-dFNeOqQHZiTstDgipB7KhSbFlY-3qfm1l_y0zas=s96-c',
    },
  })
  console.log(user)
  const account = await prisma.account.upsert({
    where: {
      userId: user.id,
    },
    update: {},
    create: {
      userId: user.id,
      type: 'oauth',
      provider: 'google',
      providerAccountId: '107913792335868824492',
      refresh_token: null,
      access_token: null,
      token_type: 'Bearer',
      session_state: null,
    },
  })
  console.log(account)
  const org = await prisma.org.upsert({
    where: { slug: 'internal' },
    update: {},
    create: {
      name: 'Internal',
      slug: 'internal',
    },
  })
  console.log(org)
  const orgUser = await prisma.orgUser.upsert({
    where: {
      userId_orgId: {
        orgId: org.id,
        userId: user.id,
      },
    },
    update: {},
    create: {
      orgId: org.id,
      userId: user.id,
      role: 'ADMIN',
    },
  })
  console.log(orgUser)
  const period = await prisma.period.upsert({
    where: {
      orgId_slug: {
        orgId: org.id,
        slug: 'first',
      },
    },
    update: {},
    create: {
      orgId: org.id,
      slug: 'first',
      title: 'First Session',
      startDate: dayjs().subtract(14, 'days').toDate(),
      endDate: dayjs().add(14, 'days').toDate(),
      status: 'ACTIVE',
    },
  })
  console.log(period)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
