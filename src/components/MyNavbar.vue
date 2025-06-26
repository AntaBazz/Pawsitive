<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <div class="container">
    
      <a class="navbar-brand" href="#home">Pawsitive</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <!--<li class="nav-item"><a class="nav-link" href="#services">Servizi</a></li>
          <li class="nav-item"><a class="nav-link" href="#portfolio">Portfolio</a></li>-->
          <li class="nav-item"><a class="nav-link" href="#animali">Animali</a></li>
          <!--<li class="nav-item"><a class="nav-link" href="#about">Chi Siamo</a></li>
          <li class="nav-item"><a class="nav-link" href="#team">Team</a></li> -->
          <li class="nav-item"><a class="nav-link" href="#commenti">Commenti</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "MyNavbar",
};
</script>
