import _extends_1 from '../../../node_modules/@babel/runtime/helpers/extends.js';
import objectWithoutProperties from '../../../node_modules/@babel/runtime/helpers/objectWithoutProperties.js';
import defineProperty from '../../../node_modules/@babel/runtime/helpers/defineProperty.js';
import slicedToArray from '../../../node_modules/@babel/runtime/helpers/slicedToArray.js';
import _styled from 'styled-components';
import React, { useCallback, useState, useEffect, useContext, useRef } from 'react';
import propTypes from '../../../node_modules/prop-types/index.js';
import { animated as extendedAnimated, Transition } from '../../../node_modules/react-spring/web.js';
import { Inside as i } from '../../../node_modules/use-inside/dist/index.js';
import ButtonIcon from '../Button/ButtonIcon.js';
import { useViewport } from '../../providers/Viewport/Viewport.js';
import RootPortal from '../RootPortal/RootPortal.js';
import { useTheme } from '../../theme/Theme.js';
import IconCross from '../../icons/components/IconCross.js';
import { KEY_ESC } from '../../utils/keycodes.js';
import { springs } from '../../style/springs.js';
import { GU } from '../../style/constants.js';
import { unselectable } from '../../utils/css.js';
import { textStyle } from '../../style/text-styles.js';
import { warn } from '../../utils/environment.js';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var CONTENT_PADDING = 3 * GU; // The closing position of the panel, on the right side of the viewport.
// It takes into consideration the shadow of the panel.

var CLOSING_POSITION = 5 * GU;
var SidePanelContext = /*#__PURE__*/React.createContext(null);

var _StyledDiv = _styled("div").withConfig({
  displayName: "SidePanel___StyledDiv",
  componentId: "sc-1kjx6mk-0"
})(["position:absolute;z-index:1;top:0;left:0;right:0;bottom:0;pointer-events:", ";overflow:hidden;"], function (p) {
  return p._css;
});

var _StyledAnimatedDiv = _styled(extendedAnimated.div).withConfig({
  displayName: "SidePanel___StyledAnimatedDiv",
  componentId: "sc-1kjx6mk-1"
})(["position:absolute;top:0;left:0;right:0;bottom:0;background:", ";"], function (p) {
  return p._css2;
});

var _StyledHeader = _styled("header").withConfig({
  displayName: "SidePanel___StyledHeader",
  componentId: "sc-1kjx6mk-2"
})(["display:flex;flex-direction:column;justify-content:center;flex-shrink:0;position:relative;height:", "px;padding-left:", "px;border-bottom:1px solid ", ";", ";"], function (p) {
  return p._css3;
}, CONTENT_PADDING, function (p) {
  return p._css4;
}, function (p) {
  return p._css5;
});

var _StyledH = _styled("h1").withConfig({
  displayName: "SidePanel___StyledH",
  componentId: "sc-1kjx6mk-3"
})(["color:", ";", ";"], function (p) {
  return p._css6;
}, function (p) {
  return p._css7;
});

var _StyledButtonIcon = _styled(ButtonIcon).withConfig({
  displayName: "SidePanel___StyledButtonIcon",
  componentId: "sc-1kjx6mk-4"
})(["position:absolute;", ""], function (p) {
  return p._css8;
});

var _StyledDiv2 = _styled("div").withConfig({
  displayName: "SidePanel___StyledDiv2",
  componentId: "sc-1kjx6mk-5"
})(["overflow-y:auto;height:100%;display:flex;flex-direction:column;"]);

var _StyledDiv3 = _styled("div").withConfig({
  displayName: "SidePanel___StyledDiv3",
  componentId: "sc-1kjx6mk-6"
})(["min-height:0;flex-grow:1;flex-shrink:0;display:flex;flex-direction:column;width:100%;padding-right:", "px;padding-left:", "px;padding-bottom:", "px;"], CONTENT_PADDING, CONTENT_PADDING, CONTENT_PADDING);

