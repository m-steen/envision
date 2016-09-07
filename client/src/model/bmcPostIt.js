import {observable, computed} from 'mobx';
import {guid} from '../AppState';

export default class bmcPostIt {
    id;
    @observable title = 'Post It!';
    @observable color = 'yellow';
    @observable x = 0;
    @observable y = 0;
    @observable w = 120;
    @observable h = 80;

    constructor(title, x, y, w, h, color) {
        this.id = guid();
        this.title = title;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color || 'yellow';
    }


}
