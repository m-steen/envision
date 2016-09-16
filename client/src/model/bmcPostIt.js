import {observable, computed} from 'mobx';
import {guid} from '../AppState';

export default class bmcPostIt {
    id;
    @observable title = 'Click to edit';
    @observable color = 'yellow';
    @observable x = 0;
    @observable y = 0;
    @observable w = 100;
    @observable h = 60;

    constructor(title, x, y, color) {
        this.id = guid();
        this.title = title;
        this.x = x;
        this.y = y;
        this.color = color || 'yellow';
    }

}
