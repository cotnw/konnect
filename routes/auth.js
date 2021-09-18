const express = require('express')
const axios = require('axios')
const querystring = require('querystring')
const User = require('../models/User')
const router = express.Router()

const baseUrl = 'https://konnect2021.herokuapp.com'

router.get('/google', async(req, res) => {
    res.redirect(`https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=884360040700-4093n49it73naktrttlljb9ad6ga4jjo.apps.googleusercontent.com&redirect_uri=${baseUrl}/auth/google/callback&scope=profile%20email`)
})

router.get('/google/callback', async(req, res) => {
    axios.post('https://oauth2.googleapis.com/token', querystring.stringify({
        client_id: `884360040700-4093n49it73naktrttlljb9ad6ga4jjo.apps.googleusercontent.com`,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code: req.query.code,
        redirect_uri: `${baseUrl}/auth/google/callback`,
        grant_type: `authorization_code`
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        console.log(response.data.access_token)
        axios.get('https://www.googleapis.com/oauth2/v3/userinfo', { headers: { Authorization: `Bearer ${response.data.access_token}` } }).then(async profileRes => {
            console.log(profileRes.data)
            let user = await User.findOne({ google_id: profileRes.data.sub })
            if (user) {
                user.access_token = response.data.access_token
                await user.save()
                res.redirect(`/dashboard?access_token=${response.data.access_token}`)
            } else {
                let newUser = new User({
                    name: profileRes.data.name,
                    email: profileRes.data.email,
                    google_id: profileRes.data.sub,
                    access_token: response.data.access_token,
                    pfp_url: profileRes.data.picture
                })

                await newUser.save()
                res.redirect(`/register?access_token=${response.data.access_token}`)
            }
        })
    })
})

module.exports = router