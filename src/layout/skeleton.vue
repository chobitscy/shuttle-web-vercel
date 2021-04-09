<template>
  <div class="flex" flex="full-screen column">
    <el-carousel
      ref="MyCarousel"
      class="views"
      flex="1"
      :loop="false"
      :autoplay="false"
      arrow="never"
      indicator-position="none"
    >
      <el-carousel-item v-for="item in sectionList" :key="item.name">
        <router-view :name="item.routerViewName" />
      </el-carousel-item>
    </el-carousel>
    <div class="tabs-menu-area flex">
      <div
        v-for="(item, i) in sectionList"
        :key="item.name"
        class="menu-item flex"
        :class="{ active: activeIndex == i }"
        flex="1 column"
        @click="menuSelect(i)"
      >
        <i :class="'el-icon-' + item.icon"></i>
        <div class="menu-title" v-text="item.name" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "skeleton",
  data() {
    return {
      activeIndex: "0",
      sectionList: [
        {
          name: "发现",
          routerViewName: "explore",
          icon: "goods",
        },
        {
          name: "功能",
          routerViewName: "service",
          icon: "connection",
        },
        {
          name: "搜索",
          routerViewName: "search",
          icon: "search",
        },
        {
          name: "我的",
          routerViewName: "center",
          icon: "user",
        },
      ],
    };
  },

  methods: {
    menuSelect(current) {
      console.log(current);
      this.activeIndex = current;
      this.$refs.MyCarousel.setActiveItem(current);
    },
  },
};
</script>

<style lang="scss" scoped>
.views {
  /deep/ & > .el-carousel__container {
    height: 100%;

    > .is-active {
      overflow-y: auto;
    }
  }
}

.tabs-menu-area {
  height: 50px;
  box-shadow: 0px 7px 8px 4px #888888;
  z-index: 10000;
  position: relative;

  > .menu-item {
    justify-content: center;
    align-items: center;

    &.active {
      border-bottom: 2px solid #409eff;
      color: #409eff;
    }

    > i {
      font-size: 22px;
      margin-bottom: 3px;
    }

    > .menu-title {
      font-size: 10px;
    }
  }
}
</style>