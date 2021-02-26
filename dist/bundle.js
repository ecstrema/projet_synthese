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
/* harmony import */ var _bb_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bb-player */ "./src/bb-player.ts");
/* harmony import */ var _bb_target__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bb-target */ "./src/bb-target.ts");
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
        this.looping = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.score = 0;
        this.fps = 40;
        const container = document.body;
        container.style.margin = '0px';
        container.style.height = `${window.innerHeight}px`;
        const canvas = document.createElement("canvas");
        canvas.style.display = "block";
        canvas.style.position = "absolute";
        canvas.height = this.bb.height = container.scrollHeight;
        canvas.width = this.bb.width = container.scrollWidth;
        window.addEventListener("mousemove", (ev) => {
            this.mouseX = ev.clientX;
            this.mouseY = ev.clientY;
        });
        document.body.appendChild(canvas);
        this.ctx = canvas.getContext("2d");
        this.player = new _bb_player__WEBPACK_IMPORTED_MODULE_1__.BbPlayer(this);
        this.targets = [];
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.looping) {
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
                    t.versLeBas = this.score % 2 ? true : false;
                    this.score++;
                    this.addTarget();
                }
            });
            _bb_player__WEBPACK_IMPORTED_MODULE_1__.BbPlayer.updateMouthAngle();
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
                this.targets[i] = new _bb_target__WEBPACK_IMPORTED_MODULE_2__.BbTarget();
                return;
            }
        }
        this.targets.push(new _bb_target__WEBPACK_IMPORTED_MODULE_2__.BbTarget());
    }
    start() {
        this.looping = true;
        this.targets.push(new _bb_target__WEBPACK_IMPORTED_MODULE_2__.BbTarget());
        this.refresh();
    }
    stop() {
        this.looping = false;
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
/* harmony import */ var _bb_game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bb-game */ "./src/bb-game.ts");
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
    move(scene) {
        // No Bluetooth
        if (_bb_bluetooth__WEBPACK_IMPORTED_MODULE_0__.BbBluetooth.data == -1) {
            // lerp? (linear interpolation)...
            // this.bb.y = (scene.mouseY - this.bb.y) * 0.9 + this.bb.y;
            // or teleportation?
            this.bb.y = scene.mouseY;
        }
        else {
            this.bb.y = (_bb_game__WEBPACK_IMPORTED_MODULE_1__.BbGame.getGame().bb.h - this.bb.h) * _bb_bluetooth__WEBPACK_IMPORTED_MODULE_0__.BbBluetooth.data / 8000;
        }
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
/* harmony import */ var _bb_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bb-game */ "./src/bb-game.ts");
/* harmony import */ var _bb_pacman__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bb-pacman */ "./src/bb-pacman.ts");


