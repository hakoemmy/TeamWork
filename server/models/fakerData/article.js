import faker from 'faker';

const articles = [
  {
    article: faker.lorem.paragraphs(),
  },
  {
    title: ' ',
    article: faker.lorem.paragraphs(),
  },
  {
    title: '89977789',
    article: faker.lorem.paragraphs(),
  },
  {
    title: faker.lorem.sentence(),
    article: faker.lorem.paragraphs(),
  },
];

export default articles;
