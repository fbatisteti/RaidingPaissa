<template>
  <div>

    <Canvas />

    <Menu />

  </div>
</template>

<style>

</style>

<script>
  import Canvas from "./components/Canvas.vue"
  import Menu from "./components/Menu.vue"
  
  export default {
    components: {
      Canvas, 
      Menu
    }
  }

</script>