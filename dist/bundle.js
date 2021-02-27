/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/bounding-boxes/dist/bounding-boxes.js":
/*!************************************************************!*\
  !*** ./node_modules/bounding-boxes/dist/bounding-boxes.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BoundingBox = void 0;
/**
 * The BoundingBox class contains the 2d coordinates of a point,
 * and has some useful functions such as
 *  - `containsPoint(x, y)`
 *  - `intersects(other)`
 *  - `intersection(other)`
 *  - `union(other)`
 *  - `smallestBoxEnclosing(...boxes)`
 *
 * Note that the the points are always ordered: x1 is always smaller than x2,
 * and y1 is always smaller than y2.
 *
 * Because of this, height and width are always positive.
 */
var BoundingBox = /** @class */ (function () {
    /** Constructs an instance from corners coordinates. */
    function BoundingBox(x1, y1, x2, y2) {
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
        this.order();
    }
    Object.defineProperty(BoundingBox.prototype, "height", {
        /** The bounding box's height. */
        get: function () {
            return this.y2 - this.y1;
        },
        set: function (v) {
            this.y2 = this.y1 + v;
            this.orderY();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "h", {
        /** The shorter way to the bbox's height .*/
        get: function () {
            return this.height;
        },
        set: function (v) {
            this.height = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "width", {
        /** The bounding box's width */
        get: function () {
            return this.x2 - this.x1;
        },
        set: function (v) {
            this.x2 = this.x1 + v;
            this.orderX();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "w", {
        /** The shorter way to the bbox's width. */
        get: function () {
            return this.width;
        },
        set: function (v) {
            this.width = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "x1", {
        /** The bounding box's first corner's x. */
        get: function () {
            return this._x1;
        },
        set: function (v) {
            this._x1 = v;
            this.orderX();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "y1", {
        /** The bounding box's first corner's y. */
        get: function () {
            return this._y1;
        },
        set: function (v) {
            this._y1 = v;
            this.orderY();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "x2", {
        /** The bounding box's second corner's x .*/
        get: function () {
            return this._x2;
        },
        set: function (v) {
            this._x2 = v;
            this.orderX();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "y2", {
        /** The bounding box's second corner's y. */
        get: function () {
            return this._y2;
        },
        set: function (v) {
            this._y2 = v;
            this.orderY();
        },
        enumerable: false,
        configurable: true
    });
    /** Constructs an instance from a corner's coordinates (`x1` and `y1`), a height and a width. */
    BoundingBox.fromHW = function (height, width, x1, y1) {
        if (x1 === void 0) { x1 = 0; }
        if (y1 === void 0) { y1 = 0; }
        return new BoundingBox(x1, y1, x1 + width, y1 + height);
    };
    /**
     * Returns true if the point is inside the box, false otherwise.
     * @param x The point's x.
     * @param y The point's y.
     */
    BoundingBox.prototype.containsPoint = function (x, y) {
        return BoundingBox.between(x, this.x1, this.x2) && BoundingBox.between(y, this.y1, this.y2);
    };
    /**
     * @ignore
     */
    BoundingBox.between = function (x, x1, x2) {
        return x >= x1 && x <= x2;
    };
    /**
     * Returns true if the other box touches this one.
     * @param other The other bounding box.
     */
    BoundingBox.prototype.intersects = function (other) {
        return !(this.x1 > other.x2 || this.x2 < other.x1 || this.y1 > other.y2 || this.y2 < other.y1);
    };
    /**
     * Returns the smallest rectangle enclosing this BoundingBox and `other`.
     * @param other The BoundingBox with which to intersect.
     */
    BoundingBox.prototype.union = function (other) {
        return new BoundingBox(Math.min(this.x1, other.x1), Math.min(this.y1, other.y1), Math.max(this.x2, other.x2), Math.max(this.y2, other.y2));
    };
    /**
     * Returns the biggest rectangle enclosed in this BoundingBox and `other`.
     * @param other The other BoundingBox.
     */
    BoundingBox.prototype.intersection = function (other) {
        return new BoundingBox(Math.max(this.x1, other.x1), Math.max(this.y1, other.y1), Math.min(this.x2, other.x2), Math.min(this.y2, other.y2));
    };
    Object.defineProperty(BoundingBox.prototype, "x", {
        /**
         * The box's global x (lowest corner)
         * Use this property to move the box around without changing its width.
         *
         * @example
         * ```
         * a = new BoundingBox(0, 0, 10, 10);
         * // a.x = 0, a.x1 = 0, a.x2 = 10
         *
         * a.x = 10
         * // a.x = 10, a.x1 = 10, a.x2 = 20
         * ```
         */
        get: function () { return this._x1; },
        set: function (x) {
            var w = this.width;
            this._x1 = x;
            this._x2 = x + w;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "y", {
        /**
         * The box's global y (lowest corner)
         * Use this property to move the box around without changing its height.
         *
         * @example
         * ```
         * a = new BoundingBox(0, 0, 10, 10);
         * // a.y = 0, a.y1 = 0, a.y2 = 10
         *
         * a.x = 10
         * // a.y = 10, a.y1 = 10, a.y2 = 20
         * ```
         */
        get: function () { return this._y1; },
        set: function (y) {
            var h = this.height;
            this._y1 = y;
            this._y2 = y + h;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Move the bbox to these coordinates.
     *
     * @param x The new x1.
     * @param y The new y1.
     */
    BoundingBox.prototype.move = function (x, y) {
        this.x = x;
        this.y = y;
    };
    /**
     * Translate the bbox by these coordinates.
     *
     * @param x The x shift amount.
     * @param y The y shift amount.
     */
    BoundingBox.prototype.translate = function (x, y) {
        this.x += x;
        this.y += y;
    };
    /**
     * As the name states this function gives the smallest box enclosing
     * a set of boxes (`bboxes`)
     *
     * @see sme
     *
     * @static
     * @param bboxes The culprits.
     * @return {BoundingBox}
     */
    BoundingBox.smallestBoxEnclosing = function (bboxes) {
        return this.sme(bboxes);
    };
    /**
     * Smallest Box Enclosing these `bboxes`.
     *
     * @see smallestBoxEnclosing.
     *
     * @static
     * @param bboxes The culprits
     * @return {BoundingBox}
     */
    BoundingBox.sme = function (bboxes) {
        var result = new BoundingBox(0, 0, 0, 0);
        bboxes.forEach(function (bbox) {
            result = result.union(bbox);
        });
        return result;
    };
    /**
     * Return a copy of the bounding box.
     */
    BoundingBox.prototype.copy = function () {
        return new BoundingBox(this.x1, this.y1, this.x2, this.y2);
    };
    /**
     * Add a margin around the box.
     *
     * Provide a negative margin to inset the box.
     *
     * ```
     *  new__________
     *    |  ______  |
     *    | | old  | |
     *    | |      | |
     *    | |______| |
     *    |__________| |=margin
     * ```
     *
     * @param margin The spacing between the old and new box.
     */
    BoundingBox.prototype.addMargin = function (margin) {
        this._x1 -= margin;
        this._x2 += margin;
        this._y1 -= margin;
        this._y2 += margin;
        this.order();
    };
    /**
     * Adds margins around the box.
     * Note that this function uses screen coordinates: (0, 0) is the **top**-left corner.
     *
     * Provide negative margins to inset the box.
     *
     * @param left The margin to add after `x1`.
     * @param top The margin to add before `y1`.
     * @param right The margin to add before `x2`.
     * @param bottom The margin to add after `y2`.
     */
    BoundingBox.prototype.addMargins = function (left, top, right, bottom) {
        this._x1 -= left;
        this._x2 += right;
        this._y1 -= top;
        this._y2 += bottom;
        this.order();
    };
    /**
     * Ensure that x1 is smaller than x2, and swap if needed.
     * Do the same for y1 and y2.
     * @ignore
     */
    BoundingBox.prototype.order = function () {
        this.orderX();
        this.orderY();
    };
    /** @ignore */
    BoundingBox.prototype.orderX = function () {
        var _a;
        if (this.x1 > this.x2) {
            _a = [this.x2, this.x1], this.x1 = _a[0], this.x2 = _a[1];
        }
    };
    /** @ignore */
    BoundingBox.prototype.orderY = function () {
        var _a;
        if (this.y1 > this.y2) {
            _a = [this.y2, this.y1], this.y1 = _a[0], this.y2 = _a[1];
        }
    };
    return BoundingBox;
}());
exports.BoundingBox = BoundingBox;
//# sourceMappingURL=bounding-boxes.js.map

/***/ }),

/***/ "./src/bb-bluetooth.ts":
/*!*****************************!*\
  !*** ./src/bb-bluetooth.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BbBluetooth": () => (/* binding */ BbBluetooth)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class BbBluetooth {
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            return navigator.bluetooth.requestDevice({
                filters: [{
                        name: "ENTRALPI"
                    }
                ],
                optionalServices: [
                    // "f000ffc0-0451-4000-b000-000000000000", // blocklisted
                    // "0000180a-0000-1000-8000-00805f9b34fb",
                    // "0000180f-0000-1000-8000-00805f9b34fb",
                    // "00001801-0000-1000-8000-00805f9b34fb",
                    "0000fff0-0000-1000-8000-00805f9b34fb",
                ],
            })
                .then((device) => {
                if (!device.gatt) {
                    throw new Error("No gatt server");
                }
                return device.gatt.connect();
            })
                .then(server => {
                return server.getPrimaryService("0000fff0-0000-1000-8000-00805f9b34fb");
            })
                .then(service => {
                return service.getCharacteristic("0000fff4-0000-1000-8000-00805f9b34fb");
            })
                .then(characteristic => {
                if (characteristic.properties.notify) {
                    characteristic.addEventListener('characteristicvaluechanged', ev => {
                        var _a;
                        // cast to any to disable warning about value not being a property of event handler.
                        const target = ev.target;
                        if ((_a = target === null || target === void 0 ? void 0 : target.value) === null || _a === void 0 ? void 0 : _a.getInt16(0)) {
                            BbBluetooth.data = target.value.getInt16(0);
                        }
                        else {
                            // console.log(target);
                        }
                    });
                    characteristic.startNotifications();
                }
                else {
                    console.error("Cannot be notified by characteristic?... Weird");
                }
            })
                .catch(error => {
                console.log('Argh! ' + error);
            });
        });
    }
}
BbBluetooth.data = -1;


/***/ }),

/***/ "./src/bb-element.ts":
/*!***************************!*\
  !*** ./src/bb-element.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BbElement": () => (/* binding */ BbElement)
/* harmony export */ });
/* harmony import */ var bounding_boxes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bounding-boxes */ "./node_modules/bounding-boxes/dist/bounding-boxes.js");

class BbElement {
    constructor() {
        this.bb = new bounding_boxes__WEBPACK_IMPORTED_MODULE_0__.BoundingBox(0, 0, 0, 0);
    }
    // Paint all children
    paint(ctx) {
        return;
    }
    move(scene) {
        return;
    }
}


/***/ }),

/***/ "./src/bb-game.ts":
/*!************************!*\
  !*** ./src/bb-game.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BbGame": () => (/* binding */ BbGame)
/* harmony export */ });
/* harmony import */ var _bb_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bb-element */ "./src/bb-element.ts");
/* harmony import */ var _bb_mouse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bb-mouse */ "./src/bb-mouse.ts");
/* harmony import */ var _bb_pacman__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bb-pacman */ "./src/bb-pacman.ts");
/* harmony import */ var _bb_player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bb-player */ "./src/bb-player.ts");
/* harmony import */ var _bb_score__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bb-score */ "./src/bb-score.ts");
/* harmony import */ var _bb_target__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./bb-target */ "./src/bb-target.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






