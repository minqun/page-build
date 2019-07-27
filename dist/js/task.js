'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TableMove = function () {
    function TableMove(el, table) {
        var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        _classCallCheck(this, TableMove);

        this.name = 'table move support';
        this.tableHeight = table.clientHeight;
        this.tableWidth = table.clientWidth;
        this.table = table;
        this.targetIndex = 0;
        this.borderColor = option.borderColor || '#f2f2f2';
        this.minWidth = option.minWidth || 50;
        this.el = el;
        this.start = false;
        this.pageX = 0;
        this.pageY = 0;
        this.targetY = 0;
        this.targetX = 0;
        this.width = 0;
        this.height = 0;
        this.thDom = el;
        this.domLine = null;
        this.dom = null;
        this.topLock = false;
        this.targetTh = null;
        this.domStyle = 'position:absolute; width: 2px; background:transparent;z-index: 2;cursor:e-resize;height:100%;top:0px;right:-1px;';
    }

    _createClass(TableMove, [{
        key: 'init',
        value: function init() {
            for (var i in this.el) {
                if (_typeof(this.el[i]) == 'object') {
                    this.el[i].setAttribute('index', i);
                    this.el[i].style.position = "relative";
                    this.addNode(this.el[i], i);
                    this.listen(this.dom[i]);
                }
            }
        }
    }, {
        key: 'nowClick',
        value: function nowClick(e) {
            this.tableHeight = this.table.clientHeight;
            this.tableWidth = this.table.clientWidth;
            e.stopPropagation();
            e.preventDefault();
            this.targetIndex = e.target.tIndex;
            this.targetTh = this.thDom[this.targetIndex];
            var event = this.targetTh;
            this.start = true;
            this.width = event.offsetWidth;
            this.height = event.offsetHeight;
            this.topLock = true;
            this.addLine();
        }
    }, {
        key: 'getTHlength',
        value: function getTHlength(el) {
            return this.pageX - el.getBoundingClientRect().x > this.minWidth ? this.pageX - el.getBoundingClientRect().x : this.minWidth;
        }
    }, {
        key: 'getLocal',
        value: function getLocal(event) {
            this.pageX = event.pageX;
            this.pageY = event.pageY;
            this.targetX = this.table.getBoundingClientRect().x;
            this.targetY = this.table.getBoundingClientRect().y;
            this.eventX = event.pageX - this.targetX;
            if (!this.topLock) {
                this.eventY = event.pageY - event.offsetY;
            }
        }
    }, {
        key: 'addLine',
        value: function addLine() {
            var dom = document.createElement('div');
            dom.className = "dom-th-line";
            dom.style = this.domStyle + 'height:100%;top:' + 0 + 'px;left:' + 0 + 'px;width: 0px;';
            this.table.parentNode.insertBefore(dom, this.table);
            this.table.parentNode.style.position = "relative";
            this.domLine = document.querySelector('.dom-th-line');
        }
    }, {
        key: 'addNode',
        value: function addNode(event, i) {
            console.log(event);
            var dom = document.createElement('div');
            dom.className = "dom-th";
            dom.tIndex = i;
            dom.style = this.domStyle + 'height:100%;top:' + 0 + 'px;right:' + 0 + 'px;';
            event.appendChild(dom);
            this.dom = document.querySelectorAll('.dom-th');
        }
    }, {
        key: 'move',
        value: function move(event) {
            if (this.start && event) {
                this.getLocal(event);
                if (this.domLine) {
                    this.domLine.style = this.domStyle + 'height:' + this.tableHeight + 'px;top:' + 0 + 'px;left:' + (this.eventX > this.minWidth ? this.eventX : this.minWidth) + 'px;width: 1xp;background:' + this.borderColor + ';';
                }
            }
        }
    }, {
        key: 'leave',
        value: function leave() {
            if (this.start) {
                this.start = false;
                if (this.domLine) {
                    this.table.parentNode.removeChild(this.domLine);
                    this.domLine = null;
                }
            }
        }
    }, {
        key: 'up',
        value: function up(event) {
            if (this.start) {
                this.start = false;
                this.thDom[this.targetIndex].style = 'width:' + this.getTHlength(this.thDom[this.targetIndex]) + 'px';
                if (this.domLine) {
                    this.table.parentNode.removeChild(this.domLine);
                    this.domLine = null;
                }
            }
        }
    }, {
        key: 'listen',
        value: function listen(el) {
            var _this = this;

            el.addEventListener('mousedown', function (event) {
                _this.nowClick(event);
            }, false);

            el.addEventListener('mouseup', function (event) {
                _this.up();
            }, false);
            this.table.parentNode.addEventListener('mousemove', function (event) {
                _this.move(event);
            }, false);
            this.table.parentNode.addEventListener('mouseleave', function (event) {
                _this.leave();
            }, false);

            this.table.parentNode.addEventListener('mouseup', function (event) {
                _this.up();
            }, false);
        }
    }]);

    return TableMove;
}();

var tables = new TableMove(document.querySelectorAll('th'), document.querySelector('.table'), {
    borderColor: "green",
    minWidth: 60
});
tables.init();
//# sourceMappingURL=../maps/task.js.map
