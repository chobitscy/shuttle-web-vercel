<template>
    <page class="page">

        <template #headers>
            <headers>
                <i class="el-icon-bank-card"></i> 余额充值
                <span slot="icon" @click="$router.replace('/home')"><i class="el-icon-house"></i></span>
            </headers>
        </template>

        <template #center>
            <cells class="opthin-area">
                <cell>
                    <el-input placeholder="请输入充值金额" v-model="total" suffix-icon="el-icon-wallet"/>
                </cell>
            </cells>
            <cells class="tip">
                <el-divider>
                    <span style="color: #909399">快捷支付金额</span>
                </el-divider>
            </cells>
            <el-row :gutter="20" class="opthin-area">
                <el-col :span="8" v-for="item in options" :key="'o-' + item" @click.native="total = item">
                    <div class="item" v-text="item"/>
                </el-col>
            </el-row>
        </template>
        <div slot="footer" class="recharge">
            <cells class="opthin-area">
                <cell>
                    <div class="balance">
                        <div><i class="el-icon-coin"></i> 余额：</div>
                        <div style="color: #e6a23c" v-text="score + '积分'"></div>
                    </div>
                </cell>
            </cells>
            <form action="/api/user/recharge" method="post" class="recharge-form">
                <input :value="getUserId()" name="userId" style="display: none"/>
                <input :value="total" name="total" style="display: none" required/>
                <button type="submit" class="btn" @click="check" :style="total === ''?'background-color: #a0cfff':''">
                    充值
                </button>
            </form>
        </div>
    </page>
</template>

<script>
    import Cell from "../../components/cell.vue";
    import Cells from "../../components/cells.vue";
    import Headers from "../../components/headers.vue";
    import page from "../../layout/page.vue";
    import {findScore} from "@/utils/api/user";

    export default {
        components: {page, Headers, Cells, Cell},
        data() {
            return {
                options: [5, 10, 20, 30, 50, 100, 200, 300, 500],
                total: '',
                score: 0
            };
        },
        created() {
            this.findScore();
        },
        methods: {
            getUserId() {
                return JSON.parse(localStorage.getItem('userInfo')).id
            },
            check() {
                if (this.total === null) this.$message.error("请输入或选择金额")
            },
            findScore() {
                findScore(this.getUserId()).then(res => {
                    if (res.code === 1) {
                        this.score = res.data;
                        this.$store.commit('changeScore', this.score);
                    }
                })
            }
        }
    };
</script>

<style lang="scss" scoped>

    .opthin-area {
        padding: 0 15px;
        margin: 0 !important;
    }


    .item {
        border-radius: 8px;
        height: 60px;
        border: 1px solid #1979db;
        margin: 8px;
        line-height: 60px;
        text-align: center;
        color: #1979db;
        font-weight: bolder;
    }

    .btn {
        width: 90%;
        margin: 10px 10px;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #409EFF;
        border: 1px solid #DCDFE6;
        color: white;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        transition: .1s;
        font-weight: 500;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
    }

    .recharge {
        width: 100%;
    }

    .recharge-form {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .tip {
        color: #909399;
        padding: 0 30px;
    }

    .balance {
        display: flex;
        justify-content: space-between;
    }
</style>
