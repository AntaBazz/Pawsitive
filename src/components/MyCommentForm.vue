<template>
  <div class="comment-section d-flex flex-column align-items-center" id="comment">
    <h2 id ="commenti" class="mb-4">Lasciaci un commento</h2>

    <!-- Alert messaggi -->
    <div
      v-if="alertMessage"
      :class="['alert', 'w-100', 'text-center', `alert-${alertType}`]"
      style="max-width: 900px;"
    >
      {{ alertMessage }}
    </div>

    <!-- Form per inserire commento -->
    <form
      @submit.prevent="submitComment"
      class="w-100 mt-4"
      style="max-width: 900px;"
    >
      <input
        v-model="newAuthor"
        type="text"
        class="form-control mb-3"
        placeholder="Il tuo nome"
        required
      />
      <textarea
        v-model="newText"
        class="form-control mb-3"
        rows="3"
        placeholder="Il tuo commento"
        required
      ></textarea>
      <div class="d-flex justify-content-center">
        <button
          type="submit"
          class="btn btn-warning text-white btn-sm mt-3 rounded-pill px-4 py-2"
        >
          Invia commento
        </button>
      </div>
    </form>

      <!-- Titolo sopra i commenti -->
      <h3
      v-if="internalComments.length"
      class="mt-5 mb-3"
      style="max-width: 900px;"
    >
      Commenti precedenti
    </h3>

    <!-- Lista commenti visibili -->
    <div
      v-for="(comment, index) in visibleComments"
      :key="comment.id || index"
      class="comment w-100 mb-3 p-3 shadow-sm rounded"
      style="max-width: 600px;"
    >
      <div class="d-flex justify-content-between align-items-center mb-2">
        <strong>{{ comment.author }}</strong>
        <small class="text-muted">{{ comment.date }}</small>
      </div>
      <p class="mb-0">{{ comment.text }}</p>
    </div>

    <!-- Bottone carica più -->
    <button
  v-if="internalComments.length > visibleCount"
  @click="loadMoreComments"
  class="btn btn-warning text-white btn-sm mt-3 rounded-pill px-4 py-2"
  :disabled="loading"
>
  Carica più commenti
  <span
    v-if="loading"
    class="spinner-border spinner-border-sm ms-2"
    role="status"
    aria-hidden="true"
  ></span>
</button>

  </div>
</template>

<script>
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

export default {
  name: "MyCommentForm",
  data() {
    return {
      visibleCount: 5,
      loading: false,
      newAuthor: "",
      newText: "",
      internalComments: [],
      alertMessage: "",
      alertType: "success",
    };
  },
  computed: {
    visibleComments() {
      return this.internalComments.slice(0, this.visibleCount);
    },
  },
  mounted() {
    const q = query(collection(db, "comments"), orderBy("date", "desc"));
    onSnapshot(q, (snapshot) => {
      this.internalComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  },
  methods: {
    loadMoreComments() {
      this.loading = true;
      setTimeout(() => {
        this.visibleCount += 5;
        this.loading = false;
      }, 500);
    },
    async submitComment() {
      const newComment = {
        author: this.newAuthor.trim(),
        text: this.newText.trim(),
        date: new Date().toISOString().slice(0, 10),
      };
      if (newComment.author && newComment.text) {
        try {
          await addDoc(collection(db, "comments"), newComment);
          this.alertMessage = "Commento inviato con successo!";
          this.alertType = "success";
          this.newAuthor = "";
          this.newText = "";
        } catch (error) {
          console.error("Errore nel salvataggio:", error);
          this.alertMessage = "Errore durante l'invio del commento.";
          this.alertType = "danger";
        }
        setTimeout(() => {
          this.alertMessage = "";
        }, 3000);
      }
    },
  },
};
</script>

<style scoped>
.comment-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
}

.comment {
  background-color: #fff;
  box-shadow: 0 0 8px rgb(0 0 0 / 0.1);
}

.form-control {
  font-size: 1rem;
}

.spinner-border {
  vertical-align: middle;
}

#commenti {
  padding-top: 80px;
  margin-top: -80px;
}
</style>
