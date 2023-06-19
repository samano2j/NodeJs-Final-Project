const { MongoClient, ObjectId } = require('mongodb')

const mongoURL = process.env.MONGO_URL, dbName = process.env.MONGO_DB_NAME

const mongoConnect = async () => {
    const dbo = await MongoClient.connect(mongoURL)

    //check if db exists
    const dbList = await dbo.db().admin().listDatabases()
    const dbExists = dbList.databases.find(db => db.name === dbName)
    
    console.log(`Connected to ${dbName}!`)
    return await dbo.db(dbName)
}

module.exports = { mongoConnect, ObjectId }