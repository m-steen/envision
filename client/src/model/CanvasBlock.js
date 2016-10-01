import {observable, computed} from 'mobx';
import {guid} from '../AppState';
import helpTexts from './CanvasHelp';

export default class CanvasBlock {
    id;
    @observable title = '';
    @observable postIts = [];
    @observable x = 0;
    @observable y = 0;
    @observable w = 0;
    @observable h = 0;
    @observable showHelp = false;
    @computed get helpText() { return helpTexts.get(this.title) };

    constructor( title, x, y, w, h ) {
        this.id = guid();
        this.title = title;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }


}
