<template>
  <div class="container">
    <div class="row" style="margin-top: 10%">
      <div class="col" align="center">
        <h1>Esta página no está disponible</h1>
      </div>
    </div>
    <div class="row">
      <div class="col" align="center">
        <img width="600" src="/assets/media/svg/general/404.svg" alt="" />
      </div>
      <button class="btn btn-primary" @click="goBack()">Volver</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goBack = () => {
  window.location.assign("/admin/dashboard");
};
</script>

<style>
</style>