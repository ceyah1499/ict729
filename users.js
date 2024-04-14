import { MongoClient } from 'mongodb';

export async function connectToCluster(uri) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');

        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
}

export async function createUserDocument(collection) {
    const userDocument = {
        name: 'Test User',
    };

    await collection.insertOne(userDocument);
}

export async function findUsersByName(collection, name) {
    return collection.find({ name }).toArray();
}

export async function updateUsersByName(collection, name, updatedFields) {
    await collection.updateMany(
        { name },
        { $set: updatedFields }
    );
}

export async function deleteUsersByName(collection, name) {
    await collection.deleteMany({ name });
}

export async function executeUsersCrudOperations() {
    const uri = process.env.DB_URI;
    let mongoClient;

    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('AceTutoringDB');
        const collection = db.collection('users');

        await updateUsersByName(collection, 'John Doe', { email: 'johndoe@notexample.com' });
        console.log(await findUsersByName(collection, 'John Doe'));
    } finally {
        await mongoClient.close();
    }
}