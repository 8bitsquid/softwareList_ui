angular.module('ualib.softwareList.templates', ['software-list/software-list.tpl.html']);

angular.module("software-list/software-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("software-list/software-list.tpl.html",
    "<div class=\"page-header\"><h1>Libraries' Software List</h1></div>\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-md-3 col-md-push-9\">\n" +
    "        <form>\n" +
    "            <div class=\"form-group\">\n" +
    "                <span class=\"page-header\">\n" +
    "                    <h4>Filter Software List By</h4>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"soft.search\" placeholder=\"Search software, locations, etc...\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <div class=\"btn-group btn-group-justified\">\n" +
    "                    <label class=\"btn btn-default active\" ng-model=\"soft.os\" btn-radio=\"''\" uncheckable>All</label>\n" +
    "                    <label class=\"btn btn-default\" ng-model=\"soft.os\" btn-radio=\"'1'\" uncheckable><span class=\"fa fa-fw fa-windows\"></span></label>\n" +
    "                    <label class=\"btn btn-default\" ng-model=\"soft.os\" btn-radio=\"'2'\" uncheckable><span class=\"fa fa-fw fa-apple\"></span></label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group hidden-xs\">\n" +
    "                <h5>Locations</h5>\n" +
    "                <div class=\"radio\">\n" +
    "                    <label>\n" +
    "                        <input type=\"radio\" value=\"\" ng-model=\"soft.loc\" checked>\n" +
    "                        All Locations\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "                <div class=\"radio\" ng-repeat=\"loc in locations\">\n" +
    "                    <label>\n" +
    "                        <input type=\"radio\" value=\"{{loc.name}}\" ng-model=\"soft.loc\">\n" +
    "                        {{loc.name}}\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group hidden-xs\">\n" +
    "                <h5>Categories</h5>\n" +
    "                <div class=\"radio\">\n" +
    "                    <label>\n" +
    "                        <input type=\"radio\" value=\"\" ng-model=\"soft.cat\">\n" +
    "                        All categories\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "                <div class=\"radio\" ng-repeat=\"cat in categories\">\n" +
    "                    <label>\n" +
    "                        <input type=\"radio\" value=\"{{cat.name}}\" ng-model=\"soft.cat\">\n" +
    "                        {{cat.name}}\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-9 col-md-pull-3 software-list-container\">\n" +
    "        <div class=\"text-right\" ng-show=\"pager.totalItems > 0\">\n" +
    "            Showing {{pager.firstItem}}-{{pager.lastItem}} of {{pager.totalItems}} results\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-if=\"(soft.cat || soft.os || soft.loc) && pager.totalItems > 0\">\n" +
    "\n" +
    "            <ol class=\"breadcrumb\">\n" +
    "                <li ng-if=\"soft.os\"><strong>OS:</strong> <button type=\"button\" class=\"btn btn-default\" ng-click=\"soft.os = ''\">{{soft.os == 1 ? 'Windows' : 'OS X'}} <span class=\"text-muted\" aria-hidden=\"true\">&times;</span></button></li>\n" +
    "                <li ng-if=\"soft.loc\"><strong>Location:</strong> <button type=\"button\" class=\"btn btn-default\" ng-click=\"soft.loc = ''\">{{soft.loc}} <span class=\"text-muted\" aria-hidden=\"true\">&times;</span></button></li>\n" +
    "                <li ng-if=\"soft.cat\"><strong>Category:</strong> <button type=\"button\" class=\"btn btn-default\" ng-click=\"soft.cat = ''\">{{soft.cat}} <span class=\"text-muted\" aria-hidden=\"true\">&times;</span></button></li>\n" +
    "\n" +
    "                <li class=\"pull-right\"><button type=\"button\" style=\"padding: 2px 6px;\" class=\"btn btn-primary btn-small\" title=\"Reset filters\" ng-click=\"resetFilters()\"><i class=\"fa fa-refresh\"></i></button></li>\n" +
    "            </ol>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"media software-item\" ng-repeat=\"item in filteredSoft | after:(pager.page-1)*pager.perPage | limitTo:20\">\n" +
    "            <div class=\"media-left\">\n" +
    "                <img class=\"media-object\" ng-src=\"{{item.icon}}\" alt=\"{{item.title}}\" title=\"{{item.title}}\">\n" +
    "            </div>\n" +
    "            <div class=\"media-body\">\n" +
    "                <h4 class=\"media-heading\" ng-bind-html=\"item.title | highlight:soft.search\">\n" +
    "\n" +
    "                    <!--<small ng-repeat=\"ver in item.versions | orderBy:ver.os\" class=\"software-versions\"><span class=\"fa fa-{{ver.osName}} text-muted\"></span></small>-->\n" +
    "                </h4>\n" +
    "\n" +
    "                <div ng-bind-html=\"item.description | highlight:soft.search\"></div>\n" +
    "\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"details-context col-md-6\" ng-repeat=\"ver in item.versions | orderBy:os\">\n" +
    "                        <div class=\"h4 text-muted\">\n" +
    "                            <span class=\"fa fa-{{ver.osName}}\"></span> {{ver.version}}\n" +
    "                        </div>\n" +
    "                        <span ng-repeat=\"loc in ver.locations\">\n" +
    "                            <span ng-if=\"loc.parent\" ng-bind-html=\"(locations | filter:loc.parent)[0].name | highlight:soft.search\"></span>\n" +
    "                            <span ng-bind-html=\"loc.name | highlight:soft.search\"></span>\n" +
    "                        </span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"details hidden-xs\">\n" +
    "                    <div class=\"software-links\" ng-if=\"item.links\">\n" +
    "                        <ul class=\"list-inline nav-justified\" style=\"margin-top: 5px;\">\n" +
    "                            <li ng-repeat=\"link in item.links\">\n" +
    "                                <a ng-href=\"{{link.url}}\">{{link.title}}</a>\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"text-center\">\n" +
    "            <pagination class=\"pagination-sm\" ng-model=\"pager.page\" total-items=\"pager.totalItems\" max-size=\"pager.maxSize\" boundary-links=\"true\" rotate=\"false\" items-per-page=\"pager.perPage\" ng-change=\"pageChange()\" ng-if=\"pager.totalItems > pager.perPage\"></pagination>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"alert alert-warning text-center\" role=\"alert\" ng-show=\"pager.totalItems < 1\">\n" +
    "            <h2>\n" +
    "                No <span ng-if=\"soft.cat\"><strong>{{soft.cat | lowercase}}</strong></span> software is available\n" +
    "                <span ng-if=\"soft.os\">on <strong>{{soft.os == 1 ? 'Windows' : 'OS X'}}</strong> computers</span>\n" +
    "                <span ng-if=\"soft.loc\">in <strong>{{soft.loc}}</strong></span>\n" +
    "                <span ng-if=\"soft.search\">that matches the search \"<strong>{{soft.search}}</strong>\"</span>\n" +
    "            </h2>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