class BbTarget extends _bb_pacman__WEBPACK_IMPORTED_MODULE_1__.BbPacman {
    constructor() {
        super();
        this.touched = false;
        this.versLeBas = false;
        this.goingLeft = true;
        const game = _bb_game__WEBPACK_IMPORTED_MODULE_0__.BbGame.getGame();
        if (!game) {
            throw new Error("This element is not part of a game.");
        }
        else {
            this.bb.height = this.bb.width = game.bb.height * 0.2;
            const margins = game.bb.height * 0.1;
            this.bb.y = Math.random() * (game.bb.height - this.bb.height - margins) + margins;
            this.bb.x = game.bb.w;
        }
    }
    move(game) {
        if (this.touched) {
            if (this.versLeBas) {
                this.bb.y += game.bb.width * 0.005 * (game.score + 1);
            }
            else {
                this.bb.y -= game.bb.width * 0.005 * (game.score + 1);
            }
        }
        else {
            this.bb.x -= game.bb.width * 0.005 * (game.score + 1), 0;
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9qZXRfc3ludGhlc2UvLi9ub2RlX21vZHVsZXMvYm91bmRpbmctYm94ZXMvZGlzdC9ib3VuZGluZy1ib3hlcy5qcyIsIndlYnBhY2s6Ly9wcm9qZXRfc3ludGhlc2UvLi9zcmMvYmItYmx1ZXRvb3RoLnRzIiwid2VicGFjazovL3Byb2pldF9zeW50aGVzZS8uL3NyYy9iYi1lbGVtZW50LnRzIiwid2VicGFjazovL3Byb2pldF9zeW50aGVzZS8uL3NyYy9iYi1nYW1lLnRzIiwid2VicGFjazovL3Byb2pldF9zeW50aGVzZS8uL3NyYy9iYi1wYWNtYW4udHMiLCJ3ZWJwYWNrOi8vcHJvamV0X3N5bnRoZXNlLy4vc3JjL2JiLXBsYXllci50cyIsIndlYnBhY2s6Ly9wcm9qZXRfc3ludGhlc2UvLi9zcmMvYmItdGFyZ2V0LnRzIiwid2VicGFjazovL3Byb2pldF9zeW50aGVzZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wcm9qZXRfc3ludGhlc2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Byb2pldF9zeW50aGVzZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Byb2pldF9zeW50aGVzZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Byb2pldF9zeW50aGVzZS8uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDRCQUE0QixRQUFRO0FBQ3BDLDRCQUE0QixRQUFRO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixpQkFBaUIsRUFBRTtBQUM3QztBQUNB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RUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDNUIsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2pFLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUU7UUFDMUQsTUFBTSxJQUFJLEdBQUcsb0RBQWMsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDNUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxFQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQm91bmRpbmdCb3ggPSB2b2lkIDA7XHJcbi8qKlxyXG4gKiBUaGUgQm91bmRpbmdCb3ggY2xhc3MgY29udGFpbnMgdGhlIDJkIGNvb3JkaW5hdGVzIG9mIGEgcG9pbnQsXHJcbiAqIGFuZCBoYXMgc29tZSB1c2VmdWwgZnVuY3Rpb25zIHN1Y2ggYXNcclxuICogIC0gYGNvbnRhaW5zUG9pbnQoeCwgeSlgXHJcbiAqICAtIGBpbnRlcnNlY3RzKG90aGVyKWBcclxuICogIC0gYGludGVyc2VjdGlvbihvdGhlcilgXHJcbiAqICAtIGB1bmlvbihvdGhlcilgXHJcbiAqICAtIGBzbWFsbGVzdEJveEVuY2xvc2luZyguLi5ib3hlcylgXHJcbiAqXHJcbiAqIE5vdGUgdGhhdCB0aGUgdGhlIHBvaW50cyBhcmUgYWx3YXlzIG9yZGVyZWQ6IHgxIGlzIGFsd2F5cyBzbWFsbGVyIHRoYW4geDIsXHJcbiAqIGFuZCB5MSBpcyBhbHdheXMgc21hbGxlciB0aGFuIHkyLlxyXG4gKlxyXG4gKiBCZWNhdXNlIG9mIHRoaXMsIGhlaWdodCBhbmQgd2lkdGggYXJlIGFsd2F5cyBwb3NpdGl2ZS5cclxuICovXHJcbnZhciBCb3VuZGluZ0JveCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKiBDb25zdHJ1Y3RzIGFuIGluc3RhbmNlIGZyb20gY29ybmVycyBjb29yZGluYXRlcy4gKi9cclxuICAgIGZ1bmN0aW9uIEJvdW5kaW5nQm94KHgxLCB5MSwgeDIsIHkyKSB7XHJcbiAgICAgICAgdGhpcy5feDEgPSB4MTtcclxuICAgICAgICB0aGlzLl95MSA9IHkxO1xyXG4gICAgICAgIHRoaXMuX3gyID0geDI7XHJcbiAgICAgICAgdGhpcy5feTIgPSB5MjtcclxuICAgICAgICB0aGlzLm9yZGVyKCk7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQm91bmRpbmdCb3gucHJvdG90eXBlLCBcImhlaWdodFwiLCB7XHJcbiAgICAgICAgLyoqIFRoZSBib3VuZGluZyBib3gncyBoZWlnaHQuICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnkyIC0gdGhpcy55MTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgdGhpcy55MiA9IHRoaXMueTEgKyB2O1xyXG4gICAgICAgICAgICB0aGlzLm9yZGVyWSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCb3VuZGluZ0JveC5wcm90b3R5cGUsIFwiaFwiLCB7XHJcbiAgICAgICAgLyoqIFRoZSBzaG9ydGVyIHdheSB0byB0aGUgYmJveCdzIGhlaWdodCAuKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHY7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJvdW5kaW5nQm94LnByb3RvdHlwZSwgXCJ3aWR0aFwiLCB7XHJcbiAgICAgICAgLyoqIFRoZSBib3VuZGluZyBib3gncyB3aWR0aCAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy54MiAtIHRoaXMueDE7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgIHRoaXMueDIgPSB0aGlzLngxICsgdjtcclxuICAgICAgICAgICAgdGhpcy5vcmRlclgoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQm91bmRpbmdCb3gucHJvdG90eXBlLCBcIndcIiwge1xyXG4gICAgICAgIC8qKiBUaGUgc2hvcnRlciB3YXkgdG8gdGhlIGJib3gncyB3aWR0aC4gKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGg7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB2O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCb3VuZGluZ0JveC5wcm90b3R5cGUsIFwieDFcIiwge1xyXG4gICAgICAgIC8qKiBUaGUgYm91bmRpbmcgYm94J3MgZmlyc3QgY29ybmVyJ3MgeC4gKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3gxO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICB0aGlzLl94MSA9IHY7XHJcbiAgICAgICAgICAgIHRoaXMub3JkZXJYKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJvdW5kaW5nQm94LnByb3RvdHlwZSwgXCJ5MVwiLCB7XHJcbiAgICAgICAgLyoqIFRoZSBib3VuZGluZyBib3gncyBmaXJzdCBjb3JuZXIncyB5LiAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5feTE7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3kxID0gdjtcclxuICAgICAgICAgICAgdGhpcy5vcmRlclkoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQm91bmRpbmdCb3gucHJvdG90eXBlLCBcIngyXCIsIHtcclxuICAgICAgICAvKiogVGhlIGJvdW5kaW5nIGJveCdzIHNlY29uZCBjb3JuZXIncyB4IC4qL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5feDI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3gyID0gdjtcclxuICAgICAgICAgICAgdGhpcy5vcmRlclgoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQm91bmRpbmdCb3gucHJvdG90eXBlLCBcInkyXCIsIHtcclxuICAgICAgICAvKiogVGhlIGJvdW5kaW5nIGJveCdzIHNlY29uZCBjb3JuZXIncyB5LiAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5feTI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3kyID0gdjtcclxuICAgICAgICAgICAgdGhpcy5vcmRlclkoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICAvKiogQ29uc3RydWN0cyBhbiBpbnN0YW5jZSBmcm9tIGEgY29ybmVyJ3MgY29vcmRpbmF0ZXMgKGB4MWAgYW5kIGB5MWApLCBhIGhlaWdodCBhbmQgYSB3aWR0aC4gKi9cclxuICAgIEJvdW5kaW5nQm94LmZyb21IVyA9IGZ1bmN0aW9uIChoZWlnaHQsIHdpZHRoLCB4MSwgeTEpIHtcclxuICAgICAgICBpZiAoeDEgPT09IHZvaWQgMCkgeyB4MSA9IDA7IH1cclxuICAgICAgICBpZiAoeTEgPT09IHZvaWQgMCkgeyB5MSA9IDA7IH1cclxuICAgICAgICByZXR1cm4gbmV3IEJvdW5kaW5nQm94KHgxLCB5MSwgeDEgKyB3aWR0aCwgeTEgKyBoZWlnaHQpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBwb2ludCBpcyBpbnNpZGUgdGhlIGJveCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHBvaW50J3MgeC5cclxuICAgICAqIEBwYXJhbSB5IFRoZSBwb2ludCdzIHkuXHJcbiAgICAgKi9cclxuICAgIEJvdW5kaW5nQm94LnByb3RvdHlwZS5jb250YWluc1BvaW50ID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgICAgICByZXR1cm4gQm91bmRpbmdCb3guYmV0d2Vlbih4LCB0aGlzLngxLCB0aGlzLngyKSAmJiBCb3VuZGluZ0JveC5iZXR3ZWVuKHksIHRoaXMueTEsIHRoaXMueTIpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICovXHJcbiAgICBCb3VuZGluZ0JveC5iZXR3ZWVuID0gZnVuY3Rpb24gKHgsIHgxLCB4Mikge1xyXG4gICAgICAgIHJldHVybiB4ID49IHgxICYmIHggPD0geDI7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIG90aGVyIGJveCB0b3VjaGVzIHRoaXMgb25lLlxyXG4gICAgICogQHBhcmFtIG90aGVyIFRoZSBvdGhlciBib3VuZGluZyBib3guXHJcbiAgICAgKi9cclxuICAgIEJvdW5kaW5nQm94LnByb3RvdHlwZS5pbnRlcnNlY3RzID0gZnVuY3Rpb24gKG90aGVyKSB7XHJcbiAgICAgICAgcmV0dXJuICEodGhpcy54MSA+IG90aGVyLngyIHx8IHRoaXMueDIgPCBvdGhlci54MSB8fCB0aGlzLnkxID4gb3RoZXIueTIgfHwgdGhpcy55MiA8IG90aGVyLnkxKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNtYWxsZXN0IHJlY3RhbmdsZSBlbmNsb3NpbmcgdGhpcyBCb3VuZGluZ0JveCBhbmQgYG90aGVyYC5cclxuICAgICAqIEBwYXJhbSBvdGhlciBUaGUgQm91bmRpbmdCb3ggd2l0aCB3aGljaCB0byBpbnRlcnNlY3QuXHJcbiAgICAgKi9cclxuICAgIEJvdW5kaW5nQm94LnByb3RvdHlwZS51bmlvbiA9IGZ1bmN0aW9uIChvdGhlcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgQm91bmRpbmdCb3goTWF0aC5taW4odGhpcy54MSwgb3RoZXIueDEpLCBNYXRoLm1pbih0aGlzLnkxLCBvdGhlci55MSksIE1hdGgubWF4KHRoaXMueDIsIG90aGVyLngyKSwgTWF0aC5tYXgodGhpcy55Miwgb3RoZXIueTIpKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGJpZ2dlc3QgcmVjdGFuZ2xlIGVuY2xvc2VkIGluIHRoaXMgQm91bmRpbmdCb3ggYW5kIGBvdGhlcmAuXHJcbiAgICAgKiBAcGFyYW0gb3RoZXIgVGhlIG90aGVyIEJvdW5kaW5nQm94LlxyXG4gICAgICovXHJcbiAgICBCb3VuZGluZ0JveC5wcm90b3R5cGUuaW50ZXJzZWN0aW9uID0gZnVuY3Rpb24gKG90aGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBCb3VuZGluZ0JveChNYXRoLm1heCh0aGlzLngxLCBvdGhlci54MSksIE1hdGgubWF4KHRoaXMueTEsIG90aGVyLnkxKSwgTWF0aC5taW4odGhpcy54Miwgb3RoZXIueDIpLCBNYXRoLm1pbih0aGlzLnkyLCBvdGhlci55MikpO1xyXG4gICAgfTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCb3VuZGluZ0JveC5wcm90b3R5cGUsIFwieFwiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIGJveCdzIGdsb2JhbCB4IChsb3dlc3QgY29ybmVyKVxyXG4gICAgICAgICAqIFVzZSB0aGlzIHByb3BlcnR5IHRvIG1vdmUgdGhlIGJveCBhcm91bmQgd2l0aG91dCBjaGFuZ2luZyBpdHMgd2lkdGguXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqIGBgYFxyXG4gICAgICAgICAqIGEgPSBuZXcgQm91bmRpbmdCb3goMCwgMCwgMTAsIDEwKTtcclxuICAgICAgICAgKiAvLyBhLnggPSAwLCBhLngxID0gMCwgYS54MiA9IDEwXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBhLnggPSAxMFxyXG4gICAgICAgICAqIC8vIGEueCA9IDEwLCBhLngxID0gMTAsIGEueDIgPSAyMFxyXG4gICAgICAgICAqIGBgYFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5feDE7IH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICB2YXIgdyA9IHRoaXMud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuX3gxID0geDtcclxuICAgICAgICAgICAgdGhpcy5feDIgPSB4ICsgdztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQm91bmRpbmdCb3gucHJvdG90eXBlLCBcInlcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSBib3gncyBnbG9iYWwgeSAobG93ZXN0IGNvcm5lcilcclxuICAgICAgICAgKiBVc2UgdGhpcyBwcm9wZXJ0eSB0byBtb3ZlIHRoZSBib3ggYXJvdW5kIHdpdGhvdXQgY2hhbmdpbmcgaXRzIGhlaWdodC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogYGBgXHJcbiAgICAgICAgICogYSA9IG5ldyBCb3VuZGluZ0JveCgwLCAwLCAxMCwgMTApO1xyXG4gICAgICAgICAqIC8vIGEueSA9IDAsIGEueTEgPSAwLCBhLnkyID0gMTBcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIGEueCA9IDEwXHJcbiAgICAgICAgICogLy8gYS55ID0gMTAsIGEueTEgPSAxMCwgYS55MiA9IDIwXHJcbiAgICAgICAgICogYGBgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl95MTsgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh5KSB7XHJcbiAgICAgICAgICAgIHZhciBoID0gdGhpcy5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3kxID0geTtcclxuICAgICAgICAgICAgdGhpcy5feTIgPSB5ICsgaDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICAvKipcclxuICAgICAqIE1vdmUgdGhlIGJib3ggdG8gdGhlc2UgY29vcmRpbmF0ZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHggVGhlIG5ldyB4MS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSBuZXcgeTEuXHJcbiAgICAgKi9cclxuICAgIEJvdW5kaW5nQm94LnByb3RvdHlwZS5tb3ZlID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBUcmFuc2xhdGUgdGhlIGJib3ggYnkgdGhlc2UgY29vcmRpbmF0ZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggc2hpZnQgYW1vdW50LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgc2hpZnQgYW1vdW50LlxyXG4gICAgICovXHJcbiAgICBCb3VuZGluZ0JveC5wcm90b3R5cGUudHJhbnNsYXRlID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggKz0geDtcclxuICAgICAgICB0aGlzLnkgKz0geTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEFzIHRoZSBuYW1lIHN0YXRlcyB0aGlzIGZ1bmN0aW9uIGdpdmVzIHRoZSBzbWFsbGVzdCBib3ggZW5jbG9zaW5nXHJcbiAgICAgKiBhIHNldCBvZiBib3hlcyAoYGJib3hlc2ApXHJcbiAgICAgKlxyXG4gICAgICogQHNlZSBzbWVcclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0gYmJveGVzIFRoZSBjdWxwcml0cy5cclxuICAgICAqIEByZXR1cm4ge0JvdW5kaW5nQm94fVxyXG4gICAgICovXHJcbiAgICBCb3VuZGluZ0JveC5zbWFsbGVzdEJveEVuY2xvc2luZyA9IGZ1bmN0aW9uIChiYm94ZXMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zbWUoYmJveGVzKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNtYWxsZXN0IEJveCBFbmNsb3NpbmcgdGhlc2UgYGJib3hlc2AuXHJcbiAgICAgKlxyXG4gICAgICogQHNlZSBzbWFsbGVzdEJveEVuY2xvc2luZy5cclxuICAgICAqXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0gYmJveGVzIFRoZSBjdWxwcml0c1xyXG4gICAgICogQHJldHVybiB7Qm91bmRpbmdCb3h9XHJcbiAgICAgKi9cclxuICAgIEJvdW5kaW5nQm94LnNtZSA9IGZ1bmN0aW9uIChiYm94ZXMpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IEJvdW5kaW5nQm94KDAsIDAsIDAsIDApO1xyXG4gICAgICAgIGJib3hlcy5mb3JFYWNoKGZ1bmN0aW9uIChiYm94KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC51bmlvbihiYm94KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGEgY29weSBvZiB0aGUgYm91bmRpbmcgYm94LlxyXG4gICAgICovXHJcbiAgICBCb3VuZGluZ0JveC5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IEJvdW5kaW5nQm94KHRoaXMueDEsIHRoaXMueTEsIHRoaXMueDIsIHRoaXMueTIpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgbWFyZ2luIGFyb3VuZCB0aGUgYm94LlxyXG4gICAgICpcclxuICAgICAqIFByb3ZpZGUgYSBuZWdhdGl2ZSBtYXJnaW4gdG8gaW5zZXQgdGhlIGJveC5cclxuICAgICAqXHJcbiAgICAgKiBgYGBcclxuICAgICAqICBuZXdfX19fX19fX19fXHJcbiAgICAgKiAgICB8ICBfX19fX18gIHxcclxuICAgICAqICAgIHwgfCBvbGQgIHwgfFxyXG4gICAgICogICAgfCB8ICAgICAgfCB8XHJcbiAgICAgKiAgICB8IHxfX19fX198IHxcclxuICAgICAqICAgIHxfX19fX19fX19ffCB8PW1hcmdpblxyXG4gICAgICogYGBgXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1hcmdpbiBUaGUgc3BhY2luZyBiZXR3ZWVuIHRoZSBvbGQgYW5kIG5ldyBib3guXHJcbiAgICAgKi9cclxuICAgIEJvdW5kaW5nQm94LnByb3RvdHlwZS5hZGRNYXJnaW4gPSBmdW5jdGlvbiAobWFyZ2luKSB7XHJcbiAgICAgICAgdGhpcy5feDEgLT0gbWFyZ2luO1xyXG4gICAgICAgIHRoaXMuX3gyICs9IG1hcmdpbjtcclxuICAgICAgICB0aGlzLl95MSAtPSBtYXJnaW47XHJcbiAgICAgICAgdGhpcy5feTIgKz0gbWFyZ2luO1xyXG4gICAgICAgIHRoaXMub3JkZXIoKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgbWFyZ2lucyBhcm91bmQgdGhlIGJveC5cclxuICAgICAqIE5vdGUgdGhhdCB0aGlzIGZ1bmN0aW9uIHVzZXMgc2NyZWVuIGNvb3JkaW5hdGVzOiAoMCwgMCkgaXMgdGhlICoqdG9wKiotbGVmdCBjb3JuZXIuXHJcbiAgICAgKlxyXG4gICAgICogUHJvdmlkZSBuZWdhdGl2ZSBtYXJnaW5zIHRvIGluc2V0IHRoZSBib3guXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxlZnQgVGhlIG1hcmdpbiB0byBhZGQgYWZ0ZXIgYHgxYC5cclxuICAgICAqIEBwYXJhbSB0b3AgVGhlIG1hcmdpbiB0byBhZGQgYmVmb3JlIGB5MWAuXHJcbiAgICAgKiBAcGFyYW0gcmlnaHQgVGhlIG1hcmdpbiB0byBhZGQgYmVmb3JlIGB4MmAuXHJcbiAgICAgKiBAcGFyYW0gYm90dG9tIFRoZSBtYXJnaW4gdG8gYWRkIGFmdGVyIGB5MmAuXHJcbiAgICAgKi9cclxuICAgIEJvdW5kaW5nQm94LnByb3RvdHlwZS5hZGRNYXJnaW5zID0gZnVuY3Rpb24gKGxlZnQsIHRvcCwgcmlnaHQsIGJvdHRvbSkge1xyXG4gICAgICAgIHRoaXMuX3gxIC09IGxlZnQ7XHJcbiAgICAgICAgdGhpcy5feDIgKz0gcmlnaHQ7XHJcbiAgICAgICAgdGhpcy5feTEgLT0gdG9wO1xyXG4gICAgICAgIHRoaXMuX3kyICs9IGJvdHRvbTtcclxuICAgICAgICB0aGlzLm9yZGVyKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBFbnN1cmUgdGhhdCB4MSBpcyBzbWFsbGVyIHRoYW4geDIsIGFuZCBzd2FwIGlmIG5lZWRlZC5cclxuICAgICAqIERvIHRoZSBzYW1lIGZvciB5MSBhbmQgeTIuXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKi9cclxuICAgIEJvdW5kaW5nQm94LnByb3RvdHlwZS5vcmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm9yZGVyWCgpO1xyXG4gICAgICAgIHRoaXMub3JkZXJZKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqIEBpZ25vcmUgKi9cclxuICAgIEJvdW5kaW5nQm94LnByb3RvdHlwZS5vcmRlclggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIGlmICh0aGlzLngxID4gdGhpcy54Mikge1xyXG4gICAgICAgICAgICBfYSA9IFt0aGlzLngyLCB0aGlzLngxXSwgdGhpcy54MSA9IF9hWzBdLCB0aGlzLngyID0gX2FbMV07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKiBAaWdub3JlICovXHJcbiAgICBCb3VuZGluZ0JveC5wcm90b3R5cGUub3JkZXJZID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICBpZiAodGhpcy55MSA+IHRoaXMueTIpIHtcclxuICAgICAgICAgICAgX2EgPSBbdGhpcy55MiwgdGhpcy55MV0sIHRoaXMueTEgPSBfYVswXSwgdGhpcy55MiA9IF9hWzFdO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gQm91bmRpbmdCb3g7XHJcbn0oKSk7XHJcbmV4cG9ydHMuQm91bmRpbmdCb3ggPSBCb3VuZGluZ0JveDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Ym91bmRpbmctYm94ZXMuanMubWFwIiwiZXhwb3J0IGNsYXNzIEJiQmx1ZXRvb3RoIHtcclxuICAgIHN0YXRpYyBhc3luYyBjb25uZWN0KCkge1xyXG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IuYmx1ZXRvb3RoLnJlcXVlc3REZXZpY2Uoe1xyXG4gICAgICAgICAgICBmaWx0ZXJzOiBbe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJFTlRSQUxQSVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIG9wdGlvbmFsU2VydmljZXM6IFtcclxuICAgICAgICAgICAgICAgIC8vIFwiZjAwMGZmYzAtMDQ1MS00MDAwLWIwMDAtMDAwMDAwMDAwMDAwXCIsIC8vIGJsb2NrbGlzdGVkXHJcbiAgICAgICAgICAgICAgICAvLyBcIjAwMDAxODBhLTAwMDAtMTAwMC04MDAwLTAwODA1ZjliMzRmYlwiLFxyXG4gICAgICAgICAgICAgICAgLy8gXCIwMDAwMTgwZi0wMDAwLTEwMDAtODAwMC0wMDgwNWY5YjM0ZmJcIixcclxuICAgICAgICAgICAgICAgIC8vIFwiMDAwMDE4MDEtMDAwMC0xMDAwLTgwMDAtMDA4MDVmOWIzNGZiXCIsXHJcbiAgICAgICAgICAgICAgICBcIjAwMDBmZmYwLTAwMDAtMTAwMC04MDAwLTAwODA1ZjliMzRmYlwiLFxyXG4gICAgICAgICAgICAgICAgLy8gXCIwMDAwMTgxZC0wMDAwLTEwMDAtODAwMC0wMDgwNWY5YjM0ZmJcIixcclxuICAgICAgICAgICAgICAgIC8vIFwiMDAwMDE4MDAtMDAwMC0xMDAwLTgwMDAtMDA4MDVmOWIzNGZiXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgLy8gYWNjZXB0QWxsRGV2aWNlczogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKGRldmljZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWRldmljZS5nYXR0KSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBnYXR0IHNlcnZlclwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGV2aWNlLmdhdHQuY29ubmVjdCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oc2VydmVyID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlcnZlci5nZXRQcmltYXJ5U2VydmljZShcIjAwMDBmZmYwLTAwMDAtMTAwMC04MDAwLTAwODA1ZjliMzRmYlwiKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHNlcnZpY2UgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gc2VydmljZS5nZXRDaGFyYWN0ZXJpc3RpYyhcIjAwMDBmZmY0LTAwMDAtMTAwMC04MDAwLTAwODA1ZjliMzRmYlwiKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKGNoYXJhY3RlcmlzdGljID0+IHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3RlcmlzdGljLnByb3BlcnRpZXMubm90aWZ5KSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJpc3RpYy5hZGRFdmVudExpc3RlbmVyKCdjaGFyYWN0ZXJpc3RpY3ZhbHVlY2hhbmdlZCcsIGV2ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjYXN0IHRvIGFueSB0byBkaXNhYmxlIHdhcm5pbmcgYWJvdXQgdmFsdWUgbm90IGJlaW5nIGEgcHJvcGVydHkgb2YgZXZlbnQgaGFuZGxlci5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldi50YXJnZXQgYXMgQmx1ZXRvb3RoUmVtb3RlR0FUVENoYXJhY3RlcmlzdGljO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQ/LnZhbHVlPy5nZXRJbnQxNigwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYkJsdWV0b290aC5kYXRhID0gdGFyZ2V0LnZhbHVlLmdldEludDE2KDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3RlcmlzdGljLnN0YXJ0Tm90aWZpY2F0aW9ucygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCBiZSBub3RpZmllZCBieSBjaGFyYWN0ZXJpc3RpYz8uLi4gV2VpcmRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBcmdoISAnICsgZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkYXRhOiBudW1iZXIgPSAtMTtcclxufVxyXG4iLCJpbXBvcnQgeyBCb3VuZGluZ0JveCB9IGZyb20gXCJib3VuZGluZy1ib3hlc1wiO1xyXG5pbXBvcnQgeyBCYkdhbWUgfSBmcm9tIFwiLi9iYi1nYW1lXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQmJFbGVtZW50IHtcclxuICAgIC8vIFBhaW50IGFsbCBjaGlsZHJlblxyXG4gICAgcGFpbnQoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZShzY2VuZTogQmJHYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGJiOiBCb3VuZGluZ0JveCA9IG5ldyBCb3VuZGluZ0JveCgwLCAwLCAwLCAwKTtcclxufVxyXG4iLCJpbXBvcnQgeyBCYkVsZW1lbnQgfSBmcm9tIFwiLi9iYi1lbGVtZW50XCI7XHJcbmltcG9ydCB7IEJiUGxheWVyIH0gZnJvbSBcIi4vYmItcGxheWVyXCI7XHJcbmltcG9ydCB7IEJiVGFyZ2V0IH0gZnJvbSBcIi4vYmItdGFyZ2V0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQmJHYW1lIGV4dGVuZHMgQmJFbGVtZW50IHtcclxuICAgIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHwgbnVsbDtcclxuXHJcbiAgICBsb29waW5nID0gZmFsc2U7XHJcblxyXG4gICAgbW91c2VYOiBudW1iZXIgPSAwO1xyXG4gICAgbW91c2VZOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHNjb3JlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGZwcyA9IDQwO1xyXG5cclxuICAgIHBsYXllcjogQmJQbGF5ZXI7XHJcbiAgICB0YXJnZXRzOiBCYlRhcmdldFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLm1hcmdpbiA9ICcwcHgnO1xyXG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBgJHt3aW5kb3cuaW5uZXJIZWlnaHR9cHhgO1xyXG5cclxuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgIGNhbnZhcy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIGNhbnZhcy5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gdGhpcy5iYi5oZWlnaHQgPSBjb250YWluZXIuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHRoaXMuYmIud2lkdGggPSBjb250YWluZXIuc2Nyb2xsV2lkdGg7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIChldjogTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlWCA9IGV2LmNsaWVudFg7XHJcbiAgICAgICAgICAgIHRoaXMubW91c2VZID0gZXYuY2xpZW50WTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XHJcbiAgICAgICAgdGhpcy5jdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBCYlBsYXllcih0aGlzKTtcclxuICAgICAgICB0aGlzLnRhcmdldHMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyByZWZyZXNoKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5sb29waW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnRhcmdldHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc3RvcCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5jdHgpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJubyBkcmF3aW5nIGNvbnRleHRcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVmcmVzaC5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY3R4LmNhbnZhcy53aWR0aCwgdGhpcy5jdHguY2FudmFzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIHRoaXMucGxheWVyLm1vdmUodGhpcyk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIucGFpbnQodGhpcy5jdHgpO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0cy5mb3JFYWNoKCh0OiBCYlRhcmdldCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0Lm1vdmUodGhpcyk7XHJcbiAgICAgICAgICAgIGlmICh0LmJiLmludGVyc2VjdHModGhpcy5iYikgJiYgdGhpcy5jdHgpIHtcclxuICAgICAgICAgICAgICAgIHQucGFpbnQodGhpcy5jdHgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVUYXJnZXQodCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0LnRvdWNoZWQgJiYgdC5iYi5pbnRlcnNlY3RzKHRoaXMucGxheWVyLmJiKSkge1xyXG4gICAgICAgICAgICAgICAgdC50b3VjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHQudmVyc0xlQmFzID0gdGhpcy5zY29yZSAlIDIgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlKys7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRhcmdldCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIEJiUGxheWVyLnVwZGF0ZU1vdXRoQW5nbGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyByZW1vdmVUYXJnZXQodDogQmJUYXJnZXQpIHtcclxuICAgICAgICBkZWxldGUgdGhpcy50YXJnZXRzW3RoaXMudGFyZ2V0cy5pbmRleE9mKHQpXTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUYXJnZXQoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRhcmdldHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMudGFyZ2V0c1tpXTtcclxuICAgICAgICAgICAgaWYgKCFlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldHNbaV0gPSBuZXcgQmJUYXJnZXQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRhcmdldHMucHVzaChuZXcgQmJUYXJnZXQoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5sb29waW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnRhcmdldHMucHVzaChuZXcgQmJUYXJnZXQoKSk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcCgpIHtcclxuICAgICAgICB0aGlzLmxvb3BpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0R2FtZSgpOiBCYkdhbWUge1xyXG4gICAgICAgIGlmICghQmJHYW1lLnBHYW1lKSB7XHJcbiAgICAgICAgICAgIEJiR2FtZS5wR2FtZSA9IG5ldyBCYkdhbWUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIEJiR2FtZS5wR2FtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEJiR2FtZS5wR2FtZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBwR2FtZTogQmJHYW1lIHwgbnVsbCA9IG51bGw7XHJcbn1cclxuIiwiaW1wb3J0IHsgY291bGRTdGFydFRyaXZpYSB9IGZyb20gXCJ0eXBlc2NyaXB0XCI7XHJcbmltcG9ydCB7IEJiRWxlbWVudCB9IGZyb20gXCIuL2JiLWVsZW1lbnRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCYlBhY21hbiBleHRlbmRzIEJiRWxlbWVudCB7XHJcbiAgICBzdGF0aWMgbWF4TW91dGhBbmdsZTogbnVtYmVyID0gMC4yO1xyXG4gICAgc3RhdGljIG1vdXRoQW5nbGU6IG51bWJlciA9IEJiUGFjbWFuLm1heE1vdXRoQW5nbGU7XHJcbiAgICBzdGF0aWMgbW91dGhPcGVuaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBzdGF0aWMgbW91dGhBbmdsZVN0ZXA6IG51bWJlciA9IDAuMDA1O1xyXG5cclxuICAgIHB1YmxpYyBzZXQgZ29pbmdMZWZ0KHY6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLm1vdXRoU2lkZSA9IE51bWJlcighdik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtb3V0aFNpZGUgPSAxOyAvLyAqIE1hdGguUElcclxuXHJcbiAgICBwYWludChjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xyXG4gICAgICAgIGN0eC5zYXZlKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IHRoaXMuYmIudyAqIDAuNTtcclxuXHJcbiAgICAgICAgY29uc3QgYmFja0FuZ2xlID0gTnVtYmVyKCF0aGlzLm1vdXRoU2lkZSk7XHJcblxyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjdHguYXJjKHRoaXMuYmIueCArIHJhZGl1cyxcclxuICAgICAgICAgICAgdGhpcy5iYi55ICsgcmFkaXVzLFxyXG4gICAgICAgICAgICByYWRpdXMsXHJcbiAgICAgICAgICAgICh0aGlzLm1vdXRoU2lkZSAtIEJiUGFjbWFuLm1vdXRoQW5nbGUpICogTWF0aC5QSSxcclxuICAgICAgICAgICAgKGJhY2tBbmdsZSAtIEJiUGFjbWFuLm1vdXRoQW5nbGUpICogTWF0aC5QSSxcclxuICAgICAgICAgICAgZmFsc2UpO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJnYigyNTUsIDI1NSwgMClcIjtcclxuICAgICAgICBjdHguZmlsbCgpO1xyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjdHguYXJjKHRoaXMuYmIueCArIHJhZGl1cyxcclxuICAgICAgICAgICAgdGhpcy5iYi55ICsgcmFkaXVzLFxyXG4gICAgICAgICAgICByYWRpdXMsXHJcbiAgICAgICAgICAgIChiYWNrQW5nbGUgKyBCYlBhY21hbi5tb3V0aEFuZ2xlKSAqIE1hdGguUEksXHJcbiAgICAgICAgICAgICh0aGlzLm1vdXRoU2lkZSArIEJiUGFjbWFuLm1vdXRoQW5nbGUpICogTWF0aC5QSSxcclxuICAgICAgICAgICAgZmFsc2UpO1xyXG4gICAgICAgIGN0eC5maWxsKCk7XHJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGN0eC5hcmModGhpcy5iYi54ICsgcmFkaXVzLCB0aGlzLmJiLnkgKyByYWRpdXMgKiAwLjUsIHJhZGl1cyAqIDAuMSwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZ2IoMCwgMCwgMClcIjtcclxuICAgICAgICBjdHguZmlsbCgpO1xyXG5cclxuICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhc3luYyB1cGRhdGVNb3V0aEFuZ2xlKCkge1xyXG4gICAgICAgIGlmIChCYlBhY21hbi5tb3V0aEFuZ2xlID49IEJiUGFjbWFuLm1heE1vdXRoQW5nbGUpIHtcclxuICAgICAgICAgICAgQmJQYWNtYW4ubW91dGhPcGVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKEJiUGFjbWFuLm1vdXRoQW5nbGUgPD0gMCkge1xyXG4gICAgICAgICAgICBCYlBhY21hbi5tb3V0aE9wZW5pbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKEJiUGFjbWFuLm1vdXRoT3BlbmluZykge1xyXG4gICAgICAgICAgICBCYlBhY21hbi5tb3V0aEFuZ2xlICs9IEJiUGFjbWFuLm1vdXRoQW5nbGVTdGVwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgQmJQYWNtYW4ubW91dGhBbmdsZSAtPSBCYlBhY21hbi5tb3V0aEFuZ2xlU3RlcDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQmJCbHVldG9vdGggfSBmcm9tIFwiLi9iYi1ibHVldG9vdGhcIjtcclxuaW1wb3J0IHsgQmJHYW1lIH0gZnJvbSBcIi4vYmItZ2FtZVwiO1xyXG5pbXBvcnQgeyBCYlBhY21hbiB9IGZyb20gXCIuL2JiLXBhY21hblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJiUGxheWVyIGV4dGVuZHMgQmJQYWNtYW4ge1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZTogQmJHYW1lKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgaWYgKCFnYW1lKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgcGxheWVyIGlzIG5vdCBwYXJ0IG9mIGEgZ2FtZS5cIilcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmIud2lkdGggPSB0aGlzLmJiLmhlaWdodCA9IGdhbWUuYmIuaGVpZ2h0ICogMC4xO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iYi55ID0gKGdhbWUuYmIuaCAtIHRoaXMuYmIuaCkgKiAwLjU7XHJcbiAgICAgICAgICAgIHRoaXMuYmIueCA9IChnYW1lLmJiLncgLSB0aGlzLmJiLncpICogMC4xNTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZShzY2VuZTogQmJHYW1lKSB7XHJcbiAgICAgICAgLy8gTm8gQmx1ZXRvb3RoXHJcbiAgICAgICAgaWYgKEJiQmx1ZXRvb3RoLmRhdGEgPT0gLTEpIHtcclxuICAgICAgICAgICAgLy8gbGVycD8gKGxpbmVhciBpbnRlcnBvbGF0aW9uKS4uLlxyXG4gICAgICAgICAgICAvLyB0aGlzLmJiLnkgPSAoc2NlbmUubW91c2VZIC0gdGhpcy5iYi55KSAqIDAuOSArIHRoaXMuYmIueTtcclxuXHJcbiAgICAgICAgICAgIC8vIG9yIHRlbGVwb3J0YXRpb24/XHJcbiAgICAgICAgICAgIHRoaXMuYmIueSA9IHNjZW5lLm1vdXNlWTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmIueSA9IChCYkdhbWUuZ2V0R2FtZSgpLmJiLmggLSB0aGlzLmJiLmgpICogQmJCbHVldG9vdGguZGF0YSAvIDgwMDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBCYkdhbWUgfSBmcm9tIFwiLi9iYi1nYW1lXCI7XHJcbmltcG9ydCB7IEJiUGFjbWFuIH0gZnJvbSBcIi4vYmItcGFjbWFuXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQmJUYXJnZXQgZXh0ZW5kcyBCYlBhY21hbiB7XHJcbiAgICB0b3VjaGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgdmVyc0xlQmFzID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5nb2luZ0xlZnQgPSB0cnVlO1xyXG5cclxuICAgICAgICBjb25zdCBnYW1lID0gQmJHYW1lLmdldEdhbWUoKTtcclxuICAgICAgICBpZiAoIWdhbWUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBlbGVtZW50IGlzIG5vdCBwYXJ0IG9mIGEgZ2FtZS5cIilcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmIuaGVpZ2h0ID0gdGhpcy5iYi53aWR0aCA9IGdhbWUuYmIuaGVpZ2h0ICogMC4yO1xyXG4gICAgICAgICAgICBjb25zdCBtYXJnaW5zID0gZ2FtZS5iYi5oZWlnaHQgKiAwLjE7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJiLnkgPSBNYXRoLnJhbmRvbSgpICogKGdhbWUuYmIuaGVpZ2h0IC0gdGhpcy5iYi5oZWlnaHQgLSBtYXJnaW5zKSArIG1hcmdpbnM7XHJcbiAgICAgICAgICAgIHRoaXMuYmIueCA9IGdhbWUuYmIudztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZShnYW1lOiBCYkdhbWUpIHtcclxuICAgICAgICBpZiAodGhpcy50b3VjaGVkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZlcnNMZUJhcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYi55ICs9IGdhbWUuYmIud2lkdGggKiAwLjAwNSAqIChnYW1lLnNjb3JlICsgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJiLnkgLT0gZ2FtZS5iYi53aWR0aCAqIDAuMDA1ICogKGdhbWUuc2NvcmUgKyAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5iYi54IC09IGdhbWUuYmIud2lkdGggKiAwLjAwNSAqIChnYW1lLnNjb3JlICsgMSksIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEJiR2FtZSB9IGZyb20gXCIuL2JiLWdhbWVcIjtcclxuaW1wb3J0IHsgQmJCbHVldG9vdGggfSBmcm9tIFwiLi9iYi1ibHVldG9vdGhcIjtcclxuXHJcbmNvbnN0IGJsdWV0b290aEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmx1ZXRvb3RoQnV0dG9uXCIpO1xyXG5ibHVldG9vdGhCdXR0b24/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXY6IEV2ZW50KSA9PiB7XHJcbiAgICBCYkJsdWV0b290aC5jb25uZWN0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaHRtbEV4Y2VwdEdhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImh0bWxFeGNlcHRHYW1lXCIpO1xyXG4gICAgICAgIGh0bWxFeGNlcHRHYW1lPy5zdHlsZS5zZXRQcm9wZXJ0eShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIik7XHJcbiAgICAgICAgY29uc3QgZ2FtZSA9IEJiR2FtZS5nZXRHYW1lKCk7XHJcbiAgICAgICAgZ2FtZS5zdGFydCgpO1xyXG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJBbiBlcnJvciBvY3VycmVkOlwiLCBlcnIpO1xyXG4gICAgfSlcclxufSlcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==