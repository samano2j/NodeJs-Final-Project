const router = require('express').Router()
const { getHome, getCategory, getProfile, getSearch, postLogin, postSignup, getUser, postLogout, postFavorite, getLibrary, getAudio, deleteAudio, matchUser } = require('../controllers/controller')

router.route('/').get(getHome)
router.route('/category/:category').get(getCategory)
router.route('/profile/:anime').get(getProfile)
router.route('/search/').post(getSearch)
router.route('/login').post(postLogin)
router.route('/signup').post(postSignup)
router.route('/user').get(getUser)
router.route('/logout').post(postLogout)
router.route('/addFavorite').post(postFavorite)
router.route('/library').get(getLibrary)
router.route('/audio').get(getAudio)
router.route('/deleteAudio').delete(deleteAudio)
router.route('/matchUser').post(matchUser)
module.exports = router