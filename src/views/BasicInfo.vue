<template>
    <div>
        <b-breadcrumb>
            <b-breadcrumb-item href="#/">{{$t('breadcrumb.home')}}</b-breadcrumb-item>
        </b-breadcrumb>
        <h1>{{$t('breadcrumb.info')}}</h1>
        <p>Hostname: {{basicInfo.hostname}}</p>
        <p>Version: {{basicInfo.version}}</p>
        <p>Node ID {{basicInfo.node_id}}</p>
        <p>Tagline: {{basicInfo.tagline}}</p>

        <h3>{{$t('basicInfo.configuration')}}</h3>
        <p>Prefix: {{ basicInfo.configuration.prefix }}</p>
        <p>Proxy Listen: {{basicInfo.configuration.proxy_listen}}</p>
        <p>DB Update Frequency: {{basicInfo.configuration.db_update_frequency}}</p>
        <p>Admin Listen: {{basicInfo.configuration.admin_listen}}</p>
        <p>Nginx conf: {{basicInfo.configuration.nginx_conf}}</p>
        <p>Nginx PID: {{basicInfo.configuration.nginx_pid}}</p>

        <h3>{{$t('basicInfo.status')}}</h3>
        <p>server.connections_writing: {{ status.server.connections_writing }}</p>
        <p>server.total_requests: {{ status.server.total_requests }}</p>
        <p>server.connections_handled: {{ status.server.connections_handled }}</p>
        <p>server.connections_accepted: {{ status.server.connections_accepted }}</p>
        <p>server.connections_reading: {{ status.server.connections_reading }}</p>
        <p>server.connections_active: {{ status.server.connections_active }}</p>
        <p>server.connections_waiting: {{ status.server.connections_waiting }}</p>
    </div>
</template>

<script>
    import EventBus from '@/event-bus'

    export default {
        data() {
            return {
                basicInfo: {
                    configuration: {}
                },
                status: {
                    server:{}
                },
                timer:''
            }
        },
        mounted() {
            EventBus.$emit('changePage', {activeName: 'index', openNames: []});
            this.loadBasicInfo();
            this.loadStatus();
            this.timer = setInterval(this.loadStatus, 3000);
        },
        methods: {
            loadBasicInfo() {
                let _this = this;
                this._get('/', response => {
                    _this.basicInfo = response.data;
                    localStorage.kongVersion=_this.basicInfo.version;
                });
            },
            loadStatus() {
                let _this = this;
                this._get('/status', response => {
                    _this.status = response.data;
                });
            }
        },
        destroyed() {
            clearInterval(this.timer);
        }
    }
</script>

<style scoped>
    #login {
        margin-top: 200px;
    }

    input {
        margin-left: 20px;
    }

    p {
        margin-bottom: 0;
    }

    h3 {
        margin-top: 10px;
    }
</style>
