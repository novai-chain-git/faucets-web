<template>
  <div class=" home    <2xl:px-40 <md:px-15" text="c1">
    <div class=" mx-auto main justify-between  
     lg:(flex max-w-[1246px] w100%) <lg:(block w100%) " style="">
      <div class="relative z-10 pt-55   
        <lg:(w-[100%] mx-auto pt60)
         <md:(pt32 !max-w-[100%]) font-500">
        <div class="relative ">
          <div class="text-56 pb-22   bottom-[100%] 
           <md:text-30   lg:(text-left) <lg:(text-center)">
            <div class="whitespace-nowrap font-600 font-[OrbitronMedium] textjb-lv 
            normal ">
              {{ $t('HomeTitle') }}{{language.value === 'zh'?  $t('HomeTitle1'):""}}
            </div>
            <div :class="language.value === 'zh'?'op-0 pointer-events-none':''" class=" font-[OrbitronMedium] font-600 textjb-lv  normal 
            ">
              {{ $t('HomeTitle1') }}
            </div>
          </div>
          <div class=" bg_jb p-[1px] w-[100%] max-w-[418px] 
          xl:(ml-0) <xl:(my-0) lg:() <lg:(mx-auto) <md:() 
          rounded-[30px]">
            <div class="bg-[#131315] p-20 rounded-[30px]">
              <div class="text-20 font-[OrbitronMedium] pb-16  <md:(  text-15)" text="c1">
                {{ $t('HomeSubheading') }}</div>



              <div class="<md:( w-100%  ) <lg:mx-auto md sm">

                <el-form ref="form">
                  <div class="rounded-[16px] p-16 bg-[#0C0E10]/[0.8]">
                    <div class="text-14   <md:(text-12 ) ">{{ $t('Address') }} </div>
                    <el-form-item class="!mb-0" prop="address">
                      <el-input @input="onInput" class="h46 <md:(h30 !rounded-[6px]) mt-5 pl-12 pr-[16px] <lg:10 w-100% 
                      !rounded-[8px] border-[1px] border-solid border-[#FFFFFF]/[.16]
                       overflow-hidden text-14 col text-[#ffffff]" v-model="address" :placeholder="$t('placeholder')">
                        <template #append>
                          <div v-show="address" class=" h14 h14 bg_jb i-icon-icon2 cursor-pointer" @click="empty" text="c1">

                          </div>
                        </template>
                      </el-input>
                    </el-form-item>
                  </div>
                  <div :class="[address && code == 0 ? '!block' : 'hidden']"
                    class=" bg-to3 bdr-8  mt-16 text-left p-[1px]">
                    <div class="bg-[#172B13] pl-16 pt-10 pr-43 pb-10 bdr-8  text-14 text-[#B2E235]">

                      <p>{{ $t('TipsTitle') }}</p>
                      <p>{{ $t('TipsCenter') }}</p>

                    </div>
                  </div>
                  <div :class="[address && !isAddress || !!(code) ? '!block' : 'hidden']"
                    class=" bg-to2 text-14 bdr-8 mt-16  p-[1px]">
                    <div class="bg-[#2A1113] pl-16 pt-10 pr-43 pb-10 bdr-8  text-14 text-[#E23535]">
                      <!-- {{ $t(`EorrText${code && (code < 1005 && code > 1001) ? code : ''}`) }} -->
                      {{ code < 1006 && code > 1001? $t(`EorrText${code}`):message }}
                    </div>

                  </div>
                  <el-form-item class="!mb-0">
                    <el-button class="w100% !h38  mt-16 !rounded-[8px]  
                    text-18 font-[OrbitronMedium]  !border-0 "
                      :class="[disabled || code === 0 ? '!bg-to3' : '!bg-to3 ']" type="primary"
                      :disabled="disabled || code === 0" @click="submitForm(ruleFormRef)">
                      <span class="text-[#181A20]"> {{ $t('HomeText') }}</span>
                    </el-button>
                  </el-form-item>
                </el-form>

              </div>
              <div class="text-14 text-[#ffffff]/[.54]  mt-18 text-left  
            <md:(text-12 mt-10)" text="c3">
                {{ $t('Text1') }}
                {{ $t('Text2') }}
                {{ $t('Text3') }}
                {{ $t('Text4') }}
              </div>
            </div>
          </div>
        </div>

      </div>
      <!-- <div
        class="pl41 pt174  
        <2xl:() <xl:() 
        <lg:(translate-x-0px) <md:(hidden)"
        translate="">
        <img class="w-[347px]  " :src="icon" alt="">

      </div> -->
      <div class="lg:() 2xl:(pl-[220px])  xl:(pl-[41px] pt-[220px] flex) <xl:(pl-[41px] pt-[220px] flex) 
      lg:(w-[100%] mx-auto pl-0 block) <lg:(block w-[100%] mx-auto) 
      :(pl:0 block pt-[192px]) <md:(pt-80)">
        <div class=" relative">
        <div class="  z-1 
        left-[50%] absolute top-[50%]
         lg:(w-[651px] h-[651px]) <lg:(w-[80vw] h-[80vw] )
          " translate="[-50%,-50%]">
          <div class="w-[100%] h-[100%] rounded bg-to1"></div>
        </div>
          
          <img class="lg:(w-[347px] mx-auto) <lg:(w-[50%] mx-auto) relative z-10 <lg:" :src="icon" alt="">
        </div>
        

      </div>
    </div>
  </div>
</template>

<script setup>
import { langList } from '@/lang/index.js';
import { ref } from 'vue';
import { transactionCreateApi } from "@/api/index.js"
import icon from '../../assets/img/img.svg'
//import { getAddress, isAddress } from 'ethers';
import { ethers } from 'ethers';

const globalStore = useGlobalStore();
const address = ref('');
const disabled = ref(true);
const isAddress = ref(true)
const Tiem = ref('')
const code = ref(null)

const message = ref('')

const language = computed(
  () => langList.find((d) => d.value === globalStore.language) ?? langList[0]
);
//清除输入框数据 
function empty() {
  address.value = ''
  onInput()
}
//监听输框数据
function onInput() {
  clearTimeout(Tiem.value)
  //禁止提交数据
  disabled.value = true
  code.value = null
  //ethers定时验证字符串数据是否为合格的钱包地址后允许提交
  Tiem.value = setTimeout(() => {

    isAddress.value = ethers.utils.isAddress(address.value)
    if (isAddress.value) {
      disabled.value = false
    }
  }, 300)
}
//查询是否可调用
function getDisabled() {

}
//提交数据
function submitForm() {
  //验证数据获取 grecaptcha 并获取token
  // 

  grecaptcha.ready(async () => {
    try {
      // 这个是前端密钥，后端要用后端的密钥，标准版验证前后端密钥是不一样的
      // 企业版验证（Enterprise）密钥是一样的
      const token = await grecaptcha.execute('6LfyqCQqAAAAAKHOV3PlBfDpuG03BMCMHzx8fBZf', { action: 'submit' });
      let res = await transactionCreateApi({
        "address": address.value,
        token
      })
      code.value = res.code
      //验证成功禁止输入框提交数据因一个地址只能提交一次
      if (code.value === 0) {
        disabled.value = true
      }else{
        message.value = res.message
      }

    } catch {
      // disabled.value = false
    }
  });
}
</script>

<style scoped lang="scss">
.normal {
  display: block;
}

:deep(.el-input-group__append) {
  background-color: transparent;
  border-width: 0 !important;
  box-shadow: none;
}

:deep(.el-input__inner) {
  // color: var(--font-color6);
  color: #FFFFFF;
}

:deep(.el-input__wrapper) {
  box-shadow: none;
  background-color: transparent;
  padding: 0;
}

:deep(.el-input-group__append) {
  padding: 0 0 0 16px;
}

.home {
  // background-color: var(--bg1);
  white-space: pre-wrap;
  //background: url('@/assets/img/home/home_bg.png') center center / 100% 100% no-repeat;
}
@media (min-width: 1480px) {
    .main {
        width: 1346px;
    }
}
@media (max-width: 768px) {
  .home {
    //background: url('@/assets/img/home/mhome_bg.png') center center / 100% 100% no-repeat;
  }
}
</style>
