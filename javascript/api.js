const express = require('express');
const fetch = require('node-fetch');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');

const router = express.Router();

const apiKey = 'TU_CLAVE_API';
const apiSecret = 'TU_SECRETO_API';
const apiUrl = 'https://platform.fatsecret.com/rest/server.api';

const oauth = OAuth({
  consumer: { key: apiKey, secret: apiSecret },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  },
});

router.get('/search', async (req, res) => {
  const userQuery = req.query.query; // El término de búsqueda del usuario

  const requestData = {
    url: apiUrl,
    method: 'GET',
    data: { method: 'foods.search', search_expression: userQuery, format: 'json' },
  };

  const requestHeaders = oauth.toHeader(oauth.authorize(requestData));

  try {
    const response = await fetch(`${apiUrl}?method=foods.search&search_expression=${userQuery}&format=json`, {
      method: 'GET',
      headers: {
        ...requestHeaders,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    res.json(data); // Enviar los datos al frontend
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

module.exports = router;