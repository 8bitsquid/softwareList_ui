angular.module('ualib.softwareList', [
    'ngRoute',
    'ngResource',
    'ngSanitize',
    'angular.filter',
    'ui.bootstrap',
    'ui.utils',
    'duScroll',
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

            processSoftwareList(data.software);
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

        //Scope watchers and listeners
        $scope.$on('$locationChangeSuccess', function(){
            processSoftwareList(softwareList);
        });

        $scope.$on('$destroy', function(){
            filterWatcher();
        });

        function processSoftwareList(softwareList){
            var filtered = softwareList;

            filtered = $filter('filter')(filtered, $scope.soft.cat);
            filtered = $filter('filter')(filtered, $scope.soft.loc);
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