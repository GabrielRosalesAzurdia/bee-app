<script lang="ts" setup>
import { ref } from "vue";
import * as service from "~/services/BeeService";
import { useRouter } from "vue-router";

const toast = useToast();
const router = useRouter();

const { data: items } = await service.getBees();
const beelist = items?.value || [];

// Form state
const fromValue = ref<number | null>(null);
const toValue = ref<number | null>(null);

const validateRange = () => {
  const display = document.querySelector(".total-display");
  if (display) display.textContent = "0";

  if (fromValue.value === null || toValue.value === null) {
    return;
  }

  if (fromValue.value > toValue.value) {
    return;
  }

  if (fromValue.value < 1 || toValue.value < 1) {
    return;
  }

  if (toValue.value > beelist.length) {
    return;
  }

  // Update total display
  const total = toValue.value - fromValue.value + 1;
  if (display) display.textContent = total.toString();
};

// Handle form submission
const handleSubmit = async () => {
  if (fromValue.value === null || toValue.value === null) {
    toast.error({ title: "Please fill both fields" });
    return;
  }

  if (fromValue.value > toValue.value) {
    toast.error({ title: "Invalid range: Start > End" });
    return;
  }

  if (fromValue.value < 1 || toValue.value < 1) {
    toast.error({ title: "Numbers must be at least 1" });
    return;
  }

  if (fromValue.value === toValue.value) {
    toast.error({ title: "Numbers cannot be equal" });
    return;
  }

  if (toValue.value > beelist.length) {
    toast.error({ title: `End number cannot exceed ${beelist.length}` });
    return;
  }

  // Valid submission
  const selectedCount = toValue.value - fromValue.value + 1;
  toast.success({ title: `Selected ${selectedCount} words!` });

  // Generate randomized word list
  const shuffledWords = await service.generateGame(
    beelist,
    fromValue.value,
    toValue.value
  );

  // Save to localStorage
  service.saveGameState(shuffledWords, 0);

  // Navigate to hive page
  router.push("/hive");
};
</script>

<template>
  <button
    class="btn btn-neutral btn-lg w-48 md:w-64 rounded-md text-lg md:text-xl"
    onclick="start_modal.showModal()"
  >
    Start
  </button>

  <dialog id="start_modal" class="modal" v-if="items">
    <div class="modal-box dark:bg-white dark:text-black">
      <h3 class="text-2xl font-bold">Select Beehive Size</h3>
      <div class="text-left">
        <p class="text-left pt-5 pb-5">
          {{ "Type a number between 1 to " + items.length }}
        </p>
        <fieldset class="fieldset">
          <label class="label">From</label>
          <input
            type="number"
            class="input"
            placeholder="0"
            v-model.number="fromValue"
            @input="validateRange"
            min="1"
            :max="items.length"
          />

          <label class="label">To</label>
          <input
            type="number"
            class="input"
            placeholder="0"
            v-model.number="toValue"
            @input="validateRange"
            min="1"
            :max="items.length"
          />

          <p class="label">Total selected words:</p>
          <p class="total-display font-bold text-center">0</p>

          <button class="btn btn-neutral mt-4" @click="handleSubmit">ok</button>
        </fieldset>
      </div>

      <div class="modal-action">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
