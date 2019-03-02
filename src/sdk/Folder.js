import ss from './scriptsharp/ss';
import {Util} from './Util';
import {Imageset} from './Imageset';
import {WebFile} from './WebFile';

export class Folder{
  constructor() {
    this.parent = null;
    this.isProxy = false;
    this._versionDependent = false;
    this._readOnly = true;
    this._dirty = false;
    this._thumbnail = null;
    this._proxyFolder = null;
    this._lastUpdate = new Date();
    this._childList = [];
    this._itemsField = [];
    this._imagesets = [];
    this._tours = [];
    this._folders = [];
    this._places = [];
    this._groupField = 0;
    this._refreshTypeField = 0;
    this._refreshTypeFieldSpecified = false;
    this._browseableField = true;
    this._browseableFieldSpecified = false;
    this._searchableField = false;
    this._typeField = 0;
    this._communityIdField = 0;
    this._componentIdField = 0;
    this._permissionField = 0;
  }

  toString() {
    return this._nameField;
  }
  get_versionDependent() {
    return this._versionDependent;
  }
  set_versionDependent(value) {
    this._versionDependent = value;
    const $enum1 = ss.enumerate(this._folders);
    while ($enum1.moveNext()) {
      const folder = $enum1.current;
      folder.set_versionDependent(this._versionDependent);
    }
    return value;
  }
  get_readOnly() {
    return this._readOnly;
  }
  set_readOnly(value) {
    this._readOnly = value;
    return value;
  }
  get_dirty() {
    return this._dirty;
  }
  set_dirty(value) {
    this._dirty = value;
    return value;
  }
  loadFromUrl(url, complete) {
    this._onComplete = complete;
    this._webFile = new WebFile(Util.getProxiedUrl(url));
    this._webFile.onStateChange = ss.bind('_loadData', this);
    this._webFile.send();
  }
  _loadData() {
    if (this._webFile.get_state() === 2) {
      alert(this._webFile.get_message());
    } else if (this._webFile.get_state() === 1) {
      let node = Util.selectSingleNode(this._webFile.getXml(), 'Folder');
      if (node == null) {
        const doc = this._webFile.getXml();
        if (doc != null) {
          node = Util.selectSingleNode(doc, 'Folder');
        }
      }
      if (node != null) {
        this._clearChildren();
        this._parseXML(node);
      }
      if (this._onComplete != null) {
        this._onComplete();
      }
    }
  }
  _clearChildren() {
    this._folders.length = 0;
    this._tours.length = 0;
    this._places.length = 0;
    this.get_imagesets().length = 0;
  }
  _parseXML(node) {
    if (node.attributes.getNamedItem('Name') != null) {
      this._nameField = node.attributes.getNamedItem('Name').nodeValue;
    } else {
      this._nameField = '';
    }
    if (node.attributes.getNamedItem('Url') != null) {
      this._urlField = node.attributes.getNamedItem('Url').nodeValue;
    }
    if (node.attributes.getNamedItem('Thumbnail') != null) {
      this._thumbnailUrlField = node.attributes.getNamedItem('Thumbnail').nodeValue;
    }
    const $enum1 = ss.enumerate(node.childNodes);
    while ($enum1.moveNext()) {
      const child = $enum1.current;
      switch (child.nodeName) {
        case 'Folder':
          const temp = new Folder();
          temp.parent = this;
          temp._parseXML(child);
          this._folders.push(temp);
          break;
        case 'Place':
          this._places.push(Place._fromXml(child));
          break;
        case 'ImageSet':
          this.get_imagesets().push(Imageset.fromXMLNode(child));
          break;
        case 'Tour':
          this.get_tours().push(Overlay._fromXml(child));
          break;
      }
    }
  }
  addChildFolder(child) {
    this._folders.push(child);
    this._dirty = true;
  }
  removeChildFolder(child) {
    ss.remove(this._folders, child);
    this._dirty = true;
  }
  addChildPlace(child) {
    this._places.push(child);
    this._dirty = true;
  }
  removeChildPlace(child) {
    ss.remove(this._places, child);
    this._dirty = true;
  }
  get_thumbnail() {
    return this._thumbnail;
  }
  set_thumbnail(value) {
    this._thumbnail = value;
    return value;
  }
  get_bounds() {
    return this._bounds;
  }
  set_bounds(value) {
    this._bounds = value;
    return value;
  }
  get_isImage() {
    return false;
  }
  get_isTour() {
    return false;
  }
  get_isFolder() {
    return true;
  }
  get_isCloudCommunityItem() {
    return !!this._communityIdField || this._permissionField > 0;
  }
  refresh() {
    if (this._proxyFolder == null) {
      this._proxyFolder = new Folder();
      this._proxyFolder.isProxy = true;
      this._proxyFolder.parent = this.parent;
    }
    VoTable.loadFromUrl(this._urlField, this._childReadyCallback);
    this._childReadyCallback = null;
  }
  childLoadCallback(callback) {
    this._childReadyCallback = callback;
    const temp = this.get_children();
    if (this._proxyFolder == null) {
      callback();
    }
  }
  get_children() {
    if (ss.emptyString(this._urlField)) {
      this._childList.length = 0;
      if (this.parent != null) {
        const folderUp = new FolderUp();
        folderUp.parent = this.parent;
        this._childList.push(folderUp);
      }
      if (this.get_folders() != null) {
        const $enum1 = ss.enumerate(this.get_folders());
        while ($enum1.moveNext()) {
          const folder = $enum1.current;
          this._childList.push(folder);
        }
      }
      if (this.get_imagesets() != null) {
        const $enum2 = ss.enumerate(this.get_imagesets());
        while ($enum2.moveNext()) {
          const imset = $enum2.current;
          this._childList.push(imset);
        }
      }
      if (this.get_places() != null) {
        const $enum3 = ss.enumerate(this.get_places());
        while ($enum3.moveNext()) {
          const place = $enum3.current;
          this._childList.push(place);
        }
      }
      if (this.get_tours() != null) {
        const $enum4 = ss.enumerate(this.get_tours());
        while ($enum4.moveNext()) {
          const tour = $enum4.current;
          this._childList.push(tour);
        }
      }
      return this._childList;
    } else {
      const ts = (this._lastUpdate - ss.now()) / 1000;
      if (true || this.get_refreshType() === 1 || this._proxyFolder == null || (!this.get_refreshType() && (parseInt(this._refreshIntervalField) < ts))) {
        this.refresh();
      }
      if (this._proxyFolder != null) {
        return this._proxyFolder.get_children();
      } else {
        return null;
      }
    }
  }
  get_msrCommunityId() {
    return this._communityIdField;
  }
  set_msrCommunityId(value) {
    this._communityIdField = value;
    return value;
  }
  get_msrComponentId() {
    return this._componentIdField;
  }
  set_msrComponentId(value) {
    this._componentIdField = value;
    return value;
  }
  get_permission() {
    return this._permissionField;
  }
  set_permission(value) {
    this._permissionField = value;
    return value;
  }
  get_folders() {
    return this._folders;
  }
  set_folders(value) {
    this._folders = value;
    return value;
  }
  get_places() {
    return this._places;
  }
  set_places(value) {
    this._places = value;
    return value;
  }
  get_imagesets() {
    return this._imagesets;
  }
  set_imagesets(value) {
    this._imagesets = value;
    return value;
  }
  get_tours() {
    return this._tours;
  }
  set_tours(value) {
    this._tours = value;
    return value;
  }
  get_name() {
    if (this._nameField == null) {
      return '';
    } else {
      return this._nameField;
    }
  }
  set_name(value) {
    this._nameField = value;
    return value;
  }
  get_group() {
    return this._groupField;
  }
  set_group(value) {
    this._groupField = value;
    return value;
  }
  get_url() {
    return this._urlField;
  }
  set_url(value) {
    this._urlField = value;
    return value;
  }
  get_thumbnailUrl() {
    if (ss.emptyString(this._thumbnailUrlField)) {
      return '//worldwidetelescope.org/wwtweb/thumbnail.aspx?name=folder';
    }
    return this._thumbnailUrlField;
  }
  set_thumbnailUrl(value) {
    this._thumbnailUrlField = value;
    return value;
  }
  get_refreshType() {
    return this._refreshTypeField;
  }
  set_refreshType(value) {
    this._refreshTypeField = value;
    this.set_refreshTypeSpecified(true);
    return value;
  }
  get_refreshTypeSpecified() {
    return this._refreshTypeFieldSpecified;
  }
  set_refreshTypeSpecified(value) {
    this._refreshTypeFieldSpecified = value;
    return value;
  }
  get_refreshInterval() {
    return this._refreshIntervalField;
  }
  set_refreshInterval(value) {
    this._refreshIntervalField = value;
    return value;
  }
  get_browseable() {
    return this._browseableField;
  }
  set_browseable(value) {
    this._browseableField = value;
    this._browseableFieldSpecified = true;
    return value;
  }
  get_browseableSpecified() {
    return this._browseableFieldSpecified;
  }
  set_browseableSpecified(value) {
    this._browseableFieldSpecified = value;
    return value;
  }
  get_searchable() {
    return this._searchableField;
  }
  set_searchable(value) {
    this._searchableField = value;
    return value;
  }
  get_type() {
    return this._typeField;
  }
  set_type(value) {
    this._typeField = value;
    return value;
  }
  get_subType() {
    return this._subTypeField;
  }
  set_subType(value) {
    this._subTypeField = value;
    return value;
  }
};