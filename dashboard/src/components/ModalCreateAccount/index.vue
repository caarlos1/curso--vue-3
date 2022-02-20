<template>
  <div>
    <div class="flex justify-between">
      <h1 class="text-4xl font-black text-gray-800">
        Crie uma conta
      </h1>
      <button
        class="text-4xl text-gray-600 focus:outline-none"
        @click="close"
      >
        &times;
      </button>
    </div>
    <div class="mt-16">
      <form @submit.prevent="handleSubmit">
        <label class="block">
          <span class="text-lg font-medium text-gray-800"
            >Nome</span
          >
          <input
            v-model="state.name.value"
            class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
            :class="{
              'border-brand-danger': !!state.name
                .errorMessage
            }"
            type="text"
            placeholder="John Doe"
          />
          <span
            v-if="!!state.name.errorMessage"
            class="block font-medium text-brand-danger"
          >
            {{ state.name.errorMessage }}
          </span>
        </label>

        <label class="block mt-9">
          <span class="text-lg font-medium text-gray-800"
            >Email</span
          >
          <input
            v-model="state.email.value"
            class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
            :class="{
              'border-brand-danger': !!state.email
                .errorMessage
            }"
            type="email"
            placeholder="carl.os@mail.com"
          />
          <span
            v-if="!!state.email.errorMessage"
            class="block font-medium text-brand-danger"
          >
            {{ state.email.errorMessage }}
          </span>
        </label>

        <label class="block mt-9">
          <span class="text-lg font-medium text-gray-800"
            >Senha</span
          >
          <input
            v-model="state.password.value"
            class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
            :class="{
              'border-brand-danger': !!state.password
                .errorMessage
            }"
            type="password"
          />
          <span
            v-if="!!state.password.errorMessage"
            class="block font-medium text-brand-danger"
          >
            {{ state.password.errorMessage }}
          </span>
        </label>

        <button
          class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
          :class="{
            'opacity-50': state.isLoading
          }"
          :disabled="state.isLoading"
          type="submit"
        >
          <icon
            v-if="state.isLoading"
            name="loading"
            size="30"
            class="animate-spin"
          />
          <span v-else>Criar Conta</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useField } from 'vee-validate'
import useModal from '../../hooks/useModal'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import Icon from '../Icon'

import {
  validateEmptyAndLength3,
  validateEmptyAndEmail
} from '../../utils/validators'
import services from '../../services/'

export default {
  components: {
    Icon
  },

  setup() {
    const modal = useModal()
    const router = useRouter()
    const toast = useToast()

    const {
      value: nameValue,
      errorMessage: nameErrorMessage
    } = useField('name', validateEmptyAndLength3)

    const {
      value: emailValue,
      errorMessage: emailErrorMessage
    } = useField('email', validateEmptyAndEmail)

    const {
      value: passwordValue,
      errorMessage: passwordErrorMessage
    } = useField('password', validateEmptyAndLength3)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      name: {
        value: nameValue,
        errorMessage: nameErrorMessage
      },
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    const login = async ({ email, password }) => {
      try {
        const { data } = await services.auth.login({
          email,
          password
        })

        window.localStorage.setItem('token', data.token)
        router.push({ name: 'Feedbacks' })
      } catch (error) {
        console.err(error)
        throw error
      }
    }

    const handleSubmit = async () => {
      try {
        toast.clear()
        state.isLoading = true

        await services.auth.register({
          name: state.name.value,
          email: state.email.value,
          password: state.password.value
        })

        toast.success('Cadastro bem sucedido!')

        await login({
          email: state.email.value,
          password: state.password.value
        })

        state.isLoading = false
        modal.close()
        // ...
      } catch (error) {
        state.isLoading = false
        state.hasErrors = true

        const status = error.response.status

        if (status === 404) {
          toast.error('E-mail não encontrado.')
          return
        }

        if (status === 401) {
          toast.error('E-mail/Senha inválidos.')
          return
        }

        toast.error('Ocorreu um erro ao criar sua conta.')
      }
    }

    return { state, close: modal.close, handleSubmit }
  }
}
</script>

<style></style>
