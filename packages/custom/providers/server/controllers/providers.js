'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Provider = mongoose.model('Provider'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function(Providers) {

    return {
        /**
         * Find provider by id
         */
        provider: function(req, res, next, id) {
            Provider.load(id, function(err, provider) {
                if (err) return next(err);
                if (!provider) return next(new Error('Failed to load provider ' + id));
                req.provider = provider;
                next();
            });
        },
        /**
         * Create an provider
         */
        create: function(req, res) {
            var provider = new Provider(req.body);
            provider.user = req.user;

            provider.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the provider'
                    });
                }

                Providers.events.publish({
                    action: 'created',
                    user: {
                        name: req.user.name
                    },
                    url: config.hostname + '/providers/' + provider._id,
                    name: provider.title
                });

                res.json(provider);
            });
        },
        /**
         * Update an provider
         */
        update: function(req, res) {
            var provider = req.provider;

            provider = _.extend(provider, req.body);


            provider.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the provider'
                    });
                }

                Providers.events.publish({
                    action: 'updated',
                    user: {
                        name: req.user.name
                    },
                    name: provider.title,
                    url: config.hostname + '/providers/' + provider._id
                });

                res.json(provider);
            });
        },
        /**
         * Delete an provider
         */
        destroy: function(req, res) {
            var provider = req.provider;


            provider.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the provider'
                    });
                }

                Providers.events.publish({
                    action: 'deleted',
                    user: {
                        name: req.user.name
                    },
                    name: provider.title
                });

                res.json(provider);
            });
        },
        /**
         * Show an provider
         */
        show: function(req, res) {

            Providers.events.publish({
                action: 'viewed',
                user: {
                    name: req.user.name
                },
                name: req.provider.title,
                url: config.hostname + '/providers/' + req.provider._id
            });

            res.json(req.provider);
        },
        /**
         * List of Providers
         */
        all: function(req, res) {
            var query = req.acl.query('Provider');

            query.find().sort('-created').populate('user', 'name username').exec(function(err, providers) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the providers'
                    });
                }

                res.json(providers)
            });

        }
    };
}