import {Enums} from './sdk/enums';
import ss from './sdk/scriptsharp/ss';

export class Tour {
  constructor() {
    this.userLevel = 0;
    this.classification = 0;
    this.averageRating = 0;
    this.lengthInSecs = 0;
    this._thumbnailUrlField = '';
  }

  static _fromXml(child) {
    const temp = new Tour();
    if (child.attributes.getNamedItem('ID') != null) {
      temp.id = child.attributes.getNamedItem('ID').nodeValue;
    }
    if (child.attributes.getNamedItem('TourUrl') != null) {
      temp._tourUrl = child.attributes.getNamedItem('TourUrl').nodeValue;
    }
    if (child.attributes.getNamedItem('Title') != null) {
      temp.title = child.attributes.getNamedItem('Title').nodeValue;
    }
    if (child.attributes.getNamedItem('Description') != null) {
      temp.description = child.attributes.getNamedItem('Description').nodeValue;
    }
    if (child.attributes.getNamedItem('Classification') != null) {
      temp.classification = Enums.parse('Classification', child.attributes.getNamedItem('Classification').nodeValue);
    }
    if (child.attributes.getNamedItem('AuthorEmail') != null) {
      temp.authorEmail = child.attributes.getNamedItem('AuthorEmail').nodeValue;
    }
    if (child.attributes.getNamedItem('Author') != null) {
      temp.author = child.attributes.getNamedItem('Author').nodeValue;
    }
    if (child.attributes.getNamedItem('AuthorURL') != null) {
      temp.authorURL = child.attributes.getNamedItem('AuthorURL').nodeValue;
    }
    if (child.attributes.getNamedItem('AuthorImageUrl') != null) {
      temp.authorImageUrl = child.attributes.getNamedItem('AuthorImageUrl').nodeValue;
    }
    if (child.attributes.getNamedItem('AverageRating') != null) {
      temp.averageRating = parseFloat(child.attributes.getNamedItem('AverageRating').nodeValue);
    }
    if (child.attributes.getNamedItem('LengthInSecs') != null) {
      temp.lengthInSecs = parseFloat(child.attributes.getNamedItem('LengthInSecs').nodeValue);
    }
    if (child.attributes.getNamedItem('OrganizationUrl') != null) {
      temp.organizationUrl = child.attributes.getNamedItem('OrganizationUrl').nodeValue;
    }
    if (child.attributes.getNamedItem('OrganizationName') != null) {
      temp.organizationName = child.attributes.getNamedItem('OrganizationName').nodeValue;
    }
    if (child.attributes.getNamedItem('RelatedTours') != null) {
      temp.relatedTours = child.attributes.getNamedItem('RelatedTours').nodeValue;
    }
    if (child.attributes.getNamedItem('Keywords') != null) {
      temp.keywords = child.attributes.getNamedItem('Keywords').nodeValue;
    }
    if (child.attributes.getNamedItem('ThumbnailUrl') != null) {
      temp.set_thumbnailUrl(child.attributes.getNamedItem('ThumbnailUrl').nodeValue);
    }
    return temp;
  }
  get_name() {
    return this.title;
  }
  get_thumbnail() {
    return this._thumbnail;
  }
  set_thumbnail(value) {
    this._thumbnail = value;
    return value;
  }
  get_thumbnailUrl() {
    if (!ss.emptyString(this._thumbnailUrlField)) {
      return this._thumbnailUrlField;
    }
    else {
      return ss.format('//worldwidetelescope.org/wwtweb/GetTourThumbnail.aspx?GUID={0}', this.id);
    }
  }
  set_thumbnailUrl(value) {
    this._thumbnailUrlField = value;
    return value;
  }
  get_tourUrl() {
    if (ss.emptyString(this._tourUrl)) {
      return ss.format('//cdn.worldwidetelescope.org/wwtweb/GetTour.aspx?GUID={0}', this.id);
    }
    else {
      return this._tourUrl;
    }
  }
  set_tourUrl(value) {
    this._tourUrl = value;
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
    return true;
  }
  get_isFolder() {
    return false;
  }
  get_isCloudCommunityItem() {
    return false;
  }
  get_readOnly() {
    return false;
  }
  get_children() {
    return [];
  }
};
