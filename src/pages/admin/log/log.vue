<template>
    <layout>
        <el-card>
            <el-select
                v-model="logFilter"
                class="m-4"
                placeholder="Select"
                size="large"
                @change="filter"
            >
                <el-option
                    v-for="item in logTypeOptions"
                    :key="item"
                    :value="item"
                />
            </el-select>
            <el-timeline>
                <el-timeline-item
                    v-for="item in filterArr"
                    :key="item"
                    :timestamp="item.date"
                    placement="top"
                    :type="item.type"
                >
                    <el-card>
                        <div
                            class="bg-gray-300 border-2 border-gray-200 break-words"
                        >
                            <code class="text-lg"> {{ item.content }}</code>
                        </div>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </el-card>
    </layout>
</template>

<script setup lang="ts">
import layout from '../layout.vue';
import { adminApi } from '@/api/admin/admin';
import { logType } from './type';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const logArr = ref<logType[]>([]);

// 过滤相关
const logTypeOptions = ref<string[]>(['all', 'danger', 'info', 'warning']);
const logFilter = ref<'all' | 'danger' | 'info' | 'warning'>('all');

const filterArr = ref<logType[]>(logArr.value);
const filter = (value: 'all' | 'danger' | 'info' | 'warning') => {
    if (value === 'all') {
        filterArr.value = logArr.value;
    } else {
        filterArr.value = logArr.value.filter((item) => {
            return item.type === logFilter.value;
        });
    }
};

adminApi.getLog().then((res) => {
    if (res.code === 200) {
        logArr.value = res.data;
        filterArr.value = logArr.value;
    } else {
        ElMessage({
            type: 'error',
            message: res.msg,
        });
    }
});
</script>

<style lang="scss" scoped></style>
