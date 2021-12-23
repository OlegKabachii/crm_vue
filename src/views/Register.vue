<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Home bookkeeping</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
            class="helper-text invalid"
            v-if="($v.email.$dirty && !$v.email.required)"
        >Empty</small>
        <small
            class="helper-text invalid"
            v-else-if="($v.email.$dirty && !$v.email.email)"
        >Not correct email</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            class="validate"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Password</label>
        <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.required"
        >Enter password</small>
        <small
            class="helper-text invalid"
            v-else-if="$v.password.$dirty && !$v.password.minLength"
        >Password too short</small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="name">Name</label>
        <small
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required"
        >Enter name</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree"/>
          <span>I agree with the rules</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Register
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Already have an account?
        <router-link to="/login">Login!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'register',
  metaInfo() {
    return {
      title: this.$title('Register')
    }
  },
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(7)},
    name: {required},
    agree: {checked: value => value}
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
        agree: this.agree
      }
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (e) {
        console.log('123', e)
      }
    }
  }
}
</script>