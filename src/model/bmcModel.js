import {observable, computed} from 'mobx';
import {guid} from '../AppState';
import bmcBlock from './bmcBlock';

export default class bmcModel {
    id;
    @observable title = 'Business Model Canvas';
    @observable blocks = [
        new bmcBlock('Key Partners',            50, 50, 200, 500),
        new bmcBlock('Key Activities',          250, 50, 200, 250),
        new bmcBlock('Key Partners',            50, 50, 200, 500),
        new bmcBlock('Key Activities',          250, 50, 200, 250),
        new bmcBlock('Key Resources',           250, 300, 200, 250),
        new bmcBlock('Value Propositions',      450, 50, 200, 500),
        new bmcBlock('Customer Relationships',  650, 50, 200, 250),
        new bmcBlock('Channels',                650,300, 200, 250),
        new bmcBlock('Customer Segments',       850, 50, 200, 500),
        new bmcBlock('Cost Structure',          50, 550, 500, 250),
        new bmcBlock('Revenue Streams',         550, 550, 500, 250)
    ];

    constructor( title ) {
        this.id = guid();
        this.title = title;
    }


}