<template>
  <section id="animali" class="container my-5">
    
    <div class="text-center mb-4">
      <h2>Our paws</h2>
    </div>

    <div class="d-flex flex-column flex-lg-row gap-4">

      <div class="col-12 col-lg-3 mb-4">
        <div class="card p-3 shadow-sm">
          <h5 class="mb-3">Filter by</h5>

          <div class="mb-2">
            <label class="form-label">Type</label>
            <input v-model="filters.type" type="text" class="form-control" placeholder="Dog, Cat..." />
          </div>
          <div class="mb-2">
            <label class="form-label">Breed</label>
            <input v-model="filters.breed" type="text" class="form-control"
              placeholder="Labrador, Golden Retriever..." />
          </div>
          <div class="mb-2">
            <label class="form-label">Age</label>
            <input v-model="filters.age" type="text" class="form-control" placeholder="Adult, Puppy..." />
          </div>
          <div class="mb-2">
            <label class="form-label">Gender</label>
            <select v-model="filters.gender" class="form-select">
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <button class="btn-filter mt-3 w-100" @click="applyFiltersAndReset">
            Apply filters
          </button>

          <button class="btn-filter mt-3 w-100" @click="resetFilters">
            Reset filters
          </button>
        </div>
      </div>

      <section class="col-12 col-lg-9" style="position: relative;">
        <div class="grid-wrapper" :class="{ 'loading-overlay': loading }">
          <div class="row g-3 fixed-height-grid">

            <template v-if="!loading && animals.length > 0">
              <div class="col-12 col-md-4 d-flex" v-for="animal in animals" :key="animal.id">
                <CardAnimal :animal="animal" class="animal-card flex-fill" />
              </div>

              <div v-for="n in limit - animals.length" :key="'placeholder-' + n" class="col-12 col-md-4 d-flex">
                <div class="animal-card flex-fill invisible"></div>
              </div>
            </template>

            <div v-else-if="!loading && filterError" class="col-12">
              <div class="alert alert-warning text-center w-100">
                Invalid filter: no animals found.
              </div>
            </div>
          </div>
        </div>

        <div v-if="loading" class="loader-overlay text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <!-- PAGINAZIONE -->

        <nav aria-label="Page navigation" class="my-4 d-flex justify-content-center">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }" @click="changePage(currentPage - 1)">
              <a class="page-link" href="#animali">Prev</a>
            </li>

            <li v-if="currentPage > 1" class="page-item" @click="changePage(currentPage - 1)">
              <a class="page-link" href="#animali">{{ currentPage - 1 }}</a>
            </li>

            <li class="page-item active">
              <a class="page-link" href="#animali">{{ currentPage }}</a>
            </li>

            <li v-if="currentPage < totalPages" class="page-item" @click="changePage(currentPage + 1)">
              <a class="page-link" href="#animali">{{ currentPage + 1 }}</a>
            </li>

            <li class="page-item" :class="{ disabled: currentPage === totalPages }"
              @click="changePage(currentPage + 1)">
              <a class="page-link" href="#animali">Next</a>
            </li>
          </ul>
        </nav>
      </section>
    </div>
  </section>
</template>

<script>
import CardAnimal from './CardAnimal.vue';

export default {
  components: { CardAnimal },
  data() {
    return {
      allAnimals: [],
      filteredAnimals: [],
      currentPage: 1,
      totalPages: 1,

      filters: {
        type: '',
        breed: '',
        age: '',
        gender: '',
      },
      limit: 9,
      loading: false,
      filterError: false
    };
  },

  computed: {
    animals() {
      return this.filteredAnimals;
    }
  },

  methods: {
    resetFilters() {
      this.filters = {
        type: '',
        breed: '',
        age: '',
        gender: '',
      };
      this.filterError = false;
      this.applyFiltersAndReset();
    },

    async fetchAnimals() {
      this.loading = true;

      try {
        const params = new URLSearchParams({
          page: this.currentPage,
          limit: this.limit,
          ...this.filters
        });

        const res = await fetch(`http://192.168.1.187:4000/api/animals?${params.toString()}`);
        if (!res.ok) throw new Error('Errore nel fetch degli animali');

        const data = await res.json();

        this.filteredAnimals = data.animals;
        this.totalPages = data.pagination.total_pages;
        this.filterError = data.animals.length === 0;
        this.loading = false;
      } catch (e) {
        console.error(e);
        this.filteredAnimals = [];
        this.filterError = true;
        this.loading = false;
      }
    },

    applyFiltersAndReset() {
      this.currentPage = 1;
      this.fetchAnimals();
    },

    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.fetchAnimals();
      }
    }
  },

  mounted() {
    this.fetchAnimals();
  }
};
</script>

<style scoped>
.btn-filter {
  background-color: #0d6efd;
  color: white;
  text-align: center;
  border: none;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 50rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-filter:hover {
  background-color: #0b5ed7;
}

.fixed-height-grid {
  min-height: 700px;
}

.animal-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.grid-wrapper.loading-overlay {
  opacity: 0.5;
  pointer-events: none;
  transition: opacity 0.3s ease;
  position: relative;
}

.loader-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.pagination {
  border-radius: 0.8rem;
  overflow: hidden;
  border: 1px solid #dee2e6;
  padding: 0;
  margin: 0;
  display: flex;
}

.pagination .page-item {
  border: none;
}

.pagination .page-link {
  border: none !important;
  background-color: transparent;
  border-radius: 0;
  padding: 0.375rem 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}

.pagination .page-item:first-child .page-link {
  border-left: none;
}

.pagination .page-item.active .page-link {
  background-color: #ffc107 !important;
  color: #ffffff;
  border-radius: 0;
}
</style>
