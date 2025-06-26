<script>
import Meteor from './Meteor.vue';
import Wurst from './WurstCN.vue';
export default{
    components: {
        Meteor,
        Wurst,
    }
}
</script>
<template>
    <!-- 中间 -->
    <div class="base">
        <div class="main">
            <Meteor></Meteor>
            <div class="Refresh">
                <h1>刷新</h1>
            </div>
            <Wurst></Wurst>
        </div>
    </div>
</template>