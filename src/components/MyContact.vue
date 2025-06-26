<template>
  <section id="contact" class="py-5 bg-white">
    <div class="container">
      <h2 class="mb-4 text-center">Contattaci</h2>
      <form>
        <div class="mb-3">
          <label for="name" class="form-label">Nome</label>
          <input type="text" id="name" class="form-control" placeholder="Il tuo nome" />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" class="form-control" placeholder="La tua email" />
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">Messaggio</label>
          <textarea id="message" rows="5" class="form-control" placeholder="Scrivi qui..."></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Invia</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "MyContact",
};
</script>
