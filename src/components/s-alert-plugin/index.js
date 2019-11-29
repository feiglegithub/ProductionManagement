
import SAlertPluginComponent from './SAlertPlugin.vue'
import Vue from 'vue';

let instance;
const alertPluginConstructor=Vue.extend(SAlertPluginComponent);

instance=new alertPluginConstructor({
  el:document.createElement("div")
});

instance.isShow=false;

const alertPlugin={
  show(options={}){
    instance.isShow=true;
    if(options){ 
      document.getElementsByClassName("m-header")[0].after(instance.$el);
      instance.type=options.type;
      instance.color=options.color;
      instance.backgroundColor=options.backgroundColor;
      instance.content=options.content;
      instance.duration=options.duration;
    };
    let _instance=instance;
    setTimeout(()=>{
      _instance.isShow=false;
    },_instance.duration);
  }
}

export default{
  install: function () {
    if(!Vue.$alertPlugin){
      Vue.$alertPlugin=alertPlugin;
    }
    Vue.mixin({
      created(){
        this.$alertPlugin=Vue.$alertPlugin;
      }
    });
  }
};
 
