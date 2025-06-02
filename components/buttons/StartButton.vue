<script lang="ts" setup>
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
</template>
