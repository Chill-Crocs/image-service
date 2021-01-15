const {MongoClient} = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeEach(async () => {
    await db.collection('itemlist').deleteMany({});
  });

  beforeAll(async () => {
    connection = await MongoClient.connect('mongodb://localhost/itemlist', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const items = db.collection('itemlist');

    const mockItem = {
      name: 'crocs',
      images: ['lk', 'hh'],
      username: 'charlie53',
      favorite: false,
    };
    await items.insertOne(mockItem);

    const insertedItem = await items.findOne({name: 'crocs'});
    expect(insertedItem).toEqual(mockItem);
  });

  it('should insert multiple docs into collection', async () => {
    const items = db.collection('itemlist');

    const mockItems = [{
      name: 'crocs',
      images: ['lk', 'hh'],
      username: 'charlie53',
      favorite: false,
    },
    {
      name: 'crocs2',
      images: ['lkad', 'hfvh'],
      username: 'charlie52',
      favorite: false,
    }];
    await items.insertMany(mockItems);

    const insertedItem1 = await items.findOne({name: 'crocs'});
    const insertedItem2 = await items.findOne({name: 'crocs2'});
    expect(insertedItem1).toEqual(mockItems[0]);
    expect(insertedItem2).toEqual(mockItems[1]);
  });

});
