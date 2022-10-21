<template>
  <Row>
    <Col span="3">
      <div class="title">
        <router-link to="/"> Kong Admin UI </router-link>
      </div>
    </Col>
    <Col span="21" class="config">
      <div>
        <router-link to="/config">{{ address }}</router-link> |
        <a @click="changeLanguage">{{ language }}</a>
      </div>
    </Col>
  </Row>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      address: "",
    };
  },
  computed: {
    language() {
      return this.$i18n.locale === "zh" ? "English" : "中文";
    },
  },
  mounted() {
    this.address = localStorage.address;
  },
  methods: {
    changeLanguage() {
      this.$i18n.locale === "zh"
        ? (this.$i18n.locale = "en")
        : (this.$i18n.locale = "zh");
      localStorage.language = this.$i18n.locale;
    },
  },
};
</script>

<style scoped>
.title a {
  color: white;
  font-size: 1.4rem;
}
.config {
  display: flex;
  justify-content: flex-end;
  color: white;
}
.config a {
  color: white;
  font-size: 14px;
}
</style>
