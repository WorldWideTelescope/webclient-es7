export default{
  namespaced:true,
  state:{
    isMobile:false,
    browsers:{},
    activePanel:'Explore',
    viewport:{}
  },
  mutations:{
    setAny(state, obj){
      Object.keys(obj).forEach(k => state[k] = obj[k]);
    }
  }
}