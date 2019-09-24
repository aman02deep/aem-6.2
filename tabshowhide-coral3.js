(function (document, $) {
  "use strict";

  // when dialog gets injected
  $(document).on("foundation-contentloaded", function (e) {
    // if there is already an initial value make sure the according target element becomes visible
    showHide($(".cq-dialog-tab-showhide"));
  });

  $(document).on("selected", ".cq-dialog-tab-showhide", function (e) {
    showHide($(this));
  });

  $(document).on("change", ".cq-dialog-tab-showhide", function (e) {
    showHide($(this));
  });

  function showHide(el) {
    el.each(function (i, element) {
      // verify if the select box is coral3 or not. it works only for coral3
      if ($(element).is('coral-select')) {
        let selectedItem;
        $(element).children('coral-select-item').each(function () {
          let attr = $(this).attr('selected');
          if (typeof attr !== typeof undefined && attr !== false) {
            selectedItem = $(this).val();
          }
        });

        // hide all targeted Tabs content panel
        let allTargetTabs = $('.tab-showhide-target');
        $(allTargetTabs).each(function () {
          $(this).not(".hide").addClass("hide");
          let tabId = $(this).parents("coral-panel").attr('aria-labelledby');
          $('#' + tabId).not(".hide").addClass("hide");
        });

        // selected tab content panel
        let tabContentPanel = $('.tab-showhide-target.' + selectedItem);
        $(tabContentPanel).removeClass("hide");

        // get the tab panel
        let tabId = $(tabContentPanel).parents("coral-panel").attr('aria-labelledby');
        $('#' + tabId).removeClass("hide");
      }
    })
  }

})(document, Granite.$);
