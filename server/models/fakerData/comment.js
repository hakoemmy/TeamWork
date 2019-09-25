import faker from 'faker';

const comments = [
  {},
  {
    comment: '   ',
  },
  {
    comment: faker.lorem.paragraph(),
  },
];

export default comments;
