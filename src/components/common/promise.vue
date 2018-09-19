
<!--Promiss-->

<template>
    <div>
        
    </div>
</template>

<script>
export default{
    data(){
        return{
            arr:[1,2,3,4,5,10,2]
        }
    },
    mounted(){
        console.log(this.isReact(this.arr));
    },
    methods:{
        isReact(arr){
            var hash = {};
            for(var i in arr) {
                if(hash[arr[i]])
                    return true;
                hash[arr[i]] = true;
            }
            return false;
        }
    }
}
</script>

<style>

</style>

