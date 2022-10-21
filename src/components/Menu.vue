<template>
    <Row id="menu">
        <Col span="24">
            <Menu :theme="theme2" width="auto" v-bind:active-name="activeName" v-bind:open-names="openNames" ref="menu">
                <router-link to="/">
                    <MenuItem name="index">
                        <Icon type="ios-stats"/>
                        {{$t('breadcrumb.info')}}
                    </MenuItem>
                </router-link>

                <router-link to="/services">
                    <MenuItem name="service-list">
                        <Icon type="ios-paper"/>
                        {{$t('breadcrumb.services')}}
                    </MenuItem>
                </router-link>

                <router-link to="/routes">
                    <MenuItem name="route-list">
                        <Icon type="ios-people"/>
                        {{$t('breadcrumb.routes')}}
                    </MenuItem>
                </router-link>

                <router-link to="/upstreams">
                    <MenuItem name="upstream-list">
                        <Icon type="ios-desktop"/>
                        {{$t('breadcrumb.upstreams')}}
                    </MenuItem>
                </router-link>

                <router-link to="/consumers">
                    <MenuItem name="consumer-list">
                        <Icon type="ios-person"/>
                        {{$t('breadcrumb.consumers')}}
                    </MenuItem>
                </router-link>

                <router-link to="/plugins">
                    <MenuItem name="plugin-list">
                        <Icon type="ios-glasses"/>
                        {{$t('breadcrumb.plugins')}}
                    </MenuItem>
                </router-link>
                <router-link to="/certificates">
                    <MenuItem name="certificate-list">
                        <Icon type="ios-key"/>
                        {{$t('breadcrumb.certificates')}}
                    </MenuItem>
                </router-link>
            </Menu>
        </Col>
    </Row>
</template>
<script>
    import EventBus from '@/event-bus'

    export default {
        data() {
            return {
                theme2: 'dark',
                activeName: '',
                openNames: []
            }
        },
        mounted() {
            EventBus.$on('changePage', ({activeName, openNames}) => {
                this.activeName = activeName;
                this.openNames = openNames;
                this.$nextTick(() => {
                    if(this.$refs.menu){
                        this.$refs.menu.updateOpened();
                        this.$refs.menu.updateActiveName();
                    }
                })
            });
        },
        destroyed() {
            EventBus.$off('changePage');
        }
    }
</script>

<style scoped>
    #menu {
        background: #17233d;
    }

    .router-link-active {
        color: white;
    }
</style>
