function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import * as React from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { ConfigConsumer } from '../config-provider';
import RowContext from './RowContext';
import { tuple } from '../_util/type';
import ResponsiveObserve, { responsiveArray } from '../_util/responsiveObserve';
var RowAligns = tuple('top', 'middle', 'bottom');
var RowJustify = tuple('start', 'end', 'center', 'space-around', 'space-between');

var Row =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Row, _React$Component);

  function Row() {
    var _this;

    _classCallCheck(this, Row);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Row).apply(this, arguments));
    _this.state = {
      screens: {}
    };

    _this.renderRow = function (_ref) {
      var _classNames;

      var getPrefixCls = _ref.getPrefixCls;

      var _a = _this.props,
          customizePrefixCls = _a.prefixCls,
          type = _a.type,
          justify = _a.justify,
          align = _a.align,
          className = _a.className,
          style = _a.style,
          children = _a.children,
          others = __rest(_a, ["prefixCls", "type", "justify", "align", "className", "style", "children"]);

      var prefixCls = getPrefixCls('row', customizePrefixCls);

      var gutter = _this.getGutter();

      var classes = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls, !type), _defineProperty(_classNames, "".concat(prefixCls, "-").concat(type), type), _defineProperty(_classNames, "".concat(prefixCls, "-").concat(type, "-").concat(justify), type && justify), _defineProperty(_classNames, "".concat(prefixCls, "-").concat(type, "-").concat(align), type && align), _classNames), className);
      var rowStyle = gutter > 0 ? _extends({
        marginLeft: gutter / -2,
        marginRight: gutter / -2
      }, style) : style;

      var otherProps = _extends({}, others);

      delete otherProps.gutter;
      return React.createElement(RowContext.Provider, {
        value: {
          gutter: gutter
        }
      }, React.createElement("div", _extends({}, otherProps, {
        className: classes,
        style: rowStyle
      }), children));
    };

    return _this;
  }

  _createClass(Row, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.token = ResponsiveObserve.subscribe(function (screens) {
        if (_typeof(_this2.props.gutter) === 'object') {
          _this2.setState({
            screens: screens
          });
        }
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      ResponsiveObserve.unsubscribe(this.token);
    }
  }, {
    key: "getGutter",
    value: function getGutter() {
      var gutter = this.props.gutter;

      if (_typeof(gutter) === 'object') {
        for (var i = 0; i < responsiveArray.length; i++) {
          var breakpoint = responsiveArray[i];

          if (this.state.screens[breakpoint] && gutter[breakpoint] !== undefined) {
            return gutter[breakpoint];
          }
        }
      }

      return gutter;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(ConfigConsumer, null, this.renderRow);
    }
  }]);

  return Row;
}(React.Component);

export { Row as default };
Row.defaultProps = {
  gutter: 0
};
Row.propTypes = {
  type: PropTypes.oneOf(['flex']),
  align: PropTypes.oneOf(RowAligns),
  justify: PropTypes.oneOf(RowJustify),
  className: PropTypes.string,
  children: PropTypes.node,
  gutter: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  prefixCls: PropTypes.string
};
//# sourceMappingURL=row.js.map
