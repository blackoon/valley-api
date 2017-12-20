"use strict";

var powerbi;

!function(powerbi) {
    var visualHost;
    !function(visualHost) {
        var constants;
        !function(constants) {
            constants.RegistedredResourcePackageName = "RegisteredResources", constants.SharedResourcesPackageName = "SharedResources";
        }(constants = visualHost.constants || (visualHost.constants = {}));
    }(visualHost = powerbi.visualHost || (powerbi.visualHost = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualHost;
    !function(visualHost) {
        visualHost.resourceLoaderHttpTimeout = 1e4, visualHost.visualCDNBlobDevName = "dev", 
        visualHost.visualCDNBlobDefaultName = "prod", visualHost.visualCDNBlobAppStoreName = "app-store";
    }(visualHost = powerbi.visualHost || (powerbi.visualHost = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var constants;
    !function(constants) {
        constants.reloadEmptyVisuals = "reloadEmptyVisuals";
    }(constants = powerbi.constants || (powerbi.constants = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var contracts;
    !function(contracts) {
        var SharedResourcePackageNames;
        !function(SharedResourcePackageNames) {
            SharedResourcePackageNames.BaseTheme = "BaseTheme", SharedResourcePackageNames.Image = "Image", 
            SharedResourcePackageNames.ShapeMap = "ShapeMap";
        }(SharedResourcePackageNames = contracts.SharedResourcePackageNames || (contracts.SharedResourcePackageNames = {}));
    }(contracts = powerbi.contracts || (powerbi.contracts = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualHost;
    !function(visualHost) {
        function createApprovedResourceLoader(resourceLoaderConstructionOptions, approvedResourceService, telemetryService) {
            return new ApprovedResourceLoader(resourceLoaderConstructionOptions, approvedResourceService, telemetryService, function() {
                return !0;
            });
        }
        function createPhantomJsApprovedResourceLoader(resourceLoaderConstructionOptions, approvedResourceService, telemetryService) {
            var resourceFilter = function(approvedVisual) {
                return approvedVisual.phantomJSApproved;
            };
            return new ApprovedResourceLoader(resourceLoaderConstructionOptions, approvedResourceService, telemetryService, resourceFilter);
        }
        visualHost.createApprovedResourceLoader = createApprovedResourceLoader, visualHost.createPhantomJsApprovedResourceLoader = createPhantomJsApprovedResourceLoader;
        var ApprovedResourceLoader = function() {
            function ApprovedResourceLoader(resourceLoaderConstructionOptions, approvedResourceService, telemetryService, resourceFilter) {
                this.locale = resourceLoaderConstructionOptions && resourceLoaderConstructionOptions.locale, 
                this.promiseFactory = resourceLoaderConstructionOptions.promiseFactory, this.approvedResourceService = approvedResourceService, 
                this.customVisualEndpoints = this.initEndpoints(), this.telemetryService = telemetryService, 
                this.heartBeatPromises = [], this.resourceFilter = resourceFilter;
            }
            return ApprovedResourceLoader.prototype.loadTrustedResourcePackages = function(trustedResourcePackages) {
                return this.promiseFactory.reject();
            }, ApprovedResourceLoader.prototype.loadResourcePackages = function(resourcePackages) {
                for (var promises = [], _i = 0, resourcePackages_1 = resourcePackages; _i < resourcePackages_1.length; _i++) {
                    var resourcePackage = resourcePackages_1[_i];
                    promises.push(this.loadResourcePackage(resourcePackage));
                }
                return this.promiseFactory.all(promises);
            }, ApprovedResourceLoader.prototype.loadResourcePackage = function(resourcePackage) {
                var _this = this, logResourceFailure = function(url, error) {
                    _this.telemetryService.logEvent(powerbi.telemetry.ApprovedResourceFailLoaded, resourcePackage.name, url, _this.telemetryService.root.id, !0, powerbi.telemetry.ErrorSource.PowerBI, error);
                };
                return this.checkCustomVisualEndpointHeartBeat().catch(function(reason) {
                    return _this.promiseFactory.reject(reason);
                }).then(function(endpoint) {
                    var promises = [];
                    return _this.approvedResourceService.isApprovedResource(resourcePackage.name) ? (_this.approvedResourceService.hasApi(resourcePackage.name) ? promises.push(_this.loadResourcesWithVisualApi(endpoint, resourcePackage, logResourceFailure)) : promises = promises.concat(_this.loadResourcesWithoutVisualApi(endpoint, resourcePackage, logResourceFailure)), 
                    _this.promiseFactory.all(promises)) : _this.promiseFactory.reject("Visual is not an approved visual");
                });
            }, ApprovedResourceLoader.prototype.loadResourcePackageItem = function(resourcePackage, itemName) {
                return this.promiseFactory.reject();
            }, ApprovedResourceLoader.prototype.loadSharedResource = function(path) {
                return this.promiseFactory.reject();
            }, ApprovedResourceLoader.prototype.loadVisualPlugins = function(resourcePackages) {
                var promises = [];
                if (resourcePackages) for (var _i = 0, resourcePackages_2 = resourcePackages; _i < resourcePackages_2.length; _i++) {
                    var resourcePackage = resourcePackages_2[_i];
                    promises.push(this.loadVisualPlugin(resourcePackage));
                }
                return this.promiseFactory.all(promises);
            }, ApprovedResourceLoader.prototype.loadVisualPlugin = function(resourcePackage) {
                var deferred = this.promiseFactory.defer();
                return resourcePackage && resourcePackage.items && resourcePackage.items.length > 0 ? this.loadResourcePackage(resourcePackage).then(function() {
                    var plugin = powerbi.visuals.plugins[resourcePackage.name];
                    plugin ? (plugin.iconUrl = visualHost.resourceInjector.getInjectedIconUrl(resourcePackage.name), 
                    deferred.resolve(plugin)) : deferred.reject("Unable to load visual plugin from resource package: " + resourcePackage.name);
                }).catch(function() {
                    deferred.reject("failed to resolve all promises");
                }) : deferred.resolve(null), deferred.promise;
            }, ApprovedResourceLoader.prototype.destroy = function() {}, ApprovedResourceLoader.prototype.loadResourcesWithoutVisualApi = function(endpoint, resourcePackage, logResourceFailure) {
                var _this = this, promises = [], jsUrl = this.approvedResourceService.cdnUrlBuilder(endpoint, resourcePackage.name, ".js"), injectJsPromise = visualHost.resourceInjector.injectJsUrl(this.promiseFactory, resourcePackage.name, jsUrl);
                injectJsPromise.then(function() {
                    var plugin = powerbi.visuals.plugins[resourcePackage.name];
                    return plugin ? (powerbi.extensibility.visualPluginAdapter.transformPlugin(plugin), 
                    _this.promiseFactory.resolve(plugin)) : _this.promiseFactory.reject("Unable to load visual plugin from resource package: " + resourcePackage.name);
                }).catch(function(error) {
                    return logResourceFailure(jsUrl, error), _this.promiseFactory.reject(error);
                }), promises.push(injectJsPromise);
                var cssUrl = this.approvedResourceService.cdnUrlBuilder(endpoint, resourcePackage.name, ".css"), injectCssPromise = visualHost.resourceInjector.injectCssUrl(this.promiseFactory, resourcePackage.name, cssUrl);
                return injectCssPromise.catch(function(error) {
                    return logResourceFailure(cssUrl, error), _this.promiseFactory.reject(error);
                }), promises.push(injectCssPromise), promises;
            }, ApprovedResourceLoader.prototype.loadResourcesWithVisualApi = function(endpoint, resourcePackage, logResourceFailure) {
                var _this = this, jsonUrl = this.approvedResourceService.cdnUrlBuilder(endpoint, resourcePackage.name, visualHost.CustomVizJSONSuffix), deferred = this.promiseFactory.defer();
                return $.get(jsonUrl).done(function(response) {
                    var plugin = visualHost.visualPluginUtility.createVisualPlugin(response, _this.locale);
                    powerbi.extensibility.visualPluginAdapter.transformPlugin(plugin), powerbi.visuals.plugins[plugin.name] = plugin, 
                    deferred.resolve(null);
                }).fail(function(error) {
                    logResourceFailure(jsonUrl, error), deferred.reject(error);
                }), deferred.promise;
            }, ApprovedResourceLoader.prototype.initEndpoints = function() {
                var endpoints = powerbi.customVisualsUrl || ApprovedResourceLoader.defaultCustomVisualEndpoints;
                return endpoints.split(";");
            }, ApprovedResourceLoader.prototype.checkCustomVisualEndpointHeartBeat = function() {
                var deferred = this.promiseFactory.defer();
                return this.heartBeatPromises.push(deferred), ApprovedResourceLoader.customVisualEndpoint ? deferred.resolve(ApprovedResourceLoader.customVisualEndpoint) : 1 === this.heartBeatPromises.length && this.checkNextEndpoint(), 
                deferred.promise;
            }, ApprovedResourceLoader.prototype.checkNextEndpoint = function(endpointIndex) {
                var _this = this;
                endpointIndex = endpointIndex || 0;
                var endpoint = this.customVisualEndpoints[endpointIndex];
                this.approvedResourceService.getApprovedResources(endpoint).done(function(response) {
                    var approvedResources = _this.resourceFilter ? _.pick(response, _this.resourceFilter) : response;
                    _this.approvedResourceService.setApprovedResources(approvedResources), _this.telemetryService.logEvent(powerbi.telemetry.ApprovedResourceEndpointDown, endpoint, !1, _this.telemetryService.root.id, !1, powerbi.telemetry.ErrorSource.PowerBI), 
                    ApprovedResourceLoader.customVisualEndpoint = endpoint;
                    for (var promise; void 0 !== (promise = _this.heartBeatPromises.pop()); ) promise.resolve(endpoint);
                }).fail(function(response) {
                    var currentCount = endpointIndex + 1;
                    if (_this.telemetryService.logEvent(powerbi.telemetry.ApprovedResourceEndpointDown, _this.customVisualEndpoints[endpointIndex], currentCount === _this.customVisualEndpoints.length, _this.telemetryService.root.id, !0, powerbi.telemetry.ErrorSource.PowerBI, response.status, response.statusText), 
                    ++endpointIndex < _this.customVisualEndpoints.length) _this.checkNextEndpoint(endpointIndex); else for (var promise = void 0; void 0 !== (promise = _this.heartBeatPromises.pop()); ) promise.reject("All Custom Visual Endpoints Are Down");
                });
            }, ApprovedResourceLoader.defaultCustomVisualEndpoints = "https://visuals.azureedge.net/;https://visuals2.azureedge.net/;https://extendcustomvisual.blob.core.windows.net/", 
            ApprovedResourceLoader;
        }();
    }(visualHost = powerbi.visualHost || (powerbi.visualHost = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualHost;
    !function(visualHost) {
        function createApprovedResourceService(options) {
            return new ApprovedResourceService(options);
        }
        visualHost.createApprovedResourceService = createApprovedResourceService;
        var ApprovedResourceService = function() {
            function ApprovedResourceService(options) {
                this.options = options, this.trustedVisuals = [];
            }
            return ApprovedResourceService.prototype.isApprovedResource = function(guid) {
                return !!this.approvedVisuals && !!this.approvedVisuals[guid];
            }, ApprovedResourceService.prototype.isApprovedResourceForPhantomJs = function(guid) {
                return this.isApprovedResource(guid) && !!this.approvedVisuals[guid].phantomJSApproved;
            }, ApprovedResourceService.prototype.isTrustedResource = function(guid) {
                return !!_.find(this.trustedVisuals, function(visualGuid) {
                    return visualGuid === guid;
                });
            }, ApprovedResourceService.prototype.addTrustedVisual = function(guid) {
                this.isTrustedResource(guid) || this.trustedVisuals.push(guid);
            }, ApprovedResourceService.prototype.removeApprovedResource = function(guid) {
                this.approvedVisuals && (this.approvedVisuals[guid] = void 0);
            }, ApprovedResourceService.prototype.getCdnEnvEndpointName = function(endpoint) {
                var container = powerbi.visualCDNBlobContainerUrl || visualHost.visualCDNBlobDefaultName;
                return this.options && this.options.appStoreCdnOverride && this.options.appStoreCdnOverride() && (container = visualHost.visualCDNBlobAppStoreName), 
                endpoint + container;
            }, ApprovedResourceService.prototype.getApprovedResources = function(endpoint) {
                return $.ajax({
                    url: this.getCdnEnvEndpointName(endpoint) + "/approvedResources.json",
                    type: "GET",
                    timeout: visualHost.resourceLoaderHttpTimeout
                });
            }, ApprovedResourceService.prototype.cdnUrlBuilder = function(customVisualBaseUrl, resourcePackageName, extension) {
                return this.getCdnEnvEndpointName(customVisualBaseUrl) + "/" + resourcePackageName + extension;
            }, ApprovedResourceService.prototype.setApprovedResources = function(approvedVisuals) {
                this.approvedVisuals = approvedVisuals;
            }, ApprovedResourceService.prototype.getTrustedResources = function() {
                return this.trustedVisuals;
            }, ApprovedResourceService.prototype.getAllApprovedResources = function() {
                return this.approvedVisuals;
            }, ApprovedResourceService.prototype.hasApi = function(guid) {
                return !!this.approvedVisuals && !!this.approvedVisuals[guid] && !!this.approvedVisuals[guid].apiVersion;
            }, ApprovedResourceService.prototype.getTelemetryUsageLimit = function(guid) {
                return this.isApprovedResource(guid) ? this.approvedVisuals[guid].telemetryUsageLimit || 0 : 0;
            }, ApprovedResourceService.prototype.canRefreshHostData = function(guid) {
                return !!this.isApprovedResource(guid) && this.approvedVisuals[guid].canRefreshHostData;
            }, ApprovedResourceService;
        }();
    }(visualHost = powerbi.visualHost || (powerbi.visualHost = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualHost;
    !function(visualHost) {
        function createConditionalResourceLoader(promiseFactory, resourceLoaderInitOptions, resourceLoaderFactories, approvedResourceService) {
            return new ConditionalResourceLoader(promiseFactory, resourceLoaderInitOptions, resourceLoaderFactories, approvedResourceService);
        }
        visualHost.createConditionalResourceLoader = createConditionalResourceLoader;
        var ConditionalResourceLoader = function() {
            function ConditionalResourceLoader(promiseFactory, resourceLoaderInitOptions, resourceLoaderFactories, approvedResourceService) {
                this.promiseFactory = promiseFactory, this.resourceLoaderInitOptions = resourceLoaderInitOptions, 
                this.resourceLoaderFactories = resourceLoaderFactories, this.approvedResourceService = approvedResourceService, 
                this.resourceLoaderCollection = {};
            }
            return ConditionalResourceLoader.prototype.resourceLoaderSelector = function(resourcePackage) {
                switch (resourcePackage.type) {
                  case 0:
                    return this.getCustomVisualResourceLoader(resourcePackage);

                  case 1:
                    return this.getStaticResourceResourceLoader();
                }
            }, ConditionalResourceLoader.prototype.getStaticResourceResourceLoader = function() {
                return this.getLocalResourceLoader();
            }, ConditionalResourceLoader.prototype.getCustomVisualResourceLoader = function(resourcePackage) {
                if (this.approvedResourceService.isTrustedResource(resourcePackage.name)) {
                    if (this.getApprovedResourcesForTrustedVisualsEnabled()) return this.getTrustedResourceLoader();
                } else {
                    if (this.resourceLoaderInitOptions.getApprovedResourcesEnabled()) return this.getApprovedResourceLoader();
                    if (this.resourceLoaderInitOptions.getSandboxVisualsEnabled()) return this.getSandboxResourceLoader();
                }
                return this.getLocalResourceLoader();
            }, ConditionalResourceLoader.prototype.getApprovedResourcesForTrustedVisualsEnabled = function() {
                return this.resourceLoaderInitOptions.getApprovedResourcesEnabled() || powerbi.visualCDNBlobContainerUrl !== visualHost.visualCDNBlobDevName;
            }, ConditionalResourceLoader.prototype.getLocalResourceLoader = function() {
                return void 0 === this.resourceLoaderCollection.localResourceLoader && (this.resourceLoaderCollection.localResourceLoader = this.resourceLoaderFactories.localResourceLoaderFactory()), 
                this.resourceLoaderCollection.localResourceLoader;
            }, ConditionalResourceLoader.prototype.getSandboxResourceLoader = function() {
                return void 0 === this.resourceLoaderCollection.sandboxResourceLoader && (this.resourceLoaderCollection.sandboxResourceLoader = this.resourceLoaderFactories.sandboxResourceLoaderFactory()), 
                this.resourceLoaderCollection.sandboxResourceLoader;
            }, ConditionalResourceLoader.prototype.getApprovedResourceLoader = function() {
                return void 0 === this.resourceLoaderCollection.approvedResourceLoader && (this.resourceLoaderCollection.approvedResourceLoader = this.resourceLoaderFactories.approvedResourceLoaderFactory()), 
                this.resourceLoaderCollection.approvedResourceLoader;
            }, ConditionalResourceLoader.prototype.getTrustedResourceLoader = function() {
                return void 0 === this.resourceLoaderCollection.trustedResourceLoader && (this.resourceLoaderCollection.trustedResourceLoader = this.resourceLoaderFactories.trustedResourceLoaderFactory()), 
                this.resourceLoaderCollection.trustedResourceLoader;
            }, ConditionalResourceLoader.prototype.loadTrustedResourcePackages = function(trustedResourcePackages) {
                var promises = [];
                return promises.push(this.getTrustedResourceLoader().loadTrustedResourcePackages(trustedResourcePackages)), 
                this.promiseFactory.all(promises);
            }, ConditionalResourceLoader.prototype.loadResourcePackages = function(resourcePackages) {
                for (var promises = [], _i = 0, resourcePackages_3 = resourcePackages; _i < resourcePackages_3.length; _i++) {
                    var resourcePackage = resourcePackages_3[_i];
                    promises.push(this.resourceLoaderSelector(resourcePackage).loadResourcePackage(resourcePackage));
                }
                return this.promiseFactory.all(promises);
            }, ConditionalResourceLoader.prototype.loadResourcePackage = function(resourcePackage) {
                var _this = this, resourceLoader = this.resourceLoaderSelector(resourcePackage);
                return resourceLoader === this.resourceLoaderCollection.approvedResourceLoader ? resourceLoader.loadResourcePackage(resourcePackage).catch(function(reason) {
                    return _this.resourceLoaderInitOptions.getSandboxVisualsEnabled ? (_this.approvedResourceService.removeApprovedResource(resourcePackage.name), 
                    _this.getSandboxResourceLoader().loadResourcePackage(resourcePackage)) : _this.getLocalResourceLoader().loadResourcePackage(resourcePackage);
                }) : resourceLoader.loadResourcePackage(resourcePackage);
            }, ConditionalResourceLoader.prototype.loadVisualPlugin = function(resourcePackage) {
                return this.resourceLoaderSelector(resourcePackage).loadVisualPlugin(resourcePackage);
            }, ConditionalResourceLoader.prototype.loadVisualPlugins = function(resourcePackages) {
                for (var promises = [], _i = 0, resourcePackages_4 = resourcePackages; _i < resourcePackages_4.length; _i++) {
                    var resourcePackage = resourcePackages_4[_i];
                    promises.push(this.resourceLoaderSelector(resourcePackage).loadVisualPlugin(resourcePackage));
                }
                return this.promiseFactory.all(promises);
            }, ConditionalResourceLoader.prototype.loadResourcePackageItem = function(resourcePackage, itemName) {
                return this.resourceLoaderSelector(resourcePackage).loadResourcePackageItem(resourcePackage, itemName);
            }, ConditionalResourceLoader.prototype.loadSharedResource = function(path) {
                return this.getLocalResourceLoader().loadSharedResource(path);
            }, ConditionalResourceLoader.prototype.destroy = function() {
                var resourceLoaderCollection = this.resourceLoaderCollection;
                for (var resourceLoader in resourceLoaderCollection) resourceLoaderCollection.hasOwnProperty(resourceLoader) && resourceLoaderCollection[resourceLoader].destroy();
            }, ConditionalResourceLoader;
        }();
    }(visualHost = powerbi.visualHost || (powerbi.visualHost = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualHost;
    !function(visualHost) {
        function createTrustedResourceLoader(resourceLoaderConstructionOptions, approvedResourceService, resourcePackagesService, telemetryService) {
            return new TrustedResourceLoader(resourceLoaderConstructionOptions, approvedResourceService, resourcePackagesService, telemetryService);
        }
        visualHost.createTrustedResourceLoader = createTrustedResourceLoader, visualHost.CustomVizJSONSuffix = ".pbiviz.json";
        var TrustedResourceLoader = function() {
            function TrustedResourceLoader(resourceLoaderConstructionOptions, approvedResourceService, resourcePackagesService, telemetryService) {
                this.locale = resourceLoaderConstructionOptions && resourceLoaderConstructionOptions.locale, 
                this.promiseFactory = resourceLoaderConstructionOptions.promiseFactory, this.approvedResourceService = approvedResourceService, 
                this.resourcePackagesService = resourcePackagesService, this.customVisualEndpoints = this.initEndpoints(), 
                this.telemetryService = telemetryService, this.heartBeatPromises = [];
            }
            return TrustedResourceLoader.prototype.loadTrustedResourcePackages = function(trustedResourcePackages) {
                var promises = [];
                if (trustedResourcePackages && trustedResourcePackages.length > 0) for (var resourceId = 9999, _i = 0, trustedResourcePackages_1 = trustedResourcePackages; _i < trustedResourcePackages_1.length; _i++) {
                    var trustedVisual = trustedResourcePackages_1[_i];
                    if (powerbi.visuals.plugins[trustedVisual]) promises.push(this.promiseFactory.resolve([ powerbi.visuals.plugins[trustedVisual] ])); else {
                        var resourcePackage = {
                            id: resourceId++,
                            name: trustedVisual,
                            type: 0,
                            items: [ {
                                name: trustedVisual,
                                type: 5,
                                path: trustedVisual + visualHost.CustomVizJSONSuffix
                            } ]
                        };
                        this.resourcePackagesService.registerPackages([ resourcePackage ]), promises.push(this.loadResourcePackage(resourcePackage));
                    }
                }
                return this.promiseFactory.all(promises);
            }, TrustedResourceLoader.prototype.loadResourcePackages = function(resourcePackages) {
                for (var promises = [], _i = 0, resourcePackages_5 = resourcePackages; _i < resourcePackages_5.length; _i++) {
                    var resourcePackage = resourcePackages_5[_i];
                    promises.push(this.loadResourcePackage(resourcePackage));
                }
                return this.promiseFactory.all(promises);
            }, TrustedResourceLoader.prototype.loadResourcePackage = function(resourcePackage) {
                var _this = this, logResourceFailure = function(url, error) {
                    _this.telemetryService.logEvent(powerbi.telemetry.ApprovedResourceFailLoaded, resourcePackage.name, url, _this.telemetryService.root.id, !0, powerbi.telemetry.ErrorSource.PowerBI, error);
                };
                return this.checkCustomVisualEndpointHeartBeat().catch(function(reason) {
                    return _this.promiseFactory.reject(reason);
                }).then(function(endpoint) {
                    var promises = [];
                    if (resourcePackage && resourcePackage.items) for (var _loop_1 = function(item) {
                        if (5 === item.type) {
                            var jsonUrl_1 = _this.approvedResourceService.cdnUrlBuilder(endpoint, resourcePackage.name, visualHost.CustomVizJSONSuffix), getJsonPromise = _this.loadCustomVisualJson(resourcePackage.name, jsonUrl_1);
                            return getJsonPromise.catch(function(error) {
                                return logResourceFailure(jsonUrl_1, error), _this.promiseFactory.reject(error);
                            }), promises.push(getJsonPromise), "break";
                        }
                    }, _i = 0, _a = resourcePackage.items; _i < _a.length; _i++) {
                        var item = _a[_i], state_1 = _loop_1(item);
                        if ("break" === state_1) break;
                    }
                    return _this.promiseFactory.all(promises);
                });
            }, TrustedResourceLoader.prototype.loadResourcePackageItem = function(resourcePackage, itemName) {
                return this.promiseFactory.reject();
            }, TrustedResourceLoader.prototype.loadSharedResource = function(path) {
                return this.promiseFactory.reject();
            }, TrustedResourceLoader.prototype.loadVisualPlugins = function(resourcePackages) {
                return this.promiseFactory.reject();
            }, TrustedResourceLoader.prototype.loadVisualPlugin = function(resourcePackage) {
                return this.promiseFactory.reject();
            }, TrustedResourceLoader.prototype.destroy = function() {}, TrustedResourceLoader.prototype.loadCustomVisualJson = function(resourceName, jsonUrl) {
                var _this = this, deferred = this.promiseFactory.defer();
                return $.ajax({
                    url: jsonUrl,
                    type: "GET",
                    timeout: visualHost.resourceLoaderHttpTimeout
                }).done(function(json) {
                    var plugin = visualHost.visualPluginUtility.createVisualPlugin(json, _this.locale);
                    plugin.custom = !0, plugin.name === visualHost.EsriVisual && (plugin.custom = !1), 
                    powerbi.extensibility.visualPluginAdapter.transformPlugin(plugin), powerbi.visuals.plugins[plugin.name] = plugin, 
                    deferred.resolve(plugin);
                }).fail(function(error) {
                    _this.telemetryService.logEvent(powerbi.telemetry.ApprovedResourceFailLoaded, resourceName, jsonUrl, _this.telemetryService.root.id, !0, powerbi.telemetry.ErrorSource.PowerBI, error), 
                    deferred.reject(error);
                }), deferred.promise;
            }, TrustedResourceLoader.prototype.initEndpoints = function() {
                var endpoints = powerbi.customVisualsUrl || TrustedResourceLoader.defaultCustomVisualEndpoints;
                return endpoints.split(";");
            }, TrustedResourceLoader.prototype.checkCustomVisualEndpointHeartBeat = function() {
                function checkNextEndpoint() {
                    var endpoint = customVisualEndpoints[count];
                    $.ajax({
                        url: approvedResourceService.getCdnEnvEndpointName(endpoint) + "/ping",
                        type: "HEAD",
                        timeout: visualHost.resourceLoaderHttpTimeout
                    }).done(function() {
                        TrustedResourceLoader.customVisualEndpoint = endpoint;
                        for (var _i = 0, promises_1 = promises; _i < promises_1.length; _i++) {
                            var promise = promises_1[_i];
                            promise.resolve(endpoint);
                        }
                    }).fail(function() {
                        var currentCount = count + 1;
                        if (telemetryService.logEvent(powerbi.telemetry.ApprovedResourceEndpointDown, customVisualEndpoints[count], currentCount === customVisualEndpoints.length, telemetryService.root.id, !0, powerbi.telemetry.ErrorSource.PowerBI), 
                        ++count < customVisualEndpoints.length) checkNextEndpoint(); else for (var _i = 0, promises_2 = promises; _i < promises_2.length; _i++) {
                            var promise = promises_2[_i];
                            promise.reject("All Custom Visual Endpoints Are Down");
                        }
                    });
                }
                var count = 0, customVisualEndpoints = this.customVisualEndpoints, telemetryService = this.telemetryService, approvedResourceService = this.approvedResourceService, deferred = this.promiseFactory.defer();
                this.heartBeatPromises.push(deferred);
                var promises = this.heartBeatPromises;
                return TrustedResourceLoader.customVisualEndpoint ? deferred.resolve(TrustedResourceLoader.customVisualEndpoint) : 1 === this.heartBeatPromises.length && checkNextEndpoint(), 
                deferred.promise;
            }, TrustedResourceLoader.defaultCustomVisualEndpoints = "https://visuals.azureedge.net/;https://visuals2.azureedge.net/;https://extendcustomvisual.blob.core.windows.net/", 
            TrustedResourceLoader;
        }();
    }(visualHost = powerbi.visualHost || (powerbi.visualHost = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualHost;
    !function(visualHost) {
        function createResourceLoader(resourceLoaderConstructionOptions, provider, sharedResourceItemProxy) {
            return new LocalResourceLoader(resourceLoaderConstructionOptions, provider, sharedResourceItemProxy || new DefaultSharedResourceItemProxy(resourceLoaderConstructionOptions.promiseFactory));
        }
        visualHost.createResourceLoader = createResourceLoader;
        var DefaultSharedResourceItemProxy = function() {
            function DefaultSharedResourceItemProxy(promiseFactory) {
                this.promiseFactory = promiseFactory;
            }
            return DefaultSharedResourceItemProxy.prototype.get = function(resourcePackageId, name, path) {
                return this.promiseFactory.reject();
            }, DefaultSharedResourceItemProxy.prototype.getBlob = function(resourcePackageId, name, path) {
                return this.promiseFactory.reject();
            }, DefaultSharedResourceItemProxy;
        }(), LocalResourceLoader = function() {
            function LocalResourceLoader(resourceLoaderConstructionOptions, provider, sharedResourceItemProxy) {
                this.provider = provider, this.sharedResourceItemProxy = sharedResourceItemProxy, 
                this.promiseFactory = resourceLoaderConstructionOptions && resourceLoaderConstructionOptions.promiseFactory;
            }
            return LocalResourceLoader.prototype.loadTrustedResourcePackages = function(trustedResourcePackages) {
                return this.promiseFactory.reject();
            }, LocalResourceLoader.prototype.loadResourcePackages = function(resourcePackages) {
                for (var promises = [], _i = 0, resourcePackages_6 = resourcePackages; _i < resourcePackages_6.length; _i++) {
                    var resourcePackage = resourcePackages_6[_i];
                    promises.push(this.loadResourcePackage(resourcePackage));
                }
                return this.promiseFactory.all(promises);
            }, LocalResourceLoader.prototype.loadResourcePackage = function(resourcePackage) {
                var promises = [];
                if (resourcePackage && resourcePackage.items) for (var _i = 0, _a = resourcePackage.items; _i < _a.length; _i++) {
                    var item = _a[_i];
                    switch (item.type) {
                      case 0:
                        promises.push(this.loadCustomVisualJS(resourcePackage.id, resourcePackage.name, item));
                        break;

                      case 1:
                        promises.push(this.loadCustomVisualCss(resourcePackage.id, resourcePackage.name, item));
                        break;

                      case 5:
                        promises.push(this.loadCustomVisualMetadata(resourcePackage.id, resourcePackage.name, item));
                    }
                }
                return this.promiseFactory.all(promises);
            }, LocalResourceLoader.prototype.loadResourcePackageItem = function(resourcePackage, itemName) {
                var item = _.find(resourcePackage.items, function(item) {
                    return item.name === itemName;
                });
                return item ? item.content ? this.promiseFactory.resolve(item.content) : this.loadBlob(resourcePackage.id, resourcePackage.name, item) : this.promiseFactory.resolve(null);
            }, LocalResourceLoader.prototype.loadSharedResource = function(path) {
                return this.sharedResourceItemProxy.get(null, visualHost.constants.SharedResourcesPackageName, path);
            }, LocalResourceLoader.prototype.loadVisualPlugin = function(resourcePackage) {
                var _this = this, deferred = this.promiseFactory.defer();
                return resourcePackage && resourcePackage.items && resourcePackage.items.length > 0 ? this.loadResourcePackage(resourcePackage).then(function() {
                    var plugin = powerbi.visuals.plugins[resourcePackage.name];
                    plugin ? (plugin.iconUrl = _this.getIconUrl(resourcePackage), deferred.resolve(plugin)) : deferred.reject("Unable to load visual plugin from resource package");
                }).catch(function() {
                    deferred.reject("failed to resolve all promises");
                }) : deferred.resolve(null), deferred.promise;
            }, LocalResourceLoader.prototype.destroy = function() {}, LocalResourceLoader.prototype.loadVisualPlugins = function(resourcePackages) {
                var promises = [];
                if (resourcePackages) for (var _i = 0, resourcePackages_7 = resourcePackages; _i < resourcePackages_7.length; _i++) {
                    var resourcePackage = resourcePackages_7[_i];
                    promises.push(this.loadVisualPlugin(resourcePackage));
                }
                return this.promiseFactory.all(promises);
            }, LocalResourceLoader.prototype.getIconUrl = function(resourcePackage) {
                var selector = "#css-" + resourcePackage.name, styleNode = $(selector)[0], styleSheet = _.find(document.styleSheets, function(styleSheet) {
                    return styleSheet.ownerNode === styleNode;
                });
                if (!styleSheet) return "";
                for (var _i = 0, _a = styleSheet.cssRules; _i < _a.length; _i++) {
                    var rule = _a[_i], cssRule = rule;
                    if (cssRule.selectorText && cssRule.selectorText === ".visual-icon." + resourcePackage.name) return cssRule.style.backgroundImage;
                }
                return "";
            }, LocalResourceLoader.prototype.loadCustomVisualJS = function(resourcePackageId, name, item) {
                var deferred = this.promiseFactory.defer();
                return item.content ? (visualHost.resourceInjector.injectJsCode(name, item.content), 
                deferred.resolve(item.content)) : this.provider.get(resourcePackageId, name, item.path).then(function(result) {
                    visualHost.resourceInjector.injectJsCode(name, result), item.content = result;
                    var plugin = powerbi.visuals.plugins[name];
                    plugin ? (powerbi.extensibility.visualPluginAdapter.transformPlugin(plugin), deferred.resolve(result)) : deferred.reject("Unable to load visual plugin from resource package: " + name);
                }).catch(function(err) {
                    deferred.reject(err);
                }), deferred.promise;
            }, LocalResourceLoader.prototype.loadCustomVisualCss = function(resourcePackageId, name, item) {
                var deferred = this.promiseFactory.defer();
                return item.content ? (visualHost.resourceInjector.injectCssCode(name, item.content), 
                deferred.resolve(item.content)) : this.provider.get(resourcePackageId, name, item.path).then(function(result) {
                    visualHost.resourceInjector.injectCssCode(name, result), item.content = result, 
                    deferred.resolve(result);
                }).catch(function(err) {
                    deferred.reject(err);
                }), deferred.promise;
            }, LocalResourceLoader.prototype.loadCustomVisualMetadata = function(resourcePackageId, name, item) {
                var _this = this, deferred = this.promiseFactory.defer();
                try {
                    item.content ? deferred.resolve(this.createPlugin(name, item.content)) : this.provider.get(resourcePackageId, name, item.path).then(function(result) {
                        deferred.resolve(_this.createPlugin(name, result));
                    }).catch(function(err) {
                        deferred.reject(err);
                    });
                } catch (err) {
                    deferred.reject(err);
                }
                return deferred.promise;
            }, LocalResourceLoader.prototype.createPlugin = function(name, pbivizJsonString) {
                var pbivizJson = pbivizJsonString;
                "object" != typeof pbivizJsonString && (pbivizJson = JSON.parse(pbivizJsonString)), 
                visualHost.resourceInjector.injectJsCode(name, pbivizJson.content.js), visualHost.resourceInjector.injectCssCode(name, pbivizJson.content.css);
                var plugin = powerbi.visuals.plugins[name];
                return plugin.capabilities = pbivizJson.capabilities, plugin.iconUrl = 'url("' + pbivizJson.content.iconBase64 + '")', 
                plugin.apiVersion = pbivizJson.apiVersion, plugin.content = pbivizJson.content, 
                powerbi.extensibility.visualPluginAdapter.transformPlugin(plugin), plugin;
            }, LocalResourceLoader.prototype.loadBlob = function(resourcePackageId, name, item) {
                var deferred = this.promiseFactory.defer();
                return item.contentBlob ? deferred.resolve(item.contentBlob) : item.promise ? item.promise.then(function(result) {
                    return deferred.resolve(result);
                }) : (item.promise = this.provider.getBlob(resourcePackageId, name, item.path), 
                item.promise.then(function(result) {
                    item.contentBlob = result, deferred.resolve(result);
                }).catch(function(err) {
                    deferred.reject(err);
                }).finally(function() {
                    delete item.promise;
                })), deferred.promise;
            }, LocalResourceLoader;
        }();
    }(visualHost = powerbi.visualHost || (powerbi.visualHost = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualHost;
    !function(visualHost) {
        var LocalizationResourceUtility;
        !function(LocalizationResourceUtility) {
            function setLocalizedCapabilities(pbivizJson, locale) {
                var currentLocale = getLocale(locale), capabilities = pbivizJson.capabilities, localizedResources = pbivizJson && pbivizJson.stringResources && pbivizJson.stringResources[currentLocale];
                return capabilities && localizedResources && localizeDisplayNames(capabilities, localizedResources), 
                pbivizJson;
            }
            function localizeDisplayNames(capabilitiesDescriptors, localizedResources) {
                for (var objectName in capabilitiesDescriptors) if (capabilitiesDescriptors.hasOwnProperty(objectName)) if ("object" == typeof capabilitiesDescriptors[objectName]) localizeDisplayNames(capabilitiesDescriptors[objectName], localizedResources); else if ("displayNameKey" === objectName && capabilitiesDescriptors.displayName) {
                    var key = capabilitiesDescriptors.displayNameKey;
                    capabilitiesDescriptors.displayName = getDisplayNameLocalizedValue(localizedResources, key) || capabilitiesDescriptors.displayName;
                }
            }
            function getDisplayNameLocalizedValue(localizationResources, key) {
                return localizationResources[key];
            }
            function getLocale(currentLanguageLocale) {
                var loc = currentLanguageLocale, localeMapping = {
                    ar: "ar-SA",
                    bg: "bg-BG",
                    ca: "ca-ES",
                    cs: "cs-CZ",
                    da: "da-DK",
                    de: "de-DE",
                    el: "el-GR",
                    "en-US": "en-US",
                    es: "es-ES",
                    et: "et-EE",
                    eu: "eu-ES",
                    fi: "fi-FI",
                    fr: "fr-FR",
                    gl: "gl-ES",
                    he: "he-IL",
                    hi: "hi-IN",
                    hr: "hr-HR",
                    hu: "hu-HU",
                    id: "id-ID",
                    it: "it-IT",
                    ja: "ja-JP",
                    kk: "kk-KZ",
                    ko: "ko-KR",
                    lt: "lt-LT",
                    lv: "lv-LV",
                    ms: "ms-MY",
                    no: "nb-NO",
                    nl: "nl-NL",
                    pl: "pl-PL",
                    br: "pt-BR",
                    pt: "pt-PT",
                    ro: "ro-RO",
                    ru: "ru-RU",
                    sk: "sk-SK",
                    si: "sl-SI",
                    "sr-Cyrl": "sr-Cyrl-RS",
                    "sr-Latn": "sr-Latn-RS",
                    sv: "sv-SE",
                    th: "th-TH",
                    tr: "tr-TR",
                    uk: "uk-UA",
                    vi: "vi-VN",
                    "zh-Hans": "zh-CN",
                    "zh-Hant": "zh-TW"
                };
                return localeMapping[loc] || loc || navigator.language;
            }
            LocalizationResourceUtility.setLocalizedCapabilities = setLocalizedCapabilities, 
            LocalizationResourceUtility.getLocale = getLocale;
        }(LocalizationResourceUtility = visualHost.LocalizationResourceUtility || (visualHost.LocalizationResourceUtility = {}));
    }(visualHost = powerbi.visualHost || (powerbi.visualHost = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualHost;
    !function(visualHost) {
        var utils, Lazy = jsCommon.Lazy, plugins = powerbi.visuals.plugins;
        !function(utils) {
            function isCustomVisual(plugin, pluginName) {
                return plugin ? !!plugin.custom : !_.include(unsupportedVisuals, pluginName);
            }
            function isScriptVisual(plugin) {
                return plugin && plugin.capabilities && plugin.capabilities.dataViewMappings && !!powerbi.ScriptResultUtil.findScriptResultMapping(plugin.capabilities.dataViewMappings);
            }
            function isScriptVisualQueryable(featureSwitches) {
                return !(!featureSwitches || !featureSwitches.scriptVisualEnabled);
            }
            function shouldDisableVisual(type, mapDisabled) {
                return (type === powerbi.visuals.plugins.map.name || type === powerbi.visuals.plugins.filledMap.name) && mapDisabled;
            }
            function isLightWeightRenderingVisual(plugin) {
                if (!plugin) return !1;
                var map = lightWeightRenderingVisuals.getValue();
                return !!map[plugin.name];
            }
            var unsupportedVisuals = [ "play", "subview", "smallMultiple" ], lightWeightRenderingVisuals = new Lazy(function() {
                return _a = {}, _a[plugins.card.name] = !0, _a[plugins.gauge.name] = !0, _a[plugins.image.name] = !0, 
                _a[plugins.kpi.name] = !0, _a[plugins.textbox.name] = !0, _a;
                var _a;
            });
            utils.isCustomVisual = isCustomVisual, utils.isScriptVisual = isScriptVisual, utils.isScriptVisualQueryable = isScriptVisualQueryable, 
            utils.shouldDisableVisual = shouldDisableVisual, utils.isLightWeightRenderingVisual = isLightWeightRenderingVisual;
        }(utils = visualHost.utils || (visualHost.utils = {}));
        var visualPluginServiceHelpers;
        !function(visualPluginServiceHelpers) {
            function getPluginCopy(basePlugin, create, modifyPluginFn) {
                var visualPlugin = powerbi.Prototype.inherit(basePlugin);
                return visualPlugin.create = create, modifyPluginFn && modifyPluginFn(visualPlugin), 
                visualPlugin;
            }
            function getPluginCopyWithFeatureSwitches(basePlugin, create, featureSwitches) {
                return getPluginCopy(basePlugin, create, function(plugin) {
                    return applyFeatureSwitches(plugin, featureSwitches);
                });
            }
            function applyFeatureSwitches(plugin, featureSwitches) {
                if (featureSwitches) {
                    var binnedLineSampling = featureSwitches.binnedLineSampling;
                    switch (plugin.name) {
                      case plugins.scatterChart.name:
                        plugin.capabilities = powerbi.visuals.getScatterChartCapabilities(featureSwitches.scatterWithMatrixDV, featureSwitches.overlappingPointsSampling);
                        break;

                      case plugins.areaChart.name:
                        plugin.capabilities = powerbi.visuals.getLineChartCapabilities(!1, !0, binnedLineSampling);
                        break;

                      case plugins.lineChart.name:
                        plugin.capabilities = powerbi.visuals.getLineChartCapabilities(!1, !1, binnedLineSampling);
                        break;

                      case plugins.stackedAreaChart.name:
                        plugin.capabilities = powerbi.visuals.getLineChartCapabilities(!0, !0, binnedLineSampling);
                        break;

                      case plugins.waterfallChart.name:
                        featureSwitches && featureSwitches.waterfallBreakdown && (plugin.capabilities = powerbi.visuals.getWaterfallChartCapabilities(!0));
                    }
                }
            }
            function getPluginIconUrl(pluginName) {
                var selector = "#css-" + pluginName, styleNode = $(selector)[0], styleSheet = _.find(document.styleSheets, function(styleSheet) {
                    return styleSheet.ownerNode === styleNode;
                });
                if (styleSheet && styleSheet.cssRules) for (var _i = 0, _a = styleSheet.cssRules; _i < _a.length; _i++) {
                    var cssRule = _a[_i];
                    if (cssRule.selectorText && cssRule.selectorText === ".visual-icon." + pluginName) return cssRule.style.backgroundImage;
                }
                return "";
            }
            function ensurePlugin(pluginName, pluginService, moduleLoader, promiseFactory) {
                var plugin = pluginService.getPlugin(pluginName);
                return plugin && plugin.module ? moduleLoader.require(plugin.module).then(function() {
                    return plugin;
                }, function() {
                    return null;
                }) : promiseFactory.resolve(plugin);
            }
            visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches = getPluginCopyWithFeatureSwitches, 
            visualPluginServiceHelpers.applyFeatureSwitches = applyFeatureSwitches, visualPluginServiceHelpers.getPluginIconUrl = getPluginIconUrl, 
            visualPluginServiceHelpers.ensurePlugin = ensurePlugin;
            var VisualPluginStorage = function() {
                function VisualPluginStorage() {
                    this.visualPlugins = {}, this.loadedVisualPlugins = {};
                }
                return VisualPluginStorage.prototype.getLoadedPlugins = function() {
                    return _.map(this.loadedVisualPlugins, function(plugin) {
                        return plugin;
                    });
                }, VisualPluginStorage.prototype.getLoadedPlugin = function(pluginName) {
                    return this.loadedVisualPlugins[pluginName];
                }, VisualPluginStorage.prototype.hasPlugin = function(pluginName) {
                    return !!this.visualPlugins[pluginName];
                }, VisualPluginStorage.prototype.loadPlugin = function(pluginName, plugin) {
                    plugin && (this.visualPlugins[pluginName] = plugin), this.loadedVisualPlugins[pluginName] = this.visualPlugins[pluginName];
                }, VisualPluginStorage.prototype.unloadPlugin = function(pluginName) {
                    delete this.loadedVisualPlugins[pluginName];
                }, VisualPluginStorage;
            }();
            visualPluginServiceHelpers.VisualPluginStorage = VisualPluginStorage, function(VisualPluginStorage) {
                function ensurePlugin(storage, promiseFactory, resourceLoader, resourcePackage, forceLoadResources, telemetryService) {
                    var deferred = promiseFactory.defer();
                    if (!forceLoadResources && storage.hasPlugin(resourcePackage.name)) storage.loadPlugin(resourcePackage.name), 
                    deferred.resolve(null); else if (!forceLoadResources && powerbi.visuals.plugins[resourcePackage.name]) storage.loadPlugin(resourcePackage.name, powerbi.visuals.plugins[resourcePackage.name]), 
                    deferred.resolve(null); else if (_.isEmpty(resourcePackage.items)) deferred.reject("Resource package does not contain any items"); else {
                        var event_1;
                        telemetryService && (event_1 = telemetryService.startEvent(powerbi.telemetry.ApproveResourceLoadResourcePackage, resourcePackage.name)), 
                        resourceLoader.loadResourcePackage(resourcePackage).catch(function(reason) {}).finally(function() {
                            var plugin = powerbi.visuals.plugins[resourcePackage.name];
                            plugin ? (plugin.iconUrl || (plugin.iconUrl = visualHost.visualPluginServiceHelpers.getPluginIconUrl(resourcePackage.name)), 
                            storage.loadPlugin(plugin.name, plugin), deferred.resolve(null), event_1 && event_1.resolve()) : (deferred.reject("Unable to load visual plugin from resource package"), 
                            event_1 && event_1.reject());
                        });
                    }
                    return deferred.promise;
                }
                function ensureTrustedVisualPlugins(storage, plugins) {
                    for (var _i = 0, plugins_1 = plugins; _i < plugins_1.length; _i++) {
                        var plugin = plugins_1[_i];
                        storage.loadPlugin(plugin.name, plugin);
                    }
                }
                VisualPluginStorage.ensurePlugin = ensurePlugin, VisualPluginStorage.ensureTrustedVisualPlugins = ensureTrustedVisualPlugins;
            }(VisualPluginStorage = visualPluginServiceHelpers.VisualPluginStorage || (visualPluginServiceHelpers.VisualPluginStorage = {}));
        }(visualPluginServiceHelpers = visualHost.visualPluginServiceHelpers || (visualHost.visualPluginServiceHelpers = {}));
    }(visualHost = powerbi.visualHost || (powerbi.visualHost = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualHost;
    !function(visualHost) {
        function createMobileVisualPluginService(promiseFactory, resourceLoader, smallViewPortProperties, getFeatureSwitches) {
            return new MobileVisualPluginService(promiseFactory, resourceLoader, smallViewPortProperties, getFeatureSwitches);
        }
        function getMobilePlugin(pluginName, featureSwitches, trimOrdinalDataOnOverflow, mapThrottleInterval, smallViewPortProperties) {
            var improvedMapLegend = featureSwitches && featureSwitches.improvedMapLegend, lineMarkersEnabled = featureSwitches && featureSwitches.lineMarkersEnabled, lineStylesEnabled = featureSwitches && featureSwitches.lineStylesEnabled, touchScreenOptimizedTooltips = featureSwitches && featureSwitches.touchScreenOptimizedTooltips;
            switch (pluginName) {
              case powerbi.visuals.plugins.areaChart.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.areaChart, function(options) {
                    var cartesianModule = options.module;
                    return cartesianModule.createCartesianChart({
                        chartType: 1,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow,
                        lineMarkersEnabled: lineMarkersEnabled,
                        lineStylesEnabled: lineStylesEnabled,
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.barChart.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.barChart, function(options) {
                    var cartesianModule = options.module;
                    return cartesianModule.createCartesianChart({
                        chartType: 6,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow,
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.clusteredBarChart.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.clusteredBarChart, function(options) {
                    var cartesianModule = options.module;
                    return cartesianModule.createCartesianChart({
                        chartType: 5,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow,
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.clusteredColumnChart.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.clusteredColumnChart, function(options) {
                    var cartesianModule = options.module;
                    return cartesianModule.createCartesianChart({
                        chartType: 3,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow,
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.columnChart.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.columnChart, function(options) {
                    var cartesianModule = options.module;
                    return cartesianModule.createCartesianChart({
                        chartType: 4,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow,
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.comboChart.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.comboChart, function(options) {
                    var cartesianModule = options.module;
                    return cartesianModule.createCartesianChart({
                        chartType: 11,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow,
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.dataDotChart.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.dataDotChart, function(options) {
                    var cartesianModule = options.module;
                    return cartesianModule.createCartesianChart({
                        chartType: 12,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow,
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.dataDotClusteredColumnComboChart.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.dataDotClusteredColumnComboChart, function(options) {
                    var cartesianModule = options.module;
                    return cartesianModule.createCartesianChart({
                        chartType: 16,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow,
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.dataDotStackedColumnComboChart.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.dataDotStackedColumnComboChart, function(options) {
                    var cartesianModule = options.module;
                    return cartesianModule.createCartesianChart({
                        chartType: 17,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow,
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.hundredPercentStackedBarChart.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.hundredPercentStackedBarChart, function(options) {
                    var cartesianModule = options.module;
                    return cartesianModule.createCartesianChart({
                        chartType: 7,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow,
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.hundredPercentStackedColumnChart.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.hundredPercentStackedColumnChart, function(options) {
                    var cartesianModule = options.module;
                    return cartesianModule.createCartesianChart({
                        chartType: 8,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow,
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.stackedAreaChart.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.stackedAreaChart, function(options) {
                    var cartesianModule = options.module;
                    return cartesianModule.createCartesianChart({
                        chartType: 2,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow,
                        lineMarkersEnabled: lineMarkersEnabled,
                        lineStylesEnabled: lineStylesEnabled,
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.waterfallChart.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.waterfallChart, function(options) {
                    var cartesianModule = options.module;
                    return cartesianModule.createCartesianChart({
                        chartType: 13,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow,
                        waterfallBreakdown: featureSwitches && featureSwitches.waterfallBreakdown,
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.realTimeLineChart.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.realTimeLineChart, function(options) {
                    var cartesianModule = options.module;
                    return cartesianModule.createCartesianChart({
                        chartType: 18,
                        animator: cartesianModule.createRealTimeLineChartAnimator(),
                        cartesianSmallViewPortProperties: smallViewPortProperties.cartesianSmallViewPortProperties,
                        legendSmallViewPortProperties: smallViewPortProperties.legendSmallViewPortProperties,
                        animateCategoryAxis: !0,
                        animateValueAxis: !0,
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.lineChart.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.lineChart, function(options) {
                    var cartesianModule = options.module;
                    return cartesianModule.createCartesianChart({
                        chartType: 0,
                        cartesianSmallViewPortProperties: smallViewPortProperties.cartesianSmallViewPortProperties,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow,
                        lineMarkersEnabled: lineMarkersEnabled,
                        lineStylesEnabled: lineStylesEnabled,
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.lineClusteredColumnComboChart.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.lineClusteredColumnComboChart, function(options) {
                    var cartesianModule = options.module;
                    return cartesianModule.createCartesianChart({
                        chartType: 14,
                        cartesianSmallViewPortProperties: smallViewPortProperties.cartesianSmallViewPortProperties,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow,
                        lineMarkersEnabled: lineMarkersEnabled,
                        lineStylesEnabled: lineStylesEnabled,
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.lineStackedColumnComboChart.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.lineStackedColumnComboChart, function(options) {
                    var cartesianModule = options.module;
                    return cartesianModule.createCartesianChart({
                        chartType: 15,
                        cartesianSmallViewPortProperties: smallViewPortProperties.cartesianSmallViewPortProperties,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow,
                        lineMarkersEnabled: lineMarkersEnabled,
                        lineStylesEnabled: lineStylesEnabled,
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.scatterChart.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.scatterChart, function(options) {
                    var cartesianModule = options.module;
                    return cartesianModule.createCartesianChart({
                        chartType: 10,
                        cartesianSmallViewPortProperties: smallViewPortProperties.cartesianSmallViewPortProperties,
                        scatterWithMatrixDV: featureSwitches && featureSwitches.scatterWithMatrixDV,
                        scatterWithDataVolume: featureSwitches && featureSwitches.scatterWithDataVolume,
                        behavior: cartesianModule.createCartesianChartBehavior([ cartesianModule.createScatterChartMobileBehavior() ]),
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.gauge.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.gauge, function(options) {
                    return options.module.createGauge({
                        gaugeSmallViewPortProperties: smallViewPortProperties.gaugeSmallViewPortProperties,
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.funnel.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.funnel, function() {
                    return new powerbi.visuals.FunnelChart({
                        animator: null,
                        funnelSmallViewPortProperties: smallViewPortProperties.funnelSmallViewPortProperties,
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.donutChart.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.donutChart, function() {
                    return new powerbi.visuals.DonutChart({
                        disableGeometricCulling: !0,
                        smallViewPortProperties: smallViewPortProperties.donutSmallViewPortProperties,
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.pieChart.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.pieChart, function() {
                    return new powerbi.visuals.DonutChart({
                        sliceWidthRatio: 0,
                        disableGeometricCulling: !0,
                        smallViewPortProperties: smallViewPortProperties.donutSmallViewPortProperties,
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.ribbonChart.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.ribbonChart, function(options) {
                    var cartesianModule = options.module;
                    return cartesianModule.createCartesianChart({
                        chartType: 9,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow,
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.matrix.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.matrix, function() {
                    return new powerbi.visuals.Matrix();
                }, featureSwitches);

              case powerbi.visuals.plugins.table.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.table, function() {
                    return new powerbi.visuals.Table();
                }, featureSwitches);

              case powerbi.visuals.plugins.pivotTable.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.pivotTable, function() {
                    return new powerbi.visuals.PivotTable(powerbi.visuals.PivotTableOptions.createMobileConstructorOptions());
                }, featureSwitches);

              case powerbi.visuals.plugins.tableEx.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.tableEx, function() {
                    return new powerbi.visuals.TableEx(powerbi.visuals.TableExOptions.createMobileConstructorOptions());
                }, featureSwitches);

              case powerbi.visuals.plugins.map.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.applyImprovedMapLegendMappings(powerbi.visuals.plugins.map, improvedMapLegend, !1), function() {
                    return new powerbi.visuals.Map({
                        viewChangeThrottleInterval: mapThrottleInterval,
                        enableCurrentLocation: !!featureSwitches && featureSwitches.mapCurrentLocationEnabled,
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.filledMap.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.applyImprovedMapLegendMappings(powerbi.visuals.plugins.filledMap, improvedMapLegend, !0), function() {
                    return new powerbi.visuals.Map({
                        filledMap: !0,
                        viewChangeThrottleInterval: mapThrottleInterval,
                        tooltipsEnabled: touchScreenOptimizedTooltips,
                        touchScreenOptimizedTooltipsEnabled: touchScreenOptimizedTooltips
                    });
                }, featureSwitches);

              case powerbi.visuals.plugins.textbox.name:
                return visualHost.visualPluginServiceHelpers.getPluginCopyWithFeatureSwitches(powerbi.visuals.plugins.textbox, function(options) {
                    var textboxModule = options.module;
                    return textboxModule.createTextbox({
                        viewModelAdapter: textboxModule.createAlwaysUseSmallViewportTextboxViewModelAdapter()
                    });
                }, featureSwitches);

              default:
                return powerbi.Prototype.inherit(powerbi.visuals.plugins[pluginName]);
            }
        }
        var VisualPluginStorage = visualHost.visualPluginServiceHelpers.VisualPluginStorage;
        visualHost.createMobileVisualPluginService = createMobileVisualPluginService;
        var MobileVisualPluginService = function() {
            function MobileVisualPluginService(promiseFactory, resourceLoader, smallViewPortProperties, getFeatureSwitches) {
                var _this = this;
                this.promiseFactory = promiseFactory, this.resourceLoader = resourceLoader;
                var properties = smallViewPortProperties || {
                    gaugeSmallViewPortProperties: {
                        hideGaugeSideNumbersOnSmallViewPort: !0,
                        smallGaugeMarginsOnSmallViewPort: !0,
                        MinHeightGaugeSideNumbersVisible: MobileVisualPluginService.MinHeightGaugeSideNumbersVisible,
                        GaugeMarginsOnSmallViewPort: MobileVisualPluginService.GaugeMarginsOnSmallViewPort
                    },
                    funnelSmallViewPortProperties: {
                        hideFunnelCategoryLabelsOnSmallViewPort: !0,
                        minHeightFunnelCategoryLabelsVisible: MobileVisualPluginService.MinHeightFunnelCategoryLabelsVisible
                    },
                    donutSmallViewPortProperties: {
                        maxHeightToScaleDonutLegend: MobileVisualPluginService.MaxHeightToScaleDonutLegend
                    },
                    cardSmallViewportProperties: null
                };
                powerbi.visuals.TooltipManager.ShowTooltips = !1;
                var trimOrdinalDataOnOverflow = !1, mapThrottleInterval = this.getMapThrottleInterval();
                if (this.storage = new VisualPluginStorage(), getFeatureSwitches) this.initBuiltInPlugins = getFeatureSwitches().then(function(featureSwitches) {
                    _this.featureSwitches = featureSwitches;
                    for (var pluginName in powerbi.visuals.plugins) _this.storage.loadPlugin(pluginName, getMobilePlugin(pluginName, featureSwitches, trimOrdinalDataOnOverflow, mapThrottleInterval, properties));
                    powerbi.visuals.TooltipManager.ShowTooltips = _this.featureSwitches && _this.featureSwitches.touchScreenOptimizedTooltips, 
                    powerbi.visuals.TooltipManager.ShowTouchScreenOptimizedTooltips = _this.featureSwitches && _this.featureSwitches.touchScreenOptimizedTooltips;
                }); else {
                    for (var pluginName in powerbi.visuals.plugins) this.storage.loadPlugin(pluginName, getMobilePlugin(pluginName, void 0, trimOrdinalDataOnOverflow, mapThrottleInterval, properties));
                    this.initBuiltInPlugins = promiseFactory.resolve(null);
                }
            }
            return MobileVisualPluginService.prototype.getVisuals = function() {
                return this.storage.getLoadedPlugins();
            }, MobileVisualPluginService.prototype.getPlugin = function(pluginName) {
                return this.storage.getLoadedPlugin(pluginName);
            }, MobileVisualPluginService.prototype.capabilities = function(pluginName) {
                var plugin = this.getPlugin(pluginName);
                return plugin ? plugin.capabilities : void 0;
            }, MobileVisualPluginService.prototype.ensureBuiltInPlugins = function() {
                return this.initBuiltInPlugins;
            }, MobileVisualPluginService.prototype.ensurePlugins = function(resourcePackages) {
                var promises = [];
                if (resourcePackages && resourcePackages.length) for (var _i = 0, resourcePackages_8 = resourcePackages; _i < resourcePackages_8.length; _i++) {
                    var resourcePackage = resourcePackages_8[_i];
                    0 === resourcePackage.type && promises.push(this.ensurePlugin(resourcePackage));
                }
                return this.promiseFactory.allSettled(promises);
            }, MobileVisualPluginService.prototype.ensurePlugin = function(resourcePackage) {
                return VisualPluginStorage.ensurePlugin(this.storage, this.promiseFactory, this.resourceLoader, resourcePackage);
            }, MobileVisualPluginService.prototype.ensureTrustedVisualPlugins = function(plugins) {
                VisualPluginStorage.ensureTrustedVisualPlugins(this.storage, plugins);
            }, MobileVisualPluginService.prototype.requireSandbox = function(plugin) {
                return visualHost.utils.isCustomVisual(plugin);
            }, MobileVisualPluginService.prototype.isCustomVisual = function(pluginName) {
                return visualHost.utils.isCustomVisual(this.getPlugin(pluginName), pluginName);
            }, MobileVisualPluginService.prototype.isScriptVisual = function(pluginName) {
                return visualHost.utils.isScriptVisual(this.getPlugin(pluginName));
            }, MobileVisualPluginService.prototype.isScriptVisualQueryable = function() {
                return visualHost.utils.isScriptVisualQueryable(this.featureSwitches);
            }, MobileVisualPluginService.prototype.isLightWeightRenderingVisual = function(pluginName) {
                return visualHost.utils.isLightWeightRenderingVisual(this.getPlugin(pluginName));
            }, MobileVisualPluginService.prototype.getMapThrottleInterval = function() {
                var windowsPhoneThrottleInterval = 100, userAgentLowerCase = navigator.userAgent.toLowerCase();
                if (userAgentLowerCase.indexOf("windows phone") !== -1) return windowsPhoneThrottleInterval;
            }, MobileVisualPluginService.prototype.getInteractivityOptions = function(visualType) {
                var mobileOptions = {
                    overflow: this.getMobileOverflowString(visualType),
                    isInteractiveLegend: this.isChartSupportInteractivity(visualType),
                    selection: !0,
                    isVisualInteractive: !0
                };
                return mobileOptions;
            }, MobileVisualPluginService.prototype.getTelemetryHostInformation = function() {
                return {
                    name: "MobileTileHost"
                };
            }, MobileVisualPluginService.prototype.getMobileOverflowString = function(visualType) {
                switch (visualType) {
                  case "multiRowCard":
                    return "visible";

                  default:
                    return "hidden";
                }
            }, MobileVisualPluginService.prototype.isChartSupportInteractivity = function(visualType) {
                switch (visualType) {
                  case "areaChart":
                  case "barChart":
                  case "clusteredBarChart":
                  case "clusteredColumnChart":
                  case "columnChart":
                  case "donutChart":
                  case "hundredPercentStackedBarChart":
                  case "hundredPercentStackedColumnChart":
                  case "lineChart":
                  case "pieChart":
                  case "scatterChart":
                  case "table":
                  case "matrix":
                  case "multiRowCard":
                    return !0;

                  default:
                    return !1;
                }
            }, MobileVisualPluginService.prototype.getStorage = function() {
                return this.storage;
            }, MobileVisualPluginService.MinHeightGaugeSideNumbersVisible = 80, MobileVisualPluginService.GaugeMarginsOnSmallViewPort = 10, 
            MobileVisualPluginService.MinHeightFunnelCategoryLabelsVisible = 80, MobileVisualPluginService.MaxHeightToScaleDonutLegend = 300, 
            MobileVisualPluginService;
        }();
    }(visualHost = powerbi.visualHost || (powerbi.visualHost = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualHost;
    !function(visualHost) {
        var resourceInjector;
        !function(resourceInjector) {
            function injectJsCode(scriptName, scriptContent, isolate) {
                void 0 === isolate && (isolate = !1);
                var script = document.createElement("script");
                script.innerHTML = isolate ? createVisualIsolationClosure(scriptContent) : scriptContent, 
                script.id = "js-" + scriptName, script.setAttribute("name", scriptName), document.body.appendChild(script);
            }
            function injectCssCode(stylesheetName, stylesheetContent) {
                var style = $("<style/>", {
                    html: stylesheetContent,
                    id: "css-" + stylesheetName
                });
                style.attr("name", stylesheetName), $("head").append(style);
            }
            function injectJsUrl(promiseFactory, scriptName, scriptUrl) {
                var deferred = promiseFactory.defer();
                return $.ajax({
                    url: scriptUrl,
                    dataType: "script",
                    cache: !0,
                    success: function() {
                        return deferred.resolve(null);
                    },
                    error: function(jqxhr, textStatus, exception) {
                        return deferred.reject(exception);
                    },
                    timeout: visualHost.resourceLoaderHttpTimeout
                }), deferred.promise;
            }
            function injectCssUrl(promiseFactory, stylesheetName, stylesheetUrl) {
                var deferred = promiseFactory.defer(), httpTimeout = setTimeout(function() {
                    return deferred.reject("Timeout");
                }, visualHost.resourceLoaderHttpTimeout), node = $("<link>", {
                    id: "css-" + stylesheetName,
                    type: "text/css",
                    rel: "stylesheet",
                    href: stylesheetUrl,
                    crossorigin: "anonymous"
                }).on("load", function(event) {
                    clearTimeout(httpTimeout), deferred.resolve(null);
                }).on("error", function(err) {
                    clearTimeout(httpTimeout), deferred.reject(err);
                });
                return node.appendTo($("head")), deferred.promise;
            }
            function getInjectedIconUrl(resourcePackageName) {
                var selector = "#css-" + resourcePackageName, styleNode = $(selector)[0], styleSheet = _.find(document.styleSheets, function(styleSheet) {
                    return styleSheet.ownerNode === styleNode;
                });
                if (styleSheet && styleSheet.cssRules) for (var _i = 0, _a = styleSheet.cssRules; _i < _a.length; _i++) {
                    var cssRule = _a[_i];
                    if (cssRule.selectorText && _.contains(cssRule.selectorText, resourcePackageName)) return cssRule.style.backgroundImage;
                }
                return "";
            }
            function createVisualIsolationClosure(scriptContent) {
                return "\n                (function(powerbi) {\n                    var window = this;\n\n                    //These 2 lines are needed to trick lodash into using this as global scope\n                    var self = this;\n                    self.Object = Object;\n\n                    //de-reference powerbi loaded modules\n                    var $, jQuery, _;\n                    window.jQuery = window.$ = undefined;\n                    window._ = undefined;\n\n                    " + scriptContent + ";\n\n                    //overwrite global variables with window values for PowerBI libraries\n                    $ = jQuery = window.$;\n                    _ = window._\n                }).call(\n                    //generate isolated clone of window object\n                    (function(w) {\n                        var wKeys = Object.getOwnPropertyNames(w);\n                        var nextW = w;\n                        while ((nextW = Object.getPrototypeOf(nextW))) {\n                            wKeys = wKeys.concat(Object.getOwnPropertyNames(nextW));\n                        }\n                        var newWindow = Object.create(w);\n                        //rebuild some of the window properties so they work correctly\n                        for (var i = 0; i < wKeys.length; i++) {\n                            try {\n                                var key = wKeys[i];\n                                var item = w[key];\n                                //rebind native functions to proper window context\n                                if (typeof item === 'function') {\n                                    if ((/\\{\\s*\\[native code\\]\\s*\\}/).test('' + Function.prototype.toString.call(item))) {\n                                        newWindow[key] = item.bind(w);\n                                        //remap prototype\n                                        newWindow[key].prototype = item.prototype;\n                                        //remap own properties\n                                        var fKeys = Object.getOwnPropertyNames(item);\n                                        for (var j = 0; j < fKeys.length; j++) {\n                                            var fKey = fKeys[j];\n                                            if(fKey === 'arguments' || fKey === 'caller') continue;\n                                            try {\n                                                newWindow[key][fKey] = item[fKey];\n                                            } catch (e) { /* catch protected function properties */} \n                                        }                                        \n                                    }\n                                //map getters to proper context (needed for firefox only)\n                                } else if (typeof item === 'object') {\n                                    Object.defineProperty(newWindow, key, {\n                                        get: (function(item) {\n                                            return function() {\n                                                return item;\n                                            }\n                                        })(item),\n                                        set: function() { }\n                                    });\n                                }\n                            } catch (e) { /* catch sandbox security exceptions */ }\n                        }\n                        return newWindow;\n                    })(window),\n                    powerbi || (powerbi = {})\n                );\n            ";
            }
            resourceInjector.injectJsCode = injectJsCode, resourceInjector.injectCssCode = injectCssCode, 
            resourceInjector.injectJsUrl = injectJsUrl, resourceInjector.injectCssUrl = injectCssUrl, 
            resourceInjector.getInjectedIconUrl = getInjectedIconUrl;
        }(resourceInjector = visualHost.resourceInjector || (visualHost.resourceInjector = {}));
    }(visualHost = powerbi.visualHost || (powerbi.visualHost = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualHost;
    !function(visualHost) {
        function createResourcePackagesService() {
            return new ResourcePackagesService();
        }
        visualHost.createResourcePackagesService = createResourcePackagesService;
        var ResourcePackagesService = function() {
            function ResourcePackagesService() {
                this.packages = {}, this.resourcePkgNameIdLookupTable = {};
            }
            return ResourcePackagesService.prototype.getAllPackages = function() {
                return _.toArray(this.packages);
            }, ResourcePackagesService.prototype.registerPackages = function(packages) {
                if (packages) for (var _i = 0, packages_1 = packages; _i < packages_1.length; _i++) {
                    var resourcePackage = packages_1[_i];
                    resourcePackage.items && 0 !== resourcePackage.items.length && (this.resourcePkgNameIdLookupTable[resourcePackage.id] = resourcePackage.name, 
                    this.packages[resourcePackage.name] ? resourcePackage.name === visualHost.constants.RegistedredResourcePackageName ? this.packages[resourcePackage.name] = ResourcePackagesService.mergeRegisteredResourcePackages(this.packages[resourcePackage.name], resourcePackage) : _.merge(this.packages[resourcePackage.name], resourcePackage) : this.packages[resourcePackage.name] = resourcePackage);
                }
            }, ResourcePackagesService.mergeRegisteredResourcePackages = function(package1, package2) {
                var mergedItems = package1.items;
                if (mergedItems) {
                    mergedItems = _.clone(mergedItems);
                    for (var mergedNames = _.indexBy(mergedItems, "name"), _i = 0, _a = package2.items; _i < _a.length; _i++) {
                        var item = _a[_i];
                        mergedNames[item.name] || (mergedItems.push(item), mergedNames[item.name] = item);
                    }
                } else mergedItems = package2.items;
                return {
                    id: package1.id || package2.id,
                    name: package1.name || package2.name,
                    type: package1.type || package2.type,
                    items: mergedItems
                };
            }, ResourcePackagesService.prototype.getPackage = function(name) {
                return this.packages[name];
            }, ResourcePackagesService.prototype.getPackageById = function(id) {
                var resourcePkgName = this.resourcePkgNameIdLookupTable[id];
                return resourcePkgName ? this.getPackage(resourcePkgName) : void 0;
            }, ResourcePackagesService.prototype.clear = function() {
                this.packages = {};
            }, ResourcePackagesService;
        }();
    }(visualHost = powerbi.visualHost || (powerbi.visualHost = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualHost;
    !function(visualHost) {
        function createSandboxResourceLoader(resourceLoaderConstructionOptions, messageProxy, sandboxLoaderUri, httpProvider) {
            return new SandboxResourceLoader(resourceLoaderConstructionOptions, messageProxy, sandboxLoaderUri, httpProvider);
        }
        visualHost.createSandboxResourceLoader = createSandboxResourceLoader;
        var ResourceLoaderEvents;
        !function(ResourceLoaderEvents) {
            ResourceLoaderEvents.loadResourcePackage = "loadResourcePackage", ResourceLoaderEvents.loadVisualPlugin = "loadVisualPlugin", 
            ResourceLoaderEvents.loadVisualPluginWithContent = "loadVisualPluginWithContent", 
            ResourceLoaderEvents.onVisualPluginLoad = "onVisualPluginLoad", ResourceLoaderEvents.onResourcePackageLoad = "onResourcePackageLoad", 
            ResourceLoaderEvents.onVisualPluginLoadError = "onVisualPluginLoadError", ResourceLoaderEvents.onResourcePackageLoadError = "onResourcePackageLoadError";
        }(ResourceLoaderEvents || (ResourceLoaderEvents = {}));
        var SandboxResourceLoader = function() {
            function SandboxResourceLoader(resourceLoaderConstructionOptions, messageProxy, sandboxLoaderUri, provider) {
                this.locale = resourceLoaderConstructionOptions && resourceLoaderConstructionOptions.locale, 
                this.promiseFactory = resourceLoaderConstructionOptions.promiseFactory, this.messageProxy = messageProxy, 
                this.sandboxLoaderUri = sandboxLoaderUri, this.provider = provider, this.initIFrame();
            }
            return SandboxResourceLoader.prototype.loadResourcePackage = function(resourcePackage) {
                return this.loadVisualPlugin(resourcePackage);
            }, SandboxResourceLoader.prototype.loadResourcePackages = function(resourcePackages) {
                for (var promises = [], _i = 0, resourcePackages_9 = resourcePackages; _i < resourcePackages_9.length; _i++) {
                    var resourcePackage = resourcePackages_9[_i];
                    promises.push(this.loadResourcePackage(resourcePackage));
                }
                return this.promiseFactory.all(promises);
            }, SandboxResourceLoader.prototype.loadTrustedResourcePackages = function(trustedResourcePackages) {
                return this.promiseFactory.reject();
            }, SandboxResourceLoader.prototype.loadResourcePackageItem = function(resourcePackage, itemName) {
                return this.promiseFactory.reject();
            }, SandboxResourceLoader.prototype.loadSharedResource = function(path) {
                return this.promiseFactory.reject();
            }, SandboxResourceLoader.prototype.loadVisualPlugin = function(resourcePackage) {
                var _this = this, deferred = this.promiseFactory.defer();
                return this.loadResourcesContent(resourcePackage).then(function(resourcePackageItemContent) {
                    var mappedPluginContent = _.indexBy(resourcePackageItemContent, "type"), visualMetadataItem = mappedPluginContent[5];
                    if (visualMetadataItem) try {
                        var json = jsCommon.JsonExtensions.tryParseJSON(visualMetadataItem.content), plugin = visualHost.visualPluginUtility.createVisualPlugin(json, _this.locale), resourcePackageItem = _.find(resourcePackage.items, function(d) {
                            return 5 === d.type;
                        });
                        if (resourcePackageItem.content) {
                            var pbivizJson = void 0;
                            pbivizJson = _.isString(resourcePackageItem.content) ? jsCommon.JsonExtensions.tryParseJSON(resourcePackageItem.content) : resourcePackageItem.content, 
                            pbivizJson.content = void 0, resourcePackageItem.content = JSON.stringify(pbivizJson);
                        }
                        powerbi.extensibility.visualPluginAdapter.transformPlugin(plugin), powerbi.visuals.plugins[plugin.name] = plugin, 
                        deferred.resolve(plugin);
                    } catch (err) {
                        deferred.reject(err);
                    } else {
                        var mappedPluginNameAndContent = {
                            pluginName: resourcePackage.name,
                            mappedPluginContent: mappedPluginContent
                        }, message = {
                            eventName: ResourceLoaderEvents.loadVisualPluginWithContent,
                            arguments: [ mappedPluginNameAndContent ]
                        };
                        _this.messageProxy.postMessageAsync(message).then(function(result) {
                            var plugin = result, existingPlugin = powerbi.visuals.plugins[plugin.name];
                            if (!existingPlugin || existingPlugin.custom) {
                                plugin.custom = !0;
                                var wireDescriptors = plugin.capabilities.objects;
                                plugin.capabilities.objects = powerbi.data.services.DataViewObjectDescriptorSerializer.deserialize(wireDescriptors), 
                                powerbi.extensibility.visualPluginAdapter.transformPlugin(plugin), powerbi.visuals.plugins[plugin.name] = plugin, 
                                deferred.resolve(plugin);
                            }
                        }).catch(function(err) {
                            deferred.reject(err);
                        });
                    }
                }).catch(function(err) {
                    deferred.reject(err);
                }), deferred.promise;
            }, SandboxResourceLoader.prototype.loadVisualPlugins = function(resourcePackages) {
                var promises = [];
                if (resourcePackages) for (var _i = 0, resourcePackages_10 = resourcePackages; _i < resourcePackages_10.length; _i++) {
                    var resourcePackage = resourcePackages_10[_i];
                    promises.push(this.loadVisualPlugin(resourcePackage));
                }
                return this.promiseFactory.all(promises);
            }, SandboxResourceLoader.prototype.destroy = function() {
                this.iframe.remove(), this.iframe = null, this.messageProxy.destroy(), this.messageProxy = null, 
                this.contentWindow = null;
            }, SandboxResourceLoader.prototype.initIFrame = function() {
                var _this = this, iframeSource = this.sandboxLoaderUri;
                jsCommon.QueryStringUtil.getQueryStringValue("unmin") && (iframeSource += "?unmin=1"), 
                this.iframe = $('<iframe class="sandbox-resource-loader ng-hide" sandbox="allow-scripts"></iframe>').attr("src", iframeSource).one("load", function() {
                    return _this.onIFrameLoad();
                }).appendTo(document.body);
            }, SandboxResourceLoader.prototype.onIFrameLoad = function() {
                this.contentWindow = this.iframe[0].contentWindow, this.messageProxy.contentWindow = this.contentWindow, 
                this.messageProxy.flushQueue();
            }, SandboxResourceLoader.prototype.loadResourcesContent = function(resourcePackage) {
                for (var promises = [], id = resourcePackage.id, name = resourcePackage.name, _i = 0, _a = resourcePackage.items; _i < _a.length; _i++) {
                    var item = _a[_i];
                    3 !== item.type && promises.push(this.loadResourceContent(id, name, item));
                }
                return this.promiseFactory.all(promises);
            }, SandboxResourceLoader.prototype.loadResourceContent = function(id, name, item) {
                var _this = this, deferred = this.promiseFactory.defer();
                return item.content ? deferred.resolve(this.getItemContent(item.content, item)) : this.provider.get(id, name, item.path).then(function(result) {
                    deferred.resolve(_this.getItemContent(result, item));
                }).catch(function(err) {
                    deferred.reject(err);
                }), deferred.promise;
            }, SandboxResourceLoader.prototype.getItemContent = function(content, item) {
                var itemContent = _.isString(content) ? content : JSON.stringify(content);
                return item.content = 5 === item.type ? itemContent : void 0, {
                    type: item.type,
                    content: itemContent
                };
            }, SandboxResourceLoader;
        }();
    }(visualHost = powerbi.visualHost || (powerbi.visualHost = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualHost;
    !function(visualHost) {
        var UnapprovedResourceLoader = function() {
            function UnapprovedResourceLoader(promiseFactory) {
                this.promiseFactory = promiseFactory, this.promiseFactory = promiseFactory;
            }
            return UnapprovedResourceLoader.prototype.loadResourcePackage = function(resourcePackage) {
                return this.promiseFactory.resolve();
            }, UnapprovedResourceLoader.prototype.loadResourcePackages = function(resourcePackages) {
                return this.promiseFactory.resolve();
            }, UnapprovedResourceLoader.prototype.loadTrustedResourcePackages = function(trustedResourcePackages) {
                return this.promiseFactory.resolve();
            }, UnapprovedResourceLoader.prototype.loadResourcePackageItem = function(resourcePackage, itemName) {
                return this.promiseFactory.resolve();
            }, UnapprovedResourceLoader.prototype.loadSharedResource = function(path) {
                return this.promiseFactory.resolve();
            }, UnapprovedResourceLoader.prototype.loadVisualPlugin = function(resourcePackage) {
                return this.promiseFactory.resolve(null);
            }, UnapprovedResourceLoader.prototype.loadVisualPlugins = function(resourcePackages) {
                return this.promiseFactory.resolve();
            }, UnapprovedResourceLoader.prototype.destroy = function() {}, UnapprovedResourceLoader;
        }();
        visualHost.UnapprovedResourceLoader = UnapprovedResourceLoader;
    }(visualHost = powerbi.visualHost || (powerbi.visualHost = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualHost;
    !function(visualHost) {
        var services;
        !function(services) {
            var VisualObjectInstanceSerializer, DataViewObjectSerializer = powerbi.data.services.DataViewObjectSerializer, SemanticQuerySerializer = powerbi.data.services.SemanticQuerySerializer;
            !function(VisualObjectInstanceSerializer) {
                function serialize(instances) {
                    return 0 === instances.length ? [] : _.map(instances, serializeVisualObjectInstance);
                }
                function deserialize(instances) {
                    return 0 === instances.length ? [] : _.map(instances, deserializeVisualObjectInstance);
                }
                function serializeContainers(containers, resourceProvider) {
                    return _.map(containers, function(container) {
                        return {
                            displayName: powerbi.data.getDisplayName(container.displayName, resourceProvider)
                        };
                    });
                }
                function deserializeContainers(containers) {
                    return _.map(containers, function(container) {
                        return {
                            displayName: powerbi.data.createDisplayNameGetter(container.displayName)
                        };
                    });
                }
                function serializeVisualObjectInstance(instance) {
                    var selectors = DataViewObjectSerializer.serializeSelectors([ instance.selector ]);
                    return {
                        objectName: instance.objectName,
                        displayName: instance.displayName,
                        properties: serializeVisualObjectInstanceProperties(instance.properties),
                        selector: selectors && selectors.length > 0 ? selectors[0] : null,
                        validValues: instance.validValues,
                        containerIdx: instance.containerIdx
                    };
                }
                function deserializeVisualObjectInstance(instance) {
                    var selectors = DataViewObjectSerializer.deserializeSelectors([ instance.selector ]);
                    return {
                        objectName: instance.objectName,
                        displayName: instance.displayName,
                        properties: deserializeVisualObjectInstanceProperties(instance.properties),
                        selector: selectors && selectors.length > 0 ? selectors[0] : null,
                        validValues: instance.validValues,
                        containerIdx: instance.containerIdx
                    };
                }
                function serializeVisualObjectInstanceProperties(properties) {
                    var result = {};
                    for (var key in properties) result[key] = serializeDataViewPropertyValue(properties[key]);
                    return result;
                }
                function deserializeVisualObjectInstanceProperties(properties) {
                    var result = {};
                    for (var key in properties) result[key] = deserializeDataViewPropertyValue(properties[key]);
                    return result;
                }
                function serializeDataViewPropertyValue(propertyValue) {
                    return propertyValue instanceof powerbi.data.SemanticFilter ? SemanticQuerySerializer.serializeFilter(propertyValue) : void 0 === propertyValue ? null : propertyValue;
                }
                function deserializeDataViewPropertyValue(propertyValue) {
                    var filterDefinition = propertyValue;
                    return filterDefinition && filterDefinition.From && filterDefinition.Where ? SemanticQuerySerializer.deserializeFilter(filterDefinition) : propertyValue;
                }
                VisualObjectInstanceSerializer.serialize = serialize, VisualObjectInstanceSerializer.deserialize = deserialize, 
                VisualObjectInstanceSerializer.serializeContainers = serializeContainers, VisualObjectInstanceSerializer.deserializeContainers = deserializeContainers;
            }(VisualObjectInstanceSerializer = services.VisualObjectInstanceSerializer || (services.VisualObjectInstanceSerializer = {}));
        }(services = visualHost.services || (visualHost.services = {}));
    }(visualHost = powerbi.visualHost || (powerbi.visualHost = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualHost;
    !function(visualHost) {
        var services;
        !function(services) {
            var VisualObjectRepetitionSerializer, DataViewObjectSerializer = powerbi.data.services.DataViewObjectSerializer;
            !function(VisualObjectRepetitionSerializer) {
                function serialize(repetitions) {
                    return _.isEmpty(repetitions) ? [] : _.map(repetitions, serializeVisualObjectRepetition);
                }
                function deserialize(repetitions) {
                    return _.isEmpty(repetitions) ? [] : _.map(repetitions, deserializeVisualObjectRepetition);
                }
                function serializeVisualObjectRepetition(repetition) {
                    return {
                        selector: DataViewObjectSerializer.serializeSelector(repetition.selector),
                        objects: repetition.objects
                    };
                }
                function deserializeVisualObjectRepetition(repetition) {
                    return {
                        selector: DataViewObjectSerializer.deserializeSelector(repetition.selector),
                        objects: repetition.objects
                    };
                }
                VisualObjectRepetitionSerializer.serialize = serialize, VisualObjectRepetitionSerializer.deserialize = deserialize;
            }(VisualObjectRepetitionSerializer = services.VisualObjectRepetitionSerializer || (services.VisualObjectRepetitionSerializer = {}));
        }(services = visualHost.services || (visualHost.services = {}));
    }(visualHost = powerbi.visualHost || (powerbi.visualHost = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualHost;
    !function(visualHost) {
        var VisualStyleSerializer;
        !function(VisualStyleSerializer) {
            function serializeVisualStyle(style) {
                var result = {
                    colorPalette: serializeColorPalette(style.colorPalette),
                    isHighContrast: style.isHighContrast,
                    labelText: style.labelText,
                    maxMarginFactor: style.maxMarginFactor,
                    subTitleText: style.subTitleText,
                    titleText: style.titleText
                };
                return result;
            }
            function deserializeVisualStyle(style) {
                var result = {
                    colorPalette: deserializeColorPalette(style.colorPalette),
                    isHighContrast: style.isHighContrast,
                    labelText: style.labelText,
                    maxMarginFactor: style.maxMarginFactor,
                    subTitleText: style.subTitleText,
                    titleText: style.titleText
                };
                return result;
            }
            function serializeColorPalette(colorPalette) {
                var result = {
                    background: colorPalette.background,
                    dataColors: colorPalette.dataColors.getAllColors(),
                    foreground: colorPalette.foreground,
                    negative: colorPalette.negative,
                    positive: colorPalette.positive,
                    selection: colorPalette.selection,
                    separator: colorPalette.separator
                };
                return result;
            }
            function deserializeColorPalette(colorPalette) {
                var result = {
                    background: colorPalette.background,
                    dataColors: new powerbi.visuals.DataColorPalette(colorPalette.dataColors),
                    foreground: colorPalette.foreground,
                    negative: colorPalette.negative,
                    positive: colorPalette.positive,
                    selection: colorPalette.selection,
                    separator: colorPalette.separator
                };
                return result;
            }
            VisualStyleSerializer.serializeVisualStyle = serializeVisualStyle, VisualStyleSerializer.deserializeVisualStyle = deserializeVisualStyle;
        }(VisualStyleSerializer = visualHost.VisualStyleSerializer || (visualHost.VisualStyleSerializer = {}));
    }(visualHost = powerbi.visualHost || (powerbi.visualHost = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualHost;
    !function(visualHost) {
        function createVisualConsentService(promiseFactory, telemetryService) {
            return new VisualConsentService(promiseFactory, telemetryService);
        }
        var UserConsent;
        !function(UserConsent) {
            UserConsent[UserConsent.NotRequired = 0] = "NotRequired", UserConsent[UserConsent.Declined = 1] = "Declined", 
            UserConsent[UserConsent.Approved = 2] = "Approved";
        }(UserConsent = visualHost.UserConsent || (visualHost.UserConsent = {})), visualHost.createVisualConsentService = createVisualConsentService;
        var VisualConsentService = function() {
            function VisualConsentService(promiseFactory, telemetryService) {
                this.promiseFactory = promiseFactory, this.telemetryService = telemetryService, 
                this.cachedConsentMap = {}, this.visualConsentOptionsMap = {};
            }
            return VisualConsentService.prototype.registerVisualConsent = function(type, options) {
                this.visualConsentOptionsMap[type] = options, this.telemetryService.logEvent(powerbi.telemetry.VisualConsentRegister, type, this.telemetryService.root.id, !1, powerbi.telemetry.ErrorSource.PowerBI), 
                this.loadConsentAsync(type);
            }, VisualConsentService.prototype.hasConsent = function(visualType) {
                return this.cachedConsentMap[visualType];
            }, VisualConsentService.prototype.setConsent = function(visualType, value) {
                if (!this.isConsentRequiringVisual(visualType)) return this.promiseFactory.reject("Visual type does not require consent");
                this.cachedConsentMap[visualType] = value;
                var provider = this.visualConsentOptionsMap[visualType] && this.visualConsentOptionsMap[visualType].consentPersistencyProvider;
                return this.telemetryService.logEvent(powerbi.telemetry.VisualConsentSet, visualType, value, this.telemetryService.root.id, !1, powerbi.telemetry.ErrorSource.PowerBI), 
                provider ? provider.saveConsent(value) : this.promiseFactory.reject("No persistencyProvider was set for visual " + visualType);
            }, VisualConsentService.prototype.getConsent = function(visualTypes) {
                var _this = this, promises = [];
                visualTypes = _.unique(visualTypes), this.telemetryService.logEvent(powerbi.telemetry.VisualConsentGet, visualTypes.join(", "), this.telemetryService.root.id, !1, powerbi.telemetry.ErrorSource.PowerBI);
                for (var _loop_2 = function(visualType) {
                    if (!this_1.isConsentRequiringVisual(visualType)) {
                        var consentState = {
                            visualType: visualType,
                            consent: UserConsent.NotRequired
                        };
                        return promises.push(this_1.promiseFactory.resolve(consentState)), "continue";
                    }
                    promises.push(this_1.loadConsentAsync(visualType).then(function(consent) {
                        if (consent) {
                            var consentState = {
                                visualType: visualType,
                                consent: UserConsent.Approved
                            };
                            return _this.promiseFactory.resolve(consentState);
                        }
                        return _this.showConsentDialog(visualType);
                    }));
                }, this_1 = this, _i = 0, visualTypes_1 = visualTypes; _i < visualTypes_1.length; _i++) {
                    var visualType = visualTypes_1[_i];
                    _loop_2(visualType);
                }
                return this.promiseFactory.allSettled(promises).then(function(promisesResults) {
                    return _.map(_.filter(promisesResults, function(result) {
                        return 0 === result.type;
                    }), function(result) {
                        return result.value;
                    });
                });
            }, VisualConsentService.prototype.isConsentRequiringVisual = function(visualType) {
                return !!this.visualConsentOptionsMap[visualType];
            }, VisualConsentService.prototype.loadConsentAsync = function(visualType) {
                var _this = this;
                if (void 0 !== this.cachedConsentMap[visualType]) return this.promiseFactory.resolve(this.cachedConsentMap[visualType]);
                var provider = this.visualConsentOptionsMap[visualType] && this.visualConsentOptionsMap[visualType].consentPersistencyProvider;
                return provider ? provider.loadConsent().then(function(consent) {
                    return _this.cachedConsentMap[visualType] = consent, _this.promiseFactory.resolve(consent);
                }).catch(function(reason) {
                    return _this.promiseFactory.reject(reason);
                }) : this.promiseFactory.reject("VisualConsentService.getConsentAsync: Missing consentPersistencyProvider for visual " + visualType);
            }, VisualConsentService.prototype.showConsentDialog = function(visualType) {
                var _this = this;
                if (!this.isConsentRequiringVisual(visualType)) return this.promiseFactory.reject("VisualConsentService.showConsentDialog: Visual type does not require consent");
                var consentDialogProvider = this.visualConsentOptionsMap[visualType] && this.visualConsentOptionsMap[visualType].consentDialogProvider;
                return consentDialogProvider ? consentDialogProvider.showConsentDialog().then(function(consent) {
                    _this.setConsent(visualType, consent);
                    var consentState = {
                        visualType: visualType,
                        consent: consent ? UserConsent.Approved : UserConsent.Declined
                    };
                    return _this.promiseFactory.resolve(consentState);
                }).catch(function(reason) {
                    return _this.promiseFactory.reject(reason);
                }) : this.promiseFactory.reject("VisualConsentService.showConsentDialog: Missing consentDialogProvider for visual " + visualType);
            }, VisualConsentService;
        }();
    }(visualHost = powerbi.visualHost || (powerbi.visualHost = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualHost;
    !function(visualHost) {
        function createVisualInstanceIdTrackingService() {
            return new VisualInstanceIdTrackingService();
        }
        visualHost.createVisualInstanceIdTrackingService = createVisualInstanceIdTrackingService;
        var VisualInstanceIdTrackingService = function() {
            function VisualInstanceIdTrackingService() {
                this.listeners = [];
            }
            return VisualInstanceIdTrackingService.prototype.associate = function(instanceId, visualType) {
                for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                    var listener = _a[_i];
                    listener.onInstanceAssociated(instanceId, visualType);
                }
            }, VisualInstanceIdTrackingService.prototype.subscribeToInstanceIdAssociation = function(listener) {
                _.contains(this.listeners, listener) || this.listeners.push(listener);
            }, VisualInstanceIdTrackingService;
        }();
    }(visualHost = powerbi.visualHost || (powerbi.visualHost = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualHost;
    !function(visualHost) {
        var services;
        !function(services) {
            function createVisualStylePresetService() {
                return new VisualStylePresetService();
            }
            services.createVisualStylePresetService = createVisualStylePresetService;
            var VisualStylePresetService = function() {
                function VisualStylePresetService() {
                    this.cache = (_a = {}, _a[powerbi.visuals.plugins.table.name] = powerbi.visuals.stylePresets.tableStylePresets(), 
                    _a[powerbi.visuals.plugins.matrix.name] = powerbi.visuals.stylePresets.matrixStylePresets(), 
                    _a[powerbi.visuals.plugins.pivotTable.name] = powerbi.visuals.stylePresets.pivotTableStylePresets(), 
                    _a[powerbi.visuals.plugins.tableEx.name] = powerbi.visuals.stylePresets.tableExStylePresets(), 
                    _a);
                    var _a;
                }
                return VisualStylePresetService.prototype.getStylePresets = function(visualType) {
                    return this.cache[visualType];
                }, VisualStylePresetService.prototype.getStylePreset = function(visualType, stylePresetName) {
                    var stylePresets = this.getStylePresets(visualType);
                    if (stylePresets) return powerbi.VisualStylePresetHelpers.getStylePreset(stylePresets, stylePresetName);
                }, VisualStylePresetService.prototype.getEnumFromName = function(visualType) {
                    return this.getEnumFromStylePresets(this.getStylePresets(visualType));
                }, VisualStylePresetService.prototype.getEnumFromStylePresets = function(presets) {
                    return powerbi.VisualStylePresetHelpers.getStylePresetsEnum(presets);
                }, VisualStylePresetService;
            }();
        }(services = visualHost.services || (visualHost.services = {}));
    }(visualHost = powerbi.visualHost || (powerbi.visualHost = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualHost;
    !function(visualHost) {
        var visualPluginUtility;
        !function(visualPluginUtility) {
            function createVisualPlugin(pbivizJson, locale) {
                pbivizJson = locale ? visualHost.LocalizationResourceUtility.setLocalizedCapabilities(pbivizJson, locale) : pbivizJson;
                var plugin = {
                    name: pbivizJson.visual.guid,
                    apiVersion: pbivizJson.apiVersion,
                    class: pbivizJson.visual.visualClassName,
                    displayName: pbivizJson.visual.displayName,
                    capabilities: pbivizJson.capabilities,
                    custom: !0,
                    iconUrl: 'url("' + pbivizJson.content.iconBase64 + '")',
                    content: pbivizJson.content,
                    version: pbivizJson.visual.version,
                    create: function() {
                        return null;
                    }
                };
                return plugin;
            }
            visualPluginUtility.createVisualPlugin = createVisualPlugin;
        }(visualPluginUtility = visualHost.visualPluginUtility || (visualHost.visualPluginUtility = {}));
    }(visualHost = powerbi.visualHost || (powerbi.visualHost = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualHost;
    !function(visualHost) {
        function createWindowMessageProxy(promiseFactory, contentWindow) {
            return new WindowMessageProxy(promiseFactory, contentWindow);
        }
        var events;
        !function(events) {
            events.WindowMessageProxyMessageEvent = "message", events.WindowMessageProxyErrorEvent = "error";
        }(events = visualHost.events || (visualHost.events = {}));
        var WindowPostMessageEvent = "message", AsyncCompleteEvent = "onMessageProxyAsyncComplete";
        visualHost.createWindowMessageProxy = createWindowMessageProxy;
        var WindowMessageProxy = function() {
            function WindowMessageProxy(promiseFactory, contentWindow) {
                var _this = this;
                this.promiseFactory = promiseFactory, this._queue = [], this._allowSameWindow = !1, 
                this.handlers = {
                    message: [],
                    error: []
                }, this.isFlushing = !1, contentWindow && (this._contentWindow = contentWindow), 
                this.deferredCache = {}, this.windowMessageHandler = function(e) {
                    return _this.onMessageReceived(e);
                }, $(window).on(WindowPostMessageEvent, this.windowMessageHandler);
            }
            return Object.defineProperty(WindowMessageProxy.prototype, "allowSameWindow", {
                get: function() {
                    return this._allowSameWindow;
                },
                set: function(value) {
                    this._allowSameWindow = value;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(WindowMessageProxy.prototype, "contentWindow", {
                get: function() {
                    return this._contentWindow;
                },
                set: function(value) {
                    this._contentWindow = value;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(WindowMessageProxy.prototype, "queue", {
                get: function() {
                    return jQuery.extend([], this._queue);
                },
                enumerable: !0,
                configurable: !0
            }), WindowMessageProxy.prototype.postMessage = function(message) {
                this.contentWindow ? this.sendMessage(message) : this.queueMessage(message);
            }, WindowMessageProxy.prototype.postMessageAsync = function(message) {
                var _this = this, deferred = this.promiseFactory.defer(), key = this.createRandomString();
                return this.deferredCache[key] = deferred, message.id = key, this.postMessage(message), 
                deferred.promise.finally(function() {
                    delete _this.deferredCache[key];
                }), deferred.promise;
            }, WindowMessageProxy.prototype.queueMessage = function(message, index) {
                void 0 === index && (index = this._queue.length);
                var jsonMessage = this.prepareMessage(message);
                this._queue.splice(index, 0, jsonMessage);
            }, WindowMessageProxy.prototype.on = function(type, handler) {
                if (this.handlers[type]) {
                    var index = this.handlers[type].indexOf(handler);
                    index > -1 || this.handlers[type].push(handler);
                }
            }, WindowMessageProxy.prototype.off = function(type, handler) {
                if (this.handlers[type]) {
                    if (!handler) return void (this.handlers[type].length = 0);
                    var index = this.handlers[type].indexOf(handler);
                    index > -1 && this.handlers[type].splice(index, 1);
                }
            }, WindowMessageProxy.prototype.flushQueue = function() {
                !this.isFlushing && this.contentWindow && (this.isFlushing = !0, this.contentWindow.postMessage && this.contentWindow.postMessage(this._queue, "*"), 
                this._queue.length = 0, this.isFlushing = !1);
            }, WindowMessageProxy.prototype.sendMessage = function(message) {
                var jsonMessage = this.prepareMessage(message);
                this.contentWindow && this.contentWindow.postMessage && this.contentWindow.postMessage(jsonMessage, "*");
            }, WindowMessageProxy.prototype.prepareMessage = function(message) {
                var jsonMessage;
                try {
                    jsonMessage = JSON.stringify(message);
                } catch (ex) {
                    throw jsonMessage = null, ex;
                }
                return jsonMessage;
            }, WindowMessageProxy.prototype.onMessageReceived = function(e) {
                if (this.allowSameWindow || e.originalEvent.source !== window) {
                    var data;
                    try {
                        data = "string" == typeof e.originalEvent.data ? JSON.parse(e.originalEvent.data) : e.originalEvent.data;
                    } catch (ex) {
                        data = null;
                    }
                    if (data) for (var messages = jQuery.isArray(data) ? data : [ data ], _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                        var rawMessage = messages_1[_i], message = void 0;
                        try {
                            message = "string" == typeof rawMessage ? JSON.parse(rawMessage) : rawMessage;
                        } catch (ex) {
                            message = null;
                        }
                        if (!message) return;
                        this.dispatchMessage(e.originalEvent, message);
                    }
                }
            }, WindowMessageProxy.prototype.dispatchMessage = function(event, message) {
                var eventArgs = {
                    message: message,
                    source: event.source
                };
                if (message.id && (message.eventName === AsyncCompleteEvent || message.result || message.error)) {
                    var deferred = this.deferredCache[message.id];
                    if (!deferred) return;
                    return message.error ? deferred.reject(message.error) : deferred.resolve(message.result);
                }
                for (var handlers = message.error ? this.handlers.error : this.handlers.message, _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
                    var handler = handlers_1[_i];
                    this.invokeHandler(handler, eventArgs);
                }
            }, WindowMessageProxy.prototype.invokeHandler = function(handler, eventArgs) {
                var result, asyncResponse, _this = this;
                eventArgs.message.id && (asyncResponse = {
                    id: eventArgs.message.id,
                    eventName: AsyncCompleteEvent,
                    arguments: []
                });
                try {
                    result = handler.call(null, eventArgs), asyncResponse && this.promiseFactory.when(result).then(function(asyncResult) {
                        asyncResponse.result = asyncResult, _this.postMessage(asyncResponse);
                    }).catch(function(err) {
                        asyncResponse.error = err, _this.postMessage(asyncResponse);
                    });
                } catch (ex) {
                    asyncResponse && (asyncResponse.error = {
                        message: ex.message
                    }, this.postMessage(asyncResponse));
                }
            }, WindowMessageProxy.prototype.createRandomString = function() {
                return (Math.random() + 1).toString(36).substring(7);
            }, WindowMessageProxy.prototype.destroy = function() {
                this.handlers.message.length = 0, this.handlers.error.length = 0, $(window).off(WindowPostMessageEvent, this.windowMessageHandler), 
                this.windowMessageHandler = null;
            }, WindowMessageProxy;
        }();
    }(visualHost = powerbi.visualHost || (powerbi.visualHost = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualHost;
    !function(visualHost) {
        function SandboxPropertyTranslator(prop) {
            switch (prop) {
              case SandboxProperty.AllowScripts:
                return "allow-scripts";

              case SandboxProperty.AllowPopups:
                return "allow-popups";

              case SandboxProperty.AllowSameOrigin:
                return "allow-same-origin";

              case SandboxProperty.AllowForms:
                return "allow-forms";
            }
        }
        function createTrustedVisualService(promiseFactory, telemetryService, visualConsent, approvedResourceService, visualSandbox, resourceLoader) {
            return new TrustedVisualService(promiseFactory, telemetryService, visualConsent, approvedResourceService, visualSandbox, resourceLoader);
        }
        visualHost.EsriVisual = "esriVisual", visualHost.VisioVisual = "Visio_PBI_CV_D7C10B1A_506B_4123_878E_39E8698FD30A", 
        visualHost.VisioDFVisual = "VisioDF_PBI_CV_D7C10B1A_506B_4123_878E_39E8698FD30A", 
        visualHost.SandDanceVisual = "SandDance1448759247246", visualHost.PowerAppsVisual = "PowerApps_PBI_CV_C29F1DCC_81F5_4973_94AD_0517D44CC06A", 
        visualHost.GlobeMapVisual = "GlobeMap1447669447625";
        var SandboxProperty;
        !function(SandboxProperty) {
            SandboxProperty[SandboxProperty.AllowScripts = 0] = "AllowScripts", SandboxProperty[SandboxProperty.AllowPopups = 1] = "AllowPopups", 
            SandboxProperty[SandboxProperty.AllowSameOrigin = 2] = "AllowSameOrigin", SandboxProperty[SandboxProperty.AllowForms = 3] = "AllowForms";
        }(SandboxProperty = visualHost.SandboxProperty || (visualHost.SandboxProperty = {})), 
        visualHost.SandboxPropertyTranslator = SandboxPropertyTranslator, visualHost.createTrustedVisualService = createTrustedVisualService;
        var TrustedVisualService = function() {
            function TrustedVisualService(promiseFactory, telemetryService, visualConsent, approvedResourceService, visualSandbox, resourceLoader) {
                var _this = this;
                this.promiseFactory = promiseFactory, this.telemetryService = telemetryService, 
                this.visualConsent = visualConsent, this.approvedResourceService = approvedResourceService, 
                this.resourceLoader = resourceLoader, this.trustedVisualsMap = {}, visualSandbox && (visualSandbox.settings.sandboxProperties = function(visualType, isDebugVisual) {
                    return isDebugVisual && (visualType = visualType.substring(0, visualType.lastIndexOf("_DEBUG"))), 
                    _this.isTrustedVisualAllowed(visualType) ? _this.trustedVisualsMap[visualType].sandboxProperties : [ SandboxProperty.AllowScripts ];
                });
            }
            return TrustedVisualService.prototype.registerTrustedVisual = function(types, options) {
                for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
                    var type = types_1[_i];
                    this.trustedVisualsMap[type] = options, options.registerVisualConsentOptions && this.visualConsent.registerVisualConsent(type, options.registerVisualConsentOptions), 
                    this.approvedResourceService && this.approvedResourceService.addTrustedVisual(type);
                }
            }, TrustedVisualService.prototype.isTrustedVisual = function(visualType) {
                return !!this.trustedVisualsMap[visualType];
            }, TrustedVisualService.prototype.isAutomaticallyImportedVisual = function(visualType) {
                return this.isTrustedVisual(visualType) && this.trustedVisualsMap[visualType].automaticallyImport;
            }, TrustedVisualService.prototype.validate = function(visualType) {
                if (this.isTrustedVisual(visualType)) {
                    var validator = this.trustedVisualsMap[visualType] && this.trustedVisualsMap[visualType].providers && this.trustedVisualsMap[visualType].providers.validator;
                    return validator ? validator.getErrorDetails() : void 0;
                }
            }, TrustedVisualService.prototype.loadTrustedVisualPlugins = function(requestedVisualTypes) {
                var _this = this;
                if (!this.resourceLoader) return this.promiseFactory.reject();
                var visualTypes;
                visualTypes = requestedVisualTypes ? requestedVisualTypes : this.getAllTrustedVisualTypes();
                var trustedVisualsToLoad = _.filter(visualTypes, function(visualType) {
                    return _this.isTrustedVisualAllowed(visualType) && _this.trustedVisualsMap[visualType].automaticallyImport;
                });
                return this.telemetryService.logEvent(powerbi.telemetry.TrustedVisualLoad, requestedVisualTypes ? requestedVisualTypes.join(",") : "", visualTypes ? visualTypes.join(",") : "", this.telemetryService.root.id, !1, powerbi.telemetry.ErrorSource.PowerBI), 
                0 === trustedVisualsToLoad.length ? this.promiseFactory.resolve([]) : this.resourceLoader.loadTrustedResourcePackages(trustedVisualsToLoad).catch(function(reason) {
                    return _this.promiseFactory.reject(reason);
                }).then(function(plugins) {
                    return plugins && plugins.length > 0 && plugins[0].length > 0 && plugins[0][0].length > 0 ? _this.promiseFactory.resolve(plugins[0][0]) : _this.promiseFactory.resolve([]);
                });
            }, TrustedVisualService.prototype.getVisualTypeOptions = function(visualType) {
                if (this.isTrustedVisual(visualType)) return this.trustedVisualsMap[visualType].visualTypeOptions;
            }, TrustedVisualService.prototype.getConsentAndLoadVisuals = function(visualTypes) {
                var _this = this;
                return this.telemetryService.logEvent(powerbi.telemetry.TrustedVisualGetConsent, visualTypes ? visualTypes.join(",") : "", this.telemetryService.root.id, !1, powerbi.telemetry.ErrorSource.PowerBI), 
                this.visualConsent.getConsent(visualTypes).then(function(visualsConsentStates) {
                    var visualTypesToLoad = _.map(_.filter(visualsConsentStates, function(visualConsent) {
                        return visualConsent.consent !== visualHost.UserConsent.Declined;
                    }), function(visualConsent) {
                        return visualConsent.visualType;
                    });
                    return _this.loadTrustedVisualPlugins(visualTypesToLoad);
                });
            }, TrustedVisualService.prototype.canLoadVisual = function(visualType) {
                return !this.isTrustedVisual(visualType) || !!this.isTrustedVisualAllowed(visualType) && (!this.trustedVisualsMap[visualType].registerVisualConsentOptions || this.visualConsent.hasConsent(visualType));
            }, TrustedVisualService.prototype.getAllTrustedVisualTypes = function() {
                return _.keys(this.trustedVisualsMap);
            }, TrustedVisualService.prototype.isTrustedVisualAllowed = function(visualType) {
                if (!this.isTrustedVisual(visualType)) return !1;
                var blocker = this.trustedVisualsMap[visualType] && this.trustedVisualsMap[visualType].providers && this.trustedVisualsMap[visualType].providers.blocker;
                return !blocker || !blocker.blockedInCluster() && !blocker.blockedInTenant();
            }, TrustedVisualService;
        }();
    }(visualHost = powerbi.visualHost || (powerbi.visualHost = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var telemetry;
    !function(telemetry) {
        function ApprovedResourceFailLoaded(visualType, fileName, parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            var baseEvent = telemetry.Verbose(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity), info = merge(baseEvent.info, {
                visualType: visualType,
                fileName: fileName
            }), event = {
                name: "PBI.ApprovedResource.FailLoaded",
                category: powerbi.TelemetryCategory.Verbose,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted({
                        visualType: info.visualType,
                        fileName: info.fileName
                    }, null, baseEvent.formatted());
                },
                info: info,
                loggers: telemetry.ApprovedResourceFailLoadedLoggers
            };
            return event;
        }
        function ApprovedResourceEndpointDown(endpoint, allEndpointDown, parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            var baseEvent = telemetry.Verbose(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity), info = merge(baseEvent.info, {
                endpoint: endpoint,
                allEndpointDown: allEndpointDown
            }), event = {
                name: "PBI.ApprovedResource.EndpointDown",
                category: powerbi.TelemetryCategory.Verbose,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted({
                        endpoint: info.endpoint,
                        allEndpointDown: info.allEndpointDown
                    }, null, baseEvent.formatted());
                },
                info: info,
                loggers: telemetry.ApprovedResourceEndpointDownLoggers
            };
            return event;
        }
        function ApproveResourceLoadResourcePackage(resourcePackageName, parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            var baseEvent = telemetry.CustomerAction(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity), info = merge(baseEvent.info, {
                resourcePackageName: resourcePackageName
            }), event = {
                name: "PBI.ApproveResource.LoadResourcePackage",
                category: powerbi.TelemetryCategory.CustomerAction,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted({
                        resourcePackageName: info.resourcePackageName
                    }, null, baseEvent.formatted());
                },
                info: info,
                loggers: telemetry.ApproveResourceLoadResourcePackageLoggers
            };
            return event;
        }
        function VisualConsentRegister(visualType, parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            var baseEvent = telemetry.Verbose(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity), info = merge(baseEvent.info, {
                visualType: visualType
            }), event = {
                name: "PBI.VisualConsent.Register",
                category: powerbi.TelemetryCategory.Verbose,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted({
                        visualType: info.visualType
                    }, null, baseEvent.formatted());
                },
                info: info,
                loggers: telemetry.VisualConsentRegisterLoggers
            };
            return event;
        }
        function VisualConsentSet(visualType, userConsent, parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            var baseEvent = telemetry.CustomerAction(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity), info = merge(baseEvent.info, {
                visualType: visualType,
                userConsent: userConsent
            }), event = {
                name: "PBI.VisualConsent.Set",
                category: powerbi.TelemetryCategory.CustomerAction,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted({
                        visualType: info.visualType,
                        userConsent: info.userConsent
                    }, null, baseEvent.formatted());
                },
                info: info,
                loggers: telemetry.VisualConsentSetLoggers
            };
            return event;
        }
        function VisualConsentGet(visualTypes, parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            var baseEvent = telemetry.Verbose(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity), info = merge(baseEvent.info, {
                visualTypes: visualTypes
            }), event = {
                name: "PBI.VisualConsent.Get",
                category: powerbi.TelemetryCategory.Verbose,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted({
                        visualTypes: info.visualTypes
                    }, null, baseEvent.formatted());
                },
                info: info,
                loggers: telemetry.VisualConsentGetLoggers
            };
            return event;
        }
        function TrustedVisualLoad(requestedVisualTypes, actualVisualTypes, parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            var baseEvent = telemetry.Verbose(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity), info = merge(baseEvent.info, {
                requestedVisualTypes: requestedVisualTypes,
                actualVisualTypes: actualVisualTypes
            }), event = {
                name: "PBI.TrustedVisual.Load",
                category: powerbi.TelemetryCategory.Verbose,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted({
                        requestedVisualTypes: info.requestedVisualTypes,
                        actualVisualTypes: info.actualVisualTypes
                    }, null, baseEvent.formatted());
                },
                info: info,
                loggers: telemetry.TrustedVisualLoadLoggers
            };
            return event;
        }
        function TrustedVisualGetConsent(visualTypes, parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            var baseEvent = telemetry.Verbose(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity), info = merge(baseEvent.info, {
                visualTypes: visualTypes
            }), event = {
                name: "PBI.TrustedVisual.GetConsent",
                category: powerbi.TelemetryCategory.Verbose,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted({
                        visualTypes: info.visualTypes
                    }, null, baseEvent.formatted());
                },
                info: info,
                loggers: telemetry.TrustedVisualGetConsentLoggers
            };
            return event;
        }
        var generateGuid, Utility = jsCommon.Utility, merge = jsCommon.UnionExtensions.mergeUnionType;
        generateGuid = Utility ? Utility.generateGuid : Function.prototype, telemetry.ApprovedResourceFailLoaded = ApprovedResourceFailLoaded, 
        telemetry.ApprovedResourceEndpointDown = ApprovedResourceEndpointDown, telemetry.ApproveResourceLoadResourcePackage = ApproveResourceLoadResourcePackage, 
        telemetry.VisualConsentRegister = VisualConsentRegister, telemetry.VisualConsentSet = VisualConsentSet, 
        telemetry.VisualConsentGet = VisualConsentGet, telemetry.TrustedVisualLoad = TrustedVisualLoad, 
        telemetry.TrustedVisualGetConsent = TrustedVisualGetConsent;
    }(telemetry = powerbi.telemetry || (powerbi.telemetry = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var extensibility;
    !function(extensibility) {
        function createVisualApiAdapter(visualPlugin, creator, promiseFactory, telemetryService, moduleContext) {
            var visualAdapter = new VisualApiAdapter(visualPlugin, creator, promiseFactory, telemetryService, moduleContext);
            return new extensibility.VisualSafeExecutionWrapper(visualAdapter, visualPlugin, promiseFactory, telemetryService, visualAdapter.isPluginInError);
        }
        extensibility.visualApiVersions = [], extensibility.createVisualApiAdapter = createVisualApiAdapter;
        var VisualApiAdapter = function() {
            function VisualApiAdapter(plugin, creator, promiseFactory, telemetryService, module) {
                this.plugin = plugin, this.creator = creator, this.promiseFactory = promiseFactory, 
                this.telemetryService = telemetryService, this.module = module, this.isPluginInError = !1;
                var version = plugin.apiVersion, versionIndex = this.getVersionIndex(version);
                version ? versionIndex > -1 ? (this.apiVersionIndex = versionIndex, this.legacy = !1) : this.isPluginInError = !0 : this.legacy = !0;
            }
            return VisualApiAdapter.prototype.init = function(options) {
                if (options.element.empty(), options = powerbi.Prototype.inherit(options), options.visualAdapterHostServices = void 0, 
                this.legacy) this.visual = this.creator({
                    module: this.module
                }), this.visualLegacy.init(options); else {
                    var host = this.host = extensibility.visualApiVersions[this.apiVersionIndex].hostAdapter(options);
                    this.visual = this.creator({
                        element: options.element.get(0),
                        host: host,
                        module: this.module
                    }), this.overloadMethods();
                }
            }, VisualApiAdapter.prototype.update = function(options) {
                this.plugin.systemVisual || (options = powerbi.Prototype.inherit(options), options.visualDefinitionData = void 0, 
                options.dataTransforms = void 0), (options.type & powerbi.VisualUpdateType.Resize) === powerbi.VisualUpdateType.Resize && this.visualHasMethod("onResizing") ? (this.plugin.custom && this.visualHasMethod("update") && this.visualLegacy.update(options), 
                this.onResizing(options.viewport, options.resizeMode)) : this.visualHasMethod("update") ? this.visualLegacy.update(options) : ((!options.type || options.type & powerbi.VisualUpdateType.Data) && this.onDataChanged(_.pick(options, [ "dataViews", "operationKind" ])), 
                options.type & powerbi.VisualUpdateType.ViewMode && this.onViewModeChanged(options.viewMode));
            }, VisualApiAdapter.prototype.updateAsync = function(options) {
                return this.promiseFactory.resolve(this.update(options));
            }, VisualApiAdapter.prototype.destroy = function() {
                this.visualHasMethod("destroy") && this.visualLegacy.destroy();
            }, VisualApiAdapter.prototype.enumerateObjectInstances = function(options) {
                if (this.visualHasMethod("enumerateObjectInstances")) return this.visualLegacy.enumerateObjectInstances(options);
            }, VisualApiAdapter.prototype.enumerateObjectRepetition = function() {
                if (this.visualHasMethod("enumerateObjectRepetition")) return this.visualLegacy.enumerateObjectRepetition();
            }, VisualApiAdapter.prototype.enumerateObjectInstancesAsync = function(options) {
                return this.visualHasMethod("enumerateObjectInstancesAsync") ? this.visualAdapter.enumerateObjectInstancesAsync(options) : this.promiseFactory.resolve(this.enumerateObjectInstances(options));
            }, VisualApiAdapter.prototype.enumerateObjectRepetitionAsync = function() {
                return this.visualHasMethod("enumerateObjectRepetitionAsync") ? this.visualAdapter.enumerateObjectRepetitionAsync() : this.promiseFactory.resolve(this.enumerateObjectRepetition());
            }, Object.defineProperty(VisualApiAdapter.prototype, "sandbox", {
                get: function() {
                    return this.visualAdapter && this.visualAdapter.sandbox;
                },
                enumerable: !0,
                configurable: !0
            }), VisualApiAdapter.prototype.onResizing = function(finalViewport, resizeMode) {
                this.visualHasMethod("onResizing") && this.visualLegacy.onResizing(finalViewport, resizeMode);
            }, VisualApiAdapter.prototype.onDataChanged = function(options) {
                this.visualHasMethod("onDataChanged") && this.visualLegacy.onDataChanged(options);
            }, VisualApiAdapter.prototype.onViewModeChanged = function(viewMode) {
                this.visualHasMethod("onViewModeChanged") && this.visualLegacy.onViewModeChanged(viewMode);
            }, VisualApiAdapter.prototype.onClearSelection = function() {
                this.visualHasMethod("onClearSelection") && this.visualLegacy.onClearSelection();
            }, VisualApiAdapter.prototype.canResizeTo = function(viewport) {
                if (this.visualHasMethod("canResizeTo")) return this.visualLegacy.canResizeTo(viewport);
            }, VisualApiAdapter.prototype.unwrap = function() {
                return this.visual;
            }, Object.defineProperty(VisualApiAdapter.prototype, "visualNew", {
                get: function() {
                    if (!this.legacy) return this.visual;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(VisualApiAdapter.prototype, "visualLegacy", {
                get: function() {
                    if (this.legacy) return this.visual;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(VisualApiAdapter.prototype, "visualAdapter", {
                get: function() {
                    return this.visual;
                },
                enumerable: !0,
                configurable: !0
            }), VisualApiAdapter.prototype.visualHasMethod = function(methodName) {
                var visual = this.legacy ? this.visualLegacy : this.visualNew;
                return visual && _.isFunction(visual[methodName]);
            }, VisualApiAdapter.prototype.getVersionIndex = function(version) {
                if (version) for (var versionCount = extensibility.visualApiVersions.length, i = 0; i < versionCount; i++) if (extensibility.visualApiVersions[i].version === version) return i;
                return -1;
            }, VisualApiAdapter.prototype.overloadMethods = function() {
                var overloads = this.getCompiledOverloads();
                for (var key in overloads) this[key] = overloads[key];
            }, VisualApiAdapter.prototype.getCompiledOverloads = function() {
                for (var overloads = {}, versionIndex = this.apiVersionIndex, visualNew = this.visualNew, i = 0; i <= versionIndex; i++) {
                    var overloadFactory = extensibility.visualApiVersions[i].overloads;
                    _.isFunction(overloadFactory) && _.assign(overloads, overloadFactory(visualNew, this.host));
                }
                return overloads;
            }, VisualApiAdapter;
        }();
        extensibility.VisualApiAdapter = VisualApiAdapter;
    }(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var extensibility;
    !function(extensibility) {
        var visualPluginAdapter;
        !function(visualPluginAdapter) {
            function transformPlugin(plugin) {
                plugin.apiVersion ? transformPluginApi(plugin) : transformPluginLegacy(plugin);
            }
            function transformPluginApi(plugin) {
                transformCapabilities(plugin.capabilities);
            }
            function transformCapabilities(capabilities) {
                capabilities && (transformObjects(capabilities.objects), transformDataRoles(capabilities.dataRoles), 
                transformDataViewMappings(capabilities.dataViewMappings));
            }
            function transformObjects(objects) {
                for (var key in objects) {
                    var object = objects[key];
                    if (object) {
                        var properties = object.properties;
                        if (properties) for (var pKey in properties) {
                            var property = properties[pKey];
                            if (property) {
                                var propertyType = property.type;
                                propertyType && propertyType.enumeration && (propertyType.enumeration = powerbi.createEnumType(propertyType.enumeration));
                            }
                        }
                    }
                }
            }
            function transformDataRoles(dataRoles) {
                for (var key in dataRoles) {
                    var dataRole = dataRoles[key];
                    dataRole && dataRole.kind && (dataRole.kind = getVisualDataRoleKindFromString(dataRole.kind.toString()));
                }
            }
            function transformDataViewMappings(dataViewMappings) {
                for (var key in dataViewMappings) {
                    var dataViewMapping = dataViewMappings[key];
                    if (dataViewMapping) {
                        var conditions = dataViewMapping.conditions;
                        if (conditions) for (var cKey in conditions) {
                            var condition = conditions[cKey];
                            if (condition) for (var rKey in condition) {
                                var conditionRole = condition[rKey];
                                conditionRole && conditionRole.kind && (condition[rKey].kind = getVisualDataRoleKindFromString(conditionRole.kind.toString()));
                            }
                        }
                    }
                }
            }
            function getVisualDataRoleKindFromString(name) {
                switch (name.toLowerCase()) {
                  case "grouping":
                  case powerbi.VisualDataRoleKind.Grouping.toString():
                    return powerbi.VisualDataRoleKind.Grouping;

                  case "measure":
                  case powerbi.VisualDataRoleKind.Measure.toString():
                    return powerbi.VisualDataRoleKind.Measure;

                  case "groupingormeasure":
                  case powerbi.VisualDataRoleKind.GroupingOrMeasure.toString():
                    return powerbi.VisualDataRoleKind.GroupingOrMeasure;
                }
            }
            function transformPluginLegacy(plugin) {
                transformCapabilitiesLegacy(plugin.capabilities);
            }
            function transformCapabilitiesLegacy(capabilities) {
                capabilities && (transformObjectsLegacy(capabilities.objects), transformDataRolesLegacy(capabilities.dataRoles));
            }
            function transformObjectsLegacy(objects) {
                for (var key in objects) {
                    var object = objects[key];
                    if (object) {
                        object = objects[key] = _.mapValues(object, removedLocalizationValue);
                        var properties = object.properties;
                        if (properties) for (var pKey in properties) {
                            var property = properties[pKey];
                            if (property) {
                                property = properties[pKey] = _.mapValues(property, removedLocalizationValue);
                                var propertyType = property.type;
                                if (propertyType && propertyType.enumeration && _.isFunction(propertyType.enumeration.members)) {
                                    var delocalizedEnumMembers = propertyType.enumeration.members().map(function(v) {
                                        return _.mapValues(v, removedLocalizationValue);
                                    });
                                    propertyType.enumeration = powerbi.createEnumType(delocalizedEnumMembers);
                                }
                            }
                        }
                    }
                }
            }
            function transformDataRolesLegacy(dataRoles) {
                for (var key in dataRoles) {
                    var dataRole = dataRoles[key];
                    dataRole && (dataRoles[key] = _.mapValues(dataRole, removedLocalizationValue));
                }
            }
            function removedLocalizationValue(value, key) {
                return _.isString(value) || _.indexOf(localizedKeys, key) === -1 ? value : powerbi.data.getDisplayName(value, directStringResourceProvider);
            }
            var localizedKeys = [ "displayName", "description", "placeHolderText" ], directStringResourceProvider = {
                get: function(value) {
                    return value;
                },
                getOptional: function(value) {
                    return value;
                }
            };
            visualPluginAdapter.transformPlugin = transformPlugin;
        }(visualPluginAdapter = extensibility.visualPluginAdapter || (extensibility.visualPluginAdapter = {}));
    }(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var extensibility;
    !function(extensibility) {
        var VisualSafeExecutionWrapper = function() {
            function VisualSafeExecutionWrapper(wrappedVisual, visualPlugin, promiseFactory, telemetryService, isPluginInError, silent) {
                this.wrappedVisual = wrappedVisual, this.visualPlugin = visualPlugin, this.promiseFactory = promiseFactory, 
                this.telemetryService = telemetryService, this.isPluginInError = isPluginInError, 
                this.silent = silent, this.startTimeISO = new Date().toISOString();
            }
            return VisualSafeExecutionWrapper.prototype.init = function(options) {
                var _this = this;
                if (options && options.host && options.host.telemetry) {
                    var telemetry_1 = options.host.telemetry();
                    this.instanceId = telemetry_1 && telemetry_1.instanceId;
                }
                this.wrappedVisual.init && this.executeSafely(function() {
                    return _this.wrappedVisual.init(options);
                });
            }, VisualSafeExecutionWrapper.prototype.destroy = function() {
                var _this = this;
                this.wrappedVisual.destroy && this.executeSafely(function() {
                    return _this.wrappedVisual.destroy();
                });
            }, VisualSafeExecutionWrapper.prototype.update = function(options) {
                var _this = this;
                this.wrappedVisual.update && this.executeSafely(function() {
                    if (_this.wrappedVisual.update(options), _this.telemetryService && _this.startTimeISO) {
                        var endTimeISO = new Date().toISOString();
                        _this.telemetryService.logEvent(powerbi.telemetry.VisualApiUsage, _this.visualPlugin.name, _this.visualPlugin.apiVersion, !!_this.visualPlugin.custom, _this.visualPlugin.version, _this.instanceId, _this.startTimeISO, endTimeISO, void 0, _this.isPluginInError, powerbi.telemetry.ErrorSource.User, void 0), 
                        _this.startTimeISO = null;
                    }
                });
            }, VisualSafeExecutionWrapper.prototype.updateAsync = function(options) {
                return this.promiseFactory.resolve(this.update(options));
            }, VisualSafeExecutionWrapper.prototype.onResizing = function(finalViewport, resizeMode) {
                var _this = this;
                this.wrappedVisual.onResizing && this.executeSafely(function() {
                    return _this.wrappedVisual.onResizing(finalViewport, resizeMode);
                });
            }, VisualSafeExecutionWrapper.prototype.onDataChanged = function(options) {
                var _this = this;
                this.wrappedVisual.onDataChanged && this.executeSafely(function() {
                    return _this.wrappedVisual.onDataChanged(options);
                });
            }, VisualSafeExecutionWrapper.prototype.onViewModeChanged = function(viewMode) {
                var _this = this;
                this.wrappedVisual.onViewModeChanged && this.executeSafely(function() {
                    return _this.wrappedVisual.onViewModeChanged(viewMode);
                });
            }, VisualSafeExecutionWrapper.prototype.onClearSelection = function() {
                var _this = this;
                this.wrappedVisual.onClearSelection && this.executeSafely(function() {
                    return _this.wrappedVisual.onClearSelection();
                });
            }, VisualSafeExecutionWrapper.prototype.canResizeTo = function(viewport) {
                var _this = this;
                if (this.wrappedVisual.canResizeTo) return this.executeSafely(function() {
                    return _this.wrappedVisual.canResizeTo(viewport);
                });
            }, VisualSafeExecutionWrapper.prototype.enumerateObjectInstances = function(options) {
                var _this = this;
                if (this.wrappedVisual.enumerateObjectInstances) return this.executeSafely(function() {
                    return _this.wrappedVisual.enumerateObjectInstances(options);
                });
            }, VisualSafeExecutionWrapper.prototype.enumerateObjectRepetition = function() {
                var _this = this;
                if (this.wrappedVisual.enumerateObjectRepetition) return this.executeSafely(function() {
                    return _this.wrappedVisual.enumerateObjectRepetition();
                });
            }, VisualSafeExecutionWrapper.prototype.enumerateObjectInstancesAsync = function(options) {
                var _this = this;
                return this.visualAdapter.enumerateObjectInstancesAsync ? this.executeSafely(function() {
                    return _this.visualAdapter.enumerateObjectInstancesAsync(options);
                }) : this.promiseFactory.resolve(this.enumerateObjectInstances(options));
            }, VisualSafeExecutionWrapper.prototype.enumerateObjectRepetitionAsync = function() {
                var _this = this;
                return this.visualAdapter.enumerateObjectRepetitionAsync ? this.executeSafely(function() {
                    return _this.visualAdapter.enumerateObjectRepetitionAsync();
                }) : this.promiseFactory.resolve(this.enumerateObjectRepetition());
            }, Object.defineProperty(VisualSafeExecutionWrapper.prototype, "sandbox", {
                get: function() {
                    return this.visualAdapter && this.visualAdapter.sandbox;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(VisualSafeExecutionWrapper.prototype, "visualAdapter", {
                get: function() {
                    return this.wrappedVisual;
                },
                enumerable: !0,
                configurable: !0
            }), VisualSafeExecutionWrapper.prototype.unwrap = function() {
                var visual = this.wrappedVisual;
                return visual.unwrap ? visual.unwrap() : visual;
            }, VisualSafeExecutionWrapper.prototype.executeSafely = function(callback) {
                try {
                    return callback();
                } catch (exception) {
                    !this.silent, this.telemetryService && this.telemetryService.logEvent(powerbi.telemetry.VisualException, this.visualPlugin.name, !!this.visualPlugin.custom, this.visualPlugin.apiVersion, this.instanceId, exception.fileName, exception.lineNumber, exception.columnNumber, exception.stack, exception.message);
                }
            }, VisualSafeExecutionWrapper;
        }();
        extensibility.VisualSafeExecutionWrapper = VisualSafeExecutionWrapper;
    }(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var extensibility;
    !function(extensibility) {
        function VisualPlugin(options) {
            return function(constructor) {
                constructor.__transform__ = options.transform;
            };
        }
        extensibility.VisualPlugin = VisualPlugin;
    }(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var extensibility;
    !function(extensibility) {
        function createColorPalette(colors) {
            return new ColorPalette(colors);
        }
        extensibility.createColorPalette = createColorPalette;
        var ColorPalette = function() {
            function ColorPalette(colors) {
                this.colorPalette = {}, this.colorIndex = 0, this.colors = colors;
            }
            return ColorPalette.prototype.getColor = function(key) {
                var color = this.colorPalette[key];
                if (color) return color;
                var colors = this.colors;
                return color = this.colorPalette[key] = colors[this.colorIndex++], this.colorIndex >= colors.length && (this.colorIndex = 0), 
                color;
            }, ColorPalette.prototype.reset = function() {
                return this.colorIndex = 0, this;
            }, ColorPalette;
        }();
    }(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var extensibility;
    !function(extensibility) {
        var SelectionIdBuilder = function() {
            function SelectionIdBuilder() {}
            return SelectionIdBuilder.prototype.withCategory = function(categoryColumn, index) {
                return categoryColumn && categoryColumn.source && categoryColumn.source.queryName && categoryColumn.identity && (this.ensureDataMap()[categoryColumn.source.queryName] = [ categoryColumn.identity[index] ]), 
                this;
            }, SelectionIdBuilder.prototype.withSeries = function(seriesColumn, valueColumn) {
                return seriesColumn && seriesColumn.source && seriesColumn.source.queryName && valueColumn && (this.ensureDataMap()[seriesColumn.source.queryName] = [ valueColumn.identity ]), 
                this;
            }, SelectionIdBuilder.prototype.withMeasure = function(measureId) {
                return this.measure = measureId, this;
            }, SelectionIdBuilder.prototype.createSelectionId = function() {
                return powerbi.visuals.SelectionId.createWithSelectorForColumnAndMeasure(this.ensureDataMap(), this.measure);
            }, SelectionIdBuilder.prototype.ensureDataMap = function() {
                return this.dataMap || (this.dataMap = {}), this.dataMap;
            }, SelectionIdBuilder;
        }();
        extensibility.SelectionIdBuilder = SelectionIdBuilder;
    }(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var extensibility;
    !function(extensibility) {
        var SelectionManager = function() {
            function SelectionManager(options) {
                this.dataPointObjectName = "dataPoint", this.filterPropertyIdentifier = {
                    objectName: "general",
                    propertyName: "filter"
                }, this.hostServices = options.hostServices, this.selectedIds = [], this.promiseFactory = this.hostServices.promiseFactory();
            }
            return SelectionManager.prototype.select = function(selectionIds, multiSelect) {
                void 0 === multiSelect && (multiSelect = !1);
                var deferred = this.promiseFactory.defer();
                return selectionIds ? (selectionIds instanceof Array || (selectionIds = [ selectionIds ]), 
                this.hostServices.shouldRetainSelection() ? this.sendSelectionToHost(selectionIds) : (this.selectInternal(selectionIds, multiSelect), 
                this.sendSelectionToHost(this.selectedIds)), deferred.resolve(this.selectedIds), 
                deferred.promise) : (deferred.reject(), deferred.promise);
            }, SelectionManager.prototype.showContextMenu = function(selectionId, position) {
                var deferred = this.promiseFactory.defer();
                return this.sendContextMenuToHost(selectionId, position), deferred.resolve(null), 
                deferred.promise;
            }, SelectionManager.prototype.hasSelection = function() {
                return this.selectedIds.length > 0;
            }, SelectionManager.prototype.clear = function() {
                var deferred = this.promiseFactory.defer();
                return this.selectedIds = [], this.sendSelectionToHost([]), deferred.resolve(null), 
                deferred.promise;
            }, SelectionManager.prototype.getSelectionIds = function() {
                return this.selectedIds;
            }, SelectionManager.prototype.sendSelectionToHost = function(ids) {
                var dataPointObjectName = this.dataPointObjectName, selectArgs = {
                    visualObjects: _.chain(ids).filter(function(value) {
                        return value.hasIdentity();
                    }).map(function(value) {
                        return {
                            objectName: dataPointObjectName,
                            selectorsByColumn: value.getSelectorsByColumn()
                        };
                    }).value(),
                    selectors: void 0
                }, shouldInsertSelectors = !1;
                _.isEmpty(ids) || (shouldInsertSelectors = ids[0].getSelector() && !ids[0].getSelectorsByColumn()), 
                shouldInsertSelectors && (selectArgs.selectors = _.chain(ids).filter(function(value) {
                    return value.hasIdentity();
                }).map(function(value) {
                    return value.getSelector();
                }).value()), this.hostServices.onSelect(selectArgs);
            }, SelectionManager.prototype.sendContextMenuToHost = function(selectionId, position) {
                var selectors = SelectionManager.getSelectorsByColumn([ selectionId ]);
                if (!_.isEmpty(selectors)) {
                    var args = {
                        data: selectors,
                        position: position
                    };
                    this.hostServices.onContextMenu(args);
                }
            }, SelectionManager.prototype.selectInternal = function(selectionIds, multiSelect) {
                var _this = this;
                selectionIds.length < 1 || (selectionIds.length > 1 ? multiSelect ? this.selectedIds = selectionIds.filter(function(i) {
                    return !_this.selectedIds.some(function(o) {
                        return o.equals(i);
                    });
                }).concat(this.selectedIds.filter(function(i) {
                    return !selectionIds.some(function(o) {
                        return o.equals(i);
                    });
                })) : this.selectedIds = selectionIds : SelectionManager.containsSelection(this.selectedIds, selectionIds[0]) ? multiSelect ? this.selectedIds = this.selectedIds.filter(function(d) {
                    return !selectionIds[0].equals(d);
                }) : this.selectedIds = this.selectedIds.length > 1 ? selectionIds : [] : multiSelect ? this.selectedIds.push(selectionIds[0]) : this.selectedIds = selectionIds);
            }, SelectionManager.containsSelection = function(list, id) {
                return list.some(function(d) {
                    return id.equals(d);
                });
            }, SelectionManager.getSelectorsByColumn = function(selectionIds) {
                return _(selectionIds).filter(function(value) {
                    return value.hasIdentity;
                }).map(function(value) {
                    return value.getSelectorsByColumn();
                }).compact().value();
            }, SelectionManager.createChangeForFilterProperty = function(filterPropIdentifier, filter) {
                var properties = {}, instance = {
                    objectName: filterPropIdentifier.objectName,
                    selector: void 0,
                    properties: properties
                };
                return null == filter ? (properties[filterPropIdentifier.propertyName] = {}, {
                    remove: [ instance ]
                }) : (properties[filterPropIdentifier.propertyName] = filter, {
                    merge: [ instance ]
                });
            }, SelectionManager.prototype.getFilterFromSelectors = function() {
                if (this.hasSelection()) {
                    var selectors = _.chain(this.selectedIds).filter(function(value) {
                        return value.hasIdentity();
                    }).map(function(value) {
                        return value.getSelector();
                    }).value();
                    return powerbi.data.Selector.filterFromSelector(selectors, !1);
                }
            }, SelectionManager.prototype.applySelectionFilter = function() {
                this.hostServices.persistProperties(SelectionManager.createChangeForFilterProperty(this.filterPropertyIdentifier, this.getFilterFromSelectors()));
            }, SelectionManager;
        }();
        extensibility.SelectionManager = SelectionManager;
    }(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var extensibility;
    !function(extensibility) {
        function createTooltipService(options) {
            return new TooltipService(options);
        }
        extensibility.createTooltipService = createTooltipService;
        var TooltipService = function() {
            function TooltipService(options) {
                this.hostServices = options.hostServices, this.tooltipService = this.hostServices.tooltips();
            }
            return TooltipService.prototype.enabled = function() {
                return this.tooltipService && this.tooltipService.enabled();
            }, TooltipService.prototype.show = function(options) {
                if (this.enabled()) {
                    var args = {
                        coordinates: options.coordinates,
                        dataItems: options.dataItems,
                        isTouchEvent: options.isTouchEvent,
                        identities: extensibility.SelectionManager.getSelectorsByColumn(options.identities)
                    };
                    this.tooltipService.show(args);
                }
            }, TooltipService.prototype.move = function(options) {
                if (this.enabled()) {
                    var args = {
                        coordinates: options.coordinates,
                        dataItems: options.dataItems,
                        isTouchEvent: options.isTouchEvent,
                        identities: extensibility.SelectionManager.getSelectorsByColumn(options.identities)
                    };
                    this.tooltipService.move(args);
                }
            }, TooltipService.prototype.hide = function(options) {
                this.enabled() && this.tooltipService.hide(options);
            }, TooltipService;
        }();
    }(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var extensibility;
    !function(extensibility) {
        function createTelemetryService(options) {
            return new TelemetryService(options);
        }
        function convertVisualEventType(type) {
            switch (type) {
              case 3:
                return "VisualEventError";

              case 2:
                return "VisualEventTrace";

              case 0:
                return "VisualEventRenderStarted";

              case 1:
                return "VisualEventRenderCompleted";

              default:
                return;
            }
        }
        function convertStringToVisualEventType(type) {
            switch (type) {
              case "VisualEventError":
                return 3;

              case "VisualEventTrace":
                return 2;

              case "VisualEventRenderStarted":
                return 0;

              case "VisualEventRenderCompleted":
                return 1;

              default:
                return;
            }
        }
        extensibility.createTelemetryService = createTelemetryService;
        var TelemetryService = function() {
            function TelemetryService(options) {
                this.hostServices = options.hostServices, this.telemetryService = this.hostServices && this.hostServices.telemetry && this.hostServices.telemetry(), 
                this.instanceId = this.telemetryService && this.telemetryService.instanceId;
            }
            return TelemetryService.prototype.trace = function(type, payload) {
                this.telemetryService && this.telemetryService.trace(type, payload);
            }, TelemetryService;
        }();
        extensibility.convertVisualEventType = convertVisualEventType, extensibility.convertStringToVisualEventType = convertStringToVisualEventType;
    }(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var extensibility;
    !function(extensibility) {
        var legacy;
        !function(legacy) {
            function isOldSelectEventArgs(args) {
                var castArgs = args, argsNeedsToUpdateFromSelectors = null != castArgs.data || null != castArgs.selectors, argsHasNonArrayMetadata = _.any(castArgs.visualObjects, function(visualObject) {
                    return visualObject.selectorsByColumn && visualObject.selectorsByColumn.metadata && !_.isArray(visualObject.selectorsByColumn.metadata);
                });
                return argsNeedsToUpdateFromSelectors || argsHasNonArrayMetadata;
            }
            function getSelectorsByColumn(args) {
                var selectorsByColumnArray;
                if (args.data2) selectorsByColumnArray = args.data2; else {
                    if (!args.visualObjects) return [];
                    selectorsByColumnArray = _.map(args.visualObjects, function(visualObject) {
                        return visualObject.selectorsByColumn;
                    });
                }
                for (var _i = 0, selectorsByColumnArray_1 = selectorsByColumnArray; _i < selectorsByColumnArray_1.length; _i++) {
                    var selectorsByColumn = selectorsByColumnArray_1[_i], metadata = selectorsByColumn.metadata;
                    metadata && !_.isArray(metadata) && (selectorsByColumn.metadata = [ metadata ]);
                }
                return selectorsByColumnArray;
            }
            function getSelectors(args) {
                return null != args.selectors ? args.selectors : args.data ? args.data : args.visualObjects ? _.map(args.visualObjects, function(visualObject) {
                    return Selector.convertSelectorsByColumnToSelector(visualObject.selectorsByColumn);
                }) : args.data;
            }
            var Selector = powerbi.data.Selector;
            legacy.isOldSelectEventArgs = isOldSelectEventArgs, legacy.getSelectorsByColumn = getSelectorsByColumn, 
            legacy.getSelectors = getSelectors;
        }(legacy = extensibility.legacy || (extensibility.legacy = {}));
    }(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var extensibility;
    !function(extensibility) {
        var v100;
        !function(v100) {
            function convertLegacyUpdateType(options) {
                var type = options.type || powerbi.VisualUpdateType.Data;
                return type & powerbi.VisualUpdateType.Resize && 2 === options.resizeMode && (type |= powerbi.VisualUpdateType.ResizeEnd), 
                type;
            }
            v100.convertLegacyUpdateType = convertLegacyUpdateType;
            var overloadFactory = function(visual, host) {
                return {
                    update: function(options) {
                        visual.update && visual.update({
                            viewport: options.viewport,
                            dataViews: options.dataViews,
                            viewMode: options.viewMode,
                            type: convertLegacyUpdateType(options)
                        });
                    },
                    destroy: function() {
                        visual.destroy && visual.destroy();
                    },
                    enumerateObjectInstances: function(options) {
                        return visual.enumerateObjectInstances ? visual.enumerateObjectInstances(options) || [] : [];
                    }
                };
            }, hostAdapter = function(initOptions) {
                return {};
            };
            extensibility.visualApiVersions.push({
                version: "1.0.0",
                overloads: overloadFactory,
                hostAdapter: hostAdapter
            });
        }(v100 = extensibility.v100 || (extensibility.v100 = {}));
    }(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var extensibility;
    !function(extensibility) {
        var v110;
        !function(v110) {
            var overloadFactory = function(visual, host) {
                return {
                    update: function(options) {
                        if (visual.update) {
                            var updateOptions = {
                                viewport: options.viewport,
                                dataViews: options.dataViews,
                                viewMode: options.viewMode,
                                type: extensibility.v100.convertLegacyUpdateType(options)
                            }, transform = visual.constructor.__transform__;
                            _.isFunction(transform) ? visual.update(updateOptions, transform(updateOptions.dataViews)) : visual.update(updateOptions);
                        }
                    }
                };
            }, hostAdapter = function(initOptions) {
                return {
                    createSelectionIdBuilder: function() {
                        return new powerbi.visuals.SelectionIdBuilder();
                    },
                    createSelectionManager: function() {
                        return new extensibility.SelectionManager({
                            hostServices: initOptions.host
                        });
                    },
                    colors: powerbi.visuals.DefaultColorManager.getDefaultColors()
                };
            };
            extensibility.visualApiVersions.push({
                version: "1.1.0",
                overloads: overloadFactory,
                hostAdapter: hostAdapter
            });
        }(v110 = extensibility.v110 || (extensibility.v110 = {}));
    }(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var extensibility;
    !function(extensibility) {
        var v120;
        !function(v120) {
            var overloadFactory = function(visual, host) {
                return {
                    update: function(options) {
                        if (visual.update) {
                            var updateOptions = {
                                viewport: options.viewport,
                                dataViews: options.dataViews,
                                viewMode: options.viewMode,
                                type: extensibility.v100.convertLegacyUpdateType(options)
                            };
                            host.colorPalette.reset();
                            var transform = visual.constructor.__transform__;
                            _.isFunction(transform) ? visual.update(updateOptions, transform(updateOptions.dataViews)) : visual.update(updateOptions);
                        }
                    }
                };
            }, hostAdapter = function(initOptions) {
                return {
                    createSelectionIdBuilder: function() {
                        return new powerbi.visuals.SelectionIdBuilder();
                    },
                    createSelectionManager: function() {
                        return new extensibility.SelectionManager({
                            hostServices: initOptions.host
                        });
                    },
                    colorPalette: extensibility.createColorPalette(powerbi.visuals.DefaultColorManager.getDefaultColors()),
                    persistProperties: function(changes) {
                        return initOptions.host.persistProperties(changes);
                    }
                };
            };
            extensibility.visualApiVersions.push({
                version: "1.2.0",
                overloads: overloadFactory,
                hostAdapter: hostAdapter
            });
        }(v120 = extensibility.v120 || (extensibility.v120 = {}));
    }(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var extensibility;
    !function(extensibility) {
        var v130;
        !function(v130) {
            var hostAdapter = function(initOptions) {
                return {
                    createSelectionIdBuilder: function() {
                        return new powerbi.visuals.SelectionIdBuilder();
                    },
                    createSelectionManager: function() {
                        return new extensibility.SelectionManager({
                            hostServices: initOptions.host
                        });
                    },
                    colorPalette: extensibility.createColorPalette(powerbi.visuals.DefaultColorManager.getDefaultColors()),
                    persistProperties: function(changes) {
                        return initOptions.host.persistProperties(changes);
                    },
                    tooltipService: extensibility.createTooltipService({
                        hostServices: initOptions.host
                    })
                };
            };
            extensibility.visualApiVersions.push({
                version: "1.3.0",
                hostAdapter: hostAdapter
            });
        }(v130 = extensibility.v130 || (extensibility.v130 = {}));
    }(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var extensibility;
    !function(extensibility) {
        var v140;
        !function(v140) {
            var hostAdapter = function(initOptions) {
                return {
                    createSelectionIdBuilder: function() {
                        return new powerbi.visuals.SelectionIdBuilder();
                    },
                    createSelectionManager: function() {
                        return new extensibility.SelectionManager({
                            hostServices: initOptions.host
                        });
                    },
                    colorPalette: extensibility.createColorPalette(powerbi.visuals.DefaultColorManager.getDefaultColors()),
                    persistProperties: function(changes) {
                        return initOptions.host.persistProperties(changes);
                    },
                    tooltipService: extensibility.createTooltipService({
                        hostServices: initOptions.host
                    }),
                    locale: initOptions.host.locale()
                };
            };
            extensibility.visualApiVersions.push({
                version: "1.4.0",
                hostAdapter: hostAdapter
            });
        }(v140 = extensibility.v140 || (extensibility.v140 = {}));
    }(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var extensibility;
    !function(extensibility) {
        var v150;
        !function(v150) {
            var hostAdapter = function(initOptions) {
                return {
                    createSelectionIdBuilder: function() {
                        return new powerbi.visuals.SelectionIdBuilder();
                    },
                    createSelectionManager: function() {
                        return new extensibility.SelectionManager({
                            hostServices: initOptions.host
                        });
                    },
                    colorPalette: extensibility.createColorPalette(powerbi.visuals.DefaultColorManager.getDefaultColors()),
                    persistProperties: function(changes) {
                        return initOptions.host.persistProperties(changes);
                    },
                    tooltipService: extensibility.createTooltipService({
                        hostServices: initOptions.host
                    }),
                    locale: initOptions.host.locale(),
                    allowInteractions: !(!initOptions || !initOptions.interactivity) && initOptions.interactivity.isVisualInteractive
                };
            };
            extensibility.visualApiVersions.push({
                version: "1.5.0",
                hostAdapter: hostAdapter
            });
        }(v150 = extensibility.v150 || (extensibility.v150 = {}));
    }(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var extensibility;
    !function(extensibility) {
        var v160;
        !function(v160) {
            var overloadFactory = function(visual, host) {
                return {
                    update: function(options) {
                        if (visual.update) {
                            var updateOptions = {
                                viewport: options.viewport,
                                dataViews: options.dataViews,
                                viewMode: options.viewMode,
                                editMode: options.editMode,
                                type: extensibility.v100.convertLegacyUpdateType(options)
                            };
                            host.colorPalette.reset();
                            var transform = visual.constructor.__transform__;
                            _.isFunction(transform) ? visual.update(updateOptions, transform(updateOptions.dataViews)) : visual.update(updateOptions);
                        }
                    }
                };
            }, hostAdapter = function(initOptions) {
                return {
                    createSelectionIdBuilder: function() {
                        return new powerbi.visuals.SelectionIdBuilder();
                    },
                    createSelectionManager: function() {
                        return new extensibility.SelectionManager({
                            hostServices: initOptions.host
                        });
                    },
                    colorPalette: extensibility.createColorPalette(powerbi.visuals.DefaultColorManager.getDefaultColors()),
                    persistProperties: function(changes) {
                        return initOptions.host.persistProperties(changes);
                    },
                    tooltipService: extensibility.createTooltipService({
                        hostServices: initOptions.host
                    }),
                    locale: initOptions.host.locale(),
                    allowInteractions: !(!initOptions || !initOptions.interactivity) && initOptions.interactivity.isVisualInteractive
                };
            };
            extensibility.visualApiVersions.push({
                version: "1.6.0",
                overloads: overloadFactory,
                hostAdapter: hostAdapter
            });
        }(v160 = extensibility.v160 || (extensibility.v160 = {}));
    }(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var extensibility;
    !function(extensibility) {
        var v170;
        !function(v170) {
            var hostAdapter = function(initOptions) {
                return {
                    createSelectionIdBuilder: function() {
                        return new powerbi.visuals.SelectionIdBuilder();
                    },
                    createSelectionManager: function() {
                        return new extensibility.SelectionManager({
                            hostServices: initOptions.host
                        });
                    },
                    colorPalette: extensibility.createColorPalette(powerbi.visuals.DefaultColorManager.getDefaultColors()),
                    persistProperties: function(changes) {
                        return initOptions.host.persistProperties(changes);
                    },
                    tooltipService: extensibility.createTooltipService({
                        hostServices: initOptions.host
                    }),
                    telemetry: extensibility.createTelemetryService({
                        hostServices: initOptions.host
                    }),
                    locale: initOptions.host.locale(),
                    allowInteractions: !(!initOptions || !initOptions.interactivity) && initOptions.interactivity.isVisualInteractive,
                    applyJsonFilter: function(filter, objectName, propertyName) {
                        return initOptions.host.applyJsonFilter(filter, objectName, propertyName);
                    }
                };
            };
            extensibility.visualApiVersions.push({
                version: "1.7.0",
                hostAdapter: hostAdapter
            });
        }(v170 = extensibility.v170 || (extensibility.v170 = {}));
    }(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var extensibility;
    !function(extensibility) {
        var v180;
        !function(v180) {
            var hostAdapter = function(initOptions) {
                return {
                    createSelectionIdBuilder: function() {
                        return new powerbi.visuals.SelectionIdBuilder();
                    },
                    createSelectionManager: function() {
                        return new extensibility.SelectionManager({
                            hostServices: initOptions.host
                        });
                    },
                    colorPalette: extensibility.createColorPalette(powerbi.visuals.DefaultColorManager.getDefaultColors()),
                    persistProperties: function(changes) {
                        return initOptions.host.persistProperties(changes);
                    },
                    tooltipService: extensibility.createTooltipService({
                        hostServices: initOptions.host
                    }),
                    telemetry: extensibility.createTelemetryService({
                        hostServices: initOptions.host
                    }),
                    locale: initOptions.host.locale(),
                    allowInteractions: !(!initOptions || !initOptions.interactivity) && initOptions.interactivity.isVisualInteractive,
                    applyJsonFilter: function(filter, objectName, propertyName) {
                        return initOptions.host.applyJsonFilter(filter, objectName, propertyName);
                    },
                    launchUrl: function(url) {
                        return initOptions.host.launchUrl(url);
                    },
                    instanceId: initOptions.host.instanceId
                };
            };
            extensibility.visualApiVersions.push({
                version: "1.8.0",
                hostAdapter: hostAdapter
            });
        }(v180 = extensibility.v180 || (extensibility.v180 = {}));
    }(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var extensibility;
    !function(extensibility) {
        var v190;
        !function(v190) {
            var hostAdapter = function(initOptions) {
                return {
                    createSelectionIdBuilder: function() {
                        return new powerbi.visuals.SelectionIdBuilder();
                    },
                    createSelectionManager: function() {
                        return new extensibility.SelectionManager({
                            hostServices: initOptions.host
                        });
                    },
                    colorPalette: extensibility.createColorPalette(powerbi.visuals.DefaultColorManager.getDefaultColors()),
                    persistProperties: function(changes) {
                        return initOptions.host.persistProperties(changes);
                    },
                    tooltipService: extensibility.createTooltipService({
                        hostServices: initOptions.host
                    }),
                    telemetry: extensibility.createTelemetryService({
                        hostServices: initOptions.host
                    }),
                    locale: initOptions.host.locale(),
                    allowInteractions: !(!initOptions || !initOptions.interactivity) && initOptions.interactivity.isVisualInteractive,
                    applyJsonFilter: function(filter, objectName, propertyName, action) {
                        return initOptions.host.applyJsonFilter(filter, objectName, propertyName, action);
                    },
                    launchUrl: function(url) {
                        return initOptions.host.launchUrl(url);
                    },
                    instanceId: initOptions.host.instanceId,
                    refreshHostData: function() {
                        return initOptions.host.refreshHostData();
                    }
                };
            };
            extensibility.visualApiVersions.push({
                version: "1.9.0",
                hostAdapter: hostAdapter
            });
        }(v190 = extensibility.v190 || (extensibility.v190 = {}));
    }(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
}(powerbi || (powerbi = {}));