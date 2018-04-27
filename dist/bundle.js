/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ImageManager.ts":
/*!*****************************!*\
  !*** ./src/ImageManager.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = __webpack_require__(/*! ./Subscriber */ "./src/Subscriber.ts");
var ImageManager = /** @class */ (function () {
    function ImageManager(selector) {
        this.pendingRequests = [];
        this.processedRequests = [];
        this.loadMap = [];
        this.maxIndexProcessed = 0;
        this.onEnterVisibleArea = this.onEnterVisibleArea.bind(this);
        this.loadImage = this.loadImage.bind(this);
        this.processImage = this.processImage.bind(this);
        this.visibilityObserver = new IntersectionObserver(this.onEnterVisibleArea, this.getIntersectionOptions());
        this.images = document.querySelectorAll(selector);
        console.log(this.images.length);
        for (var i = 0; i < this.images.length; i++) {
            this.visibilityObserver.observe(this.images[i]);
        }
    }
    ImageManager.prototype.onEnterVisibleArea = function (changes, observer) {
        var _this = this;
        changes.filter(function (c) { return c.isIntersecting; })
            .forEach(function (change, index) {
            var id = change.target.getAttribute("data-id");
            if (_this.pendingRequests.filter(function (p) { return p.LazyImageProps.id === id; }).length === 0) {
                _this.pendingRequests.push(new Subscriber_1.Subscriber({
                    order: index,
                    id: id,
                    src: change.target.children[0].getAttribute("data-src")
                }, change.target.getElementsByTagName("img")[0]));
            }
        });
        var toRemoveIDs = changes
            .filter(function (c) { return !c.isIntersecting; })
            .map(function (c) { return c.target.getAttribute("data-id"); });
        console.log("REMOVED: ", toRemoveIDs);
        this.pendingRequests = this.pendingRequests.filter(function (r) { return toRemoveIDs.filter(function (t) { return t === r.LazyImageProps.id; }).length === 0; });
        console.log("PENDING ", this.pendingRequests.map(function (p) { return p.LazyImageProps.id; }));
        this.pendingRequests.forEach(this.loadImage);
    };
    ImageManager.prototype.loadImage = function (subscriber) {
        var _this = this;
        setTimeout(function () {
            var img = new Image();
            if (subscriber.LazyImageProps.src) {
                img.src = decodeURI(subscriber.LazyImageProps.src);
                img.onerror = function () {
                    _this.processImage(subscriber, false);
                };
                img.onload = function () {
                    _this.processImage(subscriber, true);
                };
            }
            else {
                _this.processImage(subscriber, false);
            }
        }, Math.random() * 5000);
    };
    ImageManager.prototype.processImage = function (subscriber, success) {
        console.log("---process image --- ", subscriber.LazyImageProps.order);
        this.processedRequests.push(subscriber);
        var sorted = this.processedRequests.sort(function (r) { return r.LazyImageProps.order; });
        console.log("sorted len: ", sorted.length);
        for (var index = 0; index < sorted.length; index++) {
            if (sorted[index].LazyImageProps.order === this.maxIndexProcessed) {
                sorted[index].Target.src = sorted[index].LazyImageProps.src;
                this.maxIndexProcessed = sorted[index].LazyImageProps.order + 1;
                console.log("MAX INDEX:", this.maxIndexProcessed);
            }
        }
    };
    ImageManager.prototype.getIntersectionOptions = function () {
        return {
            root: null,
            rootMargin: '0px',
            threshold: 0 //any part of element is visible
        };
    };
    return ImageManager;
}());
exports.ImageManager = ImageManager;


/***/ }),

