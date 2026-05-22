<script setup>
import { Graph, Stencil, Snapline, Selection, Keyboard } from "@antv/x6";
import { onMounted, ref, reactive } from "vue";
import { getImageList } from "@/api/image";
import { ElMessage } from "element-plus";

defineOptions({
  name: "editor"
});

onMounted(async () => {
  const stencilDiv = document.getElementById("stencilDiv");
  const contentDiv = document.getElementById("contentDiv");

  const graph = new Graph({
    container: contentDiv,
    background: {
      color: "#F2F7FA"
    },
    connecting: {
      allowBlank: false,
      allowMulti: false,
      allowLoop: false,
      allowNode: false,
      allowEdge: false,
      allowPort: true
    }
  });
  // 启用对齐线
  graph.use(
    new Snapline({
      enabled: true,
      sharp: true
    })
  );
  // 启用选择
  graph.use(
    new Selection({
      enabled: true,
      showNodeSelectionBox: true,
      showEdgeSelectionBox: true
    })
  );
  // 启用快捷键
  graph.use(
    new Keyboard({
      enabled: true
    })
  );
  graph.bindKey("backspace", () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.removeCells(cells);
    }
    return false;
  });
  // 节点监听单击鼠标事件
  graph.on("node:click", ({ e, x, y, node, view }) => {
    const data = node.getData();
    if (data.type === 1) {
      switchForm.node = node;
      switchForm.networkAddress = data.networkAddress;
      switchForm.gatewayIp = data.gatewayIp;
      switchEdit.value = true;
    }
  });
  // 画布空白区域监听单击鼠标事件
  graph.on("blank:click", ({ e, x, y, node, view }) => {
    switchEdit.value = false;
  });
  // 当节点被添加到画布时触发
  graph.on("node:added", ({ node, index, options }) => {
    node.label = node.label + "-" + node.id.slice(0, 4);
  });

  const stencil = new Stencil({
    title: "Stencil",
    target: graph,
    search(cell, keyword) {
      return cell.shape.indexOf(keyword) !== -1;
    },
    placeholder: "搜索",
    notFoundText: "没有找到查询结果",
    collapsable: true,
    stencilGraphHeight: 0,
    groups: [
      {
        name: "group1",
        title: "Group1"
      },
      {
        name: "group2",
        title: "Group2"
      }
    ]
  });

  stencilDiv.appendChild(stencil.container);

  const commonAttrs = {
    body: {
      fill: "#fff",
      stroke: "#8f8f8f",
      strokeWidth: 1
    }
  };
  const ports = {
    groups: {
      top: {
        position: "top",
        attrs: {
          circle: {
            magnet: true,
            stroke: "#8f8f8f",
            r: 5
          }
        }
      },
      bottom: {
        position: "bottom",
        attrs: {
          circle: {
            magnet: true,
            stroke: "#8f8f8f",
            r: 5
          }
        }
      },
      left: {
        position: "left",
        attrs: {
          circle: {
            magnet: true,
            stroke: "#8f8f8f",
            r: 5
          }
        }
      },
      right: {
        position: "right",
        attrs: {
          circle: {
            magnet: true,
            stroke: "#8f8f8f",
            r: 5
          }
        }
      }
    },
    items: [
      { id: "top-port", group: "top" },
      { id: "right-port", group: "right" },
      { id: "bottom-port", group: "bottom" },
      { id: "left-port", group: "left" }
    ]
  };

  const switch_ = graph.createNode({
    shape: "image",
    x: 290,
    y: 150,
    width: 60,
    height: 40,
    imageUrl: "/switch.svg",
    label: "交换机",
    attrs: commonAttrs,
    ports: ports,
    data: {
      type: 1
    }
  });
  const router_ = graph.createNode({
    shape: "image",
    x: 290,
    y: 150,
    width: 60,
    height: 40,
    imageUrl: "/router.svg",
    label: "路由器",
    attrs: commonAttrs,
    ports: ports,
    data: {
      type: 2
    }
  });
  stencil.load([switch_, router_], "group1");

  const imageListResponse = await getImageList();
  const images = imageListResponse.data.images;
  if (images && images.length) {
    const nodes = [];
    images.forEach(image => {
      nodes.push({
        shape: "image",
        x: 290,
        y: 150,
        width: 60,
        height: 40,
        imageUrl: "/linux.svg",
        label: image.name,
        attrs: commonAttrs,
        ports: ports,
        data: {
          type: 3,
          image: image.id
        }
      });
    });
    stencil.load(nodes, "group2");
  }
});
// 编辑交换机
const switchEdit = ref(false);
const switchForm = reactive({
  node: {},
  networkAddress: "",
  gatewayIp: ""
});
const onSwitchSave = () => {
  const data = switchForm.node.getData();
  data.networkAddress = switchForm.networkAddress;
  data.gatewayIp = switchForm.gatewayIp;
  switchForm.node.setData(data);
  ElMessage({
    message: "保存成功",
    type: "success"
  });
};
</script>

<template>
  <div class="stencil-app">
    <div id="stencilDiv" class="app-stencil" />
    <div class="app-main">
      <div class="app-toolbar">
        <el-button type="primary">启动</el-button>
      </div>
      <div id="contentDiv" class="app-content" />
    </div>
    <div id="editDiv" class="app-edit">
      <div>
        <h2>编辑</h2>
      </div>
      <div v-if="switchEdit">
        <el-form
          :model="switchForm"
          label-width="auto"
          style="max-width: 600px"
        >
          <el-form-item label="网络地址">
            <el-input v-model="switchForm.networkAddress" />
          </el-form-item>
          <el-form-item label="网关ip">
            <el-input v-model="switchForm.gatewayIp" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSwitchSave">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stencil-app {
  display: flex;
  height: 100%;
  padding: 0;
  font-family: sans-serif;

  .app-stencil {
    position: relative;
    width: 200px;
    border: 1px solid #f0f0f0;
  }

  .app-main {
    display: flex;
    flex: 1;
    flex-direction: column;

    .app-toolbar {
      margin: 8px;
    }

    .app-content {
      flex: 1;
      height: 100%;
      margin-right: 8px;
      margin-left: 8px;
      box-shadow: 0 0 10px 1px #e9e9e9;
    }
  }

  .app-edit {
    position: relative;
    width: 300px;
    padding: 8px;
    border: 1px solid #f0f0f0;
  }
}
</style>
