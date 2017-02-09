define(['exports', 'actions/LayerActions', 'helpers/LayersHelper', 'actions/ModalActions', 'js/config', 'helpers/DateHelper', 'actions/MapActions', 'js/constants', 'react'], function (exports, _LayerActions, _LayersHelper, _ModalActions, _config, _DateHelper, _MapActions, _constants, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _LayersHelper2 = _interopRequireDefault(_LayersHelper);

  var _DateHelper2 = _interopRequireDefault(_DateHelper);

  var _constants2 = _interopRequireDefault(_constants);

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var firesOptions = _config.layerPanelText.firesOptions;

  var ViirsControls = function (_React$Component) {
    _inherits(ViirsControls, _React$Component);

    function ViirsControls() {
      _classCallCheck(this, ViirsControls);

      return _possibleConstructorReturn(this, (ViirsControls.__proto__ || Object.getPrototypeOf(ViirsControls)).apply(this, arguments));
    }

    _createClass(ViirsControls, [{
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (prevProps.viiirsSelectIndex !== this.props.viiirsSelectIndex) {
          _LayersHelper2.default.updateViirsDefinitions(this.props.viiirsSelectIndex);
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        // Set the default layer definition when the map has been loaded
        if (!this.props.loaded && nextProps.loaded) {
          _LayersHelper2.default.updateViirsDefinitions(nextProps.viiirsSelectIndex);
        }
      }
    }, {
      key: 'render',
      value: function render() {

        var activeItem = firesOptions[this.props.viiirsSelectIndex];

        var startDate = window.Kalendae.moment(this.props.archiveViirsStartDate);
        var endDate = window.Kalendae.moment(this.props.archiveViirsEndDate);

        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'timeline-container fires' },
            _react2.default.createElement(
              'select',
              { className: 'pointer', value: activeItem.value, onChange: this.changeViirsTimeline },
              firesOptions.map(this.optionsMap, this)
            ),
            _react2.default.createElement(
              'div',
              { className: 'active-fires-control gfw-btn sml white' },
              activeItem.label
            )
          ),
          _react2.default.createElement(
            'div',
            { id: 'viirs-archive-date-ranges' },
            _react2.default.createElement(
              'span',
              { className: 'imagery-calendar-label' },
              this.props.options.minLabel
            ),
            _react2.default.createElement(
              'button',
              { className: 'gfw-btn white pointer ' + (this.props.calendarVisible === 'archiveStart' ? ' current' : ''), onClick: this.changeStart.bind(this) },
              _DateHelper2.default.getDate(startDate)
            ),
            _react2.default.createElement(
              'span',
              { className: 'imagery-calendar-label' },
              this.props.options.maxLabel
            ),
            _react2.default.createElement(
              'button',
              { className: 'gfw-btn white pointer ' + (this.props.calendarVisible === 'archiveEnd' ? ' current' : ''), onClick: this.changeEnd.bind(this) },
              _DateHelper2.default.getDate(endDate)
            )
          )
        );
      }
    }, {
      key: 'toggleConfidence',
      value: function toggleConfidence(evt) {
        _LayersHelper2.default.toggleConfidence(evt.target.checked);
      }
    }, {
      key: 'optionsMap',
      value: function optionsMap(item, index) {
        return _react2.default.createElement(
          'option',
          { key: index, value: item.value },
          item.label
        );
      }
    }, {
      key: 'changeViirsTimeline',
      value: function changeViirsTimeline(evt) {
        _LayerActions.layerActions.changeViirsTimeline(evt.target.selectedIndex);
        _LayersHelper2.default.hideLayer(_constants2.default.viirsArchive);
        var layerObj = {};
        layerObj.layerId = _constants2.default.viirsFires;
        _LayersHelper2.default.showLayer(layerObj);
      }
    }, {
      key: 'changeStart',
      value: function changeStart() {
        _ModalActions.modalActions.showCalendarModal('start');
        _MapActions.mapActions.setCalendar('archiveViirsStart');
      }
    }, {
      key: 'changeEnd',
      value: function changeEnd() {
        _ModalActions.modalActions.showCalendarModal('end');
        _MapActions.mapActions.setCalendar('archiveViirsEnd');
      }
    }]);

    return ViirsControls;
  }(_react2.default.Component);

  exports.default = ViirsControls;
});