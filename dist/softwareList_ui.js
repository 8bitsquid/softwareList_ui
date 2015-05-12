angular.module('ualib.softwareList', [
    'ngRoute',
    'ngResource'
]);;angular.module('ualib.softwareList')

    .factory('softwareFactory', ['$resource', function($resource){
        return $resource('https://wwwdev2.lib.ua.edu/softwareList/api/:software');
    }]);;angular.module('ualib.softwareList')

    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/software', {
                resolve: {
                    software: function(softwareFactory){
                        return softwareFactory.get({software: all}, function(data){
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
                    }
                },
                templateUrl: 'software-list/software-list.tpl.html'
            });
    }])

    .controller('SoftwareListCtrl', ['software', function(software){

    }]);;angular.module('softwareList_ui.templates', ['software-list/software-list.tpl.html']);

angular.module("software-list/software-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("software-list/software-list.tpl.html",
    "<div class=\"row\">\n" +
    "    <div class=\"col-md-3 col-md-push-9\">\n" +
    "        <form>\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"text\" class=\"form-control\" placeholder=\"Search software, locations, more...\">\n" +
    "            </div>\n" +
    "        </form>\n" +
    "        <form>\n" +
    "            <div class=\"radio\" ng-repeat=\"loc in software.locations\">\n" +
    "                <label>\n" +
    "                    <input type=\"radio\" ng-value=\"loc\" ng-model=\"location\">\n" +
    "                    {{loc.name}}\n" +
    "                </label>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "        <form>\n" +
    "            <div class=\"radio\" ng-repeat=\"cat in software.categories\">\n" +
    "                <label>\n" +
    "                    <input type=\"radio\" ng-value=\"cat\" ng-model=\"category\">\n" +
    "                    {{cat.name}}\n" +
    "                </label>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-9 col-md-pull-3\">\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);
