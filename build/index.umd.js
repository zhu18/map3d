(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(global = global || self, factory(global.Map3D = {}, global.THREE));
}(this, (function (exports, THREE) { 'use strict';

	/**
	 * @author alteredq / http://alteredqualia.com/
	 * @author mr.doob / http://mrdoob.com/
	 */

	var Detector = {

		canvas: !! window.CanvasRenderingContext2D,
		webgl: ( function () {

			try {

				var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );

			} catch ( e ) {

				return false;

			}

		} )(),
		workers: !! window.Worker,
		fileapi: window.File && window.FileReader && window.FileList && window.Blob,

		getWebGLErrorMessage: function () {

			var element = document.createElement( 'div' );
			element.id = 'webgl-error-message';
			element.style.fontFamily = 'monospace';
			element.style.fontSize = '13px';
			element.style.fontWeight = 'normal';
			element.style.textAlign = 'center';
			element.style.background = '#fff';
			element.style.color = '#000';
			element.style.padding = '1.5em';
			element.style.width = '400px';
			element.style.margin = '5em auto 0';

			if ( ! this.webgl ) {

				element.innerHTML = window.WebGLRenderingContext ? [
					'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
					'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
				].join( '\n' ) : [
					'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
					'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
				].join( '\n' );

			}

			return element;

		},

		addGetWebGLMessage: function ( parameters ) {

			var parent, id, element;

			parameters = parameters || {};

			parent = parameters.parent !== undefined ? parameters.parent : document.body;
			id = parameters.id !== undefined ? parameters.id : 'oldie';

			element = Detector.getWebGLErrorMessage();
			element.id = id;

			parent.appendChild( element );

		}

	};

	// tween.js v.0.15.0 https://github.com/sole/tween.js
	void 0 === Date.now && (Date.now = function () {
	  return (new Date).valueOf()
	});
	var TWEEN = TWEEN || function () {
	    var n = [];
	    return {
	      REVISION: "14", getAll: function () {
	        return n
	      }, removeAll: function () {
	        n = [];
	      }, add: function (t) {
	        n.push(t);
	      }, remove: function (t) {
	        var r = n.indexOf(t);
	        -1 !== r && n.splice(r, 1);
	      }, update: function (t) {
	        if (0 === n.length){ return !1; }
	        var r = 0;
	        for (t = void 0 !== t ? t : "undefined" != typeof window && void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(); r < n.length;){ n[r].update(t) ? r++ : n.splice(r, 1); }
	        return !0
	      }
	    }
	  }();
	TWEEN.Tween = function (n) {
	  var t = n, r = {}, i = {}, u = {}, o = 1e3, e = 0, a = !1, f = !1, s = 0, h = null,
	    l = TWEEN.Easing.Linear.None, p = TWEEN.Interpolation.Linear, E = [], d = null, v = !1, I = null, w = null,
	    M = null;
	  for (var O in n){ r[O] = parseFloat(n[O], 10); }
	  this.to = function (n, t) {
	    return void 0 !== t && (o = t), i = n, this
	  }, this.start = function (n) {
	    TWEEN.add(this), f = !0, v = !1, h = void 0 !== n ? n : "undefined" != typeof window && void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(), h += s;
	    for (var o in i) {
	      if (i[o] instanceof Array) {
	        if (0 === i[o].length){ continue; }
	        i[o] = [t[o]].concat(i[o]);
	      }
	      r[o] = t[o], r[o] instanceof Array == !1 && (r[o] *= 1), u[o] = r[o] || 0;
	    }
	    return this
	  }, this.stop = function () {
	    return f ? (TWEEN.remove(this), f = !1, null !== M && M.call(t), this.stopChainedTweens(), this) : this
	  }, this.stopChainedTweens = function () {
	    for (var n = 0, t = E.length; t > n; n++){ E[n].stop(); }
	  }, this.delay = function (n) {
	    return s = n, this
	  }, this.repeat = function (n) {
	    return e = n, this
	  }, this.yoyo = function (n) {
	    return a = n, this
	  }, this.easing = function (n) {
	    return l = n, this
	  }, this.interpolation = function (n) {
	    return p = n, this
	  }, this.chain = function () {
	    return E = arguments, this
	  }, this.onStart = function (n) {
	    return d = n, this
	  }, this.onUpdate = function (n) {
	    return I = n, this
	  }, this.onComplete = function (n) {
	    return w = n, this
	  }, this.onStop = function (n) {
	    return M = n, this
	  }, this.update = function (n) {
	    var f;
	    if (h > n){ return !0; }
	    v === !1 && (null !== d && d.call(t), v = !0);
	    var M = (n - h) / o;
	    M = M > 1 ? 1 : M;
	    var O = l(M);
	    for (f in i) {
	      var m = r[f] || 0, N = i[f];
	      N instanceof Array ? t[f] = p(N, O) : ("string" == typeof N && (N = m + parseFloat(N, 10)), "number" == typeof N && (t[f] = m + (N - m) * O));
	    }
	    if (null !== I && I.call(t, O), 1 == M) {
	      if (e > 0) {
	        isFinite(e) && e--;
	        for (f in u) {
	          if ("string" == typeof i[f] && (u[f] = u[f] + parseFloat(i[f], 10)), a) {
	            var T = u[f];
	            u[f] = i[f], i[f] = T;
	          }
	          r[f] = u[f];
	        }
	        return h = n + s, !0
	      }
	      null !== w && w.call(t);
	      for (var g = 0, W = E.length; W > g; g++){ E[g].start(n); }
	      return !1
	    }
	    return !0
	  };
	}, TWEEN.Easing = {
	  Linear: {
	    None: function (n) {
	      return n
	    }
	  }, Quadratic: {
	    In: function (n) {
	      return n * n
	    }, Out: function (n) {
	      return n * (2 - n)
	    }, InOut: function (n) {
	      return (n *= 2) < 1 ? .5 * n * n : -.5 * (--n * (n - 2) - 1)
	    }
	  }, Cubic: {
	    In: function (n) {
	      return n * n * n
	    }, Out: function (n) {
	      return --n * n * n + 1
	    }, InOut: function (n) {
	      return (n *= 2) < 1 ? .5 * n * n * n : .5 * ((n -= 2) * n * n + 2)
	    }
	  }, Quartic: {
	    In: function (n) {
	      return n * n * n * n
	    }, Out: function (n) {
	      return 1 - --n * n * n * n
	    }, InOut: function (n) {
	      return (n *= 2) < 1 ? .5 * n * n * n * n : -.5 * ((n -= 2) * n * n * n - 2)
	    }
	  }, Quintic: {
	    In: function (n) {
	      return n * n * n * n * n
	    }, Out: function (n) {
	      return --n * n * n * n * n + 1
	    }, InOut: function (n) {
	      return (n *= 2) < 1 ? .5 * n * n * n * n * n : .5 * ((n -= 2) * n * n * n * n + 2)
	    }
	  }, Sinusoidal: {
	    In: function (n) {
	      return 1 - Math.cos(n * Math.PI / 2)
	    }, Out: function (n) {
	      return Math.sin(n * Math.PI / 2)
	    }, InOut: function (n) {
	      return .5 * (1 - Math.cos(Math.PI * n))
	    }
	  }, Exponential: {
	    In: function (n) {
	      return 0 === n ? 0 : Math.pow(1024, n - 1)
	    }, Out: function (n) {
	      return 1 === n ? 1 : 1 - Math.pow(2, -10 * n)
	    }, InOut: function (n) {
	      return 0 === n ? 0 : 1 === n ? 1 : (n *= 2) < 1 ? .5 * Math.pow(1024, n - 1) : .5 * (-Math.pow(2, -10 * (n - 1)) + 2)
	    }
	  }, Circular: {
	    In: function (n) {
	      return 1 - Math.sqrt(1 - n * n)
	    }, Out: function (n) {
	      return Math.sqrt(1 - --n * n)
	    }, InOut: function (n) {
	      return (n *= 2) < 1 ? -.5 * (Math.sqrt(1 - n * n) - 1) : .5 * (Math.sqrt(1 - (n -= 2) * n) + 1)
	    }
	  }, Elastic: {
	    In: function (n) {
	      var t, r = .1, i = .4;
	      return 0 === n ? 0 : 1 === n ? 1 : (!r || 1 > r ? (r = 1, t = i / 4) : t = i * Math.asin(1 / r) / (2 * Math.PI), -(r * Math.pow(2, 10 * (n -= 1)) * Math.sin(2 * (n - t) * Math.PI / i)))
	    }, Out: function (n) {
	      var t, r = .1, i = .4;
	      return 0 === n ? 0 : 1 === n ? 1 : (!r || 1 > r ? (r = 1, t = i / 4) : t = i * Math.asin(1 / r) / (2 * Math.PI), r * Math.pow(2, -10 * n) * Math.sin(2 * (n - t) * Math.PI / i) + 1)
	    }, InOut: function (n) {
	      var t, r = .1, i = .4;
	      return 0 === n ? 0 : 1 === n ? 1 : (!r || 1 > r ? (r = 1, t = i / 4) : t = i * Math.asin(1 / r) / (2 * Math.PI), (n *= 2) < 1 ? -.5 * r * Math.pow(2, 10 * (n -= 1)) * Math.sin(2 * (n - t) * Math.PI / i) : r * Math.pow(2, -10 * (n -= 1)) * Math.sin(2 * (n - t) * Math.PI / i) * .5 + 1)
	    }
	  }, Back: {
	    In: function (n) {
	      var t = 1.70158;
	      return n * n * ((t + 1) * n - t)
	    }, Out: function (n) {
	      var t = 1.70158;
	      return --n * n * ((t + 1) * n + t) + 1
	    }, InOut: function (n) {
	      var t = 2.5949095;
	      return (n *= 2) < 1 ? .5 * n * n * ((t + 1) * n - t) : .5 * ((n -= 2) * n * ((t + 1) * n + t) + 2)
	    }
	  }, Bounce: {
	    In: function (n) {
	      return 1 - TWEEN.Easing.Bounce.Out(1 - n)
	    }, Out: function (n) {
	      return 1 / 2.75 > n ? 7.5625 * n * n : 2 / 2.75 > n ? 7.5625 * (n -= 1.5 / 2.75) * n + .75 : 2.5 / 2.75 > n ? 7.5625 * (n -= 2.25 / 2.75) * n + .9375 : 7.5625 * (n -= 2.625 / 2.75) * n + .984375
	    }, InOut: function (n) {
	      return .5 > n ? .5 * TWEEN.Easing.Bounce.In(2 * n) : .5 * TWEEN.Easing.Bounce.Out(2 * n - 1) + .5
	    }
	  }
	}, TWEEN.Interpolation = {
	  Linear: function (n, t) {
	    var r = n.length - 1, i = r * t, u = Math.floor(i), o = TWEEN.Interpolation.Utils.Linear;
	    return 0 > t ? o(n[0], n[1], i) : t > 1 ? o(n[r], n[r - 1], r - i) : o(n[u], n[u + 1 > r ? r : u + 1], i - u)
	  }, Bezier: function (n, t) {
	    var r, i = 0, u = n.length - 1, o = Math.pow, e = TWEEN.Interpolation.Utils.Bernstein;
	    for (r = 0; u >= r; r++){ i += o(1 - t, u - r) * o(t, r) * n[r] * e(u, r); }
	    return i
	  }, CatmullRom: function (n, t) {
	    var r = n.length - 1, i = r * t, u = Math.floor(i), o = TWEEN.Interpolation.Utils.CatmullRom;
	    return n[0] === n[r] ? (0 > t && (u = Math.floor(i = r * (1 + t))), o(n[(u - 1 + r) % r], n[u], n[(u + 1) % r], n[(u + 2) % r], i - u)) : 0 > t ? n[0] - (o(n[0], n[0], n[1], n[1], -i) - n[0]) : t > 1 ? n[r] - (o(n[r], n[r], n[r - 1], n[r - 1], i - r) - n[r]) : o(n[u ? u - 1 : 0], n[u], n[u + 1 > r ? r : u + 1], n[u + 2 > r ? r : u + 2], i - u)
	  }, Utils: {
	    Linear: function (n, t, r) {
	      return (t - n) * r + n
	    }, Bernstein: function (n, t) {
	      var r = TWEEN.Interpolation.Utils.Factorial;
	      return r(n) / r(t) / r(n - t)
	    }, Factorial: function () {
	      var n = [1];
	      return function (t) {
	        var r, i = 1;
	        if (n[t]){ return n[t]; }
	        for (r = t; r > 1; r--){ i *= r; }
	        return n[t] = i
	      }
	    }(), CatmullRom: function (n, t, r, i, u) {
	      var o = .5 * (r - n), e = .5 * (i - t), a = u * u, f = u * a;
	      return (2 * t - 2 * r + o + e) * f + (-3 * t + 3 * r - 2 * o - e) * a + o * u + t
	    }
	  }
	};

	/**
	 * Created by ADMIN on 2017/12/18.
	 */

	//颜色格式化 '#999999','rgb','hsl',0x999999
	function colorToHex(color){
	  if(typeof color==="string" )
	  {
	    if(color.indexOf('#')!==-1)
	      { color = parseInt(color.replace('#',''),16); }
	    else
	      { color = new THREE.Color(color).getHex(); }
	  }
	  return color;
	}

	/**
	   * 过渡动画
	   * @param {Object|*} from - 修改的启始值
	   * @param {Object|*} to - 修改的结束值
	   * @param {number} [time] - 完成时间
	   * @param {number} [delay=0] - 延迟时间
	   * @param {Tween.Easing} [easing=TWEEN.Easing.Linear.None] -动画类型
	   * @param {callback} [callback] - 完成回调
	   * @example
	   * $.transition(area.position, {x:0,y:0,z:10}, 1000, 500, TWEEN.Easing.Quartic.Out, callback)
	   */
	   function transition(from,to,time,delay,easing,callback){
	    if(typeof time !=='number'){
	      time=1000;
	    }
	    if(!callback){ callback=()=>{}; }
	    
	    new TWEEN.Tween(from).to(to,time).delay(delay||0)
	    .easing(easing||TWEEN.Easing.Linear.None)
	    .start().onComplete(callback);
	  }

	  var extend = function() {
	  var copyIsArray,
	    toString = Object.prototype.toString,
	    hasOwn = Object.prototype.hasOwnProperty,

	    class2type = {
	      '[object Boolean]': 'boolean',
	      '[object Number]': 'number',
	      '[object String]': 'string',
	      '[object Function]': 'function',
	      '[object Array]': 'array',
	      '[object Date]': 'date',
	      '[object RegExp]': 'regExp',
	      '[object Object]': 'object'
	    },

	    type = function(obj) {
	      return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
	    },

	    isWindow = function(obj) {
	      return obj && typeof obj === "object" && "setInterval" in obj;
	    },

	    isArray = Array.isArray || function(obj) {
	        return type(obj) === "array";
	      },

	    isPlainObject = function(obj) {
	      if (!obj || type(obj) !== "object" || obj.nodeType || isWindow(obj)) {
	        return false;
	      }

	      if (obj.constructor && !hasOwn.call(obj, "constructor") &&
	        !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
	        return false;
	      }

	      var key;
	      for (key in obj) {}

	      return key === undefined || hasOwn.call(obj, key);
	    },

	    extend = function(deep, target, options) {
	      for (var name in options) {
	        var src = target[name];
	        var copy = options[name];

	        if (target === copy) {
	          continue;
	        }

	        if (deep && copy &&
	          (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
	          if (copyIsArray) {
	            copyIsArray = false;
	            var clone = src && isArray(src) ? src : [];

	          } else {
	            var clone = src && isPlainObject(src) ? src : {};
	          }

	          target[name] = extend(deep, clone, copy);
	        } else if (copy !== undefined) {
	          target[name] = copy;
	        }
	      }

	      return target;
	    };

	  return extend;
	}();

	/**
	 * Created by zhu18.github.io on 2017/12/05.
	 * 3D文字
	 */
	var Font3D$1 = /*@__PURE__*/(function (superclass) {
	  function Font3D(txt,opt){
	    superclass.call(this);
	    this.type="Font3D";
	    this.name=txt;
	    var _opt = {
	      size: 50,
	      follow:false,
	      family:'Arial',
	      borderColor: '#000000', //background-color, default: random color
	      color: '#ffffff', //text color, default: random color
	      style:'oblique', //font-style, can be: normal / italic / oblique, default: 'oblique'
	      weight: 'bold', //font-weight, can be: normal / bold / bolder / lighter / Number, default: 'bold'
	    };
	    Object.assign(_opt,opt);
	    Object.assign(this.userData,_opt);

	    this._textObj=null;
	    this.getText2D(txt,_opt);
	  }

	  if ( superclass ) Font3D.__proto__ = superclass;
	  Font3D.prototype = Object.create( superclass && superclass.prototype );
	  Font3D.prototype.constructor = Font3D;

	  Font3D.prototype.getText2D = function getText2D (text,opt){
	    var canvas = document.createElement('canvas');
	    var context = canvas.getContext('2d');
	    var canvas_width = 512;//context.measureText( text ).width;
	    var canvas_height = 512;//opt.size;
	    canvas.width=canvas_width;
	    canvas.height=canvas_height;
	    context.clearRect(0, 0, canvas_width, canvas_height);
	    // context.fillStyle = 'red';
	    // context.fillRect(0,0,canvas_width, canvas_height)
	    // let scale=1.0;
	    //context.translate(canvas_width / 2, canvas_height / 2);
	    //context.scale(scale, scale);
	  
	    context.font = '100px '+opt.family;
	    context.fillStyle = opt.color;
	    context.textAlign='center';//文本程度对齐方法
	    context.textBaseline='middle';//文本垂曲标的目的，基线位置
	    context.fillText(text, 256, canvas_height/2);
	    context.strokeStyle  = opt.borderColor;
	    context.strokeText(text, 256, canvas_height/2);
	  
	    // canvas contents will be used for a texture
	    var texture = new THREE.Texture(canvas);
	    texture.needsUpdate = true;
	  
	    if(opt.follow){
	      var spriteMaterial = new THREE.SpriteMaterial({ map: texture});
	      this._textObj = new THREE.Sprite( spriteMaterial );
	    }
	    else {
	      var material = new THREE.MeshBasicMaterial({ map: texture,color:0xffffff,transparent:true, depthTest:false });
	      var geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
	      this._textObj = new THREE.Mesh(geometry, material);
	    }
	    this._textObj.scale.set(opt.size/10,opt.size/10,1.0);
	    this._textObj.renderOrder=99;
	    this.add(this._textObj);
	  };

	  return Font3D;
	}(THREE.Object3D));

	/**
	 * @author qiao / https://github.com/qiao
	 * @author mrdoob / http://mrdoob.com
	 * @author alteredq / http://alteredqualia.com/
	 * @author WestLangley / http://github.com/WestLangley
	 * @author erich666 / http://erichaines.com
	 */

	// This set of controls performs orbiting, dollying (zooming), and panning.
	// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
	//
	//    Orbit - left mouse / touch: one finger move
	//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
	//    Pan - right mouse, or arrow keys / touch: three finger swipe

	function OrbitControls ( object, domElement ) {

	  this.object = object;

	  this.domElement = ( domElement !== undefined ) ? domElement : document;

	  // Set to false to disable this control
	  this.enabled = true;

	  // "target" sets the location of focus, where the object orbits around
	  this.target = new THREE.Vector3();

	  // How far you can dolly in and out ( PerspectiveCamera only )
	  this.minDistance = 0;
	  this.maxDistance = Infinity;

	  // How far you can zoom in and out ( OrthographicCamera only )
	  this.minZoom = 0;
	  this.maxZoom = Infinity;

	  // How far you can orbit vertically, upper and lower limits.
	  // Range is 0 to Math.PI radians.
	  this.minPolarAngle = 0; // radians
	  this.maxPolarAngle = Math.PI; // radians

	  // How far you can orbit horizontally, upper and lower limits.
	  // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
	  this.minAzimuthAngle = - Infinity; // radians
	  this.maxAzimuthAngle = Infinity; // radians

	  // Set to true to enable damping (inertia)
	  // If damping is enabled, you must call controls.update() in your animation loop
	  this.enableDamping = false;
	  this.dampingFactor = 0.25;

	  // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
	  // Set to false to disable zooming
	  this.enableZoom = true;
	  this.zoomSpeed = 1.0;

	  // Set to false to disable rotating
	  this.enableRotate = true;
	  this.rotateSpeed = 1.0;

	  // Set to false to disable panning
	  this.enablePan = true;
	  this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

	  // Set to true to automatically rotate around the target
	  // If auto-rotate is enabled, you must call controls.update() in your animation loop
	  this.autoRotate = false;
	  this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

	  // Set to false to disable use of the keys
	  this.enableKeys = true;

	  // The four arrow keys
	  this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

	  // Mouse buttons
	  this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

	  // for reset
	  this.target0 = this.target.clone();
	  this.position0 = this.object.position.clone();
	  this.zoom0 = this.object.zoom;

	  //
	  // public methods
	  //

	  this.getPolarAngle = function () {

	    return spherical.phi;

	  };

	  this.getAzimuthalAngle = function () {

	    return spherical.theta;

	  };

	  this.saveState = function () {

	    scope.target0.copy( scope.target );
	    scope.position0.copy( scope.object.position );
	    scope.zoom0 = scope.object.zoom;

	  };

	  this.reset = function () {

	    scope.target.copy( scope.target0 );
	    scope.object.position.copy( scope.position0 );
	    scope.object.zoom = scope.zoom0;

	    scope.object.updateProjectionMatrix();
	    scope.dispatchEvent( changeEvent );

	    scope.update();

	    state = STATE.NONE;

	  };

	  // this method is exposed, but perhaps it would be better if we can make it private...
	  this.update = function () {

	    var offset = new THREE.Vector3();

	    // so camera.up is the orbit axis
	    var quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
	    var quatInverse = quat.clone().inverse();

	    var lastPosition = new THREE.Vector3();
	    var lastQuaternion = new THREE.Quaternion();

	    return function update() {

	      var position = scope.object.position;

	      offset.copy( position ).sub( scope.target );

	      // rotate offset to "y-axis-is-up" space
	      offset.applyQuaternion( quat );

	      // angle from z-axis around y-axis
	      spherical.setFromVector3( offset );

	      if ( scope.autoRotate && state === STATE.NONE ) {

	        rotateLeft( getAutoRotationAngle() );

	      }

	      spherical.theta += sphericalDelta.theta;
	      spherical.phi += sphericalDelta.phi;

	      // restrict theta to be between desired limits
	      spherical.theta = Math.max( scope.minAzimuthAngle, Math.min( scope.maxAzimuthAngle, spherical.theta ) );

	      // restrict phi to be between desired limits
	      spherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );

	      spherical.makeSafe();


	      spherical.radius *= scale;

	      // restrict radius to be between desired limits
	      spherical.radius = Math.max( scope.minDistance, Math.min( scope.maxDistance, spherical.radius ) );

	      // move target to panned location
	      scope.target.add( panOffset );

	      offset.setFromSpherical( spherical );

	      // rotate offset back to "camera-up-vector-is-up" space
	      offset.applyQuaternion( quatInverse );

	      position.copy( scope.target ).add( offset );

	      scope.object.lookAt( scope.target );

	      if ( scope.enableDamping === true ) {

	        sphericalDelta.theta *= ( 1 - scope.dampingFactor );
	        sphericalDelta.phi *= ( 1 - scope.dampingFactor );

	      } else {

	        sphericalDelta.set( 0, 0, 0 );

	      }

	      scale = 1;
	      panOffset.set( 0, 0, 0 );

	      // update condition is:
	      // min(camera displacement, camera rotation in radians)^2 > EPS
	      // using small-angle approximation cos(x/2) = 1 - x^2 / 8

	      if ( zoomChanged ||
	        lastPosition.distanceToSquared( scope.object.position ) > EPS ||
	        8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ) {

	        scope.dispatchEvent( changeEvent );

	        lastPosition.copy( scope.object.position );
	        lastQuaternion.copy( scope.object.quaternion );
	        zoomChanged = false;

	        return true;

	      }

	      return false;

	    };

	  }();

	  this.dispose = function () {

	    scope.domElement.removeEventListener( 'contextmenu', onContextMenu, false );
	    scope.domElement.removeEventListener( 'mousedown', onMouseDown, false );
	    scope.domElement.removeEventListener( 'wheel', onMouseWheel, false );

	    scope.domElement.removeEventListener( 'touchstart', onTouchStart, false );
	    scope.domElement.removeEventListener( 'touchend', onTouchEnd, false );
	    scope.domElement.removeEventListener( 'touchmove', onTouchMove, false );

	    document.removeEventListener( 'mousemove', onMouseMove, false );
	    document.removeEventListener( 'mouseup', onMouseUp, false );

	    window.removeEventListener( 'keydown', onKeyDown, false );

	    //scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?

	  };

	  //
	  // internals
	  //

	  var scope = this;

	  var changeEvent = { type: 'change' };
	  var startEvent = { type: 'start' };
	  var endEvent = { type: 'end' };

	  var STATE = { NONE: - 1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };

	  var state = STATE.NONE;

	  var EPS = 0.000001;

	  // current position in spherical coordinates
	  var spherical = new THREE.Spherical();
	  var sphericalDelta = new THREE.Spherical();

	  var scale = 1;
	  var panOffset = new THREE.Vector3();
	  var zoomChanged = false;

	  var rotateStart = new THREE.Vector2();
	  var rotateEnd = new THREE.Vector2();
	  var rotateDelta = new THREE.Vector2();

	  var panStart = new THREE.Vector2();
	  var panEnd = new THREE.Vector2();
	  var panDelta = new THREE.Vector2();

	  var dollyStart = new THREE.Vector2();
	  var dollyEnd = new THREE.Vector2();
	  var dollyDelta = new THREE.Vector2();

	  function getAutoRotationAngle() {

	    return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

	  }

	  function getZoomScale() {

	    return Math.pow( 0.95, scope.zoomSpeed );

	  }

	  function rotateLeft( angle ) {

	    sphericalDelta.theta -= angle;

	  }

	  function rotateUp( angle ) {

	    sphericalDelta.phi -= angle;

	  }

	  var panLeft = function () {

	    var v = new THREE.Vector3();

	    return function panLeft( distance, objectMatrix ) {

	      v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
	      v.multiplyScalar( - distance );

	      panOffset.add( v );

	    };

	  }();

	  var panUp = function () {

	    var v = new THREE.Vector3();

	    return function panUp( distance, objectMatrix ) {

	      v.setFromMatrixColumn( objectMatrix, 1 ); // get Y column of objectMatrix
	      v.multiplyScalar( distance );

	      panOffset.add( v );

	    };

	  }();

	  // deltaX and deltaY are in pixels; right and down are positive
	  var pan = function () {

	    var offset = new THREE.Vector3();

	    return function pan( deltaX, deltaY ) {

	      var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

	      if ( scope.object.isPerspectiveCamera ) {

	        // perspective
	        var position = scope.object.position;
	        offset.copy( position ).sub( scope.target );
	        var targetDistance = offset.length();

	        // half of the fov is center to top of screen
	        targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

	        // we actually don't use screenWidth, since perspective camera is fixed to screen height
	        panLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix );
	        panUp( 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix );

	      } else if ( scope.object.isOrthographicCamera ) {

	        // orthographic
	        panLeft( deltaX * ( scope.object.right - scope.object.left ) / scope.object.zoom / element.clientWidth, scope.object.matrix );
	        panUp( deltaY * ( scope.object.top - scope.object.bottom ) / scope.object.zoom / element.clientHeight, scope.object.matrix );

	      } else {

	        // camera neither orthographic nor perspective
	        console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
	        scope.enablePan = false;

	      }

	    };

	  }();

	  function dollyIn( dollyScale ) {

	    if ( scope.object.isPerspectiveCamera ) {

	      scale /= dollyScale;

	    } else if ( scope.object.isOrthographicCamera ) {

	      scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom * dollyScale ) );
	      scope.object.updateProjectionMatrix();
	      zoomChanged = true;

	    } else {

	      console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
	      scope.enableZoom = false;

	    }

	  }

	  function dollyOut( dollyScale ) {

	    if ( scope.object.isPerspectiveCamera ) {

	      scale *= dollyScale;

	    } else if ( scope.object.isOrthographicCamera ) {

	      scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / dollyScale ) );
	      scope.object.updateProjectionMatrix();
	      zoomChanged = true;

	    } else {

	      console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
	      scope.enableZoom = false;

	    }

	  }

	  //
	  // event callbacks - update the object state
	  //

	  function handleMouseDownRotate( event ) {

	    //console.log( 'handleMouseDownRotate' );

	    rotateStart.set( event.clientX, event.clientY );

	  }

	  function handleMouseDownDolly( event ) {

	    //console.log( 'handleMouseDownDolly' );

	    dollyStart.set( event.clientX, event.clientY );

	  }

	  function handleMouseDownPan( event ) {

	    //console.log( 'handleMouseDownPan' );

	    panStart.set( event.clientX, event.clientY );

	  }

	  function handleMouseMoveRotate( event ) {

	    //console.log( 'handleMouseMoveRotate' );

	    rotateEnd.set( event.clientX, event.clientY );
	    rotateDelta.subVectors( rotateEnd, rotateStart );

	    var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

	    // rotating across whole screen goes 360 degrees around
	    rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

	    // rotating up and down along whole screen attempts to go 360, but limited to 180
	    rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

	    rotateStart.copy( rotateEnd );

	    scope.update();

	  }

	  function handleMouseMoveDolly( event ) {

	    //console.log( 'handleMouseMoveDolly' );

	    dollyEnd.set( event.clientX, event.clientY );

	    dollyDelta.subVectors( dollyEnd, dollyStart );

	    if ( dollyDelta.y > 0 ) {

	      dollyIn( getZoomScale() );

	    } else if ( dollyDelta.y < 0 ) {

	      dollyOut( getZoomScale() );

	    }

	    dollyStart.copy( dollyEnd );

	    scope.update();

	  }

	  function handleMouseMovePan( event ) {

	    //console.log( 'handleMouseMovePan' );

	    panEnd.set( event.clientX, event.clientY );

	    panDelta.subVectors( panEnd, panStart );

	    pan( panDelta.x, panDelta.y );

	    panStart.copy( panEnd );

	    scope.update();

	  }

	  function handleMouseWheel( event ) {

	    // console.log( 'handleMouseWheel' );

	    if ( event.deltaY < 0 ) {

	      dollyOut( getZoomScale() );

	    } else if ( event.deltaY > 0 ) {

	      dollyIn( getZoomScale() );

	    }

	    scope.update();

	  }

	  function handleKeyDown( event ) {

	    //console.log( 'handleKeyDown' );

	    switch ( event.keyCode ) {

	      case scope.keys.UP:
	        pan( 0, scope.keyPanSpeed );
	        scope.update();
	        break;

	      case scope.keys.BOTTOM:
	        pan( 0, - scope.keyPanSpeed );
	        scope.update();
	        break;

	      case scope.keys.LEFT:
	        pan( scope.keyPanSpeed, 0 );
	        scope.update();
	        break;

	      case scope.keys.RIGHT:
	        pan( - scope.keyPanSpeed, 0 );
	        scope.update();
	        break;

	    }

	  }

	  function handleTouchStartRotate( event ) {

	    //console.log( 'handleTouchStartRotate' );

	    rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

	  }

	  function handleTouchStartDolly( event ) {

	    //console.log( 'handleTouchStartDolly' );

	    var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
	    var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

	    var distance = Math.sqrt( dx * dx + dy * dy );

	    dollyStart.set( 0, distance );

	  }

	  function handleTouchStartPan( event ) {

	    //console.log( 'handleTouchStartPan' );

	    panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

	  }

	  function handleTouchMoveRotate( event ) {

	    //console.log( 'handleTouchMoveRotate' );

	    rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
	    rotateDelta.subVectors( rotateEnd, rotateStart );

	    var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

	    // rotating across whole screen goes 360 degrees around
	    rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

	    // rotating up and down along whole screen attempts to go 360, but limited to 180
	    rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

	    rotateStart.copy( rotateEnd );

	    scope.update();

	  }

	  function handleTouchMoveDolly( event ) {

	    //console.log( 'handleTouchMoveDolly' );

	    var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
	    var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

	    var distance = Math.sqrt( dx * dx + dy * dy );

	    dollyEnd.set( 0, distance );

	    dollyDelta.subVectors( dollyEnd, dollyStart );

	    if ( dollyDelta.y > 0 ) {

	      dollyOut( getZoomScale() );

	    } else if ( dollyDelta.y < 0 ) {

	      dollyIn( getZoomScale() );

	    }

	    dollyStart.copy( dollyEnd );

	    scope.update();

	  }

	  function handleTouchMovePan( event ) {

	    //console.log( 'handleTouchMovePan' );

	    panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

	    panDelta.subVectors( panEnd, panStart );

	    pan( panDelta.x, panDelta.y );

	    panStart.copy( panEnd );

	    scope.update();

	  }

	  //
	  // event handlers - FSM: listen for events and reset state
	  //

	  function onMouseDown( event ) {

	    if ( scope.enabled === false ) { return; }

	    event.preventDefault();

	    switch ( event.button ) {

	      case scope.mouseButtons.ORBIT:

	        if ( scope.enableRotate === false ) { return; }

	        handleMouseDownRotate( event );

	        state = STATE.ROTATE;

	        break;

	      case scope.mouseButtons.ZOOM:

	        if ( scope.enableZoom === false ) { return; }

	        handleMouseDownDolly( event );

	        state = STATE.DOLLY;

	        break;

	      case scope.mouseButtons.PAN:

	        if ( scope.enablePan === false ) { return; }

	        handleMouseDownPan( event );

	        state = STATE.PAN;

	        break;

	    }

	    if ( state !== STATE.NONE ) {

	      document.addEventListener( 'mousemove', onMouseMove, false );
	      document.addEventListener( 'mouseup', onMouseUp, false );

	      scope.dispatchEvent( startEvent );

	    }

	  }

	  function onMouseMove( event ) {

	    if ( scope.enabled === false ) { return; }

	    event.preventDefault();

	    switch ( state ) {

	      case STATE.ROTATE:

	        if ( scope.enableRotate === false ) { return; }

	        handleMouseMoveRotate( event );

	        break;

	      case STATE.DOLLY:

	        if ( scope.enableZoom === false ) { return; }

	        handleMouseMoveDolly( event );

	        break;

	      case STATE.PAN:

	        if ( scope.enablePan === false ) { return; }

	        handleMouseMovePan( event );

	        break;

	    }

	  }

	  function onMouseUp( event ) {

	    if ( scope.enabled === false ) { return; }

	    document.removeEventListener( 'mousemove', onMouseMove, false );
	    document.removeEventListener( 'mouseup', onMouseUp, false );

	    scope.dispatchEvent( endEvent );

	    state = STATE.NONE;

	  }

	  function onMouseWheel( event ) {

	    if ( scope.enabled === false || scope.enableZoom === false || ( state !== STATE.NONE && state !== STATE.ROTATE ) ) { return; }

	    event.preventDefault();
	    event.stopPropagation();

	    handleMouseWheel( event );

	    scope.dispatchEvent( startEvent ); // not sure why these are here...
	    scope.dispatchEvent( endEvent );

	  }

	  function onKeyDown( event ) {

	    if ( scope.enabled === false || scope.enableKeys === false || scope.enablePan === false ) { return; }

	    handleKeyDown( event );

	  }

	  function onTouchStart( event ) {

	    if ( scope.enabled === false ) { return; }

	    switch ( event.touches.length ) {

	      case 1:	// one-fingered touch: rotate

	        if ( scope.enableRotate === false ) { return; }

	        handleTouchStartRotate( event );

	        state = STATE.TOUCH_ROTATE;

	        break;

	      case 2:	// two-fingered touch: dolly

	        if ( scope.enableZoom === false ) { return; }

	        handleTouchStartDolly( event );

	        state = STATE.TOUCH_DOLLY;

	        break;

	      case 3: // three-fingered touch: pan

	        if ( scope.enablePan === false ) { return; }

	        handleTouchStartPan( event );

	        state = STATE.TOUCH_PAN;

	        break;

	      default:

	        state = STATE.NONE;

	    }

	    if ( state !== STATE.NONE ) {

	      scope.dispatchEvent( startEvent );

	    }

	  }

	  function onTouchMove( event ) {

	    if ( scope.enabled === false ) { return; }

	    event.preventDefault();
	    event.stopPropagation();

	    switch ( event.touches.length ) {

	      case 1: // one-fingered touch: rotate

	        if ( scope.enableRotate === false ) { return; }
	        if ( state !== STATE.TOUCH_ROTATE ) { return; } // is this needed?...

	        handleTouchMoveRotate( event );

	        break;

	      case 2: // two-fingered touch: dolly

	        if ( scope.enableZoom === false ) { return; }
	        if ( state !== STATE.TOUCH_DOLLY ) { return; } // is this needed?...

	        handleTouchMoveDolly( event );

	        break;

	      case 3: // three-fingered touch: pan

	        if ( scope.enablePan === false ) { return; }
	        if ( state !== STATE.TOUCH_PAN ) { return; } // is this needed?...

	        handleTouchMovePan( event );

	        break;

	      default:

	        state = STATE.NONE;

	    }

	  }

	  function onTouchEnd( event ) {

	    if ( scope.enabled === false ) { return; }

	    scope.dispatchEvent( endEvent );

	    state = STATE.NONE;

	  }

	  function onContextMenu( event ) {

	    if ( scope.enabled === false ) { return; }

	    event.preventDefault();

	  }


	  scope.domElement.addEventListener( 'contextmenu', onContextMenu, false );

	  scope.domElement.addEventListener( 'mousedown', onMouseDown, false );
	  scope.domElement.addEventListener( 'wheel', onMouseWheel, false );

	  scope.domElement.addEventListener( 'touchstart', onTouchStart, false );
	  scope.domElement.addEventListener( 'touchend', onTouchEnd, false );
	  scope.domElement.addEventListener( 'touchmove', onTouchMove, false );

	  window.addEventListener( 'keydown', onKeyDown, false );

	  // force an update at start

	  this.update();

	}
	OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );
	OrbitControls.prototype.constructor = OrbitControls;

	Object.defineProperties( OrbitControls.prototype, {

	  center: {

	    get: function () {

	      console.warn( 'THREE.OrbitControls: .center has been renamed to .target' );
	      return this.target;

	    }

	  },

	  // backward compatibility

	  noZoom: {

	    get: function () {

	      console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
	      return ! this.enableZoom;

	    },

	    set: function ( value ) {

	      console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
	      this.enableZoom = ! value;

	    }

	  },

	  noRotate: {

	    get: function () {

	      console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
	      return ! this.enableRotate;

	    },

	    set: function ( value ) {

	      console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
	      this.enableRotate = ! value;

	    }

	  },

	  noPan: {

	    get: function () {

	      console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
	      return ! this.enablePan;

	    },

	    set: function ( value ) {

	      console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
	      this.enablePan = ! value;

	    }

	  },

	  noKeys: {

	    get: function () {

	      console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
	      return ! this.enableKeys;

	    },

	    set: function ( value ) {

	      console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
	      this.enableKeys = ! value;

	    }

	  },

	  staticMoving: {

	    get: function () {

	      console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
	      return ! this.enableDamping;

	    },

	    set: function ( value ) {

	      console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
	      this.enableDamping = ! value;

	    }

	  },

	  dynamicDampingFactor: {

	    get: function () {

	      console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
	      return this.dampingFactor;

	    },

	    set: function ( value ) {

	      console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
	      this.dampingFactor = value;

	    }

	  }

	} );

	/**
	 * Created by zhu18.github.io on 2017/11/12.
	 * three event
	 */
	/*
	* 参数格式
	let opt={
	    el:domElement,
	    scene:null,
	    camera:null,
	    renderer:null,
	    _onResize:'[function]',
	    _onMouseMove:'[function]',
	    _onMouseDown:'[function]'
	}
	*/
	var Event = function Event(o){
	    this.__raycaster = new THREE.Raycaster();
	    this.__mouse = new THREE.Vector2();
	    this.__resize=o.__proto__._onResize;
	    this.__mousemove=o.__proto__._onMouseMove;
	    this.__mousedown=o.__proto__._onMouseDown;
	    this.target=o;
	    Object.assign(this,o);
	    if(!this.camera && !this.renderer && !this.el)
	    {
	      console.warn('THREE.Event:not find camera, renderer, domElement,Please ensure that it is a valid 3D control');
	      return;
	    }
	    if(!this.__resize && !this.__mousemove && !this.__mousedown)
	    {
	      console.warn('THREE.Event:Users need to implement _onResize(),_onMouseMove(),_onMouseDown() method');
	      return;
	    }


	    this.__resize__ = this.onWindowResize.bind(this);
	    this.__mousemove__ = this.onDocumentMouseMove.bind(this);
	    this.__touchstart__ = this.onDocumentTouchStart.bind(this);
	    this.__mousedown__ = this.onDocumentMouseDown.bind(this);
	    this.mousemove_timer=null;
	    this.mousemove_interval=10;
	    this.enable=true;

	    if(this.__resize){
	        window.addEventListener('resize', this.__resize__, false);
	    }
	    if(this.__mousemove){
	        this.el.addEventListener('mousemove', this.__mousemove__, false );

	    }
	    if(this.__mousedown) {
	        this.el.addEventListener('touchstart', this.__touchstart__, false );
	        this.el.addEventListener('mousedown', this.__mousedown__, false );
	    }

	};
	Event.prototype.dispose = function dispose (){
	    window.removeEventListener('resize', this.__resize__, false);
	    this.el.removeEventListener('mousemove', this.__mousemove__, false);
	    this.el.removeEventListener('touchstart', this.__touchstart__, false);
	    this.el.removeEventListener('mousedown', this.__mousedown__, false);
	};

	Event.prototype.onWindowResize = function onWindowResize (event) {
	    this.camera.aspect = this.el.offsetWidth/ this.el.offsetHeight;
	    this.camera.updateProjectionMatrix();
	    this.renderer.setSize( this.el.offsetWidth, this.el.offsetHeight );
	    this.enable && this.__resize.bind(this.target)(event);
	};
	Event.prototype.onDocumentMouseMove = function onDocumentMouseMove ( event ) {
	    event.preventDefault();
	    this.mousemove_timer && clearTimeout(this.mousemove_timer);
	    this.mousemove_timer=setTimeout(()=>{
	      this.__mouse.x = ( event.offsetX  / this.el.offsetWidth ) * 2 - 1;
	      this.__mouse.y = - ( event.offsetY  / this.el.offsetHeight ) * 2 + 1;
	      this.__raycaster.setFromCamera( this.__mouse, this.camera );
	      var intersects = this.__raycaster.intersectObjects( this.scene.children ,true);

	      this.enable && this.__mousemove.bind(this.target)(event,intersects);
	    },this.mousemove_interval);

	};


	Event.prototype.onDocumentTouchStart = function onDocumentTouchStart ( event ) {
	    event.preventDefault();
	    event.clientX = event.touches[0].pageX;
	    event.clientY = event.touches[0].pageY;
	    this.enable && this.onDocumentMouseDown( event );

	};

	Event.prototype.onDocumentMouseDown = function onDocumentMouseDown ( event ) {
	    event.preventDefault();
	    this.__mouse.x = ( (event.offsetX ||event.clientX)  / this.el.offsetWidth ) * 2 - 1;
	    this.__mouse.y = - ( (event.offsetY ||event.clientY)  / this.el.offsetHeight ) * 2 + 1;
	    this.__raycaster.setFromCamera( this.__mouse, this.camera );
	    var intersects = this.__raycaster.intersectObjects( this.scene.children ,true);
	    this.enable && this.__mousedown.bind(this.target)(event,intersects);
	};
	//THREE.Event = Event

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	var Stats = function () {

		var startTime = Date.now(), prevTime = startTime;
		var ms = 0, msMin = Infinity, msMax = 0;
		var fps = 0, fpsMin = Infinity, fpsMax = 0;
		var frames = 0, mode = 0;

		var container = document.createElement( 'div' );
		container.id = 'stats';
		container.addEventListener( 'mousedown', function ( event ) { event.preventDefault(); setMode( ++ mode % 2 ); }, false );
		container.style.cssText = 'width:80px;opacity:0.9;cursor:pointer';

		var fpsDiv = document.createElement( 'div' );
		fpsDiv.id = 'fps';
		fpsDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#002';
		container.appendChild( fpsDiv );

		var fpsText = document.createElement( 'div' );
		fpsText.id = 'fpsText';
		fpsText.style.cssText = 'color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
		fpsText.innerHTML = 'FPS';
		fpsDiv.appendChild( fpsText );

		var fpsGraph = document.createElement( 'div' );
		fpsGraph.id = 'fpsGraph';
		fpsGraph.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0ff';
		fpsDiv.appendChild( fpsGraph );

		while ( fpsGraph.children.length < 74 ) {

			var bar = document.createElement( 'span' );
			bar.style.cssText = 'width:1px;height:30px;float:left;background-color:#113';
			fpsGraph.appendChild( bar );

		}

		var msDiv = document.createElement( 'div' );
		msDiv.id = 'ms';
		msDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#020;display:none';
		container.appendChild( msDiv );

		var msText = document.createElement( 'div' );
		msText.id = 'msText';
		msText.style.cssText = 'color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
		msText.innerHTML = 'MS';
		msDiv.appendChild( msText );

		var msGraph = document.createElement( 'div' );
		msGraph.id = 'msGraph';
		msGraph.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0f0';
		msDiv.appendChild( msGraph );

		while ( msGraph.children.length < 74 ) {

			var bar = document.createElement( 'span' );
			bar.style.cssText = 'width:1px;height:30px;float:left;background-color:#131';
			msGraph.appendChild( bar );

		}

		var setMode = function ( value ) {

			mode = value;

			switch ( mode ) {

				case 0:
					fpsDiv.style.display = 'block';
					msDiv.style.display = 'none';
					break;
				case 1:
					fpsDiv.style.display = 'none';
					msDiv.style.display = 'block';
					break;
			}

		};

		var updateGraph = function ( dom, value ) {

			var child = dom.appendChild( dom.firstChild );
			child.style.height = value + 'px';

		};

		return {

			REVISION: 11,

			domElement: container,

			setMode: setMode,

			begin: function () {

				startTime = Date.now();

			},

			end: function () {

				var time = Date.now();

				ms = time - startTime;
				msMin = Math.min( msMin, ms );
				msMax = Math.max( msMax, ms );

				msText.textContent = ms + ' MS (' + msMin + '-' + msMax + ')';
				updateGraph( msGraph, Math.min( 30, 30 - ( ms / 200 ) * 30 ) );

				frames ++;

				if ( time > prevTime + 1000 ) {

					fps = Math.round( ( frames * 1000 ) / ( time - prevTime ) );
					fpsMin = Math.min( fpsMin, fps );
					fpsMax = Math.max( fpsMax, fps );

					fpsText.textContent = fps + ' FPS (' + fpsMin + '-' + fpsMax + ')';
					updateGraph( fpsGraph, Math.min( 30, 30 - ( fps / 100 ) * 30 ) );

					prevTime = time;
					frames = 0;

				}

				return time;

			},

			update: function () {

				startTime = this.end();

			}

		}

	};

	/**
	 * Webgl Shader Library for three.js
	 *
	 * @author alteredq / http://alteredqualia.com/
	 * @author mrdoob / http://mrdoob.com/
	 * @author mikael emtinger / http://gomo.se/
	 */

	/**
	 * 线条着色器,color,texure需要指定，流动效果请参考update实现
	 * @type {{vertexShader: string, fragmentShader: string}}
	 */
	THREE.ShaderLib.line = {
	        uniforms: {
	                amplitude: { value: 1.0 },
	                color: { value: 0xffffff },
	                texture: { value: null },
	        },
	        vertexShader: [
	                "uniform float amplitude;",
	                "attribute float size;",
	                "attribute vec3 customColor;",
	                "varying vec3 vColor;",
	                "void main() {",
	                "vColor = customColor;",
	                "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
	                "gl_PointSize = size;",
	                "gl_Position = projectionMatrix * mvPosition;",
	                "}"
	        ].join("\n"),
	        fragmentShader: [
	                "uniform vec3 color;",
	                "uniform sampler2D texture;",
	                "varying vec3 vColor;",
	                "void main() {",
	                "gl_FragColor = vec4( color * vColor, 1.0 );",
	                "gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );",
	                "}"
	        ].join("\n")
	};

	/**
	 * 物体内边缘发光
	 */
	THREE.ShaderLib.edgelight = {
	        uniforms:
	        {
	                "s": { type: "f", value: -1.0 },
	                "b": { type: "f", value: 1.0 },
	                "p": { type: "f", value: 2.0 },
	                glowColor: { type: "c", value: new THREE.Color(0x00ffff) }
	        },
	        vertexShader: [
	                "varying vec3 vNormal;",
	                "varying vec3 vPositionNormal;",
	                "void main() {",
	                "vNormal = normalize( normalMatrix * normal ); ",// 转换到视图空间
	                "vPositionNormal = normalize(( modelViewMatrix * vec4(position, 1.0) ).xyz);",
	                "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
	                "}"
	        ].join("\n"),
	        fragmentShader: [
	                "uniform vec3 glowColor;",
	                "uniform float p;",
	                "uniform float b;",
	                "uniform float s;",
	                "varying vec3 vNormal;",
	                "varying vec3 vPositionNormal;",
	                "void main() ",
	                "{",
	                "  float a = pow( b + s * abs(dot(vNormal, vPositionNormal)), p );",
	                "  gl_FragColor = vec4( glowColor, a );",
	                "}"
	        ].join("\n")
	};

	/**
	 * 创建着色器材质，根据shader
	 * @param {shader} shader  shader in three.ShaderlibExp
	 * @param {*} side default THREE.FrontSide
	 * @param {*} blending default THREE.AdditiveBlending
	 */
	THREE.ShaderLib.createShaderMaterial = function (shader,side,blending) {
	        var customMaterial = new THREE.ShaderMaterial({
	                uniforms:shader.uniforms,
	                vertexShader: shader.vertexShader,
	                fragmentShader: shader.fragmentShader,
	                side: side||THREE.FrontSide,
	                blending: blending||THREE.AdditiveBlending,
	                transparent: true
	        });
	        return customMaterial;
	};


	console.log(THREE.ShaderLib);

	/**
	 * 3D地图.区域
	 * Created by zhu18.github.io on 2017/11/19.
	 * @author 朱润亚 <zhu18@vip.qq.com>
	 * @version beta v1.0.3
	 * @module Map3D
	 */



	/**
	 * 地图区域,继承{@link https://threejs.org/docs/#api/core/Object3D|THREE.Object3D}
	 * @class
	 * @extends THREE.Object3D
	 * @example
	 *
	 *  let opt = {
	 *     color:0x3366ff,     //地图颜色
	 *     hoverColor:0xff9933,//鼠标移入颜色
	 *     lineColor:0xffffff, //线颜色
	 *     opacity:1,          //地图透明度
	 *     hasPhong:true,      //是否反光材质
	 *     shininess:50,       //反光材质光滑度
	 *     hoverAnimaTime:100, //鼠标移入动画过渡时间
	 *     loadEffect:false,      //区域加载效果
	 *     hasHoverHeight:true,  //鼠标移入区域升高
	 *     showText:false,      //是否显示地区名称
	 *  }
	 *  // 创建一个区域
	 *  let area = new Area(opt);
	 *  // map 初始化以后可以获取
	 *  let area = map.areaGroup.getObjectByName('北京')
	 */
	var Area = /*@__PURE__*/(function (superclass) {
	  function Area(pros){
	      //调用实现父类的构造函数
	      superclass.call(this, pros);
	      this.type="Area";
	      this.name=pros.name;
	      Object.assign(this.userData,pros);
	      var coords = pros.coords;
	      this._mesh = this.getMesh(coords,pros);
	      this._line = this.getLine(coords,pros);
	    
	      this.add(this._mesh);
	      this.add(this._line);
	      

	      if(pros.showText)
	      {
	        this._text = this.getText(pros);
	        this.add(this._text);
	      }
	  
	  
	      if(pros.loadEffect){
	        this.setPosition({x:0,y:-40,z:-1000});
	        this.setPosition({x:0,y:0,z:0}, 500, Area.count*10, TWEEN.Easing.Quartic.Out);
	      }
	      Area.count++;
	    }

	  if ( superclass ) Area.__proto__ = superclass;
	  Area.prototype = Object.create( superclass && superclass.prototype );
	  Area.prototype.constructor = Area;

	  var prototypeAccessors = { mesh: { configurable: true },line: { configurable: true } };
	  
	    /**
	     * 创建区域文字
	     * @param {object} pros  - 区域初始化属性
	     * @returns {Font3D}
	     */
	    Area.prototype.getText = function getText (pros){
	      if(!pros.cp){ return; }
	      
	      var text = new Font3D$1(pros.name,pros.textStyle);
	      text.position.set(pros.cp[0],pros.cp[1],pros.extrudeHeight+0.01);

	      return text
	    };
	    /**
	     * 创建立体块
	     * @param {array} coords -  坐标经纬度，如：[112,22]
	     * @param {object} pros - 区域初始化属性
	     * @returns {*}
	     * @protected
	     */
	    Area.prototype.getMesh = function getMesh (coords,pros){
	      if(!coords){ return; }
	      try{
	        var geo=new THREE.Geometry();
	        coords.forEach((coord)=>{
	          var pts=this.getGeoPoints(coord);
	          var g=this.getExtrudeGeometry(pts);
	          geo.merge(g, g.matrix);
	        });
	  
	        return this.getGeoMesh(geo,pros);
	      }catch(e)
	      {
	        console.warn("Area.getMesh:"+e.message);
	      }
	    };
	  
	    /**
	     * 创建块的边缘线
	     * @param {array} coords -  坐标经纬度，如：[112,22]
	     * @param {object} pros - 区域初始化属性
	     * @returns {THREE.Group}
	     */
	    Area.prototype.getLine = function getLine (coords,pros){
	      if(!coords){ return; }
	  
	      //mate
	      var material = new THREE.LineBasicMaterial({
	        opacity: this.userData.lineOpacity,
	        transparent:this.userData.lineOpacity<1,
	        linewidth: 1,
	        polygonOffset:true,polygonOffsetFactor:1,
	        color:this.userData.lineColor
	      });
	  
	      //geo
	      var lines = new THREE.Group();
	      coords.forEach((coord)=>{
	        var pts=this.getGeoPoints(coord);
	        var line = new THREE.Geometry();
	        for(var i=0,l=pts.length;i<l;i++){
	          line.vertices.push(new THREE.Vector3(pts[i].x,pts[i].y,this.userData.extrude.amount + this.userData.extrude.amount/100));
	        }
	  
	        var lineMesh=new THREE.Line(line, material);
	  
	        lines.add(lineMesh);
	      });
	  
	      return lines;
	    };
	  
	    /**
	     * 得到顶点数据
	     * @param coord
	     * @returns {Array}
	     * @protected
	     */
	    Area.prototype.getGeoPoints = function getGeoPoints (coord){
	      try{
	        var pts=[];
	        for(var i=0,l=coord.length;i<l;i++){
	          pts.push(new THREE.Vector2(coord[i][0],coord[i][1]));
	        }
	        return pts;
	      }catch(e)
	      {
	        console.log('getGeoPoints:parse coord error:'+JSON.stringify(coord));
	      }
	    };
	  
	    /**
	     * 拉伸块高度
	     * @param {array} pts - 顶点数组
	     * @returns {THREE.ExtrudeGeometry}
	     * @protected
	     */
	    Area.prototype.getExtrudeGeometry = function getExtrudeGeometry (pts){
	      var shape = new THREE.Shape(pts);
	      var extrude =Object.assign({},this.userData.extrude);
	      var geo = new THREE.ExtrudeGeometry(shape, extrude);
	      return geo;
	    };
	  
	    /**
	     * 拉伸块高度
	     * @param geo
	     * @param pros
	     * @returns {*}
	     */
	    Area.prototype.getGeoMesh = function getGeoMesh (geo,pros){
	      var mateOption={};
	      mateOption.color = pros.color!=null ? colorToHex(pros.color) : Math.random() * 0xffffff;
	      mateOption.shininess= pros.shininess || 100;
	      mateOption.transparent= true;
	      mateOption.opacity = (typeof pros.opacity === 'undefined') ? this.userData.opacity : pros.opacity;
	      //mateOption.wireframe =true
	      geo.computeFlatVertexNormals();
	      var geoMesh=null;

	    //   var shader = {
	    //     uniforms:
	    //     {
	    //         glowColor: { type: "c", value: new THREE.Color(mateOption.color) },
	    //         iTime: { type: "f", value: 1.0}
	    //     },
	    //     vertexShader: [
	    //         "varying vec2 vUv;",
	    //         "void main() {",
	    //         "vUv = uv;",
	    //         "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
	    //         "}"
	    //     ].join("\n"),
	    //     fragmentShader: [
	    //         "uniform vec3 glowColor;",
	    //         "uniform float iTime;",
	    //         "varying vec2 vUv;",
	    //         "float t=iTime;",
	    //         "vec3 col;",
	    //         "void main() {",
	    //         "col = 0.5 + 0.1 * sqrt(sin(iTime * dot(vUv,vUv) /glowColor));",
	    //         "gl_FragColor = vec4(1.0,col);",
	    //         "}"
	    //     ].join("\n")
	    // }
	    

	    // var customMaterial = new THREE.ShaderMaterial({
	    //     uniforms: shader.uniforms,
	    //     vertexShader: shader.vertexShader,
	    //     fragmentShader: shader.fragmentShader,
	    //     side: THREE.FrontSide,
	    //     blending: THREE.AdditiveBlending,
	    //     transparent: true
	    // })

	    this.update=function(){
	         //shader.uniforms.iTime.value += 0.05;
	    };
	    
	      if(this.userData.hasPhong)
	       { geoMesh = new THREE.Mesh(geo, new THREE.MeshPhongMaterial(mateOption)); }
	      else
	        { geoMesh = new THREE.Mesh(geo, new THREE.MeshLambertMaterial(mateOption)); }
	     
	      //var geoMesh = THREE.SceneUtils.createMultiMaterialObject(geo,[new THREE.MeshPhongMaterial(mateOption),new THREE.MeshBasicMaterial({wireframe:true,color:0xffffff,transparent:true,opacity:0.35})])
	      return geoMesh;
	    };
	  
	    /**
	     * Area的网格对象
	     * @returns {HTREE.Mesh}
	     */
	    prototypeAccessors.mesh.get = function (){
	      return this._mesh;
	    };
	  
	    /**
	     * Area的边缘线对象
	     * @returns {THREE.Group}
	     */
	    prototypeAccessors.line.get = function (){
	      return this._line;
	    };
	  
	    /**
	     * 设置区域颜色
	     * @param {color} color - 格式 0xff9933,'#ff9933','rgb(255,160,50)','hsl(340,100%,50%)'
	     * @param {number} [time] - 动画完成时间,与transition时间类似
	     * @param {number} [delay=0] - 动画延迟时间
	     * @param {Tween.Easing} [easing=line] -动画类型
	     * @param {callback} [callback] - 动画完成后回调
	     */
	    Area.prototype.setColor = function setColor (color,time,delay,easing,callback){
	      this.userData.color=colorToHex(color);
	      if(time && typeof time==='number'){
	        color=new THREE.Color(colorToHex(color));
	        transition(this.mesh.material.color,color,time,delay,easing,callback);
	      }
	      else {
	        this.mesh.material.color.set(colorToHex(color));
	      }
	    };
	  
	    /**
	     * 设置区域位置
	     * @param {v3} v3 - 格式{x:0,y:0,z:0}
	     * @param {number} [time] - 动画完成时间,与transition时间类似
	     * @param {number} [delay=0] - 动画延迟时间
	     * @param {Tween.Easing} [easing=line] -动画类型
	     * @param {callback} [callback] - 动画完成后回调
	     */
	    Area.prototype.setPosition = function setPosition (v3,time,delay,easing,callback){
	      if(time && typeof time==='number')
	        { transition(this.position,v3,time,delay,easing,callback); }
	      else
	        { this.position.set(v3.x,v3.y,v3.z); }
	    };
	    /**
	     * 设置区域旋转
	     * @param {v3} v3 - 格式{x:0,y:0,z:0}
	     * @param {number} [time] - 动画完成时间,与transition时间类似
	     * @param {number} [delay=0] - 动画延迟时间
	     * @param {Tween.Easing} [easing=line] -动画类型
	     * @param {callback} [callback] - 动画完成后回调
	     */
	    Area.prototype.setRotation = function setRotation (v3,time,delay,easing,callback){
	      v3.x=v3.x * (Math.PI / 180);
	      v3.y=v3.y * (Math.PI / 180);
	      v3.z=v3.z * (Math.PI / 180);
	      transition(this.rotation,v3,time,delay,easing,callback);
	    };
	    /**
	     * 设置区域大小
	     * @param {v3} v3 - 格式{x:0,y:0,z:0}
	     * @param {number} [time] - 动画完成时间,与transition时间类似
	     * @param {number} [delay=0] - 动画延迟时间
	     * @param {Tween.Easing} [easing=line] -动画类型
	     * @param {callback} [callback] - 动画完成后回调
	     */
	    Area.prototype.setScale = function setScale (v3,time,delay,easingcallback){
	      if(time && typeof time==='number')
	        { transition(this.scale,v3,time,delay,easing,callback); }
	      else
	        { this.scale.set(v3.x,v3.y,v3.z); }
	    };
	  
	    /**
	     * 鼠标移出事件
	     * @param dispatcher
	     * @param event
	     * @example
	     *
	     * map.addEventListener('mouseout', (event) => {
	       *    let obj = event.target;
	       *    console.log(obj.type+':out')
	       *  });
	     */
	    Area.prototype.onmouseout = function onmouseout (dispatcher,event){
	      if(this.userData.hasHoverHeight)
	        { new TWEEN.Tween( this.position ).to({z: 0,}, this.userData.hoverAnimaTime)
	        //.easing(TWEEN.Easing.Quartic.Out)
	        .start(); }
	      new TWEEN.Tween(this.mesh.material.color).to(new THREE.Color(colorToHex(this.userData.color)), this.userData.hoverAnimaTime)
	      //.easing(TWEEN.Easing.Quartic.Out)
	      .start();
	      dispatcher.dispatchEvent({ type: 'mouseout', target:this, orgEvent:event});
	  
	    };
	    /**
	     * 鼠标移入事件
	     * @param dispatcher
	     * @param event
	     * @example
	     *
	     * map.addEventListener('mouseover', (event) => {
	       *    let obj = event.target;
	       *    console.log(obj.type+':over')
	       *  });
	     */
	    Area.prototype.onmouseover = function onmouseover (dispatcher,event){
	      //区域移入高度
	      //this.selectedArea.position.z=1;
	      if(this.userData.hasHoverHeight)
	        { new TWEEN.Tween( this.position ).to({z: this.userData.extrude.amount/2,}, this.userData.hoverAnimaTime)
	        //.easing(TWEEN.Easing.Quartic.Out)
	        .start(); }
	      //区域移入颜色
	      new TWEEN.Tween(this.mesh.material.color).to(new THREE.Color(colorToHex(this.userData.hoverColor)), this.userData.hoverAnimaTime)
	      //.easing(TWEEN.Easing.Quartic.Out)
	      .start();
	      dispatcher.dispatchEvent({ type: 'mouseover', target:this, orgEvent:event});
	    };
	    /**
	     * 鼠标单击事件
	     * @param dispatcher
	     * @param event
	     * @example
	     *
	     * map.addEventListener('mousedown', (event) => {
	       *    let obj = event.target;
	       *    console.log(obj.type+':click')
	       *  });
	     */
	    Area.prototype.onmousedown = function onmousedown (dispatcher,event) {
	      dispatcher.dispatchEvent({ type: 'mousedown', target:this, orgEvent:event});
	    };

	  Object.defineProperties( Area.prototype, prototypeAccessors );

	  return Area;
	}(THREE.Object3D));
	  /**
	   * 区域数量
	   * @static
	   * @type {number}
	   */
	  Area.count=0;


	//   function makeStarTexture() {
	//     const canvas = document.createElement('canvas');
	//     canvas.width = 16;
	//     canvas.height = 16;
	//     const pen = canvas.getContext('2d');
	//     const gradient = pen.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
	//     gradient.addColorStop(0, 'rgba(255,255,255,1)');
	//     gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
	//     gradient.addColorStop(0.4, 'rgba(0,0,164,1)');
	//     gradient.addColorStop(1, 'rgba(0,0,0,0)');
	//     pen.fillStyle = gradient; //将笔触填充色设置为这个渐变放射状
	//     pen.fillRect(0, 0, canvas.width, canvas.height); //画矩形
	//     const texture = new THREE.Texture(canvas); //生成贴图对象（参数是图片或canvas画布）
	//     texture.needsUpdate = true; //将这个对象缓存到GPU
	//     return texture;
	// }

	/**
	 * 3D地图.数据范围
	 * Created by jusfoun-fe.github.io on 2017/11/19.
	 * @author 九次方前端研发部-朱润亚 <zhu18@vip.qq.com>
	 * @version beta v1.0.3
	 * @module Map3D
	 */

	/**
	 * 数据范围
	 * @class
	 * @extends THREE.Mesh
	 */
	var DataRange = /*@__PURE__*/(function (superclass) {
	  function DataRange(pros){
	    superclass.call(this, pros);
	    this.type="DataRange";
	    this.name=pros.name;
	    Object.assign(this.userData,pros);
	    var boxGeo = new THREE.BoxGeometry(pros.width,pros.height,pros.extrudeHeight);
	    var boxMate = new THREE.MeshPhongMaterial({color:pros.color});
	    var range = new THREE.Mesh(boxGeo,boxMate);

	    this.position.y = this.position.y - DataRange.count * (pros.height + pros.spacing);
	    if(pros.showName){
	      var txt = Font3D.create(pros.name,{color:'#ffffff'});
	      txt.position.copy(range.position);
	      txt.position.y = txt.position.y - 0.3;
	      txt.position.add(pros.namePosition);
	      this.add(txt);
	      this.txt=txt;
	    }

	    this.mesh=range;
	    this.add(range);
	    DataRange.count++;
	  }

	  if ( superclass ) DataRange.__proto__ = superclass;
	  DataRange.prototype = Object.create( superclass && superclass.prototype );
	  DataRange.prototype.constructor = DataRange;

	  /**
	   * 选中并返回其关联区域
	   * @returns {Area[]}
	   */
	  DataRange.prototype.select = function select (){
	    return this.rangeAreas.map((area)=>{
	      area.setColor(this.userData.hoverColor);
	      if(area.userData.hasHoverHeight) {
	        new TWEEN.Tween(area.position).to({z:area.userData.extrude.amount/2}, area.userData.hoverAnimaTime).start();
	      }
	    })
	  };

	  /**
	   * 取消选中状态
	   */
	  DataRange.prototype.unselect = function unselect (){
	    this.rangeAreas.map((area)=>{
	      area.setColor(this.userData.color);
	        if(area.userData.hasHoverHeight) {
	          new TWEEN.Tween(area.position).to({z:0}, area.userData.hoverAnimaTime).start();
	        }
	    });
	  };
	  DataRange.prototype.onmouseout = function onmouseout (dispatcher,event){
	    this.unselect();
	    new TWEEN.Tween(this.mesh.material.color).to(new THREE.Color(colorToHex(this.userData.color)), this.userData.hoverAnimaTime).start();
	    if(!this.userData.hasEvent){ return }
	    dispatcher.dispatchEvent({ type: 'mouseout', target:this, orgEvent:event});
	  };
	  DataRange.prototype.onmouseover = function onmouseover (dispatcher,event){
	    this.select();
	    new TWEEN.Tween(this.mesh.material.color).to(new THREE.Color(colorToHex(this.userData.hoverColor)), this.userData.hoverAnimaTime).start();
	    if(!this.userData.hasEvent){ return }
	    dispatcher.dispatchEvent({ type: 'mouseover', target:this, orgEvent:event});
	  };
	  DataRange.prototype.onmousedown = function onmousedown (dispatcher,event){
	    if(!this.userData.hasEvent){ return }
	    dispatcher.dispatchEvent({ type: 'mousedown', target:this, orgEvent:event});
	  };

	  return DataRange;
	}(THREE.Object3D));
	/**
	 * 数据范围数量
	 * @static
	 * @type {number}
	 */
	DataRange.count=0;

	/**
	 * 3D地图.标注点
	 * Created by zhu18.github.io on 2017/11/19.
	 * @author 朱润亚 <zhu18@vip.qq.com>
	 * @version beta v1.0.3
	 * @module Map3D
	 */


	/**
	 * 地图标注,继承{@link https://threejs.org/docs/#api/objects/Sprite|THREE.Sprite}
	 * @class
	 * @extends THREE.Sprite
	 * @example
	 *
	 * let opt={
	 *  name:'台风-依安',
	 *  coord:[116,23],
	 *  color:0xff0000,
	 *  size:4,
	 *  value:2,
	 *  userAttrA:'A'
	 * }
	 * let mark = new Mark(opt);
	 * console.log(mark.userData.value +  mark.userData.userAttrA)  //'2A'
	 */
	var Mark = /*@__PURE__*/(function (superclass) {
	  function Mark(pros){
	    superclass.call(this);
	    this.material = new THREE.SpriteMaterial( { map: Mark.texture, color: pros.color , blending: THREE.AdditiveBlending} );
	    this.type="Mark";
	    this.name=pros.name;
	    Object.assign(this.userData,pros);

	    var size=pros.size||this.userData.min;
	    size=size<this.userData.min?this.userData.min:size;
	    size=size>this.userData.max?this.userData.max:size;
	    this.userData.size=size;
	    this.scale.set(size, size, 1);
	    //console.log(size);
	    this.position.x=pros.coord[0];
	    this.position.y=pros.coord[1];
	    this.position.z=2+size*35/100;

	    this.update = function(){
	      // new TWEEN.Tween(this.scale).to({x:size,y:size},100).delay(Mark.count*10).start()

	      // let context = this.material.map.image.getContext('2d');
	      // Mark.draw(context,size);
	      // this.material.map.needsUpdate = true;

	      // let geometry = this.geometry;
	      // let attributes = geometry.attributes;
	      // for ( let i = 0; i < attributes.size.array.length; i++ ) {
	      //   attributes.size.array[ i ] = size + size * Math.sin( 0.1 * i + time );
	      // }
	      // attributes.size.needsUpdate = true;
	    };

	    Mark.count++;
	  }

	  if ( superclass ) Mark.__proto__ = superclass;
	  Mark.prototype = Object.create( superclass && superclass.prototype );
	  Mark.prototype.constructor = Mark;

	  var staticAccessors = { texture: { configurable: true } };

	  /**
	   * 设置标注颜色
	   * @param {color} color - 颜色格式0xff9933,'#ff9933','rgb(255,255,255)','hsl(100,100%,50%)'
	   * @param {number} [time] - 动画完成时间,与transition时间类似
	   * @param {number} [delay=0] - 动画延迟时间
	   * @param {Tween.Easing} [easing=line] -动画类型
	   * @param {callback} [callback] - 动画完成后回调
	   * @example
	   *  map.addEventListener('mouseover', (event) => {
	     *    let obj = event.target;
	     *    if(obj.type==='Mark')
	     *    {
	     *      obj.setColor('#ff5555',100);// 鼠标移入设置为红色
	     *    }
	     *  });
	   */
	  staticAccessors.texture.get = function (){
	    if(!Mark._texture)
	    {
	      var canvas = document.createElement("canvas");
	      canvas.width=128;
	      canvas.height=128;
	      var context = canvas.getContext('2d');
	      Mark.draw(context);
	      var texture = new THREE.Texture(canvas);
	      texture.needsUpdate = true;
	      Mark._texture=texture;
	    }
	    return Mark._texture;
	  };
	  /**
	   * 光点纹理样式,如果你对canvas熟悉可以重写.否则使用默认样式
	   * @static
	   * @param {context} context - Canvas上下文对象 {@link https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/getContext|Canvas.context}
	   * @example
	   *
	   * Mark.draw=(ctx)=>{
	     *  context.clearRect(0, 0, 128, 128);
	     *  context.fillStyle = '#ff0000';
	     *  context.arc(64, 64, 20, 0, Math.PI * 2, false);
	     *  context.fill();
	     * }
	   */
	  Mark.draw = function draw (context,v){
	    v=v||1;
	    context.clearRect(0, 0, 128, 128);
	    context.fillStyle = '#ffffff';
	    context.arc(64, 64, 20, 0, Math.PI * 2, false);
	    context.fill();

	    context.fillStyle = 'rgba(255,255,255,.5)';
	    context.arc(64, 64, 60*v, 0, Math.PI * 2, false);
	    context.fill();

	    // context.fillStyle = 'rgba(0,0,0,.5)';
	    // context.rect(0, 0, 128, 128, Math.PI * 2, false);
	    // context.fill();
	  };

	  Mark.prototype.setColor = function setColor (color, time, delay, easing,callback){
	    this.userData.color=colorToHex(color);
	    if(time && typeof time==='number'){
	      color=new THREE.Color(colorToHex(color));
	      transition(this.material.color,color,time,delay,easing,callback);
	    }
	    else {
	      this.material.color.set(colorToHex(color));
	    }
	  };

	  /**
	   * 设置标注位置
	   * @param {v3} v3 - 格式{x:11,y:33,z:2}
	   * @param {number} [time] - 动画完成时间,与transition时间类似
	   * @param {number} [delay=0] - 动画延迟时间
	   * @param {Tween.Easing} [easing=line] -动画类型
	   * @param {callback} [callback] - 动画完成后回调
	   * @example
	   *
	   * map.addEventListener('mouseover', (event) => {
	     *     let obj = event.target;
	     *     if(obj.type==='Mark')
	     *     {
	     *       obj.setPosition({x:0,y:0,z:4},300) //标注升高
	     *     }
	     *   });
	   *
	   */
	  Mark.prototype.setPosition = function setPosition (v3,time,delay,easing,callback){
	    if(time && typeof time==='number')
	      { transition(this.position,v3,time,delay,easing,callback); }
	    else
	      { this.position.set(v3.x,v3.y,v3.z); }
	  };

	  /**
	   * 设置标注旋转
	   * @param {v3} v3 - 格式{x:11,y:33,z:2}
	   * @param {number} [time] - 动画完成时间,与transition时间类似
	   * @param {number} [delay=0] - 动画延迟时间
	   * @param {Tween.Easing} [easing=line] -动画类型
	   * @param {callback} [callback] - 动画完成后回调
	   */
	  Mark.prototype.setRotation = function setRotation (v3,time,delay,easing,callback){
	    v3.x=v3.x * (Math.PI / 180);
	    v3.y=v3.y * (Math.PI / 180);
	    v3.z=v3.z * (Math.PI / 180);
	    transition(this.rotation,v3,time,delay,easing,callback);
	  };
	  /**
	   * 设置标注大小
	   * @param {v3} v3 - 格式{x:11,y:33,z:2}
	   * @param {number} [time] - 动画完成时间,与transition时间类似
	   * @param {number} [delay=0] - 动画延迟时间
	   * @param {Tween.Easing} [easing=line] -动画类型
	   * @param {callback} [callback] - 动画完成后回调
	   */
	  Mark.prototype.setScale = function setScale (v3,time,delay,easing,callback){
	    if(time && typeof time==='number')
	      { transition(this.scale,v3,time,delay,easing,callback); }
	    else
	      { this.scale.set(v3.x,v3.y,v3.z); }
	  };
	  /* 事件 */
	  Mark.prototype.onmouseout = function onmouseout (dispatcher,event){
	    var size=this.userData.size*1;
	    new TWEEN.Tween(this.scale).to({x:size,y:size}, this.userData.hoverAnimaTime).start();
	    new TWEEN.Tween(this.material.color).to(new THREE.Color(colorToHex(this.userData.color)), this.userData.hoverAnimaTime).start();
	    dispatcher.dispatchEvent({ type: 'mouseout', target:this, orgEvent:event});

	  };
	  Mark.prototype.onmouseover = function onmouseover (dispatcher,event){
	    var size=this.userData.size*1.5;
	    new TWEEN.Tween(this.scale).to({x:size,y:size}, this.userData.hoverAnimaTime).start();
	    //区域移入颜色
	    new TWEEN.Tween(this.material.color).to(new THREE.Color(colorToHex(this.userData.hoverColor)), this.userData.hoverAnimaTime).start();
	    dispatcher.dispatchEvent({ type: 'mouseover', target:this, orgEvent:event});
	  };
	  Mark.prototype.onmousedown = function onmousedown (dispatcher,event) {
	    dispatcher.dispatchEvent({ type: 'mousedown', target:this, orgEvent:event});
	  };

	  Object.defineProperties( Mark, staticAccessors );

	  return Mark;
	}(THREE.Sprite));
	/**
	 * 所有标注数量,静态属性
	 * @type {number}
	 * @example
	 * //查看地图所有标注数
	 * console.log(Mark.count);
	 */
	Mark.count=0;
	Mark._texture=null;

	/**
	 * 3D地图.线
	 * Created by zhu18.github.io on 2017/11/19.
	 * @author 朱润亚 <zhu18@vip.qq.com>
	 * @version beta v1.0.3
	 * @module Map3D
	 */

	/** Class representing a Line.
	 * @extends THREE.Line
	 *
	 * @example
	 * var opt={
	 *   color:0x55eeff,                 // 基线颜色
	 *   hoverColor:0xff9933,            // 线的鼠标移入基线颜色
	 *   spaceHeight:5,                  // 曲线空间高度
	 *   hasHalo:true,                   // 是否有发光线
	 *   hasHaloAnimate:true,            // 是否开启发光线动画效果
	 *   haloDensity:2,                  // 光点密度 值越大 越浓密，越消耗性能
	 *   haloRunRate:0.01,               // 光点运动频率
	 *   haloColor:0xffffff,             // 发光线颜色，默认继承color
	 *   haloSize:10,                    // 发光线粗细
	 * }
	 * let line = new Line(opt);
	 * */
	var Line = /*@__PURE__*/(function (superclass) {
	  function Line(pros){
	    // pros:
	    // {
	    //   color:0x55eeff,                 // 基线颜色
	    //   hoverColor:0xff9933,            // 线的鼠标移入基线颜色
	    //   spaceHeight:5,                  // 曲线空间高度
	    //   hasHalo:true,                   // 是否有发光线
	    //   hasHaloAnimate:true,            // 是否开启发光线动画效果
	    //   haloDensity:2,                  // 光点密度 值越大 越浓密，越消耗性能
	    //   haloRunRate:0.01,               // 光点运动频率
	    //   haloColor:0xffffff,             // 发光线颜色，默认继承color
	    //   haloSize:10,                    // 发光线粗细
	    // }
	    var fromCoord=pros.coords[0];
	    var toCoord=pros.coords[1];
	    var x1 = fromCoord[0];
	    var y1 = fromCoord[1];
	    var x2 = toCoord[0];
	    var y2 = toCoord[1];
	    var xdiff = x2 - x1;
	    var ydiff = y2 - y1;
	    var dif = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);//二点间距离
	    var v3s=[
	      new THREE.Vector3( x1, y1, pros.extrudeHeight ),
	      new THREE.Vector3( (x1+x2)/2, (y1+y2)/2, pros.extrudeHeight + pros.spaceHeight),
	      new THREE.Vector3( x2, y2, pros.extrudeHeight )
	    ];

	    //画弧线
	    var curve = new (Function.prototype.bind.apply( THREE.QuadraticBezierCurve3, [ null ].concat( v3s) ));
	    var geometry = new THREE.Geometry();
	    var amount = (dif+0.1) * pros.haloDensity;
	    if(amount<30){ amount=30; }

	    geometry.vertices = curve.getPoints(amount).reverse();
	    geometry.vertices.forEach(()=>{
	      geometry.colors.push(new THREE.Color(0xffffff));
	    });

	    var material =  new THREE.LineBasicMaterial({
	      color:pros.color,
	      opacity: 1.0,
	      blending:THREE.AdditiveBlending,
	      transparent:true,
	      depthWrite: false,
	      vertexColors: true,
	      linewidth: 1 });

	    superclass.call(this, geometry, material);

	    Object.assign(this.userData,pros);

	    //线条光晕效果
	    if(pros.hasHalo) {
	      this.initHalo(geometry);
	    }
	    //当前线条索引
	    this.index=Line.count++;
	    Line.array.push(this);
	  }

	  if ( superclass ) Line.__proto__ = superclass;
	  Line.prototype = Object.create( superclass && superclass.prototype );
	  Line.prototype.constructor = Line;

	  var staticAccessors = { texture: { configurable: true } };

	  /**
	   * 初始化发光线
	   * @param {THREE.Geometry} geometry - 通过线条几何体初始化发光线 {@link https://threejs.org/docs/#api/core/Geometry|THREE.Geometry}
	   * @protected
	   */
	  staticAccessors.texture.get = function (){
	    if(!Line._texture)
	    {
	      var canvas = document.createElement("canvas");
	      canvas.width=128;
	      canvas.height=128;
	      var context = canvas.getContext('2d');
	      Line.draw(context);
	      var texture = new THREE.Texture(canvas);
	      texture.needsUpdate = true;
	      Line._texture=texture;
	    }
	    return Line._texture;
	  };

	  /**
	   * 光点纹理样式,如果你对canvas熟悉可以重写.否则使用默认样式
	   * @static
	   * @param {context} context - Canvas上下文对象 {@link https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/getContext|Canvas.context}
	   * @example
	   *
	   * Line.draw=(ctx)=>{
	     *  context.clearRect(0, 0, 128, 128);
	     *  context.fillStyle = '#ff0000';
	     *  context.arc(64, 64, 20, 0, Math.PI * 2, false);
	     *  context.fill();
	     * }
	   */
	  Line.draw = function draw (context){
	    context.clearRect(0, 0, 128, 128);
	    context.fillStyle = '#ffffff';
	    context.arc(64, 64, 20, 0, Math.PI * 2, false);
	    context.fill();

	    context.fillStyle = 'rgba(255,255,255,.7)';
	    context.arc(64, 64, 60, 0, Math.PI * 2, false);
	    context.fill();

	  };

	  Line.prototype.initHalo = function initHalo (geometry){
	    var line = this;
	    var amount=geometry.vertices.length;
	    var positions = new Float32Array(amount * 3);
	    var colors = new Float32Array(amount * 3);
	    var sizes = new Float32Array(amount);
	    var vertex = new THREE.Vector3();
	    var color = new THREE.Color(colorToHex(this.userData.color));
	    for (var i = 0; i < amount; i++) {

	      vertex.x = geometry.vertices[i].x;
	      vertex.y = geometry.vertices[i].y;
	      vertex.z = geometry.vertices[i].z;
	      vertex.toArray(positions, i * 3);

	      // if ( vertex.x < 0 ) {
	      //   color.setHSL( 0.5 + 0.1 * ( i / amount ), 0.7, 0.5 );
	      // } else {
	      //   color.setHSL( 0.0 + 0.1 * ( i / amount ), 0.9, 0.5 );
	      // }
	      color.toArray(colors, i * 3);
	      sizes[i] = line.userData.haloSize;
	    }
	    //positions = geometry.vertices;

	    var psBufferGeometry = new THREE.BufferGeometry();
	    psBufferGeometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
	    psBufferGeometry.addAttribute('customColor', new THREE.BufferAttribute(colors, 3));
	    psBufferGeometry.addAttribute('size', new THREE.BufferAttribute(sizes, 1));

	    var shader = THREE.ShaderLib.line;
	    shader.uniforms = {
	      amplitude: {value: 1.0},
	      color: {value: new THREE.Color(colorToHex(this.userData.haloColor))},
	      texture: {value: Line.texture},
	    };
	   
	    
	    var shaderMaterial = new THREE.ShaderMaterial({
	      uniforms: shader.uniforms,
	      vertexShader: shader.vertexShader,
	      fragmentShader: shader.fragmentShader,
	      blending: THREE.AdditiveBlending,
	      depthTest: true,
	      depthWrite: false,
	      transparent: true,
	      // sizeAttenuation: true,
	    });

	    //线条光晕
	    var halo = new THREE.Points(psBufferGeometry, shaderMaterial);
	    halo.dynamic = true;
	    this.add(halo);
	    this.halo = halo;


	    halo.update = function(){
	      if(!line.userData.hasHalo || !line.userData.hasHaloAnimate)
	        { return; }

	      var time = Date.now() * 0.005 + line.index * 3;

	      var geometry = this.geometry;
	      var attributes = geometry.attributes;
	      for ( var i = 0; i < attributes.size.array.length; i++ ) {
	        attributes.size.array[ i ] = line.userData.haloSize + line.userData.haloSize * Math.sin( (line.userData.haloRunRate * i + time) ) ;
	      }
	      attributes.size.needsUpdate = true;
	    };

	  };

	  /**
	   * 发光线的动画更新方法
	   * @private
	   */
	  Line.prototype.update = function update (){
	    //if(!this.userData.hasHalo || !this.userData.hasHaloAnimate)
	    this.halo.update();
	  };

	  /**
	   * 修改线颜色
	   * @param {color} color - 线条颜色
	   * @example
	   *
	   * line.setColor(0xff0000);
	   * line.setColor('hsl(240,100%,50%)');
	   * line.setColor('rgb(255,255,0)');
	   */
	  Line.prototype.setColor = function setColor (color,haloColor){
	    //基线
	    if(typeof color!=='undefined')
	      { this.material.color=new THREE.Color(colorToHex(color)); }
	    // //光线
	    // if(typeof haloColor!=='undefined' && this.userData.hasHalo )
	    // {
	    //   let color = new THREE.Color($.colorToHex(haloColor));
	    //   let colors=this.halo.geometry.attributes.customColor;
	    //   for ( let i = 0; i < colors.array.length; i+=3 ) {
	    //     colors.array[ i ] = color.r;
	    //     colors.array[ i + 1] = color.g;
	    //     colors.array[ i + 2] = color.b;
	    //   }
	    //   this.halo.geometry.attributes.customColor.needsUpdate = true;
	    // }
	  };

	  /**
	   * 设置发光线宽度,基线永远是1
	   * @param {number} size - 发光线粗细大小
	   */
	  Line.prototype.setLineWidth = function setLineWidth (size){
	    if(!this.userData.hasHalo)
	    {
	      console.warn('Setting the LineWidth must be hasHalo:true');
	    }
	    //粗细
	    this.userData.haloSize=size;
	  };

	  /**
	   * 线条鼠标移出事件
	   *
	   * @param dispatcher
	   * @param event
	   * @protected
	   * @example
	   *  // 注册事件
	   *  map.addEventListener('mouseout', (event) => {
	     *        let obj = event.target;
	     *
	     *        if(obj.type==='Line')
	     *        {
	     *           // 这里做鼠标移出操作
	     *        }
	     *      });
	   */
	  Line.prototype.onmouseout = function onmouseout (dispatcher,event){
	    if(this.userData.hoverExclusive){
	      //所有线条回复初始
	      Line.array.map((line)=>{
	        if(line.halo){
	          line.halo.visible=true;
	        }
	        line.setColor(line.userData.color);
	      });
	    }

	    //选中线条
	    if(this.userData.hasHalo)
	    {
	      //粗细
	      var size=this.userData.haloSize/1.5;
	      this.userData.haloSize=size;
	    }
	    //颜色
	    this.setColor(this.userData.color);
	    dispatcher.dispatchEvent({ type: 'mouseout', target:this, orgEvent:event});
	  };
	  /**
	   * 线条鼠标移入事件
	   * @param dispatcher
	   * @param event
	   * @protected
	   * @example
	   *  // 注册事件
	   *  map.addEventListener('mouseover', (event) => {
	     *        let obj = event.target;
	     *
	     *        if(obj.type==='Line')
	     *        {
	     *           // 这里做鼠标移入操作
	     *        }
	     *      });
	   */
	  Line.prototype.onmouseover = function onmouseover (dispatcher,event){
	    if(this.userData.hoverExclusive)
	    {
	      Line.array.map((line)=>{
	        if(line.halo){
	          line.halo.visible=false;
	        }
	        line.setColor(this.userData.decayColor);

	      });
	    }

	    //选中线条
	    if(this.userData.hasHalo)
	    {
	      //修改光点线 大小
	      var size=this.userData.haloSize*1.5;
	      this.userData.haloSize=size;
	      this.halo.visible=true;
	    }
	    //颜色
	    this.setColor(this.userData.hoverColor?this.userData.hoverColor:this.userData.color);
	    dispatcher.dispatchEvent({ type: 'mouseover', target:this, orgEvent:event});
	  };
	  /**
	   * 线条鼠标单击事件
	   * @param dispatcher
	   * @param event
	   * @protected
	   * @example
	   *  // 注册事件
	   *  map.addEventListener('mousedown', (event) => {
	     *        let obj = event.target;
	     *
	     *        if(obj.type==='Line')
	     *        {
	     *           // 这里做鼠标单击操作
	     *        }
	     *      });
	   */
	  Line.prototype.onmousedown = function onmousedown (dispatcher,event) {
	    dispatcher.dispatchEvent({ type: 'mousedown', target:this, orgEvent:event});
	  };

	  Object.defineProperties( Line, staticAccessors );

	  return Line;
	}(THREE.Line));
	/**
	 * 线条数量
	 * @static
	 * @type {number}
	 */
	Line.count=0;
	Line.array=[];
	Line._texture=null;

	/**
	 * 3D地图.柱状图
	 * Created by zhu18.github.io on 2017/11/19.
	 * @author 朱润亚 <zhu18@vip.qq.com>
	 * @version beta v1.0.3
	 * @module Map3D
	 */


	/**
	 * 地图标注,继承{@link https://threejs.org/docs/#api/objects/Sprite|THREE.Sprite}
	 * @class
	 * @extends THREE.Sprite
	 * @example
	 *
	 * let opt={
	 *  name:'湖南-GDP',
	 *  coord:[116,23],
	 *  color:0xff0000,
	 *  size:4,
	 *  value:2,
	 *  userAttrA:'A'
	 * }
	 * let bar = new Bar(opt);
	 * console.log(bar.userData.value +  bar.userData.userAttrA)  //'2A'
	 */
	var Bar = /*@__PURE__*/(function (superclass) {
	  function Bar(opt){
	    superclass.call(this);
	    //opt.additiveBlending=true
	    var texture=opt.texture||new THREE.TextureLoader().load(opt.url);
	    this.material =  new THREE.MeshStandardMaterial({
	      color: opt.color,
	      emissive: opt.emissive||0x000000,
	      transparent:true,
	      opacity:opt.opacity,
	      blending: opt.additiveBlending?THREE.AdditiveBlending:THREE.NormalBlending,
	      side:THREE.DoubleSide,
	      map:texture||null,
	      alphaMap:opt.useAlphaMap?texture:null,
	      depthTest: opt.depthTest
	    });
	    this.type="Bar";
	    this.name=opt.name;
	    Object.assign(this.userData,opt);

	    this.geometry = opt.barType==='box'?new THREE.BoxGeometry(opt.size,opt.size,opt.value):new THREE.CylinderGeometry( opt.size, opt.size, opt.value, 32 );
	    this.add(new THREE.Mesh(this.geometry, this.material));
	    this.position.x=opt.coord[0];
	    this.position.y=opt.coord[1];
	    this.position.z=opt.extrudeHeight+opt.value/2;
	    if(opt.barType!=='box')
	    {
	      this.rotation.x=Math.PI/180*-90;
	    }
	    this.update = function(){
	      // new TWEEN.Tween(this.scale).to({x:size,y:size},100).delay(Mark.count*10).start()

	      // let context = this.material.map.image.getContext('2d');
	      // Mark.draw(context,size);
	      // this.material.map.needsUpdate = true;

	      // let geometry = this.geometry;
	      // let attributes = geometry.attributes;
	      // for ( let i = 0; i < attributes.size.array.length; i++ ) {
	      //   attributes.size.array[ i ] = size + size * Math.sin( 0.1 * i + time );
	      // }
	      // attributes.size.needsUpdate = true;
	    };

	    Bar.count++;
	  }

	  if ( superclass ) Bar.__proto__ = superclass;
	  Bar.prototype = Object.create( superclass && superclass.prototype );
	  Bar.prototype.constructor = Bar;

	  /**
	   * 设置标注颜色
	   * @param {color} color - 颜色格式0xff9933,'#ff9933','rgb(255,255,255)','hsl(100,100%,50%)'
	   * @param {number} [time] - 动画完成时间,与transition时间类似
	   * @param {number} [delay=0] - 动画延迟时间
	   * @param {Tween.Easing} [easing=line] -动画类型
	   * @param {callback} [callback] - 动画完成后回调
	   * @example
	   *  map.addEventListener('mouseover', (event) => {
	     *    let obj = event.target;
	     *    if(obj.type==='Bar')
	     *    {
	     *      obj.setColor('#ff5555',100);// 鼠标移入设置为红色
	     *    }
	     *  });
	   */
	  Bar.prototype.setColor = function setColor (color, time, delay, easing,callback){
	    this.userData.color=colorToHex(color);
	    if(time && typeof time==='number'){
	      color=new THREE.Color(colorToHex(color));
	      transition(this.material.color,color,time,delay,easing,callback);
	    }
	    else {
	      this.material.color.set(colorToHex(color));
	    }
	  };

	  /**
	   * 设置标注位置
	   * @param {v3} v3 - 格式{x:11,y:33,z:2}
	   * @param {number} [time] - 动画完成时间,与transition时间类似
	   * @param {number} [delay=0] - 动画延迟时间
	   * @param {Tween.Easing} [easing=line] -动画类型
	   * @param {callback} [callback] - 动画完成后回调
	   * @example
	   *
	   * map.addEventListener('mouseover', (event) => {
	     *     let obj = event.target;
	     *     if(obj.type==='Mark')
	     *     {
	     *       obj.setPosition({x:0,y:0,z:4},300) //标注升高
	     *     }
	     *   });
	   *
	   */
	  Bar.prototype.setPosition = function setPosition (v3,time,delay,easing,callback){
	    if(time && typeof time==='number')
	      { transition(this.position,v3,time,delay,easing,callback); }
	    else
	      { this.position.set(v3.x,v3.y,v3.z); }
	  };

	  /**
	   * 设置标注旋转
	   * @param {v3} v3 - 格式{x:11,y:33,z:2}
	   * @param {number} [time] - 动画完成时间,与transition时间类似
	   * @param {number} [delay=0] - 动画延迟时间
	   * @param {Tween.Easing} [easing=line] -动画类型
	   * @param {callback} [callback] - 动画完成后回调
	   */
	  Bar.prototype.setRotation = function setRotation (v3,time,delay,easing,callback){
	    v3.x=v3.x * (Math.PI / 180);
	    v3.y=v3.y * (Math.PI / 180);
	    v3.z=v3.z * (Math.PI / 180);
	    transition(this.rotation,v3,time,delay,easing,callback);
	  };
	  /**
	   * 设置标注大小
	   * @param {v3} v3 - 格式{x:11,y:33,z:2}
	   * @param {number} [time] - 动画完成时间,与transition时间类似
	   * @param {number} [delay=0] - 动画延迟时间
	   * @param {Tween.Easing} [easing=line] -动画类型
	   * @param {callback} [callback] - 动画完成后回调
	   */
	  Bar.prototype.setScale = function setScale (v3,time,delay,easing,callback){
	    if(time && typeof time==='number')
	      { transition(this.scale,v3,time,delay,easing,callback); }
	    else
	      { this.scale.set(v3.x,v3.y,v3.z); }
	  };
	  /* 事件 */
	  Bar.prototype.onmouseout = function onmouseout (dispatcher,event){
	   // let size=1
	    //new TWEEN.Tween(this.scale).to({x:size,y:size}, this.userData.hoverAnimaTime).start();
	    new TWEEN.Tween(this.material.emissive).to(new THREE.Color(colorToHex(this.userData.emissive)), this.userData.hoverAnimaTime).start();
	    dispatcher.dispatchEvent({ type: 'mouseout', target:this, orgEvent:event});

	  };
	  Bar.prototype.onmouseover = function onmouseover (dispatcher,event){
	    console.log(this.userData);
	    // let size=1.5
	    // new TWEEN.Tween(this.scale).to({x:size,y:size}, this.userData.hoverAnimaTime).start();
	    //区域移入颜色
	    new TWEEN.Tween(this.material.emissive).to(new THREE.Color(colorToHex(this.userData.hoverColor)), this.userData.hoverAnimaTime).start();
	    dispatcher.dispatchEvent({ type: 'mouseover', target:this, orgEvent:event});
	  };
	  Bar.prototype.onmousedown = function onmousedown (dispatcher,event) {
	    dispatcher.dispatchEvent({ type: 'mousedown', target:this, orgEvent:event});
	  };

	  return Bar;
	}(THREE.Object3D));
	/**
	 * 所有标注数量,静态属性
	 * @type {number}
	 * @example
	 * //查看地图所有标注数
	 * console.log(Bar.count);
	 */
	Bar.count=0;
	Bar._texture=null;

	/**
	 * 3D地图
	 * Created by zhu18.github.io on 2017/11/19.
	 * @author 朱润亚 <zhu18@vip.qq.com>
	 * @version beta v1.0.3
	 * @module Map3D
	 */



	/**
	 * 地图立体参数设置
	 * @type {{amount: number, bevelThickness: number, bevelSize: number, bevelEnabled: boolean, bevelSegments: number, curveSegments: number, steps: number}}
	 */
	var extrudeOption = {
	  amount : 1,//厚度
	  bevelThickness : 1,
	  bevelSize : .2,
	  bevelEnabled : false,
	  bevelSegments : 5,
	  curveSegments :1,
	  steps : 1,
	};


	/**
	 * 创建3D地图.
	 * @class
	 * @example
	 * //配置默认值
	 * let opt={
	 *      name:'',                // 调试使用，window['name']为该实例对象，注意设置debugger:true启用
	 *      el:document.body,       // 容器
	 *      geoData:null,           // 地图geojson数据
	 *      hasStats:true,          // 是否显示性能面板
	 *      hasControls:true,       // 用户是否能控制视角
	 *      autoRotate:false,       // 是否自动旋转视角
	 *      ambientColor:0x333333,  // 环境光颜色
	 *      directionalColor:0xffffff,// 平行光颜色
	 *      hasLoadEffect:false,    // 是否有加载效果
	 *      debugger:false,         // 调试模式
	 *      cameraPosition:{x:0,y:0,z:40},// 相机位置
	 *      visualMap:null,         // 直观图图例
	 *      extrude:extrudeOption,  // 立体厚度参数
	 *
	 *      area:{
	 *          data:[],            // 地图用户数据[{ name:'北京', value:, color:0xff3333 }...]
	 *          // area参数默认值
	 *          name:'',            // 区域名称
	 *          color:0x3366ff,     // 地图颜色
	 *          hoverColor:0xff9933,// 鼠标移入颜色
	 *          lineColor:0xffffff, // 线颜色
	 *          lineOpacity:1,//线透明度
	 *          opacity:1,          // 地图透明度
	 *          hasPhong:true,      // 是否反光材质
	 *          shininess:50,       // 反光材质光滑度
	 *          hoverAnimaTime:100, // 鼠标移入动画过渡时间
	 *          loadEffect:false,   // 区域加载效果
	 *          hasHoverHeight:true,// 鼠标移入区域升高
	 *          showText:false      // 是否显示区域名称
	 *          textStyle:{
	 *             size:50,              //字体大小
	 *             color:'#ffffff',      //字体颜色
	 *             borderColor:'#000000',//字体边框
	 *          }
	 *      },
	 *
	 *      mark:{
	 *          data:[],            // 标注点数据[{ name:'XXX', coord:[11,22], value:13 }...]
	 *          // mark参数默认值
	 *          name:'',            // 标注名称
	 *          color:0xffffff,     // 标注点颜色
	 *          hoverColor:0xff9933,// 鼠标移入颜色
	 *          hoverAnimaTime:100, // 鼠标移入动画过渡时间
	 *          min:0.01,
	 *          max:5,
	 *      },
	 *
	 *      line:{
	 *          data:[],                        //线数据[{ fromName:'', toName:'', coords:[toCoord, fromCoord] }...]
	 *          // line参数默认值
	 *          color:0x55eeff,                 // 颜色
	 *          hoverColor:0xff9933,            // 鼠标移入颜色
	 *          hoverExclusive:true,            // 鼠标移入排除其他线条
	 *          hoverAnimaTime:100,             // 鼠标移入动画过渡时间
	 *          spaceHeight:5,                  // 曲线空间高度
	 *          hasHalo:true,                   // 是否开启光晕效果
	 *          hasHaloAnimate:true,            // 是否开启光晕动画效果
	 *          haloDensity:2,                  // 光点密度 值越大 越浓密，越消耗性能
	 *          haloRunRate:0.01,               // 光点运动频率
	 *          haloColor:0xffffff,             // 默认继承color颜色[不建议修改]
	 *          haloSize:10,                    // 光晕大小
	 *          decayColor:0x222222,            // 未激活线条颜色
	 *      },
	 *
	 *      //内置对象
	 *      mapObject:null,     // 地图对象
	 *      areaGroup:null,     // 区域组
	 *      lineGroup:null,     // 线条组
	 *      markGroup:null,     // 标记组
	 *      scene:null,         // 场景对象
	 *      camera:null,        // 相机对象
	 *      renderer:null,      // 渲染器对象
	 *      stats:null,         // 性能对象
	 *      controls:null,      // 控制器对象
	 *      _w:0,               // 呈现宽度
	 *      _h:0,               // 呈现高度
	 *      __event:null,        // 事件对象
	 *  }
	 *
	 * let map = new Map3D(opt);
	 *
	 * //事件注册
	 *   map.addEventListener('mousedown', function (event) {
	 *        let obj = event.target;
	 *        if(obj.type==='Area') //type='Area|Line|Mark'
	 *          obj.setColor('#ff6666', 500);
	 *      });
	 *
	 *   map.addEventListener('mouseout', (event) => {
	 *        let obj = event.target;
	 *        console.log(obj.type+':out')
	 *      });
	 *
	 *   map.addEventListener('mouseover', (event) => {
	 *        let obj = event.target;
	 *        console.log(obj.userData.name);
	 *        //self.mapTitlePositon.left = $(window).scrollLeft() + event.clientX + 20 + 'px';
	 *        //self.mapTitlePositon.top = $(window).scrollTop() + event.clientY + 20 + 'px';
	 *      })
	 *
	 *   map.addEventListener('resize', function (event) {
	 *        console.log('resize...');
	 *      });
	 */
	var Map3D = function Map3D(o){
	  if(!Detector.webgl) {
	    console.warn('不支持webgl,停止渲染.');
	    return;
	  }
	  var opt={
	    name:'',          //调试使用，window['name']为该实例对象，注意设置debugger:true启用
	    el:document.body, //容器
	    geoData:null,     //地图geojson数据
	    hasStats:true,    //是否显示性能面板
	    hasControls:true, //用户是否能控制视角
	    autoRotate:false, //是否自动旋转视角
	    ambientColor:0x333333,//环境光颜色
	    directionalColor:0xffffff,//平行光颜色
	    hasLoadEffect:false,//是否有加载效果
	    debugger:false,   //调试模式
	    cameraPosition:{x:0,y:0,z:40},//相机位置
	    extrude:extrudeOption,//立体厚度参数

	    area:{
	      data:[],          //地图用户数据[{name:'北京',value:,color:0xff3333}...]
	      //area参数默认值
	      name:'',          // 区域名称
	      color:0x3366ff,   //地图颜色
	      hoverColor:0xff9933,//鼠标移入颜色
	      lineColor:0xffffff, //线颜色
	      lineOpacity:1,    //线透明度
	      opacity:1,        //地图透明度
	      hasPhong:true,    //是否反光材质
	      shininess:50,    //反光材质光滑度
	      hoverAnimaTime:300, //鼠标移入动画过渡时间
	      loadEffect:false,    //区域加载效果
	      hasHoverHeight:true,//鼠标移入区域升高
	      showText:false,     //是否显示区域名称
	      textStyle:{
	        size:50,            //字体大小
	        color:'#ffffff',    //字体颜色
	        borderColor:'#000000',//字体边框
	      }
	    },

	    dataRange:{
	      data:[],
	      width:1,
	      height:0.7,
	      position:{x:23,y:-8,z:1},
	      spacing:0.2,
	      text:['高','低'],
	      textColor:'#ffffff',
	      showName:false,
	      namePosition:{x:-2,y:0,z:0},
	      hoverColor:0xff9933,
	      hoverAnimaTime:100,
	      hasHoverHeight:true,//鼠标移入区域升高
	      hasEvent:true,
	    },

	    mark:{
	      data:[],        //标注点数据[{name:'XXX',coord:[11,22],value:13}...]
	      // mark参数默认值
	      name:'',           // 标注名称
	      color:0xffffff,   //标注点颜色
	      hoverColor:0xff9933,//鼠标移入颜色
	      hoverAnimaTime:100, //鼠标移入动画过渡时间
	      min:0.01,
	      max:5,
	    },
	    bar:{
	      data:[],        //标注点数据[{name:'XXX',coord:[11,22],value:13}...]
	      // mark参数默认值
	      name:'',           // 标注名称
	      color:0xffffff,   //标注点颜色
	      hoverColor:0xff9933,//鼠标移入颜色
	      hoverAnimaTime:100, //鼠标移入动画过渡时间
	      size:1,           //柱子大小
	      value:1,          //柱子高度
	    },
	    line:{
	      data:[],      //线数据[{fromName:'',toName:'',coords:[toCoord,fromCoord]}...]
	      //line可继承参数
	      color:0x55eeff,
	      hoverColor:0xff9933,          // 鼠标移入颜色
	      hoverExclusive:true,          // 鼠标移入排除其他线条
	      hoverAnimaTime:100,           // 鼠标移入动画过渡时间
	      spaceHeight:5,                // 曲线空间高度
	      hasHalo:true,                 // 是否开启光晕效果
	      hasHaloAnimate:true,          // 是否开启光晕动画效果
	      haloDensity:2,                // 光点密度 值越大 越浓密，越消耗性能
	      haloRunRate:0.01,             // 光点运动频率
	      haloColor:0xffffff,           // 默认继承color颜色[不建议修改]
	      haloSize:10,                  // 光晕大小
	      decayColor:0x222222,          // 未激活线条颜色
	    },


	    //内置对象
	    mapObject:null,//地图对象
	    areaGroup:null,//区域组
	    lineGroup:null,//线条组
	    markGroup:null,//标记组
	    scene:null,//场景对象-内部调用
	    camera:null,//相机对象-内部调用
	    renderer:null,//渲染器对象-内部调用
	    stats:null,//性能对象-内部调用
	    controls:null,//控制器对象-内部调用
	    areaCount:0,
	    _w:0,
	    _h:0,
	    __event:null,//事件对象
	  };
	  extend(true,opt,o);
	  extend(true,this,opt);



	  if(!this.geoData)
	  {
	    console.warn('Map3D no geoData.');
	    return;
	  }

	  this._w=this.el.offsetWidth;
	  this._h=this.el.offsetHeight;
	  console.time('init');
	  this.init();
	  console.timeEnd('init');
	  this.initEvent();
	};
	/**
	 * 初始化方法
	 */
	Map3D.prototype.init = function init (){
	  this.el.innerHTML='';
	  this.scene = new THREE.Scene({antialias:true});
	  this.camera = new THREE.PerspectiveCamera(70, this._w/this._h, 0.1, 1000);
	  this.renderer = new THREE.WebGLRenderer({alpha:true });
	  this.renderer.setPixelRatio( window.devicePixelRatio );
	  this.camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z);

	  this.camera.lookAt(this.scene.position);
	  this.renderer.setSize(this._w,this._h);
	  //场景雾化
	  //this.scene.fog=new THREE.FogExp2(0xaaffff,0.005)
	  this.scene.fog = new THREE.Fog(0xffffff, 0.15, 1000);
	  this.scene.add(new THREE.AmbientLight(colorToHex(this.ambientColor)));
	  this.dirLight = new THREE.DirectionalLight(colorToHex(this.directionalColor));
	  this.dirLight.position.set(0,50,50);
	  this.scene.add(this.dirLight);
	  this.dirLightDown = new THREE.DirectionalLight(colorToHex(this.directionalColor));
	  this.dirLightDown.position.set(0,-50,0);
	  this.scene.add(this.dirLightDown);

	  this.spotLight = new THREE.SpotLight(colorToHex(this.color));
	  this.spotLight.position.set(0,150,150);
	  this.spotLight.intensity = 0.7;
	  this.spotLight.target = this.scene;
	  this.scene.add(this.spotLight);

	  //创建地图区域添加到 mapObject
	  this.mapObject = new THREE.Group();

	  this.initControls();
	  this.initDebug();

	  console.time('initArea');
	  //初始化区域
	  this.initArea();
	  console.timeEnd('initArea');

	  console.time('initMark');
	  //初始化标注点
	  this.initMark();
	  console.timeEnd('initMark');

	  console.time('initLine');
	  //初始化飞线
	  this.initLine();
	  console.timeEnd('initLine');

	  console.time('inintDataRange');
	  //初始化数据等级范围
	  this.inintDataRange();
	  console.timeEnd('inintDataRange');

	  console.time('initBar');
	  //初始柱状图
	  this.initBar();
	  console.timeEnd('initBar');

	  //根据数据中心位置偏移
	  if(this.geoData.cp){
	    this.mapObject.position.set(-this.geoData.cp[0],-this.geoData.cp[1],0);
	  }
	  this.scene.add(this.mapObject);
	  this.scene.add(this.camera);
	  this.el.appendChild(this.renderer.domElement);
	  this.renderScene();
	};
	/**
	 * 地图区域初始化方法
	 * @param {json} areaOpt - 区域配置
	 */
	Map3D.prototype.initArea = function initArea (areaOpt){
	    var ref;

	  Object.assign(this.area, areaOpt);
	  Area.count=0;
	  if(this.areaGroup)
	  {
	    (ref = this.areaGroup).remove.apply(ref, this.areaGroup.children);
	  }
	  this.areaGroup = new THREE.Group();
	  this.geoData.features.forEach((item)=>{
	    //地图属性 & 用户属性合并
	    var itemUserData = this.area.data.find(val=> val.name===item.properties.name );
	    Object.assign(item.properties, itemUserData);
	    this.createArea(item);
	  });
	  this.mapObject.add(this.areaGroup);
	};

	Map3D.prototype.inintDataRange = function inintDataRange (dataRangeOpt){
	    var ref;

	  Object.assign(this.dataRange,dataRangeOpt);
	  //继承map立体高度
	  var dataRangeOptClone = Object.assign({extrudeHeight:this.extrude.amount/2},this.dataRange);
	  delete dataRangeOptClone.data;
	  if(this.dataRangeGroup){
	    (ref = this.dataRangeGroup).remove.apply(ref, this.dataRangeGroup.children);
	  }
	  DataRange.count=0;

	  this.dataRangeGroup= new THREE.Group();

	  this.dataRange.data.forEach((userData)=>{
	    var opt=Object.assign({},dataRangeOptClone,userData);
	    //数据范围创建
	    var range = new DataRange(opt);
	    //区域与范围关联
	    range.rangeAreas=[];
	    this.dataRangeGroup.add(range);

	    //根据范围调整区域颜色显示
	    var min = typeof userData.min==='undefined'?-999999999999:userData.min;
	    var max = typeof userData.max==='undefined'?999999999999:userData.max;
	    var tempArea=null;
	    //区域与范围关联
	    this.area.data.forEach((area)=>{
	      if(typeof area.value !== 'undefined'){
	        if(min<area.value && area.value < max)
	        {
	          tempArea=this.getArea(area.name);
	          if(tempArea)
	          {
	            range.rangeAreas.push(tempArea);
	            tempArea.setColor(userData.color);
	          }
	        }
	      }

	    });
	  });

	  //txt 设置
	  if(this.dataRange.data.length>0)
	  {
	    if(this.dataRange.text[0]){
	      var txt=new Font3D$1(this.dataRange.text[0],{color:this.dataRange.textColor});
	      txt.position.add({x:0,y:1,z:0});
	      this.dataRangeGroup.add(txt);
	    }
	    if(this.dataRange.text[1]){
	      var txt$1=new Font3D$1(this.dataRange.text[1],{color:this.dataRange.textColor});
	      txt$1.position.add({x:0,y:-(this.dataRange.height+DataRange.count * (this.dataRange.height + this.dataRange.spacing)),z:0});
	      this.dataRangeGroup.add(txt$1);
	    }
	  }

	  //调整整体位置
	  this.dataRangeGroup.position.add(this.dataRange.position);
	  this.scene.add(this.dataRangeGroup);
	};
	/**
	 * 标注初始化方法
	 * @param markOpt - 标注配置
	 */
	Map3D.prototype.initMark = function initMark (markOpt){
	    var ref;

	  Object.assign(this.mark,markOpt);
	  //继承map立体高度
	  var markClone = Object.assign({extrudeHeight:this.extrude.amount},this.mark);
	  delete markClone.data;
	  Mark.count=0;
	  if(this.markGroup)
	  {
	    (ref = this.markGroup).remove.apply(ref, this.markGroup.children);
	  }
	  this.markGroup= new THREE.Group();
	  this.mark.data.forEach((userData)=>{
	    var opt=Object.assign({},markClone,userData);
	    var mark = new Mark(opt);
	    this.markGroup.add(mark);
	  });
	  this.mapObject.add(this.markGroup);
	};

	/**
	 * 线条初始化方法
	 * @param lineOpt - 线条配置
	 */
	Map3D.prototype.initLine = function initLine (lineOpt){
	    var ref;

	  Object.assign(this.line,lineOpt);
	  var lineClone = Object.assign({extrudeHeight:this.extrude.amount},this.line);
	  delete lineClone.data;
	  Line.count=0;
	  //重新生成所有线条
	  if(this.lineGroup)
	  {
	    (ref = this.lineGroup).remove.apply(ref, this.lineGroup.children);
	  }
	  this.lineGroup= new THREE.Group();
	  this.line.data.forEach((userData)=>{
	    var opt=Object.assign({},lineClone,userData);
	    var line = new Line(opt);
	    this.lineGroup.add(line);
	  });
	  this.mapObject.add(this.lineGroup);

	};

	/**
	 * 柱初始化
	 * @param barOpt - 柱配置
	 */
	Map3D.prototype.initBar = function initBar (barOpt){
	    var ref;

	  Object.assign(this.bar,barOpt);
	  var barClone = Object.assign({extrudeHeight:this.extrude.amount},this.bar);
	  delete barClone.data;
	  Bar.count=0;
	  //重新生成所有柱状图
	  if(this.barGroup)
	  {
	    (ref = this.barGroup).remove.apply(ref, this.barGroup.children);
	  }
	  this.barGroup= new THREE.Group();
	  this.bar.data.forEach((userData)=>{
	    var opt=Object.assign({},barClone,userData);
	    var bar = new Bar(opt);
	    this.barGroup.add(bar);
	  });
	  this.mapObject.add(this.barGroup);
	};

	/**
	 * 相机位置-现有位置追加
	 * @param {v3} ps - 如：{x:0,y:0,y:2}
	 * @param {number} [time] - 动画时间
	 * @param {int} [delay=0] - 延时
	 */
	Map3D.prototype.addCameraPosition = function addCameraPosition (v3,time,delay,callback){
	  var v=new THREE.Vector3(v3.x,v3.y,v3.z);
	  if(typeof time ==='number'){
	    var to = this.camera.position.clone().add(v);
	    if(!callback){ callback=()=>{}; }
	    new TWEEN.Tween(this.camera.position).to(to,time).delay(delay||0).start().onComplete(callback);
	  }
	  else
	    { this.camera.position.add(v3.x,v3.y,v3.z); }
	};
	/**
	 * 相机位置-新位置设置
	 * @param {v3} ps - 如：{x:0,y:0,y:2}
	 * @param {number} [time] - 动画时间
	 * @param {int} [delay=0] - 延时
	 */
	Map3D.prototype.setCameraPosition = function setCameraPosition (v3,time,delay,easing,callback){
	  if(time && typeof time==='number')
	    { transition(this.camera.position,v3,time,delay,easing,callback); }
	  else
	    { this.camera.position.set(v3.x,v3.y,v3.z); }
	};

	/**
	 * 销毁地图对象
	 */
	Map3D.prototype.dispose = function dispose (){
	  this.el.innerHTML='';
	  this.__event.dispose();
	};
	/**
	 * 禁用
	 * @param {boolean} disable - 是否禁用
	 */
	Map3D.prototype.disable = function disable (disable$1){
	  disable$1=typeof disable$1==='undefined'?true:disable$1;
	  if(disable$1){
	    this.el.style.pointerEvents='none';
	    this.__event.enable=!disable$1;
	  }
	  else
	  {
	    this.el.style.pointerEvents='';
	    this.__event.enable=!disable$1;
	  }
	};

	/**
	 * 初始化地图事件
	 * @private
	 */
	Map3D.prototype.initEvent = function initEvent (){
	  this.__event=new Event(this);
	};

	/**
	 * 初始化控制器,返回{@link https://threejs.org/docs/#examples/controls/OrbitControls|OrbitControls}
	 * @returns {OrbitControls}
	 */
	Map3D.prototype.initControls = function initControls (){
	  if(!this.hasControls){ return }
	  this.controls = new OrbitControls(this.camera,this.renderer.domElement);
	  this.controls.userPan=false;
	  this.controls.autoRotate=this.autoRotate;
	  this.controls.userPanSpeed=1;
	  return this.controls;
	};

	/**
	 * 初始化性能监控器 - debugger:true 自动开启，返回{@link https://github.com/mrdoob/stats.js|stats}
	 * @returns {Stats}
	 */
	Map3D.prototype.initStats = function initStats (){
	  this.stats = new Stats();
	  this.stats.setMode(0);//0:fps |1:ms
	  this.stats.domElement.style.position='absolute';
	  this.stats.domElement.style.top='70px';
	  this.stats.domElement.style.right='0px';
	  this.el.appendChild(this.stats.domElement);
	  return this.stats;
	};

	/**
	 * 初始化调试模式
	 * @see Map3d#initStats
	 */
	Map3D.prototype.initDebug = function initDebug (){
	  if(!this.debugger) { return }
	  if(this.name){
	    window[this.name]=this;
	  }
	  this.initStats();
	  var helper = new THREE.DirectionalLightHelper( this.dirLight, 5 );
	  this.scene.add( helper );
	  var spotLightHelper = new THREE.SpotLightHelper( this.spotLight );
	  this.scene.add( spotLightHelper );
	  var size = 300;
	  var divisions = 40;
	  var gridHelper = new THREE.GridHelper( size, divisions );
	  this.scene.add( gridHelper );
	  var axisHelper = new THREE.AxisHelper( 50 );
	  this.scene.add( axisHelper );

	  this.infoPlane = document.createElement('div');
	  this.infoPlane.contentEditable=true;
	  this.infoPlane.style.position='absolute';
	  this.infoPlane.style.bottom='70px';
	  this.infoPlane.style.right='10px';
	  this.infoPlane.style.padding ='5px 10px';
	  this.infoPlane.style.background ='rbga(0,0,0,.5)';
	  this.infoPlane.style.border ='1px solid #aaa';
	  this.infoPlane.style.borderRadius='5px';
	  this.infoPlane.style.color='#eee';
	  this.el.appendChild(this.infoPlane);
	};
	Map3D.prototype.printCameraPosition = function printCameraPosition (){
	  var v3=this.camera.position;
	  this.infoPlane.textContent='相机位置 {x:'+v3.x.toFixed(4)+",y:"+v3.y.toFixed(4)+",z:"+v3.z.toFixed(4)+'}';
	};

	/**
	 * 删除区域
	 * @param {string|Area} area - 要删除的区域名称或者区域对象
	 */
	Map3D.prototype.reomveArea = function reomveArea (area){
	  if(typeof area === 'string')
	    { area=this.getArea(area); }
	  this.areaGroup.remove(area);
	};

	/**
	 * 删除标注
	 * @param {string|Mark} mark - 要删除的标注名称或者标注对象
	 */
	Map3D.prototype.removeMark = function removeMark (mark){
	  if(typeof mark === 'string')
	    { mark=this.getMark(mark); }
	  this.markGroup.remove(mark);
	};
	/**
	 * 得到地图区域
	 * @param {string} areaName - 地图区域名称
	 * @returns {Area}
	 */
	Map3D.prototype.getArea = function getArea (areaName){
	  return this.areaGroup.getObjectByName(areaName);
	};
	/**
	 * 得到地图标注
	 * @param {string} markName - 地图标注名称
	 * @returns {Mark}
	 */
	Map3D.prototype.getMark = function getMark (markName){
	  return this.markGroup.getObjectByName(areaName);
	};

	/**
	 * 通过name得到地图相关对象集合
	 * @param {string} name - 对象名称
	 * @returns {Array}
	 */
	Map3D.prototype.getObjectsByName = function getObjectsByName (name){
	  var objects=[];
	  this.scene.traverse((obj)=>{
	    if(obj.name===name){
	      objects.push(obj);
	    }
	  });
	  return objects;
	};

	/**
	 * 地图呈现
	 * @protected
	 */
	Map3D.prototype.renderScene = function renderScene (){
	  this.renderer.clear();
	  requestAnimationFrame(this.renderScene.bind(this));

	  // this.pos=this.pos||0;
	  // let light = this.scene.getObjectByName('pointLight');
	  // let p = this.scene.getObjectByName('point');
	  // if(this.pos < 1){
	  // let v3=this.curve.getPointAt(this.pos);
	  // light.position.set(v3.x,v3.y,v3.z);
	  // p.position.set(v3.x,v3.y,v3.z);
	  //   this.pos += 0.001
	  // }else{
	  // this.pos = 0;
	  // }
	  this.areaGroup.children.map((area)=>{
	    if(area)
	      { area.update(); }
	  });


	  this.lineGroup.children.map((line)=>{
	    if(line.halo)
	      { line.halo.update(); }
	  });

	  this.markGroup.children.map((mark)=>{
	    mark.update();
	  });

	  TWEEN.update();

	  if(this.hasControls)
	    { this.controls.update(); }

	  if(this.debugger){
	    this.stats.update();
	    this.printCameraPosition();
	  }

	  this.renderer.render(this.scene, this.camera);

	};

	/**
	 * 地图大小改变时事件
	 * @private
	 */
	Map3D.prototype._onResize = function _onResize (){
	  this.dispatchEvent({ type: 'resize', el:null});
	};

	/**
	 *
	 * 鼠标移动时触发
	 * @param event
	 * @param intersects
	 * @private
	 */
	Map3D.prototype._onMouseMove = function _onMouseMove (event,intersects){
	  if ( intersects.length > 0 ) {
	    //之前选中对象ID
	    var preSelectedObjID=this.selectedObj?this.selectedObj.id:'';
	    this.selectedObj=null;

	    for(var i=0;i<intersects.length;i++){
	      if(intersects[i].object && intersects[i].object.type==='Mesh' && intersects[i].object.parent.type && intersects[i].object.parent.type==='Area')
	      {
	        this.selectedObj=intersects[ i ].object.parent;
	        break;
	      }
	      else if(intersects[i].object && intersects[i].object.type==='Mark')
	      {
	        this.selectedObj=intersects[ i ].object;
	        break;
	      }
	      else if(intersects[i].object && intersects[i].object.parent == this.lineGroup && intersects[i].object.type==='Line')
	      {
	        this.selectedObj=intersects[ i ].object;
	        break;
	      }
	      else if(intersects[i].object && intersects[i].object.parent && intersects[i].object.parent.type==='DataRange')
	      {
	        this.selectedObj=intersects[ i ].object.parent;
	        break;
	      }
	      else if(intersects[i].object && intersects[i].object.parent && intersects[i].object.parent.type==='Bar')
	      {
	        this.selectedObj=intersects[ i ].object.parent;
	        break;
	      }
	    }
	    /* 选中区域元素 */
	    //已选中对象
	    if(this.selectedObj)
	    {
	      //如果不是同一个对象
	      if(preSelectedObjID!=this.selectedObj.id)
	      {
	        //老对象触发mouseout
	        if(preSelectedObjID){
	          var preSelectedObj=this.scene.getObjectById(preSelectedObjID);
	          //移出区域还原
	          if(preSelectedObj)
	            { preSelectedObj.onmouseout(this, event); }
	        }
	        //新对象触发mouseover
	        this.selectedObj.onmouseover(this, event);
	      }
	    }
	    else {
	      //未选中对象,老对象触发mouseout
	      if(preSelectedObjID){
	        var preSelectedObj$1=this.scene.getObjectById(preSelectedObjID);
	        //移出区域还原
	        if(preSelectedObj$1)
	          { preSelectedObj$1.onmouseout(this, event); }
	      }
	    }

	  } else {
	    /* 没有选中任何对象，还原已选中元素 */
	    if(this.selectedObj){
	      //移出区域还原
	      this.selectedObj.onmouseout(this, event);
	    }
	    this.selectedObj=null;
	  }
	};

	/**
	 * 鼠标单击触发
	 * @param event
	 * @param intersects
	 * @private
	 */
	Map3D.prototype._onMouseDown = function _onMouseDown (event,intersects){

	  if ( intersects.length > 0 ) {
	    var selectedObj=null;
	    for(var i=0;i<intersects.length;i++){
	      if(intersects[i].object && intersects[i].object.type=='Mesh' && intersects[i].object.parent.type && intersects[i].object.parent.type=='Area')
	      {
	        selectedObj=intersects[ i ].object.parent;
	        break;
	      }
	      else if(intersects[i].object && intersects[i].object.type==='Mark')
	      {
	        selectedObj=intersects[ i ].object;
	        break;
	      }
	      else if(intersects[i].object && intersects[i].object.parent && intersects[i].object.parent.type==='DataRange')
	      {
	        selectedObj=intersects[ i ].object.parent;
	        break;
	      }
	    }
	    if(selectedObj)
	    {
	      this.debugger && console.log(selectedObj);
	      selectedObj.onmousedown(this,event);
	    }
	  }
	};
	//创建地图区域块
	//结构 parentObj:[area1,area2...]
	/**
	 * 创建区域
	 * @param {Object} item
	 * @param {string} [item.name=''] - 区域名称
	 * @param {color} [item.color=0x3366ff] - 区域颜色
	 * @param {color} [item.hoverColor=0xff9933] - 区域鼠标选中颜色
	 * @param {number} [item.opacity=1] - 区域透明度
	 * @param {boolean} [item.hasPhong=true] - 是否反光材质
	 * @param {number} [item.shininess=50] - 反光材质光滑度
	 * @param {number} [item.hoverAnimaTime=100] - 鼠标移入动画过渡时间
	 * @param {number} [item.loadEffect=false] - 区域加载效果
	 * @param {boolean} [item.hasHoverHeight=true] - 鼠标移入区域升高
	 */
	Map3D.prototype.createArea = function createArea (item){
	  // item.properties 一般有{id,name,cp,childNum,color,value,extrude}
	  // Area继承Map3D属性
	  var pros=Object.assign({
	    color:this.area.color,         //地图颜色
	    hoverColor:this.area.hoverColor, //鼠标移入颜色
	    lineColor:this.area.lineColor, //线颜色
	    lineOpacity:this.area.lineOpacity,//线透明度
	    opacity:this.area.opacity,      //地图透明度
	    hasPhong:this.area.hasPhong,    //是否反光材质
	    shininess:this.area.shininess,  //反光材质光滑度
	    hoverAnimaTime:this.area.hoverAnimaTime, //鼠标移入动画过渡时间
	    extrude:this.extrude,           //立体厚度参数
	    loadEffect:this.area.loadEffect,//加载效果
	    hasHoverHeight:this.area.hasHoverHeight,  //有标注，选中区域不升高
	    showText:this.area.showText,    //是否显示地区名称
	    textStyle:this.area.textStyle,    //文字样式
	    extrudeHeight:this.extrude.amount //区域厚度
	  },item.properties);

	  var coords=[];
	  if(!item.geometry){ return; }
	  if(item.geometry.type=='Polygon'){
	    coords.push(item.geometry.coordinates[0]);
	  }
	  else if (item.geometry.type=='MultiPolygon') {
	    for(var i=0;i<item.geometry.coordinates.length;i++){
	      coords.push(item.geometry.coordinates[i][0]);
	    }
	  }
	  pros.coords=coords;
	    
	  var area=new Area(pros);
	  this.areaGroup.add(area);
	};

	/**
	 * 重写three自定义事件
	 */
	Object.assign(THREE.EventDispatcher.prototype,{dispatchEvent: function ( event) {
	  if ( this._listeners === undefined ) { return; }
	  var listeners = this._listeners;
	  var listenerArray = listeners[ event.type ];
	  if ( listenerArray !== undefined ) {
	    //Object.assign(event, event.orgEvent);
	    var target=event.target;
	    //通过原始事件构造自定义事件
	    for(var a in event.orgEvent)
	      { event[a] = event.orgEvent[a]; }
	    //覆盖原始事件目标对象
	    event.target = target||this;
	    var array = listenerArray.slice( 0 );
	    for ( var i = 0, l = array.length; i < l; i ++ ) {
	      array[ i ].call( this, event );
	    }
	  }
	}});
	Object.assign( Map3D.prototype, THREE.EventDispatcher.prototype );

	exports.Area = Area;
	exports.Line = Line;
	exports.Mark = Mark;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
