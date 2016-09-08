import {observable, computed} from 'mobx';
import {guid} from '../AppState';
import bmcBlock from './bmcBlock';

// positioning of the blocks:
// we use a maximum screen width of 1024 pixels (768 x 1024 resolution)
// this is the native resolution of iPads and seems to be a reasonable
// resolution that most screens and beamers can reach.
// if we make our blocks 200px wide, they'll fit in 1000px. Leaving
// 12px left and right.
// if we use the height, we have 768px. 100px are for the menu, so
// this leaves 668. Use height of 220px.
export default class bmcModel {
    id;
    @observable title = 'Business Model Canvas';
    @observable blocks = [
        new bmcBlock('Key Partners',             12, 100, 200, 440),
        new bmcBlock('Key Activities',          212, 100, 200, 220),
        new bmcBlock('Key Resources',           212, 320, 200, 220),
        new bmcBlock('Value Propositions',      412, 100, 200, 440),
        new bmcBlock('Customer Relationships',  612, 100, 200, 220),
        new bmcBlock('Channels',                612, 320, 200, 220),
        new bmcBlock('Customer Segments',       812, 100, 200, 440),
        new bmcBlock('Cost Structure',           12, 540, 500, 220),
        new bmcBlock('Revenue Streams',         512, 540, 500, 220)
    ];

    constructor( title ) {
        this.id = guid();
        this.title = title;
    }


}
