<template>
  <Row>
    <Col span="24">
      <Menu
        :theme="theme2"
        width="auto"
        v-bind:active-name="activeName"
        v-bind:open-names="openNames"
        ref="menu"
      >
        <MenuItem class="menu-item" name="index" to="/">
          <Icon type="ios-stats" />
          <span>{{ $t("breadcrumb.info") }}</span>
        </MenuItem>

        <MenuItem class="menu-item" name="service-list" to="/services">
          <Icon type="ios-paper" />
          <span>{{$t("breadcrumb.services")}}</span>
        </MenuItem>

        <MenuItem class="menu-item" name="route-list" to="/routes">
          <Icon type="ios-people" />
          <span>{{ $t("breadcrumb.routes") }}</span>
        </MenuItem>

        <MenuItem class="menu-item" name="upstream-list" to="/upstreams">
          <Icon type="ios-desktop" />
          <span>{{$t("breadcrumb.upstreams")}}</span>
        </MenuItem>

        <MenuItem class="menu-item" name="consumer-list" to="/consumers">
          <Icon type="ios-person" />
          <span>{{$t("breadcrumb.consumers")}}</span>
        </MenuItem>

        <MenuItem class="menu-item" name="plugin-list" to="/plugins">
          <Icon type="ios-glasses" />
          <span>{{$t("breadcrumb.plugins")}}</span>
        </MenuItem>
        <MenuItem class="menu-item" name="certificate-list" to="/certificates">
          <Icon type="ios-key" />
          <span>{{$t("breadcrumb.certificates")}}</span>
        </MenuItem>
      </Menu>
    </Col>
  </Row>
</template>

<script>
import EventBus from "@/event-bus";
import router from "../router";

export default {
  data() {
    return {
      theme2: "dark",
      activeName: "",
      openNames: [],
    };
  },
  mounted() {
    EventBus.$on("changePage", ({ activeName, openNames }) => {
      this.activeName = activeName;
      this.openNames = openNames;
      this.$nextTick(() => {
        if (this.$refs.menu) {
          this.$refs.menu.updateOpened();
          this.$refs.menu.updateActiveName();
        }
      });
    });
  },
  destroyed() {
    EventBus.$off("changePage");
  },
  methods: {
    navigate(where = "/") {
      console.log(where);
      router.push(where);
    },
  },
};
</script>

<style scoped>
.menu-item:hover {
  background-color: #3e4555 !important;
}
.menu-item {
  color: white;
}
.menu-item:hover {
  text-decoration: none !important;
}
.ivu-menu-item {
  display: flex;
}
.router-link-active {
  color: white;
}
</style>
