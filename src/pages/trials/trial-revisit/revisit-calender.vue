<template>
    <el-card>
        <el-calendar v-model="dateVal">
        <template #date-cell="{ data }">
            <div
                :class="[
                    isSelect(data.day) ? 'bg-red-200' : '',
                    data.isSelected ? 'bg-blue-400' : '',
                ]"
                class="w-full h-full"
                @click="getSubjectInfo(data.day)"
            >
                <p
                    style="display: inline-flex; align-items: center"
                    :class="data.isSelected ? 'font-red' : ''"
                >
                    {{ data.day.split('-').slice(1).join('-') }}
                    <i-ep-User v-if="isSelect(data.day)"></i-ep-User>
                </p>
            </div>
        </template>
    </el-calendar>
    </el-card>
    <revisit-subjects-dialog
        :visible="dialogVisible"
        :data="subjectInfo"
    ></revisit-subjects-dialog>
</template>

<script setup lang="ts">
import { examineeApi } from '@/api/examinee/examinee';
import type { subjectInfo } from './type';
import { ElMessage } from 'element-plus';
import { ref, watch } from 'vue';
import revisitSubjectsDialog from './revisit-subjects-dialog.vue';

const dateVal = ref<Date>(new Date());

/* 获取有随访预约的日志 */
const selectedDay = ref<string[]>([]);
const getSelectDay = (month: string) => {
    selectedDay.value = [];
    examineeApi.getRevisitDay({ month: month }).then((res) => {
        if (res.code === 200) {
            for (let i of res.data) {
                selectedDay.value.push(i);
            }
        } else {
            ElMessage({
                type: 'error',
                message: res.msg,
            });
        }
    });
};
getSelectDay(dateVal.value.getMonth().toString());
watch(dateVal, (newVal, oldVal) => {
    if (newVal.getMonth() !== oldVal.getMonth()) {
        getSelectDay(newVal.getMonth().toString());
    }
});

/* 判断是否是预约的日子 */
const isSelect = (day: string): boolean => {
    for (let i of selectedDay.value) {
        if (i === day) return true;
    }
    return false;
};

/* 选择日期进行的操作 */
const subjectInfo = ref<subjectInfo[]>([]);
const dialogVisible = ref<boolean>(false);
const getSubjectInfo = (date: string) => {
    if (isSelect(date)) {
        examineeApi.getRevisitSubjects({ date: date }).then((res) => {
            if (res.code === 200) {
                subjectInfo.value = res.data;
                dialogVisible.value = false;
                setTimeout(() => {
                    dialogVisible.value = true;
                });
            } else {
                ElMessage({
                    type: 'error',
                    message: res.msg,
                });
            }
        });
    }
};
</script>

<style lang="scss">
.el-calendar-table .el-calendar-day {
    padding: 0;
}
</style>
