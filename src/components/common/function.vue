
<template>
    <div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    mounted(){
        this.$store.commit('HEADERTITLE','函数传参');

        var myArray = [5, 10, 50];
        console.log(Math.max(myArray));  //NaN
        console.log(Math.max(...myArray)); // 50
        console.log(Math.max.apply(null,myArray)); // 50

        function myFunction() {
            for(var i in arguments){
                console.log(arguments[i]);
            }
        }
        var params = [10, 15];
        myFunction(5, ...params, 20, ...[25]);    // 5 10 15 20 25

        console.log(new Date(...[2018, 10, 24]))  

        function myFunctionOptions(...options) {
            console.log(options)
            return options;
        }
        myFunctionOptions(...params);
    }
}
</script>
