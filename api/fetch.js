const axios = require('axios')

const fetchSearchAnime = async (anime) => {
    const url = 'https://api.animethemes.moe/search?q='+ anime + '&page[limit]=5'

    const data = await axios.get(url)

    return data
}

const fetchImageAnime = async (id) => {
    const url = 'https://api.animethemes.moe/image/' + id
    const data = await axios.get(url)
    return data
}

const fetchAnimeYear = async (season, year) => {
    const url = 'https://api.animethemes.moe/anime?sort=name&filter[year]='+ year +'&filter[season]=' + season + '&include=images'
    const data = await axios.get(url)
    return data
} 

const fetchAnimeProfile = async (anime) => {
    const url = 'https://api.animethemes.moe/anime/' + anime + '?include=images,animethemes.animethemeentries.videos.audio'
    const data = await axios.get(url)
    return data
}
  

module.exports = {
    fetchSearchAnime,
    fetchImageAnime,
    fetchAnimeYear,
    fetchAnimeProfile,
}