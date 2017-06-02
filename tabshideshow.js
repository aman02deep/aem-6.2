/**
 * Extension to the standard dropdown/select component. It enabled hidding/unhidding of tabs based on the
 * selection made in the dropdown/select.
 *
 * How to use:
 *
 * - add the class cq-dialog-dropdown-tab-showhide to the dropdown/select element
 * - add the data attribute cq-dialog-dropdown-tab-showhide-target to the dropdown/select element, value should be the
 *   selector, usually a specific class name, to find all possible target elements that can be shown/hidden.
 * - add the target class to each target Tab/layoutConfig that can be shown/hidden
 * - add the class hidden to each target Tab to make them initially hidden
 * e.g.:
 *   + myComponent
 *     - jcr:title = "My Component"
 *     + cq:dialog
 *       - jcr:title = "My Component Dialog"
 *       - sling:resourceType = "cq/gui/components/authoring/dialog"
 *       + content
 *         - sling:resourceType = "granite/ui/components/foundation/container"
 *         + layout
 *          - sling:resourceType = "granite/ui/components/foundation/layouts/tabs"
 *          - type = "nav"
 *         + items
 *           + Tab1
 *             - jcr:title = "Tab 1"
 *             - sling:resourceType = "granite/ui/components/foundation/section"
 *             + layout
 *               - sling:resourceType = "granite/ui/components/foundation/layouts/fixedcolumns"
 *               + items
 *                 + column
 *                   + items
 *                     + mydropdown
 *                       - class = "cq-dialog-dropdown-tab-showhide"
 *                       - cq-dialog-dropdown-tab-showhide-target = ".list-option-tab-showhide-target"     // this is a selector for tabs
 *                       + items
 *                         + opentab2
 *                           - text = "Open Tab 2"
 *                           - value = "second"
 *                         + opentab3
 *                           - text = "Open Tab 3"
 *                           - value = "third"
 *            + Tab2
 *              - jcr:title = "Tab 2"
 *              - sling:resourceType = "granite/ui/components/foundation/section"
 *              + layout
 *                - sling:resourceType = "granite/ui/components/foundation/layouts/fixedcolumns"
 *              + layoutConfig
 *                - class = "hide list-option-tab-showhide-target second"    
 *                // hide: to hide the Tab,   list-option-tab-showhide-target: used as selector in dropdown,   second: selector value 
 *              + items
 *                + column
 *                  + items
 *                    + myElement
 *                      - fieldLabel = "Second tab item"
 *                      - sling:resourceType = "granite/ui/components/foundation/form/textfield"
 *            + Tab3
 *              - jcr:title = "Tab 3"
 *              - sling:resourceType = "granite/ui/components/foundation/section"
 *              + layout
 *                - sling:resourceType = "granite/ui/components/foundation/layouts/fixedcolumns"
 *              + layoutConfig
 *                - class = "hide list-option-tab-showhide-target third"    
 *                // hide: to hide the Tab,   list-option-tab-showhide-target: used as selector in dropdown,   third: selector value 
 *              + items
 *                + column
 *                  + items
 *                    + myElement
 *                      - fieldLabel = "Third tab item"
 *                      - sling:resourceType = "granite/ui/components/foundation/form/textfield"
 *            + Tab4
 *             - jcr:title = "Tab 4 Open"
 *             - sling:resourceType = "granite/ui/components/foundation/section"
 *             + layout
 *               - sling:resourceType = "granite/ui/components/foundation/layouts/fixedcolumns"
 *             + layoutConfig
 *               - class = " "    
 *               // leave it empty or do not create node or use some other class to use with different dropdown 
 *             + items
 *               + column
 *                 + items
 *                   + myElement
 *                     - fieldLabel = "Fourth tab item"
 *                     - sling:resourceType = "granite/ui/components/foundation/form/textfield"
 *                      
 */
(function(document, $) {
    "use strict";

    // when dialog gets injected
    $(document).on("foundation-contentloaded", function(e) {
        // if there is already an inital value make sure the according target element becomes visible
        showHide($(".cq-dialog-tab-showhide", e.target));
    });

    $(document).on("selected", ".cq-dialog-tab-showhide", function(e) {
        showHide($(this));
    });
    
    $(document).on("change", ".cq-dialog-tab-showhide", function(e) {
        showHide($(this));
    });

   function showHide(el){
       el.each(function(i, element) {
         /* get the selector to find the target elements. its stored as data-.. attribute */
         var target = $(element).data("cqDialogTabShowhideTarget");
           if ($(element).data("select")) {
              
               // get the selected value
               var value = $(element).data("select").getValue();
               
               // make sure all unselected target elements are hidden.
               $(target).not(".hide").addClass("hide");

               /* show the target element that contains the selected value as data-showhidetargetvalue attribute */
               if(value)
                 $(target+'.'+value).removeClass("hide");
           }else if($(element).is('input:checkbox')){
        
              // toggle the target element that contains the selected value as data-showhidetargetvalue attribute
              if($(element).is(':checked')){
                $(target).removeClass( "hide" );
              }else{
                $(target).addClass( "hide" );
              }
        
         }
       })
   }

})(document,Granite.$);