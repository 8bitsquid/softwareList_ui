angular.module('ualib.softwareList')

    .factory('softwareFactory', ['$resource', function($resource){
        return $resource('https://wwwdev2.lib.ua.edu/softwareList/api/:software');
    }]);