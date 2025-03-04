<template>
  <el-config-provider :locale="locale" :size="assemblySize" :button="buttonConfig">
    <Header></Header>
    <div class="pt74 <md:(pt54) " style="min-height: calc( 100vh);  ">
      <router-view v-slot="{ Component }">
        <keep-alive :include="configInfoData.includeList">
          <component class="view-wrap" :key="$route.fullPath" :is="Component" />
        </keep-alive>
      </router-view>

    </div>
    <Footer></Footer>
    <div class="  z-1 
        left-[0] absolute bottom-[200px]
         lg:(w-[27vw] h-[27vw]) <lg:(w-[80vw] h-[80vw] )
          " translate="[-50%,0%]">
        <div class="w-[100%] h-[100%]  rounded bg-to1"></div>
    </div>

  </el-config-provider>
</template>
<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const configInfoData = {
  noNavPageNames: ['layout', 'detailsPage', 'evaluate', 'resources'],
  includeList: []
};
import { useI18n } from 'vue-i18n';
import en from 'element-plus/es/locale/lang/en';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { getBrowserLang } from '@/utils/index.js';
// init language
const i18n = useI18n();
const globalStore = useGlobalStore();
i18n.locale.value = globalStore.language;

// element language
const locale = computed(() => {
  console.log('语言改变');
  if (globalStore.language == 'zh') return zhCn;
  if (globalStore.language == 'en') return en;
  return getBrowserLang() == 'zh' ? zhCn : en;
});

// element assemblySize
const assemblySize = computed(() => globalStore.assemblySize);

// element button config
const buttonConfig = reactive({ autoInsertSpace: false });
</script>

<style lang="scss">
html{
 // line-height:1.5
}

@font-face {
  font-family: 'Orbitron';
  src: url('@/assets/font/orbitron/orbitron-black.ttf') format('truetype');
  font-style: normal;
  font-weight: normal;
}

@font-face {
  font-family: 'OrbitronBold';
  src: url('@/assets/font/orbitron/orbitron-bold.otf') format('opentype');
  font-style: normal;
  font-weight: normal;
}

@font-face {
  font-family: 'OrbitronMedium';
  src: url('@/assets/font/orbitron/orbitron-medium.ttf') format('truetype');
  font-style: normal;
  font-weight: normal;
}
@font-face {
  font-family: 'OrbitronLight';
  src: url('@/assets/font/orbitron/orbitron-light.ttf') format('truetype');
  font-style: normal;
  font-weight: normal;
}

@font-face {
  font-family: 'PoppinsRegular';
  src: url('@/assets/font/Poppins-Regular.ttf') format('truetype');
  font-style: normal;
  font-weight: normal;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html{
  line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
    font-feature-settings: normal;
    font-variation-settings: normal;
}
body {
  margin: 0;
  line-height: inherit;
  font-family: PoppinsRegular, Pingfang, Arial, Helvetica, sans-serif;
  font-size: 16px;
  // background: var(--bg1);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  background-color: #131315;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: calc(100vh );
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  font-size: 14px;
}

p {
  margin: 0;
}

ul,
li {
  list-style: none;
}

#app,
.view-wrap {
  box-sizing: border-box;
  //height: (100vh);
  //overflow: auto;
  //min-height: calc(100vh - 68px);
  color: #ffffff
}
#app{
  background-image: url(@/assets/svg/Mask.svg);
    background-size: 100%;
    background-attachment: fixed;
}
img {
  display: block;
}

a {
  color: inherit;
    text-decoration: inherit;
}

.br{
  border-image-source: linear-gradient(180deg, #5AC27C 0%, #B2E235 100%);
}


// .bg_jb{
//   background: linear-gradient(90deg, rgba(178, 226, 53, 0.2) 0%, rgba(31, 43, 2, 0.8) 100%);
// }

.textjb-lv,.jv-container .jv-button,.bg_jb{
  background-image: linear-gradient(180deg, #5AC27C 0%, #B2E235 100%) !important;

}
.textjb-lv,.jv-container .jv-button{
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; /* 使文字填充为透明 */
  background-clip: text;  /* 非 Webkit 浏览器使用这个 */
  color: transparent;  /* 必须将字体颜色设置为透明 */
}
:root:root {
  --bg1: #ffffff;
  --bg2: #2C2C2E;
  --bg3: #EDFFEC;
  --bg4: #B8B8B8;
  --bg5: #FFECEC;
  --bg6: #eeeeee;
  --bg7: #4352D4;
  --bg8: #F7F7F7;
  --bg9: rgba(67, 82, 212, 0.03);

  --bg10: linear-gradient(180deg, #5AC27C 0%, #B2E235 100%);
  --font-color1: #ffffff;
  --font-color2: #4352D4;
  --font-color3: #999999;
  --font-color4: #039A10;
  --font-color5: #D33830;
  --font-color6: #6E6E6E;
  --border-color: #7BD375;
  //--bg1: #171719;
  //--bg2: #ffffff;

  --primary-color0: #f4f7fc;
  --van-primary-color: #4f73a3;
  --primary-color2: #354c70;
  --font-color7: #697b8d;
  --font-color8: #888888;
  --font-color9: #ffffff;
  --font-color10: #19c8ff;
  --border-color: #e2dede;
  
}

@media (max-width: 767.9px) {
    body {
    }
}


/* button {
  --el-button-hover-bg-color: #354C70 !important;
  --el-button-hover-border-color: #354C70 !important;
  --el-button-active-bg-color: #354C70 !important;
  --el-button-active-border-color: #354C70 !important;
} */

// 需要页面底部加 padding 页面。有一个元素 class 为 .pbh
.view-wrap:has(.bottom-wrap) {
  padding-bottom: 180px;
}

body {
  &::-webkit-scrollbar {
    width: 0;
  }
}

// 渐变边框
// .border_gradient {
//   background: linear-gradient(227deg, #19c8ff 0%, #4d8cfe 48%, #913ffb 100%);
//   position: relative;
//   &::after {
//     content: '';
//     inset: 1px;
//     position: absolute;
//     background: var(--bg6);
//     border-radius: 14px;
//     z-index: 0;
//   }
// }
</style>
