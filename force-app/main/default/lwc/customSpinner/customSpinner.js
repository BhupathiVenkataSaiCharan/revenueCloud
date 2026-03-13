import { LightningElement, api } from 'lwc';

export default class CustomSpinner extends LightningElement {
    @api isLoading = false;
    @api size = 'medium'; // small, medium, large
}