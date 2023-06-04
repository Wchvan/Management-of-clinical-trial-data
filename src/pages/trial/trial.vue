<template>
<trial-revisit v-if="$route.path.match(/\/4$/)"></trial-revisit>
<trial-phase v-else></trial-phase>
</template>

<script setup lang='ts'>
import trialPhase from './trial-phase/trial-phase.vue';
import trialRevisit from './trial-revisit/trial-revisit.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import useTrialsStore from '@/store/trials';

const route = useRoute()
const router = useRouter()
const trialStore = useTrialsStore()

/* 做路由判断 */
const [, , trialId, trialStep] = [...route.path.split('/')]
const routeFlag = ref<boolean>(false)
for( let i of trialStore.trials) {
    if (i._id === trialId) {
        if (i.试验分期.slice(-1) >= trialStep && Number(trialStep) > 0 && Number(trialStep) %1 === 0){
            routeFlag.value = true
        }
    }
}
if ( !routeFlag.value ) {
    router.back()
}

</script>

<style lang='scss' scoped>

</style>