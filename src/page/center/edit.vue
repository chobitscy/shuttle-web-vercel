<template>
    <page class="page">
        <template #headers>

            <headers>
                <span><i class="el-icon-user"></i> 个人信息</span>
                <span slot="icon" @click="$router.replace('/home')"><i class="el-icon-house"></i></span>
            </headers>
        </template>
        <template #center>
            <cells :tidy-header="true">
                <cell icon="el-icon-user-solid" title="头像">
                    <template v-slot:footer>
                        <el-avatar :src="avatarUrl" @click.native="clickAvatar"/>
                    </template>
                </cell>
            </cells>
            <cells :tidy-header="true">
                <cell icon="el-icon-user" title="昵称">
                    <div v-text="userInfo.name"/>
                    <template v-slot:footer>
                        <edit-dialog :value="userInfo.name" @save="setName" type="name" icon="el-icon-user"
                                     title="昵称修改"/>
                    </template>
                </cell>
                <cell icon="el-icon-mobile-phone" title="电话">
                    <div v-text="userInfo.phone"/>
                    <template v-slot:footer>
                        <edit-dialog
                                :value="userInfo.phone"
                                :min-length="11"
                                :max-length="11"
                                show-word-limit
                                @save="setPhone"
                                regex="^1(3|4|5|6|7|8|9)\d{9}$"
                                errorMsg="长度11位"
                                type="phone"
                                icon="el-icon-phone"
                                title="电话修改"
                        />
                    </template>
                </cell>
                <cell icon="el-icon-location-information" title="地址">
                    <div v-text="userInfo.address"/>
                    <template v-slot:footer>
                        <edit-dialog
                                :value="userInfo.address"
                                @save="setLocal"
                                icon="el-icon-school"
                                title="地址修改"
                                type="address"
                        />
                    </template>
                </cell>
            </cells>
            <cells>
                <cell icon="el-icon-lock" title="修改密码" :access="true" @click="dialogResetPasswordVisible = true"/>
            </cells>
            <el-dialog title="修改密码" :visible.sync="dialogResetPasswordVisible" width="80%" center>
                <div class="reset-password">
                    <el-input placeholder="请输入新密码" v-model="resetPassword" suffix-icon="el-icon-key"
                              class="reset" @input="changeInput"/>
                    <el-input placeholder="请重复输入新密码" v-model="reResetPassword" suffix-icon="el-icon-key"
                              class="reset"/>
                    <el-button v-text="'保存'" @click="reset" class="reset" type="primary" :disabled="disabled"/>
                </div>
            </el-dialog>
        </template>
    </page>
</template>

<script>
    import Cell from "@/components/cell.vue";
    import cells from "@/components/cells.vue";
    import EditDialog from "@/components/edit-dialog.vue";
    import Page from "@/layout/page.vue";
    import Headers from "@/components/headers.vue";
    import {reset, update} from "@/utils/api/user";

    export default {
        components: {cells, Cell, EditDialog, Page, Headers},
        name: "edit",
        data() {
            return {
                userInfo: {
                    name: null,
                    phone: null,
                    address: null,
                },
                dialogResetPasswordVisible: false,
                resetPassword: null,
                reResetPassword: null,
                disabled: true
            };
        },
        created() {
            this.getUserInfo()
        },
        methods: {
            getUserInfo() {
                this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
            },
            setName: function (res) {
                this.userInfo.name = res;
                this.updateUserInfo()
            },
            setPhone: function (res) {
                this.userInfo.phone = res;
                this.updateUserInfo()
            },
            setLocal: function (res) {
                this.userInfo.address = res;
                this.updateUserInfo()
            },
            updateUserInfo() {
                update(this.userInfo).then(res => {
                    if (res.code === 1) {
                        this.$message.success('更新成功!');
                        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
                        userInfo.phone = this.userInfo.phone;
                        userInfo.address = this.userInfo.address;
                        userInfo.name = this.userInfo.name;
                        localStorage.setItem('userInfo', JSON.stringify(userInfo));
                        this.getUserInfo()
                    }
                })
            },
            reset() {
                if (this.resetPassword === null && this.reResetPassword === null) this.$message.error('密码不能为空');
                else if (this.resetPassword === this.reResetPassword) {
                    reset({
                        id: this.userInfo.id,
                        password: this.resetPassword
                    }).then(res => {
                        if (res.code === 1) {
                            this.$message.success('修改成功！');
                            this.dialogResetPasswordVisible = false;
                        }
                    })
                } else this.$message.error('两次密码不一致')
            },
            clickAvatar() {
                this.$confirm('头像根据昵称改变', '提示', {
                    type: 'info'
                }).then(() => {
                }).catch(() => {
                });
            },
            changeInput(value){
                if(value === '') this.disabled = true;
                else this.disabled = false;
            }
        },
        computed: {
            avatarUrl: function () {
                return `https://api.multiavatar.com/${this.userInfo.name}.png`;
            },
        },
    };
</script>

<style scoped>
    .page {
        background-color: #f8f8f8;
    }

    .reset-password {
        display: flex;
        flex-direction: column;
    }

    .reset {
        margin: 10px 0;
    }
</style>