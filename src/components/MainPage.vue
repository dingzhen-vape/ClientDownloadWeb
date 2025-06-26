<script>
import Meteor from './Meteor.vue';
import Wurst from './WurstCN.vue';
export default {
    components: {
        Meteor,
        Wurst,
    },
    methods: {
        refresh() {
            alert('yes')
        }
    }
}
</script>
<template>
    <!-- 中间 -->
    <div class="base">
        <div class="main">
            <Meteor></Meteor>
            <Wurst></Wurst>
            <div class="Refresh" @click="refresh">
                <div class="title">
                    <h1>刷新</h1>
                </div>
            </div>
        </div>
    </div>
</template>