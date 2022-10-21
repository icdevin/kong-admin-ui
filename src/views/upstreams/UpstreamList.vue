<template>
    <div id="content">
        <b-breadcrumb>
            <b-breadcrumb-item href="#/">Home</b-breadcrumb-item>
            <b-breadcrumb-item href="#/upstream">Upstream</b-breadcrumb-item>
        </b-breadcrumb>
        <div class="header">
            <h1>Upstream List</h1>
            <b-button variant="primary" size="sm" @click="addUpstream">Add Upstream</b-button>
        </div>

        <div id="table">
            <Table border :columns="columns" :data="upstreams" :loading="loading">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row }" slot="action">
                    <b-button variant="primary" size="sm" style="margin-right: 5px" @click="edit(row.id)">{{$t('common.edit')}}</b-button>
                    <b-button variant="danger" size="sm" @click="deleteDialog(row.id)">{{$t('common.delete')}}</b-button>
                </template>
            </Table>
        </div>

        <div class="page">
            <ButtonGroup>
                <Button type="primary" icon="ios-skip-backward" @click="previous" :disabled="offsetStack.length===0"></Button>
                <Button type="primary" icon="ios-skip-forward" @click="next" :disabled="!offset"></Button>
            </ButtonGroup>
        </div>


    </div>

</template>

<script>
    import moment from 'moment'
    import EventBus from '@/event-bus'
    export default {
        name: "UpstreamList",
        data () {
            return {
                upstreams:[],
                loading: true,
                columns: [
                    {
                        title: 'id',
                        key: 'id'
                    },
                    {
                        title: 'name',
                        key: 'name',
                    },
                    {
                        title: 'created_at',
                        key: 'createAtStr',
                        width:160
                    },
                    {
                        title: 'hash_on',
                        key: 'hash_on',
                    },
                    {
                        title: 'hash_on_cookie_path',
                        key: 'hash_on_cookie_path',
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        align: 'center'
                    }
                ],
                offset:'',
                offsetStack:[]
            }
        },

        mounted() {
            EventBus.$emit('changePage',{activeName:'upstream-list',openNames:['upstream']});
            this.loadUpstreams();


        },
        methods: {
            addUpstream() {
                this.$router.push({path:`/upstreams/add`})
            },
            loadUpstreams(offset) {
                let url;
                if (offset) {
                    url = '/upstreams?offset=' + offset + '&size=10';
                } else {
                    url = '/upstreams?size=10';
                    this.offsetStack=[];
                    this.offset='';
                }
                this.loading = true;
                this._get(url,response => {
                    this.upstreams=response.data.data;

                    this.upstreams.map(function (upstream) {
                        let createDate=moment.unix(upstream.created_at)
                        upstream.createAtStr=createDate.format('YYYY-MM-DD HH:mm:ss');
                        let updatedDate=moment.unix(upstream.updated_at)
                        upstream.updatedAtStr=updatedDate.format('YYYY-MM-DD HH:mm:ss');
                    });
                    this.offset=response.data.offset;
                    this.loading = false;
                });
                this.loading = false;
            },
            edit (upstreamId) {
                this.$router.push('/upstreams/edit/'+upstreamId);
            },
            deleteDialog(upstreamId) {
                let _this=this;
                this.$Modal.confirm({
                    title: this.$t('common.delete'),
                    content: _this.$t('common.deleteMessage',{id:upstreamId}),
                    onOk: () => {
                        _this._delete('/upstreams/' + upstreamId,() =>{
                            this.$Message.info(this.$t('common.deleted',{type:'Upstream'}));
                            this.loadUpstreams();
                        });
                    },
                    onCancel: () => {
                    }
                });
            },
            next() {
                let offset=this.offset;
                this.loadUpstreams(this.offset);
                this.offsetStack.push(offset);
            },
            previous() {
                this.offsetStack.pop();
                let offset=this.offsetStack[this.offsetStack.length-1];
                this.loadUpstreams(offset);
            }
        }
    }
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
