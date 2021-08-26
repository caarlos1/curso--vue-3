<template>
    <div>
        <h1>Olazinho {{ name }}!</h1>
        <input type="text" v-model="name" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "Carlos",
        };
    },
};
</script>

<style></style>
