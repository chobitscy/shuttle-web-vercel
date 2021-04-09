<template>
    <div class="center">
        <Headers>

            <span><i class="el-icon-setting"></i> 设置</span>
            <span slot="icon" @click="$router.replace('/home')"><i class="el-icon-house"></i></span>
        </Headers>
        <div class="features">
            <cells class="cells">
                <cell
                        icon="el-icon-magic-stick"
                        text="动画效果"
                        :access="true"
                        @click="dialogAnimationVisible = true"
                />
                <cell
                        icon="el-icon-set-up"
                        text="头部高度"
                        :access="true"
                        @click="dialogHeaderVisible = true"
                />
                <cell
                        icon="el-icon-sold-out"
                        text="定时推送"
                        :access="true"
                        @click="dialogPushVisible = true"
                >
                </cell>
                <cell
                        icon="el-icon-time"
                        text="保持登录"
                        :access="true"
                        @click="dialogExpiredVisible = true"
                >
                </cell>
                <cell
                        icon="el-icon-position"
                        text="启动页面"
                        :access="true"
                        @click="dialogHouseVisible = true"
                >
                </cell>
                <cell
                        icon="el-icon-refresh"
                        text="清空缓存"
                        :access="true"
                        @click="clear"
                >
                </cell>
            </cells>
        </div>
        <el-dialog title="设置头部高度" :visible.sync="dialogHeaderVisible" width="80%" center>
            <el-slider v-model="height" :show-tooltip="false" @change="saveHeight" @input="setHeight"></el-slider>
            <div class="dialog">
                <el-input-number v-model="height" @change="changeHeight" :min="1" label="描述文字"></el-input-number>
                <el-button type="warning" size="medium" @click="defaultHeight" :disabled="height === 50"><i
                        class="el-icon-refresh"></i>默认
                </el-button>
            </div>
        </el-dialog>
        <el-dialog title="设置动画效果" :visible.sync="dialogAnimationVisible" width="80%" center>
            <div class="select">
                <el-select v-model="animation" placeholder="请选择" class="animation" @change="changeAnimation">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </el-dialog>
        <el-dialog title="设置推送开关" :visible.sync="dialogPushVisible" width="80%" center>
            <div>
                <p>开启此功能，会自动推送最新订单</p>
                <div class="switch">
                    <p>当前状态：</p>
                    <el-switch
                            v-model="push"
                            active-color="#13ce66"
                            inactive-color="#909399"
                            @change="changePush">
                    </el-switch>
                </div>
            </div>
        </el-dialog>
        <el-dialog title="设置登录过期时间" :visible.sync="dialogExpiredVisible" width="80%" center>
            <div class="select">
                <el-input placeholder="单位：分" v-model="expired" suffix-icon="el-icon-time" type="number"
                          class="expired"/>
                <el-button @click="setExpired">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="设置启动页面" :visible.sync="dialogHouseVisible" width="80%" center>
            <div class="select">
                <el-select v-model="house" placeholder="请选择" class="animation" @change="changeHouse">
                    <el-option
                            v-for="view in views"
                            :key="view.value"
                            :label="view.label"
                            :value="view.value">
                    </el-option>
                </el-select>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import cell from "@/components/cell.vue";
    import cells from "@/components/cells.vue";
    import Headers from "@/components/headers";

    export default {
        name: "setting",
        components: {
            cell,
            cells,
            Headers
        },
        data() {
            return {
                userInfo: {
                    name: null,
                    phone: null,
                    address: null,
                    score: null,
                },
                dialogHeaderVisible: false,
                height: null,
                dialogAnimationVisible: false,
                options: [
                    {
                        label: '淡入淡出',
                        value: 'slide-fade',
                    },
                    {
                        label: '无',
                        value: 'null'
                    }
                ],
                animation: localStorage.getItem('animation'),
                dialogPushVisible: false,
                dialogExpiredVisible: false,
                push: true,
                expired: null,
                dialogHouseVisible: false,
                views: [
                    {
                        label: '发现',
                        value: '0'
                    }, {
                        label: '服务',
                        value: '1'
                    },
                    {
                        label: '搜索',
                        value: '2'
                    }, {
                        label: '中心',
                        value: '3'
                    },
                    {
                        label: '接单',
                        value: 'receive'
                    }
                ],
                house: '0'
            };
        },
        created() {
            this.getUserInfo();
            const push = JSON.parse(localStorage.getItem('push'));
            this.push = push === null ? true : push;

            const height = localStorage.getItem('height');
            this.height = height === null ? 50 : parseInt(height);

            const expired = localStorage.getItem('expired');
            this.expired = expired === null ? 60 : expired;

            const animation = localStorage.getItem('animation');
            this.animation = animation === null ? 'slide-fade' : animation;
        },
        methods: {
            getUserInfo() {
                this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
            },
            clear() {
                this.$confirm('清空浏览器缓存？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.go(0);
                    sessionStorage.removeItem('serviceList');
                }).catch(() => {
                });
            },
            saveHeight(value) {
                localStorage.setItem('height', value);
            },
            setHeight() {
                this.$store.commit('setHeight', this.height);
            },
            setExpired() {
                if (this.expired === '') this.$message.error('登录过期时间不能为空');
                else {
                    localStorage.setItem('expired', this.expired);
                    this.$router.push('/login')
                }
            },
            changePush() {
                localStorage.setItem('push', this.push);
            },
            changeHeight(value) {
                this.$store.commit('setHeight', value);
                localStorage.setItem('height', value);
            },
            defaultHeight() {
                this.$store.commit('setHeight', 50);
                localStorage.setItem('height', '50');
                this.height = 50;
            },
            changeAnimation(value) {
                this.$store.commit('setAnimation', value);
                localStorage.setItem('animation', value);
                this.$message.success('设置成功！');
                this.dialogAnimationVisible = false;
            },
            changeHouse(value) {
                if (value === 'receive') localStorage.setItem('house', value);
                else {
                    localStorage.removeItem('house');
                    localStorage.setItem('home', value);
                }
                this.$message.success('设置成功！');
                this.dialogHouseVisible = false;
            }
        }
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

    .select {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .animation {
        margin: 10px 0;
    }

    .switch {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .expired {
        margin: 10px 0;
    }

    .dialog {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }

    .dialog .el-button {
        margin-top: 10px;
    }
</style>