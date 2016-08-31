import {observable, computed} from 'mobx';
import {guid} from '../AppState';
import bmcBlock from './bmcBlock';

export default class bmcModel {
    id;
    @observable title = 'Business Model Canvas';
    @observable blocks = [
        new bmcBlock('Key Partners',            50, 100, 250, 500),
        new bmcBlock('Key Activities',          300, 100, 250, 250),
        new bmcBlock('Key Resources',           300, 350, 250, 250),
        new bmcBlock('Value Propositions',      550, 100, 250, 500),
        new bmcBlock('Customer Relationships',  800, 100, 250, 250),
        new bmcBlock('Channels',                800, 350, 250, 250),
        new bmcBlock('Customer Segments',       1050, 100, 250, 500),
        new bmcBlock('Cost Structure',          50, 600, 625, 250),
        new bmcBlock('Revenue Streams',         675, 600, 625, 250)
    ];

    constructor( title ) {
        this.id = guid();
        this.title = title;
    }


}
