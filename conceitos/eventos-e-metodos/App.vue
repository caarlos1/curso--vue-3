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
        currentTask: "",
        showList: false,
        tasks: [
            { name: "Fazer o curso de Vue.js 3.", isDone: false },
            { name: "Tomar um banho.", isDone: false },
            { name: "Ir no mercado.", isDone: false },
        ],
    }),
    methods: {
        addTask() {
            if (this.currentTask) {
                this.tasks.push({
                    name: this.currentTask,
                    isDone: false,
                });
                this.currentTask = "";
            }
        },
        remove(task) {
            this.tasks = this.tasks.filter((el) => el != task);
        },
        complete(task) {
            this.tasks = this.tasks.map((t) => {
                if (t.name == task.name) return { ...t, isDone: !t.isDone };
                else return { ...t };
            });
        },
        handleShowHideList() {
            this.showList = !this.showList;
        },
    },
};
</script>

<template>
    <div>
        <h1>Minha lista de Tarefas</h1>

        <ul v-if="showList">
            <li
                v-for="(task, index) in tasks"
                :key="`${task}-${index}`"
                @dblclick="complete(task)"
                class="task-item"
                :class="{ 'line-through': task.isDone }"
            >
                {{ task.name }}
                <button @click="remove(task)">&times;</button>
            </li>
        </ul>

        <button @click="handleShowHideList()">Ver lista!</button>

        <p>Digite uma Tarefa:</p>
        <input
            @keyup.enter="addTask()"
            type="text"
            v-focus
            v-model="currentTask"
        />
        <button @click="addTask()">Adicionar Tarefa!</button>
    </div>
</template>

<style scoped>
.line-through {
    text-decoration: line-through;
}
.task-item {
    cursor: pointer;
}
</style>
