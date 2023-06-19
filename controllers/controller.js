const { fetchAnimeYear, fetchImageAnime, fetchAnimeProfile, fetchSearchAnime } = require('../api/fetch')
const User = require('../models/users')
const NodeCache = require('node-cache')
const homeCache = new NodeCache();
const categoryCache = new NodeCache();
const searchCache = new NodeCache();

const getHome = async (req, res, next) => {
    try {

          const cacheKey = 'homeData';

        const cachedData = homeCache.get(cacheKey);
        if (cachedData) {
          res.json(cachedData);
          return;
        }

        const searchData1 = await fetchAnimeYear('Spring', 2023)
        const searchData2 = await fetchAnimeYear('Winter', 2023)
        const searchData3 = await fetchAnimeYear('Fall', 2022)
        const data1 = []
        const data2 = []
        const data3 = []

        for (let i = 0; i < 5; i++) {
          let image1 = await fetchImageAnime(searchData1.data.anime[i].images[0].id)
          let image2 = await fetchImageAnime(searchData2.data.anime[i].images[0].id)
          let image3 = await fetchImageAnime(searchData3.data.anime[i].images[0].id)

          data1.push({ name: searchData1.data.anime[i].name, synopsis: searchData1.data.anime[i].synopsis, image: image1.data.image.link, slug: searchData1.data.anime[i].slug})
          data2.push({ name: searchData2.data.anime[i].name, synopsis: searchData2.data.anime[i].synopsis, image: image2.data.image.link, slug: searchData2.data.anime[i].slug})
          data3.push({ name: searchData3.data.anime[i].name, synopsis: searchData3.data.anime[i].synopsis, image: image3.data.image.link, slug: searchData3.data.anime[i].slug})
        }

        const response = {
          data1: data1,
          data2: data2,
          data3: data3,
        }

        homeCache.set(cacheKey, response);


        res.json(response)
    } catch (error) {
      console.log(error)
    }
}

const getCategory = async (req, res, next) => {
  const category = req.params.category
  try {

    const cacheKey = `categoryData_${category}`;

    const cachedData = categoryCache.get(cacheKey);
    if (cachedData) {
      res.json(cachedData);
      return;
    }

    let searchData1 = {}
    const data1 = []

    if(category == 'spring2023') searchData1 = await fetchAnimeYear('Spring', 2023)
    else if (category == 'winter2023') searchData1 = await fetchAnimeYear('Winter', 2023)
    else if (category == 'fall2022') searchData1 = await fetchAnimeYear('Fall', 2022)

    for (let i = 0; i < searchData1.data.anime.length; i++) {
      let image1 = await fetchImageAnime(searchData1.data.anime[i].images[0].id)

      data1.push({ name: searchData1.data.anime[i].name, synopsis: searchData1.data.anime[i].synopsis, image: image1.data.image.link, slug: searchData1.data.anime[i].slug})
    }

    const response = {
      data1: data1,
    }

    categoryCache.set(cacheKey, response);

    console.log('Data fetched and cached');

    res.json(response)

  } catch (error) {
      console.log(error)
  }
}

const getProfile = async (req, res, next) => {
  const anime = req.params.anime

  try {
    const searchData = await fetchAnimeProfile(anime)
    const data = []
    let image = await fetchImageAnime(searchData.data.anime.images[0].id)
    const themes = []

    for (let i = 0; i < searchData.data.anime.animethemes.length; i++) {
      themes.push({
        audio: searchData.data.anime.animethemes[i].animethemeentries[0].videos[0].audio.link,
        name: searchData.data.anime.animethemes[i].animethemeentries[0].videos[0].audio.filename 
      })
    }

    data.push({
      name: searchData.data.anime.name,
      synopsis: searchData.data.anime.synopsis,
      image: image.data.image.link,
      theme: themes
    })


    const response = {
      data: data,
    }

    res.json(response)
  } catch (error) {
    console.log(error)
  }

}

const getSearch = async (req, res, next) => {
  const { searchText } = req.body
  try {

    const cacheKey = `searchData_${searchText}`;

    const cachedData = searchCache.get(cacheKey);
    if (cachedData) {
      res.json(cachedData);
      return;
    }

    const searchData = await fetchSearchAnime(searchText)
    const data = []

    for (let i = 0; i < searchData.data.search.anime.length; i++) {
      const animeData = await fetchAnimeProfile(searchData.data.search.anime[i].slug)
      const image = await fetchImageAnime(animeData.data.anime.images[0].id)
      data.push({
        name: animeData.data.anime.name,
        slug: animeData.data.anime.slug,
        image: image.data.image.link
      })
    }

    const response = {
      data: data
    }

    searchCache.set(cacheKey, response);


    res.json(response)
  } catch (error) {
    console.log(error);
  }
}

const postLogin = async (req, res, next) => {
  const { username, password } = req.body
  try {
    const result = await User.matchInfo(username, password)
    if (!result) {
      res.json({message: 'Invalid Credentials'})
    }
    else {
      req.session.user = username
      res.json({message: 'success'})
    }
  } catch (error) {
      console.log(error);
  }
}

const postSignup = async (req, res, next) => {
  const { username, password } = req.body
  try {
    const match = await User.matchUsername(username)
    if (!match) {
      const newUser = new User(username, password)
      const result = await newUser.save() 
      res.json({message: 'success'})
    }
    else {
      res.json({message: 'Username already used'})
    }
  } catch (error) {
    console.log(error);
  }
}

const getUser = async (req, res, next) => {
  const userData = req.session.user
  res.json({user: userData})
}

const postLogout = async (req, res, next) => {
  req.session.destroy()
  res.json({ message: 'Logout success' });
}

const postFavorite = async (req, res, next) => {
  const { audio_src, audio_name, audio_image } = req.body
  const username = req.session.user
  
  const audio = {
    audio_src: audio_src,
    audio_name: audio_name,
    audio_image: audio_image,
  };

  const checkAudio = await User.matchAudio(username, audio)
  if(!checkAudio) {
    await User.addAudio(username, audio)
    res.json({message:'success'})
  }
  else {
    res.json({message:'Already exist'})
  } 
}

const getLibrary = async (req, res, next) => {
  const username = req.session.user
  const result = await User.fetchLibrary(username)
  res.json(result)
}

const getAudio = async (req, res, next) => {
  const username = req.session.user
  const result = await User.fetchAudio(username)
  res.json(result)
}

const deleteAudio = async (req, res, next) => {
  const username = req.session.user
  const { audio_name } = req.body

  const audio = {
    audio_name: audio_name,
  }
  const deleteAudio = await User.deleteAudio(username, audio)
  if(deleteAudio) {
    res.json({message:'Delete Success'})
  }
  else {
    res.json({message:'Delete Fail'})
  } 

}

const matchUser = async (req, res, next) => {
  const { username } = req.body
  const match = await User.matchUsername(username)
  if(!match) {
    res.json({message:''})
  } else {
    res.json({message: 'Username already used'})
  }
}

module.exports = {
    getHome,
    getCategory,
    getProfile,
    getSearch,
    postLogin,
    postSignup,
    getUser,
    postLogout,
    postFavorite,
    getLibrary,
    getAudio,
    deleteAudio,
    matchUser,
}