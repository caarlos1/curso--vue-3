<script>
import { onMounted } from "vue";

export default {
    setup() {
        onMounted(() => {
            console.log("Foi montado o composition API.");
        });
    },
    mounted() {
        console.log("Foi montado o options API.");
    },
};
</script>

<template>
    <div>
        <h1>Lifecycle Hooks</h1>
    </div>
</template>
