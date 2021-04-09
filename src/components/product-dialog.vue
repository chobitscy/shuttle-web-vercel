<template>
    <div>
        <div class="add" @click="addToCart()">
            <el-button size="mini" icon="el-icon-plus" round/>
        </div>
        <el-dialog title="提示" :visible.sync="dialogInputVisible" width="80%" center>
            <div class="dialog">
                <el-input placeholder="请输入取件号" v-model="value" class="dialog-control"
                          suffix-icon="el-icon-chat-line-square" type="number"/>
                <el-button size="medium" @click="checkInputDialog">确认</el-button>
            </div>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="dialogUploadVisible" width="80%" center>
            <div class="dialog">
                <el-upload class="upload dialog-control"
                           action="/api/file/upload"
                           multiple
                           :limit="1"
                           :on-success="handleResult"
                           :headers="{Authorization:getToken}">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传不超过10MB的文件</div>
                </el-upload>
                <el-button size="medium" @click="checkUpdateDialog">确认
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "product-dialog",
        props: ['product'],
        data() {
            return {
                dialogUploadVisible: false,
                dialogInputVisible: false,
            }
        },
        computed:{
            getToken() {
                return localStorage.getItem('token')
            }
        },
        methods: {
            checkInputDialog() {
                if (this.value != null && this.value !== '') {
                    this.dialogInputVisible = false;
                    this.type = 'note';
                    this.toCart(this.product)
                } else this.$message.error('请填写单号')
            },
            checkUpdateDialog() {
                if (this.value != null && this.value !== '') {
                    this.dialogUploadVisible = false;
                    this.type = 'file';
                    this.toCart(this.product)
                } else this.$message.error('请上传文件')
            },
            handleResult(response, file) {
                this.value = {
                    name: file.name,
                    url: response.data
                }
            },
            addToCart() {
                if (this.product.store.serviceId === 4) {
                    this.dialogInputVisible = true;
                } else if (this.product.store.serviceId === 2) {
                    this.dialogUploadVisible = true;
                } else {
                    this.toCart(this.product);
                }
            },
            toCart(product) {
                this.$store.commit('addCart', {
                    'id': product.id,
                    'data': {
                        'id': product.id,
                        'name': product.name,
                        'image': product.image,
                        'price': product.price,
                        'rate': product.rate,
                        'sales': product.sales,
                        'storeName': product.store.name,
                        'storeId': product.store.storeId,
                        'count': 1,
                        'extend': {
                            type: this.type,
                            value: this.value
                        },
                        'serviceId': product.store.serviceId
                    }
                });
                this.$message({
                        message: '添加到购物车',
                        type: 'success',
                        duration: 800
                    }
                )
            }
        }
    }
</script>

<style scoped>
    .dialog {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .dialog-control {
        margin: 10px 0;
    }

    .upload {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>