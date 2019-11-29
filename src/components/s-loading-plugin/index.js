import SLoadingPluginComponent from './SLoadingPlugin.vue'
import Vue from 'vue';

let instance;
const SLoadingPluginConstructor=Vue.extend(SLoadingPluginComponent);

instance=new SLoadingPluginConstructor({
  el:document.createElement("div")
});

instance.isShow=false;

const loadingPlugin={
  show(options={}){
    instance.isShow=true;
    if(options){
      document.getElementsByTagName("body")[0].appendChild(instance.$el);    
      instance.title=options.title;
      instance.detail=options.detail;
      instance.transition=options.transition;
      instance.duration=options.duration;
      instance.img=options.img;
      instance.type=options.type;
      instance.size=options.size;
    };
    let _instance=instance;
    setTimeout(()=>{
      _instance.isShow=false;
    },_instance.duration);
  }
}

export default{
  install: function () {
    if(!Vue.$loadingPlugin){
      Vue.$loadingPlugin=loadingPlugin;
    }
    Vue.mixin({
      created(){
        this.$loadingPlugin=Vue.$loadingPlugin;
      }
    });
  }
};
 
