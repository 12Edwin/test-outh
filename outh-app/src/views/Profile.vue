<template>
  <div class="shape">
    <div v-if="!isLoading" class="content">
      <div class="content-body">
        <h1>Profile</h1>
        <p>Bienvenido</p>
        <p><b> {{ profileInfo.name }} </b></p>
        <div class="picture">
          <img :src="profileInfo.picture" alt="Foto de perfil">
        </div>
        <span class="fw-bolder mt-4">{{ profileInfo.email }}</span>
      </div>
      <BButton @click="logout" variant="outline-danger">Cerrar sesión</BButton>
    </div>
  </div>
</template>

<script>

import {getProfile} from "@/service/outh-service";

export default {
  name: 'Profile',

  data() {
    return {
      profileInfo: null,
      isLoading: true
    }
  },
  mounted() {
    this.getProfile();
  },
  methods: {
    async getProfile() {
      this.isLoading = true;
      this.profileInfo = await getProfile();
      this.isLoading = false;
    },

    logout(){
      localStorage.removeItem('token');
      this.$router.push({name: 'login'});
    }
  }
}

</script>

<style scoped>
.shape {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;

}

.content {
  width: 40%;
  min-height: 65vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #33ccff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 0 50px rgba(51, 204, 255, 1);
}

.content-body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.picture {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-top: 20px;
}

</style>