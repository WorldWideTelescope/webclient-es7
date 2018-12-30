export default {
  namespaced:true,
  state:{
    modals:[],
    openModals:[]
  },
  mutations:{
    open(name){
      console.log('modal.open ' + name);
    }
  }
};