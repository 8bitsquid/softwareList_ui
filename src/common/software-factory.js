angular.module('ualib.softwareList')

    .factory('softwareFactory', ['$resource', function($resource){
        return $resource('//wwwdev2.lib.ua.edu/softwareList/api/:software', {software: 'all'}, {
            get: {
                method: 'GET',
                cache: true
            }
        });
    }]);