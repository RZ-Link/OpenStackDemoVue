<script setup>
import { ref, onMounted } from "vue";
import { getImageList } from "@/api/image";

defineOptions({
  name: "image_"
});

const imageList = ref([]);

onMounted(async () => {
  const imageListResponse = await getImageList();
  imageList.value = imageListResponse.data.images;
});
</script>

<template>
  <div>
    <el-container>
      <el-header />
      <el-main>
        <el-table :data="imageList" style="width: 100%">
          <el-table-column prop="id" label="id" />
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="status" label="状态" />
          <el-table-column prop="diskFormat" label="磁盘格式" />
          <el-table-column prop="size" label="大小（字节）" />
          <el-table-column prop="checksum" label="校验和（MD5）" />
          <el-table-column prop="createdAt" label="创建时间" />
          <el-table-column prop="updatedAt" label="更新时间" />
        </el-table>
      </el-main>
      <el-footer />
    </el-container>
  </div>
</template>
