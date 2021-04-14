(()=>{"use strict";var t={36:(t,e)=>{e.k=void 0;var i=function(){function t(t,e,i,s){this._x1=t,this._y1=e,this._x2=i,this._y2=s,this.order()}return Object.defineProperty(t.prototype,"height",{get:function(){return this.y2-this.y1},set:function(t){this.y2=this.y1+t,this.orderY()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"h",{get:function(){return this.height},set:function(t){this.height=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"width",{get:function(){return this.x2-this.x1},set:function(t){this.x2=this.x1+t,this.orderX()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"w",{get:function(){return this.width},set:function(t){this.width=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"x1",{get:function(){return this._x1},set:function(t){this._x1=t,this.orderX()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"y1",{get:function(){return this._y1},set:function(t){this._y1=t,this.orderY()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"x2",{get:function(){return this._x2},set:function(t){this._x2=t,this.orderX()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"y2",{get:function(){return this._y2},set:function(t){this._y2=t,this.orderY()},enumerable:!1,configurable:!0}),t.fromHW=function(e,i,s,n){return void 0===s&&(s=0),void 0===n&&(n=0),new t(s,n,s+i,n+e)},t.prototype.containsPoint=function(e,i){return t.between(e,this.x1,this.x2)&&t.between(i,this.y1,this.y2)},t.between=function(t,e,i){return t>=e&&t<=i},t.prototype.intersects=function(t){return!(this.x1>t.x2||this.x2<t.x1||this.y1>t.y2||this.y2<t.y1)},t.prototype.union=function(e){return new t(Math.min(this.x1,e.x1),Math.min(this.y1,e.y1),Math.max(this.x2,e.x2),Math.max(this.y2,e.y2))},t.prototype.intersection=function(e){return new t(Math.max(this.x1,e.x1),Math.max(this.y1,e.y1),Math.min(this.x2,e.x2),Math.min(this.y2,e.y2))},Object.defineProperty(t.prototype,"x",{get:function(){return this._x1},set:function(t){var e=this.width;this._x1=t,this._x2=t+e},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"y",{get:function(){return this._y1},set:function(t){var e=this.height;this._y1=t,this._y2=t+e},enumerable:!1,configurable:!0}),t.prototype.move=function(t,e){this.x=t,this.y=e},t.prototype.translate=function(t,e){this.x+=t,this.y+=e},t.smallestBoxEnclosing=function(t){return this.sme(t)},t.sme=function(e){var i=new t(0,0,0,0);return e.forEach((function(t){i=i.union(t)})),i},t.prototype.copy=function(){return new t(this.x1,this.y1,this.x2,this.y2)},t.prototype.addMargin=function(t){this._x1-=t,this._x2+=t,this._y1-=t,this._y2+=t,this.order()},t.prototype.addMargins=function(t,e,i,s){this._x1-=t,this._x2+=i,this._y1-=e,this._y2+=s,this.order()},t.prototype.order=function(){this.orderX(),this.orderY()},t.prototype.orderX=function(){var t;this.x1>this.x2&&(t=[this.x2,this.x1],this.x1=t[0],this.x2=t[1])},t.prototype.orderY=function(){var t;this.y1>this.y2&&(t=[this.y2,this.y1],this.y1=t[0],this.y2=t[1])},t}();e.k=i}},e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={exports:{}};return t[s](n,n.exports,i),n.exports}(()=>{var t=i(36);class e{constructor(){this.bb=new t.k(0,0,0,0)}paint(t){}move(t){}}class s extends e{constructor(t,e=!1){super(),this.bb.x=e?Math.random()*t.bb.w:t.bb.w,this.bb.y=Math.random()*t.bb.h,this.bb.h=Math.max(Math.random()*t.bb.h*.1,.01),this.bb.w=.4*this.bb.h}paint(t){t.save(),t.fillStyle="lightgrey";const e=.5*(this.bb.x1+this.bb.x2),i=.2*this.bb.w,s=e-i,n=e+i;t.moveTo(s,this.bb.y2);const h=this.bb.y2-.3*this.bb.h;t.lineTo(s,h),t.lineTo(this.bb.x,h),t.lineTo(e,this.bb.y1),t.lineTo(this.bb.x2,h),t.lineTo(n,h),t.lineTo(n,this.bb.y2),t.closePath(),t.fill(),t.restore()}}class n{static fillFirstEmpty(t,e,...i){for(let s=0;s<e.length;s++)if(!e[s]){const n=new t(...i);return void(e[s]=n)}e.push(new t(...i))}}class h{constructor(){this.trees=[]}treeCallback(){y.getGame().playing&&(n.fillFirstEmpty(s,this.trees,y.getGame()),setTimeout(this.treeCallback.bind(this),Math.max(1e3*Math.random(),100)))}reset(){this.trees=[]}start(){this.trees=[];for(let t=0;t<Math.max(Math.ceil(100*Math.random()),50);t++)this.trees.push(new s(y.getGame(),!0));this.treeCallback()}paint(t){for(const e of this.trees)e&&e.paint(t)}move(t){for(let e=0;e<this.trees.length;e++){const i=this.trees[e];i&&(i.bb.x-=.001*t.bb.w,i.bb.intersects(t.bb)||delete this.trees[e])}}}class r{static init(){window.addEventListener("mousemove",(t=>{this.mouseX=t.clientX,this.mouseY=t.clientY}))}}r.mouseX=-1,r.mouseY=-1;class o extends e{constructor(){super(...arguments),this.mouthSide=1}set goingLeft(t){this.mouthSide=Number(!t)}paint(t){t.save();const e=.5*this.bb.w,i=Number(!this.mouthSide);t.beginPath(),t.arc(this.bb.x+e,this.bb.y+e,e,(this.mouthSide-o.mouthAngle)*Math.PI,(i-o.mouthAngle)*Math.PI,!1),t.fillStyle="rgb(255, 255, 0)",t.fill(),t.beginPath(),t.arc(this.bb.x+e,this.bb.y+e,e,(i+o.mouthAngle)*Math.PI,(this.mouthSide+o.mouthAngle)*Math.PI,!1),t.fill(),t.beginPath(),t.arc(this.bb.x+e,this.bb.y+.5*e,.1*e,0,2*Math.PI,!1),t.fillStyle="rgb(0, 0, 0)",t.fill(),t.restore()}static updateMouthAngle(){return t=this,e=void 0,s=function*(){o.mouthAngle>=o.maxMouthAngle?o.mouthOpening=!1:o.mouthAngle<=0&&(o.mouthOpening=!0),o.mouthOpening?o.mouthAngle+=o.mouthAngleStep:o.mouthAngle-=o.mouthAngleStep},new((i=void 0)||(i=Promise))((function(n,h){function r(t){try{a(s.next(t))}catch(t){h(t)}}function o(t){try{a(s.throw(t))}catch(t){h(t)}}function a(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(r,o)}a((s=s.apply(t,e||[])).next())}));var t,e,i,s}}o.maxMouthAngle=.2,o.mouthAngle=o.maxMouthAngle,o.mouthOpening=!1,o.mouthAngleStep=.005;class a{static connect(){return t=this,e=void 0,s=function*(){return navigator.bluetooth.requestDevice({filters:[{name:"ENTRALPI"}],optionalServices:["0000fff0-0000-1000-8000-00805f9b34fb"]}).then((t=>{if(!t.gatt)throw new Error("No gatt server");return t.gatt.connect()})).then((t=>t.getPrimaryService("0000fff0-0000-1000-8000-00805f9b34fb"))).then((t=>t.getCharacteristic("0000fff4-0000-1000-8000-00805f9b34fb"))).then((t=>{t.properties.notify?(t.addEventListener("characteristicvaluechanged",(t=>{var e;const i=t.target;(null===(e=null==i?void 0:i.value)||void 0===e?void 0:e.getInt16(0))&&(a.data=i.value.getInt16(0))})),t.startNotifications()):console.error("Cannot be notified by characteristic?... Weird")}))},new((i=void 0)||(i=Promise))((function(n,h){function r(t){try{a(s.next(t))}catch(t){h(t)}}function o(t){try{a(s.throw(t))}catch(t){h(t)}}function a(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(r,o)}a((s=s.apply(t,e||[])).next())}));var t,e,i,s}}a.data=-1;class c extends o{constructor(t){if(super(),!t)throw new Error("This player is not part of a game.");this.bb.width=this.bb.height=.3*t.bb.height,this.bb.y=.5*(t.bb.h-this.bb.h),this.bb.x=.15*(t.bb.w-this.bb.w)}move(t){-1==a.data?this.bb.y=r.mouseY-.5*this.bb.h:this.bb.y=(t.bb.h-this.bb.h)*a.data/8e3}}class b extends e{constructor(){super(),this.value=0,this.minSizePx=30,this.maxSizePx=80,this.sizePx=this.minSizePx,this.marginTop=50,this.bb.y=this.marginTop}reset(){this.bb.y=this.marginTop,this.sizePx=this.minSizePx,this.value=0}paint(t){t.save(),t.font=this.sizePx.toFixed(3)+"px Helvetica";const e=this.value.toString(),i=t.measureText(e);t.fillText(e,.5*(t.canvas.width-i.width),this.bb.y),t.restore()}move(t){const e=.5*t.bb.h-this.marginTop;this.bb.y+=.01*e;const i=(this.bb.y-this.marginTop)/e;this.sizePx+=(this.maxSizePx-this.sizePx)*i}}class u extends e{constructor(t){super(),this.touched=!1,this.bb.height=this.bb.width=.02*t.bb.h;const e=.1*t.bb.height;this.bb.y=Math.random()*(t.bb.height-this.bb.height-e)+e,this.bb.x=t.bb.w}paint(t){if(this.touched)return;const e=.5*(this.bb.x2-this.bb.x1);t.save(),t.beginPath(),t.arc(this.bb.x+e,this.bb.y+e,e,0,2*Math.PI),t.fill(),t.restore()}move(t){return this.bb.x-=5e-5*t.bb.width*(t.score.value+100),this}}function l(t,e,i){return void 0!==e?void 0!==i?Math.min(Math.max(e,t),i):Math.max(e,t):void 0!==i?Math.min(i,t):t}var f=function(t,e,i,s){return new(i||(i=Promise))((function(n,h){function r(t){try{a(s.next(t))}catch(t){h(t)}}function o(t){try{a(s.throw(t))}catch(t){h(t)}}function a(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(r,o)}a((s=s.apply(t,e||[])).next())}))};class y extends e{constructor(){var t,e;super(),this.playing=!1,r.init();const i=document.body;i.style.margin="0px",i.style.height=`${window.innerHeight}px`;const s=document.createElement("canvas");s.style.display="block",s.style.position="absolute",s.height=this.bb.height=i.scrollHeight,s.width=this.bb.width=i.scrollWidth,document.body.appendChild(s),this.ctx=s.getContext("2d"),this.score=new b,this.player=new c(this),this.background=new h,this.targets=[],null===(t=this.ctx)||void 0===t||t.canvas.addEventListener("click",(()=>this.restartIfNotPlaying())),null===(e=this.ctx)||void 0===e||e.canvas.addEventListener("keyup",(()=>this.restartIfNotPlaying()))}restartIfNotPlaying(){this.playing||this.restart()}restart(){this.targets=[],this.score.reset(),this.background.reset(),this.start()}refresh(){return f(this,void 0,void 0,(function*(){if(this.playing&&this.targets.length){if(!this.ctx)return this.stop(),void console.error("no drawing context");requestAnimationFrame(this.refresh.bind(this)),this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),this.background.move(this),this.background.paint(this.ctx),this.score.paint(this.ctx),this.player.move(this),this.player.paint(this.ctx),this.targets.forEach((t=>{if(t){if(t.move(this),t.bb.intersects(this.bb)&&this.ctx)t.paint(this.ctx);else{if(!(t.bb.x<0))return void this.removeTarget(t);this.playing=!1,this.gameOverFrame()}!t.touched&&t.bb.intersects(this.player.bb)&&(this.removeTarget(t),t.touched=!0,this.score.value++)}})),o.updateMouthAngle()}}))}gameOverFrame(t=0){if(!this.playing)if(this.score.move(this),t>100){if(this.ctx){this.ctx.save(),this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.bb.w,this.bb.h),this.ctx.fillStyle="white",this.score.paint(this.ctx),this.ctx.font="30px Helvetica";const t="Appuyez sur une touche pour rejouer.",e=this.ctx.measureText(t);this.ctx.fillText(t,.5*(this.bb.w-e.width),.5*this.bb.h+2*this.score.sizePx),this.ctx.restore()}}else{if(!this.ctx)throw new Error("No Context set at end of game???");this.ctx.save(),this.ctx.fillStyle="#00000055",this.ctx.fillRect(0,0,this.bb.w,this.bb.h),this.ctx.fillStyle="white",this.score.paint(this.ctx),this.ctx.restore(),setTimeout((()=>{this.gameOverFrame.bind(this)(t+1)}),30)}}removeTarget(t){return f(this,void 0,void 0,(function*(){delete this.targets[this.targets.indexOf(t)]}))}addTarget(){n.fillFirstEmpty(u,this.targets,this)}addTargetCallbacks(){if(!this.playing)return;this.addTarget();const t=1e3*l(5-3*Math.log10(this.score.value)-Math.random(),.5,4);this.score.value>30&&l(this.player.bb.height=this.player.bb.width=.99*this.player.bb.height,10),setTimeout(this.addTargetCallbacks.bind(this),t)}start(){this.playing=!0,this.addTargetCallbacks(),this.background.start(),this.refresh()}stop(){this.playing=!1}static getGame(){return y.pGame||(y.pGame=new y),y.pGame}}function d(){const t=document.getElementById("htmlExceptGame");null==t||t.style.setProperty("display","none"),y.getGame().start()}y.pGame=null,navigator.bluetooth||d();const p=document.getElementById("bluetoothButton");null==p||p.addEventListener("click",(t=>{a.connect().then((()=>{d()})).catch((t=>{console.error("An error ocurred:",t)}))}))})()})();