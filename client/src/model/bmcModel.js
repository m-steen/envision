import {observable, computed} from 'mobx';
import {guid} from '../AppState';
import bmcBlock from './bmcBlock';

export default class bmcModel {
    id;
    @observable title = 'Business Model Canvas';
    @observable blocks = [
        new bmcBlock('Key Partners',            50, 50, 250, 500),
        new bmcBlock('Key Activities',          300, 50, 250, 250),
        new bmcBlock('Key Resources',           300, 300, 250, 250),
        new bmcBlock('Value Propositions',      550, 50, 250, 500),
        new bmcBlock('Customer Relationships',  800, 50, 250, 250),
        new bmcBlock('Channels',                800,300, 250, 250),
        new bmcBlock('Customer Segments',       1050, 50, 250, 500),
        new bmcBlock('Cost Structure',          50, 550, 625, 250),
        new bmcBlock('Revenue Streams',         675, 550, 625, 250)
    ];

    constructor( title ) {
        this.id = guid();
        this.title = title;
    }


}
