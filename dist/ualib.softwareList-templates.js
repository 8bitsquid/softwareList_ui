angular.module('ualib.softwareList.templates', ['software-list/software-list.tpl.html']);

angular.module("software-list/software-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("software-list/software-list.tpl.html",
    "<div class=\"page-header\"><h1>Libraries' Software List</h1></div>\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-md-3 col-md-push-9\">\n" +
    "        <form>\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"soft.search\" placeholder=\"Search software, locations, etc...\" ng-change=\"update()\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <div class=\"btn-group btn-group-justified\">\n" +
    "                    <label class=\"btn btn-default active\" ng-model=\"soft.os\" btn-radio=\"''\" ng-change=\"update()\" uncheckable>All</label>\n" +
    "                    <label class=\"btn btn-default\" ng-model=\"soft.os\" btn-radio=\"'1'\" ng-change=\"update()\" uncheckable><span class=\"fa fa-fw fa-windows\"></span></label>\n" +
    "                    <label class=\"btn btn-default\" ng-model=\"soft.os\" btn-radio=\"'2'\" ng-change=\"update()\" uncheckable><span class=\"fa fa-fw fa-apple\"></span></label>\n" +
    "                    <label class=\"btn btn-default\" ng-model=\"soft.os\" btn-radio=\"'3'\" ng-change=\"update()\" uncheckable><span class=\"fa fa-fw fa-linux\"></span></label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group hidden-xs\">\n" +
    "                <h5>Locations</h5>\n" +
    "                <div class=\"radio\">\n" +
    "                    <label>\n" +
    "                        <input type=\"radio\" value=\"\" ng-model=\"soft.loc\" ng-change=\"update()\" checked>\n" +
    "                        All Locations\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "                <div class=\"radio\" ng-repeat=\"loc in software.locations\">\n" +
    "                    <label>\n" +
    "                        <input type=\"radio\" value=\"{{loc.name}}\" ng-model=\"soft.loc\" ng-change=\"update()\">\n" +
    "                        {{loc.name}}\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group hidden-xs\">\n" +
    "                <h5>Categories</h5>\n" +
    "                <div class=\"radio\">\n" +
    "                    <label>\n" +
    "                        <input type=\"radio\" value=\"\" ng-model=\"soft.cat\" ng-change=\"update()\">\n" +
    "                        All categories\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "                <div class=\"radio\" ng-repeat=\"cat in software.categories\">\n" +
    "                    <label>\n" +
    "                        <input type=\"radio\" value=\"{{cat.name}}\" ng-model=\"soft.cat\" ng-change=\"update()\">\n" +
    "                        {{cat.name}}\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-9 col-md-pull-3 software-list-container\">\n" +
    "        <div class=\"text-center\">\n" +
    "            <pagination total-items=\"filteredSoft.length\" ng-model=\"soft.page\" max-size=\"10\" class=\"pagination-sm\" boundary-links=\"true\" items-per-page=\"soft.perPage\" ng-change=\"update()\" ng-if=\"filteredSoft.length > soft.perPage\"></pagination>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"media\" ng-repeat=\"item in filteredSoft = (software.software | filter:soft.cat | filter:soft.loc | filter:soft.search | filterBy:['os']:soft.os)\">\n" +
    "            <div class=\"media-left\">\n" +
    "                <img class=\"media-object\" ng-src=\"{{item.icon}}\" alt=\"{{item.title}}\" title=\"{{item.title}}\">\n" +
    "            </div>\n" +
    "            <div class=\"media-body\">\n" +
    "                <h4 class=\"media-heading\">\n" +
    "                    {{item.title}}\n" +
    "                    <small ng-repeat=\"ver in item.versions\" class=\"software-versions\"><span class=\"fa fa-{{ver.osName}} text-muted\"></span> {{ver.version}}</small>\n" +
    "                </h4>\n" +
    "\n" +
    "                <div class=\"details-context\">\n" +
    "                    <span ng-repeat=\"loc in item.locations\">{{loc.name}}</span>\n" +
    "                </div>\n" +
    "                <div>\n" +
    "                    {{item.description}}\n" +
    "                </div>\n" +
    "                <div class=\"details hidden-xs\">\n" +
    "                    <div class=\"software-links pull-left\">\n" +
    "                        <h5>Tutorials &amp; Guides</h5>\n" +
    "                        <ul>\n" +
    "                            <li ng-repeat=\"link in item.links\">\n" +
    "                                <a ng-href=\"{{link.url}}\">{{link.title}}</a>\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                    <div class=\"pull-left\">\n" +
    "                        <h5>Who can use it</h5>\n" +
    "                        <span ng-bind-html=\"item.details\"></span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"text-center\">\n" +
    "            <pagination total-items=\"filteredSoft.length\" ng-model=\"soft.page\" max-size=\"10\" class=\"pagination-sm\" boundary-links=\"true\" items-per-page=\"soft.perPage\" ng-change=\"update()\" ng-if=\"filteredSoft.length > soft.perPage\"></pagination>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
