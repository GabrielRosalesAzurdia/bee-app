<template>
  <div
    class="bg-white w-screen h-screen flex flex-col justify-center items-center"
  >
    <div class="flex flex-col gap-4 text-center items-center relative">
      <!-- Contenedor del título con abeja -->
      <div class="relative">
        <img
          src="https://img.freepik.com/free-vector/cute-bee-insect-animal_24877-82142.jpg?semt=ais_hybrid&w=740"
          alt="Bee"
          class="absolute -left-16 -top-10 w-24 h-24 md:w-36 md:h-36 md:-left-34 md:-top-25 z-10 transform -rotate-12 hover:animate-none"
          :class="{ 'animate-erratic-flight': true }"
        />
        <p class="text-8xl font-bold text-black relative z-20">BeeApp</p>
      </div>

      <!-- Botones -->
      <div class="flex flex-col gap-3 mt-8 md:mt-12">
        <button
          class="btn btn-neutral btn-lg w-48 md:w-64 rounded-md text-lg md:text-xl"
        >
          Start
        </button>
        <button
          class="btn btn-neutral btn-lg w-48 md:w-64 rounded-md text-lg md:text-xl"
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
  25% {
    transform: translate(5px, -15px) rotate(-15deg) scale(0.98);
  }
  50% {
    transform: translate(-8px, 10px) rotate(-8deg) scale(1.02);
  }
  75% {
    transform: translate(10px, 5px) rotate(-18deg) scale(0.99);
  }
  100% {
    transform: translate(0, 0) rotate(-12deg) scale(1);
  }
}

.animate-erratic-flight {
  animation: erraticFlight 2.5s ease-in-out infinite;
}

@media (min-width: 768px) {
  @keyframes erraticFlight {
    0% {
      transform: translate(0, 0) rotate(-12deg) scale(1);
    }
    25% {
      transform: translate(10px, -20px) rotate(-15deg) scale(0.98);
    }
    50% {
      transform: translate(-15px, 15px) rotate(-8deg) scale(1.02);
    }
    75% {
      transform: translate(20px, 10px) rotate(-18deg) scale(0.99);
    }
    100% {
      transform: translate(0, 0) rotate(-12deg) scale(1);
    }
  }
}
</style>
