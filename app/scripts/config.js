'use strict';

require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        handlebars: '../bower_components/handlebars/handlebars',
        parsley: '../bower_components/parsleyjs/dist/parsley',
        parsley_remote: '../bower_components/parsleyjs/dist/parsley.remote'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        parsley: {
            deps: ["jquery"],
            exports: "parsley"
        },
        parsleyRemote: {
            deps: ["jquery"],
            exports: "parsleyRemote"
        },
        handlebars: {
            exports: 'Handlebars'
        }
    }
});
