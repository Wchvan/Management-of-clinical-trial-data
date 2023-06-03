<template>
    <layout>
        <el-timeline>
            <el-timeline-item
                v-for="item in logArr"
                :key="item"
                :timestamp="item.date"
                placement="top"
                :type="item.type"
            >
                <el-card>
                    <template #header>
                        <div class="flex flex-row justify-center">
                            <h2>{{ item.type }}</h2>
                        </div>
                    </template>
                    <div
                        class="bg-gray-300 border-2 border-gray-200 break-words"
                    >
                        <code class="text-lg"> {{ item.content }}</code>
                    </div>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </layout>
</template>

<script setup lang="ts">
import layout from '../layout.vue';
import { adminApi } from '@/api/admin/admin';
import { logType } from './type';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const logArr = ref<logType[]>([]);

adminApi.getLog().then((res) => {
    if (res.code === 200) {
        logArr.value = res.data;
    } else {
        ElMessage({
            type: 'error',
            message: res.msg,
        });
    }
});
</script>

<style lang="scss" scoped></style>
