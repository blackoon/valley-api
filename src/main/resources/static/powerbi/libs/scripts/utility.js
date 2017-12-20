window.DEBUG = !1;

var jsCommon;

!function(jsCommon) {
    var Base64Utils;
    !function(Base64Utils) {
        function isBase64(text) {
            try {
                return btoa(atob(text)) === text;
            } catch (err) {
                return !1;
            }
        }
        Base64Utils.isBase64 = isBase64;
    }(Base64Utils = jsCommon.Base64Utils || (jsCommon.Base64Utils = {}));
}(jsCommon || (jsCommon = {}));

var jsCommon;

!function(jsCommon) {
    var UnionExtensions;
    !function(UnionExtensions) {
        function mergeUnionType(arg1, arg2, arg3) {
            if (arg1 || arg2 || arg3) return !arg1 || arg2 || arg3 ? arg1 || !arg2 || arg3 ? arg1 || arg2 || !arg3 ? $.extend(arg1, arg2, arg3) : arg3 : arg2 : arg1;
        }
        UnionExtensions.mergeUnionType = mergeUnionType;
    }(UnionExtensions = jsCommon.UnionExtensions || (jsCommon.UnionExtensions = {}));
}(jsCommon || (jsCommon = {}));

var powerbi;

!function(powerbi) {
    var LocalyticsService = function() {
        function LocalyticsService(localyticsAppKey, localyticsSdk, localyticsServiceSettings) {
            var self = this;
            if (self.localyticsAppKey = localyticsAppKey, localyticsServiceSettings ? (self.batchSize = localyticsServiceSettings.batchSize, 
            self.batchTimer = localyticsServiceSettings.batchTimer) : (self.batchSize = LocalyticsService.defaultBatchSize, 
            self.batchTimer = window), self.currentBatchCount = self.batchSize, localyticsSdk) self.localyticSDKinstance = localyticsSdk; else try {
                var name_1 = window.LocalyticsGlobal;
                null == name_1 && (name_1 = "localytics"), self.localyticSDKinstance = window[name_1];
            } catch (e) {}
        }
        return LocalyticsService.prototype.initialize = function(hostData) {
            var _this = this;
            this.hostData = hostData;
            var localyticsUserGuid;
            localyticsUserGuid = "Embed" == hostData.sessionSource ? hostData.embedUserId : "11111111-1111-1111-1111-11" + powerbi.getHashCode(hostData.userId);
            var customDimensions = [];
            hostData.isInternalUser ? customDimensions.push("MSFT") : customDimensions.push("External"), 
            customDimensions.push(hostData.sessionSource);
            var options = {
                sessionTimeout: 1800,
                trackPageView: !1,
                customDimensions: customDimensions,
                installId: localyticsUserGuid,
                customerId: localyticsUserGuid,
                cacheOffline: !0,
                autoUpload: !1
            };
            this.localyticSDKinstance.enqueueCommand(LocalyticsService.initName, this.localyticsAppKey, options), 
            this.batchTimeoutId = this.batchTimer.setTimeout(function() {
                _this.uploadBatch();
            }, LocalyticsService.batchTimeoutMS, null);
        }, LocalyticsService.prototype.getType = function() {
            return powerbi.LoggerServiceType.Localytics;
        }, LocalyticsService.prototype.logEvent = function(eventData) {
            var self = this, hostData = this.hostData, properties = $.extend({}, eventData.formatted(), {
                client: hostData.client,
                version: hostData.build,
                cluster: hostData.cluster,
                activityId: eventData.id,
                hashedUuid: "Embed" == hostData.sessionSource ? hostData.embedUserId : powerbi.getHashCode(hostData.userId),
                isInternal: hostData.isInternalUser
            });
            properties.duration && "number" == typeof properties.duration && (properties.duration = self.bucketTime(properties.duration)), 
            self.execute(self, function() {
                self.localyticSDKinstance.enqueueCommand(LocalyticsService.tagEventName, eventData.name, properties);
            }), this.uploadBatchIfAtSizeLimit();
        }, LocalyticsService.prototype.startTimedEvent = function(eventData) {}, LocalyticsService.prototype.endTimedEvent = function(eventData) {
            var self = this, hostData = this.hostData, properties = $.extend({}, eventData.formatted(), {
                duration: self.bucketTime(Date.now() - eventData.time),
                client: hostData.client,
                version: hostData.build,
                cluster: hostData.cluster,
                activityId: eventData.id,
                hashedUuid: "Embed" == hostData.sessionSource ? hostData.embedUserId : powerbi.getHashCode(hostData.userId),
                isInternal: hostData.isInternalUser
            });
            self.execute(self, function() {
                self.localyticSDKinstance.enqueueCommand(LocalyticsService.tagEventName, eventData.name, properties);
            }), this.uploadBatchIfAtSizeLimit();
        }, LocalyticsService.prototype.flush = function() {
            this.uploadBatch();
        }, LocalyticsService.prototype.bucketTime = function(duration) {
            var bucketedDuration = "1min+";
            return duration < 10 ? bucketedDuration = "< 10ms" : duration < 100 ? bucketedDuration = 10 * Math.floor(duration / 10) + "ms" : duration < 1e3 ? bucketedDuration = 100 * Math.floor(duration / 100) + "ms" : duration < 5e3 ? bucketedDuration = Math.floor(duration / 1e3) + "s" : duration <= 1e4 ? bucketedDuration = "5 - 10s" : duration <= 6e4 && (bucketedDuration = "10 - 60s"), 
            bucketedDuration;
        }, LocalyticsService.prototype.execute = function(self, fn) {
            try {
                fn();
            } catch (e) {}
        }, LocalyticsService.afterDequeue = function(callback) {
            setTimeout(callback, LocalyticsService.afterDequeueTimeout);
        }, LocalyticsService.prototype.uploadBatchIfAtSizeLimit = function() {
            this.currentBatchCount--, 0 >= this.currentBatchCount && this.uploadBatch();
        }, LocalyticsService.prototype.uploadBatch = function() {
            var _this = this;
            this.batchTimer.clearTimeout(this.batchTimeoutId), this.batchTimeoutId = this.batchTimer.setTimeout(function() {
                _this.uploadBatch();
            }, LocalyticsService.batchTimeoutMS, null), this.currentBatchCount = this.batchSize, 
            this.execute(this, function() {
                _this.localyticSDKinstance.enqueueCommand(LocalyticsService.uploadName);
            });
        }, LocalyticsService.defaultBatchSize = 10, LocalyticsService.batchTimeoutMS = 2e3, 
        LocalyticsService.afterDequeueTimeout = 200, LocalyticsService.namespace = "PowerBI", 
        LocalyticsService.initName = "init." + LocalyticsService.namespace, LocalyticsService.tagEventName = "tagEvent." + LocalyticsService.namespace, 
        LocalyticsService.uploadName = "upload." + LocalyticsService.namespace, LocalyticsService;
    }();
    powerbi.LocalyticsService = LocalyticsService;
}(powerbi || (powerbi = {}));

var jsCommon;