class BbGame extends _bb_element__WEBPACK_IMPORTED_MODULE_0__.BbElement {
    constructor() {
        super();
        this.playing = false;
        _bb_mouse__WEBPACK_IMPORTED_MODULE_1__.BbMouse.init();
        const container = document.body;
        container.style.margin = '0px';
        container.style.height = `${window.innerHeight}px`;
        const canvas = document.createElement("canvas");
        canvas.style.display = "block";
        canvas.style.position = "absolute";
        canvas.height = this.bb.height = container.scrollHeight;
        canvas.width = this.bb.width = container.scrollWidth;
        document.body.appendChild(canvas);
        this.ctx = canvas.getContext("2d");
        this.score = new _bb_score__WEBPACK_IMPORTED_MODULE_4__.BbScore();
        this.player = new _bb_player__WEBPACK_IMPORTED_MODULE_3__.BbPlayer(this);
        this.targets = [];
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.playing) {
                return;
            }
            if (!this.targets.length) {
                // this.stop();
                return;
            }
            if (!this.ctx) {
                this.stop();
                console.error("no drawing context");
                return;
            }
            requestAnimationFrame(this.refresh.bind(this));
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.score.paint(this.ctx);
            this.player.move(this);
            this.player.paint(this.ctx);
            this.targets.forEach((t) => {
                if (!t) {
                    return;
                }
                t.move(this);
                if (t.bb.intersects(this.bb) && this.ctx) {
                    t.paint(this.ctx);
                }
                else {
                    this.removeTarget(t);
                    return;
                }
                if (!t.touched && t.bb.intersects(this.player.bb)) {
                    t.touched = true;
                    this.score.value++;
                }
            });
            _bb_pacman__WEBPACK_IMPORTED_MODULE_2__.BbPacman.updateMouthAngle();
        });
    }
    removeTarget(t) {
        return __awaiter(this, void 0, void 0, function* () {
            delete this.targets[this.targets.indexOf(t)];
        });
    }
    addTarget() {
        for (let i = 0; i < this.targets.length; i++) {
            const element = this.targets[i];
            if (!element) {
                const newTarget = new _bb_target__WEBPACK_IMPORTED_MODULE_5__.BbTarget(this);
                newTarget.speed = Math.random() * (this.score.value + 1);
                this.targets[i] = newTarget;
                return;
            }
        }
        this.targets.push(new _bb_target__WEBPACK_IMPORTED_MODULE_5__.BbTarget(this));
    }
    addTargetCallbacks() {
        if (!this.playing) {
            return;
        }
        this.addTarget();
        const nextTimeoutIn = Math.max(Math.random() * 5000 / (this.score.value + 1), 1000);
        console.log(nextTimeoutIn);
        setTimeout(this.addTargetCallbacks.bind(this), nextTimeoutIn);
    }
    start() {
        this.playing = true;
        this.addTargetCallbacks();
        this.refresh();
    }
    stop() {
        this.playing = false;
    }
    static getGame() {
        if (!BbGame.pGame) {
            BbGame.pGame = new BbGame();
            return BbGame.pGame;
        }
        return BbGame.pGame;
    }
}
BbGame.pGame = null;


/***/ }),

/***/ "./src/bb-mouse.ts":
/*!*************************!*\
  !*** ./src/bb-mouse.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BbMouse": () => (/* binding */ BbMouse)
/* harmony export */ });
class BbMouse {
    static init() {
        window.addEventListener("mousemove", (ev) => {
            this.mouseX = ev.clientX;
            this.mouseY = ev.clientY;
        });
    }
}
BbMouse.mouseX = -1;
BbMouse.mouseY = -1;


/***/ }),

/***/ "./src/bb-pacman.ts":
/*!**************************!*\
  !*** ./src/bb-pacman.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BbPacman": () => (/* binding */ BbPacman)
