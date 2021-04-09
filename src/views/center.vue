<template>
    <div class="center">
        <div class="user-info-area">
            <cell :access="true"
                  :access-light="true"
                  @click="$router.push('/center/edit')">
                <template v-slot:header>
                    <el-avatar :src="avatarUrl"/>
                </template>
                <div class="info-list">
                    <cell icon="el-icon-user" :text="userInfo.name"/>
                    <cell icon="el-icon-phone" :text="userInfo.phone"/>
                </div>
            </cell>
        </div>
        <div class="features">
            <cells class="cells">
                <cell icon="el-icon-user"
                      text="个人信息"
                      :access="true"
                      @click="$router.push('/center/edit')"/>
                <cell icon="el-icon-setting"
                      text="设置"
                      :access="true"
                      @click="$router.push('/center/setting')"/>
                <cell icon="el-icon-bank-card"
                      text="充值"
                      :access="true"
                      @click="$router.push('/center/balance')">
                    <template v-slot:footer>
                        <div v-text="'￥ ' + $store.getters.getUserInfo.score" style="color: #909399"/>
                    </template>
                </cell>
            </cells>
            <cells class="cells">
                <cell icon="el-icon-service" text="服务中心" :access="true" @click="help"/>
                <cell icon="el-icon-turn-off" text="退出登录" @click="exit"/>
            </cells>
        </div>
    </div>
</template>

<script>
    import cell from "@/components/cell.vue";
    import cells from "@/components/cells.vue";

    export default {
        name: "center",
        components: {
            cell,
            cells,
        },
        data() {
            return {
                userInfo: {
                    name: null,
                    phone: null,
                    address: null,
                    score: null,
                },
                score: 0
            };
        },
        created() {
            this.getUserInfo();
        },
        methods: {
            getUserInfo() {
                this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
            },
            exit() {
                this.$confirm('确定退出当前账户？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    localStorage.removeItem('userInfo');
                    localStorage.removeItem('token');
                    this.$router.push('/login');
                }).catch(() => {
                });

            },
            help() {
                this.$confirm('该功能后续推出', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                }).catch(() => {
                });
            }
        },
        computed: {
            avatarUrl: function () {
                return `https://api.multiavatar.com/${this.userInfo.name}.png`;
            },
        },
    };
</script>

<style lang="scss" scoped>
    .cells {
        border-radius: 8px;
    }

    .center {
        background-color: #f8f8f8;
        height: 100%;
    }

    .user-info-area {
        background-color: #298eeb;
        color: #fefefe;
        padding-top: 50px;

        .info-list > .cell {
            padding: 4px 15px;
        }
    }

    .features {
        padding: 0 10px;
    }
</style>