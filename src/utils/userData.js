import { faker } from '@faker-js/faker';
import { itemRarities } from "./itemData";

const idMin = 1000000000000;
const idMax = 10000000000000;

const createRandomUser = () => ({
    id: faker.datatype.number({ min: idMin, max: idMax }).toString(),
    info: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        phone: faker.helpers.arrayElement([faker.phone.number("+## (0) #########"), null]),
        avatar: faker.image.avatar(),
        created: faker.date.past(),
        lastLoggedIn: faker.date.recent(),
        country: faker.address.country(),
        subscribedToEmails: faker.datatype.boolean(),
        mfaActive: faker.datatype.boolean(),
        history: Array.from({ length: faker.datatype.number({ min: 0, max: 5 }) }, () => ({
            date: faker.date.past(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            phone: faker.helpers.arrayElement([faker.phone.number("+## (0) #########"), null])
        }))
    },
    monetization: {
        hasSpentMoney: faker.datatype.boolean(),
        totalSpend: Number(faker.finance.amount(0, 400)),
        purchases: Array.from({ length: faker.datatype.number({ max: 10 }) }, () => ({
            id: faker.datatype.uuid(),
            date: faker.date.past(),
            ip: faker.internet.ip(),
            source: faker.helpers.arrayElement(["SOURCE_1", "SOURCE_2"]),
            itemId: faker.datatype.number({ min: idMin, max: idMax }).toString(),
            itemName: faker.helpers.arrayElement(["Item 1", "Item 2", "Item 3", "Item 4"]),
        }))
    },
    tickets: Array.from({ length: faker.datatype.number({ max: 10 }) }, () => ({
        id: faker.datatype.uuid(),
        status: faker.helpers.arrayElement(["New", "Answered", "Closed"]),
        subject: faker.lorem.sentence(5).slice(0, -1),
        opened: faker.date.past(),
        link: "https://example.com"
    })),
    money: {
        currency1: faker.datatype.number({ max: 100_000 }),
        currency2: faker.datatype.number({ max: 3_000 })
    },
    inventory: {
        items: Array.from({ length: faker.datatype.number({ max: 10 }) }, () => ({
            id: faker.datatype.number({ min: idMin, max: idMax }).toString(),
            name: faker.word.noun(),
            rarity: faker.helpers.arrayElement(itemRarities)
        }))
    }
});

const generateParam = new URLSearchParams(location.search).get("generateUsers");
export default Array.from({ length: generateParam ?? 50 }, () => createRandomUser());