<template>
    <div id="config">
        <div class="header">
            <h2>Key Authentication Credentials</h2>
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
                title="Add Key Authentication Credential"
                v-model="showModal">
            <Form :model="formItem" :label-width="120" style="margin-top: 20px">
                <FormItem label="name:">
                    <Input v-model="formItem.key"  placeholder="Enter key ..." class="text_input"></Input>
                </FormItem>
            </Form>
        </Modal>

    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: "KeyAuthConfigTable",
        props: ['consumerId'],
        data() {
            return {
                configList: [],
                formItem:{
                    key:'',
                },
                columns: [
                    {
                        title: 'id',
                        key: 'id'
                    },
                    {
                        title: 'key',
                        key: 'key',
                        width: 260
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
                this._get('/consumers/'+this.consumerId+'/key-auth',response=>{
                    this.configList=response.data.data;
                    this.configList.map(function (config) {
                        let createDate = moment.unix(config.created_at);
                        config.createAtStr = createDate.format('YYYY-MM-DD HH:mm:ss');
                    });

                });
            },
            addCredential() {
                if (!this.key) {
                    this.key=null;
                }
                this._post('/consumers/'+this.consumerId+'/key-auth',this.formItem,()=>{
                    this.loadCredential();
                    this.key=null;
                });
            },
            deleteDialog(credentialId) {
                let _this=this;
                this.$Modal.confirm({
                    title: 'Delete Credential',
                    content: '<p>Are you sure you would like to delete</p>' + '<p style="font-weight: bold">' + credentialId + '</p>',
                    onOk: () => {
                        _this._delete('/consumers/'+this.consumerId+'/key-auth/' + credentialId,()=> {
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
