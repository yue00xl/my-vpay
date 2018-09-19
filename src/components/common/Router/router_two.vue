


<template>
    <div class="router_two">
        {{keepAlives}}
        <input type="text" v-model="inputText"/>   
    </div>
</template>

<script>
export default{
    data(){
        return{
            keepAlives:'keep',
            inputText:''
        }
    },
    mounted(){
        
    }
}
</script>

<style>
.router_two{
    margin-top: 100px;
}
input{
    border: 1px solid #000;
}
</style>