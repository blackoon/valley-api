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
        var controls;
        !function(controls) {
            var pivotTable;
            !function(pivotTable) {
                var PivotTableHierarchyNavigator;
                !function(PivotTableHierarchyNavigator) {
                    function getHeaderSpan(item, navigator) {
                        var childrenLevel = navigator.getHierarchyDepth(), children = navigator.getChildren(item);
                        if (!_.isEmpty(children)) for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                            var child = children_1[_i];
                            childrenLevel = Math.min(childrenLevel, navigator.getLevel(child));
                        }
                        return childrenLevel - navigator.getLevel(item);
                    }
                    function getFirstLeaf(item, navigator) {
                        return navigator.isLeaf(item) ? item : getFirstLeaf(_.first(navigator.getChildren(item)), navigator);
                    }
                    function getLastLeaf(item, navigator) {
                        return navigator.isLeaf(item) ? item : getLastLeaf(_.last(navigator.getChildren(item)), navigator);
                    }
                    function getFirstLeafIndex(item, navigator) {
                        return navigator.getLeafIndex(getFirstLeaf(item, navigator));
                    }
                    function getLastLeafIndex(item, navigator) {
                        return navigator.getLeafIndex(getLastLeaf(item, navigator));
                    }
                    PivotTableHierarchyNavigator.getHeaderSpan = getHeaderSpan, PivotTableHierarchyNavigator.getFirstLeaf = getFirstLeaf, 
                    PivotTableHierarchyNavigator.getLastLeaf = getLastLeaf, PivotTableHierarchyNavigator.getFirstLeafIndex = getFirstLeafIndex, 
                    PivotTableHierarchyNavigator.getLastLeafIndex = getLastLeafIndex;
                }(PivotTableHierarchyNavigator = pivotTable.PivotTableHierarchyNavigator || (pivotTable.PivotTableHierarchyNavigator = {}));
            }(pivotTable = controls.pivotTable || (controls.pivotTable = {}));
        }(controls = visuals.controls || (visuals.controls = {}));
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var controls;
        !function(controls) {
            var pivotTable;
            !function(pivotTable) {
                var HeaderResizer = function() {
                    function HeaderResizer(item, element, verticalResizeHandler, horizontalResizeHandler, clickHandler) {
                        var _this = this;
                        this.elementOriginalCursor = element.style.cursor, this.verticalResizeHandler = verticalResizeHandler, 
                        this.horizontalResizeHandler = horizontalResizeHandler, (verticalResizeHandler || horizontalResizeHandler) && (element.addEventListener("mousedown", function(e) {
                            return _this.onMouseDown(item, element, e);
                        }), element.addEventListener("mousemove", function(e) {
                            return _this.onMouseMove(element, e);
                        }), element.addEventListener("dblclick", function(e) {
                            return _this.onDoubleClick(item, element, e);
                        })), clickHandler && element.addEventListener("click", function(e) {
                            return _this.onClick(item, element, e, clickHandler);
                        });
                    }
                    return HeaderResizer.prototype.onMouseDown = function(item, element, e) {
                        var activeHandler = this.getActiveHandler(element, e);
                        return activeHandler ? (this.resizing = !0, this.startMousePosition = HeaderResizer.getMouseCoordinates(e), 
                        this.initializeDocumentEvents(element, activeHandler), document.documentElement && (this.documentOriginalCursor = document.documentElement.style.cursor, 
                        document.documentElement.style.cursor = this.getCursor(element, e)), void activeHandler.onStartResize(item)) : void (this.resizing = !1);
                    }, HeaderResizer.prototype.onMouseMove = function(element, e) {
                        this.startMousePosition || (element.style.cursor = this.getCursor(element, e));
                    }, HeaderResizer.prototype.onDoubleClick = function(item, element, e) {
                        var activeHandler = this.getActiveHandler(element, e);
                        activeHandler && activeHandler.onReset(item);
                    }, HeaderResizer.prototype.onClick = function(item, element, e, clickHandler) {
                        this.resizing || clickHandler && clickHandler(item, e);
                    }, HeaderResizer.prototype.getActiveHandler = function(element, e) {
                        return this.isMouseOnVerticalHandle(element, HeaderResizer.getMouseCoordinates(e)) ? this.verticalResizeHandler : this.isMouseOnHorizontalHandle(element, HeaderResizer.getMouseCoordinates(e)) ? this.horizontalResizeHandler : null;
                    }, HeaderResizer.prototype.getCursor = function(element, e) {
                        return this.isMouseOnVerticalHandle(element, HeaderResizer.getMouseCoordinates(e)) ? "col-resize" : this.isMouseOnHorizontalHandle(element, HeaderResizer.getMouseCoordinates(e)) ? "row-resize" : this.elementOriginalCursor;
                    }, HeaderResizer.prototype.initializeDocumentEvents = function(element, handler) {
                        var _this = this;
                        this.documentMouseMoveListener = function(e) {
                            e.preventDefault(), handler.onResize(HeaderResizer.getMouseCoordinatesDelta(element, _this.startMousePosition, HeaderResizer.getMouseCoordinates(e)));
                        }, document.addEventListener("mousemove", this.documentMouseMoveListener), this.documentMouseUpListener = function(e) {
                            e.preventDefault(), document.removeEventListener("mousemove", _this.documentMouseMoveListener), 
                            _this.documentMouseMoveListener = null, document.removeEventListener("mouseup", _this.documentMouseUpListener), 
                            _this.documentMouseUpListener = null, document.documentElement && (document.documentElement.style.cursor = _this.documentOriginalCursor, 
                            _this.documentOriginalCursor = void 0), _this.startMousePosition = null, handler.onEndResize();
                        }, document.addEventListener("mouseup", this.documentMouseUpListener);
                    }, HeaderResizer.prototype.isMouseOnVerticalHandle = function(element, position) {
                        return !!this.verticalResizeHandler && position.x >= element.getBoundingClientRect().right - HeaderResizer.HandleSize;
                    }, HeaderResizer.prototype.isMouseOnHorizontalHandle = function(element, position) {
                        return !!this.horizontalResizeHandler && position.y >= element.getBoundingClientRect().bottom - HeaderResizer.HandleSize;
                    }, HeaderResizer.getMouseCoordinates = function(e) {
                        return {
                            x: e.pageX,
                            y: e.pageY
                        };
                    }, HeaderResizer.getMouseCoordinatesDelta = function(element, previous, current) {
                        if (!current || !previous) return {
                            x: 0,
                            y: 0
                        };
                        var scale = controls.HTMLElementUtils.getAccumulatedScale(element);
                        return {
                            x: (current.x - previous.x) / scale,
                            y: (current.y - previous.y) / scale
                        };
                    }, HeaderResizer.HandleSize = 4, HeaderResizer;
                }();
                pivotTable.HeaderResizer = HeaderResizer;
                var ColumnWidthResizeHandler = function() {
                    function ColumnWidthResizeHandler(control) {
                        this.control = control;
                    }
                    return ColumnWidthResizeHandler.prototype.onStartResize = function(item) {
                        var leafToResize = pivotTable.PivotTableHierarchyNavigator.getLastLeaf(item, this.control.getColumnNavigator()), leafToResizeIndex = this.control.getColumnNavigator().getLeafIndex(leafToResize);
                        this.resizeState = {
                            leafToResize: leafToResize,
                            leafToResizeIndex: leafToResizeIndex,
                            originalWidth: this.control.getColumnWidthMeasureManager().getColumnWidth(leafToResizeIndex)
                        };
                    }, ColumnWidthResizeHandler.prototype.onResize = function(delta) {
                        if (delta.x && this.resizeState) {
                            var viewport = this.control.getViewport(), visibleRowRange = pivotTable.RowMeasurementUtil.getVisibleRange(viewport.top, viewport.height, this.control.getRowHeightMeasureManager()), visibleColumnRange = pivotTable.ColumnMeasurementUtil.getVisibleRange(viewport.left, viewport.width, this.control.getColumnWidthMeasureManager());
                            if (visibleRowRange && visibleColumnRange) {
                                this.control.getWorkScheduler().clear();
                                var newWidth = Math.max(this.resizeState.originalWidth + delta.x, HeaderResizer.HandleSize);
                                this.control.getColumnWidthMeasureManager().setColumnWidth(this.resizeState.leafToResizeIndex, newWidth), 
                                pivotTable.RowMeasurementUtil.remeasureRows(this.control.getBinder(), this.control.getRowNavigator(), this.control.getColumnNavigator(), visibleRowRange.firstLeafIndex, visibleRowRange.lastLeafIndex, visibleColumnRange.firstLeafIndex, this.control.getRowHeightMeasureManager()), 
                                this.control.getRowHeightMeasureManager().clearFloatingRows(), this.control.getColumnLevelHeightMeasureManager().clear(), 
                                this.resizeBodyPages(this.resizeState.leafToResizeIndex, visibleRowRange.firstLeafIndex, visibleRowRange.lastLeafIndex), 
                                this.control.render(pivotTable.PivotTableRenderingMode.Incremental);
                            }
                        }
                    }, ColumnWidthResizeHandler.prototype.onEndResize = function() {
                        var _this = this;
                        if (this.resizeState) {
                            var leafToResize = this.resizeState.leafToResize, newWidth = this.control.getColumnWidthMeasureManager().getColumnWidth(this.resizeState.leafToResizeIndex), originalWidth = this.resizeState.originalWidth;
                            this.resizeState = void 0;
                            var viewport = this.control.getViewport(), visibleRowRange = pivotTable.RowMeasurementUtil.getVisibleRange(viewport.top, viewport.height, this.control.getRowHeightMeasureManager());
                            if (visibleRowRange && newWidth !== originalWidth) {
                                this.control.getWorkScheduler().clear(), this.control.getSizeManager().setColumnWidth(leafToResize, newWidth);
                                var visibleRowStart = pivotTable.RowMeasurementUtil.getVisibleRowStart(visibleRowRange, viewport.top, this.control.getRowHeightMeasureManager());
                                this.control.getRowHeightMeasureManager().clear(), this.control.makeVisible(pivotTable.PivotTableRenderingMode.Incremental, visibleRowStart, null, function() {
                                    return _this.control.rebuildBodyPagesSync();
                                });
                            }
                        }
                    }, ColumnWidthResizeHandler.prototype.onReset = function(item) {
                        var _this = this, viewport = this.control.getViewport(), visibleRowRange = pivotTable.RowMeasurementUtil.getVisibleRange(viewport.top, viewport.height, this.control.getRowHeightMeasureManager());
                        if (visibleRowRange) {
                            var leafToResize = pivotTable.PivotTableHierarchyNavigator.getLastLeaf(item, this.control.getColumnNavigator()), leafToResizeIndex = this.control.getColumnNavigator().getLeafIndex(leafToResize);
                            this.control.getSizeManager().setColumnWidth(leafToResize, void 0), pivotTable.ColumnMeasurementUtil.remeasureColumn(leafToResizeIndex, this.control.getBinder(), this.control.getRowNavigator(), this.control.getColumnNavigator(), visibleRowRange.firstLeafIndex, this.control.getColumnWidthMeasureManager());
                            var visibleRowStart = pivotTable.RowMeasurementUtil.getVisibleRowStart(visibleRowRange, viewport.top, this.control.getRowHeightMeasureManager());
                            this.control.getRowHeightMeasureManager().clear(), this.control.getColumnLevelHeightMeasureManager().clear(), 
                            this.control.makeVisible(pivotTable.PivotTableRenderingMode.Incremental, visibleRowStart, null, function() {
                                return _this.control.rebuildBodyPagesSync();
                            });
                        }
                    }, ColumnWidthResizeHandler.prototype.resizeBodyPages = function(columnLeafIndex, startRowIndex, endRowIndex) {
                        this.control.getBodyCellRenderer().resizRows(startRowIndex, endRowIndex), this.control.getFloatingBodyCellRenderer().resizRows(0, this.control.getRowNavigator().getFloatingHierarchyLeafCount() - 1), 
                        this.control.getBodyCellRenderer().resizeColumn(columnLeafIndex), this.control.getFloatingBodyCellRenderer().resizeColumn(columnLeafIndex);
                    }, ColumnWidthResizeHandler;
                }();
                pivotTable.ColumnWidthResizeHandler = ColumnWidthResizeHandler;
                var RowHeightResizeHandler = function() {
                    function RowHeightResizeHandler(control) {
                        this.control = control;
                    }
                    return RowHeightResizeHandler.prototype.onStartResize = function(item) {}, RowHeightResizeHandler.prototype.onResize = function(delta) {}, 
                    RowHeightResizeHandler.prototype.onEndResize = function() {}, RowHeightResizeHandler.prototype.onReset = function(item) {}, 
                    RowHeightResizeHandler;
                }();
                pivotTable.RowHeightResizeHandler = RowHeightResizeHandler;
                var ColumnLevelHeightResizeHandler = function() {
                    function ColumnLevelHeightResizeHandler(control) {
                        this.control = control;
                    }
                    return ColumnLevelHeightResizeHandler.prototype.onStartResize = function(item) {}, 
                    ColumnLevelHeightResizeHandler.prototype.onResize = function(delta) {}, ColumnLevelHeightResizeHandler.prototype.onEndResize = function() {}, 
                    ColumnLevelHeightResizeHandler.prototype.onReset = function(item) {}, ColumnLevelHeightResizeHandler;
                }();
                pivotTable.ColumnLevelHeightResizeHandler = ColumnLevelHeightResizeHandler;
                var RowLevelWidthResizeHandler = function() {
                    function RowLevelWidthResizeHandler(control) {
                        this.control = control;
                    }
                    return RowLevelWidthResizeHandler.prototype.onStartResize = function(item) {
                        var levelToResize = this.getLevelToResize(item);
                        this.resizeState = {
                            cornerCellToResize: this.control.getRowNavigator().getCorner(levelToResize, this.control.getColumnNavigator().getHierarchyDepth() - 1),
                            levelToResize: levelToResize,
                            originalWidth: this.control.getRowLevelWidthMeasureManager().getLevelWidth(levelToResize)
                        };
                    }, RowLevelWidthResizeHandler.prototype.onResize = function(delta) {
                        if (delta.x && this.resizeState) {
                            var viewport = this.control.getViewport(), visibleRowRange = pivotTable.RowMeasurementUtil.getVisibleRange(viewport.top, viewport.height, this.control.getRowHeightMeasureManager()), visibleColumnRange = pivotTable.ColumnMeasurementUtil.getVisibleRange(viewport.left, viewport.width, this.control.getColumnWidthMeasureManager());
                            if (visibleRowRange) {
                                this.control.getWorkScheduler().clear();
                                var newWidth = Math.min(this.getMaxWidth(this.resizeState.levelToResize), Math.max(this.resizeState.originalWidth + delta.x, HeaderResizer.HandleSize));
                                this.control.getRowLevelWidthMeasureManager().setLevelWidth(this.resizeState.levelToResize, newWidth), 
                                pivotTable.RowMeasurementUtil.remeasureRows(this.control.getBinder(), this.control.getRowNavigator(), this.control.getColumnNavigator(), visibleRowRange.firstLeafIndex, visibleRowRange.lastLeafIndex, visibleColumnRange ? visibleColumnRange.firstLeafIndex : 0, this.control.getRowHeightMeasureManager()), 
                                this.control.getRowHeightMeasureManager().clearFloatingRows(), this.control.getColumnLevelHeightMeasureManager().clear(), 
                                this.resizeBodyPages(visibleRowRange.firstLeafIndex, visibleRowRange.lastLeafIndex), 
                                this.control.render(pivotTable.PivotTableRenderingMode.Incremental);
                            }
                        }
                    }, RowLevelWidthResizeHandler.prototype.onEndResize = function() {
                        var _this = this;
                        if (this.resizeState) {
                            var cornerCellToResize = this.resizeState.cornerCellToResize, newWidth = this.control.getRowLevelWidthMeasureManager().getLevelWidth(this.resizeState.levelToResize), originalWidth = this.resizeState.originalWidth;
                            this.resizeState = void 0;
                            var viewport = this.control.getViewport(), visibleRowRange = pivotTable.RowMeasurementUtil.getVisibleRange(viewport.top, viewport.height, this.control.getRowHeightMeasureManager());
                            if (visibleRowRange && newWidth !== originalWidth) {
                                this.control.getWorkScheduler().clear(), this.control.getSizeManager().setRowLevelWidth(cornerCellToResize, newWidth);
                                var visibleRowStart = pivotTable.RowMeasurementUtil.getVisibleRowStart(visibleRowRange, viewport.top, this.control.getRowHeightMeasureManager());
                                this.control.getRowHeightMeasureManager().clear(), this.control.makeVisible(pivotTable.PivotTableRenderingMode.Incremental, visibleRowStart, null, function() {
                                    return _this.control.rebuildBodyPagesSync();
                                });
                            }
                        }
                    }, RowLevelWidthResizeHandler.prototype.onReset = function(item) {
                        var _this = this, viewport = this.control.getViewport(), visibleRowRange = pivotTable.RowMeasurementUtil.getVisibleRange(viewport.top, viewport.height, this.control.getRowHeightMeasureManager());
                        if (visibleRowRange) {
                            var levelToResize = this.getLevelToResize(item), cornerCellToResize = this.control.getRowNavigator().getCorner(levelToResize, this.control.getColumnNavigator().getHierarchyDepth() - 1);
                            this.control.getSizeManager().setRowLevelWidth(cornerCellToResize, void 0), this.control.getRowLevelWidthMeasureManager().measure(this.control.getBinder(), this.control.getRowNavigator(), this.control.getColumnNavigator(), visibleRowRange.firstLeafIndex, pivotTable.MeasureRowSampleCount, levelToResize);
                            var visibleRowStart = pivotTable.RowMeasurementUtil.getVisibleRowStart(visibleRowRange, viewport.top, this.control.getRowHeightMeasureManager());
                            this.control.getRowHeightMeasureManager().clear(), this.control.getColumnLevelHeightMeasureManager().clear(), 
                            this.control.makeVisible(pivotTable.PivotTableRenderingMode.Incremental, visibleRowStart, null, function() {
                                return _this.control.rebuildBodyPagesSync();
                            });
                        }
                    }, RowLevelWidthResizeHandler.prototype.getLevelToResize = function(item) {
                        return this.control.getSteppedLayout() ? 0 : this.control.getRowNavigator().getRowLevel(item);
                    }, RowLevelWidthResizeHandler.prototype.getMaxWidth = function(levelToResize) {
                        for (var maxWidth = this.control.getClientWidth(), level = 0; level < levelToResize; level++) maxWidth -= this.control.getRowLevelWidthMeasureManager().getLevelWidth(level);
                        return maxWidth;
                    }, RowLevelWidthResizeHandler.prototype.resizeBodyPages = function(startRowIndex, endRowIndex) {
                        this.control.getBodyCellRenderer().resizRows(startRowIndex, endRowIndex), this.control.getFloatingBodyCellRenderer().resizRows(0, this.control.getRowNavigator().getFloatingHierarchyLeafCount() - 1);
                    }, RowLevelWidthResizeHandler;
                }();
                pivotTable.RowLevelWidthResizeHandler = RowLevelWidthResizeHandler;
            }(pivotTable = controls.pivotTable || (controls.pivotTable = {}));
        }(controls = visuals.controls || (visuals.controls = {}));
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var controls;
        !function(controls) {
            var pivotTable;
            !function(pivotTable) {
                var MeasureUtil;
                !function(MeasureUtil) {
                    function getAncestorsToMeasure(item, navigator) {
                        for (var ancestorsToMeasure = []; ;) {
                            var parent_1 = navigator.getParent(item);
                            if (!parent_1 || !navigator.isLastItem(item, navigator.getChildren(parent_1))) break;
                            ancestorsToMeasure.push({
                                node: parent_1,
                                size: -1
                            }), item = parent_1;
                        }
                        return ancestorsToMeasure;
                    }
                    function getSizeDifference(ancestors, lastLeafIndex, navigator, getSize) {
                        for (var size = 0, _i = 0, ancestors_1 = ancestors; _i < ancestors_1.length; _i++) {
                            var node = ancestors_1[_i];
                            size = Math.max(size, getItemSizeDifference(node, lastLeafIndex, navigator, getSize));
                        }
                        return size;
                    }
                    function getItemSizeDifference(ancestor, lastLeafIndex, navigator, getSize) {
                        for (var startLeafIndex = pivotTable.PivotTableHierarchyNavigator.getFirstLeafIndex(ancestor.node, navigator), leavesSize = 0, index = startLeafIndex; index <= lastLeafIndex; index++) if (leavesSize += getSize(index), 
                        leavesSize >= ancestor.size) return 0;
                        return ancestor.size - leavesSize;
                    }
                    function getPageIndex(index, pageItemCount) {
                        return Math.floor(index / pageItemCount);
                    }
                    function itemRangeToPageRange(startIndex, endIndex, pageItemCount) {
                        var startPageIndex = getPageIndex(startIndex, pageItemCount), endPageIndex = getPageIndex(endIndex, pageItemCount);
                        if (startPageIndex === endPageIndex) return [ {
                            pageIndex: startPageIndex,
                            startIndex: startIndex % pageItemCount,
                            endIndex: endIndex % pageItemCount
                        } ];
                        var ranges = [];
                        ranges.push({
                            pageIndex: startPageIndex,
                            startIndex: startIndex % pageItemCount,
                            endIndex: pageItemCount - 1
                        });
                        for (var i = startPageIndex + 1; i < endPageIndex; i++) ranges.push({
                            pageIndex: i,
                            startIndex: 0,
                            endIndex: pageItemCount - 1
                        });
                        return ranges.push({
                            pageIndex: endPageIndex,
                            startIndex: 0,
                            endIndex: endIndex % pageItemCount
                        }), ranges;
                    }
                    MeasureUtil.getAncestorsToMeasure = getAncestorsToMeasure, MeasureUtil.getSizeDifference = getSizeDifference, 
                    MeasureUtil.getPageIndex = getPageIndex, MeasureUtil.itemRangeToPageRange = itemRangeToPageRange;
                }(MeasureUtil = pivotTable.MeasureUtil || (pivotTable.MeasureUtil = {}));
                var ColumnMeasurementUtil;
                !function(ColumnMeasurementUtil) {
                    function getVisibleRange(viewportLeft, viewportWidth, columnWidthMeasureManager) {
                        var pageResult = getVisiblePageRange(viewportLeft, viewportWidth, columnWidthMeasureManager);
                        if (!pageResult) return null;
                        var firstColumnResult = getFirstVisibleIndex(pageResult.firstPageColumn, pageResult.firstPageIndex, pageResult.firstPageLeft, viewportLeft, viewportWidth), lastcolumnIndex = getLastVisibleIndex(pageResult.lastPageColumn, pageResult.lastPageIndex, pageResult.lastPageLeft, viewportLeft, viewportWidth);
                        return {
                            firstLeafIndex: firstColumnResult.leafIndex,
                            firstLeafLeft: firstColumnResult.left,
                            lastLeafIndex: lastcolumnIndex
                        };
                    }
                    function getVisiblePageRange(viewportLeft, viewportWidth, columnWidthMeasureManager) {
                        for (var left = 0, pageIndex = 0, result = null, _i = 0, _a = columnWidthMeasureManager.getPageColumns(); _i < _a.length; _i++) {
                            var pageColumn = _a[_i], width = pageColumn.getWidth();
                            if (linesOverlapHorizontally(left, width, viewportLeft, viewportWidth)) result ? (result.lastPageColumn = pageColumn, 
                            result.lastPageIndex = pageIndex, result.lastPageLeft = left) : result = {
                                firstPageColumn: pageColumn,
                                firstPageIndex: pageIndex,
                                firstPageLeft: left,
                                lastPageColumn: pageColumn,
                                lastPageIndex: pageIndex,
                                lastPageLeft: left
                            }; else if (result) break;
                            left += width, pageIndex++;
                        }
                        return result;
                    }
                    function getFirstVisibleIndex(pageColumn, pageIndex, pageLeft, viewportLeft, viewportWidth) {
                        for (var columnIndex = 0, left = pageLeft, result = null, _i = 0, _a = pageColumn.getColumnWidths(); _i < _a.length; _i++) {
                            var columnWidth = _a[_i];
                            if (linesOverlapHorizontally(left, columnWidth, viewportLeft, viewportWidth)) return result = {
                                leafIndex: pageIndex * pivotTable.PageColumnCount + columnIndex,
                                left: left
                            };
                            left += columnWidth, columnIndex++;
                        }
                        return null;
                    }
                    function getLastVisibleIndex(pageColumn, pageIndex, pageLeft, viewportLeft, viewportWidth) {
                        for (var result, columnIndex = 0, left = pageLeft, _i = 0, _a = pageColumn.getColumnWidths(); _i < _a.length; _i++) {
                            var columnWidth = _a[_i];
                            linesOverlapHorizontally(left, columnWidth, viewportLeft, viewportWidth) && (result = pageIndex * pivotTable.PageColumnCount + columnIndex), 
                            left += columnWidth, columnIndex++;
                        }
                        return result;
                    }
                    function linesOverlapHorizontally(left1, width1, left2, width2) {
                        return !(left2 > left1 + width1 || left2 + width2 < left1);
                    }
                    function isColumnMeasured(columnLeafIndex, columnWidthMeasureManager) {
                        return getMeasuredColumnCount(columnWidthMeasureManager) > columnLeafIndex;
                    }
                    function getMeasuredColumnCount(columnWidthMeasureManager) {
                        var pages = columnWidthMeasureManager.getPageColumns();
                        return _.isEmpty(pages) ? 0 : (pages.length - 1) * pivotTable.PageColumnCount + _.last(pages).getColumnWidths().length;
                    }
                    function getOffset(visibleColumnStart, columnWidthMeasureManager) {
                        var pageIndex = MeasureUtil.getPageIndex(visibleColumnStart.columnIndex, pivotTable.PageColumnCount);
                        if (pageIndex >= columnWidthMeasureManager.getPageColumns().length) return 0;
                        for (var page = columnWidthMeasureManager.getPageColumns()[pageIndex], offset = columnWidthMeasureManager.getPageColumnLeft(page), index = visibleColumnStart.columnIndex % pivotTable.PageColumnCount, columnWidths = page.getColumnWidths(), i = 0; i < index; i++) offset += columnWidths[i];
                        return offset += Math.max(0, page.getColumnWidths()[index] - visibleColumnStart.columnOffset);
                    }
                    function remeasureColumn(columnLeafIndex, binder, rowNavigator, columnNavigator, startRowIndex, columnwidthMeasureManager) {
                        var page = columnwidthMeasureManager.getPageColumn(columnLeafIndex, binder, rowNavigator, columnNavigator, startRowIndex);
                        columnwidthMeasureManager.measurePage(page, binder, rowNavigator, columnNavigator, startRowIndex, pivotTable.MeasureRowSampleCount, columnLeafIndex % pivotTable.PageColumnCount, 1);
                    }
                    function getVisibleColumnStart(visibleColumnRange, viewportLeft, columnWidthMeasureManager) {
                        var firstLeafWidth = columnWidthMeasureManager.getColumnWidth(visibleColumnRange.firstLeafIndex);
                        return {
                            columnIndex: visibleColumnRange.firstLeafIndex,
                            columnOffset: firstLeafWidth - viewportLeft + visibleColumnRange.firstLeafLeft
                        };
                    }
                    ColumnMeasurementUtil.getVisibleRange = getVisibleRange, ColumnMeasurementUtil.isColumnMeasured = isColumnMeasured, 
                    ColumnMeasurementUtil.getOffset = getOffset, ColumnMeasurementUtil.remeasureColumn = remeasureColumn, 
                    ColumnMeasurementUtil.getVisibleColumnStart = getVisibleColumnStart;
                }(ColumnMeasurementUtil = pivotTable.ColumnMeasurementUtil || (pivotTable.ColumnMeasurementUtil = {}));
                var RowMeasurementUtil;
                !function(RowMeasurementUtil) {
                    function getVisibleRange(viewportTop, viewportHeight, rowHeightMeasureManager) {
                        var pageResult = getVisiblePageRange(viewportTop, viewportHeight, rowHeightMeasureManager);
                        if (!pageResult) return null;
                        var firstRowResult = getFirstVisibleIndex(pageResult.firstPageRow, pageResult.firstPageIndex, pageResult.firstPageTop, viewportTop, viewportHeight), lastRowIndex = getLastVisibleIndex(pageResult.lastPageRow, pageResult.lastPageIndex, pageResult.lastPageTop, viewportTop, viewportHeight);
                        return {
                            firstLeafIndex: firstRowResult.leafIndex,
                            firstLeafTop: firstRowResult.top,
                            lastLeafIndex: lastRowIndex
                        };
                    }
                    function getVisiblePageRange(viewportTop, viewportHeight, rowHeightMeasureManager) {
                        for (var top = 0, pageIndex = 0, result = null, _i = 0, _a = rowHeightMeasureManager.getPageRows(); _i < _a.length; _i++) {
                            var pageRow = _a[_i], height = pageRow.getHeight();
                            if (linesOverlapVertically(top, height, viewportTop, viewportHeight)) result ? (result.lastPageRow = pageRow, 
                            result.lastPageIndex = pageIndex, result.lastPageTop = top) : result = {
                                firstPageRow: pageRow,
                                firstPageIndex: pageIndex,
                                firstPageTop: top,
                                lastPageRow: pageRow,
                                lastPageIndex: pageIndex,
                                lastPageTop: top
                            }; else if (result) break;
                            top += height, pageIndex++;
                        }
                        return result;
                    }
                    function getFirstVisibleIndex(pageRow, pageIndex, pageTop, viewportTop, viewportHeight) {
                        for (var rowIndex = 0, top = pageTop, result = null, _i = 0, _a = pageRow.getRowHeights(); _i < _a.length; _i++) {
                            var rowHeight = _a[_i];
                            if (linesOverlapVertically(top, rowHeight, viewportTop, viewportHeight)) return result = {
                                leafIndex: pageIndex * pivotTable.PageRowCount + rowIndex,
                                top: top
                            };
                            top += rowHeight, rowIndex++;
                        }
                    }
                    function getLastVisibleIndex(pageRow, pageIndex, pageTop, viewportTop, viewportHeight) {
                        for (var result, rowIndex = 0, top = pageTop, _i = 0, _a = pageRow.getRowHeights(); _i < _a.length; _i++) {
                            var rowHeight = _a[_i];
                            linesOverlapVertically(top, rowHeight, viewportTop, viewportHeight) && (result = pageIndex * pivotTable.PageRowCount + rowIndex), 
                            top += rowHeight, rowIndex++;
                        }
                        return result;
                    }
                    function linesOverlapVertically(top1, height1, top2, height2) {
                        return !(top2 > top1 + height1 || top2 + height2 < top1);
                    }
                    function isRowMeasured(rowLeafIndex, rowHeightMeasureManager) {
                        return getMeasuredRowCount(rowHeightMeasureManager) > rowLeafIndex;
                    }
                    function getMeasuredRowCount(rowHeightMeasureManager) {
                        var pages = rowHeightMeasureManager.getPageRows();
                        return _.isEmpty(pages) ? 0 : (pages.length - 1) * pivotTable.PageRowCount + _.last(pages).getRowHeights().length;
                    }
                    function getOffset(visibleRowStart, rowHeightMeasureManager) {
                        var pageIndex = MeasureUtil.getPageIndex(visibleRowStart.rowIndex, pivotTable.PageRowCount);
                        if (pageIndex >= rowHeightMeasureManager.getPageRows().length) return 0;
                        for (var page = rowHeightMeasureManager.getPageRows()[pageIndex], offset = rowHeightMeasureManager.getPageRowTop(page), index = visibleRowStart.rowIndex % pivotTable.PageRowCount, i = 0; i < index; i++) offset += page.getRowHeights()[i];
                        return offset += Math.max(0, page.getRowHeights()[index] - visibleRowStart.rowOffset);
                    }
                    function remeasureRows(binder, rowNavigator, columnNavigator, startRowIndex, endRowIndex, startColumnIndex, rowHeightMeasureManager) {
                        for (var ranges = MeasureUtil.itemRangeToPageRange(startRowIndex, endRowIndex, pivotTable.PageRowCount), _i = 0, ranges_1 = ranges; _i < ranges_1.length; _i++) {
                            var range = ranges_1[_i];
                            rowHeightMeasureManager.measurePage(rowHeightMeasureManager.getPageRows()[range.pageIndex], binder, rowNavigator, columnNavigator, startRowIndex, startColumnIndex, pivotTable.MeasureColumnSampleCount, range.startIndex, range.endIndex - range.startIndex + 1);
                        }
                    }
                    function getVisibleRowStart(visibleRowRange, viewportTop, rowHeightMeasureManager) {
                        var firstLeafHeight = rowHeightMeasureManager.getRowHeight(visibleRowRange.firstLeafIndex);
                        return {
                            rowIndex: visibleRowRange.firstLeafIndex,
                            rowOffset: firstLeafHeight - viewportTop + visibleRowRange.firstLeafTop
                        };
                    }
                    RowMeasurementUtil.getVisibleRange = getVisibleRange, RowMeasurementUtil.isRowMeasured = isRowMeasured, 
                    RowMeasurementUtil.getOffset = getOffset, RowMeasurementUtil.remeasureRows = remeasureRows, 
                    RowMeasurementUtil.getVisibleRowStart = getVisibleRowStart;
                }(RowMeasurementUtil = pivotTable.RowMeasurementUtil || (pivotTable.RowMeasurementUtil = {})), 
                pivotTable.PageColumnCount = 10, pivotTable.MeasureRowSampleCount = 50, pivotTable.MaxAutoPageColumnMeasure = 100;
                var ColumnWidthMeasureManager = function() {
                    function ColumnWidthMeasureManager(measureElement, sizeManager) {
                        this.pageColumns = [], this.measureElement = measureElement, this.sizeManager = sizeManager;
                    }
                    return ColumnWidthMeasureManager.prototype.canAddPageColumn = function(columnNavigator) {
                        return this.pageColumns.length < this.getMaxPageColumnCount(columnNavigator);
                    }, ColumnWidthMeasureManager.prototype.getMaxPageColumnCount = function(columnNavigator) {
                        return Math.ceil(columnNavigator.getHierarchyLeafCount() / pivotTable.PageColumnCount);
                    }, ColumnWidthMeasureManager.prototype.getPageColumns = function() {
                        return this.pageColumns;
                    }, ColumnWidthMeasureManager.prototype.getPageColumnStartIndex = function(pageColumn) {
                        var index = this.pageColumns.indexOf(pageColumn);
                        return index === -1 ? -1 : index * pivotTable.PageColumnCount;
                    }, ColumnWidthMeasureManager.prototype.getPageColumnLeft = function(pageColumn) {
                        for (var left = 0, _i = 0, _a = this.pageColumns; _i < _a.length; _i++) {
                            var currentPageColumn = _a[_i];
                            if (pageColumn === currentPageColumn) break;
                            left += currentPageColumn.getWidth();
                        }
                        return left;
                    }, ColumnWidthMeasureManager.prototype.getColumnsWidth = function() {
                        for (var width = 0, _i = 0, _a = this.pageColumns; _i < _a.length; _i++) {
                            var pageColumn = _a[_i];
                            width += pageColumn.getWidth();
                        }
                        return width;
                    }, ColumnWidthMeasureManager.prototype.clear = function() {
                        this.pageColumns = [];
                    }, ColumnWidthMeasureManager.prototype.measureNextPage = function(binder, rowNavigator, columnNavigator, startRowIndex) {
                        var pageColumn = new pivotTable.PivotTablePageColumn();
                        this.getPageColumns().push(pageColumn), this.measurePage(pageColumn, binder, rowNavigator, columnNavigator, startRowIndex, pivotTable.MeasureRowSampleCount);
                    }, ColumnWidthMeasureManager.prototype.getWidestCellBindingString = function(columnItem, floatingRowItems, binder, rowNavigator, columnNavigator, rowCount, startRowIndex) {
                        for (var widest = {
                            item: null,
                            width: -1
                        }, j = 0; j < rowCount; j++) this.updateWidestItemFromBodyCell(rowNavigator.getHierarchyLeafAt(j + startRowIndex), columnItem, binder, rowNavigator, widest);
                        if (floatingRowItems) for (var floatingLeafCount = rowNavigator.getFloatingHierarchyLeafCount(), j = 0; j < floatingLeafCount; j++) this.updateWidestItemFromBodyCell(rowNavigator.getFloatingHierarchyLeafAt(j), columnItem, binder, rowNavigator, widest);
                        var width = binder.getApproximateColumnHeaderWidth(columnItem);
                        width > widest.width && (widest.item = columnItem, widest.width = width);
                        var cellBinding;
                        return cellBinding = widest.item === columnItem ? binder.getColumnHeaderBinding(widest.item, !0) : binder.getBodyCellBinding(widest.item, !0), 
                        pivotTable.ElementBuilder.build(cellBinding, ColumnWidthMeasureManager.measureRequiredStyle);
                    }, ColumnWidthMeasureManager.prototype.measurePage = function(pageColumn, binder, rowNavigator, columnNavigator, startRowIndex, rowSampleCount, startOffset, columnCount) {
                        var pageColumnStartIndex = this.getPageColumnStartIndex(pageColumn);
                        void 0 === startOffset && (startOffset = 0), void 0 === columnCount && (columnCount = Math.min(columnNavigator.getHierarchyLeafCount() - pageColumnStartIndex, pivotTable.PageColumnCount) + startOffset);
                        for (var rowCount = Math.min(rowNavigator.getHierarchyLeafCount() - startRowIndex, rowSampleCount), cellsString = "", floatingRowItems = rowNavigator.getFloatingHierarchyItems(), i = 0; i < columnCount; i++) {
                            var columnItem = columnNavigator.getHierarchyLeafAt(i + startOffset + pageColumnStartIndex), width = pageColumn.getColumnWidths()[i + startOffset] = this.sizeManager.getColumnWidth(columnItem);
                            void 0 === width && (cellsString += this.getWidestCellBindingString(columnItem, floatingRowItems, binder, rowNavigator, columnNavigator, rowCount, startRowIndex));
                        }
                        if (cellsString) {
                            this.measureElement.insertAdjacentHTML("beforeend", cellsString);
                            for (var current = this.measureElement.firstChild, i = 0; i < columnCount; i++) void 0 === pageColumn.getColumnWidths()[i + startOffset] && (pageColumn.getColumnWidths()[i + startOffset] = current.offsetWidth + 1, 
                            current = current.nextSibling);
                            this.measureElement.innerHTML = "", this.adjustItemsWidth(pageColumn, binder, columnNavigator, pageColumnStartIndex, startOffset, columnCount);
                        }
                    }, ColumnWidthMeasureManager.prototype.updateWidestItemFromBodyCell = function(rowItem, columnItem, binder, rowNavigator, widest) {
                        var bodyCell = rowNavigator.getIntersection(rowItem, columnItem), width = binder.getApproximateBodyCellWidth(bodyCell);
                        width > widest.width && (widest.item = bodyCell, widest.width = width);
                    }, ColumnWidthMeasureManager.prototype.adjustItemsWidth = function(pageColumn, binder, columnNavigator, columnPageStartIndex, startOffset, columnCount) {
                        for (var i = 0; i < columnCount; i++) {
                            var columnItem = columnNavigator.getHierarchyLeafAt(i + startOffset + columnPageStartIndex);
                            void 0 === this.sizeManager.getColumnWidth(columnItem) && this.adjustItemWidth(pageColumn, i + startOffset, columnPageStartIndex, binder, columnNavigator, columnItem);
                        }
                    }, ColumnWidthMeasureManager.prototype.adjustItemWidth = function(pageColumn, columnIndex, pageStartColumnIndex, binder, columnNavigator, columnItem) {
                        var _this = this, ancestors = MeasureUtil.getAncestorsToMeasure(columnItem, columnNavigator);
                        _.isEmpty(ancestors) || (this.measureAncestors(ancestors, binder), pageColumn.getColumnWidths()[columnIndex] += MeasureUtil.getSizeDifference(ancestors, columnIndex + pageStartColumnIndex, columnNavigator, function(index) {
                            return _this.getColumnWidth(index);
                        }));
                    }, ColumnWidthMeasureManager.prototype.measureAncestors = function(ancestors, binder) {
                        for (var cellsString = "", _i = 0, ancestors_2 = ancestors; _i < ancestors_2.length; _i++) {
                            var ancestor = ancestors_2[_i], binding = binder.getColumnHeaderBinding(ancestor.node, !0);
                            cellsString += pivotTable.ElementBuilder.build(binding, ColumnWidthMeasureManager.measureRequiredStyle);
                        }
                        this.measureElement.insertAdjacentHTML("beforeend", cellsString);
                        for (var current = this.measureElement.firstChild, _a = 0, ancestors_3 = ancestors; _a < ancestors_3.length; _a++) {
                            var ancestor = ancestors_3[_a];
                            ancestor.size = current.offsetWidth + 1, current = current.nextSibling;
                        }
                        this.measureElement.innerHTML = "";
                    }, ColumnWidthMeasureManager.prototype.getColumnWidth = function(columnLeafIndex, binder, rowNavigator, columnNavigator, startRowIndex) {
                        var pageColumn = this.getPageColumn(columnLeafIndex, binder, rowNavigator, columnNavigator, startRowIndex);
                        return pageColumn.getColumnWidths()[columnLeafIndex % pivotTable.PageColumnCount];
                    }, ColumnWidthMeasureManager.prototype.setColumnWidth = function(columnLeafIndex, width) {
                        var pageColumn = this.getPageColumn(columnLeafIndex);
                        pageColumn.getColumnWidths()[columnLeafIndex % pivotTable.PageColumnCount] = width;
                    }, ColumnWidthMeasureManager.prototype.getPageColumn = function(columnLeafIndex, binder, rowNavigator, columnNavigator, startRowIndex) {
                        var pageColumnIndex = this.getPageIndex(columnLeafIndex);
                        if (binder && pageColumnIndex >= this.pageColumns.length) for (var pageCountToMeasure = pageColumnIndex - this.pageColumns.length + 1, i = 0; i < pageCountToMeasure; i++) this.measureNextPage(binder, rowNavigator, columnNavigator, startRowIndex);
                        return this.pageColumns[pageColumnIndex];
                    }, ColumnWidthMeasureManager.prototype.getPageIndex = function(columnIndex) {
                        return MeasureUtil.getPageIndex(columnIndex, pivotTable.PageColumnCount);
                    }, ColumnWidthMeasureManager.measureRequiredStyle = {
                        "box-sizing": "border-box",
                        display: "inline-block"
                    }, ColumnWidthMeasureManager;
                }();
                pivotTable.ColumnWidthMeasureManager = ColumnWidthMeasureManager, pivotTable.PageRowCount = 20, 
                pivotTable.MeasureColumnSampleCount = 20, pivotTable.MaxAutoPageRowMeasure = 100;
                var RowHeightMeasureManager = function() {
                    function RowHeightMeasureManager(measureElement, columnWidthMeasureManager, rowLevelWidthMeasureManager, sizeManager) {
                        this.pageRows = [], this.measureElement = measureElement, this.columnWidthMeasureManager = columnWidthMeasureManager, 
                        this.rowLevelWidthMeasureManager = rowLevelWidthMeasureManager, this.sizeManager = sizeManager;
                    }
                    return RowHeightMeasureManager.prototype.clear = function() {
                        this.pageRows = [], this.clearFloatingRows();
                    }, RowHeightMeasureManager.prototype.clearFloatingRows = function() {
                        this.floatingPageRow = new pivotTable.PivotTablePageRow();
                    }, RowHeightMeasureManager.prototype.ensureLastPageComplete = function(binder, rowNavigator, columnNavigator, startRowIndex, startColumnIndex, columnSampleCount) {
                        var count = this.pageRows.length;
                        if (0 === count) return -1;
                        var index = this.pageRows.length - 1, lastPage = this.pageRows[index], originalCount = lastPage.getRowHeights().length;
                        return originalCount < pivotTable.PageRowCount && this.gotMoreRows(lastPage, rowNavigator) && (this.measurePage(lastPage, binder, rowNavigator, columnNavigator, startRowIndex, startColumnIndex, columnSampleCount, lastPage.getRowHeights().length - 1), 
                        lastPage.getRowHeights().length > originalCount) ? index : -1;
                    }, RowHeightMeasureManager.prototype.measureNextPage = function(binder, rowNavigator, columnNavigator, startRowIndex, startColumnIndex) {
                        var pageRow = new pivotTable.PivotTablePageRow();
                        this.getPageRows().push(pageRow), this.measurePage(pageRow, binder, rowNavigator, columnNavigator, startRowIndex, startColumnIndex, pivotTable.MeasureColumnSampleCount);
                    }, RowHeightMeasureManager.prototype.measureFloatingRows = function(binder, rowNavigator, columnNavigator, startRowIndex, startColumnIndex) {
                        if (_.isEmpty(this.floatingPageRow.getRowHeights())) {
                            var floatingRowItems = rowNavigator.getFloatingHierarchyItems();
                            if (!_.isEmpty(floatingRowItems)) {
                                for (var columnCount = Math.min(columnNavigator.getHierarchyLeafCount() - startColumnIndex, pivotTable.MeasureColumnSampleCount), cellsString = "", floatingLeafCount = rowNavigator.getFloatingHierarchyLeafCount(), i = 0; i < floatingLeafCount; i++) {
                                    var floatingLeaf = rowNavigator.getFloatingHierarchyLeafAt(i);
                                    this.floatingPageRow.getRowHeights()[i] = this.sizeManager.getRowHeight(floatingLeaf), 
                                    void 0 === this.floatingPageRow.getRowHeights()[i] && (cellsString += this.getHeighestCellBindingString(floatingLeaf, binder, rowNavigator, columnNavigator, columnCount, startColumnIndex, startRowIndex));
                                }
                                if (cellsString) {
                                    this.measureElement.insertAdjacentHTML("beforeend", cellsString);
                                    for (var current = this.measureElement.firstChild, i = 0; i < floatingLeafCount; i++) void 0 === this.floatingPageRow.getRowHeights()[i] && (this.floatingPageRow.getRowHeights()[i] = current.offsetHeight, 
                                    current = current.nextSibling);
                                    this.measureElement.innerHTML = "", this.adjustItemsHeight(this.floatingPageRow, binder, rowNavigator, 0, 0, floatingLeafCount);
                                }
                            }
                        }
                    }, RowHeightMeasureManager.prototype.getPageIndex = function(rowIndex) {
                        return MeasureUtil.getPageIndex(rowIndex, pivotTable.PageRowCount);
                    }, RowHeightMeasureManager.prototype.getMeasureRequiredStyle = function(width) {
                        return {
                            "box-sizing": "border-box",
                            width: pivotTable.PivotTableControl.pixelUnits(width)
                        };
                    }, RowHeightMeasureManager.prototype.gotMoreRows = function(pageRow, rowNavigator) {
                        var noneMeasuredRowCount = rowNavigator.getHierarchyLeafCount() - this.getPageRowStartIndex(pageRow) - pageRow.getRowHeights().length;
                        return noneMeasuredRowCount > 0;
                    }, RowHeightMeasureManager.prototype.measurePage = function(pageRow, binder, rowNavigator, columnNavigator, startRowIndex, startColumnIndex, columnSampleCount, startOffset, rowCount) {
                        var pageStartRowIndex = this.getPageRowStartIndex(pageRow);
                        void 0 === startOffset && (startOffset = 0), void 0 === rowCount && (rowCount = Math.min(rowNavigator.getHierarchyLeafCount() - pageStartRowIndex, pivotTable.PageRowCount) - startOffset);
                        for (var columnCount = Math.min(columnNavigator.getHierarchyLeafCount() - startColumnIndex, columnSampleCount), cellsString = "", i = 0; i < rowCount; i++) {
                            var rowItem = rowNavigator.getHierarchyLeafAt(i + startOffset + pageStartRowIndex), height = pageRow.getRowHeights()[i + startOffset] = this.sizeManager.getRowHeight(rowItem);
                            void 0 === height && (cellsString += this.getHeighestCellBindingString(rowItem, binder, rowNavigator, columnNavigator, columnCount, startColumnIndex, startRowIndex));
                        }
                        if (cellsString) {
                            this.measureElement.insertAdjacentHTML("beforeend", cellsString);
                            for (var current = this.measureElement.firstChild, i = 0; i < rowCount; i++) void 0 === pageRow.getRowHeights()[i + startOffset] && (pageRow.getRowHeights()[i + startOffset] = current.offsetHeight, 
                            current = current.nextSibling);
                            this.measureElement.innerHTML = "", this.adjustItemsHeight(pageRow, binder, rowNavigator, pageStartRowIndex, startOffset, rowCount);
                        }
                    }, RowHeightMeasureManager.prototype.getHeighestCellBindingString = function(rowItem, binder, rowNavigator, columnNavigator, columnCount, startColumnIndex, startRowIndex) {
                        for (var heighestItem = {
                            item: null,
                            width: -1,
                            height: -1
                        }, j = 0; j < columnCount; j++) {
                            var columnItem = columnNavigator.getHierarchyLeafAt(j + startColumnIndex), cellItem = rowNavigator.getIntersection(rowItem, columnItem), cellWidth = this.columnWidthMeasureManager.getColumnWidth(j + startColumnIndex, binder, rowNavigator, columnNavigator, startRowIndex), height_1 = binder.getApproximateBodyCellHeight(cellItem, cellWidth);
                            height_1 > heighestItem.height && (heighestItem.item = cellItem, heighestItem.width = cellWidth, 
                            heighestItem.height = height_1);
                        }
                        var rowItemWidth = this.getItemWidth(rowItem, rowNavigator), height = binder.getApproximateRowHeaderHeight(rowItem, rowItemWidth);
                        height > heighestItem.height && (heighestItem.item = rowItem, heighestItem.height = height, 
                        heighestItem.width = rowItemWidth);
                        var cellBinding;
                        return cellBinding = heighestItem.item === rowItem ? binder.getRowHeaderBinding(heighestItem.item, !0) : binder.getBodyCellBinding(heighestItem.item, !0), 
                        pivotTable.ElementBuilder.build(cellBinding, this.getMeasureRequiredStyle(heighestItem.width));
                    }, RowHeightMeasureManager.prototype.getItemWidth = function(rowItem, rowNavigator) {
                        return 0;
                    }, RowHeightMeasureManager.prototype.adjustItemsHeight = function(pageRow, binder, rowNavigator, pageStartRowIndex, startOffset, rowCount) {}, 
                    RowHeightMeasureManager.prototype.getMaxPageRowCount = function(rowNavigator) {
                        return Math.ceil(rowNavigator.getHierarchyLeafCount() / pivotTable.PageRowCount);
                    }, RowHeightMeasureManager.prototype.getPageRows = function() {
                        return this.pageRows;
                    }, RowHeightMeasureManager.prototype.getFloatingPageRow = function() {
                        return this.floatingPageRow;
                    }, RowHeightMeasureManager.prototype.getFloatingRowHeights = function() {
                        return _.sum(this.floatingPageRow.getRowHeights());
                    }, RowHeightMeasureManager.prototype.canAddPageRow = function(rowNavigator) {
                        return this.pageRows.length < this.getMaxPageRowCount(rowNavigator);
                    }, RowHeightMeasureManager.prototype.getPageRowStartIndex = function(pageRow) {
                        if (pageRow === this.floatingPageRow) return 0;
                        var index = this.pageRows.indexOf(pageRow);
                        return index === -1 ? -1 : index * pivotTable.PageRowCount;
                    }, RowHeightMeasureManager.prototype.getPageRowTop = function(pageRow) {
                        if (pageRow === this.floatingPageRow) return 0;
                        for (var top = 0, _i = 0, _a = this.pageRows; _i < _a.length; _i++) {
                            var currentPageRow = _a[_i];
                            if (pageRow === currentPageRow) break;
                            top += currentPageRow.getHeight();
                        }
                        return top;
                    }, RowHeightMeasureManager.prototype.getRowsHeight = function() {
                        for (var height = 0, _i = 0, _a = this.pageRows; _i < _a.length; _i++) {
                            var pageRow = _a[_i];
                            height += pageRow.getHeight();
                        }
                        return height;
                    }, RowHeightMeasureManager.prototype.getRowHeight = function(rowLeafIndex, binder, rowNavigator, columnNavigator, startRowIndex, startColumnIndex) {
                        var pageRow = this.getPageRow(rowLeafIndex, binder, rowNavigator, columnNavigator, startColumnIndex);
                        return pageRow.getRowHeights()[rowLeafIndex % pivotTable.PageRowCount];
                    }, RowHeightMeasureManager.prototype.getFloatingRowHeight = function(rowLeafIndex) {
                        return this.floatingPageRow.getRowHeights()[rowLeafIndex];
                    }, RowHeightMeasureManager.prototype.getPageRow = function(rowLeafIndex, binder, rowNavigator, columnNavigator, startRowIndex, startColumnIndex) {
                        var pageRowIndex = this.getPageIndex(rowLeafIndex);
                        if (binder && pageRowIndex > this.pageRows.length) for (var pageCountToMeasure = pageRowIndex - this.pageRows.length + 1, i = 0; i < pageCountToMeasure; i++) this.measureNextPage(binder, rowNavigator, columnNavigator, startRowIndex, startColumnIndex);
                        return this.pageRows[pageRowIndex];
                    }, RowHeightMeasureManager;
                }();
                pivotTable.RowHeightMeasureManager = RowHeightMeasureManager;
                var BlockedRowHeightMeasureManager = function(_super) {
                    function BlockedRowHeightMeasureManager() {
                        return null !== _super && _super.apply(this, arguments) || this;
                    }
                    return __extends(BlockedRowHeightMeasureManager, _super), BlockedRowHeightMeasureManager.prototype.getItemWidth = function(rowItem, rowNavigator) {
                        return this.rowLevelWidthMeasureManager.getWidth(rowNavigator.getLevel(rowItem), pivotTable.PivotTableHierarchyNavigator.getHeaderSpan(rowItem, rowNavigator));
                    }, BlockedRowHeightMeasureManager.prototype.adjustItemsHeight = function(pageRow, binder, rowNavigator, pageStartRowIndex, startOffset, rowCount) {
                        for (var i = 0; i < rowCount; i++) {
                            var rowItem = rowNavigator.getHierarchyLeafAt(i + startOffset + pageStartRowIndex);
                            void 0 === this.sizeManager.getRowHeight(rowItem) && this.adjustItemHeight(pageRow, i + startOffset, pageStartRowIndex, binder, rowNavigator, rowItem);
                        }
                    }, BlockedRowHeightMeasureManager.prototype.adjustItemHeight = function(pageRow, rowIndex, pageStartRowIndex, binder, rowNavigator, rowItem) {
                        var _this = this, ancestors = MeasureUtil.getAncestorsToMeasure(rowItem, rowNavigator);
                        _.isEmpty(ancestors) || (this.measureAncestors(ancestors, binder, rowNavigator), 
                        pageRow.getRowHeights()[rowIndex] += MeasureUtil.getSizeDifference(ancestors, pageStartRowIndex + rowIndex, rowNavigator, function(index) {
                            return pageRow === _this.getFloatingPageRow() ? _this.getFloatingRowHeight(index) : _this.getRowHeight(index);
                        }));
                    }, BlockedRowHeightMeasureManager.prototype.measureAncestors = function(ancestors, binder, rowNavigator) {
                        for (var cellsString = "", _i = 0, ancestors_4 = ancestors; _i < ancestors_4.length; _i++) {
                            var ancestor = ancestors_4[_i], binding = binder.getRowHeaderBinding(ancestor.node, !0);
                            cellsString += pivotTable.ElementBuilder.build(binding, this.getMeasureRequiredStyle(this.getItemWidth(ancestor.node, rowNavigator)));
                        }
                        this.measureElement.insertAdjacentHTML("beforeend", cellsString);
                        for (var current = this.measureElement.firstChild, _a = 0, ancestors_5 = ancestors; _a < ancestors_5.length; _a++) {
                            var ancestor = ancestors_5[_a];
                            ancestor.size = current.offsetHeight, current = current.nextSibling;
                        }
                        this.measureElement.innerHTML = "";
                    }, BlockedRowHeightMeasureManager;
                }(RowHeightMeasureManager);
                pivotTable.BlockedRowHeightMeasureManager = BlockedRowHeightMeasureManager;
                var SteppedRowHeightMeasureManager = function(_super) {
                    function SteppedRowHeightMeasureManager() {
                        return null !== _super && _super.apply(this, arguments) || this;
                    }
                    return __extends(SteppedRowHeightMeasureManager, _super), SteppedRowHeightMeasureManager.prototype.getItemWidth = function(rowItem, rowNavigator) {
                        return this.rowLevelWidthMeasureManager.getLevelWidth(rowNavigator.getLevel(rowItem));
                    }, SteppedRowHeightMeasureManager.prototype.adjustItemsHeight = function(pageRow, binder, rowNavigator, pageStartRowIndex, startOffset, rowCount) {}, 
                    SteppedRowHeightMeasureManager;
                }(RowHeightMeasureManager);
                pivotTable.SteppedRowHeightMeasureManager = SteppedRowHeightMeasureManager;
                var ColumnLevelHeightMeasureManager = function() {
                    function ColumnLevelHeightMeasureManager(measureElement, columnWidthMeasureManager, rowLevelWidthMeasureManager, sizeManager) {
                        this.columnLevelHeights = [], this.measureElement = measureElement, this.columnWidthMeasureManager = columnWidthMeasureManager, 
                        this.rowLevelWidthMeasureManager = rowLevelWidthMeasureManager, this.sizeManager = sizeManager;
                    }
                    return ColumnLevelHeightMeasureManager.prototype.clear = function() {
                        this.columnLevelHeights = [];
                    }, ColumnLevelHeightMeasureManager.prototype.getMeasureRequiredStyle = function(width) {
                        return {
                            "box-sizing": "border-box",
                            width: pivotTable.PivotTableControl.pixelUnits(width)
                        };
                    }, ColumnLevelHeightMeasureManager.prototype.measure = function(binder, rowNavigator, columnNavigator, rowStartIndex, columnStartIndex, columnSampleCount, levelToMeasure) {
                        if (0 === this.columnLevelHeights.length) {
                            for (var context = {
                                done: !1,
                                levels: [],
                                spanningHeaders: [],
                                leafCount: 0
                            }, columnHierarchyDepth = columnNavigator.getHierarchyDepth(), rowHierarchyDepth = rowNavigator.getHierarchyDepth(), i_1 = 0; i_1 < columnHierarchyDepth; i_1++) void 0 !== levelToMeasure && levelToMeasure !== i_1 || (this.columnLevelHeights[i_1] = this.sizeManager.getColumnLevelHeight(rowNavigator.getCorner(rowHierarchyDepth - 1, i_1))), 
                            context.levels.push({
                                largestItem: null,
                                isHeader: !0,
                                largestItemWidth: -1,
                                largestItemHeight: -1
                            });
                            var columnHierarchy = columnNavigator.getHierarchyItems();
                            columnHierarchy && this.getHeighestColumnHeaders(columnHierarchy, context, binder, rowNavigator, columnNavigator, rowStartIndex, columnStartIndex, columnSampleCount);
                            for (var rowLevel = 0; rowLevel < rowHierarchyDepth; rowLevel++) for (var columnLevel = 0; columnLevel < columnHierarchyDepth; columnLevel++) if (void 0 === this.columnLevelHeights[columnLevel]) {
                                var cornerCell = rowNavigator.getCorner(rowLevel, columnLevel), cornerCellwidth = this.rowLevelWidthMeasureManager.getLevelWidth(rowLevel), height = binder.getApproximateCornerCellHeight(cornerCell, cornerCellwidth);
                                height > context.levels[columnLevel].largestItemHeight && (context.levels[columnLevel].isHeader = !1, 
                                context.levels[columnLevel].largestItem = cornerCell, context.levels[columnLevel].largestItemHeight = height, 
                                context.levels[columnLevel].largestItemWidth = cornerCellwidth);
                            }
                            for (var cellsString = "", _i = 0, _a = context.levels; _i < _a.length; _i++) {
                                var level = _a[_i];
                                if (level.largestItem) {
                                    var requiredStyles = this.getMeasureRequiredStyle(level.largestItemWidth);
                                    if (level.isHeader) {
                                        var cell = binder.getColumnHeaderBinding(level.largestItem, !0);
                                        cellsString += pivotTable.ElementBuilder.build(cell, requiredStyles);
                                    } else {
                                        var cell = binder.getCornerCellBinding(level.largestItem, !0);
                                        cellsString += pivotTable.ElementBuilder.build(cell, requiredStyles);
                                    }
                                }
                            }
                            if (cellsString) {
                                this.measureElement.insertAdjacentHTML("beforeend", cellsString);
                                for (var current = this.measureElement.firstChild, i = 0, _b = 0, _c = context.levels; _b < _c.length; _b++) {
                                    var level = _c[_b];
                                    level.largestItem && (void 0 !== levelToMeasure && levelToMeasure !== i || (this.columnLevelHeights[i] = current.offsetHeight), 
                                    current = current.nextSibling), i++;
                                }
                                this.measureElement.innerHTML = "", this.adjustLevelHeightsFromSpanningHeaders(context, binder, rowNavigator, columnNavigator, rowStartIndex);
                            }
                        }
                    }, ColumnLevelHeightMeasureManager.prototype.adjustLevelHeightsFromSpanningHeaders = function(context, binder, rowNavigator, columnNavigator, rowStartIndex) {
                        for (var cellsString = "", _i = 0, _a = context.spanningHeaders; _i < _a.length; _i++) {
                            var node = _a[_i];
                            if (context.levels[node.levelToAdjust].largestItem) {
                                var requiredStyles = this.getMeasureRequiredStyle(this.getHeaderWidth(node.item, binder, rowNavigator, columnNavigator, rowStartIndex)), cell = binder.getColumnHeaderBinding(node.item, !0);
                                cellsString += pivotTable.ElementBuilder.build(cell, requiredStyles);
                            }
                        }
                        if (cellsString) {
                            this.measureElement.insertAdjacentHTML("beforeend", cellsString);
                            for (var current = this.measureElement.firstChild, _b = 0, _c = context.spanningHeaders; _b < _c.length; _b++) {
                                var node = _c[_b];
                                context.levels[node.levelToAdjust].largestItem && (this.adjustLevelFromSpanningHeader(node.item, node.level, node.levelToAdjust, current.offsetHeight, columnNavigator), 
                                current = current.nextSibling);
                            }
                            this.measureElement.innerHTML = "";
                        }
                    }, ColumnLevelHeightMeasureManager.prototype.adjustLevelFromSpanningHeader = function(header, itemLevel, levelToAdjust, itemHeight, columnNavigator) {
                        for (var spanningHeight = 0, level = itemLevel; level <= levelToAdjust; level++) spanningHeight += this.getLevelHeight(level);
                        itemHeight > spanningHeight && (this.columnLevelHeights[levelToAdjust] += itemHeight - spanningHeight);
                    }, ColumnLevelHeightMeasureManager.prototype.getHeighestColumnHeaders = function(items, context, binder, rowNavigator, columnNavigator, rowStartIndex, columnStartIndex, columnSampleCount) {
                        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                            var item = items_1[_i];
                            if (context.done) return;
                            var isLeaf = columnNavigator.isLeaf(item), level = columnNavigator.getLevel(item), span = pivotTable.PivotTableHierarchyNavigator.getHeaderSpan(item, columnNavigator), included = pivotTable.PivotTableHierarchyNavigator.getLastLeafIndex(item, columnNavigator) >= columnStartIndex;
                            if (included) if (1 === span) {
                                if (void 0 === this.columnLevelHeights[level]) {
                                    var itemWidth = this.getHeaderWidth(item, binder, rowNavigator, columnNavigator, rowStartIndex), height = binder.getApproximateColumnHeaderHeight(item, itemWidth);
                                    height > context.levels[level].largestItemHeight && (context.levels[level].largestItem = item, 
                                    context.levels[level].largestItemHeight = height, context.levels[level].largestItemWidth = itemWidth);
                                }
                            } else context.spanningHeaders.push({
                                item: item,
                                level: level,
                                levelToAdjust: span + level - 1
                            });
                            var children = columnNavigator.getChildren(item);
                            children && this.getHeighestColumnHeaders(children, context, binder, rowNavigator, columnNavigator, rowStartIndex, columnStartIndex, columnSampleCount), 
                            isLeaf && included && context.leafCount++, context.leafCount === columnSampleCount && (context.done = !0);
                        }
                    }, ColumnLevelHeightMeasureManager.prototype.getHeadersHeight = function() {
                        for (var totalHeight = 0, _i = 0, _a = this.columnLevelHeights; _i < _a.length; _i++) {
                            var height = _a[_i];
                            totalHeight += height;
                        }
                        return totalHeight;
                    }, ColumnLevelHeightMeasureManager.prototype.getLevelTop = function(level) {
                        for (var top = 0, i = 0; i < level; i++) top += this.columnLevelHeights[i];
                        return top;
                    }, ColumnLevelHeightMeasureManager.prototype.getLevelHeight = function(level) {
                        return this.columnLevelHeights[level];
                    }, ColumnLevelHeightMeasureManager.prototype.getHeaderWidth = function(item, binder, rowNavigator, columnNavigator, rowStartIndex) {
                        for (var firstLeafIndex = pivotTable.PivotTableHierarchyNavigator.getFirstLeafIndex(item, columnNavigator), lastLeafIndex = pivotTable.PivotTableHierarchyNavigator.getLastLeafIndex(item, columnNavigator), width = 0, index = firstLeafIndex; index <= lastLeafIndex; index++) width += this.columnWidthMeasureManager.getColumnWidth(index, binder, rowNavigator, columnNavigator, rowStartIndex);
                        return width;
                    }, ColumnLevelHeightMeasureManager;
                }();
                pivotTable.ColumnLevelHeightMeasureManager = ColumnLevelHeightMeasureManager;
                var BlockedRowLevelWidthMeasureManager = function() {
                    function BlockedRowLevelWidthMeasureManager(measureElement, sizeManager) {
                        this.rowLevelWidths = [], this.measureElement = measureElement, this.sizeManager = sizeManager;
                    }
                    return BlockedRowLevelWidthMeasureManager.prototype.clear = function() {
                        this.rowLevelWidths = [];
                    }, BlockedRowLevelWidthMeasureManager.prototype.measure = function(binder, rowNavigator, columnNavigator, startRowIndex, rowSampleCount, levelToMeasure) {
                        if (0 === this.rowLevelWidths.length || void 0 !== levelToMeasure) {
                            for (var context = {
                                done: !1,
                                levels: [],
                                spanningHeaders: [],
                                leafCount: 0
                            }, rowHierarchyDepth = rowNavigator.getHierarchyDepth(), columnHierarchyDepth = columnNavigator.getHierarchyDepth(), i_2 = 0; i_2 < rowHierarchyDepth; i_2++) void 0 !== levelToMeasure && levelToMeasure !== i_2 || (this.rowLevelWidths[i_2] = this.sizeManager.getRowLevelWidth(rowNavigator.getCorner(i_2, columnHierarchyDepth - 1))), 
                            context.levels.push({
                                largestItem: null,
                                isHeader: !0,
                                largestItemWidth: -1,
                                largestItemHeight: -1
                            });
                            this.getWidestRowHeaders(rowNavigator.getHierarchyItems(), context, binder, rowNavigator, startRowIndex, rowSampleCount);
                            var floatingRowItems = rowNavigator.getFloatingHierarchyItems();
                            _.isEmpty(floatingRowItems) || (context.done = !1, context.leafCount = 0, this.getWidestRowHeaders(floatingRowItems, context, binder, rowNavigator, -1, rowNavigator.getFloatingHierarchyLeafCount()));
                            for (var columnLevel = 0; columnLevel < columnHierarchyDepth; columnLevel++) for (var rowLevel = 0; rowLevel < rowHierarchyDepth; rowLevel++) if (void 0 === this.rowLevelWidths[rowLevel]) {
                                var cornerCell = rowNavigator.getCorner(rowLevel, columnLevel), width = binder.getApproximateCornerCellWidth(cornerCell);
                                width > context.levels[rowLevel].largestItemWidth && (context.levels[rowLevel].isHeader = !1, 
                                context.levels[rowLevel].largestItem = cornerCell, context.levels[rowLevel].largestItemWidth = width);
                            }
                            for (var cellsString = "", _i = 0, _a = context.levels; _i < _a.length; _i++) {
                                var level = _a[_i];
                                if (level.largestItem) if (level.isHeader) {
                                    var cellBinding = binder.getRowHeaderBinding(level.largestItem, !0);
                                    cellsString += pivotTable.ElementBuilder.build(cellBinding, BlockedRowLevelWidthMeasureManager.measureRequiredStyles);
                                } else {
                                    var cellBinding = binder.getCornerCellBinding(level.largestItem, !0);
                                    cellsString += pivotTable.ElementBuilder.build(cellBinding, BlockedRowLevelWidthMeasureManager.measureRequiredStyles);
                                }
                            }
                            if (cellsString) {
                                this.measureElement.insertAdjacentHTML("beforeend", cellsString);
                                for (var current = this.measureElement.firstChild, i = 0, _b = 0, _c = context.levels; _b < _c.length; _b++) {
                                    var level = _c[_b];
                                    level.largestItem && (void 0 !== levelToMeasure && levelToMeasure !== i || (this.rowLevelWidths[i] = current.offsetWidth + 1), 
                                    current = current.nextSibling), i++;
                                }
                                this.measureElement.innerHTML = "", this.adjustLevelWidthsFromSpanningHeaders(context, binder, rowNavigator);
                            }
                        }
                    }, BlockedRowLevelWidthMeasureManager.prototype.adjustLevelWidthsFromSpanningHeaders = function(context, binder, rowNavigator) {
                        for (var cellsString = "", _i = 0, _a = context.spanningHeaders; _i < _a.length; _i++) {
                            var node = _a[_i];
                            if (context.levels[node.levelToAdjust].largestItem) {
                                var cell = binder.getRowHeaderBinding(node.item, !0);
                                cellsString += pivotTable.ElementBuilder.build(cell, BlockedRowLevelWidthMeasureManager.measureRequiredStyles);
                            }
                        }
                        if (cellsString) {
                            this.measureElement.insertAdjacentHTML("beforeend", cellsString);
                            for (var current = this.measureElement.firstChild, _b = 0, _c = context.spanningHeaders; _b < _c.length; _b++) {
                                var node = _c[_b];
                                context.levels[node.levelToAdjust].largestItem && (this.adjustLevelWidthFromSpanningHeader(node.item, node.level, node.levelToAdjust, current.offsetWidth, rowNavigator), 
                                current = current.nextSibling);
                            }
                            this.measureElement.innerHTML = "";
                        }
                    }, BlockedRowLevelWidthMeasureManager.prototype.adjustLevelWidthFromSpanningHeader = function(header, itemLevel, levelToAdjust, itemWidth, rowNavigator) {
                        for (var spanningWidth = 0, level = itemLevel; level <= levelToAdjust; level++) spanningWidth += this.getLevelWidth(level);
                        itemWidth > spanningWidth && (this.rowLevelWidths[levelToAdjust] += itemWidth - spanningWidth);
                    }, BlockedRowLevelWidthMeasureManager.prototype.getWidestRowHeaders = function(items, context, binder, rowNavigator, startRowIndex, rowSampleCount) {
                        for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
                            var item = items_2[_i];
                            if (context.done) return;
                            var isLeaf = rowNavigator.isLeaf(item), level = rowNavigator.getLevel(item), span = pivotTable.PivotTableHierarchyNavigator.getHeaderSpan(item, rowNavigator), include = pivotTable.PivotTableHierarchyNavigator.getLastLeafIndex(item, rowNavigator) >= startRowIndex;
                            if (include) if (1 === span) {
                                if (void 0 === this.rowLevelWidths[level]) {
                                    var width = binder.getApproximateRowHeaderWidth(item);
                                    width > context.levels[level].largestItemWidth && (context.levels[level].largestItem = item, 
                                    context.levels[level].largestItemWidth = width);
                                }
                            } else context.spanningHeaders.push({
                                item: item,
                                level: level,
                                levelToAdjust: span + level - 1
                            });
                            var children = rowNavigator.getChildren(item);
                            children && this.getWidestRowHeaders(children, context, binder, rowNavigator, startRowIndex, rowSampleCount), 
                            isLeaf && include && context.leafCount++, context.leafCount === rowSampleCount && (context.done = !0);
                        }
                    }, BlockedRowLevelWidthMeasureManager.prototype.getHeadersWidth = function() {
                        for (var totalWidth = 0, _i = 0, _a = this.rowLevelWidths; _i < _a.length; _i++) {
                            var width = _a[_i];
                            totalWidth += width;
                        }
                        return totalWidth;
                    }, BlockedRowLevelWidthMeasureManager.prototype.getLevelLeft = function(level) {
                        for (var left = 0, i = 0; i < level; i++) left += this.rowLevelWidths[i];
                        return left;
                    }, BlockedRowLevelWidthMeasureManager.prototype.getLevelWidth = function(level) {
                        return this.rowLevelWidths[level];
                    }, BlockedRowLevelWidthMeasureManager.prototype.setLevelWidth = function(level, width) {
                        this.rowLevelWidths[level] = width;
                    }, BlockedRowLevelWidthMeasureManager.prototype.getWidth = function(level, columnSpan) {
                        for (var width = 0, i = level; i < level + columnSpan; i++) width += this.getLevelWidth(i);
                        return width;
                    }, BlockedRowLevelWidthMeasureManager.measureRequiredStyles = {
                        "box-sizing": "border-box",
                        display: "inline-block"
                    }, BlockedRowLevelWidthMeasureManager;
                }();
                pivotTable.BlockedRowLevelWidthMeasureManager = BlockedRowLevelWidthMeasureManager;
                var SteppedRowLevelWidthMeasureManager = function() {
                    function SteppedRowLevelWidthMeasureManager(measureElement, sizeManager) {
                        this.measureElement = measureElement, this.sizeManager = sizeManager;
                    }
                    return SteppedRowLevelWidthMeasureManager.prototype.clear = function() {
                        this.width = void 0;
                    }, SteppedRowLevelWidthMeasureManager.prototype.getHeaderBindingString = function(rowItem, binder) {
                        var cellBinding = binder.getRowHeaderBinding(rowItem, !0);
                        return pivotTable.ElementBuilder.build(cellBinding, BlockedRowLevelWidthMeasureManager.measureRequiredStyles);
                    }, SteppedRowLevelWidthMeasureManager.prototype.measure = function(binder, rowNavigator, columnNavigator, startRowIndex, rowSampleCount, levelToMeasure) {
                        if ((void 0 === this.width || void 0 !== levelToMeasure) && (this.width = this.sizeManager.getRowLevelWidth(rowNavigator.getCorner(0, columnNavigator.getHierarchyDepth() - 1)), 
                        void 0 === this.width)) {
                            for (var cellsString = "", rowCount = Math.min(rowNavigator.getHierarchyLeafCount() - startRowIndex, rowSampleCount), i = 0; i < rowCount; i++) cellsString += this.getHeaderBindingString(rowNavigator.getHierarchyLeafAt(i + startRowIndex), binder);
                            var floatingHierarchyItems = rowNavigator.getFloatingHierarchyItems();
                            if (!_.isEmpty(floatingHierarchyItems)) for (var floatingLeafCount = rowNavigator.getFloatingHierarchyLeafCount(), i = 0; i < floatingLeafCount; i++) cellsString += this.getHeaderBindingString(rowNavigator.getFloatingHierarchyLeafAt(i), binder);
                            if (rowNavigator.getHierarchyDepth() > 0) for (var i = 0; i < columnNavigator.getHierarchyDepth(); i++) {
                                var cornerItem = rowNavigator.getCorner(0, i), cellBinding = binder.getCornerCellBinding(cornerItem, !0);
                                cellsString += pivotTable.ElementBuilder.build(cellBinding, BlockedRowLevelWidthMeasureManager.measureRequiredStyles);
                            }
                            this.measureElement.insertAdjacentHTML("beforeend", cellsString);
                            for (var current = this.measureElement.firstChild, width = 0; current; ) width = Math.max(width, current.offsetWidth + 1), 
                            current = current.nextSibling;
                            this.measureElement.innerHTML = "", this.width = width;
                        }
                    }, SteppedRowLevelWidthMeasureManager.prototype.getHeadersWidth = function() {
                        return this.width;
                    }, SteppedRowLevelWidthMeasureManager.prototype.getLevelWidth = function(rowLevel) {
                        return this.width;
                    }, SteppedRowLevelWidthMeasureManager.prototype.setLevelWidth = function(level, width) {
                        this.width = width;
                    }, SteppedRowLevelWidthMeasureManager.prototype.getLevelLeft = function(level) {
                        return 0;
                    }, SteppedRowLevelWidthMeasureManager;
                }();
                pivotTable.SteppedRowLevelWidthMeasureManager = SteppedRowLevelWidthMeasureManager;
            }(pivotTable = controls.pivotTable || (controls.pivotTable = {}));
        }(controls = visuals.controls || (visuals.controls = {}));
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var controls;
        !function(controls) {
            var pivotTable;
            !function(pivotTable) {
                var HeaderRendererUtil, isIntersecting = visuals.shapes.Rect.isIntersecting;
                !function(HeaderRendererUtil) {
                    function getHeaderIndices(item, indices, navigator) {
                        var parent = navigator.getParent(item);
                        parent && getHeaderIndices(parent, indices, navigator), indices.push(navigator.getIndex(item));
                    }
                    function getHeaderKey(indices) {
                        for (var key = "", _i = 0, indices_1 = indices; _i < indices_1.length; _i++) {
                            var index = indices_1[_i];
                            key += index + "_";
                        }
                        return key;
                    }
                    function ensureLevelContext(levels, level) {
                        if (level === levels.length) {
                            var currentPosition = levels[level - 1].currentPosition;
                            levels.push({
                                startItem: null,
                                startPosition: currentPosition,
                                currentPosition: currentPosition
                            });
                        }
                    }
                    HeaderRendererUtil.getHeaderIndices = getHeaderIndices, HeaderRendererUtil.getHeaderKey = getHeaderKey, 
                    HeaderRendererUtil.ensureLevelContext = ensureLevelContext;
                }(HeaderRendererUtil = pivotTable.HeaderRendererUtil || (pivotTable.HeaderRendererUtil = {}));
                var RowHeaderRenderer = function() {
                    function RowHeaderRenderer(element, rowHeightMeasureManager, rowLevelWidthMeasureManager, rowHeightResizeHandler, clickHandler, contextMenuHandler) {
                        this.element = element, this.rowHeightMeasureManager = rowHeightMeasureManager, 
                        this.rowLevelWidthMeasureManager = rowLevelWidthMeasureManager, this.rowHeightResizeHandler = rowHeightResizeHandler, 
                        this.clickHandler = clickHandler, this.contextMenuHandler = contextMenuHandler;
                    }
                    return RowHeaderRenderer.prototype.clear = function() {
                        this.element.innerHTML = "", this.headers = {};
                    }, RowHeaderRenderer.prototype.getHierarchyLeafAt = function(floatingRows, index, navigator) {
                        return floatingRows ? navigator.getFloatingHierarchyLeafAt(index) : navigator.getHierarchyLeafAt(index);
                    }, RowHeaderRenderer.prototype.removeUnusedHeaders = function(addedHeaders) {
                        for (var unused = this.getUnusedHeaders(addedHeaders), _i = 0, unused_1 = unused; _i < unused_1.length; _i++) {
                            var headerKey = unused_1[_i];
                            this.element.removeChild(this.getHeader(headerKey).getElement()), this.removeHeader(headerKey);
                        }
                    }, RowHeaderRenderer.prototype.addHeader = function(headerKey) {
                        var header = new pivotTable.PivotTableHeader();
                        return this.headers[headerKey] = header, header;
                    }, RowHeaderRenderer.prototype.removeHeader = function(headerKey) {
                        delete this.headers[headerKey];
                    }, RowHeaderRenderer.prototype.getHeader = function(headerKey) {
                        return this.headers[headerKey];
                    }, RowHeaderRenderer.prototype.getOrAddHeader = function(headerKey) {
                        var header = this.getHeader(headerKey);
                        return header || (header = this.addHeader(headerKey)), header;
                    }, RowHeaderRenderer.prototype.getUnusedHeaders = function(addedHeaders) {
                        var unused = [];
                        for (var headerKey in this.headers) addedHeaders[headerKey] || unused.push(headerKey);
                        return unused;
                    }, RowHeaderRenderer;
                }();
                pivotTable.RowHeaderRenderer = RowHeaderRenderer;
                var BlockedRowHeaderRenderer = function(_super) {
                    function BlockedRowHeaderRenderer() {
                        return null !== _super && _super.apply(this, arguments) || this;
                    }
                    return __extends(BlockedRowHeaderRenderer, _super), BlockedRowHeaderRenderer.prototype.update = function(items, floatingRows, viewportTop, viewportHeight, binder, navigator) {
                        var renderingContext = this.getRenderingContext(floatingRows, viewportTop, viewportHeight, navigator);
                        renderingContext && (items && this.render(items, floatingRows, 0, navigator.getIndex(renderingContext.levelsContext[0].startItem), renderingContext, viewportTop, binder, navigator), 
                        this.removeUnusedHeaders(renderingContext.addedHeaders));
                    }, BlockedRowHeaderRenderer.prototype.getRenderingContext = function(floatingRows, viewportTop, viewportHeight, navigator) {
                        var result;
                        if (result = floatingRows ? {
                            firstLeafIndex: 0,
                            firstLeafTop: 0,
                            lastLeafIndex: navigator.getFloatingHierarchyLeafCount() - 1
                        } : pivotTable.RowMeasurementUtil.getVisibleRange(viewportTop, viewportHeight, this.rowHeightMeasureManager), 
                        !result) return null;
                        var item = this.getHierarchyLeafAt(floatingRows, result.firstLeafIndex, navigator), startItems = [], startTop = result.firstLeafTop;
                        for (startItems.push({
                            startItem: item,
                            currentPosition: startTop,
                            startPosition: startTop
                        }); item; ) {
                            var child = startItems[0];
                            if (item = navigator.getParent(item)) {
                                var top_1 = void 0;
                                top_1 = navigator.isLastItem(child.startItem, navigator.getChildren(item)) && child.currentPosition - viewportTop < 0 ? child.currentPosition : viewportTop, 
                                startItems.unshift({
                                    startItem: item,
                                    currentPosition: top_1,
                                    startPosition: top_1
                                });
                            }
                        }
                        return {
                            currentLeafIndex: result.firstLeafIndex,
                            lastVisibledLeafIndex: result.lastLeafIndex,
                            levelsContext: startItems,
                            addedHeaders: {},
                            done: !1
                        };
                    }, BlockedRowHeaderRenderer.prototype.render = function(items, floatingHierarchy, level, firstVisibleIndex, renderingContext, viewportTop, binder, navigator) {
                        for (var count = items.length, totalHeight = 0, i = firstVisibleIndex; i < count && (totalHeight += this.renderHeader(items[i], items, floatingHierarchy, level, renderingContext, viewportTop, binder, navigator), 
                        !renderingContext.done); i++) ;
                        return totalHeight;
                    }, BlockedRowHeaderRenderer.prototype.renderHeader = function(item, items, floatingHierarchy, level, renderingState, viewportTop, binder, navigator) {
                        var indices = [];
                        HeaderRendererUtil.getHeaderIndices(item, indices, navigator);
                        var headerKey = HeaderRendererUtil.getHeaderKey(indices), header = this.getOrAddHeader(headerKey);
                        renderingState.addedHeaders[headerKey] = header, header.build(this.element, binder.getRowHeaderBinding(item, !1), item, null, this.rowHeightResizeHandler, this.clickHandler, this.contextMenuHandler), 
                        header.setLeft(this.rowLevelWidthMeasureManager.getLevelLeft(navigator.getLevel(item)));
                        var height;
                        if (HeaderRendererUtil.ensureLevelContext(renderingState.levelsContext, level), 
                        navigator.isLeaf(item)) if (height = floatingHierarchy ? this.rowHeightMeasureManager.getFloatingRowHeight(renderingState.currentLeafIndex) : this.rowHeightMeasureManager.getRowHeight(renderingState.currentLeafIndex), 
                        header.setTop(renderingState.levelsContext[level].currentPosition), header.setHeight(height), 
                        renderingState.currentLeafIndex === renderingState.lastVisibledLeafIndex) renderingState.done = !0; else {
                            renderingState.currentLeafIndex++;
                            for (var l = level; l < renderingState.levelsContext.length; l++) renderingState.levelsContext[l].currentPosition += height;
                        } else {
                            var firstVisibleIndex = void 0;
                            firstVisibleIndex = renderingState.levelsContext[level].startItem === item ? navigator.getIndex(renderingState.levelsContext[level + 1].startItem) : 0;
                            var childrenHeight = this.render(navigator.getChildren(item), floatingHierarchy, level + 1, firstVisibleIndex, renderingState, viewportTop, binder, navigator);
                            header.setTop(renderingState.levelsContext[level].currentPosition), height = renderingState.levelsContext[level].startItem === item && renderingState.levelsContext[level].startPosition === viewportTop ? childrenHeight + renderingState.levelsContext[level + 1].startPosition - viewportTop : childrenHeight, 
                            header.setHeight(height), renderingState.levelsContext[level].currentPosition += height;
                        }
                        return header.setWidth(this.rowLevelWidthMeasureManager.getWidth(navigator.getLevel(item), pivotTable.PivotTableHierarchyNavigator.getHeaderSpan(item, navigator))), 
                        height;
                    }, BlockedRowHeaderRenderer;
                }(RowHeaderRenderer);
                pivotTable.BlockedRowHeaderRenderer = BlockedRowHeaderRenderer;
                var SteppedRowHeaderRenderer = function(_super) {
                    function SteppedRowHeaderRenderer() {
                        return null !== _super && _super.apply(this, arguments) || this;
                    }
                    return __extends(SteppedRowHeaderRenderer, _super), SteppedRowHeaderRenderer.prototype.update = function(items, floatingRows, viewportTop, viewportHeight, binder, navigator) {
                        var renderingContext = this.getRenderingContext(floatingRows, viewportTop, viewportHeight, navigator);
                        return renderingContext ? (this.render(floatingRows, renderingContext, binder, navigator), 
                        void this.removeUnusedHeaders(renderingContext.addedHeaders)) : null;
                    }, SteppedRowHeaderRenderer.prototype.clear = function() {
                        this.element.innerHTML = "", this.headers = {};
                    }, SteppedRowHeaderRenderer.prototype.render = function(floatingRows, renderingContext, binder, navigator) {
                        for (var top = renderingContext.startTop, index = renderingContext.currentLeafIndex; index <= renderingContext.lastVisibledLeafIndex; index++) {
                            var indices = [], item = this.getHierarchyLeafAt(floatingRows, index, navigator);
                            HeaderRendererUtil.getHeaderIndices(item, indices, navigator);
                            var headerKey = HeaderRendererUtil.getHeaderKey(indices), header = this.getOrAddHeader(headerKey);
                            header.build(this.element, binder.getRowHeaderBinding(item, !1), item, null, this.rowHeightResizeHandler, this.clickHandler, this.contextMenuHandler);
                            var height = void 0;
                            height = floatingRows ? this.rowHeightMeasureManager.getFloatingRowHeight(index) : this.rowHeightMeasureManager.getRowHeight(index), 
                            header.setTop(top), header.setHeight(height), renderingContext.addedHeaders[headerKey] = header, 
                            header.setWidth(this.rowLevelWidthMeasureManager.getHeadersWidth()), top += height;
                        }
                    }, SteppedRowHeaderRenderer.prototype.getRenderingContext = function(floatingRows, viewportTop, viewportHeight, navigator) {
                        var result;
                        return result = floatingRows ? {
                            firstLeafIndex: 0,
                            firstLeafTop: 0,
                            lastLeafIndex: navigator.getFloatingHierarchyLeafCount() - 1
                        } : pivotTable.RowMeasurementUtil.getVisibleRange(viewportTop, viewportHeight, this.rowHeightMeasureManager), 
                        result ? {
                            currentLeafIndex: result.firstLeafIndex,
                            lastVisibledLeafIndex: result.lastLeafIndex,
                            startTop: result.firstLeafTop,
                            addedHeaders: {},
                            done: !1
                        } : null;
                    }, SteppedRowHeaderRenderer;
                }(RowHeaderRenderer);
                pivotTable.SteppedRowHeaderRenderer = SteppedRowHeaderRenderer;
                var ColumnHeaderRenderer = function() {
                    function ColumnHeaderRenderer(element, columnWidthMeasureManager, columnLevelHeightMeasureManager, columnWidthResizeHandler, clickHandler, contextMenuHandler) {
                        this.element = element, this.columnWidthMeasureManager = columnWidthMeasureManager, 
                        this.columnLevelHeightMeasureManager = columnLevelHeightMeasureManager, this.columnWidthResizeHandler = columnWidthResizeHandler, 
                        this.clickHandler = clickHandler, this.contextMenuHandler = contextMenuHandler;
                    }
                    return ColumnHeaderRenderer.prototype.clear = function() {
                        this.element.innerHTML = "", this.headers = {};
                    }, ColumnHeaderRenderer.prototype.update = function(viewportLeft, viewportWidth, binder, navigator) {
                        var renderingContext = this.getRenderingContext(viewportLeft, viewportWidth, navigator);
                        if (renderingContext) {
                            var items = navigator.getHierarchyItems();
                            items && this.render(items, 0, navigator.getIndex(renderingContext.levelsContext[0].startItem), renderingContext, viewportLeft, binder, navigator), 
                            this.removeUnusedHeaders(renderingContext.addedHeaders);
                        }
                    }, ColumnHeaderRenderer.prototype.getRenderingContext = function(viewportLeft, viewportWidth, navigator) {
                        var visibleRange = pivotTable.ColumnMeasurementUtil.getVisibleRange(viewportLeft, viewportWidth, this.columnWidthMeasureManager);
                        if (!visibleRange) return null;
                        var item = navigator.getHierarchyLeafAt(visibleRange.firstLeafIndex), startItems = [], startLeft = visibleRange.firstLeafLeft;
                        for (startItems.push({
                            startItem: item,
                            currentPosition: startLeft,
                            startPosition: startLeft
                        }); item; ) {
                            var child = startItems[0];
                            if (item = navigator.getParent(item)) {
                                var left = void 0;
                                left = navigator.isLastItem(child.startItem, navigator.getChildren(item)) && child.currentPosition - viewportLeft < 0 ? child.currentPosition : viewportLeft, 
                                startItems.unshift({
                                    startItem: item,
                                    currentPosition: left,
                                    startPosition: left
                                });
                            }
                        }
                        return {
                            currentLeafIndex: visibleRange.firstLeafIndex,
                            lastVisibledLeafIndex: visibleRange.lastLeafIndex,
                            levelsContext: startItems,
                            addedHeaders: {},
                            done: !1
                        };
                    }, ColumnHeaderRenderer.prototype.removeUnusedHeaders = function(addedHeaders) {
                        for (var unused = this.getUnusedHeaders(addedHeaders), _i = 0, unused_2 = unused; _i < unused_2.length; _i++) {
                            var headerKey = unused_2[_i];
                            this.element.removeChild(this.getHeader(headerKey).getElement()), this.removeHeader(headerKey);
                        }
                    }, ColumnHeaderRenderer.prototype.render = function(items, level, firstVisibleIndex, renderingContext, viewportLeft, binder, navigator) {
                        for (var count = items.length, totalWidth = 0, i = firstVisibleIndex; i < count && (totalWidth += this.renderHeader(items[i], items, level, renderingContext, viewportLeft, binder, navigator), 
                        !renderingContext.done); i++) ;
                        return totalWidth;
                    }, ColumnHeaderRenderer.prototype.getHeight = function(level, rowSpan) {
                        for (var height = 0, i = level; i < level + rowSpan; i++) height += this.columnLevelHeightMeasureManager.getLevelHeight(i);
                        return height;
                    }, ColumnHeaderRenderer.prototype.renderHeader = function(item, items, level, renderingState, viewportLeft, binder, navigator) {
                        var indices = [];
                        HeaderRendererUtil.getHeaderIndices(item, indices, navigator);
                        var headerKey = HeaderRendererUtil.getHeaderKey(indices), header = this.getOrAddHeader(headerKey);
                        renderingState.addedHeaders[headerKey] = header, header.build(this.element, binder.getColumnHeaderBinding(item, !1), item, this.columnWidthResizeHandler, null, this.clickHandler, this.contextMenuHandler), 
                        header.setTop(this.columnLevelHeightMeasureManager.getLevelTop(navigator.getLevel(item)));
                        var width;
                        if (HeaderRendererUtil.ensureLevelContext(renderingState.levelsContext, level), 
                        navigator.isLeaf(item)) if (width = this.columnWidthMeasureManager.getColumnWidth(renderingState.currentLeafIndex), 
                        header.setLeft(renderingState.levelsContext[level].currentPosition), header.setWidth(width), 
                        renderingState.currentLeafIndex === renderingState.lastVisibledLeafIndex) renderingState.done = !0; else {
                            renderingState.currentLeafIndex++;
                            for (var l = level; l < renderingState.levelsContext.length; l++) renderingState.levelsContext[l].currentPosition += width;
                        } else {
                            var firstVisibleIndex = void 0;
                            firstVisibleIndex = renderingState.levelsContext[level].startItem === item ? navigator.getIndex(renderingState.levelsContext[level + 1].startItem) : 0;
                            var childrenWidth = this.render(navigator.getChildren(item), level + 1, firstVisibleIndex, renderingState, viewportLeft, binder, navigator);
                            header.setLeft(renderingState.levelsContext[level].currentPosition), width = renderingState.levelsContext[level].startItem === item && renderingState.levelsContext[level].startPosition === viewportLeft ? childrenWidth + renderingState.levelsContext[level + 1].startPosition - viewportLeft : childrenWidth, 
                            header.setWidth(width), renderingState.levelsContext[level].currentPosition += width;
                        }
                        return header.setHeight(this.getHeight(navigator.getLevel(item), pivotTable.PivotTableHierarchyNavigator.getHeaderSpan(item, navigator))), 
                        width;
                    }, ColumnHeaderRenderer.prototype.addHeader = function(headerKey) {
                        var header = new pivotTable.PivotTableHeader();
                        return this.headers[headerKey] = header, header;
                    }, ColumnHeaderRenderer.prototype.removeHeader = function(headerKey) {
                        delete this.headers[headerKey];
                    }, ColumnHeaderRenderer.prototype.getHeader = function(headerKey) {
                        return this.headers[headerKey];
                    }, ColumnHeaderRenderer.prototype.getOrAddHeader = function(headerKey) {
                        var header = this.getHeader(headerKey);
                        return header || (header = this.addHeader(headerKey)), header;
                    }, ColumnHeaderRenderer.prototype.getUnusedHeaders = function(addedHeaders) {
                        var unused = [];
                        for (var headerKey in this.headers) addedHeaders[headerKey] || unused.push(headerKey);
                        return unused;
                    }, ColumnHeaderRenderer;
                }();
                pivotTable.ColumnHeaderRenderer = ColumnHeaderRenderer;
                var BodyCellRenderer = function() {
                    function BodyCellRenderer(element, columnWidthMeasureManager, rowHeightMeasureManager, clickHandler, contextMenuHandler, workScheduler) {
                        this.element = element, this.columnWidthMeasureManager = columnWidthMeasureManager, 
                        this.rowHeightMeasureManager = rowHeightMeasureManager, this.clickHandler = clickHandler, 
                        this.contextMenuHandler = contextMenuHandler, this.workScheduler = workScheduler;
                    }
                    return BodyCellRenderer.prototype.removeRowPages = function(rowIndex) {
                        for (var columnIndex = 0; columnIndex < this.columnWidthMeasureManager.getPageColumns().length; columnIndex++) {
                            var page = this.getPage(rowIndex, columnIndex);
                            page && (this.element.removeChild(page.getElement()), this.removePage(rowIndex, columnIndex));
                        }
                    }, BodyCellRenderer.prototype.update = function(viewport, floatingRows, binder, rowNavigator, columnNavigator, defer) {
                        for (var left = 0, columnIndex = 0, _i = 0, _a = this.columnWidthMeasureManager.getPageColumns(); _i < _a.length; _i++) {
                            var pageColumn = _a[_i], top_2 = 0, rowIndex = 0, width = pageColumn.getWidth(), pageRows = void 0;
                            pageRows = floatingRows ? [ this.rowHeightMeasureManager.getFloatingPageRow() ] : this.rowHeightMeasureManager.getPageRows();
                            for (var _b = 0, pageRows_1 = pageRows; _b < pageRows_1.length; _b++) {
                                var pageRow = pageRows_1[_b], height = pageRow.getHeight();
                                if (this.rectsOverlap(left, top_2, width, height, viewport.left, viewport.top, viewport.width, viewport.height)) this.addBodyPage(viewport, rowIndex, columnIndex, left, top_2, width, height, pageRow, pageColumn, floatingRows, binder, rowNavigator, columnNavigator, defer); else {
                                    var page = this.getPage(rowIndex, columnIndex);
                                    page && this.removeBodyPageAsync(viewport, rowIndex, columnIndex, left, top_2, width, height);
                                }
                                top_2 += height, rowIndex++;
                            }
                            left += width, columnIndex++;
                        }
                    }, BodyCellRenderer.prototype.clear = function() {
                        this.element.innerHTML = "", this.pages = {};
                    }, BodyCellRenderer.prototype.resizeColumn = function(columnIndex) {
                        var pageColumnIndex = pivotTable.MeasureUtil.getPageIndex(columnIndex, pivotTable.PageColumnCount), index = columnIndex % pivotTable.PageColumnCount;
                        for (var key in this.pages) {
                            var page = this.pages[key], pageColumn = this.columnWidthMeasureManager.getPageColumns()[page.columnIndex];
                            page.columnIndex === pageColumnIndex ? page.resizeColumn(index, pageColumn) : page.columnIndex > pageColumnIndex && (page.getElement().style.left = pivotTable.PivotTableControl.pixelUnits(this.columnWidthMeasureManager.getPageColumnLeft(pageColumn)));
                        }
                    }, BodyCellRenderer.prototype.resizRows = function(startRowIndex, endRowIndex) {
                        var ranges = pivotTable.MeasureUtil.itemRangeToPageRange(startRowIndex, endRowIndex, pivotTable.PageRowCount);
                        for (var key in this.pages) for (var page = this.pages[key], _i = 0, ranges_2 = ranges; _i < ranges_2.length; _i++) {
                            var range = ranges_2[_i];
                            if (range.pageIndex === page.rowIndex) {
                                this.resizePageRows(page, this.rowHeightMeasureManager.getPageRows()[range.pageIndex], range.startIndex, range.endIndex);
                                break;
                            }
                        }
                        for (var key in this.pages) {
                            var page = this.pages[key], pageRow = this.rowHeightMeasureManager.getPageRows()[page.rowIndex];
                            page.getElement().style.top = pivotTable.PivotTableControl.pixelUnits(this.rowHeightMeasureManager.getPageRowTop(pageRow));
                        }
                    }, BodyCellRenderer.prototype.resizePageRows = function(page, pageRow, startIndex, endIndex) {
                        var pageElement = page.getElement();
                        if (pageElement) {
                            for (var currentColumn = pageElement.firstChild; currentColumn; ) this.resizeCellsHeight(currentColumn, pageRow, startIndex, endIndex), 
                            currentColumn = currentColumn.nextSibling;
                            pageElement.style.height = pivotTable.PivotTableControl.pixelUnits(pageRow.getHeight());
                        }
                    }, BodyCellRenderer.prototype.resizeCellsHeight = function(columnElement, pageRow, startIndex, endIndex) {
                        var cell = columnElement.firstChild;
                        if (cell) {
                            for (var i = 0; i < startIndex; i++) if (cell = cell.nextSibling, !cell) return;
                            for (var i = startIndex; i <= endIndex; i++) if (cell.style.height = pivotTable.PivotTableControl.pixelUnits(pageRow.getRowHeights()[i]), 
                            cell = cell.nextSibling, !cell) return;
                        }
                    }, BodyCellRenderer.prototype.addPage = function(rowIndex, columnIndex) {
                        var page = new pivotTable.PivotTableBodyPage(rowIndex, columnIndex);
                        return this.pages[this.getPageKey(rowIndex, columnIndex)] = page, page;
                    }, BodyCellRenderer.prototype.removePage = function(rowIndex, columnIndex) {
                        delete this.pages[this.getPageKey(rowIndex, columnIndex)];
                    }, BodyCellRenderer.prototype.getPage = function(rowIndex, columnIndex) {
                        return this.pages[this.getPageKey(rowIndex, columnIndex)];
                    }, BodyCellRenderer.prototype.getPageKey = function(rowIndex, columnIndex) {
                        return rowIndex.toString() + "_" + columnIndex.toString();
                    }, BodyCellRenderer.prototype.addBodyPage = function(viewport, rowIndex, columnIndex, left, top, width, height, pageRow, pageColumn, floatingRows, binder, rowNavigator, columnNavigator, defer) {
                        var _this = this, updateCallback = function() {
                            if (_this.rectsOverlap(left, top, width, height, viewport.left, viewport.top, viewport.width, viewport.height)) {
                                var page = _this.getPage(rowIndex, columnIndex);
                                if (!page) {
                                    var rowStartOffset = _this.rowHeightMeasureManager.getPageRowStartIndex(pageRow), columnStartOffset = _this.columnWidthMeasureManager.getPageColumnStartIndex(pageColumn);
                                    rowStartOffset !== -1 && columnStartOffset !== -1 && (page = _this.addPage(rowIndex, columnIndex), 
                                    page.build(_this.element, rowStartOffset, columnStartOffset, _this.rowHeightMeasureManager, _this.columnWidthMeasureManager, pageRow, pageColumn, floatingRows, rowNavigator, columnNavigator, binder, _this.clickHandler, _this.contextMenuHandler));
                                }
                            }
                        };
                        defer ? this.workScheduler.scheduleAnimationFrameTask(updateCallback) : updateCallback();
                    }, BodyCellRenderer.prototype.removeBodyPageAsync = function(viewport, rowIndex, columnIndex, left, top, width, height) {
                        var _this = this;
                        this.workScheduler.scheduleAnimationFrameTask(function() {
                            if (!_this.rectsOverlap(left, top, width, height, viewport.left, viewport.top, viewport.width, viewport.height)) {
                                var page = _this.getPage(rowIndex, columnIndex);
                                page && (_this.element.removeChild(page.getElement()), _this.removePage(rowIndex, columnIndex));
                            }
                        });
                    }, BodyCellRenderer.prototype.rectsOverlap = function(left1, top1, width1, height1, left2, top2, width2, height2) {
                        return isIntersecting({
                            left: left1,
                            top: top1,
                            width: width1,
                            height: height1
                        }, {
                            left: left2,
                            top: top2,
                            width: width2,
                            height: height2
                        });
                    }, BodyCellRenderer;
                }();
                pivotTable.BodyCellRenderer = BodyCellRenderer;
                var CornerRenderer = function() {
                    function CornerRenderer(element, columnLevelHeightMeasureManager, rowLevelWidthMeasureManager, columnLevelHeightResizeHandler, rowLevelWidthResizeHandler, clickHandler, contextMenuHandler) {
                        this.headers = {}, this.element = element, this.columnLevelHeightMeasureManager = columnLevelHeightMeasureManager, 
                        this.rowLevelWidthMeasureManager = rowLevelWidthMeasureManager, this.columnLevelHeightResizeHandler = columnLevelHeightResizeHandler, 
                        this.rowLevelWidthResizeHandler = rowLevelWidthResizeHandler, this.clickHandler = clickHandler, 
                        this.contextMenuHandler = contextMenuHandler;
                    }
                    return CornerRenderer.prototype.update = function(binder, rowNavigator, columnNavigator) {
                        for (var rowCount = rowNavigator.getHierarchyDepth(), columnCount = columnNavigator.getHierarchyDepth(), row = 0; row < rowCount; row++) for (var column = 0; column < columnCount; column++) this.renderHeader(row, column, binder, rowNavigator);
                    }, CornerRenderer.prototype.clear = function() {
                        this.element.innerHTML = "", this.headers = {};
                    }, CornerRenderer.prototype.renderHeader = function(row, column, binder, rowNavigator) {
                        var cornerHeader = rowNavigator.getCorner(row, column), key = HeaderRendererUtil.getHeaderKey([ row, column ]), header = this.getOrAddHeader(key), binding = binder.getCornerCellBinding(cornerHeader, !1);
                        header.build(this.element, binding, cornerHeader, this.rowLevelWidthResizeHandler, this.columnLevelHeightResizeHandler, this.clickHandler, this.contextMenuHandler);
                        var width = this.rowLevelWidthMeasureManager.getLevelWidth(row), left = this.rowLevelWidthMeasureManager.getLevelLeft(row), height = this.columnLevelHeightMeasureManager.getLevelHeight(column), top = this.columnLevelHeightMeasureManager.getLevelTop(column);
                        header.setHeight(height), header.setWidth(width), header.setTop(top), header.setLeft(left);
                    }, CornerRenderer.prototype.addHeader = function(headerKey) {
                        var header = new pivotTable.PivotTableHeader();
                        return this.headers[headerKey] = header, header;
                    }, CornerRenderer.prototype.getHeader = function(headerKey) {
                        return this.headers[headerKey];
                    }, CornerRenderer.prototype.getOrAddHeader = function(headerKey) {
                        return this.getHeader(headerKey) || this.addHeader(headerKey);
                    }, CornerRenderer;
                }();
                pivotTable.CornerRenderer = CornerRenderer;
            }(pivotTable = controls.pivotTable || (controls.pivotTable = {}));
        }(controls = visuals.controls || (visuals.controls = {}));
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var controls;
        !function(controls) {
            var pivotTable;
            !function(pivotTable) {
                var BrowserUtils = jsCommon.BrowserUtils;
                pivotTable.ScrollbarWidth = 9;
                var PivotTableRenderingMode, PivotTableTemplate = "<div style='position:relative'><div class='innerContainer' style='position:absolute;left:0;top:0;right:0;bottom:0'><div class='corner' ></div><div class='columnHeaders' style='position:absolute;overflow:auto;right:0;top:0;-ms-overflow-style:none'><div></div></div><div class='rowHeaders' style='position:absolute;overflow:auto;left:0;bottom:0;-ms-overflow-style:none'><div></div></div><div class='bodyCells' style='position:absolute;overflow:auto;left:0;top:0;right:0;bottom:0;-ms-overflow-style:none;box-sizing:border-box'><div style='position:absolute;overflow:hidden'></div></div><div class='floatingRowHeader' style='position:absolute;left:0'></div><div class='floatingBodyCells' style='position:absolute;overflow:auto;right:0;-ms-overflow-style:none'><div></div></div></div><div class='measureElement' style='position:absolute;left:0;top:0;visibility:hidden'></div></div>";
                !function(PivotTableRenderingMode) {
                    PivotTableRenderingMode[PivotTableRenderingMode.Incremental = 0] = "Incremental", 
                    PivotTableRenderingMode[PivotTableRenderingMode.ClearRendering = 1] = "ClearRendering", 
                    PivotTableRenderingMode[PivotTableRenderingMode.ClearMeasurement = 2] = "ClearMeasurement";
                }(PivotTableRenderingMode = pivotTable.PivotTableRenderingMode || (pivotTable.PivotTableRenderingMode = {}));
                var PivotTableControl = function() {
                    function PivotTableControl(parent, sizeManager, options) {
                        var _this = this;
                        this.workScheduler = new powerbi.WorkScheduler(), this.sizeManager = sizeManager, 
                        parent.insertAdjacentHTML("beforeend", PivotTableTemplate), this.element = parent.lastChild, 
                        this.innerContainer = this.element.querySelector(".innerContainer"), this.measureElement = this.element.querySelector(".measureElement"), 
                        this.cornerContainer = this.element.querySelector(".corner"), this.cornerContainer.setAttribute("drag-resize-disabled", "true"), 
                        this.columnHeaderContainer = this.element.querySelector(".columnHeaders"), this.innerColumnHeaderContainer = this.columnHeaderContainer.firstChild, 
                        this.innerColumnHeaderContainer.setAttribute("drag-resize-disabled", "true"), this.rowHeaderContainer = this.element.querySelector(".rowHeaders"), 
                        this.innerRowHeaderContainer = this.rowHeaderContainer.firstChild, this.innerColumnHeaderContainer.setAttribute("drag-resize-disabled", "true"), 
                        this.bodyCellContainer = this.element.querySelector(".bodyCells"), this.innerBodyCellContainer = this.bodyCellContainer.firstChild, 
                        this.floatingRowHeaderContainer = this.element.querySelector(".floatingRowHeader"), 
                        this.floatingBodyCellContainer = this.element.querySelector(".floatingBodyCells"), 
                        this.innerFloatingBodyCellContainer = this.floatingBodyCellContainer.firstChild, 
                        this.options = options, this.initializeContainersForScrolling(this.options.scrollingEnabled), 
                        this.initializeScrollbars(), this.options.whitespaceClickHandler && this.innerContainer.addEventListener("click", function(mouseEvent) {
                            return _this.onClick(mouseEvent);
                        }), this.options.columnResizingEnabled && (this.columnWidthResizeHandler = new pivotTable.ColumnWidthResizeHandler(this)), 
                        this.options.rowLevelResizingEnabled && (this.rowLevelWidthResizeHandler = new pivotTable.RowLevelWidthResizeHandler(this)), 
                        this.setSteppedLayout(!1);
                    }
                    return PivotTableControl.prototype.initializeContainersForScrolling = function(scrollingEnabled) {
                        var _this = this;
                        scrollingEnabled ? (this.bodyCellContainer.addEventListener("scroll", function() {
                            return _this.onBodyCellContainerScroll();
                        }), this.columnHeaderContainer.addEventListener("scroll", function() {
                            return _this.onColumnHeaderContainerScroll();
                        }), this.rowHeaderContainer.addEventListener("scroll", function() {
                            return _this.onRowHeaderContainerScroll();
                        }), this.floatingBodyCellContainer.addEventListener("scroll", function() {
                            return _this.onFloatingBodyCellContainerScroll();
                        }), this.columnHeaderContainer.addEventListener("wheel", function(e) {
                            return _this.onWheel(e);
                        }), this.cornerContainer.addEventListener("wheel", function(e) {
                            return _this.onWheel(e);
                        }), this.floatingRowHeaderContainer.addEventListener("wheel", function(e) {
                            return _this.onWheel(e);
                        }), this.floatingBodyCellContainer.addEventListener("wheel", function(e) {
                            return _this.onWheel(e);
                        }), BrowserUtils.isFirefox() && (this.columnHeaderContainer.style.overflow = this.rowHeaderContainer.style.overflow = this.bodyCellContainer.style.overflow = this.floatingBodyCellContainer.style.overflow = "-moz-scrollbars-none")) : this.columnHeaderContainer.style.overflow = this.bodyCellContainer.style.overflow = this.rowHeaderContainer.style.overflow = this.floatingBodyCellContainer.style.overflow = "hidden";
                    }, PivotTableControl.prototype.onBodyCellContainerScroll = function() {
                        this.scriptUpdatedBodyVerticalToggle ? this.scriptUpdatedBodyVerticalToggle = !1 : (this.scriptUpdatedRowToggle = !0, 
                        this.rowScrollbar.viewMin = this.rowHeaderContainer.scrollTop = this.bodyCellContainer.scrollTop), 
                        this.scriptUpdatedBodyHorizontalToggle ? this.scriptUpdatedBodyHorizontalToggle = !1 : (this.scriptUpdatedColumnToggle = !0, 
                        this.scriptUpdatedFloatingBodyToggle = !0, this.columnScrollbar.viewMin = this.columnHeaderContainer.scrollLeft = this.floatingBodyCellContainer.scrollLeft = this.bodyCellContainer.scrollLeft), 
                        (this.scriptUpdatedRowToggle || this.scriptUpdatedColumnToggle) && this.refreshScrollbarsAndRender();
                    }, PivotTableControl.prototype.onColumnHeaderContainerScroll = function() {
                        return this.scriptUpdatedColumnToggle ? void (this.scriptUpdatedColumnToggle = !1) : (this.scriptUpdatedBodyHorizontalToggle = !0, 
                        this.scriptUpdatedFloatingBodyToggle = !0, this.columnScrollbar.viewMin = this.bodyCellContainer.scrollLeft = this.floatingBodyCellContainer.scrollLeft = this.columnHeaderContainer.scrollLeft, 
                        void this.refreshScrollbarsAndRender());
                    }, PivotTableControl.prototype.onRowHeaderContainerScroll = function() {
                        return this.scriptUpdatedRowToggle ? void (this.scriptUpdatedRowToggle = !1) : (this.scriptUpdatedBodyVerticalToggle = !0, 
                        this.rowScrollbar.viewMin = this.bodyCellContainer.scrollTop = this.rowHeaderContainer.scrollTop, 
                        void this.refreshScrollbarsAndRender());
                    }, PivotTableControl.prototype.onFloatingBodyCellContainerScroll = function() {
                        return this.scriptUpdatedFloatingBodyToggle ? void (this.scriptUpdatedFloatingBodyToggle = !1) : (this.scriptUpdatedBodyHorizontalToggle = !0, 
                        this.scriptUpdatedColumnToggle = !0, this.columnScrollbar.viewMin = this.bodyCellContainer.scrollLeft = this.columnHeaderContainer.scrollLeft = this.floatingBodyCellContainer.scrollLeft, 
                        void this.refreshScrollbarsAndRender());
                    }, PivotTableControl.prototype.scrollTo = function(rowScrollOffset, columnScrollOffset) {
                        this.rowHeaderContainer.scrollTop = this.bodyCellContainer.scrollTop = rowScrollOffset, 
                        this.columnHeaderContainer.scrollLeft = this.floatingBodyCellContainer.scrollLeft = this.bodyCellContainer.scrollLeft = columnScrollOffset, 
                        this.rowScrollbar.viewMin = this.bodyCellContainer.scrollTop, this.columnScrollbar.viewMin = this.bodyCellContainer.scrollLeft, 
                        this.render(PivotTableRenderingMode.Incremental);
                    }, PivotTableControl.prototype.onWheel = function(e) {
                        this.rowScrollbar.visible && e.deltaY && this.rowScrollbar.onMouseWheel(-e.deltaY);
                    }, PivotTableControl.prototype.onClick = function(mouseEvent) {
                        var contentWidth = this.rowLevelWidthMeasureManager.getHeadersWidth() + this.columnWidthMeasureManager.getColumnsWidth(), contentHeight = this.columnLevelHeightMeasureManager.getHeadersHeight() + this.rowHeightMeasureManager.getRowsHeight() + this.rowHeightMeasureManager.getFloatingRowHeights();
                        if (!(contentWidth >= this.width && contentHeight >= this.height)) {
                            var coordinates = controls.HTMLElementUtils.getRelativeMouseCoordinates(this.element, mouseEvent);
                            (coordinates.x > contentWidth || coordinates.y > contentHeight) && this.options.whitespaceClickHandler(mouseEvent);
                        }
                    }, PivotTableControl.prototype.initializeScrollbars = function() {
                        var _this = this;
                        this.columnScrollbar = new controls.HorizontalScrollbar(this.element, 0), this.columnScrollbar.smallIncrement = 20, 
                        this.columnScrollbar.min = 0, this.columnScrollbar.height = PivotTableControl.pixelUnits(pivotTable.ScrollbarWidth), 
                        this.columnScrollbar.element.style.position = "absolute", this.columnScrollbar.element.style.left = "0", 
                        this.columnScrollbar.element.style.bottom = "0", this.columnScrollbar.element.style.right = PivotTableControl.pixelUnits(pivotTable.ScrollbarWidth), 
                        this.columnScrollbar._onscroll.push(function(e) {
                            return _this.onHorizontalScroll();
                        }), this.rowScrollbar = new controls.VerticalScrollbar(this.element, 0), this.rowScrollbar.smallIncrement = 20, 
                        this.rowScrollbar.min = 0, this.rowScrollbar.width = PivotTableControl.pixelUnits(pivotTable.ScrollbarWidth), 
                        this.rowScrollbar.element.style.position = "absolute", this.rowScrollbar.element.style.right = "0", 
                        this.rowScrollbar.element.style.top = "0", this.rowScrollbar.element.style.bottom = PivotTableControl.pixelUnits(pivotTable.ScrollbarWidth), 
                        this.rowScrollbar._onscroll.push(function(e) {
                            return _this.onVerticalScroll();
                        }), this.scriptUpdatedBodyHorizontalToggle = !1, this.scriptUpdatedBodyVerticalToggle = !1, 
                        this.scriptUpdatedColumnToggle = !1, this.scriptUpdatedRowToggle = !1;
                    }, PivotTableControl.prototype.refreshScrollbarsAndRender = function() {
                        var _this = this;
                        this.rowScrollbar.refresh(), this.columnScrollbar.refresh(), this.workScheduler.scheduleAnimationFrameTask(function() {
                            return _this.render(PivotTableRenderingMode.Incremental);
                        });
                    }, PivotTableControl.prototype.setSteppedLayout = function(steppedLayout) {
                        steppedLayout !== this.steppedLayout && (this.steppedLayout = steppedLayout, this.columnWidthMeasureManager = new pivotTable.ColumnWidthMeasureManager(this.measureElement, this.sizeManager), 
                        this.steppedLayout ? (this.rowLevelWidthMeasureManager = new pivotTable.SteppedRowLevelWidthMeasureManager(this.measureElement, this.sizeManager), 
                        this.rowHeightMeasureManager = new pivotTable.SteppedRowHeightMeasureManager(this.measureElement, this.columnWidthMeasureManager, this.rowLevelWidthMeasureManager, this.sizeManager)) : (this.rowLevelWidthMeasureManager = new pivotTable.BlockedRowLevelWidthMeasureManager(this.measureElement, this.sizeManager), 
                        this.rowHeightMeasureManager = new pivotTable.BlockedRowHeightMeasureManager(this.measureElement, this.columnWidthMeasureManager, this.rowLevelWidthMeasureManager, this.sizeManager)), 
                        this.columnLevelHeightMeasureManager = new pivotTable.ColumnLevelHeightMeasureManager(this.measureElement, this.columnWidthMeasureManager, this.rowLevelWidthMeasureManager, this.sizeManager), 
                        this.steppedLayout ? (this.rowHeaderRenderer = new pivotTable.SteppedRowHeaderRenderer(this.innerRowHeaderContainer, this.rowHeightMeasureManager, this.rowLevelWidthMeasureManager, this.rowHeightResizeHandler, this.options.rowHeaderClickHandler, this.options.rowHeaderContextMenuHandler), 
                        this.floatingRowHeaderRenderer = new pivotTable.SteppedRowHeaderRenderer(this.floatingRowHeaderContainer, this.rowHeightMeasureManager, this.rowLevelWidthMeasureManager, this.rowHeightResizeHandler, this.options.rowHeaderClickHandler, this.options.rowHeaderContextMenuHandler)) : (this.rowHeaderRenderer = new pivotTable.BlockedRowHeaderRenderer(this.innerRowHeaderContainer, this.rowHeightMeasureManager, this.rowLevelWidthMeasureManager, this.rowHeightResizeHandler, this.options.rowHeaderClickHandler, this.options.rowHeaderContextMenuHandler), 
                        this.floatingRowHeaderRenderer = new pivotTable.BlockedRowHeaderRenderer(this.floatingRowHeaderContainer, this.rowHeightMeasureManager, this.rowLevelWidthMeasureManager, this.rowHeightResizeHandler, this.options.rowHeaderClickHandler, this.options.rowHeaderContextMenuHandler)), 
                        this.columnHeaderRenderer = new pivotTable.ColumnHeaderRenderer(this.innerColumnHeaderContainer, this.columnWidthMeasureManager, this.columnLevelHeightMeasureManager, this.columnWidthResizeHandler, this.options.columnHeaderClickHandler, this.options.columnHeaderContextMenuHandler), 
                        this.bodyCellRenderer = new pivotTable.BodyCellRenderer(this.innerBodyCellContainer, this.columnWidthMeasureManager, this.rowHeightMeasureManager, this.options.bodyCellClickHandler, this.options.bodyCellContextMenuHandler, this.workScheduler), 
                        this.cornerRenderer = new pivotTable.CornerRenderer(this.cornerContainer, this.columnLevelHeightMeasureManager, this.rowLevelWidthMeasureManager, this.columnLevelHeightResizeHandler, this.rowLevelWidthResizeHandler, this.options.cornerCellClickHandler, this.options.cornerCellContextMenuHandler), 
                        this.floatingBodyCellRenderer = new pivotTable.BodyCellRenderer(this.innerFloatingBodyCellContainer, this.columnWidthMeasureManager, this.rowHeightMeasureManager, this.options.bodyCellClickHandler, this.options.bodyCellContextMenuHandler, this.workScheduler), 
                        this.clear(PivotTableRenderingMode.ClearMeasurement));
                    }, PivotTableControl.prototype.clearBodyPages = function() {
                        this.bodyCellRenderer.clear(), this.floatingBodyCellRenderer.clear();
                    }, PivotTableControl.prototype.rebuildBodyPagesSync = function() {
                        this.clearBodyPages();
                        var viewport = this.getViewport();
                        this.bodyCellRenderer.update(viewport, !1, this.binder, this.rowNavigator, this.columnNavigator, !1);
                        var floatingHierarchyItems = this.rowNavigator.getFloatingHierarchyItems();
                        if (floatingHierarchyItems) {
                            var floatingRowHeights = this.rowHeightMeasureManager.getFloatingRowHeights();
                            this.floatingBodyCellRenderer.update({
                                left: viewport.left,
                                top: 0,
                                width: viewport.width,
                                height: floatingRowHeights
                            }, !0, this.binder, this.rowNavigator, this.columnNavigator, !1);
                        }
                    }, PivotTableControl.prototype.setWidth = function(width) {
                        this.width = width, this.element.style.width = PivotTableControl.pixelUnits(this.width), 
                        this.columnScrollbar.invalidateArrange();
                    }, PivotTableControl.prototype.setHeight = function(height) {
                        this.height = height, this.element.style.height = PivotTableControl.pixelUnits(this.height), 
                        this.rowScrollbar.invalidateArrange();
                    }, PivotTableControl.prototype.getCornerContainer = function() {
                        return this.cornerContainer;
                    }, PivotTableControl.prototype.getColumnHeaderContainer = function() {
                        return this.columnHeaderContainer;
                    }, PivotTableControl.prototype.getRowHeaderContainer = function() {
                        return this.rowHeaderContainer;
                    }, PivotTableControl.prototype.getBodyCellContainer = function() {
                        return this.bodyCellContainer;
                    }, PivotTableControl.prototype.getFloatingRowHeaderContainer = function() {
                        return this.floatingRowHeaderContainer;
                    }, PivotTableControl.prototype.getFloatingBodyCellContainer = function() {
                        return this.floatingBodyCellContainer;
                    }, PivotTableControl.prototype.setClassName = function(value) {
                        this.element.className = value;
                    }, PivotTableControl.prototype.setColumnNavigator = function(hierarchyNavigator) {
                        this.columnNavigator = hierarchyNavigator;
                    }, PivotTableControl.prototype.setRowNavigator = function(hierarchyNavigator) {
                        this.rowNavigator = hierarchyNavigator;
                    }, PivotTableControl.prototype.setBinder = function(binder) {
                        this.binder = binder;
                    }, PivotTableControl.prototype.getSteppedLayout = function() {
                        return this.steppedLayout;
                    }, PivotTableControl.prototype.getColumnNavigator = function() {
                        return this.columnNavigator;
                    }, PivotTableControl.prototype.getRowNavigator = function() {
                        return this.rowNavigator;
                    }, PivotTableControl.prototype.getSizeManager = function() {
                        return this.sizeManager;
                    }, PivotTableControl.prototype.getBinder = function() {
                        return this.binder;
                    }, PivotTableControl.prototype.getColumnWidthMeasureManager = function() {
                        return this.columnWidthMeasureManager;
                    }, PivotTableControl.prototype.getRowHeightMeasureManager = function() {
                        return this.rowHeightMeasureManager;
                    }, PivotTableControl.prototype.getColumnLevelHeightMeasureManager = function() {
                        return this.columnLevelHeightMeasureManager;
                    }, PivotTableControl.prototype.getRowLevelWidthMeasureManager = function() {
                        return this.rowLevelWidthMeasureManager;
                    }, PivotTableControl.prototype.getRowHeaderRenderer = function() {
                        return this.rowHeaderRenderer;
                    }, PivotTableControl.prototype.getColumnHeaderRenderer = function() {
                        return this.columnHeaderRenderer;
                    }, PivotTableControl.prototype.getBodyCellRenderer = function() {
                        return this.bodyCellRenderer;
                    }, PivotTableControl.prototype.getCornerRenderer = function() {
                        return this.cornerRenderer;
                    }, PivotTableControl.prototype.getFloatingRowHeaderRenderer = function() {
                        return this.floatingRowHeaderRenderer;
                    }, PivotTableControl.prototype.getFloatingBodyCellRenderer = function() {
                        return this.floatingBodyCellRenderer;
                    }, PivotTableControl.prototype.getViewport = function() {
                        return {
                            left: this.columnScrollbar.viewMin,
                            top: this.rowScrollbar.viewMin,
                            width: this.width,
                            height: this.height
                        };
                    }, PivotTableControl.prototype.getClientWidth = function() {
                        return this.width - (this.rowScrollbar.visible ? pivotTable.ScrollbarWidth : 0);
                    }, PivotTableControl.prototype.getWorkScheduler = function() {
                        return this.workScheduler;
                    }, PivotTableControl.prototype.render = function(mode) {
                        var _this = this;
                        this.clear(mode);
                        var bodyCellViewport = this.getViewport(), visibleRowRange = pivotTable.RowMeasurementUtil.getVisibleRange(bodyCellViewport.top, bodyCellViewport.height, this.rowHeightMeasureManager), startRowIndex = visibleRowRange ? visibleRowRange.firstLeafIndex : 0, visibleColumnRange = pivotTable.ColumnMeasurementUtil.getVisibleRange(bodyCellViewport.left, bodyCellViewport.width, this.columnWidthMeasureManager), startColumnIndex = visibleColumnRange ? visibleColumnRange.firstLeafIndex : 0;
                        this.rowLevelWidthMeasureManager.measure(this.binder, this.rowNavigator, this.columnNavigator, startRowIndex, pivotTable.MeasureRowSampleCount), 
                        this.ensureLastPageComplete(startRowIndex, startColumnIndex);
                        var needsPageColumn = this.columnWidthMeasureManager.canAddPageColumn(this.columnNavigator) && !this.isFilledHorizontally(bodyCellViewport.left, bodyCellViewport.width), needsPageRow = this.rowHeightMeasureManager.canAddPageRow(this.rowNavigator) && !this.isFilledVertically(bodyCellViewport.top, bodyCellViewport.height);
                        needsPageColumn && this.measureNextPageColumn(startRowIndex), needsPageRow && this.measureNextPageRow(startRowIndex, startColumnIndex), 
                        this.rowHeightMeasureManager.measureFloatingRows(this.binder, this.rowNavigator, this.columnNavigator, startRowIndex, startColumnIndex), 
                        this.columnLevelHeightMeasureManager.measure(this.binder, this.rowNavigator, this.columnNavigator, startRowIndex, startColumnIndex, pivotTable.MeasureColumnSampleCount), 
                        this.updateRegionsPosition(), this.updateScrollRegionWidth(), this.updateScrollRegionHeight(), 
                        this.updateScrollbars(), this.measureNextPageColumnAsync(startRowIndex), this.measureNextPageRowAsync(startRowIndex, startColumnIndex), 
                        this.columnHeaderRenderer.update(bodyCellViewport.left, bodyCellViewport.width, this.binder, this.columnNavigator), 
                        this.rowHeaderRenderer.update(this.rowNavigator.getHierarchyItems(), !1, bodyCellViewport.top, bodyCellViewport.height, this.binder, this.rowNavigator), 
                        this.bodyCellRenderer.update(bodyCellViewport, !1, this.binder, this.rowNavigator, this.columnNavigator, !0), 
                        this.cornerRenderer.update(this.binder, this.rowNavigator, this.columnNavigator);
                        var floatingHierarchyItems = this.rowNavigator.getFloatingHierarchyItems();
                        if (floatingHierarchyItems) {
                            var floatingRowHeights = this.rowHeightMeasureManager.getFloatingRowHeights();
                            this.floatingRowHeaderRenderer.update(floatingHierarchyItems, !0, 0, floatingRowHeights, this.binder, this.rowNavigator), 
                            this.floatingBodyCellRenderer.update({
                                left: bodyCellViewport.left,
                                top: 0,
                                width: bodyCellViewport.width,
                                height: floatingRowHeights
                            }, !0, this.binder, this.rowNavigator, this.columnNavigator, !0);
                        }
                        (needsPageRow || needsPageColumn) && this.workScheduler.scheduleAnimationFrameTask(function() {
                            return _this.render(PivotTableRenderingMode.Incremental);
                        });
                    }, PivotTableControl.prototype.ensureLastPageComplete = function(startRowIndex, startColumnIndex) {
                        var index = this.rowHeightMeasureManager.ensureLastPageComplete(this.binder, this.rowNavigator, this.columnNavigator, startRowIndex, startColumnIndex, pivotTable.MeasureColumnSampleCount);
                        index !== -1 && (this.bodyCellRenderer.removeRowPages(index), this.updateScrollRegionHeight());
                    }, PivotTableControl.prototype.makeVisible = function(mode, visibleRowStart, visibleColumnStart, callback) {
                        var _this = this;
                        this.clear(mode);
                        var startColumnIndex, columnScrollOffset, viewport = this.getViewport();
                        if (visibleColumnStart) startColumnIndex = visibleColumnStart.columnIndex, columnScrollOffset = pivotTable.ColumnMeasurementUtil.getOffset(visibleColumnStart, this.columnWidthMeasureManager); else {
                            var columnVisibleRange = pivotTable.ColumnMeasurementUtil.getVisibleRange(viewport.left, viewport.width, this.columnWidthMeasureManager);
                            startColumnIndex = columnVisibleRange ? columnVisibleRange.firstLeafIndex : 0, columnScrollOffset = this.columnScrollbar.viewMin;
                        }
                        var startRowIndex, rowScrollOffset;
                        if (visibleRowStart) startRowIndex = visibleRowStart.rowIndex, rowScrollOffset = pivotTable.RowMeasurementUtil.getOffset(visibleRowStart, this.rowHeightMeasureManager); else {
                            var rowVisibleRange = pivotTable.RowMeasurementUtil.getVisibleRange(viewport.top, viewport.height, this.rowHeightMeasureManager);
                            startRowIndex = rowVisibleRange ? rowVisibleRange.firstLeafIndex : 0, rowScrollOffset = this.rowScrollbar.viewMin;
                        }
                        this.rowLevelWidthMeasureManager.measure(this.binder, this.rowNavigator, this.columnNavigator, startRowIndex, pivotTable.MeasureRowSampleCount), 
                        this.ensureLastPageComplete(startRowIndex, startColumnIndex);
                        var needsPageColumn = this.columnWidthMeasureManager.canAddPageColumn(this.columnNavigator) && (!pivotTable.ColumnMeasurementUtil.isColumnMeasured(startColumnIndex, this.columnWidthMeasureManager) || this.width > this.columnWidthMeasureManager.getColumnsWidth() - columnScrollOffset), needsPageRow = this.rowHeightMeasureManager.canAddPageRow(this.rowNavigator) && (!pivotTable.RowMeasurementUtil.isRowMeasured(startRowIndex, this.rowHeightMeasureManager) || this.height > this.rowHeightMeasureManager.getRowsHeight() - rowScrollOffset);
                        if (needsPageColumn && this.measureNextPageColumn(startRowIndex), needsPageRow && this.measureNextPageRow(startRowIndex, startColumnIndex), 
                        needsPageRow || needsPageColumn) this.workScheduler.scheduleAnimationFrameTask(function() {
                            return _this.makeVisible(PivotTableRenderingMode.Incremental, visibleRowStart, visibleColumnStart, callback);
                        }); else {
                            this.rowHeightMeasureManager.measureFloatingRows(this.binder, this.rowNavigator, this.columnNavigator, startRowIndex, startColumnIndex), 
                            this.columnLevelHeightMeasureManager.measure(this.binder, this.rowNavigator, this.columnNavigator, startRowIndex, startColumnIndex, pivotTable.MeasureColumnSampleCount), 
                            this.updateRegionsPosition(), this.updateScrollRegionWidth(), this.updateScrollRegionHeight(), 
                            this.updateScrollbars(), this.scrollTo(rowScrollOffset, columnScrollOffset);
                            var rowScrollOffsetAchieved = powerbi.Double.equalWithPrecision(this.rowScrollbar.viewMin, rowScrollOffset, PivotTableControl.ScrollOffsetPrecision), columnScrollOffsetAchieved = powerbi.Double.equalWithPrecision(this.columnScrollbar.viewMin, columnScrollOffset, PivotTableControl.ScrollOffsetPrecision);
                            rowScrollOffsetAchieved && columnScrollOffsetAchieved ? callback && callback() : (!rowScrollOffsetAchieved && visibleRowStart && (visibleRowStart = this.getVisibleRowStart()), 
                            !columnScrollOffsetAchieved && visibleColumnStart && (visibleColumnStart = this.getVisibleColumnStart()), 
                            this.makeVisible(PivotTableRenderingMode.ClearMeasurement, visibleRowStart, visibleColumnStart, callback));
                        }
                    }, PivotTableControl.prototype.getVisibleRowStart = function() {
                        var viewport = this.getViewport(), visibleRowRange = pivotTable.RowMeasurementUtil.getVisibleRange(viewport.top, viewport.height, this.rowHeightMeasureManager);
                        return visibleRowRange ? pivotTable.RowMeasurementUtil.getVisibleRowStart(visibleRowRange, viewport.top, this.rowHeightMeasureManager) : null;
                    }, PivotTableControl.prototype.getVisibleColumnStart = function() {
                        var viewport = this.getViewport(), visibleColumnRange = pivotTable.ColumnMeasurementUtil.getVisibleRange(viewport.left, viewport.width, this.columnWidthMeasureManager);
                        return visibleColumnRange ? pivotTable.ColumnMeasurementUtil.getVisibleColumnStart(visibleColumnRange, viewport.left, this.columnWidthMeasureManager) : null;
                    }, PivotTableControl.prototype.clearRendering = function() {
                        this.workScheduler.clear(), this.bodyCellRenderer.clear(), this.rowHeaderRenderer.clear(), 
                        this.columnHeaderRenderer.clear(), this.cornerRenderer.clear(), this.floatingRowHeaderRenderer.clear(), 
                        this.floatingBodyCellRenderer.clear();
                    }, PivotTableControl.prototype.clearMeasurement = function() {
                        this.workScheduler.clear(), this.columnWidthMeasureManager.clear(), this.rowHeightMeasureManager.clear(), 
                        this.columnLevelHeightMeasureManager.clear(), this.rowLevelWidthMeasureManager.clear();
                    }, PivotTableControl.prototype.clear = function(mode) {
                        switch (void 0 === mode && (mode = PivotTableRenderingMode.ClearMeasurement), mode) {
                          case PivotTableRenderingMode.ClearRendering:
                            this.clearRendering();
                            break;

                          case PivotTableRenderingMode.ClearMeasurement:
                            this.clearRendering(), this.clearMeasurement();
                        }
                    }, PivotTableControl.prototype.onHorizontalScroll = function() {
                        this.bodyCellContainer.scrollLeft = this.columnScrollbar.viewMin;
                    }, PivotTableControl.prototype.onVerticalScroll = function() {
                        this.bodyCellContainer.scrollTop = this.rowScrollbar.viewMin;
                    }, PivotTableControl.prototype.updateRegionsPosition = function() {
                        this.bodyCellContainer.style.top = this.rowHeaderContainer.style.top = this.cornerContainer.style.height = this.innerColumnHeaderContainer.style.height = PivotTableControl.pixelUnits(this.columnLevelHeightMeasureManager.getHeadersHeight()), 
                        this.bodyCellContainer.style.left = this.columnHeaderContainer.style.left = this.cornerContainer.style.width = this.innerRowHeaderContainer.style.width = this.floatingBodyCellContainer.style.left = this.floatingRowHeaderContainer.style.width = PivotTableControl.pixelUnits(this.rowLevelWidthMeasureManager.getHeadersWidth()), 
                        this.floatingRowHeaderContainer.style.height = this.floatingBodyCellContainer.style.height = this.innerFloatingBodyCellContainer.style.height = PivotTableControl.pixelUnits(this.rowHeightMeasureManager.getFloatingRowHeights());
                    }, PivotTableControl.prototype.updateScrollbars = function() {
                        var floatingRowHeight = this.rowHeightMeasureManager.getFloatingRowHeights(), possibleClientHeight = this.height - this.columnLevelHeightMeasureManager.getHeadersHeight() - floatingRowHeight, possibleClientWidth = this.width - this.rowLevelWidthMeasureManager.getHeadersWidth(), rowsHeight = this.rowHeightMeasureManager.getRowsHeight(), columnsWidth = this.columnWidthMeasureManager.getColumnsWidth(), shouldShowRowScrollbar = this.options.scrollingEnabled && rowsHeight > 0 && rowsHeight > possibleClientHeight, shouldShowColumnScrollbar = this.options.scrollingEnabled && columnsWidth > 0 && columnsWidth > possibleClientWidth;
                        !shouldShowRowScrollbar && shouldShowColumnScrollbar && rowsHeight > 0 && (shouldShowRowScrollbar = rowsHeight > possibleClientHeight - pivotTable.ScrollbarWidth), 
                        !shouldShowColumnScrollbar && shouldShowRowScrollbar && columnsWidth > 0 && (shouldShowColumnScrollbar = columnsWidth > possibleClientWidth - pivotTable.ScrollbarWidth), 
                        this.bodyCellContainer.style.right = this.columnHeaderContainer.style.right = this.floatingBodyCellContainer.style.right = shouldShowRowScrollbar ? this.rowScrollbar.width : PivotTableControl.pixelUnits(0);
                        var bodyBottom, floatingBodyBottom, columnScrollbarHeight = shouldShowColumnScrollbar ? pivotTable.ScrollbarWidth : 0;
                        rowsHeight > possibleClientHeight - columnScrollbarHeight ? (bodyBottom = columnScrollbarHeight + floatingRowHeight, 
                        floatingBodyBottom = columnScrollbarHeight) : (bodyBottom = possibleClientHeight + floatingRowHeight - rowsHeight, 
                        floatingBodyBottom = possibleClientHeight - rowsHeight), this.bodyCellContainer.style.bottom = this.rowHeaderContainer.style.bottom = PivotTableControl.pixelUnits(bodyBottom), 
                        this.floatingRowHeaderContainer.style.bottom = this.floatingBodyCellContainer.style.bottom = PivotTableControl.pixelUnits(floatingBodyBottom), 
                        this.rowScrollbar.show(shouldShowRowScrollbar), this.rowScrollbar.viewSize = this.bodyCellContainer.clientHeight, 
                        this.rowScrollbar.refresh(), this.columnScrollbar.show(shouldShowColumnScrollbar), 
                        this.columnScrollbar.viewSize = this.bodyCellContainer.clientWidth, this.columnScrollbar.refresh();
                    }, PivotTableControl.prototype.measureNextPageColumnAsync = function(startRowIndex) {
                        var _this = this;
                        this.workScheduler.scheduleTimeoutTask(function() {
                            _this.columnWidthMeasureManager.canAddPageColumn(_this.columnNavigator) && _this.columnWidthMeasureManager.getPageColumns().length < pivotTable.MaxAutoPageColumnMeasure && (_this.measureNextPageColumn(startRowIndex), 
                            _this.updateScrollRegionWidth(), _this.measureNextPageColumnAsync(startRowIndex));
                        }, PivotTableControl.AutoMeasureDelay);
                    }, PivotTableControl.prototype.measureNextPageRowAsync = function(rowStartIndex, columnStartIndex) {
                        var _this = this;
                        this.workScheduler.scheduleTimeoutTask(function() {
                            _this.rowHeightMeasureManager.canAddPageRow(_this.rowNavigator) && _this.rowHeightMeasureManager.getPageRows().length < pivotTable.MaxAutoPageRowMeasure && (_this.measureNextPageRow(rowStartIndex, columnStartIndex), 
                            _this.updateScrollRegionHeight(), _this.measureNextPageRowAsync(rowStartIndex, columnStartIndex));
                        }, PivotTableControl.AutoMeasureDelay);
                    }, PivotTableControl.prototype.updateScrollRegionWidth = function() {
                        var columnsWidth = this.columnWidthMeasureManager.getColumnsWidth(), bodyCellContainerWidth = this.bodyCellContainer.clientWidth;
                        this.innerColumnHeaderContainer.style.width = this.innerBodyCellContainer.style.width = this.innerFloatingBodyCellContainer.style.width = PivotTableControl.pixelUnits(Math.max(columnsWidth, bodyCellContainerWidth)), 
                        this.columnScrollbar.max = columnsWidth, this.columnScrollbar.viewSize = bodyCellContainerWidth, 
                        this.columnScrollbar.refresh();
                    }, PivotTableControl.prototype.updateScrollRegionHeight = function() {
                        var rowsHeight = this.rowHeightMeasureManager.getRowsHeight(), bodyCellContainerHeight = this.bodyCellContainer.clientHeight;
                        this.innerRowHeaderContainer.style.height = this.innerBodyCellContainer.style.height = PivotTableControl.pixelUnits(Math.max(rowsHeight, bodyCellContainerHeight)), 
                        this.rowScrollbar.max = rowsHeight, this.rowScrollbar.viewSize = bodyCellContainerHeight, 
                        this.rowScrollbar.refresh();
                    }, PivotTableControl.prototype.isFilledHorizontally = function(viewportLeft, viewportWidth) {
                        return this.columnWidthMeasureManager.getColumnsWidth() - viewportLeft > viewportWidth + PivotTableControl.MeasureBuffer;
                    }, PivotTableControl.prototype.isFilledVertically = function(viewportTop, viewportHeight) {
                        return this.rowHeightMeasureManager.getRowsHeight() - viewportTop > viewportHeight + PivotTableControl.MeasureBuffer;
                    }, PivotTableControl.prototype.measureNextPageColumn = function(startRowIndex) {
                        this.columnWidthMeasureManager.measureNextPage(this.binder, this.rowNavigator, this.columnNavigator, startRowIndex);
                    }, PivotTableControl.prototype.measureNextPageRow = function(startRowIndex, startColumnIndex) {
                        this.rowHeightMeasureManager.measureNextPage(this.binder, this.rowNavigator, this.columnNavigator, startRowIndex, startColumnIndex);
                    }, PivotTableControl.pixelUnits = function(value) {
                        return 0 === value ? value.toString() : value + "px";
                    }, PivotTableControl.MeasureBuffer = 50, PivotTableControl.AutoMeasureDelay = 250, 
                    PivotTableControl.ScrollOffsetPrecision = .1, PivotTableControl;
                }();
                pivotTable.PivotTableControl = PivotTableControl;
                var PivotTableBodyPage = function() {
                    function PivotTableBodyPage(rowIndex, columnIndex) {
                        this.rowIndex = rowIndex, this.columnIndex = columnIndex;
                    }
                    return PivotTableBodyPage.prototype.build = function(container, rowStartOffset, columnStartOffset, rowHeightMeasureManager, columnWidthMeasureManager, pageRow, pageColumn, floatingRows, rowNavigator, columnNavigator, binder, clickHandler, contextMenuHandler) {
                        for (var rowCount = Math.min(rowStartOffset + pageRow.getRowHeights().length, rowNavigator.getHierarchyLeafCount()) - rowStartOffset, columnCount = Math.min(columnStartOffset + pageColumn.getColumnWidths().length, columnNavigator.getHierarchyLeafCount()) - columnStartOffset, left = columnWidthMeasureManager.getPageColumnLeft(pageColumn), top = rowHeightMeasureManager.getPageRowTop(pageRow), requiredStyles = {
                            position: "absolute",
                            left: PivotTableControl.pixelUnits(left),
                            top: PivotTableControl.pixelUnits(top),
                            width: PivotTableControl.pixelUnits(pageColumn.getWidth()),
                            height: PivotTableControl.pixelUnits(pageRow.getHeight())
                        }, bodyCells = [], rowIndex = 0; rowIndex < rowCount; rowIndex++) bodyCells[rowIndex] = [];
                        for (var columnsString = "", columnLeft = 0, columnIndex = 0; columnIndex < columnCount; columnIndex++) {
                            var width = pageColumn.getColumnWidths()[columnIndex];
                            columnsString += this.buildColumn(rowCount, rowStartOffset, columnIndex, columnStartOffset, pageRow, pageColumn, floatingRows, rowNavigator, columnNavigator, binder, bodyCells, columnLeft, width), 
                            columnLeft += width;
                        }
                        var pageBinding = {
                            content: columnsString,
                            classNames: [],
                            styleProperties: {},
                            attributes: {}
                        };
                        container.insertAdjacentHTML("beforeend", ElementBuilder.build(pageBinding, requiredStyles)), 
                        this.element = container.lastChild, (clickHandler || contextMenuHandler) && this.addEventListeners(rowCount, columnCount, bodyCells, clickHandler, contextMenuHandler);
                    }, PivotTableBodyPage.prototype.resizeColumn = function(columnIndex, pageColumn) {
                        if (this.element) {
                            for (var columnElement, columnWidths = pageColumn.getColumnWidths(), columnsCount = columnWidths.length, left = 0, i = 0; i < columnsCount && (columnElement = 0 === i ? this.element.firstChild : columnElement.nextSibling, 
                            columnElement); i++) {
                                var width = columnWidths[i];
                                i === columnIndex ? columnElement.style.width = PivotTableControl.pixelUnits(width) : i > columnIndex && (columnElement.style.left = PivotTableControl.pixelUnits(left)), 
                                left += width;
                            }
                            this.element.style.width = PivotTableControl.pixelUnits(pageColumn.getWidth());
                        }
                    }, PivotTableBodyPage.prototype.getHierarchyLeafAt = function(floatingRows, index, navigator) {
                        return floatingRows ? navigator.getFloatingHierarchyLeafAt(index) : navigator.getHierarchyLeafAt(index);
                    }, PivotTableBodyPage.prototype.buildColumn = function(rowCount, rowStartOffset, columnIndex, columnStartOffset, pageRow, pageColumn, floatingRows, rowNavigator, columnNavigator, binder, bodyCells, left, width) {
                        for (var requiredStyles = {
                            overflow: "hidden",
                            position: "absolute",
                            left: PivotTableControl.pixelUnits(left),
                            width: PivotTableControl.pixelUnits(width)
                        }, columnItem = columnNavigator.getHierarchyLeafAt(columnIndex + columnStartOffset), cellsString = "", rowIndex = 0; rowIndex < rowCount; rowIndex++) cellsString += this.buildCell(rowIndex, this.getHierarchyLeafAt(floatingRows, rowIndex + rowStartOffset, rowNavigator), columnIndex, columnItem, pageRow, rowNavigator, binder, bodyCells);
                        var columnBinding = {
                            content: cellsString,
                            classNames: [],
                            styleProperties: {},
                            attributes: {}
                        };
                        return ElementBuilder.build(columnBinding, requiredStyles);
                    }, PivotTableBodyPage.prototype.buildCell = function(rowIndex, rowItem, columnIndex, columnItem, pageRow, rowNavigator, binder, bodyCells) {
                        var bodyCell = rowNavigator.getIntersection(rowItem, columnItem);
                        bodyCells[rowIndex][columnIndex] = bodyCell;
                        var cellBinding = binder.getBodyCellBinding(bodyCell, !1), requiredStyles = {
                            "box-sizing": "border-box",
                            height: PivotTableControl.pixelUnits(pageRow.getRowHeights()[rowIndex])
                        };
                        return ElementBuilder.build(cellBinding, requiredStyles);
                    }, PivotTableBodyPage.prototype.addEventListeners = function(rowCount, columnCount, bodyCells, clickHandler, contextMenuHandler) {
                        for (var columnElement, columnIndex = 0; columnIndex < columnCount; columnIndex++) {
                            columnElement = 0 === columnIndex ? this.element.firstChild : columnElement.nextSibling;
                            for (var bodyCellElement = void 0, _loop_1 = function(rowIndex) {
                                bodyCellElement = 0 === rowIndex ? columnElement.firstChild : bodyCellElement.nextSibling;
                                var bodyCellItem = bodyCells[rowIndex][columnIndex];
                                clickHandler && bodyCellElement.addEventListener("click", function(event) {
                                    clickHandler(bodyCellItem, event);
                                }), contextMenuHandler && bodyCellElement.addEventListener("contextmenu", function(event) {
                                    contextMenuHandler(bodyCellItem, event);
                                });
                            }, rowIndex = 0; rowIndex < rowCount; rowIndex++) _loop_1(rowIndex);
                        }
                    }, PivotTableBodyPage.prototype.getElement = function() {
                        return this.element;
                    }, PivotTableBodyPage;
                }();
                pivotTable.PivotTableBodyPage = PivotTableBodyPage;
                var PivotTablePageColumn = function() {
                    function PivotTablePageColumn() {
                        this.columnWidths = [];
                    }
                    return PivotTablePageColumn.prototype.getColumnWidths = function() {
                        return this.columnWidths;
                    }, PivotTablePageColumn.prototype.getWidth = function() {
                        return _.sum(this.columnWidths);
                    }, PivotTablePageColumn;
                }();
                pivotTable.PivotTablePageColumn = PivotTablePageColumn;
                var PivotTablePageRow = function() {
                    function PivotTablePageRow() {
                        this.rowHeights = [];
                    }
                    return PivotTablePageRow.prototype.getRowHeights = function() {
                        return this.rowHeights;
                    }, PivotTablePageRow.prototype.getHeight = function() {
                        return _.sum(this.rowHeights);
                    }, PivotTablePageRow.prototype.clear = function() {
                        this.rowHeights = [];
                    }, PivotTablePageRow;
                }();
                pivotTable.PivotTablePageRow = PivotTablePageRow;
                var PivotTableHeader = function() {
                    function PivotTableHeader() {}
                    return PivotTableHeader.prototype.build = function(parent, cellBinding, item, columnResizeHandler, rowResizeHandler, clickHandler, contextMenuHandler) {
                        if (!this.element) {
                            var containerBinding = {
                                content: ElementBuilder.build(cellBinding, PivotTableHeader.headerRequiredStyles),
                                classNames: null,
                                styleProperties: null,
                                attributes: null
                            };
                            parent.insertAdjacentHTML("beforeend", ElementBuilder.build(containerBinding, PivotTableHeader.containerRequiredStyles)), 
                            this.element = parent.lastChild, (columnResizeHandler || rowResizeHandler || clickHandler) && this.createHeaderResizer(item, columnResizeHandler, rowResizeHandler, clickHandler), 
                            contextMenuHandler && this.element.addEventListener("contextmenu", function(event) {
                                contextMenuHandler(item, event);
                            });
                        }
                    }, PivotTableHeader.prototype.createHeaderResizer = function(item, columnResizeHandler, rowResizeHandler, clickHandler) {
                        return new pivotTable.HeaderResizer(item, this.element, columnResizeHandler, rowResizeHandler, clickHandler);
                    }, PivotTableHeader.prototype.setWidth = function(width) {
                        this.element.style.width = PivotTableControl.pixelUnits(width);
                    }, PivotTableHeader.prototype.setHeight = function(height) {
                        this.element.lastChild.style.height = PivotTableControl.pixelUnits(height);
                    }, PivotTableHeader.prototype.setLeft = function(left) {
                        this.element.style.left = PivotTableControl.pixelUnits(left);
                    }, PivotTableHeader.prototype.setTop = function(top) {
                        this.element.style.top = PivotTableControl.pixelUnits(top);
                    }, PivotTableHeader.prototype.getElement = function() {
                        return this.element;
                    }, PivotTableHeader.headerRequiredStyles = {
                        "box-sizing": "border-box"
                    }, PivotTableHeader.containerRequiredStyles = {
                        position: "absolute",
                        overflow: "hidden"
                    }, PivotTableHeader;
                }();
                pivotTable.PivotTableHeader = PivotTableHeader;
                var ElementBuilder = function() {
                    function ElementBuilder() {}
                    return ElementBuilder.build = function(elementBinding, requiredStyles, tagName) {
                        void 0 === tagName && (tagName = "div");
                        var str = "<" + tagName + " ";
                        return str += this.buildAttributes(elementBinding.attributes), str += this.buildClassNames(elementBinding.classNames), 
                        str += this.buildStyles(elementBinding.styleProperties, requiredStyles), str += ">", 
                        str += elementBinding.content, str += "</" + tagName + ">";
                    }, ElementBuilder.buildAttributes = function(attributes) {
                        var str = "";
                        if (attributes) for (var name_1 in attributes) str += name_1 + '="' + attributes[name_1] + '"';
                        return str;
                    }, ElementBuilder.buildClassNames = function(classNames) {
                        if (!classNames || 0 === classNames.length) return "";
                        for (var str = 'class="', _i = 0, classNames_1 = classNames; _i < classNames_1.length; _i++) {
                            var className = classNames_1[_i];
                            str += className + " ";
                        }
                        return str += '"';
                    }, ElementBuilder.buildStyles = function(styles, requiredStyles) {
                        var hasRequiredStyles = !_.isEmpty(requiredStyles), hasStyles = !_.isEmpty(styles);
                        if (!hasRequiredStyles && !hasStyles) return "";
                        var str = 'style="';
                        if (hasStyles) for (var name_2 in styles) str += name_2 + ":" + styles[name_2] + ";";
                        if (hasRequiredStyles) for (var name_3 in requiredStyles) str += name_3 + ":" + requiredStyles[name_3] + ";";
                        return str += '"';
                    }, ElementBuilder;
                }();
                pivotTable.ElementBuilder = ElementBuilder;
            }(pivotTable = controls.pivotTable || (controls.pivotTable = {}));
        }(controls = visuals.controls || (visuals.controls = {}));
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var TablixObjects = powerbi.visuals.controls.internal.TablixObjects, TablixUtils = powerbi.visuals.controls.internal.TablixUtils, Matrix = function() {
            function Matrix(options) {
                this.isTouchDisabled = options && options.isTouchDisabled;
            }
            return Matrix.prototype.init = function(options) {
                this.element = options.element, this.style = options.style, this.updateViewport(options.viewport), 
                this.formatter = visuals.valueFormatter.formatVariantMeasureValueWithDataPointObjects, 
                this.isInteractive = options.interactivity && null != options.interactivity.selection, 
                this.hostServices = options.host, this.persistingObjects = !1, this.waitingForData = !1, 
                this.lastAllowHeaderResize = !0, this.waitingForSort = !1;
            }, Matrix.getFormattingProperties = function(dataView) {
                return TablixObjects.getMatrixObjects(dataView);
            }, Matrix.prototype.onResizing = function(finalViewport) {
                this.updateViewport(finalViewport);
            }, Matrix.prototype.getColumnWidthManager = function() {
                return this.columnWidthManager;
            }, Matrix.prototype.onDataChanged = function(options) {
                var dataViews = options.dataViews;
                if (dataViews && dataViews.length > 0) {
                    var previousDataView = this.dataView;
                    this.dataView = dataViews[0];
                    var formattingProperties = Matrix.getFormattingProperties(this.dataView), textSize = formattingProperties.general.textSize;
                    if (options.operationKind === powerbi.VisualDataChangeOperationKind.Append) {
                        var rootChanged = previousDataView.matrix.rows.root !== this.dataView.matrix.rows.root;
                        this.createOrUpdateHierarchyNavigator(rootChanged), rootChanged && this.tablixControl.updateModels(!1, this.dataView.matrix.rows.root.children, this.dataView.matrix.columns.root.children), 
                        this.refreshControl(!1);
                    } else {
                        this.createOrUpdateHierarchyNavigator(!0), this.createColumnWidthManager(), this.createTablixControl(formattingProperties);
                        var binder = this.tablixControl.getBinder();
                        binder.onDataViewChanged(formattingProperties), this.updateInternal(textSize, previousDataView);
                    }
                }
                this.waitingForData = !1, this.waitingForSort = !1;
            }, Matrix.prototype.createColumnWidthManager = function() {
                var _this = this, columnHierarchy = this.hierarchyNavigator.getColumnHierarchy();
                this.columnWidthManager ? this.persistingObjects || this.columnWidthManager.updateDataView(this.dataView, columnHierarchy.leafNodes) : this.columnWidthManager = new visuals.controls.TablixColumnWidthManager(this.dataView, (!0), function(objectInstances) {
                    return _this.persistColumnWidths(objectInstances);
                }, columnHierarchy.leafNodes);
            }, Matrix.prototype.persistColumnWidths = function(objectInstances) {
                this.persistingObjects = !0, this.hostServices.persistProperties(objectInstances);
            }, Matrix.prototype.updateViewport = function(newViewport) {
                this.currentViewport = newViewport, this.tablixControl && (this.tablixControl.viewport = this.currentViewport, 
                this.verifyHeaderResize(), this.refreshControl(!1));
            }, Matrix.prototype.refreshControl = function(clear) {
                (visuals.visibilityHelper.partiallyVisible(this.element) || 1 === this.getLayoutKind()) && this.tablixControl.refresh(clear);
            }, Matrix.prototype.getLayoutKind = function() {
                return this.isInteractive ? 0 : 1;
            }, Matrix.prototype.createOrUpdateHierarchyNavigator = function(rootChanged) {
                var isDataComplete = !this.dataView.metadata.segment;
                if (this.tablixControl) this.hierarchyNavigator.update(this.dataView.matrix, !1, !1, !1, isDataComplete, rootChanged); else {
                    var matrixNavigator = visuals.createMatrixHierarchyNavigator(this.dataView.matrix, isDataComplete, this.formatter, this.hostServices.getLocalizedString("ListJoin_Separator"));
                    this.hierarchyNavigator = matrixNavigator;
                }
            }, Matrix.prototype.createTablixControl = function(formattingProperties) {
                var textSize = formattingProperties.general.textSize;
                this.tablixControl || (this.tablixControl = this.createControl(this.hierarchyNavigator, textSize)), 
                this.tablixControl.wordWrapRowHeaders = formattingProperties.rowHeaders.wordWrap;
            }, Matrix.prototype.createControl = function(matrixNavigator, textSize) {
                var _this = this, layoutKind = this.getLayoutKind(), matrixBinderOptions = {
                    onBindRowHeader: function(item) {
                        _this.onBindRowHeader(item);
                    },
                    totalLabel: this.hostServices.getLocalizedString(TablixUtils.TotalLabel),
                    onColumnHeaderClick: function(queryName, sortDirection) {
                        return _this.onColumnHeaderClick(queryName, sortDirection);
                    },
                    showSortIcons: 0 === layoutKind
                }, matrixBinder = new visuals.MatrixBinder(this.hierarchyNavigator, matrixBinderOptions), layoutManager = 1 === layoutKind ? visuals.controls.internal.DashboardTablixLayoutManager.createLayoutManager(matrixBinder) : visuals.controls.internal.CanvasTablixLayoutManager.createLayoutManager(matrixBinder, this.columnWidthManager), tablixContainer = document.createElement("div");
                this.element.append(tablixContainer);
                var tablixOptions = {
                    interactive: this.isInteractive,
                    enableTouchSupport: !this.isTouchDisabled,
                    layoutKind: layoutKind,
                    fontSize: TablixObjects.getTextSizeInPx(textSize)
                };
                return new visuals.controls.TablixControl(matrixNavigator, layoutManager, matrixBinder, tablixContainer, tablixOptions);
            }, Matrix.prototype.updateInternal = function(textSize, previousDataView) {
                var _this = this;
                1 === this.getLayoutKind() && this.tablixControl.layoutManager.adjustContentSize(visuals.converterHelper.hasImageUrlColumn(this.dataView)), 
                this.tablixControl.fontSize = TablixObjects.getTextSizeInPx(textSize), this.verifyHeaderResize(), 
                this.tablixControl.updateModels(!this.persistingObjects, this.dataView.matrix.rows.root.children, this.dataView.matrix.columns.root.children), 
                this.tablixControl.viewport = this.currentViewport;
                var shouldClearControl = this.shouldClearControl(previousDataView, this.dataView);
                setTimeout(function() {
                    _this.refreshControl(shouldClearControl);
                    var widthChanged = _this.columnWidthManager.onColumnsRendered(_this.tablixControl.layoutManager.columnWidthsToPersist);
                    _this.persistingObjects && !widthChanged && (_this.persistingObjects = !1);
                }, 0);
            }, Matrix.prototype.shouldClearControl = function(previousDataView, newDataView) {
                return !(this.waitingForSort && previousDataView && newDataView) || !powerbi.DataViewAnalysis.isMetadataEquivalent(previousDataView.metadata, newDataView.metadata);
            }, Matrix.prototype.onBindRowHeader = function(item) {
                this.needsMoreData(item) && (this.hostServices.loadMoreData(), this.waitingForData = !0);
            }, Matrix.prototype.onColumnHeaderClick = function(queryName, sortDirection) {
                this.waitingForSort = !0, this.hostServices.onCustomSort(TablixUtils.getCustomSortEventArgs(queryName, sortDirection));
            }, Matrix.prototype.needsMoreData = function(item) {
                if (this.waitingForData || !this.hierarchyNavigator.isLeaf(item) || !this.dataView.metadata || !this.dataView.metadata.segment) return !1;
                var leafCount = this.tablixControl.rowDimension.getItemsCount(), loadMoreThreshold = leafCount * TablixUtils.PreferredLoadMoreThreshold;
                return this.hierarchyNavigator.getLeafIndex(item) >= loadMoreThreshold;
            }, Matrix.prototype.enumerateObjectInstances = function(options) {
                var enumeration = new visuals.ObjectEnumerationBuilder();
                return this.dataView && TablixObjects.enumerateObjectInstances(options, enumeration, this.dataView, visuals.controls.TablixType.Matrix), 
                enumeration.complete();
            }, Matrix.prototype.enumerateObjectRepetition = function() {
                var enumeration = [];
                return this.dataView && TablixObjects.enumerateObjectRepetition(enumeration, this.dataView, visuals.controls.TablixType.Matrix), 
                enumeration;
            }, Matrix.prototype.shouldAllowHeaderResize = function() {
                return 1 === this.hostServices.getViewMode();
            }, Matrix.prototype.onViewModeChanged = function(viewMode) {
                this.tablixControl && this.tablixControl.toggleTouchBindings(1 !== viewMode), this.updateViewport(this.currentViewport);
            }, Matrix.prototype.verifyHeaderResize = function() {
                var currentAllowHeaderResize = this.shouldAllowHeaderResize();
                currentAllowHeaderResize !== this.lastAllowHeaderResize && (this.lastAllowHeaderResize = currentAllowHeaderResize, 
                this.tablixControl.layoutManager.setAllowHeaderResize(currentAllowHeaderResize));
            }, Matrix;
        }();
        visuals.Matrix = Matrix;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var MatrixStyler, CellStyle = powerbi.visuals.controls.internal.TablixUtils.CellStyle, EdgeSettings = powerbi.visuals.controls.internal.TablixUtils.EdgeSettings, EdgeType = powerbi.visuals.controls.internal.TablixUtils.EdgeType, TablixObjects = powerbi.visuals.controls.internal.TablixObjects, TablixUtils = powerbi.visuals.controls.internal.TablixUtils, UrlScheme = jsCommon.UrlUtils.UrlScheme, UrlUtils = jsCommon.UrlUtils;
        !function(MatrixStyler) {
            function setRowHeaderStyle(position, item, style, isSteppedLayout, formattingProperties, applyBanding) {
                void 0 === applyBanding && (applyBanding = !1);
                var propsGrid = formattingProperties.grid, propsHeaders = formattingProperties.rowHeaders, propsValues = formattingProperties.values, propsCols = formattingProperties.columnHeaders, propsGrandTotal = formattingProperties.grandTotal;
                style.paddings.top = style.paddings.bottom = propsGrid.rowPadding;
                var isGrandTotal = visuals.MatrixHierarchyNavigator.isNodeGrandTotal(item);
                style.borders.top = new EdgeSettings(), (position.row.isFirst && !isSteppedLayout || isSteppedLayout && 0 === item.leafIndex) && (style.borders.top.applyParams(visuals.outline.showTop(propsHeaders.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline), 
                !visuals.outline.showTop(propsHeaders.outline) && visuals.outline.showTop(propsValues.outline) && (style.paddings.top += propsGrid.outlineWeight)), 
                style.borders.bottom = new EdgeSettings(), position.row.isLast && (!isSteppedLayout || isSteppedLayout && position.column.isLast && !formattingProperties.general.rowSubtotals) || isSteppedLayout && position.row.isFirst && item.isSubtotal ? (style.borders.bottom.applyParams(visuals.outline.showBottom(propsHeaders.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline), 
                !visuals.outline.showBottom(propsHeaders.outline) && visuals.outline.showBottom(propsValues.outline) && (style.paddings.bottom += propsGrid.outlineWeight)) : style.borders.bottom.applyParams(propsGrid.gridHorizontal, propsGrid.gridHorizontalWeight, propsGrid.gridHorizontalColor, EdgeType.Gridline), 
                style.borders.left = new EdgeSettings(), (isSteppedLayout || position.column.isFirst) && (style.borders.left.applyParams(visuals.outline.showLeft(propsHeaders.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline), 
                !visuals.outline.showLeft(propsHeaders.outline) && visuals.outline.showLeft(propsCols.outline) && (style.paddings.left += propsGrid.outlineWeight)), 
                style.borders.right = new EdgeSettings();
                var isVisualLeaf = isSteppedLayout || position.column.isLast;
                if (isVisualLeaf ? style.borders.right.applyParams(visuals.outline.showRight(propsHeaders.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline) : style.borders.right.applyParams(propsGrid.gridVertical, propsGrid.gridVerticalWeight, propsGrid.gridVerticalColor, EdgeType.Gridline), 
                propsGrandTotal.applyToHeaders && isGrandTotal) style.fontColor = propsGrandTotal.fontColor || propsHeaders.fontColor, 
                style.backColor = propsGrandTotal.backColor || propsHeaders.backColor; else {
                    var bandingDefined = propsValues.fontColorPrimary !== propsValues.fontColorSecondary || propsValues.backColorPrimary !== propsValues.backColorSecondary, shouldApplyBanding = applyBanding && bandingDefined && isVisualLeaf, propsSubtotals = formattingProperties.subtotals, isVisualSubtotal = item.isSubtotal || isSteppedLayout && !position.column.isLast, isSubtotalFontColorApplied = isVisualSubtotal && propsSubtotals.fontColor, isGrandTotalFontColorApplied = isGrandTotal && propsGrandTotal.fontColor, shouldApplyBandingFontColor = shouldApplyBanding && !isSubtotalFontColorApplied && !isGrandTotalFontColorApplied, isSubtotalBackColorApplied = isVisualSubtotal && propsSubtotals.backColor, isGrandTotalBackColorApplied = isGrandTotal && propsGrandTotal.backColor, shouldApplyBandingBackColor = shouldApplyBanding && !isSubtotalBackColorApplied && !isGrandTotalBackColorApplied, isEven = void 0;
                    (shouldApplyBandingFontColor || shouldApplyBandingBackColor) && (isEven = isEvenRow(item.position, formattingProperties.general, propsSubtotals)), 
                    shouldApplyBandingFontColor ? style.fontColor = getBandingFontColor(isEven, propsValues) : style.fontColor = propsHeaders.fontColor, 
                    shouldApplyBandingBackColor ? style.backColor = getBandingBackColor(isEven, propsValues) : style.backColor = propsHeaders.backColor;
                }
            }
            function setColumnHeaderStyle(position, item, style, formattingProperties) {
                var propsGrid = formattingProperties.grid, propsColumnHeaders = formattingProperties.columnHeaders, propsValues = formattingProperties.values, propsGrandTotal = formattingProperties.grandTotal, columnFormatting = formattingProperties.columnFormatting[item.queryName], isGrandTotal = visuals.MatrixHierarchyNavigator.isNodeGrandTotal(item);
                columnFormatting && columnFormatting.styleHeader && columnFormatting.fontColor ? style.fontColor = columnFormatting.fontColor : propsGrandTotal.applyToHeaders && isGrandTotal ? style.fontColor = propsGrandTotal.fontColor || propsColumnHeaders.fontColor : style.fontColor = propsColumnHeaders.fontColor, 
                columnFormatting && columnFormatting.styleHeader && columnFormatting.backColor ? style.backColor = columnFormatting.backColor : propsGrandTotal.applyToHeaders && isGrandTotal ? style.backColor = propsGrandTotal.backColor || propsColumnHeaders.backColor : style.backColor = propsColumnHeaders.backColor, 
                style.paddings.top = style.paddings.bottom = propsGrid.rowPadding, style.borders.top = new EdgeSettings(), 
                position.row.isFirst && style.borders.top.applyParams(visuals.outline.showTop(propsColumnHeaders.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline), 
                style.borders.bottom = new EdgeSettings(), position.row.isLast ? style.borders.bottom.applyParams(visuals.outline.showBottom(propsColumnHeaders.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline) : style.borders.bottom.applyParams(propsGrid.gridHorizontal, propsGrid.gridHorizontalWeight, propsGrid.gridHorizontalColor, EdgeType.Gridline), 
                style.borders.left = new EdgeSettings(), position.column.isFirst && !visuals.outline.showLeft(propsColumnHeaders.outline) && visuals.outline.showLeft(propsValues.outline) && (style.paddings.left += propsGrid.outlineWeight), 
                style.borders.right = new EdgeSettings(), position.column.isLast ? (style.borders.right.applyParams(visuals.outline.showRight(propsColumnHeaders.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline), 
                !visuals.outline.showRight(propsColumnHeaders.outline) && visuals.outline.showRight(propsValues.outline) && (style.paddings.right += propsGrid.outlineWeight)) : style.borders.right.applyParams(propsGrid.gridVertical, propsGrid.gridVerticalWeight, propsGrid.gridVerticalColor, EdgeType.Gridline);
            }
            function setBodyCellStyle(position, item, style, steppedLayout, formattingProperties) {
                var propsGrid = formattingProperties.grid, propsValues = formattingProperties.values, propsSubTotal = formattingProperties.subtotals, propsGrandTotal = formattingProperties.grandTotal, propsRows = formattingProperties.rowHeaders, propsColumns = formattingProperties.columnHeaders;
                style.paddings.top = style.paddings.bottom = propsGrid.rowPadding, style.borders.top = new EdgeSettings(), 
                position.row.isFirst && (style.borders.top.applyParams(visuals.outline.showTop(propsValues.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline), 
                !visuals.outline.showTop(propsValues.outline) && visuals.outline.showTop(propsRows.outline) && (style.paddings.top += propsGrid.outlineWeight)), 
                style.borders.bottom = new EdgeSettings(), position.row.isLast && (!steppedLayout || steppedLayout && !formattingProperties.general.rowSubtotals) || steppedLayout && item.isRowGrandTotal ? (style.borders.bottom.applyParams(visuals.outline.showBottom(propsValues.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline), 
                !visuals.outline.showBottom(propsValues.outline) && visuals.outline.showBottom(propsRows.outline) && (style.paddings.bottom += propsGrid.outlineWeight)) : style.borders.bottom.applyParams(propsGrid.gridHorizontal, propsGrid.gridHorizontalWeight, propsGrid.gridHorizontalColor), 
                style.borders.left = new EdgeSettings(), position.column.isFirst && style.borders.left.applyParams(visuals.outline.showLeft(propsValues.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline), 
                style.borders.right = new EdgeSettings(), position.column.isLast ? (style.borders.right.applyParams(visuals.outline.showRight(propsValues.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline), 
                !visuals.outline.showRight(propsValues.outline) && visuals.outline.showRight(propsColumns.outline) && (style.paddings.right += propsGrid.outlineWeight)) : style.borders.right.applyParams(propsGrid.gridVertical, propsGrid.gridVerticalWeight, propsGrid.gridVerticalColor, EdgeType.Gridline);
                var columnBackColor, columnFontColor, columnFormatting = item.columnMetadata && formattingProperties.columnFormatting[item.columnMetadata.queryName];
                columnFormatting && (item.isGrandTotal ? (columnFontColor = columnFormatting.styleTotal && columnFormatting.fontColor, 
                columnBackColor = columnFormatting.styleTotal && columnFormatting.backColor) : item.isSubtotal ? (columnFontColor = columnFormatting.styleSubTotals && columnFormatting.fontColor, 
                columnBackColor = columnFormatting.styleSubTotals && columnFormatting.backColor) : (columnFontColor = columnFormatting.styleValues && columnFormatting.fontColor, 
                columnBackColor = columnFormatting.styleValues && columnFormatting.backColor));
                var isPrimary = isEvenRow(item.position, formattingProperties.general, propsSubTotal), bandingFontColor = getBandingFontColor(isPrimary, propsValues), bandingBackColor = getBandingBackColor(isPrimary, propsValues);
                item.isGrandTotal ? (style.fontColor = columnFontColor || propsGrandTotal.fontColor || propsSubTotal.fontColor || bandingFontColor, 
                style.backColor = columnBackColor || propsGrandTotal.backColor || propsSubTotal.backColor || bandingBackColor) : item.isSubtotal ? (style.fontColor = columnFontColor || propsSubTotal.fontColor || bandingFontColor, 
                style.backColor = columnBackColor || propsSubTotal.backColor || bandingBackColor) : (style.fontColor = item.fontColor || columnFontColor || bandingFontColor, 
                style.backColor = item.backColor || columnBackColor || bandingBackColor);
            }
            function isEvenRow(position, general, subTotal) {
                var rowIndex;
                return rowIndex = general.rowSubtotals && subTotal.backColor ? position.row.indexInSiblings : position.row.index, 
                rowIndex < 0 || rowIndex % 2 === 0;
            }
            function getBandingFontColor(isEvenRow, values) {
                return isEvenRow ? values.fontColorPrimary : values.fontColorSecondary;
            }
            function getBandingBackColor(isEvenRow, values) {
                return isEvenRow ? values.backColorPrimary : values.backColorSecondary;
            }
            function setCornerCellStyle(position, style, isSteppedLayout, formattingProperties) {
                var propsGrid = formattingProperties.grid, propsCol = formattingProperties.columnHeaders, propsRow = formattingProperties.rowHeaders;
                style.fontColor = propsCol.fontColor || propsRow.fontColor, style.backColor = propsCol.backColor || propsRow.backColor, 
                style.paddings.top = style.paddings.bottom = propsGrid.rowPadding, style.borders.top = new EdgeSettings(), 
                position.row.isFirst && style.borders.top.applyParams(visuals.outline.showTop(propsCol.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline), 
                style.borders.bottom = new EdgeSettings(), position.row.isLast ? style.borders.bottom.applyParams(visuals.outline.showBottom(propsCol.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline) : style.borders.bottom.applyParams(propsGrid.gridHorizontal, propsGrid.gridHorizontalWeight, propsGrid.gridHorizontalColor, EdgeType.Gridline), 
                style.borders.left = new EdgeSettings(), (position.column.isFirst || isSteppedLayout) && (style.borders.left.applyParams(visuals.outline.showLeft(propsCol.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline), 
                !visuals.outline.showLeft(propsCol.outline) && visuals.outline.showLeft(propsRow.outline) && (style.paddings.left += propsGrid.outlineWeight)), 
                style.borders.right = new EdgeSettings(), style.borders.right.applyParams(propsGrid.gridVertical, propsGrid.gridVerticalWeight, propsGrid.gridVerticalColor, EdgeType.Gridline);
            }
            MatrixStyler.setRowHeaderStyle = setRowHeaderStyle, MatrixStyler.setColumnHeaderStyle = setColumnHeaderStyle, 
            MatrixStyler.setBodyCellStyle = setBodyCellStyle, MatrixStyler.setCornerCellStyle = setCornerCellStyle;
        }(MatrixStyler = visuals.MatrixStyler || (visuals.MatrixStyler = {}));
        var MatrixBinder = function() {
            function MatrixBinder(hierarchyNavigator, options) {
                this.hierarchyNavigator = hierarchyNavigator, this.options = options;
            }
            return MatrixBinder.prototype.onDataViewChanged = function(formattingProperties) {
                this.formattingProperties = formattingProperties, this.updateTextHeights();
            }, MatrixBinder.prototype.updateTextHeights = function() {
                this.fontSizeHeader = this.formattingProperties.general.textSize.px, this.textPropsHeader = {
                    fontFamily: TablixUtils.FontFamilyHeader,
                    fontSize: jsCommon.PixelConverter.toString(this.fontSizeHeader)
                }, this.textHeightHeader = Math.ceil(powerbi.TextMeasurementService.measureSvgTextHeight(this.textPropsHeader, "a")), 
                this.fontSizeValue = this.formattingProperties.general.textSize.px, this.textPropsValue = {
                    fontFamily: TablixUtils.FontFamilyCell,
                    fontSize: jsCommon.PixelConverter.toString(this.fontSizeValue)
                }, this.textHeightValue = Math.ceil(powerbi.TextMeasurementService.measureSvgTextHeight(this.textPropsValue, "a")), 
                this.fontSizeTotal = this.formattingProperties.general.textSize.px, this.textPropsTotal = {
                    fontFamily: TablixUtils.FontFamilyTotal,
                    fontSize: jsCommon.PixelConverter.toString(this.fontSizeTotal)
                }, this.textHeightTotal = Math.ceil(powerbi.TextMeasurementService.measureSvgTextHeight(this.textPropsTotal, "a"));
            }, MatrixBinder.prototype.onStartRenderingSession = function() {}, MatrixBinder.prototype.onEndRenderingSession = function() {}, 
            MatrixBinder.prototype.bindRowHeader = function(item, cell) {
                TablixUtils.resetCellCssClass(cell);
                var cellStyle = new CellStyle(), isLeaf = this.hierarchyNavigator && this.hierarchyNavigator.isLeaf(item);
                isLeaf && (TablixUtils.addCellCssClass(cell, TablixUtils.CssClassMatrixRowHeaderLeaf), 
                cellStyle.borders.right = new EdgeSettings(TablixObjects.PropGridOutlineWeight.defaultValue, TablixObjects.PropGridOutlineColor.defaultValue)), 
                item.isSubtotal && (cellStyle.paddings.left = TablixUtils.CellPaddingLeftMatrixTotal), 
                cell.contentWidth = 0, this.bindHeader(item, cell, cell.extension.contentHost, this.hierarchyNavigator.getRowHeaderMetadata(item), cellStyle), 
                cell.contentWidth = Math.ceil(cell.contentWidth), this.options.onBindRowHeader && this.options.onBindRowHeader(item), 
                MatrixStyler.setRowHeaderStyle(cell.position, item, cellStyle, !1, this.formattingProperties), 
                cell.applyStyle(cellStyle);
            }, MatrixBinder.prototype.unbindRowHeader = function(item, cell) {
                TablixUtils.clearCellStyle(cell), TablixUtils.clearCellTextAndTooltip(cell);
            }, MatrixBinder.prototype.bindColumnHeader = function(item, cell) {
                TablixUtils.resetCellCssClass(cell);
                var cellStyle = new CellStyle(), overwriteTotalLabel = !1, cellElement = cell.extension.contentHost;
                cellElement = TablixUtils.appendDiv(cellElement), cellElement.classList.add(TablixUtils.CssClassWrappingContainer), 
                cell.contentWidth = 0;
                var isLeaf = this.hierarchyNavigator && this.hierarchyNavigator.isLeaf(item);
                if (isLeaf) {
                    if (cellStyle.borders.bottom = new EdgeSettings(TablixObjects.PropGridOutlineWeight.defaultValue, TablixObjects.PropGridOutlineColor.defaultValue), 
                    TablixUtils.addCellCssClass(cell, TablixUtils.CssClassTablixColumnHeaderLeaf), TablixUtils.addCellCssClass(cell, TablixUtils.CssClassTablixValueNumeric), 
                    this.options.showSortIcons) {
                        var sortableHeaderColumnMetadata = this.getSortableHeaderColumnMetadata(item);
                        sortableHeaderColumnMetadata && (this.registerColumnHeaderClickHandler(sortableHeaderColumnMetadata, cell), 
                        cellElement = TablixUtils.addSortIconToColumnHeader(sortableHeaderColumnMetadata.sort, cellElement), 
                        sortableHeaderColumnMetadata.sort && (cell.contentWidth = this.fontSizeHeader + TablixUtils.SortIconPadding));
                    }
                    item.isSubtotal && item.parent && item.parent.children.length > 1 && item.parent.children[0].isSubtotal && (overwriteTotalLabel = !0);
                }
                cell.extension.disableDragResize(), this.bindHeader(item, cell, cellElement, this.hierarchyNavigator.getColumnHeaderMetadata(item), cellStyle, overwriteTotalLabel), 
                cell.contentWidth = Math.ceil(cell.contentWidth), MatrixStyler.setColumnHeaderStyle(cell.position, item, cellStyle, this.formattingProperties), 
                cell.applyStyle(cellStyle);
            }, MatrixBinder.prototype.unbindColumnHeader = function(item, cell) {
                TablixUtils.clearCellStyle(cell), TablixUtils.clearCellTextAndTooltip(cell);
                var sortableHeaderColumnMetadata = this.getSortableHeaderColumnMetadata(item);
                sortableHeaderColumnMetadata && this.unregisterColumnHeaderClickHandler(cell), this.options.showSortIcons && TablixUtils.removeSortIcons(cell);
            }, MatrixBinder.prototype.bindHeader = function(item, cell, cellElement, metadata, style, overwriteSubtotalLabel) {
                TablixUtils.addCellCssClass(cell, TablixUtils.CssClassTablixHeader), style.fontFamily = TablixUtils.FontFamilyHeader, 
                style.fontColor = TablixUtils.FontColorHeaders;
                var imgHeight = this.formattingProperties.grid.imageHeight;
                if (visuals.converterHelper.isImageUrlColumn(metadata) ? cell.contentHeight = imgHeight : item.isSubtotal ? cell.contentHeight = this.textHeightTotal : cell.contentHeight = this.textHeightValue, 
                item.isSubtotal && (TablixUtils.addCellCssClass(cell, TablixUtils.CssClassTablixValueTotal), 
                style.fontFamily = TablixUtils.FontFamilyTotal, !overwriteSubtotalLabel)) return TablixUtils.setCellTextAndTooltip(this.options.totalLabel, cellElement, cell.extension.contentHost), 
                void (cell.contentWidth = powerbi.TextMeasurementService.measureSvgTextWidth(this.textPropsTotal, this.options.totalLabel));
                var value = this.getHeaderLabel(item);
                return value ? TablixUtils.getUrlScheme(metadata, value) !== UrlScheme.NONE ? (TablixUtils.appendATagToBodyCell(value, cellElement), 
                void (cell.contentWidth += powerbi.TextMeasurementService.measureSvgTextWidth(this.textPropsHeader, value))) : visuals.converterHelper.isImageUrlColumn(metadata) && UrlUtils.isValidImageUrl(value) ? (TablixUtils.appendImgTagToBodyCell(item.valueFormatted, cellElement, imgHeight), 
                void (cell.contentWidth += imgHeight * TablixUtils.ImageDefaultAspectRatio)) : (TablixUtils.setCellTextAndTooltip(value, cellElement, cell.extension.contentHost), 
                void (cell.contentWidth += powerbi.TextMeasurementService.measureSvgTextWidth(item.isSubtotal ? this.textPropsTotal : this.textPropsHeader, value))) : void (cellElement.innerHTML = TablixUtils.StringNonBreakingSpace);
            }, MatrixBinder.prototype.applyWordWrapping = function(item, cell) {
                if (1 === cell.type) {
                    var metadata = this.hierarchyNavigator.getRowHeaderMetadata(item);
                    if (!visuals.converterHelper.isWebUrlColumn(metadata) && !visuals.converterHelper.isImageUrlColumn(metadata)) {
                        var containerElement = cell.extension.contentHost;
                        visuals.controls.HTMLElementUtils.clearChildren(containerElement);
                        var text = item.valueFormatted, style = new CellStyle();
                        MatrixStyler.setRowHeaderStyle(item.position, item, style, !1, this.formattingProperties);
                        for (var maxWidth = cell.containerWidth - (style.getExtraRight() + style.getExtraLeft()), maxHeight = cell.containerHeight - (style.getExtraTop() + style.getExtraBottom()), maxLines = Math.floor(maxHeight / this.textHeightHeader), lines = jsCommon.WordBreaker.splitByWidth(text, this.textPropsHeader, powerbi.TextMeasurementService.measureSvgTextWidth, maxWidth, maxLines, null, !0), _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                            var line = lines_1[_i];
                            TablixUtils.appendDiv(containerElement, line);
                        }
                    }
                }
            }, MatrixBinder.prototype.registerColumnHeaderClickHandler = function(columnMetadata, cell) {
                var _this = this;
                if (this.options.onColumnHeaderClick) {
                    var handler = function(e) {
                        if (TablixUtils.isValidSortClick(e)) {
                            var sortDirection = TablixUtils.reverseSort(columnMetadata.sort);
                            _this.options.onColumnHeaderClick(columnMetadata.queryName ? columnMetadata.queryName : columnMetadata.displayName, sortDirection);
                        }
                    };
                    cell.extension.registerClickHandler(handler);
                }
            }, MatrixBinder.prototype.unregisterColumnHeaderClickHandler = function(cell) {
                this.options.onColumnHeaderClick && cell.extension.unregisterClickHandler();
            }, MatrixBinder.prototype.bindBodyCell = function(item, cell) {
                TablixUtils.resetCellCssClass(cell);
                var cellStyle = new TablixUtils.CellStyle();
                cell.contentHeight = this.textHeightValue;
                var kpi = item.kpiContent;
                if (kpi) $(cell.extension.contentHost).append(kpi), cell.contentWidth = this.fontSizeValue; else {
                    var textProps = this.textPropsValue;
                    TablixUtils.addCellCssClass(cell, TablixUtils.CssClassTablixValueNumeric), item.isTotal && (TablixUtils.addCellCssClass(cell, TablixUtils.CssClassTablixValueTotal), 
                    cellStyle.fontFamily = TablixUtils.FontFamilyTotal, cell.contentHeight = this.textHeightTotal, 
                    textProps = this.textPropsTotal);
                    var textContent = item.textContent;
                    textContent && (TablixUtils.setCellTextAndTooltip(textContent, cell.extension.contentHost), 
                    cell.contentWidth = powerbi.TextMeasurementService.measureSvgTextWidth(textProps, textContent));
                }
                cell.contentWidth = Math.ceil(cell.contentWidth), MatrixStyler.setBodyCellStyle(cell.position, item, cellStyle, !1, this.formattingProperties), 
                cell.applyStyle(cellStyle);
            }, MatrixBinder.prototype.unbindBodyCell = function(item, cell) {
                TablixUtils.clearCellStyle(cell), TablixUtils.clearCellTextAndTooltip(cell);
            }, MatrixBinder.prototype.bindCornerCell = function(item, cell) {
                TablixUtils.resetCellCssClass(cell);
                var cellStyle = new CellStyle();
                cellStyle.fontFamily = TablixUtils.FontFamilyHeader, cellStyle.fontColor = TablixUtils.FontColorHeaders, 
                cell.contentHeight = this.textHeightHeader, cell.contentWidth = 0;
                var cellElement = cell.extension.contentHost;
                if (cellElement = TablixUtils.appendDiv(cellElement), cellElement.classList.add(TablixUtils.CssClassWrappingContainer), 
                item.isColumnHeaderLeaf && (TablixUtils.addCellCssClass(cell, TablixUtils.CssClassTablixColumnHeaderLeaf), 
                cellStyle.borders.bottom = new EdgeSettings(TablixObjects.PropGridOutlineWeight.defaultValue, TablixObjects.PropGridOutlineColor.defaultValue), 
                this.options.showSortIcons)) {
                    var cornerHeaderMetadata = this.getSortableCornerColumnMetadata(item);
                    cornerHeaderMetadata && (this.registerColumnHeaderClickHandler(cornerHeaderMetadata, cell), 
                    cellElement = TablixUtils.addSortIconToColumnHeader(cornerHeaderMetadata ? cornerHeaderMetadata.sort : void 0, cellElement), 
                    cornerHeaderMetadata.sort && (cell.contentWidth = this.fontSizeHeader + TablixUtils.SortIconPadding));
                }
                TablixUtils.setCellTextAndTooltip(item.displayName, cellElement, cell.extension.contentHost), 
                cell.contentWidth += powerbi.TextMeasurementService.measureSvgTextWidth(this.textPropsHeader, item.displayName), 
                cell.contentWidth = Math.ceil(cell.contentWidth), item.isRowHeaderLeaf && TablixUtils.addCellCssClass(cell, TablixUtils.CssClassMatrixRowHeaderLeaf), 
                TablixUtils.addCellCssClass(cell, TablixUtils.CssClassTablixHeader), MatrixStyler.setCornerCellStyle(cell.position, cellStyle, !1, this.formattingProperties), 
                cell.applyStyle(cellStyle), cell.extension.disableDragResize();
            }, MatrixBinder.prototype.unbindCornerCell = function(item, cell) {
                TablixUtils.clearCellStyle(cell), TablixUtils.clearCellTextAndTooltip(cell), this.options.showSortIcons && TablixUtils.removeSortIcons(cell), 
                item.isColumnHeaderLeaf && this.unregisterColumnHeaderClickHandler(cell);
            }, MatrixBinder.prototype.bindEmptySpaceHeaderCell = function(cell) {}, MatrixBinder.prototype.unbindEmptySpaceHeaderCell = function(cell) {}, 
            MatrixBinder.prototype.bindEmptySpaceFooterCell = function(cell) {}, MatrixBinder.prototype.unbindEmptySpaceFooterCell = function(cell) {}, 
            MatrixBinder.prototype.getHeaderLabel = function(item) {
                return item.valueFormatted;
            }, MatrixBinder.prototype.getCellContent = function(item) {
                return item.textContent || "";
            }, MatrixBinder.prototype.hasRowGroups = function() {
                var rows = this.hierarchyNavigator.getRowHierarchy();
                return !(!rows || !rows.levels || 0 === rows.levels.length);
            }, MatrixBinder.prototype.getSortableCornerColumnMetadata = function(item) {
                if (item.isColumnHeaderLeaf) return item.metadata;
            }, MatrixBinder.prototype.getSortableHeaderColumnMetadata = function(item) {
                var rows = this.hierarchyNavigator.getRowHierarchy();
                if (!rows || !rows.levels || 0 === rows.levels.length) return null;
                var valueSources = this.hierarchyNavigator.getValueSources(), isMultiMeasure = valueSources && valueSources.length > 1, columns = this.hierarchyNavigator.getColumnHierarchy(), columnGroupCount = columns ? columns.levels.length : 0;
                isMultiMeasure ? columnGroupCount-- : 1 === columnGroupCount && columns.levels[0] && columns.levels[0].sources && columns.levels[0].sources[0] && columns.levels[0].sources[0].roles && columns.levels[0].sources[0].roles.Values && (columnGroupCount = 0);
                var valueIndex = -1;
                return 0 === columnGroupCount ? valueIndex = item.levelSourceIndex : item.isSubtotal && (isMultiMeasure ? item.parent && 0 === item.parent.level && (valueIndex = item.levelSourceIndex) : 0 === item.level && (valueIndex = item.levelSourceIndex)), 
                valueIndex !== -1 ? (valueIndex = valueIndex ? valueIndex : 0, valueSources[valueIndex]) : null;
            }, MatrixBinder;
        }();
        visuals.MatrixBinder = MatrixBinder;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        function createMatrixHierarchyNavigator(matrix, isDataComplete, formatter, compositeGroupSeparator, update) {
            void 0 === update && (update = !0);
            var hierarchyNavigator = new MatrixHierarchyNavigator(formatter, compositeGroupSeparator);
            return update && hierarchyNavigator.update(matrix, !1, !1, !1, isDataComplete, !0), 
            hierarchyNavigator;
        }
        var CellPosition = powerbi.visuals.controls.internal.TablixUtils.CellPosition, TablixObjects = powerbi.visuals.controls.internal.TablixObjects, TablixUtils = powerbi.visuals.controls.internal.TablixUtils, TablixVisualCell = TablixUtils.TablixVisualCell, MatrixVisualBodyItem = function(_super) {
            function MatrixVisualBodyItem(dataPoint, objects, rowItem, columnItem, columnMetadata, formatter, nullsAreBlank) {
                var rowGreatestParent, columnGreatestParent, _this = this;
                if (rowItem) for (rowGreatestParent = rowItem; rowGreatestParent.parent; ) rowGreatestParent = rowGreatestParent.parent;
                if (columnItem) for (columnGreatestParent = columnItem; columnGreatestParent.parent; ) columnGreatestParent = columnGreatestParent.parent;
                var isColumnGrandTotal = columnGreatestParent && !!columnGreatestParent.isSubtotal, isColumnSubtotal = !isColumnGrandTotal && columnItem && !!columnItem.isSubtotal, isRowGrandTotal = rowGreatestParent && !!rowGreatestParent.isSubtotal, isRowSubtotal = !isRowGrandTotal && rowItem && !!rowItem.isSubtotal;
                return _this = _super.call(this, dataPoint, objects, isRowSubtotal, isColumnSubtotal, isRowGrandTotal, isColumnGrandTotal, columnMetadata, formatter, nullsAreBlank) || this, 
                _this.rowItem = rowItem, _this.columnItem = columnItem, _this;
            }
            return __extends(MatrixVisualBodyItem, _super), Object.defineProperty(MatrixVisualBodyItem.prototype, "isMeasure", {
                get: function() {
                    return !0;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(MatrixVisualBodyItem.prototype, "isValidUrl", {
                get: function() {
                    return !1;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(MatrixVisualBodyItem.prototype, "isValidImage", {
                get: function() {
                    return !1;
                },
                enumerable: !0,
                configurable: !0
            }), MatrixVisualBodyItem;
        }(TablixVisualCell);
        visuals.MatrixVisualBodyItem = MatrixVisualBodyItem, visuals.createMatrixHierarchyNavigator = createMatrixHierarchyNavigator;
        var MatrixHierarchyNavigator = function() {
            function MatrixHierarchyNavigator(formatter, compositeGroupSeparator) {
                this.formatter = formatter, this.compositeGroupSeparator = compositeGroupSeparator;
            }
            return MatrixHierarchyNavigator.prototype.getColumnHierarchyDepth = function() {
                return Math.max(this.columnHierarchy.levels.length, 1);
            }, MatrixHierarchyNavigator.prototype.getRowHierarchyDepth = function() {
                return Math.max(this.rowHierarchy.levels.length, 1);
            }, MatrixHierarchyNavigator.prototype.getLeafCount = function(hierarchy) {
                var matrixHierarchy = this.getMatrixHierarchy(hierarchy);
                return matrixHierarchy ? matrixHierarchy.leafNodes.length : 0;
            }, MatrixHierarchyNavigator.prototype.getLeafAt = function(hierarchy, index) {
                var matrixHierarchy = this.getMatrixHierarchy(hierarchy);
                return matrixHierarchy ? matrixHierarchy.leafNodes[index] : null;
            }, MatrixHierarchyNavigator.prototype.getLeafIndex = function(item) {
                return item.leafIndex;
            }, MatrixHierarchyNavigator.prototype.getParent = function(item) {
                return 0 === item.level ? null : item.parent;
            }, MatrixHierarchyNavigator.prototype.getIndex = function(item) {
                return item ? item.index : -1;
            }, MatrixHierarchyNavigator.prototype.isLeaf = function(item) {
                return !item.children || 0 === item.children.length;
            }, MatrixHierarchyNavigator.prototype.isRowHierarchyLeaf = function(item) {
                return !0;
            }, MatrixHierarchyNavigator.prototype.isColumnHierarchyLeaf = function(item) {
                return !1;
            }, MatrixHierarchyNavigator.prototype.isFirstItem = function(item, items) {
                return item === _.first(items);
            }, MatrixHierarchyNavigator.prototype.areAllParentsFirst = function(item, items) {
                if (!item) return !1;
                var parent = this.getParent(item);
                return parent ? this.isFirstItem(item, item.siblings) && this.areAllParentsFirst(parent, parent.siblings) : this.isFirstItem(item, item.siblings);
            }, MatrixHierarchyNavigator.prototype.isLastItem = function(item, items) {
                if (item !== _.last(items)) return !1;
                if (!this.isItemRow(item) || this.isDataComplete) return !0;
                for (var parent = item.parent; parent; ) {
                    if (parent !== _.last(parent.siblings)) return !0;
                    parent = parent.parent;
                }
                return !1;
            }, MatrixHierarchyNavigator.prototype.isItemRow = function(item) {
                if (!item) return !1;
                for (var firstLevelParent = item; firstLevelParent.parent; ) firstLevelParent = firstLevelParent.parent;
                return firstLevelParent.siblings === this.rowHierarchy.root.children;
            }, MatrixHierarchyNavigator.prototype.areAllParentsLast = function(item, items) {
                if (!item) return !1;
                var parent = this.getParent(item);
                return parent ? this.isLastItem(item, item.siblings) && this.areAllParentsLast(parent, parent.siblings) : this.isLastItem(item, item.siblings);
            }, MatrixHierarchyNavigator.prototype.getChildren = function(item) {
                return item.children;
            }, MatrixHierarchyNavigator.prototype.getChildrenLevelDifference = function(item) {
                for (var diff = 1 / 0, children = this.getChildren(item), i = 0, ilen = children.length; i < ilen; i++) diff = Math.min(diff, children[i].level - item.level);
                return diff;
            }, MatrixHierarchyNavigator.prototype.getCount = function(items) {
                return items.length;
            }, MatrixHierarchyNavigator.prototype.getAt = function(items, index) {
                return items[index];
            }, MatrixHierarchyNavigator.prototype.getLevel = function(item) {
                return item.level;
            }, MatrixHierarchyNavigator.prototype.getRowLeafIndex = function(rowItem) {
                return this.isSteppedLayout && rowItem.isSubtotal ? rowItem.parent ? !this.valuesOnRow && this.areRowSubtotalsBefore ? rowItem.parent.leafIndex : rowItem.leafIndex : this.valuesOnRow ? rowItem.levelSourceIndex : -1 : rowItem.leafIndex;
            }, MatrixHierarchyNavigator.prototype.getIntersection = function(rowItem, columnItem) {
                var node, valueSource, bodyCell, colIndex = columnItem.leafIndex;
                node = rowItem.values ? rowItem.values[columnItem.leafIndex] : void 0, node ? (valueSource = this.valueSources[node.valueSourceIndex || 0], 
                bodyCell = new MatrixVisualBodyItem(node.value, node.objects, rowItem, columnItem, valueSource, this.formatter, (!1))) : bodyCell = new MatrixVisualBodyItem((void 0), (void 0), rowItem, columnItem, (void 0), this.formatter, (!1));
                var rowIndex = this.getRowLeafIndex(rowItem);
                return bodyCell.position.row.index = rowIndex, bodyCell.position.row.indexInSiblings = rowItem.siblings.indexOf(rowItem), 
                bodyCell.position.row.isFirst = 0 === rowIndex, bodyCell.position.row.isLast = this.isDataComplete && rowIndex === this.rowHierarchy.leafNodes.length - 1, 
                bodyCell.position.column.index = colIndex, bodyCell.position.column.indexInSiblings = columnItem.siblings.indexOf(columnItem), 
                bodyCell.position.column.isFirst = 0 === colIndex, bodyCell.position.column.isLast = colIndex === this.columnHierarchy.leafNodes.length - 1, 
                node && node.objects && (bodyCell.backColor = TablixObjects.PropValuesBackColor.getValue(node.objects), 
                bodyCell.fontColor = TablixObjects.PropValuesFontColor.getValue(node.objects)), 
                bodyCell;
            }, MatrixHierarchyNavigator.prototype.getCorner = function(rowLevel, columnLevel) {
                var columnLevels = this.columnHierarchy.levels, rowLevels = this.rowHierarchy.levels;
                if (columnLevel === columnLevels.length - 1 || 0 === columnLevels.length) {
                    var levelSource = rowLevels[rowLevel];
                    if (levelSource) {
                        var isRowHeaderLeaf = rowLevel === rowLevels.length - 1, isMeasureCorner = this.valuesOnRow && isRowHeaderLeaf, hasMetadata = 1 === levelSource.sources.length || levelSource.sources.length > 1 && isMeasureCorner;
                        return {
                            metadata: hasMetadata ? levelSource.sources[0] : null,
                            displayName: isMeasureCorner ? "" : _.map(levelSource.sources, function(source) {
                                return source.displayName;
                            }).join(this.compositeGroupSeparator),
                            isColumnHeaderLeaf: !0,
                            isRowHeaderLeaf: isRowHeaderLeaf,
                            position: this.calculateCornerCellPosition(rowLevel, columnLevel),
                            rowLevel: rowLevel,
                            columnLevel: columnLevel
                        };
                    }
                }
                if (rowLevel === rowLevels.length - 1) {
                    var levelSource = columnLevels[columnLevel];
                    if (levelSource) return {
                        metadata: 1 === levelSource.sources.length ? levelSource.sources[0] : null,
                        displayName: _.map(levelSource.sources, function(source) {
                            return source.displayName;
                        }).join(this.compositeGroupSeparator),
                        isColumnHeaderLeaf: !1,
                        isRowHeaderLeaf: !0,
                        position: this.calculateCornerCellPosition(rowLevel, columnLevel),
                        rowLevel: rowLevel,
                        columnLevel: columnLevel
                    };
                }
                return {
                    metadata: null,
                    displayName: "",
                    isColumnHeaderLeaf: !1,
                    isRowHeaderLeaf: !1,
                    position: this.calculateCornerCellPosition(rowLevel, columnLevel),
                    rowLevel: rowLevel,
                    columnLevel: columnLevel
                };
            }, MatrixHierarchyNavigator.prototype.calculateCornerCellPosition = function(rowLevel, columnLevel) {
                var position = new CellPosition(), rowIdx = columnLevel;
                position.row.index = position.row.indexInSiblings = rowIdx, position.row.isFirst = 0 === rowIdx;
                var columnHierarchyDepth = this.getColumnHierarchyDepth();
                position.row.isLast = columnLevel === columnHierarchyDepth - 1;
                var colIdx = rowLevel;
                position.column.index = position.column.indexInSiblings = colIdx, position.column.isFirst = 0 === colIdx;
                var rowHierarchyDepth = this.getRowHierarchyDepth();
                return position.column.isLast = colIdx === rowHierarchyDepth - 1, position;
            }, MatrixHierarchyNavigator.prototype.headerItemEquals = function(item1, item2) {
                return !(!item1 || !item2) && item1 === item2;
            }, MatrixHierarchyNavigator.prototype.bodyCellItemEquals = function(item1, item2) {
                return item1.position.isMatch(item2.position);
            }, MatrixHierarchyNavigator.prototype.cornerCellItemEquals = function(item1, item2) {
                var corner1 = item1, corner2 = item2;
                return !(!corner1 || !corner2) && (corner1.displayName === corner2.displayName && corner1.isColumnHeaderLeaf === corner2.isColumnHeaderLeaf && corner1.isRowHeaderLeaf === corner2.isRowHeaderLeaf && corner1.metadata === corner2.metadata);
            }, MatrixHierarchyNavigator.prototype.getColumnHierarchy = function() {
                return this.columnHierarchy;
            }, MatrixHierarchyNavigator.prototype.getRowHierarchy = function() {
                return this.rowHierarchy;
            }, MatrixHierarchyNavigator.prototype.getValueSources = function() {
                return this.valueSources;
            }, MatrixHierarchyNavigator.prototype.valuesOnRowApplied = function() {
                return this.valuesOnRow;
            }, MatrixHierarchyNavigator.prototype.update = function(matrix, isStepped, valuesOnRow, areRowSubtotalsBefore, isDataComplete, updateColumns) {
                var _this = this;
                this.isSteppedLayout = isStepped, this.valuesOnRow = valuesOnRow, this.areRowSubtotalsBefore = areRowSubtotalsBefore, 
                this.isDataComplete = isDataComplete, this.valueSources = matrix.valueSources, this.rowHierarchy = this.wrapHierarchy(matrix.rows), 
                updateColumns = updateColumns || this.valuesOnRow, updateColumns && (this.columnHierarchy = this.wrapHierarchy(matrix.columns)), 
                this.valuesOnRow && this.pivotValues(), this.updateHierarchy(this.rowHierarchy, this.isSteppedLayout, this.areRowSubtotalsBefore, function(item, items) {
                    return _this.calculateRowHeaderPosition(item, items);
                }), updateColumns && (this.updateHierarchy(this.columnHierarchy, !1, !1, function(item, items) {
                    return _this.calculateColumnHeaderPosition(item, items);
                }), this.updateStaticColumnHeaders(this.columnHierarchy));
            }, MatrixHierarchyNavigator.prototype.pivotValues = function() {
                this.removeValueNodesFromColumnHierarchy(this.columnHierarchy.root.children), this.addValueNodesToRowHierarchy(this.rowHierarchy.root.children, this.rowHierarchy.levels.length > 0), 
                this.moveValueLevelFromColumnToRowHierarchy();
            }, MatrixHierarchyNavigator.prototype.removeValueNodesFromColumnHierarchy = function(nodes) {
                for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                    var node = nodes_1[_i];
                    if (!node.parent && this.isLeaf(node)) return nodes.length = 0, void nodes.push({
                        level: 0
                    });
                    this.isLeaf(node.children[0]) ? node.children = void 0 : this.removeValueNodesFromColumnHierarchy(node.children);
                }
            }, MatrixHierarchyNavigator.prototype.addValueNodesToRowHierarchy = function(nodes, hasRowGrouping) {
                for (var rowHierarchyDepth = this.getRowHierarchyDepth(), nodesCount = nodes.length, nodeIndex = 0; nodeIndex < nodesCount; nodeIndex++) {
                    var node = nodes[nodeIndex];
                    if (this.isLeaf(node)) {
                        var valueSourceCount = this.valueSources.length, container = void 0, insertIndex = void 0, level = void 0;
                        this.isSteppedLayout && node.isSubtotal || !hasRowGrouping ? (nodes.splice(nodeIndex, 1), 
                        container = nodes, insertIndex = nodeIndex, level = node.level, nodesCount = nodesCount - 1 + valueSourceCount, 
                        nodeIndex = nodeIndex - 1 + valueSourceCount) : (node.children = [], container = node.children, 
                        insertIndex = 0, level = rowHierarchyDepth);
                        for (var i = 0; i < valueSourceCount; i++) {
                            var valueNode = this.createRowValueNode(i, valueSourceCount, node, level);
                            container.splice(insertIndex++, 0, valueNode);
                        }
                        node.values = null;
                    } else this.addValueNodesToRowHierarchy(node.children, hasRowGrouping);
                }
            }, MatrixHierarchyNavigator.prototype.moveValueLevelFromColumnToRowHierarchy = function() {
                this.rowHierarchy.levels.push(this.columnHierarchy.levels.pop());
            }, MatrixHierarchyNavigator.prototype.createRowValueNode = function(valueSourceIndex, valueSourceCount, originalNode, level) {
                var valueNode = {
                    level: level,
                    levelSourceIndex: valueSourceIndex,
                    isSubtotal: originalNode.isSubtotal,
                    values: {}
                }, originalValuesIndex = 0, newValuesIndex = 0;
                for (var _1 in originalNode.values) originalValuesIndex % valueSourceCount === valueSourceIndex && (valueNode.values[newValuesIndex++] = originalNode.values[originalValuesIndex]), 
                originalValuesIndex++;
                return valueNode;
            }, MatrixHierarchyNavigator.prototype.wrapHierarchy = function(hierarchy) {
                var newHierarchy;
                return newHierarchy = this.valuesOnRow ? {
                    levels: this.wrapLevels(hierarchy.levels),
                    root: {
                        children: this.wrapNodes(hierarchy.root.children)
                    }
                } : powerbi.Prototype.inherit(hierarchy), newHierarchy.leafNodes = [], newHierarchy;
            }, MatrixHierarchyNavigator.prototype.wrapLevels = function(levels) {
                if (levels) {
                    for (var newLevels = [], _i = 0, levels_1 = levels; _i < levels_1.length; _i++) {
                        var level = levels_1[_i];
                        newLevels.push(powerbi.Prototype.inherit(level));
                    }
                    return newLevels;
                }
            }, MatrixHierarchyNavigator.prototype.wrapNodes = function(nodes) {
                if (nodes) {
                    for (var newNodes = [], _i = 0, nodes_2 = nodes; _i < nodes_2.length; _i++) {
                        var node = nodes_2[_i], newNode = powerbi.Prototype.inherit(node);
                        newNode.children = this.wrapNodes(node.children), newNodes.push(newNode);
                    }
                    return newNodes;
                }
            }, MatrixHierarchyNavigator.prototype.updateHierarchy = function(hierarchy, isStepped, subtotalsBefore, calculatePosition) {
                hierarchy.leafNodes.length > 0 && (hierarchy.leafNodes.length = 0), hierarchy.root.children && this.updateRecursive(hierarchy, hierarchy.root.children, null, hierarchy.leafNodes, isStepped, subtotalsBefore, calculatePosition);
            }, MatrixHierarchyNavigator.prototype.updateRecursive = function(hierarchy, nodes, parent, cache, isStepped, subtotalsBefore, calculatePosition) {
                for (var level, _this = this, i = 0, ilen = nodes.length; i < ilen; i++) {
                    var node = nodes[i];
                    if (node.siblings = nodes, parent && (node.parent = parent), level = this.isSteppedLayout && node.isSubtotal ? _.last(hierarchy.levels) : hierarchy.levels[node.level]) if (node.levelValues) {
                        var displayNames = _.map(node.levelValues, function(component) {
                            var source = level.sources[component.levelSourceIndex || 0];
                            return _this.formatter(component.value, void 0, source, TablixObjects.PropColumnFormatString, !1);
                        });
                        node.valueFormatted = displayNames.join(this.compositeGroupSeparator), node.queryName = 1 !== level.sources.length ? void 0 : level.sources[0].queryName;
                    } else {
                        var source = level.sources[node.levelSourceIndex || 0];
                        node.valueFormatted = source.displayName, node.queryName = source.queryName;
                    }
                    node.index = i, _.isEmpty(node.children) ? (!isStepped || !node.isSubtotal || !subtotalsBefore && node.parent && !node.parent.isSubtotal || this.valuesOnRow && node.parent) && (node.leafIndex = cache.length, 
                    cache.push(node)) : (isStepped && (node.leafIndex = cache.length, cache.push(node)), 
                    this.updateRecursive(hierarchy, node.children, node, cache, isStepped, subtotalsBefore, calculatePosition)), 
                    node.position = calculatePosition(node, nodes);
                }
            }, MatrixHierarchyNavigator.prototype.updateStaticColumnHeaders = function(columnHierarchy) {
                var columnLeafNodes = columnHierarchy.leafNodes;
                if (columnLeafNodes && columnLeafNodes.length > 0) {
                    if (!columnLeafNodes[0].identity && this.valuesOnRow && 1 === columnLeafNodes.length) return;
                    for (var columnLeafSources = columnHierarchy.levels[columnLeafNodes[0].level].sources, i = 0, ilen = columnLeafNodes.length; i < ilen; i++) {
                        var columnLeafNode = columnLeafNodes[i];
                        if (!columnLeafNode.identity && _.isEmpty(columnLeafNode.levelValues)) {
                            var source = columnLeafSources[columnLeafNode.levelSourceIndex ? columnLeafNode.levelSourceIndex : 0];
                            source && (columnLeafNode.valueFormatted = source.displayName);
                        }
                    }
                }
            }, MatrixHierarchyNavigator.prototype.getMatrixHierarchy = function(rootNodes) {
                var rowHierarchyRootNodes = this.rowHierarchy.root.children;
                if (rowHierarchyRootNodes && rootNodes === rowHierarchyRootNodes) return this.rowHierarchy;
                var columnHierarchyRootNodes = this.columnHierarchy.root.children;
                return columnHierarchyRootNodes && rootNodes === columnHierarchyRootNodes ? this.columnHierarchy : null;
            }, MatrixHierarchyNavigator.prototype.calculateRowHeaderPosition = function(item, items) {
                var position = new CellPosition();
                position.row.index = this.getRowLeafIndex(item), position.row.indexInSiblings = this.getIndex(item), 
                position.row.isFirst = this.areAllParentsFirst(item, items), position.row.isLast = this.areAllParentsLast(item, items);
                var colIdx = this.getLevel(item);
                return position.column.index = position.column.indexInSiblings = colIdx, position.column.isFirst = 0 === colIdx, 
                position.column.isLast = this.isLeaf(item), position;
            }, MatrixHierarchyNavigator.prototype.calculateColumnHeaderPosition = function(item, items) {
                var position = new CellPosition(), rowIdx = this.getLevel(item);
                position.row.index = position.row.indexInSiblings = rowIdx, position.row.isFirst = 0 === rowIdx, 
                position.row.isLast = this.isLeaf(item);
                var colIdx = this.getIndex(item);
                return position.column.index = position.column.indexInSiblings = colIdx, position.column.isFirst = this.areAllParentsFirst(item, items), 
                position.column.isLast = this.areAllParentsLast(item, items), position;
            }, MatrixHierarchyNavigator.prototype.getRowHeaderMetadata = function(item) {
                if (item && this.rowHierarchy) return this.getHierarchyMetadata(this.rowHierarchy, item.level);
            }, MatrixHierarchyNavigator.prototype.getColumnHeaderMetadata = function(item) {
                if (item && this.columnHierarchy) return this.getHierarchyMetadata(this.columnHierarchy, item.level);
            }, MatrixHierarchyNavigator.prototype.getHierarchyMetadata = function(hierarchy, level) {
                if (hierarchy && hierarchy.levels && !(hierarchy.levels.length < level)) {
                    var levelInfo = hierarchy.levels[level];
                    if (levelInfo && levelInfo.sources && 0 !== levelInfo.sources.length) return levelInfo.sources[0];
                }
            }, MatrixHierarchyNavigator.isNodeGrandTotal = function(node) {
                if (node) {
                    for (var nodeRoot = node; nodeRoot.parent; ) nodeRoot = nodeRoot.parent;
                    return nodeRoot.isSubtotal;
                }
                return !1;
            }, MatrixHierarchyNavigator;
        }();
        visuals.MatrixHierarchyNavigator = MatrixHierarchyNavigator;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var PivotTableBinderUtils;
        !function(PivotTableBinderUtils) {
            function addMeasureElement(container) {
                var measureElementBinding = {
                    content: "",
                    classNames: null,
                    styleProperties: {
                        position: "absolute",
                        left: "0",
                        top: "0",
                        visibility: "hidden"
                    },
                    attributes: null
                };
                return container.insertAdjacentHTML("beforeend", ElementBuilder.build(measureElementBinding, null)), 
                container.lastChild;
            }
            function measureText(text, textProperties) {
                return _.isEmpty(text) ? 0 : powerbi.TextMeasurementService.measureSvgTextWidth(textProperties, text);
            }
            function getWordWrappingLines(text, maxWidth, textProperties) {
                return _.isEmpty(text) ? [ text ] : WordBreaker.splitByWidth(text, textProperties, powerbi.TextMeasurementService.measureSvgTextWidth, maxWidth, TablixUtils.WordWrappingMaxLines, void 0, !0, !0);
            }
            function getNetWidth(width, cellStyle) {
                return Math.max(0, width - (cellStyle.getExtraLeft() + cellStyle.getExtraRight()));
            }
            function setUnselectedStyle(style) {
                style.opacity = unselectedOpacity;
            }
            function createKpiDomString(kpi, kpiValue) {
                return ElementBuilder.build({
                    content: "",
                    classNames: [ visuals.KpiUtil.getClassForKpi(kpi, kpiValue) || "" ],
                    styleProperties: {
                        display: "inline-block",
                        "vertical-align": "bottom",
                        margin: "0"
                    },
                    attributes: null
                }, null);
            }
            function buildImageTag(content, height) {
                var image = ElementBuilder.build({
                    content: "",
                    classNames: null,
                    styleProperties: {
                        "max-height": "100%",
                        "max-width": "100%"
                    },
                    attributes: {
                        src: content
                    }
                }, null, "img");
                return ElementBuilder.build({
                    content: image,
                    classNames: null,
                    styleProperties: {
                        height: PivotTableControl.pixelUnits(height),
                        width: PivotTableControl.pixelUnits(height),
                        "text-align": "center"
                    },
                    attributes: null
                }, null, "div");
            }
            function getUrlIconName(urlIcon, urlScheme) {
                return urlIcon ? TablixUtils.getUrlIconName(urlScheme) : null;
            }
            function buildUrlTag(text, hyperlink, iconName) {
                var classNames;
                return iconName && (classNames = [ TablixUtils.CssClassValueURLIcon, iconName ]), 
                ElementBuilder.build({
                    content: iconName ? "" : text,
                    classNames: classNames,
                    styleProperties: null,
                    attributes: {
                        href: hyperlink,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }
                }, null, "a");
            }
            function getSortIconHeight(glyphHeight) {
                return glyphHeight - 1;
            }
            function buildSortIconDiv(sortDirection, sortIconEnabled, showFuture, bottom, fontSize) {
                var classNames;
                return sortIconEnabled && (classNames = sortDirection ? [ "powervisuals-glyph", "sort-icon", getSortIconClass(sortDirection) ] : showFuture ? [ "powervisuals-glyph", "sort-icon", getSortIconClass(1), "future" ] : [ "sort-icon" ]), 
                ElementBuilder.build({
                    content: TablixUtils.StringNonBreakingSpace,
                    attributes: null,
                    styleProperties: {
                        "font-size": fontSize,
                        bottom: bottom + "px"
                    },
                    classNames: classNames
                }, null);
            }
            function getSortIconClass(sortDirection) {
                switch (sortDirection) {
                  case 1:
                    return "caret-up";

                  case 2:
                    return "caret-down";
                }
            }
            function isValidUrl(metadata, content) {
                return TablixUtils.getUrlScheme(metadata, content) !== UrlScheme.NONE;
            }
            function replaceEncodedNewLines(text) {
                return text ? text.replace(/&#10;/g, "<BR />") : text;
            }
            function isElementClickable(element) {
                return element && "a" === element.tagName.toLowerCase();
            }
            function elementSupportsContextMenu(element) {
                if (!element) return !1;
                var tagName = element.tagName.toLowerCase();
                return "a" === tagName || "img" === tagName;
            }
            function createFontInfo(fontProperties, measurer, includeLevels) {
                var fontInfo = {
                    measuredFontHeight: null,
                    textProperties: visuals.FontProperties.toTextProperties(fontProperties),
                    fontProperties: fontProperties,
                    nonInheritedFontProperties: visuals.FontProperties.excludeInheritedProperties(fontProperties, includeLevels)
                };
                return measurer.addItem(fontInfo), fontInfo;
            }
            function overrideFontInfo(fontInfo, overrides, measurer, includeLevels) {
                var newFontProperties = visuals.FontProperties.inherit(fontInfo.fontProperties, overrides);
                return createFontInfo(newFontProperties, measurer, includeLevels);
            }
            function applyFontInfo(fontInfo, cellStyle, excludeInherited) {
                var fontProperties = excludeInherited ? fontInfo.nonInheritedFontProperties : fontInfo.fontProperties;
                fontProperties.family && (cellStyle.fontFamily = fontProperties.family), fontProperties.size && (cellStyle.fontSize = fontProperties.size), 
                fontProperties.weight && (cellStyle.fontWeight = fontProperties.weight);
            }
            var ElementBuilder = powerbi.visuals.controls.pivotTable.ElementBuilder, PivotTableControl = powerbi.visuals.controls.pivotTable.PivotTableControl, TablixUtils = powerbi.visuals.controls.internal.TablixUtils, UrlScheme = jsCommon.UrlUtils.UrlScheme, WordBreaker = jsCommon.WordBreaker, unselectedOpacity = "0.3";
            PivotTableBinderUtils.cssClassCellInteractive = "cell-interactive", PivotTableBinderUtils.cssPivotTableCellClassNoWrap = "pivotTableCellNoWrap", 
            PivotTableBinderUtils.cssPivotTableCellClassWrap = "pivotTableCellWrap", PivotTableBinderUtils.CellHorizontalPadding = 5, 
            PivotTableBinderUtils.addMeasureElement = addMeasureElement, PivotTableBinderUtils.measureText = measureText, 
            PivotTableBinderUtils.getWordWrappingLines = getWordWrappingLines, PivotTableBinderUtils.getNetWidth = getNetWidth, 
            PivotTableBinderUtils.setUnselectedStyle = setUnselectedStyle, PivotTableBinderUtils.createKpiDomString = createKpiDomString, 
            PivotTableBinderUtils.buildImageTag = buildImageTag, PivotTableBinderUtils.getUrlIconName = getUrlIconName, 
            PivotTableBinderUtils.buildUrlTag = buildUrlTag, PivotTableBinderUtils.getSortIconHeight = getSortIconHeight, 
            PivotTableBinderUtils.buildSortIconDiv = buildSortIconDiv, PivotTableBinderUtils.getSortIconClass = getSortIconClass, 
            PivotTableBinderUtils.isValidUrl = isValidUrl, PivotTableBinderUtils.replaceEncodedNewLines = replaceEncodedNewLines, 
            PivotTableBinderUtils.isElementClickable = isElementClickable, PivotTableBinderUtils.elementSupportsContextMenu = elementSupportsContextMenu, 
            PivotTableBinderUtils.createFontInfo = createFontInfo, PivotTableBinderUtils.overrideFontInfo = overrideFontInfo, 
            PivotTableBinderUtils.applyFontInfo = applyFontInfo;
            var FontInfoMeasurer = function() {
                function FontInfoMeasurer() {
                    this.items = [];
                }
                return FontInfoMeasurer.prototype.addItem = function(fontInfo) {
                    this.items.push(fontInfo);
                }, FontInfoMeasurer.prototype.measureAll = function(measureElement) {
                    if (!_.isEmpty(this.items)) {
                        for (var elementStrings = [], _i = 0, _a = this.items; _i < _a.length; _i++) {
                            var item = _a[_i], binding = {
                                content: "a",
                                classNames: null,
                                styleProperties: visuals.FontProperties.toHTMLStyle(item.fontProperties),
                                attributes: null
                            };
                            elementStrings.push(ElementBuilder.build(binding, null));
                        }
                        var elementsString = elementStrings.join("");
                        measureElement.insertAdjacentHTML("beforeend", elementsString);
                        for (var element, isFirst = !0, _b = 0, _c = this.items; _b < _c.length; _b++) {
                            var item = _c[_b];
                            isFirst ? (isFirst = !1, element = measureElement.firstChild) : element = element.nextSibling, 
                            item.measuredFontHeight = Math.ceil(element.offsetHeight);
                        }
                        measureElement.innerHTML = "";
                    }
                }, FontInfoMeasurer;
            }();
            PivotTableBinderUtils.FontInfoMeasurer = FontInfoMeasurer;
        }(PivotTableBinderUtils = visuals.PivotTableBinderUtils || (visuals.PivotTableBinderUtils = {}));
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var PivotTableBinderUtils;
        !function(PivotTableBinderUtils) {
            function getColumnDataBarsSettings(column, dataBars) {
                if (dataBars) {
                    var min, max, columnAggregates = column.aggregates;
                    if (null != dataBars.minValue ? min = dataBars.minValue : columnAggregates && null != columnAggregates.min && _.isNumber(columnAggregates.min) && (min = columnAggregates.min), 
                    null != dataBars.maxValue ? max = dataBars.maxValue : columnAggregates && null != columnAggregates.max && _.isNumber(columnAggregates.max) && (max = columnAggregates.max), 
                    !(null == min || null == max || min > max)) {
                        var minSpecified = null != dataBars.minValue, maxSpecified = null != dataBars.maxValue;
                        min >= 0 && max > 0 && !minSpecified && (min = 0), min < 0 && max < 0 && !maxSpecified && (max = 0);
                        var zeroPosition;
                        return zeroPosition = 0 === min && 0 === max ? .5 : min >= 0 && max > 0 && minSpecified ? 0 : min < 0 && max <= 0 && maxSpecified ? 1 : (0 - min) / (max - min), 
                        {
                            min: min,
                            max: max,
                            range: max - min,
                            zeroPosition: zeroPosition,
                            positiveColor: dataBars.positiveColor && dataBars.positiveColor.solid && encodeHtml(dataBars.positiveColor.solid.color),
                            negativeColor: dataBars.negativeColor && dataBars.negativeColor.solid && encodeHtml(dataBars.negativeColor.solid.color),
                            axisColor: dataBars.axisColor && dataBars.axisColor.solid && encodeHtml(dataBars.axisColor.solid.color),
                            hideText: !!dataBars.hideText,
                            reverseDirection: !!dataBars.reverseDirection
                        };
                    }
                }
            }
            function buildDataBarCell(dataBarsSettings, cellStyle, value, contentHtml) {
                var left = cellStyle.getExtraLeft() + "px", right = cellStyle.getExtraRight() + "px", top = cellStyle.getExtraTop() + "px", bottom = cellStyle.getExtraBottom() + "px", contentWrapperHtml = dataBarsSettings.hideText ? "" : ElementBuilder.build({
                    content: contentHtml,
                    attributes: null,
                    classNames: [ "contentContainer" ],
                    styleProperties: null
                }, null), zeroPosition = dataBarsSettings.zeroPosition;
                dataBarsSettings.reverseDirection && (zeroPosition = 1 - zeroPosition);
                var axisHtml = ElementBuilder.build({
                    content: "",
                    attributes: null,
                    classNames: [ "dataBarAxis" ],
                    styleProperties: {
                        top: "-" + top,
                        bottom: "-" + bottom,
                        left: 100 * zeroPosition + "%",
                        "border-left-color": dataBarsSettings.axisColor
                    }
                }, null);
                return ElementBuilder.build({
                    content: buildDataBar(dataBarsSettings, value) + axisHtml + contentWrapperHtml,
                    attributes: {},
                    classNames: [],
                    styleProperties: {
                        position: "absolute",
                        left: left,
                        right: right,
                        top: top,
                        bottom: bottom
                    }
                }, null);
            }
            function buildDataBar(dataBarsSettings, value) {
                if (null == value || !_.isNumber(value) || 0 === value) return "";
                var min = dataBarsSettings.min, max = dataBarsSettings.max, range = dataBarsSettings.range, zeroPosition = dataBarsSettings.zeroPosition;
                if (value >= max) {
                    if (1 === zeroPosition) return "";
                    value = max;
                } else if (value <= min) {
                    if (0 === zeroPosition) return "";
                    value = min;
                }
                var barLeft, barRight, barColor;
                if (0 === range ? (barLeft = barRight = zeroPosition, barColor = dataBarsSettings.positiveColor) : value > 0 ? (barLeft = zeroPosition, 
                barRight = (value - min) / range, barColor = dataBarsSettings.positiveColor) : (barLeft = (value - min) / range, 
                barRight = zeroPosition, barColor = dataBarsSettings.negativeColor), dataBarsSettings.reverseDirection) {
                    var temp = barLeft;
                    barLeft = 1 - barRight, barRight = 1 - temp;
                }
                return ElementBuilder.build({
                    content: "",
                    attributes: {},
                    classNames: [ "dataBar" ],
                    styleProperties: {
                        left: 100 * barLeft + "%",
                        width: 100 * (barRight - barLeft) + "%",
                        background: barColor
                    }
                }, null);
            }
            var ElementBuilder = powerbi.visuals.controls.pivotTable.ElementBuilder, encodeHtml = jsCommon.StringExtensions.encodeHtml;
            PivotTableBinderUtils.getColumnDataBarsSettings = getColumnDataBarsSettings, PivotTableBinderUtils.buildDataBarCell = buildDataBarCell;
        }(PivotTableBinderUtils = visuals.PivotTableBinderUtils || (visuals.PivotTableBinderUtils = {}));
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var PivotTableSizeManagerUtils, TablixObjects = powerbi.visuals.controls.internal.TablixObjects;
        !function(PivotTableSizeManagerUtils) {
            function persistWidths(persistedWidths, hostServices, onPersisting) {
                for (var visualObjectInstancesToPersist = {
                    remove: [],
                    merge: []
                }, _i = 0, persistedWidths_1 = persistedWidths; _i < persistedWidths_1.length; _i++) {
                    var persistedWidth = persistedWidths_1[_i], visualObjectInstance = {
                        selector: persistedWidth.selector,
                        objectName: TablixObjects.PropColumnWidthValue.objectName,
                        properties: {}
                    };
                    visualObjectInstance.properties[TablixObjects.PropColumnWidthValue.propertyName] = persistedWidth.value, 
                    null == persistedWidth.value ? visualObjectInstancesToPersist.remove.push(visualObjectInstance) : visualObjectInstancesToPersist.merge.push(visualObjectInstance);
                }
                onPersisting && onPersisting(), hostServices.persistProperties(visualObjectInstancesToPersist);
            }
            PivotTableSizeManagerUtils.persistWidths = persistWidths;
        }(PivotTableSizeManagerUtils = visuals.PivotTableSizeManagerUtils || (visuals.PivotTableSizeManagerUtils = {}));
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var DomEventUtils = jsCommon.DomEventUtils, PivotTableControl = visuals.controls.pivotTable.PivotTableControl, PivotTableOptions = powerbi.visuals.PivotTableOptions, PivotTableRenderingMode = visuals.controls.pivotTable.PivotTableRenderingMode, TablixObjects = visuals.controls.internal.TablixObjects, TablixUtils = visuals.controls.internal.TablixUtils, PivotTable = function() {
            function PivotTable(options, enableDataBars) {
                this.options = options || PivotTableOptions.createDefaultConstructorOptions(), this.enableDataBars = enableDataBars, 
                this.suppressNextRender = !1;
            }
            return PivotTable.prototype.init = function(options) {
                var _this = this;
                this.element = options.element, this.formatter = visuals.valueFormatter.formatVariantMeasureValueWithDataPointObjects, 
                this.hostServices = options.host, this.waitingForData = !1, this.selectionManager = new visuals.PivotTableSelectionManager(this.hostServices), 
                this.sortingManager = new visuals.PivotTableSortingManager(this.hostServices), this.sizeManager = new visuals.PivotTableSizeManager(this.hostServices), 
                this.sizeManager.onPersisting = function() {
                    _this.suppressNextRender = !0;
                };
            }, PivotTable.prototype.update = function(options) {
                options.type & powerbi.VisualUpdateType.Data && this.onDataViewChanged(options.dataViews, options.operationKind, options.viewport), 
                this.pivotTableControl && options.type & powerbi.VisualUpdateType.Resize && (this.pivotTableControl.setWidth(options.viewport.width), 
                this.pivotTableControl.setHeight(options.viewport.height), this.renderControl(!1, null, null));
            }, PivotTable.getFormattingProperties = function(dataView) {
                return TablixObjects.getPivotTableObjects(dataView);
            }, PivotTable.prototype.updatePersistedWidths = function(previousDataView) {
                var currentAutoSizeColumns = TablixObjects.PropColumnPivotTableAutoSizeColumns.getValue(this.dataView.metadata.objects);
                if (!currentAutoSizeColumns && this.pivotTableControl) {
                    for (var columnsWidth = [], columnHeaders = this.columnHierarchyNavigator.getHierarchyLeafNodes(), pages = this.pivotTableControl.getColumnWidthMeasureManager().getPageColumns(), columnIndex = 0, _i = 0, pages_1 = pages; _i < pages_1.length; _i++) for (var page = pages_1[_i], widths = page.getColumnWidths(), _a = 0, widths_1 = widths; _a < widths_1.length; _a++) {
                        var width = widths_1[_a];
                        columnsWidth.push({
                            node: columnHeaders[columnIndex],
                            width: width
                        }), columnIndex++;
                    }
                    for (var cornersWidth = [], rowDepth = this.rowHierarchyNavigator.getHierarchyDepth(), colDepth = this.columnHierarchyNavigator.getHierarchyDepth(), i = 0; i < rowDepth; i++) cornersWidth.push({
                        corner: this.rowHierarchyNavigator.getCorner(i, colDepth - 1),
                        width: this.pivotTableControl.getRowLevelWidthMeasureManager().getLevelWidth(i)
                    });
                    this.sizeManager.setMissingWidths(columnsWidth, cornersWidth);
                } else if (currentAutoSizeColumns && previousDataView && previousDataView.metadata && previousDataView.metadata.objects && !TablixObjects.PropColumnPivotTableAutoSizeColumns.getValue(previousDataView.metadata.objects)) {
                    for (var columnHeaders = this.columnHierarchyNavigator.getHierarchyLeafNodes(), cornerItems = [], rowDepth = this.rowHierarchyNavigator.getHierarchyDepth(), colDepth = this.columnHierarchyNavigator.getHierarchyDepth(), i = 0; i < rowDepth; i++) cornerItems.push(this.rowHierarchyNavigator.getCorner(i, colDepth - 1));
                    this.sizeManager.clearWidths(columnHeaders, cornerItems), this.suppressNextRender = !1;
                }
            }, PivotTable.prototype.onDataViewChanged = function(dataViews, operationKind, viewport) {
                if (_.isEmpty(dataViews)) this.dataView = void 0, this.selectionManager.onDataViewChanged(void 0, void 0, this.rowHierarchyNavigator), 
                this.pivotTableControl && this.pivotTableControl.clear(); else {
                    var previousDataView = this.dataView;
                    this.dataView = dataViews[0];
                    var formattingProperties = PivotTable.getFormattingProperties(this.dataView), isDataComplete = !this.dataView.metadata.segment, valuesOnRow = formattingProperties.values.valuesOnRow && this.dataView.matrix.valueSources.length > 1;
                    operationKind === powerbi.VisualDataChangeOperationKind.Append ? this.onAppendDataView(previousDataView, formattingProperties, valuesOnRow, isDataComplete) : this.onNewDataView(previousDataView, formattingProperties, viewport, valuesOnRow, isDataComplete);
                }
                this.waitingForData = !1;
            }, PivotTable.prototype.onAppendDataView = function(previousDataView, formattingProperties, valuesOnRow, isDataComplete) {
                this.updateHierarchyNavigators(formattingProperties.rowHeaders.steppedLayout, valuesOnRow, formattingProperties.subtotals.rowSubtotalsPosition === visuals.rowSubtotalPosition.top, isDataComplete, previousDataView.matrix.rows.root !== this.dataView.matrix.rows.root), 
                this.selectionManager.onDataViewChanged(this.rowHierarchyNavigator.getHierarchyItems(), this.columnHierarchyNavigator.getHierarchyItems(), this.rowHierarchyNavigator), 
                this.renderControl(!1, null, null);
            }, PivotTable.prototype.onNewDataView = function(previousDataView, formattingProperties, viewport, valuesOnRow, isDataComplete) {
                this.updatePersistedWidths(previousDataView);
                var previousRowLeafCount, stepped = formattingProperties.rowHeaders.steppedLayout, visibleRowItemStart = this.getPreviousVisibleRowStart(), visibleColumnItemStart = this.getPreviousVisibleColumnStart();
                previousRowLeafCount = this.rowHierarchyNavigator ? this.rowHierarchyNavigator.getHierarchyLeafCount() : 0;
                var previousColumnLeafCount;
                previousColumnLeafCount = this.columnHierarchyNavigator ? this.columnHierarchyNavigator.getHierarchyLeafCount() : 0, 
                this.createOrUpdateControlAndNavigators(stepped, valuesOnRow, formattingProperties.subtotals.rowSubtotalsPosition === visuals.rowSubtotalPosition.top, isDataComplete);
                var columnHiearchy = this.matrixNavigator.getColumnHierarchy(), valueSources = this.matrixNavigator.getValueSources();
                this.sizeManager.onDataViewChanged(columnHiearchy, valueSources, this.dataView && this.dataView.metadata && this.dataView.metadata.objects, valuesOnRow), 
                this.sortingManager.onDataViewChanged(this.matrixNavigator.getRowHierarchy(), columnHiearchy, valueSources, stepped, valuesOnRow), 
                this.selectionManager.onDataViewChanged(this.rowHierarchyNavigator.getHierarchyItems(), this.columnHierarchyNavigator.getHierarchyItems(), this.rowHierarchyNavigator), 
                this.suppressNextRender && previousRowLeafCount === this.rowHierarchyNavigator.getHierarchyLeafCount() && previousColumnLeafCount === this.columnHierarchyNavigator.getHierarchyLeafCount() || (this.pivotTableControl.clear(), 
                this.pivotTableControl.setWidth(viewport.width), this.pivotTableControl.setHeight(viewport.height), 
                this.binder.updateFormattingProperties(this.dataView, formattingProperties), this.applyContainerStyles(), 
                this.renderControl(!0, this.getVisibleRowStart(visibleRowItemStart, visuals.PivotTableSortingManager.hasSortingChanged(previousDataView, this.dataView)), this.getVisibleColumnStart(visibleColumnItemStart))), 
                this.suppressNextRender = !1;
            }, PivotTable.prototype.applyContainerStyles = function() {
                var cornerContainerFontProperties = this.binder.getCornerContainerFontInfo().fontProperties, cornerContainerElement = this.pivotTableControl.getCornerContainer();
                visuals.FontProperties.applyStyleToElement(cornerContainerFontProperties, cornerContainerElement);
                var columnHeaderContainerFontProperties = this.binder.getColumnHeaderContainerFontInfo().fontProperties, columnHeaderContainerElement = this.pivotTableControl.getColumnHeaderContainer();
                visuals.FontProperties.applyStyleToElement(columnHeaderContainerFontProperties, columnHeaderContainerElement);
                var rowHeaderContainerFontProperties = this.binder.getRowHeaderContainerFontInfo().fontProperties, rowHeaderContainerElement = this.pivotTableControl.getRowHeaderContainer();
                visuals.FontProperties.applyStyleToElement(rowHeaderContainerFontProperties, rowHeaderContainerElement);
                var floatingRowHeaderContainerElement = this.pivotTableControl.getFloatingRowHeaderContainer();
                visuals.FontProperties.applyStyleToElement(rowHeaderContainerFontProperties, floatingRowHeaderContainerElement);
                var valueContainerFontProperties = this.binder.getValueContainerFontInfo().fontProperties, valueContainerElement = this.pivotTableControl.getBodyCellContainer();
                visuals.FontProperties.applyStyleToElement(valueContainerFontProperties, valueContainerElement);
                var floatingValueContainerElement = this.pivotTableControl.getFloatingBodyCellContainer();
                visuals.FontProperties.applyStyleToElement(valueContainerFontProperties, floatingValueContainerElement);
            }, PivotTable.prototype.onClearSelection = function() {
                this.selectionManager.clearLocal();
            }, PivotTable.prototype.updateHierarchyNavigators = function(stepped, valuesOnRow, areRowSubtotalsBefore, isDataComplete, rootChanged) {
                this.matrixNavigator.update(this.dataView.matrix, stepped, valuesOnRow, areRowSubtotalsBefore, isDataComplete, rootChanged), 
                this.rowHierarchyNavigator.setHierarchy(this.matrixNavigator.getRowHierarchy()), 
                this.columnHierarchyNavigator.setHierarchy(this.matrixNavigator.getColumnHierarchy());
            }, PivotTable.prototype.renderControl = function(clear, visibleRowStart, visibleColumnStart) {
                var mode = clear ? PivotTableRenderingMode.ClearMeasurement : PivotTableRenderingMode.Incremental;
                visibleRowStart || visibleColumnStart ? this.pivotTableControl.makeVisible(mode, visibleRowStart, visibleColumnStart) : this.pivotTableControl.render(mode);
            }, PivotTable.prototype.getPreviousVisibleRowStart = function() {
                if (this.pivotTableControl) {
                    var visibleRowStart = this.pivotTableControl.getVisibleRowStart();
                    if (!visibleRowStart) return null;
                    var visibleRowStartItem = this.rowHierarchyNavigator.getHierarchyLeafAt(visibleRowStart.rowIndex);
                    return visibleRowStartItem ? {
                        item: visibleRowStartItem,
                        offset: visibleRowStart.rowOffset
                    } : null;
                }
            }, PivotTable.prototype.getPreviousVisibleColumnStart = function() {
                if (this.pivotTableControl) {
                    var visibleColumnStart = this.pivotTableControl.getVisibleColumnStart();
                    if (!visibleColumnStart) return null;
                    var visibleColumnStartItem = this.columnHierarchyNavigator.getHierarchyLeafAt(visibleColumnStart.columnIndex);
                    return visibleColumnStartItem ? {
                        item: visibleColumnStartItem,
                        offset: visibleColumnStart.columnOffset
                    } : null;
                }
            }, PivotTable.prototype.getVisibleRowStart = function(previousVisibleRowStart, sortingChanged) {
                if (!previousVisibleRowStart) return null;
                if (sortingChanged) return {
                    rowIndex: 0,
                    rowOffset: Number.MAX_VALUE
                };
                var matchingRowStartItem = visuals.PivotTableSelectionManager.getMatchingHeader(previousVisibleRowStart.item, this.rowHierarchyNavigator.getHierarchyItems());
                if (!matchingRowStartItem || !this.rowHierarchyNavigator.isLeaf(matchingRowStartItem)) return null;
                var rowIndex = this.rowHierarchyNavigator.getLeafIndex(matchingRowStartItem);
                return void 0 === rowIndex ? null : {
                    rowIndex: rowIndex,
                    rowOffset: previousVisibleRowStart.offset
                };
            }, PivotTable.prototype.getVisibleColumnStart = function(previousVisibleColumnStart) {
                if (!previousVisibleColumnStart) return null;
                var matchingColumnStartItem = visuals.PivotTableSelectionManager.getMatchingHeader(previousVisibleColumnStart.item, this.columnHierarchyNavigator.getHierarchyItems());
                return matchingColumnStartItem && this.columnHierarchyNavigator.isLeaf(matchingColumnStartItem) ? {
                    columnIndex: this.columnHierarchyNavigator.getLeafIndex(matchingColumnStartItem),
                    columnOffset: previousVisibleColumnStart.offset
                } : null;
            }, PivotTable.prototype.renderSelection = function() {
                this.pivotTableControl.render(PivotTableRenderingMode.ClearRendering);
            }, PivotTable.prototype.createOrUpdateControlAndNavigators = function(stepped, valuesOnRow, areRowSubtotalsBefore, isDataComplete) {
                var _this = this, compositeGroupSeparator = this.hostServices.getLocalizedString("ListJoin_Separator");
                if (this.matrixNavigator || (this.matrixNavigator = new visuals.MatrixHierarchyNavigator(this.formatter, compositeGroupSeparator)), 
                this.rowHierarchyNavigator ? stepped ? this.rowHierarchyNavigator instanceof visuals.PivotTableSteppedHierarchyNavigator || (this.rowHierarchyNavigator = new visuals.PivotTableSteppedHierarchyNavigator(this.matrixNavigator)) : this.rowHierarchyNavigator instanceof visuals.PivotTableSteppedHierarchyNavigator && (this.rowHierarchyNavigator = new visuals.PivotTableHierarchyNavigator(this.matrixNavigator)) : (this.rowHierarchyNavigator = stepped ? new visuals.PivotTableSteppedHierarchyNavigator(this.matrixNavigator) : new visuals.PivotTableHierarchyNavigator(this.matrixNavigator), 
                this.columnHierarchyNavigator = new visuals.PivotTableHierarchyNavigator(this.matrixNavigator)), 
                this.updateHierarchyNavigators(stepped, valuesOnRow, areRowSubtotalsBefore, isDataComplete, !0), 
                this.pivotTableControl) this.pivotTableControl.getSteppedLayout() !== stepped && this.switchRowHeadersLayout(stepped); else {
                    var binderOptions = {
                        onBindRowHeader: function(item) {
                            _this.onBindRowHeader(item);
                        },
                        totalLabel: this.hostServices.getLocalizedString(TablixUtils.TotalLabel),
                        selectionEnabled: this.options.selection && this.options.selection.enabled,
                        sortingEnabled: this.options.sorting && this.options.sorting.enabled,
                        sortIconEnabled: this.options.sorting && this.options.sorting.showActiveSortIcon,
                        interactivityIndicatorEnabled: this.options.interactivityIndicatorEnabled
                    }, pivotTableContainer = document.createElement("div");
                    pivotTableContainer.className = "pivotTableContainer", this.element.append(pivotTableContainer), 
                    this.binder = new visuals.PivotTableBinder(binderOptions, this.selectionManager, this.sortingManager, pivotTableContainer), 
                    this.pivotTableControl = new PivotTableControl(pivotTableContainer, this.sizeManager, this.createControlOptions()), 
                    this.pivotTableControl.setClassName("pivotTable"), this.switchRowHeadersLayout(stepped), 
                    this.pivotTableControl.setColumnNavigator(this.columnHierarchyNavigator), this.binder.setColumnNavigator(this.columnHierarchyNavigator), 
                    this.pivotTableControl.setBinder(this.binder);
                }
            }, PivotTable.prototype.createControlOptions = function() {
                var _this = this, scrollingEnabled = this.options.scrolling.enabled, columnResizingEnabled = this.options.columnResizing.enabled;
                return this.options.selection.enabled ? {
                    rowHeaderClickHandler: function(rowHeader, mouseEvent) {
                        return _this.onItemClick(rowHeader, mouseEvent, visuals.PivotTableSelectionMode.RowHeader);
                    },
                    rowHeaderContextMenuHandler: function(rowHeader, mouseEvent) {
                        return _this.onItemContextMenu(rowHeader, mouseEvent, visuals.matrixRoleNames.rows);
                    },
                    columnHeaderClickHandler: function(columnHeader, mouseEvent) {
                        return _this.onItemClick(columnHeader, mouseEvent, visuals.PivotTableSelectionMode.ColumnHeader);
                    },
                    columnHeaderContextMenuHandler: function(columnHeader, mouseEvent) {
                        return _this.onItemContextMenu(columnHeader, mouseEvent, visuals.matrixRoleNames.columns);
                    },
                    bodyCellClickHandler: function(bodyCell, mouseEvent) {
                        return _this.onItemClick(bodyCell, mouseEvent, visuals.PivotTableSelectionMode.BodyCell);
                    },
                    bodyCellContextMenuHandler: function(bodyCell, mouseEvent) {
                        return _this.onItemContextMenu(bodyCell, mouseEvent, visuals.matrixRoleNames.rows);
                    },
                    cornerCellClickHandler: function(cornerCell, mouseEvent) {
                        return _this.onCornerCellClick(cornerCell, mouseEvent);
                    },
                    cornerCellContextMenuHandler: function(cornerCell, mouseEvent) {
                        return _this.onCornerCellContextMenu(cornerCell, mouseEvent);
                    },
                    whitespaceClickHandler: function(mouseEvent) {
                        return _this.onWhitespaceClick();
                    },
                    scrollingEnabled: scrollingEnabled,
                    columnResizingEnabled: columnResizingEnabled,
                    rowLevelResizingEnabled: columnResizingEnabled
                } : {
                    rowHeaderClickHandler: null,
                    rowHeaderContextMenuHandler: null,
                    columnHeaderClickHandler: null,
                    columnHeaderContextMenuHandler: null,
                    bodyCellClickHandler: null,
                    bodyCellContextMenuHandler: null,
                    whitespaceClickHandler: null,
                    cornerCellClickHandler: null,
                    cornerCellContextMenuHandler: null,
                    scrollingEnabled: scrollingEnabled,
                    columnResizingEnabled: columnResizingEnabled,
                    rowLevelResizingEnabled: columnResizingEnabled
                };
            }, PivotTable.prototype.onWhitespaceClick = function() {
                this.selectionManager.onWhitespaceClick(), this.renderSelection();
            }, PivotTable.prototype.onItemClick = function(item, mouseEvent, selectionMode) {
                if (!visuals.PivotTableBinderUtils.isElementClickable(DomEventUtils.getEventTarget(mouseEvent)) && !this.selectionManager.isDrillingEnabled(item, mouseEvent, selectionMode)) if (selectionMode === visuals.PivotTableSelectionMode.ColumnHeader && this.sortingManager.isColumnHeaderSortable(item)) this.options.sorting.enabled && this.sortingManager.sortColumnHeader(item); else {
                    var matchingItem = visuals.PivotTableSelectionManager.getMatchingItem(item, selectionMode, this.rowHierarchyNavigator.getHierarchyItems(), this.columnHierarchyNavigator.getHierarchyItems(), this.rowHierarchyNavigator);
                    matchingItem && (this.selectionManager.select(matchingItem, selectionMode, mouseEvent.ctrlKey), 
                    this.renderSelection());
                }
            }, PivotTable.prototype.onItemContextMenu = function(item, mouseEvent, roleName) {
                visuals.PivotTableBinderUtils.elementSupportsContextMenu(DomEventUtils.getEventTarget(mouseEvent)) || (mouseEvent.preventDefault(), 
                this.selectionManager.onItemContextMenu(item, mouseEvent, roleName));
            }, PivotTable.prototype.onCornerCellClick = function(cornerCell, mouseEvent) {
                this.options.sorting.enabled && this.sortingManager.isCornerSortable(cornerCell) && this.sortingManager.sortCorner(cornerCell);
            }, PivotTable.prototype.onCornerCellContextMenu = function(cornerCell, mouseEvent) {}, 
            PivotTable.prototype.switchRowHeadersLayout = function(stepped) {
                this.pivotTableControl.setSteppedLayout(stepped), this.pivotTableControl.setRowNavigator(this.rowHierarchyNavigator), 
                this.binder.setRowNavigator(this.rowHierarchyNavigator);
            }, PivotTable.prototype.onBindRowHeader = function(item) {
                this.needsMoreData(item) && (this.hostServices.loadMoreData(), this.waitingForData = !0);
            }, PivotTable.prototype.needsMoreData = function(item) {
                if (this.waitingForData || !this.dataView || !this.dataView.metadata || !this.dataView.metadata.segment) return !1;
                var leafCount = this.rowHierarchyNavigator.getHierarchyLeafCount(), loadMoreThreshold = leafCount * PivotTable.preferredLoadMoreThreshold;
                return this.rowHierarchyNavigator.getLeafIndex(item) >= loadMoreThreshold;
            }, PivotTable.prototype.enumerateObjectInstances = function(options) {
                var enumeration = new visuals.ObjectEnumerationBuilder();
                return this.dataView && TablixObjects.enumerateObjectInstances(options, enumeration, this.dataView, visuals.controls.TablixType.PivotTable), 
                enumeration.complete();
            }, PivotTable.prototype.enumerateObjectRepetition = function() {
                var enumeration = [];
                return this.dataView && TablixObjects.enumerateObjectRepetition(enumeration, this.dataView, visuals.controls.TablixType.PivotTable, this.enableDataBars), 
                enumeration;
            }, PivotTable.preferredLoadMoreThreshold = .8, PivotTable;
        }();
        visuals.PivotTable = PivotTable;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var CellStyle = powerbi.visuals.controls.internal.TablixUtils.CellStyle, CssConstants = jsCommon.CssConstants, EdgeSettings = powerbi.visuals.controls.internal.TablixUtils.EdgeSettings, FontSize = visuals.Units.FontSize, TablixObjects = powerbi.visuals.controls.internal.TablixObjects, TablixUtils = powerbi.visuals.controls.internal.TablixUtils, encodeHtml = jsCommon.StringExtensions.encodeHtml, UrlScheme = jsCommon.UrlUtils.UrlScheme, PivotTableBinder = function() {
            function PivotTableBinder(options, selectionManager, sortingManager, container) {
                this.selectionManager = selectionManager, this.sortingManager = sortingManager, 
                this.binderOptions = options, this.measureElement = visuals.PivotTableBinderUtils.addMeasureElement(container);
            }
            return PivotTableBinder.prototype.setRowNavigator = function(rowHierarchyNavigator) {
                this.rowNavigator = rowHierarchyNavigator;
            }, PivotTableBinder.prototype.setColumnNavigator = function(columnHierarchyNavigator) {
                this.columnNavigator = columnHierarchyNavigator;
            }, PivotTableBinder.prototype.getRowHeaderBinding = function(rowHeader, forMeasure) {
                this.binderOptions.onBindRowHeader && !forMeasure && this.binderOptions.onBindRowHeader(rowHeader);
                var content = encodeHtml(this.getRowHeaderLabel(rowHeader)), title = content;
                this.formattingProperties.rowHeaders.wordWrap && (content = visuals.PivotTableBinderUtils.replaceEncodedNewLines(content)), 
                _.isEmpty(content) && (content = TablixUtils.StringNonBreakingSpace);
                var iconName, metadata = this.rowNavigator.getRowHeaderMetadata(rowHeader), urlType = TablixUtils.getUrlScheme(metadata, content);
                if (urlType !== UrlScheme.NONE) {
                    var hyperlink = encodeHtml(rowHeader.valueFormatted);
                    iconName = visuals.PivotTableBinderUtils.getUrlIconName(this.formattingProperties.rowHeaders.urlIcon, urlType), 
                    content = visuals.PivotTableBinderUtils.buildUrlTag(content, hyperlink, iconName);
                } else TablixUtils.isImage(rowHeader, metadata) && (content = visuals.PivotTableBinderUtils.buildImageTag(content, this.formattingProperties.grid.imageHeight));
                return {
                    content: content,
                    classNames: this.getRowHeaderClasses(rowHeader, !!iconName),
                    styleProperties: this.getRowHeaderStyleAttributes(rowHeader, forMeasure),
                    attributes: {
                        title: title
                    }
                };
            }, PivotTableBinder.prototype.getColumnHeaderBinding = function(columnHeader, forMeasure) {
                var content = encodeHtml(this.getColumnHeaderLabel(columnHeader)), title = content;
                this.formattingProperties.columnHeaders.wordWrap && (content = visuals.PivotTableBinderUtils.replaceEncodedNewLines(content)), 
                _.isEmpty(content) && (content = TablixUtils.StringNonBreakingSpace);
                var cellStyle = this.getColumnHeaderStyle(columnHeader, this.getColumnHeaderFontInfo(columnHeader), forMeasure), originalBottom = cellStyle.getExtraBottom();
                columnHeader.position.row.isLast && (cellStyle.paddings.bottom += visuals.PivotTableBinderUtils.getSortIconHeight(this.glyphFontInfo.measuredFontHeight));
                var iconName, metadata = this.columnNavigator.getColumnHeaderMetadata(columnHeader), urlType = TablixUtils.getUrlScheme(metadata, content);
                if (urlType !== UrlScheme.NONE) {
                    var hyperlink = encodeHtml(columnHeader.valueFormatted);
                    iconName = visuals.PivotTableBinderUtils.getUrlIconName(this.formattingProperties.columnHeaders.urlIcon, urlType), 
                    content = visuals.PivotTableBinderUtils.buildUrlTag(content, hyperlink, iconName);
                } else TablixUtils.isImage(columnHeader, metadata) && (content = visuals.PivotTableBinderUtils.buildImageTag(content, this.formattingProperties.grid.imageHeight));
                if (columnHeader.position.row.isLast) {
                    var showFuture = this.binderOptions.sortingEnabled && this.sortingManager.isColumnHeaderSortable(columnHeader);
                    content += visuals.PivotTableBinderUtils.buildSortIconDiv(this.sortingManager.getColumnHeaderSortDirection(columnHeader), this.binderOptions.sortIconEnabled, showFuture, originalBottom, this.glyphFontInfo.textProperties.fontSize);
                }
                return {
                    content: content,
                    classNames: this.getColumnHeaderClasses(columnHeader, !!iconName),
                    styleProperties: this.getColumnHeaderStyleAttributes(columnHeader, cellStyle),
                    attributes: {
                        title: title
                    }
                };
            }, PivotTableBinder.prototype.getBodyCellBinding = function(bodyCell, forMeasure) {
                var content, attributes, iconName, cellStyle = this.getBodyCellStyle(bodyCell, this.getBodyCellFontInfo(bodyCell), forMeasure), dataBarsSettings = bodyCell.columnMetadata && this.columnsDataBarsSettings[bodyCell.columnMetadata.queryName];
                if (bodyCell.isKpi()) content = visuals.PivotTableBinderUtils.createKpiDomString(bodyCell.columnMetadata.kpi, bodyCell.textContent), 
                attributes = null; else if (dataBarsSettings && forMeasure && !bodyCell.isTotal && _.isNumber(bodyCell.dataPoint) && dataBarsSettings.hideText) content = TablixUtils.StringNonBreakingSpace; else {
                    var title = content = encodeHtml(this.getBodyCellContent(bodyCell));
                    this.formattingProperties.values.wordWrap && (content = visuals.PivotTableBinderUtils.replaceEncodedNewLines(content)), 
                    _.isEmpty(content) && (content = TablixUtils.StringNonBreakingSpace);
                    var urlType = TablixUtils.getUrlScheme(bodyCell.columnMetadata, content);
                    if (urlType !== UrlScheme.NONE) {
                        var hyperlink = encodeHtml(bodyCell.textContent);
                        iconName = visuals.PivotTableBinderUtils.getUrlIconName(this.formattingProperties.values.urlIcon, urlType), 
                        content = visuals.PivotTableBinderUtils.buildUrlTag(content, hyperlink, iconName);
                    }
                    attributes = {
                        title: title
                    };
                }
                var contentElementBinding = {
                    content: content,
                    classNames: this.getBodyCellClasses(bodyCell, !!iconName),
                    styleProperties: this.getBodyCellStyleAttributes(bodyCell, cellStyle, forMeasure),
                    attributes: attributes
                };
                return dataBarsSettings && !forMeasure && !bodyCell.isTotal && _.isNumber(bodyCell.dataPoint) && (contentElementBinding.content = visuals.PivotTableBinderUtils.buildDataBarCell(dataBarsSettings, cellStyle, bodyCell.dataPoint, content)), 
                contentElementBinding;
            }, PivotTableBinder.prototype.getCornerCellBinding = function(cornerCell, forMeasure) {
                var content = encodeHtml(this.getCornerCellLabel(cornerCell)), title = content;
                this.formattingProperties.columnHeaders.wordWrap && (content = visuals.PivotTableBinderUtils.replaceEncodedNewLines(content)), 
                _.isEmpty(content) && (content = TablixUtils.StringNonBreakingSpace);
                var cellStyle = this.getCornerCellStyle(cornerCell, this.getCornerCellFontInfo(), forMeasure);
                if (cornerCell.position.row.isLast) {
                    var showFuture = this.binderOptions.sortingEnabled && this.sortingManager.isCornerSortable(cornerCell);
                    content += visuals.PivotTableBinderUtils.buildSortIconDiv(this.sortingManager.getCornerSortDirection(cornerCell), this.binderOptions.sortIconEnabled, showFuture, cellStyle.getExtraBottom(), this.glyphFontInfo.textProperties.fontSize), 
                    cellStyle.paddings.bottom += visuals.PivotTableBinderUtils.getSortIconHeight(this.glyphFontInfo.measuredFontHeight);
                }
                return {
                    content: content,
                    classNames: this.getCornerCellClasses(cornerCell),
                    styleProperties: cellStyle.getAttributes(),
                    attributes: {
                        title: title
                    }
                };
            }, PivotTableBinder.prototype.getApproximateRowHeaderWidth = function(rowHeader) {
                var metadata = this.rowNavigator.getRowHeaderMetadata(rowHeader), content = this.getRowHeaderLabel(rowHeader), urlType = TablixUtils.getUrlScheme(metadata, content);
                return urlType !== UrlScheme.NONE && visuals.PivotTableBinderUtils.getUrlIconName(this.formattingProperties.rowHeaders.urlIcon, urlType) ? this.rowHeaderFontInfo.fontProperties.size.px : TablixUtils.isImage(rowHeader, metadata) ? this.formattingProperties.grid.imageHeight : visuals.PivotTableBinderUtils.measureText(content, this.getRowHeaderFontInfo(rowHeader).textProperties);
            }, PivotTableBinder.prototype.getApproximateColumnHeaderWidth = function(columnHeader) {
                var metadata = this.columnNavigator.getColumnHeaderMetadata(columnHeader), content = this.getColumnHeaderLabel(columnHeader), urlType = TablixUtils.getUrlScheme(metadata, content);
                return urlType !== UrlScheme.NONE && visuals.PivotTableBinderUtils.getUrlIconName(this.formattingProperties.columnHeaders.urlIcon, urlType) ? this.columnHeaderFontInfo.fontProperties.size.px : TablixUtils.isImage(columnHeader, metadata) ? this.formattingProperties.grid.imageHeight : visuals.PivotTableBinderUtils.measureText(content, this.getColumnHeaderFontInfo(columnHeader).textProperties);
            }, PivotTableBinder.prototype.getApproximateBodyCellWidth = function(bodyCell) {
                if (bodyCell.isKpi()) return this.valueFontInfo.fontProperties.size.px;
                var dataBarsSettings = bodyCell.columnMetadata && this.columnsDataBarsSettings[bodyCell.columnMetadata.queryName];
                if (dataBarsSettings && dataBarsSettings.hideText && !bodyCell.isTotal && _.isNumber(bodyCell.dataPoint)) return 0;
                var content = this.getBodyCellContent(bodyCell);
                return this.isUrlIcon(bodyCell, content) ? this.valueFontInfo.fontProperties.size.px : visuals.PivotTableBinderUtils.measureText(content, this.getBodyCellFontInfo(bodyCell).textProperties);
            }, PivotTableBinder.prototype.getApproximateCornerCellWidth = function(cornerCell) {
                return visuals.PivotTableBinderUtils.measureText(this.getCornerCellLabel(cornerCell), this.getCornerCellFontInfo().textProperties);
            }, PivotTableBinder.prototype.getApproximateRowHeaderHeight = function(rowHeader, width) {
                var metadata = this.rowNavigator.getRowHeaderMetadata(rowHeader), content = this.getRowHeaderLabel(rowHeader), urlType = TablixUtils.getUrlScheme(metadata, content);
                if (urlType !== UrlScheme.NONE && visuals.PivotTableBinderUtils.getUrlIconName(this.formattingProperties.rowHeaders.urlIcon, urlType)) return this.rowHeaderFontInfo.fontProperties.size.px;
                if (TablixUtils.isImage(rowHeader, metadata)) return this.formattingProperties.grid.imageHeight;
                var lineCount, rowHeaderInfo = this.getRowHeaderFontInfo(rowHeader);
                return lineCount = this.formattingProperties.rowHeaders.wordWrap ? visuals.PivotTableBinderUtils.getWordWrappingLines(content, visuals.PivotTableBinderUtils.getNetWidth(width, this.getRowHeaderStyle(rowHeader, rowHeaderInfo, !0)), rowHeaderInfo.textProperties).length : 1, 
                rowHeaderInfo.measuredFontHeight * lineCount;
            }, PivotTableBinder.prototype.getApproximateColumnHeaderHeight = function(columnHeader, width) {
                var metadata = this.columnNavigator.getColumnHeaderMetadata(columnHeader), content = this.getColumnHeaderLabel(columnHeader), urlType = TablixUtils.getUrlScheme(metadata, content);
                if (urlType !== UrlScheme.NONE && visuals.PivotTableBinderUtils.getUrlIconName(this.formattingProperties.columnHeaders.urlIcon, urlType)) return this.columnHeaderFontInfo.fontProperties.size.px;
                if (TablixUtils.isImage(columnHeader, metadata)) return this.formattingProperties.grid.imageHeight;
                var lineCount, columnHeaderInfo = this.getColumnHeaderFontInfo(columnHeader);
                return lineCount = this.formattingProperties.columnHeaders.wordWrap ? visuals.PivotTableBinderUtils.getWordWrappingLines(content, visuals.PivotTableBinderUtils.getNetWidth(width, this.getColumnHeaderStyle(columnHeader, columnHeaderInfo, !0)), columnHeaderInfo.textProperties).length : 1, 
                columnHeaderInfo.measuredFontHeight * lineCount;
            }, PivotTableBinder.prototype.getApproximateBodyCellHeight = function(bodyCell, width) {
                if (bodyCell.isKpi()) return this.valueFontInfo.fontProperties.size.px;
                var content = this.getBodyCellContent(bodyCell);
                if (this.isUrlIcon(bodyCell, content)) return this.valueFontInfo.fontProperties.size.px;
                var lineCount, bodyCellInfo = this.getBodyCellFontInfo(bodyCell);
                return lineCount = this.formattingProperties.values.wordWrap ? visuals.PivotTableBinderUtils.getWordWrappingLines(content, visuals.PivotTableBinderUtils.getNetWidth(width, this.getBodyCellStyle(bodyCell, bodyCellInfo, !0)), bodyCellInfo.textProperties).length : 1, 
                bodyCellInfo.measuredFontHeight * lineCount;
            }, PivotTableBinder.prototype.getApproximateCornerCellHeight = function(cornerCell, width) {
                var lineCount, cornerCellInfo = this.getCornerCellFontInfo();
                return lineCount = this.formattingProperties.columnHeaders.wordWrap ? visuals.PivotTableBinderUtils.getWordWrappingLines(this.getCornerCellLabel(cornerCell), visuals.PivotTableBinderUtils.getNetWidth(width, this.getCornerCellStyle(cornerCell, cornerCellInfo, !0)), cornerCellInfo.textProperties).length : 1, 
                cornerCellInfo.measuredFontHeight * lineCount;
            }, PivotTableBinder.prototype.isUrlIcon = function(bodyCell, content) {
                var urlType = TablixUtils.getUrlScheme(bodyCell.columnMetadata, content);
                return urlType !== UrlScheme.NONE && !!visuals.PivotTableBinderUtils.getUrlIconName(this.formattingProperties.values.urlIcon, urlType);
            }, PivotTableBinder.prototype.getColumnHeaderFontInfo = function(header) {
                return visuals.MatrixHierarchyNavigator.isNodeGrandTotal(header) ? this.grandTotalColumnHeaderFontInfo : header.isSubtotal ? this.subtotalColumnHeaderFontInfo : this.columnHeaderFontInfo;
            }, PivotTableBinder.prototype.getRowHeaderFontInfo = function(header) {
                return visuals.MatrixHierarchyNavigator.isNodeGrandTotal(header) ? this.grandTotalRowHeaderFontInfo : header.isSubtotal ? this.subtotalRowHeaderFontInfo : this.rowHeaderFontInfo;
            }, PivotTableBinder.prototype.getBodyCellFontInfo = function(bodyCell) {
                return bodyCell.isGrandTotal ? this.grandTotalFontInfo : bodyCell.isSubtotal ? this.subtotalFontInfo : this.valueFontInfo;
            }, PivotTableBinder.prototype.getCornerCellFontInfo = function() {
                return this.columnHeaderFontInfo;
            }, PivotTableBinder.prototype.getRowHeaderClasses = function(rowHeader, urlIcon) {
                var classes = [];
                return this.formattingProperties.rowHeaders.wordWrap ? classes.push(visuals.PivotTableBinderUtils.cssPivotTableCellClassWrap) : classes.push(visuals.PivotTableBinderUtils.cssPivotTableCellClassNoWrap), 
                urlIcon && classes.push(TablixUtils.CssClassValueURLIconContainer), this.binderOptions.interactivityIndicatorEnabled && this.binderOptions.selectionEnabled && visuals.PivotTableSelectionManager.hasIdentity(rowHeader) && !visuals.PivotTableBinderUtils.isValidUrl(this.rowNavigator.getRowHeaderMetadata(rowHeader), this.getRowHeaderLabel(rowHeader)) && !TablixUtils.isImage(rowHeader, this.rowNavigator.getRowHeaderMetadata(rowHeader)) && classes.push(visuals.PivotTableBinderUtils.cssClassCellInteractive), 
                classes;
            }, PivotTableBinder.prototype.getColumnHeaderClasses = function(columnHeader, urlIcon) {
                var classes = [];
                this.formattingProperties.columnHeaders.wordWrap ? classes.push(visuals.PivotTableBinderUtils.cssPivotTableCellClassWrap) : classes.push(visuals.PivotTableBinderUtils.cssPivotTableCellClassNoWrap), 
                urlIcon && classes.push(TablixUtils.CssClassValueURLIconContainer);
                var headerSelectable = visuals.PivotTableSelectionManager.hasIdentity(columnHeader), headerSortable = this.sortingManager.isColumnHeaderSortable(columnHeader);
                return this.binderOptions.interactivityIndicatorEnabled && (this.binderOptions.selectionEnabled && headerSelectable && !headerSortable || this.binderOptions.sortingEnabled && headerSortable && !headerSelectable) && !visuals.PivotTableBinderUtils.isValidUrl(this.columnNavigator.getColumnHeaderMetadata(columnHeader), this.getColumnHeaderLabel(columnHeader)) && !TablixUtils.isImage(columnHeader, this.columnNavigator.getColumnHeaderMetadata(columnHeader)) && classes.push(visuals.PivotTableBinderUtils.cssClassCellInteractive), 
                classes;
            }, PivotTableBinder.prototype.getBodyCellClasses = function(bodyCell, urlIcon) {
                var classes = [];
                return this.formattingProperties.values.wordWrap ? classes.push(visuals.PivotTableBinderUtils.cssPivotTableCellClassWrap) : classes.push(visuals.PivotTableBinderUtils.cssPivotTableCellClassNoWrap), 
                urlIcon ? classes.push(TablixUtils.CssClassValueURLIconContainer) : !bodyCell.isKpi() && bodyCell.isNumeric && classes.push(TablixUtils.CssClassTablixValueNumeric), 
                !this.binderOptions.interactivityIndicatorEnabled || !this.binderOptions.selectionEnabled || bodyCell.isColumnGrandTotal && bodyCell.isRowGrandTotal || visuals.PivotTableBinderUtils.isValidUrl(bodyCell.columnMetadata, this.getBodyCellContent(bodyCell)) || classes.push(visuals.PivotTableBinderUtils.cssClassCellInteractive), 
                classes;
            }, PivotTableBinder.prototype.getCornerCellClasses = function(cornerCell) {
                var classes = [];
                return this.formattingProperties.columnHeaders.wordWrap ? classes.push(visuals.PivotTableBinderUtils.cssPivotTableCellClassWrap) : classes.push(visuals.PivotTableBinderUtils.cssPivotTableCellClassNoWrap), 
                this.binderOptions.interactivityIndicatorEnabled && this.binderOptions.sortingEnabled && this.sortingManager.isCornerSortable(cornerCell) && classes.push(visuals.PivotTableBinderUtils.cssClassCellInteractive), 
                classes;
            }, PivotTableBinder.prototype.getSteppedLayoutIndentation = function(rowHeader) {
                return this.rowNavigator.getLevel(rowHeader) * this.formattingProperties.rowHeaders.steppedLayoutIndentation;
            }, PivotTableBinder.prototype.getRowHeaderStyle = function(rowHeader, fontInfo, forMeasure) {
                var cellStyle = new CellStyle(visuals.PivotTableBinderUtils.CellHorizontalPadding, visuals.PivotTableBinderUtils.CellHorizontalPadding);
                return rowHeader.position.column.isLast && (cellStyle.borders.right = new EdgeSettings(TablixObjects.PropGridOutlineWeight.defaultValue, TablixObjects.PropGridOutlineColor.defaultValue)), 
                cellStyle.fontColor = TablixUtils.FontColorHeaders, visuals.MatrixStyler.setRowHeaderStyle(rowHeader.position, rowHeader, cellStyle, this.formattingProperties.rowHeaders.steppedLayout, this.formattingProperties, this.formattingProperties.values.bandedRowHeaders), 
                visuals.PivotTableBinderUtils.applyFontInfo(fontInfo, cellStyle, !forMeasure), rowHeader.isSubtotal && this.formattingProperties.subtotals.applyToHeaders && this.formattingProperties.subtotals.fontColor && (cellStyle.fontColor = this.formattingProperties.subtotals.fontColor), 
                this.formattingProperties.rowHeaders.steppedLayout && (cellStyle.paddings.left += this.getSteppedLayoutIndentation(rowHeader)), 
                cellStyle;
            }, PivotTableBinder.prototype.getRowHeaderStyleAttributes = function(rowHeader, forMeasure) {
                var cellStyle = this.getRowHeaderStyle(rowHeader, this.getRowHeaderFontInfo(rowHeader), forMeasure), style = cellStyle.getAttributes();
                return this.selectionManager.isRowHeaderHighlighted(rowHeader) || visuals.PivotTableBinderUtils.setUnselectedStyle(style), 
                style;
            }, PivotTableBinder.prototype.getColumnHeaderStyle = function(columnHeader, fontInfo, forMeasure) {
                var cellStyle = new CellStyle(visuals.PivotTableBinderUtils.CellHorizontalPadding, visuals.PivotTableBinderUtils.CellHorizontalPadding);
                if (columnHeader.position.row.isLast && (cellStyle.borders.bottom = new EdgeSettings(TablixObjects.PropGridOutlineWeight.defaultValue, TablixObjects.PropGridOutlineColor.defaultValue)), 
                cellStyle.fontColor = TablixUtils.FontColorHeaders, visuals.MatrixStyler.setColumnHeaderStyle(columnHeader.position, columnHeader, cellStyle, this.formattingProperties), 
                visuals.PivotTableBinderUtils.applyFontInfo(fontInfo, cellStyle, !forMeasure), columnHeader.isSubtotal && this.formattingProperties.subtotals.applyToHeaders && this.formattingProperties.subtotals.fontColor) {
                    var columnFormatting = this.formattingProperties.columnFormatting[columnHeader.queryName];
                    columnFormatting && columnFormatting.styleHeader && columnFormatting.fontColor || (cellStyle.fontColor = this.formattingProperties.subtotals.fontColor);
                }
                return cellStyle;
            }, PivotTableBinder.prototype.getColumnHeaderStyleAttributes = function(columnHeader, cellStyle) {
                var style = cellStyle.getAttributes();
                return this.selectionManager.isColumnHeaderHighlighted(columnHeader) || visuals.PivotTableBinderUtils.setUnselectedStyle(style), 
                style;
            }, PivotTableBinder.prototype.getBodyCellStyle = function(bodyCell, fontInfo, forMeasure) {
                var cellStyle = new CellStyle(visuals.PivotTableBinderUtils.CellHorizontalPadding, visuals.PivotTableBinderUtils.CellHorizontalPadding);
                return visuals.MatrixStyler.setBodyCellStyle(bodyCell.position, bodyCell, cellStyle, this.formattingProperties.rowHeaders.steppedLayout, this.formattingProperties), 
                visuals.PivotTableBinderUtils.applyFontInfo(fontInfo, cellStyle, !forMeasure), cellStyle;
            }, PivotTableBinder.prototype.getBodyCellStyleAttributes = function(bodyCell, cellStyle, forMeasure) {
                var style = cellStyle.getAttributes();
                return style.position = "relative", this.selectionManager.isBodyCellHighlighted(bodyCell) || visuals.PivotTableBinderUtils.setUnselectedStyle(style), 
                style;
            }, PivotTableBinder.prototype.getCornerCellStyle = function(cornerCell, fontInfo, forMeasure) {
                var cellStyle = new CellStyle(visuals.PivotTableBinderUtils.CellHorizontalPadding, visuals.PivotTableBinderUtils.CellHorizontalPadding);
                return cellStyle.fontColor = TablixUtils.FontColorHeaders, cornerCell.position.row.isLast && (cellStyle.borders.bottom = new EdgeSettings(TablixObjects.PropGridOutlineWeight.defaultValue, TablixObjects.PropGridOutlineColor.defaultValue)), 
                visuals.MatrixStyler.setCornerCellStyle(cornerCell.position, cellStyle, this.formattingProperties.rowHeaders.steppedLayout, this.formattingProperties), 
                visuals.PivotTableBinderUtils.applyFontInfo(fontInfo, cellStyle, !forMeasure), cellStyle;
            }, PivotTableBinder.prototype.isColumnHeaderMultiValueSubtotal = function(header) {
                return header.isSubtotal && header.parent && header.parent.isSubtotal;
            }, PivotTableBinder.prototype.isRowHeaderMultiValueSubtotal = function(header) {
                return this.rowNavigator.valuesOnRowApplied() && header.isSubtotal && (header.parent && header.parent.isSubtotal || this.formattingProperties.rowHeaders.steppedLayout);
            }, PivotTableBinder.prototype.getColumnHeaderLabel = function(columnHeader) {
                return this.getHeaderContent(columnHeader, this.columnNavigator.getColumnHeaderMetadata(columnHeader), this.isColumnHeaderMultiValueSubtotal(columnHeader), this.formattingProperties.columnHeaders.wordWrap);
            }, PivotTableBinder.prototype.getRowHeaderLabel = function(rowHeader) {
                return this.getHeaderContent(rowHeader, this.rowNavigator.getRowHeaderMetadata(rowHeader), this.isRowHeaderMultiValueSubtotal(rowHeader), this.formattingProperties.rowHeaders.wordWrap);
            }, PivotTableBinder.prototype.getBodyCellContent = function(bodyCell) {
                return this.formattingProperties.values.wordWrap ? bodyCell.textContent : visuals.TextUtil.replaceSpaceWithNBSP(bodyCell.textContent);
            }, PivotTableBinder.prototype.getCornerCellLabel = function(corner) {
                return this.formattingProperties.columnHeaders.wordWrap ? corner.displayName : visuals.TextUtil.replaceSpaceWithNBSP(corner.displayName);
            }, PivotTableBinder.prototype.getHeaderContent = function(header, metadata, overwriteSubtotalLabel, wordWrap) {
                if (header.isSubtotal && !overwriteSubtotalLabel) return wordWrap ? this.binderOptions.totalLabel : visuals.TextUtil.replaceSpaceWithNBSP(this.binderOptions.totalLabel);
                var value = header.valueFormatted;
                return visuals.PivotTableBinderUtils.isValidUrl(metadata, value) || value && TablixUtils.isValidImage(header, metadata, value) ? value : wordWrap ? value : visuals.TextUtil.replaceSpaceWithNBSP(value);
            }, PivotTableBinder.prototype.updateFormattingProperties = function(dataView, formattingProperties) {
                this.formattingProperties = formattingProperties;
                var generalFontSize = formattingProperties.general.textSize, measurer = new visuals.PivotTableBinderUtils.FontInfoMeasurer();
                this.columnHeaderContainerFontInfo = visuals.PivotTableBinderUtils.createFontInfo({
                    family: formattingProperties.columnHeaders.fontFamily || TablixUtils.FontFamilyHeader,
                    size: formattingProperties.columnHeaders.fontSize || generalFontSize
                }, measurer), this.columnHeaderFontInfo = visuals.PivotTableBinderUtils.overrideFontInfo(this.columnHeaderContainerFontInfo, {}, measurer), 
                this.rowHeaderContainerFontInfo = visuals.PivotTableBinderUtils.createFontInfo({
                    family: formattingProperties.rowHeaders.fontFamily || TablixUtils.FontFamilyHeader,
                    size: formattingProperties.rowHeaders.fontSize || generalFontSize
                }, measurer), this.rowHeaderFontInfo = visuals.PivotTableBinderUtils.overrideFontInfo(this.rowHeaderContainerFontInfo, {}, measurer);
                var valueFontFamily = formattingProperties.values.fontFamily || TablixUtils.FontFamilyCell;
                this.valueContainerFontInfo = visuals.PivotTableBinderUtils.createFontInfo({
                    family: valueFontFamily,
                    size: formattingProperties.values.fontSize || generalFontSize
                }, measurer), this.valueFontInfo = visuals.PivotTableBinderUtils.overrideFontInfo(this.valueContainerFontInfo, {}, measurer);
                var subtotalFontWeight, subtotalFontFamily = formattingProperties.subtotals.fontFamily;
                subtotalFontFamily || this.valueFontInfo.fontProperties.family !== TablixUtils.FontFamilyCell ? subtotalFontWeight = CssConstants.boldValue : this.valueFontInfo.fontProperties.family === TablixUtils.FontFamilyCell && (subtotalFontFamily = TablixUtils.FontFamilyTotal), 
                this.subtotalFontInfo = visuals.PivotTableBinderUtils.overrideFontInfo(this.valueFontInfo, {
                    family: subtotalFontFamily,
                    size: formattingProperties.subtotals.fontSize,
                    weight: subtotalFontWeight
                }, measurer);
                var grandTotalFontFamily = formattingProperties.grandTotal.fontFamily;
                this.grandTotalFontInfo = visuals.PivotTableBinderUtils.overrideFontInfo(this.subtotalFontInfo, {
                    family: grandTotalFontFamily,
                    size: formattingProperties.grandTotal.fontSize,
                    weight: formattingProperties.grandTotal.fontFamily ? CssConstants.boldValue : void 0
                }, measurer, 1);
                var usingDefaultColumnHeaderFontFamily = this.columnHeaderFontInfo.fontProperties.family === TablixUtils.FontFamilyHeader, usingDefaultRowHeaderFontFamily = this.rowHeaderFontInfo.fontProperties.family === TablixUtils.FontFamilyHeader;
                formattingProperties.subtotals.applyToHeaders ? this.subtotalColumnHeaderFontInfo = this.subtotalRowHeaderFontInfo = visuals.PivotTableBinderUtils.overrideFontInfo(this.subtotalFontInfo, {}, measurer, 4) : (this.subtotalColumnHeaderFontInfo = visuals.PivotTableBinderUtils.overrideFontInfo(this.columnHeaderFontInfo, PivotTableBinder.applyBold(usingDefaultColumnHeaderFontFamily), measurer), 
                this.subtotalRowHeaderFontInfo = visuals.PivotTableBinderUtils.overrideFontInfo(this.rowHeaderFontInfo, PivotTableBinder.applyBold(usingDefaultRowHeaderFontFamily), measurer)), 
                formattingProperties.grandTotal.applyToHeaders ? this.grandTotalColumnHeaderFontInfo = this.grandTotalRowHeaderFontInfo = visuals.PivotTableBinderUtils.overrideFontInfo(this.grandTotalFontInfo, {}, measurer, 4) : (this.grandTotalColumnHeaderFontInfo = visuals.PivotTableBinderUtils.overrideFontInfo(this.columnHeaderFontInfo, PivotTableBinder.applyBold(usingDefaultColumnHeaderFontFamily), measurer, 1), 
                this.grandTotalRowHeaderFontInfo = visuals.PivotTableBinderUtils.overrideFontInfo(this.rowHeaderFontInfo, PivotTableBinder.applyBold(usingDefaultRowHeaderFontFamily), measurer, 1)), 
                this.glyphFontInfo = visuals.PivotTableBinderUtils.createFontInfo({
                    family: TablixUtils.FontFamilyGlyphs,
                    size: FontSize.createFromPt((formattingProperties.columnHeaders.fontSize || generalFontSize).pt * TablixUtils.SortIconFontSizeRatio),
                    lineHeight: "100%"
                }, measurer), measurer.measureAll(this.measureElement), this.columnsDataBarsSettings = {};
                var columnFormatting = formattingProperties.columnFormatting;
                if (columnFormatting && dataView && dataView.matrix && !_.isEmpty(dataView.matrix.valueSources)) for (var _i = 0, _a = dataView.matrix.valueSources; _i < _a.length; _i++) {
                    var column = _a[_i], queryName = column.queryName;
                    queryName && columnFormatting[queryName] && (this.columnsDataBarsSettings[queryName] = visuals.PivotTableBinderUtils.getColumnDataBarsSettings(column, columnFormatting[queryName].dataBarsSettings));
                }
            }, PivotTableBinder.applyBold = function(usingDefault) {
                return {
                    family: usingDefault ? TablixUtils.FontFamilyTotal : void 0,
                    weight: usingDefault ? void 0 : CssConstants.boldValue
                };
            }, PivotTableBinder.prototype.getCornerContainerFontInfo = function() {
                return this.columnHeaderContainerFontInfo;
            }, PivotTableBinder.prototype.getColumnHeaderContainerFontInfo = function() {
                return this.columnHeaderContainerFontInfo;
            }, PivotTableBinder.prototype.getRowHeaderContainerFontInfo = function() {
                return this.rowHeaderContainerFontInfo;
            }, PivotTableBinder.prototype.getValueContainerFontInfo = function() {
                return this.valueContainerFontInfo;
            }, PivotTableBinder;
        }();
        visuals.PivotTableBinder = PivotTableBinder;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var PivotTableHierarchyNavigator = function() {
            function PivotTableHierarchyNavigator(matrixNavigator) {
                this.matrixNavigator = matrixNavigator;
            }
            return PivotTableHierarchyNavigator.prototype.setHierarchy = function(hierarchy) {
                this.hierarchy = hierarchy, this.floatingLeaves = [], this.getLeaves(this.getFloatingHierarchyItems(), this.floatingLeaves);
            }, PivotTableHierarchyNavigator.prototype.getHierarchyDepth = function() {
                return Math.max(this.hierarchy.levels.length, 1);
            }, PivotTableHierarchyNavigator.prototype.getHierarchyLeafNodes = function() {
                return this.hierarchy.leafNodes;
            }, PivotTableHierarchyNavigator.prototype.getHierarchyLeafCount = function() {
                return this.hierarchy.leafNodes.length;
            }, PivotTableHierarchyNavigator.prototype.getHierarchyLeafAt = function(index) {
                return this.hierarchy.leafNodes[index];
            }, PivotTableHierarchyNavigator.prototype.getFloatingHierarchyLeafCount = function() {
                return this.floatingLeaves.length;
            }, PivotTableHierarchyNavigator.prototype.getFloatingHierarchyLeafAt = function(index) {
                return this.floatingLeaves[index];
            }, PivotTableHierarchyNavigator.prototype.getHierarchyItems = function() {
                return this.hierarchy.root.children || [];
            }, PivotTableHierarchyNavigator.prototype.getFloatingHierarchyItems = function() {
                return null;
            }, PivotTableHierarchyNavigator.prototype.getLeafIndex = function(item) {
                return this.matrixNavigator.getLeafIndex(item);
            }, PivotTableHierarchyNavigator.prototype.isLeaf = function(item) {
                return this.matrixNavigator.isLeaf(item);
            }, PivotTableHierarchyNavigator.prototype.isLastItem = function(item, items) {
                return this.matrixNavigator.isLastItem(item, items);
            }, PivotTableHierarchyNavigator.prototype.getParent = function(item) {
                return this.matrixNavigator.getParent(item);
            }, PivotTableHierarchyNavigator.prototype.getIndex = function(item) {
                return this.matrixNavigator.getIndex(item);
            }, PivotTableHierarchyNavigator.prototype.getChildren = function(item) {
                return this.matrixNavigator.getChildren(item);
            }, PivotTableHierarchyNavigator.prototype.getLevel = function(item) {
                return this.matrixNavigator.getLevel(item);
            }, PivotTableHierarchyNavigator.prototype.getIntersection = function(rowItem, columnItem) {
                return this.matrixNavigator.getIntersection(rowItem, columnItem);
            }, PivotTableHierarchyNavigator.prototype.getCorner = function(rowLevel, columnLevel) {
                return this.matrixNavigator.getCorner(rowLevel, columnLevel);
            }, PivotTableHierarchyNavigator.prototype.getRowLevel = function(cornerItem) {
                return cornerItem.rowLevel;
            }, PivotTableHierarchyNavigator.prototype.getColumnLevel = function(cornerItem) {
                return cornerItem.columnLevel;
            }, PivotTableHierarchyNavigator.prototype.getRowHeaderMetadata = function(item) {
                return this.matrixNavigator.getRowHeaderMetadata(item);
            }, PivotTableHierarchyNavigator.prototype.getColumnHeaderMetadata = function(item) {
                return this.matrixNavigator.getColumnHeaderMetadata(item);
            }, PivotTableHierarchyNavigator.prototype.valuesOnRowApplied = function() {
                return this.matrixNavigator.valuesOnRowApplied();
            }, PivotTableHierarchyNavigator.prototype.getLeaves = function(items, leaves) {
                if (!_.isEmpty(items)) for (var _i = 0, items_3 = items; _i < items_3.length; _i++) {
                    var item = items_3[_i];
                    this.isLeaf(item) ? leaves.push(item) : this.getLeaves(this.getChildren(item), leaves);
                }
            }, PivotTableHierarchyNavigator;
        }();
        visuals.PivotTableHierarchyNavigator = PivotTableHierarchyNavigator;
        var PivotTableSteppedHierarchyNavigator = function(_super) {
            function PivotTableSteppedHierarchyNavigator() {
                return null !== _super && _super.apply(this, arguments) || this;
            }
            return __extends(PivotTableSteppedHierarchyNavigator, _super), PivotTableSteppedHierarchyNavigator.prototype.getIntersection = function(rowItem, columnItem) {
                return this.isLeaf(rowItem) || _.isEmpty(rowItem.children) || !rowItem.children[0].isSubtotal || this.valuesOnRowApplied() ? _super.prototype.getIntersection.call(this, rowItem, columnItem) : _super.prototype.getIntersection.call(this, rowItem.children[0], columnItem);
            }, PivotTableSteppedHierarchyNavigator.prototype.getChildren = function(item) {
                return !_.isEmpty(item.children) && item.children[0].isSubtotal ? item.children.slice(1) : item.children;
            }, PivotTableSteppedHierarchyNavigator.prototype.getHierarchyDepth = function() {
                return _super.prototype.getHierarchyDepth.call(this) > 0 ? 1 : 0;
            }, PivotTableSteppedHierarchyNavigator.prototype.getCorner = function(rowLevel, columnLevel) {
                var adjustedRowLevel = columnLevel === this.matrixNavigator.getColumnHierarchyDepth() - 1 ? 0 : this.matrixNavigator.getRowHierarchyDepth() - 1;
                return _super.prototype.getCorner.call(this, adjustedRowLevel, columnLevel);
            }, PivotTableSteppedHierarchyNavigator.prototype.getFloatingHierarchyItems = function() {
                var items = this.getHierarchyItems();
                if (_.isEmpty(items)) return null;
                for (var index = 0, floatingItems = []; ;) {
                    var item = items[index];
                    if (!item || !item.isSubtotal) break;
                    floatingItems.push(item), index++;
                }
                return _.isEmpty(floatingItems) ? null : floatingItems;
            }, PivotTableSteppedHierarchyNavigator.prototype.getLeaves = function(items, leaves) {
                if (!_.isEmpty(items)) for (var _i = 0, items_4 = items; _i < items_4.length; _i++) {
                    var item = items_4[_i];
                    leaves.push(item), this.getLeaves(this.getChildren(item), leaves);
                }
            }, PivotTableSteppedHierarchyNavigator;
        }(PivotTableHierarchyNavigator);
        visuals.PivotTableSteppedHierarchyNavigator = PivotTableSteppedHierarchyNavigator;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var PivotTableSortingManager = function() {
            function PivotTableSortingManager(hostServices) {
                this.hostServices = hostServices;
            }
            return PivotTableSortingManager.prototype.onDataViewChanged = function(rowHierarchy, columnHierarchy, valueSources, isSteppedLayout, valuesOnRowApplied) {
                this.isSteppedLayout = isSteppedLayout, this.valuesOnRowApplied = valuesOnRowApplied, 
                this.nonMeasureRowLevels = this.getNonMeasureRowLevels(rowHierarchy), this.valueSources = valueSources, 
                this.hasRows = rowHierarchy && !_.isEmpty(this.nonMeasureRowLevels), this.hasColumns = columnHierarchy && !_.isEmpty(columnHierarchy.levels), 
                this.measureCount = valueSources ? valueSources.length : 0;
            }, PivotTableSortingManager.hasSortingChanged = function(previousDataView, newDataView) {
                if (!previousDataView || !newDataView) return !1;
                var previousColumns = previousDataView.metadata.columns;
                if (_.isEmpty(previousColumns)) return !1;
                var newColumns = newDataView.metadata.columns;
                if (_.isEmpty(newColumns)) return !1;
                for (var _loop_2 = function(newColumn) {
                    var previousColumn = _.find(previousColumns, function(previousColumn) {
                        return newColumn.queryName === previousColumn.queryName;
                    });
                    if (previousColumn && newColumn.sort !== previousColumn.sort) return {
                        value: !0
                    };
                }, _i = 0, newColumns_1 = newColumns; _i < newColumns_1.length; _i++) {
                    var newColumn = newColumns_1[_i], state_1 = _loop_2(newColumn);
                    if ("object" == typeof state_1) return state_1.value;
                }
                return !1;
            }, PivotTableSortingManager.prototype.isCornerSortable = function(header) {
                return this.hasRows && null != header.metadata && header.position.row.isLast && (!this.valuesOnRowApplied || !header.position.column.isLast);
            }, PivotTableSortingManager.prototype.getNonMeasureRowLevels = function(rowHierarchy) {
                if (this.valuesOnRowApplied) {
                    var levels = [];
                    return levels.push.apply(levels, rowHierarchy.levels), levels.pop(), levels;
                }
                return rowHierarchy.levels;
            }, PivotTableSortingManager.prototype.isColumnHeaderSortable = function(header) {
                var hasIdentity = visuals.PivotTableSelectionManager.hasIdentity(header);
                return this.hasRows && this.measureCount > 0 && !hasIdentity && header.position.row.isLast && !this.valuesOnRowApplied;
            }, PivotTableSortingManager.prototype.getCornerSortDirection = function(header) {
                if (!this.isCornerSortable(header)) return null;
                if (this.isSteppedLayout) {
                    for (var sortDirection = null, _i = 0, _a = this.nonMeasureRowLevels; _i < _a.length; _i++) {
                        var rowLevel = _a[_i];
                        if (1 !== rowLevel.sources.length) return null;
                        var levelSortDirection = rowLevel.sources[0].sort;
                        if (null == levelSortDirection) return null;
                        if (null !== sortDirection) {
                            if (levelSortDirection !== sortDirection) return null;
                        } else sortDirection = levelSortDirection;
                    }
                    return sortDirection;
                }
                return this.nonMeasureRowLevels[header.position.column.index].sources[0].sort;
            }, PivotTableSortingManager.prototype.getColumnHeaderSortDirection = function(header) {
                return this.isColumnHeaderSortable(header) ? this.getMeasureSortDirection(this.getMeasureQueryName(header)) : null;
            }, PivotTableSortingManager.prototype.getMeasureQueryName = function(header) {
                return this.hasColumns && 1 === this.measureCount ? this.valueSources[0].queryName : header.queryName;
            }, PivotTableSortingManager.prototype.sortCorner = function(corner) {
                var sortDescriptors, currentSort = this.getCornerSortDirection(corner), futureSortDirection = PivotTableSortingManager.getNextSortDirection(currentSort);
                if (this.isSteppedLayout) {
                    sortDescriptors = [];
                    for (var _i = 0, _a = this.nonMeasureRowLevels; _i < _a.length; _i++) {
                        var level = _a[_i];
                        sortDescriptors.push({
                            queryName: level.sources[0].queryName,
                            sortDirection: futureSortDirection
                        });
                    }
                } else sortDescriptors = [ {
                    queryName: corner.metadata.queryName,
                    sortDirection: futureSortDirection
                } ];
                this.hostServices.onCustomSort({
                    sortDescriptors: sortDescriptors
                });
            }, PivotTableSortingManager.prototype.sortColumnHeader = function(header) {
                var currentSort = this.getColumnHeaderSortDirection(header);
                this.hostServices.onCustomSort({
                    sortDescriptors: [ {
                        queryName: this.getMeasureQueryName(header),
                        sortDirection: PivotTableSortingManager.getNextSortDirection(currentSort)
                    } ]
                });
            }, PivotTableSortingManager.getNextSortDirection = function(currentSortDirection) {
                return 1 === currentSortDirection ? 2 : 1;
            }, PivotTableSortingManager.prototype.getMeasureSortDirection = function(queryName) {
                var valueSource = _.find(this.valueSources, function(value) {
                    return value.queryName === queryName;
                });
                if (null != valueSource) return valueSource.sort;
            }, PivotTableSortingManager;
        }();
        visuals.PivotTableSortingManager = PivotTableSortingManager;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var PivotTableSelectionMode;
        !function(PivotTableSelectionMode) {
            PivotTableSelectionMode[PivotTableSelectionMode.RowHeader = 0] = "RowHeader", PivotTableSelectionMode[PivotTableSelectionMode.ColumnHeader = 1] = "ColumnHeader", 
            PivotTableSelectionMode[PivotTableSelectionMode.BodyCell = 2] = "BodyCell";
        }(PivotTableSelectionMode = visuals.PivotTableSelectionMode || (visuals.PivotTableSelectionMode = {}));
        var PivotTableSelectionManager = function() {
            function PivotTableSelectionManager(hostServices) {
                this.hostServices = hostServices, this.clearLocal();
            }
            return PivotTableSelectionManager.prototype.onItemContextMenu = function(item, mouseEvent, roleName) {
                var args, contextMenuItems;
                contextMenuItems = !this.isEmpty() && this.isItemSelected(item) ? this.selectedItems : [ item ], 
                args = this.createContextMenuArgs(contextMenuItems, mouseEvent), args && (args.dataRoles = [ roleName ], 
                this.hostServices.onContextMenu(args));
            }, PivotTableSelectionManager.prototype.onWhitespaceClick = function() {
                this.clearLocal(), this.hostServices.onSelect(this.createSelectArgs(this.selectedItems));
            }, PivotTableSelectionManager.prototype.isDrillingEnabled = function(item, mouseEvent, selectionMode) {
                var args = this.createSelectingArgs(item, selectionMode, mouseEvent);
                return this.hostServices.onSelecting(args), 1 === args.action;
            }, PivotTableSelectionManager.prototype.select = function(item, selectionMode, multipleSelection) {
                this.selectionMode !== selectionMode && this.clearLocal(), this.createSelectorsByColumn(item) ? this.isItemSelected(item) ? 1 === this.selectedItems.length ? this.clearLocal() : multipleSelection ? this.unselectItem(item) : this.selectedItems = [ item ] : (multipleSelection || this.clearLocal(), 
                this.selectionMode = selectionMode, this.selectedItems.push(item), this.hostServices.canSelect(this.createSelectArgs(this.selectedItems)) || (this.selectedItems = [ item ])) : this.clearLocal(), 
                this.hostServices.onSelect(this.createSelectArgs(this.selectedItems));
            }, PivotTableSelectionManager.prototype.isRowHeaderHighlighted = function(header) {
                if (this.isEmpty()) return !0;
                for (var _i = 0, _a = this.selectedItems; _i < _a.length; _i++) {
                    var selectedItem = _a[_i];
                    if (this.isRowHeaderOnSelectedPath(selectedItem, header)) return !0;
                }
                return !1;
            }, PivotTableSelectionManager.prototype.isColumnHeaderHighlighted = function(header) {
                if (this.isEmpty()) return !0;
                for (var _i = 0, _a = this.selectedItems; _i < _a.length; _i++) {
                    var selectedItem = _a[_i];
                    if (this.isColumnHeaderOnSelectedPath(selectedItem, header)) return !0;
                }
                return !1;
            }, PivotTableSelectionManager.prototype.isBodyCellHighlighted = function(bodyCell) {
                if (this.isEmpty()) return !0;
                for (var _i = 0, _a = this.selectedItems; _i < _a.length; _i++) {
                    var selected = _a[_i];
                    if (this.isBodyCellOnSelectedPath(selected, bodyCell)) return !0;
                }
                return !1;
            }, PivotTableSelectionManager.prototype.isRowHeaderOnSelectedPath = function(selectedItem, header) {
                if (this.selectionMode === PivotTableSelectionMode.ColumnHeader) return !0;
                var item;
                return item = selectedItem instanceof visuals.MatrixVisualBodyItem ? selectedItem.rowItem : selectedItem, 
                this.isOnSelectedPath(this.getEffectiveSelectedHeader(item), header);
            }, PivotTableSelectionManager.prototype.isColumnHeaderOnSelectedPath = function(selectedItem, header) {
                if (this.selectionMode === PivotTableSelectionMode.RowHeader) return !0;
                var item;
                return item = selectedItem instanceof visuals.MatrixVisualBodyItem ? selectedItem.columnItem : selectedItem, 
                this.isOnSelectedPath(this.getEffectiveSelectedHeader(item), header);
            }, PivotTableSelectionManager.prototype.isBodyCellOnSelectedPath = function(selectedItem, bodyCell) {
                return this.isRowHeaderOnSelectedPath(selectedItem, bodyCell.rowItem) && this.isColumnHeaderOnSelectedPath(selectedItem, bodyCell.columnItem);
            }, PivotTableSelectionManager.prototype.isOnSelectedPath = function(selectedItem, header) {
                if (!selectedItem) return !0;
                for (var current = selectedItem; current; ) {
                    if (current === header) return !0;
                    current = current.parent;
                }
                for (current = header; current; ) {
                    if (current === selectedItem) return !0;
                    current = current.parent;
                }
                return !1;
            }, PivotTableSelectionManager.prototype.onDataViewChanged = function(rowItems, columnItems, hierarchyNavigator) {
                if (!this.isEmpty()) {
                    for (var newSelectedItems = [], _i = 0, _a = this.selectedItems; _i < _a.length; _i++) {
                        var selectedItem = _a[_i], newSelectedItem = PivotTableSelectionManager.getMatchingItem(selectedItem, this.selectionMode, rowItems, columnItems, hierarchyNavigator);
                        newSelectedItem && newSelectedItems.push(newSelectedItem);
                    }
                    this.selectedItems = newSelectedItems, this.hostServices.onSelect(this.createSelectArgs(this.selectedItems));
                }
            }, PivotTableSelectionManager.getMatchingItem = function(selectedItem, selectionMode, rowItems, columnItems, hierarchyNavigator) {
                switch (selectionMode) {
                  case PivotTableSelectionMode.RowHeader:
                    return this.getMatchingHeader(selectedItem, rowItems);

                  case PivotTableSelectionMode.ColumnHeader:
                    return this.getMatchingHeader(selectedItem, columnItems);

                  case PivotTableSelectionMode.BodyCell:
                    var selectedBodyCell = selectedItem, rowItem = this.getMatchingHeader(selectedBodyCell.rowItem, rowItems), columnItem = this.getMatchingHeader(selectedBodyCell.columnItem, columnItems);
                    return rowItem && columnItem ? hierarchyNavigator.getIntersection(rowItem, columnItem) : null;
                }
            }, PivotTableSelectionManager.getMatchingHeader = function(selectedItem, items) {
                if (items) for (var _i = 0, items_5 = items; _i < items_5.length; _i++) {
                    var item = items_5[_i];
                    if (this.areHeadersEqual(selectedItem, item)) return item;
                    var matching = this.getMatchingHeader(selectedItem, item.children);
                    if (matching) return matching;
                }
                return null;
            }, PivotTableSelectionManager.areHeadersEqual = function(item1, item2) {
                if (powerbi.DataViewScopeIdentity.equals(item1.identity, item2.identity) && item1.queryName === item2.queryName) {
                    if (!item1.parent && !item2.parent) return !0;
                    if (item1.parent && item2.parent) return this.areHeadersEqual(item1.parent, item2.parent);
                }
                return !1;
            }, PivotTableSelectionManager.areCornerItemsEqual = function(item1, item2) {
                return !(!item1.metadata || !item2.metadata) && item1.metadata.queryName === item2.metadata.queryName;
            }, PivotTableSelectionManager.prototype.clearLocal = function() {
                this.selectedItems = [];
            }, PivotTableSelectionManager.prototype.isEmpty = function() {
                return _.isEmpty(this.selectedItems);
            }, PivotTableSelectionManager.prototype.isItemSelected = function(item) {
                for (var _i = 0, _a = this.selectedItems; _i < _a.length; _i++) {
                    var selectedItem = _a[_i];
                    if (selectedItem instanceof visuals.MatrixVisualBodyItem && item instanceof visuals.MatrixVisualBodyItem) {
                        if (this.areBodyCellsEqual(selectedItem, item)) return !0;
                    } else if (selectedItem === item) return !0;
                }
                return !1;
            }, PivotTableSelectionManager.prototype.unselectItem = function(item) {
                var _this = this;
                item instanceof visuals.MatrixVisualBodyItem ? _.remove(this.selectedItems, function(selectedItem) {
                    return _this.areBodyCellsEqual(selectedItem, item);
                }) : _.pull(this.selectedItems, item);
            }, PivotTableSelectionManager.prototype.areBodyCellsEqual = function(bodyCell1, bodyCell2) {
                return bodyCell1.rowItem === bodyCell2.rowItem && bodyCell1.columnItem === bodyCell2.columnItem;
            }, PivotTableSelectionManager.prototype.getEffectiveSelectedHeader = function(header) {
                return header && !header.identity ? this.getEffectiveSelectedHeader(header.parent) : header;
            }, PivotTableSelectionManager.getRoleName = function(selectionMode) {
                return selectionMode === PivotTableSelectionMode.ColumnHeader ? visuals.matrixRoleNames.columns : visuals.matrixRoleNames.rows;
            }, PivotTableSelectionManager.prototype.createSelectingArgs = function(item, selectionMode, mouseEvent) {
                var args = {
                    visualObjects: this.getVisualObjects([ item ]),
                    position: PivotTableSelectionManager.getMouseEventPosition(mouseEvent)
                };
                return args.dataRoles = [ PivotTableSelectionManager.getRoleName(selectionMode) ], 
                args;
            }, PivotTableSelectionManager.prototype.createSelectArgs = function(items) {
                for (var visualObjects = [], _i = 0, items_6 = items; _i < items_6.length; _i++) {
                    var item = items_6[_i], selector = this.createSelectorsByColumn(item);
                    selector && visualObjects.push({
                        objectName: "",
                        selectorsByColumn: selector
                    });
                }
                return {
                    visualObjects: this.getVisualObjects(items)
                };
            }, PivotTableSelectionManager.prototype.getVisualObjects = function(items) {
                for (var visualObjects = [], _i = 0, items_7 = items; _i < items_7.length; _i++) {
                    var item = items_7[_i], selector = this.createSelectorsByColumn(item);
                    selector && visualObjects.push({
                        objectName: "",
                        selectorsByColumn: selector
                    });
                }
                return visualObjects;
            }, PivotTableSelectionManager.prototype.createContextMenuArgs = function(items, mouseEvent) {
                for (var data = [], _i = 0, items_8 = items; _i < items_8.length; _i++) {
                    var item = items_8[_i], selector = this.createSelectorsByColumn(item);
                    selector && data.push(selector);
                }
                return _.isEmpty(data) ? null : {
                    data: data,
                    position: PivotTableSelectionManager.getMouseEventPosition(mouseEvent)
                };
            }, PivotTableSelectionManager.prototype.createSelectorsByColumn = function(item) {
                return item instanceof visuals.MatrixVisualBodyItem ? this.createSelectorsByColumnForBodyCell(item) : this.createSelectorsByColumnForHeader(item);
            }, PivotTableSelectionManager.prototype.createSelectorsByColumnForHeader = function(header) {
                var queryName = header.queryName, dataMap = {}, hasIdentity = PivotTableSelectionManager.addHeaderIdentities(header, dataMap);
                return hasIdentity ? {
                    dataMap: dataMap,
                    metadata: [ queryName ]
                } : null;
            }, PivotTableSelectionManager.prototype.createSelectorsByColumnForBodyCell = function(bodyCell) {
                var dataMap = {}, rowIdentity = PivotTableSelectionManager.addHeaderIdentities(bodyCell.rowItem, dataMap), columnIdentity = PivotTableSelectionManager.addHeaderIdentities(bodyCell.columnItem, dataMap);
                return rowIdentity || columnIdentity ? {
                    dataMap: dataMap,
                    metadata: bodyCell.columnMetadata ? [ bodyCell.columnMetadata.queryName ] : void 0
                } : null;
            }, PivotTableSelectionManager.addHeaderIdentities = function(header, dataMap) {
                for (var hasIdentity = !1; header; ) header.identity && (dataMap[header.queryName] = [ header.identity ], 
                hasIdentity = !0), header = header.parent;
                return hasIdentity;
            }, PivotTableSelectionManager.hasIdentity = function(header) {
                return PivotTableSelectionManager.addHeaderIdentities(header, {});
            }, PivotTableSelectionManager.getMouseEventPosition = function(mouseEvent) {
                return {
                    x: mouseEvent.clientX,
                    y: mouseEvent.clientY
                };
            }, PivotTableSelectionManager;
        }();
        visuals.PivotTableSelectionManager = PivotTableSelectionManager;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var DataViewMatrixUtils = powerbi.data.DataViewMatrixUtils, TablixObjects = powerbi.visuals.controls.internal.TablixObjects, DataViewScopeTotal = powerbi.data.DataViewScopeTotal, PivotTableSizeManager = function() {
            function PivotTableSizeManager(hostServices) {
                this.hostServices = hostServices;
            }
            return PivotTableSizeManager.prototype.onDataViewChanged = function(columnHierarchy, valueSources, metatdataObjects, valuesOnRowApplied) {
                this.columnHierarchy = columnHierarchy, this.valueSources = valueSources, this.metatdataObjects = metatdataObjects, 
                this.valuesOnRowApplied = valuesOnRowApplied, this.hasColumnGrouping = DataViewMatrixUtils.getColumnGroupingLevelsCount(this.columnHierarchy) > 0, 
                this.hasMultiMeasureOnColumns = !_.isEmpty(this.valueSources) && this.valueSources.length > 1 && !this.valuesOnRowApplied, 
                this.headerPendingChanges = [], this.cornerPendingChanges = [];
            }, PivotTableSizeManager.prototype.getNodeSelector = function(header) {
                if (!this.hasColumnGrouping) {
                    if (header.queryName) return {
                        metadata: header.queryName
                    };
                    if (this.valuesOnRowApplied) return null;
                }
                for (var selector = {}; header; ) {
                    if (this.hasMultiMeasureOnColumns && header.level === this.columnHierarchy.levels.length - 1) selector.metadata = header.queryName; else if (header.isSubtotal) {
                        for (var totalExprs = [], levelSources = this.columnHierarchy.levels[header.level].sources, _i = 0, levelSources_1 = levelSources; _i < levelSources_1.length; _i++) {
                            var source = levelSources_1[_i];
                            _.isEmpty(source.identityExprs) || totalExprs.push.apply(totalExprs, source.identityExprs);
                        }
                        _.isEmpty(totalExprs) || (selector.data = [ DataViewScopeTotal.fromExprs(totalExprs) ]);
                    } else header.identity && (selector.data ? selector.data.splice(0, 0, header.identity) : selector.data = [ header.identity ]);
                    header = header.parent;
                }
                return selector;
            }, PivotTableSizeManager.prototype.getCornerSelector = function(corner) {
                if (corner.metadata && corner.metadata.queryName) return {
                    metadata: corner.metadata.queryName
                };
            }, PivotTableSizeManager.prototype.getHeaderPendingChange = function(header) {
                return _.find(this.headerPendingChanges, function(change) {
                    return visuals.PivotTableSelectionManager.areHeadersEqual(change.cell, header);
                });
            }, PivotTableSizeManager.prototype.getCornerPendingChange = function(corner) {
                return _.find(this.cornerPendingChanges, function(change) {
                    return visuals.PivotTableSelectionManager.areCornerItemsEqual(change.cell, corner);
                });
            }, PivotTableSizeManager.prototype.queueHeaderPendingChange = function(header, width) {
                var pendingChange = this.getHeaderPendingChange(header);
                pendingChange ? pendingChange.width = width : this.headerPendingChanges.push({
                    cell: header,
                    width: width
                });
            }, PivotTableSizeManager.prototype.queueCornerPendingChange = function(corner, width) {
                var pendingChange = this.getCornerPendingChange(corner);
                pendingChange ? pendingChange.width = width : this.cornerPendingChanges.push({
                    cell: corner,
                    width: width
                });
            }, PivotTableSizeManager.prototype.getColumnWidth = function(header) {
                var pendingChange = this.getHeaderPendingChange(header);
                if (pendingChange) return pendingChange.width;
                var objects;
                return this.hasColumnGrouping ? objects = header.objects : header.queryName ? objects = this.valueSources[header.levelSourceIndex || 0].objects : this.valuesOnRowApplied && (objects = this.metatdataObjects), 
                TablixObjects.PropColumnWidthValue.getValue(objects);
            }, PivotTableSizeManager.prototype.setColumnWidth = function(header, width) {
                var selector = this.getNodeSelector(header);
                this.queueHeaderPendingChange(header, width), visuals.PivotTableSizeManagerUtils.persistWidths([ {
                    selector: selector,
                    value: width
                } ], this.hostServices, this.onPersisting);
            }, PivotTableSizeManager.prototype.getRowHeight = function(header) {}, PivotTableSizeManager.prototype.setRowHeight = function(header, height) {}, 
            PivotTableSizeManager.prototype.getRowLevelWidth = function(cornerCell) {
                var pendingChange = this.getCornerPendingChange(cornerCell);
                return pendingChange ? pendingChange.width : cornerCell.metadata && cornerCell.metadata.objects ? TablixObjects.PropColumnWidthValue.getValue(cornerCell.metadata.objects) : void 0;
            }, PivotTableSizeManager.prototype.setRowLevelWidth = function(cornerCell, width) {
                var selector = this.getCornerSelector(cornerCell);
                selector && (this.queueCornerPendingChange(cornerCell, width), visuals.PivotTableSizeManagerUtils.persistWidths([ {
                    selector: selector,
                    value: width
                } ], this.hostServices, this.onPersisting));
            }, PivotTableSizeManager.prototype.getColumnLevelHeight = function(cornerCell) {}, 
            PivotTableSizeManager.prototype.setColumnLevelHeight = function(cornerCell, height) {}, 
            PivotTableSizeManager.prototype.setMissingWidths = function(headersWidth, cornersWidth) {
                for (var widthsToPersist = [], _i = 0, headersWidth_1 = headersWidth; _i < headersWidth_1.length; _i++) {
                    var headerWidth = headersWidth_1[_i], node = headerWidth.node, width = headerWidth.width;
                    null == this.getColumnWidth(node) && (this.queueHeaderPendingChange(node, width), 
                    widthsToPersist.push({
                        selector: this.getNodeSelector(node),
                        value: width
                    }));
                }
                for (var _a = 0, cornersWidth_1 = cornersWidth; _a < cornersWidth_1.length; _a++) {
                    var cornerWidth = cornersWidth_1[_a], corner = cornerWidth.corner, width = cornerWidth.width, selector = this.getCornerSelector(corner);
                    selector && null == this.getRowLevelWidth(corner) && (this.queueCornerPendingChange(corner, width), 
                    widthsToPersist.push({
                        selector: selector,
                        value: width
                    }));
                }
                _.isEmpty(widthsToPersist) || visuals.PivotTableSizeManagerUtils.persistWidths(widthsToPersist, this.hostServices, this.onPersisting);
            }, PivotTableSizeManager.prototype.clearWidths = function(columnHeaders, cornerItems) {
                for (var widthsToPersist = [], _i = 0, columnHeaders_1 = columnHeaders; _i < columnHeaders_1.length; _i++) {
                    var node = columnHeaders_1[_i];
                    null != this.getColumnWidth(node) && widthsToPersist.push({
                        selector: this.getNodeSelector(node),
                        value: void 0
                    }), this.queueHeaderPendingChange(node, void 0);
                }
                for (var _a = 0, cornerItems_1 = cornerItems; _a < cornerItems_1.length; _a++) {
                    var corner = cornerItems_1[_a];
                    null != this.getRowLevelWidth(corner) && widthsToPersist.push({
                        selector: this.getCornerSelector(corner),
                        value: void 0
                    }), this.queueCornerPendingChange(corner, void 0);
                }
                _.isEmpty(widthsToPersist) || visuals.PivotTableSizeManagerUtils.persistWidths(widthsToPersist, this.hostServices, this.onPersisting);
            }, PivotTableSizeManager;
        }();
        visuals.PivotTableSizeManager = PivotTableSizeManager;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var TablixColumnWidthManager = powerbi.visuals.controls.TablixColumnWidthManager, TablixControl = powerbi.visuals.controls.TablixControl, TablixObjects = powerbi.visuals.controls.internal.TablixObjects, TablixType = powerbi.visuals.controls.TablixType, TablixUtils = powerbi.visuals.controls.internal.TablixUtils, Table = function() {
            function Table(options) {
                this.isTouchDisabled = options && options.isTouchDisabled;
            }
            return Table.prototype.init = function(options) {
                this.element = options.element, this.updateViewport(options.viewport), this.formatter = visuals.valueFormatter.formatVariantMeasureValueWithDataPointObjects, 
                this.isInteractive = options.interactivity && null != options.interactivity.selection, 
                this.getLocalizedString = options.host.getLocalizedString, this.hostServices = options.host, 
                this.persistingObjects = !1, this.waitingForData = !1, this.lastAllowHeaderResize = !0, 
                this.waitingForSort = !1;
            }, Table.converter = function(dataView) {
                var table = dataView.table, visualTable = powerbi.Prototype.inherit(table);
                visualTable.visualRows = [];
                for (var i = 0; i < table.rows.length; i++) {
                    var visualRow = {
                        index: i,
                        values: table.rows[i]
                    };
                    visualTable.visualRows.push(visualRow);
                }
                return visualTable.formattingProperties = TablixObjects.getTableObjects(dataView), 
                visualTable;
            }, Table.prototype.onResizing = function(finalViewport) {
                this.updateViewport(finalViewport);
            }, Table.prototype.getColumnWidthManager = function() {
                return this.columnWidthManager;
            }, Table.prototype.onDataChanged = function(options) {
                var dataViews = options.dataViews;
                if (dataViews && dataViews.length > 0) {
                    var previousDataView = this.dataView;
                    if (this.dataView = dataViews[0], this.persistingObjects) return void (this.persistingObjects = !1);
                    var visualTable = Table.converter(this.dataView);
                    options.operationKind === powerbi.VisualDataChangeOperationKind.Append ? (this.createOrUpdateHierarchyNavigator(visualTable), 
                    this.tablixControl.updateModels(!1, visualTable.visualRows, visualTable.columns), 
                    this.refreshControl(!1)) : (this.createOrUpdateHierarchyNavigator(visualTable), 
                    this.createColumnWidthManager(), this.createOrUpdateTablixControl(visualTable), 
                    this.updateInternal(previousDataView, visualTable));
                }
                this.waitingForData = !1, this.waitingForSort = !1;
            }, Table.prototype.createColumnWidthManager = function() {
                var _this = this;
                this.columnWidthManager ? this.columnWidthManager.updateDataView(this.dataView) : this.columnWidthManager = new TablixColumnWidthManager(this.dataView, (!1), function(objectInstances) {
                    return _this.persistColumnWidths(objectInstances);
                });
            }, Table.prototype.persistColumnWidths = function(objectInstances) {
                this.persistingObjects = !0, this.hostServices.persistProperties(objectInstances);
            }, Table.prototype.updateViewport = function(newViewport) {
                this.currentViewport = newViewport, this.tablixControl && (this.tablixControl.viewport = this.currentViewport, 
                this.verifyHeaderResize(), this.refreshControl(!1));
            }, Table.prototype.refreshControl = function(clear) {
                (visuals.visibilityHelper.partiallyVisible(this.element) || 1 === this.getLayoutKind()) && this.tablixControl.refresh(clear);
            }, Table.prototype.getLayoutKind = function() {
                return this.isInteractive ? 0 : 1;
            }, Table.prototype.createOrUpdateHierarchyNavigator = function(visualTable) {
                var isDataComplete = !this.dataView.metadata.segment;
                if (this.tablixControl) this.hierarchyNavigator.update(visualTable, isDataComplete); else {
                    var dataNavigator = new visuals.TableHierarchyNavigator(visualTable, isDataComplete, this.formatter);
                    this.hierarchyNavigator = dataNavigator;
                }
            }, Table.prototype.createOrUpdateTablixControl = function(visualTable) {
                if (this.tablixControl) {
                    var binder = this.tablixControl.getBinder();
                    binder.updateDataView(visualTable);
                } else this.tablixControl = this.createControl(this.hierarchyNavigator, visualTable);
            }, Table.prototype.createControl = function(dataNavigator, visualTable) {
                var _this = this, layoutKind = this.getLayoutKind(), textSize = visualTable.formattingProperties.general.textSize, tableBinderOptions = {
                    onBindRowHeader: function(item) {
                        return _this.onBindRowHeader(item);
                    },
                    onColumnHeaderClick: function(queryName, sortDirection) {
                        return _this.onColumnHeaderClick(queryName, sortDirection);
                    },
                    layoutKind: layoutKind,
                    columnWidthManager: this.columnWidthManager
                }, tableBinder = new visuals.TableBinder(tableBinderOptions, visualTable), layoutManager = 1 === layoutKind ? visuals.controls.internal.DashboardTablixLayoutManager.createLayoutManager(tableBinder) : visuals.controls.internal.CanvasTablixLayoutManager.createLayoutManager(tableBinder, this.columnWidthManager), tablixContainer = document.createElement("div");
                this.element.append(tablixContainer);
                var tablixOptions = {
                    interactive: this.isInteractive,
                    enableTouchSupport: !this.isTouchDisabled,
                    layoutKind: layoutKind,
                    fontSize: TablixObjects.getTextSizeInPx(textSize)
                };
                return new TablixControl(dataNavigator, layoutManager, tableBinder, tablixContainer, tablixOptions);
            }, Table.prototype.updateInternal = function(previousDataView, visualTable) {
                var _this = this, textSize = visualTable.formattingProperties.general.textSize;
                1 === this.getLayoutKind() && this.tablixControl.layoutManager.adjustContentSize(visuals.converterHelper.hasImageUrlColumn(this.dataView)), 
                this.tablixControl.fontSize = TablixObjects.getTextSizeInPx(textSize), this.tablixControl.wordWrapColumnHeaders = visualTable.formattingProperties.columnHeaders.wordWrap, 
                this.verifyHeaderResize(), this.tablixControl.updateModels(!0, visualTable.visualRows, visualTable.columns);
                var totals = this.createTotalsRow(this.dataView);
                this.tablixControl.rowDimension.setFooter(totals), this.tablixControl.viewport = this.currentViewport;
                var shouldClearControl = this.shouldClearControl(previousDataView, this.dataView);
                setTimeout(function() {
                    _this.refreshControl(shouldClearControl);
                    var widthChanged = _this.columnWidthManager.onColumnsRendered(_this.tablixControl.layoutManager.columnWidthsToPersist);
                    _this.persistingObjects && !widthChanged && (_this.persistingObjects = !1);
                }, 0);
            }, Table.prototype.shouldClearControl = function(previousDataView, newDataView) {
                return !(this.waitingForSort && previousDataView && newDataView) || !powerbi.DataViewAnalysis.isMetadataEquivalent(previousDataView.metadata, newDataView.metadata);
            }, Table.prototype.createTotalsRow = function(dataView) {
                if (!TablixObjects.PropGeneralTableTotals.getValue(dataView.metadata.objects)) return null;
                var totals = dataView.table.totals;
                if (!totals || 0 === totals.length) return null;
                for (var totalRow = [], columns = dataView.table.columns, i = 0, len = columns.length; i < len; ++i) {
                    var totalValue = totals[i];
                    null != totalValue ? totalRow.push(totalValue) : totalRow.push(0 === i ? this.getLocalizedString("TableTotalLabel") : "");
                }
                return {
                    totalCells: totalRow,
                    objects: dataView.table.totals.objects
                };
            }, Table.prototype.onBindRowHeader = function(item) {
                this.needsMoreData(item) && (this.hostServices.loadMoreData(), this.waitingForData = !0);
            }, Table.prototype.onColumnHeaderClick = function(queryName, sortDirection) {
                this.waitingForSort = !0, this.hostServices.onCustomSort(TablixUtils.getCustomSortEventArgs(queryName, sortDirection));
            }, Table.prototype.needsMoreData = function(item) {
                if (this.waitingForData || !this.dataView.metadata || !this.dataView.metadata.segment) return !1;
                var leafCount = this.tablixControl.rowDimension.getItemsCount(), loadMoreThreshold = leafCount * TablixUtils.PreferredLoadMoreThreshold;
                return this.hierarchyNavigator.getIndex(item) >= loadMoreThreshold;
            }, Table.prototype.enumerateObjectInstances = function(options) {
                var enumeration = new visuals.ObjectEnumerationBuilder();
                return this.dataView && TablixObjects.enumerateObjectInstances(options, enumeration, this.dataView, TablixType.Table), 
                enumeration.complete();
            }, Table.prototype.enumerateObjectRepetition = function() {
                var enumeration = [];
                return this.dataView && TablixObjects.enumerateObjectRepetition(enumeration, this.dataView, TablixType.Table), 
                enumeration;
            }, Table.prototype.shouldAllowHeaderResize = function() {
                return 1 === this.hostServices.getViewMode();
            }, Table.prototype.onViewModeChanged = function(viewMode) {
                this.tablixControl && this.tablixControl.toggleTouchBindings(1 !== viewMode), this.updateViewport(this.currentViewport);
            }, Table.prototype.verifyHeaderResize = function() {
                var currentAllowHeaderResize = this.shouldAllowHeaderResize();
                currentAllowHeaderResize !== this.lastAllowHeaderResize && (this.lastAllowHeaderResize = currentAllowHeaderResize, 
                this.tablixControl.layoutManager.setAllowHeaderResize(currentAllowHeaderResize));
            }, Table;
        }();
        visuals.Table = Table;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var TableStyler, CellStyle = powerbi.visuals.controls.internal.TablixUtils.CellStyle, EdgeSettings = powerbi.visuals.controls.internal.TablixUtils.EdgeSettings, EdgeType = powerbi.visuals.controls.internal.TablixUtils.EdgeType, TablixObjects = powerbi.visuals.controls.internal.TablixObjects, TablixUtils = powerbi.visuals.controls.internal.TablixUtils, UrlScheme = jsCommon.UrlUtils.UrlScheme, UrlUtils = jsCommon.UrlUtils, WordBreaker = jsCommon.WordBreaker;
        !function(TableStyler) {
            function setColumnHeaderStyle(position, cellStyle, formattingProperties, columnFormatting) {
                cellStyle.fontFamily = TablixUtils.FontFamilyHeader, cellStyle.fontColor = TablixUtils.FontColorHeaders, 
                cellStyle.borders.bottom = new EdgeSettings(TablixObjects.PropGridOutlineWeight.defaultValue, TablixObjects.PropGridOutlineColor.defaultValue);
                var propsGrid = formattingProperties.grid, props = formattingProperties.columnHeaders, propsTotal = formattingProperties.total, propsValues = formattingProperties.values;
                cellStyle.borders.top = new EdgeSettings(), cellStyle.borders.top.applyParams(visuals.outline.showTop(props.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline), 
                cellStyle.borders.bottom = new EdgeSettings(), cellStyle.borders.bottom.applyParams(visuals.outline.showBottom(props.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline), 
                cellStyle.borders.left = new EdgeSettings(), position.column.isFirst && (cellStyle.borders.left.applyParams(visuals.outline.showLeft(props.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline), 
                visuals.outline.showLeft(props.outline) || !visuals.outline.showLeft(propsTotal.outline) && !visuals.outline.showLeft(propsValues.outline) || (cellStyle.paddings.left += propsGrid.outlineWeight)), 
                cellStyle.borders.right = new EdgeSettings(), position.column.isLast ? (cellStyle.borders.right.applyParams(visuals.outline.showRight(props.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline), 
                visuals.outline.showRight(props.outline) || !visuals.outline.showRight(propsTotal.outline) && !visuals.outline.showRight(propsValues.outline) || (cellStyle.paddings.right += propsGrid.outlineWeight)) : cellStyle.borders.right.applyParams(propsGrid.gridVertical, propsGrid.gridVerticalWeight, propsGrid.gridVerticalColor, EdgeType.Gridline), 
                columnFormatting && columnFormatting.styleHeader && columnFormatting.fontColor ? cellStyle.fontColor = columnFormatting.fontColor : cellStyle.fontColor = props.fontColor, 
                columnFormatting && columnFormatting.styleHeader && columnFormatting.backColor ? cellStyle.backColor = columnFormatting.backColor : cellStyle.backColor = props.backColor, 
                cellStyle.paddings.top = cellStyle.paddings.bottom = propsGrid.rowPadding;
            }
            function setBodyCellStyle(position, item, cellStyle, formattingProperties, columnFormatting) {
                position.row.isLast || (cellStyle.borders.bottom = new EdgeSettings(TablixObjects.PropGridHorizontalWeight.defaultValue, TablixObjects.PropGridHorizontalColor.defaultValue));
                var propsGrid = formattingProperties.grid, props = formattingProperties.values, propsTotal = formattingProperties.total, propsColumns = formattingProperties.columnHeaders;
                cellStyle.borders.top = new EdgeSettings(), position.row.isFirst && cellStyle.borders.top.applyParams(visuals.outline.showTop(props.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline), 
                cellStyle.borders.bottom = new EdgeSettings(), position.row.isLast ? cellStyle.borders.bottom.applyParams(visuals.outline.showBottom(props.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline) : cellStyle.borders.bottom.applyParams(propsGrid.gridHorizontal, propsGrid.gridHorizontalWeight, propsGrid.gridHorizontalColor, EdgeType.Gridline), 
                cellStyle.borders.left = new EdgeSettings(), position.column.isFirst && (cellStyle.borders.left.applyParams(visuals.outline.showLeft(props.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline), 
                visuals.outline.showLeft(props.outline) || !visuals.outline.showLeft(propsTotal.outline) && !visuals.outline.showLeft(propsColumns.outline) || (cellStyle.paddings.left += propsGrid.outlineWeight)), 
                cellStyle.borders.right = new EdgeSettings(), position.column.isLast ? (cellStyle.borders.right.applyParams(visuals.outline.showRight(props.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline), 
                visuals.outline.showRight(props.outline) || !visuals.outline.showRight(propsTotal.outline) && !visuals.outline.showRight(propsColumns.outline) || (cellStyle.paddings.right += propsGrid.outlineWeight)) : cellStyle.borders.right.applyParams(propsGrid.gridVertical, propsGrid.gridVerticalWeight, propsGrid.gridVerticalColor, EdgeType.Gridline), 
                item.fontColor ? cellStyle.fontColor = item.fontColor : columnFormatting && columnFormatting.styleValues && columnFormatting.fontColor ? cellStyle.fontColor = columnFormatting.fontColor : cellStyle.fontColor = position.row.index % 2 === 0 ? props.fontColorPrimary : props.fontColorSecondary, 
                item.backColor ? cellStyle.backColor = item.backColor : columnFormatting && columnFormatting.styleValues && columnFormatting.backColor ? cellStyle.backColor = columnFormatting.backColor : cellStyle.backColor = position.row.index % 2 === 0 ? props.backColorPrimary : props.backColorSecondary, 
                cellStyle.paddings.top = cellStyle.paddings.bottom = propsGrid.rowPadding;
            }
            function setFooterBodyCellStyle(position, cellStyle, formattingProperties, columnFormatting) {
                cellStyle.fontFamily = TablixUtils.FontFamilyTotal, cellStyle.borders.top = new EdgeSettings(TablixObjects.PropGridOutlineWeight.defaultValue, TablixObjects.PropGridOutlineColor.defaultValue);
                var props = formattingProperties.total, propsGrid = formattingProperties.grid, propsValues = formattingProperties.values, propsColumns = formattingProperties.columnHeaders;
                cellStyle.borders.top = new EdgeSettings(), cellStyle.borders.top.applyParams(visuals.outline.showTop(props.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline), 
                cellStyle.borders.bottom = new EdgeSettings(), cellStyle.borders.bottom.applyParams(visuals.outline.showBottom(props.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline), 
                cellStyle.borders.left = new EdgeSettings(), position.column.isFirst && (cellStyle.borders.left.applyParams(visuals.outline.showLeft(props.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline), 
                visuals.outline.showLeft(props.outline) || !visuals.outline.showLeft(propsValues.outline) && !visuals.outline.showLeft(propsColumns.outline) || (cellStyle.paddings.left += propsGrid.outlineWeight)), 
                cellStyle.borders.right = new EdgeSettings(), position.column.isLast ? (cellStyle.borders.right.applyParams(visuals.outline.showRight(props.outline), propsGrid.outlineWeight, propsGrid.outlineColor, EdgeType.Outline), 
                visuals.outline.showRight(props.outline) || !visuals.outline.showRight(propsValues.outline) && !visuals.outline.showRight(propsColumns.outline) || (cellStyle.paddings.right += propsGrid.outlineWeight)) : cellStyle.borders.right.applyParams(propsGrid.gridVertical, propsGrid.gridVerticalWeight, propsGrid.gridVerticalColor, EdgeType.Gridline), 
                columnFormatting && columnFormatting.styleTotal && columnFormatting.fontColor ? cellStyle.fontColor = columnFormatting.fontColor : cellStyle.fontColor = props.fontColor, 
                columnFormatting && columnFormatting.styleTotal && columnFormatting.backColor ? cellStyle.backColor = columnFormatting.backColor : cellStyle.backColor = props.backColor, 
                cellStyle.paddings.top = cellStyle.paddings.bottom = propsGrid.rowPadding;
            }
            TableStyler.setColumnHeaderStyle = setColumnHeaderStyle, TableStyler.setBodyCellStyle = setBodyCellStyle, 
            TableStyler.setFooterBodyCellStyle = setFooterBodyCellStyle;
        }(TableStyler = visuals.TableStyler || (visuals.TableStyler = {}));
        var TableBinder = function() {
            function TableBinder(options, dataView) {
                this.options = options, dataView && this.updateDataView(dataView);
            }
            return TableBinder.prototype.updateDataView = function(dataView) {
                this.tableDataView = dataView, this.formattingProperties = dataView.formattingProperties, 
                this.updateTextHeights(), this.hasImage() ? this.rowHeight = Math.max(this.textHeightValue, this.formattingProperties.grid.imageHeight) : this.rowHeight = this.textHeightValue;
            }, TableBinder.prototype.updateTextHeights = function() {
                this.fontSizeHeader = this.formattingProperties.general.textSize.px, this.textPropsHeader = {
                    fontFamily: TablixUtils.FontFamilyHeader,
                    fontSize: jsCommon.PixelConverter.toString(this.fontSizeHeader)
                }, this.textHeightHeader = Math.ceil(powerbi.TextMeasurementService.measureSvgTextHeight(this.textPropsHeader, "a")), 
                this.fontSizeValue = this.formattingProperties.general.textSize.px, this.textPropsValue = {
                    fontFamily: TablixUtils.FontFamilyCell,
                    fontSize: jsCommon.PixelConverter.toString(this.fontSizeValue)
                }, this.textHeightValue = Math.ceil(powerbi.TextMeasurementService.measureSvgTextHeight(this.textPropsValue, "a")), 
                this.fontSizeTotal = this.formattingProperties.general.textSize.px, this.textPropsTotal = {
                    fontFamily: TablixUtils.FontFamilyTotal,
                    fontSize: jsCommon.PixelConverter.toString(this.fontSizeTotal)
                }, this.textHeightTotal = Math.ceil(powerbi.TextMeasurementService.measureSvgTextHeight(this.textPropsTotal, "a"));
            }, TableBinder.prototype.hasImage = function() {
                return _.any(this.tableDataView.columns, function(col) {
                    return visuals.converterHelper.isImageUrlColumn(col);
                });
            }, TableBinder.prototype.getColumnFormatting = function(column) {
                return this.formattingProperties.columnFormatting[column.queryName];
            }, TableBinder.prototype.onStartRenderingSession = function() {}, TableBinder.prototype.onEndRenderingSession = function() {}, 
            TableBinder.prototype.bindRowHeader = function(item, cell) {
                item.totalCells ? cell.contentHeight = this.textHeightTotal : cell.contentHeight = this.rowHeight, 
                TablixUtils.clearCellStyle(cell), this.options.onBindRowHeader && this.options.onBindRowHeader(item);
            }, TableBinder.prototype.unbindRowHeader = function(item, cell) {}, TableBinder.prototype.bindColumnHeader = function(item, cell) {
                var _this = this;
                cell.extension.disableDragResize(), TablixUtils.resetCellCssClass(cell), TablixUtils.addCellCssClass(cell, TablixUtils.CssClassTablixHeader), 
                TablixUtils.addCellCssClass(cell, TablixUtils.CssClassTablixColumnHeaderLeaf);
                var cellStyle = new CellStyle();
                TableStyler.setColumnHeaderStyle(cell.position, cellStyle, this.formattingProperties, this.getColumnFormatting(item));
                var contentElement = cell.extension.contentHost;
                contentElement = TablixUtils.appendDiv(contentElement), contentElement.classList.add(TablixUtils.CssClassWrappingContainer);
                var wordWrappingLines, maxTextWidth = this.getWordWrappingWidth(item.queryName, cell, cellStyle);
                null != maxTextWidth && (wordWrappingLines = this.getWordWrappingLines(item.displayName, maxTextWidth));
                var isWordWrapped = wordWrappingLines && wordWrappingLines.length > 1;
                if (isWordWrapped) {
                    cell.contentHeight = wordWrappingLines.length * this.textHeightHeader;
                    for (var i = 0, len = wordWrappingLines.length; i < len - 1; i++) TablixUtils.appendDiv(contentElement, wordWrappingLines[i]);
                    contentElement = TablixUtils.appendDiv(contentElement);
                } else cell.contentHeight = this.textHeightHeader;
                this.sortIconsEnabled() && (contentElement = TablixUtils.addSortIconToColumnHeader(item.sort, contentElement), 
                item.sort && !isWordWrapped && (cell.contentWidth = this.fontSizeHeader + TablixUtils.SortIconPadding));
                var columnTitle = item.displayName;
                if (isWordWrapped) {
                    var lastLine = _.last(wordWrappingLines);
                    TablixUtils.setCellText(lastLine, contentElement), TablixUtils.setCellTooltip(columnTitle, cell.extension.contentHost), 
                    cell.contentWidth = maxTextWidth;
                } else TablixUtils.setCellTextAndTooltip(columnTitle, contentElement, cell.extension.contentHost), 
                cell.contentWidth += powerbi.TextMeasurementService.measureSvgTextWidth(this.textPropsHeader, columnTitle);
                if (cell.contentWidth = Math.ceil(cell.contentWidth), this.options.onColumnHeaderClick) {
                    var handler = function(e) {
                        if (TablixUtils.isValidSortClick(e)) {
                            var sortDirection = TablixUtils.reverseSort(item.sort);
                            _this.options.onColumnHeaderClick(item.queryName ? item.queryName : item.displayName, sortDirection);
                        }
                    };
                    cell.extension.registerClickHandler(handler);
                }
                cell.applyStyle(cellStyle);
            }, TableBinder.prototype.getWordWrappingLines = function(text, maxWidth) {
                return WordBreaker.splitByWidth(text, this.textPropsHeader, powerbi.TextMeasurementService.measureSvgTextWidth, maxWidth, TablixUtils.WordWrappingMaxLines, void 0, !0);
            }, TableBinder.prototype.getWordWrappingWidth = function(columnQueryName, cell, cellStyle) {
                if (this.formattingProperties.columnHeaders.wordWrap && 0 === this.options.layoutKind) {
                    var cellContainerWidth;
                    if (cell.isColumnResizing() && cell.containerWidth >= 0 ? cellContainerWidth = cell.containerWidth : this.options.columnWidthManager && (cellContainerWidth = this.options.columnWidthManager.getPersistedColumnWidth(columnQueryName)), 
                    null != cellContainerWidth) return Math.max(0, cellContainerWidth - (cellStyle.getExtraLeft() + cellStyle.getExtraRight()));
                }
            }, TableBinder.prototype.unbindColumnHeader = function(item, cell) {
                TablixUtils.clearCellStyle(cell), TablixUtils.clearCellTextAndTooltip(cell), this.sortIconsEnabled() && TablixUtils.removeSortIcons(cell), 
                this.options.onColumnHeaderClick && cell.extension.unregisterClickHandler();
            }, TableBinder.prototype.bindBodyCell = function(item, cell) {
                TablixUtils.resetCellCssClass(cell), this.setBodyContent(item, cell), cell.contentWidth = Math.ceil(cell.contentWidth), 
                item.isTotal ? (TablixUtils.addCellCssClass(cell, TablixUtils.CssClassTablixValueTotal), 
                TablixUtils.addCellCssClass(cell, TablixUtils.CssClassTableFooter)) : item.position.row.isLast ? TablixUtils.addCellCssClass(cell, TablixUtils.CssClassTableBodyCellBottom) : TablixUtils.addCellCssClass(cell, TablixUtils.CssClassTableBodyCell), 
                item.isNumeric && TablixUtils.addCellCssClass(cell, TablixUtils.CssClassTablixValueNumeric);
                var cellStyle = new CellStyle();
                item.isTotal ? TableStyler.setFooterBodyCellStyle(cell.position, cellStyle, this.formattingProperties, this.getColumnFormatting(item.columnMetadata)) : TableStyler.setBodyCellStyle(cell.position, item, cellStyle, this.formattingProperties, this.getColumnFormatting(item.columnMetadata)), 
                cell.applyStyle(cellStyle);
            }, TableBinder.prototype.setBodyContent = function(item, cell) {
                var element = cell.extension.contentHost, imgHeight = this.formattingProperties.grid.imageHeight, text = item.textContent;
                item.isTotal ? cell.contentHeight = this.textHeightTotal : item.isImage ? cell.contentHeight = imgHeight : cell.contentHeight = this.textHeightValue;
                var UrlType = TablixUtils.getUrlScheme(item.columnMetadata, item.textContent);
                if (UrlType !== UrlScheme.NONE) {
                    var showUrlIcon = this.formattingProperties.values.urlIcon, iconName = void 0;
                    return showUrlIcon && (iconName = TablixUtils.getUrlIconName(UrlType)), showUrlIcon && null != iconName ? TablixUtils.appendATagToBodyCell(text, element, iconName) : TablixUtils.appendATagToBodyCell(text, element), 
                    void (showUrlIcon ? cell.contentWidth = this.fontSizeValue : cell.contentWidth = powerbi.TextMeasurementService.measureSvgTextWidth(this.textPropsValue, text));
                }
                if (item.isImage && UrlUtils.isValidImageUrl(text)) return TablixUtils.appendImgTagToBodyCell(text, element, imgHeight), 
                void (cell.contentWidth = imgHeight * TablixUtils.ImageDefaultAspectRatio);
                var kpi = item.kpiContent;
                return kpi ? ($(element).append(kpi), void (cell.contentWidth = this.fontSizeValue)) : text ? (TablixUtils.setCellTextAndTooltip(text, element), 
                void (item.isTotal ? cell.contentWidth = powerbi.TextMeasurementService.measureSvgTextWidth(this.textPropsTotal, text) : cell.contentWidth = powerbi.TextMeasurementService.measureSvgTextWidth(this.textPropsValue, text))) : (TablixUtils.setCellTextAndTooltip(" ", element), 
                void (cell.contentWidth = 0));
            }, TableBinder.prototype.unbindBodyCell = function(item, cell) {
                TablixUtils.clearCellStyle(cell), TablixUtils.clearCellTextAndTooltip(cell);
            }, TableBinder.prototype.bindCornerCell = function(item, cell) {
                cell.contentWidth = 0;
            }, TableBinder.prototype.unbindCornerCell = function(item, cell) {}, TableBinder.prototype.bindEmptySpaceHeaderCell = function(cell) {}, 
            TableBinder.prototype.unbindEmptySpaceHeaderCell = function(cell) {}, TableBinder.prototype.bindEmptySpaceFooterCell = function(cell) {}, 
            TableBinder.prototype.unbindEmptySpaceFooterCell = function(cell) {}, TableBinder.prototype.getHeaderLabel = function(item) {
                return item ? item.displayName : "";
            }, TableBinder.prototype.getCellContent = function(item) {
                return item;
            }, TableBinder.prototype.hasRowGroups = function() {
                return !1;
            }, TableBinder.prototype.sortIconsEnabled = function() {
                return 0 === this.options.layoutKind;
            }, TableBinder;
        }();
        visuals.TableBinder = TableBinder;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var CellPosition = powerbi.visuals.controls.internal.TablixUtils.CellPosition, TablixObjects = powerbi.visuals.controls.internal.TablixObjects, TablixVisualCell = powerbi.visuals.controls.internal.TablixUtils.TablixVisualCell, TableHierarchyNavigator = function() {
            function TableHierarchyNavigator(tableDataView, isDataComplete, formatter) {
                this.tableDataView = tableDataView, this.isDataComplete = isDataComplete, this.formatter = formatter;
            }
            return TableHierarchyNavigator.prototype.getColumnHierarchyDepth = function() {
                return 1;
            }, TableHierarchyNavigator.prototype.getRowHierarchyDepth = function() {
                return 1;
            }, TableHierarchyNavigator.prototype.getLeafCount = function(hierarchy) {
                return hierarchy.length;
            }, TableHierarchyNavigator.prototype.getLeafAt = function(hierarchy, index) {
                return hierarchy[index];
            }, TableHierarchyNavigator.prototype.getParent = function(item) {
                return null;
            }, TableHierarchyNavigator.prototype.getIndex = function(item) {
                return item ? this.isRow(item) ? item.index : this.getColumnIndex(item) : -1;
            }, TableHierarchyNavigator.prototype.isRow = function(item) {
                if (!item) return !1;
                var row = item;
                return void 0 !== row.index && void 0 !== row.values;
            }, TableHierarchyNavigator.prototype.getColumnIndex = function(item) {
                return TableHierarchyNavigator.getIndex(this.tableDataView.columns, item);
            }, TableHierarchyNavigator.prototype.isLeaf = function(item) {
                return !0;
            }, TableHierarchyNavigator.prototype.isRowHierarchyLeaf = function(cornerItem) {
                return !1;
            }, TableHierarchyNavigator.prototype.isColumnHierarchyLeaf = function(cornerItem) {
                return !0;
            }, TableHierarchyNavigator.prototype.isFirstItem = function(item, items) {
                return item === items[0];
            }, TableHierarchyNavigator.prototype.areAllParentsFirst = function(item, items) {
                return this.isFirstItem(item, items);
            }, TableHierarchyNavigator.prototype.isLastItem = function(item, items) {
                return (items === this.tableDataView.columns || this.isDataComplete) && item === _.last(items);
            }, TableHierarchyNavigator.prototype.areAllParentsLast = function(item, items) {
                return this.isLastItem(item, items);
            }, TableHierarchyNavigator.prototype.getChildren = function(item) {
                return null;
            }, TableHierarchyNavigator.prototype.getChildrenLevelDifference = function(item) {
                return 1 / 0;
            }, TableHierarchyNavigator.prototype.getCount = function(items) {
                return items.length;
            }, TableHierarchyNavigator.prototype.getAt = function(items, index) {
                return items[index];
            }, TableHierarchyNavigator.prototype.getLevel = function(item) {
                return 0;
            }, TableHierarchyNavigator.prototype.getIntersection = function(rowItem, columnItem) {
                var value, objects, isTotal = !1, position = new CellPosition(), columnIndex = TableHierarchyNavigator.getIndex(this.tableDataView.columns, columnItem);
                position.column.index = columnIndex, position.column.isFirst = 0 === columnIndex, 
                position.column.isLast = columnIndex === this.tableDataView.columns.length - 1;
                var totalRow = rowItem;
                if (null != totalRow.totalCells) isTotal = !0, value = totalRow.totalCells[columnIndex], 
                objects = totalRow.objects && totalRow.objects[columnIndex]; else {
                    var row = rowItem, rowIndex = row.index;
                    position.row.index = rowIndex, position.row.isFirst = 0 === rowIndex, position.row.isLast = this.isDataComplete && rowIndex === this.tableDataView.rows.length - 1, 
                    value = row.values[columnIndex], objects = row.values.objects && row.values.objects[columnIndex];
                }
                var cellItem = new TablixVisualCell(value, objects, (!1), (!1), isTotal, (!1), columnItem, this.formatter, (!1));
                cellItem.position = position;
                var tableRow = rowItem;
                if (tableRow && tableRow.values) {
                    var rowObjects = tableRow.values.objects;
                    if (rowObjects) {
                        var cellObject = rowObjects[columnIndex];
                        cellObject && (cellItem.backColor = TablixObjects.PropValuesBackColor.getValue(cellObject));
                    }
                }
                return cellItem;
            }, TableHierarchyNavigator.prototype.getCorner = function(rowLevel, columnLevel) {
                return null;
            }, TableHierarchyNavigator.prototype.headerItemEquals = function(item1, item2) {
                if (item1 === item2) return !0;
                if (item1.displayName && item2.displayName) {
                    var column1 = item1, column2 = item2;
                    return powerbi.DataViewAnalysis.areMetadataColumnsEquivalent(column1, column2);
                }
                return !(!this.isRow(item1) || !this.isRow(item2)) && item1.index === item2.index;
            }, TableHierarchyNavigator.prototype.bodyCellItemEquals = function(item1, item2) {
                return item1.isMatch(item2);
            }, TableHierarchyNavigator.prototype.cornerCellItemEquals = function(item1, item2) {
                return !0;
            }, TableHierarchyNavigator.prototype.update = function(table, isDataComplete) {
                this.tableDataView = table, this.isDataComplete = isDataComplete;
            }, TableHierarchyNavigator.getIndex = function(items, item) {
                for (var index = 0, len = items.length; index < len; index++) {
                    var arrayItem = items[index];
                    if (null != arrayItem.index && null != item.index && arrayItem.index === item.index) return index;
                    if (item === items[index]) return index;
                }
                return -1;
            }, TableHierarchyNavigator;
        }();
        visuals.TableHierarchyNavigator = TableHierarchyNavigator;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var CellPosition = powerbi.visuals.controls.internal.TablixUtils.CellPosition, TablixObjects = powerbi.visuals.controls.internal.TablixObjects, TablixVisualCell = powerbi.visuals.controls.internal.TablixUtils.TablixVisualCell, TableExColumnHierarchyNavigator = function() {
            function TableExColumnHierarchyNavigator() {}
            return TableExColumnHierarchyNavigator.prototype.update = function(columns) {
                this.updateColumns(columns);
            }, TableExColumnHierarchyNavigator.prototype.getColumns = function() {
                return this.columns;
            }, TableExColumnHierarchyNavigator.prototype.getHierarchyDepth = function() {
                return 1;
            }, TableExColumnHierarchyNavigator.prototype.getHierarchyLeafCount = function() {
                return this.columns.length;
            }, TableExColumnHierarchyNavigator.prototype.getHierarchyLeafAt = function(index) {
                return this.columns[index];
            }, TableExColumnHierarchyNavigator.prototype.getFloatingHierarchyLeafCount = function() {
                return 0;
            }, TableExColumnHierarchyNavigator.prototype.getFloatingHierarchyLeafAt = function(index) {
                return null;
            }, TableExColumnHierarchyNavigator.prototype.getHierarchyItems = function() {
                return this.columns;
            }, TableExColumnHierarchyNavigator.prototype.getFloatingHierarchyItems = function() {
                return null;
            }, TableExColumnHierarchyNavigator.prototype.getLeafIndex = function(item) {
                return item.position.column.index;
            }, TableExColumnHierarchyNavigator.prototype.isLeaf = function(item) {
                return !0;
            }, TableExColumnHierarchyNavigator.prototype.isLastItem = function(item, items) {
                return item.position.column.index === items.length - 1;
            }, TableExColumnHierarchyNavigator.prototype.getParent = function(item) {
                return null;
            }, TableExColumnHierarchyNavigator.prototype.getIndex = function(item) {
                return item.position.column.index;
            }, TableExColumnHierarchyNavigator.prototype.getChildren = function(item) {
                return null;
            }, TableExColumnHierarchyNavigator.prototype.getLevel = function(item) {
                return 0;
            }, TableExColumnHierarchyNavigator.prototype.getIntersection = function(rowItem, columnItem) {
                return null;
            }, TableExColumnHierarchyNavigator.prototype.getCorner = function(rowLevel, columnLevel) {
                return null;
            }, TableExColumnHierarchyNavigator.prototype.getRowLevel = function(cornerItem) {
                return 0;
            }, TableExColumnHierarchyNavigator.prototype.getColumnLevel = function(cornerItem) {
                return 0;
            }, TableExColumnHierarchyNavigator.prototype.updateColumns = function(columns) {
                this.columns = [];
                for (var columnCount = columns.length, i = 0; i < columnCount; i++) this.columns.push({
                    metadata: columns[i],
                    position: this.calculateItemPosition(i, columnCount)
                });
            }, TableExColumnHierarchyNavigator.prototype.calculateItemPosition = function(columnIndex, columnCount) {
                var position = new CellPosition();
                return position.row.index = position.row.indexInSiblings = 0, position.row.isFirst = !0, 
                position.row.isLast = !0, position.column.index = position.column.indexInSiblings = columnIndex, 
                position.column.isFirst = 0 === columnIndex, position.column.isLast = columnIndex === columnCount - 1, 
                position;
            }, TableExColumnHierarchyNavigator;
        }();
        visuals.TableExColumnHierarchyNavigator = TableExColumnHierarchyNavigator;
        var TableExRowHierarchyNavigator = function() {
            function TableExRowHierarchyNavigator(formatter) {
                this.formatter = formatter;
            }
            return TableExRowHierarchyNavigator.prototype.update = function(rows, identities, total, isDataComplete, columns) {
                this.isDataComplete = isDataComplete, this.updateRows(rows, identities), this.updateFloatingRow(total, columns);
            }, TableExRowHierarchyNavigator.prototype.getRows = function() {
                return this.rows;
            }, TableExRowHierarchyNavigator.prototype.getHierarchyDepth = function() {
                return 1;
            }, TableExRowHierarchyNavigator.prototype.getHierarchyLeafCount = function() {
                return this.rows.length;
            }, TableExRowHierarchyNavigator.prototype.getHierarchyLeafAt = function(index) {
                return this.rows[index];
            }, TableExRowHierarchyNavigator.prototype.getFloatingHierarchyLeafCount = function() {
                return this.floatingRow ? 1 : 0;
            }, TableExRowHierarchyNavigator.prototype.getFloatingHierarchyLeafAt = function(index) {
                return this.floatingRow;
            }, TableExRowHierarchyNavigator.prototype.getHierarchyItems = function() {
                return this.rows;
            }, TableExRowHierarchyNavigator.prototype.getFloatingHierarchyItems = function() {
                return this.floatingRow ? [ this.floatingRow ] : null;
            }, TableExRowHierarchyNavigator.prototype.getLeafIndex = function(item) {
                return item.index;
            }, TableExRowHierarchyNavigator.prototype.isLeaf = function(item) {
                return !0;
            }, TableExRowHierarchyNavigator.prototype.isLastItem = function(item, items) {
                return this.isDataComplete && item.index === items.length - 1;
            }, TableExRowHierarchyNavigator.prototype.getParent = function(item) {
                return null;
            }, TableExRowHierarchyNavigator.prototype.getIndex = function(item) {
                return item.index;
            }, TableExRowHierarchyNavigator.prototype.getChildren = function(item) {
                return null;
            }, TableExRowHierarchyNavigator.prototype.getLevel = function(item) {
                return 0;
            }, TableExRowHierarchyNavigator.prototype.getIntersection = function(rowItem, columnItem) {
                var columnIndex = columnItem.position.column.index, value = rowItem.values[columnIndex], objects = rowItem.values.objects && rowItem.values.objects[columnIndex], cellItem = new TablixVisualCell(value, objects, (!1), (!1), rowItem === this.floatingRow, (!1), columnItem.metadata, this.formatter, (!1)), cellPosition = cellItem.position, columnPosition = columnItem.position;
                cellPosition.column.index = columnPosition.column.index, cellPosition.column.isFirst = columnPosition.column.isFirst, 
                cellPosition.column.isLast = columnPosition.column.isLast;
                var rowIndex = rowItem.index;
                cellPosition.row.index = rowIndex, cellPosition.row.isFirst = 0 === rowIndex, cellPosition.row.isLast = this.isDataComplete && rowItem === _.last(this.rows);
                var rowObjects = rowItem.values.objects;
                if (rowObjects) {
                    var cellObject = rowObjects[columnIndex];
                    cellObject && (cellItem.backColor = TablixObjects.PropValuesBackColor.getValue(cellObject), 
                    cellItem.fontColor = TablixObjects.PropValuesFontColor.getValue(cellObject));
                }
                return cellItem;
            }, TableExRowHierarchyNavigator.prototype.getCorner = function(rowLevel, columnLevel) {
                return {};
            }, TableExRowHierarchyNavigator.prototype.getRowLevel = function(cornerItem) {
                return 0;
            }, TableExRowHierarchyNavigator.prototype.getColumnLevel = function(cornerItem) {
                return 0;
            }, TableExRowHierarchyNavigator.prototype.updateRows = function(rows, identities) {
                this.rows = [];
                for (var i = 0; i < rows.length; i++) this.rows.push({
                    index: i,
                    values: rows[i],
                    identity: identities ? identities[i] : void 0
                });
            }, TableExRowHierarchyNavigator.prototype.updateFloatingRow = function(total, columns) {
                _.isEmpty(total) ? this.floatingRow = null : this.floatingRow = {
                    index: 0,
                    values: total,
                    identity: void 0
                };
            }, TableExRowHierarchyNavigator;
        }();
        visuals.TableExRowHierarchyNavigator = TableExRowHierarchyNavigator;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var CssConstants = jsCommon.CssConstants, CellStyle = powerbi.visuals.controls.internal.TablixUtils.CellStyle, encodeHtml = jsCommon.StringExtensions.encodeHtml, FontSize = visuals.Units.FontSize, TablixUtils = powerbi.visuals.controls.internal.TablixUtils, UrlScheme = jsCommon.UrlUtils.UrlScheme, TableExBinder = function() {
            function TableExBinder(options, selectionManager, container) {
                this.options = options, this.selectionManager = selectionManager, this.measureElement = visuals.PivotTableBinderUtils.addMeasureElement(container);
            }
            return TableExBinder.prototype.getRowHeaderBinding = function(rowHeader, forMeasurement) {
                return this.options.onBindRowHeader && !forMeasurement && this.options.onBindRowHeader(rowHeader), 
                {
                    content: "",
                    classNames: null,
                    styleProperties: null,
                    attributes: null
                };
            }, TableExBinder.prototype.getColumnHeaderBinding = function(columnHeader, forMeasure) {
                var content, title = content = encodeHtml(this.getColumnHeaderLabel(columnHeader));
                _.isEmpty(content) && (content = TablixUtils.StringNonBreakingSpace), this.formattingProperties.columnHeaders.wordWrap && (content = visuals.PivotTableBinderUtils.replaceEncodedNewLines(content));
                var cellStyle = this.getColumnHeaderStyle(columnHeader, forMeasure), originalBottom = cellStyle.getExtraBottom();
                return cellStyle.paddings.bottom += visuals.PivotTableBinderUtils.getSortIconHeight(this.glyphFontInfo.measuredFontHeight), 
                content += visuals.PivotTableBinderUtils.buildSortIconDiv(visuals.TableExSortingManager.getSortDirection(columnHeader), this.options.sortIconEnabled, this.options.sortingEnabled, originalBottom, this.glyphFontInfo.textProperties.fontSize), 
                {
                    content: content,
                    classNames: this.columnHeaderClasses,
                    styleProperties: cellStyle.getAttributes(),
                    attributes: {
                        title: title
                    }
                };
            }, TableExBinder.prototype.getBodyCellBinding = function(bodyCell, forMeasure) {
                var iconName, content = encodeHtml(this.getBodyCellContent(bodyCell)), title = content, attributes = {
                    title: title
                }, cellStyle = this.getBodyCellStyle(bodyCell, forMeasure), dataBarsSettings = bodyCell.columnMetadata && this.columnsDataBarsSettings[bodyCell.columnMetadata.queryName];
                if (_.isEmpty(content) && (content = TablixUtils.StringNonBreakingSpace), this.formattingProperties.values.wordWrap && (content = visuals.PivotTableBinderUtils.replaceEncodedNewLines(content)), 
                bodyCell.isKpi()) content = this.getKpiContentString(bodyCell), attributes = null; else if (dataBarsSettings && forMeasure && !bodyCell.isTotal && _.isNumber(bodyCell.dataPoint) && dataBarsSettings.hideText) content = TablixUtils.StringNonBreakingSpace; else {
                    var urlType = TablixUtils.getUrlScheme(bodyCell.columnMetadata, content), hyperlink = encodeHtml(bodyCell.textContent);
                    urlType !== UrlScheme.NONE ? (iconName = visuals.PivotTableBinderUtils.getUrlIconName(this.formattingProperties.values.urlIcon, urlType), 
                    content = visuals.PivotTableBinderUtils.buildUrlTag(content, hyperlink, iconName)) : this.isImage(bodyCell) && (content = visuals.PivotTableBinderUtils.buildImageTag(hyperlink, this.formattingProperties.grid.imageHeight));
                }
                var contentElementBinding = {
                    content: content,
                    classNames: this.getBodyCellClasses(bodyCell, !!iconName),
                    styleProperties: this.getBodyCellStyleAttributes(bodyCell, forMeasure),
                    attributes: attributes
                };
                return dataBarsSettings && !forMeasure && !bodyCell.isTotal && _.isNumber(bodyCell.dataPoint) && (contentElementBinding.content = visuals.PivotTableBinderUtils.buildDataBarCell(dataBarsSettings, cellStyle, bodyCell.dataPoint, content)), 
                contentElementBinding;
            }, TableExBinder.prototype.getCornerCellBinding = function(cornerCell) {
                return {
                    content: "",
                    classNames: null,
                    styleProperties: null,
                    attributes: null
                };
            }, TableExBinder.prototype.getApproximateRowHeaderWidth = function(rowHeader) {
                return 0;
            }, TableExBinder.prototype.getApproximateColumnHeaderWidth = function(columnHeader) {
                return visuals.PivotTableBinderUtils.measureText(this.getColumnHeaderLabel(columnHeader), this.getColumnHeaderFontInfo(columnHeader).textProperties);
            }, TableExBinder.prototype.getApproximateBodyCellWidth = function(bodyCell) {
                if (bodyCell.isKpi()) return this.valueFontInfo.fontProperties.size.px;
                var dataBarsSettings = bodyCell.columnMetadata && this.columnsDataBarsSettings[bodyCell.columnMetadata.queryName];
                if (dataBarsSettings && dataBarsSettings.hideText && !bodyCell.isTotal && _.isNumber(bodyCell.dataPoint)) return 0;
                var content = this.getBodyCellContent(bodyCell), urlType = TablixUtils.getUrlScheme(bodyCell.columnMetadata, content);
                return urlType !== UrlScheme.NONE && visuals.PivotTableBinderUtils.getUrlIconName(this.formattingProperties.values.urlIcon, urlType) ? this.valueFontInfo.fontProperties.size.px : this.isImage(bodyCell) ? this.formattingProperties.grid.imageHeight : visuals.PivotTableBinderUtils.measureText(content, this.getBodyCellFontInfo(bodyCell).textProperties);
            }, TableExBinder.prototype.getApproximateCornerCellWidth = function(cornerCell) {
                return 0;
            }, TableExBinder.prototype.getApproximateRowHeaderHeight = function(rowHeader, width) {
                return 0;
            }, TableExBinder.prototype.getApproximateColumnHeaderHeight = function(columnHeader, width) {
                var lineCount, columnHeaderInfo = this.getColumnHeaderFontInfo(columnHeader);
                return lineCount = this.formattingProperties.columnHeaders.wordWrap ? visuals.PivotTableBinderUtils.getWordWrappingLines(this.getColumnHeaderLabel(columnHeader), visuals.PivotTableBinderUtils.getNetWidth(width, this.getColumnHeaderStyle(columnHeader, !0)), columnHeaderInfo.textProperties).length : 1, 
                columnHeaderInfo.measuredFontHeight * lineCount;
            }, TableExBinder.prototype.getApproximateBodyCellHeight = function(bodyCell, width) {
                if (bodyCell.isKpi()) return this.valueFontInfo.fontProperties.size.px;
                var content = this.getBodyCellContent(bodyCell), urlType = TablixUtils.getUrlScheme(bodyCell.columnMetadata, content);
                if (urlType !== UrlScheme.NONE && visuals.PivotTableBinderUtils.getUrlIconName(this.formattingProperties.values.urlIcon, urlType)) return this.valueFontInfo.fontProperties.size.px;
                if (this.isImage(bodyCell)) return this.formattingProperties.grid.imageHeight;
                var lineCount, bodyCellInfo = this.getBodyCellFontInfo(bodyCell);
                return lineCount = this.formattingProperties.values.wordWrap ? visuals.PivotTableBinderUtils.getWordWrappingLines(content, visuals.PivotTableBinderUtils.getNetWidth(width, this.getBodyCellStyle(bodyCell, !0)), bodyCellInfo.textProperties).length : 1, 
                bodyCellInfo.measuredFontHeight * lineCount;
            }, TableExBinder.prototype.getApproximateCornerCellHeight = function(cornerCell, width) {
                return 0;
            }, TableExBinder.prototype.updateFormattingProperties = function(dataView, formattingProperties) {
                this.formattingProperties = formattingProperties;
                var generalFontSize = formattingProperties.general.textSize, measurer = new visuals.PivotTableBinderUtils.FontInfoMeasurer();
                this.columnHeaderContainerFontInfo = visuals.PivotTableBinderUtils.createFontInfo({
                    family: formattingProperties.columnHeaders.fontFamily || TablixUtils.FontFamilyHeader,
                    size: formattingProperties.columnHeaders.fontSize || generalFontSize
                }, measurer), this.columnHeaderFontInfo = visuals.PivotTableBinderUtils.overrideFontInfo(this.columnHeaderContainerFontInfo, {}, measurer), 
                this.valueContainerFontInfo = visuals.PivotTableBinderUtils.createFontInfo({
                    family: formattingProperties.values.fontFamily || TablixUtils.FontFamilyCell,
                    size: formattingProperties.values.fontSize || generalFontSize
                }, measurer), this.valueFontInfo = visuals.PivotTableBinderUtils.overrideFontInfo(this.valueContainerFontInfo, {}, measurer);
                var totalFontWeight, totalFontFamily = formattingProperties.total.fontFamily;
                totalFontFamily || this.valueFontInfo.fontProperties.family !== TablixUtils.FontFamilyCell ? totalFontWeight = CssConstants.boldValue : this.valueFontInfo.fontProperties.family === TablixUtils.FontFamilyCell && (totalFontFamily = TablixUtils.FontFamilyTotal), 
                this.totalFontInfo = visuals.PivotTableBinderUtils.overrideFontInfo(this.valueFontInfo, {
                    family: totalFontFamily,
                    size: formattingProperties.total.fontSize,
                    weight: totalFontWeight
                }, measurer), this.glyphFontInfo = visuals.PivotTableBinderUtils.createFontInfo({
                    family: TablixUtils.FontFamilyGlyphs,
                    size: FontSize.createFromPt((formattingProperties.columnHeaders.fontSize || generalFontSize).pt * TablixUtils.SortIconFontSizeRatio),
                    lineHeight: "100%"
                }, measurer), measurer.measureAll(this.measureElement), this.columnHeaderClasses = [], 
                this.formattingProperties.columnHeaders.wordWrap ? this.columnHeaderClasses.push(visuals.PivotTableBinderUtils.cssPivotTableCellClassWrap) : this.columnHeaderClasses.push(visuals.PivotTableBinderUtils.cssPivotTableCellClassNoWrap), 
                this.options.interactivityIndicatorEnabled && this.options.sortingEnabled && this.columnHeaderClasses.push(visuals.PivotTableBinderUtils.cssClassCellInteractive), 
                this.columnsDataBarsSettings = {};
                var columnFormatting = formattingProperties.columnFormatting;
                if (columnFormatting && dataView && dataView.table && !_.isEmpty(dataView.table.columns)) for (var _i = 0, _a = dataView.table.columns; _i < _a.length; _i++) {
                    var column = _a[_i], queryName = column.queryName;
                    queryName && columnFormatting[queryName] && (this.columnsDataBarsSettings[queryName] = visuals.PivotTableBinderUtils.getColumnDataBarsSettings(column, columnFormatting[queryName].dataBarsSettings));
                }
            }, TableExBinder.prototype.getColumnHeaderContainerFontInfo = function() {
                return this.columnHeaderContainerFontInfo;
            }, TableExBinder.prototype.getValueContainerFontInfo = function() {
                return this.valueContainerFontInfo;
            }, TableExBinder.prototype.getColumnHeaderLabel = function(header) {
                return this.formattingProperties.columnHeaders.wordWrap ? header.metadata.displayName : visuals.TextUtil.replaceSpaceWithNBSP(header.metadata.displayName);
            }, TableExBinder.prototype.getBodyCellContent = function(bodyCell) {
                var content = bodyCell.textContent;
                return _.isEmpty(content) && bodyCell.isRowGrandTotal && 0 === bodyCell.position.column.index && (content = this.options.totalLabel), 
                this.formattingProperties.values.wordWrap ? content : visuals.TextUtil.replaceSpaceWithNBSP(content);
            }, TableExBinder.prototype.getBodyCellStyleAttributes = function(bodyCell, forMeasure) {
                var style = this.getBodyCellStyle(bodyCell, forMeasure).getAttributes();
                return style.position = "relative", this.selectionManager.isBodyCellHighlighted(bodyCell) || visuals.PivotTableBinderUtils.setUnselectedStyle(style), 
                style;
            }, TableExBinder.prototype.getColumnHeaderStyle = function(columnHeader, forMeasure) {
                var cellStyle = new CellStyle(visuals.PivotTableBinderUtils.CellHorizontalPadding, visuals.PivotTableBinderUtils.CellHorizontalPadding);
                return visuals.TableStyler.setColumnHeaderStyle(columnHeader.position, cellStyle, this.formattingProperties, this.getColumnFormatting(columnHeader.metadata)), 
                cellStyle.fontFamily = void 0, visuals.PivotTableBinderUtils.applyFontInfo(this.columnHeaderFontInfo, cellStyle, !forMeasure), 
                cellStyle;
            }, TableExBinder.prototype.getBodyCellStyle = function(bodyCell, forMeasure) {
                var cellStyle = new CellStyle(visuals.PivotTableBinderUtils.CellHorizontalPadding, visuals.PivotTableBinderUtils.CellHorizontalPadding);
                return bodyCell.isRowGrandTotal ? (visuals.TableStyler.setFooterBodyCellStyle(bodyCell.position, cellStyle, this.formattingProperties, this.getColumnFormatting(bodyCell.columnMetadata)), 
                visuals.PivotTableBinderUtils.applyFontInfo(this.totalFontInfo, cellStyle, !forMeasure)) : (visuals.TableStyler.setBodyCellStyle(bodyCell.position, bodyCell, cellStyle, this.formattingProperties, this.getColumnFormatting(bodyCell.columnMetadata)), 
                visuals.PivotTableBinderUtils.applyFontInfo(this.valueFontInfo, cellStyle, !forMeasure)), 
                cellStyle;
            }, TableExBinder.prototype.getBodyCellClasses = function(bodyCell, urlIcon) {
                var classes = [];
                return this.formattingProperties.values.wordWrap ? classes.push(visuals.PivotTableBinderUtils.cssPivotTableCellClassWrap) : classes.push(visuals.PivotTableBinderUtils.cssPivotTableCellClassNoWrap), 
                urlIcon ? classes.push(TablixUtils.CssClassValueURLIconContainer) : bodyCell.isNumeric && classes.push(TablixUtils.CssClassTablixValueNumeric), 
                !this.options.interactivityIndicatorEnabled || !this.options.selectionEnabled || bodyCell.isRowGrandTotal || visuals.PivotTableBinderUtils.isValidUrl(bodyCell.columnMetadata, this.getBodyCellContent(bodyCell)) || this.isImage(bodyCell) || classes.push(visuals.PivotTableBinderUtils.cssClassCellInteractive), 
                classes;
            }, TableExBinder.prototype.getKpiContentString = function(bodyCell) {
                return visuals.PivotTableBinderUtils.createKpiDomString(bodyCell.columnMetadata.kpi, bodyCell.textContent);
            }, TableExBinder.prototype.getColumnHeaderFontInfo = function(header) {
                return this.columnHeaderFontInfo;
            }, TableExBinder.prototype.getBodyCellFontInfo = function(bodyCell) {
                return bodyCell.isRowGrandTotal ? this.totalFontInfo : this.valueFontInfo;
            }, TableExBinder.prototype.getColumnFormatting = function(column) {
                return this.formattingProperties.columnFormatting[column.queryName];
            }, TableExBinder.prototype.isImage = function(bodyCell) {
                return visuals.converterHelper.isImageUrlColumn(bodyCell.columnMetadata) && !bodyCell.isRowGrandTotal;
            }, TableExBinder;
        }();
        visuals.TableExBinder = TableExBinder;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var TableExSelectionManager = function() {
            function TableExSelectionManager(hostServices) {
                this.hostServices = hostServices, this.clearLocal();
            }
            return TableExSelectionManager.prototype.onBodyCellContextMenu = function(bodyCell, mouseEvent) {
                if (!bodyCell.isRowGrandTotal) {
                    var args, contextMenuItems, row = this.getRowFromCell(bodyCell);
                    contextMenuItems = !this.isEmpty() && this.isItemSelected(row) ? this.selectedItems : [ row ], 
                    args = this.createContextMenuArgs(contextMenuItems, mouseEvent), args && this.hostServices.onContextMenu(args);
                }
            }, TableExSelectionManager.prototype.onBodyCellClick = function(bodyCell, multiSelection) {
                bodyCell.isRowGrandTotal ? this.clearHost() : this.select(this.getRowFromCell(bodyCell), multiSelection);
            }, TableExSelectionManager.prototype.onWhitespaceClick = function() {
                this.clearHost();
            }, TableExSelectionManager.prototype.isDrillingEnabled = function(bodyCell, mouseEvent) {
                var args = {
                    visualObjects: this.getVisualObjects([ this.getRowFromCell(bodyCell) ]),
                    position: TableExSelectionManager.getMouseEventPosition(mouseEvent)
                };
                return this.hostServices.onSelecting(args), 1 === args.action;
            }, TableExSelectionManager.prototype.select = function(row, multipleSelection) {
                this.isItemSelected(row) ? 1 === this.selectedItems.length ? this.clearLocal() : multipleSelection ? this.unselectItem(row) : this.selectedItems = [ row ] : (multipleSelection || this.clearLocal(), 
                this.selectedItems.push(row), this.hostServices.canSelect(this.createSelectArgs(this.selectedItems)) || (this.selectedItems = [ row ])), 
                this.hostServices.onSelect(this.createSelectArgs(this.selectedItems));
            }, TableExSelectionManager.prototype.isBodyCellHighlighted = function(bodyCell) {
                return !!this.isEmpty() || this.isItemSelected(this.getRowFromCell(bodyCell));
            }, TableExSelectionManager.prototype.onDataViewChanged = function(rows, columns) {
                if (this.rows = rows, this.columns = columns, !this.isEmpty()) {
                    for (var newSelectedItems = [], _i = 0, _a = this.selectedItems; _i < _a.length; _i++) {
                        var selectedItem = _a[_i], newSelectedItem = TableExSelectionManager.getMatchingRow(selectedItem, this.rows);
                        newSelectedItem && newSelectedItems.push(newSelectedItem);
                    }
                    this.selectedItems = newSelectedItems, this.hostServices.onSelect(this.createSelectArgs(this.selectedItems));
                }
            }, TableExSelectionManager.prototype.clearLocal = function() {
                this.selectedItems = [];
            }, TableExSelectionManager.prototype.isEmpty = function() {
                return _.isEmpty(this.selectedItems);
            }, TableExSelectionManager.prototype.isItemSelected = function(item) {
                return this.selectedItems.indexOf(item) !== -1;
            }, TableExSelectionManager.prototype.unselectItem = function(item) {
                _.pull(this.selectedItems, item);
            }, TableExSelectionManager.prototype.clearHost = function() {
                this.clearLocal(), this.hostServices.onSelect(this.createSelectArgs([]));
            }, TableExSelectionManager.prototype.getRowFromCell = function(bodyCell) {
                return this.rows[bodyCell.position.row.index];
            }, TableExSelectionManager.prototype.createContextMenuArgs = function(items, mouseEvent) {
                for (var data = [], _i = 0, items_9 = items; _i < items_9.length; _i++) {
                    var item = items_9[_i], selector = this.createSelectorsByColumn(item);
                    selector && data.push(selector);
                }
                return _.isEmpty(data) ? null : {
                    data: data,
                    position: TableExSelectionManager.getMouseEventPosition(mouseEvent)
                };
            }, TableExSelectionManager.prototype.createSelectArgs = function(items) {
                return {
                    visualObjects: this.getVisualObjects(items)
                };
            }, TableExSelectionManager.prototype.getVisualObjects = function(items) {
                for (var visualObjects = [], _i = 0, items_10 = items; _i < items_10.length; _i++) {
                    var item = items_10[_i], selector = this.createSelectorsByColumn(item);
                    selector && visualObjects.push({
                        objectName: "",
                        selectorsByColumn: selector
                    });
                }
                return visualObjects;
            }, TableExSelectionManager.prototype.createSelectorsByColumn = function(item) {
                var firstGroup = _.find(this.columns, function(column) {
                    return !column.metadata.isMeasure;
                });
                if (!firstGroup) return null;
                var dataMap = (_a = {}, _a[firstGroup.metadata.queryName] = [ item.identity ], _a), measuresQueryNames = _(this.columns).filter(function(column) {
                    return column.metadata.isMeasure;
                }).map(function(column) {
                    return column.metadata.queryName;
                }).value();
                return {
                    dataMap: dataMap,
                    metadata: measuresQueryNames
                };
                var _a;
            }, TableExSelectionManager.getMouseEventPosition = function(mouseEvent) {
                return {
                    x: mouseEvent.clientX,
                    y: mouseEvent.clientY
                };
            }, TableExSelectionManager.getMatchingRow = function(row, rows) {
                if (_.isEmpty(rows)) return null;
                for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                    var current = rows_1[_i];
                    if (powerbi.DataViewScopeIdentity.equals(current.identity, row.identity)) return current;
                }
                return null;
            }, TableExSelectionManager.getMatchingColumnHeader = function(columnHeader, columnHeaders) {
                for (var _i = 0, columnHeaders_2 = columnHeaders; _i < columnHeaders_2.length; _i++) {
                    var current = columnHeaders_2[_i];
                    if (this.areHeadersEqual(current, columnHeader)) return current;
                }
                return null;
            }, TableExSelectionManager.areHeadersEqual = function(item1, item2) {
                return item1.metadata.queryName === item2.metadata.queryName;
            }, TableExSelectionManager;
        }();
        visuals.TableExSelectionManager = TableExSelectionManager;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var TablixObjects = powerbi.visuals.controls.internal.TablixObjects, TableExSizeManager = function() {
            function TableExSizeManager(hostServices) {
                this.hostServices = hostServices, this.pendingChanges = [];
            }
            return TableExSizeManager.prototype.onDataViewChanged = function() {
                this.pendingChanges = [];
            }, TableExSizeManager.getSelector = function(header) {
                return {
                    metadata: header.metadata.queryName
                };
            }, TableExSizeManager.prototype.getPendingChange = function(header) {
                return _.find(this.pendingChanges, function(change) {
                    return visuals.TableExSelectionManager.areHeadersEqual(change.header, header);
                });
            }, TableExSizeManager.prototype.queuePendingChange = function(header, width) {
                var pendingChange = this.getPendingChange(header);
                pendingChange ? pendingChange.width = width : this.pendingChanges.push({
                    header: header,
                    width: width
                });
            }, TableExSizeManager.prototype.getColumnWidth = function(header) {
                var pendingChange = this.getPendingChange(header);
                if (pendingChange) return pendingChange.width;
                var objects = header.metadata.objects;
                return objects ? TablixObjects.PropColumnWidthValue.getValue(objects) : void 0;
            }, TableExSizeManager.prototype.setColumnWidth = function(header, width) {
                this.queuePendingChange(header, width), visuals.PivotTableSizeManagerUtils.persistWidths([ {
                    selector: TableExSizeManager.getSelector(header),
                    value: width
                } ], this.hostServices, this.onPersisting);
            }, TableExSizeManager.prototype.getRowHeight = function(header) {}, TableExSizeManager.prototype.setRowHeight = function(header, height) {}, 
            TableExSizeManager.prototype.getRowLevelWidth = function(cornerCell) {}, TableExSizeManager.prototype.setRowLevelWidth = function(cornerCell, width) {}, 
            TableExSizeManager.prototype.getColumnLevelHeight = function(cornerCell) {}, TableExSizeManager.prototype.setColumnLevelHeight = function(cornerCell, height) {}, 
            TableExSizeManager.prototype.setMissingWidths = function(headersWidth) {
                for (var widthsToPersist = [], _i = 0, headersWidth_2 = headersWidth; _i < headersWidth_2.length; _i++) {
                    var headerWidth = headersWidth_2[_i], header = headerWidth.header, width = headerWidth.width;
                    null == this.getColumnWidth(header) && (this.queuePendingChange(header, width), 
                    widthsToPersist.push({
                        selector: TableExSizeManager.getSelector(header),
                        value: width
                    }));
                }
                _.isEmpty(widthsToPersist) || visuals.PivotTableSizeManagerUtils.persistWidths(widthsToPersist, this.hostServices, this.onPersisting);
            }, TableExSizeManager.prototype.clearWidths = function(columnHeaders) {
                for (var widthsToPersist = [], _i = 0, columnHeaders_3 = columnHeaders; _i < columnHeaders_3.length; _i++) {
                    var header = columnHeaders_3[_i];
                    null != this.getColumnWidth(header) && widthsToPersist.push({
                        selector: TableExSizeManager.getSelector(header),
                        value: void 0
                    }), this.queuePendingChange(header, void 0);
                }
                _.isEmpty(widthsToPersist) || visuals.PivotTableSizeManagerUtils.persistWidths(widthsToPersist, this.hostServices, this.onPersisting);
            }, TableExSizeManager;
        }();
        visuals.TableExSizeManager = TableExSizeManager;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var TableExSortingManager = function() {
            function TableExSortingManager(hostServices) {
                this.hostServices = hostServices;
            }
            return TableExSortingManager.prototype.sort = function(header) {
                this.hostServices.onCustomSort({
                    sortDescriptors: [ {
                        queryName: header.metadata.queryName,
                        sortDirection: visuals.PivotTableSortingManager.getNextSortDirection(TableExSortingManager.getSortDirection(header))
                    } ]
                });
            }, TableExSortingManager.hasSortingChanged = function(previousDataView, newDataView) {
                if (!previousDataView || !newDataView) return !1;
                var previousColumns = previousDataView.metadata.columns;
                if (_.isEmpty(previousColumns)) return !1;
                var newColumns = newDataView.metadata.columns;
                if (_.isEmpty(newColumns)) return !1;
                for (var _loop_3 = function(newColumn) {
                    var previousColumn = _.find(previousColumns, function(previousColumn) {
                        return newColumn.queryName === previousColumn.queryName;
                    });
                    if (previousColumn && newColumn.sort !== previousColumn.sort) return {
                        value: !0
                    };
                }, _i = 0, newColumns_2 = newColumns; _i < newColumns_2.length; _i++) {
                    var newColumn = newColumns_2[_i], state_2 = _loop_3(newColumn);
                    if ("object" == typeof state_2) return state_2.value;
                }
                return !1;
            }, TableExSortingManager.getSortDirection = function(header) {
                return header.metadata.sort;
            }, TableExSortingManager;
        }();
        visuals.TableExSortingManager = TableExSortingManager;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var visuals;
    !function(visuals) {
        var DomEventUtils = jsCommon.DomEventUtils, PivotTableControl = powerbi.visuals.controls.pivotTable.PivotTableControl, PivotTableRenderingMode = powerbi.visuals.controls.pivotTable.PivotTableRenderingMode, TablixObjects = powerbi.visuals.controls.internal.TablixObjects, TablixType = powerbi.visuals.controls.TablixType, TablixUtils = powerbi.visuals.controls.internal.TablixUtils, TableEx = function() {
            function TableEx(options, enableDataBars) {
                this.options = options || visuals.TableExOptions.createDefaultConstructorOptions(), 
                this.enableDataBars = enableDataBars, this.suppressNextRender = !1;
            }
            return TableEx.prototype.init = function(options) {
                var _this = this;
                this.element = options.element, this.formatter = visuals.valueFormatter.formatVariantMeasureValueWithDataPointObjects, 
                this.hostServices = options.host, this.waitingForData = !1, this.selectionManager = new visuals.TableExSelectionManager(this.hostServices), 
                this.sortingManager = new visuals.TableExSortingManager(this.hostServices), this.sizeManager = new visuals.TableExSizeManager(this.hostServices), 
                this.sizeManager.onPersisting = function() {
                    _this.suppressNextRender = !0;
                };
            }, TableEx.prototype.update = function(options) {
                options.type & powerbi.VisualUpdateType.Data && this.onDataViewChanged(options.dataViews, options.operationKind, options.viewport), 
                this.pivotTableControl && options.type & powerbi.VisualUpdateType.Resize && (this.pivotTableControl.setWidth(options.viewport.width), 
                this.pivotTableControl.setHeight(options.viewport.height), this.renderControl(!1, null, null));
            }, TableEx.prototype.updatePersistedWidths = function(previousDataView) {
                var currentAutoSizeColumns = TablixObjects.PropColumnPivotTableAutoSizeColumns.getValue(this.dataView.metadata.objects);
                if (!currentAutoSizeColumns && this.pivotTableControl) {
                    for (var columnsWidth = [], columnHeaders = this.columnHierarchyNavigator.getColumns(), pages = this.pivotTableControl.getColumnWidthMeasureManager().getPageColumns(), columnIndex = 0, _i = 0, pages_2 = pages; _i < pages_2.length; _i++) for (var page = pages_2[_i], widths = page.getColumnWidths(), _a = 0, widths_2 = widths; _a < widths_2.length; _a++) {
                        var width = widths_2[_a];
                        columnsWidth.push({
                            header: columnHeaders[columnIndex],
                            width: width
                        }), columnIndex++;
                    }
                    this.sizeManager.setMissingWidths(columnsWidth);
                } else currentAutoSizeColumns && previousDataView && previousDataView.metadata && previousDataView.metadata.objects && !TablixObjects.PropColumnPivotTableAutoSizeColumns.getValue(previousDataView.metadata.objects) && (this.sizeManager.clearWidths(this.columnHierarchyNavigator.getColumns()), 
                this.suppressNextRender = !1);
            }, TableEx.prototype.onDataViewChanged = function(dataViews, operationKind, viewport) {
                if (_.isEmpty(dataViews)) this.dataView = void 0, this.selectionManager.onDataViewChanged(void 0, void 0), 
                this.pivotTableControl && this.pivotTableControl.clear(); else {
                    var previousDataView = this.dataView;
                    this.dataView = dataViews[0];
                    var formattingProperties = TablixObjects.getTableExObjects(this.dataView), isDataComplete = !this.dataView.metadata.segment;
                    operationKind === powerbi.VisualDataChangeOperationKind.Append ? this.onAppendDataView(previousDataView, formattingProperties, isDataComplete) : this.onNewDataView(previousDataView, formattingProperties, viewport, isDataComplete);
                }
                this.waitingForData = !1;
            }, TableEx.prototype.onAppendDataView = function(previousDataView, formattingProperties, isDataComplete) {
                this.updateHierarchyNavigators(isDataComplete), this.selectionManager.onDataViewChanged(this.rowHierarchyNavigator.getRows(), this.columnHierarchyNavigator.getColumns()), 
                this.renderControl(!1, null, null);
            }, TableEx.prototype.onNewDataView = function(previousDataView, formattingProperties, viewport, isDataComplete) {
                this.updatePersistedWidths(previousDataView);
                var previousRowLeafCount, visibleRowItemStart = this.getPreviousVisibleRowStart(), visibleColumnItemStart = this.getPreviousVisibleColumnStart();
                previousRowLeafCount = this.rowHierarchyNavigator ? this.rowHierarchyNavigator.getHierarchyLeafCount() : 0;
                var previousColumnLeafCount;
                previousColumnLeafCount = this.columnHierarchyNavigator ? this.columnHierarchyNavigator.getHierarchyLeafCount() : 0, 
                this.createOrUpdateControlAndNavigators(isDataComplete), this.sizeManager.onDataViewChanged(), 
                this.selectionManager.onDataViewChanged(this.rowHierarchyNavigator.getRows(), this.columnHierarchyNavigator.getColumns()), 
                this.suppressNextRender && previousRowLeafCount === this.rowHierarchyNavigator.getHierarchyLeafCount() && previousColumnLeafCount === this.columnHierarchyNavigator.getHierarchyLeafCount() || (this.pivotTableControl.clear(), 
                this.pivotTableControl.setWidth(viewport.width), this.pivotTableControl.setHeight(viewport.height), 
                this.binder.updateFormattingProperties(this.dataView, formattingProperties), this.applyContainerStyle(), 
                this.renderControl(!0, this.getVisibleRowStart(visibleRowItemStart, visuals.TableExSortingManager.hasSortingChanged(previousDataView, this.dataView)), this.getVisibleColumnStart(visibleColumnItemStart))), 
                this.suppressNextRender = !1;
            }, TableEx.prototype.applyContainerStyle = function() {
                var columnHeaderContainerFontProperties = this.binder.getColumnHeaderContainerFontInfo().fontProperties, columnHeaderContainerElement = this.pivotTableControl.getColumnHeaderContainer();
                visuals.FontProperties.applyStyleToElement(columnHeaderContainerFontProperties, columnHeaderContainerElement);
                var floatingRowHeaderContainerElement = this.pivotTableControl.getFloatingRowHeaderContainer();
                visuals.FontProperties.applyStyleToElement(columnHeaderContainerFontProperties, floatingRowHeaderContainerElement);
                var valueContainerFontProperties = this.binder.getValueContainerFontInfo().fontProperties, valueContainerElement = this.pivotTableControl.getBodyCellContainer();
                visuals.FontProperties.applyStyleToElement(valueContainerFontProperties, valueContainerElement);
                var floatingValueContainerElement = this.pivotTableControl.getFloatingBodyCellContainer();
                visuals.FontProperties.applyStyleToElement(valueContainerFontProperties, floatingValueContainerElement);
            }, TableEx.prototype.onClearSelection = function() {
                this.selectionManager.clearLocal();
            }, TableEx.prototype.updateHierarchyNavigators = function(isDataComplete) {
                this.rowHierarchyNavigator.update(this.dataView.table.rows, this.dataView.table.identity, this.dataView.table.totals, isDataComplete, this.dataView.table.columns), 
                this.columnHierarchyNavigator.update(this.dataView.table.columns);
            }, TableEx.prototype.renderControl = function(clear, visibleRowStart, visibleColumnStart) {
                var mode = clear ? PivotTableRenderingMode.ClearMeasurement : PivotTableRenderingMode.Incremental;
                visibleRowStart || visibleColumnStart ? this.pivotTableControl.makeVisible(mode, visibleRowStart, visibleColumnStart) : this.pivotTableControl.render(mode);
            }, TableEx.prototype.getPreviousVisibleRowStart = function() {
                if (this.pivotTableControl) {
                    var visibleRowStart = this.pivotTableControl.getVisibleRowStart();
                    if (!visibleRowStart) return null;
                    var visibleRowStartItem = this.rowHierarchyNavigator.getHierarchyLeafAt(visibleRowStart.rowIndex);
                    return visibleRowStartItem ? {
                        item: visibleRowStartItem,
                        offset: visibleRowStart.rowOffset
                    } : null;
                }
            }, TableEx.prototype.getPreviousVisibleColumnStart = function() {
                if (this.pivotTableControl) {
                    var visibleColumnStart = this.pivotTableControl.getVisibleColumnStart();
                    if (!visibleColumnStart) return null;
                    var visibleColumnStartItem = this.columnHierarchyNavigator.getHierarchyLeafAt(visibleColumnStart.columnIndex);
                    return visibleColumnStartItem ? {
                        item: visibleColumnStartItem,
                        offset: visibleColumnStart.columnOffset
                    } : null;
                }
            }, TableEx.prototype.getVisibleRowStart = function(previousVisibleRowStart, sortingChanged) {
                if (!previousVisibleRowStart) return null;
                if (sortingChanged) return {
                    rowIndex: 0,
                    rowOffset: Number.MAX_VALUE
                };
                var matchingRowStartItem = visuals.TableExSelectionManager.getMatchingRow(previousVisibleRowStart.item, this.rowHierarchyNavigator.getRows());
                return matchingRowStartItem && this.rowHierarchyNavigator.isLeaf(matchingRowStartItem) ? {
                    rowIndex: this.rowHierarchyNavigator.getLeafIndex(matchingRowStartItem),
                    rowOffset: previousVisibleRowStart.offset
                } : null;
            }, TableEx.prototype.getVisibleColumnStart = function(previousVisibleColumnStart) {
                if (!previousVisibleColumnStart) return null;
                var matchingColumnStartItem = visuals.TableExSelectionManager.getMatchingColumnHeader(previousVisibleColumnStart.item, this.columnHierarchyNavigator.getColumns());
                return matchingColumnStartItem && this.columnHierarchyNavigator.isLeaf(matchingColumnStartItem) ? {
                    columnIndex: this.columnHierarchyNavigator.getLeafIndex(matchingColumnStartItem),
                    columnOffset: previousVisibleColumnStart.offset
                } : null;
            }, TableEx.prototype.renderSelection = function() {
                this.pivotTableControl.render(PivotTableRenderingMode.ClearRendering);
            }, TableEx.prototype.createOrUpdateControlAndNavigators = function(isDataComplete) {
                var _this = this;
                if (this.rowHierarchyNavigator || (this.rowHierarchyNavigator = new visuals.TableExRowHierarchyNavigator(this.formatter), 
                this.columnHierarchyNavigator = new visuals.TableExColumnHierarchyNavigator()), 
                this.updateHierarchyNavigators(isDataComplete), !this.pivotTableControl) {
                    var binderOptions = {
                        onBindRowHeader: function(item) {
                            return _this.onBindRowHeader(item);
                        },
                        totalLabel: this.hostServices.getLocalizedString(TablixUtils.TotalLabel),
                        selectionEnabled: this.options.selection && this.options.selection.enabled,
                        sortingEnabled: this.options.sorting && this.options.sorting.enabled,
                        sortIconEnabled: this.options.sorting && this.options.sorting.showActiveSortIcon,
                        interactivityIndicatorEnabled: this.options.interactivityIndicatorEnabled
                    }, tableExContainer = document.createElement("div");
                    tableExContainer.className = "tableExContainer", this.element.append(tableExContainer), 
                    this.binder = new visuals.TableExBinder(binderOptions, this.selectionManager, tableExContainer), 
                    this.pivotTableControl = new PivotTableControl(tableExContainer, this.sizeManager, this.createControlOptions()), 
                    this.pivotTableControl.setClassName("tableEx"), this.pivotTableControl.setRowNavigator(this.rowHierarchyNavigator), 
                    this.pivotTableControl.setColumnNavigator(this.columnHierarchyNavigator), this.pivotTableControl.setBinder(this.binder);
                }
            }, TableEx.prototype.createControlOptions = function() {
                var _this = this, scrollingEnabled = this.options.scrolling.enabled, columnResizingEnabled = this.options.columnResizing.enabled;
                return this.options.selection.enabled ? {
                    rowHeaderClickHandler: null,
                    rowHeaderContextMenuHandler: null,
                    columnHeaderClickHandler: function(columnHeader, mouseEvent) {
                        return _this.onColumnHeaderClick(columnHeader);
                    },
                    columnHeaderContextMenuHandler: null,
                    bodyCellClickHandler: function(bodyCell, mouseEvent) {
                        return _this.onBodyCellClick(bodyCell, mouseEvent);
                    },
                    bodyCellContextMenuHandler: function(bodyCell, mouseEvent) {
                        return _this.onBodyCellContextMenu(bodyCell, mouseEvent);
                    },
                    cornerCellClickHandler: null,
                    cornerCellContextMenuHandler: null,
                    whitespaceClickHandler: function(mouseEvent) {
                        return _this.onWhitespaceClick();
                    },
                    scrollingEnabled: scrollingEnabled,
                    columnResizingEnabled: columnResizingEnabled,
                    rowLevelResizingEnabled: !1
                } : {
                    rowHeaderClickHandler: null,
                    rowHeaderContextMenuHandler: null,
                    columnHeaderClickHandler: null,
                    columnHeaderContextMenuHandler: null,
                    bodyCellClickHandler: null,
                    bodyCellContextMenuHandler: null,
                    whitespaceClickHandler: null,
                    cornerCellClickHandler: null,
                    cornerCellContextMenuHandler: null,
                    scrollingEnabled: scrollingEnabled,
                    columnResizingEnabled: columnResizingEnabled,
                    rowLevelResizingEnabled: !1
                };
            }, TableEx.prototype.onBodyCellClick = function(bodyCell, mouseEvent) {
                visuals.PivotTableBinderUtils.isElementClickable(DomEventUtils.getEventTarget(mouseEvent)) || (mouseEvent.preventDefault(), 
                this.selectionManager.isDrillingEnabled(bodyCell, mouseEvent) || (this.selectionManager.onBodyCellClick(bodyCell, mouseEvent.ctrlKey), 
                this.renderSelection()));
            }, TableEx.prototype.onBodyCellContextMenu = function(bodyCell, mouseEvent) {
                visuals.PivotTableBinderUtils.elementSupportsContextMenu(DomEventUtils.getEventTarget(mouseEvent)) || (mouseEvent.preventDefault(), 
                this.selectionManager.onBodyCellContextMenu(bodyCell, mouseEvent));
            }, TableEx.prototype.onColumnHeaderClick = function(columnHeader) {
                this.options.sorting.enabled && this.sortingManager.sort(columnHeader);
            }, TableEx.prototype.onWhitespaceClick = function() {
                this.selectionManager.onWhitespaceClick(), this.renderSelection();
            }, TableEx.prototype.onBindRowHeader = function(item) {
                this.needsMoreData(item) && (this.hostServices.loadMoreData(), this.waitingForData = !0);
            }, TableEx.prototype.needsMoreData = function(item) {
                if (this.waitingForData || !this.dataView || !this.dataView.metadata || !this.dataView.metadata.segment) return !1;
                var leafCount = this.rowHierarchyNavigator.getHierarchyLeafCount(), loadMoreThreshold = leafCount * TablixUtils.PreferredLoadMoreThreshold;
                return this.rowHierarchyNavigator.getLeafIndex(item) >= loadMoreThreshold;
            }, TableEx.prototype.enumerateObjectInstances = function(options) {
                var enumeration = new visuals.ObjectEnumerationBuilder();
                return this.dataView && TablixObjects.enumerateObjectInstances(options, enumeration, this.dataView, TablixType.TableEx), 
                enumeration.complete();
            }, TableEx.prototype.enumerateObjectRepetition = function() {
                var enumeration = [];
                return this.dataView && TablixObjects.enumerateObjectRepetition(enumeration, this.dataView, TablixType.TableEx, this.enableDataBars), 
                enumeration;
            }, TableEx;
        }();
        visuals.TableEx = TableEx;
    }(visuals = powerbi.visuals || (powerbi.visuals = {}));
}(powerbi || (powerbi = {}));