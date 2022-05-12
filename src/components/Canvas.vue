<template>
  <div>
    <canvas :id="id" :width="width" :height="height" style="border: 1px solid black;">
      [Your browser does not support HTML canvas]
    </canvas>
  </div>
</template>

<style>

</style>

<script >
    export default {
        name: 'Canvas',

        props: {
            id: {
                type: String,
                default: 'canvas-arena'
            },
            width: {
                type: Number,
                default: 600
            },
            height: {
                type: Number,
                default: 600
            },
        },

        mounted() {
           //console.log('Canvas mounted');
       }
    }
</script>
