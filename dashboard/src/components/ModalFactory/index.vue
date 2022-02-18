<template>
  <teleport to="body">
    <div
      v-if="state.isActive"
      @click="handleModalToogle({ status: false })"
      class="flex fixed z-50 top-0 left-0 items-center justify-center w-full h-full bg-black bg-opacity-50"
    >
      <div
        class="fixed mx-10"
        :class="state.width"
        @click.stop
      >
        <div
          class="flex flex-col overflow-hidden bg-white rounded-lg animate__animated animate__fadeInDown animate__faster"
        >
          <div class="flex flex-col px-12 py-10 bg-white">
            <component
              :is="state.component"
              v-bind="state.props"
            >
            </component>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import {
  reactive,
  onMounted,
  onBeforeUnmount,
  defineAsyncComponent
} from 'vue'

import useModal from '../../hooks/useModal'

const ModalLogin = defineAsyncComponent({
  loader: () => import('../ModalLogin')
})

const ModalCreateAccount = defineAsyncComponent({
  loader: () => import('../ModalCreateAccount')
})

const DEFAULT_WIDTH = 'w-3/4 lg:w-1/3'

export default {
  components: {
    ModalLogin,
    ModalCreateAccount
  },

  setup() {
    const modal = useModal()

    const state = reactive({
      isActive: false,
      component: {},
      props: {},
      width: DEFAULT_WIDTH
    })

    onMounted(() => {
      modal.listen(handleModalToogle) // liga
    })

    onBeforeUnmount(() => {
      modal.off(handleModalToogle) // desliga
    })

    // Função que monta o modal
    function handleModalToogle(payload) {
      if (payload.status) {
        state.component = payload.component
        state.props = payload.props
        state.width = payload.width ?? DEFAULT_WIDTH
      } else {
        state.component = {}
        state.props = {}
        state.width = DEFAULT_WIDTH
      }

      state.isActive = payload.status
    }

    return {
      state,
      handleModalToogle
    }
  }
}
</script>

<style></style>
