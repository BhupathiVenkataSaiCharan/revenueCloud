/**
 * ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
 * Class Name      : ProductService
 * Author          : <YourName>
 * Created Date    : Feb 25, 2026
 * Last Modified By: <YourName>
 * Last Modified On: Feb 25, 2026
 * Description     : This class implements for......
 *  
 * Change History  :
 *  Date          │   Author     │   Change
 * ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
 *  Feb 25, 2026  │ <YourName>   │ Initial version
 * ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
 */

public class ProductService {

	public static void onBeforeInsert(List<Product2> newList) {
        ProductHelper.checkDuplicateProducts(newList);
    }

    public static void onAfterInsert(List<Product2> newList) {
        ProductHelper.processNewProducts(newList);
    }

}