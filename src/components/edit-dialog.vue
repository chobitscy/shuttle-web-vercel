<template>
    <div>
        <i class="el-icon-edit-outline" @click="editing = true"/>

        <el-dialog :title="title" :visible.sync="editing" width="300px" center>
            <el-input
                    v-bind="$props"
                    v-model="newValue"
                    :minlength="minLength"
                    :maxlength="maxLength"
                    @input="checkInput"
                    :suffix-icon="icon"
            />
            <div class="error-msg" v-if="!pass" v-text="errorMsg"/>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handle" v-text="'保存'" :disabled="disabled"/>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props: {
            type: String,
            value: String,
            placeholder: String,
            minLength: Number,
            maxLength: Number,
            showWordLimit: Boolean,
            regex: String,
            errorMsg: String,
            icon: String,
            title: String
        },
        data() {
            return {
                editing: false,
                newValue: "",
                regExp: null,
                pass: true,
                disabled: true
            };
        },
        methods: {
            handle() {
                if (!this.regExp.test(this.newValue)) this.$message.error('输入手机号格式不正确');
                else if (this.newValue === '') this.$message.error('输入不能为空');
                else {
                    this.pass = true;
                    this.editing = false;
                    this.$emit("save", this.newValue);
                }
            },

            checkInput(value) {
                if (this.$store.getters.getUserInfo[this.type] === value) this.disabled = true;
                else this.disabled = false;
            }
        },
        created: function () {
            this.newValue = this.$props.value;
            this.regExp = new RegExp(this.regex);
        },
    };
</script>

<style lang="scss" scoped>
    .error-msg {
        color: #f03618;
    }

    .dialog-footer .el-button {
        width: 240px;
    }
</style>