/* harmony export */ });
/* harmony import */ var _bb_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bb-element */ "./src/bb-element.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class BbPacman extends _bb_element__WEBPACK_IMPORTED_MODULE_0__.BbElement {
    constructor() {
        super(...arguments);
        this.mouthSide = 1; // * Math.PI
    }
    set goingLeft(v) {
        this.mouthSide = Number(!v);
    }
    paint(ctx) {
        ctx.save();
        const radius = this.bb.w * 0.5;
        const backAngle = Number(!this.mouthSide);
        ctx.beginPath();
        ctx.arc(this.bb.x + radius, this.bb.y + radius, radius, (this.mouthSide - BbPacman.mouthAngle) * Math.PI, (backAngle - BbPacman.mouthAngle) * Math.PI, false);
        ctx.fillStyle = "rgb(255, 255, 0)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.bb.x + radius, this.bb.y + radius, radius, (backAngle + BbPacman.mouthAngle) * Math.PI, (this.mouthSide + BbPacman.mouthAngle) * Math.PI, false);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.bb.x + radius, this.bb.y + radius * 0.5, radius * 0.1, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fill();
        ctx.restore();
    }
    static updateMouthAngle() {
        return __awaiter(this, void 0, void 0, function* () {
            if (BbPacman.mouthAngle >= BbPacman.maxMouthAngle) {
                BbPacman.mouthOpening = false;
            }
            else if (BbPacman.mouthAngle <= 0) {
                BbPacman.mouthOpening = true;
            }
            if (BbPacman.mouthOpening) {
                BbPacman.mouthAngle += BbPacman.mouthAngleStep;
            }
            else {
                BbPacman.mouthAngle -= BbPacman.mouthAngleStep;
            }
        });
    }
}
BbPacman.maxMouthAngle = 0.2;
BbPacman.mouthAngle = BbPacman.maxMouthAngle;
BbPacman.mouthOpening = false;
BbPacman.mouthAngleStep = 0.005;


/***/ }),

/***/ "./src/bb-player.ts":
/*!**************************!*\
  !*** ./src/bb-player.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BbPlayer": () => (/* binding */ BbPlayer)
/* harmony export */ });
/* harmony import */ var _bb_bluetooth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bb-bluetooth */ "./src/bb-bluetooth.ts");
/* harmony import */ var _bb_mouse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bb-mouse */ "./src/bb-mouse.ts");
/* harmony import */ var _bb_pacman__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bb-pacman */ "./src/bb-pacman.ts");



class BbPlayer extends _bb_pacman__WEBPACK_IMPORTED_MODULE_2__.BbPacman {
    constructor(game) {
        super();
        if (!game) {
            throw new Error("This player is not part of a game.");
        }
        else {
            this.bb.width = this.bb.height = game.bb.height * 0.1;
            this.bb.y = (game.bb.h - this.bb.h) * 0.5;
            this.bb.x = (game.bb.w - this.bb.w) * 0.15;
        }
    }
    move(game) {
        // No Bluetooth
        if (_bb_bluetooth__WEBPACK_IMPORTED_MODULE_0__.BbBluetooth.data == -1) {
            // lerp? (linear interpolation)...
            // this.bb.y = (scene.mouseY - this.bb.y) * 0.9 + this.bb.y;
            // or teleportation?
            this.bb.y = _bb_mouse__WEBPACK_IMPORTED_MODULE_1__.BbMouse.mouseY;
        }
        else {
            this.bb.y = (game.bb.h - this.bb.h) * _bb_bluetooth__WEBPACK_IMPORTED_MODULE_0__.BbBluetooth.data / 8000;
        }
    }
}


/***/ }),

/***/ "./src/bb-score.ts":
/*!*************************!*\
  !*** ./src/bb-score.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BbScore": () => (/* binding */ BbScore)
/* harmony export */ });
/* harmony import */ var _bb_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bb-element */ "./src/bb-element.ts");

class BbScore extends _bb_element__WEBPACK_IMPORTED_MODULE_0__.BbElement {
    constructor() {
        super();
        this.value = 0;
    }
    paint(ctx) {
        const t = this.value.toString();
        const metrics = ctx.measureText(t);
        ctx.save();
        ctx.font = "30px Helvetica";
        ctx.fillText(t, (ctx.canvas.width - metrics.width) * 0.5, metrics.actualBoundingBoxAscent + 50);
        ctx.restore();
    }
}


/***/ }),

/***/ "./src/bb-target.ts":
/*!**************************!*\
  !*** ./src/bb-target.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BbTarget": () => (/* binding */ BbTarget)
/* harmony export */ });
/* harmony import */ var _bb_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bb-element */ "./src/bb-element.ts");

class BbTarget extends _bb_element__WEBPACK_IMPORTED_MODULE_0__.BbElement {
    constructor(game) {
        super();
        this.touched = false;
        this.speed = 1;
        this.bb.height = this.bb.width = game.bb.h * 0.02;
        const margins = game.bb.height * 0.1;
        this.bb.y = Math.random() * (game.bb.height - this.bb.height - margins) + margins;
        this.bb.x = game.bb.w;
    }
    paint(ctx) {
        if (this.touched) {
            return;
        }
        const radius = (this.bb.x2 - this.bb.x1) * 0.5;
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.bb.x + radius, this.bb.y + radius, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }
    move(game) {
        this.bb.x -= game.bb.width * 0.005 * this.speed;
        return this;
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bb_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bb-game */ "./src/bb-game.ts");
/* harmony import */ var _bb_bluetooth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bb-bluetooth */ "./src/bb-bluetooth.ts");


