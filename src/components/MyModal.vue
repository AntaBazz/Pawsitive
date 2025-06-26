<template>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-content shadow rounded">
        <div class="position-relative">
          <img
            v-if="animal && animal.photos && animal.photos.length"
            :src="animal.photos[0].medium || '/images/ImmagineDiSostituzione.jpeg'"
            :alt="animal.name || 'Immagine animale non disponibile'"
            class="animal-img rounded-top"
          />

          <span
            v-if="animal.isUrgent"
            class="badge bg-danger position-absolute top-0 start-0 m-2"
          >
            Urgent
          </span>
        </div>
  
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h6 class="card-title fw-bold">{{ animal.name }}</h6>
            <span class="badge bg-primary">{{ animal.type }}</span>
          </div>
  
          <div class="badge-container mb-3">
            <span class="badge badge-custom small d-inline-block">
              <i class="fa-solid fa-paw me-1"></i>
              {{ animal.breed || animal.breeds?.primary || 'N/A'}}
            </span>

            <span class="badge badge-custom small d-inline-block second-badge">
              <i class="fa-solid fa-venus-mars"></i>
              {{ animal.gender === 'Male' ? 'Maschio' : 'Femmina'}}
            </span>
            <span class="badge badge-custom small d-inline-block badge-location">
              <i class="fa-solid fa-location-dot"></i>
              {{ animal.location || animal.contact?.address?.city + ', ' + animal.contact?.address?.state }}
            </span>
          </div>
  
          <p class="description-full text-muted small">
            {{ animal.description }}
          </p>

  
          <button @click="$emit('close')" class="btn btn-secondary btn-sm mt-3 rounded-pill">
            Close
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "MyModal",
    props: {
      animal: {
        type: Object,
        required: true,
      },
    },
    emits: ["close"],
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    box-sizing: border-box;
    z-index: 1050;
    overflow-y: auto;
  }
  
  .modal-content {
    background-color: white;
    width: 100%;
    max-width: 700px;
    max-height: none;
    border-radius: 0.5rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    overflow: visible;
    display: flex;
    flex-direction: column;
  }
 
  .animal-img {
  width: 100%;
  height: auto; /* Adattamento dinamico all'immagine */
  max-height: 400px; /* Limite massimo per non esagerare */
  object-fit: contain; /* MOSTRA l'intera immagine */
  object-position: center;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  background-color: #f8f9fa;
  display: block;
  margin: 0 auto;
}

  
  .card-body {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-grow: 1;
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
  
  /*.description-full {
  white-space: normal !important;
  overflow: visible !important;
  max-height: none !important;
}*/

.description-full {
  word-break: break-word;
  white-space: pre-line; /* conserva gli \n */
}

.card-body {
  overflow: visible !important;
  max-height: none !important;
}

  </style>
  