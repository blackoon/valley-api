var RSUtils = (function() {
    return {
        getQueryParameterValue: function(param, defaultVal) {
            var length = param.length + 1;
            var val = window.location.search
                .substr(1)
                .split('&')
                .filter(function (queryPart) { return queryPart.substr(0, length) === param + '='; })
                [0];

            return val ? val.substr(length) : defaultVal;
        }
    }
}());