const bluetoothButton = document.getElementById("bluetoothButton");
bluetoothButton === null || bluetoothButton === void 0 ? void 0 : bluetoothButton.addEventListener("click", (ev) => {
    _bb_bluetooth__WEBPACK_IMPORTED_MODULE_1__.BbBluetooth.connect().then(() => {
        const htmlExceptGame = document.getElementById("htmlExceptGame");
        htmlExceptGame === null || htmlExceptGame === void 0 ? void 0 : htmlExceptGame.style.setProperty("visibility", "hidden");
        const game = _bb_game__WEBPACK_IMPORTED_MODULE_0__.BbGame.getGame();
        game.start();
    }).catch((err) => {
        console.error("An error ocurred:", err);
    });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9qZXRfc3ludGhlc2UvLi9ub2RlX21vZHVsZXMvYm91bmRpbmctYm94ZXMvZGlzdC9ib3VuZGluZy1ib3hlcy5qcyIsIndlYnBhY2s6Ly9wcm9qZXRfc3ludGhlc2UvLi9zcmMvYmItYmx1ZXRvb3RoLnRzIiwid2VicGFjazovL3Byb2pldF9zeW50aGVzZS8uL3NyYy9iYi1lbGVtZW50LnRzIiwid2VicGFjazovL3Byb2pldF9zeW50aGVzZS8uL3NyYy9iYi1nYW1lLnRzIiwid2VicGFjazovL3Byb2pldF9zeW50aGVzZS8uL3NyYy9iYi1tb3VzZS50cyIsIndlYnBhY2s6Ly9wcm9qZXRfc3ludGhlc2UvLi9zcmMvYmItcGFjbWFuLnRzIiwid2VicGFjazovL3Byb2pldF9zeW50aGVzZS8uL3NyYy9iYi1wbGF5ZXIudHMiLCJ3ZWJwYWNrOi8vcHJvamV0X3N5bnRoZXNlLy4vc3JjL2JiLXNjb3JlLnRzIiwid2VicGFjazovL3Byb2pldF9zeW50aGVzZS8uL3NyYy9iYi10YXJnZXQudHMiLCJ3ZWJwYWNrOi8vcHJvamV0X3N5bnRoZXNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Byb2pldF9zeW50aGVzZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcHJvamV0X3N5bnRoZXNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHJvamV0X3N5bnRoZXNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHJvamV0X3N5bnRoZXNlLy4vc3JjL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsNEJBQTRCLFFBQVE7QUFDcEMsNEJBQTRCLFFBQVE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGlCQUFpQixFQUFFO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixpQkFBaUIsRUFBRTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Ozs7Ozs7Ozs7Ozs7O0FDTm1DO0FBQ1U7QUFFN0MsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ25FLGVBQWUsYUFBZixlQUFlLHVCQUFmLGVBQWUsQ0FBRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFTLEVBQUUsRUFBRTtJQUNyRCw4REFBbUIsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDNUIsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2pFLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUU7UUFDMUQsTUFBTSxJQUFJLEdBQUcsb0RBQWMsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDNUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxFQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQm91bmRpbmdCb3ggPSB2b2lkIDA7XHJcbi8qKlxyXG4gKiBUaGUgQm91bmRpbmdCb3ggY2xhc3MgY29udGFpbnMgdGhlIDJkIGNvb3JkaW5hdGVzIG9mIGEgcG9pbnQsXHJcbiAqIGFuZCBoYXMgc29tZSB1c2VmdWwgZnVuY3Rpb25zIHN1Y2ggYXNcclxuICogIC0gYGNvbnRhaW5zUG9pbnQoeCwgeSlgXHJcbiAqICAtIGBpbnRlcnNlY3RzKG90aGVyKWBcclxuICogIC0gYGludGVyc2VjdGlvbihvdGhlcilgXHJcbiAqICAtIGB1bmlvbihvdGhlcilgXHJcbiAqICAtIGBzbWFsbGVzdEJveEVuY2xvc2luZyguLi5ib3hlcylgXHJcbiAqXHJcbiAqIE5vdGUgdGhhdCB0aGUgdGhlIHBvaW50cyBhcmUgYWx3YXlzIG9yZGVyZWQ6IHgxIGlzIGFsd2F5cyBzbWFsbGVyIHRoYW4geDIsXHJcbiAqIGFuZCB5MSBpcyBhbHdheXMgc21hbGxlciB0aGFuIHkyLlxyXG4gKlxyXG4gKiBCZWNhdXNlIG9mIHRoaXMsIGhlaWdodCBhbmQgd2lkdGggYXJlIGFsd2F5cyBwb3NpdGl2ZS5cclxuICovXHJcbnZhciBCb3VuZGluZ0JveCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKiBDb25zdHJ1Y3RzIGFuIGluc3RhbmNlIGZyb20gY29ybmVycyBjb29yZGluYXRlcy4gKi9cclxuICAgIGZ1bmN0aW9uIEJvdW5kaW5nQm94KHgxLCB5MSwgeDIsIHkyKSB7XHJcbiAgICAgICAgdGhpcy5feDEgPSB4MTtcclxuICAgICAgICB0aGlzLl95MSA9IHkxO1xyXG4gICAgICAgIHRoaXMuX3gyID0geDI7XHJcbiAgICAgICAgdGhpcy5feTIgPSB5MjtcclxuICAgICAgICB0aGlzLm9yZGVyKCk7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQm91bmRpbmdCb3gucHJvdG90eXBlLCBcImhlaWdodFwiLCB7XHJcbiAgICAgICAgLyoqIFRoZSBib3VuZGluZyBib3gncyBoZWlnaHQuICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnkyIC0gdGhpcy55MTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgdGhpcy55MiA9IHRoaXMueTEgKyB2O1xyXG4gICAgICAgICAgICB0aGlzLm9yZGVyWSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCb3VuZGluZ0JveC5wcm90b3R5cGUsIFwiaFwiLCB7XHJcbiAgICAgICAgLyoqIFRoZSBzaG9ydGVyIHdheSB0byB0aGUgYmJveCdzIGhlaWdodCAuKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHY7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJvdW5kaW5nQm94LnByb3RvdHlwZSwgXCJ3aWR0aFwiLCB7XHJcbiAgICAgICAgLyoqIFRoZSBib3VuZGluZyBib3gncyB3aWR0aCAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy54MiAtIHRoaXMueDE7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgIHRoaXMueDIgPSB0aGlzLngxICsgdjtcclxuICAgICAgICAgICAgdGhpcy5vcmRlclgoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQm91bmRpbmdCb3gucHJvdG90eXBlLCBcIndcIiwge1xyXG4gICAgICAgIC8qKiBUaGUgc2hvcnRlciB3YXkgdG8gdGhlIGJib3gncyB3aWR0aC4gKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGg7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB2O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCb3VuZGluZ0JveC5wcm90b3R5cGUsIFwieDFcIiwge1xyXG4gICAgICAgIC8qKiBUaGUgYm91bmRpbmcgYm94J3MgZmlyc3QgY29ybmVyJ3MgeC4gKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3gxO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICB0aGlzLl94MSA9IHY7XHJcbiAgICAgICAgICAgIHRoaXMub3JkZXJYKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJvdW5kaW5nQm94LnByb3RvdHlwZSwgXCJ5MVwiLCB7XHJcbiAgICAgICAgLyoqIFRoZSBib3VuZGluZyBib3gncyBmaXJzdCBjb3JuZXIncyB5LiAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5feTE7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3kxID0gdjtcclxuICAgICAgICAgICAgdGhpcy5vcmRlclkoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQm91bmRpbmdCb3gucHJvdG90eXBlLCBcIngyXCIsIHtcclxuICAgICAgICAvKiogVGhlIGJvdW5kaW5nIGJveCdzIHNlY29uZCBjb3JuZXIncyB4IC4qL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5feDI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3gyID0gdjtcclxuICAgICAgICAgICAgdGhpcy5vcmRlclgoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQm91bmRpbmdCb3gucHJvdG90eXBlLCBcInkyXCIsIHtcclxuICAgICAgICAvKiogVGhlIGJvdW5kaW5nIGJveCdzIHNlY29uZCBjb3JuZXIncyB5LiAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5feTI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3kyID0gdjtcclxuICAgICAgICAgICAgdGhpcy5vcmRlclkoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICAvKiogQ29uc3RydWN0cyBhbiBpbnN0YW5jZSBmcm9tIGEgY29ybmVyJ3MgY29vcmRpbmF0ZXMgKGB4MWAgYW5kIGB5MWApLCBhIGhlaWdodCBhbmQgYSB3aWR0aC4gKi9cclxuICAgIEJvdW5kaW5nQm94LmZyb21IVyA9IGZ1bmN0aW9uIChoZWlnaHQsIHdpZHRoLCB4MSwgeTEpIHtcclxuICAgICAgICBpZiAoeDEgPT09IHZvaWQgMCkgeyB4MSA9IDA7IH1cclxuICAgICAgICBpZiAoeTEgPT09IHZvaWQgMCkgeyB5MSA9IDA7IH1cclxuICAgICAgICByZXR1cm4gbmV3IEJvdW5kaW5nQm94KHgxLCB5MSwgeDEgKyB3aWR0aCwgeTEgKyBoZWlnaHQpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBwb2ludCBpcyBpbnNpZGUgdGhlIGJveCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHBvaW50J3MgeC5cclxuICAgICAqIEBwYXJhbSB5IFRoZSBwb2ludCdzIHkuXHJcbiAgICAgKi9cclxuICAgIEJvdW5kaW5nQm94LnByb3RvdHlwZS5jb250YWluc1BvaW50ID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgICAgICByZXR1cm4gQm91bmRpbmdCb3guYmV0d2Vlbih4LCB0aGlzLngxLCB0aGlzLngyKSAmJiBCb3VuZGluZ0JveC5iZXR3ZWVuKHksIHRoaXMueTEsIHRoaXMueTIpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICovXHJcbiAgICBCb3VuZGluZ0JveC5iZXR3ZWVuID0gZnVuY3Rpb24gKHgsIHgxLCB4Mikge1xyXG4gICAgICAgIHJldHVybiB4ID49IHgxICYmIHggPD0geDI7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIG90aGVyIGJveCB0b3VjaGVzIHRoaXMgb25lLlxyXG4gICAgICogQHBhcmFtIG90aGVyIFRoZSBvdGhlciBib3VuZGluZyBib3guXHJcbiAgICAgKi9cclxuICAgIEJvdW5kaW5nQm94LnByb3RvdHlwZS5pbnRlcnNlY3RzID0gZnVuY3Rpb24gKG90aGVyKSB7XHJcbiAgICAgICAgcmV0dXJuICEodGhpcy54MSA+IG90aGVyLngyIHx8IHRoaXMueDIgPCBvdGhlci54MSB8fCB0aGlzLnkxID4gb3RoZXIueTIgfHwgdGhpcy55MiA8IG90aGVyLnkxKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNtYWxsZXN0IHJlY3RhbmdsZSBlbmNsb3NpbmcgdGhpcyBCb3VuZGluZ0JveCBhbmQgYG90aGVyYC5cclxuICAgICAqIEBwYXJhbSBvdGhlciBUaGUgQm91bmRpbmdCb3ggd2l0aCB3aGljaCB0byBpbnRlcnNlY3QuXHJcbiAgICAgKi9cclxuICAgIEJvdW5kaW5nQm94LnByb3RvdHlwZS51bmlvbiA9IGZ1bmN0aW9uIChvdGhlcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgQm91bmRpbmdCb3goTWF0aC5taW4odGhpcy54MSwgb3RoZXIueDEpLCBNYXRoLm1pbih0aGlzLnkxLCBvdGhlci55MSksIE1hdGgubWF4KHRoaXMueDIsIG90aGVyLngyKSwgTWF0aC5tYXgodGhpcy55Miwgb3RoZXIueTIpKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGJpZ2dlc3QgcmVjdGFuZ2xlIGVuY2xvc2VkIGluIHRoaXMgQm91bmRpbmdCb3ggYW5kIGBvdGhlcmAuXHJcbiAgICAgKiBAcGFyYW0gb3RoZXIgVGhlIG90aGVyIEJvdW5kaW5nQm94LlxyXG4gICAgICovXHJcbiAgICBCb3VuZGluZ0JveC5wcm90b3R5cGUuaW50ZXJzZWN0aW9uID0gZnVuY3Rpb24gKG90aGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBCb3VuZGluZ0JveChNYXRoLm1heCh0aGlzLngxLCBvdGhlci54MSksIE1hdGgubWF4KHRoaXMueTEsIG90aGVyLnkxKSwgTWF0aC5taW4odGhpcy54Miwgb3RoZXIueDIpLCBNYXRoLm1pbih0aGlzLnkyLCBvdGhlci55MikpO1xyXG4gICAgfTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCb3VuZGluZ0JveC5wcm90b3R5cGUsIFwieFwiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIGJveCdzIGdsb2JhbCB4IChsb3dlc3QgY29ybmVyKVxyXG4gICAgICAgICAqIFVzZSB0aGlzIHByb3BlcnR5IHRvIG1vdmUgdGhlIGJveCBhcm91bmQgd2l0aG91dCBjaGFuZ2luZyBpdHMgd2lkdGguXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqIGBgYFxyXG4gICAgICAgICAqIGEgPSBuZXcgQm91bmRpbmdCb3goMCwgMCwgMTAsIDEwKTtcclxuICAgICAgICAgKiAvLyBhLnggPSAwLCBhLngxID0gMCwgYS54MiA9IDEwXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBhLnggPSAxMFxyXG4gICAgICAgICAqIC8vIGEueCA9IDEwLCBhLngxID0gMTAsIGEueDIgPSAyMFxyXG4gICAgICAgICAqIGBgYFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5feDE7IH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICB2YXIgdyA9IHRoaXMud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuX3gxID0geDtcclxuICAgICAgICAgICAgdGhpcy5feDIgPSB4ICsgdztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQm91bmRpbmdCb3gucHJvdG90eXBlLCBcInlcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSBib3gncyBnbG9iYWwgeSAobG93ZXN0IGNvcm5lcilcclxuICAgICAgICAgKiBVc2UgdGhpcyBwcm9wZXJ0eSB0byBtb3ZlIHRoZSBib3ggYXJvdW5kIHdpdGhvdXQgY2hhbmdpbmcgaXRzIGhlaWdodC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogYGBgXHJcbiAgICAgICAgICogYSA9IG5ldyBCb3VuZGluZ0JveCgwLCAwLCAxMCwgMTApO1xyXG4gICAgICAgICAqIC8vIGEueSA9IDAsIGEueTEgPSAwLCBhLnkyID0gMTBcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIGEueCA9IDEwXHJcbiAgICAgICAgICogLy8gYS55ID0gMTAsIGEueTEgPSAxMCwgYS55MiA9IDIwXHJcbiAgICAgICAgICogYGBgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl95MTsgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh5KSB7XHJcbiAgICAgICAgICAgIHZhciBoID0gdGhpcy5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3kxID0geTtcclxuICAgICAgICAgICAgdGhpcy5feTIgPSB5ICsgaDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICAvKipcclxuICAgICAqIE1vdmUgdGhlIGJib3ggdG8gdGhlc2UgY29vcmRpbmF0ZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHggVGhlIG5ldyB4MS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSBuZXcgeTEuXHJcbiAgICAgKi9cclxuICAgIEJvdW5kaW5nQm94LnByb3RvdHlwZS5tb3ZlID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBUcmFuc2xhdGUgdGhlIGJib3ggYnkgdGhlc2UgY29vcmRpbmF0ZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggc2hpZnQgYW1vdW50LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgc2hpZnQgYW1vdW50LlxyXG4gICAgICovXHJcbiAgICBCb3VuZGluZ0JveC5wcm90b3R5cGUudHJhbnNsYXRlID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggKz0geDtcclxuICAgICAgICB0aGlzLnkgKz0geTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEFzIHRoZSBuYW1lIHN0YXRlcyB0aGlzIGZ1bmN0aW9uIGdpdmVzIHRoZSBzbWFsbGVzdCBib3ggZW5jbG9zaW5nXHJcbiAgICAgKiBhIHNldCBvZiBib3hlcyAoYGJib3hlc2ApXHJcbiAgICAgKlxyXG4gICAgICogQHNlZSBzbWVcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0gYmJveGVzIFRoZSBjdWxwcml0cy5cclxuICAgICAqIEByZXR1cm4ge0JvdW5kaW5nQm94fVxyXG4gICAgICovXHJcbiAgICBCb3VuZGluZ0JveC5zbWFsbGVzdEJveEVuY2xvc2luZyA9IGZ1bmN0aW9uIChiYm94ZXMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zbWUoYmJveGVzKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNtYWxsZXN0IEJveCBFbmNsb3NpbmcgdGhlc2UgYGJib3hlc2AuXHJcbiAgICAgKlxyXG4gICAgICogQHNlZSBzbWFsbGVzdEJveEVuY2xvc2luZy5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0gYmJveGVzIFRoZSBjdWxwcml0c1xyXG4gICAgICogQHJldHVybiB7Qm91bmRpbmdCb3h9XHJcbiAgICAgKi9cclxuICAgIEJvdW5kaW5nQm94LnNtZSA9IGZ1bmN0aW9uIChiYm94ZXMpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IEJvdW5kaW5nQm94KDAsIDAsIDAsIDApO1xyXG4gICAgICAgIGJib3hlcy5mb3JFYWNoKGZ1bmN0aW9uIChiYm94KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC51bmlvbihiYm94KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGEgY29weSBvZiB0aGUgYm91bmRpbmcgYm94LlxyXG4gICAgICovXHJcbiAgICBCb3VuZGluZ0JveC5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IEJvdW5kaW5nQm94KHRoaXMueDEsIHRoaXMueTEsIHRoaXMueDIsIHRoaXMueTIpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgbWFyZ2luIGFyb3VuZCB0aGUgYm94LlxyXG4gICAgICpcclxuICAgICAqIFByb3ZpZGUgYSBuZWdhdGl2ZSBtYXJnaW4gdG8gaW5zZXQgdGhlIGJveC5cclxuICAgICAqXHJcbiAgICAgKiBgYGBcclxuICAgICAqICBuZXdfX19fX19fX19fXHJcbiAgICAgKiAgICB8ICBfX19fX18gIHxcclxuICAgICAqICAgIHwgfCBvbGQgIHwgfFxyXG4gICAgICogICAgfCB8ICAgICAgfCB8XHJcbiAgICAgKiAgICB8IHxfX19fX198IHxcclxuICAgICAqICAgIHxfX19fX19fX19ffCB8PW1hcmdpblxyXG4gICAgICogYGBgXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1hcmdpbiBUaGUgc3BhY2luZyBiZXR3ZWVuIHRoZSBvbGQgYW5kIG5ldyBib3guXHJcbiAgICAgKi9cclxuICAgIEJvdW5kaW5nQm94LnByb3RvdHlwZS5hZGRNYXJnaW4gPSBmdW5jdGlvbiAobWFyZ2luKSB7XHJcbiAgICAgICAgdGhpcy5feDEgLT0gbWFyZ2luO1xyXG4gICAgICAgIHRoaXMuX3gyICs9IG1hcmdpbjtcclxuICAgICAgICB0aGlzLl95MSAtPSBtYXJnaW47XHJcbiAgICAgICAgdGhpcy5feTIgKz0gbWFyZ2luO1xyXG4gICAgICAgIHRoaXMub3JkZXIoKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgbWFyZ2lucyBhcm91bmQgdGhlIGJveC5cclxuICAgICAqIE5vdGUgdGhhdCB0aGlzIGZ1bmN0aW9uIHVzZXMgc2NyZWVuIGNvb3JkaW5hdGVzOiAoMCwgMCkgaXMgdGhlICoqdG9wKiotbGVmdCBjb3JuZXIuXHJcbiAgICAgKlxyXG4gICAgICogUHJvdmlkZSBuZWdhdGl2ZSBtYXJnaW5zIHRvIGluc2V0IHRoZSBib3guXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxlZnQgVGhlIG1hcmdpbiB0byBhZGQgYWZ0ZXIgYHgxYC5cclxuICAgICAqIEBwYXJhbSB0b3AgVGhlIG1hcmdpbiB0byBhZGQgYmVmb3JlIGB5MWAuXHJcbiAgICAgKiBAcGFyYW0gcmlnaHQgVGhlIG1hcmdpbiB0byBhZGQgYmVmb3JlIGB4MmAuXHJcbiAgICAgKiBAcGFyYW0gYm90dG9tIFRoZSBtYXJnaW4gdG8gYWRkIGFmdGVyIGB5MmAuXHJcbiAgICAgKi9cclxuICAgIEJvdW5kaW5nQm94LnByb3RvdHlwZS5hZGRNYXJnaW5zID0gZnVuY3Rpb24gKGxlZnQsIHRvcCwgcmlnaHQsIGJvdHRvbSkge1xyXG4gICAgICAgIHRoaXMuX3gxIC09IGxlZnQ7XHJcbiAgICAgICAgdGhpcy5feDIgKz0gcmlnaHQ7XHJcbiAgICAgICAgdGhpcy5feTEgLT0gdG9wO1xyXG4gICAgICAgIHRoaXMuX3kyICs9IGJvdHRvbTtcclxuICAgICAgICB0aGlzLm9yZGVyKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBFbnN1cmUgdGhhdCB4MSBpcyBzbWFsbGVyIHRoYW4geDIsIGFuZCBzd2FwIGlmIG5lZWRlZC5cclxuICAgICAqIERvIHRoZSBzYW1lIGZvciB5MSBhbmQgeTIuXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKi9cclxuICAgIEJvdW5kaW5nQm94LnByb3RvdHlwZS5vcmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm9yZGVyWCgpO1xyXG4gICAgICAgIHRoaXMub3JkZXJZKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqIEBpZ25vcmUgKi9cclxuICAgIEJvdW5kaW5nQm94LnByb3RvdHlwZS5vcmRlclggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIGlmICh0aGlzLngxID4gdGhpcy54Mikge1xyXG4gICAgICAgICAgICBfYSA9IFt0aGlzLngyLCB0aGlzLngxXSwgdGhpcy54MSA9IF9hWzBdLCB0aGlzLngyID0gX2FbMV07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKiBAaWdub3JlICovXHJcbiAgICBCb3VuZGluZ0JveC5wcm90b3R5cGUub3JkZXJZID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICBpZiAodGhpcy55MSA+IHRoaXMueTIpIHtcclxuICAgICAgICAgICAgX2EgPSBbdGhpcy55MiwgdGhpcy55MV0sIHRoaXMueTEgPSBfYVswXSwgdGhpcy55MiA9IF9hWzFdO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gQm91bmRpbmdCb3g7XHJcbn0oKSk7XHJcbmV4cG9ydHMuQm91bmRpbmdCb3ggPSBCb3VuZGluZ0JveDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Ym91bmRpbmctYm94ZXMuanMubWFwIiwiZXhwb3J0IGNsYXNzIEJiQmx1ZXRvb3RoIHtcclxuICAgIHN0YXRpYyBhc3luYyBjb25uZWN0KCkge1xyXG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IuYmx1ZXRvb3RoLnJlcXVlc3REZXZpY2Uoe1xyXG4gICAgICAgICAgICBmaWx0ZXJzOiBbe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJFTlRSQUxQSVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIG9wdGlvbmFsU2VydmljZXM6IFtcclxuICAgICAgICAgICAgICAgIC8vIFwiZjAwMGZmYzAtMDQ1MS00MDAwLWIwMDAtMDAwMDAwMDAwMDAwXCIsIC8vIGJsb2NrbGlzdGVkXHJcbiAgICAgICAgICAgICAgICAvLyBcIjAwMDAxODBhLTAwMDAtMTAwMC04MDAwLTAwODA1ZjliMzRmYlwiLFxyXG4gICAgICAgICAgICAgICAgLy8gXCIwMDAwMTgwZi0wMDAwLTEwMDAtODAwMC0wMDgwNWY5YjM0ZmJcIixcclxuICAgICAgICAgICAgICAgIC8vIFwiMDAwMDE4MDEtMDAwMC0xMDAwLTgwMDAtMDA4MDVmOWIzNGZiXCIsXHJcbiAgICAgICAgICAgICAgICBcIjAwMDBmZmYwLTAwMDAtMTAwMC04MDAwLTAwODA1ZjliMzRmYlwiLFxyXG4gICAgICAgICAgICAgICAgLy8gXCIwMDAwMTgxZC0wMDAwLTEwMDAtODAwMC0wMDgwNWY5YjM0ZmJcIixcclxuICAgICAgICAgICAgICAgIC8vIFwiMDAwMDE4MDAtMDAwMC0xMDAwLTgwMDAtMDA4MDVmOWIzNGZiXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgLy8gYWNjZXB0QWxsRGV2aWNlczogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKGRldmljZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWRldmljZS5nYXR0KSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBnYXR0IHNlcnZlclwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGV2aWNlLmdhdHQuY29ubmVjdCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oc2VydmVyID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlcnZlci5nZXRQcmltYXJ5U2VydmljZShcIjAwMDBmZmYwLTAwMDAtMTAwMC04MDAwLTAwODA1ZjliMzRmYlwiKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHNlcnZpY2UgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gc2VydmljZS5nZXRDaGFyYWN0ZXJpc3RpYyhcIjAwMDBmZmY0LTAwMDAtMTAwMC04MDAwLTAwODA1ZjliMzRmYlwiKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKGNoYXJhY3RlcmlzdGljID0+IHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3RlcmlzdGljLnByb3BlcnRpZXMubm90aWZ5KSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJpc3RpYy5hZGRFdmVudExpc3RlbmVyKCdjaGFyYWN0ZXJpc3RpY3ZhbHVlY2hhbmdlZCcsIGV2ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjYXN0IHRvIGFueSB0byBkaXNhYmxlIHdhcm5pbmcgYWJvdXQgdmFsdWUgbm90IGJlaW5nIGEgcHJvcGVydHkgb2YgZXZlbnQgaGFuZGxlci5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldi50YXJnZXQgYXMgQmx1ZXRvb3RoUmVtb3RlR0FUVENoYXJhY3RlcmlzdGljO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQ/LnZhbHVlPy5nZXRJbnQxNigwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYkJsdWV0b290aC5kYXRhID0gdGFyZ2V0LnZhbHVlLmdldEludDE2KDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3RlcmlzdGljLnN0YXJ0Tm90aWZpY2F0aW9ucygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCBiZSBub3RpZmllZCBieSBjaGFyYWN0ZXJpc3RpYz8uLi4gV2VpcmRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBcmdoISAnICsgZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkYXRhOiBudW1iZXIgPSAtMTtcclxufVxyXG4iLCJpbXBvcnQgeyBCb3VuZGluZ0JveCB9IGZyb20gXCJib3VuZGluZy1ib3hlc1wiO1xyXG5pbXBvcnQgeyBCYkdhbWUgfSBmcm9tIFwiLi9iYi1nYW1lXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQmJFbGVtZW50IHtcclxuICAgIC8vIFBhaW50IGFsbCBjaGlsZHJlblxyXG4gICAgcGFpbnQoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZShzY2VuZTogQmJHYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGJiOiBCb3VuZGluZ0JveCA9IG5ldyBCb3VuZGluZ0JveCgwLCAwLCAwLCAwKTtcclxufVxyXG4iLCJpbXBvcnQgeyBCYkVsZW1lbnQgfSBmcm9tIFwiLi9iYi1lbGVtZW50XCI7XHJcbmltcG9ydCB7IEJiTW91c2UgfSBmcm9tIFwiLi9iYi1tb3VzZVwiO1xyXG5pbXBvcnQgeyBCYlBhY21hbiB9IGZyb20gXCIuL2JiLXBhY21hblwiO1xyXG5pbXBvcnQgeyBCYlBsYXllciB9IGZyb20gXCIuL2JiLXBsYXllclwiO1xyXG5pbXBvcnQgeyBCYlNjb3JlIH0gZnJvbSBcIi4vYmItc2NvcmVcIjtcclxuaW1wb3J0IHsgQmJUYXJnZXQgfSBmcm9tIFwiLi9iYi10YXJnZXRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCYkdhbWUgZXh0ZW5kcyBCYkVsZW1lbnQge1xyXG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgfCBudWxsO1xyXG5cclxuICAgIHBsYXlpbmcgPSBmYWxzZTtcclxuXHJcbiAgICBzY29yZTogQmJTY29yZTtcclxuXHJcbiAgICBwbGF5ZXI6IEJiUGxheWVyO1xyXG4gICAgdGFyZ2V0czogQmJUYXJnZXRbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICBCYk1vdXNlLmluaXQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuYm9keTtcclxuICAgICAgICBjb250YWluZXIuc3R5bGUubWFyZ2luID0gJzBweCc7XHJcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGAke3dpbmRvdy5pbm5lckhlaWdodH1weGA7XHJcblxyXG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgY2FudmFzLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgY2FudmFzLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSB0aGlzLmJiLmhlaWdodCA9IGNvbnRhaW5lci5zY3JvbGxIZWlnaHQ7XHJcbiAgICAgICAgY2FudmFzLndpZHRoID0gdGhpcy5iYi53aWR0aCA9IGNvbnRhaW5lci5zY3JvbGxXaWR0aDtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xyXG4gICAgICAgIHRoaXMuY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5zY29yZSA9IG5ldyBCYlNjb3JlKCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgQmJQbGF5ZXIodGhpcyk7XHJcbiAgICAgICAgdGhpcy50YXJnZXRzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgcmVmcmVzaCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMucGxheWluZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy50YXJnZXRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvLyB0aGlzLnN0b3AoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuY3R4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibm8gZHJhd2luZyBjb250ZXh0XCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlZnJlc2guYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmN0eC5jYW52YXMud2lkdGgsIHRoaXMuY3R4LmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuc2NvcmUucGFpbnQodGhpcy5jdHgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyLm1vdmUodGhpcyk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIucGFpbnQodGhpcy5jdHgpO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0cy5mb3JFYWNoKCh0OiBCYlRhcmdldCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0Lm1vdmUodGhpcyk7XHJcbiAgICAgICAgICAgIGlmICh0LmJiLmludGVyc2VjdHModGhpcy5iYikgJiYgdGhpcy5jdHgpIHtcclxuICAgICAgICAgICAgICAgIHQucGFpbnQodGhpcy5jdHgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVUYXJnZXQodCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0LnRvdWNoZWQgJiYgdC5iYi5pbnRlcnNlY3RzKHRoaXMucGxheWVyLmJiKSkge1xyXG4gICAgICAgICAgICAgICAgdC50b3VjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUudmFsdWUrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBCYlBhY21hbi51cGRhdGVNb3V0aEFuZ2xlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgcmVtb3ZlVGFyZ2V0KHQ6IEJiVGFyZ2V0KSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMudGFyZ2V0c1t0aGlzLnRhcmdldHMuaW5kZXhPZih0KV07XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVGFyZ2V0KCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50YXJnZXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLnRhcmdldHNbaV07XHJcbiAgICAgICAgICAgIGlmICghZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VGFyZ2V0ID0gbmV3IEJiVGFyZ2V0KHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgbmV3VGFyZ2V0LnNwZWVkID0gTWF0aC5yYW5kb20oKSAqICh0aGlzLnNjb3JlLnZhbHVlICsgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldHNbaV0gPSBuZXdUYXJnZXQ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50YXJnZXRzLnB1c2gobmV3IEJiVGFyZ2V0KHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUYXJnZXRDYWxsYmFja3MoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBsYXlpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZFRhcmdldCgpO1xyXG4gICAgICAgIGNvbnN0IG5leHRUaW1lb3V0SW4gPSBNYXRoLm1heChNYXRoLnJhbmRvbSgpICogNTAwMCAvICh0aGlzLnNjb3JlLnZhbHVlICsgMSksIDEwMDApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG5leHRUaW1lb3V0SW4pO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KHRoaXMuYWRkVGFyZ2V0Q2FsbGJhY2tzLmJpbmQodGhpcyksIG5leHRUaW1lb3V0SW4pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMucGxheWluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hZGRUYXJnZXRDYWxsYmFja3MoKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgIH1cclxuXHJcbiAgICBzdG9wKCkge1xyXG4gICAgICAgIHRoaXMucGxheWluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRHYW1lKCk6IEJiR2FtZSB7XHJcbiAgICAgICAgaWYgKCFCYkdhbWUucEdhbWUpIHtcclxuICAgICAgICAgICAgQmJHYW1lLnBHYW1lID0gbmV3IEJiR2FtZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gQmJHYW1lLnBHYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQmJHYW1lLnBHYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHBHYW1lOiBCYkdhbWUgfCBudWxsID0gbnVsbDtcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgQmJNb3VzZSB7XHJcbiAgICBzdGF0aWMgaW5pdCgpIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCAoZXY6IE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZVggPSBldi5jbGllbnRYO1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlWSA9IGV2LmNsaWVudFk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgbW91c2VYOiBudW1iZXIgPSAtMTtcclxuICAgIHN0YXRpYyBtb3VzZVk6IG51bWJlciA9IC0xO1xyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBjb3VsZFN0YXJ0VHJpdmlhIH0gZnJvbSBcInR5cGVzY3JpcHRcIjtcclxuaW1wb3J0IHsgQmJFbGVtZW50IH0gZnJvbSBcIi4vYmItZWxlbWVudFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJiUGFjbWFuIGV4dGVuZHMgQmJFbGVtZW50IHtcclxuICAgIHN0YXRpYyBtYXhNb3V0aEFuZ2xlOiBudW1iZXIgPSAwLjI7XHJcbiAgICBzdGF0aWMgbW91dGhBbmdsZTogbnVtYmVyID0gQmJQYWNtYW4ubWF4TW91dGhBbmdsZTtcclxuICAgIHN0YXRpYyBtb3V0aE9wZW5pbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHN0YXRpYyBtb3V0aEFuZ2xlU3RlcDogbnVtYmVyID0gMC4wMDU7XHJcblxyXG4gICAgcHVibGljIHNldCBnb2luZ0xlZnQodjogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMubW91dGhTaWRlID0gTnVtYmVyKCF2KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1vdXRoU2lkZSA9IDE7IC8vICogTWF0aC5QSVxyXG5cclxuICAgIHBhaW50KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XHJcbiAgICAgICAgY3R4LnNhdmUoKTtcclxuXHJcbiAgICAgICAgY29uc3QgcmFkaXVzID0gdGhpcy5iYi53ICogMC41O1xyXG5cclxuICAgICAgICBjb25zdCBiYWNrQW5nbGUgPSBOdW1iZXIoIXRoaXMubW91dGhTaWRlKTtcclxuXHJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGN0eC5hcmModGhpcy5iYi54ICsgcmFkaXVzLFxyXG4gICAgICAgICAgICB0aGlzLmJiLnkgKyByYWRpdXMsXHJcbiAgICAgICAgICAgIHJhZGl1cyxcclxuICAgICAgICAgICAgKHRoaXMubW91dGhTaWRlIC0gQmJQYWNtYW4ubW91dGhBbmdsZSkgKiBNYXRoLlBJLFxyXG4gICAgICAgICAgICAoYmFja0FuZ2xlIC0gQmJQYWNtYW4ubW91dGhBbmdsZSkgKiBNYXRoLlBJLFxyXG4gICAgICAgICAgICBmYWxzZSk7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmdiKDI1NSwgMjU1LCAwKVwiO1xyXG4gICAgICAgIGN0eC5maWxsKCk7XHJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGN0eC5hcmModGhpcy5iYi54ICsgcmFkaXVzLFxyXG4gICAgICAgICAgICB0aGlzLmJiLnkgKyByYWRpdXMsXHJcbiAgICAgICAgICAgIHJhZGl1cyxcclxuICAgICAgICAgICAgKGJhY2tBbmdsZSArIEJiUGFjbWFuLm1vdXRoQW5nbGUpICogTWF0aC5QSSxcclxuICAgICAgICAgICAgKHRoaXMubW91dGhTaWRlICsgQmJQYWNtYW4ubW91dGhBbmdsZSkgKiBNYXRoLlBJLFxyXG4gICAgICAgICAgICBmYWxzZSk7XHJcbiAgICAgICAgY3R4LmZpbGwoKTtcclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY3R4LmFyYyh0aGlzLmJiLnggKyByYWRpdXMsIHRoaXMuYmIueSArIHJhZGl1cyAqIDAuNSwgcmFkaXVzICogMC4xLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJnYigwLCAwLCAwKVwiO1xyXG4gICAgICAgIGN0eC5maWxsKCk7XHJcblxyXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFzeW5jIHVwZGF0ZU1vdXRoQW5nbGUoKSB7XHJcbiAgICAgICAgaWYgKEJiUGFjbWFuLm1vdXRoQW5nbGUgPj0gQmJQYWNtYW4ubWF4TW91dGhBbmdsZSkge1xyXG4gICAgICAgICAgICBCYlBhY21hbi5tb3V0aE9wZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoQmJQYWNtYW4ubW91dGhBbmdsZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIEJiUGFjbWFuLm1vdXRoT3BlbmluZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoQmJQYWNtYW4ubW91dGhPcGVuaW5nKSB7XHJcbiAgICAgICAgICAgIEJiUGFjbWFuLm1vdXRoQW5nbGUgKz0gQmJQYWNtYW4ubW91dGhBbmdsZVN0ZXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBCYlBhY21hbi5tb3V0aEFuZ2xlIC09IEJiUGFjbWFuLm1vdXRoQW5nbGVTdGVwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBCYkJsdWV0b290aCB9IGZyb20gXCIuL2JiLWJsdWV0b290aFwiO1xyXG5pbXBvcnQgeyBCYkdhbWUgfSBmcm9tIFwiLi9iYi1nYW1lXCI7XHJcbmltcG9ydCB7IEJiTW91c2UgfSBmcm9tIFwiLi9iYi1tb3VzZVwiO1xyXG5pbXBvcnQgeyBCYlBhY21hbiB9IGZyb20gXCIuL2JiLXBhY21hblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJiUGxheWVyIGV4dGVuZHMgQmJQYWNtYW4ge1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZTogQmJHYW1lKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgaWYgKCFnYW1lKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgcGxheWVyIGlzIG5vdCBwYXJ0IG9mIGEgZ2FtZS5cIilcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmIud2lkdGggPSB0aGlzLmJiLmhlaWdodCA9IGdhbWUuYmIuaGVpZ2h0ICogMC4xO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iYi55ID0gKGdhbWUuYmIuaCAtIHRoaXMuYmIuaCkgKiAwLjU7XHJcbiAgICAgICAgICAgIHRoaXMuYmIueCA9IChnYW1lLmJiLncgLSB0aGlzLmJiLncpICogMC4xNTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZShnYW1lOiBCYkdhbWUpIHtcclxuICAgICAgICAvLyBObyBCbHVldG9vdGhcclxuICAgICAgICBpZiAoQmJCbHVldG9vdGguZGF0YSA9PSAtMSkge1xyXG4gICAgICAgICAgICAvLyBsZXJwPyAobGluZWFyIGludGVycG9sYXRpb24pLi4uXHJcbiAgICAgICAgICAgIC8vIHRoaXMuYmIueSA9IChzY2VuZS5tb3VzZVkgLSB0aGlzLmJiLnkpICogMC45ICsgdGhpcy5iYi55O1xyXG5cclxuICAgICAgICAgICAgLy8gb3IgdGVsZXBvcnRhdGlvbj9cclxuICAgICAgICAgICAgdGhpcy5iYi55ID0gQmJNb3VzZS5tb3VzZVk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmJiLnkgPSAoZ2FtZS5iYi5oIC0gdGhpcy5iYi5oKSAqIEJiQmx1ZXRvb3RoLmRhdGEgLyA4MDAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQmJFbGVtZW50IH0gZnJvbSBcIi4vYmItZWxlbWVudFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJiU2NvcmUgZXh0ZW5kcyBCYkVsZW1lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFsdWU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcGFpbnQoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcclxuICAgICAgICBjb25zdCB0ID0gdGhpcy52YWx1ZS50b1N0cmluZygpO1xyXG4gICAgICAgIGNvbnN0IG1ldHJpY3MgPSBjdHgubWVhc3VyZVRleHQodCk7XHJcbiAgICAgICAgY3R4LnNhdmUoKTtcclxuICAgICAgICBjdHguZm9udCA9IFwiMzBweCBIZWx2ZXRpY2FcIjtcclxuICAgICAgICBjdHguZmlsbFRleHQodCwgKGN0eC5jYW52YXMud2lkdGggLSBtZXRyaWNzLndpZHRoKSAqIDAuNSwgbWV0cmljcy5hY3R1YWxCb3VuZGluZ0JveEFzY2VudCArIDUwKTtcclxuICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEJiRWxlbWVudCB9IGZyb20gXCIuL2JiLWVsZW1lbnRcIjtcclxuaW1wb3J0IHsgQmJHYW1lIH0gZnJvbSBcIi4vYmItZ2FtZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJiVGFyZ2V0IGV4dGVuZHMgQmJFbGVtZW50IHtcclxuICAgIHRvdWNoZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBzcGVlZCA9IDE7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZ2FtZTogQmJHYW1lKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5iYi5oZWlnaHQgPSB0aGlzLmJiLndpZHRoID0gZ2FtZS5iYi5oICogMC4wMjtcclxuICAgICAgICBjb25zdCBtYXJnaW5zID0gZ2FtZS5iYi5oZWlnaHQgKiAwLjE7XHJcblxyXG4gICAgICAgIHRoaXMuYmIueSA9IE1hdGgucmFuZG9tKCkgKiAoZ2FtZS5iYi5oZWlnaHQgLSB0aGlzLmJiLmhlaWdodCAtIG1hcmdpbnMpICsgbWFyZ2lucztcclxuICAgICAgICB0aGlzLmJiLnggPSBnYW1lLmJiLnc7XHJcbiAgICB9XHJcblxyXG4gICAgcGFpbnQoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcclxuICAgICAgICBpZiAodGhpcy50b3VjaGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmFkaXVzID0gKHRoaXMuYmIueDIgLSB0aGlzLmJiLngxKSAqIDAuNTtcclxuICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjdHguYXJjKHRoaXMuYmIueCArIHJhZGl1cywgdGhpcy5iYi55ICsgcmFkaXVzLCByYWRpdXMsIDAsIDIgKiBNYXRoLlBJKTtcclxuICAgICAgICBjdHguZmlsbCgpO1xyXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZShnYW1lOiBCYkdhbWUpIHtcclxuICAgICAgICB0aGlzLmJiLnggLT0gZ2FtZS5iYi53aWR0aCAqIDAuMDA1ICogdGhpcy5zcGVlZDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBCYkdhbWUgfSBmcm9tIFwiLi9iYi1nYW1lXCI7XHJcbmltcG9ydCB7IEJiQmx1ZXRvb3RoIH0gZnJvbSBcIi4vYmItYmx1ZXRvb3RoXCI7XHJcblxyXG5jb25zdCBibHVldG9vdGhCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJsdWV0b290aEJ1dHRvblwiKTtcclxuYmx1ZXRvb3RoQnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2OiBFdmVudCkgPT4ge1xyXG4gICAgQmJCbHVldG9vdGguY29ubmVjdCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGh0bWxFeGNlcHRHYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJodG1sRXhjZXB0R2FtZVwiKTtcclxuICAgICAgICBodG1sRXhjZXB0R2FtZT8uc3R5bGUuc2V0UHJvcGVydHkoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpO1xyXG4gICAgICAgIGNvbnN0IGdhbWUgPSBCYkdhbWUuZ2V0R2FtZSgpO1xyXG4gICAgICAgIGdhbWUuc3RhcnQoKTtcclxuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiQW4gZXJyb3Igb2N1cnJlZDpcIiwgZXJyKTtcclxuICAgIH0pXHJcbn0pXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=