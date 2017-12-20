"use strict";

var __extends = this && this.__extends || function() {
    var extendStatics = Object.setPrototypeOf || {
        __proto__: []
    } instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
    };
    return function(d, b) {
        function __() {
            this.constructor = d;
        }
        extendStatics(d, b), d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, 
        new __());
    };
}(), __assign = this && this.__assign || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
    }
    return t;
}, powerbi;

!function(powerbi) {
    var telemetry;
    !function(telemetry) {
        function DataQueryData(endPoint, clientAndServerRequestIdMatch, responseRequestId, requestId, parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            var baseEvent = telemetry.Verbose(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity), info = merge(baseEvent.info, {
                endPoint: endPoint,
                clientAndServerRequestIdMatch: clientAndServerRequestIdMatch,
                responseRequestId: responseRequestId,
                requestId: requestId
            }), event = {
                name: "PBI.Data.QueryData",
                category: powerbi.TelemetryCategory.Verbose,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted({
                        endPoint: info.endPoint,
                        clientAndServerRequestIdMatch: info.clientAndServerRequestIdMatch,
                        responseRequestId: info.responseRequestId
                    }, {
                        requestId: info.requestId
                    }, baseEvent.formatted());
                },
                info: info,
                loggers: telemetry.DataQueryDataLoggers
            };
            return event;
        }
        function DataGetConceptualSchema(endPoint, clientAndServerRequestIdMatch, responseRequestId, requestId, parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            var baseEvent = telemetry.Verbose(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity), info = merge(baseEvent.info, {
                endPoint: endPoint,
                clientAndServerRequestIdMatch: clientAndServerRequestIdMatch,
                responseRequestId: responseRequestId,
                requestId: requestId
            }), event = {
                name: "PBI.Data.GetConceptualSchema",
                category: powerbi.TelemetryCategory.Verbose,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted({
                        endPoint: info.endPoint,
                        clientAndServerRequestIdMatch: info.clientAndServerRequestIdMatch,
                        responseRequestId: info.responseRequestId
                    }, {
                        requestId: info.requestId
                    }, baseEvent.formatted());
                },
                info: info,
                loggers: telemetry.DataGetConceptualSchemaLoggers
            };
            return event;
        }
        function DataExecuteQuery(requestId, parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            var baseEvent = telemetry.Verbose(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity), info = merge(baseEvent.info, {
                requestId: requestId
            }), event = {
                name: "PBI.Data.ExecuteQuery",
                category: powerbi.TelemetryCategory.Verbose,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted(null, {
                        requestId: info.requestId
                    }, baseEvent.formatted());
                },
                info: info,
                loggers: telemetry.DataExecuteQueryLoggers
            };
            return event;
        }
        var generateGuid, Utility = jsCommon.Utility, merge = jsCommon.UnionExtensions.mergeUnionType;
        generateGuid = Utility ? Utility.generateGuid : Function.prototype, telemetry.DataQueryData = DataQueryData, 
        telemetry.DataGetConceptualSchema = DataGetConceptualSchema, telemetry.DataExecuteQuery = DataExecuteQuery;
    }(telemetry = powerbi.telemetry || (powerbi.telemetry = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var dsr;
        !function(dsr) {
            var UndefinedData = "UndefinedData", DsrDataReader = function() {
                function DsrDataReader(host, communication, delayedResultHandler, enableCellLevelFormatting, timerFactory, preferredMaxConnections) {
                    this.proxy = new dsr.ExecuteSemanticQueryProxy(host, communication, delayedResultHandler, timerFactory, preferredMaxConnections), 
                    this.enableCellLevelFormatting = enableCellLevelFormatting;
                }
                return DsrDataReader.prototype.execute = function(options) {
                    return this.proxy.execute(options);
                }, DsrDataReader.prototype.transform = function(obj, kinds, perfId) {
                    return void 0 === obj ? {
                        dataView: {
                            metadata: {
                                columns: []
                            },
                            error: {
                                code: UndefinedData
                            }
                        }
                    } : dsr.read(kinds, obj, this.enableCellLevelFormatting, perfId);
                }, DsrDataReader.prototype.stopCommunication = function() {
                    this.proxy.stopCommunication();
                }, DsrDataReader.prototype.resumeCommunication = function() {
                    this.proxy.resumeCommunication();
                }, Object.defineProperty(DsrDataReader.prototype, "cache", {
                    get: function() {
                        return this.proxy.cache();
                    },
                    enumerable: !0,
                    configurable: !0
                }), DsrDataReader.prototype.setLocalCacheResult = function(options, dataAsObject) {
                    this.proxy.setLocalCacheResult(options, dataAsObject);
                }, DsrDataReader;
            }();
            dsr.DsrDataReader = DsrDataReader;
        }(dsr = data.dsr || (data.dsr = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var bingSocial;
        !function(bingSocial) {
            var BingSocialDataReader = function() {
                function BingSocialDataReader(host, httpService, options) {
                    options = options || {}, this.promiseFactory = host.promiseFactory(), this.client = options.client || new bingSocial.BingSocialClient(httpService), 
                    this.tileRequestDataFactory = options.tileRequestDataFactory || new bingSocial.TileRequestDataFactory();
                }
                return BingSocialDataReader.prototype.execute = function(options) {
                    var command = options.command, searchKey = command.searchKey, queryType = command.queryType;
                    if (!searchKey || !queryType) return null;
                    var deferred = this.promiseFactory.defer(), tileRequestData = this.tileRequestDataFactory.getTileRequestData(queryType);
                    return tileRequestData ? this.client.requestData(deferred, searchKey, tileRequestData) : deferred.reject(), 
                    powerbi.RejectablePromise2(deferred);
                }, BingSocialDataReader.prototype.transform = function(obj) {
                    return {
                        dataView: obj
                    };
                }, BingSocialDataReader;
            }();
            bingSocial.BingSocialDataReader = BingSocialDataReader;
        }(bingSocial = data.bingSocial || (data.bingSocial = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data_1) {
        var bingSocial;
        !function(bingSocial) {
            var ChartDataViewConstructorUtils;
            !function(ChartDataViewConstructorUtils) {
                function createMetadataColumn(name, columnIndex, roleName, valueType, colors) {
                    var roles = {};
                    roles[roleName] = !0;
                    var metadataColumn = {
                        displayName: name,
                        queryName: name,
                        index: columnIndex,
                        isMeasure: !valueType,
                        type: valueType ? valueType : powerbi.ValueType.fromDescriptor({
                            numeric: !0
                        }),
                        roles: roles
                    };
                    return colors && (metadataColumn = powerbi.Prototype.inherit(metadataColumn, function(c) {
                        return c.objects = {
                            dataPoint: {
                                fill: {
                                    solid: {
                                        color: colors[name]
                                    }
                                }
                            }
                        };
                    })), metadataColumn;
                }
                function getFieldFromString(obj, fieldName) {
                    for (var fields = fieldName.split("."), _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
                        var field = fields_1[_i];
                        if (!(null != obj && field in obj)) return null;
                        obj = obj[field];
                    }
                    return obj;
                }
                function createDataView(data, fieldName, categoryRoleName, valuesRoleName, options) {
                    options = options || {}, void 0 === options.percentize && (options.percentize = !0);
                    var columnRef = data_1.SQExprBuilder.columnRef(data_1.SQExprBuilder.entity(null, "table"), "Column"), dataView = data_1.createCategoricalDataViewBuilder().withCategory(populateColumns(data, columnRef, fieldName, categoryRoleName, options.mapping)).withValues(populateValues(data, valuesRoleName, options)).build();
                    return dataView.metadata.objects = {
                        labels: {
                            show: !0
                        },
                        categoryLabels: {
                            show: !0
                        }
                    }, dataView;
                }
                function populateColumns(data, identityField, fieldName, categoryRoleName, mapping) {
                    for (var categoryValues = [], _i = 0, data_2 = data; _i < data_2.length; _i++) {
                        var dataItem = data_2[_i], fieldVal = getFieldFromString(dataItem, fieldName);
                        mapping && !(fieldVal = "function" == typeof mapping ? mapping(fieldVal) : mapping[fieldVal]) || categoryValues.push(fieldVal);
                    }
                    return {
                        source: createMetadataColumn(_.last(fieldName.split(".")), 0, categoryRoleName, powerbi.ValueType.fromDescriptor({
                            text: !0
                        })),
                        identityFrom: {
                            fields: [ identityField ]
                        },
                        values: categoryValues
                    };
                }
                function populateValues(data, valuesRoleName, options) {
                    var dataValues = _.map(data, function(item) {
                        return item.Count;
                    }), columnMetadata = createMetadataColumn("Count", 1, valuesRoleName);
                    options.percentize && (dataValues = percentizeColumn(dataValues, columnMetadata));
                    var min = _.min(dataValues), max = _.max(dataValues);
                    return columnMetadata.aggregates = {
                        min: min,
                        max: max
                    }, {
                        columns: [ {
                            source: columnMetadata,
                            values: dataValues
                        } ]
                    };
                }
                function percentizeColumn(dataValues, valueMetadataColumn) {
                    return valueMetadataColumn.objects = valueMetadataColumn.objects || {}, valueMetadataColumn.objects.general = {
                        formatString: "0%"
                    }, percentizeValues(dataValues);
                }
                function percentizeValues(dataValues) {
                    var sum = dataValues.reduce(function(currentSum, next) {
                        return currentSum + next;
                    }, 0);
                    return dataValues.map(function(val) {
                        return val / sum;
                    });
                }
                ChartDataViewConstructorUtils.createMetadataColumn = createMetadataColumn, ChartDataViewConstructorUtils.getFieldFromString = getFieldFromString, 
                ChartDataViewConstructorUtils.createDataView = createDataView;
            }(ChartDataViewConstructorUtils = bingSocial.ChartDataViewConstructorUtils || (bingSocial.ChartDataViewConstructorUtils = {}));
        }(bingSocial = data_1.bingSocial || (data_1.bingSocial = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data_3) {
        var bingSocial;
        !function(bingSocial) {
            var ActivityChartResponseFormatter = function() {
                function ActivityChartResponseFormatter() {}
                return ActivityChartResponseFormatter.prototype.formatResponse = function(responses) {
                    for (var data = responses[0].value, _i = 0, data_4 = data; _i < data_4.length; _i++) {
                        var d = data_4[_i];
                        d.source = "Bing", d.CreatedAt = bingSocial.ChartDataViewConstructorUtils.getFieldFromString(d, "Request.RequestTime");
                    }
                    var counts = this.getCountsPerTime(data, "source"), labels = [ "Bing" ], colors = {
                        Bing: "#FFB900"
                    };
                    return this.createLineChartDataView(labels, counts, colors);
                }, ActivityChartResponseFormatter.prototype.getCountsPerTime = function(data, fieldName, mapping) {
                    for (var countsPerTime = {}, _i = 0, data_5 = data; _i < data_5.length; _i++) {
                        var item = data_5[_i], createdAt = item.CreatedAt, fieldVal = bingSocial.ChartDataViewConstructorUtils.getFieldFromString(item, fieldName);
                        mapping && !(fieldVal = mapping[fieldVal]) || (countsPerTime[createdAt] = countsPerTime[createdAt] || {}, 
                        countsPerTime[createdAt][fieldVal] = item.Count);
                    }
                    return countsPerTime;
                }, ActivityChartResponseFormatter.prototype.createLineChartDataView = function(labels, counts, colors) {
                    var createdAtValues = Object.keys(counts), sortedCreatedAtValues = ActivityChartResponseFormatter.sortDateStrings(createdAtValues), sortedCreatedAtDates = sortedCreatedAtValues.map(function(createdAt) {
                        return new Date(createdAt);
                    }), values = {}, maximums = {}, minimums = {}, subtotals = {};
                    ActivityChartResponseFormatter.getTableData(sortedCreatedAtValues, labels, counts, values, maximums, minimums, subtotals);
                    var createdAtValueColumn = {
                        source: {
                            queryName: "CreatedAt",
                            displayName: "CreatedAt",
                            type: powerbi.ValueType.fromDescriptor({
                                dateTime: !0
                            }),
                            index: 0
                        },
                        values: sortedCreatedAtDates
                    }, metadataColumns = this.createMetadataColumns(labels, colors);
                    return {
                        metadata: {
                            columns: metadataColumns
                        },
                        categorical: {
                            values: data_3.DataViewTransform.createValueColumns(this.createValueColumns(labels, metadataColumns, values, maximums, minimums, subtotals)),
                            categories: [ createdAtValueColumn ]
                        }
                    };
                }, ActivityChartResponseFormatter.getTableData = function(createdAtValues, labels, countsPerTime, values, maximums, minimums, subtotals) {
                    for (var _i = 0, labels_1 = labels; _i < labels_1.length; _i++) {
                        var label = labels_1[_i];
                        values[label] = [], subtotals[label] = 0;
                    }
                    for (var _a = 0, createdAtValues_1 = createdAtValues; _a < createdAtValues_1.length; _a++) for (var createdAt = createdAtValues_1[_a], _b = 0, labels_2 = labels; _b < labels_2.length; _b++) {
                        var label = labels_2[_b], count = countsPerTime[createdAt][label] || 0;
                        values[label].push(count), maximums[label] = maximums[label] ? Math.max(maximums[label], count) : count, 
                        minimums[label] = minimums[label] ? Math.min(minimums[label], count) : count, subtotals[label] += count;
                    }
                }, ActivityChartResponseFormatter.prototype.createMetadataColumns = function(labels, colors) {
                    for (var metadataColumns = [ bingSocial.ChartDataViewConstructorUtils.createMetadataColumn("CreatedAt", 0, "Category", powerbi.ValueType.fromDescriptor({
                        text: !0
                    })) ], i = 0; i < labels.length; i++) {
                        var label = labels[i], metadataColumn = bingSocial.ChartDataViewConstructorUtils.createMetadataColumn(label, i + 1, "Y", null, colors);
                        metadataColumns.push(metadataColumn);
                    }
                    return metadataColumns;
                }, ActivityChartResponseFormatter.prototype.createValueColumns = function(labels, metadata, values, maximums, minimums, subtotals) {
                    for (var valueColumns = [], i = 0; i < labels.length; i++) {
                        var label = labels[i];
                        valueColumns.push(ActivityChartResponseFormatter.createValueColumn(label, i + 1, values[label], minimums[label], maximums[label], subtotals[label], metadata[i + 1]));
                    }
                    return valueColumns;
                }, ActivityChartResponseFormatter.createValueColumn = function(name, columnIndex, values, min, max, subtotal, metadata) {
                    return {
                        source: metadata,
                        values: values,
                        min: min,
                        max: max,
                        subtotal: subtotal
                    };
                }, ActivityChartResponseFormatter.sortDateStrings = function(arr) {
                    return arr.sort(function(a, b) {
                        return new Date(a).getTime() - new Date(b).getTime();
                    });
                }, ActivityChartResponseFormatter;
            }();
            bingSocial.ActivityChartResponseFormatter = ActivityChartResponseFormatter;
        }(bingSocial = data_3.bingSocial || (data_3.bingSocial = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var bingSocial;
        !function(bingSocial) {
            var CountChangeResponseFormatter = function() {
                function CountChangeResponseFormatter() {}
                return CountChangeResponseFormatter.prototype.formatResponse = function(responses) {
                    var currentData = parseInt(responses[0], 10), lastData = parseInt(responses[1], 10);
                    if (0 === lastData) {
                        var metadata_1 = this.getMetadata("N/A");
                        return {
                            single: {
                                value: 0,
                                column: metadata_1.columns[0]
                            },
                            metadata: metadata_1
                        };
                    }
                    var change = (currentData - lastData) / lastData, metadata = this.getMetadata("+0.0%;-0.0%");
                    return {
                        single: {
                            value: change,
                            column: metadata.columns[0]
                        },
                        metadata: metadata
                    };
                }, CountChangeResponseFormatter.prototype.getMetadata = function(formatString) {
                    return {
                        columns: [ {
                            displayName: "Count Change",
                            isMeasure: !0,
                            type: powerbi.ValueType.fromDescriptor({
                                numeric: !0
                            }),
                            objects: {
                                general: {
                                    formatString: formatString
                                }
                            }
                        } ]
                    };
                }, CountChangeResponseFormatter;
            }();
            bingSocial.CountChangeResponseFormatter = CountChangeResponseFormatter;
        }(bingSocial = data.bingSocial || (data.bingSocial = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var bingSocial;
        !function(bingSocial) {
            var CountResponseFormatter = function() {
                function CountResponseFormatter() {}
                return CountResponseFormatter.prototype.formatResponse = function(responses) {
                    var column = {
                        displayName: "Count",
                        isMeasure: !0,
                        type: powerbi.ValueType.fromDescriptor({
                            integer: !0
                        })
                    }, metadata = {
                        columns: [ column ]
                    };
                    return {
                        single: {
                            value: responses[0],
                            column: column
                        },
                        metadata: metadata
                    };
                }, CountResponseFormatter;
            }();
            bingSocial.CountResponseFormatter = CountResponseFormatter;
        }(bingSocial = data.bingSocial || (data.bingSocial = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var bingSocial;
        !function(bingSocial) {
            var RawDataResponseFormatter = function() {
                function RawDataResponseFormatter() {}
                return RawDataResponseFormatter.prototype.formatResponse = function(responses) {
                    return {
                        metadata: {
                            columns: []
                        },
                        bingSocial: responses[0].value
                    };
                }, RawDataResponseFormatter;
            }();
            bingSocial.RawDataResponseFormatter = RawDataResponseFormatter;
        }(bingSocial = data.bingSocial || (data.bingSocial = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var bingSocial;
        !function(bingSocial) {
            var BingNewsResponseFormatter = function() {
                function BingNewsResponseFormatter() {}
                return BingNewsResponseFormatter.prototype.formatResponse = function(responses) {
                    var newsArticles = responses[0].value;
                    return {
                        metadata: {
                            columns: []
                        },
                        bingSocial: newsArticles
                    };
                }, BingNewsResponseFormatter;
            }();
            bingSocial.BingNewsResponseFormatter = BingNewsResponseFormatter;
        }(bingSocial = data.bingSocial || (data.bingSocial = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi_1) {
    var data;
    !function(data_6) {
        var bingSocial;
        !function(bingSocial) {
            var MapResponseFormatter = function() {
                function MapResponseFormatter(fieldName, options) {
                    this.fieldName = fieldName, this.options = options || {};
                }
                return MapResponseFormatter.prototype.formatResponse = function(responses) {
                    var data = responses[0].value;
                    if (this.options.logarithmic) for (var _i = 0, data_7 = data; _i < data_7.length; _i++) {
                        var d = data_7[_i];
                        d.Count = Math.log(d.Count);
                    }
                    var dataView = bingSocial.ChartDataViewConstructorUtils.createDataView(data, this.fieldName, "Category", "Y", {
                        mapping: this.options.mapping,
                        percentize: !1
                    });
                    dataView.metadata.columns[0].type = powerbi_1.ValueType.fromDescriptor({
                        geography: {
                            country: !0
                        }
                    });
                    var transforms = {
                        selects: [ {
                            type: powerbi_1.ValueType.fromDescriptor({
                                text: !0
                            }),
                            roles: {
                                Category: !0
                            }
                        }, {
                            type: powerbi_1.ValueType.fromDescriptor({
                                numeric: !0
                            }),
                            roles: {
                                Y: !0,
                                Gradient: !0
                            }
                        } ],
                        objects: {
                            dataPoint: [ {
                                properties: {
                                    fillRule: {
                                        linearGradient2: {
                                            min: {
                                                color: data_6.SQExprBuilder.text("#FFF0CC")
                                            },
                                            max: {
                                                color: data_6.SQExprBuilder.text("#FFB600")
                                            }
                                        }
                                    }
                                }
                            } ]
                        }
                    }, transformedDataViews = data_6.DataViewTransform.apply({
                        prototype: dataView,
                        objectDescriptors: {
                            dataPoint: {
                                properties: {
                                    fill: {
                                        type: {
                                            fill: {
                                                solid: {
                                                    color: !0
                                                }
                                            }
                                        }
                                    },
                                    fillRule: {
                                        type: {
                                            fillRule: {}
                                        },
                                        rule: {
                                            inputRole: "Gradient",
                                            output: {
                                                property: "fill",
                                                selector: [ "Category" ]
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        transforms: transforms,
                        colorAllocatorFactory: powerbi.visuals.createColorAllocatorFactory(),
                        dataViewMappings: powerbi.visuals.treemapCapabilities.dataViewMappings,
                        dataRoles: null
                    });
                    return transformedDataViews[0];
                }, MapResponseFormatter;
            }();
            bingSocial.MapResponseFormatter = MapResponseFormatter;
        }(bingSocial = data_6.bingSocial || (data_6.bingSocial = {}));
    }(data = powerbi_1.data || (powerbi_1.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data_8) {
        var bingSocial;
        !function(bingSocial) {
            var TreeMapResponseFormatter = function() {
                function TreeMapResponseFormatter(fieldName, options) {
                    this.fieldName = fieldName, this.options = options || {};
                }
                return TreeMapResponseFormatter.prototype.formatResponse = function(responses) {
                    var data = responses[0].value;
                    return bingSocial.ChartDataViewConstructorUtils.createDataView(data, this.fieldName, "Group", "Values", this.options);
                }, TreeMapResponseFormatter;
            }();
            bingSocial.TreeMapResponseFormatter = TreeMapResponseFormatter;
        }(bingSocial = data_8.bingSocial || (data_8.bingSocial = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var bingSocial;
        !function(bingSocial) {
            var TileRequestData = function() {
                function TileRequestData(urlTemplates, responseFormatter) {
                    this.urlTemplates = urlTemplates, this.responseFormatter = responseFormatter;
                }
                return TileRequestData.prototype.getUrlTemplates = function() {
                    return this.urlTemplates;
                }, TileRequestData.prototype.getResponseFormatter = function() {
                    return this.responseFormatter;
                }, TileRequestData;
            }();
            bingSocial.TileRequestData = TileRequestData;
        }(bingSocial = data.bingSocial || (data.bingSocial = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var bingSocial;
        !function(bingSocial) {
            var newsApiVersion = "v6", urlTemplate = "powerbi/providers/bingsocial/?source={{source}}&type={{type}}&searchKey={{searchKey}}&newsApiVersion={{newsApiVersion}}", TileRequestDataFactory = function() {
                function TileRequestDataFactory() {}
                return TileRequestDataFactory.prototype.getTileRequestData = function(queryType) {
                    return TileRequestDataFactory.tileRequestData[queryType];
                }, TileRequestDataFactory.createUrl = function(source, typeStr) {
                    return urlTemplate.replace(/{{source}}/g, source).replace(/{{type}}/g, typeStr).replace(/{{newsApiVersion}}/g, newsApiVersion);
                }, TileRequestDataFactory.languageMapping = {
                    aa: "Afar",
                    af: "Afrikaans",
                    agq: "Aghem",
                    ak: "Akan",
                    sq: "Albanian",
                    gsw: "Alsatian",
                    am: "Amharic",
                    ar: "Arabic",
                    hy: "Armenian",
                    as: "Assamese",
                    ast: "Asturian",
                    asa: "Asu",
                    "az-Cyrl": "Azerbaijani (Cyrillic)",
                    "az-Latn": "Azerbaijani (Latin)",
                    ksf: "Bafia",
                    "bm-Latn": "Bamanankan (Latin)",
                    bn: "Bangla",
                    bas: "Basaa",
                    ba: "Bashkir",
                    eu: "Basque",
                    be: "Belarusian",
                    bem: "Bemba",
                    bez: "Bena",
                    byn: "Blin",
                    brx: "Bodo",
                    "bs-Cyrl": "Bosnian (Cyrillic)",
                    "bs-Latn": "Bosnian (Latin)",
                    br: "Breton",
                    bg: "Bulgarian",
                    my: "Burmese",
                    ca: "Catalan",
                    "tzm-Arab": "Central Atlas Tamazight (Arabic)",
                    "tzm-Latn": "Central Atlas Tamazight (Latin)",
                    "tzm-Tfng": "Central Atlas Tamazight (Tifinagh)",
                    "ku-Arab": "Central Kurdish",
                    "chr-Cher": "Cherokee (Cherokee)",
                    cgg: "Chiga",
                    "zh-Hans": "Chinese (Simplified)",
                    "zh-Hant": "Chinese (Traditional)",
                    swc: "Congo Swahili",
                    kw: "Cornish",
                    co: "Corsican",
                    hr: "Croatian",
                    cs: "Czech",
                    da: "Danish",
                    prs: "Dari",
                    dv: "Divehi",
                    dua: "Duala",
                    nl: "Dutch",
                    dz: "Dzongkha",
                    bin: "Edo",
                    ebu: "Embu",
                    en: "English",
                    eo: "Esperanto",
                    et: "Estonian",
                    ee: "Ewe",
                    ewo: "Ewondo",
                    fo: "Faroese",
                    fil: "Filipino",
                    fi: "Finnish",
                    fr: "French",
                    fur: "Friulian",
                    "ff-Latn": "Fulah",
                    gl: "Galician",
                    lg: "Ganda",
                    ka: "Georgian",
                    de: "German",
                    el: "Greek",
                    kl: "Greenlandic",
                    gn: "Guarani",
                    gu: "Gujarati",
                    guz: "Gusii",
                    ht: "Haitian",
                    "ha-Latn": "Hausa (Latin)",
                    haw: "Hawaiian",
                    he: "Hebrew",
                    hi: "Hindi",
                    mww: "Hmong Daw",
                    hu: "Hungarian",
                    is: "Icelandic",
                    ig: "Igbo",
                    smn: "Inari Sami",
                    id: "Indonesian",
                    ia: "Interlingua",
                    "iu-Cans": "Inuktitut (Canadian Aboriginal Syllabics)",
                    "iu-Latn": "Inuktitut (Latin)",
                    iv: "Invariant Language",
                    ga: "Irish",
                    xh: "isiXhosa",
                    zu: "isiZulu",
                    it: "Italian",
                    ja: "Japanese",
                    "jv-Latn": "Javanese (Latin)",
                    dyo: "Jola-Fonyi",
                    quc: "K'iche'",
                    kea: "Kabuverdianu",
                    kab: "Kabyle",
                    kkj: "Kako",
                    kln: "Kalenjin",
                    kam: "Kamba",
                    kn: "Kannada",
                    kr: "Kanuri",
                    "ks-Deva": "Kashmiri (Devanagari)",
                    "ks-Arab": "Kashmiri (Perso-Arabic)",
                    kk: "Kazakh",
                    km: "Khmer",
                    ki: "Kikuyu",
                    rw: "Kinyarwanda",
                    sw: "Kiswahili",
                    kok: "Konkani",
                    ko: "Korean",
                    khq: "Koyra Chiini",
                    ses: "Koyraboro Senni",
                    nmg: "Kwasio",
                    ky: "Kyrgyz",
                    lkt: "Lakota",
                    lag: "Langi",
                    lo: "Lao",
                    lv: "Latvian",
                    ln: "Lingala",
                    lt: "Lithuanian",
                    dsb: "Lower Sorbian",
                    lu: "Luba-Katanga",
                    smj: "Lule Sami",
                    luo: "Luo",
                    lb: "Luxembourgish",
                    luy: "Luyia",
                    mk: "Macedonian",
                    jmc: "Machame",
                    mgh: "Makhuwa-Meetto",
                    kde: "Makonde",
                    mg: "Malagasy",
                    ms: "Malay (Latin)",
                    ml: "Malayalam",
                    mt: "Maltese",
                    mni: "Manipuri",
                    gv: "Manx",
                    mi: "Maori",
                    arn: "Mapudungun",
                    mr: "Marathi",
                    mas: "Masai",
                    mer: "Meru",
                    mgo: "Meta'",
                    moh: "Mohawk",
                    "mn-Cyrl": "Mongolian (Cyrillic)",
                    "mn-Mong": "Mongolian (Traditional Mongolian)",
                    mfe: "Morisyen",
                    mua: "Mundang",
                    nqo: "N'Ko",
                    naq: "Nama",
                    ne: "Nepali",
                    nnh: "Ngiemboon",
                    jgo: "Ngomba",
                    nd: "North Ndebele",
                    kmr: "Northern Kurdish",
                    se: "Northern Sami",
                    nb: "Norwegian Bokmål",
                    nn: "Norwegian Nynorsk",
                    nus: "Nuer",
                    nyn: "Nyankole",
                    oc: "Occitan",
                    or: "Odia",
                    om: "Oromo",
                    "os-Cyrl": "Ossetian (Cyrillic)",
                    pap: "Papiamento",
                    ps: "Pashto",
                    fa: "Persian",
                    pl: "Polish",
                    pt: "Portuguese",
                    "pa-Arab": "Punjabi (Arabic)",
                    "pa-Guru": "Punjabi (Gurmukhi)",
                    quz: "Quechua",
                    otq: "Querétaro Otomi",
                    ksh: "Ripuarian",
                    ro: "Romanian",
                    rm: "Romansh",
                    rof: "Rombo",
                    rn: "Rundi",
                    ru: "Russian",
                    rwk: "Rwa",
                    ssy: "Saho",
                    sah: "Sakha",
                    saq: "Samburu",
                    sg: "Sango",
                    sbp: "Sangu",
                    sa: "Sanskrit",
                    gd: "Scottish Gaelic",
                    seh: "Sena",
                    "sr-Cyrl": "Serbian (Cyrillic)",
                    "sr-Latn": "Serbian (Latin)",
                    st: "Sesotho",
                    nso: "Sesotho sa Leboa",
                    tn: "Setswana",
                    ksb: "Shambala",
                    sn: "Shona",
                    "sd-Arab": "Sindhi (Arabic)",
                    "sd-Deva": "Sindhi (Devanagari)",
                    si: "Sinhala",
                    ss: "siSwati",
                    sms: "Skolt Sami",
                    sk: "Slovak",
                    sl: "Slovenian",
                    xog: "Soga",
                    so: "Somali",
                    nr: "South Ndebele",
                    sma: "Southern Sami",
                    es: "Spanish",
                    "zgh-Tfng": "Standard Moroccan Tamazight (Tifinagh)",
                    sv: "Swedish",
                    syr: "Syriac",
                    "shi-Latn": "Tachelhit (Latin)",
                    "shi-Tfng": "Tachelhit (Tifinagh)",
                    dav: "Taita",
                    "tg-Cyrl": "Tajik (Cyrillic)",
                    ta: "Tamil",
                    twq: "Tasawaq",
                    "tt-Cyrl": "Tatar (Cyrillic)",
                    te: "Telugu",
                    teo: "Teso",
                    th: "Thai",
                    bo: "Tibetan",
                    tig: "Tigre",
                    ti: "Tigrinya",
                    to: "Tongan",
                    tr: "Turkish",
                    "tk-Latn": "Turkmen (Latin)",
                    uk: "Ukrainian",
                    hsb: "Upper Sorbian",
                    ur: "Urdu",
                    "ug-Arab": "Uyghur (Arabic)",
                    "uz-Cyrl": "Uzbek (Cyrillic)",
                    "uz-Latn": "Uzbek (Latin)",
                    "uz-Arab": "Uzbek (Perso-Arabic)",
                    "vai-Latn": "Vai (Latin)",
                    "vai-Vaii": "Vai (Vai)",
                    "ca-ES-valencia": "Valencian",
                    ve: "Venda",
                    vi: "Vietnamese",
                    vo: "Volapük",
                    vun: "Vunjo",
                    wae: "Walser",
                    cy: "Welsh",
                    fy: "Western Frisian",
                    wal: "Wolaytta",
                    wo: "Wolof",
                    ts: "Xitsonga",
                    yav: "Yangben",
                    ii: "Yi",
                    yi: "Yiddish",
                    yo: "Yoruba",
                    yua: "Yucatec Maya",
                    dje: "Zarma",
                    az: "Azerbaijani",
                    bm: "Bamanankan",
                    bs: "Bosnian",
                    tzm: "Central Atlas Tamazight",
                    chr: "Cherokee",
                    zh: "Chinese",
                    ha: "Hausa",
                    iu: "Inuktitut",
                    jv: "Javanese",
                    ks: "Kashmiri",
                    mn: "Mongolian",
                    os: "Ossetian",
                    pa: "Punjabi",
                    sr: "Serbian",
                    sd: "Sindhi",
                    zgh: "Standard Moroccan Tamazight",
                    shi: "Tachelhit",
                    tg: "Tajik",
                    tt: "Tatar",
                    tk: "Turkmen",
                    ug: "Uyghur",
                    uz: "Uzbek",
                    vai: "Vai"
                }, TileRequestDataFactory.languageOptions = {
                    mapping: function(loc) {
                        if ("string" == typeof loc && loc) {
                            for (var languageName, languageCode = loc; languageCode; ) {
                                if (languageCode in TileRequestDataFactory.languageMapping) {
                                    languageName = TileRequestDataFactory.languageMapping[languageCode];
                                    break;
                                }
                                var lastHyphenIndex = Math.max(languageCode.lastIndexOf("-"), 0);
                                languageCode = languageCode.substring(0, lastHyphenIndex);
                            }
                            return languageName || loc;
                        }
                    }
                }, TileRequestDataFactory.tileRequestData = {
                    bingVolume: new bingSocial.TileRequestData([ TileRequestDataFactory.createUrl("Bing", "Volume") ], new bingSocial.CountResponseFormatter()),
                    bingVolumeChange: new bingSocial.TileRequestData([ TileRequestDataFactory.createUrl("Bing", "Volume"), TileRequestDataFactory.createUrl("Bing", "VolumeChange") ], new bingSocial.CountChangeResponseFormatter()),
                    activity: new bingSocial.TileRequestData([ TileRequestDataFactory.createUrl("Bing", "Activity") ], new bingSocial.ActivityChartResponseFormatter()),
                    languages: new bingSocial.TileRequestData([ TileRequestDataFactory.createUrl("Bing", "Language") ], new bingSocial.TreeMapResponseFormatter("Query._Microsoft.Language", TileRequestDataFactory.languageOptions)),
                    news: new bingSocial.TileRequestData([ TileRequestDataFactory.createUrl("Bing", "News") ], new bingSocial.BingNewsResponseFormatter()),
                    location: new bingSocial.TileRequestData([ TileRequestDataFactory.createUrl("Bing", "Location") ], new bingSocial.MapResponseFormatter("User.Country", {
                        logarithmic: !0
                    }))
                }, TileRequestDataFactory;
            }();
            bingSocial.TileRequestDataFactory = TileRequestDataFactory;
        }(bingSocial = data.bingSocial || (data.bingSocial = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var contracts;
        !function(contracts) {
            var SchemaChangeType;
            !function(SchemaChangeType) {
                var ObjectTypeEnum;
                !function(ObjectTypeEnum) {
                    ObjectTypeEnum.Column = "Column", ObjectTypeEnum.Hierarchy = "Hierarchy", ObjectTypeEnum.Measure = "Measure", 
                    ObjectTypeEnum.Table = "Table";
                }(ObjectTypeEnum = SchemaChangeType.ObjectTypeEnum || (SchemaChangeType.ObjectTypeEnum = {}));
            }(SchemaChangeType = contracts.SchemaChangeType || (contracts.SchemaChangeType = {}));
        }(contracts = data.contracts || (data.contracts = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        function createDataReaderFactory(plugins, extensions) {
            return new DataReaderFactory(plugins, extensions);
        }
        function defaultReaderType(type) {
            return type || "dsr";
        }
        data.createDataReaderFactory = createDataReaderFactory;
        var DataReaderUtils, DataReaderFactory = function() {
            function DataReaderFactory(plugins, extensions) {
                if (extensions) {
                    var _loop_1 = function(type) {};
                    for (var type in extensions) _loop_1(type);
                }
                this.plugins = plugins, this.extensions = extensions || {};
            }
            return DataReaderFactory.prototype.getPlugin = function(type) {
                return this.plugins[defaultReaderType(type)];
            }, DataReaderFactory.prototype.getExtension = function(type) {
                return this.extensions[type];
            }, DataReaderFactory;
        }();
        !function(DataReaderUtils) {
            function findTypes(references, query) {
                for (var schemaNames = findSchemas(query), types = [], _i = 0, references_1 = references; _i < references_1.length; _i++) {
                    var reference = references_1[_i];
                    if (!schemaNames || _.contains(schemaNames, reference.name)) {
                        var currentType = readerType(reference);
                        _.contains(types, currentType) || types.push(currentType);
                    }
                }
                return types;
            }
            function readerType(reference) {
                return defaultReaderType(reference.type);
            }
            function findSchemas(query) {
                if (query) {
                    var schemas = [], finder = new SchemaNameFinder(schemas);
                    return finder.run(query), schemas;
                }
            }
            function uniqueReaderTypes(references) {
                return _.chain(references).map(function(ref) {
                    return readerType(ref);
                }).uniq().value();
            }
            DataReaderUtils.findTypes = findTypes, DataReaderUtils.readerType = readerType, 
            DataReaderUtils.findSchemas = findSchemas, DataReaderUtils.uniqueReaderTypes = uniqueReaderTypes;
            var SchemaNameFinder = function() {
                function SchemaNameFinder(schemas) {
                    this.schemas = schemas;
                }
                return SchemaNameFinder.prototype.run = function(query) {
                    for (var fromClause = query.from(), _i = 0, _a = fromClause.keys(); _i < _a.length; _i++) {
                        var fromKey = _a[_i];
                        fromClause.source(fromKey).accept(this, void 0);
                    }
                }, SchemaNameFinder.prototype.visitEntity = function(source) {
                    var schema = source.schema, schemas = this.schemas;
                    _.contains(schemas, schema) || schemas.push(schema);
                }, SchemaNameFinder.prototype.visitSubquery = function(source) {
                    this.run(source.subquery);
                }, SchemaNameFinder.prototype.visitExpr = function(source) {}, SchemaNameFinder;
            }();
        }(DataReaderUtils = data.DataReaderUtils || (data.DataReaderUtils = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        function createDataReaderProvider(factory, hostServices) {
            return new DataReaderProvider(factory, hostServices);
        }
        function wrapQueryExtensionProvider(extensionType, references, extensionProvider) {
            for (var matchingDataReaderDataSources = [], _i = 0, references_2 = references; _i < references_2.length; _i++) {
                var reference = references_2[_i], type = data.DataReaderUtils.readerType(reference);
                type === extensionType && matchingDataReaderDataSources.push(reference[type]);
            }
            return extensionProvider(matchingDataReaderDataSources);
        }
        var ArrayExtensions = jsCommon.ArrayExtensions;
        data.createDataReaderProvider = createDataReaderProvider;
        var DataReaderProvider = function() {
            function DataReaderProvider(factory, hostServices) {
                this.factory = factory, this.hostServices = hostServices, this.readers = {}, this.queryGen = {}, 
                this.schemaReaders = {};
            }
            return DataReaderProvider.prototype.reader = function(typeOrTypes) {
                var _this = this;
                return this.findSinglePropertyDefinition(ArrayExtensions.ensureArray(typeOrTypes), function(p) {
                    return p.reader(_this.hostServices);
                }, _.noop, this.readers);
            }, DataReaderProvider.prototype.readerType = function(typeOrTypes) {
                var _this = this, resolution = this.resolvePluginProperty(ArrayExtensions.ensureArray(typeOrTypes), function(p) {
                    return p.reader(_this.hostServices);
                }, _.noop, this.readers);
                return resolution && resolution.type;
            }, DataReaderProvider.prototype.queryGenerator = function(typeOrTypes) {
                return this.findSinglePropertyDefinition(ArrayExtensions.ensureArray(typeOrTypes), function(p) {
                    return p.queryGenerator && p.queryGenerator();
                }, _.noop, this.queryGen);
            }, DataReaderProvider.prototype.queryExtensionLookup = function(referenceOrReferences) {
                var references = ArrayExtensions.ensureArray(referenceOrReferences), types = _.chain(references).map(function(reference) {
                    return data.DataReaderUtils.readerType(reference);
                }).uniq().value();
                return this.findSingleExtensionPropertyDefinition(types, function(e) {
                    return e.queryExtensionProvider && wrapQueryExtensionProvider(e.name, references, e.queryExtensionProvider);
                });
            }, DataReaderProvider.prototype.schemaReader = function(type) {
                var _this = this;
                return this.findSinglePropertyDefinition([ type ], function(p) {
                    return p.schemaReader && p.schemaReader(_this.hostServices);
                }, function(e) {
                    return e.schemaReader && e.schemaReader(_this.hostServices);
                }, this.schemaReaders);
            }, DataReaderProvider.prototype.getCacheKey = function(typeOrtypes) {
                var types = ArrayExtensions.ensureArray(typeOrtypes);
                return types.length < 2 ? types[0] : "[" + types.join(",") + "]";
            }, DataReaderProvider.prototype.findSinglePropertyDefinition = function(types, pluginCheck, extensionCheck, cache) {
                var cacheKey = this.getCacheKey(types), cached = cache[cacheKey];
                if (cached) return cached;
                var resolution = this.resolvePluginProperty(types, pluginCheck, extensionCheck, cache);
                return resolution ? cache[cacheKey] = resolution.property : void 0;
            }, DataReaderProvider.prototype.findSingleExtensionPropertyDefinition = function(types, extensionCheck) {
                for (var result, basePluginName, _i = 0, types_1 = types; _i < types_1.length; _i++) {
                    var type = types_1[_i], plugin = this.factory.getPlugin(type);
                    if (plugin) {
                        if (basePluginName && basePluginName !== plugin.name) return;
                        basePluginName = plugin.name;
                    } else {
                        var extension = this.factory.getExtension(type);
                        if (!extension) return;
                        if (basePluginName && basePluginName !== extension.extends) return;
                        basePluginName = extension.extends;
                        var current = extensionCheck(extension);
                        if (current) {
                            if (result && current !== result) return;
                            result = current;
                        }
                    }
                }
                return result;
            }, DataReaderProvider.prototype.resolvePluginProperty = function(types, pluginCheck, extensionCheck, cache) {
                for (var result, _i = 0, types_2 = types; _i < types_2.length; _i++) {
                    var type = types_2[_i], current = this.resolveProperty(type, pluginCheck, extensionCheck, cache);
                    if (!current || result && current.property !== result.property) return;
                    result = current;
                }
                return result;
            }, DataReaderProvider.prototype.resolveProperty = function(type, pluginCheck, extensionCheck, cache) {
                var cacheKey, result;
                if (cache && (cacheKey = this.getCacheKey(type), result = cache[cacheKey])) return {
                    type: type,
                    property: result
                };
                var plugin = this.factory.getPlugin(type);
                if (plugin) {
                    if (result = pluginCheck(plugin), !result) return;
                    return cache && (cache[cacheKey] = result), {
                        type: type,
                        property: result
                    };
                }
                var extension = this.factory.getExtension(type);
                return extension ? (result = extensionCheck(extension)) ? (cache && (cache[cacheKey] = result), 
                {
                    type: type,
                    property: result
                }) : this.resolveProperty(extension.extends, pluginCheck, extensionCheck, cache) : void 0;
            }, DataReaderProvider;
        }();
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        function applyDataReductionDefaults(mappings) {
            for (var mappingsLength = mappings.length, i = 0; i < mappingsLength; i++) {
                var currentMapping = mappings[i];
                Impl.applyDataReductionDefaults(currentMapping);
            }
        }
        data.applyDataReductionDefaults = applyDataReductionDefaults;
        var Impl;
        !function(Impl) {
            function applyDataReductionDefaults(mapping) {
                mapping.categorical && applyDefaultsCategorical(mapping.categorical), mapping.table && applyDefaultsTable(mapping.table), 
                mapping.matrix && applyDefaultsMatrix(mapping.matrix);
            }
            function applyDefaultsMatrix(matrix) {
                matrix.rows && applyDefaultsHasReductionAlgorithm(matrix.rows), matrix.columns && applyDefaultsHasReductionAlgorithm(matrix.columns);
            }
            function applyDefaultsTable(table) {
                table.rows && applyDefaultsHasReductionAlgorithm(table.rows);
            }
            function applyDefaultsCategorical(categorical) {
                if (!categorical.dataReductionAlgorithm) {
                    categorical.categories && applyDefaultsHasReductionAlgorithm(categorical.categories);
                    var grouped = categorical.values;
                    grouped && grouped.group && applyDefaultsGrouped(grouped);
                }
            }
            function applyDefaultsGrouped(mapping) {
                mapping.group.dataReductionAlgorithm || (mapping.group.dataReductionAlgorithm = createDefaultReductionAlgorithm());
            }
            function applyDefaultsHasReductionAlgorithm(mapping) {
                mapping.dataReductionAlgorithm || (mapping.dataReductionAlgorithm = createDefaultReductionAlgorithm());
            }
            function createDefaultReductionAlgorithm() {
                return {
                    top: {}
                };
            }
            Impl.applyDataReductionDefaults = applyDataReductionDefaults;
        }(Impl || (Impl = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        function compileDataView(options) {
            for (var compiler = new DataViewMappingCompiler(options.queryDefn, options.queryProjections, options.schema, options.objectDescriptors, options.objectDefinitions, options.roles || []), compiledMappings = [], mappings = options.mappings, i = 0, len = mappings.length; i < len; i++) compiledMappings.push(compiler.compileMapping(mappings[i]));
            return compiledMappings;
        }
        var ArrayExtensions = jsCommon.ArrayExtensions, UnionExtensions = jsCommon.UnionExtensions;
        data.compileDataView = compileDataView;
        var DataViewMappingCompiler = function() {
            function DataViewMappingCompiler(queryDefn, queryProjections, schema, objectDescriptors, objectDefinitions, roles) {
                this.queryDefn = queryDefn, this.queryProjections = queryProjections, this.schema = schema, 
                this.objectDescriptors = objectDescriptors, this.objectDefinitions = objectDefinitions, 
                this.roles = roles;
            }
            return DataViewMappingCompiler.prototype.compileMapping = function(mapping) {
                var metadata = this.compileMetadata(), compiledMapping = {
                    metadata: metadata
                };
                return mapping.categorical && (compiledMapping.categorical = this.compileCategorical(mapping.categorical)), 
                mapping.table && (compiledMapping.table = this.compileTable(mapping.table)), mapping.single && (compiledMapping.single = this.compileSingle(mapping.single)), 
                mapping.tree && (compiledMapping.tree = this.compileTree(mapping.tree)), mapping.matrix && (compiledMapping.matrix = this.compileMatrix(mapping.matrix)), 
                mapping.scriptResult && (compiledMapping.scriptResult = this.compileScriptResult(mapping.scriptResult, metadata)), 
                mapping.usage && (compiledMapping.usage = this.compileUsage(mapping.usage)), compiledMapping;
            }, DataViewMappingCompiler.prototype.compileMetadata = function() {
                for (var metadata = {
                    columns: []
                }, orderBy = this.queryDefn.orderBy(), _loop_2 = function(select) {
                    var sortDefinition = _.find(orderBy, function(o) {
                        return data.SQExpr.equals(o.expr, select.expr);
                    }), parameterMetadata = data.SQExprUtils.getParameterMetadata(select.expr, this_1.schema);
                    metadata.columns.push({
                        displayName: void 0,
                        queryName: select.name,
                        type: this_1.tryGetExprType(select.expr),
                        sort: sortDefinition && sortDefinition.direction,
                        parameter: parameterMetadata
                    });
                }, this_1 = this, _i = 0, _a = this.queryDefn.select(); _i < _a.length; _i++) {
                    var select = _a[_i];
                    _loop_2(select);
                }
                var objectDescriptors = this.objectDescriptors, objectDefinitions = this.objectDefinitions;
                if (!objectDefinitions || !objectDescriptors) return metadata;
                var objectsForAllSelectors = data.DataViewObjectEvaluationUtils.groupObjectsBySelector(objectDefinitions), evalContext = data.createStaticEvalContext();
                if (!_.isEmpty(objectsForAllSelectors.metadataOnce)) {
                    var objects = this.evaluateMetadataOnceObjects(objectsForAllSelectors.metadataOnce, evalContext);
                    objects && (metadata.objects = objects);
                }
                if (!_.isEmpty(objectsForAllSelectors.metadata)) for (var _b = 0, _c = metadata.columns; _b < _c.length; _b++) {
                    var column = _c[_b], objects = this.evaluateMetadataObjects(column, objectsForAllSelectors.metadata, evalContext);
                    objects && (column.objects = objects);
                }
                return metadata;
            }, DataViewMappingCompiler.prototype.evaluateMetadataOnceObjects = function(objectDefns, evalContext) {
                for (var metadataObjects, _i = 0, objectDefns_1 = objectDefns; _i < objectDefns_1.length; _i++) {
                    var objectDefn = objectDefns_1[_i], selectorId = objectDefn.selector && objectDefn.selector.id, objects = data.DataViewObjectEvaluationUtils.evaluateDataViewObjects(evalContext, this.objectDescriptors, objectDefn.objects);
                    objects && (metadataObjects || (metadataObjects = {}), powerbi.DataViewObjects.mergeObjects(metadataObjects, objects, selectorId));
                }
                return metadataObjects;
            }, DataViewMappingCompiler.prototype.evaluateMetadataObjects = function(column, objectDefns, evalContext) {
                for (var columnObjects, _i = 0, objectDefns_2 = objectDefns; _i < objectDefns_2.length; _i++) {
                    var objectDefn = objectDefns_2[_i], selector = objectDefn.selector;
                    if (selector.metadata && selector.metadata === column.queryName) {
                        var objects = data.DataViewObjectEvaluationUtils.evaluateDataViewObjects(evalContext, this.objectDescriptors, objectDefn.objects);
                        return objects && (columnObjects || (columnObjects = {}), powerbi.DataViewObjects.mergeObjects(columnObjects, objects, selector.id)), 
                        columnObjects;
                    }
                }
            }, DataViewMappingCompiler.prototype.compileCategorical = function(mapping) {
                var compiled = {};
                mapping.categories && (compiled.categories = this.compileRoleMappingWithReduction(mapping.categories));
                var values = mapping.values;
                if (values) {
                    var grouped = this.compileGrouped(values), list = this.compileList(values), roleMapping = this.compileRoleMapping(values);
                    compiled.values = UnionExtensions.mergeUnionType(grouped, list, roleMapping);
                }
                return mapping.includeEmptyGroups && (compiled.includeEmptyGroups = mapping.includeEmptyGroups), 
                null != mapping.dataVolume && (compiled.dataVolume = mapping.dataVolume), mapping.dataReductionAlgorithm && (compiled.dataReductionAlgorithm = this.compileReduction(mapping.dataReductionAlgorithm)), 
                compiled;
            }, DataViewMappingCompiler.prototype.compileTable = function(mapping) {
                var roleMapping = this.compileRoleMappingWithReduction(mapping.rows), listMapping = this.compileListWithReduction(mapping.rows), rows = UnionExtensions.mergeUnionType(roleMapping, listMapping), compiled = {
                    rows: rows
                };
                return null != mapping.dataVolume && (compiled.dataVolume = mapping.dataVolume), 
                compiled;
            }, DataViewMappingCompiler.prototype.compileSingle = function(mapping) {
                var role = this.compileRole(mapping.role);
                return {
                    role: role
                };
            }, DataViewMappingCompiler.prototype.compileScriptResult = function(mapping, metadata) {
                var compiled = {
                    dataInput: this.compileMapping(mapping.dataInput),
                    script: this.compileScriptDefinition(mapping.script, metadata)
                };
                return compiled;
            }, DataViewMappingCompiler.prototype.compileScriptDefinition = function(mapping, metadata) {
                var scriptInput = powerbi.ScriptResultUtil.getScriptInputFromScriptDefinition(this.queryProjections, this.queryDefn.select(), this.schema, mapping, metadata.objects), compiled = {
                    source: mapping.source,
                    provider: mapping.provider,
                    scriptInput: scriptInput,
                    scriptSourceDefault: mapping.scriptSourceDefault,
                    scriptProviderDefault: mapping.scriptProviderDefault,
                    scriptOutputType: mapping.scriptOutputType
                };
                return compiled;
            }, DataViewMappingCompiler.prototype.compileTree = function(mapping) {
                var compiled = {};
                return mapping.nodes && (compiled.nodes = this.compileForWithReduction(mapping.nodes)), 
                mapping.values && (compiled.values = this.compileFor(mapping.values)), null != mapping.dataVolume && (compiled.dataVolume = mapping.dataVolume), 
                compiled;
            }, DataViewMappingCompiler.prototype.compileMatrix = function(mapping) {
                var compiled = {};
                if (mapping.rows) {
                    var forMapping = this.compileForWithReduction(mapping.rows), listMapping = this.compileListWithCompositeWithReduction(mapping.rows);
                    compiled.rows = UnionExtensions.mergeUnionType(forMapping, listMapping);
                }
                if (mapping.columns && (compiled.columns = this.compileForWithReduction(mapping.columns)), 
                mapping.values) {
                    var forMapping = this.compileRoleMapping(mapping.values), listMapping = this.compileList(mapping.values);
                    compiled.values = UnionExtensions.mergeUnionType(forMapping, listMapping);
                }
                return null != mapping.dataVolume && (compiled.dataVolume = mapping.dataVolume), 
                compiled;
            }, DataViewMappingCompiler.prototype.compileUsage = function(usage) {
                if (usage.regression || usage.forecast) return usage;
            }, DataViewMappingCompiler.prototype.compileListWithReduction = function(mapping) {
                var compiled = this.compileList(mapping);
                if (compiled) return mapping.dataReductionAlgorithm && (compiled.dataReductionAlgorithm = this.compileReduction(mapping.dataReductionAlgorithm)), 
                compiled;
            }, DataViewMappingCompiler.prototype.compileList = function(mapping) {
                var _this = this;
                if (mapping.select) {
                    var select = _.map(mapping.select, function(item) {
                        return _this.compileRoleMapping(item);
                    });
                    return {
                        select: select
                    };
                }
            }, DataViewMappingCompiler.prototype.compileListWithCompositeWithReduction = function(mapping) {
                var compiled = this.compileListWithComposite(mapping);
                if (compiled) return mapping.dataReductionAlgorithm && (compiled.dataReductionAlgorithm = this.compileReduction(mapping.dataReductionAlgorithm)), 
                compiled;
            }, DataViewMappingCompiler.prototype.compileListWithComposite = function(mapping) {
                var _this = this;
                if (mapping.select) {
                    var select = _.map(mapping.select, function(item) {
                        return _this.compileRoleMappingWithComposite(item);
                    });
                    return {
                        select: select
                    };
                }
            }, DataViewMappingCompiler.prototype.compileGrouped = function(mapping) {
                var _this = this;
                if (mapping.group) {
                    var byItems = this.compileRole(mapping.group.by), select = _.map(mapping.group.select, function(item) {
                        return _this.compileRoleMapping(item);
                    }), compiled = {
                        group: {
                            by: byItems,
                            select: select
                        }
                    };
                    return mapping.group.dataReductionAlgorithm && (compiled.group.dataReductionAlgorithm = this.compileReduction(mapping.group.dataReductionAlgorithm)), 
                    compiled;
                }
            }, DataViewMappingCompiler.prototype.compileRoleMapping = function(mapping) {
                var compiledBind = this.compileBind(mapping), compiledFor = this.compileFor(mapping);
                return UnionExtensions.mergeUnionType(compiledBind, compiledFor);
            }, DataViewMappingCompiler.prototype.compileRoleMappingWithComposite = function(mapping) {
                var compiledBind = this.compileBind(mapping), compiledFor = this.compileFor(mapping), compiledComposite = this.compileComposite(mapping);
                return UnionExtensions.mergeUnionType(compiledBind, compiledFor, compiledComposite);
            }, DataViewMappingCompiler.prototype.compileRoleMappingWithReduction = function(mapping) {
                var compiledRole = this.compileRoleMapping(mapping), compiledList = this.compileList(mapping);
                if (compiledRole || compiledList) {
                    var compiled = UnionExtensions.mergeUnionType(compiledRole, compiledList);
                    return compiled && mapping.dataReductionAlgorithm && (compiled.dataReductionAlgorithm = this.compileReduction(mapping.dataReductionAlgorithm)), 
                    compiled;
                }
            }, DataViewMappingCompiler.prototype.compileBind = function(mapping) {
                if (mapping.bind) {
                    var items = this.compileRole(mapping.bind.to, mapping.bind.aggregates);
                    return {
                        bind: {
                            to: items
                        }
                    };
                }
            }, DataViewMappingCompiler.prototype.compileForWithReduction = function(mapping) {
                var compiled = this.compileFor(mapping);
                if (compiled) return mapping.dataReductionAlgorithm && (compiled.dataReductionAlgorithm = this.compileReduction(mapping.dataReductionAlgorithm)), 
                compiled;
            }, DataViewMappingCompiler.prototype.compileFor = function(mapping) {
                if (mapping.for) {
                    var items = this.compileRole(mapping.for.in);
                    return {
                        for: {
                            in: items
                        }
                    };
                }
            }, DataViewMappingCompiler.prototype.compileComposite = function(mapping) {
                var _this = this;
                if (mapping.composite) {
                    var items = _.map(mapping.composite, function(roleMapping) {
                        return _this.compileRoleMapping(roleMapping);
                    });
                    return {
                        composite: items
                    };
                }
            }, DataViewMappingCompiler.prototype.compileRole = function(role, aggregates) {
                var items, _this = this, selects = this.queryDefn.select(), projections = this.queryProjections[role], dataRole = ArrayExtensions.findItemWithName(this.roles, role);
                if (projections && projections.all().length > 0) {
                    var isScalarKeySupported_1 = !1;
                    dataRole && (isScalarKeySupported_1 = data.ScalarKeyUtils.isScalarKeySupportedForRole(this.schema, this.queryDefn, this.queryProjections, dataRole.name));
                    var itemWithPossibleScalarKey_1 = this.getScalarKeyRoleItemQueryRef(projections);
                    items = _.map(projections.all(), function(projection) {
                        var isActiveRoleItem = projection.queryRef === itemWithPossibleScalarKey_1;
                        return _this.createDataViewRoleItem(selects.withName(projection.queryRef), dataRole, isScalarKeySupported_1, isActiveRoleItem);
                    });
                }
                var compiledRole = {
                    role: role,
                    items: items
                }, projection = this.queryProjections[role];
                return projection && (projection.showAll && (compiledRole.showAll = !0), projection.activeProjectionRefs && (compiledRole.activeItems = projection.activeProjectionRefs)), 
                aggregates && (compiledRole.aggregates = _.cloneDeep(aggregates)), compiledRole;
            }, DataViewMappingCompiler.prototype.getScalarKeyRoleItemQueryRef = function(projections) {
                var activeProjectionRefs = projections.activeProjectionRefs;
                return _.isEmpty(activeProjectionRefs) ? projections.all()[0].queryRef : _.last(activeProjectionRefs);
            }, DataViewMappingCompiler.prototype.createDataViewRoleItem = function(select, dataRole, roleSupportsScalarKey, isDesignatedScalarKeyRoleItem) {
                var item = {
                    queryName: select.name
                }, type = this.tryGetExprType(select.expr);
                return type && (item.type = type), dataRole && null != dataRole.joinPredicate && (item.joinPredicate = dataRole.joinPredicate), 
                item.scalarKeyInfo = {
                    hasScalarKey: roleSupportsScalarKey && isDesignatedScalarKeyRoleItem
                }, item;
            }, DataViewMappingCompiler.prototype.tryGetExprType = function(expr) {
                var metadata = expr.getMetadata(this.schema);
                if (metadata) return metadata.type;
            }, DataViewMappingCompiler.prototype.compileReduction = function(algorithm) {
                if (algorithm) {
                    var compiled = {};
                    if (algorithm.top && (compiled.top = {}, algorithm.top.count && (compiled.top.count = algorithm.top.count)), 
                    algorithm.bottom && (compiled.bottom = {}, algorithm.bottom.count && (compiled.bottom.count = algorithm.bottom.count)), 
                    algorithm.sample && (compiled.sample = {}, algorithm.sample.count && (compiled.sample.count = algorithm.sample.count)), 
                    algorithm.window && (compiled.window = {}, algorithm.window.count && (compiled.window.count = algorithm.window.count)), 
                    algorithm.binnedLineSample && (compiled.binnedLineSample = {}), algorithm.overlappingPointsSample) {
                        var inputSamplingAlgorithm = algorithm.overlappingPointsSample;
                        compiled.overlappingPointsSample = {}, inputSamplingAlgorithm.count && (compiled.overlappingPointsSample.count = inputSamplingAlgorithm.count);
                        var compiledRoleX = this.getCompiledRoleForCartesianRoleKind(0);
                        compiledRoleX && (compiled.overlappingPointsSample.x = {
                            role: compiledRoleX
                        });
                        var compiledRoleY = this.getCompiledRoleForCartesianRoleKind(1);
                        compiledRoleY && (compiled.overlappingPointsSample.y = {
                            role: compiledRoleY
                        });
                    }
                    return compiled;
                }
            }, DataViewMappingCompiler.prototype.getCompiledRoleForCartesianRoleKind = function(cartesianKind) {
                var targetRole = _.filter(this.roles, function(role) {
                    return role.cartesianKind === cartesianKind;
                });
                if (1 === _.size(targetRole)) return this.compileRole(targetRole[0].name);
            }, DataViewMappingCompiler;
        }();
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var QueryDataViewCategorical;
        jsCommon.ArrayExtensions;
        !function(QueryDataViewCategorical) {
            function removeGroupInstances(metadata, dataViewCategorical, categoryRemovalPredicate, seriesRemovalPredicate) {
                seriesRemovalPredicate && removeSeriesByPredicate(metadata, dataViewCategorical, seriesRemovalPredicate), 
                categoryRemovalPredicate && removeCategoryByPredicate(metadata, dataViewCategorical, categoryRemovalPredicate);
            }
            function removeCategoryByPredicate(metadata, dataViewCategorical, removalPredicate) {
                var categories = dataViewCategorical.categories;
                if (!_.isEmpty(categories)) {
                    var rowIndicesToRemove = computeCategoryIndicesToRemove(categories, removalPredicate);
                    removeByRowIndices(metadata, dataViewCategorical, rowIndicesToRemove);
                }
            }
            function computeCategoryIndicesToRemove(categories, removalPredicate) {
                for (var valueCount = categories[0].values.length, categoryIndicesToRemove = [], i = valueCount - 1; i >= 0; i--) removalPredicate(i, categories) && categoryIndicesToRemove.push(i);
                return categoryIndicesToRemove;
            }
            function removeByRowIndices(metadata, dataViewCategorical, rowIndicesToRemove) {
                if (!_.isEmpty(rowIndicesToRemove)) {
                    if (data.DataViewCategoricalUtils.getRowCount(dataViewCategorical) === rowIndicesToRemove.length) return void removeAllData(metadata, dataViewCategorical);
                    var categories = dataViewCategorical.categories;
                    if (!_.isEmpty(categories)) for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
                        var category = categories_1[_i];
                        spliceByDescendingIndices(category.values, rowIndicesToRemove), spliceByDescendingIndices(category.identity, rowIndicesToRemove);
                    }
                    var measureColumns = dataViewCategorical.values;
                    if (!_.isEmpty(measureColumns)) for (var _a = 0, measureColumns_1 = measureColumns; _a < measureColumns_1.length; _a++) {
                        var measureColumn = measureColumns_1[_a];
                        spliceByDescendingIndices(measureColumn.values, rowIndicesToRemove);
                    }
                }
            }
            function removeSeriesByPredicate(metadata, dataViewCategorical, removalPredicate) {
                var seriesInstances = dataViewCategorical.values && dataViewCategorical.values.grouped();
                if (!_.isEmpty(seriesInstances)) {
                    var seriesMetadataColumn = dataViewCategorical.values && dataViewCategorical.values.source, seriesIndicesToRemove = computeSeriesIndicesToRemove(seriesMetadataColumn, seriesInstances, removalPredicate);
                    removeBySeriesIndices(metadata, dataViewCategorical, seriesIndicesToRemove);
                }
            }
            function removeBySeriesIndices(metadata, dataViewCategorical, seriesIndicesToRemove) {
                if (!_.isEmpty(seriesIndicesToRemove)) {
                    var seriesAndMeasures = dataViewCategorical.values, seriesInstances = seriesAndMeasures.grouped();
                    if (seriesInstances.length === seriesIndicesToRemove.length) return void removeAllData(metadata, dataViewCategorical);
                    var measurePerSeriesCount = seriesInstances[0].values.length;
                    if (measurePerSeriesCount > 0) for (var metadataColumns = metadata.columns, _i = 0, seriesIndicesToRemove_1 = seriesIndicesToRemove; _i < seriesIndicesToRemove_1.length; _i++) {
                        for (var seriesIndex = seriesIndicesToRemove_1[_i], indexOfFirstMeasureInSeries = seriesIndex * measurePerSeriesCount, i = indexOfFirstMeasureInSeries, ilen = indexOfFirstMeasureInSeries + measurePerSeriesCount; i < ilen; i++) {
                            var metadataColumnWithGroupName = seriesAndMeasures[i].source;
                            removeMetadataColumn(metadataColumns, metadataColumnWithGroupName);
                        }
                        seriesAndMeasures.splice(indexOfFirstMeasureInSeries, measurePerSeriesCount);
                    }
                    spliceByDescendingIndices(seriesInstances, seriesIndicesToRemove), seriesAndMeasures.grouped = function() {
                        return seriesInstances;
                    };
                }
            }
            function removeMetadataColumn(collection, toRemove) {
                var columnIndex = collection.indexOf(toRemove);
                columnIndex >= 0 && collection.splice(columnIndex, 1);
            }
            function removeAllData(metadata, dataViewCategorical) {
                var categories = dataViewCategorical.categories;
                if (categories) for (var _i = 0, categories_2 = categories; _i < categories_2.length; _i++) {
                    var category = categories_2[_i];
                    category.values.splice(0), category.identity.splice(0);
                }
                var seriesAndMeasures = dataViewCategorical.values;
                if (seriesAndMeasures) {
                    var seriesInstances = seriesAndMeasures.grouped();
                    if (!_.isEmpty(seriesInstances)) {
                        for (var firstSeriesInstance = seriesInstances[0], metadataColumns = metadata.columns, _loop_3 = function(measureColumn) {
                            var measureMetadataColumn = measureColumn.source;
                            if (measureMetadataColumn.groupName) {
                                var metadataColumnWithoutGroupName = _.find(metadataColumns, function(metadataColumn) {
                                    return !metadataColumn.groupName && metadataColumn.index === measureMetadataColumn.index && metadataColumn.isMeasure === measureMetadataColumn.isMeasure;
                                });
                                metadataColumnWithoutGroupName ? (measureColumn.source = metadataColumnWithoutGroupName, 
                                removeMetadataColumn(metadataColumns, measureMetadataColumn)) : delete measureMetadataColumn.groupName;
                            }
                        }, _a = 0, _b = firstSeriesInstance.values; _a < _b.length; _a++) {
                            var measureColumn = _b[_a];
                            _loop_3(measureColumn);
                        }
                        var emptySeries_1 = [ {
                            values: firstSeriesInstance.values,
                            objects: firstSeriesInstance.objects
                        } ];
                        if (seriesAndMeasures.grouped = function() {
                            return emptySeries_1;
                        }, seriesInstances.length >= 2) {
                            var measuresPerSeriesCount = firstSeriesInstance.values.length;
                            if (measuresPerSeriesCount > 0) {
                                for (var seriesToRemoveCount = seriesInstances.length - 1, measuresToRemoveCount = measuresPerSeriesCount * seriesToRemoveCount, i = measuresPerSeriesCount, ilen = measuresPerSeriesCount + measuresToRemoveCount; i < ilen; i++) {
                                    var metadataColumnWithGroupName = seriesAndMeasures[i].source;
                                    removeMetadataColumn(metadataColumns, metadataColumnWithGroupName);
                                }
                                seriesAndMeasures.splice(measuresPerSeriesCount, measuresToRemoveCount);
                            }
                        }
                    }
                    for (var _c = 0, seriesAndMeasures_1 = seriesAndMeasures; _c < seriesAndMeasures_1.length; _c++) {
                        var measure = seriesAndMeasures_1[_c];
                        measure.values.splice(0), delete measure.identity;
                    }
                }
            }
            function computeSeriesIndicesToRemove(seriesMetadataColumn, seriesInstances, removalPredicate) {
                for (var seriesIndicesToRemove = [], i = seriesInstances.length - 1; i >= 0; i--) removalPredicate(seriesInstances[i], seriesMetadataColumn) && seriesIndicesToRemove.push(i);
                return seriesIndicesToRemove;
            }
            function spliceByDescendingIndices(values, indicesToRemove) {
                if (!_.isEmpty(indicesToRemove)) {
                    if (values.length === indicesToRemove.length) return void values.splice(0);
                    for (var nextSpliceStart, nextSpliceCount = 0, _i = 0, indicesToRemove_1 = indicesToRemove; _i < indicesToRemove_1.length; _i++) {
                        var nextIndex = indicesToRemove_1[_i];
                        void 0 === nextSpliceStart || nextSpliceStart === nextIndex + 1 ? (nextSpliceStart = nextIndex, 
                        nextSpliceCount++) : (values.splice(nextSpliceStart, nextSpliceCount), nextSpliceStart = nextIndex, 
                        nextSpliceCount = 1);
                    }
                    values.splice(nextSpliceStart, nextSpliceCount);
                }
            }
            QueryDataViewCategorical.removeGroupInstances = removeGroupInstances;
        }(QueryDataViewCategorical = data.QueryDataViewCategorical || (data.QueryDataViewCategorical = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var ClientSideFilter, QueryDataViewCategorical = powerbi.data.QueryDataViewCategorical, StringExtensions = jsCommon.StringExtensions;
        !function(ClientSideFilter) {
            function isMoreRestrictiveFilter(restrictiveFilter, baseFilter) {
                if (!data.SQFilter.targetsEqual(restrictiveFilter, baseFilter)) return !1;
                var restrictiveFilterCondition = restrictiveFilter.condition, baseFilterCondition = baseFilter.condition;
                if (restrictiveFilterCondition instanceof data.SQContainsExpr && baseFilterCondition instanceof data.SQContainsExpr) {
                    var restrictiveFilterInfo = SQFilterExprHelper.getInfoIfFilteringByStringConstant(restrictiveFilterCondition), baseFilterInfo = SQFilterExprHelper.getInfoIfFilteringByStringConstant(baseFilterCondition);
                    if (restrictiveFilterInfo && baseFilterInfo && data.SQExpr.equals(restrictiveFilterInfo.otherSide, baseFilterInfo.otherSide)) return StringExtensions.contains(normalizeString(restrictiveFilterInfo.constantValue), normalizeString(baseFilterInfo.constantValue));
                }
                return !1;
            }
            function tryConvertToClientSideFilters(selects, filters) {
                var hasUnsupportedFilter = _.any(filters, function(filter) {
                    return !isAttributeFilter(filter);
                });
                if (!hasUnsupportedFilter) {
                    for (var conversionVisitor = new SQFilterConditionsToClientSideFilterConversionVisitor(selects), _i = 0, filters_1 = filters; _i < filters_1.length; _i++) {
                        var filter = filters_1[_i];
                        filter.condition.accept(conversionVisitor);
                    }
                    return conversionVisitor.getClientSideFiltersIfAllSupported();
                }
            }
            function applyClientSideFilters(queryDataView, clientSideFilters) {
                if (!_.isEmpty(clientSideFilters) && !_.isEmpty(queryDataView.metadata.columns)) {
                    var categorical = queryDataView.categorical;
                    if (categorical) {
                        var seriesFilterPredicate = tryCreateDynamicSeriesRemovalPredicate(categorical.values && categorical.values.source, clientSideFilters), categoryFilterPredicate = tryCreateCategoryRemovalPredicate(categorical.categories, clientSideFilters);
                        QueryDataViewCategorical.removeGroupInstances(queryDataView.metadata, categorical, categoryFilterPredicate, seriesFilterPredicate);
                    }
                    return queryDataView;
                }
            }
            function isAttributeFilter(filter) {
                return !filter.target;
            }
            function getFilterSelectIndex(clientSideFilter) {
                var condition = clientSideFilter.Condition;
                if (condition.Contains) return condition.Contains.SelectIndex;
            }
            function getFiltersByMetadataColumn(clientSideFilters, metadataColumns) {
                if (_.isEmpty(clientSideFilters) || _.isEmpty(metadataColumns)) return [];
                for (var selectIndices = {}, _i = 0, metadataColumns_1 = metadataColumns; _i < metadataColumns_1.length; _i++) {
                    var metadataColumn = metadataColumns_1[_i];
                    selectIndices[metadataColumn.index] = !0;
                }
                return _.filter(clientSideFilters, function(clientSideFilter) {
                    var filterSelectIndex = getFilterSelectIndex(clientSideFilter);
                    return !!selectIndices[filterSelectIndex];
                });
            }
            function tryCreateCategoryRemovalPredicate(categories, clientSideFilters) {
                var categoryFilters = getFiltersByMetadataColumn(clientSideFilters, _.map(categories, function(category) {
                    return category.source;
                }));
                if (!_.isEmpty(categoryFilters)) {
                    var removalPredicate = function(categoryInstanceIndex, categories) {
                        for (var _loop_4 = function(categoryFilter) {
                            var shouldRemove = _.all(categories, function(category) {
                                return shouldRemoveValue(categoryFilter, category.values[categoryInstanceIndex]);
                            });
                            if (shouldRemove) return {
                                value: !0
                            };
                        }, _i = 0, categoryFilters_1 = categoryFilters; _i < categoryFilters_1.length; _i++) {
                            var categoryFilter = categoryFilters_1[_i], state_1 = _loop_4(categoryFilter);
                            if ("object" == typeof state_1) return state_1.value;
                        }
                        return !1;
                    };
                    return removalPredicate;
                }
            }
            function tryCreateDynamicSeriesRemovalPredicate(seriesMetadataColumn, clientSideFilters) {
                if (seriesMetadataColumn) {
                    var seriesFilters = getFiltersByMetadataColumn(clientSideFilters, [ seriesMetadataColumn ]);
                    if (!_.isEmpty(seriesFilters)) {
                        var removalPredicate = function(seriesInstance) {
                            var isDynamicSeriesInstance = !!seriesInstance.identity;
                            if (isDynamicSeriesInstance) for (var seriesValue = seriesInstance.name, _i = 0, seriesFilters_1 = seriesFilters; _i < seriesFilters_1.length; _i++) {
                                var seriesFilter = seriesFilters_1[_i];
                                if (shouldRemoveValue(seriesFilter, seriesValue)) return !0;
                            }
                            return !1;
                        };
                        return removalPredicate;
                    }
                }
            }
            function shouldRemoveValue(filter, value) {
                var shouldRemoveValue = !1, condition = filter.Condition;
                if (condition.Contains) if (_.isString(value)) {
                    var normalizedValue = normalizeString(value);
                    shouldRemoveValue = !StringExtensions.contains(normalizedValue, condition.Contains.LiteralValue);
                } else shouldRemoveValue = !0;
                return shouldRemoveValue;
            }
            function normalizeString(value) {
                return value ? StringExtensions.normalizeCase(value) : value;
            }
            ClientSideFilter.isMoreRestrictiveFilter = isMoreRestrictiveFilter, ClientSideFilter.tryConvertToClientSideFilters = tryConvertToClientSideFilters, 
            ClientSideFilter.applyClientSideFilters = applyClientSideFilters, ClientSideFilter.normalizeString = normalizeString;
        }(ClientSideFilter = data.ClientSideFilter || (data.ClientSideFilter = {}));
        var SQFilterExprHelper, SQFilterConditionsToClientSideFilterConversionVisitor = function(_super) {
            function SQFilterConditionsToClientSideFilterConversionVisitor(selects) {
                var _this = _super.call(this) || this;
                return _this.clientSideFilters = [], _this.selects = selects, _this;
            }
            return __extends(SQFilterConditionsToClientSideFilterConversionVisitor, _super), 
            SQFilterConditionsToClientSideFilterConversionVisitor.prototype.visitContains = function(expr) {
                if (!this.hasUnsupportedFilter()) {
                    var isSupportedFilter = !1, info = SQFilterExprHelper.getInfoIfFilteringByStringConstant(expr);
                    if (info) {
                        var stringConstantValue = info.constantValue, selectIndex = data.SQExprUtils.indexOfNamedExpr(this.selects, info.otherSide);
                        if (selectIndex >= 0 && stringConstantValue) {
                            var containsFilter = {
                                Condition: {
                                    Contains: {
                                        SelectIndex: selectIndex,
                                        LiteralValue: ClientSideFilter.normalizeString(stringConstantValue)
                                    }
                                }
                            };
                            this.clientSideFilters.push(containsFilter), isSupportedFilter = !0;
                        }
                    }
                    isSupportedFilter || this.setUnsupportedFilter();
                }
            }, SQFilterConditionsToClientSideFilterConversionVisitor.prototype.visitAnd = function(expr) {
                this.hasUnsupportedFilter() || (expr.left.accept(this), expr.right.accept(this));
            }, SQFilterConditionsToClientSideFilterConversionVisitor.prototype.visitDefault = function(expr) {
                this.setUnsupportedFilter();
            }, SQFilterConditionsToClientSideFilterConversionVisitor.prototype.getClientSideFiltersIfAllSupported = function() {
                if (!this.hasUnsupportedFilter()) return this.clientSideFilters;
            }, SQFilterConditionsToClientSideFilterConversionVisitor.prototype.hasUnsupportedFilter = function() {
                return void 0 === this.clientSideFilters;
            }, SQFilterConditionsToClientSideFilterConversionVisitor.prototype.setUnsupportedFilter = function() {
                this.clientSideFilters = void 0;
            }, SQFilterConditionsToClientSideFilterConversionVisitor;
        }(data.DefaultSQExprVisitor);
        !function(SQFilterExprHelper) {
            function getInfoIfFilteringByStringConstant(containsExpr) {
                if (containsExpr) {
                    var stringConstantValue = SQFilterExprHelper.getValueIfStringConstant(containsExpr.left);
                    return stringConstantValue ? {
                        constantValue: stringConstantValue,
                        otherSide: containsExpr.right
                    } : (stringConstantValue = SQFilterExprHelper.getValueIfStringConstant(containsExpr.right), 
                    {
                        constantValue: stringConstantValue,
                        otherSide: containsExpr.left
                    });
                }
            }
            function getValueIfStringConstant(expr) {
                if (data.SQExpr.isConstant(expr) && expr.type.text) return expr.value;
            }
            SQFilterExprHelper.getInfoIfFilteringByStringConstant = getInfoIfFilteringByStringConstant, 
            SQFilterExprHelper.getValueIfStringConstant = getValueIfStringConstant;
        }(SQFilterExprHelper || (SQFilterExprHelper = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var DataBoundObjectQueryExtender, DataViewAnalysis = powerbi.DataViewAnalysis, DefaultSQExprVisitorWithTraversal = powerbi.data.DefaultSQExprVisitorWithTraversal, SQExprUtils = powerbi.data.SQExprUtils;
        !function(DataBoundObjectQueryExtender) {
            function extend(queryDefn, schema, objectDescs, objectDefns, queryRefsByRole, projections, roleKindByQueryRef) {
                return extendInternal(queryDefn, schema, objectDescs, objectDefns, queryRefsByRole, projections, roleKindByQueryRef);
            }
            function needsToExtend(queryDefn, objectDescs, objectDefns) {
                return !!extendInternal(queryDefn, null, objectDescs, objectDefns, {}, {}, {});
            }
            function extendInternal(queryDefn, schema, objectDescs, objectDefns, queryRefsByRole, projections, roleKindByQueryRef) {
                if (objectDefns && objectDescs) {
                    var additionalProjections, querySelects = queryDefn.select();
                    for (var objectName in objectDefns) {
                        var objectDefnList = objectDefns[objectName], objectDesc = objectDescs[objectName];
                        if (objectDefnList && objectDesc) for (var _i = 0, objectDefnList_1 = objectDefnList; _i < objectDefnList_1.length; _i++) {
                            var objectDefn = objectDefnList_1[_i];
                            for (var propertyName in objectDefn.properties) {
                                var propDefn = objectDefn.properties[propertyName], propDesc = objectDesc.properties[propertyName];
                                if (propDefn && propDesc) {
                                    var propType = propDesc.type, dataBoundExprs = void 0, selector = void 0;
                                    if (propDesc.rule) {
                                        if (!matchesAnyCondition(propDesc.rule.conditions, projections, roleKindByQueryRef)) continue;
                                        dataBoundExprs = getRuleExprs(propDesc.rule, queryDefn, queryRefsByRole), selector = {
                                            data: _.map(dataBoundExprs, function(expr) {
                                                return data.createDataViewScopeIdentity(expr);
                                            })
                                        };
                                    } else if (propType && propType.dataBars) {
                                        if (selector = objectDefn.selector, selector && selector.metadata && null != querySelects.withName(selector.metadata)) {
                                            var aggregates_1 = AggregateFinder.run(propDefn, propType);
                                            aggregates_1 && (additionalProjections || (additionalProjections = []), additionalProjections.push({
                                                queryName: selector.metadata,
                                                selector: selector,
                                                joinPredicate: 0,
                                                aggregates: aggregates_1
                                            }));
                                            continue;
                                        }
                                    } else dataBoundExprs = getDataBoundExprs(propDefn, propType, querySelects), selector = objectDefn.selector;
                                    if (!_.isEmpty(dataBoundExprs)) {
                                        var scopeRefs = getScopeRefs(selector, querySelects, queryRefsByRole);
                                        if (void 0 !== scopeRefs) for (var aggregates = AggregateFinder.run(propDefn, propType), _a = 0, dataBoundExprs_1 = dataBoundExprs; _a < dataBoundExprs_1.length; _a++) {
                                            var dataBoundExpr = dataBoundExprs_1[_a];
                                            if (schema) {
                                                var exprMetadata = dataBoundExpr.getMetadata(schema);
                                                if (null == exprMetadata || !powerbi.ValueType.isCompatibleTo(propType, [ exprMetadata.type ])) continue;
                                            }
                                            var queryName = queryDefn.selectNameOf(dataBoundExpr);
                                            queryName || (queryDefn = queryDefn.addSelect(dataBoundExpr), queryName = queryDefn.selectNameOf(dataBoundExpr)), 
                                            additionalProjections || (additionalProjections = []);
                                            var additionalProjection = {
                                                queryName: queryName,
                                                selector: selector,
                                                joinPredicate: 0
                                            };
                                            aggregates && (additionalProjection.aggregates = aggregates), additionalProjections.push(additionalProjection);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return additionalProjections ? {
                        queryDefn: queryDefn,
                        additionalProjections: additionalProjections
                    } : void 0;
                }
            }
            function matchesAnyCondition(conditions, projections, roleKindByQueryRef) {
                if (!conditions) return !0;
                for (var _i = 0, conditions_1 = conditions; _i < conditions_1.length; _i++) {
                    var condition = conditions_1[_i], errors = DataViewAnalysis.checkForConditionErrors(projections, condition, roleKindByQueryRef);
                    if (_.isEmpty(errors)) return !0;
                }
                return !1;
            }
            function getDataBoundExprs(propDefn, type, querySelects) {
                var structuralType = type, fillDefn = propDefn;
                if (structuralType.fill && fillDefn.solid) {
                    var colorExpr = fillDefn.solid.color;
                    return decomposeExprs(colorExpr, querySelects);
                }
                var paragraphs = propDefn;
                if (structuralType.paragraphs && !_.isEmpty(paragraphs)) {
                    for (var exprs = void 0, _i = 0, paragraphs_1 = paragraphs; _i < paragraphs_1.length; _i++) for (var paragraph = paragraphs_1[_i], _a = 0, _b = paragraph.textRuns; _a < _b.length; _a++) {
                        var textRun = _b[_a], textRunExpr = textRun.value;
                        if (textRunExpr instanceof data.SQExpr) {
                            var exprsToAdd = decomposeExprs(textRunExpr, querySelects);
                            exprsToAdd && (exprs || (exprs = []), exprs.push.apply(exprs, exprsToAdd));
                        }
                    }
                    return exprs;
                }
                var propDefnAsExpr = propDefn;
                if (propDefnAsExpr instanceof data.SQExpr) return decomposeExprs(propDefnAsExpr, querySelects);
            }
            function getRuleExprs(rule, queryDefn, queryRefsByRole) {
                var inputRole = rule.inputRole;
                if (inputRole) {
                    var inputQueryRefs = queryRefsByRole[inputRole];
                    if (!_.isEmpty(inputQueryRefs)) {
                        var inputExprs = _.chain(queryDefn.select()).filter(function(select) {
                            return _.contains(inputQueryRefs, select.name);
                        }).map(function(select) {
                            return select.expr;
                        }).value();
                        return inputExprs;
                    }
                }
            }
            function decomposeExprs(expr, querySelects) {
                var visitor = new SQExprDecomposer(querySelects);
                return expr.accept(visitor), visitor.parts;
            }
            function getScopeRefs(selector, querySelects, queryRefsByRole) {
                if (data.Selector.equals(selector, null)) return null;
                if (hasValidMetadataSelector(selector, querySelects)) {
                    var dataItems = selector.data;
                    if (!dataItems) return null;
                    for (var exprs = [], _i = 0, dataItems_1 = dataItems; _i < dataItems_1.length; _i++) {
                        var dataItem = dataItems_1[_i];
                        if (data.Selector.isRoleWildcard(dataItem)) for (var roles = dataItem.roles, _a = 0, roles_1 = roles; _a < roles_1.length; _a++) {
                            var role = roles_1[_a], queryRefs = queryRefsByRole[role], filteredNamedExprs = _.filter(querySelects, function(querySelect) {
                                return _.contains(queryRefs, querySelect.name);
                            }), exprsByRole = _.map(filteredNamedExprs, function(namedSQExpr) {
                                return namedSQExpr.expr;
                            });
                            exprs.push.apply(exprs, exprsByRole);
                        } else {
                            var dataItemExprs = void 0, wildcard = dataItem;
                            if (wildcard.exprs && (dataItemExprs = wildcard.exprs, _.isEmpty(dataItemExprs))) continue;
                            var identity = dataItem;
                            identity.expr && (dataItemExprs = [ identity.expr ]), exprs.push.apply(exprs, dataItemExprs);
                        }
                    }
                    if (0 !== exprs.length) {
                        for (var scopeRefs = [], _b = 0, querySelects_1 = querySelects; _b < querySelects_1.length; _b++) {
                            var querySelect = querySelects_1[_b], index = SQExprUtils.indexOfExpr(exprs, querySelect.expr);
                            if (!(index < 0) && (exprs.splice(index, 1), scopeRefs.push(querySelect.name), 0 === exprs.length)) break;
                        }
                        if (!(exprs.length > 0 || 0 === scopeRefs.length)) return scopeRefs;
                    }
                }
            }
            function hasValidMetadataSelector(selector, querySelects) {
                var metadataSelector = selector.metadata;
                if (!metadataSelector) return !0;
                for (var _i = 0, querySelects_2 = querySelects; _i < querySelects_2.length; _i++) {
                    var querySelect = querySelects_2[_i];
                    if (querySelect.name === metadataSelector) return !0;
                }
            }
            DataBoundObjectQueryExtender.extend = extend, DataBoundObjectQueryExtender.needsToExtend = needsToExtend, 
            DataBoundObjectQueryExtender.matchesAnyCondition = matchesAnyCondition;
            var SQExprDecomposer = function(_super) {
                function SQExprDecomposer(querySelects) {
                    var _this = _super.call(this) || this;
                    return _this.querySelects = querySelects, _this;
                }
                return __extends(SQExprDecomposer, _super), SQExprDecomposer.prototype.visitMeasureRef = function(expr) {
                    this.ensureExpr(expr);
                }, SQExprDecomposer.prototype.visitAggr = function(expr) {
                    this.ensureAggregate(expr.arg, expr);
                }, SQExprDecomposer.prototype.visitPercentile = function(expr) {
                    this.ensureAggregate(expr.arg, expr);
                }, SQExprDecomposer.prototype.visitColumnRef = function(expr) {
                    this.ensureExpr(expr);
                }, SQExprDecomposer.prototype.visitHierarchyLevel = function(expr) {
                    this.ensureExpr(expr);
                }, SQExprDecomposer.prototype.visitSelectRef = function(expr) {
                    var targetExpr = this.querySelects.withName(expr.expressionName);
                    targetExpr && this.ensureExpr(targetExpr.expr);
                }, SQExprDecomposer.prototype.ensureAggregate = function(argExpr, aggregateExpr) {
                    data.SQExpr.isSelectRef(argExpr) ? argExpr.accept(this) : this.ensureExpr(aggregateExpr);
                }, SQExprDecomposer.prototype.ensureExpr = function(expr) {
                    this.parts || (this.parts = []), this.parts.push(expr);
                }, SQExprDecomposer;
            }(DefaultSQExprVisitorWithTraversal);
            DataBoundObjectQueryExtender.getScopeRefs = getScopeRefs;
            var AggregateFinder = function(_super) {
                function AggregateFinder() {
                    return null !== _super && _super.apply(this, arguments) || this;
                }
                return __extends(AggregateFinder, _super), AggregateFinder.run = function(propDefn, type) {
                    var structuralType = type, dataBarsDefn = propDefn;
                    if (structuralType.dataBars) return new AggregateFinder().visitDataBars(dataBarsDefn);
                    var fillDefn = propDefn;
                    if (structuralType.fill && fillDefn.solid) {
                        var colorExpr = fillDefn.solid.color;
                        return colorExpr.accept(new AggregateFinder());
                    }
                    var fillRuleDefn = propDefn;
                    return fillRuleDefn.linearGradient2 ? new AggregateFinder().visitLinearGradient2(fillRuleDefn.linearGradient2) : fillRuleDefn.linearGradient3 ? new AggregateFinder().visitLinearGradient3(fillRuleDefn.linearGradient3) : propDefn instanceof data.SQExpr ? propDefn.accept(new AggregateFinder()) : void 0;
                }, AggregateFinder.prototype.visitDataBars = function(defn) {
                    if (defn) return this.createAggregates(!defn.minValue, !defn.maxValue);
                }, AggregateFinder.prototype.visitFillRule = function(expr) {
                    var rule = expr.rule, linearGradient2 = rule.linearGradient2;
                    if (linearGradient2) return this.visitLinearGradient2(linearGradient2);
                    var linearGradient3 = rule.linearGradient3;
                    if (linearGradient3) return this.visitLinearGradient3(linearGradient3);
                    var conditional = rule.conditional;
                    return conditional ? this.visitConditionalColorRule(conditional) : void 0;
                }, AggregateFinder.prototype.visitAggr = function(expr) {
                    switch (expr.func) {
                      case 4:
                        return {
                            max: !0
                        };

                      case 3:
                        return {
                            min: !0
                        };

                      case 6:
                        return {
                            median: !0
                        };

                      case 1:
                        return {
                            average: !0
                        };
                    }
                }, AggregateFinder.prototype.visitPercentile = function(expr) {
                    return {
                        percentiles: [ {
                            exclusive: expr.exclusive,
                            k: expr.k
                        } ]
                    };
                }, AggregateFinder.prototype.visitLinearGradient2 = function(linearGradient2) {
                    return this.createAggregates(this.valueUnspecified(linearGradient2.min), this.valueUnspecified(linearGradient2.max));
                }, AggregateFinder.prototype.visitLinearGradient3 = function(linearGradient3) {
                    return this.createAggregates(this.valueUnspecified(linearGradient3.min), this.valueUnspecified(linearGradient3.max));
                }, AggregateFinder.prototype.visitConditionalColorRule = function(input) {}, AggregateFinder.prototype.createAggregates = function(min, max) {
                    if (min || max) {
                        var result = {};
                        return min && (result.min = !0), max && (result.max = !0), result;
                    }
                }, AggregateFinder.prototype.valueUnspecified = function(stop) {
                    return stop && !stop.value;
                }, AggregateFinder;
            }(data.DefaultSQExprVisitor);
        }(DataBoundObjectQueryExtender = data.DataBoundObjectQueryExtender || (data.DataBoundObjectQueryExtender = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var ProjectionUtils;
        !function(ProjectionUtils) {
            function tryGetExprs(query, projectionsByRole, roleName) {
                var queryProjections = projectionsByRole[roleName];
                if (queryProjections) {
                    var projections = queryProjections.all();
                    return _.filter(_.map(projections, function(item) {
                        return tryGetExprByProjection(query, item);
                    }), function(item) {
                        return item;
                    });
                }
            }
            function tryGetExprByProjection(query, projection) {
                if (projection) {
                    var namedExpr = query.select().withName(projection.queryRef);
                    return namedExpr ? namedExpr.expr : void 0;
                }
            }
            ProjectionUtils.tryGetExprs = tryGetExprs, ProjectionUtils.tryGetExprByProjection = tryGetExprByProjection;
        }(ProjectionUtils = data.ProjectionUtils || (data.ProjectionUtils = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var ScalarKeyUtils;
        !function(ScalarKeyUtils) {
            function isScalarKeySupportedForRole(schema, query, projections, roleName) {
                var exprs = data.ProjectionUtils.tryGetExprs(query, projections, roleName);
                if (_.isEmpty(exprs)) return !1;
                if (!(exprs[0] instanceof data.SQHierarchyLevelExpr)) return !1;
                var firstExpr = exprs[0], groups = data.SQExprGroupUtils.groupExprs(schema, exprs);
                if (1 !== groups.length) return !1;
                var fieldExpr = data.SQExprConverter.asFieldPattern(firstExpr, schema), conceptualHierarchyLevel = data.SQHierarchyExprUtils.getConceptualHierarchyLevelFromExpr(schema, fieldExpr), conceptualProperty = conceptualHierarchyLevel && conceptualHierarchyLevel.column;
                if (!conceptualProperty) return !1;
                var type = conceptualProperty.type;
                if (!type.temporal || !type.temporal.year) return !1;
                if (!getScalarKeyExpr(exprs[0], schema)) return !1;
                var projection = projections[roleName], lastActiveProjection = projection.getLastActiveQueryReference();
                if (lastActiveProjection) {
                    var allProjections = projection.all(), lastActiveProjectionIndex = _.findIndex(allProjections, function(p) {
                        return p.queryRef === lastActiveProjection;
                    });
                    if (lastActiveProjectionIndex === -1) return !1;
                    for (var i = 0; i < lastActiveProjectionIndex; i++) if (!_.contains(projection.activeProjectionRefs, allProjections[i].queryRef)) return !1;
                }
                return !0;
            }
            function getScalarKeyExpr(columnExpr, schema) {
                if (columnExpr) {
                    columnExpr = data.VariationRewriter.run(columnExpr, schema);
                    var entityExpr = columnExpr.getTargetEntity();
                    if (entityExpr) {
                        var entity = data.SQExprUtils.getConceptualEntity(entityExpr, schema), keyColumns = _.filter(entity.properties, function(p) {
                            return p.type.temporal && p.type.temporal.paddedDateTableDate;
                        });
                        return 1 === keyColumns.length ? data.SQExprBuilder.columnRef(entityExpr, keyColumns[0].name) : void 0;
                    }
                }
            }
            ScalarKeyUtils.isScalarKeySupportedForRole = isScalarKeySupportedForRole, ScalarKeyUtils.getScalarKeyExpr = getScalarKeyExpr;
        }(ScalarKeyUtils = data.ScalarKeyUtils || (data.ScalarKeyUtils = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var services;
        !function(services) {
            var SemanticQuerySerializer;
            !function(SemanticQuerySerializer) {
                function serializeQuery(query) {
                    var queryFrom = [], from = query.from();
                    serializeFrom(from, queryFrom);
                    var transforms, queryWhere = serializeQueryFilters(query.where(), QueryExpressionBuilder.create), transformItems = query.transforms();
                    if (!_.isEmpty(transformItems)) {
                        transforms = [];
                        for (var _i = 0, transformItems_1 = transformItems; _i < transformItems_1.length; _i++) {
                            var transformItem = transformItems_1[_i], parameters = _.map(transformItem.input.parameters, function(p) {
                                return QueryExpressionBuilder.createNamed(p);
                            }), transform = {
                                Name: transformItem.name,
                                Algorithm: transformItem.algorithm,
                                Input: {
                                    Parameters: parameters
                                },
                                Output: void 0
                            };
                            if (transformItem.input.table) {
                                var inputColumns = serializeTransformTableColumns(transformItem.input.table.columns);
                                transform.Input.Table = {
                                    Name: transformItem.input.table.name,
                                    Columns: inputColumns
                                };
                            }
                            if (transformItem.output && transformItem.output.table) {
                                var outputColumns = serializeTransformTableColumns(transformItem.output.table.columns);
                                transform.Output = {
                                    Table: {
                                        Name: transformItem.output.table.name,
                                        Columns: outputColumns
                                    }
                                };
                            }
                            transforms.push(transform);
                        }
                    }
                    for (var queryOrderBy = serializeSortDefinitions(query.orderBy(), !1), querySelect = [], selectItems = query.select(), i = 0, len = selectItems.length; i < len; i++) querySelect.push(QueryExpressionBuilder.createNamed(selectItems[i]));
                    var queryGroupBy, groupByItems = query.groupBy();
                    if (groupByItems && groupByItems.length) {
                        queryGroupBy = [];
                        for (var i = 0, len = groupByItems.length; i < len; i++) queryGroupBy.push(QueryExpressionBuilder.createNamed(groupByItems[i]));
                    }
                    var contract = {
                        Version: data.SemanticQueryVersions.Version2,
                        From: queryFrom,
                        Select: querySelect
                    };
                    return queryWhere && (contract.Where = queryWhere), transforms && (contract.Transform = transforms), 
                    queryOrderBy && (contract.OrderBy = queryOrderBy), queryGroupBy && (contract.GroupBy = queryGroupBy), 
                    query.top() && (contract.Top = query.top()), contract;
                }
                function serializeSortDefinitions(orderByItems, standalone) {
                    var queryOrderBy;
                    if (orderByItems && orderByItems.length) {
                        queryOrderBy = [];
                        for (var i = 0, len = orderByItems.length; i < len; i++) {
                            var clause = orderByItems[i];
                            queryOrderBy.push({
                                Direction: clause.direction,
                                Expression: standalone ? QueryExpressionBuilder.createStandalone(clause.expr) : QueryExpressionBuilder.create(clause.expr)
                            });
                        }
                    }
                    return queryOrderBy;
                }
                function tryDeserializeQuery(contract) {
                    var semanticQuery;
                    try {
                        semanticQuery = deserializeQuery(contract);
                    } catch (e) {}
                    if (semanticQuery && !isMalformed(semanticQuery)) return semanticQuery;
                }
                function isMalformed(query) {
                    for (var _i = 0, _a = query.select(); _i < _a.length; _i++) {
                        var select = _a[_i];
                        if (!select.expr) return !0;
                    }
                    return !1;
                }
                function serializeQueryFilters(filters, queryExpressionBuilderInstance) {
                    var queryFilters;
                    if (!_.isEmpty(filters)) {
                        queryFilters = [];
                        for (var _i = 0, filters_2 = filters; _i < filters_2.length; _i++) {
                            var filter = filters_2[_i], queryClause = {
                                Condition: queryExpressionBuilderInstance(filter.condition)
                            };
                            _.isEmpty(filter.target) || (queryClause.Target = _.map(filter.target, queryExpressionBuilderInstance)), 
                            queryFilters.push(queryClause);
                        }
                    }
                    return queryFilters;
                }
                function deserializeQuery(contract) {
                    var queryVersion = contract.Version ? contract.Version : data.SemanticQueryVersions.Version0, upgradeToV1 = queryVersion < data.SemanticQueryVersions.Version1, from = Deserializer.from(contract.From), builder = new data.SemanticQueryBuilder(from), where = contract.Where;
                    if (where) for (var i = 0, len = where.length; i < len; i++) {
                        var whereItem = Deserializer.filter(where[i], from);
                        whereItem && (upgradeToV1 && (whereItem = FilterTargetUpgrader.Upgrade(queryVersion, whereItem)), 
                        builder.addWhere(whereItem));
                    }
                    var transform = contract.Transform, fromWithTransforms = from;
                    if (!_.isEmpty(transform)) {
                        for (var allEntities = {}, keys = from.keys(), _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                            var key = keys_1[_i];
                            allEntities[key] = from.source(key);
                        }
                        for (var i = 0, len = transform.length; i < len; i++) {
                            if (transform[i].Input && transform[i].Input.Table) {
                                var tableName = transform[i].Input.Table.Name;
                                allEntities[tableName] = new SQFromEntitySource((void 0), tableName);
                            }
                            if (transform[i].Output && transform[i].Output.Table) {
                                var tableName = transform[i].Output.Table.Name;
                                allEntities[tableName] = new SQFromEntitySource((void 0), tableName);
                            }
                        }
                        fromWithTransforms = new data.SQFrom(allEntities);
                        for (var i = 0, len = transform.length; i < len; i++) builder.addTransform(Deserializer.transform(transform[i], fromWithTransforms));
                    }
                    var orderBy = contract.OrderBy;
                    if (orderBy) for (var i = 0, len = orderBy.length; i < len; i++) builder.addOrderBy(Deserializer.sort(orderBy[i], from));
                    for (var select = contract.Select, selectNames = {}, i = 0, len = select.length; i < len; i++) builder.addSelect(Deserializer.select(select[i], selectNames, fromWithTransforms));
                    var groupBy = contract.GroupBy;
                    if (groupBy) for (var groupByNames = {}, i = 0, len = groupBy.length; i < len; i++) builder.addGroupBy(Deserializer.groupBy(groupBy[i], groupByNames, from));
                    return contract.Top && builder.setTop(contract.Top), builder.toQuery();
                }
                function deserializeSortDefinitions(orderBy, from) {
                    return _.isEmpty(orderBy) ? [] : _.map(orderBy, function(sort) {
                        return Deserializer.sort(sort, from);
                    });
                }
                function serializeFilter(filter) {
                    var queryFrom = [], from = filter.from();
                    serializeFrom(from, queryFrom);
                    var queryWhere = serializeQueryFilters(filter.where(), QueryExpressionBuilder.create), contract = {
                        Version: data.SemanticQueryVersions.Version2,
                        From: queryFrom,
                        Where: queryWhere
                    };
                    return contract;
                }
                function serializeFrom(from, queryFrom) {
                    for (var fromKeys = from.keys(), sqFromSerializer = new SQFromSourceSerializer(from), i = 0, len = fromKeys.length; i < len; i++) queryFrom.push(from.source(fromKeys[i]).accept(sqFromSerializer, i));
                }
                function deserializeFrom(input) {
                    return Deserializer.from(input);
                }
                function deserializeFilter(contract, errorContext) {
                    for (var filterVersion = contract.Version ? contract.Version : data.SemanticQueryVersions.Version0, upgradeToV1 = filterVersion < data.SemanticQueryVersions.Version1, from = Deserializer.from(contract.From), builder = new data.SemanticQueryBuilder(from), where = contract.Where, i = 0, len = where.length; i < len; i++) {
                        var whereItem = Deserializer.filter(where[i], from);
                        whereItem ? (upgradeToV1 && (whereItem = FilterTargetUpgrader.Upgrade(filterVersion, whereItem)), 
                        builder.addWhere(whereItem)) : errorContext && (_.isEmpty(errorContext.RemovedIndexes) && (errorContext.RemovedIndexes = []), 
                        errorContext.RemovedIndexes.push(i));
                    }
                    return builder.toFilter();
                }
                function serializeExpr(contract) {
                    return QueryExpressionBuilder.createStandalone(contract);
                }
                function serializeExprWithRef(contract) {
                    return QueryExpressionBuilder.create(contract);
                }
                function deserializeExpr(input) {
                    return ExprBuilder.createStandalone(input);
                }
                function deserializeExprWithRef(input, from) {
                    return ExprBuilder.create(input, from);
                }
                function serializeTransformTableColumns(columns) {
                    return _.map(columns, function(c) {
                        var column = {
                            Expression: QueryExpressionBuilder.createNamed(c.expression)
                        };
                        return c.role && (column.Role = c.role), column;
                    });
                }
                var FilterKindDetector = powerbi.data.FilterKindDetector, SQFromEntitySource = powerbi.data.SQFromEntitySource, SQFromSubquerySource = powerbi.data.SQFromSubquerySource, StringExtensions = jsCommon.StringExtensions;
                SemanticQuerySerializer.serializeQuery = serializeQuery, SemanticQuerySerializer.serializeSortDefinitions = serializeSortDefinitions, 
                SemanticQuerySerializer.tryDeserializeQuery = tryDeserializeQuery, SemanticQuerySerializer.deserializeQuery = deserializeQuery, 
                SemanticQuerySerializer.deserializeSortDefinitions = deserializeSortDefinitions, 
                SemanticQuerySerializer.serializeFilter = serializeFilter, SemanticQuerySerializer.serializeFrom = serializeFrom, 
                SemanticQuerySerializer.deserializeFrom = deserializeFrom;
                var SQFromSourceSerializer = function() {
                    function SQFromSourceSerializer(from) {
                        this.from = from;
                    }
                    return SQFromSourceSerializer.prototype.visitEntity = function(source, index) {
                        return {
                            Name: this.from.keys()[index],
                            Entity: source.entity,
                            Schema: source.schema
                        };
                    }, SQFromSourceSerializer.prototype.visitSubquery = function(source, index) {
                        return {
                            Name: this.from.keys()[index],
                            Expression: {
                                Subquery: {
                                    Query: SemanticQuerySerializer.serializeQuery(source.subquery)
                                }
                            },
                            Type: data.EntitySourceType.Expression
                        };
                    }, SQFromSourceSerializer.prototype.visitExpr = function(source, index) {
                        return {
                            Name: this.from.keys()[index],
                            Expression: SemanticQuerySerializer.serializeExpr(source.expr),
                            Type: data.EntitySourceType.Expression
                        };
                    }, SQFromSourceSerializer;
                }();
                SemanticQuerySerializer.SQFromSourceSerializer = SQFromSourceSerializer, SemanticQuerySerializer.deserializeFilter = deserializeFilter, 
                SemanticQuerySerializer.serializeExpr = serializeExpr, SemanticQuerySerializer.serializeExprWithRef = serializeExprWithRef, 
                SemanticQuerySerializer.deserializeExpr = deserializeExpr, SemanticQuerySerializer.deserializeExprWithRef = deserializeExprWithRef;
                var Deserializer;
                !function(Deserializer) {
                    function from(contract) {
                        for (var sources = {}, i = 0, len = contract.length; i < len; i++) {
                            var source = contract[i];
                            switch (source.Type) {
                              case data.EntitySourceType.Expression:
                                source.Expression.Subquery ? sources[source.Name] = new SQFromSubquerySource(deserializeQuery(source.Expression.Subquery.Query)) : sources[source.Name] = new data.SQFromExprSource(ExprBuilder.createFromSourceExpression(source.Expression));
                                break;

                              default:
                                sources[source.Name] = new SQFromEntitySource(source.Schema, source.Entity);
                            }
                        }
                        return new data.SQFrom(sources);
                    }
                    function filter(contract, from) {
                        var condition = from ? ExprBuilder.create(contract.Condition, from) : ExprBuilder.createStandalone(contract.Condition);
                        if (condition) {
                            var sqFilter = {
                                condition: condition
                            };
                            if (contract.Target) {
                                sqFilter.target = [];
                                for (var _i = 0, _a = contract.Target; _i < _a.length; _i++) {
                                    var target = _a[_i], targetExpr = from ? ExprBuilder.create(target, from) : ExprBuilder.createStandalone(target);
                                    if (!targetExpr) return;
                                    sqFilter.target.push(targetExpr);
                                }
                            }
                            return sqFilter;
                        }
                    }
                    function sort(contract, from) {
                        return {
                            direction: contract.Direction,
                            expr: ExprBuilder.create(contract.Expression, from)
                        };
                    }
                    function select(contract, selectNames, from) {
                        return Deserializer.toNamedQueryExpression(contract, selectNames, from);
                    }
                    function groupBy(contract, groupByNames, from) {
                        return Deserializer.toNamedQueryExpression(contract, groupByNames, from);
                    }
                    function transform(contract, from) {
                        var parameters = _.map(contract.Input.Parameters, function(p) {
                            return Deserializer.toNamedQueryExpression(p, {}, from);
                        }), transform = {
                            name: contract.Name,
                            algorithm: contract.Algorithm,
                            input: {
                                parameters: parameters
                            },
                            output: {}
                        };
                        if (contract.Input.Table) {
                            var inputColumns = deserializeTransformTableColumns(contract.Input.Table.Columns, from);
                            transform.input.table = {
                                name: contract.Input.Table.Name,
                                columns: inputColumns
                            };
                        }
                        if (contract.Output && contract.Output.Table) {
                            var outputColumns = deserializeTransformTableColumns(contract.Output.Table.Columns, from);
                            transform.output.table = {
                                name: contract.Output.Table.Name,
                                columns: outputColumns
                            };
                        }
                        return transform;
                    }
                    function toNamedQueryExpression(contract, names, from) {
                        var expr = ExprBuilder.create(contract, from), name = contract.Name || StringExtensions.findUniqueName(names, data.SQExprUtils.defaultName(expr));
                        return names[name] = !0, {
                            name: name,
                            expr: expr
                        };
                    }
                    function deserializeTransformTableColumns(columns, from) {
                        var columnNames = {};
                        return _.map(columns, function(c) {
                            return {
                                role: c.Role,
                                expression: Deserializer.toNamedQueryExpression(c.Expression, columnNames, from)
                            };
                        });
                    }
                    Deserializer.from = from, Deserializer.filter = filter, Deserializer.sort = sort, 
                    Deserializer.select = select, Deserializer.groupBy = groupBy, Deserializer.transform = transform, 
                    Deserializer.toNamedQueryExpression = toNamedQueryExpression;
                }(Deserializer || (Deserializer = {}));
                var ExprBuilder, QueryExpressionBuilder = function() {
                    function QueryExpressionBuilder(standalone) {
                        this.standalone = standalone;
                    }
                    return QueryExpressionBuilder.create = function(expr) {
                        return expr.accept(QueryExpressionBuilder.instance);
                    }, QueryExpressionBuilder.createNamed = function(namedExpr) {
                        var container = namedExpr.expr.accept(QueryExpressionBuilder.instance);
                        return namedExpr.name && (container.Name = namedExpr.name), container;
                    }, QueryExpressionBuilder.createStandalone = function(expr) {
                        return expr.accept(QueryExpressionBuilder.standaloneInstance);
                    }, QueryExpressionBuilder.prototype.visitColumnRef = function(expr) {
                        return {
                            Column: {
                                Expression: expr.source.accept(this),
                                Property: expr.ref
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitMeasureRef = function(expr) {
                        return {
                            Measure: {
                                Expression: expr.source.accept(this),
                                Property: expr.ref
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitAggr = function(expr) {
                        return {
                            Aggregation: {
                                Expression: expr.arg.accept(this),
                                Function: expr.func
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitPercentile = function(expr) {
                        var result = {
                            Percentile: {
                                Expression: expr.arg.accept(this),
                                K: expr.k
                            }
                        };
                        return expr.exclusive && (result.Percentile.Exclusive = expr.exclusive), result;
                    }, QueryExpressionBuilder.prototype.visitHierarchy = function(expr) {
                        return {
                            Hierarchy: {
                                Expression: expr.arg.accept(this),
                                Hierarchy: expr.hierarchy
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitPropertyVariationSource = function(expr) {
                        var source = expr.arg.accept(this), property = expr.property, name = expr.name;
                        return {
                            PropertyVariationSource: {
                                Expression: {
                                    SourceRef: source.SourceRef
                                },
                                Name: name,
                                Property: property
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitHierarchyLevel = function(expr) {
                        return {
                            HierarchyLevel: {
                                Expression: expr.arg.accept(this),
                                Level: expr.level
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitSelectRef = function(expr) {
                        return {
                            SelectRef: {
                                ExpressionName: expr.expressionName
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitBetween = function(expr) {
                        return {
                            Between: {
                                Expression: expr.arg.accept(this),
                                LowerBound: expr.lower.accept(this),
                                UpperBound: expr.upper.accept(this)
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitIn = function(expr) {
                        var expressions = this.serializeAll(expr.args), values = expr.values;
                        if (values) {
                            for (var valuesSerialized = [], i = 0, len = values.length; i < len; i++) valuesSerialized.push(this.serializeAll(values[i]));
                            return {
                                In: {
                                    Expressions: expressions,
                                    Values: valuesSerialized
                                }
                            };
                        }
                        return {
                            In: {
                                Expressions: this.serializeAll(expr.args),
                                Table: expr.table.accept(this)
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitEntity = function(expr) {
                        var sourceRef;
                        if (this.standalone) {
                            var standaloneExpr = {
                                Schema: expr.schema,
                                Entity: expr.entity
                            };
                            sourceRef = standaloneExpr;
                        } else sourceRef = {
                            Source: expr.variable
                        };
                        return {
                            SourceRef: sourceRef
                        };
                    }, QueryExpressionBuilder.prototype.visitSubqueryRef = function(expr) {
                        return {
                            SourceRef: {
                                Source: expr.variable
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitNamedQueryRef = function(expr) {
                        return this.standalone ? {
                            NamedQueryReference: {
                                Name: expr.queryName
                            }
                        } : {
                            SourceRef: {
                                Source: expr.variable
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitAnd = function(expr) {
                        return {
                            And: {
                                Left: expr.left.accept(this),
                                Right: expr.right.accept(this)
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitOr = function(expr) {
                        return {
                            Or: {
                                Left: expr.left.accept(this),
                                Right: expr.right.accept(this)
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitCompare = function(expr) {
                        return {
                            Comparison: {
                                ComparisonKind: expr.comparison,
                                Left: expr.left.accept(this),
                                Right: expr.right.accept(this)
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitContains = function(expr) {
                        return {
                            Contains: {
                                Left: expr.left.accept(this),
                                Right: expr.right.accept(this)
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitDateAdd = function(expr) {
                        return {
                            DateAdd: {
                                Expression: expr.arg.accept(this),
                                Amount: expr.amount,
                                TimeUnit: expr.unit
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitDateSpan = function(expr) {
                        return {
                            DateSpan: {
                                Expression: expr.arg.accept(this),
                                TimeUnit: expr.unit
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitExists = function(expr) {
                        return {
                            Exists: {
                                Expression: expr.arg.accept(this)
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitNot = function(expr) {
                        return {
                            Not: {
                                Expression: expr.arg.accept(this)
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitNow = function(expr) {
                        return {
                            Now: {}
                        };
                    }, QueryExpressionBuilder.prototype.visitDefaultValue = function(expr) {
                        return {
                            DefaultValue: {}
                        };
                    }, QueryExpressionBuilder.prototype.visitAnyValue = function(expr) {
                        var anyValue = {};
                        return null != expr.defaultValueOverridesAncestors && (anyValue.DefaultValueOverridesAncestors = expr.defaultValueOverridesAncestors), 
                        {
                            AnyValue: anyValue
                        };
                    }, QueryExpressionBuilder.prototype.visitFillRule = function(expr) {
                        var serializedRule = {}, rule = expr.rule;
                        return rule.linearGradient2 && (serializedRule.linearGradient2 = this.visitLinearGradient2(rule.linearGradient2)), 
                        rule.linearGradient3 && (serializedRule.linearGradient3 = this.visitLinearGradient3(rule.linearGradient3)), 
                        rule.conditional && (serializedRule.conditional = this.visitConditionalColorRule(rule.conditional)), 
                        {
                            FillRule: {
                                Input: expr.input.accept(this),
                                FillRule: serializedRule
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitLinearGradient2 = function(gradient) {
                        var output = {
                            min: this.visitRuleStop(gradient.min),
                            max: this.visitRuleStop(gradient.max)
                        }, strategy = this.visitNullColoringStrategy(gradient.nullColoringStrategy);
                        return strategy && (output.nullColoringStrategy = strategy), output;
                    }, QueryExpressionBuilder.prototype.visitLinearGradient3 = function(gradient) {
                        var output = {
                            min: this.visitRuleStop(gradient.min),
                            mid: this.visitRuleStop(gradient.mid),
                            max: this.visitRuleStop(gradient.max)
                        }, strategy = this.visitNullColoringStrategy(gradient.nullColoringStrategy);
                        return strategy && (output.nullColoringStrategy = strategy), output;
                    }, QueryExpressionBuilder.prototype.visitConditionalColorRule = function(input) {
                        var _this = this, output = {
                            cases: input.cases.map(function(rule) {
                                return _this.visitRuleColorCase(rule);
                            })
                        }, strategy = this.visitNullColoringStrategy(input.nullColoringStrategy);
                        return strategy && (output.nullColoringStrategy = strategy), output;
                    }, QueryExpressionBuilder.prototype.visitRuleColorCase = function(input) {
                        var ouput = {
                            condition: input.condition.accept(this),
                            color: input.color.accept(this)
                        };
                        return ouput;
                    }, QueryExpressionBuilder.prototype.visitThemeColor = function(expr) {
                        return {
                            ThemeColor: {
                                Color: expr.color,
                                Percent: expr.percent
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitStartsWith = function(expr) {
                        return {
                            StartsWith: {
                                Left: expr.left.accept(this),
                                Right: expr.right.accept(this)
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitGroupRef = function(expr) {
                        var _this = this;
                        return {
                            GroupRef: {
                                Expression: expr.source.accept(this),
                                Property: expr.ref,
                                GroupedColumns: _.map(expr.groupedExprs, function(groupedExpr) {
                                    return groupedExpr.accept(_this);
                                })
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitConstant = function(expr) {
                        switch (expr.type.primitiveType) {
                          case 5:
                          case 7:
                          case 2:
                          case 4:
                          case 3:
                          case 0:
                          case 1:
                            return {
                                Literal: {
                                    Value: expr.valueEncoded
                                }
                            };
                        }
                    }, QueryExpressionBuilder.prototype.visitArithmetic = function(expr) {
                        return {
                            Arithmetic: {
                                Left: expr.left.accept(this),
                                Right: expr.right.accept(this),
                                Operator: expr.operator
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitFloor = function(expr) {
                        var result = {
                            Floor: {
                                Expression: expr.arg.accept(this),
                                Size: expr.size
                            }
                        };
                        return null != expr.timeUnit && (result.Floor.TimeUnit = expr.timeUnit), result;
                    }, QueryExpressionBuilder.prototype.visitResourcePackageItem = function(expr) {
                        return {
                            ResourcePackageItem: {
                                PackageName: expr.packageName,
                                PackageType: expr.packageType,
                                ItemName: expr.itemName
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitScopedEval = function(expr) {
                        return {
                            ScopedEval: {
                                Expression: expr.expression.accept(this),
                                Scope: this.serializeAll(expr.scope)
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitFilteredEval = function(expr) {
                        return {
                            FilteredEval: {
                                Expression: expr.expression.accept(this),
                                Filters: serializeQueryFilters(expr.filters, this.standalone ? QueryExpressionBuilder.createStandalone : QueryExpressionBuilder.create)
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitWithRef = function(expr) {
                        return {
                            WithRef: {
                                ExpressionName: expr.expressionName
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitTransformTableRef = function(expr) {
                        return {
                            TransformTableRef: {
                                Source: expr.source
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitTransformOutputRoleRef = function(expr) {
                        return {
                            TransformOutputRoleRef: {
                                Role: expr.role,
                                Transform: expr.transform
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitRoleRef = function(expr) {
                        return {
                            RoleRef: {
                                Role: expr.role
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitDiscretize = function(expr) {
                        return {
                            Discretize: {
                                Expression: expr.source.accept(this),
                                Count: expr.count
                            }
                        };
                    }, QueryExpressionBuilder.prototype.visitMember = function(expr) {
                        return {
                            Member: {
                                Expression: expr.source.accept(this),
                                Member: expr.member
                            }
                        };
                    }, QueryExpressionBuilder.prototype.serializeAll = function(exprs) {
                        for (var result = [], i = 0, len = exprs.length; i < len; i++) result.push(exprs[i].accept(this));
                        return result;
                    }, QueryExpressionBuilder.prototype.visitRuleStop = function(stop) {
                        var serialized = {
                            color: stop.color.accept(this)
                        }, value = stop.value;
                        return value && (serialized.value = stop.value.accept(this)), serialized;
                    }, QueryExpressionBuilder.prototype.visitNullColoringStrategy = function(input) {
                        if (input) {
                            var output = {
                                strategy: input.strategy.accept(this)
                            };
                            return input.color && (output.color = input.color.accept(this)), output;
                        }
                    }, QueryExpressionBuilder.instance = new QueryExpressionBuilder(), QueryExpressionBuilder.standaloneInstance = new QueryExpressionBuilder((!0)), 
                    QueryExpressionBuilder;
                }(), FilterTargetUpgrader = function() {
                    function FilterTargetUpgrader() {}
                    return FilterTargetUpgrader.Upgrade = function(fromVersion, filter) {
                        if (!filter) return null;
                        if (!filter.condition) return null;
                        var filterKind = FilterKindDetector.run(filter.condition);
                        return fromVersion === data.SemanticQueryVersions.Version0 && 2 !== filterKind ? {
                            condition: filter.condition
                        } : filter;
                    }, FilterTargetUpgrader;
                }();
                !function(ExprBuilder) {
                    function create(contract, from) {
                        return fromColumnRef(contract.Column, from) || fromMeasureRef(contract.Measure, from) || fromSourceRef(contract.SourceRef, from) || fromAggr(contract.Aggregation, from) || fromSelectRef(contract.SelectRef, from) || fromPercentile(contract.Percentile, from) || fromArithmetic(contract.Arithmetic, from) || fromFloor(contract.Floor, from) || fromDiscretize(contract.Discretize, from) || fromMember(contract.Member, from) || fromHierarchy(contract.Hierarchy, from) || fromHierarchyLevel(contract.HierarchyLevel, from) || fromPropertyVariationSource(contract.PropertyVariationSource, from) || fromAnd(contract.And, from) || fromBetween(contract.Between, from) || fromIn(contract.In, from) || fromOr(contract.Or, from) || fromContains(contract.Contains, from) || fromCompare(contract.Comparison, from) || fromDateAdd(contract.DateAdd, from) || fromDateSpan(contract.DateSpan, from) || fromExists(contract.Exists, from) || fromNot(contract.Not, from) || fromNow(contract.Now) || fromDefaultValue(contract.DefaultValue) || fromAnyValue(contract.AnyValue) || fromStartsWith(contract.StartsWith, from) || fromFillRule(contract.FillRule, from) || fromThemeColor(contract.ThemeColor) || fromResourcePackageItem(contract.ResourcePackageItem, from) || fromScopedEval(contract.ScopedEval, from) || fromFilteredEval(contract.FilteredEval, from) || fromWithRef(contract.WithRef, from) || fromTransformTableRef(contract.TransformTableRef, from) || fromTransformOutputRoleRef(contract.TransformOutputRoleRef, from) || fromLiteral(contract.Literal) || fromGroupRef(contract.GroupRef, from) || fromRoleRef(contract.RoleRef) || fromNamedQueryRef(contract.NamedQueryReference) || createConst(contract);
                    }
                    function createStandalone(contract) {
                        return create(contract, null);
                    }
                    function createArray(contracts, from) {
                        for (var result = [], i = 0, len = contracts.length; i < len; i++) result.push(create(contracts[i], from));
                        return result;
                    }
                    function createConst(contract) {
                        return fromBool(contract.Boolean) || fromDateTime(contract.DateTime) || fromDateTimeSecond(contract.DateTimeSecond) || fromDateTime(contract.Date) || fromDecimal(contract.Decimal) || fromInteger(contract.Integer) || fromNull(contract.Null) || fromNumber(contract.Number) || fromString(contract.String);
                    }
                    function createFromSourceExpression(contract) {
                        var expr = this.createStandalone(contract);
                        return expr;
                    }
                    function fromSourceRef(contract, from) {
                        if (contract) {
                            if (!from) {
                                var entityRef = contract;
                                return data.SQExprBuilder.entity(entityRef.Schema, entityRef.Entity);
                            }
                            var sourceRef = contract, sourceName = sourceRef.Source, source = from.source(sourceName);
                            return source ? data.isSQFromEntitySource(source) ? data.SQExprBuilder.entity(source.schema, source.entity, sourceName) : data.isSQFromSubquerySource(source) ? data.SQExprBuilder.subqueryRef(sourceName) : source.expr.as(sourceName) : void 0;
                        }
                    }
                    function fromArithmetic(contract, from) {
                        if (contract) {
                            var left = create(contract.Left, from), right = create(contract.Right, from);
                            if (left && right) return data.SQExprBuilder.arithmetic(left, right, contract.Operator);
                        }
                    }
                    function fromFloor(contract, from) {
                        if (contract) {
                            var expression = create(contract.Expression, from);
                            if (expression) return data.SQExprBuilder.floor(expression, contract.Size, contract.TimeUnit);
                        }
                    }
                    function fromDiscretize(contract, from) {
                        if (contract) {
                            var expression = create(contract.Expression, from);
                            if (expression) return data.SQExprBuilder.discretize(expression, contract.Count);
                        }
                    }
                    function fromMember(contract, from) {
                        if (contract) {
                            var expression = create(contract.Expression, from);
                            if (expression) return data.SQExprBuilder.member(expression, contract.Member);
                        }
                    }
                    function fromColumnRef(contract, from) {
                        if (contract) {
                            var source = create(contract.Expression, from);
                            if (source) return data.SQExprBuilder.columnRef(source, contract.Property);
                        }
                    }
                    function fromPropertyVariationSource(contract, from) {
                        if (contract) {
                            var source = create(contract.Expression, from);
                            if (source) return data.SQExprBuilder.propertyVariationSource(source, contract.Name, contract.Property);
                        }
                    }
                    function fromHierarchy(contract, from) {
                        if (contract) {
                            var source = create(contract.Expression, from);
                            if (source) return data.SQExprBuilder.hierarchy(source, contract.Hierarchy);
                        }
                    }
                    function fromHierarchyLevel(contract, from) {
                        if (contract) {
                            var source = create(contract.Expression, from);
                            if (source) return data.SQExprBuilder.hierarchyLevel(source, contract.Level);
                        }
                    }
                    function fromMeasureRef(contract, from) {
                        if (contract) {
                            var source = create(contract.Expression, from);
                            if (source) return data.SQExprBuilder.measureRef(source, contract.Property);
                        }
                    }
                    function fromSelectRef(contract, from) {
                        if (contract) return data.SQExprBuilder.selectRef(contract.ExpressionName);
                    }
                    function fromPercentile(contract, from) {
                        if (contract) {
                            var source = create(contract.Expression, from);
                            if (source) return data.SQExprBuilder.percentile(source, contract.K, contract.Exclusive || !1);
                        }
                    }
                    function fromAggr(contract, from) {
                        if (contract) {
                            var source = create(contract.Expression, from);
                            if (source) return data.SQExprBuilder.aggregate(source, contract.Function);
                        }
                    }
                    function fromAnd(contract, from) {
                        if (contract) {
                            var left = create(contract.Left, from), right = create(contract.Right, from);
                            if (left && right) return data.SQExprBuilder.and(left, right);
                        }
                    }
                    function fromBetween(contract, from) {
                        if (contract) {
                            var expression = create(contract.Expression, from), lowerBound = create(contract.LowerBound, from), upperBound = create(contract.UpperBound, from);
                            if (expression && lowerBound && upperBound) return data.SQExprBuilder.between(expression, lowerBound, upperBound);
                        }
                    }
                    function fromIn(contract, from) {
                        if (contract) {
                            if (contract.Values) return data.SQExprBuilder.inValues(createArray(contract.Expressions, from), _.map(contract.Values, function(v) {
                                return createArray(v, from);
                            }));
                            var table = create(contract.Table, from);
                            if (table) return data.SQExprBuilder.inTable(createArray(contract.Expressions, from), table);
                        }
                    }
                    function fromOr(contract, from) {
                        if (contract) {
                            var left = create(contract.Left, from), right = create(contract.Right, from);
                            if (left && right) return data.SQExprBuilder.or(left, right);
                        }
                    }
                    function fromContains(contract, from) {
                        if (contract) {
                            var left = create(contract.Left, from), right = create(contract.Right, from);
                            if (left && right) return data.SQExprBuilder.contains(left, right);
                        }
                    }
                    function fromCompare(contract, from) {
                        if (contract) {
                            var left = create(contract.Left, from), right = create(contract.Right, from);
                            if (left && right) return data.SQExprBuilder.compare(contract.ComparisonKind, left, right);
                        }
                    }
                    function fromDateAdd(contract, from) {
                        if (contract) {
                            var expression = create(contract.Expression, from);
                            if (expression) return data.SQExprBuilder.dateAdd(contract.TimeUnit, contract.Amount, expression);
                        }
                    }
                    function fromDateSpan(contract, from) {
                        if (contract) {
                            var expression = create(contract.Expression, from);
                            if (expression) return data.SQExprBuilder.dateSpan(contract.TimeUnit, expression);
                        }
                    }
                    function fromExists(contract, from) {
                        if (contract) {
                            var arg = create(contract.Expression, from);
                            if (arg) return data.SQExprBuilder.exists(arg);
                        }
                    }
                    function fromNot(contract, from) {
                        if (contract) {
                            var arg = create(contract.Expression, from);
                            if (arg) return data.SQExprBuilder.not(arg);
                        }
                    }
                    function fromNow(contract) {
                        if (contract) return data.SQExprBuilder.now();
                    }
                    function fromDefaultValue(contract) {
                        if (contract) return data.SQExprBuilder.defaultValue();
                    }
                    function fromAnyValue(contract) {
                        if (contract) return data.SQExprBuilder.anyValue(contract.DefaultValueOverridesAncestors);
                    }
                    function fromStartsWith(contract, from) {
                        if (contract) {
                            var left = create(contract.Left, from), right = create(contract.Right, from);
                            if (left && right) return data.SQExprBuilder.startsWith(left, right);
                        }
                    }
                    function fromFillRule(contract, from) {
                        if (contract) {
                            var input = create(contract.Input, from), serializedRule = contract.FillRule, fillRule = {}, linearGradient2 = serializedRule.linearGradient2, linearGradient3 = serializedRule.linearGradient3, conditional = serializedRule.conditional;
                            if (linearGradient2) {
                                fillRule.linearGradient2 = {
                                    min: fromFillStop(linearGradient2.min, from),
                                    max: fromFillStop(linearGradient2.max, from)
                                };
                                var strategy = fromNullColoringStrategy(linearGradient2.nullColoringStrategy, from);
                                strategy && (fillRule.linearGradient2.nullColoringStrategy = strategy);
                            } else if (linearGradient3) {
                                fillRule.linearGradient3 = {
                                    min: fromFillStop(linearGradient3.min, from),
                                    mid: fromFillStop(linearGradient3.mid, from),
                                    max: fromFillStop(linearGradient3.max, from)
                                };
                                var strategy = fromNullColoringStrategy(linearGradient3.nullColoringStrategy, from);
                                strategy && (fillRule.linearGradient3.nullColoringStrategy = strategy);
                            } else if (conditional) {
                                fillRule.conditional = {
                                    cases: conditional.cases.map(function(colorCase) {
                                        return fromRuleColorCase(colorCase);
                                    })
                                };
                                var strategy = fromNullColoringStrategy(conditional.nullColoringStrategy, from);
                                strategy && (fillRule.conditional.nullColoringStrategy = strategy);
                            }
                            return data.SQExprBuilder.fillRule(input, fillRule);
                        }
                    }
                    function fromThemeColor(contract) {
                        if (contract) return data.SQExprBuilder.themeColor(contract.Color, contract.Percent);
                    }
                    function fromResourcePackageItem(contract, from) {
                        if (contract) return data.SQExprBuilder.resourcePackageItem(contract.PackageName, contract.PackageType, contract.ItemName);
                    }
                    function fromScopedEval(contract, from) {
                        if (contract) {
                            var source = create(contract.Expression, from);
                            if (source) return data.SQExprBuilder.scopedEval(source, createArray(contract.Scope, from));
                        }
                    }
                    function fromFilteredEval(contract, from) {
                        if (contract) {
                            var expression = create(contract.Expression, from);
                            return data.SQExprBuilder.filteredEval(expression, _.map(contract.Filters, function(filter) {
                                return Deserializer.filter(filter, from);
                            }));
                        }
                    }
                    function fromWithRef(contract, from) {
                        if (contract) return data.SQExprBuilder.withRef(contract.ExpressionName);
                    }
                    function fromTransformTableRef(contract, from) {
                        if (contract) return data.SQExprBuilder.transformTableRef(contract.Source);
                    }
                    function fromTransformOutputRoleRef(contract, from) {
                        if (contract) return data.SQExprBuilder.transformOutputRoleRef(contract.Role, contract.Transform);
                    }
                    function fromFillStop(contract, from) {
                        if (contract) {
                            var serialized = {
                                color: create(contract.color, from)
                            };
                            return contract.value && (serialized.value = create(contract.value, from)), serialized;
                        }
                    }
                    function fromRuleColorCase(contract, from) {
                        if (contract) {
                            var serialized = {
                                color: create(contract.color, from),
                                condition: create(contract.condition, from)
                            };
                            return serialized;
                        }
                    }
                    function fromNullColoringStrategy(contract, from) {
                        if (contract) {
                            var output = {
                                strategy: create(contract.strategy, from)
                            };
                            return contract.color && (output.color = create(contract.color, from)), output;
                        }
                    }
                    function fromBool(contract) {
                        if (contract) return data.SQExprBuilder.boolean(contract.Value);
                    }
                    function fromDateTime(contract) {
                        if (contract) {
                            var date = fromDateTimeString(contract);
                            if (date) return data.SQExprBuilder.dateTime(date);
                        }
                    }
                    function fromDateTimeSecond(contract) {
                        if (contract) {
                            var date = fromDateTimeString(contract);
                            return data.SQExprBuilder.dateSpan(5, data.SQExprBuilder.dateTime(date));
                        }
                    }
                    function fromDecimal(contract) {
                        if (contract) {
                            var value = contract.Value;
                            return data.SQExprBuilder.decimal(value);
                        }
                    }
                    function fromInteger(contract) {
                        if (contract) {
                            var value = contract.Value;
                            return data.SQExprBuilder.integer(value);
                        }
                    }
                    function fromNull(contract) {
                        if (contract) return data.SQExprBuilder.nullConstant();
                    }
                    function fromNumber(contract) {
                        if (contract) return data.PrimitiveValueEncoding.parseValueToSQExpr(contract.Value);
                    }
                    function fromString(contract) {
                        if (contract) {
                            var value = contract.Value;
                            return data.SQExprBuilder.text(value);
                        }
                    }
                    function fromDateTimeString(contract) {
                        return jsCommon.DateExtensions.tryDeserializeDate(contract.Value);
                    }
                    function fromLiteral(contract) {
                        if (contract) return data.PrimitiveValueEncoding.parseValueToSQExpr(contract.Value);
                    }
                    function fromGroupRef(contract, from) {
                        if (contract) {
                            var source = create(contract.Expression, from), groupedColumns = _.map(contract.GroupedColumns, function(value) {
                                return ExprBuilder.create(value, from);
                            });
                            if (source && !_.isEmpty(groupedColumns)) return data.SQExprBuilder.groupRef(contract.Property, source, groupedColumns);
                        }
                    }
                    function fromRoleRef(contract) {
                        if (contract) return data.SQExprBuilder.roleRef(contract.Role);
                    }
                    function fromNamedQueryRef(contract) {
                        if (contract) return data.SQExprBuilder.namedQueryRef(contract.Name);
                    }
                    ExprBuilder.create = create, ExprBuilder.createStandalone = createStandalone, ExprBuilder.createConst = createConst, 
                    ExprBuilder.createFromSourceExpression = createFromSourceExpression;
                }(ExprBuilder || (ExprBuilder = {}));
            }(SemanticQuerySerializer = services.SemanticQuerySerializer || (services.SemanticQuerySerializer = {}));
        }(services = data.services || (data.services = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var transforms;
        !function(transforms) {
            var plugins;
            !function(plugins) {
                plugins.Forecast = {
                    name: "Forecast",
                    inputRoles: [ {
                        name: "X",
                        visualDataRoleMatching: {
                            cartesianKind: 0
                        }
                    }, {
                        name: "Y",
                        visualDataRoleMatching: {
                            cartesianKind: 1
                        }
                    } ],
                    outputRoles: [ {
                        name: "forecast.ForecastValue",
                        algorithmRole: "Forecast",
                        columnName: "forecastValue",
                        kind: powerbi.VisualDataRoleKind.Measure
                    }, {
                        name: "forecast.ConfidenceHighBound",
                        algorithmRole: "UpperBound",
                        columnName: "confidenceHighBound",
                        kind: powerbi.VisualDataRoleKind.Measure
                    }, {
                        name: "forecast.ConfidenceLowBound",
                        algorithmRole: "LowerBound",
                        columnName: "confidenceLowBound",
                        kind: powerbi.VisualDataRoleKind.Measure
                    } ]
                }, plugins.KMeansClustering = {
                    name: "KMeansClustering",
                    inputRoles: [ {
                        name: "Attribute",
                        visualDataRoleMatching: {
                            matchMeasure: !0,
                            skipJoinPredicateNone: !0
                        }
                    }, {
                        name: "Item",
                        visualDataRoleMatching: {
                            matchGrouping: !0
                        }
                    } ],
                    outputRoles: [ {
                        name: "Series",
                        algorithmRole: "ClusterId",
                        columnName: "clusterId",
                        kind: powerbi.VisualDataRoleKind.Grouping
                    } ]
                }, plugins.SpatialClustering = {
                    name: "SpatialClustering",
                    inputRoles: [ {
                        name: "Attribute",
                        visualDataRoleMatching: {
                            matchMeasure: !0,
                            skipJoinPredicateNone: !0
                        }
                    }, {
                        name: "Item",
                        visualDataRoleMatching: {
                            matchGrouping: !0
                        }
                    } ],
                    outputRoles: [ {
                        name: "Series",
                        algorithmRole: "ClusterId",
                        columnName: "clusterId",
                        kind: powerbi.VisualDataRoleKind.Grouping
                    } ]
                };
            }(plugins = transforms.plugins || (transforms.plugins = {}));
        }(transforms = data.transforms || (data.transforms = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var transforms;
        !function(transforms) {
            function createTransformPluginService() {
                return new TransformPluginService();
            }
            transforms.createTransformPluginService = createTransformPluginService;
            var TransformPluginService = function() {
                function TransformPluginService() {
                    this.plugins = powerbi.data.transforms.plugins;
                }
                return TransformPluginService.prototype.getTransformPlugin = function(name) {
                    if (name) return this.plugins[name];
                }, TransformPluginService;
            }();
        }(transforms = data.transforms || (data.transforms = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var dsr;
        !function(dsr) {
            function mergeMappings(mappings, indicesByName) {
                var mappingsLength = mappings.length;
                if (1 === mappingsLength) return {
                    mapping: mappings[0]
                };
                for (var mapping, splits = [], i = 0; i < mappingsLength; i++) {
                    var currentMapping = mappings[i];
                    if (!currentMapping.categorical) return;
                    0 === i && (mapping = {
                        metadata: currentMapping.metadata,
                        categorical: {}
                    }), Impl.mergeCategorical(mapping.categorical, currentMapping.categorical), splits.push(Impl.createSplit(indicesByName, currentMapping.categorical));
                }
                return {
                    mapping: mapping,
                    splits: splits
                };
            }
            dsr.mergeMappings = mergeMappings;
            var Impl;
            !function(Impl) {
                function mergeCategorical(target, source) {
                    if (source.categories) if (target.categories) {
                        equalsCategoricalCategories(target, source);
                    } else target.categories = source.categories;
                    if (null != source.dataVolume || null != target.dataVolume) {
                        var maxDataVolume = Math.max(source.dataVolume || 0, target.dataVolume || 0);
                        source.dataVolume = target.dataVolume = maxDataVolume;
                    }
                    if (source.dataReductionAlgorithm) if (target.dataReductionAlgorithm) {
                        areReductionsEquivalent(source.dataReductionAlgorithm, target.dataReductionAlgorithm);
                    } else target.dataReductionAlgorithm = source.dataReductionAlgorithm;
                    if (source.values) {
                        var targetValues = target.values;
                        targetValues || (targetValues = target.values = {});
                        var sourceValues = source.values, sourceValuesGrouping = sourceValues.group;
                        if (pushRolesToTargetList(targetValues, sourceValues), pushArrayRolesToTargetList(targetValues, sourceValues.select), 
                        sourceValuesGrouping) {
                            var targetValuesGrouping = target.values.group;
                            targetValuesGrouping ? pushArrayRolesToTargetList(targetValuesGrouping, sourceValuesGrouping.select) : target.values.group = {
                                select: sourceValuesGrouping.select.concat([]),
                                by: sourceValuesGrouping.by,
                                dataReductionAlgorithm: sourceValuesGrouping.dataReductionAlgorithm
                            };
                        }
                    }
                }
                function equalsCategoricalCategories(target, source) {
                    if (!target && !source) return !0;
                    if (target && source) {
                        if (!target.categories && !source.categories) return !0;
                        if (target.categories && source.categories) {
                            var x = target.categories, y = source.categories;
                            if (!areReductionsEquivalent(x.dataReductionAlgorithm, y.dataReductionAlgorithm)) return !1;
                            var roleBindMappingX = x, roleBindMappingY = y;
                            if (roleBindMappingX.bind || roleBindMappingY.bind) return _.isEqual(roleBindMappingX.bind, roleBindMappingY.bind);
                            var roleForMappingX = x, roleForMappingY = y;
                            if (roleForMappingX.for || roleForMappingY.for) return _.isEqual(roleForMappingX.for, roleForMappingY.for);
                            var roleListMappingX = x, roleListMappingY = y;
                            return !roleListMappingX.select && !roleListMappingY.select || _.isEqual(roleListMappingX.select, roleListMappingY.select);
                        }
                    }
                    return !1;
                }
                function areReductionsEquivalent(x, y) {
                    return !x || !y || _.isEqual(x, y);
                }
                function pushRolesToTargetList(targetValues, sourceValues) {
                    (sourceValues.bind || sourceValues.for) && (targetValues.select || (targetValues.select = []), 
                    targetValues.select.push(sourceValues));
                }
                function pushArrayRolesToTargetList(targetValues, select) {
                    if (select) {
                        targetValues.select || (targetValues.select = []), (_a = targetValues.select).push.apply(_a, select);
                        var _a;
                    }
                }
                function createSplit(indicesByName, mapping) {
                    var result = {
                        selects: {}
                    }, visitor = {
                        visitRole: function(role) {
                            return split(result, indicesByName, role);
                        }
                    };
                    return data.CompiledDataViewMapping.visitCategoricalCategories(mapping.categories, visitor), 
                    data.CompiledDataViewMapping.visitGrouped(mapping.values, visitor), data.CompiledDataViewMapping.visitCategoricalValues(mapping.values, visitor), 
                    result;
                }
                function split(split, indicesByName, role) {
                    var roleItems = role.items;
                    if (!_.isEmpty(role.items)) for (var isAlreadyIncluded = [], _i = 0, roleItems_1 = roleItems; _i < roleItems_1.length; _i++) {
                        var item = roleItems_1[_i], queryReference = item.queryName, queryIndex = indicesByName[queryReference];
                        isAlreadyIncluded[queryIndex] || (split.selects[queryIndex] = !0, isAlreadyIncluded[queryIndex] = !0);
                    }
                }
                Impl.mergeCategorical = mergeCategorical, Impl.createSplit = createSplit;
            }(Impl || (Impl = {}));
        }(dsr = data.dsr || (data.dsr = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var dsr;
        !function(dsr) {
            var DataShapeUtility;
            !function(DataShapeUtility) {
                function findAndParseCalculation(calcs, id) {
                    var calc = findCalculation(calcs, id);
                    if (calc) return data.PrimitiveValueEncoding.parseValue(calc.Value);
                }
                function findAndParseCalculationToSQExpr(calcs, id) {
                    var calc = findCalculation(calcs, id);
                    if (calc) return data.PrimitiveValueEncoding.parseValueToSQExpr(calc.Value);
                }
                function findCalculation(calcs, id) {
                    for (var i = 0, len = calcs.length; i < len; i++) {
                        var calc = calcs[i];
                        if (calc.Id === id) return calc;
                    }
                }
                function describeDataType(type, category) {
                    type = type || 0;
                    var primitiveType = 0;
                    switch (type) {
                      case 2048:
                        primitiveType = 1;
                        break;

                      case 1:
                        primitiveType = 3;
                        break;

                      case 3:
                        primitiveType = 4;
                        break;

                      case 4096:
                        primitiveType = 5;
                        break;

                      case 20:
                        primitiveType = 6;
                        break;

                      case 4:
                        primitiveType = 7;
                        break;

                      case 8:
                        primitiveType = 9;
                        break;

                      case 67:
                        primitiveType = 4, category = "Years";
                        break;

                      case 35:
                        primitiveType = 4, category = "Months";
                    }
                    return powerbi.ValueType.fromPrimitiveTypeAndCategory(primitiveType, category);
                }
                function getTopLevelSecondaryDynamicMember(dataShape, dataShapeExpressions) {
                    var hierarchy = dataShape.SecondaryHierarchy;
                    return hierarchy ? dataShapeExpressions && dataShapeExpressions.Secondary ? DataShapeUtility.getDynamicMember(hierarchy, dataShapeExpressions.Secondary.Groupings, 0) : DataShapeUtility.getDynamicMemberFallback(hierarchy) : null;
                }
                function getTopLevelPrimaryDynamicMember(dataShape, dataShapeExpressions, useTopLevelCalculations) {
                    var hierarchy = dataShape.PrimaryHierarchy;
                    if (!hierarchy) return null;
                    var hasTopLevelCalcs;
                    return useTopLevelCalculations && (hasTopLevelCalcs = void 0 !== dataShape.Calculations), 
                    dataShapeExpressions && dataShapeExpressions.Primary ? DataShapeUtility.getDynamicMember(hierarchy, dataShapeExpressions.Primary.Groupings, 0, hasTopLevelCalcs) : DataShapeUtility.getDynamicMemberFallback(hierarchy, hasTopLevelCalcs);
                }
                function getDynamicMember(dataShapeMembers, axisGroupings, groupDepth, hasTopLevelCalculations) {
                    if (0 === dataShapeMembers.length) return null;
                    if (!axisGroupings || 0 === axisGroupings.length) return DataShapeUtility.getDynamicMemberFallback(dataShapeMembers, hasTopLevelCalculations);
                    var dynamicMemberId = axisGroupings[groupDepth].Member;
                    if (!dynamicMemberId) return DataShapeUtility.getDynamicMemberFallback(dataShapeMembers, hasTopLevelCalculations);
                    for (var _i = 0, dataShapeMembers_1 = dataShapeMembers; _i < dataShapeMembers_1.length; _i++) {
                        var dataShapeMember = dataShapeMembers_1[_i];
                        if (dataShapeMember.Id === dynamicMemberId) return dataShapeMember;
                    }
                    return null;
                }
                function getDynamicMemberFallback(dataShapeMembers, hasTopLevelCalculations) {
                    return 2 === dataShapeMembers.length ? dataShapeMembers[1] : void 0 === hasTopLevelCalculations || hasTopLevelCalculations === !0 ? dataShapeMembers[0] : null;
                }
                DataShapeUtility.findAndParseCalculation = findAndParseCalculation, DataShapeUtility.findAndParseCalculationToSQExpr = findAndParseCalculationToSQExpr, 
                DataShapeUtility.findCalculation = findCalculation, DataShapeUtility.describeDataType = describeDataType, 
                DataShapeUtility.getTopLevelSecondaryDynamicMember = getTopLevelSecondaryDynamicMember, 
                DataShapeUtility.getTopLevelPrimaryDynamicMember = getTopLevelPrimaryDynamicMember, 
                DataShapeUtility.getDynamicMember = getDynamicMember, DataShapeUtility.getDynamicMemberFallback = getDynamicMemberFallback;
            }(DataShapeUtility = dsr.DataShapeUtility || (dsr.DataShapeUtility = {}));
        }(dsr = data.dsr || (data.dsr = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var ClientErrorStrings = powerbi.ClientErrorStrings, StringExtensions = jsCommon.StringExtensions;
    powerbi.DMTS_MultipleGatewaysWithAllDatasourcesToBindError = "DMTS_MultipleGatewaysWithAllDatasourcesToBindError", 
    powerbi.DMTS_DatasourceHasNoCredentialError = "DMTS_DatasourceHasNoCredentialError", 
    powerbi.DM_GWPipeline_Client_GatewayUnreachable = "DM_GWPipeline_Client_GatewayUnreachable", 
    powerbi.DM_GWPipeline_Gateway_DataSourceConnectionError = "DM_GWPipeline_Gateway_DataSourceConnectionError", 
    powerbi.DMTS_UserLostPermissionToDatasourceError = "DMTS_UserLostPermissionToDatasourceError", 
    powerbi.DMTS_UserNotFoundInADGraphError = "DMTS_UserNotFoundInADGraphError", powerbi.DM_GWPipeline_Gateway_DataSourceAccessError = "DM_GWPipeline_Gateway_DataSourceAccessError", 
    powerbi.DM_GWPipeline_Gateway_ImpersonationError = "DM_GWPipeline_Gateway_ImpersonationError", 
    powerbi.DM_GWPipeline_Gateway_InvalidMashupConnectionString = "DM_GWPipeline_Gateway_InvalidMashupConnectionString", 
    powerbi.DM_GWPipeline_Gateway_DatabaseLoginError = "DM_GWPipeline_Gateway_DatabaseLoginError", 
    powerbi.DM_GWPipeline_Gateway_SqlTimeoutException = "DM_GWPipeline_Gateway_SqlTimeoutException", 
    powerbi.DM_GWPipeline_Gateway_AdomdTimeoutException = "DM_GWPipeline_Gateway_AdomdTimeoutException", 
    powerbi.DM_GWPipeline_Gateway_InvalidObjectNameException = "DM_GWPipeline_Gateway_InvalidObjectNameException", 
    powerbi.DM_GWPipeline_Gateway_ConnectionBrokenException = "DM_GWPipeline_Gateway_ConnectionBrokenException", 
    powerbi.DM_GWPipeline_Gateway_MemoryError = "DM_GWPipeline_Gateway_MemoryError", 
    powerbi.DM_GWPipeline_Gateway_MissingStructureError = "DM_GWPipeline_Gateway_MissingStructureError", 
    powerbi.DM_GWPipeline_Gateway_UnprocessedStructureError = "DM_GWPipeline_Gateway_UnprocessedStructureError", 
    powerbi.DM_GWPipeline_Gateway_ModelLoadError = "DM_GWPipeline_Gateway_ModelLoadError", 
    powerbi.DM_GWPipeline_Gateway_CancellationError = "DM_GWPipeline_Gateway_CancellationError", 
    powerbi.DM_GWPipeline_Gateway_QueryExecutionError = "DM_GWPipeline_Gateway_QueryExecutionError", 
    powerbi.DM_GWPipeline_Gateway_RecalculationRequiredError = "DM_GWPipeline_Gateway_RecalculationRequiredError", 
    powerbi.DM_GWPipeline_Gateway_AdomdConnectError = "DM_GWPipeline_Gateway_AdomdConnectError", 
    powerbi.DM_GWPipeline_Gateway_MashupDataAccessError = "DM_GWPipeline_Gateway_MashupDataAccessError", 
    powerbi.RS_AccessDenied = "rsAccessDenied", powerbi.azureValues = "azure:values", 
    powerbi.KnownDsrClientErrors = {
        ComplexSlicerNotAllowedWithMeasures: {
            localizedContent: "DsrError_ComplexSlicerNotAllowedWithMeasuresValue"
        },
        ComplexHighlightsNotAllowed: {
            localizedContent: "DsrError_ComplexHighlightsNotAllowed_Details",
            localizedMessage: "DsrError_ComplexHighlightsNotAllowed_ShortMessage"
        },
        CouldNotResolveModelReferencesInSemanticQuery: {
            localizedMessage: "DsrError_CouldNotResolveModelRefErrorMessage",
            localizedTitle: "DsrError_CouldNotResolveModelRefErrorKey",
            localizedContent: "DsrError_CouldNotResolveModelRefErrorValNoItems",
            localizedContentWithAffectedItems: "DsrError_CouldNotResolveModelRefErrorValFormat",
            helpLink: "https://go.microsoft.com/fwlink/?LinkID=690865"
        },
        ErrorLoadingModel: {
            localizedTitle: "DsrError_LoadingModelKey",
            localizedContent: "DsrError_LoadingModelValue",
            helpLink: "https://go.microsoft.com/fwlink/?LinkID=690859"
        },
        ExclusivePercentileOutOfRange: {
            localizedMessage: "DsrError_ExclusivePercentileOutOfRangeMessage",
            localizedTitle: "DsrError_ExclusivePercentileOutOfRangeKey",
            localizedContent: "DsrError_ExclusivePercentileOutOfRangeValue"
        },
        InvalidDataShapeNoOutputData: {
            localizedContent: "DsrError_InvalidDataShapeValue",
            helpLink: "https://go.microsoft.com/fwlink/?LinkID=690860"
        },
        InvalidUnconstrainedJoin: {
            localizedTitle: "DsrError_InvalidUnconstrainedJoinKey",
            localizedContent: "DsrError_InvalidUnconstrainedJoinValue",
            helpLink: "https://go.microsoft.com/fwlink/?LinkID=690861"
        },
        IsRelatedToManyNotSupportedForDetailTable: {
            localizedMessage: "DsrError_IsRelatedToManyNotSupportedForDetailTableMessage",
            localizedTitle: "DsrError_IsRelatedToManyNotSupportedForDetailTableKey",
            localizedContent: "DsrError_IsRelatedToManyNotSupportedForDetailTableValueNoItems",
            localizedContentWithAffectedItems: "DsrError_IsRelatedToManyNotSupportedForDetailTableValueFormat"
        },
        AA_PowerBIScriptPayloadTooLargeError: {
            localizedMessage: "DsrError_ResourcesExceededMessage",
            localizedTitle: "DsrError_ResourcesExceededKey",
            localizedContent: "DsrError_ResourcesExceededValue",
            helpLink: "https://go.microsoft.com/fwlink/?LinkID=746290"
        },
        AA_PowerBIScriptResultTooLargeError: {
            localizedMessage: "DsrError_ResourcesExceededMessage",
            localizedTitle: "DsrError_ResourcesExceededKey",
            localizedContent: "DsrError_ResourcesExceededValue",
            helpLink: "https://go.microsoft.com/fwlink/?LinkID=746291"
        },
        AA_PowerBIScriptReturnedNoImageError: {
            localizedMessage: "DsrError_ScriptReturnedNoImageMessage",
            localizedTitle: "DsrError_ScriptReturnedNoImageKey",
            localizedContent: "DsrError_ScriptReturnedNoImageContent",
            helpLink: "https://go.microsoft.com/fwlink/?LinkId=733479"
        },
        AA_PowerBIScriptRuntimeErrorError: {
            localizedTitle: "DsrError_ScriptRuntimeErrorKey",
            localizedMessage: "DsrError_ScriptRuntimeErrorMessage",
            useODataErrorMessageAsContent: !0,
            helpLink: "https://go.microsoft.com/fwlink/?LinkId=733477"
        },
        AA_PowerBIScriptTimeoutError: {
            localizedMessage: "DsrError_ScriptTimeoutMessage",
            localizedTitle: "DsrError_ScriptTimeoutKey",
            localizedContent: "DsrError_ScriptTimeoutContent",
            helpLink: "https://go.microsoft.com/fwlink/?LinkId=733478"
        },
        AA_PowerBIRequestsQueueOverflowError: {
            localizedTitle: "DsrError_RequestsQueueOverflowKey",
            localizedMessage: "DsrError_RequestsQueueOverflowMessage",
            localizedContent: "DsrError_RequestsQueueOverflowContent",
            helpLink: "https://go.microsoft.com/fwlink/?LinkId=799576"
        },
        AA_PowerBIScriptRuntimeMaxMemoryError: {
            localizedTitle: "DsrError_ScriptRuntimeMaxMemoryKey",
            localizedMessage: "DsrError_ScriptRuntimeMaxMemoryMessage",
            localizedContent: "DsrError_ScriptRuntimeMaxMemoryContent",
            helpLink: "https://go.microsoft.com/fwlink/?LinkId=799578"
        },
        AA_PowerBIScriptRuntimeMaxDiskIOError: {
            localizedTitle: "DsrError_ScriptRuntimeMaxDiskIOKey",
            localizedMessage: "DsrError_ScriptRuntimeMaxDiskIOMessage",
            localizedContent: "DsrError_ScriptRuntimeMaxDiskIOContent",
            helpLink: "https://go.microsoft.com/fwlink/?LinkId=799579"
        },
        AA_PowerBIScriptMissingDependencyError: {
            localizedTitle: "DsrError_ScriptRuntimeMissingDependencyKey",
            localizedMessage: "DsrError_ScriptRuntimeMissingDependencyMessage",
            localizedContent: "DsrError_ScriptRuntimeMissingDependencyContent",
            helpLink: "https://go.microsoft.com/fwlink/?LinkId=799857"
        },
        AA_PowerBIScriptSpecificPackageWithMissingDependencyError: {
            localizedTitle: "DsrError_ScriptRuntimeSpecificPackageWithMissingDependencyKey",
            localizedMessage: "DsrError_ScriptRuntimeSpecificPackageWithMissingDependencyMessage",
            useODataErrorMessageAsContent: !0,
            helpLink: "https://go.microsoft.com/fwlink/?LinkId=799858"
        },
        AA_PowerBIScriptSpecificPackageMissingSpecificDependencyError: {
            localizedTitle: "DsrError_ScriptRuntimeSpecificPackageMissingSpecificDependencyKey",
            localizedMessage: "DsrError_ScriptRuntimeSpecificPackageMissingSpecificDependencyMessage",
            useODataErrorMessageAsContent: !0,
            helpLink: "https://go.microsoft.com/fwlink/?LinkId=799859"
        },
        AA_PowerBIScriptMissingSpecificPackageError: {
            localizedTitle: "DsrError_ScriptRuntimeMissingSpecificPackageKey",
            localizedMessage: "DsrError_ScriptRuntimeMissingSpecificPackageMessage",
            useODataErrorMessageAsContent: !0,
            helpLink: "https://go.microsoft.com/fwlink/?LinkId=800225"
        },
        ModelMeasuresNotSupportedForDetailTable: {
            localizedMessage: "DsrError_ModelMeasuresNotSupportedForDetailTableMessage",
            localizedTitle: "DsrError_ModelMeasuresNotSupportedForDetailTableKey",
            localizedContent: "DsrError_ModelMeasuresNotSupportedForDetailTableValueNoItems",
            localizedContentWithAffectedItems: "DsrError_ModelMeasuresNotSupportedForDetailTableValueFormat"
        },
        ModelUnavailable: {
            localizedContent: "DsrError_ModelUnavailableValue",
            helpLink: "https://go.microsoft.com/fwlink/?LinkID=690862"
        },
        NoUniqueKeyForDetailTable: {
            localizedContent: "DsrError_NoUniqueKeyForDetailTableValue"
        },
        OverlappingKeysOnOppositeHierarchies: {
            localizedTitle: "DsrError_OverlappingKeysKey",
            localizedContent: "DsrError_OverlappingKeysValue",
            helpLink: "https://go.microsoft.com/fwlink/?LinkID=690863"
        },
        rsQueryMemoryLimitExceeded: {
            localizedMessage: "DsrError_ResourcesExceededMessage",
            localizedTitle: "DsrError_ResourcesExceededKey",
            localizedContent: "DsrError_ResourcesExceededValue",
            helpLink: "https://go.microsoft.com/fwlink/?LinkID=690864"
        },
        rsQueryTimeoutExceeded: {
            localizedMessage: "DsrError_ResourcesExceededMessage",
            localizedTitle: "DsrError_ResourcesExceededKey",
            localizedContent: "DsrError_ResourcesExceededValue",
            helpLink: "https://go.microsoft.com/fwlink/?LinkID=690864"
        },
        rsAccessDenied: {
            localizedMessage: "DsrError_NoPermissionMessage",
            localizedTitle: "DsrError_NoPermissionKey",
            localizedContent: "DsrError_NoAccessForVisual",
            helpLink: "https://go.microsoft.com/fwlink/?LinkID=690862"
        },
        UnsupportedDateTimeLiteral: {
            localizedMessage: "DsrError_UnsupportedDateTimeMessage",
            localizedTitle: "DsrError_UnsupportedDateTimeKey",
            localizedContent: "DsrError_UnsupportedDateTimeValueNoItems",
            localizedContentWithAffectedItems: "DsrError_UnsupportedDateTimeValueFormat"
        },
        InvalidExtensionDax_UnclosedBracketIdentifier: {
            localizedContentWithAffectedItemsAndPosition: "DsrError_InvalidExtensionDax_UnclosedBracketIdentifier"
        },
        InvalidExtensionDax_UnexpectedCloseParenthesis: {
            localizedContentWithAffectedItemsAndPosition: "DsrError_InvalidExtensionDax_UnexpectedCloseParenthesis"
        },
        InvalidFilterComparisonIncompatibleExpressions: {
            localizedContent: "DsrError_InvalidFilterConditionIncompatibleDataTypeOrExpression",
            localizedContentWithAffectedItems: "DsrError_InvalidFilterConditionIncompatibleDataTypeOrExpressionWithAffectedItems"
        },
        InvalidFilterConditionIncompatibleDataType: {
            localizedContent: "DsrError_InvalidFilterConditionIncompatibleDataTypeOrExpression",
            localizedContentWithAffectedItems: "DsrError_InvalidFilterConditionIncompatibleDataTypeOrExpressionWithAffectedItems"
        },
        ExtensionMeasureEmptyExpression: {
            localizedContentWithAffectedItems: "DsrError_ExtensionMeasureEmptyExpression"
        },
        ExtensionMeasureNameNotUniqueModel: {
            localizedContentWithAffectedItems: "DsrError_ExtensionMeasureNameNotUniqueModel"
        },
        ExtensionMeasureNameNotUnique: {
            localizedContentWithAffectedItems: "DsrError_ExtensionMeasureNameNotUnique"
        },
        CouldNotResolveModelReferencesInQueryExtensionSchema: {
            localizedMessage: "DsrError_CouldNotResolveModelRefErrorMessage",
            localizedTitle: "DsrError_CouldNotResolveModelRefErrorKey",
            localizedContentWithAffectedItems: "DsrError_CouldNotResolveModelReferencesInQueryExtensionSchema"
        },
        QueryExtensionMeasureError: {
            localizedContentWithAffectedItemsAndPosition: "DsrError_QueryExtensionMeasureError",
            localizedContentWithAffectedItemsAndPositionAndDetails: "DsrError_QueryExtensionMeasureErrorWithDetails"
        },
        QueryExtensionMeasureUnexpectedEndOfUserInput: {
            localizedContentWithAffectedItems: "DsrError_QueryExtensionMeasureUnexpectedEndOfUserInput"
        }
    };
    var DsrClientError = function() {
        function DsrClientError(oDataError) {
            this.oDataError = oDataError, this.oDataCode = this.parseCode();
        }
        return Object.defineProperty(DsrClientError, "maxNumberOfCommaValues", {
            get: function() {
                return 9;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(DsrClientError.prototype, "code", {
            get: function() {
                return this.oDataCode;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(DsrClientError.prototype, "oDataErrorMessage", {
            get: function() {
                if (this.oDataError && this.oDataError.message && this.oDataError.message.value) return this.oDataError.message.value;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(DsrClientError.prototype, "source", {
            get: function() {
                switch (this.oDataError.source) {
                  case "PowerBI":
                    return 0;

                  case "External":
                    return 1;

                  case "Unknown":
                    return;

                  case "User":
                    return DsrClientError.isCodeKnown(this.code) ? 2 : void 0;
                }
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(DsrClientError.prototype, "ignorable", {
            get: function() {
                return !1;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(DsrClientError.prototype, "AdditionalErrorMessages", {
            get: function() {
                if (this.oDataError) {
                    var values = this.oDataError[powerbi.azureValues];
                    if (!_.isEmpty(values)) for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                        var value = values_1[_i];
                        if (!_.isEmpty(value.additionalMessages)) return value.additionalMessages;
                    }
                }
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(DsrClientError.prototype, "powerBiErrorDetails", {
            get: function() {
                if (this.oDataError) {
                    var values = this.oDataError[powerbi.azureValues];
                    if (!_.isEmpty(values)) for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
                        var value = values_2[_i];
                        if (!_.isEmpty(value.powerBiErrorDetails)) return value.powerBiErrorDetails;
                    }
                }
            },
            enumerable: !0,
            configurable: !0
        }), DsrClientError.prototype.getDetails = function(resourceProvider) {
            var values = this.oDataError[powerbi.azureValues], azureDetails = null;
            if (values) for (var _i = 0, values_3 = values; _i < values_3.length; _i++) {
                var value = values_3[_i];
                if (value.details) {
                    azureDetails = value.details;
                    break;
                }
            }
            var details = DsrClientError.getErrorDetailsFromStatusCode(this.code, this.oDataErrorMessage, azureDetails, this.AdditionalErrorMessages, resourceProvider), key = details.displayableErrorInfo[0].errorInfoKey;
            if (!DsrClientError.isCodeKnown(this.code) && azureDetails && (details.displayableErrorInfo = []), 
            azureDetails) {
                var detailsKey = 0 === details.displayableErrorInfo.length ? key : resourceProvider.get("DsrError_MoreInfo");
                details.displayableErrorInfo.push({
                    errorInfoKey: detailsKey,
                    errorInfoValue: azureDetails
                });
            }
            return details;
        }, DsrClientError.getErrorDetailsFromStatusCode = function(code, oDataErrorMessage, azureDetails, additionalMessages, resourceProvider) {
            var key = resourceProvider.get("DsrError_Key"), val = resourceProvider.get("DsrError_UnknownErrorValue"), message = resourceProvider.get("DsrError_Message"), helpLink = jsCommon.PowerBIDefaultHelpPage, errorTemplate = powerbi.KnownDsrClientErrors[code];
            if (errorTemplate) {
                key = errorTemplate.localizedTitle ? resourceProvider.get(errorTemplate.localizedTitle) : key;
                var content = DsrClientError.getContent(code, azureDetails, additionalMessages, errorTemplate, resourceProvider);
                val = content || val, message = errorTemplate.localizedMessage ? resourceProvider.get(errorTemplate.localizedMessage) : message, 
                helpLink = errorTemplate.helpLink || helpLink, errorTemplate.useODataErrorMessageAsContent && (val = oDataErrorMessage || message);
            }
            var details = {
                message: message,
                displayableErrorInfo: [ {
                    errorInfoKey: key,
                    errorInfoValue: val
                } ],
                helpLink: helpLink
            };
            return details.debugErrorInfo = [], !errorTemplate && code && details.debugErrorInfo.push({
                errorInfoKey: ClientErrorStrings.ErrorCode,
                errorInfoValue: code
            }), errorTemplate && errorTemplate.useODataErrorMessageAsContent || !oDataErrorMessage || details.debugErrorInfo.push({
                errorInfoKey: ClientErrorStrings.ODataErrorMessage,
                errorInfoValue: oDataErrorMessage
            }), details;
        }, DsrClientError.getContent = function(code, azureDetails, additionalMessages, errorTemplate, resourceProvider) {
            if (errorTemplate.localizedContentWithAffectedItemsAndPosition || errorTemplate.localizedContentWithAffectedItemsAndPositionAndDetails) {
                var positionMessage = DsrClientError.findAdditionalMessageWithAffectedItemsAndPosition(code, additionalMessages);
                if (errorTemplate.localizedContentWithAffectedItemsAndPositionAndDetails && azureDetails && positionMessage) return StringExtensions.format(resourceProvider.get(errorTemplate.localizedContentWithAffectedItemsAndPositionAndDetails), StringExtensions.constructCommaSeparatedList(positionMessage.AffectedItems, resourceProvider, DsrClientError.maxNumberOfCommaValues), powerbi.formattingService.formatValue(positionMessage.Line), powerbi.formattingService.formatValue(positionMessage.Position), azureDetails);
                if (errorTemplate.localizedContentWithAffectedItemsAndPosition && positionMessage) return StringExtensions.format(resourceProvider.get(errorTemplate.localizedContentWithAffectedItemsAndPosition), StringExtensions.constructCommaSeparatedList(positionMessage.AffectedItems, resourceProvider, DsrClientError.maxNumberOfCommaValues), powerbi.formattingService.formatValue(positionMessage.Line), powerbi.formattingService.formatValue(positionMessage.Position));
            }
            if (errorTemplate.localizedContentWithAffectedItems) {
                var affectedItems = DsrClientError.getAffectedItemsFromStatusCode(code, additionalMessages);
                if (affectedItems.length > 0) return StringExtensions.format(resourceProvider.get(errorTemplate.localizedContentWithAffectedItems), StringExtensions.constructCommaSeparatedList(affectedItems, resourceProvider, DsrClientError.maxNumberOfCommaValues));
            }
            if (errorTemplate.localizedContent) return resourceProvider.get(errorTemplate.localizedContent);
        }, DsrClientError.findAdditionalMessageWithAffectedItemsAndPosition = function(code, additionalMessages) {
            return _.find(additionalMessages, function(m) {
                return m.Code === code && !_.isEmpty(m.AffectedItems) && null != m.Position && null != m.Line;
            });
        }, DsrClientError.getAffectedItemsFromStatusCode = function(code, additionalMessages) {
            for (var _i = 0, additionalMessages_1 = additionalMessages; _i < additionalMessages_1.length; _i++) {
                var message = additionalMessages_1[_i];
                if (message.Code === code) return message.AffectedItems || [];
            }
            return [];
        }, DsrClientError.prototype.parseCode = function() {
            var code = this.oDataError.code, values = this.oDataError[powerbi.azureValues], additionalMessages = [];
            if (values) for (var _i = 0, values_4 = values; _i < values_4.length; _i++) {
                var value = values_4[_i];
                value.additionalMessages && (additionalMessages = value.additionalMessages);
            }
            if (additionalMessages.length > 0) for (var _a = 0, additionalMessages_2 = additionalMessages; _a < additionalMessages_2.length; _a++) {
                var message = additionalMessages_2[_a];
                if (DsrClientError.isCodeKnown(message.Code)) {
                    code = message.Code;
                    break;
                }
            }
            return code;
        }, DsrClientError.isCodeKnown = function(code) {
            switch (code) {
              case "ComplexSlicerNotAllowedWithMeasures":
              case "ComplexHighlightsNotAllowed":
              case "ErrorLoadingModel":
              case "ExclusivePercentileOutOfRange":
              case "InvalidDataShapeNoOutputData":
              case "InvalidFilterComparisonIncompatibleExpressions":
              case "InvalidFilterConditionIncompatibleDataType":
              case "InvalidUnconstrainedJoin":
              case "ModelUnavailable":
              case "OverlappingKeysOnOppositeHierarchies":
              case "rsQueryMemoryLimitExceeded":
              case "rsQueryTimeoutExceeded":
              case "CouldNotResolveModelReferencesInSemanticQuery":
              case "QueryExtensionMeasureUnexpectedEndOfUserInput":
              case "rsAccessDenied":
              case "NoUniqueKeyForDetailTable":
              case "IsRelatedToManyNotSupportedForDetailTable":
              case "ModelMeasuresNotSupportedForDetailTable":
              case "UnsupportedDateTimeLiteral":
              case "InvalidExtensionDax_UnclosedBracketIdentifier":
              case "InvalidExtensionDax_UnexpectedCloseParenthesis":
              case "ExtensionMeasureEmptyExpression":
              case "ExtensionMeasureNameNotUniqueModel":
              case "ExtensionMeasureNameNotUnique":
              case "CouldNotResolveModelReferencesInQueryExtensionSchema":
              case "QueryExtensionMeasureError":
                return !0;

              default:
                return !1;
            }
        }, DsrClientError;
    }();
    powerbi.DsrClientError = DsrClientError;
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data_9) {
        var bingSocial;
        !function(bingSocial) {
            var BingSocialClient = function() {
                function BingSocialClient(httpService) {
                    this.httpService = httpService;
                }
                return BingSocialClient.prototype.requestData = function(deferred, searchKey, tileRequestData) {
                    var promises = [], urlTemplates = tileRequestData.getUrlTemplates(), responseFormatter = tileRequestData.getResponseFormatter();
                    searchKey = this.formatSearchKey(searchKey);
                    for (var _i = 0, urlTemplates_1 = urlTemplates; _i < urlTemplates_1.length; _i++) {
                        var urlTemplate = urlTemplates_1[_i], promise = $.Deferred();
                        promises.push(promise), urlTemplate = urlTemplate.replace(/{{searchKey}}/g, encodeURIComponent(searchKey)), 
                        this.makeRequest(urlTemplate, promise);
                    }
                    $.when.apply($, promises).then.call(this, function() {
                        for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
                        var data = responseFormatter.formatResponse(Array.prototype.slice.call(args));
                        deferred.resolve(data);
                    }, deferred.reject);
                }, BingSocialClient.prototype.formatSearchKey = function(str) {
                    return str = str.trim().toUpperCase(), str = this.removeEdgeBinaryOperator(str, "AND"), 
                    str = this.removeEdgeBinaryOperator(str, "OR");
                }, BingSocialClient.prototype.removeEdgeBinaryOperator = function(str, op) {
                    return _.startsWith(str, op + " ") && (str = op.toLowerCase() + str.slice(op.length)), 
                    _.endsWith(str, " " + op) && (str = str.slice(0, str.length - op.length) + op.toLowerCase()), 
                    str;
                }, BingSocialClient.prototype.makeRequest = function(url, promise) {
                    var requestOptions = this.httpService.powerbiRequestOptions();
                    requestOptions.responseType = "json", this.httpService.get(url, requestOptions).then(function(response) {
                        var data = response.data;
                        if ("string" == typeof data) try {
                            data = JSON.parse(data);
                        } catch (e) {
                            return promise.reject();
                        }
                        promise.resolve(data);
                    }, promise.reject);
                }, BingSocialClient;
            }();
            bingSocial.BingSocialClient = BingSocialClient;
        }(bingSocial = data_9.bingSocial || (data_9.bingSocial = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var dsr;
        !function(dsr) {
            var StringExtensions = jsCommon.StringExtensions, LimitMetadata = function() {
                function LimitMetadata() {}
                return LimitMetadata;
            }();
            dsr.LimitMetadata = LimitMetadata;
            var DsrLimitsWarning = function() {
                function DsrLimitsWarning(queryBindingDescriptor, exceededLimits, dataShape) {
                    this.computeMetadata(queryBindingDescriptor, dataShape, exceededLimits);
                }
                return Object.defineProperty(DsrLimitsWarning.prototype, "code", {
                    get: function() {
                        return "DsrLimitsWarning";
                    },
                    enumerable: !0,
                    configurable: !0
                }), DsrLimitsWarning.prototype.computeMetadata = function(queryBindingDescriptor, dataShape, exceededLimits) {
                    if (this.limits = {}, queryBindingDescriptor.Limits) {
                        var exceededLimitsDetails = DsrLimitsWarning.getExceededLimitsDetails(queryBindingDescriptor, exceededLimits), dsLimits = queryBindingDescriptor.Limits, primaryExceeded = !!exceededLimitsDetails.Primary, secondaryExceeded = !!exceededLimitsDetails.Secondary, intersectionExceeded = !!exceededLimitsDetails.Intersection, calculations = dataShape.Calculations;
                        if (queryBindingDescriptor.ScriptVisualBinding) return void (this.hasScriptVisualBinding = !0);
                        var primaryGroupings = queryBindingDescriptor.Expressions && queryBindingDescriptor.Expressions.Primary && queryBindingDescriptor.Expressions.Primary.Groupings ? queryBindingDescriptor.Expressions.Primary.Groupings : [], secondaryGroupings = queryBindingDescriptor.Expressions && queryBindingDescriptor.Expressions.Secondary && queryBindingDescriptor.Expressions.Secondary.Groupings ? queryBindingDescriptor.Expressions.Secondary.Groupings : [];
                        primaryExceeded && secondaryExceeded ? (this.groupings = primaryGroupings.concat(secondaryGroupings), 
                        this.limits.Primary = DsrLimitsWarning.getLimitMetadata(dsLimits.Primary, calculations), 
                        this.limits.Secondary = DsrLimitsWarning.getLimitMetadata(dsLimits.Secondary, calculations)) : primaryExceeded ? (this.groupings = primaryGroupings, 
                        this.limits.Primary = DsrLimitsWarning.getLimitMetadata(dsLimits.Primary, calculations)) : secondaryExceeded && (this.groupings = secondaryGroupings, 
                        this.limits.Secondary = DsrLimitsWarning.getLimitMetadata(dsLimits.Secondary, calculations)), 
                        intersectionExceeded && (this.limits.Intersection = DsrLimitsWarning.getLimitMetadata(dsLimits.Intersection, calculations));
                    }
                }, DsrLimitsWarning.prototype.getDetails = function(resourceProvider) {
                    var primaryExceeded = !!this.limits.Primary, secondaryExceeded = !!this.limits.Secondary, errorInfoValue = null, limitType = -1;
                    this.hasScriptVisualBinding ? errorInfoValue = resourceProvider.get("DsrLimitWarning_TooMuchDataValMultipleColumns") : primaryExceeded || secondaryExceeded ? primaryExceeded && secondaryExceeded ? (limitType = this.limits.Primary.Type, 
                    errorInfoValue = this.getErrorInfoValue(this.groupings, resourceProvider.get("DsrLimitsWarning_MultipleColumnsWithIssuesFormat"), resourceProvider)) : primaryExceeded ? (limitType = this.limits.Primary.Type, 
                    errorInfoValue = this.getErrorInfoValue(this.groupings, DsrLimitsWarning.getDetailedMessageFormatForOneColumn(limitType, resourceProvider), resourceProvider)) : (limitType = this.limits.Secondary.Type, 
                    errorInfoValue = this.getErrorInfoValue(this.groupings, DsrLimitsWarning.getDetailedMessageFormatForOneColumn(limitType, resourceProvider), resourceProvider)) : this.limits.Intersection && (limitType = this.limits.Intersection.Type, 
                    errorInfoValue = DsrLimitsWarning.getDetailedMessageFormatForOneColumn(limitType, resourceProvider)), 
                    errorInfoValue || (errorInfoValue = resourceProvider.get("DsrLimitWarning_TooMuchDataValMultipleColumns"));
                    var message = DsrLimitsWarning.getMessage(limitType, resourceProvider), key = DsrLimitsWarning.getKey(limitType, resourceProvider), helpLink = DsrLimitsWarning.getHelpLink(limitType, resourceProvider), details = {
                        message: message,
                        displayableErrorInfo: [ {
                            errorInfoKey: key,
                            errorInfoValue: errorInfoValue
                        } ],
                        helpLink: helpLink
                    };
                    return details;
                }, DsrLimitsWarning.getExceededLimitsDetails = function(queryBindingDescriptor, exceededLimits) {
                    for (var limits = queryBindingDescriptor.Limits, limitsDetails = {}, _i = 0, exceededLimits_1 = exceededLimits; _i < exceededLimits_1.length; _i++) {
                        var limit = exceededLimits_1[_i];
                        limits.Primary && limit.Id === limits.Primary.Id ? limitsDetails.Primary = limits.Primary : limits.Secondary && limit.Id === limits.Secondary.Id ? limitsDetails.Secondary = limits.Secondary : limits.Intersection && limit.Id === limits.Intersection.Id && (limitsDetails.Intersection = limits.Intersection);
                    }
                    return limitsDetails;
                }, DsrLimitsWarning.prototype.getErrorInfoValue = function(groupings, messageFormatString, resourceProvider) {
                    if (!groupings || 0 === groupings.length) return null;
                    for (var groupingNames = [], i = 0, iLen = groupings.length; i < iLen; i++) {
                        var grouping = groupings[i], groupingName = this.getGroupingNameFromGroupingKeys(grouping);
                        groupingName && groupingNames.push(groupingName);
                    }
                    var finalGroupingName, nameCount = groupingNames.length;
                    return 0 === nameCount ? null : (finalGroupingName = 1 === nameCount ? groupingNames[0] : groupingNames.join(resourceProvider.get("ListJoin_Separator")), 
                    StringExtensions.format(messageFormatString, finalGroupingName));
                }, DsrLimitsWarning.prototype.getGroupingNameFromGroupingKeys = function(grouping) {
                    for (var keys = grouping.Keys, i = 0, iLen = keys.length; i < iLen; i++) {
                        var currentKey = keys[i];
                        if (null !== currentKey.Select && void 0 !== currentKey.Select) {
                            if (!this.columnNameFromIndex) return;
                            return this.columnNameFromIndex(currentKey.Select);
                        }
                    }
                }, DsrLimitsWarning.getMessage = function(type, resourceProvider) {
                    switch (type) {
                      case 2:
                        return resourceProvider.get("DsrLimitWarning_RepresentativeSampleMessage");

                      case 3:
                      case 4:
                        return resourceProvider.get("DsrLimitWarning_HighDensitySampleMessage");

                      default:
                        return resourceProvider.get("DsrLimitWarning_TooMuchDataMessage");
                    }
                }, DsrLimitsWarning.getKey = function(type, resourceProvider) {
                    switch (type) {
                      case 2:
                        return resourceProvider.get("DsrLimitWarning_RepresentativeSampleKey");

                      case 3:
                      case 4:
                        return resourceProvider.get("DsrLimitWarning_HighDensitySampleKey");

                      default:
                        return resourceProvider.get("DsrLimitWarning_TooMuchDataKey");
                    }
                }, DsrLimitsWarning.getDetailedMessageFormatForOneColumn = function(type, resourceProvider) {
                    switch (type) {
                      case 2:
                        return resourceProvider.get("DsrLimitWarning_RepresentativeSampleVal");

                      case 3:
                        return resourceProvider.get("DsrLimitWarning_HighDensitySampleVal");

                      case 4:
                        return resourceProvider.get("DsrLimitWarning_OverlappingPointsDetails");

                      default:
                        return resourceProvider.get("DsrLimitWarning_TooMuchDataVal");
                    }
                }, DsrLimitsWarning.getHelpLink = function(type, resourceProvider) {
                    switch (type) {
                      case 3:
                        return "https://go.microsoft.com/fwlink/?linkid=848757";

                      case 4:
                        return "https://go.microsoft.com/fwlink/?linkid=853820";
                    }
                }, DsrLimitsWarning.getLimitMetadata = function(limitDescriptor, calcs) {
                    return limitDescriptor.Top ? {
                        Type: 0,
                        Count: DsrLimitsWarning.getLimitCount(limitDescriptor.Top, calcs)
                    } : limitDescriptor.Bottom ? {
                        Type: 1,
                        Count: DsrLimitsWarning.getLimitCount(limitDescriptor.Bottom, calcs)
                    } : limitDescriptor.Sample ? {
                        Type: 2,
                        Count: DsrLimitsWarning.getLimitCount(limitDescriptor.Sample, calcs)
                    } : limitDescriptor.BinnedLineSample ? {
                        Type: 3,
                        Count: DsrLimitsWarning.getBinnedLineSampleCount(limitDescriptor.BinnedLineSample)
                    } : limitDescriptor.OverlappingPointsSample ? {
                        Type: 4,
                        Count: DsrLimitsWarning.getLimitCount(limitDescriptor.OverlappingPointsSample, calcs)
                    } : {
                        Type: -1,
                        Count: null
                    };
                }, DsrLimitsWarning.getLimitCount = function(limit, calcs) {
                    if (limit.Calc && calcs) {
                        var calc = dsr.DataShapeUtility.findCalculation(calcs, limit.Calc);
                        if (calc) {
                            var value = data.PrimitiveValueEncoding.parseValue(calc.Value);
                            if (_.isNumber(value)) return value;
                        }
                    }
                    return limit.Count;
                }, DsrLimitsWarning.getBinnedLineSampleCount = function(limit) {
                    return limit.MaxTargetPointCount;
                }, DsrLimitsWarning;
            }();
            dsr.DsrLimitsWarning = DsrLimitsWarning;
        }(dsr = data.dsr || (data.dsr = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var dsr;
        !function(dsr) {
            function getDsrMessageSeverityValue(dsrMessageSeverity) {
                switch (dsrMessageSeverity) {
                  case 0:
                    return warningSeverityValue;
                }
            }
            var warningSeverityValue = "Warning";
            dsr.getDsrMessageSeverityValue = getDsrMessageSeverityValue, dsr.KnownDsrMessages = {
                "ForecastErrorType.DataIsTooSmall": {
                    localizedMessage: "DsrMessage_NotEnoughDataMessage",
                    localizedTitle: "DsrMessage_NotEnoughDataTitle",
                    localizedContent: "DsrMessage_NotEnoughDataContent",
                    isTransformMessage: !0
                },
                "ForecastErrorType.TooManyMissingValues": {
                    localizedMessage: "DsrMessage_DataIsTooRandomOrMissingValuesMessage",
                    localizedTitle: "DsrMessage_DataIsTooRandomOrMissingValuesTitle",
                    localizedContent: "DsrMessage_DataIsTooRandomOrMissingValuesContent",
                    isTransformMessage: !0
                },
                "ForecastErrorType.NoDominantStepDetected": {
                    localizedMessage: "DsrMessage_DataIsTooRandomOrMissingValuesMessage",
                    localizedTitle: "DsrMessage_DataIsTooRandomOrMissingValuesTitle",
                    localizedContent: "DsrMessage_DataIsTooRandomOrMissingValuesContent",
                    isTransformMessage: !0
                },
                "ForecastErrorType.InputTimeStampsNotSorted": {
                    localizedMessage: "DsrMessage_UnsortedDataMessage",
                    localizedTitle: "DsrMessage_UnsortedDataTitle",
                    localizedContent: "DsrMessage_UnsortedDataContent",
                    isTransformMessage: !0
                },
                "ForecastErrorType.XAxisIsNull": {
                    localizedMessage: "DsrMessage_ForecastXValueNullMessage",
                    localizedTitle: "DsrMessage_ForecastXValueNullTitle",
                    localizedContent: "DsrMessage_ForecastXValueNullContent",
                    isTransformMessage: !0
                },
                "ForecastErrorType.InvalidSeasonality": {
                    localizedMessage: "DsrMessage_ForecastInvalidSeasonalityMessage",
                    localizedTitle: "DsrMessage_ForecastInvalidSeasonalityTitle",
                    localizedContent: "DsrMessage_ForecastInvalidSeasonalityContent",
                    isTransformMessage: !0
                },
                "ForecastErrorType.InvalidDataType": {
                    localizedMessage: "DsrMessage_ForecastVariantDataTypeMessage",
                    localizedTitle: "DsrMessage_ForecastVariantDataTypeTitle",
                    localizedContent: "DsrMessage_ForecastVariantDataTypeContent",
                    isTransformMessage: !0
                },
                "ForecastErrorType.Unexpected": {
                    localizedMessage: "DsrMessage_ForecastErrorMessage",
                    localizedTitle: "DsrMessage_ForecastErrorTitle",
                    localizedContent: "DsrMessage_ForecastErrorContent",
                    isTransformMessage: !0
                },
                ForecastTransformUnsupported: {
                    localizedMessage: "DsrMessage_ForecastNotSupportedMessage",
                    localizedTitle: "DsrMessage_ForecastNotSupportedTitle",
                    localizedContent: "DsrMessage_ForecastNotSupportedContent",
                    isTransformMessage: !0
                },
                "ClusteringErrorType.LessThanKDataPoints": {
                    localizedMessage: "DsrMessage_ClusterTooManyClustersTitle",
                    localizedTitle: "DsrMessage_ClusterTooManyClustersTitle",
                    localizedContent: "DsrMessage_ClusterTooManyClustersContent",
                    isTransformMessage: !0
                },
                "ClusteringErrorType.TooManyDataPoints": {
                    localizedMessage: "DsrMessage_ClusterExceedsLimitTitle",
                    localizedTitle: "DsrMessage_ClusterExceedsLimitTitle",
                    localizedContent: "DsrMessage_ClusterExceedsLimitContent",
                    isTransformMessage: !0
                },
                "ClusteringErrorType.InvalidDataType": {
                    localizedMessage: "DsrMessage_ClusterVariantDataTypeTitle",
                    localizedTitle: "DsrMessage_ClusterVariantDataTypeTitle",
                    localizedContent: "DsrMessage_ClusterVariantDataTypeContent",
                    isTransformMessage: !0
                }
            };
            var DsrMessage = function() {
                function DsrMessage(dataShapeMessage) {
                    this.dataShapeMessage = dataShapeMessage;
                }
                return Object.defineProperty(DsrMessage.prototype, "code", {
                    get: function() {
                        return this.dataShapeMessage.Code;
                    },
                    enumerable: !0,
                    configurable: !0
                }), DsrMessage.prototype.getDetails = function(resourceProvider) {
                    var messageTemplate = dsr.KnownDsrMessages[this.dataShapeMessage.Code];
                    return {
                        message: resourceProvider.get(messageTemplate.localizedMessage),
                        displayableErrorInfo: [ {
                            errorInfoKey: resourceProvider.get(messageTemplate.localizedTitle),
                            errorInfoValue: resourceProvider.get(messageTemplate.localizedContent)
                        } ]
                    };
                }, DsrMessage.prototype.isTransformMessage = function() {
                    var messageTemplate = dsr.KnownDsrMessages[this.code];
                    return messageTemplate && messageTemplate.isTransformMessage;
                }, DsrMessage;
            }();
            dsr.DsrMessage = DsrMessage;
        }(dsr = data.dsr || (data.dsr = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var dsr;
        !function(dsr_1) {
            function isDsrV2(dsr) {
                if (2 === dsr.Version) return !0;
            }
            function read(targets, arg, enableCellLevelFormatting, perfId) {
                if (!arg) return null;
                arg.data && (arg = arg.data);
                var dataObj = arg;
                return _.isString(dataObj) && (dataObj = JSON.parse(dataObj)), readDsr(targets, dataObj.descriptor, dataObj.dsr, enableCellLevelFormatting, dataObj.requestId, dataObj.clientSideFilters, perfId);
            }
            function readDsr(targets, descriptor, dsr, enableCellLevelFormatting, requestId, clientSideFilters, perfId) {
                if (!dsr) return null;
                if (isDsrV2(dsr)) {
                    var dsrParser = dsr_1.reader.V2.createDsrParser(dsr);
                    return generateDataView(targets, descriptor, dsrParser);
                }
                return dsr_1.reader.V1.read(targets, descriptor, dsr, enableCellLevelFormatting, requestId, clientSideFilters, perfId);
            }
            function containsRestartToken(dataViewSource) {
                if (!dataViewSource) return !1;
                var dataObj = dataViewSource.data;
                if (_.isString(dataObj) && (dataObj = JsonExtensions.tryParseJSON(dataObj)), _.isEmpty(dataObj)) return !1;
                var dsr = dataObj.dsr;
                if (dsr) if (isDsrV2(dsr)) ; else for (var dataShapes = dsr.DataShapes, _i = 0, dataShapes_1 = dataShapes; _i < dataShapes_1.length; _i++) {
                    var dataShape = dataShapes_1[_i];
                    if (!_.isEmpty(dataShape.RestartTokens)) return !0;
                }
                return !1;
            }
            function generateDataView(targets, descriptor, dsrParser) {
                var dsrConverterContext = new dsr_1.DataViewConverterContext(targets, descriptor), metadata = dsrConverterContext.createDataViewMetadata(), dataReaderResult = {
                    dataView: {
                        metadata: metadata
                    }
                };
                return EnumExtensions.hasFlag(targets, 1) && (dataReaderResult.dataView.categorical = dsr_1.converters.categorical(dsrConverterContext, dsrParser)), 
                dataReaderResult;
            }
            var JsonExtensions = jsCommon.JsonExtensions, EnumExtensions = jsCommon.EnumExtensions;
            dsr_1.isDsrV2 = isDsrV2, dsr_1.read = read, dsr_1.readDsr = readDsr, dsr_1.containsRestartToken = containsRestartToken;
        }(dsr = data.dsr || (data.dsr = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var dsr;
        !function(dsr) {
            var EnumExtensions = jsCommon.EnumExtensions, DataViewConverterContext = function() {
                function DataViewConverterContext(targets, descriptor) {
                    this.targets = targets, this.descriptor = descriptor, this.selects = descriptor.Select, 
                    this.selectIndexToColumn = {};
                    var expressions = descriptor.Expressions;
                    if (this.primaryAxisGroupings = expressions && expressions.Primary && expressions.Primary.Groupings, 
                    this.secondaryAxisGroupings = expressions && expressions.Secondary && expressions.Secondary.Groupings, 
                    this.dataMemberIdToMetadata = {}, this.primaryAxisGroupings) for (var _i = 0, _a = this.primaryAxisGroupings; _i < _a.length; _i++) {
                        var grouping = _a[_i];
                        this.cacheGroupingIdentityExprs(grouping);
                    }
                    if (this.secondaryAxisGroupings) for (var _b = 0, _c = this.secondaryAxisGroupings; _b < _c.length; _b++) {
                        var grouping = _c[_b];
                        this.cacheGroupingIdentityExprs(grouping);
                    }
                }
                return DataViewConverterContext.prototype.includes = function(kind) {
                    return EnumExtensions.hasFlag(this.targets, kind);
                }, DataViewConverterContext.prototype.createDataViewMetadata = function() {
                    var selects = this.selects;
                    if (!_.isEmpty(selects)) {
                        for (var metadata = {
                            columns: []
                        }, i = 0, len = selects.length; i < len; i++) if (selects[i]) {
                            var column = this.createColumns(metadata.columns, i);
                            this.selectIndexToColumn[i] = column;
                        }
                        return metadata;
                    }
                }, DataViewConverterContext.prototype.createIdentityExprs = function(keys) {
                    for (var len = keys.length, exprs = new Array(len), i = 0; i < len; i++) exprs[i] = this.convertKey(keys[i]);
                    return exprs;
                }, DataViewConverterContext.prototype.createColumns = function(columns, selectIndex) {
                    var columnMetadata = this.createMetadataColumn(selectIndex);
                    columns.push(columnMetadata);
                    var dynamicFormatColumnMetadata = this.tryCreateDynamicFormatColumnMetadata(selectIndex, columnMetadata);
                    return dynamicFormatColumnMetadata && columns.push(dynamicFormatColumnMetadata), 
                    columnMetadata;
                }, DataViewConverterContext.prototype.createMetadataColumn = function(selectIndex) {
                    var select = this.selects[selectIndex], column = {
                        displayName: "",
                        index: selectIndex
                    };
                    select.Format && (column.format = select.Format), column.type = dsr.DataShapeUtility.describeDataType(select.Type, select.DataCategory), 
                    select.Kind === dsr.SelectKind.Measure && (column.isMeasure = !0);
                    var groupKeys = select.GroupKeys;
                    if (groupKeys) for (var len = groupKeys.length, identityExprs = column.identityExprs = new Array(len), i = 0; i < len; i++) identityExprs[i] = this.convertKey(groupKeys[i]);
                    return column;
                }, DataViewConverterContext.prototype.tryCreateDynamicFormatColumnMetadata = function(selectIndex, columnMetadata) {
                    var select = this.selects[selectIndex];
                    if (select.DynamicFormat) {
                        var column = {
                            displayName: "",
                            isMeasure: !0
                        };
                        return columnMetadata.formatSource = {
                            formatString: column
                        }, column;
                    }
                }, DataViewConverterContext.prototype.convertKey = function(key) {
                    var source = key.Source;
                    return data.SQExprBuilder.columnRef(data.SQExprBuilder.entity(dsr.schemaName(source), source.Entity || source.EntitySet), source.Property);
                }, DataViewConverterContext.prototype.cacheGroupingIdentityExprs = function(grouping) {
                    var identityExprs = this.createIdentityExprs(grouping.Keys);
                    grouping.Member && (this.dataMemberIdToMetadata[grouping.Member] = {
                        identityExprs: identityExprs,
                        axisGrouping: grouping
                    }), grouping.SubtotalMember && (this.dataMemberIdToMetadata[grouping.SubtotalMember] = {
                        identityExprs: identityExprs,
                        axisGrouping: grouping
                    });
                }, DataViewConverterContext;
            }();
            dsr.DataViewConverterContext = DataViewConverterContext;
        }(dsr = data.dsr || (data.dsr = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var dsr;
        !function(dsr) {
            var converters;
            !function(converters) {
                function categorical(context, dsrParser) {
                    return new DsrToCategoricalConverter(context, dsrParser).run();
                }
                function getDataMemberType(id, groupings, scope) {
                    return _.find(groupings, function(grouping) {
                        return grouping.Member === id;
                    }) ? 1 : _.find(groupings, function(grouping) {
                        return grouping.SubtotalMember === id;
                    }) ? 2 : 0;
                }
                converters.categorical = categorical;
                var DsrToCategoricalConverter = function() {
                    function DsrToCategoricalConverter(context, dsrParser) {
                        this.context = context, this.dsrParser = dsrParser, this.selectValueToSelectIndex = {}, 
                        this.selectIndexToCategoryColumn = {}, this.selectIndexToValueColumn = {};
                    }
                    return DsrToCategoricalConverter.prototype.run = function() {
                        var context = this.context, primaryAxisGroupingsCount = _.size(context.primaryAxisGroupings), secondaryAxisGroupingsCount = _.size(context.secondaryAxisGroupings);
                        if (!(primaryAxisGroupingsCount > 1 || secondaryAxisGroupingsCount > 1 || 0 === _.size(context.selects))) {
                            var dataShapesParser = this.dsrParser.dataShapes();
                            dataShapesParser.next();
                            var categories = [], valueColumns = [], identities = [];
                            this.createCategoryAndValueColumns(categories, valueColumns, identities), this.readSeries();
                            var grouped = [], groups = [];
                            return this.readCategoryAndValues(dataShapesParser, groups, valueColumns, identities), 
                            grouped.grouped = function() {
                                return groups;
                            }, {
                                categories: categories,
                                values: grouped
                            };
                        }
                    }, DsrToCategoricalConverter.prototype.createCategoryAndValueColumns = function(categories, valueColumns, identities) {
                        for (var context = this.context, selectIndexToColumn = context.selectIndexToColumn, selects = context.selects, selectsLength = selects.length, i = 0; i < selectsLength; i++) {
                            var select = selects[i];
                            if (select) {
                                this.selectValueToSelectIndex[select.Value] = i;
                                var selectKind = select.Kind;
                                if (selectKind === dsr.SelectKind.Group && null != select.Depth) {
                                    var category = {
                                        source: selectIndexToColumn[i],
                                        values: [],
                                        identity: identities
                                    };
                                    categories.push(category), this.selectIndexToCategoryColumn[i] = category;
                                } else if (selectKind === dsr.SelectKind.Measure) {
                                    var valueColumn = {
                                        source: selectIndexToColumn[i],
                                        values: []
                                    };
                                    valueColumns.push(valueColumn), this.selectIndexToValueColumn[i] = valueColumn;
                                }
                            }
                        }
                    }, DsrToCategoricalConverter.prototype.readSeries = function() {}, DsrToCategoricalConverter.prototype.readCategoryAndValues = function(dataShapesParser, groups, valueColumns, identities) {
                        for (var context = this.context, selects = context.selects, primaryHierarchyDataMemberParser = dataShapesParser.primaryHierarchy(), groupingValues = new Array(_.size(this.selectIndexToCategoryColumn)); primaryHierarchyDataMemberParser.next(); ) {
                            var dataMemberId = primaryHierarchyDataMemberParser.id(), dataMemberType = getDataMemberType(dataMemberId, context.primaryAxisGroupings, 0);
                            if (2 !== dataMemberType) {
                                var groupingCalcIdToArrayIndex = void 0;
                                1 === dataMemberType && (groupingCalcIdToArrayIndex = {}, this.readGroupingExprs(dataMemberId, groupingCalcIdToArrayIndex));
                                for (var groupingIdentityExprs = context.dataMemberIdToMetadata[dataMemberId].identityExprs, lastMergeIndex = void 0, instancesParser = primaryHierarchyDataMemberParser.instances(); instancesParser.next(); ) {
                                    for (1 === instancesParser.restartFlagKind() && (lastMergeIndex = instancesParser.currentIndex()); instancesParser.nextCalc(); ) {
                                        var calcId = instancesParser.calcId(), selectIndexForCalculation = this.selectValueToSelectIndex[calcId];
                                        if (null != selectIndexForCalculation) {
                                            var value = instancesParser.calcValue();
                                            selects[selectIndexForCalculation].Kind === dsr.SelectKind.Group ? (this.selectIndexToCategoryColumn[selectIndexForCalculation].values.push(value), 
                                            groupingValues[groupingCalcIdToArrayIndex[calcId]] = instancesParser.calcValueAsExpr()) : selects[selectIndexForCalculation].Kind === dsr.SelectKind.Measure && this.selectIndexToValueColumn[selectIndexForCalculation].values.push(value);
                                        }
                                    }
                                    if (groupingIdentityExprs) {
                                        for (var identity = void 0, i = 0; i < groupingIdentityExprs.length; i++) identity = data.SQExprBuilder.and(identity, data.SQExprBuilder.equal(groupingIdentityExprs[i], groupingValues[i]));
                                        identities.push(data.createDataViewScopeIdentity(identity));
                                    }
                                }
                            }
                        }
                        _.isEmpty(groups) && groups.push({
                            values: valueColumns
                        });
                    }, DsrToCategoricalConverter.prototype.readGroupingExprs = function(dataMemberId, groupingCalcIdToArrayIndex) {
                        for (var context = this.context, selects = context.selects, dataMemberMetadata = context.dataMemberIdToMetadata[dataMemberId], grouping = dataMemberMetadata.axisGrouping, groupingKeysLen = grouping.Keys.length, i = 0; i < groupingKeysLen; i++) {
                            var key = grouping.Keys[i];
                            groupingCalcIdToArrayIndex[key.Calc || selects[key.Select].Value] = i;
                            var categoryColumn = this.selectIndexToCategoryColumn[key.Select];
                            categoryColumn && !categoryColumn.identityFields && (categoryColumn.identityFields = dataMemberMetadata.identityExprs);
                        }
                    }, DsrToCategoricalConverter;
                }();
                converters.getDataMemberType = getDataMemberType;
            }(converters = dsr.converters || (dsr.converters = {}));
        }(dsr = data.dsr || (data.dsr = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var dsr;
        !function(dsr_2) {
            var reader;
            !function(reader) {
                var V1;
                !function(V1) {
                    function read(targets, descriptor, dsr, enableCellLevelFormatting, requestId, clientSideFilters, perfId) {
                        if (!isValidDsr(dsr)) return null;
                        var dataShape = dsr.DataShapes[0], oDataError = dataShape["odata.error"];
                        if (oDataError) {
                            var clientError = new powerbi.DsrClientError(dataShape["odata.error"]);
                            requestId && (clientError.requestId = requestId);
                            var result = {
                                error: clientError
                            };
                            return result;
                        }
                        var context = new DsrReaderContext(targets, descriptor, perfId, new DsrAggregateReader(descriptor, dataShape), enableCellLevelFormatting), dataView = loadStrategy(context).read(descriptor.Expressions, dataShape), dsrReaderResult = {
                            dataView: dataView
                        };
                        if (dataShape.RestartTokens && (dsrReaderResult.restartToken = dataShape.RestartTokens), 
                        dataShape.DataLimitsExceeded && dataShape.DataLimitsExceeded.length > 0) {
                            dsrReaderResult.warnings || (dsrReaderResult.warnings = []);
                            var limitsWarning = new dsr_2.DsrLimitsWarning(descriptor, dataShape.DataLimitsExceeded, dataShape);
                            dsrReaderResult.warnings.push(limitsWarning), applyReductionMetadata(dataView, limitsWarning.limits);
                        }
                        if (dataShape.DataShapeMessages && dataShape.DataShapeMessages.length > 0) for (var _i = 0, _a = dataShape.DataShapeMessages; _i < _a.length; _i++) {
                            var dataShapeMessage = _a[_i];
                            dsr_2.KnownDsrMessages[dataShapeMessage.Code] && dataShapeMessage.Severity === data.dsr.getDsrMessageSeverityValue(0) && (dsrReaderResult.warnings || (dsrReaderResult.warnings = []), 
                            dsrReaderResult.warnings.push(new dsr_2.DsrMessage(dataShapeMessage)));
                        }
                        return dsrReaderResult.dataView && !_.isEmpty(clientSideFilters) && (data.ClientSideFilter.applyClientSideFilters(dsrReaderResult.dataView, clientSideFilters), 
                        dsrReaderResult.disallowPersisting = !0), dsrReaderResult;
                    }
                    function applyReductionMetadata(dataView, limits) {
                        if (dataView.metadata.dataReduction = {}, dataView.categorical) {
                            var reductionMetadata = dataView.metadata.dataReduction.categorical = {};
                            limits.Primary && (reductionMetadata.categories = getReductionAlgorithmMetadata(limits.Primary)), 
                            limits.Secondary && (reductionMetadata.values = getReductionAlgorithmMetadata(limits.Secondary)), 
                            limits.Intersection && (reductionMetadata.metadata = getReductionAlgorithmMetadata(limits.Intersection));
                        }
                        if (dataView.matrix) {
                            var reductionMetadata = dataView.metadata.dataReduction.matrix = {};
                            limits.Primary && (reductionMetadata.rows = getReductionAlgorithmMetadata(limits.Primary));
                        }
                    }
                    function getReductionAlgorithmMetadata(limit) {
                        switch (limit.Type) {
                          case 3:
                            return {
                                binnedLineSample: {}
                            };

                          case 4:
                            return {
                                overlappingPointsSample: {}
                            };

                          default:
                            return {};
                        }
                    }
                    function loadStrategy(context) {
                        if (null != context.scriptVisualBinding) return new DsrToScriptResultStrategy(context);
                        for (var primaryDepth = 0, secondaryDepth = 0, selects = context.selects, i = 0, len = selects.length; i < len; i++) {
                            var select = selects[i];
                            select && (null != select.Depth && (primaryDepth = Math.max(primaryDepth, select.Depth + 1)), 
                            null != select.SecondaryDepth && (secondaryDepth = Math.max(secondaryDepth, select.SecondaryDepth + 1)));
                        }
                        return secondaryDepth >= 1 && 1 === primaryDepth ? new DsrWithPivotedColumnsStrategy(context) : new DsrToTreeStrategy(context);
                    }
                    function ensureTreeNodeValues(node, ordinal) {
                        var values = node.values;
                        values || (values = node.values = {});
                        var value = values[ordinal];
                        return value || (value = values[ordinal] = {}), value;
                    }
                    function isValidDsr(dsr) {
                        return dsr && 1 === _.size(dsr.DataShapes);
                    }
                    var EnumExtensions = jsCommon.EnumExtensions, PerfTimer = jsCommon.PerfTimer;
                    V1.read = read;
                    var DsrToMatrixParser;
                    !function(DsrToMatrixParser) {
                        function parse(context, dataShapeExprs, dataShape, metadata) {
                            var timer = PerfTimer.start("DSR.matrix(" + context.perfId + ")"), primaryLevelSources = [], secondaryLevelSources = [], measures = [];
                            processMetadata(context, primaryLevelSources, secondaryLevelSources, measures, metadata.columns);
                            var intersectionToSecondaryAggIdx = [], secondaryRoot = parseSecondaryTree(context, secondaryLevelSources, measures.length, dataShapeExprs, dataShape, intersectionToSecondaryAggIdx), primaryRoot = parsePrimaryTree(context, primaryLevelSources, dataShapeExprs, dataShape, intersectionToSecondaryAggIdx), rows = {
                                root: primaryRoot,
                                levels: primaryLevelSources
                            }, columns = {
                                root: secondaryRoot,
                                levels: secondaryLevelSources
                            }, result = {
                                rows: rows,
                                columns: columns,
                                valueSources: measures
                            };
                            return timer(), result;
                        }
                        function createHierarchyLevel(metadataColumns) {
                            for (var levels = {
                                sources: []
                            }, i = 0, ilen = metadataColumns.length; i < ilen; i++) levels.sources.push(metadataColumns[i]);
                            return levels;
                        }
                        function getOrCreateColumnMetadata(context, metadataColumns, index) {
                            for (var i = 0, ilen = metadataColumns.length; i < ilen; i++) {
                                var metadataColumn = metadataColumns[i];
                                if (metadataColumn && metadataColumn.index === index && void 0 === metadataColumn.groupName) return metadataColumn;
                            }
                            var newMetadataColumn = context.createColumns(metadataColumns, index);
                            return newMetadataColumn;
                        }
                        function processMetadata(context, primaryLevelSources, secondaryLevelSources, measures, metadataColumns) {
                            for (var selects = context.selects, selectIndex = 0, len = selects.length; selectIndex < len; selectIndex++) {
                                var select = selects[selectIndex];
                                if (select) {
                                    var metadataColumn = getOrCreateColumnMetadata(context, metadataColumns, selectIndex);
                                    if (select.Kind === dsr_2.SelectKind.Measure) measures.push(metadataColumn); else if (null != select.Depth) {
                                        var hierarchyLevel = primaryLevelSources[select.Depth];
                                        null != hierarchyLevel ? hierarchyLevel.sources.push(metadataColumn) : primaryLevelSources[select.Depth] = createHierarchyLevel([ metadataColumn ]);
                                    } else if (null != select.SecondaryDepth) {
                                        var secondaryHierarchyLevel = secondaryLevelSources[select.SecondaryDepth];
                                        null != secondaryHierarchyLevel ? secondaryHierarchyLevel.sources.push(metadataColumn) : secondaryLevelSources[select.SecondaryDepth] = createHierarchyLevel([ metadataColumn ]);
                                    }
                                    select.DynamicFormat && context.enableCellLevelFormatting && measures.push(metadataColumn.formatSource.formatString);
                                }
                            }
                            var measuresLength = measures.length;
                            (measuresLength > 1 || measuresLength > 0 && (0 === primaryLevelSources.length || 0 === secondaryLevelSources.length)) && secondaryLevelSources.push(createHierarchyLevel(measures));
                        }
                        function parsePrimaryTree(context, levelSources, dataShapeExprs, dataShape, intersectionToSecondaryAggIdx) {
                            if (dataShape.PrimaryHierarchy && 0 !== dataShape.PrimaryHierarchy.length) {
                                var primaryAxisGroupings;
                                dataShapeExprs && dataShapeExprs.Primary && (primaryAxisGroupings = dataShapeExprs.Primary.Groupings);
                                var maxPrimaryAggIdx = 0, maxSecondaryAggIdx = 0;
                                dataShapeExprs && (maxPrimaryAggIdx = getMaxAggIdx(dataShapeExprs.Primary), maxSecondaryAggIdx = getMaxAggIdx(dataShapeExprs.Secondary));
                                var measureSelects = _.filter(context.selects, function(s) {
                                    return s && s.Kind === dsr_2.SelectKind.Measure;
                                }), parsedNode = parseTree(context, levelSources, dataShape.PrimaryHierarchy, primaryAxisGroupings, function(ctx, memberType, instance, node, depth) {
                                    parseIntersections(memberType, measureSelects, instance, node, intersectionToSecondaryAggIdx, maxPrimaryAggIdx, maxSecondaryAggIdx, context.enableCellLevelFormatting), 
                                    ctx.stats.primary++;
                                });
                                return parsedNode;
                            }
                        }
                        function parseSecondaryTree(context, levelSources, measureCount, dataShapeExprs, dataShape, intersectionToSecondaryAggIdx) {
                            if (!dataShape.SecondaryHierarchy || 0 === dataShape.SecondaryHierarchy.length) {
                                var root = {};
                                return addMeasureHeaders(root, measureCount, 0, !1), root;
                            }
                            var secondaryAxisGroupings;
                            dataShapeExprs && dataShapeExprs.Secondary && (secondaryAxisGroupings = dataShapeExprs.Secondary.Groupings);
                            var parsedNode = parseTree(context, levelSources, dataShape.SecondaryHierarchy, secondaryAxisGroupings, function(ctx, memberType, instance, node, depth) {
                                if (depth < levelSources.length) if (node.isSubtotal) {
                                    var innermostLevelIndex = levelSources.length - 1, measureCount_1 = levelSources[innermostLevelIndex].sources.length;
                                    measureCount_1 > 1 && addMeasureHeaders(node, measureCount_1, innermostLevelIndex, !0);
                                } else {
                                    var level = levelSources[depth];
                                    addMeasureHeaders(node, level.sources.length, depth, !1);
                                }
                                intersectionToSecondaryAggIdx.push(getAggIdxForNode(node)), context.stats.secondary++;
                            });
                            return parsedNode;
                        }
                        function getAggIdxForNode(node) {
                            return node.isSubtotal ? node.level : node.level + 1;
                        }
                        function getMaxAggIdx(axis) {
                            return axis && axis.Groupings ? axis.Groupings.length : 0;
                        }
                        function computeAggIdx(primaryAggIdx, secondaryAggIdx, maxPrimaryAggIdx, maxSecondaryAggIdx) {
                            return primaryAggIdx + (maxSecondaryAggIdx - secondaryAggIdx) * (maxPrimaryAggIdx + 1);
                        }
                        function addMeasureHeaders(root, count, depth, isSubtotal) {
                            root.children = [];
                            for (var i = 0; i < count; i++) {
                                var child = {
                                    level: depth
                                };
                                i > 0 && (child.levelSourceIndex = i), root.children.push(child), isSubtotal && (child.isSubtotal = !0);
                            }
                        }
                        function parseTree(context, levelSources, rootMembers, axisGroupings, leafMemberCallback) {
                            var root = {};
                            return parseRecursive(context, levelSources, root, rootMembers, axisGroupings, 0, leafMemberCallback), 
                            root;
                        }
                        function parseRecursive(context, levelSources, node, members, axisGroupings, depth, leafMemberCallback) {
                            if (members) for (var selects = context.selects, selectIndexToLevelSourceIndexMapping = createSelectIndexToLevelSourceIndexMapping(levelSources, depth), i = 0, ilen = members.length; i < ilen; i++) for (var member = members[i], memberType = 0, j = 0, jlen = member.Instances.length; j < jlen; j++) {
                                var instance = member.Instances[j];
                                if (0 === memberType && (memberType = getMemberType(selects, axisGroupings, depth, member, instance), 
                                4 === memberType)) break;
                                var nestedNode = {
                                    level: depth
                                };
                                if (node.children || (node.children = []), node.children.push(nestedNode), 1 === memberType) {
                                    var levelValues = getGroupValues(selects, instance.Calculations, selectIndexToLevelSourceIndexMapping);
                                    if (!_.isEmpty(levelValues)) {
                                        nestedNode.levelValues = levelValues;
                                        var lastLevelValue = _.last(levelValues);
                                        nestedNode.value = lastLevelValue.value, lastLevelValue.levelSourceIndex > 0 && (nestedNode.levelSourceIndex = lastLevelValue.levelSourceIndex);
                                    }
                                } else 3 === memberType && (nestedNode.isSubtotal = !0);
                                instance.RestartFlag && 1 === instance.RestartFlag && (nestedNode.isMerge = !0), 
                                axisGroupings && 1 === memberType && (node.childIdentityFields = context.readKeys(axisGroupings, depth), 
                                nestedNode.identity = context.readIdentity(axisGroupings, instance, depth));
                                var nestedMembers = instance.Members;
                                nestedMembers && nestedMembers.length > 0 ? parseRecursive(context, levelSources, nestedNode, nestedMembers, axisGroupings, depth + 1, leafMemberCallback) : leafMemberCallback && leafMemberCallback(context, memberType, instance, nestedNode, depth + 1);
                            }
                        }
                        function createSelectIndexToLevelSourceIndexMapping(levelSources, depth) {
                            var selectIndexToLevelSourceIndexMapping = [], sourcesForCurrentDepth = levelSources && levelSources[depth] && levelSources[depth].sources;
                            if (!_.isEmpty(sourcesForCurrentDepth)) for (var i = 0, ilen = sourcesForCurrentDepth.length; i < ilen; i++) {
                                var sourceMetadataColumn = sourcesForCurrentDepth[i];
                                selectIndexToLevelSourceIndexMapping[sourceMetadataColumn.index] = i;
                            }
                            return selectIndexToLevelSourceIndexMapping;
                        }
                        function getGroupValues(selects, calculations, selectIndexToLevelSourceIndexMapping) {
                            for (var groupValues, i = 0, ilen = selects.length; i < ilen; i++) {
                                var select = selects[i];
                                if (select && select.Value && select.Kind === dsr_2.SelectKind.Group) {
                                    var value = dsr_2.DataShapeUtility.findAndParseCalculation(calculations, select.Value);
                                    void 0 !== value && (groupValues || (groupValues = []), groupValues.push({
                                        levelSourceIndex: selectIndexToLevelSourceIndexMapping[i],
                                        value: value
                                    }));
                                }
                            }
                            return groupValues;
                        }
                        function getMemberType(selects, axisGroupings, groupDepth, member, instance) {
                            if (axisGroupings && axisGroupings.length > groupDepth && null != member.Id) {
                                var grouping = axisGroupings[groupDepth];
                                if (member.Id === grouping.Member) return 1;
                                if (member.Id === grouping.SubtotalMember) return 3;
                            }
                            var calculations = instance.Calculations;
                            if (calculations) {
                                for (var measureFound = !1, i = 0, ilen = selects.length; i < ilen; i++) {
                                    var select = selects[i];
                                    if (select && dsr_2.DataShapeUtility.findCalculation(calculations, select.Value)) {
                                        if (select.Kind === dsr_2.SelectKind.Group) return 1;
                                        measureFound || select.Kind !== dsr_2.SelectKind.Measure || (measureFound = !0);
                                    }
                                }
                                if (measureFound) return 2;
                            }
                            return 4;
                        }
                        function readAndAddMeasureValues(rowMemberType, measureSelects, calculations, node, valueIndex, secondaryAggIdx, maxPrimaryAggIdx, maxSecondaryAggIdx, enableCellLevelFormatting) {
                            if (calculations) for (var measureIndex = {
                                index: 0
                            }, i = 0, ilen = measureSelects.length; i < ilen; i++) {
                                var select = measureSelects[i], highlight = select.Highlight, highlightId = highlight && highlight.Value, highlightDynamicFormatId = highlight && highlight.DynamicFormat && highlight.DynamicFormat.Format;
                                if (readAndAddSingleMeasureValue(rowMemberType, calculations, node, valueIndex, measureIndex, secondaryAggIdx, maxPrimaryAggIdx, maxSecondaryAggIdx, select, select.Value, highlightId, select.Subtotal), 
                                select.DynamicFormat && enableCellLevelFormatting) {
                                    var formatSourceSubtotals = _.map(select.SubtotalDynamicFormat, function(subtotalDynamicFormat) {
                                        return subtotalDynamicFormat && subtotalDynamicFormat.Format;
                                    });
                                    readAndAddSingleMeasureValue(rowMemberType, calculations, node, valueIndex, measureIndex, secondaryAggIdx, maxPrimaryAggIdx, maxSecondaryAggIdx, select, select.DynamicFormat.Format, highlightDynamicFormatId, formatSourceSubtotals);
                                }
                            }
                        }
                        function readAndAddSingleMeasureValue(rowMemberType, calculations, node, valueIndex, measureIndex, secondaryAggIdx, maxPrimaryAggIdx, maxSecondaryAggIdx, select, id, highlightId, formatSubtotals) {
                            var measureValue = ensureTreeNodeValues(node, valueIndex.index), value = null;
                            if (3 !== rowMemberType && (value = dsr_2.DataShapeUtility.findAndParseCalculation(calculations, id)), 
                            null == value) {
                                var primaryAggIdx = getAggIdxForNode(node), subtotal = findSubtotalValue(calculations, formatSubtotals, primaryAggIdx, secondaryAggIdx, maxPrimaryAggIdx, maxSecondaryAggIdx);
                                void 0 !== subtotal && (value = subtotal);
                            }
                            highlightId && (measureValue.highlight = dsr_2.DataShapeUtility.findAndParseCalculation(calculations, highlightId)), 
                            measureValue.value = value, measureIndex.index > 0 && (measureValue.valueSourceIndex = measureIndex.index), 
                            valueIndex.index++, measureIndex.index++;
                        }
                        function parseIntersections(rowMemberType, measureSelects, instance, node, intersectionToSecondaryAggIdx, maxPrimaryAggIdx, maxSecondaryAggIdx, enableCellLevelFormatting) {
                            var intersections = instance.Intersections, valueIndex = {
                                index: 0
                            };
                            if (intersections) {
                                for (var i = 0, ilen = intersections.length; i < ilen; i++) if (intersections[i].Calculations) {
                                    var secondaryAggIdx = intersectionToSecondaryAggIdx[i];
                                    readAndAddMeasureValues(rowMemberType, measureSelects, intersections[i].Calculations, node, valueIndex, secondaryAggIdx, maxPrimaryAggIdx, maxSecondaryAggIdx, enableCellLevelFormatting);
                                }
                            } else readAndAddMeasureValues(rowMemberType, measureSelects, instance.Calculations, node, valueIndex, 0, maxPrimaryAggIdx, maxSecondaryAggIdx, enableCellLevelFormatting);
                        }
                        function findSubtotalValue(calculations, subtotals, primaryAggIdx, secondaryAggIdx, maxPrimaryAggIdx, maxSecondaryAggIdx) {
                            if (subtotals) {
                                var AggIdx = computeAggIdx(primaryAggIdx, secondaryAggIdx, maxPrimaryAggIdx, maxSecondaryAggIdx);
                                if (AggIdx < subtotals.length) return dsr_2.DataShapeUtility.findAndParseCalculation(calculations, subtotals[AggIdx]);
                            }
                        }
                        DsrToMatrixParser.parse = parse;
                    }(DsrToMatrixParser || (DsrToMatrixParser = {}));
                    var DsrToScriptResultStrategy = function() {
                        function DsrToScriptResultStrategy(context) {
                            this._context = context;
                        }
                        return DsrToScriptResultStrategy.prototype.read = function(dataShapeExprs, dataShape) {
                            var metadata = {
                                columns: []
                            }, dataView = {
                                metadata: metadata
                            };
                            if (dataShape.PrimaryHierarchy && dataShape.PrimaryHierarchy.length > 0) {
                                var primaryHierarchy = dataShape.PrimaryHierarchy[0];
                                if (primaryHierarchy && primaryHierarchy.Instances.length > 0) {
                                    var instances = primaryHierarchy.Instances[0], calculations = instances.Calculations, payloadCalculationId = this._context.scriptVisualBinding.PayloadCalculationId || this._context.scriptVisualBinding.ImageCalculationId, calculation = dsr_2.DataShapeUtility.findCalculation(calculations, payloadCalculationId);
                                    if (calculation) {
                                        var payloadData = calculation.Value, payloadBase64 = data.PrimitiveValueEncoding.parseBinary(payloadData);
                                        payloadBase64 && (dataView.scriptResult = {
                                            payloadBase64: payloadBase64
                                        });
                                    }
                                }
                            }
                            return dataView;
                        }, DsrToScriptResultStrategy;
                    }(), DsrToTreeStrategy = function() {
                        function DsrToTreeStrategy(context) {
                            this.context = context;
                        }
                        return DsrToTreeStrategy.prototype.read = function(dataShapeExprs, dataShape) {
                            var context = this.context, metadata = this.readMetadata(dataShape.IsComplete), dataView = {
                                metadata: metadata
                            }, doTree = context.includes(16), doCategorical = context.includes(1), doSingle = context.includes(4), doTable = context.includes(8);
                            if (doTree || doCategorical || doSingle || doTable) {
                                var root = this.parseTree(metadata.columns, dataShapeExprs, dataShape);
                                if (doTree) {
                                    var tree = this.createTree(metadata, root);
                                    tree && (dataView.tree = tree);
                                }
                                if (doCategorical) {
                                    var categorical = this.categorize(metadata, root);
                                    categorical && (dataView.categorical = categorical);
                                }
                                if (doSingle) {
                                    var single_1 = this.createSingleValue(metadata, root);
                                    single_1 && (dataView.single = single_1);
                                }
                                if (doTable) {
                                    var table = this.createTable(metadata, root);
                                    table && (dataView.table = table);
                                }
                            }
                            if (context.includes(2)) {
                                var matrix = DsrToMatrixParser.parse(this.context, dataShapeExprs, dataShape, dataView.metadata);
                                matrix && (dataView.matrix = matrix);
                            }
                            return dataView;
                        }, DsrToTreeStrategy.prototype.readMetadata = function(isComplete) {
                            for (var metadata = {
                                columns: []
                            }, context = this.context, selects = context.selects, i = 0, len = selects.length; i < len; i++) {
                                var select = selects[i];
                                select ? context.createColumns(metadata.columns, i) : context.actionHistory |= 1;
                            }
                            return isComplete || (metadata.segment = {}), metadata;
                        }, DsrToTreeStrategy.prototype.parseTree = function(columns, dataShapeExprs, dataShape) {
                            var timer = PerfTimer.start("DSR.tree(" + this.context.perfId + ")"), root = {}, selects = this.context.selects;
                            this.parseRootAggregates(columns, root);
                            var dynamicMember = dsr_2.DataShapeUtility.getTopLevelPrimaryDynamicMember(dataShape, dataShapeExprs, !0);
                            if (dynamicMember) {
                                var primaryHierarchyFirstMember = dataShape.PrimaryHierarchy[0];
                                dynamicMember !== primaryHierarchyFirstMember && this.parseValues(selects, root, DsrToTreeStrategy.getFirstInstanceCalcs(primaryHierarchyFirstMember));
                                var primaryAxisGroupings = void 0;
                                dataShapeExprs && dataShapeExprs.Primary && (primaryAxisGroupings = dataShapeExprs.Primary.Groupings), 
                                this.parseRecursive(root, dynamicMember, primaryAxisGroupings, 0, columns);
                            } else _.isEmpty(dataShape.PrimaryHierarchy) || this.parseValues(selects, root, DsrToTreeStrategy.getFirstInstanceCalcs(dataShape.PrimaryHierarchy[0]));
                            return timer(), root;
                        }, DsrToTreeStrategy.prototype.parseRecursive = function(node, dynamicMember, primaryAxisGroupings, depth, columns) {
                            var aggregator, context = this.context, dynamicMemberInstances = dynamicMember.Instances, dynamicMemberInstancesLength = dynamicMemberInstances.length;
                            dynamicMemberInstancesLength && (node.children = [], 0 === depth && (aggregator = TreeNodeValueAggregateComputer.create(node, context))), 
                            primaryAxisGroupings && (node.childIdentityFields = context.readKeys(primaryAxisGroupings, depth));
                            for (var i = 0; i < dynamicMemberInstancesLength; i++) {
                                var instance = dynamicMemberInstances[i], nestedNode = {};
                                node.children.push(nestedNode), instance.RestartFlag && 1 === instance.RestartFlag && (nestedNode.isMerge = !0), 
                                this.parseValues(context.selects, nestedNode, instance.Calculations, aggregator), 
                                primaryAxisGroupings && (nestedNode.identity = context.readIdentity(primaryAxisGroupings, instance, depth));
                                var nestedMembers = instance.Members;
                                if (this.parseAggregates(context.selects, nestedNode, instance.Calculations, nestedMembers, depth + 1), 
                                !_.isEmpty(nestedMembers)) {
                                    var dynamicChild = dsr_2.DataShapeUtility.getDynamicMember(nestedMembers, primaryAxisGroupings, depth + 1);
                                    dynamicChild && this.parseRecursive(nestedNode, dynamicChild, primaryAxisGroupings, depth + 1);
                                }
                            }
                            aggregator && aggregator.complete(columns);
                        }, DsrToTreeStrategy.getFirstInstanceCalcs = function(member) {
                            var memberInstances = member.Instances;
                            return memberInstances.length > 0 ? memberInstances[0].Calculations : null;
                        }, DsrToTreeStrategy.prototype.parseRootAggregates = function(columns, node) {
                            for (var i = 0, len = columns.length; i < len; i++) {
                                var column = columns[i], nodeAggregates = column.aggregates;
                                nodeAggregates && DsrAggregateReader.extend(ensureTreeNodeValues(node, i), nodeAggregates);
                            }
                        }, DsrToTreeStrategy.prototype.parseAggregates = function(selects, node, calculations, allMembers, depth) {
                            for (var selectIndex = 0, len = selects.length; selectIndex < len; selectIndex++) {
                                var select = selects[selectIndex];
                                if (select) {
                                    var nodeAggregates = DsrAggregateReader.parseAggregates(select, calculations, allMembers, depth);
                                    if (nodeAggregates) {
                                        var columnIndex = this.context.selectIndexToColumnIndexMap[selectIndex];
                                        DsrAggregateReader.extend(ensureTreeNodeValues(node, columnIndex), nodeAggregates);
                                    }
                                }
                            }
                        }, DsrToTreeStrategy.prototype.parseValues = function(selects, node, calculations, aggregator) {
                            if (!_.isEmpty(calculations)) for (var selectIndex = 0, columnIndex = 0, len = selects.length; selectIndex < len; selectIndex++) {
                                var select = selects[selectIndex];
                                if (select) {
                                    if (select.Value) {
                                        var value = dsr_2.DataShapeUtility.findAndParseCalculation(calculations, select.Value);
                                        void 0 !== value && (select.Kind === dsr_2.SelectKind.Group ? node.name = value : (node.value = value, 
                                        aggregator && aggregator.add(columnIndex, value)), ensureTreeNodeValues(node, columnIndex).value = value);
                                    }
                                    if (select.Highlight) {
                                        var highlight = dsr_2.DataShapeUtility.findAndParseCalculation(calculations, select.Highlight.Value);
                                        void 0 !== highlight && (ensureTreeNodeValues(node, columnIndex).highlight = highlight);
                                    }
                                    if (columnIndex++, select.DynamicFormat && this.context.enableCellLevelFormatting) {
                                        var value = dsr_2.DataShapeUtility.findAndParseCalculation(calculations, select.DynamicFormat.Format);
                                        ensureTreeNodeValues(node, columnIndex).value = value, columnIndex++;
                                    }
                                }
                            }
                        }, DsrToTreeStrategy.prototype.categorize = function(metadata, root) {
                            if (!this.canCategorize()) return null;
                            for (var categoryColumns, timer = PerfTimer.start("DSR.categorical(" + this.context.perfId + ")"), view = {}, j = 0, jlen = metadata.columns.length; j < jlen; j++) {
                                var metadataColumn = metadata.columns[j];
                                if (void 0 !== metadataColumn.index) if (metadataColumn.isMeasure) {
                                    var column = {
                                        source: metadataColumn,
                                        values: []
                                    }, aggregates = metadataColumn.aggregates;
                                    aggregates && DsrAggregateReader.extend(column, aggregates), view.values || (view.values = data.DataViewTransform.createValueColumns()), 
                                    view.values.push(column);
                                } else categoryColumns || (categoryColumns = []), categoryColumns.push({
                                    columnIndex: j,
                                    metadataColumn: metadataColumn
                                });
                            }
                            if (categoryColumns) {
                                view.categories = [];
                                for (var categoryIdentity = void 0, categoryIdx = 0, categoryLen = categoryColumns.length; categoryIdx < categoryLen; categoryIdx++) {
                                    var categoryColumn = categoryColumns[categoryIdx], nodes = root.children, category = {
                                        source: categoryColumn.metadataColumn,
                                        values: []
                                    };
                                    if (nodes) for (var nodeIdx = 0, nodeLen = nodes.length; nodeIdx < nodeLen; nodeIdx++) {
                                        var node = nodes[nodeIdx];
                                        if (category.values.push(node.values[categoryColumn.columnIndex].value), 0 === categoryIdx && (this.writeCategoricalValues(metadata, node, view.values), 
                                        node.identity && (categoryIdentity || (categoryIdentity = []), categoryIdentity.push(node.identity))), 
                                        node.isMerge) {
                                            var viewSegment = view;
                                            viewSegment.lastMergeIndex = nodeIdx;
                                        }
                                    }
                                    categoryIdentity && (category.identity = categoryIdentity), root.childIdentityFields && (category.identityFields = root.childIdentityFields), 
                                    view.categories.push(category);
                                }
                            } else this.writeCategoricalValues(metadata, root, view.values);
                            return timer(), view;
                        }, DsrToTreeStrategy.prototype.canCategorize = function() {
                            for (var context = this.context, selects = context.selects, i = 0, len = selects.length; i < len; i++) {
                                var select = selects[i];
                                if (select && select.Depth > 0) return !1;
                            }
                            return !0;
                        }, DsrToTreeStrategy.prototype.createTree = function(metadata, sourceRoot) {
                            var context = this.context;
                            if (!(2 & context.actionHistory || 1 & context.actionHistory)) return {
                                root: sourceRoot
                            };
                            var root = powerbi.Prototype.inherit(sourceRoot), columns = metadata.columns, sourceValues = sourceRoot.values;
                            if (sourceValues) {
                                for (var nodeValues = {}, j = 0; j < columns.length; j++) {
                                    var column = columns[j];
                                    void 0 !== column.index && void 0 !== sourceValues[j] && (nodeValues[column.index] = sourceValues[j]);
                                }
                                root.values = nodeValues;
                            }
                            var children = sourceRoot.children;
                            return children && (root.children = this.removeFormatSourceFromTreeChildren(columns, children)), 
                            {
                                root: root
                            };
                        }, DsrToTreeStrategy.prototype.removeFormatSourceFromTreeChildren = function(columns, sourceChildren) {
                            for (var sourceChildrenLength = sourceChildren.length, children = _.map(sourceChildren, function(o) {
                                return o;
                            }), childIndex = 0; childIndex < sourceChildrenLength; childIndex++) {
                                var child = powerbi.Prototype.inherit(children[childIndex]);
                                children[childIndex] = child;
                                for (var values = {}, valueIndex = 0; valueIndex < columns.length; valueIndex++) {
                                    var column = columns[valueIndex];
                                    void 0 !== column.index && void 0 !== children[childIndex].values[valueIndex] && (values[column.index] = children[childIndex].values[valueIndex]);
                                }
                                children[childIndex].values = values;
                                var childChildren = children[childIndex].children;
                                childChildren && (children[childIndex].children = this.removeFormatSourceFromTreeChildren(columns, childChildren));
                            }
                            return children;
                        }, DsrToTreeStrategy.prototype.createTable = function(metadata, root) {
                            for (var maxDepth, selects = this.context.selects, i = 0, len = selects.length; i < len; i++) {
                                var select = selects[i];
                                if (select) {
                                    var depth = selects[i].Depth;
                                    depth >= 0 && (maxDepth = Math.max(depth, maxDepth || 0));
                                }
                            }
                            if (maxDepth > 0) return null;
                            var lastMergeIndex, identity, timer = PerfTimer.start("DSR.table(" + this.context.perfId + ")"), rows = [], columnsLength = metadata.columns.length;
                            if (maxDepth >= 0) {
                                var nodes = root.children;
                                if (nodes) for (var i = 0, ilen = nodes.length; i < ilen; i++) {
                                    var node = nodes[i];
                                    this.toTableRow(node, columnsLength, rows), node.isMerge && (lastMergeIndex = i), 
                                    node.identity && (identity || (identity = []), identity.push(node.identity));
                                }
                            } else this.toTableRow(root, columnsLength, rows);
                            var totals = this.toTotals(root, columnsLength), table = {
                                rows: rows,
                                columns: metadata.columns
                            };
                            if (identity && (table.identity = identity), root.childIdentityFields && (table.identityFields = root.childIdentityFields), 
                            totals && (table.totals = totals), lastMergeIndex >= 0) {
                                var tableSegment = table;
                                tableSegment.lastMergeIndex = lastMergeIndex;
                            }
                            return timer(), table;
                        }, DsrToTreeStrategy.prototype.toTableRow = function(node, columnsLength, rows) {
                            for (var row = [], j = 0; j < columnsLength; j++) {
                                var nodeValue = node.values[j];
                                nodeValue && row.push(nodeValue.value);
                            }
                            rows.push(row);
                        }, DsrToTreeStrategy.prototype.toTotals = function(root, columnsLength) {
                            var totals = [], values = root.values, hasAtLeastOneTotal = !1;
                            if (values) for (var columnIndex = 0; columnIndex < columnsLength; columnIndex++) {
                                var measureData = values[columnIndex], subtotal = measureData ? measureData.subtotal : null;
                                hasAtLeastOneTotal = hasAtLeastOneTotal || null != subtotal, totals.push(subtotal);
                            }
                            return hasAtLeastOneTotal ? totals : null;
                        }, DsrToTreeStrategy.prototype.writeCategoricalValues = function(metadata, node, values) {
                            for (var columns = metadata.columns, idx = 0, j = 0, jlen = columns.length; j < jlen; j++) {
                                var column = columns[j];
                                if (column.isMeasure && void 0 !== column.index) {
                                    var nodeValues = node.values[j];
                                    if (nodeValues) {
                                        var measureValues = values[idx++];
                                        measureValues.values.push(nodeValues.value), void 0 !== nodeValues.highlight && (measureValues.highlights || (measureValues.highlights = []), 
                                        measureValues.highlights.push(nodeValues.highlight));
                                    }
                                }
                            }
                        }, DsrToTreeStrategy.prototype.createSingleValue = function(metadata, root) {
                            if (root.values) {
                                for (var columns = metadata.columns, measureColumn = null, columnIndex = void 0, j = 0, jlen = columns.length; j < jlen; j++) if (columns[j].isMeasure && null != columns[j].index) {
                                    if (measureColumn) return null;
                                    measureColumn = columns[j], columnIndex = j;
                                }
                                if (!measureColumn) return null;
                                var measureValues = root.values[columnIndex];
                                if (!measureValues) return null;
                                var value = 0 === powerbi.DataViewAnalysis.countGroups(metadata.columns) ? measureValues.value : measureValues.subtotal;
                                return void 0 === value ? null : {
                                    column: measureColumn,
                                    value: value
                                };
                            }
                            return null;
                        }, DsrToTreeStrategy;
                    }(), DsrWithPivotedColumnsStrategy = function() {
                        function DsrWithPivotedColumnsStrategy(context) {
                            this._context = context, this._categoriesMetadata = [], this._primaryMeasureSelects = [], 
                            this._measureSelects = [], this._secondarySelects = [], this._seriesColumn = null;
                        }
                        return DsrWithPivotedColumnsStrategy.prototype.read = function(dataShapeExprs, dataShape) {
                            var context = this._context, dataView = {
                                metadata: this.readMetadata(dataShape.IsComplete)
                            };
                            if (context.includes(1)) {
                                var categorical = this.categorize(dataShape, dataView.metadata, dataShapeExprs);
                                categorical && (dataView.categorical = categorical);
                            }
                            if (context.includes(2)) {
                                var matrix = DsrToMatrixParser.parse(this._context, dataShapeExprs, dataShape, dataView.metadata);
                                matrix && (dataView.matrix = matrix);
                            }
                            return dataView;
                        }, DsrWithPivotedColumnsStrategy.prototype.readMetadata = function(isComplete) {
                            for (var metadata = {
                                columns: []
                            }, context = this._context, selects = context.selects, i = 0, len = selects.length; i < len; i++) {
                                var select = selects[i];
                                if (select) if (select.Kind !== dsr_2.SelectKind.Measure) {
                                    var columnMetadata = context.createColumns(metadata.columns, i);
                                    select.SecondaryDepth >= 0 ? (this._secondarySelects.push(select), this._secondaryDepth = Math.max(this._secondaryDepth || 0, select.SecondaryDepth), 
                                    this._seriesColumn = columnMetadata) : 0 === select.Depth && this._categoriesMetadata.push({
                                        select: select,
                                        column: columnMetadata
                                    });
                                } else 0 === select.Depth ? this._primaryMeasureSelects.push(select) : this._measureSelects.push(select);
                            }
                            return isComplete || (metadata.segment = {}), metadata;
                        }, DsrWithPivotedColumnsStrategy.prototype.categorize = function(dataShape, metadata, dataShapeExprs) {
                            if (0 !== this._secondaryDepth || 0 === this._categoriesMetadata.length) return null;
                            var primaryAxisGroupings, secondaryAxisGroupings, timer = PerfTimer.start("DSR.categorical(" + this._context.perfId + ", secondary)");
                            dataShapeExprs && (dataShapeExprs.Primary && (primaryAxisGroupings = dataShapeExprs.Primary.Groupings), 
                            dataShapeExprs.Secondary && (secondaryAxisGroupings = dataShapeExprs.Secondary.Groupings));
                            var secondaryDynamicTopLevel = dsr_2.DataShapeUtility.getTopLevelSecondaryDynamicMember(dataShape, dataShapeExprs), values = this.readColumnsFromSecondary(secondaryDynamicTopLevel, metadata, secondaryAxisGroupings, dataShape.Calculations), primaryDynamicTopLevel = dsr_2.DataShapeUtility.getTopLevelPrimaryDynamicMember(dataShape, dataShapeExprs), categoriesResult = this.readCategoriesAndValues(primaryDynamicTopLevel, metadata, values, primaryAxisGroupings), result = {
                                categories: categoriesResult.categories,
                                values: values
                            };
                            return void 0 !== categoriesResult.lastMergeIndex && (result.lastMergeIndex = categoriesResult.lastMergeIndex), 
                            timer(), result;
                        }, DsrWithPivotedColumnsStrategy.prototype.readColumnsFromSecondary = function(secondaryMember, metadata, secondaryAxisGroupings, aggregateCalculations) {
                            var valueIdentityFields, context = this._context;
                            secondaryAxisGroupings && (valueIdentityFields = context.readKeys(secondaryAxisGroupings, 0));
                            var values = [], allSelects = context.selects, measureSelectsLen = this._measureSelects.length, grouped = [], instances = secondaryMember.Instances, instanceCount = instances.length;
                            if (instanceCount) for (var i = 0; i < instanceCount; i++) {
                                var instance = instances[i], calcs = instance.Calculations, identity = void 0;
                                secondaryAxisGroupings && (identity = context.readIdentity(secondaryAxisGroupings, instance, 0));
                                for (var j = 0, jlen = this._secondarySelects.length; j < jlen; j++) {
                                    for (var secondarySelect = this._secondarySelects[j], groupName = dsr_2.DataShapeUtility.findAndParseCalculation(calcs, secondarySelect.Value), valueColumns = [], k = 0; k < measureSelectsLen; k++) {
                                        var measureSelect = this._measureSelects[k], selectIndex = allSelects.indexOf(measureSelect), columnMetadata = context.createColumns(metadata.columns, selectIndex, !0);
                                        void 0 !== groupName && (columnMetadata.groupName = groupName);
                                        var column = {
                                            source: columnMetadata,
                                            values: []
                                        };
                                        identity && (column.identity = identity), this.addColumnAggregates(aggregateCalculations, measureSelect, column), 
                                        values.push(column), valueColumns.push(column);
                                    }
                                    grouped.push({
                                        identity: identity,
                                        name: groupName,
                                        values: valueColumns
                                    });
                                }
                            } else {
                                for (var k = 0; k < measureSelectsLen; k++) {
                                    var measureSelect = this._measureSelects[k], selectIndex = allSelects.indexOf(measureSelect), columnMetadata = context.createColumns(metadata.columns, selectIndex), column = {
                                        source: columnMetadata,
                                        values: []
                                    };
                                    this.addColumnAggregates(aggregateCalculations, measureSelect, column), values.push(column);
                                }
                                grouped.push({
                                    values: values.slice()
                                });
                            }
                            for (var k = 0, klen = this._primaryMeasureSelects.length; k < klen; k++) {
                                var primaryMeasureSelect = this._primaryMeasureSelects[k], selectIndex = allSelects.indexOf(primaryMeasureSelect), columnMetadata = context.createColumns(metadata.columns, selectIndex), column = {
                                    source: columnMetadata,
                                    values: []
                                };
                                values.push(column);
                            }
                            valueIdentityFields && (values.identityFields = valueIdentityFields);
                            var source = this._seriesColumn;
                            return source && (values.source = source), values.grouped = function() {
                                return grouped;
                            }, values;
                        }, DsrWithPivotedColumnsStrategy.prototype.addColumnAggregates = function(calcs, measureSelect, column) {
                            calcs && (measureSelect.Max && (column.max = dsr_2.DataShapeUtility.findAndParseCalculation(calcs, measureSelect.Max[0])), 
                            measureSelect.Min && (column.min = dsr_2.DataShapeUtility.findAndParseCalculation(calcs, measureSelect.Min[0])));
                        }, DsrWithPivotedColumnsStrategy.prototype.readCategoriesAndValues = function(primaryMember, metadata, values, primaryAxisGroupings) {
                            for (var identities, categories = [], categoryMetadata = this._categoriesMetadata, categoriesLength = categoryMetadata.length, context = this._context, i = 0; i < categoriesLength; i++) {
                                var category = {
                                    source: categoryMetadata[i].column,
                                    values: []
                                };
                                categories.push(category), primaryAxisGroupings && (identities || (identities = []), 
                                category.identity = identities, category.identityFields = context.readKeys(primaryAxisGroupings, 0));
                            }
                            for (var lastMergeIndex, instances = primaryMember.Instances, primaryMeasureSelects = this._primaryMeasureSelects, i = 0, len = instances.length; i < len; i++) {
                                var instance = instances[i];
                                1 === instance.RestartFlag && (lastMergeIndex = i);
                                for (var categoryIdx = 0; categoryIdx < categoriesLength; categoryIdx++) {
                                    var category = categories[categoryIdx];
                                    category.values.push(dsr_2.DataShapeUtility.findAndParseCalculation(instance.Calculations, categoryMetadata[categoryIdx].select.Value));
                                }
                                identities && identities.push(context.readIdentity(primaryAxisGroupings, instance, 0));
                                for (var intersections = instance.Intersections, valueIdx = 0, j = 0, jlen = intersections.length; j < jlen; j++) for (var calculations = intersections[j].Calculations, k = 0, klen = this._measureSelects.length; k < klen; k++) {
                                    var measureSelect = this._measureSelects[k], value = dsr_2.DataShapeUtility.findAndParseCalculation(calculations, measureSelect.Value);
                                    if (void 0 !== value) {
                                        var valueCol = values[valueIdx++];
                                        if (valueCol.values.push(value), measureSelect.Highlight) {
                                            valueCol.highlights || (valueCol.highlights = []);
                                            var value_1 = dsr_2.DataShapeUtility.findAndParseCalculation(calculations, measureSelect.Highlight.Value);
                                            valueCol.highlights.push(value_1);
                                        }
                                    }
                                }
                                for (var j = 0, jlen = primaryMeasureSelects.length; j < jlen; j++) {
                                    var measureSelect = primaryMeasureSelects[j], calculations = instance.Calculations, value = dsr_2.DataShapeUtility.findAndParseCalculation(calculations, measureSelect.Value), valueCol = values[valueIdx++];
                                    if (valueCol.values.push(value), measureSelect.Highlight) {
                                        valueCol.highlights || (valueCol.highlights = []);
                                        var value_2 = dsr_2.DataShapeUtility.findAndParseCalculation(calculations, measureSelect.Highlight.Value);
                                        valueCol.highlights.push(value_2);
                                    }
                                }
                            }
                            return {
                                categories: categories,
                                lastMergeIndex: lastMergeIndex
                            };
                        }, DsrWithPivotedColumnsStrategy;
                    }(), DsrReaderContext = function() {
                        function DsrReaderContext(targets, descriptor, perfId, aggregateReader, enableCellLevelFormatting) {
                            this.targets = targets, this.selects = descriptor.Select, this.scriptVisualBinding = descriptor.ScriptVisualBinding, 
                            this.perfId = perfId || "", this.stats = {
                                id: perfId || void 0,
                                primary: 0,
                                secondary: 0
                            }, this.aggregateReader = aggregateReader, this.enableCellLevelFormatting = enableCellLevelFormatting, 
                            this.cacheItems = [], this.selectIndexToColumnIndexMap = {};
                        }
                        return DsrReaderContext.prototype.createColumns = function(columns, selectIndex, suppressAggregates) {
                            var columnIndex = columns.length, columnMetadata = this.columnMetadata(selectIndex, columnIndex, suppressAggregates);
                            columns.push(columnMetadata);
                            var dynamicFormatColumnIndex = columns.length, dynamicFormatColumnMetadata = this.tryCreatingDynamicFormatColumnMetadata(selectIndex, dynamicFormatColumnIndex, columnMetadata);
                            return dynamicFormatColumnMetadata && columns.push(dynamicFormatColumnMetadata), 
                            columnMetadata;
                        }, DsrReaderContext.prototype.columnMetadata = function(selectIndex, columnIndex, suppressAggregates) {
                            var select = this.selects[selectIndex], column = {
                                displayName: "",
                                index: selectIndex
                            };
                            if (select.Format && (column.format = select.Format), column.type = dsr_2.DataShapeUtility.describeDataType(select.Type, select.DataCategory), 
                            select.Kind === dsr_2.SelectKind.Measure && (column.isMeasure = !0), !suppressAggregates) {
                                var aggregates = this.aggregateReader.compute(select, columnIndex);
                                aggregates && (column.aggregates = aggregates);
                            }
                            var groupKeys = select.GroupKeys;
                            if (groupKeys) for (var identityExprs = column.identityExprs = [], _i = 0, groupKeys_1 = groupKeys; _i < groupKeys_1.length; _i++) {
                                var groupKey = groupKeys_1[_i], identityExpr = this.convertKey(groupKey);
                                identityExprs.push(identityExpr);
                            }
                            return this.selectIndexToColumnIndexMap[selectIndex] = columnIndex, column;
                        }, DsrReaderContext.prototype.tryCreatingDynamicFormatColumnMetadata = function(selectIndex, columnIndex, columnMetadata, suppressAggregates) {
                            var select = this.selects[selectIndex];
                            if (this.enableCellLevelFormatting && select.DynamicFormat) {
                                var column = {
                                    displayName: "",
                                    isMeasure: !0
                                };
                                columnMetadata.formatSource = {
                                    formatString: column
                                };
                                var fakeSelect = {
                                    Kind: dsr_2.SelectKind.Measure,
                                    Subtotal: _.map(select.SubtotalDynamicFormat, function(subtotalDynamicFormat) {
                                        return subtotalDynamicFormat && subtotalDynamicFormat.Format;
                                    })
                                };
                                if (!suppressAggregates) {
                                    var aggregates = this.aggregateReader.compute(fakeSelect, columnIndex);
                                    aggregates && (column.aggregates = aggregates);
                                }
                                return this.actionHistory |= 2, column;
                            }
                        }, DsrReaderContext.prototype.readIdentity = function(axisGroupings, instance, depth) {
                            for (var expr, keyExprs = this.readKeys(axisGroupings, depth), groupingKeys = axisGroupings[depth].Keys, i = 0, len = groupingKeys.length; i < len; i++) {
                                var key = groupingKeys[i], calcId = key.Calc || this.selects[key.Select].Value, valueExpr = dsr_2.DataShapeUtility.findAndParseCalculationToSQExpr(instance.Calculations, calcId), exprToAdd = data.SQExprBuilder.equal(keyExprs[i], valueExpr);
                                expr = data.SQExprBuilder.and(expr, exprToAdd);
                            }
                            return data.createDataViewScopeIdentity(expr);
                        }, DsrReaderContext.prototype.readKeys = function(axisGroupings, depth) {
                            var axisCache = this.getAxisCache(axisGroupings), keys = axisCache.exprs[depth];
                            if (void 0 === keys) {
                                keys = axisCache.exprs[depth] = [];
                                for (var groupingKeys = axisGroupings[depth].Keys, i = 0, len = groupingKeys.length; i < len; i++) keys.push(this.convertKey(groupingKeys[i]));
                            }
                            return keys;
                        }, DsrReaderContext.prototype.includes = function(kind) {
                            return EnumExtensions.hasFlag(this.targets, kind);
                        }, DsrReaderContext.prototype.getAxisCache = function(axisGroupings) {
                            for (var cacheItems = this.cacheItems, i = 0, len = cacheItems.length; i < len; i++) {
                                var item_1 = cacheItems[i];
                                if (item_1.axisGroupings === axisGroupings) return item_1;
                            }
                            var item = {
                                axisGroupings: axisGroupings,
                                exprs: []
                            };
                            return cacheItems.push(item), item;
                        }, DsrReaderContext.prototype.convertKey = function(key) {
                            var source = key.Source;
                            return data.SQExprBuilder.columnRef(data.SQExprBuilder.entity(dsr.schemaName(source), source.Entity || source.EntitySet), source.Property);
                        }, DsrReaderContext;
                    }(), DsrAggregateReader = function() {
                        function DsrAggregateReader(descriptor, dataShape) {
                            this.selects = descriptor.Select, this.dataShape = dataShape;
                        }
                        return DsrAggregateReader.prototype.compute = function(select, columnIndex, forceCreate) {
                            var cache = this.cache;
                            if (cache) {
                                var cachedResult = cache[columnIndex];
                                if (cachedResult) return cachedResult;
                            }
                            if (select) {
                                cache || (this.cache = cache = {});
                                var dataShape = this.dataShape, aggregates = DsrAggregateReader.parseAggregates(select, dataShape.Calculations, dataShape.PrimaryHierarchy, 0);
                                return forceCreate && !aggregates && (aggregates = {}), cache[columnIndex] = aggregates, 
                                aggregates;
                            }
                        }, DsrAggregateReader.prototype.updateAggregates = function(select, columnIndex, name, value) {
                            var aggregates = this.compute(select, columnIndex, !0);
                            if (aggregates) return aggregates[name] = value, aggregates;
                        }, DsrAggregateReader;
                    }();
                    !function(DsrAggregateReader) {
                        function parseAggregates(select, calculations, allMembers, depth) {
                            var firstMemberCalculations = !_.isEmpty(allMembers) && DsrToTreeStrategy.getFirstInstanceCalcs(allMembers[0]);
                            if (!_.isEmpty(calculations) || !_.isEmpty(firstMemberCalculations)) {
                                var result;
                                if (!_.isEmpty(firstMemberCalculations) && select.Subtotal) {
                                    var id = select.Subtotal[depth];
                                    if (id) {
                                        var value = dsr_2.DataShapeUtility.findAndParseCalculation(firstMemberCalculations, id);
                                        void 0 !== value && (result || (result = {}), result.subtotal = value);
                                    }
                                }
                                if (!_.isEmpty(calculations)) {
                                    if (select.Max) {
                                        var id = select.Max[depth];
                                        if (id) {
                                            var value = dsr_2.DataShapeUtility.findAndParseCalculation(calculations, id);
                                            void 0 !== value && (result || (result = {}), result.max = value);
                                        }
                                    }
                                    if (select.Min) {
                                        var id = select.Min[depth];
                                        if (id) {
                                            var value = dsr_2.DataShapeUtility.findAndParseCalculation(calculations, id);
                                            void 0 !== value && (result || (result = {}), result.min = value);
                                        }
                                    }
                                    if (select.Count) {
                                        var id = select.Count[depth];
                                        if (id) {
                                            var value = dsr_2.DataShapeUtility.findAndParseCalculation(calculations, id);
                                            void 0 !== value && (result || (result = {}), result.count = value);
                                        }
                                    }
                                    var columnAggregates = select.Aggregates;
                                    if (columnAggregates) for (var _i = 0, columnAggregates_1 = columnAggregates; _i < columnAggregates_1.length; _i++) {
                                        var columnAggregate = columnAggregates_1[_i], aggregate = columnAggregate.Aggregate, id = columnAggregate.Ids[depth];
                                        if (id) {
                                            var value = dsr_2.DataShapeUtility.findAndParseCalculation(calculations, id);
                                            if (void 0 !== value) {
                                                var percentileDescriptor = aggregate.Percentile;
                                                if (percentileDescriptor) {
                                                    var percentileAggregate = {
                                                        k: percentileDescriptor.K,
                                                        value: value
                                                    };
                                                    percentileDescriptor.Exclusive && (percentileAggregate.exclusive = percentileDescriptor.Exclusive), 
                                                    result || (result = {});
                                                    var resultPercentiles = result.percentiles;
                                                    resultPercentiles || (resultPercentiles = result.percentiles = []), resultPercentiles.push(percentileAggregate);
                                                } else aggregate.Average ? (result || (result = {}), result.average = value) : aggregate.Median && (result || (result = {}), 
                                                result.median = value);
                                            }
                                        }
                                    }
                                    if (0 === depth) {
                                        var id = select.Value;
                                        if (id) {
                                            var value = dsr_2.DataShapeUtility.findAndParseCalculation(calculations, id);
                                            void 0 !== value && (result || (result = {}), result.single = value);
                                        }
                                    }
                                }
                                return result;
                            }
                        }
                        function extend(target, source) {
                            void 0 !== source.subtotal && (target.subtotal = source.subtotal), void 0 !== source.min && (target.min = source.min), 
                            void 0 !== source.max && (target.max = source.max), void 0 !== source.minLocal && (target.minLocal = source.minLocal), 
                            void 0 !== source.maxLocal && (target.maxLocal = source.maxLocal), void 0 !== source.count && (target.count = source.count);
                        }
                        DsrAggregateReader.parseAggregates = parseAggregates, DsrAggregateReader.extend = extend;
                    }(DsrAggregateReader || (DsrAggregateReader = {}));
                    var TreeNodeValueAggregateComputer = function() {
                        function TreeNodeValueAggregateComputer(node, aggregateReader, selects, aggregators, enableCellLevelFormatting) {
                            this.node = node, this.aggregateReader = aggregateReader, this.selects = selects, 
                            this.enableCellLevelFormatting = enableCellLevelFormatting, this.aggregators = aggregators;
                        }
                        return TreeNodeValueAggregateComputer.create = function(node, context) {
                            for (var nodeValues = node.values, selects = context.selects, foundAggregate = !1, aggregators = {}, selectIndex = 0, columnIndex = 0, len = selects.length; selectIndex < len; selectIndex++) {
                                var select = selects[selectIndex];
                                if (select) if (select.Kind === dsr_2.SelectKind.Measure) {
                                    var valueAggregators = void 0, nodeMeasureValue = void 0;
                                    if (nodeValues && (nodeMeasureValue = nodeValues[columnIndex])) {
                                        if (valueAggregators = [], void 0 === nodeMeasureValue.min && valueAggregators.push(new MinTreeNodeValueAggregator()), 
                                        void 0 === nodeMeasureValue.max && valueAggregators.push(new MaxTreeNodeValueAggregator()), 
                                        0 === valueAggregators.length) {
                                            columnIndex++;
                                            continue;
                                        }
                                    } else valueAggregators = [ new MinTreeNodeValueAggregator(), new MaxTreeNodeValueAggregator() ];
                                    aggregators[columnIndex] = valueAggregators, foundAggregate = !0, columnIndex++, 
                                    select.DynamicFormat && context.enableCellLevelFormatting && columnIndex++;
                                } else columnIndex++;
                            }
                            if (foundAggregate) return new TreeNodeValueAggregateComputer(node, context.aggregateReader, context.selects, aggregators, context.enableCellLevelFormatting);
                        }, TreeNodeValueAggregateComputer.prototype.add = function(index, value) {
                            var aggregators = this.aggregators[index];
                            if (aggregators) for (var i = 0, len = aggregators.length; i < len; i++) aggregators[i].update(value);
                        }, TreeNodeValueAggregateComputer.prototype.complete = function(columns) {
                            for (var allAggregators = this.aggregators, node = this.node, aggregateReader = this.aggregateReader, selectIndex = 0, columnIndex = 0, len = this.selects.length; selectIndex < len; selectIndex++) {
                                var select = this.selects[selectIndex];
                                if (select) {
                                    var aggregators = allAggregators[columnIndex];
                                    if (aggregators) {
                                        for (var aggregatorIndex = 0, aggregatorsLength = aggregators.length; aggregatorIndex < aggregatorsLength; aggregatorIndex++) {
                                            var aggregator = aggregators[aggregatorIndex], aggregatedValue = aggregator.value();
                                            if (void 0 !== aggregatedValue) {
                                                var aggregatorName = aggregator.name;
                                                ensureTreeNodeValues(node, columnIndex)[aggregatorName] = aggregatedValue;
                                                var column = columns[columnIndex];
                                                column.aggregates = aggregateReader.updateAggregates(select, columnIndex, aggregatorName, aggregatedValue);
                                            }
                                        }
                                        columnIndex++, select && select.DynamicFormat && this.enableCellLevelFormatting && columnIndex++;
                                    } else columnIndex++;
                                }
                            }
                        }, TreeNodeValueAggregateComputer;
                    }(), MaxTreeNodeValueAggregator = function() {
                        function MaxTreeNodeValueAggregator() {}
                        return Object.defineProperty(MaxTreeNodeValueAggregator.prototype, "name", {
                            get: function() {
                                return "maxLocal";
                            },
                            enumerable: !0,
                            configurable: !0
                        }), MaxTreeNodeValueAggregator.prototype.update = function(value) {
                            if ("number" == typeof value && !isNaN(value)) {
                                var current = this.current;
                                this.current = void 0 === current ? value : Math.max(current, value);
                            }
                        }, MaxTreeNodeValueAggregator.prototype.value = function() {
                            return this.current;
                        }, MaxTreeNodeValueAggregator;
                    }(), MinTreeNodeValueAggregator = function() {
                        function MinTreeNodeValueAggregator() {}
                        return Object.defineProperty(MinTreeNodeValueAggregator.prototype, "name", {
                            get: function() {
                                return "minLocal";
                            },
                            enumerable: !0,
                            configurable: !0
                        }), MinTreeNodeValueAggregator.prototype.update = function(value) {
                            if ("number" == typeof value && !isNaN(value)) {
                                var current = this.current;
                                this.current = void 0 === current ? value : Math.min(current || 0, value);
                            }
                        }, MinTreeNodeValueAggregator.prototype.value = function() {
                            return this.current;
                        }, MinTreeNodeValueAggregator;
                    }();
                }(V1 = reader.V1 || (reader.V1 = {}));
            }(reader = dsr_2.reader || (dsr_2.reader = {}));
        }(dsr = data.dsr || (data.dsr = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var dsr;
        !function(dsr_3) {
            var reader;
            !function(reader) {
                var V2;
                !function(V2) {
                    function createDsrParser(dsr) {
                        return new DsrParser(dsr);
                    }
                    V2.createDsrParser = createDsrParser;
                    var DsrParser = function() {
                        function DsrParser(dsr) {
                            this.parser = new DataShapeParser(dsr.DS);
                        }
                        return DsrParser.prototype.dataShapes = function() {
                            return this.parser;
                        }, DsrParser;
                    }(), DataShapeParser = function() {
                        function DataShapeParser(dataShapes) {
                            this.it = new Iterator(dataShapes);
                        }
                        return DataShapeParser.prototype.next = function() {
                            return this.primaryHierarchyParser = this.secondaryHierarchyParser = null, this.it.next();
                        }, DataShapeParser.prototype.primaryHierarchy = function() {
                            if (!this.primaryHierarchyParser) {
                                var primaryHierarchy = this.it.current().PH;
                                this.primaryHierarchyParser = primaryHierarchy && new DataMemberParser(primaryHierarchy);
                            }
                            return this.primaryHierarchyParser;
                        }, DataShapeParser.prototype.secondaryHierarchy = function() {
                            if (!this.secondaryHierarchyParser) {
                                var secondaryHierarchy = this.it.current().SH;
                                this.secondaryHierarchyParser = secondaryHierarchy && new DataMemberParser(secondaryHierarchy);
                            }
                            return this.secondaryHierarchyParser;
                        }, DataShapeParser.prototype.nextCalc = function() {
                            return !1;
                        }, DataShapeParser.prototype.calcId = function() {}, DataShapeParser.prototype.calcValue = function() {}, 
                        DataShapeParser.prototype.calcValueAsExpr = function() {}, DataShapeParser;
                    }(), DataMemberParser = function() {
                        function DataMemberParser(dataMembers) {
                            this.it = new Iterator(dataMembers);
                        }
                        return DataMemberParser.prototype.next = function() {
                            return this.instancesParser && (this.instancesParser = null), this.it.next();
                        }, DataMemberParser.prototype.id = function() {
                            return this.it.current().N;
                        }, DataMemberParser.prototype.instances = function() {
                            if (!this.instancesParser) {
                                var instances = this.it.current().Is;
                                this.instancesParser = instances && new DataMemberInstanceParser(instances);
                            }
                            return this.instancesParser;
                        }, DataMemberParser;
                    }(), DataMemberInstanceParser = function() {
                        function DataMemberInstanceParser(instances) {
                            this.it = new Iterator(instances);
                        }
                        return DataMemberInstanceParser.prototype.next = function() {
                            var success = this.it.next();
                            if (success) {
                                var instance = this.it.current();
                                instance && instance.C && (this.calcIt = new Iterator(instance.C)), this.dataMemberIt && (this.dataMemberIt = null);
                            }
                            return success;
                        }, DataMemberInstanceParser.prototype.currentIndex = function() {
                            return this.it.index();
                        }, DataMemberInstanceParser.prototype.intersections = function() {
                            return null;
                        }, DataMemberInstanceParser.prototype.restartFlagKind = function() {
                            return this.it.current().RF;
                        }, DataMemberInstanceParser.prototype.members = function() {
                            if (!this.dataMemberIt) {
                                var nestedMembers = this.it.current().M;
                                this.dataMemberIt = nestedMembers && new DataMemberParser(nestedMembers);
                            }
                            return this.dataMemberIt;
                        }, DataMemberInstanceParser.prototype.nextCalc = function() {
                            return this.calcIt && this.calcIt.next();
                        }, DataMemberInstanceParser.prototype.calcId = function() {
                            return this.calcIt && this.calcIt.current().N;
                        }, DataMemberInstanceParser.prototype.calcValue = function() {
                            return this.calcIt && data.PrimitiveValueEncoding.parseValue(this.calcIt.current().V);
                        }, DataMemberInstanceParser.prototype.calcValueAsExpr = function() {
                            return this.calcIt && data.PrimitiveValueEncoding.parseValueToSQExpr(this.calcIt.current().V);
                        }, DataMemberInstanceParser;
                    }(), Iterator = function() {
                        function Iterator(elements) {
                            this.elements = elements, this.currentIndex = -1;
                        }
                        return Iterator.prototype.count = function() {
                            return _.size(this.elements);
                        }, Iterator.prototype.current = function() {
                            return this.elements[this.currentIndex];
                        }, Iterator.prototype.done = function() {
                            return this.currentIndex === this.elements.length - 1;
                        }, Iterator.prototype.next = function() {
                            var done = this.done();
                            return !done && (this.currentIndex++, !0);
                        }, Iterator.prototype.index = function() {
                            return this.currentIndex;
                        }, Iterator;
                    }();
                }(V2 = reader.V2 || (reader.V2 = {}));
            }(reader = dsr_3.reader || (dsr_3.reader = {}));
        }(dsr = data.dsr || (data.dsr = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var dsr;
        !function(dsr) {
            var JsonComparer = jsCommon.JsonComparer, ExecuteSemanticQueryBatcher = function() {
                function ExecuteSemanticQueryBatcher(preferredMaxBatches, onBatchExecute, timerFactory) {
                    this.maxBatches = preferredMaxBatches, this.queryExecuteCallback = onBatchExecute, 
                    this.pending = [], this.timerFactory = timerFactory || jsCommon.TimerPromiseFactory.instance;
                }
                return ExecuteSemanticQueryBatcher.prototype.enqueue = function(queudQuery) {
                    var _this = this;
                    return this.pending.push(queudQuery), this.currentBatchDeferred || (this.currentBatchDeferred = $.Deferred(), 
                    this.timerFactory.create(0).done(function() {
                        var batches = _this.createBatches();
                        _this.clearPending(), _this.queryExecuteCallback(batches), _this.currentBatchDeferred.resolve(), 
                        _this.currentBatchDeferred = void 0;
                    })), this.currentBatchDeferred.promise();
                }, ExecuteSemanticQueryBatcher.prototype.clearPending = function() {
                    this.pending = [];
                }, ExecuteSemanticQueryBatcher.prototype.createBatches = function() {
                    var batches = [], queriesByDataSource = this.sortQueriesByDataSource();
                    if (queriesByDataSource.length >= this.maxBatches) for (var i = 0, ilen = queriesByDataSource.length; i < ilen; ++i) batches.push(this.createBatchFromDataSourceGroup(queriesByDataSource[i])); else batches = this.splitDataSourcesIntoBatches(queriesByDataSource, this.maxBatches);
                    return batches;
                }, ExecuteSemanticQueryBatcher.prototype.sortQueriesByDataSource = function() {
                    for (var dataSourceGroups = [], queries = this.pending, i = 0, ilen = queries.length; i < ilen; ++i) {
                        var query = queries[i];
                        if (!query.execution.rejected()) {
                            var dataSourceGroup = this.findDataSourceGroup(query.options.dataSources, dataSourceGroups, query.options.cacheResponseOnServer);
                            if (dataSourceGroup) dataSourceGroup.queuedExecutions.push(query); else {
                                var newDataSourceGroup = {
                                    dataSources: query.options.dataSources,
                                    queuedExecutions: [ query ],
                                    cacheResponseOnServer: query.options.cacheResponseOnServer
                                };
                                dataSourceGroups.push(newDataSourceGroup);
                            }
                        }
                    }
                    return dataSourceGroups;
                }, ExecuteSemanticQueryBatcher.prototype.findDataSourceGroup = function(dataSources, dataSourceGroups, shouldCache) {
                    for (var i = 0, ilen = dataSourceGroups.length; i < ilen; ++i) {
                        var dataSourceGroup = dataSourceGroups[i];
                        if (JsonComparer.equals(dataSources, dataSourceGroup.dataSources) && dataSourceGroup.cacheResponseOnServer === shouldCache) return dataSourceGroup;
                    }
                    return null;
                }, ExecuteSemanticQueryBatcher.prototype.createBatchFromDataSourceGroup = function(dataSourceGroup) {
                    for (var queries = [], promises = [], queuedExecutions = dataSourceGroup.queuedExecutions, i = 0, ilen = queuedExecutions.length; i < ilen; ++i) {
                        var query = queuedExecutions[i], queryOptions = queuedExecutions[i].options;
                        queries.push(queryOptions.command), promises.push(query.deferred);
                    }
                    return {
                        dataSources: dataSourceGroup.dataSources,
                        queries: queries,
                        promises: promises,
                        cacheResponseOnServer: dataSourceGroup.cacheResponseOnServer
                    };
                }, ExecuteSemanticQueryBatcher.prototype.splitDataSourcesIntoBatches = function(dataSourceGroups, maxBatches) {
                    for (var batches = [], i = 0, ilen = dataSourceGroups.length; i < ilen; ++i) batches.push(this.createBatchFromDataSourceGroup(dataSourceGroups[i]));
                    return batches = this.splitBatches(batches, maxBatches);
                }, ExecuteSemanticQueryBatcher.prototype.splitBatches = function(initialBatches, maxBatches) {
                    for (var batches = initialBatches.slice(); batches.length < maxBatches; ) {
                        for (var splitCandidate = void 0, i = 0, ilen = batches.length; i < ilen; ++i) {
                            var batch = batches[i];
                            batch.queries.length > 1 && (!splitCandidate || splitCandidate.queries.length < batch.queries.length) && (splitCandidate = batch);
                        }
                        if (!splitCandidate) return batches;
                        batches.push(this.splitBatch(splitCandidate)), splitCandidate = null;
                    }
                    return batches;
                }, ExecuteSemanticQueryBatcher.prototype.splitBatch = function(batch) {
                    var queryCount = batch.queries.length, queries = batch.queries.splice(queryCount / 2), promises = batch.promises.splice(queryCount / 2);
                    return {
                        dataSources: batch.dataSources,
                        queries: queries,
                        promises: promises,
                        cacheResponseOnServer: batch.cacheResponseOnServer
                    };
                }, ExecuteSemanticQueryBatcher;
            }();
            dsr.ExecuteSemanticQueryBatcher = ExecuteSemanticQueryBatcher;
        }(dsr = data.dsr || (data.dsr = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data_10) {
        var dsr;
        !function(dsr) {
            function createExecuteSemanticQueryProxyHttpCommunication(httpService, telemetryService, promiseFactory, uri, impersonationStateProvisioner) {
                return new ExecuteSemanticQueryProxyHttpCommunication(httpService, telemetryService, promiseFactory, uri, impersonationStateProvisioner);
            }
            function single(dataSources) {
                return _.first(dataSources);
            }
            var ClientErrorStrings = powerbi.ClientErrorStrings, HttpUtils = jsCommon.HttpUtils;
            dsr.createExecuteSemanticQueryProxyHttpCommunication = createExecuteSemanticQueryProxyHttpCommunication;
            var ExecuteSemanticQueryProxyHttpCommunication = function() {
                function ExecuteSemanticQueryProxyHttpCommunication(httpService, telemetryService, promiseFactory, uri, impersonationStateProvider) {
                    this.httpService = httpService, this.impersonationStateProvider = impersonationStateProvider, 
                    this.promiseFactory = promiseFactory, this.telemetryService = telemetryService, 
                    this.uri = uri;
                }
                return ExecuteSemanticQueryProxyHttpCommunication.prototype.execute = function(queries, dataSources, cacheResponse) {
                    var _this = this, requestOptions = this.httpService.powerbiRequestOptions(null, "ExecuteSemanticQuery"), executeSemanticQueryRequest = dsr.generateSemanticQueryRequest(queries, dataSources, cacheResponse, this.impersonationStateProvider), httpPromiseWrapper = this.promiseFactory.defer(), postEvent = this.telemetryService.startEvent(powerbi.telemetry.DataQueryData, this.uri, !0, null, null);
                    return this.httpService.post(this.uri, executeSemanticQueryRequest, requestOptions).then(function(result) {
                        _this.attachHttpMetadataToTelemetry(postEvent.event, result), postEvent.resolve(), 
                        httpPromiseWrapper.resolve(_this.attachHttpMetadataToResult(result));
                    }, function(result) {
                        _this.attachHttpMetadataToTelemetry(postEvent.event, result), postEvent.reject(powerbi.errorDetailsHelper.getTelemetryErrorDetails(result.error, result.status)), 
                        httpPromiseWrapper.reject(_this.attachHttpMetadataToResult(result));
                    }), httpPromiseWrapper.promise;
                }, ExecuteSemanticQueryProxyHttpCommunication.prototype.attachHttpMetadataToTelemetry = function(event, result) {
                    event.info.endPoint = this.uri, event.info.clientAndServerRequestIdMatch = HttpUtils.clientAndServerRequestIdMatch(result), 
                    event.info.responseRequestId = HttpUtils.getResponseRequestId(result), event.info.requestId = result.requestId;
                }, ExecuteSemanticQueryProxyHttpCommunication.prototype.attachHttpMetadataToResult = function(httpResult) {
                    if (httpResult && httpResult.data) {
                        var queryResult = httpResult.data;
                        return queryResult.requestId = httpResult.responseRequestId || httpResult.requestId, 
                        queryResult.httpStatusCode = httpResult.status, queryResult;
                    }
                    return {
                        jobIds: null,
                        results: null,
                        requestId: httpResult.responseRequestId || httpResult.requestId,
                        httpStatusCode: httpResult.status
                    };
                }, ExecuteSemanticQueryProxyHttpCommunication;
            }(), defaultPreferredMaxConnections = 4, ExecuteSemanticQueryProxy = function() {
                function ExecuteSemanticQueryProxy(host, communication, delayedResultHandler, timerFactory, preferredMaxConnections) {
                    void 0 === preferredMaxConnections && (preferredMaxConnections = defaultPreferredMaxConnections);
                    var _this = this;
                    this.promiseFactory = host.promiseFactory(), this.communication = communication, 
                    this.delayedResultHandler = delayedResultHandler ? delayedResultHandler : new DefaultDelayedQueryResultHandler(), 
                    this.batcher = new dsr.ExecuteSemanticQueryBatcher(preferredMaxConnections, function(batches) {
                        for (var i = 0, ilen = batches.length; i < ilen; ++i) _this.executeBatch(batches[i]);
                    }, timerFactory), this.queryCache = dsr.createQueryCache(this.promiseFactory, function(options, deferredPromise) {
                        var queuedExecution = {
                            options: options,
                            deferred: deferredPromise.deferred,
                            execution: deferredPromise.promise
                        };
                        _this.isCommunicationStopped ? (_this.pausedQueries = _this.pausedQueries || [], 
                        _this.pausedQueries.push(queuedExecution)) : _this.batcher.enqueue(queuedExecution);
                    });
                }
                return ExecuteSemanticQueryProxy.prototype.execute = function(options) {
                    if (!_.isEmpty(options.dataSources)) return this.queryCache.ensure(options);
                    var deferred = this.promiseFactory.defer(), execution = powerbi.RejectablePromise2(deferred);
                    return deferred.resolve(options.command), execution;
                }, ExecuteSemanticQueryProxy.prototype.stopCommunication = function() {
                    this.isCommunicationStopped = !0;
                }, ExecuteSemanticQueryProxy.prototype.resumeCommunication = function() {
                    this.isCommunicationStopped = !1;
                    var pausedQueries = this.pausedQueries;
                    if (pausedQueries) {
                        for (var i = 0, length_1 = pausedQueries.length; i < length_1; i++) {
                            var queuedExecution = pausedQueries[i];
                            queuedExecution.execution.pending() && this.batcher.enqueue(queuedExecution);
                        }
                        this.pausedQueries = void 0;
                    }
                }, ExecuteSemanticQueryProxy.prototype.cache = function() {
                    return this.queryCache;
                }, ExecuteSemanticQueryProxy.prototype.setLocalCacheResult = function(options, dataAsObject) {
                    this.queryCache.put(options.dataSources, options.command, dataAsObject);
                }, ExecuteSemanticQueryProxy.prototype.executeBatch = function(batch) {
                    var _this = this, promises = batch.promises;
                    this.communication.execute(batch.queries, batch.dataSources, batch.cacheResponseOnServer).then(function(result) {
                        return _this.onSuccess(result, promises);
                    }, function(result) {
                        return _this.onError(result, promises);
                    });
                }, ExecuteSemanticQueryProxy.prototype.onSuccess = function(result, executions) {
                    this.rejectExecutionsForMissingJobs(result, executions);
                    for (var jobIds = result.jobIds, jobIdToExecution = {}, i = 0, ilen = executions.length; i < ilen; ++i) jobIdToExecution[jobIds[i]] = executions[i];
                    for (var results = result.results, i = 0, ilen = results.length; i < ilen; ++i) {
                        var queryResultWithJobId = results[i], queryResult = queryResultWithJobId.result, jobId = queryResultWithJobId.jobId, execution = jobIdToExecution[jobId];
                        delete jobIdToExecution[jobId];
                        var data_11 = queryResult.data, error = queryResult.error;
                        if (data_11) {
                            var dsrData = {
                                descriptor: data_11.descriptor,
                                dsr: data_11.dsr,
                                requestId: result.requestId
                            };
                            execution.resolve(dsrData);
                        } else if (error) {
                            var errorFactory = new powerbi.ServiceErrorToClientError(error);
                            errorFactory.requestId = result.requestId, execution.reject(errorFactory);
                        } else queryResult.asyncResult && this.delayedResultHandler.registerDelayedResult(queryResultWithJobId.jobId, execution);
                    }
                    if (!_.isEmpty(Object.keys(jobIdToExecution))) {
                        var error = new dsr.ExecuteSemanticQueryProxyError(result.requestId, "MissingJobResult");
                        for (var jobId in jobIdToExecution) jobIdToExecution[jobId].reject(error);
                    }
                }, ExecuteSemanticQueryProxy.prototype.rejectExecutionsForMissingJobs = function(result, executions) {
                    var jobIdsCount = result.jobIds.length, executionsCount = executions.length;
                    if (executionsCount > jobIdsCount) for (var error = new dsr.ExecuteSemanticQueryProxyError(result.requestId, "MissingJobId"), i = jobIdsCount; i < executionsCount; i++) executions[i].reject(error);
                }, ExecuteSemanticQueryProxy.prototype.onError = function(result, executions) {
                    var clientError;
                    if (result && result.requestError && (clientError = new powerbi.ServiceErrorToClientError(result.requestError)), 
                    clientError) clientError.requestId = result.requestId; else {
                        var message = result.error && result.error.message, errorCode = result.error && result.error.code;
                        clientError = result && null != result.httpStatusCode && result.requestId ? new powerbi.HttpClientError(result.httpStatusCode, result.requestId, errorCode, message) : new ExecuteSemanticQueryUnknownError(result.requestId);
                    }
                    for (var i = 0, len = executions.length; i < len; i++) executions[i].reject(clientError);
                }, ExecuteSemanticQueryProxy;
            }();
            dsr.ExecuteSemanticQueryProxy = ExecuteSemanticQueryProxy;
            var DefaultDelayedQueryResultHandler = function() {
                function DefaultDelayedQueryResultHandler() {}
                return DefaultDelayedQueryResultHandler.prototype.registerDelayedResult = function(jobId, deferred) {
                    deferred.reject(new DelayedQueryTimeoutError(jobId));
                }, DefaultDelayedQueryResultHandler.prototype.setQueryResolver = function(resolver) {}, 
                DefaultDelayedQueryResultHandler;
            }(), ExecuteSemanticQueryUnknownError = function(_super) {
                function ExecuteSemanticQueryUnknownError(requestId) {
                    var _this = this;
                    return _this = _super.call(this, "ExecuteSemanticQueryUnknownError") || this, _this.httpRequestId = requestId, 
                    _this;
                }
                return __extends(ExecuteSemanticQueryUnknownError, _super), Object.defineProperty(ExecuteSemanticQueryUnknownError.prototype, "requestId", {
                    get: function() {
                        return this.httpRequestId;
                    },
                    enumerable: !0,
                    configurable: !0
                }), ExecuteSemanticQueryUnknownError.prototype.getDetails = function(resourceProvider) {
                    var details = _super.prototype.getDetails.call(this, resourceProvider);
                    return details.debugErrorInfo = details.debugErrorInfo || [], details.debugErrorInfo.push({
                        errorInfoKey: ClientErrorStrings.HttpRequestId,
                        errorInfoValue: this.httpRequestId
                    }), details;
                }, ExecuteSemanticQueryUnknownError;
            }(powerbi.UnknownClientError), DelayedQueryTimeoutError = function(_super) {
                function DelayedQueryTimeoutError(jobId) {
                    var _this = this;
                    return _this = _super.call(this, "DelayedQueryTimeoutError") || this, _this.jobId = jobId, 
                    _this;
                }
                return __extends(DelayedQueryTimeoutError, _super), DelayedQueryTimeoutError.prototype.getDetails = function(resourceProvider) {
                    var details = _super.prototype.getDetails.call(this, resourceProvider);
                    return details.debugErrorInfo = details.debugErrorInfo || [], details.debugErrorInfo.push({
                        errorInfoKey: ClientErrorStrings.JobId,
                        errorInfoValue: this.jobId
                    }), details;
                }, DelayedQueryTimeoutError;
            }(powerbi.UnknownClientError);
            dsr.single = single;
        }(dsr = data_10.dsr || (data_10.dsr = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var dsr;
        !function(dsr) {
            var ExecuteSemanticQueryProxyError = function() {
                function ExecuteSemanticQueryProxyError(requestId, errorCode) {
                    this.requestId = requestId, this.errorCode = errorCode;
                }
                return Object.defineProperty(ExecuteSemanticQueryProxyError.prototype, "code", {
                    get: function() {
                        return this.errorCode;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(ExecuteSemanticQueryProxyError.prototype, "ignorable", {
                    get: function() {
                        return !1;
                    },
                    enumerable: !0,
                    configurable: !0
                }), ExecuteSemanticQueryProxyError.prototype.getDetails = function(resourceProvider) {
                    var message = resourceProvider.get("ServiceError_CannotLoadVisual"), key = resourceProvider.get("ServiceError_ExecuteSemanticQueryErrorKey"), val = resourceProvider.get("ServiceError_ExecuteSemanticQueryErrorValue"), errorCodeKey = resourceProvider.get("AdditionalErrorInfo_ErrorText"), details = {
                        message: message,
                        displayableErrorInfo: [ {
                            errorInfoKey: key,
                            errorInfoValue: val
                        }, {
                            errorInfoKey: errorCodeKey,
                            errorInfoValue: this.code
                        } ],
                        debugErrorInfo: [ {
                            errorInfoKey: powerbi.ClientErrorStrings.ClientErrorCode,
                            errorInfoValue: this.code
                        } ]
                    };
                    return details;
                }, ExecuteSemanticQueryProxyError;
            }();
            dsr.ExecuteSemanticQueryProxyError = ExecuteSemanticQueryProxyError;
        }(dsr = data.dsr || (data.dsr = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var dsr;
        !function(dsr) {
            var AggregatesQueryRewriter, SQExprBuilder = powerbi.data.SQExprBuilder;
            !function(AggregatesQueryRewriter) {
                function run(item) {
                    var mappings = item.mappings;
                    if (1 !== mappings.length) return item;
                    var aggregatedColumns = findAggregateOnly(mappings[0]);
                    if (!aggregatedColumns) return item;
                    var queryRewrites = item.queryRewrites;
                    return queryRewrites || (queryRewrites = item.queryRewrites = []), applyAndCreateRewrites(item, aggregatedColumns.queryNames, queryRewrites), 
                    clearRewrittenRoleReferences(aggregatedColumns), item;
                }
                function findAggregateOnly(mapping) {
                    var queryNames, roles;
                    if (data.CompiledDataViewMapping.visitMapping(mapping, {
                        visitRole: function(role) {
                            if (role.aggregates && !_.isEmpty(role.items)) {
                                queryNames || (queryNames = {}, roles = []);
                                for (var _i = 0, _a = role.items; _i < _a.length; _i++) {
                                    var item = _a[_i];
                                    queryNames[item.queryName] = role.aggregates;
                                }
                                roles.push(role);
                            }
                        }
                    }), queryNames) return {
                        queryNames: queryNames,
                        roles: roles
                    };
                }
                function applyAndCreateRewrites(item, aggregatedQueryNames, queryRewrites) {
                    var originalSelect = item.query.select();
                    for (var aggregatedColumn in aggregatedQueryNames) {
                        var selectExpr = originalSelect.withName(aggregatedColumn).expr, desiredAggregates = aggregatedQueryNames[aggregatedColumn], addedAggregates = {};
                        desiredAggregates.min && (addedAggregates.min = addSelect(item, SQExprBuilder.aggregate(selectExpr, 3))), 
                        desiredAggregates.max && (addedAggregates.max = addSelect(item, SQExprBuilder.aggregate(selectExpr, 4))), 
                        queryRewrites.push({
                            aggregatesAdded: {
                                originalQueryRef: aggregatedColumn,
                                aggregates: addedAggregates
                            }
                        });
                    }
                }
                function addSelect(item, newExpr) {
                    item.query = item.query.addSelect(newExpr);
                    var selects = item.query.select(), selectIndex = data.SQExprUtils.indexOfNamedExpr(selects, newExpr), newSelect = selects[selectIndex], additionalProjections = item.additionalProjections;
                    return additionalProjections || (additionalProjections = item.additionalProjections = []), 
                    additionalProjections.push({
                        queryName: newSelect.name,
                        selector: null
                    }), {
                        index: selectIndex,
                        expr: newExpr,
                        queryName: newSelect.name
                    };
                }
                function clearRewrittenRoleReferences(aggregatedColumns) {
                    for (var aggregatedQueryNames = aggregatedColumns.queryNames, _i = 0, _a = aggregatedColumns.roles; _i < _a.length; _i++) {
                        var role = _a[_i];
                        _.remove(role.items, function(roleItem) {
                            return aggregatedQueryNames[roleItem.queryName];
                        });
                    }
                }
                AggregatesQueryRewriter.run = run;
            }(AggregatesQueryRewriter = dsr.AggregatesQueryRewriter || (dsr.AggregatesQueryRewriter = {}));
        }(dsr = data.dsr || (data.dsr = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var dsr;
        !function(dsr) {
            function rewriteQueryWithMultiMapping(query, mappings, additionalProjections) {
                for (var categories = [], values = [], valueGrouped = {
                    by: null,
                    select: []
                }, mergedMapping = {
                    categories: {
                        select: categories
                    },
                    values: {
                        group: valueGrouped,
                        select: values
                    }
                }, categoricalProjectionUsages = {}, _i = 0, mappings_1 = mappings; _i < mappings_1.length; _i++) {
                    var currentMapping = mappings_1[_i];
                    if (!currentMapping.categorical) return;
                    var currentCategorical = currentMapping.categorical;
                    registerProjectionUsages(currentCategorical, categoricalProjectionUsages, categories, values, valueGrouped), 
                    null != currentCategorical.dataVolume && null == mergedMapping.dataVolume && (mergedMapping.dataVolume = currentCategorical.dataVolume);
                }
                var queryRewriteRecords = [];
                for (var queryRef in categoricalProjectionUsages) {
                    var usages = categoricalProjectionUsages[queryRef];
                    if (!_.isEmpty(usages.categoryAndValueGroup) && !_.isEmpty(usages.categoryOnly)) for (var _a = 0, _b = usages.categoryAndValueGroup; _a < _b.length; _a++) {
                        var categoryAndValueGroupItem = _b[_a], selectClause = query.select();
                        query = query.addSelect(selectClause.withName(queryRef).expr);
                        var updatedSelectClause = query.select(), newSelectIndex = updatedSelectClause.length - 1, newSelectSqExpr = updatedSelectClause[newSelectIndex], oldQueryRef = categoryAndValueGroupItem.roleItem.queryName;
                        categoryAndValueGroupItem.roleItem.queryName = newSelectSqExpr.name, queryRewriteRecords.push({
                            selectExprAdded: {
                                selectIndex: newSelectIndex,
                                namedSQExpr: newSelectSqExpr
                            }
                        }), queryRewriteRecords.push({
                            projectionQueryRefChanged: {
                                role: categoryAndValueGroupItem.roleName,
                                oldQueryRef: oldQueryRef,
                                newInternalQueryRef: categoryAndValueGroupItem.roleItem.queryName
                            }
                        });
                    }
                }
                return {
                    query: query,
                    mappings: [ {
                        metadata: mappings[0].metadata,
                        categorical: mergedMapping
                    } ],
                    queryRewrites: _.isEmpty(queryRewriteRecords) ? void 0 : queryRewriteRecords,
                    additionalProjections: additionalProjections
                };
            }
            function registerProjectionUsages(mapping, categoricalProjectionUsages, categories, values, valueGrouped) {
                var mappingValues = mapping.values;
                if (mappingValues) {
                    data.CompiledDataViewMapping.visitCategoricalCategories(mapping.categories, {
                        visitRole: function(role) {
                            includeMapping(categories, role);
                        }
                    });
                    var hasGrouped;
                    data.CompiledDataViewMapping.visitGrouped(mappingValues, {
                        visitRole: function(role) {
                            if (valueGrouped.by = role, role.items) for (var _i = 0, _a = role.items; _i < _a.length; _i++) {
                                var item = _a[_i];
                                registerUsages(categoricalProjectionUsages, role.role, item, !0), hasGrouped = !0;
                            }
                        }
                    }), data.CompiledDataViewMapping.visitCategoricalValues(mappingValues, {
                        visitRole: function(role, context) {
                            var roles = 1 === context ? valueGrouped.select : values;
                            if (includeMapping(roles, role), role.items) for (var _i = 0, _a = role.items; _i < _a.length; _i++) {
                                var item = _a[_i];
                                registerUsages(categoricalProjectionUsages, role.role, item, hasGrouped);
                            }
                        }
                    });
                }
            }
            function registerUsages(categoricalProjectionUsages, roleName, roleItem, isValueGroupScope) {
                var queryName = roleItem.queryName, usages = categoricalProjectionUsages[queryName];
                usages || (usages = categoricalProjectionUsages[queryName] = {
                    categoryAndValueGroup: [],
                    categoryOnly: []
                });
                var newEntry = {
                    roleName: roleName,
                    roleItem: roleItem
                };
                isValueGroupScope ? usages.categoryAndValueGroup.push(newEntry) : usages.categoryOnly.push(newEntry);
            }
            function includeMapping(roles, role) {
                for (var roleToAdd = {
                    for: {
                        in: role
                    }
                }, _i = 0, roles_2 = roles; _i < roles_2.length; _i++) {
                    var existingRoleMapping = roles_2[_i];
                    if (JsonComparer.equals(existingRoleMapping, roleToAdd)) return;
                }
                roles.push(roleToAdd);
            }
            var MultiMappedQueryRewriter, JsonComparer = jsCommon.JsonComparer;
            !function(MultiMappedQueryRewriter) {
                function run(item) {
                    var mappingsLength = item.mappings.length;
                    return 1 === mappingsLength ? item : mappingsLength > 1 ? rewriteQueryWithMultiMapping(item.query, item.mappings, item.additionalProjections) : void 0;
                }
                MultiMappedQueryRewriter.run = run;
            }(MultiMappedQueryRewriter = dsr.MultiMappedQueryRewriter || (dsr.MultiMappedQueryRewriter = {}));
        }(dsr = data.dsr || (data.dsr = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var dsr;
        !function(dsr) {
            function schemaName(property) {
                return property.Schema || dsr.DefaultSchemaName;
            }
            dsr.DefaultSchemaName = void 0, dsr.schemaName = schemaName;
            var SelectKind;
            !function(SelectKind) {
                SelectKind[SelectKind.None = 0] = "None", SelectKind[SelectKind.Group = 1] = "Group", 
                SelectKind[SelectKind.Measure = 2] = "Measure";
            }(SelectKind = dsr.SelectKind || (dsr.SelectKind = {}));
        }(dsr = data.dsr || (data.dsr = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var dsr;
        !function(dsr) {
            function traverseQueryBindingDescriptor(descriptior, visitor) {
                traverseQueryBindingDescriptorWithArg(descriptior, visitor, void 0);
            }
            function traverseQueryBindingDescriptorWithArg(descriptor, visitor, arg) {
                visitor.visitDescriptor(descriptor, arg);
                var selects = descriptor.Select;
                if (selects && selects.length) for (var i = 0, length_2 = selects.length; i < length_2; i++) visitor.visitSelect(selects[i], arg);
                var expressions = descriptor.Expressions;
                expressions && traverseExpressions(expressions, visitor, arg);
            }
            function traverseExpressions(expressions, visitor, arg) {
                visitor.visitExpressions(expressions, arg), traverseDataShapeExpressionsAxis(expressions.Primary, visitor, arg);
                var secondary = expressions.Secondary;
                secondary && traverseDataShapeExpressionsAxis(secondary, visitor, arg);
            }
            function traverseDataShapeExpressionsAxis(axis, visitor, arg) {
                visitor.visitDataShapeExpressionsAxis(axis, arg);
                for (var groupings = axis.Groupings, i = 0, length_3 = groupings.length; i < length_3; i++) traverseDataShapeExpressionsAxisGrouping(groupings[i], visitor, arg);
            }
            function traverseDataShapeExpressionsAxisGrouping(grouping, visitor, arg) {
                visitor.visitDataShapeExpressionsAxisGrouping(grouping, arg);
                for (var keys = grouping.Keys, i = 0, length_4 = keys.length; i < length_4; i++) traverseDataShapeExpressionsAxisGroupingKey(keys[i], visitor, arg);
            }
            function traverseDataShapeExpressionsAxisGroupingKey(groupingKey, visitor, arg) {
                visitor.visitDataShapeExpressionsAxisGroupingKey(groupingKey, arg), visitor.visitConceptualPropertyReference(groupingKey.Source, arg);
            }
            dsr.traverseQueryBindingDescriptor = traverseQueryBindingDescriptor, dsr.traverseQueryBindingDescriptorWithArg = traverseQueryBindingDescriptorWithArg;
            var DefaultQueryBindingDescriptorVisitorWithArg = function() {
                function DefaultQueryBindingDescriptorVisitorWithArg() {}
                return DefaultQueryBindingDescriptorVisitorWithArg.prototype.visitDescriptor = function(discriptor, arg) {}, 
                DefaultQueryBindingDescriptorVisitorWithArg.prototype.visitSelect = function(select, arg) {}, 
                DefaultQueryBindingDescriptorVisitorWithArg.prototype.visitExpressions = function(expressions, arg) {}, 
                DefaultQueryBindingDescriptorVisitorWithArg.prototype.visitDataShapeExpressionsAxis = function(axis, arg) {}, 
                DefaultQueryBindingDescriptorVisitorWithArg.prototype.visitDataShapeExpressionsAxisGrouping = function(grouping, arg) {}, 
                DefaultQueryBindingDescriptorVisitorWithArg.prototype.visitDataShapeExpressionsAxisGroupingKey = function(groupingKey, arg) {}, 
                DefaultQueryBindingDescriptorVisitorWithArg.prototype.visitConceptualPropertyReference = function(propertyRef, arg) {}, 
                DefaultQueryBindingDescriptorVisitorWithArg;
            }();
            dsr.DefaultQueryBindingDescriptorVisitorWithArg = DefaultQueryBindingDescriptorVisitorWithArg;
            var DefaultQueryBindingDescriptorVisitor = function(_super) {
                function DefaultQueryBindingDescriptorVisitor() {
                    return null !== _super && _super.apply(this, arguments) || this;
                }
                return __extends(DefaultQueryBindingDescriptorVisitor, _super), DefaultQueryBindingDescriptorVisitor;
            }(DefaultQueryBindingDescriptorVisitorWithArg);
            dsr.DefaultQueryBindingDescriptorVisitor = DefaultQueryBindingDescriptorVisitor;
        }(dsr = data.dsr || (data.dsr = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var dsr;
        !function(dsr) {
            function createQueryCacheHandler() {
                return new QueryCacheHandler();
            }
            function createQueryBindingDescriptorRewriters(changes) {
                for (var rewriters = [], i = 0, length_7 = changes.length; i < length_7; i++) {
                    var change = changes[i];
                    change.entityRename && rewriters.push(new QueryBindingDescriptorEntityRewriter(change.entityRename)), 
                    change.propertyRename && rewriters.push(new QueryBindingDescriptorPropertyRewriter(change.propertyRename));
                }
                return rewriters;
            }
            dsr.createQueryCacheHandler = createQueryCacheHandler;
            var QueryCacheHandler = function() {
                function QueryCacheHandler() {}
                return QueryCacheHandler.prototype.apply = function(queryProxy, dataSources, changes) {
                    var rewriter = new QueryCacheRewriter(changes);
                    queryProxy.rewriteCacheEntries("dsr", dataSources, rewriter);
                }, QueryCacheHandler;
            }(), QueryCacheRewriter = function() {
                function QueryCacheRewriter(changes) {
                    this.descriptorRewriters = createQueryBindingDescriptorRewriters(changes), this.schemaRewriters = data.createSchemaChangeRewriters(changes);
                }
                return QueryCacheRewriter.prototype.rewriteDataQueryCacheKey = function(dataQuery) {
                    return dataQuery.Commands[0].SemanticQueryDataShapeCommand = this.rewriteCacheKey(dataQuery.Commands[0].SemanticQueryDataShapeCommand), 
                    dataQuery;
                }, QueryCacheRewriter.prototype.rewriteCacheKey = function(command) {
                    for (var semanticQuerySerializer = data.services.SemanticQuerySerializer, rewriters = this.schemaRewriters, query = semanticQuerySerializer.deserializeQuery(command.Query), i = 0, length_5 = rewriters.length; i < length_5; i++) query = query.rewrite(rewriters[i]);
                    return command.Query = semanticQuerySerializer.serializeQuery(query), command;
                }, QueryCacheRewriter.prototype.rewriteCacheResult = function(result) {
                    for (var rewriters = this.descriptorRewriters, i = 0, length_6 = rewriters.length; i < length_6; i++) {
                        var rewriter = rewriters[i];
                        dsr.traverseQueryBindingDescriptor(result.descriptor, rewriter);
                    }
                    return result;
                }, QueryCacheRewriter;
            }(), QueryBindingDescriptorEntityRewriter = function(_super) {
                function QueryBindingDescriptorEntityRewriter(change) {
                    var _this = _super.call(this) || this;
                    return _this.change = change, _this;
                }
                return __extends(QueryBindingDescriptorEntityRewriter, _super), QueryBindingDescriptorEntityRewriter.prototype.visitConceptualPropertyReference = function(propertyRef) {
                    this.change.schema === dsr.schemaName(propertyRef) && propertyRef.Entity === this.change.before && (propertyRef.Entity = this.change.after);
                }, QueryBindingDescriptorEntityRewriter;
            }(dsr.DefaultQueryBindingDescriptorVisitor), QueryBindingDescriptorPropertyRewriter = function(_super) {
                function QueryBindingDescriptorPropertyRewriter(change) {
                    var _this = _super.call(this) || this;
                    return _this.change = change, _this;
                }
                return __extends(QueryBindingDescriptorPropertyRewriter, _super), QueryBindingDescriptorPropertyRewriter.prototype.visitConceptualPropertyReference = function(propertyRef) {
                    this.change.schema === dsr.schemaName(propertyRef) && propertyRef.Property === this.change.before && (propertyRef.Property = this.change.after);
                }, QueryBindingDescriptorPropertyRewriter;
            }(dsr.DefaultQueryBindingDescriptorVisitor);
        }(dsr = data.dsr || (data.dsr = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var dsr;
        !function(dsr) {
            var ArrayExtensions = jsCommon.ArrayExtensions, QueryDescription = function() {
                function QueryDescription(metadata, binding) {
                    !binding.ScriptVisualBinding, this._metadata = metadata, this._binding = binding;
                }
                return QueryDescription.prototype.getSelectRestatements = function() {
                    return this.getRestatements();
                }, QueryDescription.prototype.getGroupRestatements = function() {
                    return this.getRestatements(dsr.SelectKind.Group);
                }, QueryDescription.prototype.getMeasureRestatements = function() {
                    return this.getRestatements(dsr.SelectKind.Measure);
                }, QueryDescription.prototype.getFilterRestatements = function() {
                    var filters = this._metadata.Filters;
                    if (_.isEmpty(filters)) return null;
                    for (var restatements = [], i = 0, len = filters.length; i < len; i++) {
                        var filter = filters[i];
                        restatements.push(filter ? filter.Restatement : "");
                    }
                    return ArrayExtensions.emptyToNull(restatements);
                }, QueryDescription.prototype.getRestatements = function(kind) {
                    var metadata = this._metadata, binding = this._binding, restatements = [];
                    if (!binding.ScriptVisualBinding) for (var i = 0, len = metadata.Select.length; i < len; i++) {
                        var selectBinding = binding.Select[i], selectMetadata = metadata.Select[i];
                        selectBinding && (void 0 !== kind && selectBinding.Kind !== kind || restatements.push(selectMetadata.Restatement || ""));
                    }
                    return ArrayExtensions.emptyToNull(restatements);
                }, QueryDescription;
            }();
            dsr.QueryDescription = QueryDescription;
        }(dsr = data.dsr || (data.dsr = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var dsr;
        !function(dsr) {
            function createQueryGenerator() {
                return new QueryGenerator(data.services.SemanticQuerySerializer);
            }
            function generateDataShapeBinding(serializer, indicesByName, mapping, querySelects, additionalProjections, highlightFilter, restartToken, queryGroupBy, dataVolumeOverride) {
                var rewrittenHighlightFilter = highlightFilter;
                if (highlightFilter) for (var _i = 0, _a = getClientExprRewriters([ mapping ], querySelects); _i < _a.length; _i++) {
                    var rewriter = _a[_i];
                    rewrittenHighlightFilter = rewrittenHighlightFilter.rewrite(rewriter);
                }
                var serializedHighlightFilter;
                return highlightFilter && (serializedHighlightFilter = [ serializer.serializeFilter(rewrittenHighlightFilter) ]), 
                Impl.generateBaseDataShapeBinding(indicesByName, mapping, querySelects, additionalProjections, serializedHighlightFilter, restartToken, queryGroupBy, dataVolumeOverride);
            }
            function pruneQuery(query) {
                for (var updatedSelect, selects = query.select(), i = selects.length - 1; i >= 0; i--) SQExpr.isConstant(selects[i].expr) && (selects.splice(i, 1), 
                updatedSelect = !0);
                return updatedSelect ? query.select(selects) : query;
            }
            function getClientExprRewriters(mappings, selects) {
                return [ new RemoveWithRefSQExprVisitor(), new SQRoleRefRewriter(mappings, selects), new SQGroupRefToColumnRefRewriter() ];
            }
            var ArrayExtensions = jsCommon.ArrayExtensions, FilterKindDetector = powerbi.data.FilterKindDetector, SQExpr = powerbi.data.SQExpr;
            dsr.createQueryGenerator = createQueryGenerator;
            var DataLimitForGroupByQuery = 1e3, QueryGenerator = function() {
                function QueryGenerator(serializer) {
                    this.serializer = serializer;
                }
                return QueryGenerator.prototype.execute = function(options) {
                    var result = this.executeForQueryOnlyImpl(options);
                    if (result) {
                        var mergedQueries = result.mergedQueries, dataShapeBinding = result.dataShapeBinding, query = result.query;
                        return this.adjustIntersectionDataReduction(dataShapeBinding, mergedQueries.mapping, query, options.highVolumeOverride), 
                        _.isEmpty(query.groupBy()) || this.applyDataReductionForGroupByQuery(dataShapeBinding, query), 
                        {
                            command: this.createDataQuery(query, result.queryExtensionSchema, dataShapeBinding, result.compiledDataViewMappings, options.dataWindow),
                            splits: mergedQueries.splits,
                            queryRewrites: result.queryRewrites
                        };
                    }
                }, QueryGenerator.prototype.executeForQueryOnly = function(options) {
                    var result = this.executeForQueryOnlyImpl(options);
                    return result && result.query;
                }, QueryGenerator.prototype.executeForQueryOnlyImpl = function(options) {
                    var supportedMappings = this.getQueryableMappings(options.mappings), _a = this.prepareQuery(options.query, supportedMappings, options.additionalProjections), query = _a.query, mappings = _a.mappings, queryRewrites = _a.queryRewrites, additionalProjections = _a.additionalProjections, indicesByName = Impl.getIndicesByName(query), mergedQueries = dsr.mergeMappings(supportedMappings, indicesByName);
                    data.applyDataReductionDefaults(options.mappings);
                    var dataVolumeOverride;
                    options.highVolumeOverride && (dataVolumeOverride = 6), mergedQueries.mapping.categorical && Impl.updateMappingsWithScalarKeys(mergedQueries.mapping, indicesByName);
                    var dataShapeBinding = generateDataShapeBinding(this.serializer, indicesByName, mergedQueries.mapping, query.select(), additionalProjections, options.highlightFilter, options.restartToken, query.groupBy(), dataVolumeOverride);
                    return data.DataViewPivotCategoricalToPrimaryGroups.pivotBinding(dataShapeBinding, mappings, mergedQueries.mapping, query.select(), 3, dataVolumeOverride), 
                    this.queryHasMeasureFilter(query) && this.processTargetsForMeasureFilters(query, mappings, dataShapeBinding), 
                    {
                        query: query,
                        queryExtensionSchema: options.queryExtensionLookup && options.queryExtensionLookup(query),
                        mergedQueries: mergedQueries,
                        dataShapeBinding: dataShapeBinding,
                        compiledDataViewMappings: mappings,
                        queryRewrites: queryRewrites
                    };
                }, QueryGenerator.prototype.hasAmbiguousEqualitySemantics = function(value) {
                    return SQExpr.equals(value, data.SQExprBuilder.boolean(!1)) || SQExpr.equals(value, data.SQExprBuilder.integer(0));
                }, QueryGenerator.prototype.getQueryableMappings = function(compiledMappings) {
                    var supportedMappings = _.filter(compiledMappings, function(mapping) {
                        return !mapping.usage || !mapping.usage.regression;
                    });
                    return supportedMappings;
                }, QueryGenerator.prototype.prepareQuery = function(query, mappings, additionalProjections) {
                    for (var _i = 0, _a = getClientExprRewriters(mappings, query.select()); _i < _a.length; _i++) {
                        var rewriter = _a[_i];
                        query = query.rewrite(rewriter);
                    }
                    var rewrittenQuery = this.rewriteQuery(query, mappings, additionalProjections);
                    return rewrittenQuery.query = pruneQuery(rewrittenQuery.query), rewrittenQuery;
                }, QueryGenerator.prototype.rewriteQuery = function(query, mappings, additionalProjections) {
                    var rewritten = {
                        query: query,
                        mappings: mappings,
                        additionalProjections: additionalProjections
                    };
                    return rewritten = dsr.MultiMappedQueryRewriter.run(rewritten), rewritten = dsr.AggregatesQueryRewriter.run(rewritten);
                }, QueryGenerator.prototype.adjustIntersectionDataReduction = function(binding, mapping, query, highVolumeOverride) {
                    if (mapping.categorical) {
                        var categoricalMapping = mapping.categorical;
                        if (categoricalMapping.dataReductionAlgorithm) if (binding.DataReduction && binding.DataReduction.Intersection) binding.Primary && !binding.Secondary && (binding.DataReduction.Primary = binding.DataReduction.Intersection, 
                        binding.DataReduction.Intersection = void 0); else {
                            var defaultPrimary = binding.Primary && (!binding.DataReduction || !binding.DataReduction.Primary), defaultSecondary = binding.Secondary && (!binding.DataReduction || !binding.DataReduction.Secondary);
                            if (!defaultPrimary && !defaultSecondary) return;
                            binding.DataReduction || (binding.DataReduction = {
                                DataVolume: categoricalMapping.dataVolume || (highVolumeOverride ? 6 : 3)
                            }), defaultPrimary && (binding.DataReduction.Primary = data.DataShapeBindingDataReduction.createFrom(categoricalMapping.dataReductionAlgorithm, query.select())), 
                            defaultSecondary && (binding.DataReduction.Secondary = data.DataShapeBindingDataReduction.createFrom(categoricalMapping.dataReductionAlgorithm, query.select()));
                        }
                    }
                }, QueryGenerator.prototype.applyDataReductionForGroupByQuery = function(binding, query) {
                    binding.DataReduction = {}, binding.DataReduction.Primary = data.DataShapeBindingDataReduction.createFrom({
                        top: {
                            count: DataLimitForGroupByQuery
                        }
                    }, query.select());
                }, QueryGenerator.prototype.generateScriptVisualCommand = function(dataViewMappings, viewport) {
                    var scriptResult = powerbi.ScriptResultUtil.extractScriptResult(dataViewMappings);
                    if (scriptResult || (scriptResult = powerbi.ScriptResultUtil.extractScriptResultDefaultFromDataViewMappings(dataViewMappings)), 
                    !scriptResult) return null;
                    var scriptVisualCommand = {
                        Version: 0,
                        Script: scriptResult.source,
                        RenderingEngine: scriptResult.provider,
                        ScriptOutputType: scriptResult.outputType
                    };
                    viewport && viewport.height && viewport.width && (scriptVisualCommand.ViewportWidthPx = viewport.width, 
                    scriptVisualCommand.ViewportHeightPx = viewport.height);
                    var compiledScriptResultMapping = powerbi.ScriptResultUtil.findScriptResultMapping(dataViewMappings);
                    compiledScriptResultMapping && compiledScriptResultMapping.script.scriptInput && (scriptVisualCommand.ScriptInput = compiledScriptResultMapping.script.scriptInput);
                    var scriptVisualQueryCommand = {
                        ScriptVisualCommand: scriptVisualCommand
                    };
                    return scriptVisualQueryCommand;
                }, QueryGenerator.prototype.queryHasMeasureFilter = function(query) {
                    for (var _i = 0, _a = query.where(); _i < _a.length; _i++) {
                        var filter = _a[_i], filterKind = FilterKindDetector.run(filter.condition);
                        if (1 === filterKind) return !0;
                    }
                    return !1;
                }, QueryGenerator.prototype.removeExprFromTargetExprs = function(filters, expr) {
                    for (var _i = 0, filters_3 = filters; _i < filters_3.length; _i++) {
                        var filter = filters_3[_i], targets = filter.target;
                        if (null != targets) for (var i = 0, len = targets.length; i < len; i++) SQExpr.equals(targets[i], expr) && targets.splice(i, 1);
                    }
                }, QueryGenerator.prototype.processTargetsForMeasureFilters = function(query, mappings, binding) {
                    for (var _this = this, projectedSelectIndices = this.getProjectedSelectIndexMap(binding), _i = 0, mappings_2 = mappings; _i < mappings_2.length; _i++) {
                        var mapping = mappings_2[_i];
                        data.CompiledDataViewMapping.visitMapping(mapping, {
                            visitRole: function(role) {
                                var activeItems = role.activeItems, roleItems = role.items;
                                if (activeItems && !_.isEmpty(activeItems) && !_.isEmpty(roleItems)) for (var index = _.findIndex(roleItems, function(item) {
                                    return _.contains(activeItems, item.queryName);
                                }), i = 0; i < index; i++) {
                                    var projectionAtIndexQueryRef = roleItems[i].queryName, selects = query.select(), selectIndex = ArrayExtensions.indexWithName(selects, projectionAtIndexQueryRef);
                                    if (!projectedSelectIndices[selectIndex]) {
                                        var expr = selects[selectIndex].expr;
                                        _this.removeExprFromTargetExprs(query.where(), expr);
                                    }
                                }
                            }
                        });
                    }
                }, QueryGenerator.prototype.getProjectedSelectIndexMap = function(binding) {
                    if (!binding) return {};
                    var projectedSelectIndices = _.chain([ binding.Primary, binding.Secondary ]).filter(function(bindingAxis) {
                        return bindingAxis && !_.isEmpty(bindingAxis.Groupings);
                    }).map(function(bindingAxis) {
                        return bindingAxis.Groupings;
                    }).flatten().filter(function(grouping) {
                        return !_.isEmpty(grouping.Projections);
                    }).map(function(grouping) {
                        return grouping.Projections;
                    }).flatten(!1).reduce(function(projectedSelectIndices, projectedSelectIndex) {
                        return projectedSelectIndices[projectedSelectIndex] = !0, projectedSelectIndices;
                    }, {}).value();
                    return projectedSelectIndices;
                }, QueryGenerator.prototype.createDataQuery = function(query, extensionSchema, dataShapeBinding, mappings, viewport) {
                    var semanticQueryDataShapeCommand = {
                        Query: this.serializer.serializeQuery(query),
                        Binding: dataShapeBinding
                    };
                    extensionSchema && (semanticQueryDataShapeCommand.Extension = extensionSchema);
                    var queryCommand = {
                        SemanticQueryDataShapeCommand: semanticQueryDataShapeCommand
                    }, dataQuery = {
                        Commands: [ queryCommand ]
                    }, scriptVisualQueryCommand = this.generateScriptVisualCommand(mappings, viewport);
                    return scriptVisualQueryCommand && dataQuery.Commands.push(scriptVisualQueryCommand), 
                    dataQuery;
                }, QueryGenerator;
            }();
            dsr.generateDataShapeBinding = generateDataShapeBinding;
            var Impl;
            !function(Impl) {
                function generateBaseDataShapeBinding(indicesByName, mapping, querySelects, additionalProjections, highlightFilter, restartToken, queryGroupBy, dataVolumeOverride) {
                    var builder = new DataShapeBindingBuilder(indicesByName, querySelects).withRestartToken(restartToken).withHighlightFilter(highlightFilter).withAdditionalProjections(additionalProjections);
                    if (mapping.table && (builder = builder.withGroupBy(queryGroupBy)), mapping.categorical) forCategorical(builder, mapping.categorical); else if (mapping.table) forTable(builder, mapping.table); else if (mapping.matrix) forMatrix(builder, mapping.matrix); else if (mapping.tree) forTree(builder, mapping.tree); else if (mapping.scriptResult) return generateBaseDataShapeBinding(indicesByName, mapping.scriptResult.dataInput, querySelects, additionalProjections);
                    return dataVolumeOverride && builder.withDataVolume(dataVolumeOverride), builder.toBinding(mapping);
                }
                function forCategorical(builder, mapping) {
                    data.CompiledDataViewMapping.visitCategoricalCategories(mapping.categories, {
                        visitRole: function(role) {
                            builder.withPrimaryGrouping(role.items, role.activeItems, role.showAll, role.subtotalType, !0);
                        },
                        visitReduction: function(reductionAlgorithm) {
                            builder.withPrimaryDataReduction(reductionAlgorithm);
                        }
                    }), data.CompiledDataViewMapping.visitGrouped(mapping.values, {
                        visitRole: function(role) {
                            builder.withSecondaryGrouping(role.items, role.activeItems, role.showAll, role.subtotalType);
                        },
                        visitReduction: function(reductionAlgorithm) {
                            builder.withSecondaryDataReduction(reductionAlgorithm);
                        }
                    }), data.CompiledDataViewMapping.visitCategoricalValues(mapping.values, {
                        visitRole: function(role, context) {
                            builder.withInnermostGrouping(role.items, role.showAll, role.subtotalType, void 0, 1 !== context);
                        }
                    }), builder.withIntersectionDataReduction(mapping.dataReductionAlgorithm).withDataVolume(mapping.dataVolume).withIncludeEmptyGroups(mapping.includeEmptyGroups);
                }
                function forTable(builder, mapping) {
                    data.CompiledDataViewMapping.visitTable(mapping, {
                        visitRole: function(role) {
                            builder.withPrimaryGrouping(role.items, role.activeItems, role.showAll, role.subtotalType, !0);
                        },
                        visitReduction: function(reductionAlgorithm) {
                            builder.withPrimaryDataReduction(reductionAlgorithm);
                        }
                    }), builder.withDataVolume(mapping.dataVolume);
                }
                function forMatrix(builder, mapping) {
                    var matrixRowVisit = new MatrixWithCompositeMappingsVisitor(builder);
                    data.CompiledDataViewMapping.visitMatrixRows(mapping.rows, matrixRowVisit), data.CompiledDataViewMapping.visitMatrixColumns(mapping.columns, {
                        visitRole: function(role) {
                            builder.withSecondaryGroupingNested(role.items, role.activeItems, role.showAll, role.subtotalType);
                        },
                        visitReduction: function(reductionAlgorithm) {
                            builder.withSecondaryDataReduction(reductionAlgorithm);
                        }
                    }), data.CompiledDataViewMapping.visitMatrixValues(mapping.values, {
                        visitRole: function(role) {
                            builder.withInnermostGrouping(role.items, role.showAll, role.subtotalType, !0);
                        }
                    }), builder.withDataVolume(mapping.dataVolume);
                }
                function forTree(builder, mapping) {
                    data.CompiledDataViewMapping.visitTreeNodes(mapping.nodes, {
                        visitRole: function(role) {
                            builder.withPrimaryGroupingNested(role.items, role.activeItems, role.showAll, role.subtotalType);
                        },
                        visitReduction: function(reductionAlgorithm) {
                            builder.withPrimaryDataReduction(reductionAlgorithm);
                        }
                    }), data.CompiledDataViewMapping.visitTreeValues(mapping.values, {
                        visitRole: function(role) {
                            builder.withInnermostGrouping(role.items, role.showAll, role.subtotalType);
                        }
                    }), builder.withDataVolume(mapping.dataVolume);
                }
                function getIndicesByName(query) {
                    for (var result = {}, select = query.select(), groupBy = query.groupBy(), i = 0, len = select.length; i < len; i++) result[select[i].name] = i;
                    for (var i = 0, len = groupBy.length; i < len; i++) result[groupBy[i].name] = i;
                    return result;
                }
                function isReferencedAxis(projectionIdx, axis) {
                    if (axis) for (var _i = 0, _a = axis.Groupings; _i < _a.length; _i++) {
                        var grouping = _a[_i];
                        if (_.contains(grouping.Projections, projectionIdx)) return !0;
                    }
                }
                function convertSubtotalType(subtotalType) {
                    switch (subtotalType) {
                      case 1:
                        return 1;

                      case 2:
                        return 2;

                      case 0:
                        return;
                    }
                }
                function convertPercentile(percentile) {
                    var result = {
                        K: percentile.k
                    };
                    return percentile.exclusive && (result.Exclusive = percentile.exclusive), {
                        Percentile: result
                    };
                }
                function updateMappingsWithScalarKeys(mapping, indicesByName) {
                    var ScalarKeyFinder = function() {
                        function ScalarKeyFinder(indicesByName) {
                            this.indicesByName = indicesByName;
                        }
                        return ScalarKeyFinder.prototype.visitRole = function(role, context) {
                            if (!_.isEmpty(role.items)) {
                                for (var scalarKeyQueryName, _i = 0, _a = role.items; _i < _a.length; _i++) {
                                    var roleItem = _a[_i];
                                    roleItem.scalarKeyInfo && null != roleItem.scalarKeyInfo.scalarKeyQueryName && (scalarKeyQueryName = roleItem.scalarKeyInfo.scalarKeyQueryName);
                                }
                                scalarKeyQueryName && (this.primaryScalarKey = this.indicesByName[scalarKeyQueryName]);
                            }
                        }, ScalarKeyFinder;
                    }(), scalarKeyFinder = new ScalarKeyFinder(indicesByName);
                    data.CompiledDataViewMapping.visitMapping(mapping, scalarKeyFinder), null != scalarKeyFinder.primaryScalarKey && data.CompiledDataViewMapping.visitMapping(mapping, {
                        visitRole: function(role) {},
                        visitReduction: function(reductionAlgorithm) {
                            reductionAlgorithm.binnedLineSample && (reductionAlgorithm.binnedLineSample.primaryScalarKey = scalarKeyFinder.primaryScalarKey);
                        }
                    });
                }
                Impl.generateBaseDataShapeBinding = generateBaseDataShapeBinding;
                var MatrixWithCompositeMappingsVisitor = function() {
                    function MatrixWithCompositeMappingsVisitor(builder) {
                        this.inComposite = !1, this.startedCompositeNest = !1, this.builder = builder;
                    }
                    return MatrixWithCompositeMappingsVisitor.prototype.visitRole = function(role) {
                        if (this.inComposite) {
                            var appendToLastExistingLevel = this.startedCompositeNest;
                            this.startedCompositeNest = !0, this.builder.withPrimaryGrouping(role.items, role.activeItems, role.showAll, role.subtotalType, appendToLastExistingLevel);
                        } else this.builder.withPrimaryGroupingNested(role.items, role.activeItems, role.showAll, role.subtotalType);
                    }, MatrixWithCompositeMappingsVisitor.prototype.visitReduction = function(reductionAlgorithm) {
                        this.builder.withPrimaryDataReduction(reductionAlgorithm);
                    }, MatrixWithCompositeMappingsVisitor.prototype.enterComposite = function() {
                        this.inComposite = !0, this.startedCompositeNest = !1;
                    }, MatrixWithCompositeMappingsVisitor.prototype.exitComposite = function() {
                        this.inComposite = !1, this.startedCompositeNest = !1;
                    }, MatrixWithCompositeMappingsVisitor;
                }();
                Impl.getIndicesByName = getIndicesByName, Impl.updateMappingsWithScalarKeys = updateMappingsWithScalarKeys;
                var DataShapeBindingBuilder = function() {
                    function DataShapeBindingBuilder(indicesByName, querySelects) {
                        this.indicesByName = indicesByName, this.querySelects = querySelects, this.reduction = {
                            DataVolume: 3
                        }, this.joinPredicateBehaviors = [];
                    }
                    return DataShapeBindingBuilder.prototype.withRestartToken = function(restartToken) {
                        return this.restartToken = restartToken, this;
                    }, DataShapeBindingBuilder.prototype.withDataVolume = function(dataVolume) {
                        return null == dataVolume ? this : (this.reduction.DataVolume = dataVolume, this);
                    }, DataShapeBindingBuilder.prototype.withIncludeEmptyGroups = function(value) {
                        return this.includeEmptyGroups = value, this;
                    }, DataShapeBindingBuilder.prototype.withHighlightFilter = function(value) {
                        return this.highlightFilter = value, this;
                    }, DataShapeBindingBuilder.prototype.withGroupBy = function(queryGroupBy) {
                        return _.isEmpty(queryGroupBy) || (this.groupByNames = _.map(queryGroupBy, function(i) {
                            return i.name;
                        })), this;
                    }, DataShapeBindingBuilder.prototype.withPrimaryGrouping = function(items, activeProjections, showAll, roleSubtotalType, appendToLastExistingLevel) {
                        if (items = this.filterItems(items, activeProjections), _.isEmpty(items)) return this;
                        var grouping;
                        return this.primary ? appendToLastExistingLevel ? grouping = _.last(this.primary.Groupings) : (grouping = {
                            Projections: []
                        }, this.primary.Groupings.push(grouping)) : (grouping = {
                            Projections: []
                        }, this.primary = {
                            Groupings: [ grouping ]
                        }), this.updateGrouping(grouping, items, showAll, roleSubtotalType), this;
                    }, DataShapeBindingBuilder.prototype.withPrimaryGroupingNested = function(items, activeProjections, showAll, roleSubtotalType) {
                        if (items = this.filterItems(items, activeProjections), _.isEmpty(items)) return this;
                        this.primary || (this.primary = {
                            Groupings: []
                        });
                        var groupings;
                        return groupings = this.primary.Groupings, this.withNested(groupings, items, showAll, roleSubtotalType);
                    }, DataShapeBindingBuilder.prototype.withSecondaryGrouping = function(items, activeProjections, showAll, roleSubtotalType) {
                        if (items = this.filterItems(items, activeProjections), _.isEmpty(items)) return this;
                        var grouping;
                        if (this.primary) {
                            var innermostPrimary = _.last(this.primary.Groupings);
                            this.containsAll(innermostPrimary, items) ? grouping = innermostPrimary : (this.secondary || (this.secondary = {
                                Groupings: []
                            }), grouping = {
                                Projections: []
                            }, this.secondary.Groupings.push(grouping));
                        } else grouping = {
                            Projections: []
                        }, this.primary = {
                            Groupings: [ grouping ]
                        }, this.pivotedSecondaryToPrimary = !0;
                        return this.updateGrouping(grouping, items, showAll, roleSubtotalType), this;
                    }, DataShapeBindingBuilder.prototype.withSecondaryGroupingNested = function(items, activeProjections, showAll, roleSubtotalType) {
                        if (items = this.filterItems(items, activeProjections), _.isEmpty(items)) return this;
                        var groupings;
                        return this.primary ? (this.secondary || (this.secondary = {
                            Groupings: []
                        }), groupings = this.secondary.Groupings) : (groupings = [], this.primary = {
                            Groupings: groupings
                        }, this.pivotedSecondaryToPrimary = !0), this.withNested(groupings, items, showAll, roleSubtotalType);
                    }, DataShapeBindingBuilder.prototype.withInnermostGrouping = function(items, showAll, roleSubtotalType, preferSecondary, suppressSecondaryProjection) {
                        if (items = this.filterItems(items, null), _.isEmpty(items)) return this;
                        var grouping;
                        if (preferSecondary && this.secondary ? grouping = _.last(this.secondary.Groupings) : this.primary ? grouping = _.last(this.primary.Groupings) : (grouping = {
                            Projections: []
                        }, this.primary = {
                            Groupings: [ grouping ]
                        }), this.updateGrouping(grouping, items, showAll, roleSubtotalType), this.secondary && suppressSecondaryProjection) for (var innermostSecondary = _.last(this.secondary.Groupings), indicesByName = this.indicesByName, _i = 0, items_1 = items; _i < items_1.length; _i++) {
                            var item = items_1[_i];
                            this.addSuppressedProjection(innermostSecondary, indicesByName[item.queryName]);
                        }
                        return this;
                    }, DataShapeBindingBuilder.prototype.withPrimaryDataReduction = function(reductionAlgorithm) {
                        return reductionAlgorithm && this.primary ? (this.reduction.Primary = data.DataShapeBindingDataReduction.createFrom(reductionAlgorithm, this.querySelects), 
                        this) : this;
                    }, DataShapeBindingBuilder.prototype.withSecondaryDataReduction = function(reductionAlgorithm) {
                        return this.pivotedSecondaryToPrimary ? this.withPrimaryDataReduction(reductionAlgorithm) : reductionAlgorithm && this.secondary ? (this.reduction.Secondary = data.DataShapeBindingDataReduction.createFrom(reductionAlgorithm, this.querySelects), 
                        this) : this;
                    }, DataShapeBindingBuilder.prototype.withIntersectionDataReduction = function(reductionAlgorithm) {
                        return reductionAlgorithm ? this.reduction.Primary || this.reduction.Secondary ? this : reductionAlgorithm.binnedLineSample ? (this.reduction.Intersection = data.DataShapeBindingDataReduction.createFrom(reductionAlgorithm, this.querySelects), 
                        this) : this : this;
                    }, DataShapeBindingBuilder.prototype.updateGrouping = function(grouping, items, showAll, roleSubtotalType) {
                        this.addProjections(grouping.Projections, items);
                        var indicesByName = this.indicesByName;
                        if (showAll) {
                            grouping.ShowItemsWithNoData || (grouping.ShowItemsWithNoData = []);
                            for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
                                var item = items_2[_i];
                                ArrayExtensions.insertSorted(grouping.ShowItemsWithNoData, indicesByName[item.queryName]);
                            }
                        }
                        for (var subtotalType = items[0].subtotalType, i = 1, len = items.length; i < len; i++) if (items[i].subtotalType !== subtotalType) {
                            subtotalType = void 0;
                            break;
                        }
                        var subtotal = convertSubtotalType(null != subtotalType ? subtotalType : roleSubtotalType);
                        null != subtotal && (grouping.Subtotal = subtotal);
                        var groupByNames = this.groupByNames;
                        groupByNames && (grouping.GroupBy = _.map(groupByNames, function(i) {
                            return indicesByName[i];
                        }));
                    }, DataShapeBindingBuilder.prototype.withNested = function(groupings, items, showAll, roleSubtotalType) {
                        for (var _i = 0, items_3 = items; _i < items_3.length; _i++) {
                            var item = items_3[_i], grouping = {
                                Projections: []
                            };
                            this.updateGrouping(grouping, [ item ], showAll, roleSubtotalType), groupings.push(grouping);
                        }
                        return this;
                    }, DataShapeBindingBuilder.prototype.filterItems = function(items, activeProjections) {
                        if (!_.isEmpty(items)) {
                            items = _.uniq(items, function(item) {
                                return item.queryName;
                            });
                            var itemsFiltered, indicesByName = this.indicesByName;
                            activeProjections && (itemsFiltered = []);
                            for (var i = 0, len = items.length; i < len; i++) {
                                var item = items[i], indexToSkip = null, isInactiveItemProjection = activeProjections && !_.isEmpty(activeProjections) && !_.contains(activeProjections, item.queryName);
                                null == indicesByName[item.queryName] ? indexToSkip = i - 1 : (isInactiveItemProjection || this.isReferenced(item)) && (indexToSkip = i), 
                                null == indexToSkip ? itemsFiltered && itemsFiltered.push(item) : itemsFiltered || (itemsFiltered = indexToSkip < 0 ? [] : ArrayExtensions.range(items, 0, indexToSkip));
                            }
                            return itemsFiltered || items;
                        }
                    }, DataShapeBindingBuilder.prototype.isReferenced = function(item) {
                        var projectionIdx = this.indicesByName[item.queryName];
                        return isReferencedAxis(projectionIdx, this.primary) || isReferencedAxis(projectionIdx, this.secondary) || _.contains(this.projections, projectionIdx);
                    }, DataShapeBindingBuilder.prototype.containsAll = function(grouping, items) {
                        for (var projections = grouping.Projections, indicesByName = this.indicesByName, _i = 0, items_4 = items; _i < items_4.length; _i++) {
                            var item = items_4[_i];
                            if (!_.contains(projections, indicesByName[item.queryName])) return !1;
                        }
                        return !0;
                    }, DataShapeBindingBuilder.prototype.addProjections = function(projections, items) {
                        for (var indicesByName = this.indicesByName, _i = 0, items_5 = items; _i < items_5.length; _i++) {
                            var item = items_5[_i], projectionIdx = indicesByName[item.queryName];
                            ArrayExtensions.insertSorted(projections, projectionIdx), this.addJoinPredicateBehavior(projectionIdx, item.joinPredicate);
                        }
                    }, DataShapeBindingBuilder.prototype.addJoinPredicateBehavior = function(projectionIndex, behavior) {
                        this.joinPredicateBehaviors[projectionIndex] ? void 0 === behavior && (this.joinPredicateBehaviors[projectionIndex].behavior = behavior) : this.joinPredicateBehaviors[projectionIndex] = {
                            behavior: behavior
                        };
                    }, DataShapeBindingBuilder.prototype.withAdditionalProjections = function(additionalProjections) {
                        return _.isEmpty(additionalProjections) || (this.additionalProjections = additionalProjections), 
                        this;
                    }, DataShapeBindingBuilder.prototype.applyAdditional = function(mapping) {
                        var _this = this, querySelects = this.querySelects, additionalProjections = this.additionalProjections, activeQueryRefsByRole = CompiledDataViewMappingsByRole.findActive(mapping);
                        if (!_.isEmpty(additionalProjections)) for (var primary = this.primary, secondary = this.secondary, projections = this.projections, _i = 0, additionalProjections_1 = additionalProjections; _i < additionalProjections_1.length; _i++) {
                            var additionalProjection = additionalProjections_1[_i], scopeRefs = data.DataBoundObjectQueryExtender.getScopeRefs(additionalProjection.selector, querySelects, activeQueryRefsByRole), additionalProjectionIdx = this.indicesByName[additionalProjection.queryName];
                            if (this.applyAggregates(additionalProjectionIdx, additionalProjection.aggregates), 
                            null !== scopeRefs) {
                                var scopeRefIndices = _.map(scopeRefs, function(scopeRef) {
                                    return _this.indicesByName[scopeRef];
                                }), hasSecondary = secondary && !_.isEmpty(secondary.Groupings), addedProjectionToGroup = primary && this.addAdditional(additionalProjectionIdx, scopeRefIndices, primary.Groupings);
                                addedProjectionToGroup && hasSecondary && this.addSuppressedProjection(_.last(secondary.Groupings), additionalProjectionIdx), 
                                addedProjectionToGroup || (addedProjectionToGroup = hasSecondary && this.addAdditional(additionalProjectionIdx, scopeRefIndices, secondary.Groupings)), 
                                addedProjectionToGroup && this.addJoinPredicateBehavior(additionalProjectionIdx, additionalProjection.joinPredicate);
                            } else {
                                if (additionalProjection.aggregates) continue;
                                projections || (this.projections = projections = []), ArrayExtensions.insertSorted(projections, additionalProjectionIdx), 
                                this.addJoinPredicateBehavior(additionalProjectionIdx, additionalProjection.joinPredicate);
                            }
                        }
                    }, DataShapeBindingBuilder.prototype.addAdditional = function(projectionIdx, remainingScopeRefs, groupings) {
                        for (var groupingIdx = 0, len = groupings.length; groupingIdx < len; groupingIdx++) {
                            var grouping = groupings[groupingIdx], groupingProjections = grouping.Projections;
                            if (_.remove(remainingScopeRefs, function(index) {
                                return _.contains(groupingProjections, index);
                            }), 0 === remainingScopeRefs.length) return ArrayExtensions.insertSorted(_.last(groupings).Projections, projectionIdx), 
                            !0;
                        }
                        return !1;
                    }, DataShapeBindingBuilder.prototype.addSuppressedProjection = function(grouping, projectionIndex) {
                        grouping.SuppressedProjections || (grouping.SuppressedProjections = []), ArrayExtensions.insertSorted(grouping.SuppressedProjections, projectionIndex);
                    }, DataShapeBindingBuilder.prototype.applyAggregates = function(projectionIdx, aggregates) {
                        if (aggregates) {
                            var allAggregates = this.aggregates;
                            allAggregates || (allAggregates = this.aggregates = []);
                            var aggregateContainers = [], projectionAggregates = {
                                Select: projectionIdx,
                                Aggregations: aggregateContainers
                            };
                            if (aggregates.min && aggregateContainers.push({
                                Min: {}
                            }), aggregates.max && aggregateContainers.push({
                                Max: {}
                            }), aggregates.average && aggregateContainers.push({
                                Average: {}
                            }), aggregates.median && aggregateContainers.push({
                                Median: {}
                            }), aggregates.percentiles) for (var _i = 0, _a = aggregates.percentiles; _i < _a.length; _i++) {
                                var percentile = _a[_i];
                                aggregateContainers.push(convertPercentile(percentile));
                            }
                            allAggregates.push(projectionAggregates);
                        }
                    }, DataShapeBindingBuilder.prototype.toBinding = function(mapping) {
                        this.applyAdditional(mapping);
                        var primary = this.primary, projections = this.projections;
                        if (!primary) {
                            if (!projections) return;
                            primary = {
                                Groupings: [ {
                                    Projections: projections
                                } ]
                            }, projections = null;
                        }
                        var restartToken = this.restartToken;
                        restartToken && this.reduction.Primary && this.reduction.Primary.Window && (this.reduction.Primary.Window.RestartTokens = restartToken);
                        var binding = {
                            Primary: primary
                        };
                        this.secondary && (binding.Secondary = this.secondary), projections && (binding.Projections = projections), 
                        (this.reduction.Primary || this.reduction.Secondary || this.reduction.Intersection) && (binding.DataReduction = this.reduction), 
                        this.includeEmptyGroups && (binding.IncludeEmptyGroups = this.includeEmptyGroups);
                        var aggregates = this.aggregates;
                        aggregates && (binding.Aggregates = aggregates);
                        for (var suppressedJoinPredicates = [], i = 0; i < this.joinPredicateBehaviors.length; i++) this.joinPredicateBehaviors[i] && 0 === this.joinPredicateBehaviors[i].behavior && suppressedJoinPredicates.push(i);
                        return _.isEmpty(suppressedJoinPredicates) || (binding.SuppressedJoinPredicates = suppressedJoinPredicates), 
                        binding.Version = 1, this.highlightFilter && (binding.Highlights = this.highlightFilter), 
                        binding;
                    }, DataShapeBindingBuilder;
                }();
            }(Impl || (Impl = {}));
            var RemoveWithRefSQExprVisitor = function(_super) {
                function RemoveWithRefSQExprVisitor() {
                    return null !== _super && _super.apply(this, arguments) || this;
                }
                return __extends(RemoveWithRefSQExprVisitor, _super), RemoveWithRefSQExprVisitor.prototype.visitScopedEval = function(expr) {
                    return _.isEmpty(expr.scope) ? expr : data.SQExprBuilder.scopedEval(expr.expression, _.filter(expr.scope, function(expr) {
                        return !SQExpr.isWithRef(expr);
                    }));
                }, RemoveWithRefSQExprVisitor;
            }(data.SQExprRewriter), SQGroupRefToColumnRefRewriter = function(_super) {
                function SQGroupRefToColumnRefRewriter() {
                    return null !== _super && _super.apply(this, arguments) || this;
                }
                return __extends(SQGroupRefToColumnRefRewriter, _super), SQGroupRefToColumnRefRewriter.prototype.visitGroupRef = function(expr) {
                    return new data.SQColumnRefExpr(expr.source, expr.ref);
                }, SQGroupRefToColumnRefRewriter;
            }(data.SQExprRewriter), SQRoleRefRewriter = function(_super) {
                function SQRoleRefRewriter(mappings, selects) {
                    var _this = _super.call(this) || this;
                    return _this.mappings = mappings, _this.selects = selects, _this;
                }
                return __extends(SQRoleRefRewriter, _super), SQRoleRefRewriter.prototype.visitScopedEval = function(expr) {
                    for (var exprs = [], hasRoleRefs = !1, _i = 0, _a = expr.scope; _i < _a.length; _i++) {
                        var expression = _a[_i];
                        if (SQExpr.isRoleRef(expression)) {
                            hasRoleRefs = !0;
                            for (var _b = 0, _c = this.mappings; _b < _c.length; _b++) {
                                var mapping = _c[_b], activeQueryRefsByRole = CompiledDataViewMappingsByRole.findActive(mapping), queryRefs = activeQueryRefsByRole[expression.role];
                                if (queryRefs) for (var _loop_5 = function(queryRef) {
                                    var select = _.find(this_2.selects, function(select) {
                                        return select.name === queryRef;
                                    });
                                    select && exprs.push(select.expr);
                                }, this_2 = this, _d = 0, queryRefs_1 = queryRefs; _d < queryRefs_1.length; _d++) {
                                    var queryRef = queryRefs_1[_d];
                                    _loop_5(queryRef);
                                }
                            }
                        } else exprs.push(expression);
                    }
                    return hasRoleRefs ? data.SQExprBuilder.scopedEval(expr.expression, _.uniq(exprs, function(expr) {
                        return data.services.SemanticQuerySerializer.serializeExpr(expr);
                    })) : expr;
                }, SQRoleRefRewriter;
            }(data.SQExprRewriter), CompiledDataViewMappingsByRole = function() {
                function CompiledDataViewMappingsByRole() {
                    this.queryReferencesByRole = {};
                }
                return CompiledDataViewMappingsByRole.findActive = function(mapping) {
                    var compiledDataViewMappingVisitor = new CompiledDataViewMappingsByRole();
                    return data.CompiledDataViewMapping.visitMapping(mapping, compiledDataViewMappingVisitor), 
                    compiledDataViewMappingVisitor.queryReferencesByRole;
                }, CompiledDataViewMappingsByRole.prototype.visitRole = function(compiledDataViewRole, context) {
                    var roleItems = compiledDataViewRole.items;
                    _.isEmpty(compiledDataViewRole.activeItems) || (roleItems = _.filter(roleItems, function(r) {
                        return _.contains(compiledDataViewRole.activeItems, r.queryName);
                    })), this.queryReferencesByRole[compiledDataViewRole.role] = _.map(roleItems, function(roleItem) {
                        return roleItem.queryName;
                    });
                }, CompiledDataViewMappingsByRole;
            }();
        }(dsr = data.dsr || (data.dsr = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data_12) {
        var dsr;
        !function(dsr_4) {
            function createQueryCache(promiseFactory, createQuery) {
                return new QueryCache(promiseFactory, createQuery);
            }
            function containsRestartToken(algorithm) {
                return algorithm && algorithm.Window && null != algorithm.Window.RestartTokens;
            }
            function isDataReductionWindowOrUndefined(algorithm) {
                return !algorithm || !!algorithm.Window;
            }
            function completeWithAllData(dsr) {
                return !dsr_4.isDsrV2(dsr) && _.all(dsr.DataShapes, function(dataShape) {
                    return dataShape && dataShape.IsComplete && _.isEmpty(dataShape.DataLimitsExceeded) && !dataShape.RestartTokens;
                });
            }
            function safeDeserializeQuery(queryDefinition) {
                if (queryDefinition && queryDefinition.From && queryDefinition.Select) return data_12.services.SemanticQuerySerializer.deserializeQuery(queryDefinition);
            }
            dsr_4.createQueryCache = createQueryCache;
            var CacheItemContext, QueryCache = function() {
                function QueryCache(promiseFactory, createQuery) {
                    this.createQuery = createQuery, this.promiseFactory = promiseFactory, this.cacheByModel = {};
                }
                return QueryCache.prototype.ensure = function(options) {
                    var dataQuery = options.command, command = dataQuery.Commands[0].SemanticQueryDataShapeCommand, cache = this.ensureCache(options.dataSources), cacheKey = CacheItemContext.generateCacheKeyDataQuery(dataQuery);
                    if (cache.hasCacheEntry(cacheKey)) {
                        if (QueryCache.allowCacheOrDefault(options)) return cache.bindCacheEntry(cacheKey);
                        cache.clearEntry(cacheKey);
                    }
                    var entryContext = CacheItemContext.createCacheItemContext(dataQuery, cacheKey), equivalentCache = this.findEquivalentCache(options, cache, entryContext);
                    if (equivalentCache) return equivalentCache;
                    this.createQuery(options, cache.createCacheEntry(cacheKey, entryContext));
                    var promise = cache.bindCacheEntry(cacheKey);
                    return command.Binding && command.Binding.DataReduction && (containsRestartToken(command.Binding.DataReduction.Primary) || containsRestartToken(command.Binding.DataReduction.Secondary)) || promise.then(function(result) {
                        result && result.dsr && completeWithAllData(result.dsr) && (entryContext.hasAllData = !0);
                    }), promise;
                }, QueryCache.prototype.clear = function(dataSources) {
                    var cache = this.getCache(dataSources);
                    cache && cache.clearAllEntries();
                }, QueryCache.prototype.rewrite = function(dataSources, rewriter) {
                    var cache = this.getCache(dataSources);
                    if (cache) {
                        var cacheRewriter = {};
                        rewriter.rewriteCacheKey && rewriter.rewriteDataQueryCacheKey && (cacheRewriter.rewriteKey = function(cacheKey) {
                            var cacheKeyObject = JSON.parse(cacheKey), context = cache.getEntryContext(cacheKey);
                            if (context.compositeDataQuery) {
                                var dataQuery = cacheKeyObject, rewrittenDataQuery = rewriter.rewriteDataQueryCacheKey(dataQuery);
                                if (rewrittenDataQuery && rewrittenDataQuery !== dataQuery) {
                                    var rewrittenContext = CacheItemContext.createCacheItemContextForCompositeDataQuery(rewrittenDataQuery);
                                    _.assign(context, rewrittenContext);
                                }
                            } else {
                                var command = cacheKeyObject, rewrittenCommand = rewriter.rewriteCacheKey(command);
                                if (rewrittenCommand && rewrittenCommand !== command) {
                                    var rewrittenContext = CacheItemContext.createCacheItemContextForNonCompositeDataQuery(rewrittenCommand);
                                    _.assign(context, rewrittenContext);
                                }
                            }
                            return context.key;
                        }), rewriter.rewriteCacheResult && (cacheRewriter.rewriteResult = function(result, cacheKey) {
                            var data = result, rewrittenResult = rewriter.rewriteCacheResult({
                                descriptor: data.descriptor,
                                dsr: data.dsr
                            });
                            return rewrittenResult ? {
                                descriptor: rewrittenResult.descriptor,
                                dsr: rewrittenResult.dsr
                            } : {
                                descriptor: data.descriptor,
                                dsr: data.dsr
                            };
                        }), cache.rewriteAllEntries(cacheRewriter);
                    }
                }, QueryCache.prototype.put = function(dataSources, dataReaderCommand, dataAsObject) {
                    var cache = this.ensureCache(dataSources), dataQuery = dataReaderCommand, cacheKey = CacheItemContext.generateCacheKeyDataQuery(dataQuery);
                    if (cache.hasCacheEntry(cacheKey)) cache.putCacheResult(cacheKey, dataAsObject); else {
                        var entryContext = CacheItemContext.createCacheItemContext(dataQuery, cacheKey), deferred = cache.createCacheEntry(cacheKey, entryContext);
                        deferred.deferred.resolve(dataAsObject);
                    }
                }, QueryCache.allowCacheOrDefault = function(options) {
                    return options.allowCache !== !1;
                }, QueryCache.prototype.findEquivalentCache = function(options, cache, entryContext) {
                    if (QueryCache.allowCacheOrDefault(options)) if (entryContext.compositeDataQuery) {
                        if (options.ignoreViewportForCache) for (var _b = 0, _c = cache.keys(); _b < _c.length; _b++) {
                            var existingKey = _c[_b], existingItemContext = cache.getEntryContext(existingKey);
                            if (existingItemContext && existingItemContext.keyWithoutViewport && existingItemContext.keyWithoutViewport === entryContext.keyWithoutViewport) return cache.bindCacheEntry(existingItemContext.key);
                        }
                    } else for (var _i = 0, _a = cache.keys(); _i < _a.length; _i++) {
                        var existingKey = _a[_i], existingItemContext = cache.getEntryContext(existingKey);
                        if (existingItemContext) {
                            if (existingItemContext.hasAllData && existingItemContext.keyWithoutReduction === entryContext.keyWithoutReduction) return cache.bindCacheEntry(existingItemContext.key);
                            var cachePromiseWithClientSideFilters = DsrClientSideFilterGenerator.tryReuseCacheWithClientSideFilters(cache, existingItemContext, options, entryContext);
                            if (cachePromiseWithClientSideFilters) return cachePromiseWithClientSideFilters;
                        }
                    }
                }, QueryCache.prototype.getCache = function(dataSource) {
                    return this.cacheByModel[this.generateModelKey(dataSource)];
                }, QueryCache.prototype.ensureCache = function(dataSources) {
                    var modelKey = this.generateModelKey(dataSources), cacheByModel = this.cacheByModel, cache = cacheByModel[modelKey];
                    return void 0 === cache && (cache = cacheByModel[modelKey] = new powerbi.RejectablePromiseCache(this.promiseFactory)), 
                    cache;
                }, QueryCache.prototype.generateModelKey = function(dataSources) {
                    if (!_.isEmpty(dataSources)) return JSON.stringify(_.map(dataSources, function(dsrDataSource) {
                        return {
                            dbName: dsrDataSource.dbName,
                            vsName: dsrDataSource.vsName,
                            schemaName: dsrDataSource.schemaName
                        };
                    }));
                }, QueryCache;
            }();
            !function(CacheItemContext) {
                function createCacheItemContext(dataQuery, cacheKey) {
                    if (isCompositeDataQuery(dataQuery)) return createCacheItemContextForCompositeDataQuery(dataQuery, cacheKey);
                    var dataShapeCommand = dataQuery.Commands[0].SemanticQueryDataShapeCommand;
                    return createCacheItemContextForNonCompositeDataQuery(dataShapeCommand, cacheKey);
                }
                function generateCacheKeyDataQuery(dataQuery) {
                    return isCompositeDataQuery(dataQuery) ? generateCacheKeyForCompositeDataQuery(dataQuery) : generateCacheKey(dataQuery.Commands[0].SemanticQueryDataShapeCommand);
                }
                function createCacheItemContextForCompositeDataQuery(dataQuery, cacheKey) {
                    var entryContext = {
                        key: cacheKey || generateCacheKeyForCompositeDataQuery(dataQuery),
                        keyWithoutReduction: generateCacheKeyForCompositeDataQueryWithoutReduction(dataQuery),
                        keyWithoutViewport: generateCacheKeyForCompositeDataQueryWithoutViewport(dataQuery),
                        keyWithoutFilter: void 0,
                        queryFilters: void 0,
                        compositeDataQuery: !0
                    };
                    return entryContext;
                }
                function createCacheItemContextForNonCompositeDataQuery(dataShapeCommand, cacheKey) {
                    var isSuitableForClientSideFiltering = DsrClientSideFilterGenerator.isDataShapeCommandSuitableForClientSideFiltering(dataShapeCommand), entryContext = {
                        key: cacheKey || generateCacheKey(dataShapeCommand),
                        keyWithoutReduction: generateCacheKeyWithoutReduction(dataShapeCommand),
                        keyWithoutViewport: void 0,
                        keyWithoutFilter: isSuitableForClientSideFiltering ? generateCacheKeyWithoutFilter(dataShapeCommand) : void 0,
                        queryFilters: isSuitableForClientSideFiltering ? getQueryFilters(dataShapeCommand) : void 0,
                        compositeDataQuery: !1
                    };
                    return entryContext;
                }
                function isCompositeDataQuery(dataQuery) {
                    return dataQuery.Commands.length > 1;
                }
                function generateCacheKey(command) {
                    if (command) return JSON.stringify(command);
                }
                function clearCommandDataReduction(command) {
                    command && command.Binding && "object" == typeof command.Binding && (command.Binding.DataReduction = void 0, 
                    command.Binding.Limits = void 0);
                }
                function clearCommandViewport(command) {
                    command && (command.ViewportHeightPx = void 0, command.ViewportWidthPx = void 0);
                }
                function clearCommandFilter(command) {
                    command && command.Query && command.Query.Where && (command.Query.Where = void 0);
                }
                function generateCacheKeyWithoutReduction(command) {
                    if (command) {
                        var clonedCommand = _.cloneDeep(command);
                        return clearCommandDataReduction(clonedCommand), JSON.stringify(clonedCommand);
                    }
                }
                function generateCacheKeyWithoutFilter(command) {
                    if (command) {
                        var clonedCommand = _.cloneDeep(command);
                        return clearCommandFilter(clonedCommand), JSON.stringify(clonedCommand);
                    }
                }
                function generateCacheKeyForCompositeDataQuery(dataQuery) {
                    if (dataQuery) return JSON.stringify(dataQuery);
                }
                function generateCacheKeyForCompositeDataQueryWithoutReduction(dataQuery) {
                    if (dataQuery) {
                        var clonedDataQuery = _.cloneDeep(dataQuery);
                        return clearCommandDataReduction(clonedDataQuery.Commands[0].SemanticQueryDataShapeCommand), 
                        JSON.stringify(clonedDataQuery);
                    }
                }
                function generateCacheKeyForCompositeDataQueryWithoutViewport(dataQuery) {
                    if (dataQuery) {
                        var clonedDataQuery = _.cloneDeep(dataQuery);
                        return clearCommandViewport(clonedDataQuery.Commands[1].ScriptVisualCommand), JSON.stringify(clonedDataQuery);
                    }
                }
                function getQueryFilters(command) {
                    var queryInWireContract = command && command.Query;
                    if (queryInWireContract && !_.isEmpty(queryInWireContract.Where)) {
                        var semanticQuery = safeDeserializeQuery(queryInWireContract), where = semanticQuery && semanticQuery.where();
                        if (!_.isEmpty(where)) return where;
                    }
                }
                CacheItemContext.createCacheItemContext = createCacheItemContext, CacheItemContext.generateCacheKeyDataQuery = generateCacheKeyDataQuery, 
                CacheItemContext.createCacheItemContextForCompositeDataQuery = createCacheItemContextForCompositeDataQuery, 
                CacheItemContext.createCacheItemContextForNonCompositeDataQuery = createCacheItemContextForNonCompositeDataQuery;
            }(CacheItemContext || (CacheItemContext = {}));
            var DsrClientSideFilterGenerator;
            !function(DsrClientSideFilterGenerator) {
                function isDataShapeCommandSuitableForClientSideFiltering(command) {
                    if (!command) return !1;
                    var dataReduction = command.Binding && command.Binding.DataReduction, dataReductionPrimary = dataReduction && dataReduction.Primary, dataReductionSecondary = dataReduction && dataReduction.Secondary;
                    return !(!isDataReductionWindowOrUndefined(dataReductionPrimary) || !isDataReductionWindowOrUndefined(dataReductionSecondary)) && (!containsRestartToken(dataReductionPrimary) && !containsRestartToken(dataReductionSecondary));
                }
                function tryReuseCacheWithClientSideFilters(cache, oldItemContext, newQueryOptions, newItemContext) {
                    if (newQueryOptions.allowClientSideFilters) {
                        var clientSideFilters = tryComputeClientSideFilters(oldItemContext, newItemContext);
                        return _.isEmpty(clientSideFilters) ? void 0 : cache.bindCacheEntry(oldItemContext.key, function(data) {
                            return rewriteCacheDataWithClientSideFilters(data, clientSideFilters);
                        });
                    }
                }
                function tryComputeClientSideFilters(oldItemContext, newItemContext) {
                    var isNewQuerySuitableForClientSideFiltering = !newItemContext.compositeDataQuery && !!newItemContext.keyWithoutFilter;
                    if (isNewQuerySuitableForClientSideFiltering) {
                        var isOldItemSuitableForClientSideFiltering = !oldItemContext.compositeDataQuery && oldItemContext.keyWithoutFilter && oldItemContext.hasAllData;
                        if (isOldItemSuitableForClientSideFiltering && oldItemContext.keyWithoutFilter === newItemContext.keyWithoutFilter) {
                            var oldFiltersMissingFromNewQuery = getDifferentFilters(oldItemContext.queryFilters, newItemContext.queryFilters);
                            if (hasMoreRestrictiveCounterpartForEveryFilter(oldFiltersMissingFromNewQuery, newItemContext.queryFilters)) {
                                var newFiltersMissingFromOldQuery = getDifferentFilters(newItemContext.queryFilters, oldItemContext.queryFilters);
                                if (!_.isEmpty(newFiltersMissingFromOldQuery)) return tryConvertToClientSideFilters(newItemContext, newFiltersMissingFromOldQuery);
                            }
                        }
                    }
                }
                function getDifferentFilters(filters, comparants) {
                    return _.isEmpty(comparants) ? filters : _.filter(filters, function(filter) {
                        return !data_12.SQFilter.contains(comparants, filter);
                    });
                }
                function tryConvertToClientSideFilters(itemContext, filtersToConvert) {
                    var dataShapeCommand = JSON.parse(itemContext.key), semanticQuery = safeDeserializeQuery(dataShapeCommand && dataShapeCommand.Query);
                    if (semanticQuery) {
                        var clientSideFilters = data_12.ClientSideFilter.tryConvertToClientSideFilters(semanticQuery.select(), filtersToConvert);
                        return clientSideFilters;
                    }
                }
                function hasMoreRestrictiveCounterpartForEveryFilter(filters, counterparts) {
                    return _.every(filters, function(filter) {
                        return _.any(counterparts, function(counterpart) {
                            return data_12.ClientSideFilter.isMoreRestrictiveFilter(counterpart, filter);
                        });
                    });
                }
                function rewriteCacheDataWithClientSideFilters(data, clientSideFilters) {
                    var dataWithClientSideFilters = __assign({}, data);
                    return dataWithClientSideFilters.clientSideFilters = clientSideFilters, dataWithClientSideFilters;
                }
                DsrClientSideFilterGenerator.isDataShapeCommandSuitableForClientSideFiltering = isDataShapeCommandSuitableForClientSideFiltering, 
                DsrClientSideFilterGenerator.tryReuseCacheWithClientSideFilters = tryReuseCacheWithClientSideFilters, 
                DsrClientSideFilterGenerator.tryComputeClientSideFilters = tryComputeClientSideFilters;
            }(DsrClientSideFilterGenerator || (DsrClientSideFilterGenerator = {}));
        }(dsr = data_12.dsr || (data_12.dsr = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var PrimitiveValueEncoding, DateExtensions = jsCommon.DateExtensions;
        !function(PrimitiveValueEncoding) {
            function parseValue(dsqValue) {
                return parseValueHelper(dsqValue);
            }
            function parseValueToSQExpr(dsqValue) {
                return parseValueHelper(dsqValue, !0);
            }
            function parseBinary(value) {
                if (!value) return null;
                if (_.startsWith(value, binaryPrefix)) {
                    var binaryValue = value.substring(binaryPrefix.length, value.length - 1);
                    return binaryValue;
                }
                return null;
            }
            function parseValueHelper(dsqValue, toSQExpr) {
                if ("string" == typeof dsqValue) {
                    if (_.endsWith(dsqValue, "L")) {
                        var intValue = parseInt(dsqValue, 10);
                        return toSQExpr ? data.SQExprBuilder.integer(intValue, dsqValue) : intValue;
                    }
                    if (_.endsWith(dsqValue, "D")) {
                        var doubleValue = parseFloatExtended(dsqValue);
                        return toSQExpr ? data.SQExprBuilder.double(doubleValue, dsqValue) : doubleValue;
                    }
                    if (_.endsWith(dsqValue, "M")) {
                        var decimalValue = parseFloatExtended(dsqValue);
                        return toSQExpr ? data.SQExprBuilder.decimal(decimalValue, dsqValue) : decimalValue;
                    }
                    if (_.endsWith(dsqValue, "'")) {
                        if ("'" === dsqValue.charAt(0)) {
                            var stringValue = dsqValue.substring(1, dsqValue.length - 1).replace(DoubleQuoteRegex, "'");
                            return toSQExpr ? data.SQExprBuilder.text(stringValue, dsqValue) : stringValue;
                        }
                        if (0 === dsqValue.indexOf("datetime'")) {
                            var isoDate = dsqValue.substring(9, dsqValue.length - 1), dateValue = DateExtensions.parseIsoDate(isoDate);
                            return toSQExpr ? data.SQExprBuilder.dateTime(dateValue, dsqValue) : dateValue;
                        }
                    }
                    if ("null" === dsqValue) return toSQExpr ? data.SQExprBuilder.nullConstant() : null;
                    if ("true" === dsqValue) return !toSQExpr || data.SQExprBuilder.boolean(!0);
                    if ("false" === dsqValue) return !!toSQExpr && data.SQExprBuilder.boolean(!1);
                }
                return "boolean" == typeof dsqValue ? toSQExpr ? data.SQExprBuilder.boolean(dsqValue) : dsqValue : null === dsqValue ? toSQExpr ? data.SQExprBuilder.nullConstant() : null : dsqValue;
            }
            function parseFloatExtended(value) {
                var rawResult = parseFloat(value);
                return isNaN(rawResult) ? parseFloat(value.replace("INF", "Infinity")) : rawResult;
            }
            var DoubleQuoteRegex = /''/g, binaryPrefix = "base64'";
            PrimitiveValueEncoding.parseValue = parseValue, PrimitiveValueEncoding.parseValueToSQExpr = parseValueToSQExpr, 
            PrimitiveValueEncoding.parseBinary = parseBinary;
        }(PrimitiveValueEncoding = data.PrimitiveValueEncoding || (data.PrimitiveValueEncoding = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        function createSchemaChangeRewriters(changes) {
            for (var rewriters = [], i = 0, length_8 = changes.length; i < length_8; i++) {
                var change = changes[i];
                change.measureMove && rewriters.push(createMoveMeasureRewriter(change.measureMove)), 
                change.entityRename && rewriters.push(createEntityRenameRewriter(change.entityRename)), 
                change.propertyRename && rewriters.push(createPropertyRenameRewriter(change.propertyRename)), 
                change.hierarchyLevelRename && rewriters.push(createHierarchyLevelRenameRewriter(change.hierarchyLevelRename));
            }
            return rewriters;
        }
        function createMoveMeasureRewriter(measureMove) {
            return new MoveMeasureRewriter(measureMove);
        }
        function createEntityRenameRewriter(entityRename) {
            return new EntityRenameRewriter(entityRename);
        }
        function createPropertyRenameRewriter(propertyRename) {
            return new PropertyRenameRewriter(propertyRename);
        }
        function createHierarchyLevelRenameRewriter(hierarchyLevelRename) {
            return new HierarchyLevelRenameRewriter(hierarchyLevelRename);
        }
        data.createSchemaChangeRewriters = createSchemaChangeRewriters, data.createMoveMeasureRewriter = createMoveMeasureRewriter, 
        data.createEntityRenameRewriter = createEntityRenameRewriter, data.createPropertyRenameRewriter = createPropertyRenameRewriter, 
        data.createHierarchyLevelRenameRewriter = createHierarchyLevelRenameRewriter;
        var EntityRenameRewriter = function(_super) {
            function EntityRenameRewriter(change) {
                var _this = this;
                return _this = _super.call(this) || this, _this.change = change, _this;
            }
            return __extends(EntityRenameRewriter, _super), EntityRenameRewriter.prototype.visitEntity = function(expr) {
                var change = this.change;
                return expr.schema === change.schema && expr.entity === change.before ? new data.SQEntityExpr(expr.schema, change.after, expr.variable) : expr;
            }, EntityRenameRewriter;
        }(data.SQExprRewriter), MoveMeasureRewriter = function(_super) {
            function MoveMeasureRewriter(change) {
                var _this = this;
                return _this = _super.call(this) || this, _this.change = change, _this;
            }
            return __extends(MoveMeasureRewriter, _super), MoveMeasureRewriter.prototype.visitMeasureRef = function(expr) {
                var change = this.change, fieldPattern = data.FieldExprPattern.toFieldExprEntityItemPattern(data.SQExprConverter.asFieldPattern(expr));
                if (fieldPattern.schema === change.schema && fieldPattern.entity === change.source && expr.ref === change.property) {
                    var newSource = new data.SQEntityExpr(fieldPattern.schema, change.destination);
                    return new data.SQMeasureRefExpr(newSource, change.property);
                }
                return expr;
            }, MoveMeasureRewriter;
        }(data.SQExprRewriter), PropertyRenameRewriter = function(_super) {
            function PropertyRenameRewriter(change) {
                var _this = this;
                return _this = _super.call(this) || this, _this.change = change, _this;
            }
            return __extends(PropertyRenameRewriter, _super), PropertyRenameRewriter.prototype.visitColumnRef = function(expr) {
                var change = this.change;
                return this.matches(change, expr) ? new data.SQColumnRefExpr(expr.source, change.after) : expr;
            }, PropertyRenameRewriter.prototype.visitMeasureRef = function(expr) {
                var change = this.change;
                return this.matches(change, expr) ? new data.SQMeasureRefExpr(expr.source, change.after) : expr;
            }, PropertyRenameRewriter.prototype.visitGroupRef = function(expr) {
                var _this = this, rewrittenExpr = expr, change = this.change;
                this.matches(change, expr) && (rewrittenExpr = new data.SQGroupRefExpr(change.after, expr.source, expr.groupedExprs));
                var rewrittenGroupedExprs = _.map(expr.groupedExprs, function(value) {
                    return value.accept(_this);
                });
                return data.SQExprUtils.sequenceEqual(rewrittenGroupedExprs, expr.groupedExprs) || (rewrittenExpr = new data.SQGroupRefExpr(rewrittenExpr.ref, rewrittenExpr.source, rewrittenGroupedExprs)), 
                rewrittenExpr;
            }, PropertyRenameRewriter.prototype.visitHierarchy = function(expr) {
                var hierarchySource = expr.arg.accept(this);
                if (hierarchySource !== expr.arg) return new data.SQHierarchyExpr(hierarchySource, expr.hierarchy);
                var change = this.change;
                return this.hierarchyMatches(change, expr) ? new data.SQHierarchyExpr(expr.arg, change.after) : expr;
            }, PropertyRenameRewriter.prototype.visitPropertyVariationSource = function(expr) {
                var change = this.change;
                return this.variationMatches(change, expr) ? new data.SQPropertyVariationSourceExpr(expr.arg, expr.name, change.after) : expr;
            }, PropertyRenameRewriter.prototype.variationMatches = function(change, expr) {
                var entityExpr = expr.arg;
                return entityExpr.schema === change.schema && entityExpr.entity === change.entity && expr.property === change.before;
            }, PropertyRenameRewriter.prototype.hierarchyMatches = function(change, expr) {
                var entityExpr = expr.arg;
                if (data.SQExpr.isEntity(entityExpr)) return "Hierarchy" === change.objectType && entityExpr.schema === change.schema && entityExpr.entity === change.entity && expr.hierarchy === change.before;
            }, PropertyRenameRewriter.prototype.matches = function(change, expr) {
                var fieldPattern = data.FieldExprPattern.toFieldExprEntityItemPattern(data.SQExprConverter.asFieldPattern(expr));
                return fieldPattern.schema === change.schema && fieldPattern.entity === change.entity && expr.ref === change.before;
            }, PropertyRenameRewriter;
        }(data.SQExprRewriter), HierarchyLevelRenameRewriter = function(_super) {
            function HierarchyLevelRenameRewriter(change) {
                var _this = this;
                return _this = _super.call(this) || this, _this.change = change, _this;
            }
            return __extends(HierarchyLevelRenameRewriter, _super), HierarchyLevelRenameRewriter.prototype.visitHierarchyLevel = function(expr) {
                var change = this.change;
                return this.matches(change, expr) ? new data.SQHierarchyLevelExpr(expr.arg, change.after) : expr;
            }, HierarchyLevelRenameRewriter.prototype.matches = function(change, expr) {
                var fieldPattern = data.SQExprConverter.asFieldPattern(expr);
                if (!fieldPattern.columnHierarchyLevelVariation) {
                    var fieldEntityPattern = data.FieldExprPattern.toFieldExprEntityItemPattern(fieldPattern), hierarchyExpr = expr.arg;
                    return fieldEntityPattern.schema === change.schema && fieldEntityPattern.entity === change.entity && hierarchyExpr.hierarchy === change.hierarchy && expr.level === change.before;
                }
            }, HierarchyLevelRenameRewriter;
        }(data.SQExprRewriter);
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var SemanticQueryBuilder = function() {
            function SemanticQueryBuilder(from) {
                this.clauses = {
                    from: from,
                    select: []
                };
            }
            return SemanticQueryBuilder.prototype.addWhere = function(filter) {
                var clauses = this.clauses;
                clauses.where || (clauses.where = []), clauses.where.push(filter);
            }, SemanticQueryBuilder.prototype.addOrderBy = function(sort) {
                var clauses = this.clauses;
                clauses.orderBy || (clauses.orderBy = []), clauses.orderBy.push(sort);
            }, SemanticQueryBuilder.prototype.addSelect = function(select) {
                this.clauses.select.push(select);
            }, SemanticQueryBuilder.prototype.addGroupBy = function(groupBy) {
                var clauses = this.clauses;
                clauses.groupBy || (clauses.groupBy = []), clauses.groupBy.push(groupBy);
            }, SemanticQueryBuilder.prototype.addTransform = function(transformItem) {
                var clauses = this.clauses;
                clauses.transforms || (clauses.transforms = []), clauses.transforms.push(transformItem);
            }, SemanticQueryBuilder.prototype.setTop = function(top) {
                this.clauses.top = top;
            }, SemanticQueryBuilder.prototype.toQuery = function() {
                return data.SemanticQuery.createWith(this.clauses, !0);
            }, SemanticQueryBuilder.prototype.toFilter = function() {
                var clauses = this.clauses;
                if (clauses.from && clauses.where) return new data.SemanticFilter(clauses.from, clauses.where);
            }, SemanticQueryBuilder;
        }();
        data.SemanticQueryBuilder = SemanticQueryBuilder;
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var SemanticQueryVersions;
        !function(SemanticQueryVersions) {
            SemanticQueryVersions[SemanticQueryVersions.Version0 = 0] = "Version0", SemanticQueryVersions[SemanticQueryVersions.Version1 = 1] = "Version1", 
            SemanticQueryVersions[SemanticQueryVersions.Version2 = 2] = "Version2";
        }(SemanticQueryVersions = data.SemanticQueryVersions || (data.SemanticQueryVersions = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var VariationRewriter;
        !function(VariationRewriter) {
            function run(expr, schema) {
                return expr.accept(new Impl(schema));
            }
            VariationRewriter.run = run;
            var Impl = function(_super) {
                function Impl(schema) {
                    var _this = _super.call(this) || this;
                    return _this.schema = schema, _this;
                }
                return __extends(Impl, _super), Impl.prototype.visitPropertyVariationSource = function(expr) {
                    var sourceEntity = expr.arg.getTargetEntity();
                    if (!sourceEntity) return expr;
                    var schemaName = sourceEntity.schema, variationEntity = this.schema.schema(schemaName).findTargetEntityOfVariation(sourceEntity.entity, expr.property, expr.name);
                    return variationEntity ? data.SQExprBuilder.entity(schemaName, variationEntity.name) : expr;
                }, Impl;
            }(data.SQExprRewriter);
        }(VariationRewriter = data.VariationRewriter || (data.VariationRewriter = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var services;
        !function(services) {
            var SemanticGroupingSerializer;
            !function(SemanticGroupingSerializer) {
                function serialize(input) {
                    for (var groupingDefinition = {
                        Version: 0,
                        Sources: [],
                        GroupedColumns: []
                    }, from = new data.SQFrom(), _i = 0, _a = input.groupedColumns; _i < _a.length; _i++) {
                        var groupedColumn = _a[_i], rewrittenExpr = data.SQExprRewriterWithSourceRenames.rewrite(groupedColumn, void 0, from);
                        groupingDefinition.GroupedColumns.push(services.SemanticQuerySerializer.serializeExprWithRef(rewrittenExpr));
                    }
                    if (input.groupItems) {
                        groupingDefinition.GroupItems = [];
                        for (var _b = 0, _c = input.groupItems; _b < _c.length; _b++) {
                            var group = _c[_b], groupItem = {
                                DisplayName: group.name
                            };
                            if (group.expression) {
                                var rewrittenExpr = data.SQExprRewriterWithSourceRenames.rewrite(group.expression, void 0, from);
                                groupItem.Expression = services.SemanticQuerySerializer.serializeExprWithRef(rewrittenExpr);
                            }
                            group.blankDefaultPlaceholder && (groupItem.BlankDefaultPlaceholder = !0), groupingDefinition.GroupItems.push(groupItem);
                        }
                    }
                    input.binItem && (groupingDefinition.BinItem = {
                        Expression: services.SemanticQuerySerializer.serializeExprWithRef(data.SQExprRewriterWithSourceRenames.rewrite(input.binItem, void 0, from))
                    }), services.SemanticQuerySerializer.serializeFrom(from, groupingDefinition.Sources);
                    var inputPartitionTable = input.partitionTable;
                    if (inputPartitionTable) {
                        groupingDefinition.PartitionTable = {
                            Definition: {
                                TableDefinition: services.SemanticQuerySerializer.serializeQuery(inputPartitionTable.mappingTable),
                                ItemIdColumns: inputPartitionTable.itemIdColumns,
                                PartitionIdColumn: inputPartitionTable.partitionIdColumn
                            }
                        };
                        var partitions = inputPartitionTable.partitions;
                        partitions && (groupingDefinition.PartitionTable.Definition.Partitions = serializePartitions(partitions));
                        var inputPartitionTableResult = input.partitionTableResult;
                        inputPartitionTableResult && (groupingDefinition.PartitionTable.Result = {
                            TableName: inputPartitionTableResult.tableName,
                            PartitionIdColumn: inputPartitionTableResult.partitionIdColumn
                        });
                        var defaultPartitionPrefix = input.partitionTable.defaultPartitionPrefix;
                        defaultPartitionPrefix && (groupingDefinition.PartitionTable.Definition.DefaultPartitionPrefix = defaultPartitionPrefix);
                    }
                    return groupingDefinition;
                }
                function deserialize(input) {
                    if (0 === input.Version) {
                        for (var definition = {
                            groupedColumns: []
                        }, from = services.SemanticQuerySerializer.deserializeFrom(input.Sources), _i = 0, _a = input.GroupedColumns; _i < _a.length; _i++) {
                            var groupedColumn = _a[_i];
                            definition.groupedColumns.push(services.SemanticQuerySerializer.deserializeExprWithRef(groupedColumn, from));
                        }
                        if (input.GroupItems) {
                            definition.groupItems = [];
                            for (var _b = 0, _c = input.GroupItems; _b < _c.length; _b++) {
                                var groupItem = _c[_b], group = {
                                    name: groupItem.DisplayName
                                };
                                groupItem.Expression && (group.expression = services.SemanticQuerySerializer.deserializeExprWithRef(groupItem.Expression, from)), 
                                groupItem.BlankDefaultPlaceholder && (group.blankDefaultPlaceholder = !0), definition.groupItems.push(group);
                            }
                        }
                        if (input.BinItem && (definition.binItem = services.SemanticQuerySerializer.deserializeExprWithRef(input.BinItem.Expression, from)), 
                        input.PartitionTable) {
                            var partitionTableDefinition = input.PartitionTable.Definition, mappingTableDefinition = partitionTableDefinition.TableDefinition;
                            definition.partitionTable = {
                                mappingTable: services.SemanticQuerySerializer.deserializeQuery(mappingTableDefinition),
                                itemIdColumns: partitionTableDefinition.ItemIdColumns,
                                partitionIdColumn: partitionTableDefinition.PartitionIdColumn
                            };
                            var partitions = partitionTableDefinition.Partitions;
                            partitions && (definition.partitionTable.partitions = _.map(partitions, function(partition) {
                                return {
                                    displayName: partition.DisplayName,
                                    partitionIds: _.map(partition.PartitionIds, services.SemanticQuerySerializer.deserializeExpr)
                                };
                            }));
                            var partitionTableResult = input.PartitionTable.Result;
                            partitionTableResult && (definition.partitionTableResult = {
                                tableName: partitionTableResult.TableName,
                                partitionIdColumn: partitionTableResult.PartitionIdColumn
                            });
                            var defaultPartitionPrefix = partitionTableDefinition.DefaultPartitionPrefix;
                            defaultPartitionPrefix && (definition.partitionTable.defaultPartitionPrefix = defaultPartitionPrefix);
                        }
                        return definition;
                    }
                }
                function serializePartitions(input) {
                    return _.map(input, function(partition) {
                        return {
                            DisplayName: partition.displayName,
                            PartitionIds: _.map(partition.partitionIds, services.SemanticQuerySerializer.serializeExpr)
                        };
                    });
                }
                function normalizeFromRefs(definition, target) {
                    for (var normalizedDefinition = clone(definition), sourceFrom = new data.SQFrom(), normalizedGroupedColumns = normalizedDefinition.groupedColumns, i = 0; i < normalizedGroupedColumns.length; i++) normalizedGroupedColumns[i] = data.SQExprRewriterWithSourceRenames.rewrite(normalizedGroupedColumns[i], sourceFrom, target);
                    for (var normalizedGroupItems = normalizedDefinition.groupItems, _i = 0, normalizedGroupItems_1 = normalizedGroupItems; _i < normalizedGroupItems_1.length; _i++) {
                        var normalizedGroupItem = normalizedGroupItems_1[_i];
                        normalizedGroupItem.expression && (normalizedGroupItem.expression = data.SQExprRewriterWithSourceRenames.rewrite(normalizedGroupItem.expression, sourceFrom, target));
                    }
                    var normalizedBinItem = normalizedDefinition.binItem;
                    return normalizedBinItem && (normalizedDefinition.binItem = data.SQExprRewriterWithSourceRenames.rewrite(normalizedBinItem, sourceFrom, target)), 
                    normalizedDefinition;
                }
                function clone(definition) {
                    var serialized = serialize(definition);
                    return deserialize(serialized);
                }
                SemanticGroupingSerializer.serialize = serialize, SemanticGroupingSerializer.deserialize = deserialize, 
                SemanticGroupingSerializer.serializePartitions = serializePartitions, SemanticGroupingSerializer.normalizeFromRefs = normalizeFromRefs;
            }(SemanticGroupingSerializer = services.SemanticGroupingSerializer || (services.SemanticGroupingSerializer = {}));
        }(services = data.services || (data.services = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var ClientErrorStrings = powerbi.ClientErrorStrings, RealTimeLongPollError = function() {
            function RealTimeLongPollError() {}
            return Object.defineProperty(RealTimeLongPollError.prototype, "code", {
                get: function() {
                    return "RealTimeLongPollError";
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(RealTimeLongPollError.prototype, "ignorable", {
                get: function() {
                    return !1;
                },
                enumerable: !0,
                configurable: !0
            }), RealTimeLongPollError.prototype.getDetails = function(resourceProvider) {
                var message = resourceProvider.get("Realtime_longPollErrorValue"), key = resourceProvider.get("Realtime_longPollErrorKey"), val = resourceProvider.get("Realtime_longPollErrorValue"), details = {
                    message: message,
                    displayableErrorInfo: [ {
                        errorInfoKey: key,
                        errorInfoValue: val
                    } ],
                    debugErrorInfo: [ {
                        errorInfoKey: ClientErrorStrings.ClientErrorCode,
                        errorInfoValue: this.code
                    } ]
                };
                return details;
            }, RealTimeLongPollError;
        }();
        data.RealTimeLongPollError = RealTimeLongPollError;
        var RealTimeGetHistoryClientError = function() {
            function RealTimeGetHistoryClientError() {}
            return Object.defineProperty(RealTimeGetHistoryClientError.prototype, "code", {
                get: function() {
                    return "RealTimeGetHistory";
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(RealTimeGetHistoryClientError.prototype, "ignorable", {
                get: function() {
                    return !1;
                },
                enumerable: !0,
                configurable: !0
            }), RealTimeGetHistoryClientError.prototype.getDetails = function(resourceProvider) {
                var message = resourceProvider.get("Realtime_retrieveHistoryValue"), key = resourceProvider.get("Realtime_retrieveHistoryKey"), val = resourceProvider.get("Realtime_retrieveHistoryValue"), details = {
                    message: message,
                    displayableErrorInfo: [ {
                        errorInfoKey: key,
                        errorInfoValue: val
                    } ],
                    debugErrorInfo: [ {
                        errorInfoKey: ClientErrorStrings.ClientErrorCode,
                        errorInfoValue: this.code
                    } ]
                };
                return details;
            }, RealTimeGetHistoryClientError;
        }();
        data.RealTimeGetHistoryClientError = RealTimeGetHistoryClientError;
        var MessageExceedLimitClientError = function() {
            function MessageExceedLimitClientError() {}
            return Object.defineProperty(MessageExceedLimitClientError.prototype, "code", {
                get: function() {
                    return "RTMessageExceedLimit";
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(MessageExceedLimitClientError.prototype, "ignorable", {
                get: function() {
                    return !0;
                },
                enumerable: !0,
                configurable: !0
            }), MessageExceedLimitClientError.prototype.getDetails = function(resourceProvider) {
                var message = resourceProvider.get("Realtime_MessageExceedLimitValue"), key = resourceProvider.get("Realtime_MessageExceedLimitKey"), val = resourceProvider.get("Realtime_MessageExceedLimitValue"), details = {
                    message: message,
                    displayableErrorInfo: [ {
                        errorInfoKey: key,
                        errorInfoValue: val
                    } ],
                    debugErrorInfo: [ {
                        errorInfoKey: ClientErrorStrings.ClientErrorCode,
                        errorInfoValue: this.code
                    } ]
                };
                return details;
            }, MessageExceedLimitClientError;
        }();
        data.MessageExceedLimitClientError = MessageExceedLimitClientError;
        var FailedRealTimeUpdateClientError = function() {
            function FailedRealTimeUpdateClientError() {}
            return Object.defineProperty(FailedRealTimeUpdateClientError.prototype, "code", {
                get: function() {
                    return "FailedRealTimeUpdate";
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(FailedRealTimeUpdateClientError.prototype, "ignorable", {
                get: function() {
                    return !1;
                },
                enumerable: !0,
                configurable: !0
            }), FailedRealTimeUpdateClientError.prototype.getDetails = function(resourceProvider) {
                var message = resourceProvider.get("Realtime_UpdateFailedValue"), key = resourceProvider.get("Realtime_UpdateFailedKey"), val = resourceProvider.get("Realtime_UpdateFailedValue"), details = {
                    message: message,
                    displayableErrorInfo: [ {
                        errorInfoKey: key,
                        errorInfoValue: val
                    } ],
                    debugErrorInfo: [ {
                        errorInfoKey: ClientErrorStrings.ClientErrorCode,
                        errorInfoValue: this.code
                    } ]
                };
                return details;
            }, FailedRealTimeUpdateClientError;
        }();
        data.FailedRealTimeUpdateClientError = FailedRealTimeUpdateClientError;
        var RealTimePubNubGetCredentialsClientError = function() {
            function RealTimePubNubGetCredentialsClientError() {}
            return Object.defineProperty(RealTimePubNubGetCredentialsClientError.prototype, "code", {
                get: function() {
                    return "RealTimePubNubCredentials";
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(RealTimePubNubGetCredentialsClientError.prototype, "ignorable", {
                get: function() {
                    return !1;
                },
                enumerable: !0,
                configurable: !0
            }), RealTimePubNubGetCredentialsClientError.prototype.getDetails = function(resourceProvider) {
                var message = resourceProvider.get("Realtime_PubNubGetCredentialsFailedValue"), key = resourceProvider.get("Realtime_PubNubGetCredentialsFailedKey"), val = resourceProvider.get("Realtime_PubNubGetCredentialsFailedValue"), details = {
                    message: message,
                    displayableErrorInfo: [ {
                        errorInfoKey: key,
                        errorInfoValue: val
                    } ],
                    debugErrorInfo: [ {
                        errorInfoKey: ClientErrorStrings.ClientErrorCode,
                        errorInfoValue: this.code
                    } ]
                };
                return details;
            }, RealTimePubNubGetCredentialsClientError;
        }();
        data.RealTimePubNubGetCredentialsClientError = RealTimePubNubGetCredentialsClientError;
        var EmptyDataClientError = function() {
            function EmptyDataClientError() {}
            return Object.defineProperty(EmptyDataClientError.prototype, "code", {
                get: function() {
                    return "EmptyData";
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(EmptyDataClientError.prototype, "ignorable", {
                get: function() {
                    return !1;
                },
                enumerable: !0,
                configurable: !0
            }), EmptyDataClientError.prototype.getDetails = function(resourceProvider) {
                var message = resourceProvider.get("ServiceError_CannotLoadVisual"), key = resourceProvider.get("ServiceError_ExecuteSemanticQueryErrorKey"), val = resourceProvider.get("InvalidDataFormat_DataFormatIsInvalid"), details = {
                    message: message,
                    displayableErrorInfo: [ {
                        errorInfoKey: key,
                        errorInfoValue: val
                    } ],
                    debugErrorInfo: [ {
                        errorInfoKey: ClientErrorStrings.ClientErrorCode,
                        errorInfoValue: this.code
                    } ]
                };
                return details;
            }, EmptyDataClientError;
        }();
        data.EmptyDataClientError = EmptyDataClientError;
        var InvalidDataResponseClientError = function() {
            function InvalidDataResponseClientError() {}
            return Object.defineProperty(InvalidDataResponseClientError.prototype, "code", {
                get: function() {
                    return "InvalidDataResponse";
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(InvalidDataResponseClientError.prototype, "ignorable", {
                get: function() {
                    return !1;
                },
                enumerable: !0,
                configurable: !0
            }), InvalidDataResponseClientError.prototype.getDetails = function(resourceProvider) {
                var message = resourceProvider.get("ServiceError_CannotLoadVisual"), key = resourceProvider.get("ServiceError_ExecuteSemanticQueryErrorKey"), val = resourceProvider.get("InvalidDataResponse_ServerError"), details = {
                    message: message,
                    displayableErrorInfo: [ {
                        errorInfoKey: key,
                        errorInfoValue: val
                    } ],
                    debugErrorInfo: [ {
                        errorInfoKey: ClientErrorStrings.ClientErrorCode,
                        errorInfoValue: this.code
                    } ]
                };
                return details;
            }, InvalidDataResponseClientError;
        }();
        data.InvalidDataResponseClientError = InvalidDataResponseClientError;
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data_13) {
        function createDataProxy(promiseFactory, dataReaders, telemetryService) {
            return new DataProxy(promiseFactory, dataReaders, telemetryService);
        }
        function createSingleExecutableDataProxy(dataProxy, promiseFactory, timerFactory) {
            return new SingleExecutionDataProxy(dataProxy, promiseFactory, timerFactory);
        }
        var JsonComparer = jsCommon.JsonComparer, TimerPromiseFactory = jsCommon.TimerPromiseFactory;
        data_13.createDataProxy = createDataProxy, data_13.createSingleExecutableDataProxy = createSingleExecutableDataProxy;
        var DataProxy = function() {
            function DataProxy(promiseFactory, dataReaderFactory, telemetryService) {
                this.promiseFactory = promiseFactory, this.dataReaderProvider = dataReaderFactory, 
                this.dataReaders = {}, this.telemetryService = telemetryService;
            }
            return DataProxy.prototype.execute = function(options) {
                var provider = this.getReader(options.type);
                return provider.execute(options.query, options.kinds, options.perfId);
            }, DataProxy.prototype.getReader = function(type) {
                var provider = this.dataReaders[type];
                if (provider) return provider;
                var reader = this.dataReaderProvider.reader(type);
                return this.dataReaders[type] = new DataReaderWrapper(type, reader, this.promiseFactory, this.telemetryService);
            }, DataProxy.prototype.stopCommunication = function(readerType) {
                var provider = this.getReader(readerType);
                provider.stopCommunication();
            }, DataProxy.prototype.resumeCommunication = function(readerType) {
                var provider = this.getReader(readerType);
                provider.resumeCommunication();
            }, DataProxy.prototype.clearCache = function(readerType, dataSources) {
                var provider = this.getReader(readerType);
                provider.clearCache(dataSources);
            }, DataProxy.prototype.rewriteCacheEntries = function(readerType, dataSources, rewriter) {
                var provider = this.getReader(readerType);
                provider.rewriteCacheEntries(dataSources, rewriter);
            }, DataProxy.prototype.setLocalCacheResult = function(options, dataAsObject) {
                var provider = this.getReader(options.type);
                return provider.setLocalCacheResult(options.query, dataAsObject);
            }, DataProxy;
        }(), SingleExecutionDataProxy = function() {
            function SingleExecutionDataProxy(proxy, promiseFactory, timerFactory) {
                this.proxy = proxy, this.promiseFactory = promiseFactory, this.timerFactory = timerFactory || TimerPromiseFactory.instance;
            }
            return SingleExecutionDataProxy.prototype.execute = function(options) {
                var _this = this, previousExecution = this.lastExecute;
                if (previousExecution && previousExecution.promise.pending()) {
                    if (JsonComparer.equals(options, previousExecution.query)) return previousExecution.promise;
                    this.lastExecute.promise.reject(new powerbi.IgnorableClientError());
                }
                var deferred = this.promiseFactory.defer(), promise = powerbi.RejectablePromise2(deferred), currentExecution = this.lastExecute = {
                    query: options,
                    deferred: deferred,
                    promise: promise
                };
                return this.queuedExecution || (this.queuedExecution = !0, this.timerFactory.create(0).done(function() {
                    _this.queuedExecution = !1;
                    var execution = _this.lastExecute, proxyPromise = _this.proxy.execute(execution.query);
                    proxyPromise.then(function(result) {
                        return execution.deferred.resolve(result);
                    }, function(reason) {
                        return execution.deferred.reject(reason);
                    }), execution.promise.catch(function(reason) {
                        return proxyPromise.reject(reason);
                    });
                })), promise.finally(function() {
                    currentExecution === _this.lastExecute && (_this.lastExecute = void 0);
                }), promise;
            }, SingleExecutionDataProxy;
        }(), DataReaderWrapper = function() {
            function DataReaderWrapper(pluginName, reader, promiseFactory, telemetryService) {
                this.name = pluginName, this.reader = reader, this.promiseFactory = promiseFactory, 
                this.telemetryService = telemetryService;
            }
            return DataReaderWrapper.prototype.execute = function(options, kinds, perfId) {
                var _this = this, dataViewDeferred = this.promiseFactory.defer(), provider = this.reader;
                if (provider.execute) {
                    var providerExecution_1 = provider.execute(options, perfId);
                    providerExecution_1.then(function(data) {
                        if (data) {
                            var transformed = _this.transform(data, kinds, perfId), transformedError = transformed.error;
                            if (transformedError) return dataViewDeferred.reject(transformedError), void _this.telemetryService.logEvent(powerbi.telemetry.DataExecuteQuery, data.requestId, void 0, !0, powerbi.telemetry.ErrorSource.PowerBI, transformedError.code);
                            dataViewDeferred.resolve({
                                dataReaderResult: transformed,
                                dataViewSource: {
                                    data: data
                                }
                            });
                        } else dataViewDeferred.reject(new data_13.EmptyDataClientError()), _this.telemetryService.logEvent(powerbi.telemetry.DataExecuteQuery, void 0, void 0, !0, powerbi.telemetry.ErrorSource.PowerBI, "DataProxy_EmptyData");
                    }, function(error) {
                        dataViewDeferred.reject(error), error && error.ignorable || _this.telemetryService.logEvent(powerbi.telemetry.DataExecuteQuery, error ? error.requestId : void 0, void 0, !0, powerbi.telemetry.ErrorSource.PowerBI, error ? error.code : "DataProxy_ProviderError");
                    });
                    var promise = powerbi.RejectablePromise2(dataViewDeferred);
                    return promise.catch(function(error) {
                        error = error || new data_13.InvalidDataResponseClientError(), providerExecution_1.reject(error), 
                        error.ignorable || _this.telemetryService.logEvent(powerbi.telemetry.DataExecuteQuery, error.requestId, void 0, !0, powerbi.telemetry.ErrorSource.PowerBI, error.code);
                    }), promise;
                }
                return options.command ? dataViewDeferred.resolve({
                    dataReaderResult: this.transform(options.command, kinds, perfId)
                }) : dataViewDeferred.reject(), powerbi.RejectablePromise2(dataViewDeferred);
            }, DataReaderWrapper.prototype.stopCommunication = function() {
                var reader = this.reader;
                reader.stopCommunication && reader.stopCommunication();
            }, DataReaderWrapper.prototype.resumeCommunication = function() {
                var reader = this.reader;
                reader.resumeCommunication && reader.resumeCommunication();
            }, DataReaderWrapper.prototype.clearCache = function(dataSources) {
                var cache = this.reader.cache;
                cache && cache.clear(dataSources);
            }, DataReaderWrapper.prototype.rewriteCacheEntries = function(dataSources, rewriter) {
                var cache = this.reader.cache;
                cache && cache.rewrite(dataSources, rewriter);
            }, DataReaderWrapper.prototype.setLocalCacheResult = function(options, dataAsObject) {
                var reader = this.reader;
                reader.setLocalCacheResult && reader.setLocalCacheResult(options, dataAsObject);
            }, DataReaderWrapper.prototype.transform = function(data, kinds, perfId) {
                var reader = this.reader;
                if (reader.transform) return reader.transform(data, kinds || 31, perfId);
                var defaultDataView = {
                    metadata: {
                        columns: []
                    }
                };
                return defaultDataView[this.name] = data, {
                    dataView: defaultDataView
                };
            }, DataReaderWrapper;
        }();
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        function createConceptualSchemaProxy(promiseFactory, dataReaderProvider, validator) {
            return new ConceptualSchemaProxy(promiseFactory, dataReaderProvider, validator);
        }
        function groupDataSourcesByType(dataSources) {
            return _.groupBy(dataSources, function(dataSource) {
                return data.DataReaderUtils.readerType(dataSource);
            });
        }
        var FederatedConceptualSchema = powerbi.data.FederatedConceptualSchema;
        data.createConceptualSchemaProxy = createConceptualSchemaProxy;
        var ConceptualSchemaProxy = function() {
            function ConceptualSchemaProxy(promiseFactory, dataReaderProvider, validator) {
                this.promiseFactory = promiseFactory, this.dataReaderProvider = dataReaderProvider, 
                this.validator = validator, this.schemas = {};
            }
            return ConceptualSchemaProxy.prototype.get = function(dataSources) {
                var _this = this;
                if (!dataSources) return this.promiseFactory.reject({});
                var schemaPromises = [], dataSourcesByType = groupDataSourcesByType(dataSources), _loop_6 = function(type) {
                    var dataSourcesForType = dataSourcesByType[type], key = this_3.generateSchemaKey(dataSourcesForType), cachedSchema = this_3.schemas[key];
                    if (this_3.isSchemaPaused(cachedSchema)) return schemaPromises.push(this_3.promiseFactory.reject(this_3.getPauseReason(cachedSchema))), 
                    "continue";
                    if (cachedSchema) return schemaPromises.push(cachedSchema.promise), "continue";
                    var deferred = this_3.promiseFactory.defer(), promise = deferred.promise;
                    schemaPromises.push(promise), this_3.schemas[key] = {
                        deferred: deferred,
                        promise: promise
                    }, promise.finally(function() {
                        return delete _this.schemas[key].deferred;
                    });
                    var schemaReader = this_3.dataReaderProvider.schemaReader(type);
                    return schemaReader ? void schemaReader.execute({
                        dataSources: dataSourcesForType
                    }).then(function(result) {
                        return _this.onSuccess(schemaReader, result, key, deferred);
                    }, function(result) {
                        return _this.onError(schemaReader, result, key, deferred);
                    }) : (deferred.reject(), "continue");
                }, this_3 = this;
                for (var type in dataSourcesByType) _loop_6(type);
                var mergeDeferred = this.promiseFactory.defer();
                return this.promiseFactory.all(schemaPromises).then(function(results) {
                    var federatedSchema = FederatedConceptualSchema.merge(results);
                    _this.validator && _this.validator.validate(federatedSchema), mergeDeferred.resolve(federatedSchema);
                }).catch(function(error) {
                    mergeDeferred.reject(error);
                }), mergeDeferred.promise;
            }, ConceptualSchemaProxy.prototype.getWithWireContract = function(dataSources) {
                var _this = this;
                return dataSources && _.uniq(dataSources, function(d) {
                    return data.DataReaderUtils.readerType(d);
                }).length > 1 ? this.promiseFactory.reject() : this.get(dataSources).then(function(contract) {
                    var schemaEntry = _this.schemas[_this.generateSchemaKey(dataSources)];
                    if (schemaEntry) return {
                        data: schemaEntry.data,
                        contract: contract
                    };
                });
            }, ConceptualSchemaProxy.prototype.getLatestCapabilities = function(dataSources, conceptualSchemaName) {
                var dataSourcesByType = groupDataSourcesByType(dataSources);
                for (var type in dataSourcesByType) {
                    var dataSourcesOfType = dataSourcesByType[type], key = this.generateSchemaKey(dataSourcesOfType), cache = this.schemas[key];
                    if (cache && cache.result) {
                        var conceptualSchema = cache.result.schema(conceptualSchemaName);
                        if (conceptualSchema) return conceptualSchema.capabilities;
                    }
                }
            }, ConceptualSchemaProxy.prototype.clearCache = function(reason, dataSources) {
                if (dataSources) {
                    var dataSourcesByType = groupDataSourcesByType(dataSources);
                    for (var type in dataSourcesByType) {
                        var dataSourcesForType = dataSourcesByType[type], schemaKey = this.generateSchemaKey(dataSourcesForType);
                        this.rejectPendingDeferred(reason, schemaKey), delete this.schemas[schemaKey];
                    }
                } else this.rejectPendingDeferred(reason), this.schemas = {};
            }, ConceptualSchemaProxy.prototype.stopCommunication = function(clientError, dataSources) {
                var schemaKey, cachedSchema, reason = {
                    clientError: clientError
                };
                if (dataSources) {
                    var dataSourcesByType = groupDataSourcesByType(dataSources);
                    for (var type in dataSourcesByType) {
                        var dataSourcesForType = dataSourcesByType[type];
                        schemaKey = this.generateSchemaKey(dataSourcesForType), cachedSchema = this.schemas[schemaKey], 
                        cachedSchema || (cachedSchema = {}, this.schemas[schemaKey] = cachedSchema), cachedSchema.pauseReason = reason, 
                        this.rejectPendingDeferred(reason, schemaKey);
                    }
                } else {
                    var noReason = {
                        clientError: null
                    };
                    this.pauseAllSchemasReason = reason || noReason, this.rejectPendingDeferred(reason);
                }
            }, ConceptualSchemaProxy.prototype.resumeCommunication = function(dataSources) {
                if (dataSources) {
                    var dataSourcesByType = groupDataSourcesByType(dataSources);
                    for (var type in dataSourcesByType) {
                        var dataSourcesForType = dataSourcesByType[type], schemaKey = this.generateSchemaKey(dataSourcesForType), cachedSchema = this.schemas[schemaKey];
                        this.isSchemaPaused(cachedSchema) && delete this.schemas[schemaKey];
                    }
                } else this.pauseAllSchemasReason = void 0;
            }, ConceptualSchemaProxy.prototype.isSchemaPaused = function(cache) {
                return !!this.pauseAllSchemasReason || cache && !cache.promise;
            }, ConceptualSchemaProxy.prototype.getPauseReason = function(cache) {
                return cache && cache.pauseReason ? cache.pauseReason : this.pauseAllSchemasReason;
            }, ConceptualSchemaProxy.prototype.rejectPendingDeferred = function(reason, schemaKey) {
                var keys, cachedSchema;
                schemaKey ? (keys = {}, keys[schemaKey] = null) : keys = this.schemas;
                for (var key in keys) cachedSchema = this.schemas[key], cachedSchema.deferred && cachedSchema.deferred.reject(reason), 
                delete this.schemas[key].promise, delete this.schemas[key].deferred;
            }, ConceptualSchemaProxy.prototype.onSuccess = function(schemaReader, response, key, deferred) {
                var transformed = schemaReader.transform(response);
                if (transformed.error) return void this.onErrorCore(transformed, key, deferred);
                var cacheEntry = this.schemas[key];
                cacheEntry && (cacheEntry.result = transformed.schema, cacheEntry.data = response.data), 
                deferred.resolve(transformed.schema);
            }, ConceptualSchemaProxy.prototype.onError = function(schemaReader, response, key, deferred) {
                var transformed = schemaReader.transform(response);
                this.onErrorCore(transformed, key, deferred);
            }, ConceptualSchemaProxy.prototype.onErrorCore = function(transformed, key, deferred) {
                delete this.schemas[key], transformed.error && transformed.error.serviceError && (transformed.error.clientError = new powerbi.ServiceErrorToClientError(transformed.error.serviceError), 
                transformed.error.clientError.requestId = transformed.error.requestId), deferred.reject(transformed.error);
            }, ConceptualSchemaProxy.prototype.canCache = function(dataSources) {
                return 1 === _.uniq(dataSources, function(d) {
                    return data.DataReaderUtils.readerType(d);
                }).length;
            }, ConceptualSchemaProxy.prototype.generateSchemaKey = function(dataSources) {
                if (this.canCache(dataSources)) return JSON.stringify(_.map(dataSources, function(d) {
                    return {
                        id: d.id,
                        name: d.name,
                        type: data.DataReaderUtils.readerType(d)
                    };
                }));
            }, ConceptualSchemaProxy;
        }();
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var EnumExtensions = jsCommon.EnumExtensions, DataViewQueryEngine = function() {
            function DataViewQueryEngine() {}
            return DataViewQueryEngine.prototype.query = function(dataViews, selector, dataViewKinds, requestedValues) {
                if (_.isEmpty(dataViews) || !selector) return [];
                if (_.any(selector.data, function(dataIdentity) {
                    return !data.Selector.isScopeIdentity(dataIdentity);
                })) return [];
                var valuesToReturn;
                valuesToReturn = requestedValues ? requestedValues : selector.metadata ? [ selector.metadata ] : void 0;
                var valuesDetails = [];
                if (EnumExtensions.hasFlag(dataViewKinds, 8)) for (var _i = 0, dataViews_1 = dataViews; _i < dataViews_1.length; _i++) {
                    var dataView = dataViews_1[_i], visitor = new TableDataViewQueryVisitor(selector, valuesToReturn);
                    DataViewScan.visitTable(dataView.table, visitor), valuesDetails.push.apply(valuesDetails, visitor.valuesDetails);
                } else if (EnumExtensions.hasFlag(dataViewKinds, 1)) for (var _a = 0, dataViews_2 = dataViews; _a < dataViews_2.length; _a++) {
                    var dataView = dataViews_2[_a], visitor = new CategoricalDataViewQueryVisitor(selector, valuesToReturn);
                    DataViewScan.visitCategorical(dataView.categorical, visitor), valuesDetails.push.apply(valuesDetails, visitor.valuesDetails);
                }
                return valuesDetails;
            }, DataViewQueryEngine;
        }();
        data.DataViewQueryEngine = DataViewQueryEngine;
        var DataViewScan, CategoricalDataViewQueryVisitor = function() {
            function CategoricalDataViewQueryVisitor(selector, requestedValues) {
                this.requestedValues = requestedValues, this.identities = selector.data, this.valuesDetails = [];
            }
            return CategoricalDataViewQueryVisitor.prototype.visitValueColumn = function(valueColumn) {
                return !!_.isEmpty(this.requestedValues) || _.contains(this.requestedValues, valueColumn.source.queryName);
            }, CategoricalDataViewQueryVisitor.prototype.visitValue = function(value, selector, columnMetadata, categories, index) {
                DataViewScan.isIdentityFilteredOut(this.identities, selector.data) || this.valuesDetails.push({
                    expr: columnMetadata.expr,
                    value: value,
                    formattedValue: powerbi.visuals.valueFormatter.format(value, columnMetadata.format)
                });
            }, CategoricalDataViewQueryVisitor;
        }(), TableDataViewQueryVisitor = function() {
            function TableDataViewQueryVisitor(selector, requestedValues) {
                this.requestedValues = requestedValues, this.identities = selector.data, this.valuesDetails = [], 
                this.requestedColumnsIndices = [];
            }
            return TableDataViewQueryVisitor.prototype.visitColumn = function(valueColumn, columnIndex) {
                (valueColumn.isMeasure && _.isEmpty(this.requestedValues) || _.contains(this.requestedValues, valueColumn.queryName)) && this.requestedColumnsIndices.push(columnIndex);
            }, TableDataViewQueryVisitor.prototype.visitRow = function(table, rowIndex) {
                table.rows[rowIndex];
                if (!table.identity || !DataViewScan.isIdentityFilteredOut(this.identities, [ table.identity[rowIndex] ])) for (var _i = 0, _a = this.requestedColumnsIndices; _i < _a.length; _i++) {
                    var columnIndex = _a[_i], value = table.rows[rowIndex][columnIndex], columnMetadata = table.columns[columnIndex];
                    this.valuesDetails.push({
                        expr: columnMetadata.expr,
                        value: value,
                        formattedValue: powerbi.visuals.valueFormatter.format(value, columnMetadata.format)
                    });
                }
            }, TableDataViewQueryVisitor;
        }();
        !function(DataViewScan) {
            function isIdentityFilteredOut(identitiesToInclude, identitiesToCheck) {
                for (var _loop_7 = function(identitieToInclude) {
                    if (!_.any(identitiesToCheck, function(dataIdentity) {
                        return powerbi.DataViewScopeIdentity.equals(identitieToInclude, dataIdentity);
                    })) return {
                        value: !0
                    };
                }, _i = 0, identitiesToInclude_1 = identitiesToInclude; _i < identitiesToInclude_1.length; _i++) {
                    var identitieToInclude = identitiesToInclude_1[_i], state_2 = _loop_7(identitieToInclude);
                    if ("object" == typeof state_2) return state_2.value;
                }
                return !1;
            }
            function visitCategorical(dataView, visitor) {
                if (dataView && !_.isEmpty(dataView.values)) for (var categoryColumn = _.first(dataView.categories), categoryIdentities = categoryColumn && _.clone(categoryColumn.identity), valueGroups = dataView.values.grouped(), _i = 0, valueGroups_1 = valueGroups; _i < valueGroups_1.length; _i++) for (var valueGroup = valueGroups_1[_i], valueGroupIdentity = valueGroup.identity, _a = 0, _b = valueGroup.values; _a < _b.length; _a++) {
                    var valueColumn = _b[_a];
                    if (visitor.visitValueColumn(valueColumn)) for (var keys = Object.keys(valueColumn.values), i = 0; i < keys.length; i++) {
                        var key = keys[i], value = valueColumn.values[key], source = valueColumn.source, selector = {
                            data: categoryIdentities ? [ categoryIdentities[i] ] : [],
                            metadata: source.queryName
                        };
                        valueGroupIdentity && selector.data.push(valueGroupIdentity), visitor.visitValue(value, selector, valueColumn.source, dataView.categories, i);
                    }
                }
            }
            function visitTable(dataView, visitor) {
                if (dataView && !_.isEmpty(dataView.rows)) {
                    for (var dataViewColumns = dataView.columns, columnIndex = 0; columnIndex < dataViewColumns.length; columnIndex++) visitor.visitColumn(dataViewColumns[columnIndex], columnIndex);
                    for (var rowIndex = 0; rowIndex < dataView.rows.length; rowIndex++) visitor.visitRow(dataView, rowIndex);
                }
            }
            DataViewScan.isIdentityFilteredOut = isIdentityFilteredOut, DataViewScan.visitCategorical = visitCategorical, 
            DataViewScan.visitTable = visitTable;
        }(DataViewScan = data.DataViewScan || (data.DataViewScan = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        function createDefaultFederatedSchemaValidator() {
            return {
                validate: _.noop
            };
        }
        data.createDefaultFederatedSchemaValidator = createDefaultFederatedSchemaValidator;
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var services;
        !function(services) {
            var DataViewObjectSerializer;
            !function(DataViewObjectSerializer) {
                function deserializeObjects(input, descriptors) {
                    if (input) {
                        var result = {};
                        for (var objectName in input) {
                            var descriptor = void 0;
                            if (!descriptors || (descriptor = descriptors[objectName])) for (var objectEntries = input[objectName], resultEntries = result[objectName] = [], i = 0, len = objectEntries.length; i < len; i++) resultEntries.push(deserializeObject(objectEntries[i], descriptor, !descriptors));
                        }
                        return result;
                    }
                }
                function deserializeSelectors(input) {
                    if (input) return _.map(input, deserializeSelector);
                }
                function serializeSelectors(input) {
                    if (input) return _.map(input, serializeSelector);
                }
                function serializeValueType(input) {
                    if (input) return {
                        category: input.categoryString,
                        underlyingType: input.extendedType
                    };
                }
                function deserializeValueType(input) {
                    if (input) return new powerbi.ValueType(input.underlyingType, input.category);
                }
                function deserializeObject(input, descriptor, forceDeserialize) {
                    if (input) {
                        var result = {
                            properties: deserializeObjectProperties(input.properties, descriptor ? descriptor.properties : null, forceDeserialize)
                        }, selector = deserializeSelector(input.selector);
                        return selector && (result.selector = selector), result;
                    }
                }
                function deserializeSelector(input) {
                    if (input) {
                        var result = {};
                        return input.data && (result.data = _.map(input.data, function(v) {
                            return deserializeDataRepetitionSelector(v);
                        })), input.metadata && (result.metadata = input.metadata), input.id && (result.id = input.id), 
                        result;
                    }
                }
                function deserializeSelectorsByColumn(input) {
                    if (input) {
                        var result = {};
                        if (input.dataMap) {
                            result.dataMap = {};
                            for (var key in input.dataMap) result.dataMap[key] = _.map(input.dataMap[key], function(selector) {
                                return deserializeDataRepetitionSelector(selector);
                            });
                        }
                        return input.metadata && (result.metadata = input.metadata), input.id && (result.id = input.id), 
                        result;
                    }
                }
                function deserializeVisualObjects(input) {
                    if (input) return _.map(input, function(item) {
                        return {
                            objectName: item.objectName,
                            selectorsByColumn: deserializeSelectorsByColumn(item.selectorsByColumn)
                        };
                    });
                }
                function deserializeDataRepetitionSelector(input) {
                    return input.scopeId ? deserializeScopeIdentity(input) : input.wildcard ? data.DataViewScopeWildcard.fromExprs(_.map(input.wildcard, services.SemanticQuerySerializer.deserializeExpr)) : input.roles ? data.DataViewRoleWildcard.fromRoles(input.roles) : input.total ? data.DataViewScopeTotal.fromExprs(_.map(input.total, services.SemanticQuerySerializer.deserializeExpr)) : void 0;
                }
                function deserializeObjectProperties(input, propertyDescriptors, forceDeserialize) {
                    if (input) {
                        var result = {};
                        for (var propertyName in input) {
                            var propertyValue = deserializeObjectProperty(input[propertyName], propertyDescriptors ? propertyDescriptors[propertyName] : null, forceDeserialize);
                            void 0 !== propertyValue && (result[propertyName] = propertyValue);
                        }
                        return result;
                    }
                }
                function deserializeObjectProperty(input, propertyDescriptor, forceDeserialize) {
                    if (propertyDescriptor) {
                        var type = parseType(propertyDescriptor.type);
                        return type.value ? deserializePropertyValueType(input, type.value) : deserializePropertyStructuralType(input, type.structural);
                    }
                    if (forceDeserialize && input) {
                        if (input.expr) return services.SemanticQuerySerializer.deserializeExpr(input.expr);
                        if (input.solid) return deserializePropertyStructuralType(input, fillColorType);
                        if (input.filter) return services.SemanticQuerySerializer.deserializeFilter(input.filter);
                    }
                }
                function deserializePropertyValueType(input, type) {
                    if (void 0 !== type.primitiveType && input.expr) return services.SemanticQuerySerializer.deserializeExpr(input.expr);
                }
                function deserializePropertyStructuralType(input, type) {
                    if (!(type.fill && type.fill.solid && type.fill.solid.color && input)) {
                        if (type.fillRule) {
                            var fillRuleDefinition = input, deserializedFillRuleDefinition = getParsedFillRule(fillRuleDefinition, deserializePropertyValueType);
                            if (deserializedFillRuleDefinition) return deserializedFillRuleDefinition;
                        }
                        var complexInput = input;
                        return type.filter && complexInput && complexInput.filter ? services.SemanticQuerySerializer.deserializeFilter(complexInput.filter) : type.image && complexInput && complexInput.image ? deserializeImage(complexInput.image) : type.geoJson && complexInput && complexInput.geoJson ? deserializeGeoJson(complexInput.geoJson) : type.paragraphs && input ? deserializeParagraphs(input) : type.queryTransform && input ? deserializeTransform(input) : type.dataBars && input ? deserializeDataBars(input) : void 0;
                    }
                    var fillDefn = input;
                    if (fillDefn.solid && fillDefn.solid.color) return {
                        solid: {
                            color: deserializePropertyValueType(fillDefn.solid.color, powerbi.ValueType.fromPrimitiveTypeAndCategory(1))
                        }
                    };
                }
                function deserializeImage(input) {
                    var result = {
                        name: deserializePropertyValueType(input.name, textType),
                        url: deserializePropertyValueType(input.url, powerbi.ValueType.fromDescriptor(powerbi.ImageDefinition.urlType))
                    };
                    return input.scaling && (result.scaling = deserializePropertyValueType(input.scaling, textType)), 
                    result;
                }
                function deserializeGeoJson(input) {
                    var result = {
                        type: deserializePropertyValueType(input.type, textType),
                        name: deserializePropertyValueType(input.name, textType),
                        content: deserializePropertyValueType(input.content, textType)
                    };
                    return result;
                }
                function deserializeParagraphs(input) {
                    return _.map(input, function(paragraphInput) {
                        var paragraphDefn = {
                            textRuns: _.map(paragraphInput.textRuns, function(textRunInput) {
                                var textRunDefn = {
                                    value: deserializePropertyValueType(textRunInput.value, textType) || textRunInput.value
                                };
                                return textRunInput.textStyle && (textRunDefn.textStyle = textRunInput.textStyle), 
                                textRunInput.url && (textRunDefn.url = textRunInput.url), textRunDefn;
                            })
                        };
                        return paragraphInput.horizontalTextAlignment && (paragraphDefn.horizontalTextAlignment = paragraphInput.horizontalTextAlignment), 
                        paragraphDefn;
                    });
                }
                function deserializeTransform(input) {
                    var result = {
                        algorithm: input.algorithm,
                        parameters: _.map(input.parameters, function(parameter) {
                            return {
                                name: parameter.Name,
                                expr: services.SemanticQuerySerializer.deserializeExpr(parameter)
                            };
                        })
                    };
                    return result;
                }
                function deserializeDataBars(input) {
                    return {
                        minValue: input.minValue ? deserializePropertyValueType(input.minValue, numericType) : void 0,
                        maxValue: input.maxValue ? deserializePropertyValueType(input.maxValue, numericType) : void 0,
                        positiveColor: deserializePropertyStructuralType(input.positiveColor, fillColorType),
                        negativeColor: deserializePropertyStructuralType(input.negativeColor, fillColorType),
                        axisColor: deserializePropertyStructuralType(input.axisColor, fillColorType),
                        reverseDirection: deserializePropertyValueType(input.reverseDirection, boolType),
                        hideText: deserializePropertyValueType(input.hideText, boolType)
                    };
                }
                function deserializeScopeIdentity(input) {
                    if (input.scopeId) {
                        var sqExpr = services.SemanticQuerySerializer.deserializeExpr(input.scopeId);
                        if (sqExpr) return data.createDataViewScopeIdentity(sqExpr);
                    }
                }
                function serializeObjects(contract, descriptors) {
                    if (contract) {
                        var result = {};
                        for (var objectName in contract) {
                            var descriptor = void 0;
                            if (!descriptors || (descriptor = descriptors[objectName])) for (var objectEntries = contract[objectName], resultEntries = result[objectName] = [], i = 0, len = objectEntries.length; i < len; i++) resultEntries.push(serializeObject(objectEntries[i], descriptor, !descriptors));
                        }
                        return result;
                    }
                }
                function serializeObject(contract, descriptor, forceSerialize) {
                    if (contract) {
                        var properties = serializeObjectProperties(contract.properties, descriptor ? descriptor.properties : null, forceSerialize);
                        if (properties) {
                            var result = {
                                properties: properties
                            }, selector = serializeSelector(contract.selector);
                            return selector && (result.selector = selector), result;
                        }
                    }
                }
                function serializeSelector(contract) {
                    if (contract) {
                        var result = {};
                        return contract.data && (result.data = _.map(contract.data, function(v) {
                            return serializeDataRepetitionSelector(v);
                        })), contract.metadata && (result.metadata = contract.metadata), contract.id && (result.id = contract.id), 
                        result;
                    }
                }
                function serializeSelectorsByColumn(contract) {
                    if (contract) {
                        var result = {};
                        if (contract.dataMap) {
                            result.dataMap = {};
                            for (var key in contract.dataMap) {
                                var dataRepetitionSelectors = jsCommon.ArrayExtensions.ensureArray(contract.dataMap[key]);
                                result.dataMap[key] = _.map(dataRepetitionSelectors, function(selector) {
                                    return serializeDataRepetitionSelector(selector);
                                });
                            }
                        }
                        return contract.metadata && (result.metadata = contract.metadata), contract.id && (result.id = contract.id), 
                        result;
                    }
                }
                function serializeVisualObjects(input) {
                    if (input) return _.map(input, function(item) {
                        return {
                            objectName: item.objectName,
                            selectorsByColumn: serializeSelectorsByColumn(item.selectorsByColumn)
                        };
                    });
                }
                function serializeDataRepetitionSelector(contract) {
                    return data.Selector.isScopeIdentity(contract) && contract.expr ? serializeScopeIdentity(contract) : data.Selector.isScopeWildcard(contract) && contract.exprs ? {
                        wildcard: _.map(contract.exprs, services.SemanticQuerySerializer.serializeExpr)
                    } : data.Selector.isRoleWildcard(contract) && contract.roles ? {
                        roles: contract.roles
                    } : data.Selector.isScopeTotal(contract) && contract.exprs ? {
                        total: _.map(contract.exprs, services.SemanticQuerySerializer.serializeExpr)
                    } : void 0;
                }
                function serializeScopeIdentity(scopeId) {
                    return {
                        scopeId: services.SemanticQuerySerializer.serializeExpr(scopeId.expr)
                    };
                }
                function serializeObjectProperties(contract, descriptors, forceSerialize) {
                    if (contract) {
                        var result = {};
                        for (var propertyName in contract) {
                            var propertyDescriptor = descriptors ? descriptors[propertyName] : null;
                            if (forceSerialize || propertyDescriptor) {
                                var propertyValue = serializeObjectProperty(contract[propertyName], propertyDescriptor, forceSerialize);
                                void 0 === propertyValue || (result[propertyName] = propertyValue);
                            }
                        }
                        return result;
                    }
                }
                function serializeObjectProperty(contract, descriptor, forceSerialize) {
                    if (descriptor) {
                        var type = parseType(descriptor.type);
                        return type.value ? serializePropertyValueType(contract, type.value) : serializePropertyStructuralType(contract, type.structural);
                    }
                    if (forceSerialize && contract) {
                        if (contract instanceof data.SQExpr) return {
                            expr: services.SemanticQuerySerializer.serializeExpr(contract)
                        };
                        if (contract instanceof data.SemanticFilter) return {
                            filter: services.SemanticQuerySerializer.serializeFilter(contract)
                        };
                        if (contract.solid) return serializePropertyStructuralType(contract, fillColorType);
                    }
                }
                function serializePropertyValueType(contract, type) {
                    if (void 0 !== type.primitiveType && contract instanceof data.SQExpr) return {
                        expr: services.SemanticQuerySerializer.serializeExpr(contract)
                    };
                }
                function serializePropertyStructuralType(contract, type) {
                    if (type.fill && type.fill.solid && type.fill.solid.color && contract) {
                        var fillDefn = contract;
                        return {
                            solid: {
                                color: serializePropertyValueType(fillDefn.solid.color, powerbi.ValueType.fromPrimitiveTypeAndCategory(1))
                            }
                        };
                    }
                    if (type.fillRule) {
                        var fillRuleDefinition = contract, serializedFillRuleDefinition = getParsedFillRule(fillRuleDefinition, serializePropertyValueType);
                        if (serializedFillRuleDefinition) return serializedFillRuleDefinition;
                    }
                    if (type.filter && contract) return {
                        filter: services.SemanticQuerySerializer.serializeFilter(contract)
                    };
                    if (type.image && contract) return {
                        image: serializeImage(contract)
                    };
                    if (type.geoJson && contract) return {
                        geoJson: serializeGeoJson(contract)
                    };
                    if (type.paragraphs && contract) {
                        var paragraphsDefinition = contract;
                        return serializeParagraphs(paragraphsDefinition);
                    }
                    return type.queryTransform && contract ? serializeTransform(contract) : type.dataBars && contract ? serializeDataBars(contract) : void 0;
                }
                function serializeImage(definition) {
                    var serialized = {
                        name: serializePropertyValueType(definition.name, textType),
                        url: serializePropertyValueType(definition.url, powerbi.ValueType.fromDescriptor(powerbi.ImageDefinition.urlType))
                    };
                    return definition.scaling && (serialized.scaling = serializePropertyValueType(definition.scaling, textType)), 
                    serialized;
                }
                function serializeGeoJson(definition) {
                    var serialized = {
                        type: serializePropertyValueType(definition.type, textType),
                        name: serializePropertyValueType(definition.name, textType),
                        content: serializePropertyValueType(definition.content, textType)
                    };
                    return serialized;
                }
                function serializeParagraphs(definition) {
                    return _.map(definition, function(paragraphDefn) {
                        var paragraphSerialized = {
                            textRuns: _.map(paragraphDefn.textRuns, function(runDefn) {
                                var runSerialized = {
                                    value: serializePropertyValueType(runDefn.value, textType) || runDefn.value
                                };
                                return runDefn.textStyle && (runSerialized.textStyle = runDefn.textStyle), runDefn.url && (runSerialized.url = runDefn.url), 
                                runSerialized;
                            })
                        };
                        return paragraphDefn.horizontalTextAlignment && (paragraphSerialized.horizontalTextAlignment = paragraphDefn.horizontalTextAlignment), 
                        paragraphSerialized;
                    });
                }
                function serializeTransform(definition) {
                    return {
                        algorithm: definition.algorithm,
                        parameters: _.map(definition.parameters, function(parameter) {
                            var queryExpressionContainer = services.SemanticQuerySerializer.serializeExpr(parameter.expr);
                            return queryExpressionContainer.Name = parameter.name, queryExpressionContainer;
                        })
                    };
                }
                function serializeDataBars(definition) {
                    return {
                        minValue: serializePropertyValueType(definition.minValue, numericType),
                        maxValue: serializePropertyValueType(definition.maxValue, numericType),
                        positiveColor: serializePropertyStructuralType(definition.positiveColor, fillColorType),
                        negativeColor: serializePropertyStructuralType(definition.negativeColor, fillColorType),
                        axisColor: serializePropertyStructuralType(definition.axisColor, fillColorType),
                        reverseDirection: serializePropertyValueType(definition.reverseDirection, boolType),
                        hideText: serializePropertyValueType(definition.hideText, boolType)
                    };
                }
                function parseType(typeDescriptor) {
                    var valueType = powerbi.ValueType.fromDescriptor(typeDescriptor);
                    return 0 !== valueType.primitiveType ? {
                        value: valueType
                    } : {
                        structural: typeDescriptor
                    };
                }
                function getParsedFillRule(fillRuleDefn, serializationDelegate) {
                    if (fillRuleDefn.linearGradient2) {
                        var input = fillRuleDefn.linearGradient2, output = {
                            min: {
                                color: serializationDelegate(input.min.color, powerbi.ValueType.fromPrimitiveTypeAndCategory(1))
                            },
                            max: {
                                color: serializationDelegate(input.max.color, powerbi.ValueType.fromPrimitiveTypeAndCategory(1))
                            }
                        };
                        return input.min.value && (output.min.value = serializationDelegate(input.min.value, powerbi.ValueType.fromPrimitiveTypeAndCategory(3))), 
                        input.max.value && (output.max.value = serializationDelegate(input.max.value, powerbi.ValueType.fromPrimitiveTypeAndCategory(3))), 
                        input.nullColoringStrategy && (output.nullColoringStrategy = {
                            strategy: serializationDelegate(input.nullColoringStrategy.strategy, powerbi.ValueType.fromPrimitiveTypeAndCategory(1))
                        }, input.nullColoringStrategy.color && (output.nullColoringStrategy.color = serializationDelegate(input.nullColoringStrategy.color, powerbi.ValueType.fromPrimitiveTypeAndCategory(1)))), 
                        {
                            linearGradient2: output
                        };
                    }
                    if (fillRuleDefn.linearGradient3) {
                        var input = fillRuleDefn.linearGradient3, output = {
                            min: {
                                color: serializationDelegate(input.min.color, powerbi.ValueType.fromPrimitiveTypeAndCategory(1))
                            },
                            mid: {
                                color: serializationDelegate(input.mid.color, powerbi.ValueType.fromPrimitiveTypeAndCategory(1))
                            },
                            max: {
                                color: serializationDelegate(input.max.color, powerbi.ValueType.fromPrimitiveTypeAndCategory(1))
                            }
                        };
                        return input.min.value && (output.min.value = serializationDelegate(input.min.value, powerbi.ValueType.fromPrimitiveTypeAndCategory(3))), 
                        input.mid.value && (output.mid.value = serializationDelegate(input.mid.value, powerbi.ValueType.fromPrimitiveTypeAndCategory(3))), 
                        input.max.value && (output.max.value = serializationDelegate(input.max.value, powerbi.ValueType.fromPrimitiveTypeAndCategory(3))), 
                        input.nullColoringStrategy && (output.nullColoringStrategy = {
                            strategy: serializationDelegate(input.nullColoringStrategy.strategy, powerbi.ValueType.fromPrimitiveTypeAndCategory(1))
                        }, input.nullColoringStrategy.color && (output.nullColoringStrategy.color = serializationDelegate(input.nullColoringStrategy.color, powerbi.ValueType.fromPrimitiveTypeAndCategory(1)))), 
                        {
                            linearGradient3: output
                        };
                    }
                    if (fillRuleDefn.conditional) {
                        for (var input = fillRuleDefn.conditional, output = {
                            cases: new Array(input.cases.length)
                        }, i = 0, len = input.cases.length; i < len; i++) {
                            var inputCase = input.cases[i];
                            output.cases[i] = {
                                condition: serializationDelegate(inputCase.condition, boolType),
                                color: serializationDelegate(inputCase.color, textType)
                            };
                        }
                        return input.nullColoringStrategy && (output.nullColoringStrategy = {
                            strategy: serializationDelegate(input.nullColoringStrategy.strategy, powerbi.ValueType.fromPrimitiveTypeAndCategory(1))
                        }, input.nullColoringStrategy.color && (output.nullColoringStrategy.color = serializationDelegate(input.nullColoringStrategy.color, powerbi.ValueType.fromPrimitiveTypeAndCategory(1)))), 
                        {
                            conditional: output
                        };
                    }
                    return null;
                }
                var boolType = powerbi.ValueType.fromDescriptor({
                    bool: !0
                }), numericType = powerbi.ValueType.fromDescriptor({
                    numeric: !0
                }), textType = powerbi.ValueType.fromDescriptor({
                    text: !0
                }), fillColorType = {
                    fill: {
                        solid: {
                            color: !0
                        }
                    }
                };
                DataViewObjectSerializer.deserializeObjects = deserializeObjects, DataViewObjectSerializer.deserializeSelectors = deserializeSelectors, 
                DataViewObjectSerializer.serializeSelectors = serializeSelectors, DataViewObjectSerializer.serializeValueType = serializeValueType, 
                DataViewObjectSerializer.deserializeValueType = deserializeValueType, DataViewObjectSerializer.deserializeSelector = deserializeSelector, 
                DataViewObjectSerializer.deserializeSelectorsByColumn = deserializeSelectorsByColumn, 
                DataViewObjectSerializer.deserializeVisualObjects = deserializeVisualObjects, DataViewObjectSerializer.deserializeScopeIdentity = deserializeScopeIdentity, 
                DataViewObjectSerializer.serializeObjects = serializeObjects, DataViewObjectSerializer.serializeSelector = serializeSelector, 
                DataViewObjectSerializer.serializeSelectorsByColumn = serializeSelectorsByColumn, 
                DataViewObjectSerializer.serializeVisualObjects = serializeVisualObjects, DataViewObjectSerializer.serializeScopeIdentity = serializeScopeIdentity, 
                DataViewObjectSerializer.serializeObjectProperty = serializeObjectProperty;
            }(DataViewObjectSerializer = services.DataViewObjectSerializer || (services.DataViewObjectSerializer = {}));
        }(services = data.services || (data.services = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var services;
        !function(services) {
            var DataViewTransformActionsSerializer;
            !function(DataViewTransformActionsSerializer) {
                function deserializeDataViewSelectTransforms(input) {
                    return services.DataViewTransformActionsUpgrade.V1.upgradeDataViewSelectTransform(input), 
                    _.map(input, function(item) {
                        var result = {
                            displayName: item.displayName,
                            format: item.format,
                            kpi: item.kpi,
                            queryName: item.queryName,
                            roles: item.roles,
                            sort: item.sort,
                            sortOrder: item.sortOrder,
                            type: services.DataViewObjectSerializer.deserializeValueType(item.type)
                        };
                        return item.expr && (result.expr = services.SemanticQuerySerializer.deserializeExpr(item.expr)), 
                        item.aggregateSources && (result.aggregateSources = item.aggregateSources), result;
                    });
                }
                function serializeDataViewSelectTransforms(input) {
                    return _.map(input, function(item) {
                        var result = {
                            displayName: item.displayName,
                            format: item.format,
                            kpi: item.kpi,
                            queryName: item.queryName,
                            roles: item.roles,
                            sort: item.sort,
                            sortOrder: item.sortOrder,
                            type: services.DataViewObjectSerializer.serializeValueType(item.type)
                        };
                        return item.expr && (result.expr = services.SemanticQuerySerializer.serializeExpr(item.expr)), 
                        item.aggregateSources && (result.aggregateSources = item.aggregateSources), result;
                    });
                }
                function serializeDataViewTransformActions(actions, objectDescriptors) {
                    actions = actions || {};
                    var wireActions = {
                        objects: actions.objects,
                        projectionOrdering: actions.roles && actions.roles.ordering,
                        projectionActiveItems: actions.roles && actions.roles.activeItems,
                        splits: actions.splits,
                        queryMetadata: null,
                        visualElements: null
                    };
                    return actions && actions.objects && (wireActions.objects = services.DataViewObjectSerializer.serializeObjects(actions.objects, objectDescriptors)), 
                    actions && actions.selects && (wireActions.selects = DataViewTransformActionsSerializer.serializeDataViewSelectTransforms(actions.selects)), 
                    wireActions;
                }
                function deserializeDataViewTransformActions(actions, objectDescriptors) {
                    var objectDefinitions = actions.objects ? services.DataViewObjectSerializer.deserializeObjects(actions.objects, objectDescriptors) : null, transformActions = DataViewTransformActionsSerializer.createTransformActions(actions.queryMetadata, actions.visualElements, objectDescriptors, objectDefinitions) || {}, activeItems = actions && actions.projectionActiveItems;
                    return _.isEmpty(activeItems) || upgradeActiveItemsIfNeeded(activeItems), transformActions.roles = {
                        ordering: actions.projectionOrdering,
                        activeItems: activeItems
                    }, transformActions.splits = actions.splits, actions.selects && (transformActions.selects = DataViewTransformActionsSerializer.deserializeDataViewSelectTransforms(actions.selects)), 
                    upgradeComboChartFromCY16SU04AndPrior(transformActions), transformActions;
                }
                function isStringArray(array) {
                    return _.isString(array[0]);
                }
                function upgradeActiveItemsIfNeeded(activeItems) {
                    for (var role in activeItems) {
                        var activeItemsPerRole = activeItems[role], upgradedActiveItems = void 0;
                        if (!_.isEmpty(activeItemsPerRole) && isStringArray(activeItemsPerRole)) {
                            var stringActiveItemsPerRole = activeItemsPerRole;
                            upgradedActiveItems = _.map(stringActiveItemsPerRole, function(activeItem) {
                                return {
                                    queryRef: activeItem
                                };
                            });
                        }
                        activeItems[role] = upgradedActiveItems || activeItemsPerRole;
                    }
                }
                function upgradeComboChartFromCY16SU04AndPrior(transformActions) {
                    var comboChartMeasureRole1 = "Y", comboChartMeasureRole2 = "Y2", projectionOrdering = transformActions.roles && transformActions.roles.ordering;
                    if (projectionOrdering) {
                        var selectIndexSharedByMeasureRoles = projectionOrdering[comboChartMeasureRole1] && 1 === projectionOrdering[comboChartMeasureRole1].length && _.contains(projectionOrdering[comboChartMeasureRole2], projectionOrdering[comboChartMeasureRole1][0]) ? projectionOrdering[comboChartMeasureRole1][0] : void 0;
                        if (void 0 !== selectIndexSharedByMeasureRoles) {
                            var firstOfTwoComboChartSplits = transformActions.splits && 2 === transformActions.splits.length && !transformActions.splits[0].selects[selectIndexSharedByMeasureRoles] && transformActions.splits[1].selects[selectIndexSharedByMeasureRoles] ? transformActions.splits[0] : void 0;
                            if (firstOfTwoComboChartSplits) {
                                var largestSelectIndexInFirstSplit = _.chain(Object.keys(firstOfTwoComboChartSplits.selects)).filter(function(selectIndex) {
                                    return firstOfTwoComboChartSplits.selects[selectIndex];
                                }).map(function(selectIndex) {
                                    return parseInt(selectIndex, 10);
                                }).max(function(selectIndex) {
                                    return selectIndex;
                                }).value();
                                if (largestSelectIndexInFirstSplit !== Number.NEGATIVE_INFINITY) {
                                    var isMissingSelectTransformInFirstSplit = transformActions.selects && transformActions.selects.length === largestSelectIndexInFirstSplit;
                                    if (isMissingSelectTransformInFirstSplit) {
                                        var selectTransformSharedByMeasureRoles = transformActions.selects[selectIndexSharedByMeasureRoles], areBothMeasureRolesAssignedToSameSelectTransform = selectTransformSharedByMeasureRoles && selectTransformSharedByMeasureRoles.roles[comboChartMeasureRole1] && selectTransformSharedByMeasureRoles.roles[comboChartMeasureRole2];
                                        if (areBothMeasureRolesAssignedToSameSelectTransform) {
                                            delete selectTransformSharedByMeasureRoles.roles[comboChartMeasureRole1];
                                            var newSelectTransform = __assign({}, selectTransformSharedByMeasureRoles);
                                            newSelectTransform.roles = (_a = {}, _a[comboChartMeasureRole1] = !0, _a), newSelectTransform.queryName = selectTransformSharedByMeasureRoles.queryName, 
                                            transformActions.selects[largestSelectIndexInFirstSplit] = newSelectTransform, transformActions.roles.ordering[comboChartMeasureRole1] = [ largestSelectIndexInFirstSplit ];
                                        }
                                        var _a;
                                    }
                                }
                            }
                        }
                    }
                }
                function serializeTransformActions(actions) {
                    return JSON.stringify(actions);
                }
                function createTransformActions(queryMetadata, visualElements, objectDescs, objectDefns) {
                    if (queryMetadata && !_.isEmpty(queryMetadata.Select) || !_.isEmpty(visualElements) || objectDefns) {
                        var transforms = {};
                        if (queryMetadata) {
                            var querySelects = queryMetadata.Select;
                            if (querySelects) for (var transformSelects = transforms.selects = [], i = 0, len = querySelects.length; i < len; i++) {
                                var selectMetadata = querySelects[i];
                                if (selectMetadata) {
                                    var selectTransform = toTransformSelect(selectMetadata, i);
                                    if (transformSelects.push(selectTransform), selectTransform.format && objectDescs) {
                                        var formatStringProp = data.DataViewObjectDescriptors.findFormatString(objectDescs);
                                        formatStringProp && (objectDefns || (objectDefns = {}), data.DataViewObjectDefinitions.setValue(objectDefns, formatStringProp, {
                                            metadata: selectTransform.queryName
                                        }, data.SQExprBuilder.text(selectTransform.format)));
                                    }
                                } else transformSelects.push(null);
                            }
                        }
                        if (visualElements) {
                            var visualElementsLength = visualElements.length;
                            visualElementsLength > 1 && (transforms.splits = []);
                            for (var i = 0; i < visualElementsLength; i++) {
                                var visualElement = visualElements[i];
                                visualElement.Settings && 0 === i && (objectDefns = upgradeSettingsToObjects(visualElement.Settings, objectDefns)), 
                                visualElement.DataRoles && (transforms.selects || (transforms.selects = []), transforms.roles || (transforms.roles = {
                                    ordering: {}
                                }), populateDataRoles(visualElement.DataRoles, transforms.selects, transforms.roles.ordering)), 
                                transforms.splits && transforms.splits.push(populateSplit(visualElement.DataRoles));
                            }
                        }
                        return objectDefns && (transforms.objects = objectDefns), transforms;
                    }
                }
                function toTransformSelect(select, index) {
                    var result = {};
                    return select.Restatement && (result.displayName = select.Restatement), select.Name ? result.queryName = select.Name : result.queryName || (result.queryName = "$select" + index), 
                    select.Format && (result.format = select.Format), select.Type && (result.type = describeDataType(select.Type, data.ConceptualDataCategory[select.DataCategory])), 
                    select.kpi && (result.kpi = select.kpi), select.kpiStatusGraphic && (result.kpi = {
                        graphic: select.kpiStatusGraphic
                    }), result;
                }
                function describeDataType(type, category) {
                    type = type || 0;
                    var primitiveType = 0;
                    switch (type) {
                      case 2048:
                        primitiveType = 1;
                        break;

                      case 1:
                        primitiveType = 3;
                        break;

                      case 3:
                        primitiveType = 4;
                        break;

                      case 4096:
                        primitiveType = 5;
                        break;

                      case 20:
                        primitiveType = 6;
                        break;

                      case 4:
                        primitiveType = 7;
                        break;

                      case 8:
                        primitiveType = 9;
                        break;

                      case 67:
                        primitiveType = 4, category = "Year";
                        break;

                      case 35:
                        primitiveType = 4, category = "Month";
                    }
                    return powerbi.ValueType.fromPrimitiveTypeAndCategory(primitiveType, category);
                }
                function populateDataRoles(roles, selects, projectionOrdering) {
                    for (var i = 0, len = roles.length; i < len; i++) {
                        var role = roles[i], roleProjection = role.Projection, roleName = role.Name, select = selects[roleProjection];
                        void 0 === select && (fillArray(selects, roleProjection), select = selects[roleProjection] = {});
                        var selectRoles = select.roles;
                        void 0 === select.roles && (selectRoles = select.roles = {}), selectRoles[roleName] = !0;
                        var projectionOrderingForRole = projectionOrdering[roleName];
                        void 0 === projectionOrderingForRole && (projectionOrderingForRole = projectionOrdering[roleName] = []), 
                        projectionOrderingForRole.push(roleProjection);
                    }
                }
                function fillArray(selects, length) {
                    for (var i = selects.length; i < length; i++) selects[i] = {};
                }
                function populateSplit(roles) {
                    var selects = {}, split = {
                        selects: selects
                    };
                    if (roles) for (var i = 0, len = roles.length; i < len; i++) {
                        var role = roles[i];
                        selects[role.Projection] = !0;
                    }
                    return split;
                }
                function upgradeSettingsToObjects(settings, objectDefns) {
                    if (settings) {
                        objectDefns || (objectDefns = {});
                        for (var propertyKey in settings) {
                            var propertyValue = settings[propertyKey], upgradedPropertyKey = propertyKey, upgradedPropertyValue = propertyValue, objectName = "general";
                            switch (propertyKey) {
                              case "hasScalarCategoryAxis":
                                objectName = "categoryAxis", upgradedPropertyKey = "axisType", upgradedPropertyValue = data.SQExprBuilder.text(propertyValue ? "Scalar" : "Categorical");
                                break;

                              case "Totals":
                                upgradedPropertyKey = "totals", upgradedPropertyValue = data.SQExprBuilder.boolean(!!propertyValue);
                                break;

                              case "textboxSettings":
                                upgradedPropertyKey = "paragraphs", propertyValue && propertyValue.paragraphs && (upgradedPropertyValue = propertyValue.paragraphs);
                                break;

                              case "VisualType1":
                                upgradedPropertyKey = "visualType1", upgradedPropertyValue = data.SQExprBuilder.text(propertyValue);
                                break;

                              case "VisualType2":
                                upgradedPropertyKey = "visualType2", upgradedPropertyValue = data.SQExprBuilder.text(propertyValue);
                                break;

                              case "imageVisualSettings":
                                upgradedPropertyKey = "imageUrl", propertyValue && propertyValue.imageUrl && (upgradedPropertyValue = data.SQExprBuilder.text(propertyValue.imageUrl));
                                break;

                              default:
                                continue;
                            }
                            setObjectDefinition(objectDefns, objectName, upgradedPropertyKey, upgradedPropertyValue);
                        }
                        return objectDefns;
                    }
                }
                function setObjectDefinition(objects, objectName, propertyName, value) {
                    var objectContainer = objects[objectName];
                    void 0 === objectContainer && (objectContainer = objects[objectName] = []);
                    var object = objectContainer[0];
                    void 0 === object && (object = objectContainer[0] = {
                        properties: {}
                    }), object.properties[propertyName] = value;
                }
                DataViewTransformActionsSerializer.deserializeDataViewSelectTransforms = deserializeDataViewSelectTransforms, 
                DataViewTransformActionsSerializer.serializeDataViewSelectTransforms = serializeDataViewSelectTransforms, 
                DataViewTransformActionsSerializer.serializeDataViewTransformActions = serializeDataViewTransformActions, 
                DataViewTransformActionsSerializer.deserializeDataViewTransformActions = deserializeDataViewTransformActions, 
                DataViewTransformActionsSerializer.serializeTransformActions = serializeTransformActions, 
                DataViewTransformActionsSerializer.createTransformActions = createTransformActions, 
                DataViewTransformActionsSerializer.upgradeSettingsToObjects = upgradeSettingsToObjects;
            }(DataViewTransformActionsSerializer = services.DataViewTransformActionsSerializer || (services.DataViewTransformActionsSerializer = {}));
        }(services = data.services || (data.services = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var services;
        !function(services) {
            var DataViewObjectDescriptorSerializer, directStringResourceProvider = {
                get: function(value) {
                    return value;
                },
                getOptional: function(value) {
                    return value;
                }
            };
            !function(DataViewObjectDescriptorSerializer) {
                function serialize(objectDescriptors, resourceProvider) {
                    var result = {};
                    for (var key in objectDescriptors) result[key] = serializeObjectDescriptor(objectDescriptors[key], resourceProvider || directStringResourceProvider);
                    return result;
                }
                function deserialize(wireObjectDescriptors) {
                    var result = {};
                    for (var key in wireObjectDescriptors) result[key] = deserializeObjectDescriptor(wireObjectDescriptors[key]);
                    return result;
                }
                function serializeObjectDescriptor(objectDescriptor, resourceProvider) {
                    if (objectDescriptor) {
                        var result = {
                            properties: {}
                        };
                        objectDescriptor.displayName && (result.displayName = data.getDisplayName(objectDescriptor.displayName, resourceProvider)), 
                        objectDescriptor.description && (result.description = data.getDisplayName(objectDescriptor.description, resourceProvider));
                        for (var key in objectDescriptor.properties) result.properties[key] = serializePropertyDescriptor(objectDescriptor.properties[key], resourceProvider);
                        return result;
                    }
                }
                function deserializeObjectDescriptor(value) {
                    var result = {
                        properties: {}
                    };
                    value.displayName && (result.displayName = data.createDisplayNameGetter(value.displayName)), 
                    value.description && (result.description = data.createDisplayNameGetter(value.description));
                    for (var key in value.properties) result.properties[key] = deserializePropertyDescriptor(value.properties[key]);
                    return result;
                }
                function serializePropertyDescriptor(propertyDescriptor, resourceProvider) {
                    var result = {
                        type: serializePropertyTypeDescriptor(propertyDescriptor.type, resourceProvider)
                    };
                    return propertyDescriptor.rule && (result.rule = propertyDescriptor.rule), propertyDescriptor.displayName && (result.displayName = data.getDisplayName(propertyDescriptor.displayName, resourceProvider)), 
                    propertyDescriptor.description && (result.description = data.getDisplayName(propertyDescriptor.description, resourceProvider)), 
                    propertyDescriptor.placeHolderText && (result.placeHolderText = data.getDisplayName(propertyDescriptor.placeHolderText, resourceProvider)), 
                    result;
                }
                function deserializePropertyDescriptor(value) {
                    var result = {
                        type: deserializePropertyTypeDescriptor(value.type)
                    };
                    return value.displayName && (result.displayName = data.createDisplayNameGetter(value.displayName)), 
                    value.description && (result.description = data.createDisplayNameGetter(value.description)), 
                    value.placeHolderText && (result.placeHolderText = data.createDisplayNameGetter(value.placeHolderText)), 
                    value.rule && (result.rule = value.rule), result;
                }
                function serializePropertyTypeDescriptor(typeDescriptor, resourceProvider) {
                    var result, valueType = powerbi.ValueType.fromDescriptor(typeDescriptor);
                    return result = valueType && valueType.enum ? {
                        enumeration: serializeEnumType(valueType.enum, resourceProvider)
                    } : typeDescriptor;
                }
                function deserializePropertyTypeDescriptor(value) {
                    var result;
                    return result = powerbi.ValueType.fromDescriptor(value) ? deserializeValueTypeDescriptor(value) : value;
                }
                function deserializeValueTypeDescriptor(value) {
                    var result;
                    if (value.enumeration) {
                        var enumType = deserializeEnumType(value.enumeration);
                        result = {
                            enumeration: enumType
                        };
                    } else {
                        result = {};
                        for (var key in value) result[key] = value[key];
                    }
                    return result;
                }
                function serializeEnumType(enumType, resourceProvider) {
                    return _.map(enumType.members(), function(member) {
                        return serializeEnumMember(member, resourceProvider);
                    });
                }
                function deserializeEnumType(value) {
                    return powerbi.createEnumType(value);
                }
                function serializeEnumMember(member, resourceProvider) {
                    return {
                        displayName: data.getDisplayName(member.displayName, resourceProvider),
                        value: member.value
                    };
                }
                DataViewObjectDescriptorSerializer.serialize = serialize, DataViewObjectDescriptorSerializer.deserialize = deserialize;
            }(DataViewObjectDescriptorSerializer = services.DataViewObjectDescriptorSerializer || (services.DataViewObjectDescriptorSerializer = {}));
        }(services = data.services || (data.services = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var services;
        !function(services) {
            var DataViewTransformActionsUpgrade;
            !function(DataViewTransformActionsUpgrade) {
                var V1;
                !function(V1) {
                    function upgradeDataViewSelectTransform(contract) {
                        if (contract) for (var _i = 0, contract_1 = contract; _i < contract_1.length; _i++) {
                            var selectTransform = contract_1[_i];
                            selectTransform.kpiStatusGraphic && (selectTransform.kpi = {
                                graphic: selectTransform.kpiStatusGraphic
                            });
                        }
                    }
                    V1.upgradeDataViewSelectTransform = upgradeDataViewSelectTransform;
                }(V1 = DataViewTransformActionsUpgrade.V1 || (DataViewTransformActionsUpgrade.V1 = {}));
            }(DataViewTransformActionsUpgrade = services.DataViewTransformActionsUpgrade || (services.DataViewTransformActionsUpgrade = {}));
        }(services = data.services || (data.services = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var tabular;
        !function(tabular) {
            tabular.type = "tabular";
        }(tabular = data.tabular || (data.tabular = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data_14) {
        var tabular;
        !function(tabular) {
            function createTabularDataCache() {
                return new TabularDataCache();
            }
            function getColumnsMetadata(row) {
                var columns = [];
                row = flattenJSON(row);
                for (var key in row) if (row.hasOwnProperty(key)) {
                    var propertyValue = row[key], column = {
                        name: key,
                        type: null
                    };
                    if (!propertyValue) continue;
                    _.isDate(propertyValue) || null != parseDate(propertyValue.toString().substr(0, 26)) ? column.type = {
                        dateTime: !0
                    } : isNaN(+propertyValue) ? _.isString(propertyValue) && (column.type = {
                        text: !0
                    }) : column.type = {
                        numeric: !0
                    }, column.type && columns.push(column);
                }
                return columns;
            }
            function parseDate(value) {
                var date, numValue = +value;
                if (isNaN(numValue)) date = jsCommon.DateExtensions.parseIsoDate(value.toString()); else {
                    var range = new Date();
                    range.setDate(range.getDate() - DateConversionRangeInDays);
                    var pastTime = range.getTime();
                    range = new Date(), range.setDate(range.getDate() + DateConversionRangeInDays);
                    var futureTime = range.getTime();
                    numValue < pastTime && (numValue *= 1e3), numValue > pastTime && numValue < futureTime && (date = new Date(numValue));
                }
                return date;
            }
            function flattenJSON(object) {
                try {
                    return flattenJSONInternal(object);
                } catch (e) {}
                return object;
            }
            function flattenJSONInternal(currentObject, result, columnPrefix) {
                return result || (result = {}), _.isObject(currentObject) ? _.forOwn(currentObject, function(value, key) {
                    flattenJSONInternal(value, result, columnPrefix ? columnPrefix + "." + key : key);
                }) : result[columnPrefix] = currentObject, result;
            }
            tabular.createTabularDataCache = createTabularDataCache, tabular.getColumnsMetadata = getColumnsMetadata, 
            tabular.parseDate = parseDate, tabular.flattenJSON = flattenJSON, tabular.MaxRealTimeDataWindowInMs = 36e5;
            var DateConversionRangeInDays = 7, TabularDataCache = function() {
                function TabularDataCache() {
                    this.clear();
                }
                return TabularDataCache.prototype.add = function(data) {
                    var key = this.getKey(data.modelId, data.name);
                    return this.tabularDataMap[key] = data, key;
                }, TabularDataCache.prototype.get = function(key) {
                    return this.tabularDataMap[key];
                }, TabularDataCache.prototype.remove = function(key) {
                    delete this.tabularDataMap[key];
                }, TabularDataCache.prototype.clear = function() {
                    this.tabularDataMap = {};
                }, TabularDataCache.prototype.getKey = function(modelId, tableName) {
                    return modelId + "_" + tableName;
                }, TabularDataCache.prototype.mergeRows = function(modelId, tableName, rowGroups, latestVersion) {
                    var key = this.getKey(modelId, tableName), existingData = this.get(key);
                    if (!existingData || !existingData.rowGroups) {
                        var data_15 = {
                            modelId: modelId,
                            name: tableName,
                            rowGroups: rowGroups,
                            lastVersion: latestVersion,
                            columns: existingData && existingData.columns
                        };
                        return this.constructColumnsMetadataIfNeeded(data_15), this.fixUpValues(data_15.rowGroups, data_15.columns), 
                        void this.add(data_15);
                    }
                    var result = [], existingDataRowGroups = existingData.rowGroups || [], newDataRowGroups = rowGroups || [];
                    for (this.fixUpValues(newDataRowGroups, existingData.columns); ;) {
                        if (_.isEmpty(existingDataRowGroups) && _.isEmpty(newDataRowGroups)) break;
                        var existingRow = _.first(existingDataRowGroups), newRow = _.first(newDataRowGroups);
                        existingRow && !newRow ? (this.appendRow(result, existingRow, latestVersion), existingDataRowGroups.shift()) : !existingRow && newRow ? (this.appendRow(result, newRow, latestVersion), 
                        newDataRowGroups.shift()) : existingRow.version < newRow.version ? (this.appendRow(result, existingRow, latestVersion), 
                        existingDataRowGroups.shift()) : newRow && (newDataRowGroups.shift(), existingRow.version === newRow.version && existingDataRowGroups.shift(), 
                        this.appendRow(result, newRow, latestVersion));
                    }
                    existingData.rowGroups = result, existingData.lastVersion = latestVersion;
                }, TabularDataCache.prototype.constructColumnsMetadataIfNeeded = function(tabularData) {
                    if (!tabularData.columns) {
                        var lastRowGroup = _.last(tabularData.rowGroups);
                        if (lastRowGroup) {
                            var lastRow = _.last(lastRowGroup.rows);
                            lastRow && (tabularData.columns = getColumnsMetadata(lastRow));
                        }
                    }
                }, TabularDataCache.prototype.fixUpValues = function(rowGroups, columns) {
                    if (!_.isEmpty(rowGroups)) {
                        for (var isDateTime = {}, isNumeric = {}, _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
                            var c = columns_1[_i];
                            isDateTime[c.name] = c.type && c.type.dateTime, isNumeric[c.name] = c.type && c.type.numeric;
                        }
                        for (var _a = 0, rowGroups_1 = rowGroups; _a < rowGroups_1.length; _a++) {
                            var rowGroup = rowGroups_1[_a];
                            if (rowGroup.rows) for (var i = 0; i < rowGroup.rows.length; i++) {
                                var row = rowGroup.rows[i] = flattenJSON(rowGroup.rows[i]);
                                for (var columnName in row) if (row.hasOwnProperty(columnName)) {
                                    var value = row[columnName];
                                    if (value) if (isDateTime[columnName]) {
                                        var dateObj = parseDate(value);
                                        dateObj && (row[columnName] = dateObj);
                                    } else if (isNumeric[columnName]) {
                                        var num = parseFloat(value.toString());
                                        isNaN(num) || (row[columnName] = num);
                                    }
                                }
                            }
                        }
                    }
                }, TabularDataCache.prototype.appendRow = function(rows, row, latestVersion) {
                    latestVersion - row.version > tabular.MaxRealTimeDataWindowInMs || rows.push(row);
                }, TabularDataCache;
            }();
        }(tabular = data_14.tabular || (data_14.tabular = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var tabular;
        !function(tabular) {
            function createQueryGenerator() {
                return new TabularDataQueryGenerator(data.services.SemanticQuerySerializer);
            }
            tabular.createQueryGenerator = createQueryGenerator;
            var TabularDataQueryGenerator = function() {
                function TabularDataQueryGenerator(serializer) {
                    this.serializer = serializer;
                }
                return TabularDataQueryGenerator.prototype.execute = function(options) {
                    var query = options.query, semanticQueryDataShapeCommand = {
                        Query: this.serializer.serializeQuery(query),
                        Binding: null
                    }, queryCommand = {
                        SemanticQueryDataShapeCommand: semanticQueryDataShapeCommand
                    }, entities = data.SQExprUtils.getActiveTablesNames(query), entity = entities[0];
                    return {
                        command: {
                            dataWindow: options.dataWindow,
                            tableName: entity,
                            mappings: options.mappings,
                            Commands: [ queryCommand ]
                        }
                    };
                }, TabularDataQueryGenerator;
            }();
        }(tabular = data.tabular || (data.tabular = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var tabular;
        !function(tabular) {
            function normalizedName(fullyQualifiedColumnName) {
                var index = _.indexOf(fullyQualifiedColumnName, ".");
                return index < 0 || index >= fullyQualifiedColumnName.length - 1 ? fullyQualifiedColumnName : fullyQualifiedColumnName.substr(index + 1);
            }
            var createDataViewScopeIdentity = powerbi.data.createDataViewScopeIdentity, UndefinedData = "UndefinedData";
            tabular.normalizedName = normalizedName;
            var TabularDataReader = function() {
                function TabularDataReader(host, tabularData) {
                    this.promiseFactory = host.promiseFactory(), this.tabularDataCache = tabularData, 
                    this.columnToIndexMap = {};
                }
                return TabularDataReader.prototype.execute = function(options) {
                    var dataSource = _.first(options.dataSources), command = options.command, tabularDataView = this.buildDataView(command, dataSource.modelId), deferred = this.promiseFactory.defer();
                    return deferred.resolve(tabularDataView), powerbi.RejectablePromise(deferred);
                }, TabularDataReader.prototype.transform = function(obj, kinds, perfId) {
                    return null == obj ? {
                        dataView: {
                            metadata: {
                                columns: []
                            },
                            error: {
                                code: UndefinedData
                            }
                        }
                    } : {
                        dataView: obj
                    };
                }, TabularDataReader.prototype.buildDataView = function(command, modelId) {
                    var _this = this, dataViewMapping = command.mappings[0], tabularDataCache = this.tabularDataCache, tabularData = tabularDataCache.get(tabularDataCache.getKey(modelId, command.tableName)), timeCutOffInSeconds = TabularDataReader.getLastVersion(tabularData) - command.dataWindow;
                    if (tabularData.rowGroups) {
                        var queryCommand = command && _.first(command.Commands);
                        if (queryCommand) {
                            var semanticQueryDataShapeCommand = queryCommand.SemanticQueryDataShapeCommand, selectExprs = semanticQueryDataShapeCommand && semanticQueryDataShapeCommand.Query && semanticQueryDataShapeCommand.Query.Select;
                            selectExprs && semanticQueryDataShapeCommand.Query.Select.map(function(val, index) {
                                _this.columnToIndexMap[normalizedName(val.Name)] = index;
                            });
                        }
                        var filteredRowGroups = this.filterTabularDataRowGroups(tabularData.rowGroups, timeCutOffInSeconds), dataView = this.createDataView({
                            rowGroups: filteredRowGroups,
                            columns: tabularData.columns,
                            modelId: tabularData.modelId,
                            name: tabularData.name
                        }, dataViewMapping);
                        return command.dataWindow && (dataView.metadata.objects = {
                            categoryAxis: {
                                duration: command.dataWindow
                            }
                        }), dataView;
                    }
                }, TabularDataReader.prototype.filterTabularDataRowGroups = function(rowGroups, cutOff) {
                    return _.filter(rowGroups, function(rowGroup) {
                        return rowGroup.version >= cutOff;
                    });
                }, TabularDataReader.prototype.createDataView = function(tabularData, mapping) {
                    var dataView = {
                        metadata: {
                            columns: []
                        }
                    }, dataViewColumns = this.extractColumns(mapping), columns = [];
                    if (mapping.categorical) {
                        var categoricalInfo = this.getCategoricalDataViewInfo(dataViewColumns.categorical, tabularData);
                        dataView.categorical = categoricalInfo.dataView, _.isEmpty(dataView.categorical.values) && (dataView.categorical.values = void 0), 
                        columns.push.apply(columns, categoricalInfo.columns);
                    }
                    if (mapping.single) {
                        var singleInfo = this.getSingleDataViewInfo(dataViewColumns.single, tabularData);
                        dataView.single = singleInfo.dataView;
                        var singleColMetadata = singleInfo.columns[0];
                        null == _.findWhere(columns, singleColMetadata) && columns.push(singleColMetadata);
                    }
                    return dataView.metadata.columns = columns, dataView;
                }, TabularDataReader.prototype.getCategoricalDataViewInfo = function(categoricalColumns, tabularData) {
                    var dataViewBuilder = data.createCategoricalDataViewBuilder();
                    if (!_.isEmpty(categoricalColumns.categories)) {
                        var categoryColumnOption = this.getCategoryColumnOption(categoricalColumns.categories, tabularData);
                        dataViewBuilder.withCategory(categoryColumnOption);
                    }
                    var valueColumnOption = this.getValueColumnOptions(categoricalColumns.categories, categoricalColumns.values, tabularData);
                    _.isEmpty(categoricalColumns.groupedValues) || categoricalColumns.groupedValues === categoricalColumns.categories ? dataViewBuilder.withValues({
                        columns: valueColumnOption
                    }) : this.addGroupValues(categoricalColumns, tabularData, dataViewBuilder, valueColumnOption);
                    var dataView = dataViewBuilder.build();
                    return {
                        dataView: dataView.categorical,
                        columns: dataView.metadata.columns
                    };
                }, TabularDataReader.prototype.addGroupValues = function(categoricalColumns, tabularData, dataViewBuilder, valueColumnOption) {
                    for (var groupColumnName = normalizedName(categoricalColumns.groupedValues), groupColumnCategoryOption = this.getCategoryColumnOption(groupColumnName, tabularData), groupValues = this.extractColumnValues(groupColumnName, tabularData), uniqColValues = TabularDataReader.getUniqueValues(groupValues), valIndexMap = this.getValueToIndicesMap(groupValues), dataMap = {}, valueColumnNames = categoricalColumns.values, _i = 0, valueColumnNames_1 = valueColumnNames; _i < valueColumnNames_1.length; _i++) for (var columnName = valueColumnNames_1[_i], normalizedColumnName = normalizedName(columnName), columnDataValues = this.extractColumnValues(normalizedColumnName, tabularData), _a = 0, uniqColValues_1 = uniqColValues; _a < uniqColValues_1.length; _a++) {
                        var uniqVal = uniqColValues_1[_a], stringValue = TabularDataReader.valueToString(uniqVal);
                        null == dataMap[stringValue] && (dataMap[stringValue] = []);
                        var indicesForUniqVal = valIndexMap[stringValue], dataForValue = _.at(columnDataValues, indicesForUniqVal);
                        dataMap[stringValue].push({
                            values: dataForValue
                        });
                    }
                    var groupedData = _.values(dataMap);
                    if (!_.isEmpty(groupedData)) {
                        var options = {
                            groupColumn: groupColumnCategoryOption,
                            valueColumns: valueColumnOption,
                            data: groupedData
                        };
                        dataViewBuilder.withGroupedValues(options);
                    }
                }, TabularDataReader.prototype.getValueToIndicesMap = function(values) {
                    for (var valIndexMap = {}, i = 0, len = values.length; i < len; i++) {
                        var val = TabularDataReader.valueToString(values[i]), occurrencePositionsArray = valIndexMap[val];
                        occurrencePositionsArray ? occurrencePositionsArray.push(i) : valIndexMap[val] = [ i ];
                    }
                    return valIndexMap;
                }, TabularDataReader.prototype.getSingleDataViewInfo = function(singleColumn, tabularData) {
                    var columnData = this.getColumnMetadataAndValues(singleColumn, tabularData), lastValueIndex = columnData.values.length - 1;
                    return {
                        dataView: {
                            value: columnData.values[lastValueIndex],
                            column: columnData.metadataColumn
                        },
                        columns: [ columnData.metadataColumn ]
                    };
                }, TabularDataReader.prototype.extractColumns = function(compiledMapping) {
                    var walkRoleItems = function(role, arrToUpdate) {
                        var items = role.items;
                        if (items) for (var _i = 0, items_6 = items; _i < items_6.length; _i++) {
                            var item = items_6[_i];
                            arrToUpdate.push(item.queryName);
                        }
                    }, dataViewColumns = {}, categoricalMapping = compiledMapping.categorical;
                    if (categoricalMapping) {
                        var categoryColumns_1 = [];
                        data.CompiledDataViewMapping.visitCategoricalCategories(categoricalMapping.categories, {
                            visitRole: function(role) {
                                walkRoleItems(role, categoryColumns_1);
                            }
                        });
                        var valuesColumns_1 = [];
                        data.CompiledDataViewMapping.visitCategoricalValues(categoricalMapping.values, {
                            visitRole: function(role) {
                                walkRoleItems(role, valuesColumns_1);
                            }
                        });
                        var groupedValueColumns_1 = [];
                        data.CompiledDataViewMapping.visitGrouped(categoricalMapping.values, {
                            visitRole: function(role) {
                                walkRoleItems(role, groupedValueColumns_1);
                            }
                        }), dataViewColumns.categorical = {
                            categories: categoryColumns_1[0],
                            groupedValues: groupedValueColumns_1[0],
                            values: valuesColumns_1
                        };
                    }
                    var singleMapping = compiledMapping.single;
                    if (singleMapping) {
                        var items = singleMapping.role && singleMapping.role.items;
                        dataViewColumns.single = items[0].queryName;
                    }
                    return dataViewColumns;
                }, TabularDataReader.prototype.getCategoryColumnOption = function(columnName, tabularData) {
                    var tabularColumnData = this.getColumnMetadataAndValues(columnName, tabularData), values = TabularDataReader.getUniqueValues(tabularColumnData.values), expr = data.SQExprBuilder.columnRef(data.SQExprBuilder.entity(null, tabularData.name), columnName), identities = _.map(values, function(value) {
                        return createDataViewScopeIdentity(data.SQExprBuilder.equal(expr, data.SQExprBuilder.text(value.toString())));
                    });
                    return {
                        source: tabularColumnData.metadataColumn,
                        values: values,
                        identityFrom: {
                            fields: [ expr ],
                            identities: identities
                        }
                    };
                }, TabularDataReader.prototype.getValueColumnOptions = function(categoryColumnName, columnNames, tabularData) {
                    for (var valueColumns = [], _i = 0, columnNames_1 = columnNames; _i < columnNames_1.length; _i++) {
                        var columnName = columnNames_1[_i], tabularColumnData = this.getColumnMetadataAndValues(columnName, tabularData, categoryColumnName), values = tabularColumnData.values;
                        categoryColumnName || _.isEmpty(values) || (values = [ _.last(values) ]);
                        var column = {
                            source: tabularColumnData.metadataColumn,
                            values: values,
                            minLocal: _.min(values),
                            maxLocal: _.max(values)
                        };
                        valueColumns.push(column);
                    }
                    return valueColumns;
                }, TabularDataReader.prototype.getColumnMetadataAndValues = function(columnName, tabularData, categoryColumnName) {
                    var tabularColumnValues, tabularDataColumns = tabularData.columns, normalizedColumnName = normalizedName(columnName), columnIndex = this.columnToIndexMap[normalizedColumnName];
                    if (categoryColumnName) {
                        var normalizedCategoryName = normalizedName(categoryColumnName);
                        tabularColumnValues = this.extractUniqueColumnValues(normalizedColumnName, tabularData, normalizedCategoryName);
                    } else tabularColumnValues = this.extractColumnValues(normalizedColumnName, tabularData);
                    var column = _.find(tabularDataColumns, function(c) {
                        return c.name === normalizedColumnName;
                    }), metadataColumn = TabularDataReader.createMetadataColumn(normalizedColumnName, columnIndex, powerbi.ValueType.fromDescriptor(column.type));
                    return {
                        metadataColumn: metadataColumn,
                        values: tabularColumnValues
                    };
                }, TabularDataReader.prototype.extractColumnValues = function(columnName, tabularData) {
                    for (var tabularDataGroups = tabularData.rowGroups, columnValues = [], _i = 0, tabularDataGroups_1 = tabularDataGroups; _i < tabularDataGroups_1.length; _i++) for (var rowGroup = tabularDataGroups_1[_i], _a = 0, _b = rowGroup.rows; _a < _b.length; _a++) {
                        var row = _b[_a];
                        columnValues.push(row[columnName]);
                    }
                    return columnValues;
                }, TabularDataReader.prototype.extractUniqueColumnValues = function(columnName, tabularData, categoryName) {
                    for (var tabularDataGroups = tabularData.rowGroups, categoryToMap = {}, _i = 0, tabularDataGroups_2 = tabularDataGroups; _i < tabularDataGroups_2.length; _i++) for (var rowGroup = tabularDataGroups_2[_i], _a = 0, _b = rowGroup.rows; _a < _b.length; _a++) {
                        var row = _b[_a], categoryValue = row[categoryName], key = TabularDataReader.valueToString(categoryValue);
                        categoryToMap[key] = row[columnName];
                    }
                    return _.values(categoryToMap);
                }, TabularDataReader.getLastVersion = function(tabularData) {
                    if (_.isEmpty(tabularData.rowGroups)) return tabularData.lastVersion ? tabularData.lastVersion : Number.NEGATIVE_INFINITY;
                    var lastVersion = Number.NEGATIVE_INFINITY;
                    if (!tabularData.rowGroups) return lastVersion;
                    for (var _i = 0, _a = tabularData.rowGroups; _i < _a.length; _i++) {
                        var rowGroup = _a[_i];
                        rowGroup.version > lastVersion && (lastVersion = rowGroup.version);
                    }
                    return lastVersion;
                }, TabularDataReader.createMetadataColumn = function(name, columnIndex, valueTypeDescriptor) {
                    var metadataColumn = {
                        displayName: name,
                        queryName: name,
                        index: columnIndex,
                        isMeasure: !1
                    };
                    return null != valueTypeDescriptor && (metadataColumn.type = valueTypeDescriptor, 
                    metadataColumn.isMeasure = !!valueTypeDescriptor.numeric), metadataColumn;
                }, TabularDataReader.getUniqueValues = function(values) {
                    return _.uniq(values, !1, function(val) {
                        return TabularDataReader.valueToString(val);
                    });
                }, TabularDataReader.valueToString = function(value) {
                    return _.isDate(value) ? value.getTime().toString() : value ? value.toString() : "";
                }, TabularDataReader;
            }();
            tabular.TabularDataReader = TabularDataReader;
        }(tabular = data.tabular || (data.tabular = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var alignment;
    !function(alignment) {
        alignment.right = "right", alignment.left = "left", alignment.center = "center";
    }(alignment = powerbi.alignment || (powerbi.alignment = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var dsr;
        !function(dsr) {
            function transformDataQueryToSemanticQueryDataShapeCommand(dataQuery) {
                return dataQuery.Commands[0].SemanticQueryDataShapeCommand;
            }
            function generateSemanticQueryRequest(queries, dataSources, cacheResponse, impersonationStateProvider) {
                var queryDataRequests = _.map(queries, function(dataQuery) {
                    return {
                        Query: dataQuery,
                        CacheKey: cacheResponse ? JSON.stringify(dataQuery) : void 0
                    };
                }), dataSource = dsr.single(dataSources), executeSemanticQueryRequest = {
                    queries: queryDataRequests,
                    modelId: dataSource.modelId
                };
                if (impersonationStateProvider && impersonationStateProvider.impersonating) {
                    var impersonationState = impersonationStateProvider.getImpersonationState();
                    impersonationState.modelId === executeSemanticQueryRequest.modelId && _.extend(executeSemanticQueryRequest, impersonationState);
                }
                return executeSemanticQueryRequest;
            }
            dsr.transformDataQueryToSemanticQueryDataShapeCommand = transformDataQueryToSemanticQueryDataShapeCommand, 
            dsr.generateSemanticQueryRequest = generateSemanticQueryRequest;
        }(dsr = data.dsr || (data.dsr = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data_16) {
        var CsvWriter;
        !function(CsvWriter) {
            function fromDataView(dataView) {
                var tableView = dataView.table;
                if (!tableView) return "";
                var columnsMetadata = tableView.columns, s = "";
                s += buildTableHeader(columnsMetadata) + "\r\n";
                for (var _i = 0, _a = tableView.rows; _i < _a.length; _i++) {
                    for (var row = _a[_i], data_17 = [], iCol = 0, len = row.length; iCol < len; iCol++) {
                        var metadata = columnsMetadata[iCol], valueType = metadata && metadata.type, format = metadata && metadata.format;
                        data_17.push(escapeValue(row[iCol], valueType, format));
                    }
                    data_17.length > 0 && (s += data_17.join(delimiter) + "\r\n");
                }
                return s;
            }
            function buildTableHeader(columnsMetadata) {
                for (var columnArray = [], _i = 0, columnsMetadata_1 = columnsMetadata; _i < columnsMetadata_1.length; _i++) {
                    var columnMetadata = columnsMetadata_1[_i];
                    columnArray.push(escapeStringValue(columnMetadata.displayName));
                }
                return columnArray.join(delimiter);
            }
            function escapeValue(value, valueType, format) {
                if (null == value) return "";
                valueType || (valueType = inferTypeFromValue(value));
                var stringValue = "";
                return stringValue = valueType.dateTime ? powerbi.formattingService.formatValue(value, dateFormat) : valueType.bool || valueType.numeric && !format ? value.toString() : valueType.numeric ? powerbi.formattingService.formatValue(value, sanitizeFormatValue(format)) : value.toString(), 
                escapeStringValue(stringValue);
            }
            function inferTypeFromValue(value) {
                return _.isDate(value) ? powerbi.ValueType.fromPrimitiveTypeAndCategory(6) : _.isBoolean(value) ? powerbi.ValueType.fromPrimitiveTypeAndCategory(5) : _.isNumber(value) ? powerbi.ValueType.fromPrimitiveTypeAndCategory(3) : powerbi.ValueType.fromPrimitiveTypeAndCategory(1);
            }
            function escapeStringValue(stringValue) {
                return null == stringValue ? "" : (stringValue = stringValue.replace(/\"/g, '""'), 
                _.contains(stringValue, "\n") || _.contains(stringValue, doubleQuotes) || _.contains(stringValue, delimiter) || _.contains(stringValue, "\r") || 0 === stringValue.length ? doubleQuotes + stringValue + doubleQuotes : stringValue);
            }
            function sanitizeFormatValue(format) {
                return format.replace(/(\r\n|\n|\r|,|")/g, "");
            }
            var doubleQuotes = '"', delimiter = ",", dateFormat = "yyyy-MM-dd HH:mm:ss";
            CsvWriter.fromDataView = fromDataView;
        }(CsvWriter = data_16.CsvWriter || (data_16.CsvWriter = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var dsr;
        !function(dsr) {
            var ConceptualSchemaFactory, ArrayExtensions = jsCommon.ArrayExtensions, ConceptualSchema = data.ConceptualSchema, StringExtensions = jsCommon.StringExtensions;
            !function(ConceptualSchemaFactory) {
                function createLocOptions(loc) {
                    return {
                        kpiGoalFmt: loc.get("KpiGoalDisplayName"),
                        kpiStatusFmt: loc.get("KpiStatusDisplayName"),
                        kpiTrendFmt: loc.get("KpiTrendDisplayName")
                    };
                }
                function convertSchema(contract, name, locOptions) {
                    var result = new ConceptualSchema();
                    result.name = name, result.entities = ArrayExtensions.createWithName(), contract.canEdit && (contract.Capabilities || (contract.Capabilities = {}), 
                    contract.Capabilities.CanEdit = contract.canEdit), result.capabilities = convertCapabilities(contract.Capabilities);
                    for (var _i = 0, _a = contract.Entities; _i < _a.length; _i++) {
                        var entity = _a[_i];
                        result.entities.push(convertEntity(entity, result.capabilities, locOptions));
                    }
                    for (var i = 0, len = contract.Entities.length; i < len; ++i) completeInitialization(result.entities[i], contract.Entities[i], result.entities);
                    return result;
                }
                function convertEntity(contract, capabilities, locOptions) {
                    for (var result = {
                        name: contract.Name,
                        displayName: contract.DisplayName || contract.Name,
                        visibility: convertVisibility(contract.Hidden, contract.ShowAsVariationsOnly, contract.Private),
                        calculated: contract.Calculated,
                        queryable: contract.Queryable,
                        properties: ArrayExtensions.createWithName(),
                        hierarchies: ArrayExtensions.createWithName(),
                        displayFolders: ArrayExtensions.createWithName(),
                        navigationProperties: ArrayExtensions.createWithName(),
                        errorMessage: contract.ErrorMessage,
                        canRefresh: contract.CanRefresh !== !1,
                        canEditSource: capabilities.canEdit && contract.CanEditSource !== !1,
                        canDelete: capabilities.canEdit && contract.CanDelete !== !1,
                        canRename: capabilities.canEdit && contract.CanRename !== !1,
                        isDateTable: contract.IsDateTable === !0
                    }, _i = 0, _a = contract.Properties; _i < _a.length; _i++) {
                        var property = _a[_i];
                        result.properties.push(convertProperty(property));
                    }
                    for (var i = 0, len = contract.Properties.length; i < len; ++i) {
                        var resultProperty = result.properties[i], contractProperty = contract.Properties[i];
                        resultProperty.canDelete = capabilities.canEdit && contractProperty.CanDelete !== !1;
                        var column = contractProperty.Column;
                        if (column) {
                            var resultColumn = resultProperty.column = resultProperty.column || {};
                            column.Keys && (resultColumn.keys = getPropertiesFromNames(column.Keys, result.properties)), 
                            column.OrderBy && (resultColumn.orderBy = getPropertiesFromNames(column.OrderBy, result.properties));
                        }
                        var measure = contractProperty.Measure;
                        if (measure) {
                            var resultMeasure = resultProperty.measure = resultProperty.measure || {};
                            if (measure.Kpi) {
                                var kpi = resultMeasure.kpi = convertKpi(measure.Kpi, result.properties, capabilities);
                                updatePropertyOfKpi(kpi.goal, resultProperty, 1, locOptions), updatePropertyOfKpi(kpi.status, resultProperty, 0, locOptions), 
                                updatePropertyOfKpi(kpi.trend, resultProperty, 3, locOptions);
                            }
                            measure.Template && (resultMeasure.template = {
                                name: measure.Template.DaxTemplateName
                            }), null != measure.DistributiveAggregate && (resultMeasure.distributiveAggregate = measure.DistributiveAggregate);
                        }
                    }
                    if (contract.Hierarchies) for (var _b = 0, _c = contract.Hierarchies; _b < _c.length; _b++) {
                        var hierarchy = _c[_b];
                        result.hierarchies.push(convertHierarchy(hierarchy, result.properties));
                    }
                    if (contract.DisplayFolders) for (var _d = 0, _e = contract.DisplayFolders; _d < _e.length; _d++) {
                        var folder = _e[_d];
                        result.displayFolders.push(convertDisplayFolder(folder, result.properties, result.hierarchies));
                    }
                    return result;
                }
                function convertDisplayFolder(contract, properties, hierarchies) {
                    var displayFolder = {
                        name: contract.Name,
                        displayName: contract.DisplayName || contract.Name,
                        properties: ArrayExtensions.createWithName(),
                        hierarchies: ArrayExtensions.createWithName(),
                        displayFolders: ArrayExtensions.createWithName()
                    };
                    if (contract.DisplayItems) for (var _i = 0, _a = contract.DisplayItems; _i < _a.length; _i++) {
                        var item = _a[_i];
                        item.PropertyRef && properties ? displayFolder.properties.push(properties.withName(item.PropertyRef)) : item.HierarchyRef && hierarchies ? displayFolder.hierarchies.push(hierarchies.withName(item.HierarchyRef)) : item.DisplayFolder && displayFolder.displayFolders.push(convertDisplayFolder(item.DisplayFolder, properties, hierarchies));
                    }
                    return displayFolder;
                }
                function convertHierarchy(contract, properties) {
                    for (var hierarchy = {
                        name: contract.Name,
                        displayName: contract.DisplayName || contract.Name,
                        hidden: contract.Hidden,
                        levels: ArrayExtensions.createWithName(),
                        canDelete: contract.CanDelete !== !1
                    }, _i = 0, _a = contract.Levels; _i < _a.length; _i++) {
                        var level = _a[_i];
                        hierarchy.levels.push(convertHierarchyLevel(level, properties));
                    }
                    return hierarchy;
                }
                function convertHierarchyLevel(contract, properties) {
                    return {
                        name: contract.Name,
                        displayName: contract.DisplayName || contract.Name,
                        column: properties.withName(contract.Column),
                        canDelete: contract.CanDelete !== !1
                    };
                }
                function getPropertiesFromNames(names, properties) {
                    for (var selectedProperties = ArrayExtensions.createWithName(), _i = 0, names_1 = names; _i < names_1.length; _i++) {
                        var name_1 = names_1[_i];
                        selectedProperties.push(properties.withName(name_1));
                    }
                    return selectedProperties;
                }
                function convertKpi(contract, properties, capabilities) {
                    var normalizedFiveStateKpiRange = capabilities.normalizedFiveStateKpiRange, kpi = {
                        statusMetadata: {
                            graphic: contract.StatusGraphic,
                            normalizedFiveStateKpiRange: normalizedFiveStateKpiRange
                        },
                        status: properties.withName(contract.Status),
                        goal: properties.withName(contract.Goal),
                        trend: properties.withName(contract.Trend)
                    };
                    return contract.TrendGraphic && (kpi.trendMetadata = {
                        graphic: contract.TrendGraphic,
                        normalizedFiveStateKpiRange: normalizedFiveStateKpiRange
                    }), kpi;
                }
                function updatePropertyOfKpi(property, kpiValue, kpiType, locOptions) {
                    if (property) {
                        var displayName = kpiValue.displayName;
                        switch (kpiType) {
                          case 1:
                            displayName = StringExtensions.format(locOptions.kpiGoalFmt, displayName);
                            break;

                          case 0:
                            displayName = StringExtensions.format(locOptions.kpiStatusFmt, displayName);
                            break;

                          case 3:
                            displayName = StringExtensions.format(locOptions.kpiTrendFmt, displayName);
                        }
                        property.displayName = displayName, property.hidden = !1, property.kpiValue = kpiValue;
                    }
                }
                function convertProperty(contract) {
                    var result = {
                        displayName: contract.DisplayName || contract.Name,
                        name: contract.Name,
                        type: powerbi.ValueType.fromPrimitiveTypeAndCategory(contract.DataType, contract.DataCategory),
                        column: contract.Column ? convertColumn(contract.Column) : null,
                        kind: convertKind(contract),
                        format: contract.FormatString,
                        hidden: contract.Hidden,
                        queryable: contract.Queryable,
                        errorMessage: contract.ErrorMessage
                    };
                    return result;
                }
                function convertColumn(contract) {
                    var result = {
                        defaultAggregate: contract.DefaultAggregate,
                        idOnEntityKey: contract.IdOnEntityKey,
                        calculated: contract.Calculated,
                        variations: ArrayExtensions.createWithName(),
                        aggregateBehavior: contract.AggregateBehavior
                    };
                    return void 0 !== contract.DefaultValue && (result.defaultValue = data.PrimitiveValueEncoding.parseValueToSQExpr(contract.DefaultValue)), 
                    result;
                }
                function convertParameterMetadata(contract, entity) {
                    return {};
                }
                function convertGroupingMetadata(contract, entity) {
                    var result = {
                        groupedColumns: _.map(contract.GroupedColumns, function(t) {
                            return t.ColumnRef && !t.LevelRef ? entity.properties.withName(t.ColumnRef) : t.LevelRef && !t.ColumnRef ? entity.hierarchies.withName(t.LevelRef.Hierarchy).levels.withName(t.LevelRef.Level) : void 0;
                        })
                    };
                    return contract.BinningMetadata && (result.binningMetadata = convertBinningMetadata(contract.BinningMetadata)), 
                    result;
                }
                function convertBinningMetadata(contract) {
                    var result = {};
                    return contract.BinSize && (result.binSize = convertBinSize(contract.BinSize)), 
                    result;
                }
                function convertBinSize(contract) {
                    var result = {
                        value: contract.Value,
                        unit: contract.Unit
                    };
                    return result;
                }
                function convertKind(contract) {
                    return contract.Measure ? 1 : 0;
                }
                function convertVisibility(isHidden, showAsVariationsOnly, isPrivate) {
                    var retVal = 0;
                    return isHidden && (retVal = 1 | retVal), showAsVariationsOnly && (retVal = 2 | retVal), 
                    isPrivate && (retVal = 4 | retVal), retVal;
                }
                function completeInitialization(entity, contract, entities) {
                    if (contract.NavigationProperties) for (var _i = 0, _a = contract.NavigationProperties; _i < _a.length; _i++) {
                        var navProp = _a[_i];
                        entity.navigationProperties.push(convertNavigationProperty(navProp, entity, entities));
                    }
                    if (contract.Properties) for (var i = 0, len = contract.Properties.length; i < len; ++i) {
                        var prop = contract.Properties[i], column = prop.Column;
                        column && column.Variations && convertVariations(entity.properties[i].column, column, entity, entities), 
                        column && column.GroupingMetadata && (entity.properties[i].column.groupingMetadata = convertGroupingMetadata(column.GroupingMetadata, entity)), 
                        column && column.ParameterMetadata && (entity.properties[i].column.parameterMetadata = convertParameterMetadata(column.ParameterMetadata, entity));
                        var measure = prop.Measure;
                        measure && !_.isEmpty(measure.DistributiveBy) && (entity.properties[i].measure.distributiveBy = _.map(measure.DistributiveBy, function(d) {
                            return entities.withName(d);
                        }));
                    }
                }
                function convertNavigationProperty(contract, entity, entities) {
                    var navigationProperty = {
                        name: contract.Name,
                        isActive: contract.Active,
                        sourceColumn: null,
                        targetEntity: entities.withName(contract.TargetEntity),
                        sourceMultiplicity: contract.SourceMultiplicity,
                        targetMultiplicity: contract.TargetMultiplicity
                    };
                    if (contract.SourceColumn) {
                        var prop = entity.properties.withName(contract.SourceColumn);
                        prop && (navigationProperty.sourceColumn = prop.column);
                    }
                    return navigationProperty;
                }
                function convertVariations(column, contract, entity, entities) {
                    for (var _i = 0, _a = contract.Variations; _i < _a.length; _i++) {
                        var variationSource = _a[_i];
                        column.variations.push(convertVariationSource(variationSource, entity, entities));
                    }
                }
                function convertVariationSource(contract, entity, entities) {
                    var variation = {
                        name: contract.Name,
                        isDefault: contract.Default,
                        navigationProperty: null,
                        defaultHierarchy: null,
                        defaultProperty: null
                    }, targetEntity = entity;
                    return contract.NavigationProperty && (variation.navigationProperty = entity.navigationProperties.withName(contract.NavigationProperty), 
                    targetEntity = variation.navigationProperty.targetEntity), contract.DefaultHierarchy && (variation.defaultHierarchy = targetEntity.hierarchies.withName(contract.DefaultHierarchy)), 
                    contract.DefaultProperty && (variation.defaultProperty = targetEntity.properties.withName(contract.DefaultProperty)), 
                    variation;
                }
                function convertCapabilities(contract) {
                    var capabilities = {
                        canEdit: contract && contract.CanEdit || !1,
                        discourageQueryAggregateUsage: contract && contract.DiscourageQueryAggregateUsage || !1,
                        isExtendable: contract && contract.IsExtendable || !1,
                        normalizedFiveStateKpiRange: contract && contract.NormalizedFiveStateKpiRange || !1,
                        supportsMedian: contract && contract.SupportsMedian || !1,
                        supportsPercentile: contract && contract.SupportsPercentile || !1,
                        supportsScopedEval: contract && contract.SupportsScopedEval || !1,
                        supportsClustering: contract && contract.SupportsClustering || !1,
                        supportsStringMinMax: contract && contract.SupportsStringMinMax || !1,
                        limitOnNumberOfGroups: contract && contract.LimitOnNumberOfGroups || null,
                        supportsMultiTableTupleFilters: contract && contract.SupportsMultiTableTupleFilters || !1,
                        supportsTimeIntelligenceQuickMeasures: contract && contract.SupportsTimeIntelligenceQuickMeasures || !1,
                        measureRestrictions: contract && contract.MeasureRestrictions && convertMeasureRestrictions(contract.MeasureRestrictions) || 0,
                        supportsBinByCount: contract && contract.SupportsBinByCount || !1,
                        supportsCalculatedColumns: contract && contract.SupportsCalculatedColumns !== !1 || !1,
                        supportsGrouping: contract && contract.SupportsGrouping !== !1 || !1,
                        limitMultiColumnFiltersToQueryGroupColumns: contract && contract.LimitMultiColumnFiltersToQueryGroupColumns || !1,
                        supportsBinnedLineSample: contract && contract.SupportsBinnedLineSample || !1,
                        supportsOverlappingPointsSample: contract && contract.SupportsOverlappingPointsSample || !1,
                        supportsInsights: contract && contract.SupportsInsights || !1
                    };
                    return capabilities;
                }
                function convertMeasureRestrictions(restrictions) {
                    switch (restrictions) {
                      case 0:
                        return 0;

                      case 2:
                        return 2;

                      case 1:
                        return 1;
                    }
                }
                ConceptualSchemaFactory.createLocOptions = createLocOptions, ConceptualSchemaFactory.convertSchema = convertSchema, 
                ConceptualSchemaFactory.convertEntity = convertEntity, ConceptualSchemaFactory.convertDisplayFolder = convertDisplayFolder, 
                ConceptualSchemaFactory.convertHierarchy = convertHierarchy, ConceptualSchemaFactory.convertHierarchyLevel = convertHierarchyLevel, 
                ConceptualSchemaFactory.convertProperty = convertProperty, ConceptualSchemaFactory.convertColumn = convertColumn, 
                ConceptualSchemaFactory.convertVisibility = convertVisibility, ConceptualSchemaFactory.convertCapabilities = convertCapabilities;
            }(ConceptualSchemaFactory = dsr.ConceptualSchemaFactory || (dsr.ConceptualSchemaFactory = {}));
        }(dsr = data.dsr || (data.dsr = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data_18) {
        var dsr;
        !function(dsr) {
            function createConceptualSchemaReader(promiseFactory, telemetryService, conceptualSchemaProxyCommunication, locOptions) {
                return new ConceptualSchemaReader(promiseFactory, telemetryService, conceptualSchemaProxyCommunication, locOptions);
            }
            function createConceptualSchemaProxyHttpCommunication(httpService, promiseFactory, uri) {
                return new ConceptualSchemaProxyCommunication(httpService, promiseFactory, uri);
            }
            var HttpUtils = jsCommon.HttpUtils;
            dsr.createConceptualSchemaReader = createConceptualSchemaReader, dsr.createConceptualSchemaProxyHttpCommunication = createConceptualSchemaProxyHttpCommunication;
            var ConceptualSchemaProxyCommunication = function() {
                function ConceptualSchemaProxyCommunication(httpService, promiseFactory, uri) {
                    this.httpService = httpService, this.promiseFactory = promiseFactory, this.uri = uri;
                }
                return ConceptualSchemaProxyCommunication.prototype.execute = function(request, postEvent) {
                    var _this = this, deferred = this.promiseFactory.defer();
                    return postEvent.event.info.endPoint = this.uri, this.httpService.post(this.uri, request, this.httpService.powerbiRequestOptions(postEvent.event, "GetConceptualSchema")).then(function(result) {
                        _this.setTelemetryEventInfo(postEvent.event, result), deferred.resolve({
                            requestId: result.responseRequestId || result.requestId,
                            schemas: result.data.schemas
                        });
                    }, function(result) {
                        var errorResult = result || {};
                        _this.setTelemetryEventInfo(postEvent.event, errorResult), deferred.reject({
                            requestId: errorResult.responseRequestId || errorResult.requestId,
                            error: errorResult.error,
                            status: errorResult.status,
                            schemas: void 0
                        });
                    }), deferred.promise;
                }, ConceptualSchemaProxyCommunication.prototype.setTelemetryEventInfo = function(event, result) {
                    event.info.clientAndServerRequestIdMatch = HttpUtils.clientAndServerRequestIdMatch(result), 
                    event.info.responseRequestId = HttpUtils.getResponseRequestId(result), event.info.requestId = result.requestId;
                }, ConceptualSchemaProxyCommunication;
            }(), ConceptualSchemaReader = function() {
                function ConceptualSchemaReader(promiseFactory, telemetryService, conceptualSchemaProxyCommunication, locOptions) {
                    this.promiseFactory = promiseFactory, this.telemetryService = telemetryService, 
                    this.conceptualSchemaProxyCommunication = conceptualSchemaProxyCommunication, this.locOptions = locOptions;
                }
                return ConceptualSchemaReader.prototype.execute = function(options) {
                    var _this = this, dataSources = options.dataSources;
                    if (!dataSources || dataSources.length > 1) return this.promiseFactory.reject({});
                    var deferred = this.promiseFactory.defer(), schemaNames = _.map(dataSources, function(d) {
                        return d.name;
                    }), request = {
                        modelIds: _.map(dataSources, function(d) {
                            return d.id;
                        })
                    }, getSchemaEvent = this.telemetryService.startEvent(powerbi.telemetry.DataGetConceptualSchema, "", !0, null, null);
                    return this.conceptualSchemaProxyCommunication.execute(request, getSchemaEvent).then(function(result) {
                        return _this.onSuccess(result, schemaNames, deferred, getSchemaEvent);
                    }, function(result) {
                        return _this.onError(result, deferred, getSchemaEvent);
                    }), deferred.promise;
                }, ConceptualSchemaReader.prototype.transform = function(obj) {
                    var response = obj;
                    if (!response.data) return {
                        schema: null,
                        error: response.error
                    };
                    for (var schemaResponse = response.data, schemaResponses = schemaResponse.schemas, schemaNames = response.schemaNames, schemas = {}, i = 0, len = schemaResponses.length; i < len; i++) {
                        var name_2 = schemaNames[i];
                        schemas[name_2] = dsr.ConceptualSchemaFactory.convertSchema(schemaResponses[i].schema, name_2, this.locOptions);
                    }
                    return {
                        schema: new data_18.FederatedConceptualSchema({
                            schemas: schemas
                        })
                    };
                }, ConceptualSchemaReader.prototype.onSuccess = function(response, schemaNames, deferred, event) {
                    if (_.isEmpty(response.schemas)) return void this.onError(response, deferred, event);
                    for (var _i = 0, _a = response.schemas; _i < _a.length; _i++) {
                        var schema = _a[_i], error = schema.error;
                        if (error) return deferred.reject({
                            data: null,
                            error: {
                                requestId: response.requestId,
                                serviceError: error,
                                clientError: null
                            }
                        }), void event.reject({
                            errorCode: error.errorCode,
                            errorMessage: "StatusCode=" + error.statusCode
                        });
                    }
                    deferred.resolve({
                        data: response,
                        schemaNames: schemaNames,
                        error: null
                    }), event.resolve();
                }, ConceptualSchemaReader.prototype.onError = function(response, deferred, event) {
                    deferred.reject({
                        data: null,
                        error: {
                            requestId: response.requestId,
                            clientError: null
                        }
                    }), event.reject(powerbi.errorDetailsHelper.getTelemetryErrorDetails(response.error, response.status));
                }, ConceptualSchemaReader;
            }();
        }(dsr = data_18.dsr || (data_18.dsr = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var fake;
        !function(fake) {
            fake.queryGenerator = {
                execute: function(options) {
                    var command = {
                        query: options.query,
                        mappings: options.mappings
                    };
                    return {
                        command: command
                    };
                }
            };
        }(fake = data.fake || (data.fake = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data_19) {
        var fake;
        !function(fake) {
            function generateDataView(query, mapping, valueSrc, config) {
                if (mapping) return mapping.categorical ? generateDataViewCategorical(query, mapping.categorical, valueSrc, config) : void 0;
            }
            function generateDataViewCategorical(query, mapping, valueSrc, config) {
                var hasCategories, select = query.select(), builder = data_19.createCategoricalDataViewBuilder();
                data_19.CompiledDataViewMapping.visitCategoricalCategories(mapping.categories, {
                    visitRole: function(role) {
                        if (!_.isEmpty(role.items)) for (var _i = 0, _a = role.items; _i < _a.length; _i++) {
                            var item = _a[_i], selectItem = select.withName(item.queryName), selectExpr = selectItem.expr, values = valueSrc.generate(selectExpr, config.rowCount);
                            builder.withCategory({
                                source: createMetadataColumn(selectItem, _.indexOf(select, selectItem)),
                                values: values,
                                identityFrom: {
                                    fields: [ selectExpr ]
                                }
                            }), hasCategories = !0;
                        }
                    }
                });
                var columnValues = [];
                return data_19.CompiledDataViewMapping.visitCategoricalValues(mapping.values, {
                    visitRole: function(role) {
                        if (!_.isEmpty(role.items)) for (var _i = 0, _a = role.items; _i < _a.length; _i++) {
                            var item = _a[_i], selectItem = select.withName(item.queryName);
                            columnValues.push({
                                source: createMetadataColumn(selectItem, _.indexOf(select, selectItem)),
                                values: valueSrc.generate(selectItem.expr, hasCategories ? config.rowCount : 1)
                            });
                        }
                    }
                }), _.isEmpty(columnValues) || builder.withValues({
                    columns: columnValues
                }), builder.build();
            }
            function createMetadataColumn(select, index) {
                return {
                    displayName: "",
                    queryName: select.name,
                    index: index,
                    type: {}
                };
            }
            var SQExpr = data.SQExpr, SQExprUtils = data.SQExprUtils, FakeDataReader = function() {
                function FakeDataReader(host, schemaProvider) {
                    this.promiseFactory = host.promiseFactory(), this.schemaProvider = schemaProvider;
                }
                return FakeDataReader.prototype.execute = function(options) {
                    var deferred = this.promiseFactory.defer();
                    return this.schemaProvider.get().then(function(schema) {
                        var data = options.command;
                        data.schema = schema, deferred.resolve(data);
                    }, function() {
                        deferred.reject();
                    }), powerbi.RejectablePromise2(deferred);
                }, FakeDataReader.prototype.transform = function(data) {
                    var schema = data.schema, query = data.query, mappings = data.mappings, sampleConfig = {
                        rowCount: 10
                    }, dataView = generateDataView(query, _.first(mappings), new FakeSchemaValueSource(schema), sampleConfig);
                    if (dataView) return {
                        dataView: dataView
                    };
                }, FakeDataReader;
            }();
            fake.FakeDataReader = FakeDataReader;
            var FakeSchemaValueSource = function() {
                function FakeSchemaValueSource(schema) {
                    this.schema = schema;
                }
                return FakeSchemaValueSource.prototype.generate = function(expr, count) {
                    if (SQExpr.isConstant(expr)) {
                        for (var values = [], i = 0; i < count; i++) values.push(expr.value);
                        return values;
                    }
                    var metadata = expr.getMetadata(this.schema);
                    if (metadata) {
                        if (metadata.aggregate) return _.range(10, 11 * count, 10);
                        var type = metadata.type;
                        if (type) {
                            if (type.integer || type.numeric) return _.range(1, 1 + count);
                            if (type.text) {
                                var baseString_1 = SQExprUtils.defaultName(expr, "value ") + " ";
                                return _.range(1, 1 + count).map(function(valueIdx) {
                                    return baseString_1 + valueIdx;
                                });
                            }
                        }
                    }
                    return _.range(1, 1 + count);
                }, FakeSchemaValueSource;
            }();
        }(fake = data_19.fake || (data_19.fake = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var contracts;
        !function(contracts) {
            function primitiveTypeFromDataType(dataType) {
                switch (dataType) {
                  case "Binary":
                    return 11;

                  case "Boolean":
                    return 5;

                  case "Currency":
                    return 2;

                  case "Number":
                    return 3;

                  case "Date":
                    return 6;

                  case "DateTime":
                    return 7;

                  case "Time":
                    return 9;

                  case "WholeNumber":
                    return 4;

                  case "Text":
                    return 1;
                }
            }
            contracts.primitiveTypeFromDataType = primitiveTypeFromDataType;
        }(contracts = data.contracts || (data.contracts = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));