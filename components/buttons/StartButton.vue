<!-- <script lang="ts" setup>
const toast = useToast();

toast.success({
  title: "Success!",
  message: "Your action was completed successfully.",
});
import * as service from "~/services/BeeService";

const { data: items } = service.getBees();
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
          <input type="number" class="input" placeholder="0" />
          <label class="label">To</label>
          <input type="number" class="input" placeholder="0" />
          <p class="label">Total selected words:</p>
          <button class="btn btn-neutral mt-4">ok</button>
        </fieldset>
      </div>

      <div class="modal-action">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template> -->

<script lang="ts" setup>
import { ref } from "vue";
import * as service from "~/services/BeeService";

const toast = useToast();
const { data: items } = await service.getBees();
const beelist = items?.value;

// Form state
const fromValue = ref<number | null>(null);
const toValue = ref<number | null>(null);

const validateRange = () => {
  document.querySelector(".total-display")!.textContent = "0";

  if (fromValue.value === null || toValue.value === null) {
    return;
  }

  if (fromValue.value > toValue.value) {
    return;
  }

  if (fromValue.value < 1 || toValue.value < 1) {
    return;
  }

  if (toValue.value > (beelist?.length || 0)) {
    return;
  }

  // Update total display
  const total = toValue.value - fromValue.value + 1;
  document.querySelector(".total-display")!.textContent = total.toString();
};

// Handle form submission
const handleSubmit = () => {
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

  if (fromValue.value == toValue.value) {
    toast.error({ title: "Numbers can not be equal" });
    return;
  }

  if (toValue.value > (beelist?.length || 0)) {
    toast.error({ title: `End number cannot exceed ${beelist?.length}` });
    return;
  }

  const totalWords = beelist?.length || 0;
  if (toValue.value > totalWords) {
    toast.error({
      title: `End number exceeds available words (max: ${totalWords})`,
    });
    return;
  }

  // Valid submission
  const selectedCount = toValue.value - fromValue.value + 1;
  toast.success({ title: `Selected ${selectedCount} words!` });

  // Proceed with your game logic here
  console.log("Valid selection:", fromValue.value, "to", toValue.value);
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
