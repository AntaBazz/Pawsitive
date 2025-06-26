<template>
  <div class="card h-100 shadow-sm rounded overflow-hidden">
    <div class="position-relative">
      <img
        :src="(animal && animal.photos && animal.photos.length) ? animal.photos[0].medium : '/images/ImmagineDiSostituzione.jpeg'"
        :alt="animal.name || 'Immagine animale non disponibile'" class="animal-img rounded-top" />

      <!-- Cuore -->
      <!-- <button
        @click="toggleFavorite"
        class="btn btn-light d-flex justify-content-center align-items-center position-absolute top-0 end-0 m-2 rounded-circle p-0"
        style="width: 40px; height: 40px; line-height: 0;">
        <i
          class="fa-heart"
          :class="isFavorited ? 'fas text-danger' : 'far text-muted'"
          style="font-size: 18px;"
        ></i>
      </button> -->


    </div>

    <div class="card-body d-flex flex-column">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h6 class="card-title fw-bold">{{ animal.name }}</h6>
        <span class="badge bg-primary">{{ animal.type }}</span>
      </div>

      <div class="badge-container mb-3">
        <span class="badge-custom small d-inline-block">
          <i class="fa-solid fa-paw me-1"></i>
          {{ animal.breeds.primary }}
        </span>

        <span class="badge-custom small d-inline-block second-badge">
          <i class="fa-solid fa-venus-mars"></i>
          {{ animal.gender }}
        </span>
        <span class="badge-custom small d-inline-block badge-location">
          <i class="fa-solid fa-location-dot"></i>
          {{ animal.contact.address.city }}, {{ animal.contact.address.state }}
        </span>
      </div>

      <p class="card-text description-truncate text-muted small mb-auto">
        {{ animal.description }}
      </p>

      <!--BOTTONE MEET CHE PORTA ALLA MODALE-->
      <!--<button @click="loadFullAnimal" class="btn btn-warning text-white btn-sm mt-3 rounded-pill">
        Meet {{ animal.name }}
      </button>-->

      <!--BOTTONE MEET CHE PORTA AL LINK-->
      <a :href="animal.url" target="_blank" rel="noopener noreferrer"
        class="btn btn-warning text-white btn-sm mt-3 rounded-pill">
        Meet {{ animal.name }}
      </a>



    </div>

    <MyModal v-if="showModal" :animal="fullAnimal || animal" @close="closeModal" />
  </div>
</template>

<script>
import MyModal from './MyModal.vue';

export default {
  name: "CardAnimal",
  components: { MyModal },
  props: { animal: Object },
  data() {
    return {
      isFavorited: false,
      showModal: false,
      fullAnimal: null,
      accessToken: null,
      tokenExpiry: null,
    };
  },
  methods: {
    /*
    async getAccessToken(forceRefresh = false) {
      if (!forceRefresh && this.accessToken && Date.now() < this.tokenExpiry) {
        return this.accessToken;
      }

      try {
        const res = await fetch("https://api.petfinder.com/v2/oauth2/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: import.meta.env.VITE_PETFINDER_KEY,
            client_secret: import.meta.env.VITE_PETFINDER_SECRET,
          }),
        });
        const data = await res.json();

        if (data.access_token) {
          this.accessToken = data.access_token;
          this.tokenExpiry = Date.now() + data.expires_in * 1000;
          return this.accessToken;
        } else {
          console.error("Token non ricevuto:", data);
          return null;
        }
      } catch (err) {
        console.error("Errore nel recupero del token:", err);
        return null;
      }
    },*/

    async loadFullAnimal() {
      try {
        // Chiamata all'API locale con l'ID dell'animale
        //console.log("to mare vacca",  this.animal.id);
        const res = await fetch(`http://localhost:4000/api/oneanimal/${this.animal.id}`); //api "descrittiva"

        if (!res.ok) {
          throw new Error(`Errore nel fetch: ${res.statusText}`);
        }

        const data = await res.json();

        console.log("Descrizione fetch completa:", data.description);
        console.log("Lunghezza descrizione ricevuta:", data.description.length); // <-- qui!



        // Salvo i dati completi ricevuti
        this.fullAnimal = data;
        console.log(data);
        // Apro la modale
        this.showModal = true;
      } catch (error) {
        console.error("Errore caricamento dati animali:", error);
        // Se fallisce, puoi comunque aprire la modale con i dati base
        this.fullAnimal = null;
        this.showModal = true;
      }

    },

    /*toggleFavorite() {
      this.isFavorited = !this.isFavorited;
    },*/

    closeModal() {
      this.showModal = false;
      this.fullAnimal = null;
    }
  },
};
</script>

<style>
.animal-img {
  width: 100%;
  height: 180px;
  object-fit: contain;
  /* mostra tutta l'immagine intera */
  object-position: center;
  display: block;
  border-radius: 0;
  /* niente arrotondamenti sull’immagine */
  background-color: #f5f5f5;
  /* opzionale: per "riempire" lo spazio vuoto */
}

.card {
  border-radius: 0.5rem;
  overflow: hidden;
  /* taglia tutto ciò che esce dagli angoli arrotondati */
}

.badge-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.badge-custom {
  background-color: #f8f9fa;
  color: #6c757d;
  white-space: nowrap;
  padding: 0.25em 0.5em;
  border-radius: 0.25rem;
  font-size: 0.8rem;
}

.second-badge {
  display: inline-block;
  margin-top: 0.25rem;
  clear: left;
}

.badge-location {
  background-color: #f8f9fa;
  color: #6c757d;
  white-space: nowrap;
  padding: 0.25em 0.5em;
}
</style>
