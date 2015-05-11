define(function(require, exports, module) {
    'use strict';

    // var $ = require('jquery');
    // var _ = require('underscore');
    var Backbone = require('backbone');
    var JST = require('templates');
    var app = require('app');
    var parsley = require('parsley');
    var parsley_remote = require('parsley_remote');
	var Module = app.module();

    /**
     * A-spot model
     *
     * @return {Object} extended Backbone A-spot model
     */
	Module.Models.Default = Backbone.Model.extend({

        registrate: function(data, onSuccess) {

            var self = this;
            $.ajax({
                url: "http://localhost:8080/customer/create/",
                type: "POST",
                contentType: "application/json",
                processData: false,
                data: data,
                success: onSuccess,
                error: function(){

                    console.log("error logging in");
                }

            });
        }
    });



    /**
     * A-spot collection
     *
     * @return {Object} extended Backbone A-spot collection
     */
	Module.Collections.Default = Backbone.Collection.extend({});



    /**
     * A-spot view
     *
     * @return {Object} extended Backbone A-spot view
     */
	Module.Views.Default = Backbone.View.extend({
		template: JST['app/scripts/templates/module.hbs'],

		el: '[data-module-type="module"]',

		model: new Module.Models.Default(),

        events: {
            'click #register': "validate"
        },

		initialize: function() {
			var self = this;


            _.bindAll(this, "showConfirmationMessage");


			self.render();
		},

		render: function() {
			var self = this;
			var html = self.template();

			self.$el.html(html);

            $('form').parsley()
                .addAsyncValidator('mycustom', function (xhr) {


                    return "true" === xhr.responseText;
                });
		},

        validate: function(){
            console.log('validating');
            var form = this.$el.find('#registrationForm');
            var formParsley = form.parsley({
                errorsWrapper: '<div class="parsley-errors-list"></div>',
                errorTemplate: '<div class="alert alert-danger"></div>',
                errorsContainer: function (ParsleyField) {
                    return ParsleyField.$element.parent().parent();
                },
                classHandler: function (ParsleyField) {
                    return ParsleyField.$element.parent();
                }
            });
            var self = this;
            formParsley.asyncValidate().done(function () {

                $('form').parsley().fields.forEach( function(field){
                    field._remoteCache = {};
                });
                var data = JSON.stringify({
                    "username" : form.find('#username').val(),
                    "email" : form.find('#email').val(),
                    "password_hash" : form.find('#passwordPrimary').val()
                });

                self.model.registrate(data, self.showConfirmationMessage);
            });
        },

        showConfirmationMessage: function(){

            this.$el.find('.text-center').css("display", "block");
        }
	});

	// *************************************************************************
	// initialize the module - gets called by app.js
	// *************************************************************************
	Module.initialize = function() {
		new Module.Views.Default();
	};

    return Module;
});
