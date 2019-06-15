<template>
    <div>
        <div v-for="item in data" style="margin-left:40px;margin-top:20px;">
            <div v-for="item_new in item.new">
                <span>{{item_new.name}}</span>
                <span>:</span>
                <span>{{item_new.value}}</span>
            </div>  
            <div style="margin-left:40px;margin-top:20px;" v-if="item.child">
                <div v-for="child in item.child" style="margin-top:20px;">
                    <div v-for="child_new in child.new">
                        <span>{{child_new.name}}</span>
                        <span>:</span>
                        <span>{{child_new.value}}</span>
                    </div> 
                    <digui :data="child.child"></digui>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'digui',
    props:['data']
}
</script>