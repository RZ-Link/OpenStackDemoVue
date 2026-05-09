<script setup>
import { ref, onMounted } from "vue";
import { getFlavorList } from "@/api/flavor";

defineOptions({
  name: "flavor"
});

const flavorList = ref([]);

onMounted(async () => {
  const flavorListResponse = await getFlavorList();
  flavorList.value = flavorListResponse.data.flavors;
});
</script>

<template>
  <div>
    <el-container>
      <el-header />
      <el-main>
        <el-table :data="flavorList" style="width: 100%">
          <el-table-column prop="id" label="id" />
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="vcpus" label="vcpu数量" />
          <el-table-column prop="ram" label="内存（MB）" />
          <el-table-column prop="disk" label="硬盘（GB）" />
        </el-table>
      </el-main>
      <el-footer />
    </el-container>
  </div>
</template>
