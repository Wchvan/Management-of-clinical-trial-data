<template>
    <el-container class="h-full">
        <el-main>
            <el-form
                :model="form"
                label-width="120px"
                class="flex flex-col justify-around h-full"
            >
                <el-form-item label="Activity name">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="Activity zone">
                    <el-select
                        v-model="form.region"
                        placeholder="please select your zone"
                    >
                        <el-option label="Zone one" value="shanghai" />
                        <el-option label="Zone two" value="beijing" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Activity time">
                    <el-col :span="11">
                        <el-date-picker
                            v-model="form.date1"
                            type="date"
                            placeholder="Pick a date"
                            style="width: 100%"
                        />
                    </el-col>
                    <el-col :span="2" class="text-center">
                        <span class="text-gray-500">-</span>
                    </el-col>
                    <el-col :span="11">
                        <el-time-picker
                            v-model="form.date2"
                            placeholder="Pick a time"
                            style="width: 100%"
                        />
                    </el-col>
                </el-form-item>
                <el-form-item label="Instant delivery">
                    <el-switch v-model="form.delivery" />
                </el-form-item>
                <el-form-item label="Activity type">
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox label="Online activities" name="type" />
                        <el-checkbox label="Promotion activities" name="type" />
                        <el-checkbox label="Offline activities" name="type" />
                        <el-checkbox
                            label="Simple brand exposure"
                            name="type"
                        />
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="Resources">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="Sponsor" />
                        <el-radio label="Venue" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="Activity form">
                    <el-input v-model="form.desc" type="textarea" />
                </el-form-item>
            </el-form>
        </el-main>
        <el-footer class="flex flex-row justify-center">
            <el-button type="danger" size="large" @click="reset"
                >重置</el-button
            >
            <el-button type="success" size="large" @click="onSubmit"
                >上传</el-button
            >
        </el-footer>
    </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { formType } from '../type';

const emits = defineEmits<{
    (e: 'hiddenDialog'): void;
}>();

// 表单事件
const form = ref<formType>({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
});

const onSubmit = () => {
    emits('hiddenDialog');
    console.log('submit');
};
const reset = () => {
    form.value = {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
    };
};
</script>

<style lang="scss" scoped></style>
