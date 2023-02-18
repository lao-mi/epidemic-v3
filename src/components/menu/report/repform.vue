<template>
<div class="img">
  <div>当前健康码</div>
  <el-upload class="avatar-uploader" action="#" multiple
    :show-file-list="false" :http-request="requestUpload" :before-upload="beforeAvatarUpload1">
    <img v-if="imageUrl.image1" :src="imageUrl.image1" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</div>
<div class="img">
  <div>当前行程码</div>
  <el-upload class="avatar-uploader" action="#"
    :show-file-list="false" :http-request="requestUpload" :before-upload="beforeAvatarUpload2">
    <img v-if="imageUrl.image2" :src="imageUrl.image2" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</div>
<div class="img">
  <div>最新核酸检测</div>
  <el-upload class="avatar-uploader" action="#"
    :show-file-list="false" :http-request="requestUpload" :before-upload="beforeAvatarUpload3">
    <img v-if="imageUrl.image3" :src="imageUrl.image3" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</div>
<br/>
<div class="type">
  <span>返校情况：</span>
  <el-radio v-model="form.type" :label="1">假期或请假返校</el-radio>
  <el-radio v-model="form.type" :label="0">其他</el-radio>
</div>
<el-button @click="getapply" class="button">提交</el-button>
<pop v-model:open="open">
  <a>{{ hint }}</a>
</pop>
</template>

<script setup lang='ts'>
import pop from '@/components/popover/index.vue'
import { ref ,reactive} from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import {toreport} from '@/server'
const open = ref(false)
const hint = ref('图片未完全上传')
const imageUrl = reactive({
  image1:'',
  image2:'',
  image3:''
})
const form = reactive({
  type:1
})
const file1 = ref()
const file2 = ref()
const file3 = ref()
// 阻止上传
function requestUpload() {
            }
// 更新图片1
const beforeAvatarUpload1: UploadProps['beforeUpload'] = (file) => {
  if (file.type.indexOf("image/") === -1) {
      alert("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。")
      return false
  } else {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
          imageUrl.image1 = reader.result as string
      }
      file1.value = file  
      return true
  }
}
// 更新图片2
const beforeAvatarUpload2: UploadProps['beforeUpload'] = (file) => {
  if (file.type.indexOf("image/") === -1) {
      alert("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。")
      return false
  } else {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
          imageUrl.image2 = reader.result as string
      }
      file2.value = file  
      return true
  }
}
// 更新图片3
const beforeAvatarUpload3: UploadProps['beforeUpload'] = (file) => {
  if (file.type.indexOf("image/") === -1) {
      alert("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。")
      return false
  } else {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
          imageUrl.image3 = reader.result as string
      }
      file3.value = file  
      return true
  }
}
// 上传图片
function getapply(){
  if(imageUrl.image1 == ''||imageUrl.image2 == ''|| imageUrl.image3 ==''){
    hint.value = '图片未完全上传'
    open.value = true
  }else{
    let formData = new FormData()
    formData.append("file1",file1.value)
    formData.append("file2",file2.value)
    formData.append("file3",file3.value)
    formData.append("type",form.type)
    toreport(formData).then((res:any)=>{
      if(res.data.code==200){
        hint.value = '已成功上传三码！'
        open.value =true
      }else(
        hint.value = '上传失败',
        open.value = true
      )
    })
  }
}
</script>

<style lang='less' scoped>
.avatar-uploader .avatar {
  width: 150px;
  height: 150px;
  display: block;
  border: 1px solid #000000;
  object-fit: cover;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.img{
  margin: 25px 5% 0px;
  text-align: center;
  width: 40%;
  float: left;
  font-size: 13px;
  z-index: 999;
}
.type{
  height: 50px;
  position: relative;
  top: 200px;
  left: -35%;
  span{
    font-size: 15px;
    margin-right: 15px;
  }
}
.button{
  margin-top: 300px;
  z-index: 999;
}
</style>