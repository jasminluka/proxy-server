const express = require('express')
const needle = require('needle')
const apicache = require('apicache')

const router = express.Router()

const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

// Init cache
let cache = apicache.middleware

router.get('/', cache('2 minutes'), async (req, res, next) => {
  const { q } = req.query

  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      q
    })

    const apiRes = await needle('get', `${API_BASE_URL}?${params}`)
    const data = apiRes.body

    if (process.env.NODE_ENV !== 'production') {
      console.log(`REQUEST: ${API_BASE_URL}?${params}}`)
    }
  
    res.status(200).json({
      success: true,
      data
    })  
  }
  catch (err) {
    next(err)
  }
})

module.exports = router