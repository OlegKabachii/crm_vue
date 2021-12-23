<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="" class="breadcrumb">History</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.typeText }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
              class="card"
              :class="[record.typeClass]"
          >
            <div class="card-content white-text">
              <p>Description: {{ record.description }}</p>
              <p>Sum: {{ record.amount | currency('NOK') }}</p>
              <p>Category: {{ record.categoryName }}</p>

              <small>{{ record.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p
        class="center"
        v-else>Record not found!
    </p>
  </div>
</template>

<script>
export default {
  name: 'detail',
  metaInfo() {
    return {
      title: this.$title('Detail')
    }
  },
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

    this.record = {
      ...record,
      categoryName: category.title,
      typeClass: record.type === 'income' ? 'green' : 'red',
      typeText: record.type === 'income' ? 'Income' : 'Outcome'
    }

    this.loading = false
  }
}
</script>
