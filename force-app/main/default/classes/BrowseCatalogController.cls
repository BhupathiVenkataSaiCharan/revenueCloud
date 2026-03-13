public class BrowseCatalogController {
    
    @AuraEnabled
    public static String checkPricebook(String oppId){
        try{
            if(oppId == null){
                return 'No Opp Id';
            }

            List<Opportunity> oppList = [SELECT Id,Name,Pricebook2Id FROM Opportunity WHERE Id=:oppId];

            system.debug('oppList' + oppList[0].Pricebook2Id);
            return oppList[0].Pricebook2Id;

        }catch(Exception e){
            throw new AuraHandledException('Error' + e.getMessage());
        }
    }

    @AuraEnabled
    public static List<ProductCatalog> getCatalogs(){
        
        List<ProductCatalog> catalogList = [SELECT Id,Name,Code,NumberOfCategories,LastModifiedDate FROM ProductCatalog ORDER BY Name ASC];

        return catalogList;
    }

    @AuraEnabled
    public static List<ProductCategory> getCategories(String catalogId){
        try {
            List<ProductCategory> categoryList = [SELECT Id,Name,CatalogId,SortOrder FROM ProductCategory WHERE CatalogId = :catalogId ORDER BY SortOrder ASC];

            return categoryList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void getProductCategoryProducts(List<ProductCategory> categoryList){
        try {
            system.debug('Categories' + categoryList);
            Set<Id> pcSet = new Set<Id>(); 
            for(ProductCategory pc : categoryList){
                pcSet.add(pc.Id); 
            }

            // for(ProductCategoryProduct pcp : [SELECT Id,])
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}