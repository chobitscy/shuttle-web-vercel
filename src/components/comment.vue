<template>
    <div class="container">
        <div class="user">
            <el-avatar :src="'https://api.multiavatar.com/' + comment.name + '.png'"/>
            <div class="info">
                <div v-text="comment.name" :style="'color:' + isLocalUser"></div>
                <div class="date" v-text="getRelativeTime">1小时前</div>
            </div>
            <div class="content message" v-text="comment.content" @click="clickContent"/>
        </div>
        <el-dialog title="修改评论内容" :visible.sync="dialogUpdateVisible" width="80%" center>
            <el-input placeholder="请输入内容" v-model="updateContent" @input="changeInput"
                      suffix-icon="el-icon-edit-outline"/>
            <el-button class="updateCommentButton" size="medium" type="primary" :disabled="disabled" @click="update">
                修改
            </el-button>
            <el-button class="deleteCommentButton" size="medium" type="danger" @click="del">删除</el-button>
        </el-dialog>
    </div>
</template>

<script>
    import moment from 'moment'
    import {delComments, updateComments} from "@/utils/api/comments";

    export default {
        name: "comment",
        props: ['comment'],
        data() {
            return {
                dialogUpdateVisible: false,
                disabled: true,
                updateContent: this.comment.content
            }
        },
        computed: {
            getRelativeTime() {
                return moment(this.comment.date).fromNow();
            },
            isLocalUser() {
                return this.$store.getters.getUserInfo.name === this.comment.name ? '#e6a23c' : ''
            }
        },
        created() {
            moment.locale('zh-cn');
        },
        methods: {
            clickContent() {
                if (this.isLocalUser) this.dialogUpdateVisible = true;
            },
            changeInput() {
                this.disabled = this.updateContent === '' || this.updateContent === this.comment.content;
            },
            update() {
                const userInfo = this.$store.getters.getUserInfo;
                updateComments(
                    {
                        id: this.comment.id,
                        content: this.updateContent,
                        name: userInfo.name,
                        date: this.changeDate(new Date()),
                        storeId: this.comment.storeId,
                        userId: userInfo.id
                    }
                ).then(res => {
                    if (res.code === 1) {
                        this.$message.success('修改成功！');
                        this.dialogUpdateVisible = false;
                        this.comment.content = this.updateContent;
                    }
                })
            },
            changeDate(date) {
                return date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0]
            },
            del() {
                const userInfo = this.$store.getters.getUserInfo;
                delComments({
                    id: this.comment.id,
                    userId: userInfo.id
                }).then(res => {
                    if (res.code === 1) {
                        this.$message.success('删除成功！');
                        this.dialogUpdateVisible = false;
                        this.$emit('getComment');
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .container {
        margin: 10px;
        border-bottom: 2px dashed #f5f5f5;
        padding-bottom: 10px;
    }

    .user {
        display: flex;
        align-items: center;
    }

    .info {
        margin-left: 10px;
        width: 55px;
    }

    .date {
        color: #909399;
        font-size: 1.5vh;
    }

    .content {
        margin-left: 15px;
        display: flex;
        align-items: center;
        color: #606266;
    }

    .message {
        float: left;
        width: 200px;
        background-color: #c0c3cc;
        color: #fff;
        font-size: 12px;
        line-height: 25px;
        padding: 5px 12px 5px 12px;
        box-sizing: border-box;
        border-radius: 6px;
        position: relative;
        word-break: break-all;
    }

    .message::before {
        content: '';
        position: absolute;
        top: 50%;
        left: -5px;
        width: 10px;
        height: 10px;
        margin-top: -5px;
        background: inherit;
        transform: rotate(45deg);
    }

    .updateCommentButton {
        width: 100%;
        margin: 10px 0;
    }

    .deleteCommentButton {
        width: 100%;
        margin-bottom: 10px;
        margin-left: 0px;
    }
</style>