'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Names = function () {
    function Names(param) {
        _classCallCheck(this, Names);

        this.age = 24;
        this.name = "mq";
    }

    _createClass(Names, [{
        key: 'func',
        value: function func() {
            return '敲键盘';
        }
    }], [{
        key: 'hello',
        value: function hello(e) {
            return 'hello world ' + e;
        }
    }]);

    return Names;
}();

var Sesion = function (_Names) {
    _inherits(Sesion, _Names);

    function Sesion(strong, age) {
        _classCallCheck(this, Sesion);

        var _this = _possibleConstructorReturn(this, (Sesion.__proto__ || Object.getPrototypeOf(Sesion)).call(this));

        _this.body = strong;
        _this.age = age;
        return _this;
    }

    _createClass(Sesion, [{
        key: 'func',
        value: function func() {
            return '运动';
        }
    }]);

    return Sesion;
}(Names);

console.log(Names.hello('裙裙'));
var man = new Sesion(180, 26);
console.log(man);