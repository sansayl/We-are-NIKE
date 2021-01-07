<template>
    <div class="Login" >
        <!--1111111111111111111111111111111-->
        <!--<button @click="app">点击</button>-->

            <div class="d1">
                <div class="d1-1">
                    <el-form ref="form" :model="form" label-width="80px" class="y1">
                        <el-form-item label="手机号:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="密码:">
                            <el-input v-model="form.pass" type="password"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-row class="d1-button">
                        <el-button type="primary" @click="app">登录</el-button>
                    </el-row>
                </div>

            </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data:function(){
            return{
                msg:true,
                form: {
                    name: '',
                    pass:''
                },
            }
        },
        methods:{
            app(){
                    console.log(this.form.name);
                    console.log(this.form.pass);
                    // this.msg=!this.msg;
                    // this.$router.push('/main');
                    
                this.$axios({
                    url:'/login/login',
                    method:'post',
                    data:{
                    password: this.form.pass,
                    phone: this.form.name,
                    }
                }).then((res)=>{
                    console.log(res);
                    if (res.data.code==0){//
                        this.$router.push('/about/welcome');
                        this.$store.commit('toFlase')
                        window.sessionStorage.setItem("token",res.data.date.token);
                        window.sessionStorage.setItem("employee",res.data.date.employee);
                        window.sessionStorage.setItem("powerList",res.data.date.powerList);
                        this.msg=!this.msg;
                    }else{
                        alert(res.data.msg)
                    }
                
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        mounted(){

        }
    }
</script>

<style scoped lang="less">

    body{
        margin: 0;
        padding: 0;
        width:100%;
        height: 100%;
        background: #00bfbf !important;
        overflow: hidden;
    }

    .d1{
        width: 500px;
        height: 400px;
        background: rgba(248, 255, 220,.8);
        overflow: hidden;
        box-shadow: 1px 2px 12px -3px;
    }

    .el-form{
        margin-left: 50px;
    }

    .el-input{
        width: 300px;
    }

    .d1-button{
        margin-left: 200px;
    }

    .d1-1{
        margin: 140px auto;
    }
</style>