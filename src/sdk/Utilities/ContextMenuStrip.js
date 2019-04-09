import ss from '../scriptsharp/ss';
import {Vector2d} from '../Double3d';
import {EventArgs} from '../ScriptInterface';

export class ContextMenuStrip{
  constructor(){
    this.items = [];
  }
  _dispose(){  }
  _nonMenuClick(e) {
    const menu = document.getElementById('contextmenu');
    menu.style.display = 'none';
    window.removeEventListener('click', this._nonMenuClick, false);
    const popup = document.getElementById('popoutmenu');
    while (popup.firstChild != null) {
      popup.removeChild(popup.firstChild);
    }
    popup.style.display = 'none';
  }
  static _menuItemClicked(e) {
    const me = e.currentTarget;
    me.itemTag.click(me.itemTag, new EventArgs());
  }
  _show(position) {
    const menu = document.getElementById('contextmenu');
    while (menu.firstChild != null) {
      menu.removeChild(menu.firstChild);
    }
    menu.className = 'contextmenu';
    menu.style.display = 'block';
    menu.style.left = position.x.toString() + 'px';
    menu.style.top = position.y.toString() + 'px';
    window.addEventListener('click', this._nonMenuClick/*ss.bind('_nonMenuClick', this)*/, true);
    const $enum1 = ss.enumerate(this.items);
    while ($enum1.moveNext()) {
      const item = $enum1.current;
      if (item.visible) {
        const md = document.createElement('div');
        if (item.dropDownItems.length > 0) {
          md.className = 'contextmenuitem submenu';
        } else {
          if (item.checked) {
            md.className = 'contextmenuitem checkedmenu';
          } else {
            md.className = 'contextmenuitem';
          }
        }
        md.innerText = item.name;
        const it = md;
        it.itemTag = item;
        md.addEventListener('mouseover', ss.bind('_openSubMenu', this), false);
        if (item.click != null) {
          md.addEventListener('click',ContextMenuStrip._menuItemClicked/* ss.bind('_menuItemClicked', this)*/, false);
        }
        menu.appendChild(md);
      }
    }
  }
  _openSubMenu(e) {
    const me = e.currentTarget;
    const child = me.itemTag;
    const menu = document.getElementById('popoutmenu');
    while (menu.firstChild != null) {
      menu.removeChild(menu.firstChild);
    }
    menu.style.display = 'none';
    if (!child.dropDownItems.length) {
      return;
    }
    const position = new Vector2d();
    position.x = e.currentTarget.parentNode.offsetLeft + e.currentTarget.parentNode.clientWidth;
    position.y = e.currentTarget.parentNode.offsetTop + e.currentTarget.offsetTop;
    menu.className = 'contextmenu';
    menu.style.display = 'block';
    menu.style.left = position.x.toString() + 'px';
    menu.style.top = position.y.toString() + 'px';
    window.addEventListener('click', ss.bind('_nonMenuClick', this), true);
    const $enum1 = ss.enumerate(child.dropDownItems);
    while ($enum1.moveNext()) {
      const item = $enum1.current;
      if (item.visible) {
        const md = document.createElement('div');
        md.className = (item.checked) ? 'contextmenuitem checkedmenu' : 'contextmenuitem';
        md.innerText = item.name;
        const it = md;
        it.itemTag = item;
        md.addEventListener('click', ss.bind('_menuItemClicked', this), false);
        menu.appendChild(md);
      }
    }
  }
};

export class ToolStripMenuItem {

  constructor() {
    this.tag = null;
    this.dropDownItems = [];
    this.checked = false;
    this.enabled = true;
    this.visible = true;
  }

  static create (name) {
    const tsmi = new ToolStripMenuItem();
    tsmi.name = name;
    return tsmi;
  }
}
export class ToolStripSeparator extends ToolStripMenuItem{
  constructor() {
    super();
    this.name = '--------------------------------------';
  }
}

export class TagMe{
  constructor() {}
}
