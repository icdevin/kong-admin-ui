<template>
    <div id="config">
        <div class="header">
            <h2>HMAC Auth Credentials</h2>
            <b-button variant="primary" size="sm" @click="showModal=true">Create a Credential</b-button>
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
                @on-ok="addCredential"
                title="Add HMAC Auth Credential"
                v-model="showModal">
            <Form :model="formItem" :label-width="120" style="margin-top: 20px">
                <FormItem label="username:">
                    <Input v-model="formItem.username"  placeholder="Enter username ..." class="text_input"></Input>
                </FormItem>
                <FormItem label="secret:">
                    <Input v-model="formItem.secret" placeholder="Enter secret ..." class="text_input"></Input>
                </FormItem>
            </Form>
        </Modal>

    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: "HMACAuthConfigTable",
        props: ['consumerId'],
        data() {
            return {
                configList: [],
                formItem:{
                    username:'',
                    secret:''
                },
                columns: [
                    {
                        title: 'id',
                        key: 'id'
                    },
                    {
                        title: 'username',
                        key: 'username',
                        width: 100
                    },
                    {
                        title: 'secret',
                        key: 'secret',
                        width: 100
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
            this.loadCredential();
        },
        methods: {
            loadCredential() {
                this._get('/consumers/'+this.consumerId+'/hmac-auth',response=>{
                    this.configList=response.data.data;
                    this.configList.map(function (config) {
                        let createDate = moment.unix(config.created_at);
                        config.createAtStr = createDate.format('YYYY-MM-DD HH:mm:ss');
                    });

                });
            },
            addCredential() {
                this._post('/consumers/'+this.consumerId+'/hmac-auth',this.formItem,()=>{
                    this.loadCredential();
                });
            },
            deleteDialog(credentialId) {
                let _this=this;
                this.$Modal.confirm({
                    title: 'Delete Credential',
                    content: '<p>Are you sure you would like to delete</p>' + '<p style="font-weight: bold">' + credentialId + '</p>',
                    onOk: () => {
                        _this._delete('/consumers/'+this.consumerId+'/hmac-auth/' + credentialId,()=> {
                            _this.$Message.info('Credential deleted!');
                            _this.loadCredential();
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
