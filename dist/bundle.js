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
var ImageManager = /** @class */ (function () {
    function ImageManager(selector) {
        this.pendingRequests = [];
        this.processedRequests = [];
        this.onEnterVisibleArea = this.onEnterVisibleArea.bind(this);
        this.visibilityObserver = new IntersectionObserver(this.onEnterVisibleArea, this.getIntersectionOptions());
        this.images = document.querySelectorAll(selector);
        console.log(this.images.length);
        for (var i = 0; i < this.images.length; i++) {
            this.visibilityObserver.observe(this.images[i]);
        }
    }
    // TODO - check what happens in reverse scroll direction
    ImageManager.prototype.onEnterVisibleArea = function (changes, observer) {
        var _this = this;
        changes.forEach(function (change) {
            if (change.isIntersecting) {
                var id_1 = change.target.getAttribute("data-id");
                if (_this.pendingRequests.filter(function (p) { return p.id === id_1; }).length === 0) {
                    _this.pendingRequests.push({
                        id: change.target.getAttribute("data-id"),
                        src: change.target.children[0].getAttribute("data-src")
                    });
                }
            }
        });
        var toRemoveIDs = changes
            .filter(function (c) { return !c.isIntersecting; })
            .map(function (c) { return c.target.getAttribute("data-id"); });
        console.log("toRemove: ", toRemoveIDs);
        this.pendingRequests = this.pendingRequests.filter(function (r) { return toRemoveIDs.filter(function (t) { return t === r.id; }).length === 0; });
        console.log("PENDING ", this.pendingRequests.map(function (p) { return p.id; }));
    };
    ImageManager.prototype.getIntersectionOptions = function () {
        return {
            root: null,
            rootMargin: '0px',
            threshold: 0
        };
    };
    return ImageManager;
}());
exports.ImageManager = ImageManager;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0ltYWdlTWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ25FQTtJQU1JLHNCQUFZLFFBQWdCO1FBSHBCLG9CQUFlLEdBQVUsRUFBRSxDQUFDO1FBQzVCLHNCQUFpQixHQUFVLEVBQUUsQ0FBQztRQUdsQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQztRQUUzRyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuRDtJQUNMLENBQUM7SUFFRCx3REFBd0Q7SUFDaEQseUNBQWtCLEdBQTFCLFVBQTJCLE9BQW9DLEVBQUUsUUFBOEI7UUFBL0YsaUJBb0JDO1FBbkJHLE9BQU8sQ0FBQyxPQUFPLENBQUMsZ0JBQU07WUFDbEIsSUFBSSxNQUFNLENBQUMsY0FBYyxFQUFFO2dCQUN2QixJQUFNLElBQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDakQsSUFBSSxLQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLEVBQUUsS0FBSyxJQUFFLEVBQVgsQ0FBVyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDNUQsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7d0JBQ3RCLEVBQUUsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7d0JBQ3pDLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDO3FCQUMxRCxDQUFDLENBQUM7aUJBQ047YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBTSxXQUFXLEdBQUcsT0FBTzthQUN0QixNQUFNLENBQUMsV0FBQyxJQUFJLFFBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBakIsQ0FBaUIsQ0FBQzthQUM5QixHQUFHLENBQUMsV0FBQyxJQUFJLFFBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQUM7UUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBRSxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxXQUFDLElBQUksa0JBQVcsQ0FBQyxNQUFNLENBQUMsV0FBQyxJQUFJLFFBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFWLENBQVUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQWhELENBQWdELENBQUMsQ0FBQztRQUMxRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBRSxXQUFDLElBQUksUUFBQyxDQUFDLEVBQUUsRUFBSixDQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTyw2Q0FBc0IsR0FBOUI7UUFDSSxPQUFPO1lBQ0gsSUFBSSxFQUFFLElBQUk7WUFDVixVQUFVLEVBQUUsS0FBSztZQUNqQixTQUFTLEVBQUUsQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FBQztBQS9DWSxvQ0FBWTs7Ozs7Ozs7Ozs7Ozs7O0FDQXpCLHdGQUE0QztBQUc1QyxJQUFNLE9BQU8sR0FBRyxJQUFJLDJCQUFZLENBQUMsT0FBTyxDQUFDLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiZXhwb3J0IGNsYXNzIEltYWdlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGltYWdlczogTm9kZUxpc3RPZjxFbGVtZW50PjtcclxuICAgIHByaXZhdGUgdmlzaWJpbGl0eU9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlcjtcclxuICAgIHByaXZhdGUgcGVuZGluZ1JlcXVlc3RzOiBhbnlbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBwcm9jZXNzZWRSZXF1ZXN0czogYW55W10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzZWxlY3Rvcjogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5vbkVudGVyVmlzaWJsZUFyZWEgPSB0aGlzLm9uRW50ZXJWaXNpYmxlQXJlYS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMudmlzaWJpbGl0eU9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKHRoaXMub25FbnRlclZpc2libGVBcmVhLCB0aGlzLmdldEludGVyc2VjdGlvbk9wdGlvbnMoKSk7XHJcblxyXG4gICAgICAgIHRoaXMuaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5pbWFnZXMubGVuZ3RoKVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5pbWFnZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy52aXNpYmlsaXR5T2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmltYWdlc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFRPRE8gLSBjaGVjayB3aGF0IGhhcHBlbnMgaW4gcmV2ZXJzZSBzY3JvbGwgZGlyZWN0aW9uXHJcbiAgICBwcml2YXRlIG9uRW50ZXJWaXNpYmxlQXJlYShjaGFuZ2VzOiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5W10sIG9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlcikge1xyXG4gICAgICAgIGNoYW5nZXMuZm9yRWFjaChjaGFuZ2UgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2hhbmdlLmlzSW50ZXJzZWN0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9IGNoYW5nZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBlbmRpbmdSZXF1ZXN0cy5maWx0ZXIocCA9PiBwLmlkID09PSBpZCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nUmVxdWVzdHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjaGFuZ2UudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogY2hhbmdlLnRhcmdldC5jaGlsZHJlblswXS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRvUmVtb3ZlSURzID0gY2hhbmdlc1xyXG4gICAgICAgICAgICAuZmlsdGVyKGMgPT4gIWMuaXNJbnRlcnNlY3RpbmcpXHJcbiAgICAgICAgICAgIC5tYXAoYyA9PiBjLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coIFwidG9SZW1vdmU6IFwiLCB0b1JlbW92ZUlEcyk7XHJcblxyXG4gICAgICAgIHRoaXMucGVuZGluZ1JlcXVlc3RzID0gdGhpcy5wZW5kaW5nUmVxdWVzdHMuZmlsdGVyKHIgPT4gdG9SZW1vdmVJRHMuZmlsdGVyKHQgPT4gdCA9PT0gci5pZCkubGVuZ3RoID09PSAwKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlBFTkRJTkcgXCIsIHRoaXMucGVuZGluZ1JlcXVlc3RzLm1hcCggcCA9PiBwLmlkKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRJbnRlcnNlY3Rpb25PcHRpb25zKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJvb3Q6IG51bGwsIC8vdmlzaWJsZSBmb3Igdmlld3BvcnRcclxuICAgICAgICAgICAgcm9vdE1hcmdpbjogJzBweCcsXHJcbiAgICAgICAgICAgIHRocmVzaG9sZDogMFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7SW1hZ2VNYW5hZ2VyfSBmcm9tIFwiLi9JbWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHtTdWJzY3JpYmVyfSBmcm9tIFwiLi9TdWJzY3JpYmVyXCI7XHJcblxyXG5jb25zdCBtYW5hZ2VyID0gbmV3IEltYWdlTWFuYWdlcihcIi5pdGVtXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=