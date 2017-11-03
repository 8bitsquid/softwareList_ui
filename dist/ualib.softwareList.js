angular.module('ualib.softwareList.templates', ['software-list/software-list.tpl.html']);

angular.module("software-list/software-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("software-list/software-list.tpl.html",
    "<div class=\"jumbotron-header\">\n" +
    "    <div class=\"jumbotron\">\n" +
    "        <div class=\"container\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <ol class=\"breadcrumb\" typeof=\"BreadcrumbList\" vocab=\"http://schema.org/\">\n" +
    "                        <li><a title=\"Go to The University of Alabama Libraries.\" href=\"/#/home\" class=\"home\">The University of Alabama Libraries</a></li>\n" +
    "                        <li><a title=\"Go to SoftwareList.\" href=\"/#/software\" class=\"post post-page\">Software List</a></li>\n" +
    "                    </ol>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <h1>University Libraries Software List</h1>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-3 col-md-push-9\">\n" +
    "            <form class=\"software-list-facets\">\n" +
    "                <div class=\"form-group\">\n" +
    "                <span class=\"page-header\">\n" +
    "                    <h2 class=\"h4\">Filter Software List By</h2>\n" +
    "                </span>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "\n" +
    "                    <input type=\"text\" class=\"form-control\" ng-model=\"soft.search\" placeholder=\"Search software, locations, etc...\" aria-label=\"Search our software list\">\n" +
    "\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"btn-group btn-group-justified\">\n" +
    "                        <button class=\"btn btn-default active\" ng-model=\"soft.os\" btn-radio=\"''\" uncheckable>All</button>\n" +
    "                        <button class=\"btn btn-default\" ng-model=\"soft.os\" btn-radio=\"'1'\" uncheckable><span class=\"fa fa-fw fa-windows\"></span><span class=\"sr-only\">Windows</span></button>\n" +
    "                        <button class=\"btn btn-default\" ng-model=\"soft.os\" btn-radio=\"'2'\" uncheckable><span class=\"fa fa-fw fa-apple\"></span><span class=\"sr-only\">Mac</span></button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group hidden-xs\">\n" +
    "                    <h3 class=\"h5\">Locations</h3>\n" +
    "                    <div class=\"radio\">\n" +
    "                        <label>\n" +
    "                            <input type=\"radio\" value=\"\" ng-model=\"soft.loc\" checked>\n" +
    "                            All Locations\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                    <div class=\"radio\" ng-repeat=\"loc in locations\">\n" +
    "                        <label>\n" +
    "                            <input type=\"radio\" value=\"{{loc.name}}\" ng-model=\"soft.loc\">\n" +
    "                            {{loc.name}}\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group hidden-xs\">\n" +
    "                    <h3 class=\"h5\">Categories</h3>\n" +
    "                    <div class=\"radio\">\n" +
    "                        <label>\n" +
    "                            <input type=\"radio\" value=\"\" ng-model=\"soft.cat\">\n" +
    "                            All categories\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                    <div class=\"radio\" ng-repeat=\"cat in categories\">\n" +
    "                        <label>\n" +
    "                            <input type=\"radio\" value=\"{{cat.name}}\" ng-model=\"soft.cat\">\n" +
    "                            {{cat.name}}\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group hidden-xs\">\n" +
    "                    <button type=\"button\" class=\"btn btn-block btn-primary\" ng-click=\"resetFilters()\"><span class=\"fa fa-fw fa-refresh\"></span> Reset filters</button>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-9 col-md-pull-3 software-list-container\">\n" +
    "            <span class=\"h4 text-right\" ng-show=\"pager.totalItems > 0\">\n" +
    "                Showing {{pager.firstItem}}-{{pager.lastItem}} of {{pager.totalItems}} results\n" +
    "            </span>\n" +
    "\n" +
    "            <div ng-if=\"(soft.cat || soft.os || soft.loc)\">\n" +
    "\n" +
    "                <ol class=\"breadcrumb facetcrumb\">\n" +
    "                    <li ng-if=\"soft.os\"><strong>OS:</strong> <button type=\"button\" class=\"btn btn-default\" ng-click=\"soft.os = ''\">{{soft.os == 1 ? 'Windows' : 'OS X'}} <span class=\"text-muted\" aria-hidden=\"true\">&times;</span></button></li>\n" +
    "                    <li ng-if=\"soft.loc\"><strong>Location:</strong> <button type=\"button\" class=\"btn btn-default\" ng-click=\"soft.loc = ''\">{{soft.loc}} <span class=\"text-muted\" aria-hidden=\"true\">&times;</span></button></li>\n" +
    "                    <li ng-if=\"soft.cat\"><strong>Category:</strong> <button type=\"button\" class=\"btn btn-default\" ng-click=\"soft.cat = ''\">{{soft.cat}} <span class=\"text-muted\" aria-hidden=\"true\">&times;</span></button></li>\n" +
    "\n" +
    "                    <li class=\"pull-right\"><button type=\"button\" class=\"btn btn-primary btn-small reset-btn\" title=\"Reset filters\" ng-click=\"resetFilters()\"><i class=\"fa fa-refresh\"></i></button></li>\n" +
    "                </ol>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"media software-item animate-repeat\" ng-repeat=\"item in filteredSoft | after:(pager.page-1)*pager.perPage | limitTo:20\">\n" +
    "                <div class=\"media-left\">\n" +
    "                    <img class=\"media-object\" ng-src=\"{{item.icon}}\" alt=\"{{item.title}}\">\n" +
    "                </div>\n" +
    "                <div class=\"media-body\">\n" +
    "                    <h3 class=\"media-heading\" ng-bind-html=\"item.title | highlight:soft.search\">\n" +
    "                    </h3>\n" +
    "\n" +
    "                    <div ng-bind-html=\"item.description | highlight:soft.search\"></div>\n" +
    "\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"details-context col-md-6\" ng-repeat=\"ver in item.versions | orderBy:os\">\n" +
    "                            <div class=\"h4 text-muted\">\n" +
    "                                <span class=\"fa fa-{{ver.osName}}\"></span>\n" +
    "                                Version {{ver.version}}\n" +
    "                            </div>\n" +
    "                        <span ng-repeat=\"loc in ver.locations | orderBy:'name'\">\n" +
    "                            <!--<span ng-if=\"loc.parent\" ng-bind-html=\"(locations | filter:loc.parent)[0].name\"></span>-->\n" +
    "                            <span ng-bind-html=\"loc.name | highlight:soft.search | highlight:soft.loc:true\"></span>\n" +
    "                        </span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"details hidden-xs\">\n" +
    "                        <div class=\"software-links\">\n" +
    "                            <ul class=\"list-inline nav-justified\" style=\"margin-top: 5px;\">\n" +
    "                                <li ng-repeat=\"link in item.links\" ng-if=\"item.links\">\n" +
    "                                    <a ng-href=\"{{link.url}}\" target=\"{{link.title}}\" class=\"external-link\">{{link.title}}</a>\n" +
    "                                </li>\n" +
    "                                <li ng-if=\"item.modules\">\n" +
    "                                    <div collapse=\"!isCollapsed\" ng-bind-html=\"item.modules | highlight:soft.search\"></div>\n" +
    "                                    <button class=\"btn btn-default btn-xs\" ng-click=\"isCollapsed = !isCollapsed\">\n" +
    "                                        {{!isCollapsed ? \"Show\" : \"Hide\"}} Available Modules\n" +
    "                                    </button>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"text-center\">\n" +
    "                <pagination class=\"pagination-sm\" ng-model=\"pager.page\" total-items=\"pager.totalItems\" max-size=\"pager.maxSize\" boundary-links=\"true\" rotate=\"false\" items-per-page=\"pager.perPage\" ng-change=\"pageChange()\" ng-if=\"pager.totalItems > pager.perPage\"></pagination>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"alert alert-warning text-center\" role=\"alert\" ng-show=\"pager.totalItems < 1\">\n" +
    "                <h2>\n" +
    "                    No <span ng-if=\"soft.cat\"><strong>{{soft.cat | lowercase}}</strong></span> software is available\n" +
    "                    <span ng-if=\"soft.os\">on <strong>{{soft.os == 1 ? 'Windows' : 'OS X'}}</strong> computers</span>\n" +
    "                    <span ng-if=\"soft.loc\">in <strong>{{soft.loc}}</strong></span>\n" +
    "                    <span ng-if=\"soft.search\">that matches the search \"<strong>{{soft.search}}</strong>\"</span>\n" +
    "                </h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
;angular.module('ualib.softwareList', [
    'ngRoute',
    'ngResource',
    'ngSanitize',
    'ngAnimate',
    'angular.filter',
    'ui.bootstrap',
    'duScroll',
    'ualib.ui',
    'ualib.softwareList.templates'
]);;angular.module('ualib.softwareList')

    .factory('softwareFactory', ['$resource', function($resource){
        return $resource('//wwwdev2.lib.ua.edu/softwareList/api/:software', {software: 'all'}, {
            get: {
                method: 'GET',
                cache: true
            }
        });
    }]);;angular.module('ualib.softwareList')

    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/software', {
                reloadOnSearch: false,
                resolve: {
                    software: ['$filter', 'softwareFactory', function($filter, softwareFactory){
                        return softwareFactory.get({software: 'all'}, function(data){

                            for (var i = 0, len = data.software.length; i < len; i++){

                                // insert OS string names for easier ng-repeat filtering
                                var os = [];
                                for (var x = 0, l = data.software[i].versions.length; x < l; x++){
                                    os.push(data.software[i].versions[x].os);
                                    switch (data.software[i].versions[x].os){
                                        case '3':
                                            data.software[i].versions[x].osName = 'linux';
                                            break;
                                        case '2':
                                            data.software[i].versions[x].osName = 'apple';
                                            break;
                                        default:
                                            data.software[i].versions[x].osName = 'windows';
                                    }
                                }
                                data.software[i].os = os.join('');


                            }

                            return data;
                        }, function(data, status, headers, config) {
                            console.log('ERROR: software list');
                            console.log({
                                data: data,
                                status: status,
                                headers: headers,
                                config: config
                            });
                        });
                    }]
                },
                templateUrl: 'software-list/software-list.tpl.html',
                controller: 'SoftwareListCtrl'
            });
    }])

    .controller('SoftwareListCtrl', ['$scope', 'software', '$location', '$filter', '$document', function($scope, software, $location, $filter, $document){
        var softwareList = [];
        $scope.soft = {};
        var defaults = {
            os: '',
            search: '',
            cat: '',
            loc: ''
        };


        software.$promise.then(function(data){
            softwareList = data.software;
            $scope.resetFilters();

            $scope.categories = data.categories;
            $scope.locations = data.locations.filter(function(loc){
                return parseInt(loc.parent) === 0;
            });

            //Apply URI query params to scope
            var params = $location.search();
            for (var p in params){
                if ($scope.pager.hasOwnProperty(p)){
                    $scope.pager[p] = params[p];
                }
                if ($scope.soft.hasOwnProperty(p)){
                    $scope.soft[p] = params[p];
                }
            }

            //Scope watchers and listeners
            $scope.$on('$locationChangeSuccess', function(){
                processSoftwareList(softwareList);
            });

            $scope.$on('$destroy', function(){
                filterWatcher();
            });

            processSoftwareList(softwareList);
        });

        var filterWatcher = $scope.$watch('soft', function(newVal, oldVal){
            for (var filter in newVal){
                if (newVal[filter] !== ''){
                    $location.search(filter, newVal[filter]);
                }
                else{
                    $location.search(filter, null);
                }
            }
        }, true);


        $scope.update = function(){
            var q = {};
            angular.forEach(soft, function(val, key){
               if (angular.isDefined(val) && val !== ''){
                   q[key] = val;
               }
            });
            $location.search(q);
        };

        $scope.pageChange = function(){
            $location.search('page', $scope.pager.page);
            $document.duScrollTo(0, 30, 500, function (t) { return (--t)*t*t+1; });
        };

        $scope.resetFilters = function(){
            $scope.pager = {
                page: 1,
                perPage: 20,
                maxSize: 10,
                totalItems: 0
            };
            angular.copy(defaults, $scope.soft);
        };

        function processSoftwareList(softwareList){
            var filtered = softwareList;

            filtered = $filter('filter')(filtered, {categories: $scope.soft.cat});
            filtered = $filter('filter')(filtered, {versions: $scope.soft.loc});
            filtered = $filter('filter')(filtered, $scope.soft.search);
            filtered = $filter('filterBy')(filtered, ['os'], $scope.soft.os);

            $scope.filteredSoft = filtered;

            $scope.pager.totalItems = $scope.filteredSoft.length;
            $scope.pager.firstItem = (($scope.pager.page-1)*$scope.pager.perPage)+1;
            //$scope.pager.lastItem = $scope.pager.page*(($scope.pager.totalItems < $scope.pager.maxSize) ? $scope.pager.totalItems : $scope.pager.perPage);
            $scope.pager.lastItem = $scope.pager.totalItems < $scope.pager.perPage ?  $scope.pager.totalItems : ($scope.pager.page * $scope.pager.perPage);



            var numPages =  Math.floor($scope.pager.totalItems / $scope.pager.maxSize);
            if (numPages < $scope.pager.page){
                $scope.pager.page = numPages || 1;
            }
        }


    }]);