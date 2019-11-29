<template>
    <div class="m-baserowbox">
        <div class='m-album'>
            <div v-if="arrayImage" v-for="(item, index) in arrayImage" :key="index" class='previewer-demo-img image image_small' :style="{'background-image':'url('+item.src+')','background-repeat': 'no-repeat',
                'background-size': 'cover'}" @click.self="showImage(index)">
            <s-icon @click="deletePicture(index)" class="close" type="#icon-delete" :size="12" color="red"></s-icon>
            </div>
            <div v-transfer-dom>
            <previewer :list="arrayImage" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
            </div>
            <div class='image image_small' v-if="arrayImage.length<maxLength">
            <button @click='addImage' class="btn">
                <img src="@/assets/images/plus.png" class='img' />
            </button>
            </div>
        </div>
        <span>{{arrayImage.length}}/{{maxLength}}</span>

        <aside>
            <actionsheet v-model="showAction" :menus="takePictureType" theme="android" @on-click-menu="choosePictureType">
            </actionsheet>
            <s-confirm 
                v-model="showConfirm" 
                content="确定删除图片么？"
                @on-cancel="onCancel" 
                @on-confirm="onConfirm"
                :showDangerButton="false"
                :showSuccessButton="false"
            >
            </s-confirm>
        </aside>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'uploadImg',
    props:{
        index:Number,
        imgData:{
            type:[String, Array]
        },
        maxLength:{
            type:Number,
            default:1
        },
    },
    data() {
        let self = this
        return {
            //上传图片的参数配置开始
            showAction: false,
            takePictureType: {
                shoot: '拍摄',
                album: '从相册选择'
            },
            loadingtitle:'加载中',
            stopWaitPullup: false,
            mydata:[1,2],
            showConfirm: false,
            currentType: "",
            currentDetail: "",
            currentImageIndex: 0,
            arrayImage:function(){
                // console.log(self.imgData)
                // console.log(typeof self.imgData)
                let arr = []
                if(self.imgData&&typeof self.imgData === 'string'){
                    arr = [{
                        msrc: self.imgDatatem,
                        src: self.imgData,
                    }]
                }else if(self.imgData&&typeof self.imgData == 'object'){
                    // console.log('array')
                    // console.log(self.imgData)
                    self.imgData.forEach((item,index)=>{
                        arr[index] = {
                            msrc: item,
                            src: item,
                        }
                    })
                }  
                return arr
            }(),
            // arrayImage: [
            //     // {
            //     //     msrc: '../../../static/message.png',
            //     //     src: '../../../static/message.png',
            //     //     w: 400,
            //     //     h: 800
            //     // }, 
            // ],
            options: {
                getThumbBoundsFn(index) {
                    let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
                    let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                    let rect = thumbnail.getBoundingClientRect()
                    return {
                    x: rect.left,
                    y: rect.top + pageYScroll,
                    w: rect.width
                    }
                }
            },
            //上传图片的参数配置结束
        }
    },
    watch: {
        imgData:{
            handler:function(values){
                console.log('进来了'+values)
                if(typeof values == "object" && values != null){
                    this.arrayImage = values.map((item,index)=>({msrc: item,src: item,}))
                }
            },
            deep:true
        },
    },
    components: {},
    methods: {
        deletePicture(index) {
            console.log('子');
            console.log(index);
            //先弹个确认窗口是否需要确认
            this.showConfirm = true;
            this.currentImageIndex = index;
        },
        //图片上传的方法开始
        logIndexChange(arg) {
            console.log(arg);
        },
        showImage(index) {
            console.log('父');
            this.$refs.previewer.show(index);
        },
        addImage() {
            this.showAction = true;
        },
        // changeImgRotate(src,rotate) {
        changeImgRotate(src) {
            console.log(src);
            var _this = this;
            // 通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片，相比 createElement() 创建 <img> 省去了 append()，也就避免了文档冗余和污染
            var img = new Image();
            img.src = src;
            img.onload = function () { //要先确保图片完整获取到，这是个异步事件
            var canvas = document.createElement("canvas"); //创建canvas元素
            var w = img.width;
            var h = img.height;
            console.log('w', w, 'h', h);
            var ctx = canvas.getContext("2d");
            // if (rotate===90) {
            //   canvas.width = h;
            //   canvas.height = w;
            //   ctx.translate(h / 2, w / 2);
            //   ctx.rotate(0.5 * Math.PI);
            //   ctx.translate(-w / 2, -h / 2);
            // } else {
            canvas.width = w;
            canvas.height = h;
            // }
            ctx.drawImage(img, 0, 0, w, h); //将图片绘制到canvas中
            let dataURL = canvas.toDataURL(); //转换图片为dataUR
            _this.draw(dataURL)
            }
        },
        //将base64图片push进入arrayImage数组
        draw(value) {
            console.log('value', value);
            this.arrayImage.push({
                msrc: value,
                src: value
            });
            this.$emit('add',this.index,value)
        },
        choosePictureType(key) {
            console.log(key);
            let _this = this;

            // _this.changeImgRotate('../../../static/message.png');
            // console.log('arrImage', _this.arrayImage)
            // return
            if (key === "shoot") { //如果选择拍摄照片
                console.log('shoot', this.currentType, this.currentDetail);
                this.$hybridApi.chooseImage({
                    success: function (imagePath) {
                    console.log("拍照后的图片地址" + imagePath);
                    // _this.changeImgRotate(imagePath,0);
                    _this.changeImgRotate(imagePath);
                    console.log('arrImage', _this.arrayImage);
                    }
                });
                // _this.changeImgRotate('../../../static/message.png');
            } else {
                console.log('album', this.currentType, this.currentDetail);
                this.$hybridApi.chooseImages({
                    maxNum:_this.maxLength-_this.arrayImage.length,
                    success: imagePathList => {
                    imagePathList.forEach(imagePath=>{
                        _this.changeImgRotate(imagePath);
                    // _this.changeImgRotate(imagePath,90);
                    console.log('arrImage', _this.arrayImage);
                    })
                    
                    }
                });
            }
        },
        onConfirm() { //删除
            console.log('onConfirm');
            this.arrayImage.splice(this.currentImageIndex, 1);
            this.$emit('del',this.index,this.currentImageIndex)
        },
        onCancel() {
            console.log('onCancel');
        },
        uploadImage() {
            //先弹个确认框，再跳转
            let _this = this;
            this.$axiosApi.uploadImage(this.currentType, this.currentDetail).then(res => {
            if (res.Success) {
                console.log('上传成功');
                Vue.$vux.toast.show({
                    text: "上传成功",
                    width: '3rem',
                    time: 2000,
                    position: 'middle',
                    type: "success"
                }),
                setTimeout(function () {
                    // _this.$router.go(-1);
                    let that = _this;
                    _this.$router.replace({
                    name: "Task-DefectCodeSelection",
                    params: {
                        itemName: that.curItem
                    }
                    })
                }, 2000);
            }
            })
        },
        //图片上传的方法结束
    },
    mounted(){
        // console.log(this.arrayImage)
    }
}
</script>

<style lang="less">

</style>
