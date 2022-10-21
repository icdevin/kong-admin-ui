<template>
    <div id="config">
        <div class="header">
            <h2>ACL Group</h2>
            <b-button variant="primary" size="sm" @click="showModal=true">Add Group</b-button>
        </div>

        <Table border :columns="columns" :data="configList">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row }" slot="action">
                <b-button variant="danger" size="sm" @click="deleteDialog(row.id)">Delete</b-button>
            </template>
        </Table>

        <Modal
                @on-ok="addGroup"
                title="Add ACL Group"
                v-model="showModal">
            <Form :model="formItem" :label-width="120" style="margin-top: 20px">
                <FormItem label="username:">
                    <Input v-model="formItem.group"  placeholder="Enter group name ..." class="text_input"></Input>
                </FormItem>
            </Form>
        </Modal>

    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: "ACLConfigTable",
        props: ['consumerId'],
        data() {
            return {
                configList: [],
                formItem:{
                    group:''
                },
                columns: [
                    {
                        title: 'group',
                        key: 'group'
                    },
                    {
                        title: 'created_at',
                        key: 'createAtStr',
                        width: 150
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        fixed: 'right',
                        width: 150,
                        align: 'center'
                    }
                ],
                showModal:false
            }
        },
        mounted() {
            this.loadAclGroup();
        },
        methods: {
            loadAclGroup() {
                this._get('/consumers/'+this.consumerId+'/acls',response=>{
                    this.configList=response.data.data;
                    this.configList.map(function (config) {
                        let createDate = moment.unix(config.created_at);
                        config.createAtStr = createDate.format('YYYY-MM-DD HH:mm:ss');
                    });

                });
            },
            addGroup() {
                this._post('/consumers/'+this.consumerId+'/acls',this.formItem,()=>{
                    this.loadAclGroup();
                });
            },
            deleteDialog(groupId) {
                let _this=this;
                this.$Modal.confirm({
                    title: 'Delete Group',
                    content: '<p>Are you sure you would like to delete</p>' + '<p style="font-weight: bold">' + groupId + '</p>',
                    onOk: () => {
                        _this._delete('/consumers/'+this.consumerId+'/acls/' + groupId,()=> {
                            _this.$Message.info('Group deleted!');
                            _this.loadAclGroup();
                        });
                    },
                    onCancel: () => {


                    }
                });
            },
        }
    }
</script>

<style scoped>
    #config {
        margin-top: 10px;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0 10px 0;
    }
</style>
