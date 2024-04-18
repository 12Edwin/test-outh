<template>
  <div class="shape">
    <div class="login">
      <div class="head">
        <div class="w-100">
          <h1>OAUTH-TEST</h1>
          <p>Iniciar sesión con Google</p>
        </div>
        <div class="w-50">
          <img alt="Google" class="img-fluid" src="@/assets/google.jpg">
        </div>
      </div>
      <BButton variant="outline-info" @click="login"> <BIcon class="spinner" v-if="isLoading" icon="check-circle"/> Iniciar sesión</BButton>
    </div>
  </div>
</template>

<script>
import {getAccessToken, oauthService} from "@/service/outh-service";

export default {
  name: 'Login',
  data() {
    return {
      isLoading: false
    }
  },

  methods: {
    async login() {
      await oauthService();
    },
    async getToken(code) {
      const result = await getAccessToken(code);
      if (result) {
        this.$router.push({name: 'profile'});
      }
    }
  },

  created() {
    if (window.location.search.includes('code')) {
      const code = new URLSearchParams(window.location.search).get('code');
      this.getToken(code)
    }
  },

  beforeCreate() {
    if (localStorage.getItem('token')) {
      this.isLoading = true;
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

.head {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login {
  color: #33ccff;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  min-height: 40vh;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: neon 2s linear infinite;
  border: 2px solid #33ccff;
  box-shadow: 0 0 25px rgba(0, 0, 0, .1);
}

@keyframes neon {
  0% {
    box-shadow: 0 0 5px #33ccff, 0 0 25px #33ccff, 0 0 50px #33ccff, 0 0 200px #33ccff;
  }
  50% {
    box-shadow: 0 0 10px #ff00cc, 0 0 20px #ff00cc, 0 0 30px #ff00cc, 0 0 40px #ff00cc;
  }
  100% {
    box-shadow: 0 0 5px #33ccff, 0 0 25px #33ccff, 0 0 50px #33ccff, 0 0 200px #33ccff;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.spinner {
  animation: spin 2s linear infinite;
}

</style>