const { Credentials } = require( 'google-auth-library')
const { google } = require( 'googleapis')
const User = require( './user.model')
const { ErrorHandler } = require('../../utils/error')
const jwt = require( 'jsonwebtoken')
const axios = require( 'axios')

const OAuth2 = google.auth.OAuth2
const oauth_conf = require('../../utils/oauth')

module.exports =   {
  getAllUser: () => {
    return User.find()
  },

  googleLoginLink: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const oauth2Client = new OAuth2(
          oauth_conf.client_id,
          oauth_conf.client_secret,
          oauth_conf.redirect_uris[0]
        )
        // Obtain the google login link to which we'll send our users to give us access
        const loginLink = oauth2Client.generateAuthUrl({
          access_type: 'online',
          scope: oauth_conf.scopes,
        })
        resolve(loginLink)
      } catch (error) {
        reject(error)
      }
    })
  },

  googleLoginCallback:(error, code) =>{
    return new Promise(async (resolve, reject) => {
      try {
        const oauth2Client = new OAuth2(
          oauth_conf.client_id,
          oauth_conf.client_secret,
          oauth_conf.redirect_uris[0]
        )
        if (error) {
          // The user did not give us permission.
          throw new ErrorHandler(403, 'Authorization Failed')
        } else {
          oauth2Client.getToken(code, function (err, token) {
            if (err) throw new ErrorHandler(403, 'Authorization Failed')
            // Store the credentials given by google into a jsonwebtoken in a cookie called 'jwt'

            const userToken = jwt.sign(
              token,
              process.env.JWT_SECRET
            )
            resolve(userToken)
          })
        }
      } catch (error) {
        reject(error)
      }
    })
  },

  retrieveGoogleData:(jwtCookies) =>{
    return new Promise(async (resolve, reject) => {
      try {
        const tokenCookies = await jwt.verify(
          jwtCookies,
          process.env.JWT_SECRET
        )

        const { data } = await axios.get(
          'https://www.googleapis.com/oauth2/v2/userinfo',
          {
            headers: { Authorization: `Bearer ${tokenCookies.access_token}` },
          }
        )
        let isUserExist = await User.findOne({ email: data.email })
        if (!isUserExist) {
          isUserExist = await User.create({
            name: data.name,
            email: data.email,
          })
        }

        const userCookies = await jwt.sign(
          isUserExist.toJSON(),
          process.env.JWT_SECRET || ''
        )
        resolve(userCookies)
      } catch (error) {
        reject(error)
      }
    })
  }
}
