<template>
    <div class="Login" >
        <!--1111111111111111111111111111111-->
        <!--<button @click="app">点击</button>-->

            <div class="d1">
                <h1 class="h1">We Are Nike</h1>
                <div class="d1-1">
                    <el-form ref="form" :model="form" label-width="80px" class="y1">
                        <el-form-item label="手机号:" >
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
                this.$axios({
                    url:'/login/login',
                    method:'post',
                    data:{
                    password: this.form.pass,
                    phone: this.form.name,
                    }
                }).then((res)=>{
                   
                    if (res.data.code==0){//
                        this.$router.push('/about/welcome');
                        this.$store.commit('toFlase')
                        sessionStorage.setItem('token',res.data.date.token);
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
    
        overflow: hidden;
    }
    
    .d1{
        width: 500px;
        height: 400px;
        background:#333;
        overflow: hidden;
        box-shadow: 1px 2px 12px -3px;
        margin: 200px auto;
    }
    .h1{
        margin: 30px auto;
        text-align: center;
        color: white;
    }
    .el-form{
        margin-left: 50px;
    }

    .el-input{
        width: 300px;
    }

    .d1-button{
        margin-left: 220px;
    }

    .d1-1{
        margin: 90 auto;
    }
</style>