public class ProductHelper {
    
    // Check if there is already a product with same product Name and Catalog and Category
    public static void checkDuplicateProducts(List<Product2> newList) {

        Set<String> productSet = new Set<String>();
        for(Product2 p : [SELECT Id,Catalog__c,Category__c,Name FROM Product2]){
            String key = p.Catalog__c + p.Category__c + p.Name;
            productSet.add(key.toLowerCase());
        }

        for(Product2 p : newList){
            String key = p.Catalog__c + p.Category__c + p.Name;
            if(productSet.contains(key.toLowerCase())){
                p.addError('Duplicate Product');
            }
        }
    }

    // Process new products and build RLM structure
    public static void processNewProducts(List<Product2> newList){
        if(newList.isEmpty()){
            return;
        }

        Set<Id> catalogSet = new Set<Id>();
        for(ProductCatalog pc : [SELECT Id,Name FROM ProductCatalog]){
            if(pc.Name != null){
                catalogSet.add(pc.Name.toLowerCase());
            }
        }

        Set<Id> missingCatalogsSet = new Set<Id>();
        for(Product2 p : newList){
            if(p.Catalog__c != null){
                if(!catalogSet.contains(p.Catalog__c.toLowerCase())){
                    missingCatalogsSet.add(p.Catalog__c);
                }
            }
        }

        if(!missingCatalogsSet.isEmpty()){
            createMissingCatalogs(missingCatalogsSet);
        }
    }

    private static void createMissingCatalogs(Set<Id> missingCatalogsSet){
        if(missingCatalogsSet.isEmpty()){
            return;
        }

        List<ProductCatalog> pcList = new List<ProductCatalog>();
        for(String s : missingCatalogsSet){
            ProductCatalog pc = new ProductCatalog(Name = s);
            pcList.add(pc);
        }

        if(!pcList.isEmpty()){
            insert pcList;
        }
    }
}