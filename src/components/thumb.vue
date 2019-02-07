<template>
  <div v-if="item.get_thumbnailUrl().length > 15" class="thumbwrap">
    <div @click="clickThumb(item)"
         @dblclick="clickThumb(item,true)"
         @contextmenu="showMenu"
         :index="index" class="thumbnail"
         :title="item._name"
         :class="{active:guid(item) === activeItem}">
      <!--<div v-if="!item.get_isFolder() && item.get_name() != 'Up Level'"
           :id="'menuContainer' + index"
           :class="listModel.dropdownClass">
        <div bs-popover="popover" class="thumb-popover" tabindex="0"
             data-placement="{{popupPosition}}{{$index == 0 || (isMobile && $index % 3 == 0) ? '-left' : $index == collectionPage.length - 1 || (isMobile && $index % 3 == 2) ? '-right' : ''}}"
             data-content-template="views/popovers/property-panel.html"
             data-container="body">&nbsp;</div>
        <a data-toggle="dropdown" role="button" class="drop-toggle">&nbsp;</a>
      </div>-->
      <i class="fa fa-image"
         v-if="hasImageSet(item)"></i>
      <i class="fa fa-folder-open-o" v-if="hasChildren(item)"></i>
      <img :src="thumbnail(item)" alt="Thumbnail of {{item._name}}"/>
      <label>{{item._name()}}</label>
    </div>
  </div>
</template>

<script>
export default {
  data:() => {
    return{
      activeItem:''
    };
  },
  name: 'thumb',
  props:['item','listModel','index'],
  computed:{
    thumbnail(){return item => item.thumb || item.get_thumbnailUrl();},
    hasImageSet(){return item => item._backgroundImageset != null || item._studyImageset != null;},
    isFolderUp(){return item => item._name === 'Up Level'; },
    hasChildren(){return item => item._isFolder && !this.isFolderUp(item) && (item.thumb && item.thumb.indexOf('wwtweb.blob.core.windows.net') < 0);},
    guid(){ return item => this.thumbnail(item) + item._name;}
  },
  methods:{
    clickThumb(item,dblclick){
      this.activeItem = this.guid(item);
      this.listModel.clickThumb(item,dblclick);
    }
  }
};
</script>
