/* eslint-disable no-console */
const faker = require('faker');

const Name = require('./index.js');

const addImageArray = () => {
  const imageAmount = Math.floor(Math.random() * (9 - 3) + 3);
  const imageArray = [];
  for (let i = 0; i < imageAmount; i += 1) {
    imageArray.push(faker.image.imageUrl());
  }
  return imageArray;
};

const addFakeNames = () => {
  const names = [{
    name: 'Buddha | Shoe Charms | Shoe Decor | Crok Charms | Christmas Gifts | Birthday Gifts | Shoe Plugs | Clog Shoe Charms | Garden Charms | Plants',
    images: [
      'https://i.etsystatic.com/9820983/r/il/221b7e/2714714234/il_1588xN.2714714234_kkio.jpg',
      'https://i.etsystatic.com/9820983/r/il/1536ca/2762394747/il_794xN.2762394747_kobm.jpg',
      'https://i.etsystatic.com/9820983/r/il/ba429b/2762394797/il_794xN.2762394797_9xcz.jpg',
    ],
    username: faker.internet.userName(),
    favorite: faker.random.boolean(),
  }];
  for (let i = 0; i < 100; i += 1) {
    names.push({
      name: faker.commerce.productName(),
      images: addImageArray(),
      username: faker.internet.userName(),
      favorite: faker.random.boolean(),
    });
  }
  return names;
};

const fakeNames = addFakeNames();

const insertFakeNames = () => {
  Name.create(fakeNames)
    .then(() => process.exit())
    .catch((err) => console.log(err));
};

insertFakeNames();
