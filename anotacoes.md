## Padrões de Projetos

### Modal Factory ou Component Factory

A ideia é que se monte um componente a partir das informações passados pra factory.

No Vue.js 2 era utilizado uma lib chamado Vue Portal que é responsável por teletransportar 
códigos na view. Por exemplo: Tenho um componente dentro de um botão e ao clicar nele, ele 
será teletransportado para alguma parte do painel.

No Vue.js 3 é algo nativo, utilzando a tag teleport

    <teleport to="body"></teleport>

components/ModalFactory


### Event Bus like Service

No Vue.js 3 foi retirado o event emmiter root (verificar essa informação),
porem no lugar dele podemos  utilizar o tiny-emitter.

A idéia é criar um serviço que usa os eventos para comunicação.

### Injetando Componentes

    <component :is="ComponentName"> </component>


## Bibliotecas Interessantes

- tiny-emitter - Pequena biblioteca para trabalhar com eventos.
- vee-validate - Biblioteca de validações