!function(jsCommon) {
    var ModalDialogNotificationType;
    !function(ModalDialogNotificationType) {
        ModalDialogNotificationType[ModalDialogNotificationType.Info = 0] = "Info", ModalDialogNotificationType[ModalDialogNotificationType.Warning = 1] = "Warning", 
        ModalDialogNotificationType[ModalDialogNotificationType.SecurityWarning = 2] = "SecurityWarning";
    }(ModalDialogNotificationType = jsCommon.ModalDialogNotificationType || (jsCommon.ModalDialogNotificationType = {})), 
    jsCommon.PowerBIDefaultHelpPage = "https://support.powerbi.com";
    var AnimationSpeedMs = 250, modalDialogClassSelector = ".infonav-modalDialog", dialogTitleClassSelector = ".infonav-dialogTitle", dialogCloseIconClassSelector = ".infonav-dialogCloseIcon", dialogContentClassSelector = ".infonav-dialogContent", dialogActionsClassSelector = ".infonav-dialogActions", dialogNotificationIconClassSelector = ".glyphicon", dialogContentNotificationTextClassSelector = ".infonav-dialogContentNotificationText", modalDialogContainerHostClassName = "infonav-modalContainerHost", modalDialogContainerHostClassSelector = "." + modalDialogContainerHostClassName, modalDialogHtmlMessageClassSelector = ".dialogMessage", ModalDialogHtml = '<div class="infonav-modalContainer' + (location.search.indexOf("renderAsModalDialog") !== -1 ? " small" : "") + '"><div class="infonav-modalDialog" tabindex="-1"><div class="infonav-dialogLayout"><div class="infonav-dialogTitle"></div><div class="infonav-dialogCloseIcon"></div><div class="infonav-dialogContent"></div><div class="infonav-dialogActions"></div></div></div></div>', notificationForModalDialogHtml = '<div class="infonav-dialogContentNotification"><span class="glyphicon"></span><span class= "infonav-dialogContentNotificationText" > </span></div>', NewButtonSelector = '<input type="button"></input>', checkboxSelector = '<input type="checkbox"></input>', checkboxLabelSelectorOpen = '<label class="form-label">', checkboxLabelSelectorClose = "</label>", ModalDialog = function() {
        function ModalDialog(dialogHost, localizationMap) {
            this.dialogHost = dialogHost, this.localizationMap = localizationMap, this.messageQueue = [], 
            this.isReady = !1, this.messageCurrentlyShown = !1, this.initialized = !1;
        }
        return ModalDialog.prototype.showMessage = function(messageTitle, messageText, buttonText, learnMoreLink) {
            var _this = this;
            this.ensureInitialized();
            var actions = [], cssClass = "primary", dialogContent = null;
            if (buttonText || (buttonText = this.localizationMap ? this.localizationMap.closePromptText : InJs.UnlocalizedStrings.dialogCloseActionLabel), 
            learnMoreLink) {
                var link = $('<a target="_blank"/>').text(learnMoreLink.label).attr("href", learnMoreLink.url);
                dialogContent = $("<div/>").text(messageText + " ").append(link), messageText = null;
            }
            actions[0] = this.createButton(buttonText, function(sender, dialogHost) {
                _this.hideDialog();
            }, null, cssClass), this.pushMessage(messageTitle, messageText, dialogContent, actions, !0);
        }, ModalDialog.prototype.showPrompt = function(promptTitle, promptText, promptActions, isDismissable) {
            this.ensureInitialized();
            for (var actionButtons = new Array(), i = 0; i < promptActions.length; i++) {
                var thisAction = promptActions[i], cssClass = thisAction.cssClass;
                0 === i && (cssClass += " primary"), actionButtons[i] = this.createButton(thisAction.labelText, thisAction.actionCallback, thisAction.data, cssClass, thisAction.disabled);
            }
            this.pushMessage(promptTitle, promptText, null, actionButtons, isDismissable);
        }, ModalDialog.prototype.showError = function(errorText, errorType, additionalErrorInfo, afterDismissCallback, dialogOptions) {
            this.showCustomError(InJs.UnlocalizedStrings.errorDialogTitle, errorText, errorType, errorType !== jsCommon.TraceType.Fatal, additionalErrorInfo, afterDismissCallback, dialogOptions);
        }, ModalDialog.prototype.showCustomError = function(errorTitle, errorText, errorType, isDismissable, additionalErrorInfo, afterDismissCallback, dialogOptions, helpLink, onDialogClosed, useHtmlErrorText, customErrorDialogHelperText, dialogCssClass, containerCssClass) {
            var _this = this;
            this.ensureInitialized();
            var actions = new Array();
            dialogOptions ? dialogOptions.forEach(function(element, index, array) {
                actions.push(_this.createButton(element.label, function(sender, dialogHost) {
                    _this.hideDialog(), $.isFunction(afterDismissCallback) && afterDismissCallback(element.resultValue);
                }, null, element.cssClass, element.disabled));
            }) : errorType !== jsCommon.TraceType.Fatal ? actions[0] = this.createButton(this.localizationMap ? this.localizationMap.closePromptText : InJs.UnlocalizedStrings.dialogCloseActionLabel, function(sender, dialogHost) {
                _this.hideDialog(), $.isFunction(afterDismissCallback) && afterDismissCallback(0);
            }) : actions[0] = this.createButton(this.localizationMap ? this.localizationMap.refreshPagePromptText : InJs.UnlocalizedStrings.dialogRefreshPageActionLabel, function(sender, dialogHost) {
                window.location.reload();
            }, null, "primary");
            var dialogContent;
            if (dialogContent = useHtmlErrorText ? $("<div/>").html(errorText) : $("<div/>").text(errorText), 
            additionalErrorInfo) {
                var errorHelperText = this.localizationMap && this.localizationMap.errorDialogHelperText ? this.localizationMap.errorDialogHelperText : InJs.UnlocalizedStrings.errorDialogHelperText;
                customErrorDialogHelperText && (errorHelperText = customErrorDialogHelperText), 
                dialogContent.append($("<br/>")).append(errorHelperText);
            }
            if (this.addAdditionalErrorInfo(dialogContent, additionalErrorInfo, this.localizationMap ? this.localizationMap.showTechnicalDetailsText : InJs.UnlocalizedStrings.showDetailsText), 
            helpLink) if (helpLink.url === jsCommon.PowerBIDefaultHelpPage || helpLink.isGetHelpTextReplaced) {
                var helpHref = $('<a class="modalErrorHelpLink" target="_blank"/>').text(helpLink.label).attr("href", helpLink.url);
                dialogContent.append(helpHref);
            } else actions.unshift(this.createButton(helpLink.label, function(sender, dialogHost) {
                window.open(helpLink.url);
            }, null, "primary"));
            this.pushMessage(errorTitle || InJs.UnlocalizedStrings.errorDialogTitle, null, dialogContent, actions, isDismissable, onDialogClosed, null, null, dialogCssClass, containerCssClass);
        }, ModalDialog.prototype.showCustomDialog = function(titleText, dialogContent, dialogActions, onDialogDisplayed, isDismissable, focusOnFirstButton, dialogCssClass, containerCssClass, onDialogClosed, notificationType, notificationText, noActiveButtons, htmlMessageText, flipContentAndNotificationOrder, checkboxAction, closeOnEsc) {
            this.ensureInitialized();
            var actionsButtons = [];
            checkboxAction && (actionsButtons[0] = this.createCheckbox(checkboxAction.labelText, checkboxAction.actionCallback, checkboxAction.data));
            for (var i = 0; i < dialogActions.length; i++) {
                var thisAction = dialogActions[i], cssClass = thisAction.cssClass;
                noActiveButtons || 0 !== i || (cssClass += " primary");
                var index = checkboxAction ? i + 1 : i;
                actionsButtons[index] = this.createButton(thisAction.labelText, thisAction.actionCallback, thisAction.data, cssClass, thisAction.disabled);
            }
            return this.pushMessage(titleText, null, dialogContent, actionsButtons, isDismissable, onDialogClosed, onDialogDisplayed, focusOnFirstButton, dialogCssClass, containerCssClass, notificationType, notificationText, noActiveButtons, htmlMessageText, flipContentAndNotificationOrder, closeOnEsc), 
            this.dialogContent;
        }, ModalDialog.prototype.hideDialog = function() {
            var _this = this;
            this.ensureInitialized(), this.modalContainer.fadeTo(AnimationSpeedMs, 0, function() {
                if (_this.modalContainer.css(jsCommon.CssConstants.displayProperty, jsCommon.CssConstants.noneValue), 
                _this.modalDialogElement.removeClass(_this.modalDialogCustomClass), _this.modalContainer.removeClass(_this.modalContainerCustomClass), 
                _this.currentModalDialogMessage && _this.currentModalDialogMessage.onDialogClosed && _this.currentModalDialogMessage.onDialogClosed(), 
                _this.messageCurrentlyShown = !1, _this.messageQueue.length) {
                    var nextMessage = _this.messageQueue.shift();
                    _this.showDialogInternal(nextMessage);
                }
            });
        }, ModalDialog.prototype.ensureInitialized = function() {
            if (!this.initialized) {
                this.modalContainer = $(ModalDialogHtml), this.modalDialogElement = this.modalContainer.find(modalDialogClassSelector), 
                this.dialogTitle = this.modalContainer.find(dialogTitleClassSelector), this.dialogCloseButton = this.modalContainer.find(dialogCloseIconClassSelector), 
                this.dialogContent = this.modalContainer.find(dialogContentClassSelector), this.dialogActions = this.modalContainer.find(dialogActionsClassSelector);
                var that = this;
                if (this.dialogCloseButton.on(jsCommon.DOMConstants.mouseClickEventName, function() {
                    return that.hideDialog();
                }), !this.dialogHost) {
                    var containerHost = $(modalDialogContainerHostClassSelector);
                    _.isEmpty(containerHost) || containerHost.remove(), containerHost = InJs.DomFactory.div().addClass(modalDialogContainerHostClassName), 
                    this.dialogHost = $(jsCommon.DOMConstants.DocumentBody).append(containerHost), this.dialogHost = containerHost;
                }
                this.dialogHost.append(this.modalContainer), this.isReady = !0, this.messageQueue.length > 0 && this.showDialogInternal(this.messageQueue.shift()), 
                this.initialized = !0, this.dialogHost = void 0;
            }
        }, ModalDialog.prototype.updatePosition = function(animate) {
            var offsetTop = (this.modalContainer.height() - this.modalDialogElement.height()) / 2, offsetLeft = (this.modalContainer.width() - this.modalDialogElement.width()) / 2, newPosition = {
                top: offsetTop + jsCommon.CssConstants.pixelUnits,
                left: offsetLeft + jsCommon.CssConstants.pixelUnits
            };
            animate ? this.modalDialogElement.animate(newPosition, AnimationSpeedMs) : this.modalDialogElement.css(newPosition);
        }, ModalDialog.prototype.addAdditionalErrorInfo = function(dialogContent, additionalErrorInfoKeyValuePairs, localizedString) {
            var _this = this;
            if (additionalErrorInfoKeyValuePairs) {
                for (var additionalErrorInfo = $("<p />"), _i = 0, additionalErrorInfoKeyValuePairs_1 = additionalErrorInfoKeyValuePairs; _i < additionalErrorInfoKeyValuePairs_1.length; _i++) {
                    var pair = additionalErrorInfoKeyValuePairs_1[_i];
                    additionalErrorInfo.append(InJs.InfoNavUtility.constructErrorField(pair.errorInfoKey, pair.errorInfoValue));
                }
                var additionalErrorInfoContainer = InJs.InfoNavUtility.constructShowDetailsContainer(additionalErrorInfo, localizedString);
                dialogContent.append($("<br />")), dialogContent.append(additionalErrorInfoContainer), 
                dialogContent.find(".showAdditionalDetailsLink").on(jsCommon.DOMConstants.mouseClickEventName, function(e) {
                    _this.updatePosition(!0);
                });
            }
        }, ModalDialog.prototype.pushMessage = function(titleText, messageText, dialogContent, dialogButtons, isDismissable, onDialogClosed, onDialogDisplayed, focusOnFirstButton, dialogCssClass, containerCssClass, notificationType, notificationText, noActiveButtons, htmlMessageText, flipContentAndNotificationOrder, closeOnEsc) {
            "undefined" == typeof isDismissable && (isDismissable = !0), "undefined" == typeof dialogCssClass && (dialogCssClass = ""), 
            "undefined" == typeof containerCssClass && (containerCssClass = "");
            var nextMessage = {
                titleText: titleText,
                messageText: messageText,
                dialogContent: dialogContent,
                dialogButtons: dialogButtons,
                onDialogDisplayed: onDialogDisplayed,
                isDismissable: isDismissable,
                dialogCssClass: dialogCssClass,
                containerCssClass: containerCssClass,
                onDialogClosed: onDialogClosed,
                notificationType: notificationType,
                notificationText: notificationText,
                htmlMessageText: htmlMessageText
            };
            this.messageQueue.push(nextMessage), !this.messageCurrentlyShown && this.isReady && this.showDialogInternal(this.messageQueue.shift(), focusOnFirstButton, noActiveButtons, flipContentAndNotificationOrder, closeOnEsc);
        }, ModalDialog.prototype.showDialogInternal = function(message, focusOnFirstButton, noActiveButtons, flipContentAndNotificationOrder, closeOnEsc) {
            var _this = this;
            if (this.currentModalDialogMessage = message, this.messageCurrentlyShown = !0, this.dialogContentNotification = $(notificationForModalDialogHtml), 
            this.dialogContentNotificationIcon = this.dialogContentNotification.find(dialogNotificationIconClassSelector), 
            this.dialogContentNotificationText = this.dialogContentNotification.find(dialogContentNotificationTextClassSelector), 
            this.dialogTitle.empty(), this.dialogContent.empty(), this.dialogActions.empty(), 
            this.dialogTitle.text(message.titleText).attr("title", message.titleText), flipContentAndNotificationOrder ? (this.appendNotification(message.notificationType, message.notificationText), 
            this.appendMessageText(message.dialogContent, message.messageText, message.htmlMessageText)) : (this.appendMessageText(message.dialogContent, message.messageText, message.htmlMessageText), 
            this.appendNotification(message.notificationType, message.notificationText)), message.isDismissable ? this.dialogCloseButton.css(jsCommon.CssConstants.displayProperty, jsCommon.CssConstants.blockValue) : this.dialogCloseButton.css(jsCommon.CssConstants.displayProperty, jsCommon.CssConstants.noneValue), 
            message.dialogButtons.length > 0) {
                this.dialogActions.show();
                for (var _i = 0, _a = message.dialogButtons; _i < _a.length; _i++) {
                    var button = _a[_i];
                    this.dialogActions.append(button);
                }
            } else this.dialogActions.hide();
            message.dialogCssClass && (this.modalDialogElement.addClass(message.dialogCssClass), 
            this.modalDialogCustomClass = message.dialogCssClass), message.containerCssClass && (this.modalContainer.addClass(message.containerCssClass), 
            this.modalContainerCustomClass = message.containerCssClass);
            var fadingElem = this.modalContainer.css(jsCommon.CssConstants.displayProperty) === jsCommon.CssConstants.noneValue ? this.modalContainer : this.modalDialogElement;
            fadingElem.fadeTo(0, 0), this.updatePosition(!1), fadingElem.fadeTo(AnimationSpeedMs, 1, function() {
                if (message.onDialogDisplayed && message.onDialogDisplayed(_this.dialogContent), 
                !(_this.modalDialogElement.find("dialog-frame").length > 0)) {
                    0 === _this.modalDialogElement.find(":focus").length && _this.modalDialogElement.focus(), 
                    closeOnEsc && _this.modalDialogElement.keyup(function(e) {
                        e.keyCode === $.ui.keyCode.ESCAPE && _this.hideDialog();
                    });
                    var buttons = _this.dialogActions.find("input");
                    !noActiveButtons && buttons.length > 0 && buttons[0].focus(), focusOnFirstButton && _this.dialogContent.parent().find(".infonav-dialogActions input[type=button]:first").focus();
                }
            });
        }, ModalDialog.prototype.appendMessageText = function(dialogContent, messageText, htmlMessageText) {
            _.isEmpty(messageText) ? this.dialogContent.append(dialogContent) : this.dialogContent.text(messageText), 
            _.isEmpty(htmlMessageText) || (this.dialogContentMessage = this.dialogContent.find(modalDialogHtmlMessageClassSelector), 
            this.dialogContentMessage.html(htmlMessageText));
        }, ModalDialog.prototype.appendNotification = function(notificationType, notificationText) {
            if (null !== notificationType && !_.isEmpty(notificationText)) {
                switch (notificationType) {
                  case ModalDialogNotificationType.Info:
                    this.dialogContentNotificationIcon.addClass("pbi-glyph-info glyph-mini"), this.dialogContentNotification.addClass("typeInfo");
                    break;

                  case ModalDialogNotificationType.Warning:
                    this.dialogContentNotificationIcon.addClass("pbi-glyph-warning glyph-mini"), this.dialogContentNotification.addClass("typeWarning");
                    break;

                  case ModalDialogNotificationType.SecurityWarning:
                    this.dialogContentNotificationIcon.addClass("pbi-glyph-securityalert glyph-mini"), 
                    this.dialogContentNotification.addClass("typeSecurityWarning");
                }
                this.dialogContentNotificationText.html(notificationText), this.dialogContent.append(this.dialogContentNotification);
            }
        }, ModalDialog.prototype.createButton = function(labelText, action, data, cssClass, disabled) {
            var _this = this, button = $(NewButtonSelector);
            return button.attr("value", labelText), button.on(jsCommon.DOMConstants.mouseClickEventName, function(e) {
                action(button, _this.dialogContent, data);
            }), cssClass && button.addClass(cssClass), disabled && button.prop("disabled", !0), 
            button;
        }, ModalDialog.prototype.createCheckbox = function(labelText, action, data) {
            var _this = this, checkboxDivHtml = '<div class="pbi-input checkbox">' + checkboxSelector + checkboxLabelSelectorOpen + labelText + checkboxLabelSelectorClose + "</div>", checkboxDivElement = $(checkboxDivHtml), checkbox = checkboxDivElement.find("input");
            return checkbox.on(jsCommon.DOMConstants.changeEventName, function(e) {
                action(checkbox, _this.dialogContent, data);
            }), checkboxDivElement;
        }, ModalDialog;
    }();
    jsCommon.ModalDialog = ModalDialog;
}(jsCommon || (jsCommon = {}));

var InJs;

!function(InJs) {
    var ModalDialogAction = function() {
        function ModalDialogAction(labelText, actionCallback, data, cssClass, disabled) {
            this.labelText = labelText, this.actionCallback = actionCallback, this.data = data, 
            this.cssClass = cssClass, this.disabled = !!disabled;
        }
        return ModalDialogAction;
    }();
    InJs.ModalDialogAction = ModalDialogAction;
}(InJs || (InJs = {}));

var jsCommon;

!function(jsCommon) {
    var CircularStack = function() {
        function CircularStack(size) {
            this.count = 0, this.top = -1, this.size = size, this.data = new Array(size);
        }
        return CircularStack.prototype.item = function(index) {
            var bottom = this.top - (this.count - 1);
            return bottom < 0 && (bottom += this.size), this.data[(index + bottom) % this.size];
        }, CircularStack.prototype.push = function(item) {
            this.count < this.size && this.count++, this.top = ++this.top % this.size, this.data[this.top] = item;
        }, CircularStack.prototype.pop = function() {
            if (0 !== this.count) {
                this.count--;
                var item = this.data[this.top];
                return delete this.data[this.top], --this.top === -1 && this.count > 0 && (this.top = this.size - 1), 
                item;
            }
        }, CircularStack.prototype.peek = function() {
            return this.data[this.top];
        }, CircularStack.prototype.clear = function() {
            this.count = 0, this.top = -1, this.data = new Array(this.size);
        }, Object.defineProperty(CircularStack.prototype, "length", {
            get: function() {
                return this.count;
            },
            enumerable: !0,
            configurable: !0
        }), CircularStack;
    }();
    jsCommon.CircularStack = CircularStack;
}(jsCommon || (jsCommon = {}));

