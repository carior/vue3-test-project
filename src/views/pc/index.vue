<template>
  <div class="about">
    <a-card title="用户管理" :bordered="false">
      <template #extra>
        <a-button type="primary" @click="showModal">添加用户</a-button>
      </template>
      
      <a-space style="margin-bottom: 16px">
        <a-input-search
          v-model:value="searchText"
          placeholder="请输入搜索关键词"
          style="width: 200px"
          @search="onSearch"
        />
      </a-space>

      <a-table
        :columns="columns"
        :data-source="dataSource"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'operation'">
            <a-space>
              <a @click="handleEdit(record)">编辑</a>
              <a-popconfirm
                title="确定要删除这条记录吗？"
                @confirm="handleDelete(record)"
              >
                <a class="danger">删除</a>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>

    <!-- 编辑/添加用户弹窗 -->
    <a-modal
      v-model:visible="modalVisible"
      :title="modalTitle"
      @ok="handleModalOk"
      @cancel="handleModalCancel"
    >
      <a-form
        :model="formState"
        :rules="rules"
        ref="formRef"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item label="姓名" name="name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="年龄" name="age">
          <a-input-number v-model:value="formState.age" style="width: 100%" />
        </a-form-item>
        <a-form-item label="邮箱" name="email">
          <a-input v-model:value="formState.email" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import type { TablePaginationConfig } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import axios from 'axios';

interface DataItem {
  id: string;
  name: string;
  age: number;
  email: string;
}

interface FormState {
  id?: string;
  name: string;
  age: number;
  email: string;
}

// 表格列定义
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
  },
];

// 响应式数据
const loading = ref<boolean>(false);
const dataSource = ref<DataItem[]>([]);
const searchText = ref<string>('');
const modalVisible = ref<boolean>(false);
const modalTitle = ref<string>('添加用户');
const formRef = ref();

// 表单数据
const formState = reactive<FormState>({
  name: '',
  age: 18,
  email: '',
});

// 表单验证规则
const rules = {
  name: [{ required: true, message: '请输入姓名' }],
  age: [{ required: true, message: '请输入年龄' }],
  email: [
    { required: true, message: '请输入邮箱' },
    { type: 'email', message: '请输入有效的邮箱地址' },
  ],
};

// 分页配置
const pagination = reactive<TablePaginationConfig>({
  total: 0,
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  showTotal: (total) => `共 ${total} 条`,
});

// 获取用户列表
const getUserList = async () => {
  loading.value = true;
  try {
    const res = await axios.get('http://localhost:8888/api/user/list', {
      params: {
        page: pagination.current,
        pageSize: pagination.pageSize,
        name: searchText.value,
      },
    });
    if (res.status === 200) {
      dataSource.value = res.data.data;
      pagination.total = res.data.total;
    }
  } catch (error) {
    message.error('获取用户列表失败');
  } finally {
    loading.value = false;
  }
};

// 表格变化处理
const handleTableChange = (pag: TablePaginationConfig) => {
  pagination.current = pag.current || 1;
  pagination.pageSize = pag.pageSize || 10;
  getUserList();
};

// 搜索处理
const onSearch = () => {
  pagination.current = 1;
  getUserList();
};

// 显示添加用户弹窗
const showModal = () => {
  modalTitle.value = '添加用户';
  formState.id = undefined;
  formState.name = '';
  formState.age = 18;
  formState.email = '';
  modalVisible.value = true;
};

// 显示编辑用户弹窗
const handleEdit = async (record: DataItem) => {
  const res = await axios.get(`http://localhost:8888/api/user/detail/${record.id}`);
  if (res.status === 200) {
    Object.assign(formState, res.data.data);
  }
  modalTitle.value = '编辑用户';
  
  modalVisible.value = true;
};

// 删除用户
const handleDelete = async (record: DataItem) => {
  try {
    const res = await axios.delete(`http://localhost:8888/api/user/delete/${record.id}`);
    if (res.status === 200) {
      message.success('删除成功');
      getUserList();
    }
  } catch (error) {
    message.error('删除失败');
  }
};

// 弹窗确认
const handleModalOk = async () => {
  try {
    await formRef.value.validate();
    if (formState.id) {
      // 编辑用户
      const res = await axios.post(`http://localhost:8888/api/user/update/${formState.id}`, {
        name: formState.name,
        age: formState.age,
        email: formState.email
      });
      if (res.status === 200) {
        message.success('更新成功');
        modalVisible.value = false;
        getUserList();
      }
    } else {
      // 添加用户
      const res = await axios.post('http://localhost:8888/api/user/add', formState);
      if (res.status === 200) {
        message.success('添加成功');
        modalVisible.value = false;
        getUserList();
      }
    }
  } catch (error) {
    message.error('操作失败');
  }
};

// 弹窗取消
const handleModalCancel = () => {
  modalVisible.value = false;
  formRef.value?.resetFields();
};

// 初始化
onMounted(() => {
  getUserList();
});
</script>

<style scoped>
.danger {
  color: #ff4d4f;
}
.danger:hover {
  color: #ff7875;
}
</style>