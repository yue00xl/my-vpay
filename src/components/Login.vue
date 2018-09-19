
<template>
    <div>
        Login
        <div class="Login">
            <button @click="Logins">
                登录
            </button>
        </div>
    </div>
</template>

<script>
export default{
    methods:{
        Logins(){
            localStorage.setItem('token',true);
            this.$router.replace({path:'/'})
        }
    }
}
</script>

<style>
.Login{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
button{
    width: 100px;
    height: 30px;
    display: block;
    border: 1px solid #ccc;
}
</style>



