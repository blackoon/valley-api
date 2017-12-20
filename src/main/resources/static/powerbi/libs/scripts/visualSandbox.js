"use strict";

var powerbi;

!function(powerbi) {
    var visualSandbox;
    !function(visualSandbox) {
        function getResourceLoaderUrl() {
            return window.resourceLoaderUrl || "/explore/resourcePackageItem/";
        }
        function createJQueryResourceItemProxy(promiseFactory) {
            return new ResourceItemProxy(promiseFactory);
        }
        visualSandbox.getResourceLoaderUrl = getResourceLoaderUrl, visualSandbox.createJQueryResourceItemProxy = createJQueryResourceItemProxy;
        var ResourceItemProxy = function() {
            function ResourceItemProxy(promiseFactory) {
                this.promiseFactory = promiseFactory;
            }
            return ResourceItemProxy.prototype.get = function(resourcePackageId, name, path) {
                var deferred = this.promiseFactory.defer(), clusterUri = window.clusterUri, accessToken = window.powerBIAccessToken;
                top && top.powerBIAccessToken && (accessToken = top.powerBIAccessToken);
                var resourceLoaderUri = getResourceLoaderUrl(), headers = {
                    authorization: "Bearer " + accessToken
                };
                window.isAnonymousEmbed && (clusterUri = window.clusterApiUri, resourceLoaderUri = window.resourceLoaderUrl + resourcePackageId + "/", 
                headers["X-PowerBI-ResourceKey"] = window.powerBIResourceKey);
                var resourceToLoad = clusterUri + resourceLoaderUri + encodeURIComponent(path), ajaxSettings = {
                    url: resourceToLoad,
                    headers: headers
                };
                return $.ajax(ajaxSettings).then(function(data) {
                    return deferred.resolve(data);
                }, function(err) {
                    return deferred.reject(err);
                }), deferred.promise;
            }, ResourceItemProxy.prototype.getBlob = function(resourcePackageId, name, path) {
                return powerbi.createJQueryPromiseFactory().reject();
            }, ResourceItemProxy;
        }();
    }(visualSandbox = powerbi.visualSandbox || (powerbi.visualSandbox = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualSandbox;
    !function(visualSandbox) {
        function createResourceLoaderHost() {
            var promiseFactory = powerbi.createJQueryPromiseFactory(), resourceProvider = {
                get: function(key) {
                    return key;
                },
                getOptional: function(key) {
                    return key;
                }
            }, services = {
                messageProxy: visualHost.createWindowMessageProxy(promiseFactory, window.parent),
                promiseFactory: promiseFactory,
                resourceProvider: resourceProvider
            };
            return new ResourceLoaderHost(services);
        }
        var visualHost = powerbi.visualHost;
        visualSandbox.createResourceLoaderHost = createResourceLoaderHost;
        var ResourceLoaderHost = function() {
            function ResourceLoaderHost(services) {
                var _this = this;
                this.messageProxy = services.messageProxy, this.promiseFactory = services.promiseFactory, 
                this.resourceProvider = services.resourceProvider, this.messageProxy.on(visualHost.events.WindowMessageProxyMessageEvent, function(e) {
                    return _this.onMessageReceived(e);
                });
            }
            return ResourceLoaderHost.prototype.onMessageReceived = function(e) {
                switch (e.message.eventName) {
                  case "loadVisualPluginWithContent":
                    return this.loadVisualPluginWithContent.apply(this, e.message.arguments);
                }
            }, ResourceLoaderHost.prototype.loadVisualPluginWithContent = function(mappedPluginNameAndContent) {
                var deferred = this.promiseFactory.defer(), name = mappedPluginNameAndContent.pluginName, mappedPluginContent = mappedPluginNameAndContent.mappedPluginContent, jsContent = mappedPluginContent[0].content, cssContent = mappedPluginContent[1].content;
                try {
                    visualHost.resourceInjector.injectJsCode(name, jsContent), visualHost.resourceInjector.injectCssCode(name, cssContent);
                    var plugin = powerbi.visuals.plugins[name];
                    plugin.iconUrl = visualHost.visualPluginServiceHelpers.getPluginIconUrl(name), plugin.content = {
                        js: jsContent,
                        css: cssContent,
                        iconBase64: plugin.iconUrl
                    }, powerbi.extensibility.visualPluginAdapter.transformPlugin(plugin), plugin.capabilities.objects = powerbi.data.services.DataViewObjectDescriptorSerializer.serialize(plugin.capabilities.objects, this.resourceProvider), 
                    deferred.resolve(plugin);
                } catch (err) {
                    deferred.reject(err);
                }
                return deferred.promise;
            }, ResourceLoaderHost;
        }();
        visualSandbox.ResourceLoaderHost = ResourceLoaderHost;
    }(visualSandbox = powerbi.visualSandbox || (powerbi.visualSandbox = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualSandbox;
    !function(visualSandbox) {
        function createSandboxHost(element, isolate) {
            void 0 === isolate && (isolate = !1);
            var promiseFactory = powerbi.createJQueryPromiseFactory(), messageProxy = powerbi.visualHost.createWindowMessageProxy(promiseFactory, window.parent), resourceProvider = {
                get: function(name) {
                    return name;
                },
                getOptional: function(name) {
                    return name;
                }
            };
            visualSandbox.SandboxVisualHostServices.initialize();
            var resourceLoaderConstructionOptions = {
                promiseFactory: promiseFactory
            }, instanceId = QueryStringUtil.getQueryStringValue("instanceId"), telemetryService = visualSandbox.createSandboxTelemetryProxyService(messageProxy), services = {
                $element: element,
                hostServices: visualSandbox.createVisualHostServices(messageProxy, instanceId),
                dataProxy: createDataProxy(promiseFactory, telemetryService),
                promiseFactory: promiseFactory,
                messageProxy: messageProxy,
                resourceLoader: powerbi.visualHost.createResourceLoader(resourceLoaderConstructionOptions, null),
                resourceProvider: resourceProvider,
                telemetryProxyService: telemetryService,
                instanceId: instanceId
            };
            return new SandboxHost(services, isolate);
        }
        function createDataProxy(promiseFactory, telemetryService) {
            var plugins = {
                dsr: {
                    name: "dsr",
                    reader: function(h) {
                        return new powerbi.data.dsr.DsrDataReader(h, {
                            execute: function() {
                                return promiseFactory.reject();
                            }
                        });
                    }
                }
            }, hostServices = {
                promiseFactory: function() {
                    return promiseFactory;
                }
            }, dataReaderProvider = powerbi.data.createDataReaderProvider(powerbi.data.createDataReaderFactory(plugins, {}), hostServices);
            return powerbi.data.createDataProxy(promiseFactory, dataReaderProvider, telemetryService);
        }
        var DataViewMerger = powerbi.data.segmentation.DataViewMerger, DataViewObjectDescriptorSerializer = powerbi.data.services.DataViewObjectDescriptorSerializer, VisualObjectInstanceSerializer = powerbi.visualHost.services.VisualObjectInstanceSerializer, VisualObjectRepetitionSerializer = powerbi.visualHost.services.VisualObjectRepetitionSerializer, VisualStyleSerializer = powerbi.visualHost.VisualStyleSerializer, createVisualApiAdapter = powerbi.extensibility.createVisualApiAdapter, QueryStringUtil = jsCommon.QueryStringUtil;
        visualSandbox.relayMouseEvents = [ "click", "mouseup", "MSPointerUp", "pointerup" ], 
        visualSandbox.relayTouchEvents = [ "tap", "touchend", "touchcancel" ], visualSandbox.relayUIEvents = visualSandbox.relayMouseEvents.concat(visualSandbox.relayTouchEvents), 
        visualSandbox.relayUIEventProps = [ "type", "bubbles", "which", "buttons", "button", "ctrlKey", "altKey", "metaKey", "shiftKey", "x", "y", "clientX", "clientY", "pageX", "pageY", "movementX", "movementY", "layerX", "layerY", "changedTouches" ], 
        visualSandbox.createSandboxHost = createSandboxHost;
        var SandboxHost = function() {
            function SandboxHost(services, isolate) {
                void 0 === isolate && (isolate = !1);
                var _this = this;
                this.isolate = isolate, this.isVisualInitialized = !1, this.messageQueue = [], this.relayUIEventListener = function(e) {
                    var DOMEvent = _.pick(e.originalEvent, visualSandbox.relayUIEventProps), message = {
                        eventName: "onRelayUIEvent",
                        arguments: [ DOMEvent ]
                    };
                    _this.messageProxy.postMessage(message);
                }, this.container = services.$element, this.hostServices = services.hostServices, 
                this.dataProxy = services.dataProxy, this.promiseFactory = services.promiseFactory, 
                this.messageProxy = services.messageProxy, this.resourceLoader = services.resourceLoader, 
                this.resourceProvider = services.resourceProvider, this.telemetryProxyService = services.telemetryProxyService, 
                this.messageProxy.on(powerbi.visualHost.events.WindowMessageProxyMessageEvent, function(e) {
                    return _this.onMessageReceived(e);
                });
            }
            return Object.defineProperty(SandboxHost.prototype, "visual", {
                get: function() {
                    return this._visual;
                },
                enumerable: !0,
                configurable: !0
            }), SandboxHost.prototype.init = function(options) {
                var initOptions = {
                    animation: options.animation,
                    element: this.container,
                    host: this.hostServices,
                    interactivity: options.interactivity,
                    style: VisualStyleSerializer.deserializeVisualStyle(options.style),
                    viewport: options.viewport
                };
                this.attachRelayUIEventListener(), this.attachWindowResizeListener(), this.visual.init(initOptions);
            }, SandboxHost.prototype.destroy = function() {
                this.detachRelayUIEventListener(), this.detachWindowResizeListener(), this.messageProxy.off(powerbi.visualHost.events.WindowMessageProxyMessageEvent), 
                this.messageProxy.destroy(), this.visual && this.visual.destroy && this.visual.destroy();
            }, SandboxHost.prototype.categoriesExists = function(visualUpdateOptions) {
                return !!(visualUpdateOptions && visualUpdateOptions.dataViews && visualUpdateOptions.dataViews.length > 0 && visualUpdateOptions.dataViews[0].categorical && visualUpdateOptions.dataViews[0].categorical.categories && visualUpdateOptions.dataViews[0].categorical.categories.length > 0 && visualUpdateOptions.dataViews[0].categorical.categories[0] && visualUpdateOptions.dataViews[0].categorical.categories[0].values);
            }, SandboxHost.prototype.getHostCategoriesValues = function(categoriesValues, visualUpdateOptions, isCategoryDate) {
                try {
                    if (categoriesValues) {
                        if (isCategoryDate) for (var i = 0; i < categoriesValues.length; i++) categoriesValues[i] && (categoriesValues[i] = new Date(categoriesValues[i]));
                        visualUpdateOptions.dataViews[0].categorical.categories[0].values = categoriesValues;
                    }
                } catch (e) {
                    this.sendError(e);
                }
                return visualUpdateOptions;
            }, SandboxHost.prototype.update = function(options) {
                var dataTransforms, _this = this;
                options.dataTransforms && (dataTransforms = powerbi.data.services.DataViewTransformActionsSerializer.deserializeDataViewTransformActions(options.dataTransforms, this.plugin.capabilities.objects || {})), 
                this.transformDataViewSource(options.dataViewSource, dataTransforms, !0).then(function(result) {
                    var visualUpdateOptions = _this.lastVisualUpdateOptions = {
                        dataViews: result.dataViews,
                        suppressAnimations: options.suppressAnimations,
                        viewMode: options.viewMode,
                        editMode: options.editMode,
                        viewport: options.viewport,
                        type: options.type,
                        operationKind: powerbi.VisualDataChangeOperationKind.Create,
                        resizeMode: options.resizeMode,
                        isInFocus: options.isInFocus
                    };
                    _this.categoriesExists(visualUpdateOptions) && (visualUpdateOptions = _this.getHostCategoriesValues(options.categoriesValues, visualUpdateOptions, options.isCategoryDate)), 
                    _this.visual.update(visualUpdateOptions), _this.sendUpdateResult();
                }).catch(function(err) {
                    return _this.sendError(err);
                });
            }, SandboxHost.prototype.updateWithCachedData = function(options) {
                var dataTransforms;
                options.dataTransforms && (dataTransforms = powerbi.data.services.DataViewTransformActionsSerializer.deserializeDataViewTransformActions(options.dataTransforms, this.plugin.capabilities.objects || {})), 
                this.lastDataViewTransformApplyOptions.transforms = dataTransforms;
                var dataViews = powerbi.data.DataViewTransform.apply(this.lastDataViewTransformApplyOptions), visualUpdateOptions = this.lastVisualUpdateOptions = {
                    dataViews: dataViews,
                    suppressAnimations: options.suppressAnimations,
                    viewMode: options.viewMode,
                    editMode: options.editMode,
                    viewport: options.viewport,
                    type: options.type,
                    operationKind: powerbi.VisualDataChangeOperationKind.Create,
                    resizeMode: options.resizeMode,
                    isInFocus: options.isInFocus
                };
                this.categoriesExists(visualUpdateOptions) && (visualUpdateOptions = this.getHostCategoriesValues(options.categoriesValues, visualUpdateOptions, options.isCategoryDate)), 
                this.visual.update(visualUpdateOptions), this.sendUpdateResult();
            }, SandboxHost.prototype.loadResourcePackage = function(resourcePackage) {
                var _this = this;
                this.resourceLoader.loadVisualPlugin(resourcePackage).then(function(plugin) {
                    _this.plugin = plugin, _this.createAdapter();
                }).catch(function() {
                    var error = new Error("Unable to load plugin, resource package id: " + resourcePackage.id);
                    return _this.sendError(error);
                });
            }, SandboxHost.prototype.createAdapter = function() {
                var plugin = this.plugin;
                if (this.container.addClass("visual-" + plugin.name), this._visual = createVisualApiAdapter(plugin, plugin.create, this.promiseFactory, this.telemetryProxyService), 
                !plugin || !this.visual) {
                    var error = new Error("Unable to create visual from plugin " + plugin.name);
                    return this.sendError(error);
                }
                this.flushQueue(), this.isVisualInitialized = !0, this.sendSandboxReady();
            }, SandboxHost.prototype.loadWithoutResourcePackage = function(plugin) {
                var content = plugin.content;
                powerbi.visualHost.resourceInjector.injectJsCode(plugin.name, content.js, this.isolate), 
                powerbi.visualHost.resourceInjector.injectCssCode(plugin.name, content.css), this.plugin = powerbi.visuals.plugins[plugin.name], 
                plugin.apiVersion && (this.plugin.iconUrl = plugin.iconUrl, this.plugin.capabilities = plugin.capabilities), 
                powerbi.extensibility.visualPluginAdapter.transformPlugin(this.plugin), this.createAdapter();
            }, SandboxHost.prototype.enumerateObjectInstances = function(options) {
                if (this.visual.enumerateObjectInstances) {
                    var visualObjectInstances = this.visual.enumerateObjectInstances(options);
                    if (visualObjectInstances) {
                        var visualObjectEnumeration = visualObjectInstances;
                        return visualObjectEnumeration && visualObjectEnumeration.instances ? {
                            instances: VisualObjectInstanceSerializer.serialize(visualObjectEnumeration.instances),
                            containers: visualObjectEnumeration.containers ? VisualObjectInstanceSerializer.serializeContainers(visualObjectEnumeration.containers, this.resourceProvider) : null
                        } : VisualObjectInstanceSerializer.serialize(visualObjectInstances);
                    }
                }
            }, SandboxHost.prototype.enumerateObjectRepetition = function() {
                if (this.visual.enumerateObjectRepetition) {
                    var visualObjectRepetition = this.visual.enumerateObjectRepetition();
                    return visualObjectRepetition ? VisualObjectRepetitionSerializer.serialize(visualObjectRepetition) : void 0;
                }
            }, SandboxHost.prototype.sendUpdateResult = function() {
                var containerChildCount = this.container.children("*").length, message = {
                    eventName: "onUpdateResult",
                    arguments: [ containerChildCount ]
                };
                this.messageProxy.postMessage(message);
            }, SandboxHost.prototype.sendSandboxReady = function() {
                var capabilities = this.plugin.capabilities;
                capabilities.objects && (capabilities.objects = DataViewObjectDescriptorSerializer.serialize(this.plugin.capabilities.objects, this.resourceProvider));
                var proxyPlugin = {
                    name: this.plugin.name,
                    watermarkKey: this.plugin.watermarkKey,
                    capabilities: capabilities,
                    class: this.plugin.class,
                    iconUrl: this.plugin.iconUrl,
                    custom: !0,
                    create: function() {
                        return null;
                    }
                }, message = {
                    eventName: "onPluginReady",
                    arguments: [ proxyPlugin ]
                };
                this.messageProxy.postMessage(message);
            }, SandboxHost.prototype.flushQueue = function() {
                for (;this.messageQueue.length > 0; ) {
                    var message = this.messageQueue.shift();
                    this.executeMessage(message);
                }
            }, SandboxHost.prototype.sendError = function(error, originMessage) {
                var message = {
                    eventName: "onError",
                    arguments: [],
                    error: {
                        id: originMessage ? originMessage.id : null,
                        eventName: originMessage ? originMessage.eventName : null,
                        name: error.name,
                        message: error.message,
                        pluginName: this.plugin.name
                    }
                };
                this.messageProxy.postMessage(message);
            }, SandboxHost.prototype.onMessageReceived = function(e) {
                return this.isVisualInitialized || "loadResourcePackage" === e.message.eventName || "loadWithoutResourcePackage" === e.message.eventName ? this.executeMessage(e.message) : void this.messageQueue.push(e.message);
            }, SandboxHost.prototype.executeMessage = function(message) {
                try {
                    if ($.isFunction(this[message.eventName])) return this[message.eventName].apply(this, message.arguments);
                    if (this.visual && $.isFunction(this.visual[message.eventName])) return this.visual[message.eventName].apply(this.visual, message.arguments);
                } catch (ex) {
                    this.sendError(ex, message);
                }
            }, SandboxHost.prototype.transformDataViewSource = function(dataViewSource, dataTransforms, bypassConcatenation) {
                var _this = this, deferred = this.promiseFactory.defer(), createDataViewPromise = dataViewSource ? this.createDataView(dataViewSource) : this.promiseFactory.resolve({
                    dataView: null
                });
                return createDataViewPromise.then(function(result) {
                    var dataViews = powerbi.data.DataViewTransform.apply(_this.lastDataViewTransformApplyOptions = {
                        prototype: result.dataView,
                        objectDescriptors: _this.plugin.capabilities ? _this.plugin.capabilities.objects : void 0,
                        dataViewMappings: _this.plugin.capabilities ? _this.plugin.capabilities.dataViewMappings : void 0,
                        dataRoles: _this.plugin.capabilities ? _this.plugin.capabilities.dataRoles : void 0,
                        drillCapabilities: _this.plugin.capabilities && _this.plugin.capabilities.drilldown,
                        transforms: dataTransforms,
                        colorAllocatorFactory: powerbi.visuals.createColorAllocatorFactory(),
                        bypassConcatenation: bypassConcatenation
                    });
                    deferred.resolve({
                        dataViews: dataViews
                    });
                }).catch(function(err) {
                    return _this.sendError(err);
                }), deferred.promise;
            }, SandboxHost.prototype.createDataView = function(dataViewSource) {
                var _this = this, deferred = this.promiseFactory.defer(), options = {
                    type: dataViewSource.type,
                    query: {
                        dataSources: null,
                        command: dataViewSource.data
                    }
                };
                return this.dataProxy.execute(options).then(function(result) {
                    var dataView = result && result.dataReaderResult ? result.dataReaderResult.dataView : null, validation = powerbi.DataViewAnalysis.validateAndReshape(dataView, _this.plugin.capabilities ? _this.plugin.capabilities.dataViewMappings : null);
                    deferred.resolve({
                        dataView: validation.dataView
                    });
                }).catch(function(err) {
                    return _this.sendError(err);
                }), deferred.promise;
            }, SandboxHost.prototype.attachWindowResizeListener = function() {
                $(window).on("resize", this.windowResizeListener.bind(this)), $(window).trigger("resize");
            }, SandboxHost.prototype.detachWindowResizeListener = function() {
                $(window).off("resize");
            }, SandboxHost.prototype.windowResizeListener = function() {
                if (this.lastVisualUpdateOptions) {
                    var height = $(window).height(), width = $(window).width(), visualUpdateOptions = powerbi.Prototype.inherit(this.lastVisualUpdateOptions);
                    visualUpdateOptions.viewport = {
                        width: width,
                        height: height
                    }, visualUpdateOptions.type = powerbi.VisualUpdateType.Resize, visualUpdateOptions.resizeMode = 1, 
                    this.visual.update(visualUpdateOptions);
                }
            }, SandboxHost.prototype.attachRelayUIEventListener = function() {
                this.container.on(visualSandbox.relayUIEvents.join(" "), this.relayUIEventListener);
            }, SandboxHost.prototype.detachRelayUIEventListener = function() {
                this.container.off(visualSandbox.relayUIEvents.join(" "), this.relayUIEventListener);
            }, SandboxHost.prototype.handleLoadMoreDataResult = function(result) {
                var segment = result ? result.dataReaderResult.dataView : null;
                if (segment) {
                    DataViewMerger.mergeDataViews(this.lastDataViewTransformApplyOptions.prototype, segment), 
                    this.lastVisualUpdateOptions.dataViews = powerbi.data.DataViewTransform.apply(this.lastDataViewTransformApplyOptions), 
                    this.lastVisualUpdateOptions.operationKind = powerbi.VisualDataChangeOperationKind.Append, 
                    this.visual.update(this.lastVisualUpdateOptions);
                    var message = {
                        eventName: "stopProgressBar",
                        arguments: []
                    };
                    this.messageProxy.postMessage(message);
                }
            }, SandboxHost;
        }();
        visualSandbox.SandboxHost = SandboxHost;
    }(visualSandbox = powerbi.visualSandbox || (powerbi.visualSandbox = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualSandbox;
    !function(visualSandbox) {
        function createSandboxVisualHostTooltipService(messageProxy) {
            return new SandboxVisualHostTooltipService(messageProxy);
        }
        visualSandbox.createSandboxVisualHostTooltipService = createSandboxVisualHostTooltipService;
        var SandboxVisualHostTooltipService = function() {
            function SandboxVisualHostTooltipService(messageProxy) {
                this.messageProxy = messageProxy, this.rootElement = window.document.body;
            }
            return SandboxVisualHostTooltipService.prototype.show = function(args) {
                var message = {
                    eventName: "showTooltip",
                    arguments: [ args ]
                };
                this.messageProxy.postMessage(message);
            }, SandboxVisualHostTooltipService.prototype.move = function(args) {
                var message = {
                    eventName: "moveTooltip",
                    arguments: [ args ]
                };
                this.messageProxy.postMessage(message);
            }, SandboxVisualHostTooltipService.prototype.hide = function(args) {
                var message = {
                    eventName: "hideTooltip",
                    arguments: [ args ]
                };
                this.messageProxy.postMessage(message);
            }, SandboxVisualHostTooltipService.prototype.visible = function() {
                return !1;
            }, SandboxVisualHostTooltipService.prototype.container = function() {
                return this.rootElement;
            }, SandboxVisualHostTooltipService.prototype.enabled = function() {
                return !0;
            }, SandboxVisualHostTooltipService;
        }();
    }(visualSandbox = powerbi.visualSandbox || (powerbi.visualSandbox = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualSandbox;
    !function(visualSandbox) {
        function createSandboxVisualHostTelemetryService(messageProxy, instanceId) {
            return new SandboxVisualHostTelemetryService(messageProxy, instanceId);
        }
        var convertVisualEventType = powerbi.extensibility.convertVisualEventType;
        visualSandbox.createSandboxVisualHostTelemetryService = createSandboxVisualHostTelemetryService;
        var SandboxVisualHostTelemetryService = function() {
            function SandboxVisualHostTelemetryService(messageProxy, instanceId) {
                this.messageProxy = messageProxy, this.instanceId = instanceId;
            }
            return SandboxVisualHostTelemetryService.prototype.trace = function(type, payload) {
                this.messageProxy.postMessageAsync({
                    eventName: "logVisualEvent",
                    arguments: [ convertVisualEventType(type), this.instanceId, payload ]
                });
            }, SandboxVisualHostTelemetryService;
        }();
    }(visualSandbox = powerbi.visualSandbox || (powerbi.visualSandbox = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualSandbox;
    !function(visualSandbox) {
        function createSandboxTelemetryProxyService(windowMessageProxy) {
            return new SandboxTelemetryProxyService(windowMessageProxy);
        }
        var proxiedTelemetryEventType;
        !function(proxiedTelemetryEventType) {
            proxiedTelemetryEventType.VisualApiUsage = "VisualApiUsage", proxiedTelemetryEventType.VisualException = "VisualException";
        }(proxiedTelemetryEventType = visualSandbox.proxiedTelemetryEventType || (visualSandbox.proxiedTelemetryEventType = {})), 
        visualSandbox.createSandboxTelemetryProxyService = createSandboxTelemetryProxyService;
        var SandboxTelemetryProxyService = function() {
            function SandboxTelemetryProxyService(windowMessageProxy) {
                this.windowMessageProxy = windowMessageProxy;
            }
            return SandboxTelemetryProxyService.prototype.setLogToConsole = function(enabled) {}, 
            SandboxTelemetryProxyService.prototype.setLogAllEvents = function(enabled) {}, SandboxTelemetryProxyService.prototype.suspend = function() {}, 
            SandboxTelemetryProxyService.prototype.resume = function() {}, SandboxTelemetryProxyService.prototype.flush = function() {}, 
            SandboxTelemetryProxyService.prototype.startPerfEventDeprecated = function(scope, eventFactory) {
                for (var args = [], _i = 2; _i < arguments.length; _i++) args[_i - 2] = arguments[_i];
                var tempEvent, event = {
                    info: {}
                };
                return tempEvent = new EmptyDeferredTelemetryEvent(event);
            }, SandboxTelemetryProxyService.prototype.logEvent = function(eventFactory) {
                for (var args = [], _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
                var eventType = null;
                return eventFactory === powerbi.telemetry.VisualApiUsage ? eventType = proxiedTelemetryEventType.VisualApiUsage : eventFactory === powerbi.telemetry.VisualException && (eventType = proxiedTelemetryEventType.VisualException), 
                args.unshift(eventType), this.windowMessageProxy.postMessageAsync({
                    eventName: "logEvent",
                    arguments: args
                }), null;
            }, SandboxTelemetryProxyService.prototype.logChildEvent = function(parent, eventFactory) {
                for (var args = [], _i = 2; _i < arguments.length; _i++) args[_i - 2] = arguments[_i];
            }, SandboxTelemetryProxyService.prototype.startActivity = function(scope, eventFactory) {
                for (var args = [], _i = 2; _i < arguments.length; _i++) args[_i - 2] = arguments[_i];
                var tempEvent, event = {
                    info: {}
                };
                return tempEvent = new EmptyDeferredTelemetryEvent(event);
            }, SandboxTelemetryProxyService.prototype.startEvent = function(eventFactory) {
                for (var args = [], _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
                var tempEvent, event = {
                    info: {}
                };
                return tempEvent = new EmptyDeferredTelemetryEvent(event);
            }, SandboxTelemetryProxyService.prototype.startChildEvent = function(parent, eventFactory) {
                for (var args = [], _i = 2; _i < arguments.length; _i++) args[_i - 2] = arguments[_i];
                var tempEvent, event = {
                    info: {}
                };
                return tempEvent = new EmptyDeferredTelemetryEvent(event);
            }, SandboxTelemetryProxyService.prototype.logTrace = function(trace) {}, Object.defineProperty(SandboxTelemetryProxyService.prototype, "sessionId", {
                get: function() {},
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(SandboxTelemetryProxyService.prototype, "root", {
                get: function() {},
                enumerable: !0,
                configurable: !0
            }), SandboxTelemetryProxyService.prototype.setHostInfo = function(key, value) {}, 
            SandboxTelemetryProxyService;
        }(), EmptyDeferredTelemetryEvent = function() {
            function EmptyDeferredTelemetryEvent(event) {
                this.event = event;
            }
            return EmptyDeferredTelemetryEvent.prototype.resolve = function() {}, EmptyDeferredTelemetryEvent.prototype.reject = function(errorDetails) {}, 
            EmptyDeferredTelemetryEvent;
        }();
    }(visualSandbox = powerbi.visualSandbox || (powerbi.visualSandbox = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visualSandbox;
    !function(visualSandbox) {
        function createVisualHostServices(messageProxy, instanceId) {
            return new SandboxVisualHostServices(messageProxy, instanceId);
        }
        var DataViewObjectSerializer = powerbi.data.services.DataViewObjectSerializer, VisualObjectInstanceSerializer = powerbi.visualHost.services.VisualObjectInstanceSerializer, BeautifiedFormat = {
            "0.00 %;-0.00 %;0.00 %": "Percentage",
            "0.0 %;-0.0 %;0.0 %": "Percentage1"
        }, defaultLocalizedStrings = {
            NullValue: "(Blank)",
            BooleanTrue: "True",
            BooleanFalse: "False",
            NaNValue: "NaN",
            InfinityValue: "+Infinity",
            NegativeInfinityValue: "-Infinity",
            Restatement_Comma: "{0}, {1}",
            Restatement_CompoundAnd: "{0} and {1}",
            DisplayUnitSystem_EAuto_Title: "Auto",
            DisplayUnitSystem_E0_Title: "None",
            DisplayUnitSystem_E3_LabelFormat: "{0}K",
            DisplayUnitSystem_E3_Title: "Thousands",
            DisplayUnitSystem_E6_LabelFormat: "{0}M",
            DisplayUnitSystem_E6_Title: "Millions",
            DisplayUnitSystem_E9_LabelFormat: "{0}bn",
            DisplayUnitSystem_E9_Title: "Billions",
            DisplayUnitSystem_E12_LabelFormat: "{0}T",
            DisplayUnitSystem_E12_Title: "Trillions",
            Percentage: "#,0.##%",
            Percentage1: "#,0.#%",
            TableTotalLabel: "Total",
            Tooltip_HighlightedValueDisplayName: "Highlighted",
            Waterfall_DecreaseLabel: "Decrease",
            Waterfall_IncreaseLabel: "Increase",
            Waterfall_TotalLabel: "Total",
            GeotaggingString_Continent: "continent",
            GeotaggingString_Continents: "continents",
            GeotaggingString_Country: "country",
            GeotaggingString_Countries: "countries",
            GeotaggingString_State: "state",
            GeotaggingString_States: "states",
            GeotaggingString_City: "city",
            GeotaggingString_Cities: "cities",
            GeotaggingString_Town: "town",
            GeotaggingString_Towns: "towns",
            GeotaggingString_Province: "province",
            GeotaggingString_Provinces: "provinces",
            GeotaggingString_County: "county",
            GeotaggingString_Counties: "counties",
            GeotaggingString_Village: "village",
            GeotaggingString_Villages: "villages",
            GeotaggingString_Post: "post",
            GeotaggingString_Zip: "zip",
            GeotaggingString_Code: "code",
            GeotaggingString_Place: "place",
            GeotaggingString_Places: "places",
            GeotaggingString_Address: "address",
            GeotaggingString_Addresses: "addresses",
            GeotaggingString_Street: "street",
            GeotaggingString_Streets: "streets",
            GeotaggingString_Longitude: "longitude",
            GeotaggingString_Longitude_Short: "lon",
            GeotaggingString_Longitude_Short2: "long",
            GeotaggingString_Latitude: "latitude",
            GeotaggingString_Latitude_Short: "lat",
            GeotaggingString_PostalCode: "postal code",
            GeotaggingString_PostalCodes: "postal codes",
            GeotaggingString_ZipCode: "zip code",
            GeotaggingString_ZipCodes: "zip codes",
            GeotaggingString_Territory: "territory",
            GeotaggingString_Territories: "territories"
        }, SandboxVisualHostServices = function() {
            function SandboxVisualHostServices(messageProxy, instanceId) {
                this.messageProxy = messageProxy, this.instanceId = instanceId, this.visualHostTooltipService = visualSandbox.createSandboxVisualHostTooltipService(messageProxy), 
                this.telemetryService = visualSandbox.createSandboxVisualHostTelemetryService(messageProxy, instanceId), 
                this.queryDictionary = SandboxVisualHostServices.parseUrlParameters();
            }
            return SandboxVisualHostServices.initialize = function() {
                powerbi.visuals.valueFormatter.setLocaleOptions(SandboxVisualHostServices.createLocaleOptions()), 
                powerbi.visuals.TooltipManager && powerbi.visuals.TooltipManager.setLocalizedStrings(SandboxVisualHostServices.createTooltipLocaleOptions());
            }, SandboxVisualHostServices.createLocaleOptions = function() {
                return {
                    null: defaultLocalizedStrings.NullValue,
                    true: defaultLocalizedStrings.BooleanTrue,
                    false: defaultLocalizedStrings.BooleanFalse,
                    NaN: defaultLocalizedStrings.NaNValue,
                    infinity: defaultLocalizedStrings.InfinityValue,
                    negativeInfinity: defaultLocalizedStrings.NegativeInfinityValue,
                    beautify: function(format) {
                        return SandboxVisualHostServices.beautify(format);
                    },
                    describe: function(exponent) {
                        return SandboxVisualHostServices.describeUnit(exponent);
                    },
                    restatementComma: defaultLocalizedStrings.Restatement_Comma,
                    restatementCompoundAnd: defaultLocalizedStrings.Restatement_CompoundAnd,
                    restatementCompoundOr: defaultLocalizedStrings.Restatement_CompoundOr
                };
            }, SandboxVisualHostServices.createTooltipLocaleOptions = function() {
                return {
                    highlightedValueDisplayName: defaultLocalizedStrings.Tooltip_HighlightedValueDisplayName
                };
            }, SandboxVisualHostServices.prototype.getLocalizedString = function(stringId) {
                return defaultLocalizedStrings[stringId];
            }, SandboxVisualHostServices.prototype.onSelecting = function(selectingArgs) {
                selectingArgs.action = 0;
            }, SandboxVisualHostServices.prototype.onSelect = function(selectArgs) {
                var proxyArgs;
                if (powerbi.extensibility.legacy.isOldSelectEventArgs(selectArgs)) {
                    var deprecatedArgs = selectArgs;
                    proxyArgs = {
                        data: DataViewObjectSerializer.serializeSelectors(deprecatedArgs.data),
                        data2: DataViewObjectSerializer.serializeSelectorsByColumn(deprecatedArgs.data2),
                        selectors: DataViewObjectSerializer.serializeSelectors(selectArgs.selectors)
                    };
                } else proxyArgs = {
                    visualObjects: DataViewObjectSerializer.serializeVisualObjects(selectArgs.visualObjects)
                };
                var message = {
                    eventName: "onSelect",
                    arguments: [ proxyArgs ]
                };
                this.messageProxy.postMessage(message);
            }, SandboxVisualHostServices.prototype.persistProperties = function(changes) {
                var wireChanges, instancesToPersist = changes;
                wireChanges = instancesToPersist.merge || instancesToPersist.remove || instancesToPersist.replace ? {
                    merge: instancesToPersist.merge ? VisualObjectInstanceSerializer.serialize(instancesToPersist.merge) : null,
                    replace: instancesToPersist.replace ? VisualObjectInstanceSerializer.serialize(instancesToPersist.replace) : null,
                    remove: instancesToPersist.remove ? VisualObjectInstanceSerializer.serialize(instancesToPersist.remove) : null
                } : VisualObjectInstanceSerializer.serialize(changes);
                var message = {
                    eventName: "persistProperties",
                    arguments: [ wireChanges ]
                };
                this.messageProxy.postMessage(message);
            }, SandboxVisualHostServices.prototype.loadMoreData = function() {
                var message = {
                    eventName: "loadMoreData",
                    arguments: null
                };
                this.messageProxy.postMessage(message);
            }, SandboxVisualHostServices.prototype.launchUrl = function(url) {
                var message = {
                    eventName: "launchUrl",
                    arguments: [ url ]
                };
                this.messageProxy.postMessage(message);
            }, SandboxVisualHostServices.prototype.tooltips = function() {
                return this.visualHostTooltipService;
            }, SandboxVisualHostServices.prototype.telemetry = function() {
                return this.telemetryService;
            }, SandboxVisualHostServices.prototype.locale = function() {
                var loc = this.queryDictionary && this.queryDictionary.locale;
                return loc || navigator.language;
            }, SandboxVisualHostServices.prototype.loader = function() {
                var _this = this;
                return {
                    require: function() {
                        return _this.promiseFactory().reject();
                    }
                };
            }, SandboxVisualHostServices.prototype.applyJsonFilter = function(filter, objectName, propertyName, action) {
                var args = [ filter, objectName, propertyName ];
                action && args.push(action);
                var message = {
                    eventName: "applyJsonFilter",
                    arguments: args
                };
                this.messageProxy.postMessage(message);
            }, SandboxVisualHostServices.parseUrlParameters = function(queryString) {
                void 0 === queryString && (queryString = window.location.search);
                var queryStringDictionary = {}, search = queryString;
                if (search && "?" === search.substr(0, 1)) for (var pairs = search.substr(1).split("&"), _i = 0, pairs_1 = pairs; _i < pairs_1.length; _i++) {
                    var pair = pairs_1[_i], keyValuePair = pair && pair.split("=");
                    keyValuePair && 2 === keyValuePair.length && (queryStringDictionary[decodeURIComponent(keyValuePair[0])] = decodeURIComponent(keyValuePair[1]));
                }
                return queryStringDictionary;
            }, SandboxVisualHostServices.prototype.destroy = function() {
                this.messageProxy.destroy(), this.messageProxy = null;
            }, SandboxVisualHostServices.prototype.refreshHostData = function() {
                var message = {
                    eventName: "refreshHostData",
                    arguments: null
                };
                this.messageProxy.postMessage(message);
            }, SandboxVisualHostServices.prototype.onDragStart = function() {}, SandboxVisualHostServices.prototype.onContextMenu = function() {}, 
            SandboxVisualHostServices.prototype.canSelect = function() {
                return !1;
            }, SandboxVisualHostServices.prototype.onCustomSort = function(args) {}, SandboxVisualHostServices.prototype.getViewMode = function() {
                return 0;
            }, SandboxVisualHostServices.prototype.getEditMode = function() {
                return 0;
            }, SandboxVisualHostServices.prototype.setWarnings = function(warnings) {}, SandboxVisualHostServices.prototype.setToolbar = function($toolbar) {}, 
            SandboxVisualHostServices.prototype.shouldRetainSelection = function() {
                return !1;
            }, SandboxVisualHostServices.prototype.geocoder = function() {
                return powerbi.visuals.services.createGeocoder();
            }, SandboxVisualHostServices.prototype.geolocation = function() {
                return powerbi.visuals.services.createGeolocation();
            }, SandboxVisualHostServices.prototype.promiseFactory = function() {
                return powerbi.createJQueryPromiseFactory();
            }, SandboxVisualHostServices.prototype.analyzeFilter = function(options) {}, SandboxVisualHostServices.prototype.getIdentityDisplayNames = function(dentities) {}, 
            SandboxVisualHostServices.prototype.setIdentityDisplayNames = function(displayNamesIdentityPairs) {}, 
            SandboxVisualHostServices.prototype.getUIComponentFactory = function() {}, SandboxVisualHostServices.beautify = function(format) {
                var key = BeautifiedFormat[format];
                return key ? defaultLocalizedStrings[key] || format : format;
            }, SandboxVisualHostServices.describeUnit = function(exponent) {
                var exponentLookup = exponent === -1 ? "Auto" : exponent.toString(), title = defaultLocalizedStrings["DisplayUnitSystem_E" + exponentLookup + "_Title"], format = exponent <= 0 ? "{0}" : defaultLocalizedStrings["DisplayUnitSystem_E" + exponentLookup + "_LabelFormat"];
                if (title || format) return {
                    title: title,
                    format: format
                };
            }, SandboxVisualHostServices;
        }();
        visualSandbox.SandboxVisualHostServices = SandboxVisualHostServices, visualSandbox.createVisualHostServices = createVisualHostServices;
    }(visualSandbox = powerbi.visualSandbox || (powerbi.visualSandbox = {}));
}(powerbi || (powerbi = {}));