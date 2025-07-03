<template>
  <div class="card h-100 shadow-sm overflow-hidden">
    <div class="position-relative">
      <img
        :src="(animal && animal.photos && animal.photos.length) ? animal.photos[0].medium : '/images/ImmagineDiSostituzione.jpeg'"
        :alt="animal.name || 'Immagine animale non disponibile'"
        class="animal-img rounded-top"
      />
    </div>

    <div class="card-body d-flex flex-column">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h6 class="card-title fw-bold">{{ animal.name }}</h6>
        <span class="badge bg-primary" style="border-radius: 1rem; font-weight: normal;">
          {{ animal.type }}
        </span>
      </div>

      <div class="badge-container mb-3">
        <span class="badge-char small d-inline-block">
          <i class="fa-solid fa-paw me-1"></i>
          {{ animal.breeds.primary }}
        </span>

        <span class="badge-char small d-inline-block second-badge">
          <i class="fa-solid fa-venus-mars"></i>
          {{ animal.gender }}
        </span>

        <span class="badge-char small d-inline-block badge-location">
          <i class="fa-solid fa-location-dot"></i>
          {{ animal.contact.address.city }}, {{ animal.contact.address.state }}
        </span>
      </div>

      <p class="card-text description-truncate text-muted small mb-auto">
        {{ animal.description }}
      </p>

      <!-- Bottone link per aprire il profilo esterno -->
      <a
        :href="animal.url"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-warning text-white btn-sm mt-3 rounded-pill"
      >
        Meet {{ animal.name }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardAnimal",
  props: { animal: Object },
};
</script>

<style scoped>
.animal-img {
  width: 100%;
  height: 180px;
  object-fit: contain;
  object-position: center;
  display: block;
  border-radius: 0;
  background-color: #f5f5f5;
}

.card {
  border-radius: 1rem !important;
  overflow: hidden;
}

.badge-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.badge-char {
  background-color: #f8f9fa;
  color: #6c757d;
  white-space: nowrap;
  padding: 0.25em 0.5em;
  border-radius: 1rem;
  font-size: 1rem;
  width: auto;
  height: auto;
  display: inline-block;
  vertical-align: middle;
}
</style>
