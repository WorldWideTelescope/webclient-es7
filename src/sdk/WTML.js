import {Folder} from './Folder';
import ss from './scriptsharp/ss';
import {Imageset} from './Imageset';
import {WWTControl} from './WWTControl';
import {Place} from './Place';

export const Wtml = {
  getWtmlFile: (url, complete) => {
    const temp = new Folder();
    temp.loadFromUrl(url, () => {
      Wtml.loadImagesets(temp);
      complete();
    });
  },
  loadImagesets : folder => {
    const $enum1 = ss.enumerate(folder.get_children());

    while ($enum1.moveNext()) {
      const child = $enum1.current;
      if (ss.canCast(child, Imageset)) {
        WWTControl.imageSets.push(child);
      }
      if (ss.canCast(child, Place)) {
        const place = child;
        if (place.get_studyImageset() != null) {
          WWTControl.imageSets.push(place.get_studyImageset());
        }
        if (place.get_backgroundImageset() != null) {
          WWTControl.imageSets.push(place.get_backgroundImageset());
        }
      }
    }

    if (!ss.emptyString(WWTControl.imageSetName)) {
      const name = WWTControl.imageSetName.toLowerCase();
      const $enum2 = ss.enumerate(WWTControl.imageSets);
      while ($enum2.moveNext()) {
        const imageset = $enum2.current;
        if (imageset.get_name().toLowerCase() === name) {
          WWTControl.singleton.renderContext.set_backgroundImageset(imageset);
        }
      }
    }
  }
};