// pricebookSelector.js
// ─────────────────────────────────────────────────────────────────────────────
// Component : pricebookSelector
// Purpose   : Validates that the Opportunity has a Pricebook associated.
//             Emits a 'pricebookloaded' event with the pricebookId so the
//             parent (or sibling components via the parent) can react.
//
// Inputs    : @api opportunityId  – Salesforce Opportunity record Id
// Outputs   : CustomEvent('pricebookloaded', { detail: { pricebookId } })
// ─────────────────────────────────────────────────────────────────────────────
import { LightningElement, api, track } from 'lwc';
import CheckPricebook from '@salesforce/apex/BrowseCatalogController.checkPricebook';
 
export default class PricebookSelector extends LightningElement {
 
    @api opportunityId;         // Passed in by the parent component
 
    @track pricebookId = null;
    @track isLoading   = false;
 
    // ── Lifecycle ──────────────────────────────────────────────────────────
    connectedCallback() {
        this.checkForPricebook();
    }
 
    // ── Getters ────────────────────────────────────────────────────────────
    get hasPricebook() {
        return this.pricebookId != null;
    }
 
    // ── Private Methods ────────────────────────────────────────────────────
    checkForPricebook() {
        this.isLoading = true;
 
        CheckPricebook({ oppId: this.opportunityId })
            .then(result => {
                this.pricebookId = result;
 
                // Notify parent regardless of result (null = no pricebook)
                this.dispatchEvent(
                    new CustomEvent('pricebookloaded', {
                        detail: { pricebookId: this.pricebookId }
                    })
                );
            })
            .catch(error => {
                console.error('[pricebookSelector] checkForPricebook error:', error);
                this.dispatchEvent(
                    new CustomEvent('pricebookloaded', {
                        detail: { pricebookId: null }
                    })
                );
            })
            .finally(() => {
                this.isLoading = false;
            });
    }
}