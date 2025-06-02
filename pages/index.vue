<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as service from "~/services/BeeService";

const hasSavedGame = ref(false);

onMounted(() => {
  hasSavedGame.value = service.hasSavedGame();
});

const resumeGame = () => {
  navigateTo("/hive");
};
</script>

<template>
  <div
    class="bg-white w-screen h-screen flex flex-col justify-center items-center"
  >
    <div class="flex flex-col gap-4 text-center items-center relative">
      <!-- Contenedor del título con abeja -->
      <div class="relative">
        <img
          src="~/assets/images/bee.png"
          alt="Bee"
          class="absolute -left-16 -top-10 w-24 h-24 md:w-36 md:h-36 md:-left-34 md:-top-25 z-10 transform -rotate-12 hover:animate-none"
          :class="{ 'animate-erratic-flight': true }"
        />
        <p class="text-8xl font-bold text-black relative z-20">BeeApp</p>
      </div>

      <!-- Botones -->
      <div class="flex flex-col gap-3 mt-8 md:mt-12">
        <buttonsStartButton></buttonsStartButton>
        <button
          class="btn btn-neutral btn-lg w-48 md:w-64 rounded-md text-lg md:text-xl"
          @click="resumeGame"
          :disabled="!hasSavedGame"
        >
          Resume
        </button>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes erraticFlight {
  0% {
    transform: translate(0, 0) rotate(-12deg) scale(1);
  }
  15% {
    transform: translate(8px, -25px) rotate(-10deg) scale(0.95);
  }
  30% {
    transform: translate(-10px, 15px) rotate(-15deg) scale(1.05);
  }
  45% {
    transform: translate(15px, 10px) rotate(-5deg) scale(0.98);
  }
  60% {
    transform: translate(-5px, -20px) rotate(-18deg) scale(1.02);
  }
  75% {
    transform: translate(20px, 5px) rotate(-8deg) scale(0.97);
  }
  90% {
    transform: translate(-15px, 10px) rotate(-12deg) scale(1.03);
  }
  100% {
    transform: translate(0, 0) rotate(-12deg) scale(1);
  }
}

.animate-erratic-flight {
  animation: erraticFlight 7s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@media (min-width: 768px) {
  @keyframes erraticFlight {
    0% {
      transform: translate(0, 0) rotate(-12deg) scale(1);
    }
    15% {
      transform: translate(25px, -35px) rotate(-10deg) scale(0.95);
    }
    30% {
      transform: translate(-25px, 25px) rotate(-15deg) scale(1.05);
    }
    45% {
      transform: translate(35px, 15px) rotate(-5deg) scale(0.98);
    }
    60% {
      transform: translate(-15px, -30px) rotate(-18deg) scale(1.02);
    }
    75% {
      transform: translate(30px, 10px) rotate(-8deg) scale(0.97);
    }
    90% {
      transform: translate(-25px, 15px) rotate(-12deg) scale(1.03);
    }
    100% {
      transform: translate(0, 0) rotate(-12deg) scale(1);
    }
  }
}
</style>
