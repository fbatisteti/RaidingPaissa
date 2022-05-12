<template>
    <div>
        <button @click="update()">UPDATE</button>
        <button @click="reset()">RESET</button>

        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottomTimeline" aria-controls="offcanvasBottom">Timeline</button>

        <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottomTimeline" aria-labelledby="offcanvasBottomLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasBottomLabel">Timeline controls</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body small">
            <Timeline />
        </div>
        </div>

        <div class="fluid-container xiv">
        ARENA

        <input type="number" placeholder="width" id='arena-x' value=600>
        <input type="number" placeholder="height" id='arena-y' value=600>
        <select class="form-select" id="arena-round">
            <option value='1' selected>Circular</option>
            <option value='0'>Rectangular</option>
        </select>
        <select class="form-select" id="arena-wall">
            <option value="normal" selected>Normal</option>
            <option value="none">No walls</option>
            <option value="death">Death walls</option>
        </select>
        </div>

        <div class="fluid-container xiv">
        BOSS

        <input type="text" placeholder='Paissa boss' id='boss-name' value="Paissa boss">
        <input type="number" placeholder="x" id='boss-x' value=300>
        <input type="number" placeholder="y" id='boss-y' value=300>
        <select class="form-select" id="boss-size">
            <option value='s'>Small</option>
            <option value='m'>Medium</option>
            <option value='l' selected>Large</option>
            <option value='xl'>Extra large</option>
            <option value='g'>Gigantic (does not move)</option>
        </select>
        <select class="form-select" id="boss-omni">
            <option value='0' selected>Positionals</option>
            <option value='1'>Omnidirectional</option>
        </select>
        </div>
    </div>
</template>

<style>
.xiv {
    border: 1px solid black;
}
</style>

<script>
    import Arena from "../classes/Arena"
    import Boss from "../classes/Boss"
    import Timeline from "./Timeline.vue"

    export default {
        name: 'Menu',
        props: { },

        components: {
            Timeline
        },

        mounted() {
           //console.log('Menu mounted');
        },

        data() {
            return {
                x: 600,
                y: 600
            }
        },

        methods: {
            update() {
                //console.log('Getting canvas');
                let canvas = this.focusCanvas('canvas-arena');
                //console.log('Canvas OK:');
                //console.log(canvas);

                //console.log('Creating arena');
                let arena = this.getArenaFromHTML();
                //arena.expose();

                //console.log('Drawing arena...');
                this.drawArena(canvas, arena);
                //console.log(`Arena drawn at (${this.x/2},${this.y/2}) with a radius of ${arena.width/2}`);

                //console.log('Creating boss');
                let boss = this.getBoss();
                //boss.expose();

                //console.log('Drawing arena...');
                this.drawBoss(canvas, boss);
                //console.log(`Boss (${boss.size}) drawn at (${boss.x},${boss.y}) facing ${boss.facing}`);
            },

            reset() {
                console.log('Reseting');
                let canvas = this.focusCanvas('canvas-arena');
                let ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, 600, 600);
                console.log('Reseted');
                console.log('------------------------------');
            },

            getArenaFromHTML() {
                let arena = new Arena(
                    document.getElementById('arena-x').value,
                    document.getElementById('arena-y').value,
                    (document.getElementById('arena-round').value == 1) ? true : false,
                    document.getElementById('arena-wall').value
                );

                return arena;
            },

            getBoss() {
                let x = document.getElementById('boss-x').value;
                let y = document.getElementById('boss-y').value;
                let omni = (document.getElementById('boss-omni').value == 1) ? true : false;

                if (document.getElementById('boss-size').value === 'g') {
                    x = 300;
                    y = 0;
                    omni = true;
                }

                let boss = new Boss(
                    document.getElementById('boss-name').value,
                    document.getElementById('boss-size').value,
                    x,
                    y,
                    omni
                );

                return boss;
            },

            focusCanvas(id) {
                return document.getElementById(id);
            },

            drawArena(canvas, arena) {
                let ctx = canvas.getContext('2d');

                // drawing arena
                ctx.beginPath();
            
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1;

                switch (arena.walls) {
                    case 'death':
                        ctx.strokeStyle = 'orange';
                        ctx.lineWidth = 5;
                        break;
                    case 'none':
                        ctx.setLineDash([2]);
                        break;
                    default: // case 'normal'
                        break;
                }

                (arena.isRound) ?
                ctx.arc(this.x/2, this.y/2, arena.width/2, 0, 2 * Math.PI) :
                ctx.strokeRect((this.x - arena.width)/2, (this.y - arena.height)/2, arena.width, arena.height);

                ctx.closePath();

                // printing arena
                ctx.stroke();
            },

            drawBoss(canvas, boss) {
                let ctx = canvas.getContext('2d');

                // defining image
                var img = new Image();
                img.src = '.\\src\\assets\\boss.png';
                let size = 1.0;

                switch (boss.size) {
                    case 'm':
                        size = 1.5;
                        break;

                    case 'l':
                        size = 3;
                        break;

                    case 'xl':
                        size = 5;
                        break;

                    case 'g':
                        size = 10;
                        break;

                    default: // 's'
                        break;
                }

                // drawing boss
                img.addEventListener('load', function() {                    
                    // icon
                    (boss.size === 'g') ?
                    ctx.drawImage(img,
                                boss.x - (img.width * size)/2, // position x -> centered at top
                                boss.y - (img.height * size)/2, // position y -> centered at top
                                img.width * size, img.height * size
                    ) :
                    ctx.drawImage(img,
                                boss.x - (img.width * size)/2, // position x
                                boss.y - (img.height * size)/2, // position y
                                img.width * size, img.height * size
                    );

                    // target ring
                    ctx.beginPath();

                    ctx.strokeStyle = 'red';
                    ctx.lineWidth = 3;

                    (boss.omni) ?
                    ctx.arc(boss.x, boss.y, 1.1 * (img.width * size)/2, 0, 2 * Math.PI) : // full circle
                    ctx.arc(boss.x, boss.y, 1.1 * (img.width * size)/2, 1.75 * Math.PI, 1.25 * Math.PI)
                    
                    // printing arena
                    ctx.stroke();
                }, false);
            }
        },
    }
</script>

