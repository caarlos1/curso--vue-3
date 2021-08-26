<script>
// Criando uma diretiva.
const focus = {
    inserted: (el) => {
        el.focus();
    },
};

export default {
    directives: { focus },
    data: () => ({
        showList: false,
        tasks: [
            { name: "Fazer o curso de Vue.js 3.", isDone: false },
            { name: "Tomar um banho.", isDone: false },
            { name: "Ir no mercado.", isDone: false },
        ],
    }),
};
</script>

<template>
    <div>
        <h1>Minha lista de Tarefas</h1>

        <ul v-if="showList">
            <li v-for="(task, index) in tasks" :key="`${task}-${index}`">
                {{ task.name }}
            </li>
        </ul>
        <button @click="() => { showList = !showList}">Ver lista escondida!</button>

        <p>Olha o foco...</p>
        <input type="text" v-focus />
    </div>
</template>
