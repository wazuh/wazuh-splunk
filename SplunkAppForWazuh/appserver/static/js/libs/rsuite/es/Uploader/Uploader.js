import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import compose from 'recompose/compose';
import IntlProvider from '../IntlProvider';
import withLocale from '../IntlProvider/withLocale';
import FileItem from './UploadFileItem';
import UploadTrigger from './UploadTrigger';
import { prefix, ajaxUpload, defaultProps, getUnhandledProps } from '../utils';
import { getFiles, guid } from './utils';

var Uploader =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Uploader, _React$Component);

  function Uploader(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.inputRef = void 0;

    _this.handleRemoveFile = function (fileKey) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          onRemove = _this$props.onRemove;

      var fileList = _this.getFileList();

      var file = _.find(fileList, function (f) {
        return f.fileKey === fileKey;
      });

      var nextFileList = fileList.filter(function (f) {
        return f.fileKey !== fileKey;
      });

      if (_this.xhrs[file.fileKey] && _this.xhrs[file.fileKey].readyState !== 4) {
        _this.xhrs[file.fileKey].abort();
      }

      _this.setState({
        fileList: nextFileList
      });

      onRemove && onRemove(file);
      onChange && onChange(nextFileList);
    };

    _this.handleUploadTriggerChange = function (event) {
      var _this$props2 = _this.props,
          autoUpload = _this$props2.autoUpload,
          shouldQueueUpdate = _this$props2.shouldQueueUpdate,
          onChange = _this$props2.onChange;

      var fileList = _this.getFileList();

      var files = getFiles(event);
      var newFileList = [];
      Array.from(files).forEach(function (file) {
        newFileList.push({
          blobFile: file,
          name: file.name,
          status: 'inited',
          fileKey: guid()
        });
      });
      var nextFileList = [].concat(fileList, newFileList);

      if (shouldQueueUpdate && shouldQueueUpdate(nextFileList, newFileList) === false) {
        _this.cleanInputValue();

        return;
      }

      onChange && onChange(nextFileList);

      _this.setState({
        fileList: nextFileList
      }, function () {
        autoUpload && _this.handleAjaxUpload();
      });
    };

    _this.handleAjaxUploadSuccess = function (file, response, event) {
      var onSuccess = _this.props.onSuccess;

      var nextFile = _extends({}, file, {
        status: 'finished',
        progress: 100
      });

      _this.updateFileList(nextFile, function () {
        onSuccess && onSuccess(response, nextFile, event);
      });
    };

    _this.handleAjaxUploadError = function (file, status, event) {
      var onError = _this.props.onError;

      var nextFile = _extends({}, file, {
        status: 'error'
      });

      _this.updateFileList(nextFile, function () {
        onError && onError(status, nextFile, event);
      });
    };

    _this.handleAjaxUploadProgress = function (file, percent, event) {
      var onProgress = _this.props.onProgress;

      var nextFile = _extends({}, file, {
        status: 'uploading',
        progress: percent
      });

      _this.updateFileList(nextFile, function () {
        onProgress && onProgress(percent, nextFile, event);
      });
    };

    _this.handleUploadFile = function (file) {
      var _this$props3 = _this.props,
          name = _this$props3.name,
          action = _this$props3.action,
          headers = _this$props3.headers,
          withCredentials = _this$props3.withCredentials,
          timeout = _this$props3.timeout,
          data = _this$props3.data,
          onUpload = _this$props3.onUpload;
      var xhr = ajaxUpload({
        name: name,
        timeout: timeout,
        headers: headers,
        data: data,
        withCredentials: withCredentials,
        file: file.blobFile,
        url: action,
        onError: _this.handleAjaxUploadError.bind(_assertThisInitialized(_this), file),
        onSuccess: _this.handleAjaxUploadSuccess.bind(_assertThisInitialized(_this), file),
        onProgress: _this.handleAjaxUploadProgress.bind(_assertThisInitialized(_this), file)
      });

      _this.updateFileList(_extends({}, file, {
        status: 'uploading'
      }));

      _this.xhrs[file.fileKey] = xhr;
      onUpload && onUpload(file);
    };

    _this.handleReupload = function (file) {
      var _this$props4 = _this.props,
          onReupload = _this$props4.onReupload,
          autoUpload = _this$props4.autoUpload;
      autoUpload && _this.handleUploadFile(file);
      onReupload && onReupload(file);
    };

    _this.createFile = function (file) {
      var fileKey = file.fileKey;
      return _extends({}, file, {
        fileKey: fileKey || guid(),
        progress: 0
      });
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.progressTimer = void 0;
    _this.xhrs = {};
    _this.uploadTrigger = null;
    var _props$defaultFileLis = props.defaultFileList,
        defaultFileList = _props$defaultFileLis === void 0 ? [] : _props$defaultFileLis;

    var _fileList = defaultFileList.map(_this.createFile);

    _this.state = {
      fileList: _fileList,
      fileMap: {}
    };
    _this.inputRef = React.createRef();
    return _this;
  } // public API


  var _proto = Uploader.prototype;

  _proto.start = function start(file) {
    if (file) {
      this.handleUploadFile(file);
      return;
    }

    this.handleAjaxUpload();
  };

  _proto.getFileList = function getFileList() {
    var fileList = this.props.fileList;
    var fileMap = this.state.fileMap;

    if (typeof fileList !== 'undefined') {
      return fileList.map(function (file) {
        return _extends({}, file, {}, fileMap[file.fileKey]);
      });
    }

    return this.state.fileList;
  };

  _proto.cleanInputValue = function cleanInputValue() {
    if (this.inputRef.current) {
      this.inputRef.current.getInputInstance().value = '';
    }
  };

  _proto.handleAjaxUpload = function handleAjaxUpload() {
    var _this2 = this;

    var shouldUpload = this.props.shouldUpload;
    var fileList = this.getFileList();
    fileList.forEach(function (file) {
      if (shouldUpload && shouldUpload(file) === false) {
        return;
      }

      if (file.status === 'inited') {
        _this2.handleUploadFile(file);
      }
    });
    this.cleanInputValue();
  };

  _proto.updateFileList = function updateFileList(nextFile, callback) {
    var fileList = this.getFileList();
    var nextFileList = fileList.map(function (file) {
      return file.fileKey === nextFile.fileKey ? nextFile : file;
    });
    var nextState = {
      fileList: nextFileList
    };

    if (nextFile.progress) {
      var fileMap = this.state.fileMap;
      fileMap[nextFile.fileKey] = {
        progress: nextFile.progress,
        status: nextFile.status
      };
      nextState.fileMap = fileMap;
    }

    this.setState(nextState, callback);
  };

  _proto.renderFileItems = function renderFileItems() {
    var _this3 = this;

    var _this$props5 = this.props,
        disabledFileItem = _this$props5.disabledFileItem,
        listType = _this$props5.listType,
        onPreview = _this$props5.onPreview,
        maxPreviewFileSize = _this$props5.maxPreviewFileSize,
        renderFileInfo = _this$props5.renderFileInfo,
        removable = _this$props5.removable;
    var fileList = this.getFileList();
    return React.createElement("div", {
      key: "items",
      className: this.addPrefix('file-items')
    }, fileList.map(function (file, index) {
      return React.createElement(FileItem, {
        key: file.fileKey || index,
        file: file,
        maxPreviewFileSize: maxPreviewFileSize,
        listType: listType,
        disabled: disabledFileItem,
        onPreview: onPreview,
        onReupload: _this3.handleReupload,
        onCancel: _this3.handleRemoveFile,
        renderFileInfo: renderFileInfo,
        removable: removable
      });
    }));
  };

  _proto.renderUploadTrigger = function renderUploadTrigger() {
    var _this$props6 = this.props,
        name = _this$props6.name,
        multiple = _this$props6.multiple,
        disabled = _this$props6.disabled,
        accept = _this$props6.accept,
        children = _this$props6.children,
        toggleComponentClass = _this$props6.toggleComponentClass,
        rest = _objectWithoutPropertiesLoose(_this$props6, ["name", "multiple", "disabled", "accept", "children", "toggleComponentClass"]);

    var unhandled = getUnhandledProps(Uploader, rest);
    return React.createElement(UploadTrigger, _extends({}, unhandled, {
      name: name,
      key: "trigger",
      multiple: multiple,
      disabled: disabled,
      accept: accept,
      ref: this.inputRef,
      onChange: this.handleUploadTriggerChange,
      componentClass: toggleComponentClass
    }), children);
  };

  _proto.render = function render() {
    var _this$props7 = this.props,
        classPrefix = _this$props7.classPrefix,
        className = _this$props7.className,
        listType = _this$props7.listType,
        locale = _this$props7.locale,
        style = _this$props7.style;
    var classes = classNames(classPrefix, this.addPrefix(listType), className);
    var renderList = [this.renderUploadTrigger(), this.renderFileItems()];

    if (listType === 'picture') {
      renderList.reverse();
    }

    return React.createElement(IntlProvider, {
      locale: locale
    }, React.createElement("div", {
      className: classes,
      style: style
    }, renderList));
  };

  return Uploader;
}(React.Component);

