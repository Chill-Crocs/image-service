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
      favorite: false,
    },
    {
      name: 'crocs2',
      images: ['lkad', 'hfvh'],
      favorite: false,
    }];
    await items.insertMany(mockItems);

    const insertedItem1 = await items.findOne({name: 'crocs'});
    const insertedItem2 = await items.findOne({name: 'crocs2'});
    expect(insertedItem1).toEqual(mockItems[0]);
    expect(insertedItem2).toEqual(mockItems[1]);
  });

});

describe('delete', () => {
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


  it('should delete one doc from collection', async () => {
    const items = db.collection('itemlist');

    const mockItems = [{
      name: 'crocs',
      images: ['lk', 'hh'],
      favorite: false,
    },
    {
      name: 'crocs2',
      images: ['lkad', 'hfvh'],
      favorite: false,
    }];
    await items.insertMany(mockItems);
    await items.deleteOne({name: 'crocs2'});

    const insertedItem1 = await items.findOne({name: 'crocs'});
    const insertedItem2 = await items.findOne({name: 'crocs2'});
    expect(insertedItem1).toEqual(mockItems[0]);
    expect(insertedItem2).toEqual(null);
  });

  it('should delete all docs from collection', async () => {
    const items = db.collection('itemlist');

    const mockItem = {
      name: 'crocs',
      images: ['lk', 'hh'],
      favorite: false,
    };
    await items.insertOne(mockItem);
    await items.deleteMany({});

    const insertedItem = await items.findOne({name: 'crocs'});
    expect(insertedItem).toEqual(null);
  });

});