var jsCommon;

!function(jsCommon) {
    var StringExtensions, Double = powerbi.Double;
    !function(StringExtensions) {
        function parseIntSubstrFast(fullString, from, length) {
            if (0 === length) return null;
            for (var value = 0, digitExponent = 0, charIndex = from + length - 1; digitExponent < length; digitExponent++, 
            charIndex--) {
                var digit = fullString.charCodeAt(charIndex) - 48;
                if (digit < 0 || 9 < digit) return null;
                value += digit * Double.pow10(digitExponent);
            }
            return value;
        }
        StringExtensions.parseIntSubstrFast = parseIntSubstrFast;
    }(StringExtensions = jsCommon.StringExtensions || (jsCommon.StringExtensions = {}));
}(jsCommon || (jsCommon = {}));

var jsCommon;

!function(jsCommon) {
    var DateExtensions, Double = powerbi.Double, contract = powerbi.contract, parseIntSubstrFast = jsCommon.StringExtensions.parseIntSubstrFast;
    !function(DateExtensions) {
        function isLocalMidnight(date) {
            return (date.getTime() - 6e4 * date.getTimezoneOffset()) % 864e5 === 0;
        }
        function isMomentPresent() {
            return "undefined" != typeof moment;
        }
        function parseIsoDate(isoDate) {
            var parsedDate = parseIsoDateFast(isoDate);
            if (parsedDate) return parsedDate;
            var momentDate = moment(isoDate);
            return momentDate.isValid() ? momentDate.toDate() : null;
        }
        function parseIsoDateFast(isoDate) {
            if (isoDate) {
                var length = isoDate.length;
                if (!(length <= 18 || length > 26)) {
                    var dateTimeDelimiter = isoDate[10];
                    if ("-" === isoDate[4] && "-" === isoDate[7] && ("T" === dateTimeDelimiter || " " === dateTimeDelimiter) && ":" === isoDate[13] && ":" === isoDate[16]) {
                        var year = parseIntSubstrFast(isoDate, 0, 4), month = parseIntSubstrFast(isoDate, 5, 2), day = parseIntSubstrFast(isoDate, 8, 2), hour = parseIntSubstrFast(isoDate, 11, 2), minute = parseIntSubstrFast(isoDate, 14, 2), second = parseIntSubstrFast(isoDate, 17, 2), utc = "Z" === isoDate.charAt(length - 1);
                        utc && length--;
                        var milliseconds = 0;
                        if (length > 19) {
                            if ("." !== isoDate[19]) return;
                            var numSubsecondDigits = length - 20, subsecondValue = parseIntSubstrFast(isoDate, 20, numSubsecondDigits);
                            if (null === subsecondValue) return;
                            var factorForMilliseconds = Double.pow10(3 - numSubsecondDigits);
                            milliseconds = subsecondValue * factorForMilliseconds;
                        }
                        if (null !== year && null !== month && null !== day && null !== hour && null !== minute && null !== second && null !== milliseconds) return utc ? new Date(Date.UTC(year, month - 1, day, hour, minute, second, milliseconds)) : new Date(year, month - 1, day, hour, minute, second, milliseconds);
                    }
                }
            }
        }
        function parseUtcDate(isoDate) {
            return moment.utc(isoDate).toDate();
        }
        function serializeDate(date) {
            return datePrefix + date.getTime().toString() + dateSuffix;
        }
        function deserializeDate(data) {
            if (jsCommon.Utility.throwIfNullOrEmptyString(data, null, "deserializeDate", "Cannot deserialize empty string"), 
            contract.check(0 === data.indexOf(datePrefix) && _.endsWith(data, dateSuffix), "Cannot deserialize empty string"), 
            DateExtensions.isMomentPresent()) {
                var parsedValue = moment(data);
                return contract.check(parsedValue.isValid(), "parsedValue.isValid must be true"), 
                parsedValue.toDate();
            }
            var ticksString = data.substring(datePrefix.length, data.length - dateSuffix.length);
            contract.check(/^\-?\d+$/.test(ticksString), "Cannot deserialize invalid date");
            var ticksValue = parseInt(ticksString, 10);
            return contract.check(!isNaN(ticksValue), "Cannot deserialize invalid date"), new Date(ticksValue);
        }
        function tryDeserializeDate(data) {
            try {
                return deserializeDate(data);
            } catch (e) {}
        }
        function isContainedInTimeFrame(date, unit, amount, shouldGoToStart) {
            var dateForComparison = moment().subtract(amount, unit);
            return shouldGoToStart && (dateForComparison = dateForComparison.startOf(unit)), 
            moment(date) >= dateForComparison;
        }
        function GetTime(locale, date) {
            return date.toLocaleTimeString(locale, {
                second: "numeric",
                minute: "numeric",
                hour: "numeric"
            });
        }
        function GetDayWithTime(locale, date) {
            return date.toLocaleDateString(locale, {
                second: "numeric",
                minute: "numeric",
                hour: "numeric",
                weekday: "short"
            });
        }
        function GetFullDateWithTime(locale, date) {
            return date.toLocaleDateString(locale, {
                second: "numeric",
                minute: "numeric",
                hour: "numeric",
                day: "numeric",
                month: "short",
                year: "numeric"
            });
        }
        var datePrefix = "/Date(", dateSuffix = ")/";
        DateExtensions.isLocalMidnight = isLocalMidnight, DateExtensions.isMomentPresent = isMomentPresent, 
        DateExtensions.parseIsoDate = parseIsoDate, DateExtensions.parseIsoDateFast = parseIsoDateFast, 
        DateExtensions.parseUtcDate = parseUtcDate, DateExtensions.serializeDate = serializeDate, 
        DateExtensions.deserializeDate = deserializeDate, DateExtensions.tryDeserializeDate = tryDeserializeDate, 
        DateExtensions.isContainedInTimeFrame = isContainedInTimeFrame, DateExtensions.GetTime = GetTime, 
        DateExtensions.GetDayWithTime = GetDayWithTime, DateExtensions.GetFullDateWithTime = GetFullDateWithTime;
    }(DateExtensions = jsCommon.DateExtensions || (jsCommon.DateExtensions = {}));
}(jsCommon || (jsCommon = {}));

var jsCommon;

!function(jsCommon) {
    var QueryStringUtil = function() {
        function QueryStringUtil() {}
        return QueryStringUtil.clearQueryString = function(queryField) {
            var queries = QueryStringUtil.parseQueryString();
            return delete queries[queryField], QueryStringUtil.rebuildQueryString(queries);
        }, QueryStringUtil.addOrUpdateQueryString = function(queryField, queryValue) {
            var queries = QueryStringUtil.parseQueryString();
            return queries[queryField] = queryValue, QueryStringUtil.rebuildQueryString(queries);
        }, QueryStringUtil.addOrUpdateQueryStringToUrl = function(url, queries) {
            for (var combinedQueries = QueryStringUtil.parseUrl(url), baseUrl = QueryStringUtil.clearAllQueriesFromUrl(url), _i = 0, _a = Object.keys(queries); _i < _a.length; _i++) {
                var key = _a[_i];
                combinedQueries[key] = queries[key];
            }
            return baseUrl + QueryStringUtil.rebuildQueryString(combinedQueries);
        }, QueryStringUtil.getQueryStringValue = function(key) {
            var queries = QueryStringUtil.parseQueryString();
            return queries[key];
        }, QueryStringUtil.parseUrl = function(url) {
            var queryStartIndex = url.indexOf("?"), queryString = queryStartIndex >= 0 ? url.substr(queryStartIndex) : null;
            return QueryStringUtil.parseQueryString(queryString);
        }, QueryStringUtil.parseQueryString = function(queryString) {
            void 0 === queryString && (queryString = window.location.search);
            var queryStringDictionary = {}, search = queryString;
            if (search && "?" === search.substr(0, 1)) for (var pairs = search.substr(1).split("&"), _i = 0, pairs_1 = pairs; _i < pairs_1.length; _i++) {
                var pair = pairs_1[_i], _a = pair.split("="), key = _a[0], rest = _a.slice(1), value = rest.join("=");
                queryStringDictionary[decodeURIComponent(key)] = decodeURIComponent(value);
            }
            return queryStringDictionary;
        }, QueryStringUtil.rebuildQueryString = function(queries) {
            var queryString = "", isEmpty = !0;
            for (var queryField in queries) isEmpty || (queryString += "&"), queryString += encodeURIComponent(queryField), 
            queries[queryField] && (queryString += "=" + encodeURIComponent(queries[queryField])), 
            isEmpty = !1;
            return isEmpty || (queryString = "?" + queryString), queryString;
        }, QueryStringUtil.clearAllQueriesFromUrl = function(url) {
            var queryStartIndex = url.indexOf("?");
            return queryStartIndex >= 0 ? url.substr(0, queryStartIndex) : url;
        }, QueryStringUtil.OriginClientActivityIdParameterName = "caid", QueryStringUtil.OriginRootActivityIdParameterName = "raid", 
        QueryStringUtil.OriginActivityIdParameterName = "aid", QueryStringUtil;
    }();
    jsCommon.QueryStringUtil = QueryStringUtil;
}(jsCommon || (jsCommon = {}));

var powerbi;

