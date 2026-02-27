/**
 * ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
 * Class Name      : ProductHandler
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

public class ProductHandler {

	public static void run() {

		List<Product2> newList = Trigger.new;
        List<Product2> oldList = Trigger.old;
        Map<Id, Product2> newMap  = (Map<Id, Product2>)Trigger.newMap;
        Map<Id, Product2> oldMap  = (Map<Id, Product2>)Trigger.oldMap;

		switch on Trigger.operationType{
			WHEN BEFORE_INSERT{

			}
			WHEN AFTER_INSERT{

			}
			WHEN BEFORE_UPDATE{

			}
			WHEN AFTER_UPDATE{

			}
			WHEN BEFORE_DELETE{

			}
			WHEN AFTER_DELETE{

			}
			WHEN AFTER_UNDELETE{

			}
		}
	}
}