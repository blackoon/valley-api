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
}(), powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var SQExprBuilder = powerbi.data.SQExprBuilder, InputClass = "date-slicer-input", DisableDragAttribute = "drag-resize-disabled", DateSlicer = function() {
            function DateSlicer(options) {
                options && (this.preventVirtualKeyboardOnTheFirstTap = options.preventVirtualKeyboardOnTheFirstTap);
                var common = powerbi.common;
                this.culture = Globalize.culture(common ? common.cultureInfo : ""), this.inputElements = [], 
                this.eventsHelper = new visuals.SlicerUtil.EventsHelper();
            }
            return DateSlicer.prototype.createRange = function(data) {
                return new visuals.DateRange(data.bounds.min, data.bounds.max, data.value.min, data.value.max);
            }, DateSlicer.prototype.getSliderOptions = function(data, singleValue) {
                return {
                    min: 0,
                    max: 100,
                    step: null
                };
            }, DateSlicer.prototype.areEqual = function(val1, val2) {
                return visuals.DateUtil.isEqual(val1, val2);
            }, DateSlicer.prototype.startProperty = function() {
                return visuals.slicerProps.data.startDate;
            }, DateSlicer.prototype.endProperty = function() {
                return visuals.slicerProps.data.endDate;
            }, DateSlicer.prototype.formatValue = function(value, formatter) {
                return Globalize.format(value, "d", this.culture);
            }, DateSlicer.prototype.parseSingleSliderValue = function(value, dataPoints) {
                return null;
            }, DateSlicer.prototype.inputStyleProperties = function() {
                return {
                    background: visuals.slicerProps.date.background,
                    fontColor: visuals.slicerProps.date.fontColor,
                    textSize: visuals.slicerProps.date.textSize,
                    fontFamily: visuals.slicerProps.date.fontFamily
                };
            }, DateSlicer.prototype.parseInput = function(inputString, dataPoints, singleValue) {
                return Globalize.parseDate(inputString, null, this.culture);
            }, DateSlicer.prototype.isInputValid = function(inputValue, range, type, singleValue) {
                return !(null == inputValue || 0 === type && inputValue > range.max || 1 === type && inputValue < range.min);
            }, DateSlicer.prototype.setRange = function(value, formatter, start, end, type) {
                null == type ? (start.val(Globalize.format(value.min, "d", this.culture)), end.val(Globalize.format(value.max, "d", this.culture))) : 0 === type ? start.val(Globalize.format(value.min, "d", this.culture)) : 1 === type && end.val(Globalize.format(value.max, "d", this.culture));
            }, DateSlicer.prototype.enumerateObjectInstances = function(options, data) {
                if ("date" === options.objectName && data && data.inputStyle) return [ {
                    selector: null,
                    objectName: "date",
                    properties: {
                        fontColor: data.inputStyle.fontColor,
                        background: data.inputStyle.background,
                        textSize: data.inputStyle.textSize,
                        fontFamily: data.inputStyle.fontFamily
                    }
                } ];
            }, DateSlicer.prototype.getDataPointsForSingleValueRange = function(dataView) {
                return [];
            }, DateSlicer.prototype.createInputElement = function(control, type) {
                var _this = this, $element = InJs.DomFactory.textBox().attr("type", "text").attr(DisableDragAttribute, "true").prop("readonly", !!this.preventVirtualKeyboardOnTheFirstTap).addClass(InputClass).appendTo(control);
                $element.datepicker({
                    showOtherMonths: !0,
                    selectOtherMonths: !0,
                    changeMonth: !0,
                    changeYear: !0,
                    nextText: "",
                    prevText: "",
                    firstDay: this.culture.calendar.firstDay,
                    dayNamesMin: this.culture.calendar.days.namesAbbr,
                    dateFormat: this.culture.calendar.patterns.d.replace("yyyy", "yy").toLowerCase(),
                    monthNamesShort: this.culture.calendar.months.names,
                    onClose: function() {
                        $element.prop("readonly", !!_this.preventVirtualKeyboardOnTheFirstTap);
                    }
                }), $element.on("click", function(event) {
                    _this.preventVirtualKeyboardOnTheFirstTap && $element.is("[readonly]") && ($element.prop("readonly", !1), 
                    $element.blur()), $element.datepicker("show");
                }), this.preventVirtualKeyboardOnTheFirstTap && $element.on("touchstart", function(event) {
                    $element.is("[readonly]") || $element.is(":focus") || $element.focus();
                });
                var widget = $element.datepicker("widget");
                return $element.datepicker("option", "beforeShow", function() {
                    _this.unregisterPopupHideEvents = _this.eventsHelper.onPopupHideEvent(function(event) {
                        _this.onPopupHideEvent(event);
                    }), _this.fixPosition(widget, $element, 1e3);
                }), this.inputElements.push($element), $element;
            }, DateSlicer.prototype.onPopupHideEvent = function(event) {
                if ("resize" === event.type) return void this.hideDatepicker();
                var target = $(event.target);
                target.hasClass("hasDatepicker") || target.hasClass("ui-datepicker") || target.hasClass("ui-icon") || $(target).closest(".ui-datepicker").length || this.hideDatepicker();
            }, DateSlicer.prototype.hideDatepicker = function() {
                this.unbindPopupHideEventHandlers();
                for (var _i = 0, _a = this.inputElements; _i < _a.length; _i++) {
                    var inputElement = _a[_i];
                    inputElement.datepicker("widget").is(":visible") && inputElement.datepicker("hide").blur();
                }
            }, DateSlicer.prototype.onDestroy = function() {
                this.hideDatepicker();
            }, DateSlicer.prototype.unbindPopupHideEventHandlers = function() {
                this.unregisterPopupHideEvents && this.unregisterPopupHideEvents();
            }, DateSlicer.prototype.fixPosition = function(widget, element, maxWait) {
                var _this = this;
                setTimeout(function() {
                    widget.visible(!1, !1, "horizontal") || widget.visible(!1, !1, "vertical") ? visuals.SlicerHelper.fixWidgetPosition(widget, element, null, !0) : maxWait > 0 && _this.fixPosition(widget, element, maxWait - 20);
                }, 20);
            }, DateSlicer.prototype.filterExpr = function(filter) {
                var start = new Date(filter.min.getTime());
                start.setHours(0, 0, 0, 0);
                var end = new Date(filter.max.getFullYear(), filter.max.getMonth(), filter.max.getDate() + 1), lower = SQExprBuilder.dateTime(start), upper = SQExprBuilder.dateTime(end);
                return {
                    lower: lower,
                    upper: upper
                };
            }, DateSlicer.prototype.comparisonKind = function() {
                return {
                    lower: 2,
                    upper: 3
                };
            }, DateSlicer;
        }();
        visuals.DateSlicer = DateSlicer;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var PixelConverter = jsCommon.PixelConverter, MenuPadding = 10, DropdownSlicerRenderer = function() {
            function DropdownSlicerRenderer(verticalSlicer, options) {
                this.verticalSlicerRenderer = verticalSlicer, this.popup = $("<div />").addClass("slicer-dropdown-popup"), 
                this.content = $("<div />").addClass("slicer-dropdown-content"), this.hostServices = options.hostServices, 
                this.popup.addClass("visual"), $("body").append(this.popup), this.popup.append(this.content), 
                this.requireUpdate = !0, this.eventsHelper = new visuals.SlicerUtil.EventsHelper();
            }
            return DropdownSlicerRenderer.prototype.onClear = function() {
                this.verticalSlicerRenderer.onClear();
            }, DropdownSlicerRenderer.prototype.onModeChange = function(mode) {
                this.popup.remove(), this.verticalSlicerRenderer.onModeChange(mode);
            }, DropdownSlicerRenderer.prototype.supportsOrientation = function() {
                return !1;
            }, DropdownSlicerRenderer.prototype.enumerateObjectInstances = function(options) {
                return this.verticalSlicerRenderer.enumerateObjectInstances(options);
            }, DropdownSlicerRenderer.prototype.init = function(slicerInitOptions, element) {
                return this.container = element, this.interactivityService = this.verticalSlicerRenderer.init(slicerInitOptions, this.content), 
                this.interactivityService;
            }, DropdownSlicerRenderer.prototype.onDestroy = function() {
                this.unbindPopupHideEventHandlers(), this.popup.remove();
            }, DropdownSlicerRenderer.prototype.render = function(options) {
                this.options = options, this.requireUpdate = !0, this.renderMenu(), this.popup.is(":hidden") || this.showPopup();
            }, DropdownSlicerRenderer.prototype.renderMenu = function() {
                var _this = this;
                this.menu || (this.menu = InJs.DomFactory.div(), this.menu.addClass("slicer-dropdown-menu"), 
                this.container.append(this.menu), this.menu.click(function(event) {
                    _this.onRenderMenuClick(event);
                })), this.menu.empty();
                var restatement = InJs.DomFactory.div();
                if (restatement.addClass("slicer-restatement"), this.menu.append(restatement), this.settings = this.defaultRestatementSetting(), 
                this.options.dataView.metadata && this.options.dataView.metadata.objects) {
                    var objects = this.options.dataView.metadata.objects;
                    this.settings.selectAllEnabled = powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.selection.selectAllCheckboxEnabled, this.settings.selectAllEnabled), 
                    this.settings.background = powerbi.DataViewObjects.getFillColor(objects, visuals.slicerProps.items.background, this.settings.background), 
                    this.settings.fontColor = powerbi.DataViewObjects.getFillColor(objects, visuals.slicerProps.items.fontColor, this.settings.fontColor), 
                    this.settings.textSize = powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.items.textSize, this.settings.textSize), 
                    this.settings.fontFamily = powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.items.fontFamily, this.settings.fontFamily);
                }
                restatement.text(this.getRestatementText()), this.menu.css({
                    "background-color": this.settings.background,
                    color: this.settings.fontColor,
                    "font-size": PixelConverter.fromPointToPixel(this.settings.textSize),
                    "font-family": this.settings.fontFamily
                }), this.popup.css({
                    "background-color": this.settings.background
                }), this.icon = $("<i />").addClass("dropdown-chevron"), this.icon.addClass("powervisuals-glyph"), 
                this.icon.addClass("chevron-down"), this.icon.appendTo(this.menu);
            }, DropdownSlicerRenderer.prototype.onRenderMenuClick = function(event) {
                return event.stopPropagation(), this.popup.is(":hidden") ? void this.showPopup() : void this.hidePopup();
            }, DropdownSlicerRenderer.prototype.showPopup = function() {
                var _this = this;
                window.requestAnimationFrame(function() {
                    if (_this.popup) {
                        var width = _this.menu.width() + MenuPadding;
                        _this.popup.css({
                            width: width
                        }), _this.icon.removeClass("chevron-down"), _this.icon.addClass("chevron-up"), visuals.SlicerHelper.fixWidgetPosition(_this.popup, _this.menu, null, !0), 
                        _this.requireUpdate && (_this.verticalSlicerRenderer.renderVerticalSlicer(_this.data, _this.options), 
                        _this.requireUpdate = !1), _this.unregisterPopupHideEvents = _this.eventsHelper.onPopupHideEvent(function(event) {
                            _this.onPopupHideEvent(event);
                        }), _this.popup.show();
                    }
                });
            }, DropdownSlicerRenderer.prototype.hidePopup = function() {
                this.popup && (this.popup.hide(), this.icon.removeClass("chevron-up"), this.icon.addClass("chevron-down"), 
                this.unbindPopupHideEventHandlers());
            }, DropdownSlicerRenderer.prototype.onPopupHideEvent = function(event) {
                if ("resize" === event.type) return void this.hidePopup();
                var target = $(event.target);
                target.parents(".slicer-dropdown-popup").length || target.is(".slicer-dropdown-menu") || target.parents(".slicer-dropdown-menu").length || this.hidePopup();
            }, DropdownSlicerRenderer.prototype.unbindPopupHideEventHandlers = function() {
                this.unregisterPopupHideEvents && this.unregisterPopupHideEvents();
            }, DropdownSlicerRenderer.prototype.defaultRestatementSetting = function() {
                return {
                    textSize: 10,
                    fontFamily: visuals.Font.Family.regular.css,
                    fontColor: "#000000",
                    background: null,
                    selectAllEnabled: !1
                };
            }, DropdownSlicerRenderer.prototype.getRestatementText = function() {
                return this.data = this.verticalSlicerRenderer.converter(this.options.dataView), 
                this.data.restatement;
            }, DropdownSlicerRenderer;
        }();
        visuals.DropdownSlicerRenderer = DropdownSlicerRenderer;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var clampValue = jsCommon.Utility.clampValue, PixelConverter = jsCommon.PixelConverter, ItemWidthSampleSize = 50, MinTextWidth = 80, MaxTextLines = 2, MaxImageWidth = 100, LoadMoreDataThreshold = .8, DefaultStyleProperties = {
            label: {
                marginRight: 2,
                paddingLeft: 8,
                paddingRight: 8
            }
        }, HorizontalSlicerRenderer = function() {
            function HorizontalSlicerRenderer(options) {
                this.textProperties = {
                    fontFamily: visuals.Font.Family.regular.css,
                    fontSize: "14px"
                }, options && (this.behavior = options.behavior, this.horizontalSlicerLayout = options.horizontalSlicerLayout), 
                this.horizontalSlicerLayout || (this.horizontalSlicerLayout = new HorizontalSlicerLayout()), 
                this.domHelper = new visuals.SlicerUtil.DOMHelper(), this.dataStartIndex = 0;
            }
            return HorizontalSlicerRenderer.prototype.getDefaultValue = function() {
                if (this.data && this.data.defaultValue) return this.data.defaultValue.value;
            }, HorizontalSlicerRenderer.prototype.getIdentityFields = function() {
                return visuals.SlicerUtil.DefaultValueHandler.getIdentityFields(this.dataView);
            }, HorizontalSlicerRenderer.prototype.getUpdatedSelfFilter = function(searchKey) {
                var metadata = this.dataView && this.dataView.metadata;
                if (this.data.searchKey !== searchKey) return visuals.SlicerUtil.getUpdatedSelfFilter(searchKey, metadata);
            }, HorizontalSlicerRenderer.prototype.supportsOrientation = function() {
                return !0;
            }, HorizontalSlicerRenderer.prototype.enumerateObjectInstances = function(options) {
                return visuals.SlicerUtil.ObjectEnumerator.enumerateObjectInstances(options, this.data, this.settings, this.dataView);
            }, HorizontalSlicerRenderer.prototype.onModeChange = function(mode) {
                visuals.SlicerUtil.clearSlicerFilter(this.hostServices, mode);
            }, HorizontalSlicerRenderer.prototype.onClear = function() {
                this.interactivityService.handleClearSelection(), this.interactivityService.persistSelectionFilter(visuals.slicerProps.filterPropertyIdentifier);
            }, HorizontalSlicerRenderer.prototype.init = function(slicerInitOptions, element) {
                this.element = element, this.currentViewport = slicerInitOptions.visualInitOptions.viewport;
                var hostServices = this.hostServices = slicerInitOptions.visualInitOptions.host;
                this.settings = visuals.DataConversion.DefaultSlicerProperties(), this.behavior && (this.interactivityService = visuals.createInteractivityService(hostServices)), 
                this.loadMoreData = function() {
                    return slicerInitOptions.loadMoreData();
                };
                var containerDiv = document.createElement("div");
                containerDiv.className = HorizontalSlicer.Selectors.container.class;
                var container = this.container = d3.select(containerDiv);
                this.searchContainer = this.domHelper.addSearch(hostServices, container);
                var body = this.body = container.append("div").classed(visuals.SlicerUtil.Selectors.Body.class + " " + HorizontalSlicer.Selectors.FlexDisplay.class, !0);
                return this.leftNavigationArrow = body.append("button").classed(this.horizontalSlicerLayout.getNavigationArrowsClass(!0)), 
                this.itemsContainer = body.append("div").classed(HorizontalSlicer.Selectors.ItemsContainer.class + " " + HorizontalSlicer.Selectors.FlexDisplay.class, !0), 
                this.rightNavigationArrow = body.append("button").classed(this.horizontalSlicerLayout.getNavigationArrowsClass(!1)), 
                this.element.get(0).appendChild(containerDiv), this.bindNavigationEvents(), this.interactivityService;
            }, HorizontalSlicerRenderer.prototype.render = function(options) {
                var localizedSelectAllText = this.hostServices.getLocalizedString(visuals.SlicerUtil.DisplayNameKeys.SelectAll), dataView = options.dataView;
                if (this.data = visuals.DataConversion.convert(dataView, localizedSelectAllText, this.interactivityService, this.hostServices), 
                !dataView || !this.data || _.isEmpty(this.data.slicerDataPoints)) return void this.itemsContainer.selectAll("*").remove();
                this.dataView = dataView, this.settings = this.data.slicerSettings;
                var resized = this.currentViewport && options.viewport && (this.currentViewport.height !== options.viewport.height || this.currentViewport.width !== options.viewport.width);
                this.isMaxDimensionsCalculated() && resized || (this.calculateAndSetMaxItemDimensions(), 
                this.calculateAndSetTotalItemDimensions()), this.currentViewport = options.viewport, 
                this.updateStyle(), this.itemsToDisplay = this.horizontalSlicerLayout.calculateNumberOfItemsToDisplay(this.element, this.totalItemWidth, this.totalItemHeight, this.getDataPointsCount()), 
                0 !== this.itemsToDisplay && this.renderCore();
            }, HorizontalSlicerRenderer.prototype.renderCore = function() {
                this.horizontalSlicerLayout.renderCore && this.horizontalSlicerLayout.renderCore(this.container);
                var data = this.data;
                if (data && data.slicerDataPoints) {
                    this.normalizePosition();
                    var dataPointsLength = this.getDataPointsCount(), itemsToDisplay = this.itemsToDisplay, dataStartIndex = this.dataStartIndex;
                    this.container.classed(HorizontalSlicer.Selectors.CanScrollRight.class, dataStartIndex + this.itemsToDisplay <= dataPointsLength - 1), 
                    this.container.classed(HorizontalSlicer.Selectors.CanScrollLeft.class, dataStartIndex > 0), 
                    this.renderItems(data.slicerSettings), this.bindInteractivityService(), dataStartIndex + itemsToDisplay >= dataPointsLength * LoadMoreDataThreshold && this.loadMoreData();
                }
            }, HorizontalSlicerRenderer.prototype.updateStyle = function() {
                var data = this.data, settings = data.slicerSettings;
                this.container.classed(HorizontalSlicer.Selectors.MultiSelectEnabled.class, !settings.selection.singleSelect), 
                this.searchContainer.classed(visuals.SlicerUtil.Selectors.SearchHeaderShow.class, settings.search.enabled), 
                this.searchContainer.classed(visuals.SlicerUtil.Selectors.SearchHeaderCollapsed.class, !settings.search.enabled);
            }, HorizontalSlicerRenderer.prototype.renderItems = function(defaultSettings) {
                var _this = this, itemsToDisplay = this.itemsToDisplay, dataStartIndex = this.dataStartIndex, materializedDataPoints = this.data.slicerDataPoints.slice(dataStartIndex, dataStartIndex + itemsToDisplay), items = this.horizontalSlicerLayout.bindData(materializedDataPoints, this.data, this.itemsContainer);
                items.enter().append("div").classed(HorizontalSlicer.Selectors.IndividualItemContainer.class, !0).each(function(d) {
                    var item = d3.select(this);
                    if (d.isImage) {
                        var imageContainer = item.append("div").classed(HorizontalSlicer.Selectors.ImageContainer.class, !0), inputElement = imageContainer.append("div").classed(HorizontalSlicer.Selectors.Input.class, !0);
                        inputElement.append("input").attr("type", "checkbox"), imageContainer.append("img").classed(HorizontalSlicer.Selectors.HorizontalSlicerImage.class, !0);
                    } else item.append("div").classed((_a = {}, _a[visuals.SlicerUtil.Selectors.LabelText.class] = !0, 
                    _a[HorizontalSlicer.Selectors.FlexDisplay.class] = !0, _a));
                    var _a;
                }), items.order();
                var labelItems = items.select(visuals.SlicerUtil.Selectors.LabelText.selector);
                labelItems.style({
                    "font-family": this.textProperties.fontFamily,
                    "padding-left": PixelConverter.toString(DefaultStyleProperties.label.paddingLeft),
                    "padding-right": PixelConverter.toString(DefaultStyleProperties.label.paddingRight),
                    "margin-right": function(d, i) {
                        return _this.isLastRowItem(i, _this.itemsToDisplay) ? "0px" : PixelConverter.toString(DefaultStyleProperties.label.marginRight);
                    }
                }), this.domHelper.setSlicerTextStyle(labelItems, defaultSettings), items.exit().remove(), 
                this.animationFrameId && window.cancelAnimationFrame(this.animationFrameId), this.animationFrameId = window.requestAnimationFrame(function() {
                    items.select("img").attr("title", function(d) {
                        return d.tooltip;
                    }).attr("src", function(d) {
                        return d.value;
                    }), items.select(visuals.SlicerUtil.Selectors.LabelText.selector).attr("title", function(d) {
                        return d.tooltip;
                    }).text(function(d) {
                        return d.value;
                    });
                    var labels = _this.element.find(visuals.SlicerUtil.Selectors.LabelText.selector), item = labels.first(), itemHeight = item.height(), itemWidth = item.width();
                    labels.each(function(i, element) {
                        powerbi.TextMeasurementService.wordBreakOverflowingText(element, itemWidth, itemHeight);
                    });
                });
            }, HorizontalSlicerRenderer.prototype.bindInteractivityService = function() {
                var selector = this.data.hasImages ? HorizontalSlicer.Selectors.IndividualItemContainer.selector : visuals.SlicerUtil.Selectors.LabelText.selector;
                if (this.interactivityService && this.body) {
                    var body = this.body, itemsContainer = body.selectAll(HorizontalSlicer.Selectors.ItemsContainer.selector), itemLabels = body.selectAll(selector), data_1 = this.data, searchInput = this.searchContainer.select("input");
                    if (!searchInput.empty()) {
                        var element = searchInput.node(), existingSearchKey = element.value;
                        (_.isEmpty(existingSearchKey) || _.isEmpty(data_1.searchKey)) && searchInput.property("value", data_1.searchKey);
                    }
                    var behaviorOptions = {
                        dataPoints: data_1.slicerDataPoints,
                        slicerContainer: this.container,
                        itemsContainer: itemsContainer,
                        itemLabels: itemLabels,
                        interactivityService: this.interactivityService,
                        settings: data_1.slicerSettings,
                        slicerValueHandler: this,
                        searchInput: searchInput
                    }, orientationBehaviorOptions = {
                        behaviorOptions: behaviorOptions,
                        orientation: 1
                    };
                    this.interactivityService.bind(data_1.slicerDataPoints, this.behavior, orientationBehaviorOptions, {
                        overrideSelectionFromData: !0,
                        hasSelectionOverride: data_1.hasSelectionOverride
                    }), visuals.SlicerWebBehavior.styleSlicerItems(this.itemsContainer.selectAll(selector), this.interactivityService.hasSelection(), this.interactivityService.isSelectionModeInverted());
                } else visuals.SlicerWebBehavior.styleSlicerItems(this.itemsContainer.selectAll(selector), !1, !1);
            }, HorizontalSlicerRenderer.prototype.normalizePosition = function() {
                var dataPointsLength = this.getDataPointsCount(), lastStartIndex = this.horizontalSlicerLayout.getLastStartIndex(this.itemsToDisplay, dataPointsLength);
                this.dataStartIndex = clampValue(this.dataStartIndex, 0, lastStartIndex);
            }, HorizontalSlicerRenderer.prototype.bindNavigationEvents = function() {
                this.registerMouseWheelScrollEvents(), this.registerMouseClickEvents();
            }, HorizontalSlicerRenderer.prototype.registerMouseClickEvents = function() {
                var _this = this, rightNavigationArrow = this.container.selectAll(HorizontalSlicer.Selectors.RightNavigationArrow.selector), leftNavigationArrow = this.container.selectAll(HorizontalSlicer.Selectors.LeftNavigationArrow.selector);
                rightNavigationArrow.on("click", function() {
                    _this.scrollRight();
                }), leftNavigationArrow.on("click", function() {
                    _this.scrollLeft();
                });
            }, HorizontalSlicerRenderer.prototype.registerMouseWheelScrollEvents = function() {
                var _this = this, scrollableElement = this.body.node();
                scrollableElement.addEventListener("mousewheel", function(e) {
                    _this.onMouseWheel(e.wheelDelta);
                }), scrollableElement.addEventListener("DOMMouseScroll", function(e) {
                    _this.onMouseWheel(e.detail);
                });
            }, HorizontalSlicerRenderer.prototype.onMouseWheel = function(wheelDelta) {
                wheelDelta < 0 ? this.scrollRight() : wheelDelta > 0 && this.scrollLeft();
            }, HorizontalSlicerRenderer.prototype.scrollRight = function() {
                var lastItemStartIndex = this.horizontalSlicerLayout.getLastStartIndex(this.itemsToDisplay, this.getDataPointsCount());
                this.dataStartIndex !== lastItemStartIndex && (this.dataStartIndex += this.horizontalSlicerLayout.getScrollSize(this.itemsToDisplay), 
                this.dataStartIndex = Math.min(this.dataStartIndex, lastItemStartIndex), this.renderCore());
            }, HorizontalSlicerRenderer.prototype.scrollLeft = function() {
                0 !== this.dataStartIndex && (this.dataStartIndex -= this.horizontalSlicerLayout.getScrollSize(this.itemsToDisplay), 
                this.dataStartIndex = Math.max(this.dataStartIndex, 0), this.renderCore());
            }, HorizontalSlicerRenderer.prototype.isLastRowItem = function(fieldIndex, columnsToDisplay) {
                return fieldIndex === columnsToDisplay - 1;
            }, HorizontalSlicerRenderer.prototype.getScaledTextWidth = function(textSize) {
                return textSize / jsCommon.TextSizeDefaults.TextSizeMin * MinTextWidth;
            }, HorizontalSlicerRenderer.prototype.isMaxDimensionsCalculated = function() {
                return void 0 !== this.maxItemWidth && void 0 !== this.maxItemHeight;
            }, HorizontalSlicerRenderer.prototype.calculateAndSetMaxItemDimensions = function() {
                var dataPointsLength = this.getDataPointsCount(), maxItemWidth = 0, maxItemHeight = 0;
                if (0 === dataPointsLength) return this.maxItemWidth = maxItemWidth, void (this.maxItemHeight = maxItemHeight);
                if (this.data.hasImages) this.maxItemWidth = MaxImageWidth, this.maxItemHeight = MaxImageWidth; else {
                    var data_2 = this.data, dataPoints = data_2.slicerDataPoints, sampleSize = Math.min(dataPointsLength, ItemWidthSampleSize), properties = jQuery.extend(!0, {}, this.textProperties), textSize = data_2.slicerSettings.slicerText.textSize, fontFamily = data_2.slicerSettings.slicerText.fontFamily;
                    properties.fontSize = PixelConverter.fromPoint(textSize), properties.fontFamily = fontFamily;
                    for (var getMaxWordWidth = jsCommon.WordBreaker.getMaxWordWidth, i = 0; i < sampleSize; i++) {
                        var itemText = dataPoints[i].value;
                        properties.text = itemText, maxItemWidth = Math.max(maxItemWidth, getMaxWordWidth(itemText, powerbi.TextMeasurementService.measureSvgTextWidth, properties));
                        var lines = Math.min(MaxTextLines, jsCommon.WordBreaker.wordCount(itemText));
                        maxItemHeight = Math.max(maxItemHeight, powerbi.TextMeasurementService.measureSvgTextHeight(properties) * lines);
                    }
                    this.maxItemWidth = Math.min(maxItemWidth, this.getScaledTextWidth(textSize)), this.maxItemHeight = maxItemHeight;
                }
            }, HorizontalSlicerRenderer.prototype.calculateAndSetTotalItemDimensions = function() {
                var data = this.data, itemPadding = DefaultStyleProperties.label.paddingLeft + DefaultStyleProperties.label.paddingRight + DefaultStyleProperties.label.marginRight, borderWidth = this.domHelper.getRowsOutlineWidth(data.slicerSettings.slicerText.outline, data.slicerSettings.general.outlineWeight);
                this.totalItemWidth = this.maxItemWidth + itemPadding + borderWidth, this.totalItemHeight = this.maxItemHeight + itemPadding + borderWidth;
                var result = this.horizontalSlicerLayout.calculateTotalItemDimensions(this.totalItemWidth, this.totalItemHeight);
                this.totalItemWidth = result.width, this.totalItemHeight = result.height;
            }, HorizontalSlicerRenderer.prototype.getDataPointsCount = function() {
                return _.size(this.data.slicerDataPoints);
            }, HorizontalSlicerRenderer.getDataPointIndex = function(d, data) {
                return _.indexOf(data.slicerDataPoints, d);
            }, HorizontalSlicerRenderer;
        }();
        visuals.HorizontalSlicerRenderer = HorizontalSlicerRenderer;
        var HorizontalSlicerLayout = function() {
            function HorizontalSlicerLayout() {}
            return HorizontalSlicerLayout.prototype.bindData = function(materializedDataPoints, data, itemsContainer) {
                var items = itemsContainer.selectAll(HorizontalSlicer.Selectors.IndividualItemContainer.selector).data(materializedDataPoints, function(d) {
                    return HorizontalSlicerRenderer.getDataPointIndex(d, data);
                });
                return items;
            }, HorizontalSlicerLayout.prototype.calculateTotalItemDimensions = function(totalItemWidth, totalItemHeight) {
                return {
                    width: totalItemWidth,
                    height: totalItemHeight
                };
            }, HorizontalSlicerLayout.prototype.calculateNumberOfItemsToDisplay = function(element, totalItemsWidth, totalItemsHeight, dataPointsLength) {
                var body = element.find(visuals.SlicerUtil.Selectors.Body.selector), availableWidth = body.width() - 2 * HorizontalSlicerLayout.NavigationArrowWidth;
                if (0 === totalItemsWidth) return 0;
                var numberOfItems = Math.round(availableWidth / totalItemsWidth);
                return clampValue(numberOfItems, 1, dataPointsLength);
            }, HorizontalSlicerLayout.prototype.getNavigationArrowsClass = function(isLeft) {
                return isLeft ? (_a = {}, _a[HorizontalSlicer.Selectors.NavigationArrow.class] = !0, 
                _a[HorizontalSlicer.Selectors.LeftNavigationArrow.class] = !0, _a) : (_b = {}, _b[HorizontalSlicer.Selectors.NavigationArrow.class] = !0, 
                _b[HorizontalSlicer.Selectors.RightNavigationArrow.class] = !0, _b);
                var _a, _b;
            }, HorizontalSlicerLayout.prototype.getScrollSize = function(itemsToDisplay) {
                return 1 === itemsToDisplay ? itemsToDisplay : itemsToDisplay - 1;
            }, HorizontalSlicerLayout.prototype.getLastStartIndex = function(itemsToDisplay, dataPointsLength) {
                return dataPointsLength - itemsToDisplay;
            }, HorizontalSlicerLayout.NavigationArrowWidth = 19, HorizontalSlicerLayout;
        }();
        visuals.HorizontalSlicerLayout = HorizontalSlicerLayout;
        var HorizontalSlicer;
        !function(HorizontalSlicer) {
            var Selectors;
            !function(Selectors) {
                var createClassAndSelector = jsCommon.CssConstants.createClassAndSelector;
                Selectors.container = createClassAndSelector("horizontalSlicerContainer"), Selectors.ItemsContainer = createClassAndSelector("slicerItemsContainer"), 
                Selectors.NavigationArrow = createClassAndSelector("navigationArrow"), Selectors.LeftNavigationArrow = createClassAndSelector("left"), 
                Selectors.RightNavigationArrow = createClassAndSelector("right"), Selectors.MultiSelectEnabled = createClassAndSelector("isMultiSelectEnabled"), 
                Selectors.FlexDisplay = createClassAndSelector("flexDisplay"), Selectors.CanScrollRight = createClassAndSelector("canScrollRight"), 
                Selectors.CanScrollLeft = createClassAndSelector("canScrollLeft"), Selectors.IndividualItemContainer = createClassAndSelector("individualItemContainer"), 
                Selectors.ImageContainer = createClassAndSelector("horizontalImageContainer"), Selectors.HorizontalSlicerImage = createClassAndSelector("horizontalSlicerImage"), 
                Selectors.Input = createClassAndSelector("slicerCheckbox");
            }(Selectors = HorizontalSlicer.Selectors || (HorizontalSlicer.Selectors = {}));
        }(HorizontalSlicer = visuals.HorizontalSlicer || (visuals.HorizontalSlicer = {}));
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var HorizontalSlicerWebBehavior = function() {
            function HorizontalSlicerWebBehavior() {}
            return HorizontalSlicerWebBehavior.prototype.bindEvents = function(options, selectionHandler) {
                this.itemLabels = options.itemLabels, this.dataPoints = options.dataPoints, this.interactivityService = options.interactivityService, 
                this.slicerSettings = options.settings, visuals.SlicerWebBehavior.bindSlicerEvents(options, this.itemLabels, selectionHandler, this.slicerSettings, this.interactivityService);
            }, HorizontalSlicerWebBehavior.prototype.renderSelection = function(hasSelection) {
                visuals.SlicerWebBehavior.setSelectionOnSlicerItems(this.itemLabels, this.itemLabels, hasSelection, this.interactivityService, this.slicerSettings);
            }, HorizontalSlicerWebBehavior;
        }();
        visuals.HorizontalSlicerWebBehavior = HorizontalSlicerWebBehavior;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var SQExprBuilder = powerbi.data.SQExprBuilder, InputClass = "date-slicer-input", DisableDragAttribute = "drag-resize-disabled";
        visuals.NumericSlicerOptions = powerbi.createEnumType([ {
            value: visuals.slicerMode.between,
            displayName: function(resources) {
                return resources.get("Visual_SliderMode_Between");
            }
        }, {
            value: visuals.slicerMode.before,
            displayName: function(resources) {
                return resources.get("Visual_SliderMode_LessThanEqualLabel");
            }
        }, {
            value: visuals.slicerMode.after,
            displayName: function(resources) {
                return resources.get("Visual_SliderMode_GreaterThanEqualLabel");
            }
        }, {
            value: visuals.slicerMode.basic,
            displayName: function(resources) {
                return resources.get("Visual_SliderMode_Basic");
            }
        }, {
            value: visuals.slicerMode.dropdown,
            displayName: function(resources) {
                return resources.get("Visual_SliderMode_Dropdown");
            }
        }, {
            value: visuals.slicerMode.single,
            displayName: function(resources) {
                return resources.get("Visual_SliderMode_SingleVal");
            }
        } ]);
        var NumericSlicer = function() {
            function NumericSlicer() {}
            return NumericSlicer.prototype.createRange = function(data) {
                return new visuals.NumericRange(data.bounds.min, data.bounds.max, data.value.min, data.value.max);
            }, NumericSlicer.prototype.areEqual = function(val1, val2) {
                return val1 === val2;
            }, NumericSlicer.prototype.startProperty = function() {
                return visuals.slicerProps.data.numericStart;
            }, NumericSlicer.prototype.endProperty = function() {
                return visuals.slicerProps.data.numericEnd;
            }, NumericSlicer.prototype.parseSingleSliderValue = function(position, dataPoints) {
                var value = dataPoints[Math.round(position)];
                return {
                    min: value,
                    max: value
                };
            }, NumericSlicer.prototype.formatValue = function(value, formatter) {
                return formatter ? formatter.format(value) : value.toString();
            }, NumericSlicer.prototype.getSliderOptions = function(data, singleValue) {
                var options = {
                    min: 0,
                    max: 100,
                    step: null
                };
                return singleValue && (options.max = data.dataPoints.length - 1, options.step = 1), 
                options;
            }, NumericSlicer.prototype.inputStyleProperties = function() {
                return {
                    background: visuals.slicerProps.numericInputStyle.background,
                    fontColor: visuals.slicerProps.numericInputStyle.fontColor,
                    textSize: visuals.slicerProps.numericInputStyle.textSize,
                    fontFamily: visuals.slicerProps.numericInputStyle.fontFamily
                };
            }, NumericSlicer.prototype.parseInput = function(inputString, dataPoints, singleValue) {
                var value = parseFloat(inputString);
                return singleValue && $.isNumeric(value) ? _.indexOf(dataPoints, value) > -1 ? value : this.findClosestPoint(value, dataPoints) : value;
            }, NumericSlicer.prototype.findClosestPoint = function(value, dataPoints) {
                for (var result = _.first(dataPoints), difference = Math.abs(result - value), i = 1; i < dataPoints.length; i++) {
                    var currentDifference = Math.abs(dataPoints[i] - value);
                    currentDifference < difference && (difference = currentDifference, result = dataPoints[i]);
                }
                return result;
            }, NumericSlicer.prototype.isInputValid = function(inputValue, range, type, singleValue) {
                return !(!$.isNumeric(inputValue) || 0 === type && inputValue > range.max || 1 === type && inputValue < range.min || singleValue && inputValue === range.min);
            }, NumericSlicer.prototype.setRange = function(value, formatter, start, end, type) {
                null == type ? (start.val(formatter.format(value.min)), end.val(formatter.format(value.max))) : 0 === type ? start.val(formatter.format(value.min)) : 1 === type && end.val(formatter.format(value.max));
            }, NumericSlicer.prototype.createInputElement = function(control, type) {
                var $element = InJs.DomFactory.textBox().attr("type", "text").attr(DisableDragAttribute, "true").addClass(InputClass).appendTo(control);
                return $element;
            }, NumericSlicer.prototype.enumerateObjectInstances = function(options, data) {
                if ("numericInputStyle" === options.objectName && data && data.inputStyle) return [ {
                    selector: null,
                    objectName: "numericInputStyle",
                    properties: {
                        fontColor: data.inputStyle.fontColor,
                        background: data.inputStyle.background,
                        textSize: data.inputStyle.textSize,
                        fontFamily: data.inputStyle.fontFamily
                    }
                } ];
            }, NumericSlicer.prototype.getDataPointsForSingleValueRange = function(dataView) {
                var category = dataView.categorical.categories[0], categoryValues = category && category.values || [], result = _.filter(categoryValues, function(n) {
                    return $.isNumeric(n);
                });
                return result = _.sortBy(result, function(n) {
                    return n;
                }), result = _.uniq(result);
            }, NumericSlicer.prototype.filterExpr = function(filter) {
                var lower = SQExprBuilder.double(filter.min), upper = SQExprBuilder.double(filter.max);
                return {
                    lower: lower,
                    upper: upper
                };
            }, NumericSlicer.prototype.comparisonKind = function() {
                return {
                    lower: 2,
                    upper: 4
                };
            }, NumericSlicer;
        }();
        visuals.NumericSlicer = NumericSlicer;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        function DefaultInputSettings() {
            return {
                textSize: 9,
                fontFamily: visuals.Font.Family.regular.css,
                fontColor: "#000000",
                background: null
            };
        }
        function DefaultSliderSettings(options) {
            return {
                color: "#666666",
                show: !0,
                drawRoundSliderHandles: options.drawRoundSliderHandles,
                shouldHideNarrowSlider: options.shouldHideNarrowSlider
            };
        }
        var PixelConverter = jsCommon.PixelConverter, Color = jsCommon.Color, CssConstants = jsCommon.CssConstants, SQExprBuilder = powerbi.data.SQExprBuilder, MinSliderVisibilityWidth = 150, DefaultFontSizeInPt = 9, DefaultFontFamily = "Segoe UI,wf_segoe-ui_normal,helvetica,arial,sans-serif", RangeClass = CssConstants.createClassAndSelector("date-slicer-range"), ContainerClass = CssConstants.createClassAndSelector("date-slicer"), HeadClass = CssConstants.createClassAndSelector("date-slicer-head"), SliderClass = CssConstants.createClassAndSelector("date-slicer-slider"), ControlClass = CssConstants.createClassAndSelector("date-slicer-control"), RoundHandlesClass = CssConstants.createClassAndSelector("roundHandles"), WrapRangeBoxesClass = CssConstants.createClassAndSelector("wrap"), DisableDragAttribute = "drag-resize-disabled";
        visuals.RangeSlicerSupportedModes = [ visuals.slicerMode.after, visuals.slicerMode.before, visuals.slicerMode.between ];
        var RangeSlicer = function() {
            function RangeSlicer(options, renderer, singleValue) {
                this.isRendered = !1, options && (this.hostServices = options.hostServices), this.rangeSlicerRenderer = renderer, 
                this.singleValue = singleValue;
            }
            return Object.defineProperty(RangeSlicer.prototype, "defaultSliderMode", {
                get: function() {
                    return this.singleValue ? visuals.slicerMode.single : visuals.slicerMode.between;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(RangeSlicer.prototype, "activeMode", {
                get: function() {
                    return this.data.mode || this.defaultSliderMode;
                },
                enumerable: !0,
                configurable: !0
            }), RangeSlicer.prototype.init = function(options, element) {
                this.options = options, this.host = element;
            }, RangeSlicer.prototype.onModeChange = function(mode) {
                if (_.indexOf(visuals.RangeSlicerSupportedModes, mode) > -1) {
                    if (!this.data) return;
                    this.updateMode(mode);
                } else visuals.SlicerUtil.clearSlicerFilter(this.hostServices, mode);
            }, RangeSlicer.prototype.onClear = function() {
                this.data && this.data.initialValue && (this.data.value = this.data.initialValue, 
                this.data.state = 0, this.updateProperties());
            }, RangeSlicer.prototype.render = function(options) {
                if (!_.isEmpty(options.dataView)) {
                    if (this.dataView = options.dataView, this.reader = powerbi.data.createDataViewCategoricalReaderAdvanced(this.dataView), 
                    !this.isValid(this.reader)) return void (this.isRendered && (this.disableSlicer(), 
                    this.hostServices.setWarnings([ new visuals.DateSlicerNoDataWarning() ])));
                    this.isRendered && this.enableSlicer();
                    var filter = this.data && this.data.properties ? this.data.properties.filter : null;
                    this.data = this.converter(this.reader, filter, options), this.isRendered || this.initControls(), 
                    this.rangeSlicerRenderer.setRange(this.data.value, this.data.formatter, this.start, this.end, null), 
                    this.range = this.rangeSlicerRenderer.createRange(this.data), this.updateInputControls(), 
                    this.updateSlider(this.activeMode), this.updateProperties();
                }
            }, RangeSlicer.prototype.supportsOrientation = function() {
                return !1;
            }, RangeSlicer.prototype.enumerateObjectInstances = function(options) {
                return "date" === options.objectName || "numericInputStyle" === options.objectName ? this.rangeSlicerRenderer.enumerateObjectInstances(options, this.data) : "slider" === options.objectName ? [ {
                    selector: null,
                    objectName: "Slider",
                    properties: {
                        show: this.data.sliderSettings.show,
                        color: this.data.sliderSettings.color
                    }
                } ] : void 0;
            }, RangeSlicer.prototype.isValid = function(reader) {
                if (this.singleValue) return reader.columns.getCategoryCount() > 0;
                var metadataColumns = reader.columns.getMetadataColumns(visuals.slicerRoles.value);
                if (!_.isEmpty(metadataColumns)) {
                    var metadata = metadataColumns[0];
                    if (metadata.aggregates && null != metadata.aggregates.min && null != metadata.aggregates.max) return !0;
                }
                return !1;
            }, RangeSlicer.prototype.converter = function(reader, activeFilter, options) {
                var result = {
                    state: 0,
                    mode: null,
                    formatter: null,
                    identity: null,
                    value: null,
                    initialValue: null,
                    bounds: null,
                    filter: null,
                    properties: {},
                    sliderSettings: DefaultSliderSettings(options),
                    inputStyle: DefaultInputSettings(),
                    dataPoints: null,
                    wrapRangeBoxes: options.wrapRangeBoxes
                }, metadataColumns = reader.columns.getMetadataColumns(visuals.slicerRoles.value), metadata = metadataColumns[0], formatString = visuals.valueFormatter.getFormatString(metadata, visuals.slicerProps.formatString);
                result.formatter = visuals.valueFormatter.createDefaultFormatter(formatString), 
                result.identity = metadata.expr;
                var min = null, max = null;
                if (this.singleValue) result.dataPoints = this.rangeSlicerRenderer.getDataPointsForSingleValueRange(this.dataView), 
                result.dataPoints.length > 0 && (min = result.dataPoints[0], max = result.dataPoints[result.dataPoints.length - 1]); else {
                    var values = metadata.aggregates;
                    min = values.min, max = values.max;
                }
                result.value = {
                    min: min,
                    max: max
                }, result.initialValue = {
                    min: min,
                    max: max
                }, result.bounds = {
                    min: result.value.min,
                    max: result.value.max
                };
                var objects = reader.objects.getStaticObjects();
                if (objects) {
                    result.filter = powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.filterPropertyIdentifier), 
                    result.properties.start = powerbi.DataViewObjects.getValue(objects, this.rangeSlicerRenderer.startProperty(), null), 
                    result.properties.end = powerbi.DataViewObjects.getValue(objects, this.rangeSlicerRenderer.endProperty(), null), 
                    result.properties.mode = powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.data.mode, null);
                    var inputProps = this.rangeSlicerRenderer.inputStyleProperties();
                    result.inputStyle.background = powerbi.DataViewObjects.getFillColor(objects, inputProps.background, result.inputStyle.background), 
                    result.inputStyle.fontColor = powerbi.DataViewObjects.getFillColor(objects, inputProps.fontColor, result.inputStyle.fontColor), 
                    result.inputStyle.textSize = powerbi.DataViewObjects.getValue(objects, inputProps.textSize, result.inputStyle.textSize), 
                    result.inputStyle.fontFamily = powerbi.DataViewObjects.getValue(objects, inputProps.fontFamily, result.inputStyle.fontFamily), 
                    result.sliderSettings.color = powerbi.DataViewObjects.getFillColor(objects, visuals.slicerProps.slider.color, result.sliderSettings.color), 
                    result.sliderSettings.show = powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.slider.show, result.sliderSettings.show), 
                    null !== result.properties.start && (result.state |= 1, result.value.min = result.properties.start, 
                    result.properties.start < result.bounds.min && (result.bounds.min = result.properties.start)), 
                    null !== result.properties.end && (result.state = result.state |= 2, result.value.max = result.properties.end, 
                    result.properties.end > result.bounds.max && (result.bounds.max = result.properties.end)), 
                    result.value.min > result.bounds.max && (result.value.max = result.bounds.max = result.value.min), 
                    result.value.max < result.bounds.min && (result.value.min = result.bounds.min = result.value.max), 
                    null != result.properties.mode && (result.mode = result.properties.mode);
                } else result.state = 0, result.properties.start = null, result.properties.end = null, 
                result.properties.mode = null;
                var color = Color.parseColorString(result.sliderSettings.color);
                return result.sliderSettings.activeColor = Color.calculateHighlightColor(color, .5, .2), 
                result.sliderSettings.hoverColor = Color.hexString(Color.darken(color, 100)), result.properties.filter = activeFilter, 
                result.properties.bounds = {
                    min: result.bounds.min,
                    max: result.bounds.max
                }, result;
            }, RangeSlicer.prototype.initControls = function() {
                this.isRendered = !0, this.createHtmlControls(), this.updateMode(this.data.mode);
            }, RangeSlicer.prototype.createHtmlControls = function() {
                this.container = InJs.DomFactory.div().addClass(ContainerClass.class).appendTo(this.host), 
                this.container.on("keyup keydown", function(event) {
                    event.stopPropagation();
                });
                var $head = InJs.DomFactory.div().addClass(HeadClass.class).css(this.getFontStyles()).appendTo(this.container), $range = InJs.DomFactory.div().addClass(RangeClass.class).appendTo($head);
                this.startContainer = InJs.DomFactory.div().addClass(ControlClass.class).appendTo($range), 
                this.endContainer = InJs.DomFactory.div().addClass(ControlClass.class).appendTo($range), 
                this.start = this.rangeSlicerRenderer.createInputElement(this.startContainer, 0), 
                this.end = this.rangeSlicerRenderer.createInputElement(this.endContainer, 1), this.bindEventHandlersToInputElements(), 
                this.sliderContainer = InJs.DomFactory.div().addClass(SliderClass.class).appendTo(this.container);
            }, RangeSlicer.prototype.bindEventHandlersToInputElements = function() {
                var _this = this;
                this.start.on("click touchend", function(event) {
                    event.stopPropagation();
                }), this.end.on("click touchend", function(event) {
                    event.stopPropagation();
                }), this.start.on("change", function(event) {
                    var inputString = _this.start.val();
                    _this.onRangeChange(inputString, 0);
                }), this.start.on("focus", function(event) {
                    _this.singleValue && !_this.data.filter || _this.start.val(_this.rangeSlicerRenderer.formatValue(_this.data.value.min, null)), 
                    _this.start.select();
                }), this.start.on("blur", function(event) {
                    _this.singleValue && !_this.data.filter || _this.start.val(_this.rangeSlicerRenderer.formatValue(_this.data.value.min, _this.data.formatter));
                }), this.end.on("change", function(event) {
                    var inputString = _this.end.val();
                    _this.onRangeChange(inputString, 1);
                }), this.end.on("focus", function(event) {
                    _this.end.val(_this.rangeSlicerRenderer.formatValue(_this.data.value.max, null)), 
                    _this.end.select();
                }), this.end.on("blur", function(event) {
                    _this.end.val(_this.rangeSlicerRenderer.formatValue(_this.data.value.max, _this.data.formatter));
                });
            }, RangeSlicer.prototype.onRangeChange = function(inputString, type) {
                var inputValue = this.rangeSlicerRenderer.parseInput(inputString, this.data.dataPoints, this.singleValue);
                this.rangeSlicerRenderer.isInputValid(inputValue, this.data.value, type, this.singleValue) ? this.updateRange({
                    min: inputValue,
                    max: inputValue
                }, type) : this.rangeSlicerRenderer.setRange(this.data.value, this.data.formatter, this.start, this.end, type);
            }, RangeSlicer.prototype.onDestroy = function() {
                this.rangeSlicerRenderer.onDestroy && this.rangeSlicerRenderer.onDestroy();
            }, RangeSlicer.prototype.getFontStyles = function() {
                return _a = {}, _a["font-size"] = PixelConverter.fromPointToPixel(DefaultFontSizeInPt), 
                _a["font-family"] = DefaultFontFamily, _a["font-weight"] = visuals.NewDataLabelUtils.defaultFontProperties.weight, 
                _a;
                var _a;
            }, RangeSlicer.prototype.updateSliderControl = function() {
                var _this = this, options = this.createSliderOptions();
                if (this.shouldRecreateSlider(options)) this.sliderOptions = options, this.slider && (this.slider.destroy(), 
                this.sliderContainer.empty()), this.mode = this.activeMode, this.sliderElement = InJs.DomFactory.div().attr(DisableDragAttribute, "true").appendTo(this.sliderContainer), 
                noUiSlider.create(this.sliderElement.get(0), this.sliderOptions), this.slider = this.sliderElement.get(0).noUiSlider, 
                this.slider.on("slide", function(data, index, values) {
                    window.requestAnimationFrame(function() {
                        var rangeValue = _this.parseSliderValue(values);
                        _this.rangeSlicerRenderer.setRange(rangeValue, _this.data.formatter, _this.start, _this.end, null);
                    });
                }), this.slider.on("change", function(data, index, values) {
                    var timeout = _this.sliderElement.hasClass("noUi-state-tap") ? 300 : 0;
                    setTimeout(function() {
                        var value = _this.parseSliderValue(values), type = _this.getChangeType(_this.activeMode, index);
                        _this.updateRange(value, type);
                    }, timeout);
                }), this.applyHandlesHoverState(this.sliderContainer.find(".noUi-handle")); else {
                    var sliderValue = [];
                    if (this.singleValue) {
                        var position = _.indexOf(this.data.dataPoints, this.data.value.min);
                        sliderValue.push(position);
                    } else {
                        var value = this.range.getScaledValue();
                        this.activeMode !== visuals.slicerMode.before && sliderValue.push(value.min), this.activeMode !== visuals.slicerMode.after && sliderValue.push(value.max);
                    }
                    this.slider.set(sliderValue);
                }
                this.sliderContainer.find(".noUi-connect").css({
                    "background-color": this.data.sliderSettings.color
                }), this.sliderContainer.find(".noUi-handle").each(function(i, element) {
                    var jqueryElement = $(element), color = jqueryElement.is(":hover") ? _this.data.sliderSettings.activeColor : _this.data.sliderSettings.color;
                    _this.setSliderHandleColor(jqueryElement, color);
                });
            }, RangeSlicer.prototype.setSliderHandleColor = function(element, color) {
                var cssProps = {
                    "border-color": "",
                    "background-color": ""
                }, cssKey = this.data.sliderSettings.drawRoundSliderHandles ? "border-color" : "background-color";
                cssProps[cssKey] = color, element.css(cssProps);
            }, RangeSlicer.prototype.disableSlicer = function() {
                this.disableSlider(), 1 & this.data.state || (this.start.val(""), this.start.prop("disabled", !0), 
                this.disableInput(this.start, this.data.inputStyle.fontColor)), 2 & this.data.state || (this.end.val(""), 
                this.end.prop("disabled", !0), this.disableInput(this.end, this.data.inputStyle.fontColor)), 
                this.data.bounds.min = this.data.bounds.max = null, this.updateProperties();
            }, RangeSlicer.prototype.disableSlider = function() {
                if (this.sliderElement && this.sliderElement.get(0).setAttribute("disabled", "true"), 
                this.sliderContainer.css("opacity", "0.1"), this.slider) {
                    var sliderValue = [ 0, 100 ];
                    this.slider.set(sliderValue);
                }
            }, RangeSlicer.prototype.enableSlicer = function() {
                this.sliderElement && this.sliderElement.get(0).removeAttribute("disabled"), this.sliderContainer.css("opacity", "1.0"), 
                this.start.prop("disabled", !1), this.end.prop("disabled", !1);
            }, RangeSlicer.prototype.shouldRecreateSlider = function(options) {
                return !this.slider || !_.isEqual(options, this.sliderOptions);
            }, RangeSlicer.prototype.applyHandlesHoverState = function(handles) {
                var _this = this, isMouseDown = !1, isMouseOver = !1;
                handles.on("mouseover", function() {
                    isMouseOver = !0, isMouseDown || _this.setSliderHandleColor($(event.target), _this.data.sliderSettings.hoverColor);
                }).on("mouseout", function() {
                    isMouseOver = !1, isMouseDown || _this.setSliderHandleColor($(event.target), _this.data.sliderSettings.color);
                }).on("mousedown touchstart", function() {
                    isMouseDown = !0;
                    var target = event.target;
                    _this.setSliderHandleColor($(target), _this.data.sliderSettings.activeColor);
                    var mouseup = function() {
                        $(document).off("mouseup touchEnd", mouseup), isMouseDown && (isMouseDown = !1, 
                        _this.setSliderHandleColor($(target), _this.data.sliderSettings.color));
                    };
                    $(document).on("mouseup touchEnd", mouseup);
                }).on("mouseup touchend", function() {
                    isMouseDown = !1;
                    var target = event.target;
                    _this.setSliderHandleColor($(target), isMouseOver ? _this.data.sliderSettings.hoverColor : _this.data.sliderSettings.color);
                });
            }, RangeSlicer.prototype.updateInputControls = function() {
                this.singleValue && !this.data.filter && this.start.val("");
                var fontCss = {
                    "font-size": PixelConverter.fromPointToPixel(this.data.inputStyle.textSize),
                    "font-family": this.data.inputStyle.fontFamily || DefaultFontFamily,
                    "font-weight": visuals.NewDataLabelUtils.defaultFontProperties.weight
                };
                this.start.parent().css(fontCss), this.end.parent().css(fontCss);
                var css = {
                    color: this.data.inputStyle.fontColor,
                    "background-color": this.data.inputStyle.background ? this.data.inputStyle.background : ""
                };
                this.start.css(css), this.end.css(css);
            }, RangeSlicer.prototype.disableInput = function(control, color) {
                var RGBA = Color.parseColorString(color);
                RGBA.A = .3, control.css({
                    color: Color.rgbString(RGBA)
                });
            }, RangeSlicer.prototype.createSliderOptions = function() {
                var start, connect, sliderOptions = this.rangeSlicerRenderer.getSliderOptions(this.data, this.singleValue), value = this.range.getScaledValue();
                switch (this.activeMode) {
                  case visuals.slicerMode.before:
                    start = value.max, connect = "lower";
                    break;

                  case visuals.slicerMode.after:
                    start = value.min, connect = "upper";
                    break;

                  case visuals.slicerMode.between:
                    start = [ value.min, value.max ], connect = !0;
                    break;

                  case visuals.slicerMode.single:
                    start = _.indexOf(this.data.dataPoints, this.data.value.min), connect = !1;
                }
                var options = {
                    connect: connect,
                    behaviour: "tap",
                    range: {
                        min: sliderOptions.min,
                        max: sliderOptions.max
                    },
                    start: start
                };
                return this.singleValue && (options.step = sliderOptions.step), options;
            }, RangeSlicer.prototype.parseSliderValue = function(value) {
                if (this.singleValue) return this.rangeSlicerRenderer.parseSingleSliderValue(value, this.data.dataPoints);
                var rangeValue = this.range.getScaledValue();
                switch (this.activeMode) {
                  case visuals.slicerMode.before:
                    rangeValue.max = value;
                    break;

                  case visuals.slicerMode.after:
                    rangeValue.min = value;
                    break;

                  case visuals.slicerMode.between:
                    rangeValue.min = value[0], rangeValue.max = value[1];
                }
                return this.range.setScaledValue(rangeValue), this.range.getValue();
            }, RangeSlicer.prototype.updateSlider = function(mode) {
                mode === visuals.slicerMode.after ? (this.end.prop("disabled", !0), this.disableInput(this.end, this.data.inputStyle.fontColor), 
                this.start.prop("disabled", !1)) : mode === visuals.slicerMode.before ? (this.end.prop("disabled", !1), 
                this.start.prop("disabled", !0), this.disableInput(this.start, this.data.inputStyle.fontColor)) : (this.end.prop("disabled", !1), 
                this.start.prop("disabled", !1)), mode === visuals.slicerMode.single ? this.endContainer.hide() : this.endContainer.show(), 
                !this.data.sliderSettings.show || this.shouldHideSmallSlider() ? this.sliderContainer.hide() : (this.sliderContainer.show(), 
                this.updateSliderControl()), this.sliderContainer.toggleClass(RoundHandlesClass.class, !!this.data.sliderSettings.drawRoundSliderHandles), 
                this.container.find(RangeClass.selector).toggleClass(WrapRangeBoxesClass.class, !!this.data.wrapRangeBoxes), 
                this.rangeSlicerRenderer.areEqual(this.data.bounds.min, this.data.bounds.max) && this.disableSlider();
            }, RangeSlicer.prototype.updateMode = function(mode) {
                var lastMode = this.data.mode;
                null == mode && (mode = this.defaultSliderMode), this.data.mode = mode, mode === visuals.slicerMode.before ? (lastMode === visuals.slicerMode.after && 1 & this.data.state && (this.data.value.max = this.data.value.min, 
                this.data.value.min = this.data.bounds.min, this.data.state = 2), this.data.state &= -2) : mode === visuals.slicerMode.after && (lastMode === visuals.slicerMode.before && 2 & this.data.state && (this.data.value.min = this.data.value.max, 
                this.data.state = 1), this.data.state &= -3), this.updateProperties();
            }, RangeSlicer.prototype.updateProperties = function() {
                var filter = {
                    min: this.data.value.min,
                    max: this.data.value.max
                }, bounds = {
                    min: this.data.bounds.min,
                    max: this.data.bounds.max
                }, properties = {
                    start: 1 & this.data.state ? this.data.value.min : null,
                    end: 2 & this.data.state ? this.data.value.max : null,
                    mode: this.data.mode,
                    filter: filter,
                    bounds: bounds
                };
                if (this.requireToUpdate(properties)) {
                    this.data.properties.filter = filter, this.data.properties.bounds = bounds;
                    var objects = this.createPersistProperties(properties, this.data.identity, this.data.state);
                    this.hostServices.persistProperties(objects), this.hostServices.onSelect({
                        visualObjects: []
                    });
                }
            }, RangeSlicer.prototype.getChangeType = function(mode, handle) {
                var type = null;
                switch (mode) {
                  case visuals.slicerMode.after:
                  case visuals.slicerMode.single:
                    type = 0;
                    break;

                  case visuals.slicerMode.before:
                    type = 1;
                    break;

                  default:
                    type = 0 === handle ? 0 : 1;
                }
                return type;
            }, RangeSlicer.prototype.createPersistProperties = function(properties, identity, state) {
                var mode = null == properties.mode ? this.defaultSliderMode : properties.mode, filter = this.createFilter(properties, mode, state, identity), objects = {
                    merge: [ {
                        objectName: "general",
                        selector: void 0,
                        properties: {}
                    } ],
                    replace: [ {
                        objectName: "data",
                        selector: void 0,
                        properties: {}
                    } ],
                    remove: [ {
                        objectName: "data",
                        selector: void 0,
                        properties: {}
                    }, {
                        objectName: "general",
                        selector: void 0,
                        properties: {}
                    } ]
                };
                return null !== filter ? objects.merge[0].properties[visuals.slicerProps.general.filter.propertyName] = filter : objects.remove[1].properties[visuals.slicerProps.general.filter.propertyName] = !0, 
                1 & state && null !== properties.start ? objects.replace[0].properties[this.rangeSlicerRenderer.startProperty().propertyName] = properties.start : null == properties.start && (objects.remove[0].properties[this.rangeSlicerRenderer.startProperty().propertyName] = !0), 
                2 & state && null !== properties.end ? objects.replace[0].properties[this.rangeSlicerRenderer.endProperty().propertyName] = properties.end : null == properties.end && (objects.remove[0].properties[this.rangeSlicerRenderer.endProperty().propertyName] = !0), 
                null != properties.mode && (objects.replace[0].properties[visuals.slicerProps.data.mode.propertyName] = properties.mode), 
                objects;
            }, RangeSlicer.prototype.updateRange = function(value, type) {
                null == type ? (this.data.value.min = value.min, this.data.value.max = value.max) : 0 === type ? (this.data.value.min = value.min, 
                null !== this.data.bounds.min && !this.singleValue && this.rangeSlicerRenderer.areEqual(this.data.value.min, this.data.bounds.min) ? this.data.state &= -2 : this.data.state |= 1) : 1 === type && (this.data.value.max = value.max, 
                null !== this.data.bounds.max && this.rangeSlicerRenderer.areEqual(this.data.value.max, this.data.bounds.max) ? this.data.state &= -3 : this.data.state |= 2), 
                this.updateProperties();
            }, RangeSlicer.prototype.createFilter = function(properties, mode, state, identity) {
                var filterExpr = null, filter = properties.filter, bounds = properties.bounds, result = null, slicerFilters = this.rangeSlicerRenderer.filterExpr(filter);
                if (mode === visuals.slicerMode.single) filterExpr = 1 & state ? SQExprBuilder.compare(0, identity, slicerFilters.lower) : null; else {
                    var comparisonKind = this.rangeSlicerRenderer.comparisonKind();
                    if (null === bounds.min && null == bounds.max) if (1 & state && 2 & state) {
                        var lowerFilter = SQExprBuilder.compare(comparisonKind.lower, identity, slicerFilters.lower), upperFilter = SQExprBuilder.compare(comparisonKind.upper, identity, slicerFilters.upper);
                        filterExpr = SQExprBuilder.and(lowerFilter, upperFilter);
                    } else 1 & state ? filterExpr = SQExprBuilder.compare(comparisonKind.lower, identity, slicerFilters.lower) : 2 & state && (filterExpr = SQExprBuilder.compare(comparisonKind.upper, identity, slicerFilters.upper)); else if (mode === visuals.slicerMode.between && (1 & state || 2 & state)) {
                        var lowerFilter = SQExprBuilder.compare(comparisonKind.lower, identity, slicerFilters.lower), upperFilter = SQExprBuilder.compare(comparisonKind.upper, identity, slicerFilters.upper);
                        filterExpr = SQExprBuilder.and(lowerFilter, upperFilter);
                    } else mode === visuals.slicerMode.after && 1 & state ? filterExpr = SQExprBuilder.compare(comparisonKind.lower, identity, slicerFilters.lower) : mode === visuals.slicerMode.before && 2 & state && (filterExpr = SQExprBuilder.compare(comparisonKind.upper, identity, slicerFilters.upper));
                }
                return null !== filterExpr && (result = powerbi.data.SemanticFilter.fromSQExpr(filterExpr)), 
                result;
            }, RangeSlicer.prototype.requireToUpdate = function(properties) {
                return (null !== this.data.properties.filter || 0 !== this.data.state || properties.mode !== this.data.properties.mode && (properties.mode !== this.defaultSliderMode || null !== this.data.properties.mode)) && !(null != this.data.properties.filter && properties.mode === this.data.properties.mode && this.rangeSlicerRenderer.areEqual(properties.start, this.data.properties.start) && this.rangeSlicerRenderer.areEqual(properties.end, this.data.properties.end) && this.rangeSlicerRenderer.areEqual(properties.filter.min, this.data.properties.filter.min) && this.rangeSlicerRenderer.areEqual(properties.filter.max, this.data.properties.filter.max) && this.rangeSlicerRenderer.areEqual(properties.bounds.min, this.data.properties.bounds.min) && this.rangeSlicerRenderer.areEqual(properties.bounds.max, this.data.properties.bounds.max));
            }, RangeSlicer.prototype.shouldHideSmallSlider = function() {
                return this.data.sliderSettings.shouldHideNarrowSlider && this.container.width() <= MinSliderVisibilityWidth;
            }, RangeSlicer;
        }();
        visuals.RangeSlicer = RangeSlicer;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        function DefaultInputSettings() {
            return {
                textSize: 9,
                fontFamily: visuals.Font.Family.regular.css,
                fontColor: "#000000",
                background: null
            };
        }
        function toRelativeDateRangeOptions(data) {
            return {
                duration: data.duration,
                includeToday: data.includeToday,
                relativeUnit: toRelativeDateUnit(data.period),
                relativeQualifier: toRelativeDateQualifier(data.range)
            };
        }
        function toRelativeDateUnit(timePeriod) {
            switch (timePeriod) {
              case visuals.relativeSlicerPeriod.days:
                return RelativeDateUnit.Day;

              case visuals.relativeSlicerPeriod.weeks:
                return RelativeDateUnit.Week;

              case visuals.relativeSlicerPeriod.calendarWeeks:
                return RelativeDateUnit.CalendarWeek;

              case visuals.relativeSlicerPeriod.months:
                return RelativeDateUnit.Month;

              case visuals.relativeSlicerPeriod.calendarMonths:
                return RelativeDateUnit.CalendarMonth;

              case visuals.relativeSlicerPeriod.years:
                return RelativeDateUnit.Year;

              case visuals.relativeSlicerPeriod.calendarYears:
                return RelativeDateUnit.CalendarYear;

              default:
                return;
            }
        }
        function toRelativeDateQualifier(qualifier) {
            switch (qualifier) {
              case visuals.relativeSlicerRelativeQualifier.last:
                return RelativeDateQualifier.Last;

              case visuals.relativeSlicerRelativeQualifier.current:
                return RelativeDateQualifier.Current;

              case visuals.relativeSlicerRelativeQualifier.next:
                return RelativeDateQualifier.Next;

              default:
                return;
            }
        }
        var SelectMenu = powerbi.visuals.controls.SelectMenu, RelativeDateQualifier = powerbi.data.RelativeDateQualifier, RelativeDateUnit = powerbi.data.RelativeDateUnit, RelativeDateRangeHelper = powerbi.data.RelativeDateRangeHelper, RelativeDateFilterPattern = powerbi.data.RelativeDateFilterPattern, SQExpr = powerbi.data.SQExpr, SemanticFilter = powerbi.data.SemanticFilter, PixelConverter = jsCommon.PixelConverter, ContainerClass = "relative-slicer", RSSelectionContainer = "selection-container", RangeMenu = "range-menu", PeriodMenu = "period-menu", SlicerSelectMenu = "slicer-select-menu", DurationInput = "duration-input", RestatementContainer = "restatement-container", Restatement = "restatement", DisableDragAttribute = "drag-resize-disabled", DisabledDurationInput = "-", SelectMenuButtonSelector = ".ui-selectmenu-button", RelativeSlicer = function() {
            function RelativeSlicer(options) {
                this.isRendered = !1, this.hostServices = options.hostServices;
            }
            return RelativeSlicer.prototype.init = function(options, element) {
                this.options = options, this.host = element, this.isRendered = !1, this.eventsHelper = new visuals.SlicerUtil.EventsHelper();
            }, RelativeSlicer.prototype.onDestroy = function() {
                this.unregisterSelectMenuCloseEvents && this.unregisterSelectMenuCloseEvents();
            }, RelativeSlicer.prototype.supportsOrientation = function() {
                return !1;
            }, RelativeSlicer.prototype.onClear = function() {
                this.data.range = visuals.relativeSlicerRelativeQualifier.last, this.data.period = visuals.relativeSlicerPeriod.none, 
                this.data.duration = 1, this.filterExpr = null, this.renderInternal(), visuals.SlicerUtil.clearSlicerFilter(this.hostServices, this.data.mode);
            }, RelativeSlicer.prototype.enumerateObjectInstances = function(options) {
                return "dateRange" === options.objectName ? [ {
                    selector: null,
                    objectName: "dateRange",
                    properties: {
                        includeToday: this.data.includeToday
                    }
                } ] : "numericInputStyle" === options.objectName ? [ {
                    selector: null,
                    objectName: "numericInputStyle",
                    properties: {
                        fontColor: this.data.inputStyle.fontColor,
                        background: this.data.inputStyle.background,
                        textSize: this.data.inputStyle.textSize,
                        fontFamily: this.data.inputStyle.fontFamily
                    }
                } ] : void 0;
            }, RelativeSlicer.prototype.onModeChange = function(mode) {
                visuals.SlicerUtil.clearSlicerFilter(this.hostServices, mode);
            }, RelativeSlicer.converter = function(reader) {
                var result = {
                    mode: visuals.slicerMode.relative,
                    range: visuals.relativeSlicerRelativeQualifier.last,
                    period: visuals.relativeSlicerPeriod.none,
                    duration: 1,
                    includeToday: !0,
                    identity: null,
                    inputStyle: DefaultInputSettings()
                }, metadataColumns = reader.columns.getMetadataColumns(visuals.slicerRoles.value), metadata = metadataColumns[0];
                result.identity = metadata.expr;
                var objects = reader.objects.getStaticObjects();
                return objects && (result.range = powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.data.relativeRange, result.range), 
                result.period = powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.data.relativePeriod, result.period), 
                result.duration = Math.abs(powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.data.relativeDuration, result.duration)), 
                result.includeToday = powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.dateRange.includeToday, result.includeToday), 
                result.inputStyle.background = powerbi.DataViewObjects.getFillColor(objects, visuals.slicerProps.numericInputStyle.background, result.inputStyle.background), 
                result.inputStyle.fontColor = powerbi.DataViewObjects.getFillColor(objects, visuals.slicerProps.numericInputStyle.fontColor, result.inputStyle.fontColor), 
                result.inputStyle.textSize = powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.numericInputStyle.textSize, result.inputStyle.textSize), 
                result.inputStyle.fontFamily = powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.numericInputStyle.fontFamily, result.inputStyle.fontFamily)), 
                result;
            }, RelativeSlicer.prototype.render = function(options) {
                var _this = this;
                if (!_.isEmpty(options.dataView)) {
                    var reader = powerbi.data.createDataViewCategoricalReaderAdvanced(options.dataView);
                    this.data = RelativeSlicer.converter(reader), this.isRendered || (this.initControls(), 
                    this.unregisterSelectMenuCloseEvents = this.eventsHelper.onPopupHideEvent(function(event) {
                        _this.onSelectMenuClose(event);
                    })), this.updateProperties(this.data.range, this.data.period), this.renderInternal();
                }
            }, RelativeSlicer.prototype.onSelectMenuClose = function(event) {
                this.rangeSelectMenu.close(), this.periodSelectMenu.close();
            }, RelativeSlicer.prototype.initControls = function() {
                var _this = this;
                this.isRendered = !0, this.container = InJs.DomFactory.div().addClass(ContainerClass).appendTo(this.host), 
                this.selectionContainer = InJs.DomFactory.div().addClass(RSSelectionContainer).appendTo(this.container), 
                this.selectionContainer.on("keyup keydown", function(event) {
                    event.stopPropagation();
                }), this.rangeSelectMenuContainer = InJs.DomFactory.div().addClass(RangeMenu).appendTo(this.selectionContainer);
                var rangeSettings = {
                    onChange: function(val) {
                        _this.rangeChanged(val);
                    },
                    container: this.rangeSelectMenuContainer,
                    options: this.getSelectMenuOptions(visuals.relativeSlicerRelativeQualifier.type.members()),
                    className: SlicerSelectMenu,
                    selectedValue: "Select"
                };
                this.rangeSelectMenu = new SelectMenu(rangeSettings), this.rangeSelectMenu.update({
                    selectedValue: visuals.relativeSlicerRelativeQualifier.last
                }), this.durationInput = InJs.DomFactory.textBox().attr("type", "text").attr(DisableDragAttribute, "true").addClass(DurationInput).appendTo(this.selectionContainer), 
                this.durationInput.val(this.data.duration.toString()), this.durationInput.on("change", function(event) {
                    _this.durationChanged();
                }), this.periodSelectMenuContainer = InJs.DomFactory.div().addClass(PeriodMenu).appendTo(this.selectionContainer);
                var periodSettings = {
                    onChange: function(val) {
                        _this.periodChanged(val);
                    },
                    container: this.periodSelectMenuContainer,
                    options: this.getSelectMenuOptions(visuals.relativeSlicerPeriod.type.members()),
                    className: SlicerSelectMenu
                };
                this.periodSelectMenu = new SelectMenu(periodSettings), this.periodSelectMenu.disableOption(visuals.relativeSlicerPeriod.none), 
                this.restatementContainer = InJs.DomFactory.div().addClass(RestatementContainer).appendTo(this.container), 
                this.restatementIcon = $("<i />").addClass("restatement-icon").addClass("pbi-glyph-calendar").appendTo(this.restatementContainer), 
                this.restatement = InJs.DomFactory.div().addClass(Restatement).appendTo(this.restatementContainer), 
                this.restatement.text(this.hostServices.getLocalizedString("ExportData_NoAppliedFiltersText"));
            }, RelativeSlicer.prototype.rangeChanged = function(val) {
                this.data.range = val, this.data.range === visuals.relativeSlicerRelativeQualifier.current ? (this.durationInput.val(DisabledDurationInput), 
                this.durationInput.prop("disabled", !0), this.data.duration = 0) : (this.durationInput.val() === DisabledDurationInput && (this.durationInput.val("1"), 
                this.data.duration = 1), this.durationInput.prop("disabled", !1)), this.updateProperties(this.data.range, this.data.period), 
                this.renderInternal();
            }, RelativeSlicer.prototype.periodChanged = function(val) {
                this.updateProperties(this.data.range, val), this.renderInternal();
            }, RelativeSlicer.prototype.durationChanged = function() {
                this.updateProperties(this.data.range, this.data.period), this.renderInternal();
            }, RelativeSlicer.prototype.renderInternal = function() {
                var fontSize = PixelConverter.fromPointToPixel(this.data.inputStyle.textSize), css = {
                    "font-size": fontSize,
                    "font-family": this.data.inputStyle.fontFamily,
                    color: this.data.inputStyle.fontColor,
                    "background-color": this.data.inputStyle.background ? this.data.inputStyle.background : ""
                };
                this.durationInput.css(css), css["font-size"] = fontSize - 1, this.restatement.css(css);
                var rangeMenuButton = this.rangeSelectMenuContainer.find(SelectMenuButtonSelector);
                rangeMenuButton.css(css);
                var rangeOption = visuals.relativeSlicerRelativeQualifier.type.members([ this.data.range ])[0], rangeTooltip = rangeOption.displayName({
                    get: this.hostServices.getLocalizedString
                });
                rangeMenuButton.attr("title", rangeTooltip);
                var periodMenuButton = this.periodSelectMenuContainer.find(SelectMenuButtonSelector);
                periodMenuButton.css(css);
                var periodOption = visuals.relativeSlicerPeriod.type.members([ this.data.period ])[0], periodTooltip = periodOption.displayName({
                    get: this.hostServices.getLocalizedString
                });
                periodMenuButton.attr("title", periodTooltip), this.rangeSelectMenu.update({
                    selectedValue: this.data.range
                }), this.periodSelectMenu.update({
                    selectedValue: this.data.period
                }), this.periodSelectMenu.disableOption(visuals.relativeSlicerPeriod.none), 0 === this.data.duration ? (this.durationInput.val(DisabledDurationInput), 
                this.durationInput.prop("disabled", !0), this.durationInput.attr("title", DisabledDurationInput)) : (this.durationInput.prop("disabled", !1), 
                this.durationInput.val(Math.abs(this.data.duration).toString()), this.durationInput.attr("title", Math.abs(this.data.duration).toString())), 
                this.setRestatement();
            }, RelativeSlicer.prototype.updateProperties = function(range, period) {
                this.data.range = range;
                var periodChanged = this.data.period !== period;
                this.data.period = period, this.updateDuration();
                var filterExpr = null;
                this.data.period !== visuals.relativeSlicerPeriod.none && (filterExpr = this.createFilter()), 
                SQExpr.equals(this.filterExpr, filterExpr) && !periodChanged || (this.filterExpr = filterExpr, 
                this.createAndPersistProperties(SemanticFilter.fromSQExpr(filterExpr)), this.setRestatement());
            }, RelativeSlicer.prototype.updateDuration = function() {
                this.data.range === visuals.relativeSlicerRelativeQualifier.current ? this.data.duration = 0 : this.isDurationValid() && (this.data.duration = Math.min(parseInt(this.durationInput.val(), 10), this.getDurationMax()));
            }, RelativeSlicer.prototype.isDurationValid = function() {
                var inputValue = parseInt(this.durationInput.val(), 10);
                return $.isNumeric(inputValue) && inputValue > 0;
            }, RelativeSlicer.prototype.getDurationMax = function() {
                var period = this.data.period !== visuals.relativeSlicerPeriod.none ? this.data.period : visuals.relativeSlicerPeriod.days;
                return RelativeDateRangeHelper.getDurationMax(toRelativeDateQualifier(this.data.range), toRelativeDateUnit(period));
            }, RelativeSlicer.prototype.createFilter = function() {
                var filter;
                if (this.data.identity) {
                    var options = toRelativeDateRangeOptions(this.data);
                    filter = RelativeDateFilterPattern.buildFilterCondition({
                        field: this.data.identity,
                        options: options
                    });
                }
                return filter;
            }, RelativeSlicer.prototype.createAndPersistProperties = function(filter) {
                var objects = {
                    merge: [],
                    replace: [],
                    remove: []
                }, objectGeneral = {
                    objectName: "general",
                    selector: null,
                    properties: {}
                };
                null !== filter ? (objectGeneral.properties[visuals.slicerProps.general.filter.propertyName] = filter, 
                objects.merge.push(objectGeneral)) : (objectGeneral.properties[visuals.slicerProps.general.filter.propertyName] = !0, 
                objects.remove.push(objectGeneral));
                var objectData = {
                    objectName: "data",
                    selector: null,
                    properties: {}
                };
                null != this.data.mode && (objectData.properties[visuals.slicerProps.data.mode.propertyName] = this.data.mode), 
                null != this.data.range && (objectData.properties[visuals.slicerProps.data.relativeRange.propertyName] = this.data.range), 
                null != this.data.duration && (objectData.properties[visuals.slicerProps.data.relativeDuration.propertyName] = this.data.duration), 
                null != this.data.period && (objectData.properties[visuals.slicerProps.data.relativePeriod.propertyName] = this.data.period), 
                objects.replace.push(objectData);
                var objectDateRange = {
                    objectName: "dateRange",
                    selector: null,
                    properties: {}
                };
                null != this.data.includeToday && (objectDateRange.properties[visuals.slicerProps.dateRange.includeToday.propertyName] = this.data.includeToday), 
                objects.replace.push(objectDateRange), this.hostServices.persistProperties(objects), 
                this.hostServices.onSelect({
                    visualObjects: []
                });
            }, RelativeSlicer.prototype.setRestatement = function() {
                if (this.data.period === visuals.relativeSlicerPeriod.none) return void this.restatement.text(this.hostServices.getLocalizedString("ExportData_NoAppliedFiltersText"));
                var options = toRelativeDateRangeOptions(this.data);
                this.restatement.text(RelativeDateRangeHelper.getRestatement(options));
            }, RelativeSlicer.prototype.getSelectMenuOptions = function(options) {
                for (var selectMenuOptions = [], _i = 0, options_1 = options; _i < options_1.length; _i++) {
                    var option = options_1[_i], displayName = option.displayName({
                        get: this.hostServices.getLocalizedString
                    });
                    selectMenuOptions.push({
                        text: displayName,
                        value: option.value
                    });
                }
                return selectMenuOptions;
            }, RelativeSlicer;
        }();
        visuals.RelativeSlicer = RelativeSlicer;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var DataConversion, DefaultSQExprVisitor = powerbi.data.DefaultSQExprVisitor, SemanticFilter = powerbi.data.SemanticFilter, UrlUtils = jsCommon.UrlUtils;
        !function(DataConversion) {
            function DefaultSlicerProperties() {
                return {
                    general: {
                        outlineWeight: 1,
                        outlineColor: "#808080"
                    },
                    slicerText: {
                        color: "#666666",
                        outline: visuals.outline.none,
                        textSize: 10,
                        fontFamily: visuals.Font.Family.regular.css
                    },
                    selection: {
                        selectAllCheckboxEnabled: !1,
                        singleSelect: !0
                    },
                    search: {
                        enabled: !1
                    }
                };
            }
            function convert(dataView, localizedSelectAllText, interactivityService, hostServices) {
                if (dataView && dataView.categorical && !_.isEmpty(dataView.categorical.categories)) {
                    var identityFields = dataView.categorical.categories[0].identityFields;
                    if (identityFields) {
                        var filter = dataView.metadata && dataView.metadata.objects && powerbi.DataViewObjects.getValue(dataView.metadata.objects, visuals.slicerProps.filterPropertyIdentifier), analyzer = hostServices.analyzeFilter({
                            dataView: dataView,
                            defaultValuePropertyId: visuals.slicerProps.defaultValue,
                            filter: filter,
                            fieldSQExprs: identityFields
                        });
                        if (analyzer) {
                            var analyzedSemanticFilter = analyzer.filter;
                            if (analyzedSemanticFilter && !SemanticFilter.isSameFilter(analyzedSemanticFilter, filter)) {
                                interactivityService.handleClearSelection();
                                var filterPropertyIdentifier = visuals.slicerProps.filterPropertyIdentifier, properties = {};
                                properties[filterPropertyIdentifier.propertyName] = analyzer.filter;
                                var instance = {
                                    objectName: filterPropertyIdentifier.objectName,
                                    selector: void 0,
                                    properties: properties
                                }, changes = {
                                    merge: [ instance ]
                                };
                                hostServices.persistProperties(changes);
                            }
                            var slicerData = getSlicerData(analyzer, dataView.metadata, dataView.categorical, localizedSelectAllText, interactivityService, hostServices);
                            return slicerData.hasImages = _.some(slicerData.slicerDataPoints, function(slicerDatePoint) {
                                return slicerDatePoint.isImage;
                            }), slicerData;
                        }
                    }
                }
            }
            function getSlicerData(analyzer, dataViewMetadata, categorical, localizedSelectAllText, interactivityService, hostServices) {
                var isInvertedSelectionMode = interactivityService && interactivityService.isSelectionModeInverted(), selectedScopeIds = analyzer.selectedIdentities, hasSelectionOverride = !_.isEmpty(selectedScopeIds) || isInvertedSelectionMode === !0;
                !isInvertedSelectionMode && analyzer.filter && (isInvertedSelectionMode = analyzer.isNotFilter), 
                interactivityService && (interactivityService.setSelectionModeInverted(isInvertedSelectionMode), 
                interactivityService.setDefaultValueMode(SemanticFilter.isDefaultFilter(analyzer.filter)));
                for (var category = categorical.categories[0], categoryValuesLen = category && category.values ? category.values.length : 0, slicerDataPoints = [], formatString = visuals.valueFormatter.getFormatString(category.source, visuals.slicerProps.formatString), numOfSelected = 0, objects = category.objects, isImageData = dataViewMetadata && !_.isEmpty(dataViewMetadata.columns) && visuals.converterHelper.isImageUrlColumn(dataViewMetadata.columns[0]), selectedValues = [], i = 0; i < categoryValuesLen; i++) {
                    var scopeId = category.identity && category.identity[i], value = category.values && category.values[i], count = void 0;
                    if (objects) {
                        var object = objects[i];
                        count = powerbi.DataViewObjects.getValue(object, visuals.slicerProps.general.count, count);
                    }
                    var isRetained = !!hasSelectionOverride && visuals.SlicerUtil.tryRemoveValueFromRetainedList(scopeId, selectedScopeIds), label = visuals.valueFormatter.format(value, formatString), isImage = isImageData === !0 && UrlUtils.isValidImageUrl(label), slicerData_1 = {
                        value: label,
                        tooltip: label,
                        identity: visuals.SelectionIdBuilder.builder().withCategory(category, i).createSelectionId(),
                        selected: isRetained,
                        count: count,
                        isImage: isImage
                    };
                    if (isRetained) {
                        var displayNameIdentityPair = {
                            displayName: label,
                            identity: scopeId
                        };
                        selectedValues.push(displayNameIdentityPair);
                    }
                    slicerDataPoints.push(slicerData_1), slicerData_1.selected && numOfSelected++;
                }
                if (_.isEmpty(selectedValues) || hostServices.setIdentityDisplayNames(selectedValues), 
                hasSelectionOverride && !_.isEmpty(selectedScopeIds)) {
                    var displayNamesIdentityPairs = hostServices.getIdentityDisplayNames(selectedScopeIds);
                    if (!_.isEmpty(displayNamesIdentityPairs)) for (var _i = 0, displayNamesIdentityPairs_1 = displayNamesIdentityPairs; _i < displayNamesIdentityPairs_1.length; _i++) {
                        var pair = displayNamesIdentityPairs_1[_i], label = visuals.valueFormatter.format(pair.displayName, formatString), isImage = isImageData === !0 && UrlUtils.isValidImageUrl(label), slicerData_2 = {
                            value: label,
                            tooltip: label,
                            identity: visuals.SelectionIdBuilder.builder().withCategoryIdentity(category, pair.identity).createSelectionId(),
                            selected: !0,
                            count: null != objects ? 0 : void 0,
                            isImage: isImage
                        };
                        slicerDataPoints.push(slicerData_2), numOfSelected++;
                    }
                }
                var searchKey = getSearchKey(dataViewMetadata), defaultSettings = createDefaultSettings(dataViewMetadata);
                defaultSettings.selection.selectAllCheckboxEnabled && _.isEmpty(searchKey) && slicerDataPoints.unshift({
                    value: localizedSelectAllText,
                    tooltip: localizedSelectAllText,
                    identity: visuals.SelectionId.createWithMeasure(localizedSelectAllText),
                    selected: !!isInvertedSelectionMode && 0 === numOfSelected,
                    isSelectAllDataPoint: !0,
                    count: void 0
                });
                var slicerData = {
                    categorySourceName: category.source.displayName,
                    slicerSettings: defaultSettings,
                    slicerDataPoints: slicerDataPoints,
                    hasSelectionOverride: hasSelectionOverride,
                    defaultValue: analyzer.defaultValue,
                    searchKey: searchKey,
                    restatement: getRestatement(hostServices, selectedValues, isInvertedSelectionMode)
                };
                return slicerData;
            }
            function getRestatement(hostServices, selected, isInverted) {
                return _.isEmpty(selected) ? hostServices.getLocalizedString("Slicer_Restatement_All") : 1 !== selected.length || isInverted ? hostServices.getLocalizedString("Slicer_Restatement_Multiple") : selected[0].displayName;
            }
            function getSearchKey(dataViewMetadata) {
                var selfFilter = powerbi.DataViewObjects.getValue(dataViewMetadata.objects, visuals.slicerProps.selfFilterPropertyIdentifier, void 0);
                if (!selfFilter) return "";
                var filterItems = selfFilter.conditions(), containsFilter = filterItems[0];
                if (containsFilter) {
                    var containsValueVisitor = new ConditionsFilterValueVisitor();
                    return containsFilter.accept(containsValueVisitor), containsValueVisitor.getValueForField();
                }
            }
            function createDefaultSettings(dataViewMetadata) {
                var defaultSettings = DataConversion.DefaultSlicerProperties(), objects = dataViewMetadata.objects, forceSingleSelect = dataViewMetadata.columns && _.some(dataViewMetadata.columns, function(column) {
                    return column.discourageAggregationAcrossGroups;
                });
                if (objects) {
                    defaultSettings.slicerText.color = powerbi.DataViewObjects.getFillColor(objects, visuals.slicerProps.items.fontColor, defaultSettings.slicerText.color), 
                    defaultSettings.general.outlineWeight = powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.general.outlineWeight, defaultSettings.general.outlineWeight), 
                    defaultSettings.general.outlineColor = powerbi.DataViewObjects.getFillColor(objects, visuals.slicerProps.general.outlineColor, defaultSettings.general.outlineColor);
                    var textBackground = powerbi.DataViewObjects.getFillColor(objects, visuals.slicerProps.items.background);
                    textBackground && (defaultSettings.slicerText.background = textBackground), defaultSettings.slicerText.outline = powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.items.outline, defaultSettings.slicerText.outline), 
                    defaultSettings.slicerText.textSize = powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.items.textSize, defaultSettings.slicerText.textSize), 
                    defaultSettings.slicerText.fontFamily = powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.items.fontFamily, defaultSettings.slicerText.fontFamily), 
                    defaultSettings.selection.selectAllCheckboxEnabled = !forceSingleSelect && powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.selection.selectAllCheckboxEnabled, defaultSettings.selection.selectAllCheckboxEnabled), 
                    defaultSettings.selection.singleSelect = forceSingleSelect || powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.selection.singleSelect, defaultSettings.selection.singleSelect), 
                    defaultSettings.search.enabled = powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.general.selfFilterEnabled, defaultSettings.search.enabled);
                }
                return defaultSettings;
            }
            DataConversion.DefaultSlicerProperties = DefaultSlicerProperties, DataConversion.convert = convert, 
            DataConversion.getRestatement = getRestatement;
            var ConditionsFilterValueVisitor = function(_super) {
                function ConditionsFilterValueVisitor() {
                    return null !== _super && _super.apply(this, arguments) || this;
                }
                return __extends(ConditionsFilterValueVisitor, _super), ConditionsFilterValueVisitor.prototype.visitConstant = function(expr) {
                    expr.type && expr.type.text && (this.value = expr.value);
                }, ConditionsFilterValueVisitor.prototype.visitContains = function(expr) {
                    expr.left.accept(this), expr.right.accept(this);
                }, ConditionsFilterValueVisitor.prototype.visitColumnRef = function(expr) {
                    this.fieldExpr = expr;
                }, ConditionsFilterValueVisitor.prototype.visitDefault = function(expr) {
                    this.value = void 0, this.fieldExpr = void 0;
                }, ConditionsFilterValueVisitor.prototype.getValueForField = function() {
                    return this.fieldExpr && this.value;
                }, ConditionsFilterValueVisitor;
            }(DefaultSQExprVisitor);
        }(DataConversion = visuals.DataConversion || (visuals.DataConversion = {}));
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        function DefaultModes() {
            return visuals.slicerMode.type.members([ visuals.slicerMode.basic, visuals.slicerMode.dropdown ]);
        }
        function RangeModes() {
            return visuals.slicerMode.type.members([ visuals.slicerMode.basic, visuals.slicerMode.dropdown, visuals.slicerMode.before, visuals.slicerMode.after, visuals.slicerMode.between ]);
        }
        function AllDateModes() {
            return visuals.slicerMode.type.members([ visuals.slicerMode.basic, visuals.slicerMode.dropdown, visuals.slicerMode.before, visuals.slicerMode.after, visuals.slicerMode.between, visuals.slicerMode.relative ]);
        }
        function SingleValue() {
            return visuals.slicerMode.type.members([ visuals.slicerMode.single ]);
        }
        var controls = powerbi.visuals.controls, HeaderWrapperClass = "slicer-header-wrapper", ContainerClass = "slicer-container", ContentWrapperClass = "slicer-content-wrapper", FullScreenClass = "full-screen", IconClassName = "slicerResponsiveIcon", Slicer = function() {
            function Slicer(options) {
                this.enableInFocusRenderers = !1, this.enableMultiElementRows = !1, this.preventVirtualKeyboardOnTheFirstTap = !1, 
                this.isInFocus = !1, this.hasSearchableData = !1, options && (this.behavior = options.behavior, 
                this.enableInFocusRenderers = options.enableInFocusRenderers, this.enableMultiElementRows = options.enableMultiElementRows, 
                this.preventVirtualKeyboardOnTheFirstTap = options.preventVirtualKeyboardOnTheFirstTap, 
                this.viewModelAdapter = options.viewModelAdapter), this.domHelper = new visuals.SlicerUtil.DOMHelper(), 
                this.activeMode = visuals.slicerMode.basic, this.slicerOrientation = 0;
            }
            return Slicer.prototype.init = function(options) {
                this.initOptions = options, this.element = options.element, this.visibilityHelper = powerbi.requireSync("Visuals/common/responsiveVisualUtil").visibilityHelper(this.element, IconClassName), 
                this.currentViewport = options.viewport, this.hostServices = options.host, this.waitingForData = !1, 
                this.container = InJs.DomFactory.div().addClass(ContainerClass).appendTo(this.element), 
                this.headerContainer = InJs.DomFactory.div().appendTo(this.container).addClass(HeaderWrapperClass), 
                this.slicerContainer = InJs.DomFactory.div().appendTo(this.container).addClass(ContentWrapperClass), 
                this.initializeSlicerRenderer();
            }, Slicer.prototype.destroy = function() {
                this.slicerRenderer.onDestroy && this.slicerRenderer.onDestroy();
            }, Slicer.prototype.update = function(options) {
                this.isInFocus = !!options.isInFocus, options.type & powerbi.VisualUpdateType.Resize && this.resizing(options.viewport), 
                (!options.type || options.type & powerbi.VisualUpdateType.Data) && this.dataChanged(options.dataViews, options.operationKind);
            }, Slicer.prototype.dataChanged = function(dataViews, operationKind) {
                if (!_.isEmpty(dataViews)) {
                    var existingDataView = this.dataView;
                    this.dataView = dataViews[0];
                    var resetScrollbarPosition = operationKind !== powerbi.VisualDataChangeOperationKind.Append && !powerbi.DataViewAnalysis.hasSameCategoryIdentity(existingDataView, this.dataView);
                    this.render(resetScrollbarPosition, !0);
                }
            }, Slicer.prototype.resizing = function(finalViewport) {
                this.currentViewport = finalViewport, this.render(!1);
            }, Slicer.prototype.enumerateObjectInstances = function(options) {
                if (this.dataView) switch (options.objectName) {
                  case "header":
                  case "modeSelection":
                    return this.slicerHeader.enumerateObjectInstances(options);

                  case "general":
                    var objects = this.slicerHeader.enumerateObjectInstances(options);
                    if (this.slicerRenderer && this.slicerRenderer.supportsOrientation()) {
                        var orientation_1 = this.data ? this.data.orientation : 0;
                        objects[0].properties.orientation = orientation_1;
                    }
                    return this.viewModelAdapter && this.viewModelAdapter.enumerateObjectInstances(options, objects, this.dataView, this.activeMode, this.slicerOrientation), 
                    objects;

                  default:
                    return this.slicerRenderer.enumerateObjectInstances(options);
                }
            }, Slicer.prototype.loadMoreData = function() {
                var dataView = this.dataView;
                if (dataView) {
                    var dataViewMetadata = dataView.metadata;
                    !this.waitingForData && dataViewMetadata && dataViewMetadata.segment && (this.hostServices.loadMoreData(), 
                    this.waitingForData = !0);
                }
            }, Slicer.prototype.onClearSelection = function() {
                this.interactivityService && (this.interactivityService.clearSelection(), this.render(!1));
            }, Slicer.converter = function(dataView) {
                if (dataView) {
                    var categorySourceName, mode = null, orientation = 0, isCategorySourceNumeric = !1, activeOptions = DefaultModes(), switchMode = 1, hasSearchableData = !1;
                    if (dataView.metadata && dataView.metadata.objects) {
                        var objects = dataView.metadata.objects;
                        orientation = powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.general.orientation, orientation), 
                        mode = powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.data.mode, mode);
                    }
                    if (dataView.metadata && dataView.metadata.columns) {
                        var columns = _.filter(dataView.metadata.columns, function(column) {
                            return column.roles && null != column.roles[visuals.slicerRoles.value];
                        });
                        if (!_.isEmpty(columns)) {
                            var column = columns[0];
                            if (hasSearchableData = column.type.text === !0, categorySourceName = column.displayName, 
                            isCategorySourceNumeric = column.type.numeric === !0, column.type.dateTime === !0) {
                                mode = null === mode ? visuals.slicerMode.between : mode, activeOptions = AllDateModes();
                                var rangeValid = column.aggregates && null != column.aggregates.min && null != column.aggregates.max;
                                !rangeValid && visuals.slicerMode.isRangeSlicerMode(mode) && (switchMode = 2);
                            } else if (isCategorySourceNumeric) {
                                if (visuals.SlicerHelper.SingleValueSlicer && column.parameter && (mode = null === mode ? visuals.slicerMode.single : mode, 
                                activeOptions = _.union(activeOptions, SingleValue())), mode = null === mode ? visuals.slicerMode.between : mode === visuals.slicerMode.relative ? visuals.slicerMode.basic : mode, 
                                activeOptions = _.union(activeOptions, RangeModes()), visuals.slicerMode.slicerModeSupportsMinMax(mode)) {
                                    var rangeValid = column.aggregates && null != column.aggregates.min && null != column.aggregates.max;
                                    !rangeValid && visuals.slicerMode.isRangeSlicerMode(mode) && (switchMode = 2);
                                }
                            } else mode = null === mode || visuals.slicerMode.isRangeSlicerMode(mode) ? visuals.slicerMode.basic : mode;
                        }
                    }
                    return {
                        orientation: orientation,
                        categorySourceName: categorySourceName,
                        isCategorySourceNumeric: isCategorySourceNumeric,
                        mode: mode,
                        switchMode: switchMode,
                        hasSearchableData: hasSearchableData,
                        activeOptions: activeOptions,
                        showIcon: !1,
                        showTabularSlicer: !1,
                        shouldHideNarrowSlider: !0
                    };
                }
            }, Slicer.prototype.render = function(resetScrollbarPosition, stopWaitingForData) {
                this.updateViewport(), this.previousData = this.data, this.data = this.originalData = Slicer.converter(this.dataView), 
                this.viewModelAdapter && this.dataView && (this.data = this.viewModelAdapter.applySlicerChanges(this.currentViewport, this.originalData, this.dataView)), 
                this.data && (this.hasSearchableData = this.data.hasSearchableData), this.data && this.data.showIcon ? this.visibilityHelper.updateVisibility({
                    showIcon: !0,
                    viewport: this.currentViewport
                }) : (this.visibilityHelper.updateVisibility({
                    showIcon: !1
                }), this.renderSlicer(resetScrollbarPosition, stopWaitingForData));
            }, Slicer.prototype.renderSlicer = function(resetScrollbarPosition, stopWaitingForData) {
                this.updateSlicerRendererIfNeeded(), this.renderSlicerHeader(this.interactivityService), 
                this.slicerRenderer.render({
                    dataView: this.dataView,
                    viewport: this.currentViewport,
                    resetScrollbarPosition: resetScrollbarPosition,
                    hasSearchableData: this.hasSearchableData,
                    drawRoundSliderHandles: !!this.data && this.data.drawRoundSliderHandles,
                    shouldHideNarrowSlider: !this.data || this.data.shouldHideNarrowSlider,
                    wrapRangeBoxes: !!this.data && this.data.wrapRangeBoxes
                }), stopWaitingForData && (this.waitingForData = !1);
            }, Slicer.prototype.updateSlicerRendererIfNeeded = function() {
                if (this.enableInFocusRenderers) {
                    var inFocusChanged = this.container.hasClass(FullScreenClass) !== this.isInFocus;
                    if (inFocusChanged) return this.isInFocus ? this.container.addClass(FullScreenClass) : this.container.removeClass(FullScreenClass), 
                    void this.initializeSlicerRenderer();
                }
                if (this.data) {
                    var newMode = this.data.mode || visuals.slicerMode.basic;
                    if (this.activeMode !== newMode || visuals.slicerMode.isRangeSlicerMode(this.activeMode) && this.previousData && this.previousData.isCategorySourceNumeric !== this.data.isCategorySourceNumeric) this.activeMode = newMode, 
                    this.initializeSlicerRenderer(); else {
                        var showTabularSlicer = this.data.showTabularSlicer, newOrientation = this.data.orientation || 0;
                        (this.slicerOrientation !== newOrientation || this.previousData && this.previousData.showTabularSlicer !== showTabularSlicer) && (this.slicerOrientation = newOrientation, 
                        this.initializeSlicerRenderer());
                    }
                }
            }, Slicer.prototype.updateViewport = function() {
                var css = (_a = {
                    height: this.currentViewport.height
                }, _a["min-width"] = this.currentViewport.width, _a);
                this.container.css(css);
                var _a;
            }, Slicer.prototype.renderSlicerHeader = function(interactivityService) {
                var _this = this;
                if (this.dataView) {
                    var reader = powerbi.data.createDataViewCategoricalReader(this.dataView);
                    if (!this.slicerHeader) {
                        var settings = {
                            onClear: function() {
                                _this.slicerRenderer && _this.slicerRenderer.onClear();
                            },
                            onChange: function(mode) {
                                _this.slicerRenderer && _this.slicerRenderer.onModeChange(mode);
                            },
                            host: this.headerContainer,
                            text: this.data.categorySourceName,
                            visibilityState: this.data.switchMode,
                            selectedValue: this.activeMode,
                            hoverContainer: this.element,
                            enableInFocusRenderers: this.enableInFocusRenderers,
                            slicerModeOptions: this.slicerActiveOptions()
                        }, services_1 = {
                            localize: this.hostServices.getLocalizedString,
                            getViewMode: this.hostServices.getViewMode,
                            applySlicerHeaderChanges: function(visualSlicerHeaderData) {
                                var result = visualSlicerHeaderData;
                                return _this.viewModelAdapter && _this.dataView && _this.data && (result = _this.viewModelAdapter.applySlicerHeaderChanges(_this.currentViewport, visualSlicerHeaderData, _this.dataView, _this.data)), 
                                result;
                            }
                        };
                        this.slicerHeader = new controls.SlicerHeader(settings, services_1);
                    }
                    this.slicerHeader.update(reader, {
                        text: this.data.categorySourceName,
                        selectedValue: this.activeMode,
                        visibilityState: this.data.switchMode,
                        isInFocus: this.isInFocus,
                        slicerModeOptions: this.slicerActiveOptions()
                    });
                }
            }, Slicer.prototype.slicerActiveOptions = function() {
                if (this.data.isCategorySourceNumeric) {
                    for (var activeOptions = [], _i = 0, _a = this.data.activeOptions; _i < _a.length; _i++) {
                        var option = _a[_i];
                        activeOptions.push(visuals.NumericSlicerOptions.members([ option.value ])[0]);
                    }
                    return activeOptions;
                }
                return this.data.activeOptions;
            }, Slicer.prototype.initializeSlicerRenderer = function() {
                switch (this.slicerRenderer && this.slicerRenderer.onDestroy && this.slicerRenderer.onDestroy(), 
                this.slicerContainer.empty(), this.activeMode) {
                  case visuals.slicerMode.basic:
                    return void this.initializeBasicSlicer();

                  case visuals.slicerMode.dropdown:
                    return void this.initializeDropdownSlicer();

                  case visuals.slicerMode.relative:
                    return void this.initilizeRelativeSlicer();

                  case visuals.slicerMode.between:
                  case visuals.slicerMode.before:
                  case visuals.slicerMode.after:
                    return void this.initializeRangeSlicer(!1);

                  case visuals.slicerMode.single:
                    return void this.initializeRangeSlicer(!0);

                  default:
                    return void this.initializeVerticalSlicer();
                }
            }, Slicer.prototype.initializeBasicSlicer = function() {
                if (this.enableInFocusRenderers && this.isInFocus) this.initializeInFocusVerticalSlicer(); else switch (this.slicerOrientation) {
                  case 1:
                    this.initializeHorizontalOrTabularSlicer();
                    break;

                  case 0:
                    this.initializeVerticalSlicer();
                }
            }, Slicer.prototype.initializeInFocusVerticalSlicer = function() {
                var verticalSlicerRenderer = this.slicerRenderer = new visuals.VerticalSlicerRenderer(new visuals.VerticalSlicerRenderer.CheckListSlicerStrategy(), {
                    hostServices: this.hostServices,
                    behavior: this.behavior
                }), options = this.createInitOptions();
                this.interactivityService = verticalSlicerRenderer.init(options, this.slicerContainer);
            }, Slicer.prototype.initializeVerticalSlicer = function() {
                var verticalSlicerRenderer = this.slicerRenderer = new visuals.VerticalSlicerRenderer(new visuals.VerticalSlicerRenderer.CheckBoxSlicerStrategy(), {
                    hostServices: this.hostServices,
                    behavior: this.behavior
                }), options = this.createInitOptions();
                this.interactivityService = verticalSlicerRenderer.init(options, this.slicerContainer);
            }, Slicer.prototype.initializeRangeSlicer = function(singleValue) {
                if (this.data.isCategorySourceNumeric) {
                    var rangeSlicerRenderer = new visuals.NumericSlicer();
                    this.slicerRenderer = new visuals.RangeSlicer({
                        hostServices: this.hostServices,
                        behavior: this.behavior
                    }, rangeSlicerRenderer, singleValue);
                } else {
                    var rangeSlicerRenderer = new visuals.DateSlicer({
                        preventVirtualKeyboardOnTheFirstTap: this.preventVirtualKeyboardOnTheFirstTap
                    });
                    this.slicerRenderer = new visuals.RangeSlicer({
                        hostServices: this.hostServices,
                        behavior: this.behavior
                    }, rangeSlicerRenderer, singleValue);
                }
                var options = this.createInitOptions();
                this.interactivityService = this.slicerRenderer.init(options, this.slicerContainer);
            }, Slicer.prototype.initializeHorizontalOrTabularSlicer = function() {
                var slicerLayout, showTabularSlicer = !!this.data && this.data.showTabularSlicer;
                slicerLayout = showTabularSlicer ? new visuals.TabularSlicerLayout() : new visuals.HorizontalSlicerLayout();
                var slicerRenderer = this.slicerRenderer = new visuals.HorizontalSlicerRenderer({
                    hostServices: this.hostServices,
                    behavior: this.behavior,
                    horizontalSlicerLayout: slicerLayout
                }), options = this.createInitOptions();
                this.interactivityService = slicerRenderer.init(options, this.slicerContainer);
            }, Slicer.prototype.initilizeRelativeSlicer = function() {
                var relativeSlicerRenderer = this.slicerRenderer = new visuals.RelativeSlicer({
                    hostServices: this.hostServices,
                    behavior: this.behavior
                }), options = this.createInitOptions();
                this.interactivityService = relativeSlicerRenderer.init(options, this.slicerContainer);
            }, Slicer.prototype.initializeDropdownSlicer = function() {
                if (this.enableInFocusRenderers && this.isInFocus) this.initializeInFocusVerticalSlicer(); else {
                    var slicerOptions = {
                        hostServices: this.hostServices,
                        behavior: this.behavior
                    }, verticalSlicerRenderer = new visuals.VerticalSlicerRenderer(new visuals.VerticalSlicerRenderer.CheckBoxSlicerStrategy(), slicerOptions);
                    this.slicerRenderer = new visuals.DropdownSlicerRenderer(verticalSlicerRenderer, slicerOptions);
                    var options = this.createInitOptions();
                    this.interactivityService = this.slicerRenderer.init(options, this.slicerContainer);
                }
            }, Slicer.prototype.createInitOptions = function() {
                var _this = this;
                return {
                    visualInitOptions: this.initOptions,
                    loadMoreData: function() {
                        return _this.loadMoreData();
                    },
                    enableMultiElementRows: this.enableMultiElementRows
                };
            }, Slicer;
        }();
        visuals.Slicer = Slicer;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var DOMConstants = jsCommon.DOMConstants, KeyUtils = jsCommon.KeyUtils, SlicerWebBehavior = function() {
            function SlicerWebBehavior() {}
            return SlicerWebBehavior.prototype.bindEvents = function(options, selectionHandler) {
                this.behavior = this.createWebBehavior(options), this.behavior.bindEvents(options.behaviorOptions, selectionHandler);
            }, SlicerWebBehavior.prototype.renderSelection = function(hasSelection) {
                this.behavior.renderSelection(hasSelection);
            }, SlicerWebBehavior.bindSlicerEvents = function(behaviorOptions, slicers, selectionHandler, slicerSettings, interactivityService) {
                SlicerWebBehavior.bindSlicerItemSelectionEvent(slicers, selectionHandler, slicerSettings, interactivityService), 
                behaviorOptions.searchInput && SlicerWebBehavior.bindSlicerSearchEvent(behaviorOptions.searchInput, behaviorOptions.clearSearchTextButton, selectionHandler, behaviorOptions.slicerValueHandler), 
                SlicerWebBehavior.styleSlicerContainer(behaviorOptions.slicerContainer, interactivityService);
            }, SlicerWebBehavior.setSelectionOnSlicerItems = function(selectableItems, itemLabel, hasSelection, interactivityService, slicerSettings) {
                if (hasSelection || interactivityService.isSelectionModeInverted()) SlicerWebBehavior.styleSlicerItems(selectableItems, hasSelection, interactivityService.isSelectionModeInverted()); else {
                    selectableItems.filter(".selected").classed("selected", !1), selectableItems.filter(".partiallySelected").classed("partiallySelected", !1);
                    var input = selectableItems.selectAll("input");
                    input && input.property("checked", !1), itemLabel.style("color", slicerSettings.slicerText.color);
                }
            }, SlicerWebBehavior.styleSlicerItems = function(slicerItems, hasSelection, isSelectionInverted) {
                slicerItems.each(function(d, i) {
                    var slicerItem = this, shouldCheck = !1;
                    d.isSelectAllDataPoint ? hasSelection ? (slicerItem.classList.add("partiallySelected"), 
                    shouldCheck = !1) : (slicerItem.classList.remove("partiallySelected"), shouldCheck = isSelectionInverted) : shouldCheck = jsCommon.LogicExtensions.XOR(d.selected, isSelectionInverted), 
                    shouldCheck ? slicerItem.classList.add("selected") : slicerItem.classList.remove("selected");
                    var input = slicerItem.getElementsByTagName("input")[0];
                    input && (input.checked = shouldCheck);
                });
            }, SlicerWebBehavior.bindSlicerItemSelectionEvent = function(slicers, selectionHandler, slicerSettings, interactivityService) {
                slicers.on("click", function(d) {
                    if (d3.event.preventDefault(), d.isSelectAllDataPoint) selectionHandler.toggleSelectionModeInversion(); else {
                        var position = visuals.InteractivityUtils.getPositionOfLastInputEvent();
                        selectionHandler.handleSelection(d, SlicerWebBehavior.isMultiSelect(d3.event, slicerSettings, interactivityService), position);
                    }
                    selectionHandler.persistSelectionFilter(visuals.slicerProps.filterPropertyIdentifier);
                });
            }, SlicerWebBehavior.bindSlicerSearchEvent = function(slicerSearch, clearSearchTextButton, selectionHandler, slicerValueHandler) {
                var _this = this;
                slicerSearch.empty() || (slicerSearch.on(DOMConstants.keyDownEventName, function() {
                    d3.event.ctrlKey && KeyUtils.isCtrlShortcutKey(d3.event.keyCode) ? d3.event.stopPropagation() : KeyUtils.isArrowKey(d3.event.keyCode) || KeyUtils.isDeleteKey(d3.event.keyCode) ? d3.event.stopPropagation() : 27 === d3.event.keyCode ? (_this.clearSearch(selectionHandler), 
                    d3.event.stopPropagation()) : 13 === d3.event.keyCode && (SlicerWebBehavior.startSearch(slicerSearch, selectionHandler, slicerValueHandler), 
                    d3.event.stopPropagation());
                }).on(DOMConstants.keyUpEventName, _.debounce(function() {
                    SlicerWebBehavior.startSearch(slicerSearch, selectionHandler, slicerValueHandler);
                }, SlicerWebBehavior.searchInputTimeoutDuration)), clearSearchTextButton && !clearSearchTextButton.empty() && clearSearchTextButton.on(DOMConstants.mouseClickEventName, function() {
                    _this.clearSearch(selectionHandler), d3.event.stopPropagation();
                }));
            }, SlicerWebBehavior.clearSearch = function(selectionHandler) {
                selectionHandler.persistSelfFilter(visuals.slicerProps.selfFilterPropertyIdentifier, null);
            }, SlicerWebBehavior.startSearch = function(slicerSearch, selectionHandler, slicerValueHandler) {
                var element = slicerSearch.node(), searchKey = element && element.value;
                if (searchKey = _.trim(searchKey), _.isEmpty(searchKey)) return void selectionHandler.persistSelfFilter(visuals.slicerProps.selfFilterPropertyIdentifier, null);
                var updatedFilter = slicerValueHandler.getUpdatedSelfFilter(searchKey);
                updatedFilter && selectionHandler.persistSelfFilter(visuals.slicerProps.selfFilterPropertyIdentifier, updatedFilter);
            }, SlicerWebBehavior.styleSlicerContainer = function(slicerContainer, interactivityService) {
                var hasSelection = interactivityService.hasSelection() && void 0 === interactivityService.isDefaultValueEnabled() || interactivityService.isDefaultValueEnabled() === !1;
                slicerContainer.classed("hasSelection", hasSelection);
            }, SlicerWebBehavior.isMultiSelect = function(event, settings, interactivityService) {
                return interactivityService.isSelectionModeInverted() || !settings.selection.singleSelect || event.ctrlKey;
            }, SlicerWebBehavior.prototype.createWebBehavior = function(options) {
                var behavior, orientation = options.orientation;
                switch (orientation) {
                  case 1:
                    behavior = new visuals.HorizontalSlicerWebBehavior();
                    break;

                  case 0:
                  default:
                    behavior = new visuals.VerticalSlicerWebBehavior();
                }
                return behavior;
            }, SlicerWebBehavior.searchInputTimeoutDuration = 500, SlicerWebBehavior;
        }();
        visuals.SlicerWebBehavior = SlicerWebBehavior;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var controls;
        !function(controls) {
            var SelectMenu = powerbi.visuals.controls.SelectMenu, PixelConverter = jsCommon.PixelConverter, HeaderClass = "slicer-header", SlicerSelectMenu = "slicer-select-menu", TitleClass = "slicer-header-title", ClearClass = "slicer-header-clear", TextClass = "slicer-header-text", SelectMenuContainerClass = "slicer-header-selectmenu", SlicerHeader = function() {
                function SlicerHeader(settings, services) {
                    this.services = services, this.settings = settings, this.data = SlicerHeader.DefaultData(), 
                    this.render();
                }
                return SlicerHeader.DefaultData = function() {
                    return {
                        borderStyle: "solid",
                        borderBottomWidth: 1,
                        show: !0,
                        outline: visuals.outline.none,
                        fontColor: "#000000",
                        textSize: 9,
                        fontFamily: visuals.Font.Family.regular.css,
                        outlineColor: "#808080",
                        outlineWeight: 1,
                        searchEnabled: !1,
                        background: null,
                        menu: {
                            fontColor: "#666666"
                        }
                    };
                }, SlicerHeader.InFocusModeData = function() {
                    var data = SlicerHeader.DefaultData();
                    return data.borderStyle = "none", data.background = "#EAEAEA", data.textSize = PixelConverter.toPoint(13), 
                    data.fontColor = "#212121", data.fontFamily = visuals.Font.Family.regular.css, data;
                }, SlicerHeader.prototype.enumerateObjectInstances = function(options) {
                    if (this.data) return "header" === options.objectName ? [ {
                        selector: null,
                        objectName: "header",
                        properties: {
                            show: this.data.show,
                            fontColor: this.data.fontColor,
                            background: this.data.background,
                            outline: this.data.outline,
                            textSize: this.data.textSize,
                            fontFamily: this.data.fontFamily,
                            outlineColor: this.data.outlineColor,
                            outlineWeight: this.data.outlineWeight
                        }
                    } ] : "general" === options.objectName ? [ {
                        selector: null,
                        objectName: "general",
                        properties: {
                            outlineColor: this.data.outlineColor,
                            outlineWeight: this.data.outlineWeight
                        }
                    } ] : void 0;
                }, SlicerHeader.prototype.update = function(reader, settings) {
                    $.extend(this.settings, settings), this.settings.enableInFocusRenderers && this.settings.isInFocus ? this.data = SlicerHeader.InFocusModeData() : (this.data = SlicerHeader.converter(reader), 
                    this.data = this.services.applySlicerHeaderChanges(this.data)), this.updateTitle(), 
                    this.updateSelectMenu();
                }, SlicerHeader.converter = function(reader) {
                    var data = SlicerHeader.DefaultData(), objects = reader.objects.getStaticObjects();
                    return objects && (data.show = powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.header.show, data.show), 
                    data.fontColor = powerbi.DataViewObjects.getFillColor(objects, visuals.slicerProps.header.fontColor, data.fontColor), 
                    data.menu.fontColor = powerbi.DataViewObjects.getFillColor(objects, visuals.slicerProps.header.fontColor, data.menu.fontColor), 
                    data.background = powerbi.DataViewObjects.getFillColor(objects, visuals.slicerProps.header.background, data.background), 
                    data.outlineColor = powerbi.DataViewObjects.getFillColor(objects, visuals.slicerProps.general.outlineColor, data.outlineColor), 
                    data.outlineWeight = powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.general.outlineWeight, data.outlineWeight), 
                    data.outline = powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.header.outline, data.outline), 
                    data.textSize = powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.header.textSize, data.textSize), 
                    data.fontFamily = powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.header.fontFamily, data.fontFamily), 
                    data.searchEnabled = powerbi.DataViewObjects.getValue(objects, visuals.slicerProps.general.selfFilterEnabled, data.searchEnabled)), 
                    data;
                }, SlicerHeader.prototype.render = function() {
                    this.header = InJs.DomFactory.div().addClass(HeaderClass).appendTo(this.settings.host), 
                    this.addTitle(), this.addSelectMenu();
                }, SlicerHeader.prototype.addSelectMenu = function() {
                    var _this = this;
                    this.selectMenuContainer = InJs.DomFactory.div().addClass(SelectMenuContainerClass).appendTo(this.title);
                    var settings = {
                        onChange: function(val) {
                            _this.settings.onChange && _this.settings.onChange(val);
                        },
                        container: this.selectMenuContainer,
                        options: this.getSelectMenuOptions(),
                        selectedValue: this.settings.selectedValue,
                        className: SlicerSelectMenu,
                        disabled: 2 === this.settings.visibilityState
                    };
                    this.selectMenu = new SelectMenu(settings), this.settings.hoverContainer.hover(function() {
                        0 !== _this.services.getViewMode() && _this.selectMenuContainer.show();
                    }, function() {
                        _this.selectMenuContainer.hide();
                    });
                }, SlicerHeader.prototype.addTitle = function() {
                    var _this = this;
                    this.title = InJs.DomFactory.div().addClass(TitleClass).appendTo(this.header), this.clearButton = InJs.DomFactory.span().addClass(ClearClass).attr("title", this.services.localize(visuals.SlicerUtil.DisplayNameKeys.Clear)).appendTo(this.title), 
                    this.clearButton.click(function() {
                        _this.settings.onClear && _this.settings.onClear();
                    }), this.settings.hoverContainer.hover(function() {
                        _this.clearButton.show();
                    }, function() {
                        _this.clearButton.hide();
                    }), this.textElement = $("<h2 />").addClass(TextClass).appendTo(this.title);
                }, SlicerHeader.prototype.updateTitle = function() {
                    if (this.data.show) {
                        var hideOutline = !1;
                        if (this.data.searchEnabled) {
                            var defaultData = SlicerHeader.DefaultData();
                            hideOutline = this.data.outline === defaultData.outline && this.data.outlineWeight === defaultData.outlineWeight && this.data.outlineColor === defaultData.outlineColor;
                        }
                        this.title.show(), this.title.css({
                            "border-style": hideOutline ? "none" : this.data.borderStyle,
                            "border-color": this.data.outlineColor,
                            "border-width": visuals.VisualBorderUtil.getBorderWidth(this.data.outline, this.data.outlineWeight),
                            "background-color": _.isEmpty(this.data.background) ? "" : this.data.background
                        }), this.textElement.css({
                            "font-size": PixelConverter.fromPoint(this.data.textSize),
                            "font-family": this.data.fontFamily,
                            color: this.data.fontColor
                        }), this.textElement.text(this.settings.text).attr("title", this.settings.text);
                    } else this.title.hide();
                }, SlicerHeader.prototype.updateSelectMenu = function() {
                    0 === this.services.getViewMode() ? this.selectMenuContainer.hide() : this.selectMenu.update({
                        options: this.getSelectMenuOptions(),
                        selectedValue: this.settings.selectedValue,
                        disabled: 2 === this.settings.visibilityState
                    });
                }, SlicerHeader.prototype.getSelectMenuOptions = function() {
                    for (var selectMenuOptions = [], options = this.settings.slicerModeOptions, _i = 0, options_2 = options; _i < options_2.length; _i++) {
                        var option = options_2[_i], displayName = option.displayName({
                            get: this.services.localize
                        });
                        selectMenuOptions.push({
                            text: displayName,
                            value: option.value
                        });
                    }
                    return selectMenuOptions;
                }, SlicerHeader;
            }();
            controls.SlicerHeader = SlicerHeader;
        }(controls = visuals.controls || (visuals.controls = {}));
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var SlicerUtil, Color = jsCommon.Color, PixelConverter = jsCommon.PixelConverter, SQExprBuilder = powerbi.data.SQExprBuilder, SemanticFilter = powerbi.data.SemanticFilter;
        !function(SlicerUtil) {
            function getContainsFilter(expr, containsText) {
                var containsTextExpr = SQExprBuilder.text(containsText), filterExpr = SQExprBuilder.contains(expr, containsTextExpr);
                return SemanticFilter.fromSQExpr(filterExpr);
            }
            function tryRemoveValueFromRetainedList(value, selectedScopeIds, caseInsensitive) {
                if (!value || _.isEmpty(selectedScopeIds)) return !1;
                for (var i = 0, len = selectedScopeIds.length; i < len; i++) {
                    var retainedValueScopeId = selectedScopeIds[i];
                    if (powerbi.DataViewScopeIdentity.equals(value, retainedValueScopeId, caseInsensitive)) return selectedScopeIds.splice(i, 1), 
                    !0;
                }
                return !1;
            }
            function getUpdatedSelfFilter(searchKey, metaData) {
                if (metaData && !_.isEmpty(searchKey)) {
                    var column = _.first(metaData.columns);
                    return column && column.expr ? SlicerUtil.getContainsFilter(column.expr, searchKey) : void 0;
                }
            }
            function clearSlicerFilter(hostServices, mode) {
                var objects = {
                    remove: [ {
                        objectName: "general",
                        selector: null,
                        properties: {
                            filter: !0
                        }
                    } ],
                    replace: [ {
                        objectName: "data",
                        selector: null,
                        properties: (_a = {}, _a[visuals.slicerProps.data.mode.propertyName] = mode, _a)
                    } ]
                };
                hostServices.persistProperties(objects), hostServices.onSelect({
                    visualObjects: []
                });
                var _a;
            }
            var Selectors;
            !function(Selectors) {
                var createClassAndSelector = jsCommon.CssConstants.createClassAndSelector;
                Selectors.ClearSearchTextButton = createClassAndSelector("clearSearchTextButton"), 
                Selectors.HeaderContainer = createClassAndSelector("headerContainer"), Selectors.Header = createClassAndSelector("slicerHeader"), 
                Selectors.Hidden = createClassAndSelector("hidden"), Selectors.Icon = createClassAndSelector("icon"), 
                Selectors.TitleHeader = createClassAndSelector("titleHeader"), Selectors.HeaderText = createClassAndSelector("headerText"), 
                Selectors.Body = createClassAndSelector("slicerBody"), Selectors.Label = createClassAndSelector("slicerLabel"), 
                Selectors.LabelText = createClassAndSelector("slicerText"), Selectors.LabelImage = createClassAndSelector("slicerImage"), 
                Selectors.CountText = createClassAndSelector("slicerCountText"), Selectors.Clear = createClassAndSelector("clear"), 
                Selectors.SearchHeader = createClassAndSelector("searchHeader"), Selectors.SearchIconClass = createClassAndSelector("searchIcon"), 
                Selectors.SearchInput = createClassAndSelector("searchInput"), Selectors.SearchHeaderCollapsed = createClassAndSelector("collapsed"), 
                Selectors.SearchHeaderShow = createClassAndSelector("show"), Selectors.MultiSelectEnabled = createClassAndSelector("isMultiSelectEnabled");
            }(Selectors = SlicerUtil.Selectors || (SlicerUtil.Selectors = {}));
            var DisplayNameKeys;
            !function(DisplayNameKeys) {
                DisplayNameKeys.Clear = "Slicer_Clear", DisplayNameKeys.SelectAll = "Slicer_SelectAll", 
                DisplayNameKeys.Search = "SearchBox_Text";
            }(DisplayNameKeys = SlicerUtil.DisplayNameKeys || (SlicerUtil.DisplayNameKeys = {}));
            var SettingsHelper;
            !function(SettingsHelper) {
                function areSettingsDefined(data) {
                    return null != data && null != data.slicerSettings;
                }
                SettingsHelper.areSettingsDefined = areSettingsDefined;
            }(SettingsHelper = SlicerUtil.SettingsHelper || (SlicerUtil.SettingsHelper = {}));
            var DefaultValueHandler;
            !function(DefaultValueHandler) {
                function getIdentityFields(dataView) {
                    if (dataView) {
                        var dataViewCategorical = dataView.categorical;
                        if (dataViewCategorical && !_.isEmpty(dataViewCategorical.categories)) return dataViewCategorical.categories[0].identityFields;
                    }
                }
                DefaultValueHandler.getIdentityFields = getIdentityFields;
            }(DefaultValueHandler = SlicerUtil.DefaultValueHandler || (SlicerUtil.DefaultValueHandler = {})), 
            SlicerUtil.getContainsFilter = getContainsFilter, SlicerUtil.tryRemoveValueFromRetainedList = tryRemoveValueFromRetainedList, 
            SlicerUtil.getUpdatedSelfFilter = getUpdatedSelfFilter, SlicerUtil.clearSlicerFilter = clearSlicerFilter;
            var EventsHelper = function() {
                function EventsHelper() {}
                return EventsHelper.prototype.onPopupHideEvent = function(handler) {
                    return this.popupHideEventHandler = handler, this.bindPopupHideHandlers(), $.proxy(this.unbindPopupHideHandlers, this);
                }, EventsHelper.prototype.popupHideEventReceived = function(event) {
                    this.popupHideEventHandler(event);
                }, EventsHelper.prototype.bindPopupHideHandlers = function() {
                    $(EventsHelper.exploreCanvasSelector).on("mousedown", $.proxy(this.popupHideEventReceived, this)), 
                    $(EventsHelper.exploreCanvasSelector).on("touchstart", $.proxy(this.popupHideEventReceived, this)), 
                    $(EventsHelper.exploreCanvasSelector).on("scroll", $.proxy(this.popupHideEventReceived, this)), 
                    $(window).on("resize", $.proxy(this.popupHideEventReceived, this));
                }, EventsHelper.prototype.unbindPopupHideHandlers = function() {
                    $(EventsHelper.exploreCanvasSelector).off("mousedown", this.popupHideEventReceived), 
                    $(EventsHelper.exploreCanvasSelector).off("touchstart", this.popupHideEventReceived), 
                    $(EventsHelper.exploreCanvasSelector).off("scroll", this.popupHideEventReceived), 
                    $(window).off("resize", this.popupHideEventReceived);
                }, EventsHelper.exploreCanvasSelector = ".exploreCanvas", EventsHelper;
            }();
            SlicerUtil.EventsHelper = EventsHelper;
            var DOMHelper = function() {
                function DOMHelper() {}
                return DOMHelper.prototype.addSearch = function(hostServices, container) {
                    var slicerSearch = container.append("div").classed(Selectors.SearchHeader.class, !0).classed(Selectors.SearchHeaderCollapsed.class, !0);
                    return slicerSearch.append("span").classed("powervisuals-glyph search", !0).classed(Selectors.Icon.class, !0).classed(Selectors.SearchIconClass.class, !0).attr("title", hostServices.getLocalizedString(DisplayNameKeys.Search)), 
                    slicerSearch.append("input").attr("type", "text").classed(Selectors.SearchInput.class, !0).attr("drag-resize-disabled", "true"), 
                    slicerSearch;
                }, DOMHelper.prototype.addClearSearchButton = function(hostServices, searchContainer) {
                    var clearSearchTextButton = searchContainer.append("span").classed("powervisuals-glyph x", !0).classed(Selectors.Icon.class, !0).classed(Selectors.ClearSearchTextButton.class, !0), searchTextField = searchContainer.select(SlicerUtil.Selectors.SearchInput.selector);
                    return searchTextField.attr("placeholder", hostServices.getLocalizedString(DisplayNameKeys.Search)), 
                    clearSearchTextButton;
                }, DOMHelper.prototype.configureSearchBoxIcon = function(searchContainer, searchKey) {
                    var searchKeyIsEmpty = _.isEmpty(searchKey);
                    searchContainer.select(SlicerUtil.Selectors.SearchIconClass.selector).classed(SlicerUtil.Selectors.Hidden.class, !searchKeyIsEmpty), 
                    searchContainer.select(SlicerUtil.Selectors.ClearSearchTextButton.selector).classed(SlicerUtil.Selectors.Hidden.class, searchKeyIsEmpty);
                }, DOMHelper.prototype.getRowHeight = function(settings, textProperties) {
                    return powerbi.TextMeasurementService.estimateSvgTextHeight(this.getTextProperties(settings.slicerText.textSize, settings.slicerText.fontFamily, textProperties)) + this.getRowsOutlineWidth(settings.slicerText.outline, settings.general.outlineWeight);
                }, DOMHelper.prototype.setSlicerTextStyle = function(slicerText, settings) {
                    var LineHeightNormalizingFactor = 1.79;
                    slicerText.style({
                        color: settings.slicerText.color,
                        "background-color": settings.slicerText.background,
                        "border-style": "solid",
                        "border-color": settings.general.outlineColor,
                        "border-width": visuals.VisualBorderUtil.getBorderWidth(settings.slicerText.outline, settings.general.outlineWeight),
                        "font-size": PixelConverter.fromPoint(settings.slicerText.textSize),
                        "font-family": settings.slicerText.fontFamily,
                        "line-height": Math.floor(LineHeightNormalizingFactor * settings.slicerText.textSize) + "px"
                    });
                    var color = this.calculateSlicerTextHighlightColor(settings.slicerText.color);
                    slicerText.on("mouseover", function(d) {
                        d3.select(this).style({
                            color: color
                        });
                    }), slicerText.on("mouseout", function(d) {
                        d3.select(this).style({
                            color: settings.slicerText.color
                        });
                    });
                }, DOMHelper.prototype.getRowsOutlineWidth = function(outlineElement, outlineWeight) {
                    switch (outlineElement) {
                      case visuals.outline.none:
                      case visuals.outline.leftRight:
                        return 0;

                      case visuals.outline.bottomOnly:
                      case visuals.outline.topOnly:
                        return outlineWeight;

                      case visuals.outline.topBottom:
                      case visuals.outline.frame:
                        return 2 * outlineWeight;

                      default:
                        return 0;
                    }
                }, DOMHelper.prototype.calculateSlicerTextHighlightColor = function(color) {
                    var rgbColor = Color.parseColorString(color);
                    return 255 === rgbColor.R && 255 === rgbColor.G && 255 === rgbColor.B ? "#C8C8C8" : Color.calculateHighlightColor(rgbColor, .8, .2);
                }, DOMHelper.prototype.getTextProperties = function(textSize, textFontFamily, textProperties) {
                    return textProperties.fontSize = PixelConverter.fromPoint(textSize), textProperties.fontFamily = textFontFamily, 
                    textProperties;
                }, DOMHelper;
            }();
            SlicerUtil.DOMHelper = DOMHelper;
        }(SlicerUtil = visuals.SlicerUtil || (visuals.SlicerUtil = {})), function(SlicerUtil) {
            var ObjectEnumerator;
            !function(ObjectEnumerator) {
                function enumerateObjectInstances(options, data, settings, dataView) {
                    if (data) switch (options.objectName) {
                      case "items":
                        return enumerateItems(data, settings);

                      case "selection":
                        if (shouldShowSelectionOption(dataView)) return enumerateSelection(data, settings);
                    }
                }
                function shouldShowSelectionOption(dataView) {
                    return !(dataView && dataView.metadata && dataView.metadata.columns && _.some(dataView.metadata.columns, function(column) {
                        return column.discourageAggregationAcrossGroups;
                    }));
                }
                function enumerateSelection(data, settings) {
                    var slicerSettings = settings, areSelectionSettingsDefined = SlicerUtil.SettingsHelper.areSettingsDefined(data) && data.slicerSettings.selection, selectAllCheckboxEnabled = areSelectionSettingsDefined && data.slicerSettings.selection.selectAllCheckboxEnabled ? data.slicerSettings.selection.selectAllCheckboxEnabled : slicerSettings.selection.selectAllCheckboxEnabled, singleSelect = data && data.slicerSettings && data.slicerSettings.selection && void 0 !== data.slicerSettings.selection.singleSelect ? data.slicerSettings.selection.singleSelect : slicerSettings.selection.singleSelect;
                    return [ {
                        selector: null,
                        objectName: "selection",
                        properties: {
                            selectAllCheckboxEnabled: selectAllCheckboxEnabled,
                            singleSelect: singleSelect
                        }
                    } ];
                }
                function enumerateItems(data, settings) {
                    var slicerSettings = settings, areTextSettingsDefined = SlicerUtil.SettingsHelper.areSettingsDefined(data) && data.slicerSettings.slicerText, fontColor = areTextSettingsDefined && data.slicerSettings.slicerText.color ? data.slicerSettings.slicerText.color : slicerSettings.slicerText.color, background = areTextSettingsDefined && data.slicerSettings.slicerText.background ? data.slicerSettings.slicerText.background : slicerSettings.slicerText.background;
                    return [ {
                        selector: null,
                        objectName: "items",
                        properties: {
                            fontColor: fontColor,
                            background: background,
                            outline: slicerSettings.slicerText.outline,
                            textSize: slicerSettings.slicerText.textSize,
                            fontFamily: slicerSettings.slicerText.fontFamily
                        }
                    } ];
                }
                ObjectEnumerator.enumerateObjectInstances = enumerateObjectInstances;
            }(ObjectEnumerator = SlicerUtil.ObjectEnumerator || (SlicerUtil.ObjectEnumerator = {}));
        }(SlicerUtil = visuals.SlicerUtil || (visuals.SlicerUtil = {}));
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var DataViewObjects = powerbi.DataViewObjects, Prototype = powerbi.Prototype, slicerMode = powerbi.visuals.slicerMode, SlicerProps = powerbi.visuals.slicerProps, SlicerResponsiveBreakpoints = powerbi.visuals.SlicerResponsiveBreakpoints, SlicerViewModelAdapter = function() {
            function SlicerViewModelAdapter(options) {
                this.responsiveSlicer = options.responsiveSlicer;
            }
            return SlicerViewModelAdapter.prototype.applySlicerChanges = function(viewport, slicerData, dataView) {
                return this.shouldApplyResponsiveChanges(dataView) && (slicerData = this.applyResponsiveSlicerChanges(viewport, slicerData)), 
                slicerData;
            }, SlicerViewModelAdapter.prototype.applySlicerHeaderChanges = function(viewport, slicerHeaderData, dataView, slicerData) {
                return this.shouldApplyResponsiveChanges(dataView) && (slicerHeaderData = this.applyResponsiveSlicerHeaderChanges(viewport, slicerHeaderData, slicerData)), 
                slicerHeaderData;
            }, SlicerViewModelAdapter.prototype.enumerateObjectInstances = function(options, objects, dataView, activeMode, slicerOrientation) {
                this.responsiveSlicer && this.isResponsiveSlicer(activeMode, slicerOrientation) && "general" === options.objectName && this.enumerateGeneral(dataView, objects);
            }, SlicerViewModelAdapter.prototype.shouldApplyResponsiveChanges = function(dataView) {
                if (this.responsiveSlicer) {
                    var ResponsiveSlicerProperties = this.getResponsiveVisualProperties(dataView), isResponsiveVisual = ResponsiveSlicerProperties.responsive;
                    if (isResponsiveVisual) return !0;
                }
                return !1;
            }, SlicerViewModelAdapter.prototype.enumerateGeneral = function(dataView, objects) {
                var ResponsiveSlicerProperties = this.getResponsiveVisualProperties(dataView), instance = {
                    selector: null,
                    properties: {
                        responsive: ResponsiveSlicerProperties.responsive
                    },
                    objectName: "general"
                };
                _.merge(objects[0], instance);
            }, SlicerViewModelAdapter.prototype.isResponsiveSlicer = function(activeMode, slicerOrientation) {
                return slicerMode.isRangeSlicerMode(activeMode) || 1 === slicerOrientation;
            }, SlicerViewModelAdapter.prototype.getResponsiveVisualProperties = function(dataView) {
                var settings = {
                    responsive: !1
                };
                if (!dataView || !dataView.metadata) return settings;
                var objects = dataView.metadata.objects;
                return objects && (settings = {
                    responsive: DataViewObjects.getValue(objects, SlicerProps.general.responsive, settings.responsive)
                }), settings;
            }, SlicerViewModelAdapter.prototype.applyResponsiveSlicerChanges = function(viewport, originalSlicerData) {
                var slicerData = this.cloneData(originalSlicerData);
                return this.applyIconResponsiveChanges(viewport, slicerData), this.applyResponsiveSlicerLayoutChanges(slicerData), 
                this.applyResponsiveSlicerTouchOptimizedChanges(slicerData), slicerData;
            }, SlicerViewModelAdapter.prototype.applyResponsiveSlicerHeaderChanges = function(viewport, originalSlicerHeaderData, slicerData) {
                var slicerHeaderData = this.cloneData(originalSlicerHeaderData);
                return this.applyHeaderChanges(viewport, slicerData.orientation, slicerHeaderData), 
                slicerHeaderData;
            }, SlicerViewModelAdapter.prototype.applyIconResponsiveChanges = function(viewport, slicerData) {
                var breakPoints = SlicerResponsiveBreakpoints.rangeSlicer;
                1 === slicerData.orientation && (breakPoints = SlicerResponsiveBreakpoints.horizontalSlicer), 
                (viewport.height <= breakPoints.iconHeight || viewport.width <= breakPoints.iconWidth) && (slicerData.showIcon = !0);
            }, SlicerViewModelAdapter.prototype.applyResponsiveSlicerLayoutChanges = function(slicerData) {
                1 === slicerData.orientation && (slicerData.showTabularSlicer = !0), slicerMode.isRangeSlicerMode(slicerData.mode) && (slicerData.shouldHideNarrowSlider = !1, 
                slicerData.wrapRangeBoxes = !0);
            }, SlicerViewModelAdapter.prototype.applyResponsiveSlicerTouchOptimizedChanges = function(slicerData) {
                slicerMode.isRangeSlicerMode(slicerData.mode) && (slicerData.drawRoundSliderHandles = !0);
            }, SlicerViewModelAdapter.prototype.applyHeaderChanges = function(viewport, orientation, slicerHeaderData) {
                var slicerRendererBreakpoints = SlicerResponsiveBreakpoints.rangeSlicer;
                1 === orientation && (slicerRendererBreakpoints = SlicerResponsiveBreakpoints.horizontalSlicer), 
                viewport.height < slicerRendererBreakpoints.hideHeaderHeight && (slicerHeaderData.show = !1);
                for (var fontSizeBreakpoints = SlicerResponsiveBreakpoints.slicerHeader.fontSize, _i = 0, fontSizeBreakpoints_1 = fontSizeBreakpoints; _i < fontSizeBreakpoints_1.length; _i++) {
                    var fontSizeBreakpoint = fontSizeBreakpoints_1[_i], hitWidthBreakpoint = viewport.width < fontSizeBreakpoint.breakpoint && fontSizeBreakpoint.applyWidth, hitHeightBreakpoint = viewport.height < fontSizeBreakpoint.breakpoint && fontSizeBreakpoint.applyHeight;
                    if (hitWidthBreakpoint || hitHeightBreakpoint) {
                        slicerHeaderData.textSize = Math.min(slicerHeaderData.textSize, fontSizeBreakpoint.maxFontSizePt);
                        break;
                    }
                }
            }, SlicerViewModelAdapter.prototype.cloneData = function(originalData) {
                var data = _.cloneDeep(originalData);
                return Prototype.copyPrototypeDeep(originalData, data), data;
            }, SlicerViewModelAdapter;
        }();
        visuals.SlicerViewModelAdapter = SlicerViewModelAdapter;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var clampValue = jsCommon.Utility.clampValue, TabularSlicerLayout = function() {
            function TabularSlicerLayout() {}
            return TabularSlicerLayout.prototype.renderCore = function(container) {
                container.classed(Selectors.Tabular.class, !0);
            }, TabularSlicerLayout.prototype.bindData = function(materializedDataPoints, data, itemsContainer) {
                var items = this.renderColumns(materializedDataPoints, itemsContainer).selectAll(visuals.HorizontalSlicer.Selectors.IndividualItemContainer.selector).data(function(chunk) {
                    return chunk;
                }, function(d) {
                    return visuals.HorizontalSlicerRenderer.getDataPointIndex(d, data);
                });
                return items;
            }, TabularSlicerLayout.prototype.renderColumns = function(materializedDataPoints, itemsContainer) {
                var itemsPerColumn = this.numberOfRows, groupedDataPoints = _.chunk(materializedDataPoints, itemsPerColumn), columns = itemsContainer.selectAll(Selectors.ColumnItemContainer.selector).style("height", null).data(groupedDataPoints);
                return columns.exit().remove(), columns.enter().append("div").classed(Selectors.ColumnItemContainer.class, !0), 
                this.scaleLastColumnIfNeeded(itemsPerColumn, groupedDataPoints, itemsContainer), 
                columns;
            }, TabularSlicerLayout.prototype.scaleLastColumnIfNeeded = function(itemsPerColumn, groupedDataPoints, itemsContainer) {
                var precision = .01, numOfItemsInLastColumn = _.last(groupedDataPoints).length;
                if (numOfItemsInLastColumn < itemsPerColumn) {
                    var lastColumn = itemsContainer.select(Selectors.ColumnItemContainer.selector + ":last-child"), sizePecent = powerbi.Double.roundToPrecision(100 * numOfItemsInLastColumn / itemsPerColumn, precision);
                    lastColumn.style("height", sizePecent + "%");
                }
            }, TabularSlicerLayout.prototype.getScrollSize = function(itemsToDisplay) {
                return this.numberOfRows;
            }, TabularSlicerLayout.prototype.getLastStartIndex = function(itemsToDisplay, dataPointsLength) {
                if (dataPointsLength <= itemsToDisplay) return 0;
                var emptyLeftovers = 0, itemsChunk = this.numberOfRows, moduloResult = dataPointsLength % itemsChunk;
                moduloResult > 0 && (emptyLeftovers = itemsChunk - moduloResult);
                var lastStartIndex = dataPointsLength - itemsToDisplay + emptyLeftovers;
                return Math.max(lastStartIndex, 0);
            }, TabularSlicerLayout.prototype.calculateTotalItemDimensions = function(totalItemWidth, totalItemHeight) {
                return totalItemWidth = Math.max(totalItemWidth, TabularSlicerLayout.MinItemWidth), 
                totalItemHeight = Math.max(totalItemHeight, TabularSlicerLayout.MinItemHeight), 
                totalItemHeight += 2 * TabularSlicerLayout.TabularMargin, totalItemWidth += 2 * TabularSlicerLayout.TabularMargin, 
                {
                    width: totalItemWidth,
                    height: totalItemHeight
                };
            }, TabularSlicerLayout.prototype.calculateNumberOfItemsToDisplay = function(element, totalItemsWidth, totalItemsHeight, dataPointsLength) {
                var body = element.find(visuals.SlicerUtil.Selectors.Body.selector), availableWidth = body.width() - 2 * TabularSlicerLayout.NavigationArrowWidth, availableHeight = body.height(), availableViewport = {
                    height: availableHeight,
                    width: availableWidth
                }, totalItemsArea = {
                    height: totalItemsHeight,
                    width: totalItemsWidth
                };
                return this.calculateTableDimensions(availableViewport, totalItemsArea, dataPointsLength);
            }, TabularSlicerLayout.prototype.calculateTableDimensions = function(availableViewport, totalItemsArea, dataPointsLength) {
                var totalItemsWidth = totalItemsArea.width, totalItemsHeight = totalItemsArea.height, availableWidth = availableViewport.width, availableHeight = availableViewport.height;
                if (0 === totalItemsWidth) return 0;
                var numberOfColumns = Math.floor(availableWidth / totalItemsWidth);
                this.numberOfRows = 0 === totalItemsHeight ? 1 : Math.floor(availableHeight / totalItemsHeight), 
                this.numberOfRows = clampValue(this.numberOfRows, 1, dataPointsLength);
                var root = Math.ceil(Math.sqrt(dataPointsLength));
                numberOfColumns >= root && this.numberOfRows >= root ? this.numberOfRows = numberOfColumns = root : this.numberOfRows >= dataPointsLength && numberOfColumns > 1 && (this.numberOfRows = Math.ceil(this.numberOfRows / numberOfColumns));
                var numberOfItems = this.numberOfRows * numberOfColumns;
                return clampValue(numberOfItems, this.numberOfRows, dataPointsLength);
            }, TabularSlicerLayout.prototype.getNavigationArrowsClass = function(isLeft) {
                return isLeft ? (_a = {}, _a[Selectors.TabularNavigationArrow.class] = !0, _a[visuals.HorizontalSlicer.Selectors.LeftNavigationArrow.class] = !0, 
                _a[Selectors.PbiVisualsGlyph.class] = !0, _a[Selectors.TabularLeftNavigationArrow.class] = !0, 
                _a) : (_b = {}, _b[Selectors.TabularNavigationArrow.class] = !0, _b[visuals.HorizontalSlicer.Selectors.RightNavigationArrow.class] = !0, 
                _b[Selectors.PbiVisualsGlyph.class] = !0, _b[Selectors.TabularRightNavigationArrow.class] = !0, 
                _b);
                var _a, _b;
            }, TabularSlicerLayout.MinItemWidth = 40, TabularSlicerLayout.MinItemHeight = 40, 
            TabularSlicerLayout.TabularMargin = 2, TabularSlicerLayout.NavigationArrowWidth = 19, 
            TabularSlicerLayout;
        }();
        visuals.TabularSlicerLayout = TabularSlicerLayout;
        var Selectors;
        !function(Selectors) {
            var createClassAndSelector = jsCommon.CssConstants.createClassAndSelector;
            Selectors.Tabular = createClassAndSelector("tabular"), Selectors.ColumnItemContainer = createClassAndSelector("columnItemContainer"), 
            Selectors.PbiVisualsGlyph = createClassAndSelector("powervisuals-glyph"), Selectors.TabularNavigationArrow = createClassAndSelector("tabularNavigationArrow"), 
            Selectors.TabularLeftNavigationArrow = createClassAndSelector("left-nav-arrow"), 
            Selectors.TabularRightNavigationArrow = createClassAndSelector("right-nav-arrow");
        }(Selectors || (Selectors = {}));
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var PixelConverter = jsCommon.PixelConverter, VerticalSlicerRenderer = function() {
            function VerticalSlicerRenderer(verticalSlicerStrategy, options) {
                this.textProperties = {
                    fontFamily: visuals.Font.Family.regular.css,
                    fontSize: "14px"
                }, this.hasSearchableData = !1, this.scrollPositionStack = [], this.rowHeight = 0, 
                this.defaultMinWidth = 50, this.verticalSlicerStrategy = verticalSlicerStrategy, 
                options && (this.behavior = options.behavior), this.domHelper = new visuals.SlicerUtil.DOMHelper(), 
                this.hostServices = options.hostServices;
            }
            return VerticalSlicerRenderer.prototype.getDefaultValue = function() {
                if (this.data && this.data.defaultValue) return this.data.defaultValue.value;
            }, VerticalSlicerRenderer.prototype.getIdentityFields = function() {
                return visuals.SlicerUtil.DefaultValueHandler.getIdentityFields(this.dataView);
            }, VerticalSlicerRenderer.prototype.getUpdatedSelfFilter = function(searchKey) {
                var metadata = this.dataView && this.dataView.metadata;
                if (this.data.searchKey !== searchKey) return visuals.SlicerUtil.getUpdatedSelfFilter(searchKey, metadata);
            }, VerticalSlicerRenderer.prototype.supportsOrientation = function() {
                return !0;
            }, VerticalSlicerRenderer.prototype.enumerateObjectInstances = function(options) {
                return visuals.SlicerUtil.ObjectEnumerator.enumerateObjectInstances(options, this.data, this.settings, this.dataView);
            }, VerticalSlicerRenderer.prototype.onModeChange = function(mode) {
                visuals.SlicerUtil.clearSlicerFilter(this.hostServices, mode);
            }, VerticalSlicerRenderer.prototype.onClear = function() {
                this.interactivityService.handleClearSelection(), this.interactivityService.persistSelectionFilter(visuals.slicerProps.filterPropertyIdentifier);
            }, VerticalSlicerRenderer.prototype.init = function(slicerInitOptions, element) {
                var _this = this;
                this.element = element, this.currentViewport = slicerInitOptions.visualInitOptions.viewport;
                var interactivityService, hostServices = this.hostServices = slicerInitOptions.visualInitOptions.host, settings = this.settings = visuals.DataConversion.DefaultSlicerProperties(), domHelper = this.domHelper;
                this.behavior && (interactivityService = visuals.createInteractivityService(hostServices));
                var containerDiv = document.createElement("div");
                containerDiv.className = Selectors.Container.class;
                var container = this.container = d3.select(containerDiv);
                this.searchContainer = domHelper.addSearch(hostServices, container), this.verticalSlicerStrategy.hasClearSearchButton() && (this.clearSearchTextButton = domHelper.addClearSearchButton(hostServices, this.searchContainer)), 
                this.body = container.append("div").classed(visuals.SlicerUtil.Selectors.Body.class, !0);
                var rowEnter = function(rowSelection) {
                    _this.onEnterSelection(rowSelection);
                }, rowUpdate = function(rowSelection) {
                    _this.onUpdateSelection(rowSelection, interactivityService);
                }, rowExit = function(rowSelection) {
                    rowSelection.remove();
                }, listViewOptions = {
                    rowHeight: domHelper.getRowHeight(settings, this.textProperties),
                    enter: rowEnter,
                    exit: rowExit,
                    update: rowUpdate,
                    loadMoreData: function() {
                        return slicerInitOptions.loadMoreData();
                    },
                    scrollEnabled: !0,
                    viewport: this.currentViewport,
                    baseContainer: this.body,
                    isReadMode: function() {
                        return 1 !== _this.hostServices.getViewMode();
                    },
                    scrollToFrame: slicerInitOptions.enableMultiElementRows ? function(listView, loadMoreData, rowHeight, scrollTop, totalElements, visibleGroupContainer, baseContainer) {
                        return _this.scrollToFrameForMutliElementRow(listView, loadMoreData, rowHeight, scrollTop, totalElements, visibleGroupContainer, baseContainer);
                    } : void 0
                };
                return this.listView = visuals.ListViewFactory.createListView(listViewOptions), 
                this.element.get(0).appendChild(containerDiv), this.interactivityService = interactivityService, 
                interactivityService;
            }, VerticalSlicerRenderer.prototype.render = function(options) {
                this.renderVerticalSlicer(this.converter(options.dataView), options);
            }, VerticalSlicerRenderer.prototype.renderVerticalSlicer = function(data, options) {
                var _this = this;
                this.currentViewport = options.viewport;
                var dataView = options.dataView;
                if (!dataView || !this.data || _.isEmpty(this.data.slicerDataPoints)) return void (this.listView && this.listView.empty());
                this.hasSearchableData = options.hasSearchableData;
                var settings = this.data.slicerSettings, domHelper = this.domHelper;
                this.updateSelectionStyle(), this.listView.viewport(this.currentViewport).rowHeight(domHelper.getRowHeight(settings, this.textProperties)).data(this.data.slicerDataPoints, function(d) {
                    return _this.data && $.inArray(d, _this.data.slicerDataPoints);
                }, options.resetScrollbarPosition);
            }, VerticalSlicerRenderer.prototype.converter = function(dataView) {
                var localizedSelectAllText = this.hostServices.getLocalizedString(visuals.SlicerUtil.DisplayNameKeys.SelectAll), data = visuals.DataConversion.convert(dataView, localizedSelectAllText, this.interactivityService, this.hostServices);
                return this.data = data, dataView && this.data && (this.settings = data.slicerSettings, 
                this.dataView = dataView), data;
            }, VerticalSlicerRenderer.prototype.hasSearchEnabled = function() {
                return this.verticalSlicerStrategy.shouldShowSearchHeader(this.settings, this.hasSearchableData);
            }, VerticalSlicerRenderer.prototype.updateSelectionStyle = function() {
                var settings = this.settings;
                this.container.classed("isMultiSelectEnabled", settings && settings.selection && !settings.selection.singleSelect);
            }, VerticalSlicerRenderer.prototype.onEnterSelection = function(rowSelection) {
                var settings = this.settings, listItemElement = rowSelection.append("ul").append("li").classed(Selectors.ItemContainer.class, !0), inputElement = listItemElement.append("div").classed(Selectors.Input.class, !0);
                inputElement.append("input").attr("type", "checkbox"), this.verticalSlicerStrategy.customizeInputElement(inputElement), 
                listItemElement.each(function(d, i) {
                    var item = d3.select(this);
                    d.isImage ? item.append("img").classed(visuals.SlicerUtil.Selectors.LabelImage.class, !0) : item.append("span").classed(visuals.SlicerUtil.Selectors.LabelText.class, !0), 
                    null != d.count && item.append("span").classed(visuals.SlicerUtil.Selectors.CountText.class, !0).style({
                        "font-size": PixelConverter.fromPoint(settings.slicerText.textSize),
                        "font-family": settings.slicerText.fontFamily
                    });
                });
            }, VerticalSlicerRenderer.prototype.onUpdateSelection = function(rowSelection, interactivityService) {
                var settings = this.settings, data = this.data;
                if (data && settings) {
                    var domHelper = this.domHelper, shouldShowSearchHeader = this.verticalSlicerStrategy.shouldShowSearchHeader(settings, this.hasSearchableData);
                    this.searchContainer.classed(visuals.SlicerUtil.Selectors.SearchHeaderShow.class, shouldShowSearchHeader), 
                    this.searchContainer.classed(visuals.SlicerUtil.Selectors.SearchHeaderCollapsed.class, !shouldShowSearchHeader);
                    var labelText_1 = rowSelection.selectAll(visuals.SlicerUtil.Selectors.LabelText.selector);
                    labelText_1.text(function(d) {
                        return d.value;
                    }).attr("title", function(d) {
                        return d.tooltip;
                    }), this.verticalSlicerStrategy.setLabelTextStyle(domHelper, labelText_1, settings);
                    var labelImage = rowSelection.selectAll(visuals.SlicerUtil.Selectors.LabelImage.selector);
                    labelImage.empty() || labelImage.attr("src", function(d) {
                        return d.value;
                    });
                    var countText = rowSelection.selectAll(visuals.SlicerUtil.Selectors.CountText.selector);
                    if (!countText.empty() && this.verticalSlicerStrategy.shouldShowCount() && (countText.text(function(d) {
                        return d.count;
                    }), domHelper.setSlicerTextStyle(countText, settings)), interactivityService && this.body) {
                        var body = this.body.attr("width", this.currentViewport.width), slicerItemContainers = body.selectAll(Selectors.ItemContainer.selector), slicerItemLabels = body.selectAll(visuals.SlicerUtil.Selectors.LabelText.selector), slicerItemInputs = body.selectAll(Selectors.Input.selector), searchInput = this.searchContainer.select(visuals.SlicerUtil.Selectors.SearchInput.selector);
                        if (!searchInput.empty()) {
                            var element = searchInput.node(), existingSearchKey = element && element.value;
                            this.verticalSlicerStrategy.hasClearSearchButton() && this.domHelper.configureSearchBoxIcon(this.searchContainer, existingSearchKey), 
                            (_.isEmpty(existingSearchKey) || _.isEmpty(data.searchKey)) && searchInput.property("value", data.searchKey);
                        }
                        var behaviorOptions = {
                            dataPoints: data.slicerDataPoints,
                            slicerContainer: this.container,
                            itemContainers: slicerItemContainers,
                            itemLabels: slicerItemLabels,
                            itemInputs: slicerItemInputs,
                            interactivityService: interactivityService,
                            settings: data.slicerSettings,
                            searchInput: searchInput,
                            clearSearchTextButton: this.clearSearchTextButton,
                            slicerValueHandler: this
                        }, orientationBehaviorOptions = {
                            behaviorOptions: behaviorOptions,
                            orientation: 0
                        };
                        interactivityService.bind(data.slicerDataPoints, this.behavior, orientationBehaviorOptions, {
                            overrideSelectionFromData: !0,
                            hasSelectionOverride: data.hasSelectionOverride,
                            slicerValueHandler: this
                        }), visuals.SlicerWebBehavior.styleSlicerItems(rowSelection.select(Selectors.Input.selector), data.hasSelectionOverride, interactivityService.isSelectionModeInverted());
                    } else visuals.SlicerWebBehavior.styleSlicerItems(rowSelection.select(Selectors.Input.selector), !1, !1);
                }
            }, VerticalSlicerRenderer.prototype.scrollToFrameForMutliElementRow = function(listView, loadMoreData, rowHeight, scrollTop, totalElements, visibleGroupContainer, baseContainer) {
                this.rowHeight = Math.max(rowHeight, this.rowHeight);
                var rowScrollPosition = 0 === scrollTop ? 0 : Math.floor(scrollTop / this.rowHeight);
                if (!(this.currentRowPosition && rowScrollPosition === this.currentRowPosition || rowScrollPosition < 0)) {
                    var transformAttr = visuals.SVGUtil.translateWithPixels(0, rowScrollPosition * this.rowHeight);
                    visibleGroupContainer.style({
                        transform: function(d) {
                            return transformAttr;
                        },
                        "-webkit-transform": transformAttr
                    });
                    var elements = visibleGroupContainer.selectAll(".row").filter(function() {
                        return "" !== this.textContent;
                    });
                    void 0 === this.currentRowPosition ? (this.currentPosition = this.getInitialPosition(totalElements, baseContainer), 
                    elements && elements.node() && (this.currentRowPosition = rowScrollPosition)) : (this.updateCurrentPosition(rowScrollPosition, totalElements, baseContainer, visibleGroupContainer, elements), 
                    this.currentRowPosition = rowScrollPosition), listView.performScrollToFrame(this.currentPosition.position0, this.currentPosition.position1, totalElements, this.currentPosition.position1 - this.currentPosition.position0, loadMoreData);
                }
            }, VerticalSlicerRenderer.prototype.getInitialPosition = function(totalElements, baseContainer) {
                return {
                    position0: 0,
                    position1: Math.min(totalElements, Math.floor($(baseContainer.node()).outerHeight() / this.rowHeight) * Math.floor($(baseContainer.node()).outerWidth() / this.defaultMinWidth))
                };
            }, VerticalSlicerRenderer.prototype.updateCurrentPosition = function(rowScrollPosition, totalElements, baseContainer, visibleGroupContainer, elements) {
                var rowDif = Math.abs(rowScrollPosition - this.currentRowPosition);
                if (rowScrollPosition === this.currentRowPosition) this.currentPosition = this.scrollPositionStack.pop() || this.getInitialPosition(totalElements, baseContainer); else if (rowScrollPosition < this.currentRowPosition) for (;rowDif > 0; ) this.currentPosition = this.scrollPositionStack.pop() || this.currentPosition, 
                rowDif--; else for (;rowDif > 0; ) {
                    var visibleRows = Math.ceil($(baseContainer.node).outerHeight() / $(elements.node()).outerHeight());
                    if (this.currentPosition.position0 >= totalElements - 1) return;
                    this.scrollPositionStack.push(this.currentPosition);
                    var elementsInRowArray = this.getElementsPerRow(visibleGroupContainer, visibleRows, elements), newPosition0 = this.currentPosition.position0 + elementsInRowArray[0];
                    this.currentPosition = {
                        position0: newPosition0,
                        position1: Math.min(totalElements, newPosition0 + _.sum(elementsInRowArray) + this.getMaxElementsInRow(visibleGroupContainer, elements))
                    }, rowDif--;
                }
            }, VerticalSlicerRenderer.prototype.getElementsPerRow = function(visibleGroupContainer, rowCount, elements) {
                for (var elementsPerRow = [], node = elements.node(), i = 0; i < rowCount && null !== node; i++) {
                    elementsPerRow.push(0);
                    for (var top_1 = $(node).position().top; null !== node && $(node).position().top <= top_1 + 5; ) elementsPerRow[i]++, 
                    node = node.nextElementSibling;
                }
                return elementsPerRow;
            }, VerticalSlicerRenderer.prototype.getMaxElementsInRow = function(visibleGroupContainer, elements) {
                var minWidthAttribute = elements.node().getAttribute("min-width");
                return minWidthAttribute ? $(visibleGroupContainer.node()).outerWidth() / +minWidthAttribute : Math.floor($(visibleGroupContainer.node()).outerWidth() / this.defaultMinWidth);
            }, VerticalSlicerRenderer;
        }();
        visuals.VerticalSlicerRenderer = VerticalSlicerRenderer, function(VerticalSlicerRenderer) {
            var CheckBoxSlicerStrategy = function() {
                function CheckBoxSlicerStrategy() {}
                return CheckBoxSlicerStrategy.prototype.hasClearSearchButton = function() {
                    return !1;
                }, CheckBoxSlicerStrategy.prototype.setLabelTextStyle = function(domHelper, slicerText, settings) {
                    domHelper.setSlicerTextStyle(slicerText, settings);
                }, CheckBoxSlicerStrategy.prototype.shouldShowSearchHeader = function(settings, hasSearchableData) {
                    return settings.search.enabled;
                }, CheckBoxSlicerStrategy.prototype.shouldShowCount = function() {
                    return !0;
                }, CheckBoxSlicerStrategy.prototype.customizeInputElement = function(inputElement) {
                    inputElement.append("span").classed("checkbox", !0);
                }, CheckBoxSlicerStrategy;
            }();
            VerticalSlicerRenderer.CheckBoxSlicerStrategy = CheckBoxSlicerStrategy;
            var listElementFontSizePX = 13, listElementColor = "#333333", listElementFontFamily = visuals.Font.Family.regular.css, CheckListSlicerStrategy = function() {
                function CheckListSlicerStrategy() {}
                return CheckListSlicerStrategy.prototype.hasClearSearchButton = function() {
                    return !0;
                }, CheckListSlicerStrategy.prototype.setLabelTextStyle = function(domHelper, slicerText, settings) {
                    var overridingSettings = visuals.DataConversion.DefaultSlicerProperties();
                    overridingSettings.slicerText.textSize = PixelConverter.toPoint(listElementFontSizePX), 
                    overridingSettings.slicerText.fontFamily = listElementFontFamily, overridingSettings.slicerText.color = listElementColor, 
                    domHelper.setSlicerTextStyle(slicerText, overridingSettings);
                }, CheckListSlicerStrategy.prototype.shouldShowSearchHeader = function(settings, hasSearchableData) {
                    return settings.search.enabled || hasSearchableData;
                }, CheckListSlicerStrategy.prototype.shouldShowCount = function() {
                    return !1;
                }, CheckListSlicerStrategy.prototype.customizeInputElement = function(inputElement) {
                    inputElement.append("span").classed("powervisuals-glyph checkmark", !0);
                }, CheckListSlicerStrategy;
            }();
            VerticalSlicerRenderer.CheckListSlicerStrategy = CheckListSlicerStrategy;
        }(VerticalSlicerRenderer = visuals.VerticalSlicerRenderer || (visuals.VerticalSlicerRenderer = {}));
        var Selectors;
        !function(Selectors) {
            var createClassAndSelector = jsCommon.CssConstants.createClassAndSelector;
            Selectors.Container = createClassAndSelector("slicerContainer"), Selectors.ItemContainer = createClassAndSelector("slicerItemContainer"), 
            Selectors.Input = createClassAndSelector("slicerCheckbox"), Selectors.Checkbox = createClassAndSelector("checkbox");
        }(Selectors || (Selectors = {}));
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var VerticalSlicerWebBehavior = function() {
            function VerticalSlicerWebBehavior() {}
            return VerticalSlicerWebBehavior.prototype.bindEvents = function(options, selectionHandler) {
                var slicers = options.itemContainers;
                this.itemLabels = options.itemLabels, this.itemInputs = options.itemInputs, this.dataPoints = options.dataPoints, 
                this.interactivityService = options.interactivityService, this.settings = options.settings, 
                visuals.SlicerWebBehavior.bindSlicerEvents(options, slicers, selectionHandler, this.settings, this.interactivityService);
            }, VerticalSlicerWebBehavior.prototype.renderSelection = function(hasSelection) {
                visuals.SlicerWebBehavior.setSelectionOnSlicerItems(this.itemInputs, this.itemLabels, hasSelection, this.interactivityService, this.settings);
            }, VerticalSlicerWebBehavior;
        }();
        visuals.VerticalSlicerWebBehavior = VerticalSlicerWebBehavior;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));