!function(powerbi) {
    function RejectablePromise2(deferred) {
        return new RejectablePromiseImpl(deferred);
    }
    function RejectablePromise(deferred) {
        return new RejectablePromiseImpl(deferred);
    }
    powerbi.RejectablePromise2 = RejectablePromise2, powerbi.RejectablePromise = RejectablePromise;
    var RejectablePromiseImpl = function() {
        function RejectablePromiseImpl(deferred) {
            var _this = this;
            this.deferred = deferred, this.state = 0, deferred.promise.then(function() {
                return _this.state = 1;
            }, function() {
                return _this.state = 2;
            });
        }
        return RejectablePromiseImpl.prototype.then = function(successCallback, errorCallback) {
            return this.deferred.promise.then(successCallback, errorCallback);
        }, RejectablePromiseImpl.prototype.catch = function(callback) {
            return this.deferred.promise.catch(callback);
        }, RejectablePromiseImpl.prototype.finally = function(callback) {
            return this.deferred.promise.finally(callback);
        }, RejectablePromiseImpl.prototype.resolved = function() {
            return 1 === this.state;
        }, RejectablePromiseImpl.prototype.rejected = function() {
            return 2 === this.state;
        }, RejectablePromiseImpl.prototype.pending = function() {
            return 0 === this.state;
        }, RejectablePromiseImpl.prototype.reject = function(reason) {
            this.pending() && (this.deferred.reject(reason), this.state = 2);
        }, RejectablePromiseImpl;
    }();
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var DefaultMaxCacheEntries = 500, RejectablePromiseCache = function() {
        function RejectablePromiseCache(promiseFactory, maxCacheEntries) {
            this.maxCacheEntries = maxCacheEntries ? maxCacheEntries : DefaultMaxCacheEntries, 
            this.cache = {}, this.promiseFactory = promiseFactory;
        }
        return RejectablePromiseCache.prototype.getEntryCount = function() {
            return Object.keys(this.cache).length;
        }, RejectablePromiseCache.prototype.hasCacheEntry = function(cacheKey) {
            return !!this.getCacheEntry(cacheKey);
        }, RejectablePromiseCache.prototype.createCacheEntry = function(cacheKey, context) {
            var _this = this, cacheEntry = this.getCacheEntry(cacheKey);
            if (cacheKey && !cacheEntry) {
                var promiseFactory = this.promiseFactory, queryCache = this.cache, deferred = promiseFactory.defer(), promise = powerbi.RejectablePromise(deferred), entryDeferred = promiseFactory.defer(), entryPromise = powerbi.RejectablePromise(entryDeferred);
                return cacheEntry = {
                    promise: entryPromise,
                    refCount: 0,
                    context: context
                }, this.appendCacheEntryInternal(cacheKey, cacheEntry), this.getEntryCount() > this.maxCacheEntries && this.removeCacheEntryInternal(this.firstKey), 
                promise.then(function(result) {
                    cacheEntry.updateResult && (result = cacheEntry.updateResult(result)), cacheEntry.result = result, 
                    entryDeferred.resolve(result);
                }, function(reason) {
                    return entryDeferred.reject(reason);
                }).finally(function() {
                    delete cacheEntry.updateResult;
                }), entryPromise.catch(function(reason) {
                    return promise.reject();
                }), entryPromise.finally(function() {
                    queryCache[cacheKey] && (delete queryCache[cacheKey].promise, entryPromise.rejected() && _this.removeCacheEntryInternal(cacheKey));
                }), {
                    deferred: deferred,
                    promise: promise
                };
            }
        }, RejectablePromiseCache.prototype.clearEntry = function(cacheKey, rejectPromise) {
            var cacheEntry = this.getCacheEntry(cacheKey);
            if (cacheEntry) {
                var cachePromise = cacheEntry.promise;
                return rejectPromise && cachePromise ? cachePromise.reject() : this.removeCacheEntryInternal(cacheKey), 
                !0;
            }
            return !1;
        }, RejectablePromiseCache.prototype.clearAllEntries = function(rejectPromise) {
            for (var cacheKey in this.cache) this.clearEntry(cacheKey, rejectPromise);
        }, RejectablePromiseCache.prototype.bindCacheEntry = function(cacheKey, bindingResultRewriter) {
            var cacheEntry = this.getCacheEntry(cacheKey);
            if (void 0 !== cacheEntry) {
                var deferred = this.promiseFactory.defer(), promise = powerbi.RejectablePromise(deferred);
                if (cacheEntry.result) {
                    var bindingResult = bindingResultRewriter ? bindingResultRewriter(cacheEntry.result) : cacheEntry.result;
                    return deferred.resolve(bindingResult), promise;
                }
                var cachePromise = cacheEntry.promise;
                return cachePromise ? (cacheEntry.refCount++, promise.finally(function() {
                    cacheEntry.refCount--, 0 === cacheEntry.refCount && cachePromise.pending() && cachePromise.reject();
                }), cachePromise.then(function(result) {
                    var bindingResult = bindingResultRewriter ? bindingResultRewriter(cacheEntry.result) : cacheEntry.result;
                    deferred.resolve(bindingResult);
                }, function(errorReason) {
                    return deferred.reject(errorReason);
                }), promise) : (deferred.reject(null), promise);
            }
        }, RejectablePromiseCache.prototype.getEntryContext = function(cacheKey) {
            var cacheEntry = this.getCacheEntry(cacheKey);
            if (cacheEntry) return cacheEntry.context;
        }, RejectablePromiseCache.prototype.keys = function() {
            return Object.keys(this.cache);
        }, RejectablePromiseCache.prototype.rewriteAllEntries = function(rewriter) {
            var keyUpdates = [], hasRewriteKey = !!rewriter.rewriteKey, hasRewriteResult = !!rewriter.rewriteResult, queryCache = this.cache;
            for (var cacheKey in queryCache) {
                if (hasRewriteKey) {
                    var newKey = rewriter.rewriteKey(cacheKey);
                    newKey !== cacheKey && keyUpdates.push({
                        oldKey: cacheKey,
                        newKey: newKey
                    });
                }
                if (hasRewriteResult) {
                    var entry = queryCache[cacheKey];
                    entry && entry.result ? entry.result = rewriter.rewriteResult(entry.result, cacheKey) : entry.updateResult = function(result) {
                        return rewriter.rewriteResult(result, cacheKey);
                    };
                }
            }
            for (var i = 0, length_1 = keyUpdates.length; i < length_1; i++) this.changeCacheKey(keyUpdates[i].oldKey, keyUpdates[i].newKey);
        }, RejectablePromiseCache.prototype.putCacheResult = function(cacheKey, newResult) {
            var cacheEntry = this.getCacheEntry(cacheKey);
            cacheEntry.result ? cacheEntry.result = newResult : cacheEntry.updateResult = function() {
                return newResult;
            };
        }, RejectablePromiseCache.prototype.appendCacheEntryInternal = function(cacheKey, cacheEntry) {
            if (this.firstKey) {
                var previousLast = this.cache[this.lastKey];
                previousLast.nextKey = cacheKey, cacheEntry.previousKey = this.lastKey, this.lastKey = cacheKey, 
                cacheEntry.nextKey = void 0;
            } else this.firstKey = cacheKey, this.lastKey = cacheKey, cacheEntry.nextKey = void 0, 
            cacheEntry.previousKey = void 0;
            this.cache[cacheKey] = cacheEntry;
        }, RejectablePromiseCache.prototype.removeCacheEntryInternal = function(cacheKey) {
            var cacheEntry = this.cache[cacheKey];
            if (cacheEntry) {
                var previousKey = cacheEntry.previousKey, nextKey = cacheEntry.nextKey;
                if (previousKey) {
                    var previousEntry = this.cache[previousKey];
                    previousEntry.nextKey = nextKey;
                } else this.firstKey = nextKey;
                if (nextKey) {
                    var nextEntry = this.cache[nextKey];
                    nextEntry.previousKey = previousKey;
                } else this.lastKey = previousKey;
                delete this.cache[cacheKey];
            }
        }, RejectablePromiseCache.prototype.changeCacheKey = function(oldKey, newKey) {
            if (!newKey) return this.clearEntry(oldKey, !0);
            if (this.hasCacheEntry(newKey) || !this.hasCacheEntry(oldKey)) return !1;
            var cacheEntry = this.getCacheEntry(oldKey);
            return this.removeCacheEntryInternal(oldKey), this.appendCacheEntryInternal(newKey, cacheEntry), 
            !0;
        }, RejectablePromiseCache.prototype.getCacheEntry = function(cacheKey) {
            var entry;
            if (cacheKey && (entry = this.cache[cacheKey]) && (entry.promise || entry.result)) return entry;
        }, RejectablePromiseCache;
    }();
    powerbi.RejectablePromiseCache = RejectablePromiseCache;
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var HttpStatusCode;
    !function(HttpStatusCode) {
        HttpStatusCode[HttpStatusCode.AngularCancelOrTimeout = 0] = "AngularCancelOrTimeout", 
        HttpStatusCode[HttpStatusCode.OK = 200] = "OK", HttpStatusCode[HttpStatusCode.Accepted = 202] = "Accepted", 
        HttpStatusCode[HttpStatusCode.NoContent = 204] = "NoContent", HttpStatusCode[HttpStatusCode.BadRequest = 400] = "BadRequest", 
        HttpStatusCode[HttpStatusCode.Unauthorized = 401] = "Unauthorized", HttpStatusCode[HttpStatusCode.Forbidden = 403] = "Forbidden", 
        HttpStatusCode[HttpStatusCode.NotFound = 404] = "NotFound", HttpStatusCode[HttpStatusCode.NotAcceptable = 406] = "NotAcceptable", 
        HttpStatusCode[HttpStatusCode.RequestTimeout = 408] = "RequestTimeout", HttpStatusCode[HttpStatusCode.RequestEntityTooLarge = 413] = "RequestEntityTooLarge", 
        HttpStatusCode[HttpStatusCode.TooManyRequests = 429] = "TooManyRequests", HttpStatusCode[HttpStatusCode.InternalServerError = 500] = "InternalServerError", 
        HttpStatusCode[HttpStatusCode.ServiceUnavailable = 503] = "ServiceUnavailable";
    }(HttpStatusCode = powerbi.HttpStatusCode || (powerbi.HttpStatusCode = {}));
    var ExceptionCulprit;
    !function(ExceptionCulprit) {
        ExceptionCulprit[ExceptionCulprit.System = 0] = "System", ExceptionCulprit[ExceptionCulprit.User = 1] = "User", 
        ExceptionCulprit[ExceptionCulprit.External = 2] = "External";
    }(ExceptionCulprit = powerbi.ExceptionCulprit || (powerbi.ExceptionCulprit = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var telemetry;
    !function(telemetry) {
        function BaseEvent(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            void 0 === isError && (isError = !1), void 0 === errorSource && (errorSource = void 0), 
            void 0 === errorCode && (errorCode = void 0), void 0 === activityName && (activityName = void 0), 
            void 0 === activityId && (activityId = void 0), void 0 === isCancelled && (isCancelled = !1), 
            void 0 === pingLatency && (pingLatency = void 0), void 0 === isInCapacity && (isInCapacity = !1);
            var info = {
                parentId: parentId,
                isError: isError,
                errorSource: errorSource,
                errorCode: errorCode,
                activityName: activityName,
                activityId: activityId,
                isCancelled: isCancelled,
                pingLatency: pingLatency,
                isInCapacity: isInCapacity
            };
            return {
                info: info,
                formatted: function() {
                    return powerbi.extendFormatted({
                        parentId: info.parentId
                    }, {
                        isError: info.isError,
                        errorSource: ErrorSource[info.errorSource],
                        errorCode: info.errorCode,
                        activityName: info.activityName,
                        activityId: info.activityId,
                        isCancelled: info.isCancelled,
                        pingLatency: info.pingLatency,
                        isInCapacity: info.isInCapacity
                    });
                }
            };
        }
        function TimedEvent(start, end, parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            var baseEvent = BaseEvent(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity), info = merge(baseEvent.info, {
                start: start,
                end: end
            });
            return {
                info: info,
                formatted: function() {
                    return powerbi.extendFormatted({
                        start: info.start,
                        end: info.end
                    }, null, baseEvent.formatted());
                }
            };
        }
        function Verbose(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            var baseEvent = BaseEvent(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity), info = baseEvent.info;
            return {
                info: info,
                formatted: function() {
                    return powerbi.extendFormatted(null, null, baseEvent.formatted());
                }
            };
        }
        function VerboseTimedEvent(start, end, parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            var baseEvent = Verbose(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity), info = merge(baseEvent.info, {
                start: start,
                end: end
            });
            return {
                info: info,
                formatted: function() {
                    return powerbi.extendFormatted({
                        start: info.start,
                        end: info.end
                    }, null, baseEvent.formatted());
                }
            };
        }
        function Trace(type, message) {
            var info = {
                type: type,
                message: message
            }, event = {
                name: "Trace",
                category: powerbi.TelemetryCategory.Trace,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted({
                        type: info.type,
                        message: info.message
                    }, null);
                },
                info: info,
                loggers: telemetry.TraceLoggers
            };
            return event;
        }
        function Error(message) {
            var info = {
                message: message
            }, event = {
                name: "Error",
                category: powerbi.TelemetryCategory.CriticalError,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted({
                        message: info.message
                    }, null);
                },
                info: info,
                loggers: telemetry.ErrorLoggers
            };
            return event;
        }
        function ErrorWithStackTrace(stack, message) {
            var info = {
                stack: stack,
                message: message
            };
            return {
                info: info,
                formatted: function() {
                    return powerbi.extendFormatted({
                        stack: info.stack,
                        message: info.message
                    }, null);
                }
            };
        }
        function ErrorWithStackTraceAndSourceDetails(source, lineNumber, columnNumber, stack, message) {
            var baseEvent = ErrorWithStackTrace(stack, message), info = merge(baseEvent.info, {
                source: source,
                lineNumber: lineNumber,
                columnNumber: columnNumber
            }), event = {
                name: "ErrorWithStackTraceAndSourceDetails",
                category: powerbi.TelemetryCategory.CriticalError,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted({
                        source: info.source,
                        lineNumber: info.lineNumber,
                        columnNumber: info.columnNumber
                    }, null, baseEvent.formatted());
                },
                info: info,
                loggers: telemetry.ErrorWithStackTraceAndSourceDetailsLoggers
            };
            return event;
        }
        function CustomerAction(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            var baseEvent = BaseEvent(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity), info = baseEvent.info;
            return {
                info: info,
                formatted: function() {
                    return powerbi.extendFormatted(null, null, baseEvent.formatted());
                }
            };
        }
        function DashboardRootSession(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            var baseEvent = Verbose(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity), info = merge(baseEvent.info, {}), event = {
                name: "PBI.Dashboard.RootSession",
                category: powerbi.TelemetryCategory.Verbose,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted(null, null, baseEvent.formatted());
                },
                info: info,
                loggers: telemetry.DashboardRootSessionLoggers
            };
            return event;
        }
        function WFEInvitationSignUp(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            var baseEvent = CustomerAction(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity), info = merge(baseEvent.info, {}), event = {
                name: "PBI.WFE.InvitationSignUp",
                category: powerbi.TelemetryCategory.CustomerAction,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted(null, null, baseEvent.formatted());
                },
                info: info,
                loggers: telemetry.WFEInvitationSignUpLoggers
            };
            return event;
        }
        function WFEError(errorCode1, errorType, parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            var baseEvent = Verbose(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity), info = merge(baseEvent.info, {
                errorCode1: errorCode1,
                errorType: errorType
            }), event = {
                name: "PBI.WFE.Error",
                category: powerbi.TelemetryCategory.Verbose,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted({
                        errorCode1: info.errorCode1,
                        errorType: info.errorType
                    }, null, baseEvent.formatted());
                },
                info: info,
                loggers: telemetry.WFEErrorLoggers
            };
            return event;
        }
        function DashboardErrorDialog(raid, caid, errorType, errorSource, message) {
            void 0 === errorSource && (errorSource = void 0);
            var info = {
                raid: raid,
                caid: caid,
                errorType: errorType,
                errorSource: errorSource,
                message: message
            }, event = {
                name: "PBI.Dashboard.ErrorDialog",
                category: powerbi.TelemetryCategory.CriticalError,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted({
                        raid: info.raid,
                        caid: info.caid,
                        errorType: info.errorType,
                        message: info.message
                    }, {
                        errorSource: ErrorSource[info.errorSource]
                    });
                },
                info: info,
                loggers: telemetry.DashboardErrorDialogLoggers
            };
            return event;
        }
        function MobileLandingContinuedToWeb(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            var baseEvent = CustomerAction(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity), info = merge(baseEvent.info, {}), event = {
                name: "PBI.MobileLanding.ContinuedToWeb",
                category: powerbi.TelemetryCategory.CustomerAction,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted(null, null, baseEvent.formatted());
                },
                info: info,
                loggers: telemetry.MobileLandingContinuedToWebLoggers
            };
            return event;
        }
        function MobileLandingDownloadApp(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            var baseEvent = CustomerAction(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity), info = merge(baseEvent.info, {}), event = {
                name: "PBI.MobileLanding.DownloadApp",
                category: powerbi.TelemetryCategory.CustomerAction,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted(null, null, baseEvent.formatted());
                },
                info: info,
                loggers: telemetry.MobileLandingDownloadAppLoggers
            };
            return event;
        }
        function DashboardUnhandledAngularException(stack, message) {
            var baseEvent = ErrorWithStackTrace(stack, message), info = merge(baseEvent.info, {}), event = {
                name: "PBI.Dashboard.UnhandledAngularException",
                category: powerbi.TelemetryCategory.CriticalError,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted(null, null, baseEvent.formatted());
                },
                info: info,
                loggers: telemetry.DashboardUnhandledAngularExceptionLoggers
            };
            return event;
        }
        function VisualException(visualType, isCustom, apiVersion, instanceId, source, lineNumber, columnNumber, stack, message) {
            var info = {
                visualType: visualType,
                isCustom: isCustom,
                apiVersion: apiVersion,
                instanceId: instanceId,
                source: source,
                lineNumber: lineNumber,
                columnNumber: columnNumber,
                stack: stack,
                message: message
            }, event = {
                name: "PBI.Visual.Exception",
                category: powerbi.TelemetryCategory.CriticalError,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted({
                        visualType: info.visualType,
                        isCustom: info.isCustom,
                        apiVersion: info.apiVersion,
                        instanceId: info.instanceId,
                        source: info.source,
                        lineNumber: info.lineNumber,
                        columnNumber: info.columnNumber,
                        stack: info.stack,
                        message: info.message
                    }, null);
                },
                info: info,
                loggers: telemetry.VisualExceptionLoggers
            };
            return event;
        }
        function DashboardUnhandledException(source, lineNumber, columnNumber, stack, message) {
            var info = {
                source: source,
                lineNumber: lineNumber,
                columnNumber: columnNumber,
                stack: stack,
                message: message
            }, event = {
                name: "PBI.Dashboard.UnhandledException",
                category: powerbi.TelemetryCategory.CriticalError,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted({
                        source: info.source,
                        lineNumber: info.lineNumber,
                        columnNumber: info.columnNumber,
                        stack: info.stack,
                        message: info.message
                    }, null);
                },
                info: info,
                loggers: telemetry.DashboardUnhandledExceptionLoggers
            };
            return event;
        }
        function DashboardUnhandledStacklessException(source, lineNumber, columnNumber, message) {
            var info = {
                source: source,
                lineNumber: lineNumber,
                columnNumber: columnNumber,
                message: message
            }, event = {
                name: "PBI.Dashboard.UnhandledStacklessException",
                category: powerbi.TelemetryCategory.CriticalError,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted({
                        source: info.source,
                        lineNumber: info.lineNumber,
                        columnNumber: info.columnNumber,
                        message: info.message
                    }, null);
                },
                info: info,
                loggers: telemetry.DashboardUnhandledStacklessExceptionLoggers
            };
            return event;
        }
        function VisualError(errorCode, targetVisualType, debugErrorInfo, message) {
            var info = {
                errorCode: errorCode,
                targetVisualType: targetVisualType,
                debugErrorInfo: debugErrorInfo,
                message: message
            }, event = {
                name: "PBI.Visual.Error",
                category: powerbi.TelemetryCategory.CriticalError,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted({
                        errorCode: info.errorCode,
                        targetVisualType: info.targetVisualType,
                        debugErrorInfo: info.debugErrorInfo,
                        message: info.message
                    }, null);
                },
                info: info,
                loggers: telemetry.VisualErrorLoggers
            };
            return event;
        }
        function WFEReopenUserAccount(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            var baseEvent = CustomerAction(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity), info = merge(baseEvent.info, {}), event = {
                name: "PBI.WFE.ReopenUserAccount",
                category: powerbi.TelemetryCategory.CustomerAction,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted(null, null, baseEvent.formatted());
                },
                info: info,
                loggers: telemetry.WFEReopenUserAccountLoggers
            };
            return event;
        }
        function WFEAccountClosedPage(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            var baseEvent = CustomerAction(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity), info = merge(baseEvent.info, {}), event = {
                name: "PBI.WFE.AccountClosedPage",
                category: powerbi.TelemetryCategory.CustomerAction,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted(null, null, baseEvent.formatted());
                },
                info: info,
                loggers: telemetry.WFEAccountClosedPageLoggers
            };
            return event;
        }
        function VisualWarning(targetVisualType, parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            var baseEvent = Verbose(parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity), info = merge(baseEvent.info, {
                targetVisualType: targetVisualType
            }), event = {
                name: "PBI.Visual.Warning",
                category: powerbi.TelemetryCategory.Verbose,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted({
                        targetVisualType: info.targetVisualType
                    }, null, baseEvent.formatted());
                },
                info: info,
                loggers: telemetry.VisualWarningLoggers
            };
            return event;
        }
        function VisualApiUsage(name, apiVersion, custom, visualVersion, instanceId, start, end, parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity) {
            var baseEvent = VerboseTimedEvent(start, end, parentId, isError, errorSource, errorCode, activityName, activityId, isCancelled, pingLatency, isInCapacity), info = merge(baseEvent.info, {
                name: name,
                apiVersion: apiVersion,
                custom: custom,
                visualVersion: visualVersion,
                instanceId: instanceId
            }), event = {
                name: "PBI.Visual.ApiUsage",
                category: powerbi.TelemetryCategory.Verbose,
                time: Date.now(),
                id: generateGuid(),
                formatted: function() {
                    return powerbi.extendFormatted({
                        name: info.name,
                        apiVersion: info.apiVersion,
                        custom: info.custom,
                        visualVersion: info.visualVersion,
                        instanceId: info.instanceId
                    }, null, baseEvent.formatted());
                },
                info: info,
                loggers: telemetry.VisualApiUsageLoggers
            };
            return event;
        }
        var generateGuid, Utility = jsCommon.Utility, merge = jsCommon.UnionExtensions.mergeUnionType;
        generateGuid = Utility ? Utility.generateGuid : Function.prototype;
        var ErrorSource;
        !function(ErrorSource) {
            ErrorSource[ErrorSource.PowerBI = 0] = "PowerBI", ErrorSource[ErrorSource.External = 1] = "External", 
            ErrorSource[ErrorSource.User = 2] = "User";
        }(ErrorSource = telemetry.ErrorSource || (telemetry.ErrorSource = {}));
        var CanvasLayout;
        !function(CanvasLayout) {
            CanvasLayout[CanvasLayout.Master = 0] = "Master", CanvasLayout[CanvasLayout.PhonePortrait = 1] = "PhonePortrait";
        }(CanvasLayout = telemetry.CanvasLayout || (telemetry.CanvasLayout = {})), telemetry.BaseEvent = BaseEvent, 
        telemetry.TimedEvent = TimedEvent, telemetry.Verbose = Verbose, telemetry.VerboseTimedEvent = VerboseTimedEvent, 
        telemetry.Trace = Trace, telemetry.Error = Error, telemetry.ErrorWithStackTrace = ErrorWithStackTrace, 
        telemetry.ErrorWithStackTraceAndSourceDetails = ErrorWithStackTraceAndSourceDetails, 
        telemetry.CustomerAction = CustomerAction, telemetry.DashboardRootSession = DashboardRootSession, 
        telemetry.WFEInvitationSignUp = WFEInvitationSignUp, telemetry.WFEError = WFEError, 
        telemetry.DashboardErrorDialog = DashboardErrorDialog, telemetry.MobileLandingContinuedToWeb = MobileLandingContinuedToWeb, 
        telemetry.MobileLandingDownloadApp = MobileLandingDownloadApp, telemetry.DashboardUnhandledAngularException = DashboardUnhandledAngularException, 
        telemetry.VisualException = VisualException, telemetry.DashboardUnhandledException = DashboardUnhandledException, 
        telemetry.DashboardUnhandledStacklessException = DashboardUnhandledStacklessException, 
        telemetry.VisualError = VisualError, telemetry.WFEReopenUserAccount = WFEReopenUserAccount, 
        telemetry.WFEAccountClosedPage = WFEAccountClosedPage, telemetry.VisualWarning = VisualWarning, 
        telemetry.VisualApiUsage = VisualApiUsage;
    }(telemetry = powerbi.telemetry || (powerbi.telemetry = {}));
}(powerbi || (powerbi = {}));

