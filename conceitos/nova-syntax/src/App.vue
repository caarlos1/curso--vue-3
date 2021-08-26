<script>
import { reactive } from "vue";

const focus = {
    inserted: (el) => {
        el.focus();
    },
};

export default {
    directives: { focus },
    setup() {
        // reactive({}) torna a constante reativa.
        const state = reactive({
            currentTask: "",
            showList: false,
            tasks: [
                { name: "Fazer o curso de Vue.js 3.", isDone: false },
                { name: "Tomar um banho.", isDone: false },
                { name: "Ir no mercado.", isDone: false },
            ],
        });

        function addTask() {
            if (state.currentTask) {
                state.tasks.push({
                    name: state.currentTask,
                    isDone: false,
                });
                state.currentTask = "";
            }
        }

        function remove(task) {
            state.tasks = state.tasks.filter((el) => el != task);
        }

        function complete(task) {
            state.tasks = state.tasks.map((t) => {
                if (t.name == task.name) return { ...t, isDone: !t.isDone };
                else return { ...t };
            });
        }

        function handleShowHideList() {
            state.showList = !state.showList;
        }

        return { state, addTask, remove, complete, handleShowHideList };
    },
};
</script>

<template>
    <div>
        <h1>Minha lista de Tarefas</h1>

        <ul v-if="state.showList">
            <li
                v-for="(task, index) in state.tasks"
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
            v-model="state.currentTask"
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
