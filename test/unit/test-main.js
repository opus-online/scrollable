(function () {
    'use strict';

    var allTestFiles = [];
    var TEST_REGEXP = /Spec\.js$/;

    Object.keys(window.__karma__.files).forEach(function (file) {
        if (TEST_REGEXP.test(file)) {
            // Normalize paths to RequireJS module names.
            allTestFiles.push(file);
        }
    });

    var requirejsConfig = {
        baseUrl : '/base',
        paths : {
            'Scrollable' : 'src'
        },
        deps : allTestFiles,
        callback : window.__karma__.start
    };
    require.config(requirejsConfig);

})();