import {observable, computed} from 'mobx';
import {guid} from '../AppState';
import bmcBlock from './bmcBlock';

export default class bmcModel {
    id;
    @observable title = 'Business Model Canvas';
    @observable blocks = [
        new bmcBlock('Key Partners',            50, 100, 250, 440,
            "Help text"),
        new bmcBlock('Key Activities',          300, 100, 250, 220,
            "Help text"),
        new bmcBlock('Key Resources',           300, 320, 250, 220,
            "Help text"),
        new bmcBlock('Value Propositions',      550, 100, 250, 440,
            "Help text"),
        new bmcBlock('Customer Relationships',  800, 100, 250, 220,
            "Help text"),
        new bmcBlock('Channels',                800, 320, 250, 220,
            "Help text"),
        new bmcBlock('Customer Segments',       1050, 100, 250, 440,
            "Help text"),
        new bmcBlock('Cost Structure',          50, 540, 625, 220,
            "Help text"),
        new bmcBlock('Revenue Streams',         675, 540, 625, 220,
            "Help text")
    ];

    constructor( title ) {
        this.id = guid();
        this.title = title;
    }


}
