<template>
    <div>
        <div id="table">
            <Table border :columns="columns" :data="plugins">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row }" slot="action">
                    <b-button variant="primary" size="sm" style="margin-right: 5px" @click="edit(row.id)">{{$t('common.view')}}</b-button>
                    <b-button variant="danger" size="sm" @click="deleteDialog(row.id)">{{$t('common.delete')}}</b-button>
                </template>
            </Table>
        </div>
    </div>

</template>

<script>
    import EventBus from '@/event-bus'

    export default {
        name: "PluginTable",
        props:['plugins'],
        data() {
            return {
                columns: [
                    {
                        title: 'id',
                        key: 'id',
                        width:200
                    },
                    {
                        title: 'name',
                        key: 'name',
                    },
                    {
                        title: 'service',
                        key: 'service',
                        render:function (h, params) {
                            if (params.row.service) {
                                return h('router-link', {
                                    props: { to:'/services/' + params.row.service.id },
                                }, params.row.service.id);
                            }

                        }
                    },
                    {
                        title: 'run_on',
                        key: 'run_on',
                    },
                    {
                        title: 'consumer',
                        render: function (h, params) {
                            if (params.row.consumer) {
                                return h('router-link', {
                                    props: { to:'/consumers/edit/' + params.row.consumer.id },
                                }, params.row.consumer.id);
                            }
                            return h();
                        }
                    },
                    {
                        title: 'created_at',
                        key: 'createAtStr',
                    },
                    {
                        title: 'route',
                        key: 'route',
                    },
                    {
                        title: 'enabled',
                        key: 'enabled',
                        width: 90,
                        render: function (h, params) {
                            return h('i-switch',{props:{value:params.row.enabled,disabled:true}})
                        }
                    },
                    {
                        title: this.$t('common.action'),
                        slot: 'action',
                        fixed: 'right',
                        width: 150,
                        align: 'center'
                    }
                ],
            }
        },
        methods:{
            edit(pluginId) {
                this.$router.push({path: `/plugins/edit/${pluginId}`});
            },
            deleteDialog(pluginId) {
                let _this=this;
                this.$Modal.confirm({
                    title: 'Delete Plugin',
                    content: '<p>Are you sure you would like to delete</p>' + '<p style="font-weight: bold">' + pluginId + '</p>',
                    onOk: () => {
                        _this._delete('/plugins/' + pluginId,()=> {
                            _this.$Message.info('Plugin deleted!');
                            EventBus.$emit('pluginChange', { pluginId });
                        });
                    },
                });
            },
        }
    }
</script>
