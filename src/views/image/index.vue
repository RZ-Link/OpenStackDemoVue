<script setup lang="ts">
import { getImageList } from "@/api/image";

defineOptions({
  name: "image_"
});

const imageListResponse = await getImageList();
console.log(imageListResponse);
</script>

<template>
  <h1>image</h1>
</template>
