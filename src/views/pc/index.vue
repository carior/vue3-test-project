<template>
  <div class="about">
      <a-button type="primary">我是pc主页</a-button>
      <a-button type="primary" @click="totiao('pc')">PC</a-button>
      <a-button type="primary" @click="totiao('admin')">admin</a-button>
      <a-button type="primary" @click="addUser">添加用户</a-button>
      <a-table :columns="columns" :data-source="dataSource" bordered>
        <template #bodyCell="{ column, text, record }">
          <template v-if="['name', 'age', 'address'].includes(column.dataIndex)">
            <div>
              <a-input
                v-if="editableData[record.key]"
                v-model:value="editableData[record.key][column.dataIndex]"
                style="margin: -5px 0"
              />
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'operation'">
            <div class="editable-row-operations">
              <span v-if="editableData[record.key]">
                <a-typography-link @click="save(record.key)">Save</a-typography-link>
                <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
                  <a>Cancel</a>
                </a-popconfirm>
              </span>
              <span v-else>
                <a @click="edit(record.key)">Edit</a>
              </span>
            </div>
          </template>
        </template>
      </a-table>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import axios from 'axios'
import { cloneDeep } from 'lodash-es';
import { reactive, ref,onMounted, type UnwrapRef } from 'vue';
const router = useRouter()
const totiao = (path) => {
  router.push(path)
}

onMounted(() => {
  getUserList()
})

const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    width: '25%',
  },
  {
    title: 'age',
    dataIndex: 'age',
    width: '15%',
  },
  {
    title: 'email',
    dataIndex: 'email',
    width: '40%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];
interface DataItem {
  id: string;
  name: string;
  age: number;
  email: string;
}
let data: DataItem[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    id: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    email: `${i}@qq.cpm`,
  });
}

const dataSource = ref(data);
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

const edit = (key: string) => {
  // editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};
const save = (key: string) => {
  // Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
  // delete editableData[key];
};
const cancel = (key: string) => {
  delete editableData[key];
};

// 获取用户
function getUserList(row) { 
    axios.get('http://localhost:8888/api/user/list').then(res => {
        if (res.status == 200) {
             console.log(res.data.data,'res');
            //  data = res.data.data
        }
    })
}

// 添加用户
function addUser() {
  axios.post('http://localhost:8888/api/user/add', {
    name: '张三',
    age: 18,
    email: 'zhangsan@163.com'
  }).then(res => {
    if (res.status == 200) {
      getUserList()
    }
  })
}

// 编辑用户
function editUser(record) {
  console.log(record)
  axios.put('http://localhost:8888/api/user/update', {
    id: record.id,
    name: '李四',
    age: 20,
    email: 'lisi@163.com'
  }).then(res => {
    if (res.status == 200) {
      getUserList()
    }
  })
}

// 删除用户
function deleteUser(record) {
  console.log(record)
  axios.delete('http://localhost:8888/api/user/delete', {
    id: record.id
  }).then(res => {
    if (res.status == 200) {
      getUserList()
    }
  })
}
</script>
<style>
</style>