<template>
  <div id="content">
    <b-breadcrumb>
      <b-breadcrumb-item href="#/">{{ $t("breadcrumb.home") }}</b-breadcrumb-item>
      <b-breadcrumb-item href="#/services">{{$t("breadcrumb.service_list")}}</b-breadcrumb-item>
    </b-breadcrumb>
    <div class="header">
      <h1>{{ $t("breadcrumb.service_list") }}</h1>
      <b-button variant="primary" size="sm" @click="addService">{{$t("breadcrumb.addService")}}</b-button>
    </div>
    <div id="table">
      <Table border :columns="columns" :data="services" :loading="loading">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="action">
          <b-button variant="primary" size="sm" style="margin-right: 5px" @click="show(row.id)">{{$t("common.view")}}</b-button>
          <b-button variant="danger" size="sm" @click="deleteDialog(row.id)">{{$t("common.delete")}}</b-button>
        </template>
      </Table>
      <div class="page">
        <ButtonGroup>
          <Button
            type="primary"
            icon="ios-skip-backward"
            @click="previous"
            :disabled="offsetStack.length === 0"
          />
          <Button
            type="primary"
            icon="ios-skip-forward"
            @click="next"
            :disabled="!offset"
          />
        </ButtonGroup>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "@/event-bus";
import moment from "moment";

export default {
  name: "ServiceList",
  data() {
    return {
      loading: true,
      columns: [
        {
          title: "id",
          key: "id",
        },
        {
          title: "name",
          slot: "name",
        },
        {
          title: "host",
          key: "host",
        },
        {
          title: "created_at",
          key: "createAtStr",
          width: 160,
        },
        {
          title: "protocol",
          key: "protocol",
          width: 90,
        },
        {
          title: "port",
          key: "port",
          width: 70,
        },
        {
          title: "path",
          key: "path",
        },
        {
          title: "updated_at",
          key: "updatedAtStr",
          width: 160,
        },
        {
          title: this.$t("common.action"),
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
      services: [],
      offset: "",
      offsetStack: [],
    };
  },

  mounted() {
    EventBus.$emit("changePage", {
      activeName: "service-list",
      openNames: ["service"],
    });
    this.loadServices();
  },
  methods: {
    addService() {
      this.$router.push({ path: `/services/add` });
    },
    show(serviceId) {
      this.$router.push("/services/" + serviceId);
    },
    deleteDialog(serviceId) {
      let _this = this;
      this.$Modal.confirm({
        title: this.$t("common.delete"),
        content: this.$t("common.deleteMessage", { id: serviceId }),
        onOk: () => {
          _this._delete("/services/" + serviceId, () => {
            this.$Message.info(this.$t("common.deleted", { type: "Service" }));
            this.loadServices();
          });
        },
        onCancel: () => {},
      });
    },
    loadServices(offset) {
      let url;
      if (offset) {
        url = "/services?offset=" + offset + "&size=10";
      } else {
        url = "/services?size=10";
        this.offsetStack = [];
        this.offset = "";
      }
      this.loading = true;
      this._get(url, (response) => {
        this.services = [];
        Array.prototype.push.apply(this.services, response.data.data);
        this.services.map(function (service) {
          let createDate = moment.unix(service.created_at);
          service.createAtStr = createDate.format("YYYY-MM-DD HH:mm:ss");
          let updatedDate = moment.unix(service.updated_at);
          service.updatedAtStr = updatedDate.format("YYYY-MM-DD HH:mm:ss");
        });
        this.offset = response.data.offset;
        this.loading = false;
      });
    },
    next() {
      let offset = this.offset;
      this.loadServices(this.offset);
      this.offsetStack.push(offset);
    },
    previous() {
      this.offsetStack.pop();
      let offset = this.offsetStack[this.offsetStack.length - 1];
      this.loadServices(offset);
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}

.page {
  text-align: right;
  margin-top: 10px;
  font-size: 1rem;
}
</style>
