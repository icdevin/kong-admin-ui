<template>
    <div id="content">
        <b-breadcrumb>
            <b-breadcrumb-item href="#/">Home</b-breadcrumb-item>
            <b-breadcrumb-item href="#/consumers">Consumers</b-breadcrumb-item>
        </b-breadcrumb>
        <div class="header">
            <h1>{{$t('breadcrumb.consumer_list')}}</h1>
            <b-button variant="primary" size="sm" @click="addConsumer">Add Consumer</b-button>
        </div>
        <ConsumerTable  v-bind:consumers="consumers"></ConsumerTable>
        <div class="page">
            <ButtonGroup>
                <Button type="primary" icon="ios-skip-backward" @click="previous" :disabled="offsetStack.length===0"></Button>
                <Button type="primary" icon="ios-skip-forward" @click="next" :disabled="!offset"></Button>
            </ButtonGroup>
        </div>

    </div>

</template>

<script>
    import EventBus from '@/event-bus'
    import ConsumerTable from '@/components/consumers/ConsumerTable'
    export default {
        name: "ConsumerList",
        data () {
            return {
                consumers:[],
                offset:'',
                offsetStack:[]
            }
        },
        components: {
            ConsumerTable
        },
        mounted() {
            EventBus.$emit('changePage',{activeName:'consumer-list',openNames:['consumer']});
            this.loadConsumers();

            EventBus.$on('consumerChange',({consumerId}) => {
                for(let consumer of this.consumers) {
                    if (consumer.id===consumerId) {
                        this.loadConsumers();
                        break;
                    }
                }
            });
        },
        methods: {
            addConsumer() {
                this.$router.push({path:`/consumers/add`})
            },
            loadConsumers(offset) {
                let url;
                if (offset) {
                    url = '/consumers?offset=' + offset + '&size=10';
                } else {
                    url = '/consumers?size=10';
                }
                this._get(url,response => {
                    this.consumers=response.data.data;
                    this.offset=response.data.offset;
                });

            },
            next() {
                let offset=this.offset;
                this.loadConsumers(this.offset);
                this.offsetStack.push(offset);
            },
            previous() {
                this.offsetStack.pop();
                let offset=this.offsetStack[this.offsetStack.length-1];
                this.loadConsumers(offset);
            }
        },
        destroyed() {
            EventBus.$off('consumerChange');
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
