import { faker } from '@faker-js/faker';

const idMin = 1000000000000;
const idMax = 10000000000000;

export const itemCategories = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5",];
export const itemRarities = ["Rarity 1", "Rarity 2", "Rarity 3", "Rarity 4", "Rarity 5"];
export const itemTags = ["tag_1", "tag_2", "tag_3", "tag_4", "tag_5", "tag_6"];
export const getRarityColor = rarity => {
    switch (rarity) {
        case "Rarity 1":
            return "cyan"
        case "Rarity 2":
            return "magenta"
        case "Rarity 3":
            return "blue"
        case "Rarity 4":
            return "purple"
        case "Rarity 5":
            return "gold"
        default:
            return null
    }
};

export const getTagColor = tag => {
    switch (tag) {
        case "tag_1":
            return "purple"
        case "tag_2":
            return "red"
        case "tag_3":
            return "volcano"
        case "tag_4":
            return "orange"
        default:
            return null
    }
};

const generateParam = new URLSearchParams(location.search).get("generateItems");
export default Array.from({ length: generateParam ?? 500 }, () => ({
    id: faker.datatype.number({ min: idMin, max: idMax }).toString(),
    image: faker.image.food(200, 200, true),
    name: faker.word.noun(),
    category: faker.helpers.arrayElement(itemCategories),
    rarity: faker.helpers.arrayElement(itemRarities),
    tag: faker.helpers.arrayElement(itemTags),
    published: faker.helpers.arrayElement([faker.date.past(), null]),
    owners: faker.datatype.number(100_000)
}));