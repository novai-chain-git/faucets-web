<template>
  <div class="  w100%  hauto  fixed top-0 left-0  <md:(bg-12) mx-auto  
  z-2001" :class="[scrollPosition >= 70 ? 'backdrop-blur-[10px]' : '']" style="">
    <div class="  px-150 <md:px15 bg h74  px-20 lg:px-[23px] items-center" flex="~ justify-between ">
      <!-- 切换语言 -->
      <a href="https://www.novaichain.com/#/">
        <img class="h-42 <md:(h-29)" src="../assets/img/home_logo.svg" alt="">
      </a>



      <div class="h100% relative mlauto  fyc <md:( )" @mouseenter="isShowLang = true" @mouseleave="isShowLang = false">
        <img src="@/assets/svg/icon4.svg" alt="" class="w20 h20 <md:(w16 h16)" @click="isShowLang = true" />

        <div class="bg_jb p-[1px] absolute top-[60px] right-[0] dropdown_item rounded-[10px] 
         w-[120px] z-[2001]"
         :class="[isShowLang ? 'dropdown_item' : 'dropdown_items']">
          <ul class="bg-[#131315] rounded-[10px] 
             py-[10px]
          text-15 " >
            <li v-for="(lang, index) in langList" :key="index"
              class="h40 px20 fyc cursor-pointer <md:(px10)  " text="14 c15"
              :class="{ '': lang.value === language.value }" @click="setLang(lang.value)">
              {{ lang.alias }}
              <img v-if="lang.value === language.value" 
              src="@/assets/img/home/choose.svg" alt="" class="mlauto w12" />
            </li>
          </ul>
        </div>
      </div>
      <!--      <el-dropdown @command="setLang">-->
      <!--      <span-->
      <!--          class="     fyc font-bold relative cursor-pointer border-none outline-none <md:(px20 h30 text-12 bdr-15 mr10 font-normal)"-->
      <!--          text="16 c1"-->
      <!--      >-->
      <!--<img class="w-20" src="../assets/svg/icon4.svg" alt="">-->
      <!--&lt;!&ndash;        <el-icon class="absolute right-9 <md:(right-3)">&ndash;&gt;-->
      <!--&lt;!&ndash;          <arrow-down />&ndash;&gt;-->
      <!--&lt;!&ndash;        </el-icon>&ndash;&gt;-->
      <!--      </span>-->
      <!--        <template #dropdown>-->
      <!--          <el-dropdown-menu>-->
      <!--            <el-dropdown-item-->
      <!--                v-for="(lang, index) in langList"-->
      <!--                :key="index"-->
      <!--                :command="lang.value"-->
      <!--                class="px30 <md:(px15)"-->
      <!--                :disabled="lang.value === language.value"-->
      <!--            >{{ lang.alias }}</el-dropdown-item-->
      <!--            >-->
      <!--          </el-dropdown-menu>-->
      <!--        </template>-->
      <!--      </el-dropdown>-->

    </div>
    <!--    <div class="h-20 bg-bg8"></div>-->
  </div>
</template>

<script setup>
import { langList } from '@/lang/index.js';
import { useI18n } from 'vue-i18n';
import { watch, onBeforeUnmount } from "vue"


const globalStore = useGlobalStore();
const i18n = useI18n();
const isShowLang = ref(false)
const language = computed(
  () => langList.find((d) => d.value === globalStore.language) ?? langList[0]
);
const setLang = (lang) => {
  console.log(lang)
  isShowLang.value = false
  i18n.locale.value = lang;
  globalStore.setGlobalState('language', lang);
  htmlTitle()
};

//网页设置标题和描述
const htmlTitle = (value) => {
  let title = ''
  let content = ''
  const meta = document.querySelector('meta[name="description"]');
  if (value && value.value == 'zh') {
    title = 'Novai Faucets：获取免费代币探索 Novai Chain'
    content = 'Novai Faucets 为用户提供免费代币，用于测试和探索 Novai Chain 生态系统。通过 Novai Faucets 开始您的区块链之旅。'
  } else {

    title = 'Novai Faucets: Get Free Tokens to Explore Novai Chain'
    content = 'Novai Faucets provide free tokens to users for testing and exploring the Novai Chain ecosystem. Start your blockchain journey today with Novai Faucets.'
  }
  document.title = title
  meta.setAttribute('content', content);
}

watch(() => language.value,
  (value) => {
    if (value) {
      htmlTitle(value)
    }

  }, {
  deep: true,
  immediate: true
})
const scrollPosition = ref(0);
function handleScroll() {
  scrollPosition.value = window.scrollY || document.documentElement.scrollTop;
}
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
window.addEventListener('scroll', handleScroll);


</script>

<style scoped lang="scss">
.a {}

.dropdown:hover {}

.dropdown_item {
  transition: all 0.3s;
  transform: scale(1);
}

.dropdown_items {
  transition: all 0.3s;
  transform: scale(0);
}

@media (max-width: 767.9px) {
  .dropdown_item {
    transform: scale(1) !important;
  }

  .dropdown_items {
    transform: scale(0) !important;


  }
}

:deep(.el-popper__arrow) {
  display: none;
}
</style>
