<script setup lang="ts">
import { reactive, ref, onMounted, onBeforeMount } from 'vue'
import { required, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import Auth from '@/utils/Auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const emailInput = ref<HTMLInputElement | null>(null)
onMounted(() => {
  emailInput.value?.focus()
})

onBeforeMount(() => {
  if (Auth.isLoggedIn()) {
    router.replace('/')
  }
})

const formData = reactive({
  email: 'mohammed.ramadanko@gmail.com',
  password: 'mohammed.ramadanko@gmail.comA1'
})

const schema = {
  email: { required, email },
  password: { required }
}

const formModel = useVuelidate(schema, formData)


const onSubmit = async () => {
  try {
    await Auth.login(formData)
    window.location.replace(Auth.redirectUrl);
  } catch (err) {
    console.log(err)
  }
}

</script>

<template>
  <!--  this is called decorating the event handler -->
  <form novalidate @submit.prevent="onSubmit" v-if="!Auth.isLoggedIn()">
    <v-text-field name="email" type="text" v-model="formModel.email.$model" label="Email" variant="outlined"
                  :error="formModel.email.$dirty && formModel.email.$invalid" ref="emailInput" />
    <v-text-field name="password" type="password" v-model="formModel.password.$model" label="Password"
                  variant="outlined" :error="formModel.password.$dirty && formModel.password.$invalid" />
    <v-btn type="submit" variant="flat" color="primary">Submit</v-btn>
  </form>
  <!--  <pre>-->
  <!--&lt;!&ndash;    {{ formModel.email }}&ndash;&gt;-->
  <!--    <ul>-->
  <!--      <li v-for="(e, index) in formModel.$errors" :key="index">-->
  <!--        {{ e.$property }} - {{ e.$message }}-->
  <!--      </li>-->
  <!--    </ul>-->
  <!--  </pre>-->
</template>
