const { v4: uuid }  = require('uuid')
const { mongoConnect, ObjectId } = require("../service/mongodb")
const db = mongoConnect()
const bcrypt = require('bcrypt')

module.exports = class User {
    constructor(username, password) {
        this._id = new ObjectId()
        this.username = username
        this.password = password
        this.libraries = [
            { 
                library_name: 'Favorites',
                audios: []
            }]
    }

    async save(){
        const hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
        return (await db).collection("users").insertOne(this)
    }

    static async matchInfo(username, password) {
        const user = await (await db).collection("users").findOne({ username });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            return passwordMatch;
        }
        return false;
    }

    static async matchUsername(username) {
        return (await db).collection("users").findOne({ username })
    }

    static async addAudio(username, audio) {
        return (await db).collection("users").updateOne(
            { username: username, 'libraries.library_name': "Favorites" }, 
            { $push: { "libraries.$.audios": audio } }) 
    }

    static async matchAudio(username, audio) {
        const user = await (await db).collection("users").findOne({ username });
        const favoritesLibrary = user.libraries.find((lib) => lib.library_name === "Favorites");
        if (favoritesLibrary) {
            return favoritesLibrary.audios.some((a) => a.audio_name === audio.audio_name);
        }
        return false;
    }

    static async fetchLibrary(username) {
        const user = await (await db).collection("users").findOne({ username });
        if (user) {
            const libraryNames = user.libraries.map((library) => library.library_name);
            return libraryNames;
        }
        return null;
    }

    static async fetchAudio(username) {
        const user = await (await db).collection("users").findOne({ username });
        if (user) {
            const library = user.libraries.find((lib) => lib.library_name === "Favorites");
            if (library && library.audios) {
            return library.audios;
            }
        }
        return null;
    }

    static async deleteAudio(username, audioName) {
    
        const result = await (await db).collection("users").updateOne(
        { username, 'libraries.library_name': 'Favorites' },
        { $pull: { 'libraries.$.audios': { audio_name: audioName.audio_name } } }
        );

        if (result.modifiedCount > 0) {
        return true;
        } else {
        return false;
        }
    }
}