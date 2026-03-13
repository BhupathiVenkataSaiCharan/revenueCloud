import { LightningElement, wire, track } from 'lwc';
import getProductFields from '@salesforce/apex/DefaultCatalogandCategoryController.getProductFields';

export default class DefaultCatalogandCategory extends LightningElement {

    fields = [];
    @track filteredFields = [];
    @track searchValue = '';
    @track selectedField = null;

    @wire(getProductFields)
    wiredFields({ data, error }) {
        if (data) {
            console.log('Fields received:', JSON.stringify(data));
            this.fields = data;
        } else if (error) {
            console.error('Wire error:', error);
        }
    }

    handleSearch(event) {
        this.searchValue = event.target.value;
        this.selectedField = null;

        const searchKey = this.searchValue.toLowerCase();

        if (searchKey.length <= 2) {
            this.filteredFields = [];
            return;
        }

        this.filteredFields = this.fields.filter(
            f => f.label.toLowerCase().includes(searchKey) ||
                f.apiName.toLowerCase().includes(searchKey)
        );
    }

    handleSelect(event) {
        const label = event.currentTarget.dataset.label;
        const apiName = event.currentTarget.dataset.api;

        this.selectedField = { label, apiName };
        this.searchValue = label;
        this.filteredFields = [];
    }

    handleClear() {
        this.searchValue = '';
        this.filteredFields = [];
        this.selectedField = null;
    }

    handleSubmit() {
        if (this.selectedField) {
            console.log('Selected Field:', JSON.stringify(this.selectedField));
        } else if (this.searchValue) {
            // If user typed but didn't select from dropdown
            console.log('Search Value (no dropdown selection):', this.searchValue);
            console.log('Filtered Fields at submit:', JSON.stringify(this.filteredFields));
        } else {
            console.log('No value entered.');
        }
    }

    get showDropdown() {
        return this.filteredFields.length > 0;
    }
}