/***/ "./src/Subscriber.ts":
/*!***************************!*\
  !*** ./src/Subscriber.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber = /** @class */ (function () {
    function Subscriber(props, target) {
        this.LazyImageProps = props;
        this.Target = target;
    }
    Subscriber.prototype.onLoadComplete = function () {
        this.Target.src = this.LazyImageProps.src;
    };
    return Subscriber;
}());
exports.Subscriber = Subscriber;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ImageManager_1 = __webpack_require__(/*! ./ImageManager */ "./src/ImageManager.ts");
var manager = new ImageManager_1.ImageManager(".item");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0ltYWdlTWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU3Vic2NyaWJlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ25FQSxrRkFBMEM7QUFFMUM7SUFRSSxzQkFBWSxRQUFnQjtRQUxwQixvQkFBZSxHQUFpQixFQUFFLENBQUM7UUFDbkMsc0JBQWlCLEdBQWlCLEVBQUUsQ0FBQztRQUNyQyxZQUFPLEdBQWMsRUFBRSxDQUFDO1FBQ3hCLHNCQUFpQixHQUFXLENBQUMsQ0FBQztRQUdsQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7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LENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQztnQkFDNUQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDaEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7YUFDckQ7U0FDSjtJQUNMLENBQUM7SUFFTyw2Q0FBc0IsR0FBOUI7UUFDSSxPQUFPO1lBQ0gsSUFBSSxFQUFFLElBQUk7WUFDVixVQUFVLEVBQUUsS0FBSztZQUNqQixTQUFTLEVBQUUsQ0FBQyxDQUFDLGdDQUFnQztTQUNoRDtJQUNMLENBQUM7SUFDTCxtQkFBQztBQUFELENBQUM7QUF4Rlksb0NBQVk7Ozs7Ozs7Ozs7Ozs7OztBQ0F6QjtJQUlJLG9CQUFhLEtBQXNCLEVBQUUsTUFBVztRQUM1QyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRU0sbUNBQWMsR0FBckI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQztJQUM5QyxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQUFDO0FBWlksZ0NBQVU7Ozs7Ozs7Ozs7Ozs7OztBQ0Z2Qix3RkFBNEM7QUFHNUMsSUFBTSxPQUFPLEdBQUcsSUFBSSwyQkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tIFwiLi9TdWJzY3JpYmVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSW1hZ2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgaW1hZ2VzOiBOb2RlTGlzdE9mPEVsZW1lbnQ+O1xyXG4gICAgcHJpdmF0ZSB2aXNpYmlsaXR5T2JzZXJ2ZXI6IEludGVyc2VjdGlvbk9ic2VydmVyO1xyXG4gICAgcHJpdmF0ZSBwZW5kaW5nUmVxdWVzdHM6IFN1YnNjcmliZXJbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBwcm9jZXNzZWRSZXF1ZXN0czogU3Vic2NyaWJlcltdID0gW107XHJcbiAgICBwcml2YXRlIGxvYWRNYXA6IGJvb2xlYW5bXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBtYXhJbmRleFByb2Nlc3NlZDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzZWxlY3Rvcjogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5vbkVudGVyVmlzaWJsZUFyZWEgPSB0aGlzLm9uRW50ZXJWaXNpYmxlQXJlYS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMubG9hZEltYWdlID0gdGhpcy5sb2FkSW1hZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnByb2Nlc3NJbWFnZSA9IHRoaXMucHJvY2Vzc0ltYWdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy52aXNpYmlsaXR5T2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIodGhpcy5vbkVudGVyVmlzaWJsZUFyZWEsIHRoaXMuZ2V0SW50ZXJzZWN0aW9uT3B0aW9ucygpKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmltYWdlcy5sZW5ndGgpXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmltYWdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnZpc2liaWxpdHlPYnNlcnZlci5vYnNlcnZlKHRoaXMuaW1hZ2VzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkVudGVyVmlzaWJsZUFyZWEoY2hhbmdlczogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeVtdLCBvYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIHtcclxuICAgICAgICBjaGFuZ2VzLmZpbHRlcihjID0+IGMuaXNJbnRlcnNlY3RpbmcpXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKChjaGFuZ2UsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9IGNoYW5nZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBlbmRpbmdSZXF1ZXN0cy5maWx0ZXIocCA9PiBwLkxhenlJbWFnZVByb3BzLmlkID09PSBpZCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nUmVxdWVzdHMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFN1YnNjcmliZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXI6IDxudW1iZXI+aW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogPHN0cmluZz5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogPHN0cmluZz5jaGFuZ2UudGFyZ2V0LmNoaWxkcmVuWzBdLmdldEF0dHJpYnV0ZShcImRhdGEtc3JjXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGNoYW5nZS50YXJnZXQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbWdcIilbMF0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRvUmVtb3ZlSURzID0gY2hhbmdlc1xyXG4gICAgICAgICAgICAuZmlsdGVyKGMgPT4gIWMuaXNJbnRlcnNlY3RpbmcpXHJcbiAgICAgICAgICAgIC5tYXAoYyA9PiBjLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSRU1PVkVEOiBcIiwgdG9SZW1vdmVJRHMpO1xyXG5cclxuICAgICAgICB0aGlzLnBlbmRpbmdSZXF1ZXN0cyA9IHRoaXMucGVuZGluZ1JlcXVlc3RzLmZpbHRlcihyID0+IHRvUmVtb3ZlSURzLmZpbHRlcih0ID0+IHQgPT09IHIuTGF6eUltYWdlUHJvcHMuaWQpLmxlbmd0aCA9PT0gMCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUEVORElORyBcIiwgdGhpcy5wZW5kaW5nUmVxdWVzdHMubWFwKHAgPT4gcC5MYXp5SW1hZ2VQcm9wcy5pZCkpO1xyXG4gICAgICAgIHRoaXMucGVuZGluZ1JlcXVlc3RzLmZvckVhY2godGhpcy5sb2FkSW1hZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZEltYWdlKHN1YnNjcmliZXI6IFN1YnNjcmliZXIpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgIGlmIChzdWJzY3JpYmVyLkxhenlJbWFnZVByb3BzLnNyYykge1xyXG4gICAgICAgICAgICAgICAgaW1nLnNyYyA9IGRlY29kZVVSSShzdWJzY3JpYmVyLkxhenlJbWFnZVByb3BzLnNyYyk7XHJcbiAgICAgICAgICAgICAgICBpbWcub25lcnJvciA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NJbWFnZShzdWJzY3JpYmVyLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NJbWFnZShzdWJzY3JpYmVyLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NJbWFnZShzdWJzY3JpYmVyLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBNYXRoLnJhbmRvbSgpICogNTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwcm9jZXNzSW1hZ2Uoc3Vic2NyaWJlcjogU3Vic2NyaWJlciwgc3VjY2VzczogYm9vbGVhbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS0tcHJvY2VzcyBpbWFnZSAtLS0gXCIsIHN1YnNjcmliZXIuTGF6eUltYWdlUHJvcHMub3JkZXIpO1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc2VkUmVxdWVzdHMucHVzaChzdWJzY3JpYmVyKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc29ydGVkID0gdGhpcy5wcm9jZXNzZWRSZXF1ZXN0cy5zb3J0KHIgPT4gci5MYXp5SW1hZ2VQcm9wcy5vcmRlcik7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic29ydGVkIGxlbjogXCIsIHNvcnRlZC5sZW5ndGgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc29ydGVkLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAoc29ydGVkW2luZGV4XS5MYXp5SW1hZ2VQcm9wcy5vcmRlciA9PT0gdGhpcy5tYXhJbmRleFByb2Nlc3NlZCkge1xyXG4gICAgICAgICAgICAgICAgc29ydGVkW2luZGV4XS5UYXJnZXQuc3JjID0gc29ydGVkW2luZGV4XS5MYXp5SW1hZ2VQcm9wcy5zcmM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1heEluZGV4UHJvY2Vzc2VkID0gc29ydGVkW2luZGV4XS5MYXp5SW1hZ2VQcm9wcy5vcmRlciArIDE7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1BWCBJTkRFWDpcIiwgdGhpcy5tYXhJbmRleFByb2Nlc3NlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRJbnRlcnNlY3Rpb25PcHRpb25zKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJvb3Q6IG51bGwsIC8vdmlzaWJsZSBmb3Igdmlld3BvcnRcclxuICAgICAgICAgICAgcm9vdE1hcmdpbjogJzBweCcsXHJcbiAgICAgICAgICAgIHRocmVzaG9sZDogMCAvL2FueSBwYXJ0IG9mIGVsZW1lbnQgaXMgdmlzaWJsZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0lMYXp5SW1hZ2VQcm9wc30gZnJvbSBcIi4vSUxhenlJbWFnZVByb3BzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU3Vic2NyaWJlcntcclxuICAgIHB1YmxpYyBUYXJnZXQ6IGFueTtcclxuICAgIHB1YmxpYyBMYXp5SW1hZ2VQcm9wczogSUxhenlJbWFnZVByb3BzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBwcm9wczogSUxhenlJbWFnZVByb3BzLCB0YXJnZXQ6IGFueSl7XHJcbiAgICAgICAgdGhpcy5MYXp5SW1hZ2VQcm9wcyA9IHByb3BzO1xyXG4gICAgICAgIHRoaXMuVGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkxvYWRDb21wbGV0ZSgpe1xyXG4gICAgICAgIHRoaXMuVGFyZ2V0LnNyYyA9IHRoaXMuTGF6eUltYWdlUHJvcHMuc3JjO1xyXG4gICAgfSAgICBcclxufSIsImltcG9ydCB7SW1hZ2VNYW5hZ2VyfSBmcm9tIFwiLi9JbWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHtTdWJzY3JpYmVyfSBmcm9tIFwiLi9TdWJzY3JpYmVyXCI7XHJcblxyXG5jb25zdCBtYW5hZ2VyID0gbmV3IEltYWdlTWFuYWdlcihcIi5pdGVtXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=