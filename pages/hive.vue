<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type { Bee } from "~/entities/bee";
import * as service from "~/services/BeeService";

// Game state
const words = ref<Bee[]>([]);
const currentIndex = ref(0);
const currentWord = ref("");

// Navigation functions
const goNext = () => {
  if (currentIndex.value < words.value.length - 1) {
    currentIndex.value++;
    updateCurrentWord();
    saveGameState();
  }
};

const goPrev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    updateCurrentWord();
    saveGameState();
  }
};

const updateCurrentWord = () => {
  currentWord.value = words.value[currentIndex.value]?.word || "";
};

const saveGameState = () => {
  service.saveGameState(words.value, currentIndex.value);
};

// Load game state
onMounted(() => {
  const gameState = service.getGameState();
  if (gameState) {
    words.value = gameState.words;
    currentIndex.value = gameState.currentIndex;
    updateCurrentWord();
  } else {
    // Redirect to home if no game state
    navigateTo("/");
  }
});
</script>

<template>
  <div
    class="bg-white w-screen h-screen flex flex-col justify-center items-center"
  >
    <div
      class="text-8xl font-bold mb-8 flex items-center justify-center dark:text-black"
    >
      {{ currentWord }}
    </div>

    <div class="navigation flex justify-center gap-4">
      <button
        class="btn btn-neutral w-32"
        @click="goPrev"
        :disabled="currentIndex === 0"
      >
        ←
      </button>
      <button
        class="btn btn-neutral w-32"
        @click="goNext"
        :disabled="currentIndex === words.length - 1"
      >
        →
      </button>
    </div>

    <div class="mt-8 text-center">
      <button
        class="btn btn-error"
        @click="
          service.clearGameState();
          navigateTo('/');
        "
      >
        X
      </button>
    </div>
  </div>
</template>
