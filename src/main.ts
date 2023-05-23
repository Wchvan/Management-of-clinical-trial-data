import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from '@/router';

// 创建vue实例
const app = createApp(App);
// 挂载pinia
app.use(store);
// 使用router
app.use(router);
// 挂载实例
app.mount('#app');
