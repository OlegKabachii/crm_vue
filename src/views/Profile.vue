<template>
  <div>
    <div class="page-title">
      <h3>{{ 'ProfileTitle' | localize }}</h3>
    </div>

    <form
        class="form"
        @submit.prevent="submitHandler"
    >
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="name"
            :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
        >
        <label for="description">{{ 'Name' | localize }}</label>
        <small
            class="helper-text invalid"
            v-if="($v.name.$dirty && !$v.name.required)"
        >{{ 'Message_EnterName' | localize}}</small>
        <span
            class="helper-text invalid">name</span>
      </div>

      <!-- Switch -->
      <div class="switch">
        <label>
          Nok
          <input type="checkbox" v-model="isEnLocale">
          <span class="lever"></span>
          En
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Update' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>

<script>
import {mapGetters, mapActions} from "vuex";
import M from 'materialize-css'
import {required} from "vuelidate/lib/validators";

export default {
  data: () => ({
    name: '',
    isEnLocale: true
  }),
  mounted() {
    this.name = this.info.name
    this.isEnLocale = this.info.locale === 'en-En'
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  computed: {
    ...mapGetters(['info'])
  },
  validations: {
    name: {required}
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isEnLocale ? 'en-En' : 'nok-Nok'
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}

</script>
