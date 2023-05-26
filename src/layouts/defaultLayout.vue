<template>
    <el-container class="w-full h-full">
        <el-aside width="200px" class="h-full">
            <left-nav></left-nav>
        </el-aside>
        <el-container>
            <el-header
                class="h-16 grid grid-cols-10 p-0 border-b-2 border-gray-200"
                style="box-shadow: -5px 0 10px -5px #ccc"
            >
                <top-nav></top-nav>
            </el-header>
            <el-main >
                <slot></slot>
            </el-main>
            <el-footer class="text-center h-fit">
                <div class="text-xl font-bold" style="color: #ccc">
                    本系统由信安小队开发----致力于研发一款医药研发临床试验数据隐私管理系统
                </div>
            </el-footer>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import leftNav from '@/components/leftNav.vue';
import topNav from '@/components/topNav.vue';
</script>

<style lang="scss" scoped></style>
