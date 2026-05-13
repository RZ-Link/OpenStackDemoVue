<script setup>
import { Graph, Stencil, Snapline, Selection, Keyboard } from "@antv/x6";
import { onMounted } from "vue";
import { getImageList } from "@/api/image";

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
          image
        }
      });
    });
    stencil.load(nodes, "group2");
  }
});
</script>

<template>
  <div class="stencil-app">
    <div id="stencilDiv" class="app-stencil" />
    <div id="contentDiv" class="app-content" />
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

  .app-content {
    flex: 1;
    height: 100%;
    margin-right: 8px;
    margin-left: 8px;
    box-shadow: 0 0 10px 1px #e9e9e9;
  }
}
</style>