Uploader.propTypes = {
  action: PropTypes.string,
  accept: PropTypes.string,
  autoUpload: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  defaultFileList: PropTypes.array,
  fileList: PropTypes.array,
  data: PropTypes.object,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledFileItem: PropTypes.bool,
  name: PropTypes.string,
  timeout: PropTypes.number,
  withCredentials: PropTypes.bool,
  headers: PropTypes.object,
  locale: PropTypes.object,
  listType: PropTypes.oneOf(['text', 'picture-text', 'picture']),
  shouldQueueUpdate: PropTypes.func,
  shouldUpload: PropTypes.func,
  onChange: PropTypes.func,
  onUpload: PropTypes.func,
  onReupload: PropTypes.func,
  onPreview: PropTypes.func,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
  onProgress: PropTypes.func,
  onRemove: PropTypes.func,
  maxPreviewFileSize: PropTypes.number,
  style: PropTypes.object,
  toggleComponentClass: PropTypes.elementType,
  renderFileInfo: PropTypes.func,
  removable: PropTypes.bool
};
Uploader.defaultProps = {
  autoUpload: true,
  timeout: 0,
  name: 'file',
  multiple: false,
  disabled: false,
  withCredentials: false,
  data: {},
  listType: 'text',
  removable: true
};
export default compose(withLocale(['Uploader']), defaultProps({
  classPrefix: 'uploader'
}))(Uploader);