import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 4000;

// Chiavi dell'API
import dotenv from 'dotenv';
dotenv.config();

const PETFINDER_KEY = process.env.PETFINDER_KEY;
const PETFINDER_SECRET = process.env.PETFINDER_SECRET;

app.use(cors());

let token = null;
let tokenExpiry = 0;

// Funzione per ottenere o rigenerare il token di accesso da Petfinder
async function getAccessToken(forceRefresh = false) {
  const now = Date.now();

  if (!forceRefresh && token && tokenExpiry > now) {
    return token;
  }

  try {
    const res = await fetch('https://api.petfinder.com/v2/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: PETFINDER_KEY,
        client_secret: PETFINDER_SECRET,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Petfinder token error: ${errorData.error || res.statusText}`);
    }

    const data = await res.json();
    token = data.access_token;
    tokenExpiry = now + data.expires_in * 1000;

    return token;
  } catch (error) {
    console.error('Errore nel recupero del token:', error.message);
    throw error;
  }
}

// Endpoint API principale
app.get('/api/animals', async (req, res) => {
  try {
    let accessToken = await getAccessToken();

     // Estrai i parametri dalla query
     const {
      page = 1,
      limit = 12,
      type,
      breed,
      age,
      gender,
    } = req.query;

    // Costruzione dinamica della URL
    const params = new URLSearchParams({
      page,
      limit,
    });

    if (type) params.append('type', type);
    if (breed) params.append('breed', breed);
    if (age) params.append('age', age);
    if (gender) params.append('gender', gender);

    const url = `https://api.petfinder.com/v2/animals?${params.toString()}`;

    let response = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    //se il token è scaduto, riprova con uno nuovo
    if (response.status === 401) {
      accessToken = await getAccessToken(true);

      response = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }

    const data = await response.json();

    if (!response.ok) {
      console.error('Errore Petfinder:', data);
      return res.status(response.status).json({
        error: data.error || 'Errore nel fetch da Petfinder',
      });
    }

    console.log(`Petfinder animals ricevuti (pagina ${page}, limite ${limit}, tipo ${type || 'tutti'})`);
    return res.json({
      animals: data.animals,
      pagination: data.pagination,
    });
  } catch (err) {
    console.error('Errore server /api/animals:', err.message || err);
    return res.status(500).json({ error: 'Errore interno del server' });
  }
});

// Endpoint per ottenere i dettagli di un animale specifico tramite ID

//SCRIPT VECCHIO
// 
app.get('/api/oneanimal/:id', async (req, res) => {
  console.log("Ciao");
  const { id } = req.params;

  try {
    let accessToken = await getAccessToken();
    console.log("Ciao");

    let response = await fetch(`https://api.petfinder.com/v2/animals/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // Se il token è scaduto, rigenera e riprova
    if (response.status === 401) {
      accessToken = await getAccessToken(true);
    

      response = await fetch(`https://api.petfinder.com/v2/animals/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }

    const data = await response.json();
    
    console.log("Risposta completa animal:", JSON.stringify(data.animal, null, 2));
console.log("Descrizione completa:", data.animal.description);
console.log("Lunghezza descrizione:", data.animal.description?.length);


    if (!response.ok) {
      console.error('Errore Petfinder dettaglio animale:', data);
      return res.status(response.status).json({
        error: data.error || 'Errore nel fetch da Petfinder',
      });
    }

    return res.json(data.animal);
  } catch (err) {
    console.error('Errore server /api/animals/:id:', err.message || err);
    return res.status(500).json({ error: 'Errore interno del server' });
  }
});


app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});






//SCRIPT NUOVO

/*app.get('/api/oneanimal/:id', async (req, res) => {
  const { id } = req.params;
  console.log("Ricevuta richiesta per id:", id);

  try {
    let accessToken = await getAccessToken();
    console.log("Token ottenuto:", accessToken ? "OK" : "MANCANTE");

    let response = await fetch(`https://api.petfinder.com/v2/animals/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log("Risposta API status:", response.status);

    if (response.status === 401) {
      console.log("Token scaduto, rinnovo...");
      accessToken = await getAccessToken(true);

      response = await fetch(`https://api.petfinder.com/v2/animals/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("Risposta API dopo rinnovo token:", response.status);
    }

    const data = await response.json();
    console.log("Dati ricevuti:", data);

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error || 'Errore fetch Petfinder' });
    }

    console.log("Descrizione completa:", data.animal.description);  // <- stampa descrizione

    return res.json(data.animal);
  } catch (err) {
    console.error('Errore server /api/animals/:id:', err.message || err);
    return res.status(500).json({ error: 'Errore interno server' });
  }
});*/
