<template>
    <div id="config">
        <div class="header">
            <h2>OAuth 2.0 Credentials</h2>
            <b-button variant="primary" size="sm" @click="showModal=true">Create a Credential</b-button>
        </div>

        <Table border :columns="columns" :data="configList">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row }" slot="action">
                <b-button variant="error" size="sm" @click="deleteDialog(row.id)">Delete</b-button>
            </template>
        </Table>

        <Modal
                @on-ok="addCredential"
                title="Add OAuth 2.0 Credential"
                v-model="showModal">
            <Form :model="formItem" :label-width="120" style="margin-top: 20px">
                <FormItem label="name:">
                    <Input v-model="formItem.name"  placeholder="Enter name ..." class="text_input"></Input>
                </FormItem>
                <FormItem label="client_id:">
                    <Input v-model="formItem.client_id" placeholder="Enter client_id ..." class="text_input"></Input>
                </FormItem>
                <FormItem label="client_secret:">
                    <Input v-model="formItem.client_secret" placeholder="Enter client_secret ..." class="text_input"></Input>
                </FormItem>
                <FormItem label="redirectUrls:">
                    <Input v-model="redirectUrls" placeholder="Split by comma" class="text_input"></Input>
                </FormItem>
            </Form>
        </Modal>

    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: "OAuth2ConfigTable",
        props: ['consumerId'],
        data() {
            return {
                configList: [],
                formItem:{
                    name:'',
                    client_id:'',
                    client_secret:'',
                    redirect_uris:[]
                },
                columns: [
                    {
                        title: 'id',
                        key: 'id'
                    },
                    {
                        title: 'name',
                        key: 'name',
                        width: 160
                    },
                    {
                        title: 'client_id',
                        key: 'client_id',
                        width: 160
                    },
                    {
                        title: 'client_secret',
                        key: 'client_secret',
                        width: 160
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
        computed:{
            redirectUrls:{
                get() {
                    if (this.formItem.redirect_uris.length>0) {
                        return this.formItem.redirect_uris.join(',');
                    }
                    return '';
                },
                set(newValue) {
                    if (newValue) {
                        this.formItem.redirect_uris=newValue.split(',');
                    }else{
                        this.formItem.redirect_uris=[];
                    }

                }
            }
        },
        methods: {
            loadCredential() {
                this._get('/consumers/'+this.consumerId+'/oauth2',response=>{
                    this.configList=response.data.data;
                    this.configList.map(function (config) {
                        let createDate = moment.unix(config.created_at);
                        config.createAtStr = createDate.format('YYYY-MM-DD HH:mm:ss');
                    });

                });
            },
            addCredential() {
                this._post('/consumers/'+this.consumerId+'/oauth2',this.formItem,()=>{
                    this.loadCredential();
                });
            },
            deleteDialog(credentialId) {
                let _this=this;
                this.$Modal.confirm({
                    title: 'Delete Credential',
                    content: '<p>Are you sure you would like to delete</p>' + '<p style="font-weight: bold">' + credentialId + '</p>',
                    onOk: () => {
                        _this._delete('/consumers/'+this.consumerId+'/oauth2/' + credentialId,()=> {
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
