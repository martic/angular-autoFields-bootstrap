(function () {
    "use strict";

    angular.module("autofields.tab", ["autofields.bootstrap"])
        .config(["$autofieldsProvider", function ($autofieldsProvider) {
            // Tabs Handler
            // Requires bootstrapwizard
            $autofieldsProvider.registerHandler(["tab"], function (directive, field, index) {
                var row = angular.element("<div/>");
                row.addClass("tab-pane bg-gray-lighter ");
                row.attr("id", field.property);
                if (field.property === "tab1") {
                    row.addClass("active");
                }
                angular.forEach(field.fields, function (cell, cellIndex) {
                    var cellContainer = angular.element("<div/>");
                    cellContainer.append($autofieldsProvider.createField(directive, cell, cellIndex));
                    row.append(cellContainer);
                });
                return row;
            });
        }]);

    angular.module("autofields.heading", ["autofields.bootstrap"])
        .config(["$autofieldsProvider", function ($autofieldsProvider) {
            // Grouped Headdings Handler
            $autofieldsProvider.registerHandler(["heading"], function (directive, field, index) {
                var row = angular.element("<fieldset/>");
                var row1 = angular.element("<legend/>");
                row1.html(field.label);
                angular.forEach(field.fields, function (cell, cellIndex) {
                    var cellContainer = angular.element("<div/>");
                    cellContainer.append($autofieldsProvider.createField(directive, cell, cellIndex));
                    row.append(row1);
                    row.append(cellContainer);
                });
                return row;
            });
        }]);
    //TODO: MultiplePeople: must take one input of qty of injured people
    //TODO: MultiplePeople: Add an ID to each child fileds.property
    //TODO: MultiplePeople: changing the qty will make it repeat
    angular.module("autofields.repeater", ["autofields.bootstrap"])
        .config(["$autofieldsProvider", function ($autofieldsProvider) {
            // Repeater Handler
            $autofieldsProvider.registerHandler(["repeater"], function (directive, field, index) {
                // input how many repeats ?
                var fieldElements = $autofieldsProvider.field(directive, field, "<input/>");
                fieldElements.input.attr("ng-hide", "true");
                var count = angular.element("<span/>");
                count.html("{{answers." + field.property + ".length}} ");
                fieldElements.input.parent().append(count);
                var button = angular.element("<a/>");
                button.attr("ng-click", "addRepeatItem('" + field.property + "')");
                button.attr("class", "label label-info");
                button.html(" Add ");
                fieldElements.input.parent().append(button);
                var outer = angular.element("<div/>");
                outer.append(fieldElements.fieldContainer);
                var repeater = angular.element("<div/>");
                repeater.attr("ng-repeat", field.list);
                angular.forEach(field.fields, function (cell, cellIndex) {
                    var cellContainer = angular.element("<div/>");
                    cellContainer.append($autofieldsProvider.createField(directive, cell, cellIndex));
                    repeater.append(cellContainer);
                });
                angular.element(repeater.attr('property'));
                outer.append(repeater);
                return outer;
            });
        }]);


    angular.module("autofields.fileupload", ["autofields.bootstrap"])
      .config(["$autofieldsProvider", function ($autofieldsProvider) {
          //fileupload Field Handler
          //requires https://dropzonejs.com
          $autofieldsProvider.registerHandler(["fileupload"], function (directive, field, index) {

              var outer = angular.element("<div/>");

              var fieldElements = $autofieldsProvider.field(directive, field, "<input/>");
              fieldElements.input.attr("ng-hide", "true");

              var uploader = angular.element("<button/>");
              uploader.attr("dropzone", "dropzoneConfig");
              uploader.addClass("dropzone col-sm-4");
              fieldElements.fieldContainer.append(uploader);
              var repeater = angular.element("<div/>");
              repeater.addClass("col-sm-8");
              repeater.html('<ul><li ng-repeat="' + field.list + '"><a ng-href="{{file.longFileName}}" target="_blank" >{{file.filename}}</a>');
              fieldElements.fieldContainer.append(repeater);

              outer.append(fieldElements.fieldContainer);
              return outer;
          });
      }]);

    angular.module("autofields.datetime", ["autofields.bootstrap"])
        .config(["$autofieldsProvider", function ($autofieldsProvider) {
            //Datetime Field Handler
            //requires https://github.com/Eonasdan/bootstrap-datetimepicker
            $autofieldsProvider.registerHandler(["datetime"], function (directive, field, index) {
                var fieldElements = $autofieldsProvider.field(directive, field, "<input/>");
                fieldElements.input.attr("ui-jq", "datetimepicker");
                fieldElements.input.attr("data-ui-options", "{format:'DD/MM/YYYY hh:mm a',sideBySide:true}");
                return fieldElements.fieldContainer;
            });
        }]);

    angular.module("autofields.datepick", ["autofields.bootstrap"])
        .config(["$autofieldsProvider", function ($autofieldsProvider) {
            //Datetime Field Handler
            //requires https://github.com/Eonasdan/bootstrap-datetimepicker
            $autofieldsProvider.registerHandler(["datepick"], function (directive, field, index) {
                var fieldElements = $autofieldsProvider.field(directive, field, "<input/>");
                fieldElements.input.attr("ui-jq", "datetimepicker");
                fieldElements.input.attr("data-ui-options", "{format:'DD/MM/YYYY',disabledTimeIntervals:true,disabledHours:true}");
                return fieldElements.fieldContainer;
            });
        }]);

    angular.module("autofields.phone", ["autofields.bootstrap"])
        .config(["$autofieldsProvider", function ($autofieldsProvider) {
            //Phone Field Handler
            //requires https://angular-ui.github.io/bootstrap/
            //requires http://jasny.github.io/bootstrap/javascript/#inputmask
            $autofieldsProvider.registerHandler(["phone"], function (directive, field, index) {
                var fieldElements = $autofieldsProvider.field(directive, field, "<input/>");
                //fieldElements.input.attr("ui-jq", "inputmask");
                //fieldElements.input.attr("ui-options", "{mask: '(09) 9999-9999'}");
                fieldElements.input.attr("ui-mask", "(09) 9999-9999");
                fieldElements.input.attr("ui-mask-placeholder", "(0_) ____-____");
                return fieldElements.fieldContainer;
            });
        }]);

    angular.module('autofields.info', ['autofields.core'])
        .config(['$autofieldsProvider', function ($autofieldsProvider) {
            // Help Block Propert Support
            $autofieldsProvider.registerMutator(["info"], function (directive, field, fieldElements) {
                if (!field.info) return fieldElements;

                var link = "#";
                var target = "";
                var tip = field.info;
                if (field.infolink) {
                    link = field.infolink;
                    target = "target=\"_blank\"";
                    tip = tip + "       [click for more info]";
                }
                fieldElements.label.html(fieldElements.label.html() + " <a href=\"" + link + "\" " + target + " tooltip=\"" + tip + "\" tooltip-placement=\"top\"><i class=\"glyphicon glyphicon-info-sign\"></i></a>"); //
                return fieldElements;
            });
        }]);

    angular.module("autofields.typeahead", ["autofields.bootstrap"])
       .config(["$autofieldsProvider", function ($autofieldsProvider) {
           //Typeahead Field Handler
           //requires https://angular-ui.github.io/bootstrap/
           $autofieldsProvider.registerHandler(["typeahead"], function (directive, field, index) {
               var fieldElements = $autofieldsProvider.field(directive, field, "<input/>");
               fieldElements.input.attr("typeahead", field.list);
               fieldElements.input.attr("typeahead-loading", "loading" + field.property);
               //fieldElements.fieldContainer.append("<i ng-show=\"loading" + field.property + "\" class=\"glyphicon glyphicon-refresh\"></i>");
               return fieldElements.fieldContainer;
           });
       }]);

    angular.module("autofields.plotAddress", ["autofields.bootstrap"])
      .config(["$autofieldsProvider", function ($autofieldsProvider) {
          //Typeahead Field Handler
          //requires https://angular-ui.github.io/bootstrap/
          $autofieldsProvider.registerHandler(["plotAddress"], function (directive, field, index) {
              var fieldElements = $autofieldsProvider.field(directive, field, "<input/>");
              fieldElements.input.attr("typeahead", field.list);
              fieldElements.input.attr("typeahead-loading", "loading" + field.property);

              var row = angular.element("<div/>");
              row.addClass("col-xs-10 no-padding");

              var modelStr = directive.dataStr + '.' + field.property;
              var latInput = "<input ng-model='" + modelStr + ".lat' disabled='true' />";
              var lngInput = "<input ng-model='" + modelStr + ".lng' disabled='true' />";

              var f2 = fieldElements.input.wrap(row);
              var inputHtml2 = ''
                  + '<div >'
                  + '<script  type="text/ng-template" id="myModalContent.html">'
                  + '<div class="modal-header">'
                    + '<h3 class="modal-title">Refine Your location</h3>'
                    + '</div>'
                    + '<div class="modal-body">'
                    + '<section class="widget bg-transparent">'
                + '<div class="widget-body" style="height: 400px;">'
                    + '<div  ng-if="$parent.render"  data-md-gmap data-content-menu="true" class="content-map" ></div>'
                    + '<div class="content-map-controls">'
                        + '<div class="btn-group btn-group-sm">'
                            + '<button class="btn btn-inverse" data-gmap-zoom-in><i class="fa fa-plus"></i></button>'
                            + '<button class="btn btn-inverse" data-gmap-zoom-out><i class="fa fa-minus"></i></button>'
                        + '</div>'
                    + '</div>'
                    + '<div id="marker-tooltip"></div>'
                + '</div>'
                                    + "<input ng-model='lat' disabled='true' />"
                    + "<input ng-model='lng' disabled='true' />"
            + '</section>'
                    + '</div>'
                    + '<div class="modal-footer">'
                    + '<button class="btn btn-primary" ng-click="ok()">OK</button>'
                    + '<button class="btn btn-warning" ng-click="cancel()">Cancel</button>'
                    + '</div>'
                    + '</script>'
                    + '</div>'
                    + '<button class="btn btn-default" ng-click="open(' + modelStr + ')">Open map!</button>';

              fieldElements.input.parent().parent().append(inputHtml2);
              fieldElements.input.parent().append("<i ng-show=\"loading" + field.property + "\" class=\"glyphicon glyphicon-refresh .multiselect-search-list-item_loader\"></i>");


              fieldElements.input.parent().append(latInput);
              fieldElements.input.parent().append(lngInput);

              return fieldElements.fieldContainer;
          });
      }]);

    angular.module("autofields.multiselect", ["autofields.bootstrap"])
        .config(["$autofieldsProvider", function ($autofieldsProvider) {
            //Multiselect
            //requires https://github.com/tamtakoe/oi.multiselect
            $autofieldsProvider.registerHandler(["multiselect"], function (directive, field, index) {
                var fieldElements = $autofieldsProvider.field(directive, field, "<oi-multiselect/>");
                fieldElements.input.attr("multiple", true);
                fieldElements.input.attr("ng-options", field.list);
                fieldElements.input.attr("oi-multiselect-options", "{newItem: 'prompt',newItemFn: addItem}");
                fieldElements.fieldContainer.append("<i ng-show=\"loading" + field.property + "\" class=\"glyphicon glyphicon-refresh\"></i>");
                return fieldElements.fieldContainer;
            });
        }]);

    angular.module("autofields.btnradio", ["autofields.bootstrap"])
   .config(["$autofieldsProvider", function ($autofieldsProvider) {
       $autofieldsProvider.registerHandler(["btnradio"], function (directive, field, index) {
           var modelStr = directive.dataStr + "." + field.property;
           var fieldElements = $autofieldsProvider.field(directive, field, "<label/>");
           fieldElements.input.attr("class", "btn btn-default");
           fieldElements.input.attr("data-btn-radio", "\'{{key}}\'");
           fieldElements.input.attr("ng-model", modelStr);
           fieldElements.input.attr("ng-repeat", field.list);
           fieldElements.input.append("{{value}}");
           var row = angular.element("<div/>");
           row.addClass("btn-group");
           fieldElements.input.wrap(row);
           return fieldElements.fieldContainer;
       });
   }]);

    angular.module("autofields.tabFilter", [])
    .filter("tabsOnly", function () {
        return function (items) {
            var filtered = [];
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (/tab/i.test(item.type)) {
                    filtered.push(item);
                }
            }
            return filtered;
        };
    });

    angular.module("autofields", [
        "autofields.tab",
        "autofields.heading",
        "autofields.typeahead",
        "autofields.plotAddress",
        "autofields.multiselect",
        "autofields.btnradio",
        "autofields.phone",
        "autofields.datetime",
        "autofields.tabFilter",
        "autofields.datepick",
        "autofields.info",
        "autofields.fileupload",
        "autofields.repeater"
    ]);

})();
