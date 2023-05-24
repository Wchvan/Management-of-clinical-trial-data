<template>
    <defaultLayout v-if="!$route.meta.avoidLayout">
        <RouterView></RouterView>
    </defaultLayout>
    <RouterView v-else></RouterView>
</template>

<script setup lang="ts">
import defaultLayout from '@/layouts/defaultLayout.vue';
</script>

<style lang="scss">
@import './styles/common.scss';
</style>