function SidePanel(_ref2) {
  var blocking = _ref2.blocking,
      children = _ref2.children,
      opened = _ref2.opened,
      onClose = _ref2.onClose,
      onTransitionEnd = _ref2.onTransitionEnd,
      title = _ref2.title;
  var theme = useTheme();

  var _useViewport = useViewport(),
      below = _useViewport.below;

  var compact = below('medium');
  var close = useCallback(function () {
    if (!blocking) {
      onClose();
    }
  }, [blocking, onClose]);
  var handleEscape = useCallback(function (event) {
    if (event.keyCode === KEY_ESC && opened) {
      close();
    }
  }, [opened, close]);

  var _useState = useState(opened ? 'opened' : 'closed'),
      _useState2 = slicedToArray(_useState, 2),
      status = _useState2[0],
      setStatus = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = slicedToArray(_useState3, 2),
      readyToFocus = _useState4[0],
      setReadyToFocus = _useState4[1];

  var handleTransitionRest = useCallback(function () {
    onTransitionEnd(opened);
    setStatus(opened ? 'opened' : 'closed');
  }, [opened, onTransitionEnd]);
  var handleTransitionStart = useCallback(function () {
    setStatus(opened ? 'opening' : 'closing');
  }, [opened]);
  var handleTransitionFrame = useCallback(function (item, _, _ref3) {
    var progress = _ref3.progress;

    if (progress > 0.5 && !readyToFocus) {
      setReadyToFocus(true);
    } else if (progress < 0.5 && readyToFocus) {
      setReadyToFocus(false);
    }
  }, [readyToFocus]);
  var handleTransitionDestroyed = useCallback(function () {
    setReadyToFocus(false);
  }, []);
  useEffect(function () {
    document.addEventListener('keydown', handleEscape);
    return function () {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleEscape]);
  return /*#__PURE__*/React.createElement(RootPortal, null, /*#__PURE__*/React.createElement(i, {
    name: "SidePanel"
  }, /*#__PURE__*/React.createElement(Transition, {
    items: opened,
    config: _objectSpread(_objectSpread({}, springs.lazy), {}, {
      precision: 0.001
    }),
    from: {
      progress: 0
    },
    enter: {
      progress: Number(opened)
    },
    leave: {
      progress: 0
    },
    onRest: handleTransitionRest,
    onStart: handleTransitionStart,
    onFrame: handleTransitionFrame,
    onDestroyed: handleTransitionDestroyed,
    unique: true,
    native: true
  }, function (opened) {
    return opened && function (_ref4) {
      var progress = _ref4.progress;
      return /*#__PURE__*/React.createElement(_StyledDiv, {
        _css: status !== 'closing' ? 'auto' : 'none'
      }, /*#__PURE__*/React.createElement(_StyledAnimatedDiv, {
        onClick: close,
        style: {
          opacity: progress,
          pointerEvents: status !== 'closing' ? 'auto' : 'none'
        },
        _css2: theme.overlay.alpha(0.9)
      }), /*#__PURE__*/React.createElement(Panel, {
        compact: compact,
        style: {
          transform: progress.interpolate(function (v) {
            return "\n                          translate3d(\n                            calc(\n                              ".concat(100 * (1 - v), "% +\n                              ").concat(CLOSING_POSITION * (1 - v), "px\n                            ), 0, 0\n                          )\n                        ");
          })
        }
      }, /*#__PURE__*/React.createElement(_StyledHeader, {
        _css3: 8 * GU,
        _css4: theme.border,
        _css5: unselectable()
      }, /*#__PURE__*/React.createElement(_StyledH, {
        _css6: theme.surfaceContent,
        _css7: textStyle('body1')
      }, title), !blocking && /*#__PURE__*/React.createElement(_StyledButtonIcon, {
        label: "Close",
        onClick: close,
        _css8: !compact ? "\n                              top: ".concat(2 * GU, "px;\n                              right: ").concat(2 * GU, "px;\n                            ") : "\n                              top: 0;\n                              right: 0;\n                              height: ".concat(8 * GU, "px;\n                              width: ").concat(8 * GU, "px;\n                            ")
      }, /*#__PURE__*/React.createElement(IconCross, {
        color: theme.surfaceIcon
      }))), /*#__PURE__*/React.createElement(_StyledDiv2, null, /*#__PURE__*/React.createElement(_StyledDiv3, null, /*#__PURE__*/React.createElement(SidePanelContext.Provider, {
        value: {
          status: status,
          readyToFocus: readyToFocus
        }
      }, children)))));
    };
  })));
}

SidePanel.propTypes = {
  blocking: propTypes.bool,
  children: propTypes.node.isRequired,
  opened: propTypes.bool,
  onClose: propTypes.func,
  onTransitionEnd: propTypes.func,
  title: propTypes.node.isRequired
};
SidePanel.defaultProps = {
  opened: true,
  blocking: false,
  onClose: function onClose() {},
  onTransitionEnd: function onTransitionEnd() {}
};

var _StyledAnimatedAside = _styled(extendedAnimated.aside).withConfig({
  displayName: "SidePanel___StyledAnimatedAside",
  componentId: "sc-1kjx6mk-7"
})(["position:absolute;top:0;right:0;display:flex;flex-direction:column;width:100%;height:100%;background:", ";box-shadow:-2px 0px 4px rgba(0,0,0,0.1);", ""], function (p) {
  return p._css9;
}, function (p) {
  return p._css10;
});

var Panel = /*#__PURE__*/React.memo(function Panel(_ref5) {
  var compact = _ref5.compact,
      props = objectWithoutProperties(_ref5, ["compact"]);

  var theme = useTheme();
  return /*#__PURE__*/React.createElement(_StyledAnimatedAside, _extends_1({}, props, {
    _css9: theme.surface,
    _css10: !compact ? 'max-width: 450px;' : ''
  }));
});
Panel.propTypes = {
  compact: propTypes.bool
};

function useSidePanel() {
  var value = useContext(SidePanelContext);

  if (value === null) {
    throw new Error('useSidePanel() was used outside of the SidePanel render tree, ' + 'which has to be declared at an upper level!');
  }

  return value;
}

function useSidePanelFocusOnReady(ref) {
  var _useSidePanel = useSidePanel(),
      readyToFocus = _useSidePanel.readyToFocus;

  var fallbackRef = useRef();

  var _ref = ref || fallbackRef;

  useEffect(function () {
    if (readyToFocus && _ref.current) {
      if (_ref.current.focus) {
        _ref.current.focus();
      } else {
        warn('useSidePanelFocusOnReady(): the focus() method wasn’t available on ' + 'the passed ref.');
      }
    }
  }, [readyToFocus, _ref]);
  return _ref;
} // Used for spacing in SidePanelSplit and SidePanelSeparator


SidePanel.HORIZONTAL_PADDING = CONTENT_PADDING;

export default SidePanel;
export { useSidePanel, useSidePanelFocusOnReady };
//# sourceMappingURL=SidePanel.js.map
