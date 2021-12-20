<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Edit</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select
              ref="select"
              v-model="current"
          >
            <option
                v-for="c of categories"
                :key="c.id"
                :value="c.id"
            >{{ c.title }}
            </option>
          </select>
          <label>Select Category</label>
        </div>

        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">Name</label>
          <span
              v-if="$v.title.$dirty && !$v.title.required"
              class="helper-text invalid"
          >Fill name</span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="limit">Limit</label>
          <span
              v-if="$v.limit.$dirty && !$v.limit.minValue"
              class="helper-text invalid"
          >Min value</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Update
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
import M from 'materialize-css'

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    title: '',
    limit: '1',
    select: null,
    current: null
  }),
  validations: {
    title: {required},
    limit: {minValue: minValue(1)}
  },
  watch: {
    current(catId) {
      const {title, limit} = this.categories.find(c => c.id === catId)
      this.title = title
      this.limit = limit
    }
  },
  created() {
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.invalid) {
        this.$v.$touch()
        return
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.message('Category updated!')
        this.$emit('updated', categoryData)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