var appInsights, appInsightsConfig;

appInsights = appInsights || {
    trackPageView: function(name, url) {},
    trackEvent: function(activityName, additionalData) {},
    trackTrace: function(message, additionalData) {},
    flush: function() {}
};

var powerbi;

!function(powerbi) {
    function loadAppInsightsV2() {
        if (!("undefined" != typeof isTelemetryDisabled && isTelemetryDisabled || "undefined" == typeof appInsightsV2InstrKey && "undefined" == typeof appInsightsConfig)) {
            var aiKey = "undefined" != typeof appInsightsV2InstrKey ? appInsightsV2InstrKey : "", aiConfig = appInsightsConfig || {
                instrumentationKey: aiKey
            };
            aiConfig.disableAjaxTracking = !0, appInsights = function(aiConfig) {
                function createLazyMethod(name) {
                    appInsights[name] = function() {
                        var originalArguments = arguments;
                        appInsights.queue.push(function() {
                            appInsights[name].apply(appInsights, originalArguments);
                        });
                    };
                }
                var appInsights = {
                    config: aiConfig
                }, localDocument = document, localWindow = window, scriptText = "script", scriptElement = localDocument.createElement(scriptText);
                scriptElement.src = aiConfig.url || powerbi.build + "/scripts/ai.0.js", localDocument.getElementsByTagName(scriptText)[0].parentNode.appendChild(scriptElement), 
                appInsights.cookie = localDocument.cookie, appInsights.queue = [];
                for (var methods = [ "Event", "Exception", "Metric", "PageView", "Trace" ]; methods.length; ) createLazyMethod("track" + methods.pop());
                if (!aiConfig.disableExceptionTracking) {
                    var method_1 = "onerror";
                    createLazyMethod("_" + method_1);
                    var originalOnError_1 = localWindow[method_1];
                    localWindow[method_1] = function(message, url, lineNumber, columnNumber, error) {
                        var handled = !!originalOnError_1 && !!originalOnError_1(message, url, lineNumber, columnNumber, error);
                        return handled !== !0 && appInsights["_" + method_1](message, url, lineNumber, columnNumber, error), 
                        handled;
                    };
                }
                return appInsights;
            }(aiConfig);
        }
    }
    var QueryStringUtil = jsCommon.QueryStringUtil, PageViewEventName = "PowerBIPageView", AppInsightsV2Service = function() {
        function AppInsightsV2Service(appInsightsV2Service, pageUrl) {
            this.hostData = null, this.appInsightsV2Service = appInsightsV2Service, this.appInsightsV2Service.trackPageView(PageViewEventName, AppInsightsV2Service.scrubUrl(pageUrl || window.location.href));
        }
        return AppInsightsV2Service.prototype.initialize = function(hostData) {
            this.hostData = hostData;
        }, AppInsightsV2Service.prototype.getType = function() {
            return powerbi.LoggerServiceType.AppInsightDeprecated;
        }, AppInsightsV2Service.prototype.getCategoryOfEvent = function(eventData) {
            var category = eventData.category ? eventData.category : powerbi.TelemetryCategory.Verbose;
            return powerbi.TelemetryCategory[category];
        }, AppInsightsV2Service.prototype.logEvent = function(eventData) {
            eventData.category === powerbi.TelemetryCategory.Trace ? this.trackTraceInternal(eventData.formatted(), this.hostData) : this.endTimedEvent(eventData);
        }, AppInsightsV2Service.prototype.startTimedEvent = function(eventData) {}, AppInsightsV2Service.prototype.endTimedEvent = function(eventData) {
            var properties = $.extend({}, this.hostData, {
                id: eventData.id,
                start: new Date(eventData.time).toISOString(),
                end: new Date().toISOString(),
                category: this.getCategoryOfEvent(eventData)
            }, eventData.formatted());
            this.trackEventInternal(eventData.name, properties);
        }, AppInsightsV2Service.prototype.flush = function() {
            this.appInsightsV2Service.flush && this.appInsightsV2Service.flush();
        }, AppInsightsV2Service.prototype.trackEventInternal = function(activityName, properties) {
            try {
                this.appInsightsV2Service.trackEvent(activityName, properties);
            } catch (e) {}
        }, AppInsightsV2Service.prototype.trackTraceInternal = function(message, properties) {
            try {
                this.appInsightsV2Service.trackTrace(message, properties);
            } catch (e) {}
        }, AppInsightsV2Service.scrubUrl = function(url) {
            var baseUrl = QueryStringUtil.clearAllQueriesFromUrl(url), queryString = "", queryDictionary = QueryStringUtil.parseUrl(url);
            for (var key in queryDictionary) {
                queryString += 0 === queryString.length ? "?" : "&";
                var value = queryDictionary[key];
                queryString += encodeURIComponent(key) + "=<pi>" + (value ? powerbi.getHashCode(value) : "") + "</pi>";
            }
            return baseUrl + queryString;
        }, AppInsightsV2Service;
    }();
    powerbi.AppInsightsV2Service = AppInsightsV2Service, powerbi.loadAppInsightsV2 = loadAppInsightsV2, 
    loadAppInsightsV2();
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var errorDetailsHelper;
    !function(errorDetailsHelper) {
        function getErrorSourceFromExceptionCulprit(exceptionCulprit) {
            switch (exceptionCulprit) {
              case powerbi.ExceptionCulprit.External:
                return ErrorSource.External;

              case powerbi.ExceptionCulprit.User:
                return ErrorSource.User;

              case powerbi.ExceptionCulprit.System:
              default:
                return ErrorSource.PowerBI;
            }
        }
        function getTelemetryErrorDetails(error, httpStatusCode) {
            if (error && error.code) {
                var errorCode = error.code;
                return error["pbi.error"] && null != error["pbi.error"].exceptionCulprit ? {
                    errorCode: errorCode,
                    errorSource: getErrorSourceFromExceptionCulprit(error["pbi.error"].exceptionCulprit)
                } : null == httpStatusCode || httpStatusCode !== powerbi.HttpStatusCode.Unauthorized && httpStatusCode !== powerbi.HttpStatusCode.Forbidden ? {
                    errorCode: errorCode,
                    errorSource: ErrorSource.PowerBI
                } : {
                    errorCode: errorCode,
                    errorSource: ErrorSource.User
                };
            }
            if (null != httpStatusCode) return {
                errorCode: "HttpStatusCode = " + httpStatusCode,
                errorSource: ErrorSource.PowerBI
            };
        }
        var ErrorSource = powerbi.telemetry.ErrorSource;
        errorDetailsHelper.getTelemetryErrorDetails = getTelemetryErrorDetails;
    }(errorDetailsHelper = powerbi.errorDetailsHelper || (powerbi.errorDetailsHelper = {}));
}(powerbi || (powerbi = {}));

