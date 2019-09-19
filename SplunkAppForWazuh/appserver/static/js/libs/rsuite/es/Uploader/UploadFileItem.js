import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import FormattedMessage from '../IntlProvider/FormattedMessage';
import { previewFile, defaultProps, getUnhandledProps, prefix } from '../utils';

var getSize = function getSize(size) {
  if (size === void 0) {
    size = 0;
  }

  var K = 1024;
  var M = 1024 * 1024;
  var G = 1024 * 1024 * 1024;

  if (size > G) {
    return (size / G).toFixed(2) + "GB";
  }

  if (size > M) {
    return (size / M).toFixed(2) + "MB";
  }

  if (size > K) {
    return (size / K).toFixed(2) + "KB";
  }

  return size + "B";
};

var UploadFileItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(UploadFileItem, _React$Component);

  function UploadFileItem(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleRemove = function (event) {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          onCancel = _this$props.onCancel,
          file = _this$props.file;

      if (disabled) {
        return;
      }

      onCancel && onCancel(file.fileKey, event);
    };

    _this.handlePreview = function (event) {
      var _this$props2 = _this.props,
          disabled = _this$props2.disabled,
          onPreview = _this$props2.onPreview,
          file = _this$props2.file;

      if (disabled) {
        return;
      }

      onPreview && onPreview(file, event);
    };

    _this.handleReupload = function (event) {
      var _this$props3 = _this.props,
          disabled = _this$props3.disabled,
          onReupload = _this$props3.onReupload,
          file = _this$props3.file;

      if (disabled) {
        return;
      }

      onReupload && onReupload(file, event);
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    var _file = props.file;
    _this.state = {
      previewImage: _file.url ? _file.url : null
    };

    if (!_file.url) {
      _this.getThumbnail(function (previewImage) {
        _this.setState({
          previewImage: previewImage
        });
      });
    }

    return _this;
  }

  var _proto = UploadFileItem.prototype;

  _proto.getThumbnail = function getThumbnail(callback) {
    var _this$props4 = this.props,
        file = _this$props4.file,
        listType = _this$props4.listType,
        maxPreviewFileSize = _this$props4.maxPreviewFileSize;

    if (!~['picture-text', 'picture'].indexOf(listType)) {
      return;
    }

    if (!file.blobFile || _.get(file, 'blobFile.size') > maxPreviewFileSize) {
      return;
    }

    previewFile(file.blobFile, callback);
  };

  _proto.renderProgressBar = function renderProgressBar() {
    var _this$props5 = this.props,
        disabled = _this$props5.disabled,
        file = _this$props5.file;
    var _file$progress = file.progress,
        progress = _file$progress === void 0 ? 0 : _file$progress,
        status = file.status;
    var show = !disabled && status === 'uploading';
    var visibility = show ? 'visible' : 'hidden';
    var wrapStyle = {
      visibility: visibility
    };
    var progressbarStyle = {
      width: progress + "%"
    };
    return React.createElement("div", {
      className: this.addPrefix('progress'),
      style: wrapStyle
    }, React.createElement("div", {
      className: this.addPrefix('progress-bar'),
      style: progressbarStyle
    }));
  };

  _proto.renderPreview = function renderPreview() {
    var previewImage = this.state.previewImage;
    var file = this.props.file;

    if (previewImage) {
      return React.createElement("div", {
        className: this.addPrefix('preview')
      }, React.createElement("img", {
        role: "presentation",
        src: previewImage,
        alt: file.name,
        onClick: this.handlePreview
      }));
    }

    return null;
  };

  _proto.renderLoading = function renderLoading() {
    var _classNames;

    var file = this.props.file;
    var uploading = file.status === 'uploading';
    var classes = classNames(this.addPrefix('icon-wrapper'), (_classNames = {}, _classNames[this.addPrefix('icon-loading')] = uploading, _classNames));
    return React.createElement("div", {
      className: classes
    }, React.createElement("i", {
      className: this.addPrefix('icon')
    }));
  };

  _proto.renderRemoveButton = function renderRemoveButton() {
    var removable = this.props.removable;

    if (!removable) {
      return null;
    }

    return React.createElement("a", {
      "aria-label": "Remove",
      className: this.addPrefix('btn-remove'),
      onClick: this.handleRemove,
      role: "button",
      tabIndex: -1
    }, React.createElement("span", {
      "aria-hidden": "true"
    }, "\xD7"));
  };

  _proto.renderErrorStatus = function renderErrorStatus() {
    var file = this.props.file;

    if (file.status === 'error') {
      return React.createElement("div", {
        className: this.addPrefix('status')
      }, React.createElement(FormattedMessage, {
        id: "error"
      }), React.createElement("a", {
        role: "button",
        tabIndex: -1,
        onClick: this.handleReupload
      }, React.createElement("i", {
        className: this.addPrefix('icon-reupload')
      })));
    }

    return null;
  };

  _proto.renderFileSize = function renderFileSize() {
    var file = this.props.file;

    if (file.status !== 'error' && file.blobFile) {
      return React.createElement("span", {
        className: this.addPrefix('size')
      }, getSize(_.get(file, 'blobFile.size')));
    }

    return null;
  };

  _proto.renderFilePanel = function renderFilePanel() {
    var _this$props6 = this.props,
        file = _this$props6.file,
        renderFileInfo = _this$props6.renderFileInfo;
    var fileElement = React.createElement("a", {
      role: "presentation",
      className: this.addPrefix('title'),
      onClick: this.handlePreview
    }, file.name);
    return React.createElement("div", {
      className: this.addPrefix('panel')
    }, React.createElement("div", {
      className: this.addPrefix('content')
    }, renderFileInfo ? renderFileInfo(file, fileElement) : fileElement, this.renderErrorStatus(), this.renderFileSize()));
  };

  _proto.render = function render() {
    var _classNames2;

    var _this$props7 = this.props,
        disabled = _this$props7.disabled,
        file = _this$props7.file,
        classPrefix = _this$props7.classPrefix,
        listType = _this$props7.listType,
        className = _this$props7.className,
        rest = _objectWithoutPropertiesLoose(_this$props7, ["disabled", "file", "classPrefix", "listType", "className"]);

    var classes = classNames(classPrefix, className, this.addPrefix(listType), (_classNames2 = {}, _classNames2[this.addPrefix('has-error')] = file.status === 'error', _classNames2[this.addPrefix('disabled')] = disabled, _classNames2));
    var unhandled = getUnhandledProps(UploadFileItem, rest);

    if (listType === 'picture') {
      return React.createElement("div", {
        className: classes
      }, this.renderLoading(), this.renderPreview(), this.renderErrorStatus(), this.renderRemoveButton());
    }

    if (listType === 'picture-text') {
      return React.createElement("div", {
        className: classes
      }, this.renderLoading(), this.renderPreview(), this.renderFilePanel(), this.renderProgressBar(), this.renderRemoveButton());
    }

    return React.createElement("div", _extends({}, unhandled, {
      className: classes
    }), this.renderLoading(), this.renderFilePanel(), this.renderProgressBar(), this.renderRemoveButton());
  };

  return UploadFileItem;
}(React.Component);

UploadFileItem.propTypes = {
  file: PropTypes.object,
  listType: PropTypes.oneOf(['text', 'picture-text', 'picture']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  maxPreviewFileSize: PropTypes.number,
  classPrefix: PropTypes.string,
  removable: PropTypes.bool,
  renderFileInfo: PropTypes.func,
  onCancel: PropTypes.func,
  onPreview: PropTypes.func,
  onReupload: PropTypes.func
};
UploadFileItem.defaultProps = {
  maxPreviewFileSize: 1024 * 1024 * 5,
  // 5MB
  listType: 'text',
  removable: true
};
export default defaultProps({
  classPrefix: 'uploader-file-item'
})(UploadFileItem);