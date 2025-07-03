<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <div class="container">



      <a class="navbar-brand d-flex align-items-center" href="#home">
        <i class="fa-solid fa-paw me-2" style="color: #ffc107; background: transparent;"></i>
        Pawsitive
      </a>


      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="#animali">Animals</a></li>
          <li class="nav-item"><a class="nav-link" href="#commenti">Comments</a></li>
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
