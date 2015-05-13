angular.module('ualib.softwareList', [
    'ngRoute',
    'ngResource',
    'ngSanitize',
    'angular.filter',
    'ui.bootstrap',
    'ualib.ui',
    'ualib.softwareList.templates'
]);;angular.module('ualib.softwareList')

    .factory('softwareFactory', ['$resource', function($resource){
        return $resource('https://wwwdev2.lib.ua.edu/softwareList/api/:software');
    }]);;angular.module('ualib.softwareList')

    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/software', {
                reloadOnSearch: false,
                resolve: {
                    software: function(softwareFactory){
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
                    }
                },
                templateUrl: 'software-list/software-list.tpl.html',
                controller: 'SoftwareListCtrl'
            });
    }])

    .controller('SoftwareListCtrl', ['$scope', 'software', '$location', function($scope, software, $location){
        var params = $location.search();
        var soft = $scope.soft = {};
        var defaults = {
            os: '',
            search: '',
            cat: '',
            loc: '',
            page: 1,
            perPage: 20
        };
        angular.copy(defaults, $scope.soft);
        angular.extend($scope.soft, params);

        $scope.software = software;


        $scope.update = function(){
            var q = {};
            angular.forEach(soft, function(val, key){
               if (angular.isDefined(val) && val !== ''){
                   q[key] = val;
               }
            });
            $location.search(q);
        };


    }]);