'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TableMove = function () {
    function TableMove(el) {
        _classCallCheck(this, TableMove);

        console.log(el);
        this.name = 'table move support';
        this.tableHeight = 0;
        this.tableWidth = 0;
        this.el = el;
        this.start = false;
        this.pageX = 0;
        this.pageY = 0;
        this.targetY = 0;
        this.targetX = 0;
        this.width = 0;
        this.height = 0;
        this.dom = null;
        this.topLock = false;
        this.domStyle = 'position:absolute; width: 1px; background:red;z-index: 2;';
    }

    _createClass(TableMove, [{
        key: 'getTable',
        value: function getTable(event) {
            var target = event.target;
            while (target.nodeName != 'TABLE') {
                target = target.parentNode;
            }
            this.tableHeight = target.clientHeight;
            this.tableWidth = target.clientWidth;
        }
    }, {
        key: 'init',
        value: function init() {
            for (var i in this.el) {
                if (_typeof(this.el[i]) == 'object') {
                    this.listen(this.el[i]);
                }
            }
        }
    }, {
        key: 'nowClick',
        value: function nowClick(event) {
            this.start = true;
            this.width = event.target.offsetWidth;
            this.height = event.target.offsetHeight;
            this.getLocal(event);
            this.getTable(event);
            this.topLock = true;
            console.log('w:', this.width, 'h:', this.height);
            console.log('px:', this.pageX, 'py:', this.pageY);
            console.log('tx:', this.targetX, 'ty:', this.targetY);
            this.addNode(event);
        }
    }, {
        key: 'getLocal',
        value: function getLocal(event) {
            this.pageX = event.pageX;
            this.pageY = event.pageY;
            this.targetX = event.offsetX;
            this.targetY = event.offsetY;
            this.eventX = event.pageX - event.offsetX;
            if (!this.topLock) {
                this.eventY = event.pageY - event.offsetY;
            }
        }
    }, {
        key: 'addNode',
        value: function addNode(event) {
            console.log(event);
            var dom = document.createElement('div');
            dom.className = "dom-th";
            event.target.appendChild(dom);
            this.dom = document.querySelector('.dom-th');
            this.dom.style = 'height:' + this.tableHeight + 'px;' + this.domStyle + 'top:' + this.eventY + 'px;left:' + this.pageX + 'px;';
        }
    }, {
        key: 'move',
        value: function move(event) {
            if (this.start) {
                this.getLocal(event);
                // console.log('w:',this.width, 'h:', this.height)
                // console.log('px:',this.pageX, 'py:', this.pageY)
                // console.log('tx:',this.targetX, 'ty:', this.targetY)
                this.dom.style = 'height:' + this.tableHeight + 'px;' + this.domStyle + 'top:' + this.eventY + 'px;left:' + this.pageX + 'px;';
            }
        }
    }, {
        key: 'up',
        value: function up() {
            if (this.start) {
                this.start = false;
                console.log('leave', event);
                if (this.dom == null) return;
                var target = event.target;
                while (target.nodeName != 'TH') {
                    target = target.parentNode;
                }
                console.log(target, 'target');
                target.removeChild(this.dom);
                this.dom = null;
            }
        }
    }, {
        key: 'listen',
        value: function listen(el) {
            var _this = this;

            el.addEventListener('mousedown', function (event) {
                _this.nowClick(event);
            }, false);
            el.addEventListener('mousemove', function (event) {
                _this.move(event);
            }, false);
            el.addEventListener('mouseup', function (event) {
                _this.up();
            }, false);
            el.addEventListener('mouseleave', function (event) {
                _this.up();
            }, false);
        }
    }]);

    return TableMove;
}();

var tables = new TableMove(document.querySelectorAll('th'));
tables.init();
//# sourceMappingURL=../maps/task.js.map
