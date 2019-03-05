export class FolderUp {
  constructor() {
    this.parent = null;
    this._bounds = new Rectangle();
  }

  static get_name() {
    return 'Up Level';
  }

  get_thumbnail() {
    return this._thumbnail;
  }

  set_thumbnail(value) {
    this._thumbnail = value;
    return value;
  }

  static get_thumbnailUrl() {
    return '//worldwidetelescope.org/wwtweb/thumbnail.aspx?Name=folderup';
  }

  static set_thumbnailUrl() {
    return;
  }

  get_bounds() {
    return this._bounds;
  }

  set_bounds(value) {
    this._bounds = value;
    return value;
  }

  static get_isImage() {
    return false;
  }

  static get_isTour() {
    return false;
  }

  static get_isFolder() {
    return false;
  }

  static get_isCloudCommunityItem() {
    return false;
  }

  static get_readOnly() {
    return false;
  }

  get_children() {
    if (this.parent == null) {
      return [];
    } else {
      return this.parent.get_children();
    }
  }
}


