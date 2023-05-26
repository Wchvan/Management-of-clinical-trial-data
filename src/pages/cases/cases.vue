<template>
    <el-container>
        <el-header class="h-fit flex flex-row justify-around w-full">
            <div class="w-5/6">
                <el-input v-model="searchVal" placeholder="请输入想查询的关键词" size="large" class="mb-3">
                    <template #append>
                        <el-button id="search" type="primary" @click="handleSearch">
                            <i-ep-search></i-ep-search>
                        </el-button>
                    </template>
                </el-input>
            </div>
            <div class="w-1/8">
                <el-button type="primary" size="large" @click="clearFilter" class="w-full" round>重置所有过滤条件</el-button>
            </div>
        </el-header>
        <el-main>
            <el-table ref="tableRef" row-key="date" :data="tableData" style="width: 100%">
                <el-table-column fixed="left" prop="date" label="Date" sortable width="150" column-key="date" :filters="[
                    { text: '2016-05-01', value: '2016-05-01' },
                    { text: '2016-05-02', value: '2016-05-02' },
                    { text: '2016-05-03', value: '2016-05-03' },
                    { text: '2016-05-04', value: '2016-05-04' },
                ]" :filter-method="filterHandler" />
                <el-table-column prop="name" label="Name" width="120" />
                <el-table-column prop="state" label="State" width="120" />
                <el-table-column prop="city" label="City" width="120" />
                <el-table-column prop="address" label="Address" width="500" />
                <el-table-column prop="zip" label="Zip" width="120" />
                <el-table-column prop="tag" label="Tag" width="100" :filters="[
                    { text: 'Home', value: 'Home' },
                    { text: 'Office', value: 'Office' },
                ]" :filter-method="filterTag" filter-placement="bottom-end">
                    <template #default="scope">
                        <el-tag :type="scope.row.tag === 'Home' ? '' : 'success'" disable-transitions>{{ scope.row.tag
                        }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" width="150">
                    <template #header>
                        <el-button type="success" @click="addCase">添加病例</el-button>
                    </template>

                    <template #default>
                        <div class="pl-1">
                            <el-button link type="primary" size="small" @click="handleClick">Detail</el-button>
                            <el-button link type="primary" size="small">Edit</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
    <add-case-dialog v-if="dialogVisible" :visible="dialogVisible" @hiddenDialog="hiddenDialog"></add-case-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TableColumnCtx, TableInstance } from 'element-plus';
import addCaseDialog from './addCaseDialog.vue';

// 搜索相关
const searchVal = ref<string>('');
const handleSearch = () => {
    console.log(searchVal.value);
};

// 表格相关
interface User {
    date: string;
    name: string;
    state: string;
    city: string;
    address: string;
    zip: string;
    tag: string;
}
const tableRef = ref<TableInstance>();

// TODO: improvement typing when refactor table
const clearFilter = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    tableRef.value!.clearFilter();
};
const formatter = (row: User, column: TableColumnCtx<User>) => {
    return row.address;
};
const filterTag = (value: string, row: User) => {
    return row.tag === value;
};
const filterHandler = (
    value: string,
    row: User,
    column: TableColumnCtx<User>,
) => {
    const property = column['property'];
    return row[property as keyof User] === value;
};
const handleClick = () => {
    console.log('click');
};
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Home',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Home',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
    },
];

// 添加病例对话框相关
const dialogVisible = ref<boolean>(false);
const addCase = () => {
    // 通过异步实现子组件点击遮罩层等情况关闭时依然能够重新打开
    dialogVisible.value = false;
    setTimeout(() => {
        dialogVisible.value = true;
    }, 0);
};
const hiddenDialog = () => {
    dialogVisible.value = false;
};
</script>

<style lang="scss" scoped></style>
