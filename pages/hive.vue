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
  <div class="hive-container p-4">
    <div
      class="word-display text-5xl font-bold mb-8 min-h-[100px] flex items-center justify-center"
    >
      {{ currentWord }}
    </div>

    <div class="progress text-center mb-6">
      Word {{ currentIndex + 1 }} of {{ words.length }}
    </div>

    <div class="navigation flex justify-center gap-4">
      <button
        class="btn btn-neutral w-32"
        @click="goPrev"
        :disabled="currentIndex === 0"
      >
        ← Previous
      </button>
      <button
        class="btn btn-neutral w-32"
        @click="goNext"
        :disabled="currentIndex === words.length - 1"
      >
        Next →
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
        End Game
      </button>
    </div>
  </div>
</template>

<style scoped>
.word-display {
  min-height: 120px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
