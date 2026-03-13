import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import CheckPricebook from '@salesforce/apex/BrowseCatalogController.checkPricebook';
import GetCatalogs from '@salesforce/apex/BrowseCatalogController.getCatalogs';
import GetCategories from '@salesforce/apex/BrowseCatalogController.getCategories';
import GetProductCategoryProducts from '@salesforce/apex/BrowseCatalogController.getProductCategoryProducts';
import MODAL_SIZE from '@salesforce/resourceUrl/ModalSize';
import { loadStyle } from 'lightning/platformResourceLoader';

export default class BrowseCatalog extends LightningElement {

    @api recordId;
    @wire(CurrentPageReference)pageRef;             //to get the recordId when this component is not available in connected callback
    columns = [
        {label : 'Name', fieldName: 'Name'},
        {label : 'Code', fieldName: 'Code'},
        {label : 'Number Of Categories', fieldName: 'NumberOfCategories'},
        {label : 'Last Modified Date', fieldName: 'LastModifiedDate'}
    ];
    pricebookId;            //used to check if pricebook exists for the opportunity
    catalogs = [];
    categories = [];
    isCatalogScreen = false;    //control this based on checkForPricebook method
    isCssLoaded = false;        //used in rendered callback where increasing the modal width
    isCategoryScreen = false;

    selectedCatalogId;
    selectedRows = [];      //to store the selected rows from datatable when going back from categories

    isLoading = false;

    get opportunityId(){
        return this.recordId || this.pageRef?.state?.recordId;
    }

    get hasPricebook(){
        return this.pricebookId == null ? false : true;
    }

    renderedCallback() {
        if (this.isCssLoaded) return;
        loadStyle(this, MODAL_SIZE);
        this.isCssLoaded = true;
    }

    connectedCallback() {
        this.checkForPricebook();
        this.catalogsList();
    }

    checkForPricebook(){
        this.isLoading = true;
        CheckPricebook({oppId : this.opportunityId})
        .then(result => {
            console.log('Pricebook exists: ', result);
            this.pricebookId = result;
            this.isCatalogScreen = this.hasPricebook;
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            this.isLoading = false;
        });
    }

    catalogsList(){
        this.isLoading = true;
        GetCatalogs()
        .then(result => {
            this.catalogs = result;
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            this.isLoading = false;
        });
    }

    handleRowSelection(e){
        const newCatalogId = e.detail.selectedRows[0]?.Id;
        
        if(newCatalogId !== this.selectedCatalogId){
            this.categories = [];
        }

        this.selectedCatalogId = newCatalogId;
        this.selectedRows = [this.selectedCatalogId];
    }

    get isHandleSelectCatalogDisabled(){
        return this.selectedCatalogId == null;
    }

    handleSelectCatalog(){
        this.isCatalogScreen = false;
        this.isCategoryScreen = true;
        this.categoriesList();
    }

    handleBackToCatalog(){
        this.isCatalogScreen = true;
        this.isCategoryScreen = false;
    }

    categoriesList(){
        this.isLoading = true;
        GetCategories({catalogId : this.selectedCatalogId})
        .then(result => {
            this.categories = result;
            this.productCategoryProductsList();
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            this.isLoading = false;
        });
    }

    productCategoryProductsList(){
        GetProductCategoryProducts({categoryList : this.categories})
        .then(result => {
            console.log('Products in category: ', result);
        }).catch(error => {
            console.log(error);
        });
    }
}