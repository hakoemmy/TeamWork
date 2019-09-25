import faker from 'faker';

const users = [
  {
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(8, true),
    gender: 'F',
    jobRole: faker.name.jobTitle,
    department: faker.commerce.department,
    address: faker.address.city(),
  },
  {
    firstName: ' ',
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(8, true),
    gender: 'F',
    jobRole: faker.name.jobTitle(),
    department: faker.commerce.department(),
    address: faker.address.city(),
  },
  {
    firstName: '9999',
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(8, true),
    gender: 'F',
    jobRole: faker.name.jobTitle(),
    department: faker.commerce.department(),
    address: faker.address.city(),
  },
  {
    firstName: faker.name.findName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(8, true),
    gender: 'FF',
    jobRole: faker.name.jobTitle(),
    department: faker.commerce.department(),
    address: faker.address.city(),
  },
  {
    firstName: faker.name.findName(),
    lastName: faker.name.lastName(),
    email: 'sylvain@gmail.com',
    password: faker.internet.password(8, true),
    gender: 'M',
    jobRole: faker.name.jobTitle(),
    department: faker.commerce.department(),
    address: faker.address.city(),
  },
  {
    firstName: faker.name.findName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(8, true),
    gender: 'M',
    jobRole: faker.name.jobTitle(),
    department: faker.commerce.department(),
    address: faker.address.city(),
  },
  {
    password: faker.internet.password(8, true),
  },
  {
    email: 'sylvain@gmail.com',
    password: 'password',
  },
  {
    email: faker.internet.email(),
    password: faker.internet.password(8, true),
  },
];

export default users;
