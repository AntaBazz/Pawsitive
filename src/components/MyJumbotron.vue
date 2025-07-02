<template>
  <header class="jumbotron d-flex align-items-center justify-content-center text-center">
    <div class="container">
      <h1 class="display-4">Welcome to Pawsitive</h1>
       <p class="lead">
        Give them a second chance. Here you will find dogs, cats and other animals looking for a family that loves them forever.
        Every adoption is a happy ending story. Start yours today!
      </p> 
      <!-- <a href="#contact" class="btn btn-primary btn-lg">Contattaci</a> -->
    </div>
  </header>
</template>

<script>
export default {
  name: "MyJumbotron",
};
</script>

<style scoped>
.jumbotron {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 768px) {
  .jumbotron {
    padding: 1.5rem 1rem;
  }

  .jumbotron h1 {
    font-size: 2.5rem;
  }

  .jumbotron p {
    font-size: 1.1rem;
  }
}
</style>
