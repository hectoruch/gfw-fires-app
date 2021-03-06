define(['exports', 'components/Modals/ModalWrapper', 'stores/ModalStore', 'js/config', 'actions/ModalActions', 'utils/AppUtils', 'react'], function (exports, _ModalWrapper, _ModalStore, _config, _ModalActions, _AppUtils, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _ModalWrapper2 = _interopRequireDefault(_ModalWrapper);

  var _AppUtils2 = _interopRequireDefault(_AppUtils);

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

  var facebookSvg = '<use xlink:href="#icon-facebook" />';
  var twitterSvg = '<use xlink:href="#icon-twitter" />';
  var googleSvg = '<use xlink:href="#icon-googleplus" />';

  var windowOptions = 'toolbar=0,status=0,height=650,width=450';

  var ShareModal = function (_Component) {
    _inherits(ShareModal, _Component);

    function ShareModal(props) {
      _classCallCheck(this, ShareModal);

      var _this = _possibleConstructorReturn(this, (ShareModal.__proto__ || Object.getPrototypeOf(ShareModal)).call(this, props));

      _ModalStore.modalStore.listen(_this.storeUpdated.bind(_this));
      var defaultState = _ModalStore.modalStore.getState();
      _this.state = {
        bitlyUrl: defaultState.bitlyUrl,
        copyText: _config.modalText.share.copyButton,
        shareBy: defaultState.shareBy
      };
      return _this;
    }

    _createClass(ShareModal, [{
      key: 'storeUpdated',
      value: function storeUpdated() {
        var newState = _ModalStore.modalStore.getState();
        this.setState({
          bitlyUrl: newState.bitlyUrl,
          copyText: _config.modalText.share.copyButton,
          shareBy: newState.shareBy
        });
      }
    }, {
      key: 'copyShare',
      value: function copyShare() {
        var element = void 0;
        if (this.state.shareBy === 'embed') {
          element = this.refs.shareInputEmbed;
        } else {
          element = this.refs.shareInputLink;
        }
        if (_AppUtils2.default.copySelectionFrom(element)) {
          this.setState({ copyText: _config.modalText.share.copiedButton });
        } else {
          alert(_config.modalText.share.copyFailure);
        }
      }
    }, {
      key: 'shareGoogle',
      value: function shareGoogle() {
        var url = _config.modalText.share.googleUrl(this.state.bitlyUrl);
        window.open(url, 'Google Plus', windowOptions);
      }
    }, {
      key: 'shareFacebook',
      value: function shareFacebook() {
        var url = _config.modalText.share.facebookUrl(this.state.bitlyUrl);
        window.open(url, 'Facebook', windowOptions);
      }
    }, {
      key: 'shareTwitter',
      value: function shareTwitter() {
        var url = _config.modalText.share.twitterUrl(this.state.bitlyUrl);
        window.open(url, 'Twitter', windowOptions);
      }
    }, {
      key: 'handleFocus',
      value: function handleFocus(e) {
        setTimeout(function () {
          if (e.target) {
            e.target.select();
          }
        }, 0);
      }
    }, {
      key: 'switchEmbed',
      value: function switchEmbed() {
        _ModalActions.modalActions.switchEmbed();
      }
    }, {
      key: 'switchLink',
      value: function switchLink() {
        _ModalActions.modalActions.switchLink();
      }
    }, {
      key: 'render',
      value: function render() {
        var prefix = '<iframe width="600" height="600" frameborder="0" src="';
        var suffix = '"></iframe>';
        var iframeURL = prefix + this.state.bitlyUrl + suffix;
        return _react2.default.createElement(
          _ModalWrapper2.default,
          null,
          _react2.default.createElement(
            'div',
            { className: 'share-modal-title' },
            _config.modalText.share.title
          ),
          _react2.default.createElement(
            'div',
            { className: 'share-instructions' },
            _config.modalText.share.linkInstructions
          ),
          _react2.default.createElement(
            'div',
            { className: 'share-input' },
            _react2.default.createElement('input', { className: '' + (this.state.shareBy === 'link' ? 'hidden' : ''), ref: 'shareInputEmbed', type: 'text', readOnly: true, value: iframeURL, onClick: this.handleFocus }),
            _react2.default.createElement('input', { className: '' + (this.state.shareBy === 'embed' ? 'hidden' : ''), ref: 'shareInputLink', type: 'text', readOnly: true, value: this.state.bitlyUrl, onClick: this.handleFocus }),
            _react2.default.createElement(
              'button',
              { className: 'gfw-btn white pointer share-copy', onClick: this.copyShare.bind(this) },
              this.state.copyText
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'share-options' },
            _react2.default.createElement(
              'button',
              { className: 'gfw-btn white basemap-button pointer ' + (this.state.shareBy === 'link' ? 'active' : ''), onClick: this.switchLink.bind(this) },
              'LINK'
            ),
            _react2.default.createElement(
              'button',
              { className: 'gfw-btn white basemap-button pointer ' + (this.state.shareBy === 'embed' ? 'active' : ''), onClick: this.switchEmbed.bind(this) },
              'EMBED'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'share-items' },
            _react2.default.createElement(
              'ul',
              null,
              _react2.default.createElement(
                'li',
                { title: 'Google Plus', className: 'share-card googleplus-modal pointer', onClick: this.shareGoogle.bind(this) },
                _react2.default.createElement('svg', { dangerouslySetInnerHTML: { __html: googleSvg } })
              ),
              _react2.default.createElement(
                'li',
                { title: 'Twitter', className: 'share-card twitter-modal pointer', onClick: this.shareTwitter.bind(this) },
                _react2.default.createElement('svg', { dangerouslySetInnerHTML: { __html: twitterSvg } })
              ),
              _react2.default.createElement(
                'li',
                { title: 'Facebook', className: 'share-card facebook-modal pointer', onClick: this.shareFacebook.bind(this) },
                _react2.default.createElement('svg', { dangerouslySetInnerHTML: { __html: facebookSvg } })
              )
            )
          )
        );
      }
    }]);

    return ShareModal;
  }(_react.Component);

  exports.default = ShareModal;
});