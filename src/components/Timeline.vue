<template>
    <div class="xiv">
        <button @click="newTimeline">New</button>
        <button @click="exposeTimeline">Expose</button>
        <button>Start</button>
        <button>Play</button>
        <button>Pause</button>
        <button>End</button>

        <input type="number" placeholder="duration" id='timelineSize' value=10>

        <h6>Curent frame: {{ cursor }}</h6>

        <hr>

        <label for="timelineSlider" class="form-label">Encounter Timeline</label>
        <input type="range" class="form-range" :min="start" :max="end" id="timelineSlider" @change="changeFrame">
    </div>
</template>

<style>
.xiv {
    border: 1px solid black;
}
</style>

<script>
    import Timeline from "../classes/Timeline"

    export default {
        name: "Timeline",

        data() {
            return {
                start: 0,
                end: 10, // s
                cursor: 0
            }
        },

        mounted() {
           this.timeline = new Timeline(1);
        },

        methods: {
            newTimeline() {
                this.timeline = new Timeline(document.getElementById("timelineSize").value);
            },

            exposeTimeline() {
                //console.log(this.timeline);
                this.timeline.expose();
            },

            changeFrame() {
                this.cursor = document.getElementById("timelineSlider").value;
            }
        }
    }
</script>
