import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importa Firebase (solo per inizializzarlo)
import './firebase'; // <-- Non serve destrutturare se non usi direttamente moduli qui

createApp(App).mount('#app')