<template>
    <div class="wd100 ht100 login-bg">
        <el-card class="w-1/4 h-fit center opacity-90">
            <template #header>
                <div class="text-center">
                    <span className="text-3xl font-bold">登录</span>
                </div>
            </template>
            <div>
                <el-form status-icon id="login-form" :model="loginForm" ref="loginFormRef" :rules="rules" >
                    <el-form-item prop="username" >
                        <el-input size="large" placeholder="输入账号" class="h-11" v-model="loginForm.username">
                            <template #prepend>
                                <i-ep-user class="text-xl" />
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password" >
                        <el-input size="large" placeholder="输入密码" class="h-11" v-model="loginForm.password" type="password" show-password>
                            <template #prepend>
                                <i-ep-lock class="text-xl" />
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox label="请记住我" v-model="loginForm.remember_me" class="ml-2"></el-checkbox>
                        <div class="flex-grow"></div>
                        <el-link>登录遇到问题？</el-link>
                    </el-form-item>
                    <el-button type="primary" class="centerX w-1/2" size="large" round @click="submitForm(loginFormRef)">登录</el-button>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import type { loginFormType } from './type';
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { userApi } from '@/api/user/user';
import { useRouter } from 'vue-router';

const router = useRouter()

/* 提交的表单 */
const loginForm = reactive<loginFormType>({
    username: '',
    password: '',
    remember_me: false,
});

const loginFormRef = ref<FormInstance>();

/* 表单校验规则 */
const validateUser = (rule: any, value: string, callback: any) => {
    console.log(value)
    if (value === '') {
        callback(new Error('请输入账号！'));
    } else {
        callback()
    }
};

const validatePass = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码!'));
    } else if (value.length < 6 || value.length > 12) {
        callback(new Error('密码长度为6到12位'));
    } else {
        callback()
    }
};

const rules = reactive<FormRules>({
    username: [{ validator: validateUser, trigger: 'blur' }],
    password: [{ validator: validatePass, trigger: '' }],
});

/* 提交表单函数 */
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid, error) => {
        if (valid) {
            console.log('submit!')
            userApi.login(loginForm).then(res => {
                if (res === 200) router.push('/')
            })
        } else {
            console.log('error submit!')
            return false
        }
    })
}
</script>

<style lang="scss" scoped>
.login-bg {
    background: url('@/assets/login-bg.jpg') no-repeat center;
    background-size: 100% 100%;
}
</style>
