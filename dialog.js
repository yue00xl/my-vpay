/**
 * Copyright (c) 2012, Jiehun.com.cn Inc. All Rights Reserved
 * @author dengxiaolong@jiehun.com.cn
 * @date 2012-02-16
 * @version 1.0
 * @brief
 });
 **/
(function(H, me, undefined){
	var _pl = 0, // 父级便宜左边距
		_pt = 0, // 父级便宜上边距
		dlg,inited = false,_cb,_cbCancel, _fl ,_mask,_maskClick=false, _sized = false,_d = H.ui.elem(document),_dlg, isIE6 = H.browser.type == 'msie' && H.browser.version < 7,
		_close = function(e) { hide(true,'ok'); return false;},
		_close2 = function(e) { hide(true,'cancel'); return false;},
		_enableEnter = false,_lastFocus = null, body = document.compatMode == 'CSS1Compat' ? document.documentElement : document.body;

	function init(){
		if (document.activeElement !== document.body) {
			_lastFocus = document.activeElement;
			_lastFocus.blur();
		}

		if (inited) {
			setTitle('');
			hideAllBtns();
			addDlgCls('');
			return;
		}
		inited = true;
		dlg = H.ui._node('div', {
			'class':'dialog'
		});
		dlg.style.display = 'none';
		dlg.style.position = 'absolute';
		dlg.innerHTML = '<div class="hd"><p id="dialog_title"></p><a class="close" title="关闭"></a></div><div class="bd"></div><div class="ft"><input type="button" class="e-btn-light" value="确定"/><input type="button" value="取消"/></div><span class="icon"></span>';
		dlg.style.zIndex = 10005;
		document.body.appendChild(dlg);

		//H.each(dlg.childNodes[2].childNodes, function(){
		//	this.onclick = _close;
		//});
		dlg.childNodes[2].childNodes[0].onclick = _close;
		dlg.childNodes[2].childNodes[1].onclick = _close2;
		dlg.childNodes[0].childNodes[1].onclick = _close2;
		_dlg = H.ui.elem(dlg);


		// 全局快捷键
		H.ui.elem(document).on('keydown', function (event) {
			var target = event.target,
				nodeName = target.nodeName,
				rinput = /^INPUT|TEXTAREA$/,
				keyCode = event.keyCode;

			if ( rinput.test(nodeName) ) return;
			if (keyCode === 27) {
				_close2();
			} else if (keyCode == 13 && _enableEnter) {
				_close();
				_enableEnter = false;
			}
		});

	}

	function getContentNode(name, attr) {
		attr = attr || {};
		H.extend(attr, {'class': 'bd'});
		switch (name) {
			case 'DIV':
				node = H.ui._node(name, attr);
				break;
			case 'IFRAME':
				var a = {
					frameBorder:'no',
					scrolling:'auto',
					marginwidth:'0',
					marginheight:'0'
				};
				H.extend(a, attr);
				node = H.ui._node(name, a);
				break;
			case 'FORM':
				var a = {
					method:'POST'
				};
				node = H.ui._node(name, a);
				break;
		}
		return node;
	}

	function setTitle(title) {
		dlg.childNodes[0].childNodes[0].innerHTML = title;
	}

	function setContent(content) {
		H.ui.elem(dlg.childNodes[1]).html(content);
	}

	function changeDlgNodeName(name) {
		name = name || 'div';
		name = name.toUpperCase();
		if (dlg.childNodes[1].tagName != name) {
			if( dlg.childNodes[1].tagName == 'div'){
				dlg.replaceChild(getContentNode(name,{'class':'bd'}), dlg.childNodes[1]);
			}else{
				dlg.replaceChild(getContentNode(name), dlg.childNodes[1]);
			}
		}
	}

	function enableOkBtn(){
		dlg.childNodes[2].style.display = '';
		dlg.childNodes[2].childNodes[0].style.display = '';
	}

	function enableCancelBtn(){
		dlg.childNodes[2].style.display = '';
		dlg.childNodes[2].childNodes[1].style.display = '';
	}

	function hideAllBtns(){
		dlg.childNodes[2].style.display = 'none';
		H.each(dlg.childNodes[2].getElementsByTagName('input'), function() {
			this.style.display = 'none';
		});
	}

	function show() {
		dlg.style.display = 'block';
		if (!_sized) {
			dlg.childNodes[1].style.height = 'auto';

			// 调整高度
			var height = 0;
			H.each(dlg.childNodes, function() {
				height += H.ui(this).height(true);
			});
			dlg.style.height = height + 'px';
		} else {
			_sized = false;
		}
		move();
		window.onresize = function(){
			move();
		}
	}

	function staymiddle(){
		// 总是显示在屏幕正中央
		window.onresize = function(){
			move();
		}
		H.ui(window).on('scroll',function(){
			move();
		});
	}

	function move() {
		var w,h;
		if(window.top==window.self){
			w = $(window).width();
			h = $(window).height();
		}else{
			try{
				if(window.parent.hapj.ui('.dialog').length>0){
					w = $(window.parent).width();
					h = $(window.parent).height();
				}
			} catch (error) {
				w = $(window).width();
				h = $(window).height();
			}
		}
		var os = _d.offset(),
			left = (parseInt( os.left +  (w - _dlg.width(true))/2)),
			top = (parseInt(os.top + (h - _dlg.height(true))/2));
		left += _pl;
		top += _pt;
		// 显示到屏幕正中央
		dlg.style.left = left + 'px';
		dlg.style.top = top + 'px';
	}

	function resizeBody() {
		dlg.childNodes[1].style.width = '100%';
		dlg.childNodes[1].style.height = (H.ui.elem(dlg).height(false) - H.ui.elem(dlg.childNodes[0]).height() - H.ui.elem(dlg.childNodes[2]).height()) + 'px';
	}

	function hide(hideMask,btn) {
		if (dlg) {
			dlg.style.display = 'none';
            var state = true;
			if(btn == 'ok') {
				if (typeof _cb == 'function') {
					state = _cb.call();
				}
			}else if(btn == 'cancel') {
				if (typeof _cbCancel == 'function') {
					state = _cbCancel.call();
				}
			}

            if( state === false ) {
				dlg.style.display = 'block';
                return false;
            }
            _cb = null;
            _cbCancel = null;
		}

		if (hideMask && _mask && _mask.style.display != 'none') {
			if(dlg && dlg.style.display == 'block'){
				_mask.style.display = 'block';
			}else{
				_mask.style.display = 'none';
			}

			// 显示select控件
			if (isIE6) {
				H.ui.tag('select').each(function(){
					if (!this.getAttribute('ignoreHidden')) {
						this.style.visibility = 'visible';
					}
				});
			}
		}
		if (_lastFocus != null) {
			setTimeout(function(){
				_lastFocus.focus();
				_lastFocus = null;
			}, 0);
		}
		return false;
	}

	function registCallback(callback) {
		if (undefined === callback) {
			_cb = null;
		}
		switch(typeof callback) {
			case 'string':
				_cb = function(){
					window.location = callback;
					_cb = null;
				};
				break;
			case 'function':
				_cb = function(){
					return callback.call();
					//_cb = null;
				}
				break;
		}
	}

	function addDlgCls(cls){
		if(cls){
			if(dlg.className.indexOf(cls)==-1){
				dlg.className+=' '+cls;
			}
		}else{
			dlg.className = 'dialog';
		}
	}

	// 拖拽事件
	var _dragEvent, _drag,
		_window = H.ui.elem(window),
		_document = H.ui.elem(document);

	var dragEvent = function () {
		var that = this,
			proxy = function (name) {
				var fn = that[name];
				that[name] = function () {
					return fn.apply(that, arguments);
				};
			};
		proxy('start');
		proxy('move');
		proxy('end');
	};

	dragEvent.prototype = {
		// 开始拖拽
		start: function (event) {
			_document
				.on('mousemove', this.move)
				.on('mouseup', this.end);
			this._sClientX = event.clientX;
			this._sClientY = event.clientY;
			this.onstart(event.clientX, event.clientY);
			return false;
		},
		// 正在拖拽
		move: function (event) {
			this._mClientX = event.clientX;
			this._mClientY = event.clientY;
			this.onmove(
				event.clientX - this._sClientX,
				event.clientY - this._sClientY
			);
			return false;
		},
		// 结束拖拽
		end: function (event) {
			_document
				.un('mousemove', this.move)
				.un('mouseup', this.end);
			return false;
		}

	};
	_drag = function (event) {
		var limit, startWidth, startHeight, startLeft, startTop,
			wrap = H.ui.elem(event.target),
			offset = wrap.offset();
		// 对话框准备拖动
		_dragEvent.onstart = function (x, y) {
			startLeft = offset.left;
			startTop = offset.top;
		};

		// 对话框拖动进行中
		_dragEvent.onmove = function (x, y) {
			var style = dlg.style,
				left = Math.max(limit.minX, Math.min(limit.maxX, x + startLeft)),
				top = Math.max(limit.minY, Math.min(limit.maxY, y + startTop));

			style.left = left  + 'px';
			style.top = top + 'px';
		};

		limit = (function () {
			var maxX, maxY,
				ow = wrap.parent().width(),
				oh = wrap.parent().height(),
				ww = _window.width(),
				wh = _window.height();
			dl = _document.offset().left,
				dt = _document.offset().top;
			// 坐标最大值限制
			maxX = ww - ow + dl;
			maxY = wh - oh + dt;
			return {
				minX: dl,
				minY: dt,
				maxX: maxX,
				maxY: maxY
			};
		})();
		_dragEvent.start(event);
	};

	me = {
		offset: function(left, top) {
			_pl = left;
			_pt = top;
			return me;
		},
		/**
		 * 设置标题
		 * @param {Object} title
		 */
		title:function(title){
			if (!dlg) {
				return;
			}
			setTitle(title);
			return me;
		},
		/**
		 * 设置主体内容
		 * @param {Object} ctx
		 * @param {Function} callback
		 */
		content: function(ctx, callback ,runCallBack) {
			init(false);
			changeDlgNodeName('div');
			setContent(ctx);
			resizeBody();
			show();
			if(runCallBack){
				callback.call();
			}else{
				registCallback(callback);
				H.ui.dialog.callback();
			}
			return me;
		},
		/**
		 * 设置对话框的大小
		 * @param {Object} w
		 * @param {Object} h
		 */
		size: function(w, h) {
			//如果是传的rem则转换成px
			if ((typeof w == 'string') && (typeof h == 'string') ){
				if(/rem/.test(w) && /rem/.test(h)) {
					var bw = document.body.offsetWidth;
					if (document.getElementsByClassName('hf-mobile-750').length) {
						w =  bw/ 15 * (parseInt(w));
						h = bw / 15 * (parseInt(h));
					} else if (document.getElementsByClassName('hf-mobile').length) {
						w = bw / 16 * (parseInt(w));
						h = bw / 16 * (parseInt(h));
					}
				}
			}
			_sized = true;
			init();
			dlg.childNodes[0].style.width = dlg.childNodes[2].style.width = w + 'px';
			dlg.childNodes[1].style.width = parseInt(w) + 'px';
			dlg.childNodes[0].childNodes[0].style.width = parseInt(w-40)+'px';
			dlg.style.height = h + 'px';
			dlg.style.width = w + 'px';
			move();
			return me;
		},
		/**
		 * 显示OK对话框
		 * @param {Object} msg
		 * @param {Object} callback
		 */
		ok:function(msg, callback, resize){
			_enableEnter = true;
			init();
			if ( (undefined === resize || resize) && !_sized ) {
				if(hapj.browser.mobile){
					me.size(280, 216);
				}else{
					me.size(340, 216);
				}
			}
			changeDlgNodeName('div');
			setContent('<span class="ok">' + msg + '</span>');
			enableOkBtn();
			show();

			registCallback(callback);
			me.mask();
			me.middle();
			me.title('提示');
			return me;
		},
		/**
		 * 隐藏对话框
		 * @param {Boolean} hideMask 是否隐藏mask
		 */
		hide: function(hideMask) {
			if (undefined === hideMask) {
				hideMask = true;
			}
			hide(hideMask);
			return me;
		},
		/**
		 * 显示错误对话框
		 * @param {Object} msg
		 * @param {Object} callback
		 */
		error:function(msg, callback, resize){
			_enableEnter = true;
			init();
			if ((undefined === resize || resize) && !_sized ){
				if(hapj.browser.mobile){
					me.size(280, 216);
				}else{
					me.size(340, 216);
				}
			}
			changeDlgNodeName('div');
			setContent('<span class="err">' + msg + '</span>');
			enableOkBtn();
			show();

			registCallback(callback);
			me.mask();
			me.middle();
			me.title('提示');
			return me;
		},
		/**
		 * 显示框架对话框
		 * @param {Object} url
		 */
		iframe: function(url) {
			url = url ? url : '';
			if (!url) {
				H.log.error('hapj.lib.dialog url is not supplied');
			}
			init();
			changeDlgNodeName('iframe');
			show();
			resizeBody();
			dlg.childNodes[1].setAttribute('src', url);
			/**此处添加iframe的name便于测试部门测试使用**/
			dlg.childNodes[1].setAttribute('name', 'dlg_iframe');
			H.ui.dialog.callback();
			me.mask();
			return me;
		},
		/**
		 * 通过ajax获取一个页面，然后将内容填充到内容区
		 * @param {String} url
		 * @param {Function} onSuccess
		 * @param {Function} onClose
		 */
		ajax: function(url, onSuccess, onClose) {
			init();
			changeDlgNodeName('div');
			show();
			resizeBody();
			H.lib.ajax({
				url: url,
				type: 'get',
				dataType: 'html',
				success: function(html) {
					setContent(html);
					onSuccess && onSuccess();
				}
			});
			if (onClose) {
				registCallback(onClose);
			}
			H.ui.dialog.mask();
			H.ui.dialog.callback();
			return me;
		},
		mask: function(isclick) {
			if (!_mask) {
				_mask = H.ui._node('div');
				var css = {
					position:'fixed',
					left:0,
					top:0,
					zIndex:10004,
					width:'100%',
					height:'100%',
					backgroundColor: '#4c4c4c',
					opacity: 0.4,
					filter: 'Alpha(Opacity=40)'
				};
				if (isIE6) {
					H.extend(css, {
						position:'absolute',
						height:H.ui(document).height(true)
					});
					H.ui.tag('select').each(function(){
						if (this.style.visibility == 'hidden' || this.style.display == 'none') {
							this.setAttribute('ignoreHidden', 1);
						}
					});
				}
				H.ui(_mask).css(css);
				H.ui.on(_mask, 'click', function(e) {
					if(isclick){
						_maskClick = true;
						_close2();
					}
					e.stopPropagation();
					return false;
				});
				if(isclick){
					// 需要绑定点击隐藏dialog事件
					H.ui.on(_mask, 'click', _close2);
					_maskClick = true;
				}
				document.body.appendChild(_mask);
			}
			// 隐藏select控件
			if (isIE6) {
				H.ui.tag('select').each(function(){
					if (!this.getAttribute('ignoreHidden')) {
						this.style.visibility = 'hidden';
					}
				});
			}
			// 需要绑定点击隐藏dialog事件但是未绑定，则绑定
			if(isclick && _maskClick === false){
				H.ui.on(_mask, 'click', _close2);
				_maskClick=true;
			}
			// 不需要绑定点击隐藏dialog事件，但已经绑定了，则解除绑定
			if(isclick==undefined && _maskClick===true){
				H.ui.un(_mask,'click', _close2);
				_maskClick=false;
			}
			_mask.style.display = 'block';
			return me;
		},
		drag: function(){
			dlg.childNodes[0].childNodes[0].style.cursor = 'move';
			dlg.childNodes[0].childNodes[0].style.width = (parseInt(dlg.style.width)-40)+'px';
			H.ui.elem(dlg.childNodes[0].childNodes[0]).on('mousedown', function (event) {
				if(event.target.nodeName == 'A'){
					return;
				}
				_dragEvent = _dragEvent || new dragEvent();
				_drag(event);
				return false;
			});
		},
		middle: function(){
			staymiddle();
			return me;
		},
		callback: function(){
			if(!!arguments[0]){
				arguments[0].call(dlg);
			}
		},
		time:function(time){
			window.setTimeout(function(){
				hide(true);
			},time)
		},
		/**
		 * 显示确认和取消对话框
		 * @param {Object} msg 提示语
		 * @param {Object} okCallBack 点确定回调函数，不传入则表示不显示确定按钮
		 * @param {Object} cancelCallBack 点击取消的回调函数，不传入则表示不显示取消按钮
		 */
		confirm:function(msg, okCallBack, cancelCallBack){
			_enableEnter = true;
			init();
			changeDlgNodeName('div');
			setContent('<span class="ok">' + msg + '</span>');
			hideAllBtns();
			if(cancelCallBack != undefined){
				me.cancelBtn(cancelCallBack);
			}
			if(okCallBack != undefined){
				me.okBtn(okCallBack);
			}
			show();

			me.mask();
			me.title('提示');
			return me;
		},
		cancelBtn:function(callback){
			enableCancelBtn();
			if(typeof callback == 'function'){
				_cbCancel = function(){
					return callback.call();
				}
			}
			return me;
		},
		okBtn:function(callback){
			enableOkBtn();
			if(typeof callback == 'function'){
				_cb = function(){
					return callback.call();
				}
			}
			return me;
		},
		addCls:function(cls){
			addDlgCls(cls);
			resizeBody();
			return me;
		},
		skin:function(skin){
			// 皮肤的可选项 有添加的 在这个位置 注释一下，以便后来者使用
			// skins : skin1 ....
			addDlgCls(skin);
			resizeBody();
			return me;
		}
	};
	H.ui.dialog = me;
})(hapj);