var jsCommon;

!function(jsCommon) {
    var ArrayExtensions;
    !function(ArrayExtensions) {
        function comparableSequenceEqual(array1, array2) {
            if (!array1 && !array2) return !0;
            if (!!array1 != !!array2 || array1.length !== array2.length) return !1;
            for (var i = 0, len = array1.length; i < len; i++) if (!array1[i].equals(array2[i])) return !1;
            return !0;
        }
        ArrayExtensions.comparableSequenceEqual = comparableSequenceEqual;
    }(ArrayExtensions = jsCommon.ArrayExtensions || (jsCommon.ArrayExtensions = {}));
}(jsCommon || (jsCommon = {}));

var powerbi;

!function(powerbi) {
    var SendAllRule = function() {
        function SendAllRule() {}
        return SendAllRule.prototype.shoudLog = function(event, loggerServiceId) {
            return !0;
        }, SendAllRule;
    }();
    powerbi.SendAllRule = SendAllRule;
    var SendNothingRule = function() {
        function SendNothingRule() {}
        return SendNothingRule.prototype.shoudLog = function(event, loggerServiceId) {
            return !1;
        }, SendNothingRule;
    }();
    powerbi.SendNothingRule = SendNothingRule;
    var LoggerServiceRule = function() {
        function LoggerServiceRule(args) {
            this.shouldLogMap = [];
            for (var i = 0; i < args.length; i++) {
                var arg = args[i], purpose = arg.purpose;
                this.shouldLogMap[purpose] = arg.sampleRate >= 1 - Math.random();
            }
        }
        return LoggerServiceRule.prototype.shoudLog = function(event, loggerType) {
            var loggers = event.loggers;
            if (loggers) return (loggers & loggerType) === loggerType;
            var use = event.category ? powerbi.TelemetryCategory[event.category] : powerbi.TelemetryCategory[powerbi.TelemetryCategory.Verbose];
            return void 0 !== this.shouldLogMap[use] && this.shouldLogMap[use];
        }, LoggerServiceRule;
    }();
    powerbi.LoggerServiceRule = LoggerServiceRule;
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var LoggerServiceWrapper = function() {
        function LoggerServiceWrapper(loggerService, rule) {
            this.loggerService = loggerService, this.rule = rule;
        }
        return LoggerServiceWrapper.prototype.initialize = function(hostData) {
            this.loggerService.initialize(hostData);
        }, LoggerServiceWrapper.prototype.getType = function() {
            return this.loggerService.getType();
        }, LoggerServiceWrapper.prototype.shouldLog = function(event) {
            return !!this.rule.shoudLog(event, this.getType());
        }, LoggerServiceWrapper.prototype.logEvent = function(eventData) {
            this.shouldLog(eventData) && this.loggerService.logEvent(eventData);
        }, LoggerServiceWrapper.prototype.startTimedEvent = function(eventData) {
            this.loggerService.startTimedEvent(eventData);
        }, LoggerServiceWrapper.prototype.endTimedEvent = function(eventData) {
            this.shouldLog(eventData) && this.loggerService.endTimedEvent(eventData);
        }, LoggerServiceWrapper.prototype.flush = function() {
            this.loggerService.flush();
        }, LoggerServiceWrapper;
    }();
    powerbi.LoggerServiceWrapper = LoggerServiceWrapper;
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    function getHashCode(inputStr) {
        var i, chrCode, len, hash = 0;
        if (0 === inputStr.length) return hash;
        var lowerInputString = inputStr.toLowerCase();
        for (i = 0, len = lowerInputString.length; i < len; i++) chrCode = lowerInputString.charCodeAt(i), 
        hash = (hash << 5) - hash + chrCode, hash |= 0;
        return hash;
    }
    function obfuscate(inputStr) {
        return getHashCode(inputStr).toString();
    }
    function extendFormatted(requiredFields, optionalFields, target) {
        var result = target || requiredFields || {};
        if (target && requiredFields && (target = jsCommon.UnionExtensions.mergeUnionType(target, requiredFields)), 
        optionalFields) for (var key in optionalFields) if (optionalFields.hasOwnProperty(key)) {
            var value = optionalFields[key];
            void 0 !== value && value !== !1 && (result[key] = value);
        }
        return result;
    }
    powerbi.getHashCode = getHashCode, powerbi.obfuscate = obfuscate, powerbi.extendFormatted = extendFormatted;
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var telemetry;
    !function(telemetry) {
        function createTelemetryHostService() {
            return "string" != typeof window.sessionSource && (window.sessionSource = "PowerBI"), 
            "string" != typeof window.embedUserId && (window.embedUserId = ""), new TelemetryHostService(powerbi.telemetrySamplingRules, powerbi.session.userInfo, powerbi.build, clusterUri, powerbi.telemetryConstants.pbiClientName, window.telemetrySessionId, window.sessionSource, window.embedUserId);
        }
        telemetry.createTelemetryHostService = createTelemetryHostService, telemetry.NullGuid = "00000000-0000-0000-0000-000000000000";
        var TelemetryHostService = function() {
            function TelemetryHostService(telemetrySamplesRates, userInfo, build, cluster, clientName, sessionId, sessionSource, embedUserId) {
                this.loggers = TelemetryConfigurations.getDefaultLoggingCollection(telemetrySamplesRates), 
                this.hostData = {
                    sessionId: sessionId || "",
                    client: clientName || "",
                    build: build || "",
                    cluster: cluster || "",
                    userId: userInfo && userInfo.puid ? userInfo.puid : telemetry.NullGuid,
                    userObjectId: userInfo && userInfo.uoid ? userInfo.uoid : telemetry.NullGuid,
                    tenantObjectId: "undefined" == typeof window.tenantId ? telemetry.NullGuid : window.tenantId,
                    isInternalUser: powerbi.session.UserInfoUtils.isInternalUser(),
                    sessionSource: sessionSource,
                    embedUserId: embedUserId
                };
            }
            return TelemetryHostService.prototype.getLoggerServices = function() {
                return this.loggers;
            }, TelemetryHostService.prototype.getHostData = function() {
                return this.hostData;
            }, TelemetryHostService;
        }(), TelemetryConfigurations = function() {
            function TelemetryConfigurations() {}
            return TelemetryConfigurations.getDefaultLoggingCollection = function(telemetrySamplingRates) {
                return "standard" === telemetrySamplingRates ? TelemetryConfigurations.getStandardCollectionRules() : "snapshotEmbed" === telemetrySamplingRates ? TelemetryConfigurations.getSnapShotEmbedCollectionRules() : "none" === telemetrySamplingRates ? TelemetryConfigurations.getLogNothingCollectionRules() : TelemetryConfigurations.getLoggingCollection(telemetrySamplingRates);
            }, TelemetryConfigurations.getLoggingCollection = function(telemetrySamplingRates) {
                var loggingServices = new Array(), lKey = "undefined" != typeof window.localyticsInstrKey ? window.localyticsInstrKey : "";
                return telemetrySamplingRates && (telemetrySamplingRates.appInsights && loggingServices.push(this.wrapLogger(telemetrySamplingRates.appInsights, new powerbi.AppInsightsV2Service(appInsights))), 
                telemetrySamplingRates.localytics && loggingServices.push(this.wrapLogger(telemetrySamplingRates.localytics, new powerbi.LocalyticsService(lKey)))), 
                loggingServices;
            }, TelemetryConfigurations.getStandardCollectionRules = function() {
                var loggingServices = new Array(), lKey = "undefined" != typeof window.localyticsInstrKey ? window.localyticsInstrKey : "";
                return loggingServices.push(this.wrapLogger(TelemetryConfigurations.AppInsightStandardLoggerConfig, new powerbi.AppInsightsV2Service(appInsights))), 
                loggingServices.push(this.wrapLogger(TelemetryConfigurations.LocalyticsStandardLoggerConfig, new powerbi.LocalyticsService(lKey || ""))), 
                loggingServices;
            }, TelemetryConfigurations.getSnapShotEmbedCollectionRules = function() {
                var loggingServices = new Array(), lKey = "undefined" != typeof window.localyticsInstrKey ? window.localyticsInstrKey : "";
                return loggingServices.push(this.wrapLogger(TelemetryConfigurations.snapEmbededLoggerConfig, new powerbi.AppInsightsV2Service(appInsights))), 
                loggingServices.push(this.wrapLogger(TelemetryConfigurations.snapEmbededLoggerConfig, new powerbi.LocalyticsService(lKey || ""))), 
                loggingServices;
            }, TelemetryConfigurations.getLogNothingCollectionRules = function() {
                var loggingServices = new Array();
                return loggingServices;
            }, TelemetryConfigurations.wrapLogger = function(samplingRates, service) {
                var transmissionRule = samplingRates ? new powerbi.LoggerServiceRule(samplingRates) : new powerbi.SendNothingRule(), transmissionControllerLoggingService = new powerbi.LoggerServiceWrapper(service, transmissionRule);
                return transmissionControllerLoggingService;
            }, TelemetryConfigurations.LocalyticsStandardLoggerConfig = [ {
                purpose: "CriticalError",
                sampleRate: 1
            }, {
                purpose: "CustomerAction",
                sampleRate: 1
            }, {
                purpose: "Verbose",
                sampleRate: 0
            }, {
                purpose: "Trace",
                sampleRate: 0
            } ], TelemetryConfigurations.AppInsightStandardLoggerConfig = [ {
                purpose: "CriticalError",
                sampleRate: 1
            }, {
                purpose: "CustomerAction",
                sampleRate: 1
            }, {
                purpose: "Verbose",
                sampleRate: 1
            }, {
                purpose: "Trace",
                sampleRate: 0
            } ], TelemetryConfigurations.snapEmbededLoggerConfig = [ {
                purpose: "SnapShotEmbedUserAction",
                sampleRate: 1
            } ], TelemetryConfigurations;
        }();
        telemetry.TelemetryConfigurations = TelemetryConfigurations;
    }(telemetry = powerbi.telemetry || (powerbi.telemetry = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var session;
    !function(session) {
        var UserInfoUtils = function() {
            function UserInfoUtils() {}
            return UserInfoUtils.getFullName = function() {
                return powerbi.session.userInfo.givenName + " " + powerbi.session.userInfo.surname;
            }, UserInfoUtils.isInternalUser = function() {
                if (!powerbi.session.userInfo || !powerbi.session.userInfo.name) return !1;
                var lowerUserName = powerbi.session.userInfo.name.toLowerCase();
                return lowerUserName.indexOf("@microsoft.com") >= 0 || lowerUserName.indexOf(".microsoft.com") >= 0;
            }, UserInfoUtils.getUPN = function() {
                return session.userInfo.name;
            }, UserInfoUtils.getEmailAddressForReceivingMail = function() {
                var userInfo = powerbi.session.userInfo;
                return null == userInfo ? "" : _.isEmpty(userInfo.alternateEmail) ? userInfo.name : userInfo.alternateEmail;
            }, UserInfoUtils;
        }();
        session.UserInfoUtils = UserInfoUtils;
    }(session = powerbi.session || (powerbi.session = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var telemetryConstants;
    !function(telemetryConstants) {
        telemetryConstants.pbiClientName = "PowerBI.com", telemetryConstants.httpActivityIdHeader = "ActivityId", 
        telemetryConstants.httpRequestIdHeader = "RequestId";
    }(telemetryConstants = powerbi.telemetryConstants || (powerbi.telemetryConstants = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var TelemetryCategory;
    !function(TelemetryCategory) {
        TelemetryCategory[TelemetryCategory.Verbose = 0] = "Verbose", TelemetryCategory[TelemetryCategory.CustomerAction = 1] = "CustomerAction", 
        TelemetryCategory[TelemetryCategory.CriticalError = 2] = "CriticalError", TelemetryCategory[TelemetryCategory.Trace = 3] = "Trace", 
        TelemetryCategory[TelemetryCategory.SnapShotEmbedUserAction = 4] = "SnapShotEmbedUserAction";
    }(TelemetryCategory = powerbi.TelemetryCategory || (powerbi.TelemetryCategory = {}));
    var LoggerServiceType;
    !function(LoggerServiceType) {
        LoggerServiceType[LoggerServiceType.Localytics = 1] = "Localytics", LoggerServiceType[LoggerServiceType.AppInsightDeprecated = 2] = "AppInsightDeprecated", 
        LoggerServiceType[LoggerServiceType.AppInsight = 4] = "AppInsight", LoggerServiceType[LoggerServiceType.Etw = 8] = "Etw", 
        LoggerServiceType[LoggerServiceType.Mobile = 16] = "Mobile", LoggerServiceType[LoggerServiceType.WinJs = 32] = "WinJs", 
        LoggerServiceType[LoggerServiceType.Designer = 64] = "Designer";
    }(LoggerServiceType = powerbi.LoggerServiceType || (powerbi.LoggerServiceType = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    function createTelemetryService(hostService, userActivityContextService) {
        return new TelemetryService(hostService, userActivityContextService);
    }
    powerbi.createTelemetryService = createTelemetryService;
    var PerfEvent = function() {
        function PerfEvent() {}
        return PerfEvent;
    }();
    powerbi.PerfEvent = PerfEvent;
    var SessionTimeout = 18e5;
    powerbi.ForceResolveTimeout = 12e4;
    var TelemetryService = function() {
        function TelemetryService(telemetryHost, userActivityContextService) {
            this.userActivityContextService = userActivityContextService, this.loggerServices = telemetryHost ? telemetryHost.getLoggerServices() : [], 
            this.hostData = telemetryHost ? telemetryHost.getHostData() : {}, this.startSession(), 
            this.startSessionTimeout(), this.isSuspended = !1, this.hostInfo = {}, this.openActivities = [];
        }
        return TelemetryService.prototype.setLogToConsole = function(enabled) {
            this.logToConsole = enabled;
        }, TelemetryService.prototype.setLogAllEvents = function(logAllEvents) {
            this.logAllEvents = logAllEvents;
        }, TelemetryService.prototype.startSession = function() {
            for (var i = 0, len = this.loggerServices.length; i < len; i++) this.loggerServices[i].initialize(this.hostData);
            this._rootEvent = powerbi.telemetry.DashboardRootSession("", !1), this.logEventInternal(this._rootEvent);
        }, TelemetryService.prototype.startSessionTimeout = function() {
            var _this = this;
            this.sessionExpirationTimerId = setTimeout(function() {
                _this.hostData.sessionId = jsCommon.Utility.generateGuid(), _this.startSession();
            }, SessionTimeout);
        }, TelemetryService.prototype.resetSessionTimeout = function() {
            window.clearTimeout(this.sessionExpirationTimerId), this.startSessionTimeout();
        }, TelemetryService.prototype.suspend = function() {
            this.isSuspended = !0, window.clearTimeout(this.sessionExpirationTimerId);
        }, TelemetryService.prototype.resume = function() {
            this.isSuspended = !1, this.resetSessionTimeout();
        }, TelemetryService.prototype.flush = function() {
            for (var loggerServices = this.getLoggerServices(), i = 0, len = loggerServices.length; i < len; i++) loggerServices[i].flush();
        }, TelemetryService.prototype.setHostInfo = function(key, value) {
            return null == value ? void delete this.hostInfo[key] : void (this.hostInfo[key] = value);
        }, TelemetryService.prototype.logEvent = function(eventFactory) {
            for (var args = [], _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
            args.push(this.getParentId());
            var event = eventFactory.apply(null, args);
            return this.updateEventInfo(event), this.logEventInternal(event), event;
        }, TelemetryService.prototype.logChildEvent = function(parent, eventFactory) {
            for (var args = [], _i = 2; _i < arguments.length; _i++) args[_i - 2] = arguments[_i];
            args.push(parent.id);
            var event = eventFactory.apply(null, args);
            return this.updateEventInfo(event), this.logEventInternal(event), event;
        }, TelemetryService.prototype.getRootActivity = function() {
            var activity = this.openActivities.length && this.openActivities[0];
            return activity ? activity.activityEvent : this.root;
        }, TelemetryService.prototype.startActivity = function(scope, eventFactory) {
            for (var _this = this, args = [], _i = 2; _i < arguments.length; _i++) args[_i - 2] = arguments[_i];
            var parentActivity = this.getParentActivityForScope(scope);
            args.push(parentActivity && parentActivity.activityEvent && parentActivity.activityEvent.id || this.root && this.root.id);
            var thisEvent;
            eventFactory && (thisEvent = eventFactory.apply(null, args), this.updateEventInfo(thisEvent), 
            this.startTimedEventInternal(thisEvent));
            var thisActivity;
            return thisActivity = {
                activityScope: scope,
                activityParent: parentActivity,
                clientActivityId: this.getNewActivityClientActivityId(parentActivity, thisEvent),
                activityEvent: thisEvent,
                activityDeferred: new DeferredTelemetryEvent(thisEvent || {}, function(e) {
                    thisActivity.activityClosed = !0;
                    var index = _this.openActivities.indexOf(thisActivity);
                    index !== -1 && _this.openActivities.splice(index, 1), thisActivity.activityEvent && _this.userActivityContextService.popParentContext(thisActivity.activityEvent), 
                    _this.endActivityEvent(thisActivity);
                }),
                activityCount: 1,
                activityClosed: !1,
                activityEnded: !1,
                activityTimeout: 0,
                activityUnregisterScopeDestroy: scope.$on("$destroy", function() {
                    _this.activityScopeDestroyed(thisActivity);
                })
            }, this.extendActivityTimeout(thisActivity), this.openActivities.push(thisActivity), 
            thisEvent && this.userActivityContextService.pushParentContext(thisEvent), parentActivity && this.startActivityEvent(parentActivity), 
            thisActivity.activityDeferred;
        }, TelemetryService.prototype.getParentActivityForScope = function(scope) {
            for (;scope; ) {
                for (var scopeId = scope.$id, i = this.openActivities.length; i-- > 0; ) {
                    var activity = this.openActivities[i];
                    if (activity.activityScope.$id === scopeId) return activity;
                }
                scope = scope.$parent;
            }
        }, TelemetryService.prototype.getNewActivityClientActivityId = function(parentActivity, thisEvent) {
            if (parentActivity && parentActivity.clientActivityId) return parentActivity.clientActivityId;
            var activityContext = this.userActivityContextService.getRootContext();
            return activityContext ? activityContext.activityId : thisEvent && thisEvent.id ? thisEvent.id : this.sessionId;
        }, TelemetryService.prototype.clearActivityTimeout = function(activity) {
            activity.activityTimeout && (clearTimeout(activity.activityTimeout), activity.activityTimeout = 0);
        }, TelemetryService.prototype.extendActivityTimeout = function(activity) {
            var _this = this;
            this.clearActivityTimeout(activity), activity.activityEnded || (activity.activityTimeout = setTimeout(function() {
                return _this.activityTimedOut(activity);
            }, powerbi.ForceResolveTimeout));
        }, TelemetryService.prototype.activityTimedOut = function(activity) {
            activity.activityEnded || this.stopActivity(activity, {
                errorCode: "Timeout",
                errorMessage: "Timeout after " + powerbi.ForceResolveTimeout + " ms (possible ClientActivityId=" + activity.clientActivityId + ")"
            });
        }, TelemetryService.prototype.activityScopeDestroyed = function(activity) {
            activity.activityEnded || (activity.activityEvent && (activity.activityEvent.info.isCancelled = !0, 
            activity.activityEvent.info.errorCode = "ScopeDestroyed"), this.stopActivity(activity));
        }, TelemetryService.prototype.startActivityEvent = function(activity) {
            if (!activity.activityEnded) for (++activity.activityCount; activity; ) this.extendActivityTimeout(activity), 
            activity = activity.activityParent;
        }, TelemetryService.prototype.endActivityEvent = function(activity) {
            do {
                if (activity.activityEnded) break;
                var count = --activity.activityCount;
                if (!activity.activityClosed || count > 0) break;
                this.endActivity(activity), activity = activity.activityParent;
            } while (activity);
        }, TelemetryService.prototype.stopActivity = function(activity, errorDetails) {
            if (!activity.activityEnded) if (activity.activityCount = 0, errorDetails) {
                var event_1 = activity.activityEvent;
                if (event_1 && event_1.info.isReqId) {
                    var requestId = "RequestId=" + event_1.id;
                    errorDetails.errorMessage = errorDetails.errorMessage ? errorDetails.errorMessage + " " + requestId : requestId;
                }
                activity.activityDeferred.reject(errorDetails);
            } else activity.activityDeferred.resolve();
        }, TelemetryService.prototype.endActivity = function(activity) {
            activity.activityEnded = !0, this.clearActivityTimeout(activity), activity.activityUnregisterScopeDestroy(), 
            activity.activityEvent && this.endTimedEventInternal(activity.activityEvent);
        }, TelemetryService.prototype.startEvent = function(eventFactory) {
            for (var _this = this, args = [], _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
            args.push(this.getParentId());
            var event = eventFactory.apply(null, args);
            return this.updateEventInfo(event), this.startTimedEventInternal(event), new DeferredTelemetryEvent(event, function(e) {
                return _this.endTimedEventInternal(e);
            });
        }, TelemetryService.prototype.startChildEvent = function(parent, eventFactory) {
            for (var _this = this, args = [], _i = 2; _i < arguments.length; _i++) args[_i - 2] = arguments[_i];
            args.push(parent.id);
            var event = eventFactory.apply(null, args);
            return this.updateEventInfo(event), this.startTimedEventInternal(event), new DeferredTelemetryEvent(event, function(e) {
                return _this.endTimedEventInternal(e);
            });
        }, TelemetryService.prototype.logTrace = function(trace) {
            var event = powerbi.telemetry.Trace(trace.type, trace.text);
            this.logEventInternal(event);
        }, TelemetryService.prototype.getParentId = function() {
            var parentContext = this.userActivityContextService.getParentContext();
            return parentContext ? parentContext.activityId : this.root.id;
        }, TelemetryService.prototype.updateEventInfo = function(event) {
            var eventInfo = event && event.info;
            eventInfo && (this.updateRootActivity(eventInfo), this.logHostInfo(eventInfo));
        }, TelemetryService.prototype.updateRootActivity = function(eventInfo) {
            if (eventInfo) {
                var rootContext = this.userActivityContextService.getRootContext();
                if (rootContext) eventInfo.activityName = rootContext.activityName, eventInfo.activityId = rootContext.activityId; else {
                    var root = this.getRootActivity();
                    root && (eventInfo.activityName = root.name, eventInfo.activityId = root.id);
                }
            }
        }, TelemetryService.prototype.startTimedEventInternal = function(event) {
            if (this.resetSessionTimeout(), this.shouldEventBeLogged(event)) for (var loggerServices = this.getLoggerServices(), i = 0, len = loggerServices.length; i < len; i++) loggerServices[i].startTimedEvent(event);
        }, TelemetryService.prototype.endTimedEventInternal = function(event) {
            if (this.logToConsole, this.resetSessionTimeout(), this.shouldEventBeLogged(event)) for (var loggerServices = this.getLoggerServices(), i = 0, len = loggerServices.length; i < len; i++) loggerServices[i].endTimedEvent(event);
        }, TelemetryService.prototype.logEventInternal = function(event) {
            if (this.resetSessionTimeout(), this.shouldEventBeLogged(event)) for (var loggerServices = this.getLoggerServices(), i = 0, len = loggerServices.length; i < len; i++) loggerServices[i].logEvent(event);
        }, TelemetryService.prototype.logHostInfo = function(eventInfo) {
            jsCommon.QueryStringUtil.getQueryStringValue("unmin") && (eventInfo.isDebug = !0);
            var hostInfo = this.hostInfo;
            if (null != hostInfo) for (var key in hostInfo) hostInfo.hasOwnProperty(key) && (eventInfo[key] = hostInfo[key]);
        }, Object.defineProperty(TelemetryService.prototype, "sessionId", {
            get: function() {
                return this.hostData.sessionId;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(TelemetryService.prototype, "root", {
            get: function() {
                return this._rootEvent;
            },
            enumerable: !0,
            configurable: !0
        }), TelemetryService.prototype.getLoggerServices = function() {
            return this.isSuspended ? [] : this.loggerServices;
        }, TelemetryService.prototype.shouldEventBeLogged = function(event) {
            if (null != event.shouldBeLogged) return event.shouldBeLogged;
            var logRatio = event.logRatio;
            return event.shouldBeLogged = this.logAllEvents || null == logRatio || Math.random() < logRatio;
        }, TelemetryService;
    }(), DeferredTelemetryEvent = function() {
        function DeferredTelemetryEvent(event, end) {
            this.event = event, this.end = end, this.isEnded = !1;
        }
        return DeferredTelemetryEvent.prototype.resolve = function() {
            this.isEnded || (this.isEnded = !0, this.end(this.event));
        }, DeferredTelemetryEvent.prototype.reject = function(errorDetails) {
            if (!this.isEnded) {
                this.isEnded = !0;
                var event_2 = this.event;
                event_2.info.isError = !0, event_2.info.errorSource = errorDetails && errorDetails.errorSource ? errorDetails.errorSource : powerbi.telemetry.ErrorSource.PowerBI, 
                event_2.info.errorCode = errorDetails ? errorDetails.errorCode : "UnknownError", 
                event_2.info.errorMessage = errorDetails ? errorDetails.errorMessage : void 0, this.end(event_2);
            }
        }, DeferredTelemetryEvent;
    }();
    powerbi.DeferredTelemetryEvent = DeferredTelemetryEvent;
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    function createUserActivityContextService() {
        return new UserActivityContextService();
    }
    powerbi.createUserActivityContextService = createUserActivityContextService;
    var ActivityContext = function() {
        function ActivityContext(activityName, activityId) {
            this.activityName = activityName, activityId && (this.activityId = activityId);
        }
        return ActivityContext;
    }();
    powerbi.ActivityContext = ActivityContext;
    var UserActivityContextService = function() {
        function UserActivityContextService() {
            UserActivityContextService.currentActivityContextStack = [];
        }
        return UserActivityContextService.prototype.pushParentContext = function(telemetryEvent) {
            telemetryEvent && (this.spliceParentContextStack(telemetryEvent.name, !0), UserActivityContextService.currentActivityContextStack.push(new ActivityContext(telemetryEvent.name, telemetryEvent.id)));
        }, UserActivityContextService.prototype.popParentContext = function(telemetryEvent) {
            telemetryEvent && this.spliceParentContextStack(telemetryEvent.name);
        }, UserActivityContextService.prototype.getParentContext = function() {
            var length = UserActivityContextService.currentActivityContextStack.length;
            if (length > 0) return UserActivityContextService.currentActivityContextStack[length - 1];
        }, UserActivityContextService.prototype.getRootContext = function() {
            var length = UserActivityContextService.currentActivityContextStack.length;
            if (length > 0) return UserActivityContextService.currentActivityContextStack[0];
        }, UserActivityContextService.prototype.spliceParentContextStack = function(activityName, isClearOperation) {
            for (var stack = UserActivityContextService.currentActivityContextStack, index = stack.length; index-- > 0; ) if (stack[index].activityName === activityName) return void (isClearOperation ? stack.splice(0, index + 1) : stack.splice(index, 1));
        }, UserActivityContextService;
    }();
}(powerbi || (powerbi = {}));

var InJs;

!function(InJs) {
    var UnlocalizedStrings;
    !function(UnlocalizedStrings) {
        UnlocalizedStrings.infoNavErrorCodeTemplate = "{0} ({1})", UnlocalizedStrings.errorCodeText = "Error Code", 
        UnlocalizedStrings.errorActivityIdText = "Activity Id", UnlocalizedStrings.errorRequestIdText = "Request Id", 
        UnlocalizedStrings.correlationIdText = "Correlation Id", UnlocalizedStrings.errorLineNumberText = "Line number", 
        UnlocalizedStrings.errorColumnNumberText = "Column number", UnlocalizedStrings.errorStackTraceText = "Stack trace", 
        UnlocalizedStrings.errorSourceFileText = "Source file", UnlocalizedStrings.errorTimestampText = "Time", 
        UnlocalizedStrings.showDetailsText = "Show technical details", UnlocalizedStrings.dialogCloseActionLabel = "Close", 
        UnlocalizedStrings.dialogRefreshPageActionLabel = "Refresh Page", UnlocalizedStrings.errorDialogTitle = "oops, something went wrong", 
        UnlocalizedStrings.unsupportedBrowserMessageTitle = "Unsupported browser detected", 
        UnlocalizedStrings.unsupportedBrowserMessageText = "Power BI Q&A requires Internet Explorer 10 or higher, please upgrade your browser and try again", 
        UnlocalizedStrings.errorDialogHelperText = "Please try again later or contact support. If you contact support, please provide these details.";
    }(UnlocalizedStrings = InJs.UnlocalizedStrings || (InJs.UnlocalizedStrings = {}));
}(InJs || (InJs = {}));

var jsCommon;

!function(jsCommon) {
    var BrowserUtility;
    !function(BrowserUtility) {
        function isBrowserSupported() {
            return browserSupportsEssentials() && supportsFunctionBind() && supportsCors();
        }
        function browserSupportsEssentials() {
            return supportsDefineProperty();
        }
        function isInternetExplorerBrowser() {
            var agent = window.navigator.userAgent.toLowerCase();
            return agent.indexOf("msie ") > -1 || agent.indexOf("trident/") > -1;
        }
        function getInternetExplorerVersion() {
            var retValue = 0;
            if ("Microsoft Internet Explorer" === navigator.appName || window.navigator.userAgent.indexOf("MSIE") >= 0) {
                var re = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})"), result = re.exec(window.navigator.userAgent);
                result && (retValue = parseFloat(result[1]));
            }
            return retValue;
        }
        function supportsDefineProperty() {
            if (!Object.defineProperty) return !1;
            try {
                var customObject = {}, propertyDescriptor = {
                    get: function() {
                        return !0;
                    },
                    enumerable: !0,
                    configurable: !1
                };
                return Object.defineProperty(customObject, "customProperty", propertyDescriptor), 
                !0;
            } catch (e) {
                return !1;
            }
        }
        function supportsFunctionBind() {
            return !!Function.prototype.bind;
        }
        function supportsCors() {
            return $.support.cors;
        }
        BrowserUtility.isBrowserSupported = isBrowserSupported, BrowserUtility.browserSupportsEssentials = browserSupportsEssentials, 
        BrowserUtility.isInternetExplorerBrowser = isInternetExplorerBrowser, BrowserUtility.getInternetExplorerVersion = getInternetExplorerVersion;
    }(BrowserUtility = jsCommon.BrowserUtility || (jsCommon.BrowserUtility = {}));
}(jsCommon || (jsCommon = {}));

var jsCommon;

!function(jsCommon) {
    var CookieUtil;
    !function(CookieUtil) {
        function getCookie(key, window) {
            if (window && window.document && window.document.cookie) for (var keyValuePairs = window.document.cookie.split(";"), _i = 0, keyValuePairs_1 = keyValuePairs; _i < keyValuePairs_1.length; _i++) {
                var keyValuePair = keyValuePairs_1[_i], split = keyValuePair.split("=");
                if (split.length > 0 && split[0].trim() === key) return split[1];
            }
        }
        function setCookie(key, value, window) {
            window && window.document && (window.document.cookie = key + " = " + value + ";secure");
        }
        CookieUtil.getCookie = getCookie, CookieUtil.setCookie = setCookie;
    }(CookieUtil = jsCommon.CookieUtil || (jsCommon.CookieUtil = {}));
}(jsCommon || (jsCommon = {}));

var jsCommon;

!function(jsCommon) {
    var HttpUtils;
    !function(HttpUtils) {
        function clientAndServerRequestIdMatch(result) {
            return result && result.requestId && result.responseRequestId ? result.requestId === result.responseRequestId : null;
        }
        function getResponseRequestId(result) {
            return result && result.responseRequestId ? result.responseRequestId : null;
        }
        HttpUtils.clientAndServerRequestIdMatch = clientAndServerRequestIdMatch, HttpUtils.getResponseRequestId = getResponseRequestId;
    }(HttpUtils = jsCommon.HttpUtils || (jsCommon.HttpUtils = {}));
}(jsCommon || (jsCommon = {}));

var InJs;

!function(InJs) {
    InJs.RtlDirAttrVal = "rtl";
    var InfoNavUtility;
    !function(InfoNavUtility) {
        function constructShowDetailsContainer(additionalErrorInfo, localizedString) {
            var additionalErrorInfoContainer = $("<div />"), showDetailsLink = $("<a class=\"showAdditionalDetailsLink\" href='javascript:' />");
            return showDetailsLink.addClass(infonavShowAdditionalErrorClass), showDetailsLink.text(localizedString || InJs.UnlocalizedStrings.showDetailsText), 
            showDetailsLink.on(jsCommon.DOMConstants.mouseClickEventName, function(e) {
                additionalErrorInfoContainer.find(jsCommon.Utility.createClassSelector(infonavShowAdditionalErrorClass)).remove(), 
                additionalErrorInfoContainer.find(jsCommon.Utility.createClassSelector(infonavAdditionalErrorClass)).css(jsCommon.CssConstants.displayProperty, jsCommon.CssConstants.blockValue);
            }), additionalErrorInfo.css(jsCommon.CssConstants.displayProperty, jsCommon.CssConstants.noneValue), 
            additionalErrorInfo.addClass(infonavAdditionalErrorClass), additionalErrorInfoContainer.append(showDetailsLink), 
            additionalErrorInfoContainer.append(additionalErrorInfo), additionalErrorInfoContainer;
        }
        function constructErrorField(fieldTitle, fieldValue) {
            var retValue = $(infoNavErrorInfoFieldTemplate.replace("{FieldTitle}", fieldTitle));
            return retValue.find(".infonav-errorInfoText").multiline(fieldValue), retValue;
        }
        function isRTL() {
            var getDirAttr = $("html").attr("dir");
            return getDirAttr === InJs.RtlDirAttrVal;
        }
        var infonavAdditionalErrorClass = "infonav-additionalError", infonavShowAdditionalErrorClass = "infonav-showAdditionalError", infoNavErrorInfoFieldTemplate = '<div class="infonav-errorInfoItem"><span class="infonav-errorInfoHeader">{FieldTitle}</span><span class="infonav-errorInfoText">{FieldValue}</span></div>';
        InfoNavUtility.constructShowDetailsContainer = constructShowDetailsContainer, InfoNavUtility.constructErrorField = constructErrorField, 
        InfoNavUtility.isRTL = isRTL;
    }(InfoNavUtility = InJs.InfoNavUtility || (InJs.InfoNavUtility = {}));
}(InJs || (InJs = {}));

var jsCommon;

!function(jsCommon) {
    var JsonExtensions;
    !function(JsonExtensions) {
        function tryParseJSON(jsonString, reviver, logExceptions) {
            try {
                return JSON.parse(jsonString, reviver);
            } catch (ex) {}
        }
        function isJsonString(jsonString) {
            if (jsonString && "string" == typeof jsonString) {
                try {
                    JSON.parse(jsonString);
                } catch (e) {
                    return !1;
                }
                return !0;
            }
            return !1;
        }
        JsonExtensions.tryParseJSON = tryParseJSON, JsonExtensions.isJsonString = isJsonString;
    }(JsonExtensions = jsCommon.JsonExtensions || (jsCommon.JsonExtensions = {}));
}(jsCommon || (jsCommon = {}));

var jsCommon;

!function(jsCommon) {
    var MathExtensions;
    !function(MathExtensions) {
        function min(number1, number2) {
            return null == number1 || isNaN(number1) ? number2 : null == number2 || isNaN(number2) ? number1 : Math.min(number1, number2);
        }
        function max(number1, number2) {
            return null == number1 || isNaN(number1) ? number2 : null == number2 || isNaN(number2) ? number1 : Math.max(number1, number2);
        }
        MathExtensions.min = min, MathExtensions.max = max;
    }(MathExtensions = jsCommon.MathExtensions || (jsCommon.MathExtensions = {}));
}(jsCommon || (jsCommon = {}));

var jsCommon;

!function(jsCommon) {
    var iFrameUtility;
    !function(iFrameUtility) {
        function isHostedInIFrame() {
            try {
                return window.self !== window.top;
            } catch (e) {
                return !0;
            }
        }
        function isHostedInCrossDomainIFrame() {
            return isHostedInIFrame() && getHostName(document.referrer) !== getHostName(document.URL);
        }
        function getHostName(url) {
            if (url && "" !== url.trim()) {
                var elem = document.createElement("a");
                return elem.href = url, elem.hostname;
            }
            return "";
        }
        iFrameUtility.isHostedInIFrame = isHostedInIFrame, iFrameUtility.isHostedInCrossDomainIFrame = isHostedInCrossDomainIFrame, 
        iFrameUtility.getHostName = getHostName;
    }(iFrameUtility = jsCommon.iFrameUtility || (jsCommon.iFrameUtility = {}));
    var GzipUtility;
    !function(GzipUtility) {
        function uncompress(encoded) {
            if (encoded) try {
                var decoded = atob(encoded), uncompressed = pako.inflate(decoded, {
                    to: "string"
                });
                return uncompressed;
            } catch (e) {
                jsCommon.Trace.error("Error while uncompressing TileData: " + JSON.stringify(e), null == e.stack);
            }
            return null;
        }
        function compress(data) {
            if (data) try {
                var compressed = pako.gzip(data, {
                    to: "string"
                }), encoded = btoa(compressed);
                return encoded;
            } catch (e) {
                jsCommon.Trace.error("Error while compressing TileData: " + JSON.stringify(e), null == e.stack);
            }
            return null;
        }
        GzipUtility.uncompress = uncompress, GzipUtility.compress = compress;
    }(GzipUtility = jsCommon.GzipUtility || (jsCommon.GzipUtility = {}));
}(jsCommon || (jsCommon = {}));