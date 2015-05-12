angular.module('ualib.softwareList.templates', ['software-list/software-list.tpl.html']);

angular.module("software-list/software-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("software-list/software-list.tpl.html",
    "<div class=\"page-header\"><h1>Software</h1></div>\n" +
    "<pagination total-items=\"140\" ng-model=\"soft.page\" max-size=\"10\" class=\"pagination-sm\" boundary-links=\"true\" items-per-page=\"soft.perPage\" ng-change=\"pageChanged()\"></pagination>\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-md-3 col-md-push-9\">\n" +
    "        <form>\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"soft.search\" placeholder=\"Search software, locations, more...\" ng-change=\"pageChanged()\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <div class=\"btn-group btn-group-justified\">\n" +
    "                    <label class=\"btn btn-default active\" ng-model=\"soft.os\" btn-radio=\"''\" ng-change=\"pageChanged()\" uncheckable>All</label>\n" +
    "                    <label class=\"btn btn-default\" ng-model=\"soft.os\" btn-radio=\"1\" ng-change=\"pageChanged()\" uncheckable><span class=\"fa fa-fw fa-windows\"></span></label>\n" +
    "                    <label class=\"btn btn-default\" ng-model=\"soft.os\" btn-radio=\"2\" ng-change=\"pageChanged()\" uncheckable><span class=\"fa fa-fw fa-apple\"></span></label>\n" +
    "                    <label class=\"btn btn-default\" ng-model=\"soft.os\" btn-radio=\"3\" ng-change=\"pageChanged()\" uncheckable><span class=\"fa fa-fw fa-linux\"></span></label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <h5>Locations</h5>\n" +
    "                <div class=\"radio\">\n" +
    "                    <label>\n" +
    "                        <input type=\"radio\" value=\"\" ng-model=\"soft.loc\" ng-change=\"pageChanged()\" checked>\n" +
    "                        All Locations\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "                <div class=\"radio\" ng-repeat=\"loc in software.locations\">\n" +
    "                    <label>\n" +
    "                        <input type=\"radio\" value=\"{{loc.name}}\" ng-model=\"soft.loc\" ng-change=\"pageChanged()\">\n" +
    "                        {{loc.name}}\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <h5>Categories</h5>\n" +
    "                <div class=\"radio\">\n" +
    "                    <label>\n" +
    "                        <input type=\"radio\" value=\"\" ng-model=\"soft.cat\" ng-change=\"pageChanged()\">\n" +
    "                        All categories\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "                <div class=\"radio\" ng-repeat=\"cat in software.categories\">\n" +
    "                    <label>\n" +
    "                        <input type=\"radio\" value=\"{{cat.name}}\" ng-model=\"soft.cat\" ng-change=\"pageChanged()\">\n" +
    "                        {{cat.name}}\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-9 col-md-pull-3\">\n" +
    "        <div class=\"media\" ng-repeat=\"item in software.software | filter:soft.cat | filter:soft.loc | filter:soft.search | filterBy:['os']:soft.os\">\n" +
    "            <div class=\"media-left\">\n" +
    "                <a href=\"#\">\n" +
    "                    <img class=\"media-object\" ng-src=\"{{item.icon}}\" alt=\"{{item.title}}\" title=\"{{item.title}}\" style=\"width: 64px; height: 64px; min-width: 100% !important;\">\n" +
    "                </a>\n" +
    "            </div>\n" +
    "            <div class=\"media-body\">\n" +
    "                <h4 class=\"media-heading\">\n" +
    "                    {{item.title}}\n" +
    "                </h4>\n" +
    "                <span ng-repeat=\"ver in item.versions\" style=\"padding-left: 5px; color: #333;\"><span class=\"fa fa-{{ver.osName}} text-muted\"></span> {{ver.version}}</span>\n" +
    "                <div class=\"details-context\">\n" +
    "                    <span ng-repeat=\"loc in item.locations\">{{loc.name}}</span>\n" +
    "                </div>\n" +
    "                <div>\n" +
    "                    {{item.description}}\n" +
    "                </div>\n" +
    "                <div class=\"details-context\" style=\"color: #333;\">\n" +
    "                    <a ng-repeat=\"link in item.links\" ng-href=\"{{link.url}}\">{{link.title}}</a>\n" +
    "                </div>\n" +
    "                <span ng-bind-html=\"item.details\"></span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
