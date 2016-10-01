import React from 'react';
import {observable, computed} from 'mobx';
import {guid} from '../AppState';
import CanvasBlock from './CanvasBlock';

export default class CanvasModel {
    modelId;
    @observable metamodel = 'unknown';
    @observable title = 'Canvas Model';
    @observable blocks: CanvasBlock[] = [];
    // allow postits also outside of blocks
    @observable postIts = [];
    @observable x = 0;
    @observable y = 0;

    constructor( metamodel, title ) {
        this.modelId = guid();
        this.metamodel = metamodel;
        this.title = title;
    }


}
