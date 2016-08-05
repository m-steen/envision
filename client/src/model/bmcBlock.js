import {observable, computed} from 'mobx';
import {guid} from '../AppState';

export default class bmcBlock {
    id;
    @observable title = '';
    @observable postIts = [];
    @observable x = 0;
    @observable y = 0;
    @observable w = 0;
    @observable h = 0;

    constructor( title, x, y, w, h ) {
        this.id = guid();
        this.title = title;
        this.postIts = [];
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }


}
