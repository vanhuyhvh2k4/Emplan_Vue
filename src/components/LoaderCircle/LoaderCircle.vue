<template>
  <div
    class="absolute top-0 right-0 bottom-0 left-0 grid place-items-center bg-background z-50"
  >
    <span :class="$style.loader"></span>
  </div>
</template>

<script>
  export default {
    name: "LoaderCircle",
  };
</script>

<style lang="scss" module>
  .loader {
    width: 48px;
    height: 48px;
    border: 5px dotted #333;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    animation: rotation 2s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
