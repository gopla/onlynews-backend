const userService = require('./user.service')

module.exports =  {
  async index(req, res, next) {
    try {
      const result = await userService.getAllUser()
      res.send(result)
    } catch (error) {
      next(error)
    }
  },

  async login(req, res, next) {
    try {
      const link = await userService.googleLoginLink()
      res.redirect(link)
    } catch (error) {
      next(error)
    }
  },

  async callback(req, res, next) {
    try {
      const errorLink = req.query.error != null ? req.query.error : ''
      const codeLink = req.query.code != null ? req.query.code : ''
      const userToken = await userService.googleLoginCallback(
        errorLink,
        codeLink
      )
      const userCookie = await userService.retrieveGoogleData(
        userToken 
      )
      res.cookie('userCookies', userCookie)
      res.redirect('/news')
    } catch (error) {
      next(error)
    }
  }
}
