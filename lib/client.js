window.__ModuleLoader__.load({
  id: '@gsnowdrift/dsh-java-ops',
  factory(require) {
    var module = { exports: {} }
    var exports = module.exports
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __typeError = (msg) => {
      throw TypeError(msg);
    };
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
    var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
    var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
    var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);

    // src/client.js
    var client_exports = {};
    __export(client_exports, {
      apply: () => apply,
      inject: () => inject
    });
    module.exports = __toCommonJS(client_exports);
    var React33 = __toESM(require("react"), 1);

    // node_modules/@radix-ui/react-switch/dist/index.mjs
    var React9 = __toESM(require("react"), 1);

    // node_modules/@radix-ui/primitive/dist/index.mjs
    var __defProp2 = Object.defineProperty;
    var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
    var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
    function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
      return /* @__PURE__ */ __name(function handleEvent(event) {
        originalEventHandler?.(event);
        if (checkForDefaultPrevented === false || !event || !event.defaultPrevented) {
          return ourEventHandler?.(event);
        }
      }, "handleEvent");
    }
    __name(composeEventHandlers, "composeEventHandlers");
    function getOwnerWindow(element) {
      if (!canUseDOM) {
        throw new Error("Cannot access window outside of the DOM");
      }
      return element?.ownerDocument?.defaultView ?? window;
    }
    __name(getOwnerWindow, "getOwnerWindow");
    function getOwnerDocument(element) {
      if (!canUseDOM) {
        throw new Error("Cannot access document outside of the DOM");
      }
      return element?.ownerDocument ?? document;
    }
    __name(getOwnerDocument, "getOwnerDocument");
    function getActiveElement(node, activeDescendant = false) {
      const { activeElement } = getOwnerDocument(node);
      if (!activeElement?.nodeName) {
        return null;
      }
      if (isFrame(activeElement) && activeElement.contentDocument) {
        return getActiveElement(activeElement.contentDocument.body, activeDescendant);
      }
      if (activeDescendant) {
        const id = activeElement.getAttribute("aria-activedescendant");
        if (id) {
          const element = getOwnerDocument(activeElement).getElementById(id);
          if (element) {
            return element;
          }
        }
      }
      return activeElement;
    }
    __name(getActiveElement, "getActiveElement");
    function isFrame(element) {
      return element.tagName === "IFRAME";
    }
    __name(isFrame, "isFrame");

    // node_modules/@radix-ui/react-compose-refs/dist/index.mjs
    var React = __toESM(require("react"), 1);
    var __defProp3 = Object.defineProperty;
    var __name2 = (target, value) => __defProp3(target, "name", { value, configurable: true });
    function setRef(ref, value) {
      if (typeof ref === "function") {
        return ref(value);
      } else if (ref !== null && ref !== void 0) {
        ref.current = value;
      }
    }
    __name2(setRef, "setRef");
    function composeRefs(...refs) {
      return (node) => {
        let hasCleanup = false;
        const cleanups = refs.map((ref) => {
          const cleanup = setRef(ref, node);
          if (!hasCleanup && typeof cleanup == "function") {
            hasCleanup = true;
          }
          return cleanup;
        });
        if (hasCleanup) {
          return () => {
            for (let i = 0; i < cleanups.length; i++) {
              const cleanup = cleanups[i];
              if (typeof cleanup == "function") {
                cleanup();
              } else {
                setRef(refs[i], null);
              }
            }
          };
        }
      };
    }
    __name2(composeRefs, "composeRefs");
    function useComposedRefs(...refs) {
      return React.useCallback(composeRefs(...refs), refs);
    }
    __name2(useComposedRefs, "useComposedRefs");

    // node_modules/@radix-ui/react-context/dist/index.mjs
    var React2 = __toESM(require("react"), 1);
    var import_jsx_runtime = require("react/jsx-runtime");
    var __defProp4 = Object.defineProperty;
    var __name3 = (target, value) => __defProp4(target, "name", { value, configurable: true });
    // @__NO_SIDE_EFFECTS__
    function createContext2(rootComponentName, defaultContext) {
      const Context = React2.createContext(defaultContext);
      Context.displayName = rootComponentName + "Context";
      const Provider = /* @__PURE__ */ __name3((props) => {
        const { children, ...context } = props;
        const value = React2.useMemo(() => context, Object.values(context));
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Context.Provider, { value, children });
      }, "Provider");
      Provider.displayName = rootComponentName + "Provider";
      function useContext22(consumerName, options2 = {}) {
        const { optional = false } = options2;
        const context = React2.useContext(Context);
        if (context) return context;
        if (defaultContext !== void 0) return defaultContext;
        if (optional) return void 0;
        throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
      }
      __name3(useContext22, "useContext");
      return [Provider, useContext22];
    }
    __name3(createContext2, "createContext");
    // @__NO_SIDE_EFFECTS__
    function createContextScope(scopeName, createContextScopeDeps = []) {
      let defaultContexts = [];
      function createContext32(rootComponentName, defaultContext) {
        const BaseContext = React2.createContext(defaultContext);
        BaseContext.displayName = rootComponentName + "Context";
        const index = defaultContexts.length;
        defaultContexts = [...defaultContexts, defaultContext];
        const Provider = /* @__PURE__ */ __name3((props) => {
          const { scope, children, ...context } = props;
          const Context = scope?.[scopeName]?.[index] || BaseContext;
          const value = React2.useMemo(() => context, Object.values(context));
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Context.Provider, { value, children });
        }, "Provider");
        Provider.displayName = rootComponentName + "Provider";
        function useContext22(consumerName, scope, options2 = {}) {
          const { optional = false } = options2;
          const Context = scope?.[scopeName]?.[index] || BaseContext;
          const context = React2.useContext(Context);
          if (context) return context;
          if (defaultContext !== void 0) return defaultContext;
          if (optional) return void 0;
          throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
        }
        __name3(useContext22, "useContext");
        return [Provider, useContext22];
      }
      __name3(createContext32, "createContext");
      const createScope = /* @__PURE__ */ __name3(() => {
        const scopeContexts = defaultContexts.map((defaultContext) => {
          return React2.createContext(defaultContext);
        });
        return /* @__PURE__ */ __name3(function useScope(scope) {
          const contexts = scope?.[scopeName] || scopeContexts;
          return React2.useMemo(
            () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
            [scope, contexts]
          );
        }, "useScope");
      }, "createScope");
      createScope.scopeName = scopeName;
      return [createContext32, composeContextScopes(createScope, ...createContextScopeDeps)];
    }
    __name3(createContextScope, "createContextScope");
    function composeContextScopes(...scopes) {
      const baseScope = scopes[0];
      if (scopes.length === 1) return baseScope;
      const createScope = /* @__PURE__ */ __name3(() => {
        const scopeHooks = scopes.map((createScope2) => ({
          useScope: createScope2(),
          scopeName: createScope2.scopeName
        }));
        return /* @__PURE__ */ __name3(function useComposedScopes(overrideScopes) {
          const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
            const scopeProps = useScope(overrideScopes);
            const currentScope = scopeProps[`__scope${scopeName}`];
            return { ...nextScopes2, ...currentScope };
          }, {});
          return React2.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
        }, "useComposedScopes");
      }, "createScope");
      createScope.scopeName = baseScope.scopeName;
      return createScope;
    }
    __name3(composeContextScopes, "composeContextScopes");

    // node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
    var React5 = __toESM(require("react"), 1);

    // node_modules/@radix-ui/primitive/dist/internal/is-development.false.mjs
    var IS_DEVELOPMENT = false;

    // node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
    var React3 = __toESM(require("react"), 1);
    var useLayoutEffect2 = globalThis?.document ? React3.useLayoutEffect : () => {
    };

    // node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
    var React22 = __toESM(require("react"), 1);

    // node_modules/@radix-ui/react-use-effect-event/dist/index.mjs
    var React4 = __toESM(require("react"), 1);
    var __defProp5 = Object.defineProperty;
    var __name4 = (target, value) => __defProp5(target, "name", { value, configurable: true });
    var useReactEffectEvent = React4[" useEffectEvent ".trim().toString()];
    var useReactInsertionEffect = React4[" useInsertionEffect ".trim().toString()];
    function useEffectEvent(callback) {
      if (typeof useReactEffectEvent === "function") {
        return useReactEffectEvent(callback);
      }
      const ref = React4.useRef(() => {
        throw new Error("Cannot call an event handler while rendering.");
      });
      if (typeof useReactInsertionEffect === "function") {
        useReactInsertionEffect(() => {
          ref.current = callback;
        });
      } else {
        useLayoutEffect2(() => {
          ref.current = callback;
        });
      }
      return React4.useMemo(() => ((...args) => ref.current?.(...args)), []);
    }
    __name4(useEffectEvent, "useEffectEvent");

    // node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
    var __defProp6 = Object.defineProperty;
    var __name5 = (target, value) => __defProp6(target, "name", { value, configurable: true });
    var useInsertionEffect = React5[" useInsertionEffect ".trim().toString()] || useLayoutEffect2;
    function useControllableState({
      prop,
      defaultProp,
      onChange = /* @__PURE__ */ __name5(() => {
      }, "onChange"),
      caller
    }) {
      const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
        defaultProp,
        onChange
      });
      const isControlled = prop !== void 0;
      const value = isControlled ? prop : uncontrolledProp;
      if (IS_DEVELOPMENT) {
        const isControlledRef = React5.useRef(prop !== void 0);
        React5.useEffect(() => {
          const wasControlled = isControlledRef.current;
          if (wasControlled !== isControlled) {
            const from = wasControlled ? "controlled" : "uncontrolled";
            const to = isControlled ? "controlled" : "uncontrolled";
            console.warn(
              `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
            );
          }
          isControlledRef.current = isControlled;
        }, [isControlled, caller]);
      }
      const setValue = React5.useCallback(
        (nextValue) => {
          if (isControlled) {
            const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
            if (value2 !== prop) {
              onChangeRef.current?.(value2);
            }
          } else {
            setUncontrolledProp(nextValue);
          }
        },
        [isControlled, prop, setUncontrolledProp, onChangeRef]
      );
      return [value, setValue];
    }
    __name5(useControllableState, "useControllableState");
    function useUncontrolledState({
      defaultProp,
      onChange
    }) {
      const [value, setValue] = React5.useState(defaultProp);
      const prevValueRef = React5.useRef(value);
      const onChangeRef = React5.useRef(onChange);
      useInsertionEffect(() => {
        onChangeRef.current = onChange;
      }, [onChange]);
      React5.useEffect(() => {
        if (prevValueRef.current !== value) {
          onChangeRef.current?.(value);
          prevValueRef.current = value;
        }
      }, [value, prevValueRef]);
      return [value, setValue, onChangeRef];
    }
    __name5(useUncontrolledState, "useUncontrolledState");
    function isFunction(value) {
      return typeof value === "function";
    }
    __name5(isFunction, "isFunction");
    var SYNC_STATE = /* @__PURE__ */ Symbol("RADIX:SYNC_STATE");
    function useControllableStateReducer(reducer, userArgs, initialArg, init) {
      const { prop: controlledState, defaultProp, onChange: onChangeProp, caller } = userArgs;
      const isControlled = controlledState !== void 0;
      const onChange = useEffectEvent(onChangeProp);
      if (IS_DEVELOPMENT) {
        const isControlledRef = React22.useRef(controlledState !== void 0);
        React22.useEffect(() => {
          const wasControlled = isControlledRef.current;
          if (wasControlled !== isControlled) {
            const from = wasControlled ? "controlled" : "uncontrolled";
            const to = isControlled ? "controlled" : "uncontrolled";
            console.warn(
              `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
            );
          }
          isControlledRef.current = isControlled;
        }, [isControlled, caller]);
      }
      const args = [{ ...initialArg, state: defaultProp }];
      if (init) {
        args.push(init);
      }
      const [internalState, dispatch] = React22.useReducer(
        (state2, action) => {
          if (action.type === SYNC_STATE) {
            return { ...state2, state: action.state };
          }
          const next = reducer(state2, action);
          if (isControlled && !Object.is(next.state, state2.state)) {
            onChange(next.state);
          }
          return next;
        },
        ...args
      );
      const uncontrolledState = internalState.state;
      const prevValueRef = React22.useRef(uncontrolledState);
      React22.useEffect(() => {
        if (prevValueRef.current !== uncontrolledState) {
          prevValueRef.current = uncontrolledState;
          if (!isControlled) {
            onChange(uncontrolledState);
          }
        }
      }, [uncontrolledState, prevValueRef, isControlled]);
      const state = React22.useMemo(() => {
        const isControlled2 = controlledState !== void 0;
        if (isControlled2) {
          return { ...internalState, state: controlledState };
        }
        return internalState;
      }, [internalState, controlledState]);
      React22.useEffect(() => {
        if (isControlled && !Object.is(controlledState, internalState.state)) {
          dispatch({ type: SYNC_STATE, state: controlledState });
        }
      }, [controlledState, internalState.state, isControlled]);
      return [state, dispatch];
    }
    __name5(useControllableStateReducer, "useControllableStateReducer");

    // node_modules/@radix-ui/react-use-size/dist/index.mjs
    var React6 = __toESM(require("react"), 1);
    var __defProp7 = Object.defineProperty;
    var __name6 = (target, value) => __defProp7(target, "name", { value, configurable: true });
    function useSize(element) {
      const [size, setSize] = React6.useState(void 0);
      useLayoutEffect2(() => {
        if (element) {
          setSize({ width: element.offsetWidth, height: element.offsetHeight });
          let rAF = 0;
          const resizeObserver = new ResizeObserver((entries) => {
            if (!Array.isArray(entries)) {
              return;
            }
            if (!entries.length) {
              return;
            }
            const entry = entries[0];
            window.cancelAnimationFrame(rAF);
            rAF = window.requestAnimationFrame(() => {
              let width;
              let height;
              if ("borderBoxSize" in entry) {
                const borderSizeEntry = entry["borderBoxSize"];
                const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
                width = borderSize["inlineSize"];
                height = borderSize["blockSize"];
              } else {
                width = element.offsetWidth;
                height = element.offsetHeight;
              }
              setSize({ width, height });
            });
          });
          resizeObserver.observe(element, { box: "border-box" });
          return () => {
            window.cancelAnimationFrame(rAF);
            resizeObserver.unobserve(element);
          };
        } else {
          setSize(void 0);
        }
      }, [element]);
      return size;
    }
    __name6(useSize, "useSize");

    // node_modules/@radix-ui/react-primitive/dist/index.mjs
    var React8 = __toESM(require("react"), 1);
    var ReactDOM = __toESM(require("react-dom"), 1);

    // node_modules/@radix-ui/react-slot/dist/index.mjs
    var React7 = __toESM(require("react"), 1);
    var __defProp8 = Object.defineProperty;
    var __name7 = (target, value) => __defProp8(target, "name", { value, configurable: true });
    // @__NO_SIDE_EFFECTS__
    function createSlot(ownerName) {
      const Slot2 = React7.forwardRef((props, forwardedRef) => {
        let { children, ...slotProps } = props;
        let slottableElement = null;
        let hasSlottable = false;
        const newChildren = [];
        children = useUnwrappedLazy(children);
        React7.Children.forEach(children, (maybeSlottable) => {
          if (isSlottable(maybeSlottable)) {
            hasSlottable = true;
            const slottable = maybeSlottable;
            let child = "child" in slottable.props ? slottable.props.child : slottable.props.children;
            while (isLazyComponent(child) && typeof use === "function") {
              child = use(child._payload);
            }
            slottableElement = getSlottableElementFromSlottable(slottable, child);
            newChildren.push(slottableElement?.props?.children);
          } else {
            newChildren.push(maybeSlottable);
          }
        });
        if (slottableElement) {
          slottableElement = React7.cloneElement(slottableElement, void 0, newChildren);
        } else if (
          // A `Slottable` was found but it didn't resolve to a single element (e.g.
          // it wrapped multiple elements, text, or a render-prop `child` that
          // wasn't an element). Don't fall back to treating the `Slottable` wrapper
          // itself as the slot target — throw a descriptive error below instead.
          !hasSlottable && React7.Children.count(children) === 1 && React7.isValidElement(children)
        ) {
          slottableElement = children;
        }
        const slottableElementRef = slottableElement ? getElementRef(slottableElement) : void 0;
        const composedRef = useComposedRefs(forwardedRef, slottableElementRef);
        if (!slottableElement) {
          if (children || children === 0) {
            throw new Error(
              hasSlottable ? createSlottableError(ownerName) : createSlotError(ownerName)
            );
          }
          return children;
        }
        const mergedProps = mergeProps(slotProps, slottableElement.props ?? {});
        if (slottableElement.type !== React7.Fragment) {
          mergedProps.ref = forwardedRef ? composedRef : slottableElementRef;
        }
        return React7.cloneElement(slottableElement, mergedProps);
      });
      Slot2.displayName = `${ownerName}.Slot`;
      return Slot2;
    }
    __name7(createSlot, "createSlot");
    var SLOTTABLE_IDENTIFIER = /* @__PURE__ */ Symbol.for("radix.slottable");
    // @__NO_SIDE_EFFECTS__
    function createSlottable(ownerName) {
      const Slottable2 = /* @__PURE__ */ __name7((props) => "child" in props ? props.children(props.child) : props.children, "Slottable");
      Slottable2.displayName = `${ownerName}.Slottable`;
      Slottable2.__radixId = SLOTTABLE_IDENTIFIER;
      return Slottable2;
    }
    __name7(createSlottable, "createSlottable");
    var getSlottableElementFromSlottable = /* @__PURE__ */ __name7((slottable, child) => {
      if ("child" in slottable.props) {
        if (!React7.isValidElement(child)) return null;
        return React7.cloneElement(child, void 0, slottable.props.children(child.props.children));
      }
      return React7.isValidElement(child) ? child : null;
    }, "getSlottableElementFromSlottable");
    function mergeProps(slotProps, childProps) {
      const overrideProps = { ...childProps };
      for (const propName in childProps) {
        const slotPropValue = slotProps[propName];
        const childPropValue = childProps[propName];
        const isHandler = /^on[A-Z]/.test(propName);
        if (isHandler) {
          if (slotPropValue && childPropValue) {
            overrideProps[propName] = (...args) => {
              const result = childPropValue(...args);
              slotPropValue(...args);
              return result;
            };
          } else if (slotPropValue) {
            overrideProps[propName] = slotPropValue;
          }
        } else if (propName === "style") {
          overrideProps[propName] = { ...slotPropValue, ...childPropValue };
        } else if (propName === "className") {
          overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
        } else if (propName === "aria-describedby") {
          overrideProps[propName] = concatAriaDescribedby(childPropValue, slotPropValue);
        }
      }
      return { ...slotProps, ...overrideProps };
    }
    __name7(mergeProps, "mergeProps");
    function getElementRef(element) {
      let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
      let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
      if (mayWarn) {
        return element.ref;
      }
      getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
      mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
      if (mayWarn) {
        return element.props.ref;
      }
      return element.props.ref || element.ref;
    }
    __name7(getElementRef, "getElementRef");
    function isSlottable(child) {
      return React7.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
    }
    __name7(isSlottable, "isSlottable");
    var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
    function isLazyComponent(element) {
      return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
    }
    __name7(isLazyComponent, "isLazyComponent");
    function isPromiseLike(value) {
      return typeof value === "object" && value !== null && "then" in value;
    }
    __name7(isPromiseLike, "isPromiseLike");
    function useUnwrappedLazy(value) {
      let unwrapped = value;
      while (isLazyComponent(unwrapped) && typeof use === "function") {
        unwrapped = use(unwrapped._payload);
      }
      return unwrapped;
    }
    __name7(useUnwrappedLazy, "useUnwrappedLazy");
    function concatAriaDescribedby(...values) {
      const ids = /* @__PURE__ */ new Set();
      for (const value of values) {
        if (typeof value !== "string") continue;
        for (const id of String(value).trim().split(/\s+/)) {
          if (id) ids.add(id);
        }
      }
      return ids.size > 0 ? Array.from(ids).join(" ") : void 0;
    }
    __name7(concatAriaDescribedby, "concatAriaDescribedby");
    var createSlotError = /* @__PURE__ */ __name7((ownerName) => {
      return `${ownerName} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`;
    }, "createSlotError");
    var createSlottableError = /* @__PURE__ */ __name7((ownerName) => {
      return `${ownerName} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`;
    }, "createSlottableError");
    var use = React7[" use ".trim().toString()];

    // node_modules/@radix-ui/react-primitive/dist/index.mjs
    var import_jsx_runtime2 = require("react/jsx-runtime");
    var __defProp9 = Object.defineProperty;
    var __name8 = (target, value) => __defProp9(target, "name", { value, configurable: true });
    var NODES = [
      "a",
      "button",
      "div",
      "form",
      "h2",
      "h3",
      "img",
      "input",
      "label",
      "li",
      "nav",
      "ol",
      "p",
      "select",
      "span",
      "svg",
      "ul"
    ];
    var Primitive = NODES.reduce((primitive, node) => {
      const Slot2 = createSlot(`Primitive.${node}`);
      const Node2 = React8.forwardRef((props, forwardedRef) => {
        const { asChild, ...primitiveProps } = props;
        const Comp = asChild ? Slot2 : node;
        if (typeof window !== "undefined") {
          window[/* @__PURE__ */ Symbol.for("radix-ui")] = true;
        }
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Comp, { ...primitiveProps, ref: forwardedRef });
      });
      Node2.displayName = `Primitive.${node}`;
      return { ...primitive, [node]: Node2 };
    }, {});
    function dispatchDiscreteCustomEvent(target, event) {
      if (target) ReactDOM.flushSync(() => target.dispatchEvent(event));
    }
    __name8(dispatchDiscreteCustomEvent, "dispatchDiscreteCustomEvent");

    // node_modules/@radix-ui/react-switch/dist/index.mjs
    var import_jsx_runtime3 = require("react/jsx-runtime");
    var __defProp10 = Object.defineProperty;
    var __name9 = (target, value) => __defProp10(target, "name", { value, configurable: true });
    var SWITCH_NAME = "Switch";
    var [createSwitchContext, createSwitchScope] = createContextScope(SWITCH_NAME);
    var [SwitchProviderImpl, useSwitchContext] = createSwitchContext(SWITCH_NAME);
    function SwitchProvider(props) {
      const {
        __scopeSwitch,
        checked: checkedProp,
        children,
        defaultChecked,
        disabled,
        form,
        name,
        onCheckedChange,
        required,
        value = "on",
        // @ts-expect-error
        internal_do_not_use_render
      } = props;
      const [checked, setChecked] = useControllableState({
        prop: checkedProp,
        defaultProp: defaultChecked ?? false,
        onChange: onCheckedChange,
        caller: SWITCH_NAME
      });
      const [control, setControl] = React9.useState(null);
      const [bubbleInput, setBubbleInput] = React9.useState(null);
      const [userClick, setUserClick] = React9.useState(null);
      const isFormControl = control ? !!form || !!control.closest("form") : (
        // We set this to true by default so that events bubble to forms without JS (SSR)
        true
      );
      const context = {
        checked,
        setChecked,
        disabled,
        control,
        setControl,
        name,
        form,
        value,
        userClick,
        onUserClick: setUserClick,
        required,
        defaultChecked,
        isFormControl,
        bubbleInput,
        setBubbleInput
      };
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(SwitchProviderImpl, { scope: __scopeSwitch, ...context, children: isFunction2(internal_do_not_use_render) ? internal_do_not_use_render(context) : children });
    }
    __name9(SwitchProvider, "SwitchProvider");
    var TRIGGER_NAME = "SwitchTrigger";
    var SwitchTrigger = /* @__PURE__ */ React9.forwardRef(
      /* @__PURE__ */ __name9(function SwitchTrigger2({ __scopeSwitch, onClick, ...switchProps }, forwardedRef) {
        const {
          control,
          form,
          value,
          disabled,
          checked,
          required,
          setControl,
          setChecked,
          onUserClick,
          isFormControl,
          bubbleInput
        } = useSwitchContext(TRIGGER_NAME, __scopeSwitch);
        const composedRefs = useComposedRefs(forwardedRef, setControl);
        const initialCheckedStateRef = React9.useRef(checked);
        React9.useEffect(() => {
          const associatedForm = form ? control?.ownerDocument.getElementById(form) : control?.form;
          if (associatedForm instanceof HTMLFormElement) {
            const reset = /* @__PURE__ */ __name9(() => setChecked(initialCheckedStateRef.current), "reset");
            associatedForm.addEventListener("reset", reset);
            return () => associatedForm.removeEventListener("reset", reset);
          }
        }, [control, form, setChecked]);
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          Primitive.button,
          {
            type: "button",
            role: "switch",
            "aria-checked": checked,
            "aria-required": required,
            "data-state": getState(checked),
            "data-disabled": disabled ? "" : void 0,
            disabled,
            value,
            ...switchProps,
            ref: composedRefs,
            onClick: composeEventHandlers(onClick, (event) => {
              const hasConsumerStoppedPropagation = event.isPropagationStopped();
              onUserClick({ requestedChecked: !checked, hasConsumerStoppedPropagation });
              setChecked((prevChecked) => !prevChecked);
              if (bubbleInput && isFormControl) {
                if (!hasConsumerStoppedPropagation) {
                  event.stopPropagation();
                }
              }
            })
          }
        );
      }, "SwitchTrigger")
    );
    var Switch = /* @__PURE__ */ React9.forwardRef(
      // blank line to reduce diff noise
      /* @__PURE__ */ __name9(function Switch2(props, forwardedRef) {
        const {
          __scopeSwitch,
          name,
          checked,
          defaultChecked,
          required,
          disabled,
          value,
          onCheckedChange,
          form,
          ...switchProps
        } = props;
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          SwitchProvider,
          {
            __scopeSwitch,
            checked,
            defaultChecked,
            disabled,
            required,
            onCheckedChange,
            name,
            form,
            value,
            internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                SwitchTrigger,
                {
                  ...switchProps,
                  ref: forwardedRef,
                  __scopeSwitch
                }
              ),
              isFormControl && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                SwitchBubbleInput,
                {
                  __scopeSwitch
                }
              )
            ] })
          }
        );
      }, "Switch")
    );
    var THUMB_NAME = "SwitchThumb";
    var SwitchThumb = /* @__PURE__ */ React9.forwardRef(
      /* @__PURE__ */ __name9(function SwitchThumb2(props, forwardedRef) {
        const { __scopeSwitch, ...thumbProps } = props;
        const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...thumbProps,
            ref: forwardedRef
          }
        );
      }, "SwitchThumb")
    );
    var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
    var SwitchBubbleInput = /* @__PURE__ */ React9.forwardRef(
      // blank line to reduce diff noise
      /* @__PURE__ */ __name9(function SwitchBubbleInput2({ __scopeSwitch, onClick, ...props }, forwardedRef) {
        const {
          control,
          userClick,
          checked,
          defaultChecked,
          required,
          disabled,
          name,
          value,
          form,
          bubbleInput,
          setBubbleInput
        } = useSwitchContext(BUBBLE_INPUT_NAME, __scopeSwitch);
        const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
        const controlSize = useSize(control);
        const shouldStopClickPropagationRef = React9.useRef(false);
        const prevCheckedRef = React9.useRef(checked);
        const handledUserClickRef = React9.useRef(userClick);
        const pendingUserClickRef = React9.useRef(null);
        React9.useEffect(() => {
          const input = bubbleInput;
          if (!input) return;
          const inputProto = window.HTMLInputElement.prototype;
          const descriptor = Object.getOwnPropertyDescriptor(
            inputProto,
            "checked"
          );
          const setChecked = descriptor.set;
          if (!setChecked) {
            return;
          }
          const checkedChanged = prevCheckedRef.current !== checked;
          prevCheckedRef.current = checked;
          const isNewUserClick = userClick !== null && userClick !== handledUserClickRef.current;
          handledUserClickRef.current = userClick;
          if (isNewUserClick) {
            pendingUserClickRef.current = checkedChanged ? null : userClick;
            if (checkedChanged) {
              setChecked.call(input, checked);
            }
            input.dispatchEvent(
              new Event("click", { bubbles: !userClick.hasConsumerStoppedPropagation })
            );
          } else if (checkedChanged) {
            const pendingUserClick = pendingUserClickRef.current;
            pendingUserClickRef.current = null;
            const isPendingUserChange = pendingUserClick?.requestedChecked === checked;
            shouldStopClickPropagationRef.current = true;
            setChecked.call(input, checked);
            input.dispatchEvent(
              new Event("click", {
                bubbles: !(isPendingUserChange && pendingUserClick.hasConsumerStoppedPropagation)
              })
            );
            shouldStopClickPropagationRef.current = false;
          }
        }, [bubbleInput, checked, userClick]);
        const defaultCheckedRef = React9.useRef(checked);
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          Primitive.input,
          {
            type: "checkbox",
            "aria-hidden": true,
            defaultChecked: defaultChecked ?? defaultCheckedRef.current,
            required,
            disabled,
            name,
            value,
            form,
            ...props,
            tabIndex: -1,
            ref: composedRefs,
            onClick: composeEventHandlers(onClick, (event) => {
              if (shouldStopClickPropagationRef.current) {
                event.stopPropagation();
              }
            }),
            style: {
              ...props.style,
              ...controlSize,
              position: "absolute",
              pointerEvents: "none",
              opacity: 0,
              margin: 0,
              // We transform because the input is absolutely positioned but we have
              // rendered it **after** the button. This pulls it back to sit on top
              // of the button.
              transform: "translateX(-100%)"
            }
          }
        );
      }, "SwitchBubbleInput")
    );
    function isFunction2(value) {
      return typeof value === "function";
    }
    __name9(isFunction2, "isFunction");
    function getState(checked) {
      return checked ? "checked" : "unchecked";
    }
    __name9(getState, "getState");

    // node_modules/@radix-ui/react-dialog/dist/index.mjs
    var React26 = __toESM(require("react"), 1);

    // node_modules/@radix-ui/react-id/dist/index.mjs
    var React10 = __toESM(require("react"), 1);
    var __defProp11 = Object.defineProperty;
    var __name10 = (target, value) => __defProp11(target, "name", { value, configurable: true });
    var useReactId = React10[" useId ".trim().toString()] || (() => void 0);
    var count = 0;
    function useId(deterministicId) {
      const [id, setId] = React10.useState(useReactId());
      useLayoutEffect2(() => {
        if (!deterministicId) setId((reactId) => reactId ?? String(count++));
      }, [deterministicId]);
      return deterministicId || (id ? `radix-${id}` : "");
    }
    __name10(useId, "useId");

    // node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
    var React12 = __toESM(require("react"), 1);

    // node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
    var React11 = __toESM(require("react"), 1);
    var __defProp12 = Object.defineProperty;
    var __name11 = (target, value) => __defProp12(target, "name", { value, configurable: true });
    var useReactInsertionEffect2 = React11[" useInsertionEffect ".trim().toString()];
    function useCallbackRef(callback) {
      const callbackRef = React11.useRef(callback);
      if (typeof useReactInsertionEffect2 === "function") {
        useReactInsertionEffect2(() => {
          callbackRef.current = callback;
        });
      } else {
        useLayoutEffect2(() => {
          callbackRef.current = callback;
        });
      }
      return React11.useMemo(() => ((...args) => callbackRef.current?.(...args)), []);
    }
    __name11(useCallbackRef, "useCallbackRef");

    // node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
    var import_jsx_runtime4 = require("react/jsx-runtime");
    var __defProp13 = Object.defineProperty;
    var __name12 = (target, value) => __defProp13(target, "name", { value, configurable: true });
    var CONTEXT_UPDATE = "dismissableLayer.update";
    var POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
    var FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
    var originalBodyPointerEvents;
    var DismissableLayerContext = React12.createContext({
      layers: /* @__PURE__ */ new Set(),
      layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
      branches: /* @__PURE__ */ new Set(),
      // Outside elements that belong to a layer's own dismiss affordance (eg, a
      // dialog overlay). Pressing them should dismiss the layer regardless of
      // whether or not they stop propagation.
      //
      // See https://github.com/radix-ui/primitives/issues/3346
      dismissableSurfaces: /* @__PURE__ */ new Set()
    });
    var DismissableLayer = /* @__PURE__ */ React12.forwardRef(
      // blank line to reduce diff noise
      /* @__PURE__ */ __name12(function DismissableLayer2(props, forwardedRef) {
        const {
          disableOutsidePointerEvents = false,
          deferPointerDownOutside = false,
          onEscapeKeyDown,
          onPointerDownOutside,
          onFocusOutside,
          onInteractOutside,
          onDismiss,
          ...layerProps
        } = props;
        const context = React12.useContext(DismissableLayerContext);
        const [node, setNode] = React12.useState(null);
        const ownerDocument = node?.ownerDocument ?? globalThis?.document;
        const [, force] = React12.useState({});
        const composedRefs = useComposedRefs(forwardedRef, setNode);
        const layers = Array.from(context.layers);
        const [highestLayerWithOutsidePointerEventsDisabled] = [
          ...context.layersWithOutsidePointerEventsDisabled
        ].slice(-1);
        const highestLayerWithOutsidePointerEventsDisabledIndex = highestLayerWithOutsidePointerEventsDisabled ? layers.indexOf(highestLayerWithOutsidePointerEventsDisabled) : -1;
        const index = node ? layers.indexOf(node) : -1;
        const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
        const isPointerEventsEnabled = index >= highestLayerWithOutsidePointerEventsDisabledIndex;
        const isDeferredPointerDownOutsideRef = React12.useRef(false);
        const pointerDownOutside = usePointerDownOutside(
          (event) => {
            onPointerDownOutside?.(event);
            onInteractOutside?.(event);
            if (!event.defaultPrevented) onDismiss?.();
          },
          {
            ownerDocument,
            deferPointerDownOutside,
            isDeferredPointerDownOutsideRef,
            dismissableSurfaces: context.dismissableSurfaces,
            shouldHandlePointerDownOutside: React12.useCallback(
              (target) => {
                if (!(target instanceof Node)) {
                  return false;
                }
                const isPointerDownOnBranch = [...context.branches].some(
                  (branch) => branch.contains(target)
                );
                return isPointerEventsEnabled && !isPointerDownOnBranch;
              },
              [context.branches, isPointerEventsEnabled]
            )
          }
        );
        const focusOutside = useFocusOutside((event) => {
          if (deferPointerDownOutside && isDeferredPointerDownOutsideRef.current) {
            return;
          }
          const target = event.target;
          const isFocusInBranch = [...context.branches].some((branch) => branch.contains(target));
          if (isFocusInBranch) return;
          onFocusOutside?.(event);
          onInteractOutside?.(event);
          if (!event.defaultPrevented) onDismiss?.();
        }, ownerDocument);
        const isHighestLayer = node ? index === layers.length - 1 : false;
        const handleKeyDown = useCallbackRef((event) => {
          if (event.key !== "Escape") {
            return;
          }
          onEscapeKeyDown?.(event);
          if (!event.defaultPrevented && onDismiss) {
            event.preventDefault();
            onDismiss();
          }
        });
        React12.useEffect(() => {
          if (!isHighestLayer) {
            return;
          }
          ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });
          return () => ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
        }, [ownerDocument, isHighestLayer, handleKeyDown]);
        React12.useEffect(() => {
          if (!node) return;
          if (disableOutsidePointerEvents) {
            if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
              originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
              ownerDocument.body.style.pointerEvents = "none";
            }
            context.layersWithOutsidePointerEventsDisabled.add(node);
          }
          context.layers.add(node);
          dispatchUpdate();
          return () => {
            if (disableOutsidePointerEvents) {
              context.layersWithOutsidePointerEventsDisabled.delete(node);
              if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
                ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
              }
            }
          };
        }, [node, ownerDocument, disableOutsidePointerEvents, context]);
        React12.useEffect(() => {
          return () => {
            if (!node) return;
            context.layers.delete(node);
            context.layersWithOutsidePointerEventsDisabled.delete(node);
            dispatchUpdate();
          };
        }, [node, context]);
        React12.useEffect(() => {
          const handleUpdate = /* @__PURE__ */ __name12(() => force({}), "handleUpdate");
          document.addEventListener(CONTEXT_UPDATE, handleUpdate);
          return () => document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
        }, []);
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          Primitive.div,
          {
            ...layerProps,
            ref: composedRefs,
            style: {
              pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0,
              ...props.style
            },
            onFocusCapture: composeEventHandlers(props.onFocusCapture, focusOutside.onFocusCapture),
            onBlurCapture: composeEventHandlers(props.onBlurCapture, focusOutside.onBlurCapture),
            onPointerDownCapture: composeEventHandlers(
              props.onPointerDownCapture,
              pointerDownOutside.onPointerDownCapture
            )
          }
        );
      }, "DismissableLayer")
    );
    function useDismissableLayerSurface() {
      const context = React12.useContext(DismissableLayerContext);
      const [node, setNode] = React12.useState(null);
      React12.useEffect(() => {
        if (!node) {
          return;
        }
        context.dismissableSurfaces.add(node);
        return () => {
          context.dismissableSurfaces.delete(node);
        };
      }, [node, context.dismissableSurfaces]);
      return setNode;
    }
    __name12(useDismissableLayerSurface, "useDismissableLayerSurface");
    var IS_TRUE = /* @__PURE__ */ __name12(() => true, "IS_TRUE");
    function usePointerDownOutside(onPointerDownOutside, args) {
      const {
        ownerDocument = globalThis?.document,
        deferPointerDownOutside = false,
        isDeferredPointerDownOutsideRef,
        dismissableSurfaces,
        shouldHandlePointerDownOutside = IS_TRUE
      } = args;
      const handlePointerDownOutside = useCallbackRef(onPointerDownOutside);
      const isPointerInsideReactTreeRef = React12.useRef(false);
      const isPointerDownOutsideRef = React12.useRef(false);
      const interceptedOutsideInteractionEventsRef = React12.useRef(/* @__PURE__ */ new Map());
      const handleClickRef = React12.useRef(() => {
      });
      React12.useEffect(() => {
        function resetOutsideInteraction() {
          isPointerDownOutsideRef.current = false;
          isDeferredPointerDownOutsideRef.current = false;
          interceptedOutsideInteractionEventsRef.current.clear();
        }
        __name12(resetOutsideInteraction, "resetOutsideInteraction");
        function isOutsideInteractionIntercepted() {
          return Array.from(interceptedOutsideInteractionEventsRef.current.values()).some(Boolean);
        }
        __name12(isOutsideInteractionIntercepted, "isOutsideInteractionIntercepted");
        function handleInteractionCapture(event) {
          if (!isPointerDownOutsideRef.current) {
            return;
          }
          const target = event.target;
          const isDismissableSurface = target instanceof Node && [...dismissableSurfaces].some((surface) => surface.contains(target));
          if (!isDismissableSurface) {
            interceptedOutsideInteractionEventsRef.current.set(event.type, true);
          }
          if (event.type === "click") {
            window.setTimeout(() => {
              if (isPointerDownOutsideRef.current) {
                handleClickRef.current();
              }
            }, 0);
          }
        }
        __name12(handleInteractionCapture, "handleInteractionCapture");
        function handleInteractionBubble(event) {
          if (isPointerDownOutsideRef.current) {
            interceptedOutsideInteractionEventsRef.current.set(event.type, false);
          }
        }
        __name12(handleInteractionBubble, "handleInteractionBubble");
        const handlePointerDown = /* @__PURE__ */ __name12((event) => {
          if (event.target && !isPointerInsideReactTreeRef.current) {
            let handleAndDispatchPointerDownOutsideEvent2 = function() {
              ownerDocument.removeEventListener("click", handleClickRef.current);
              const wasOutsideInteractionIntercepted = isOutsideInteractionIntercepted();
              resetOutsideInteraction();
              if (!wasOutsideInteractionIntercepted) {
                handleAndDispatchCustomEvent(
                  POINTER_DOWN_OUTSIDE,
                  handlePointerDownOutside,
                  eventDetail,
                  { discrete: true }
                );
              }
            };
            var handleAndDispatchPointerDownOutsideEvent = handleAndDispatchPointerDownOutsideEvent2;
            __name12(handleAndDispatchPointerDownOutsideEvent2, "handleAndDispatchPointerDownOutsideEvent");
            if (!shouldHandlePointerDownOutside(event.target)) {
              ownerDocument.removeEventListener("click", handleClickRef.current);
              resetOutsideInteraction();
              isPointerInsideReactTreeRef.current = false;
              return;
            }
            const eventDetail = { originalEvent: event };
            isPointerDownOutsideRef.current = true;
            isDeferredPointerDownOutsideRef.current = deferPointerDownOutside && event.button === 0;
            interceptedOutsideInteractionEventsRef.current.clear();
            if (!deferPointerDownOutside || event.button !== 0) {
              handleAndDispatchPointerDownOutsideEvent2();
            } else {
              ownerDocument.removeEventListener("click", handleClickRef.current);
              handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
              ownerDocument.addEventListener("click", handleClickRef.current, { once: true });
            }
          } else {
            ownerDocument.removeEventListener("click", handleClickRef.current);
            resetOutsideInteraction();
          }
          isPointerInsideReactTreeRef.current = false;
        }, "handlePointerDown");
        const outsideInteractionEvents = [
          "pointerup",
          "mousedown",
          "mouseup",
          "touchstart",
          "touchend",
          "click"
        ];
        for (const eventName of outsideInteractionEvents) {
          ownerDocument.addEventListener(eventName, handleInteractionCapture, true);
          ownerDocument.addEventListener(eventName, handleInteractionBubble);
        }
        const timerId = window.setTimeout(() => {
          ownerDocument.addEventListener("pointerdown", handlePointerDown);
        }, 0);
        return () => {
          window.clearTimeout(timerId);
          ownerDocument.removeEventListener("pointerdown", handlePointerDown);
          ownerDocument.removeEventListener("click", handleClickRef.current);
          for (const eventName of outsideInteractionEvents) {
            ownerDocument.removeEventListener(eventName, handleInteractionCapture, true);
            ownerDocument.removeEventListener(eventName, handleInteractionBubble);
          }
        };
      }, [
        ownerDocument,
        handlePointerDownOutside,
        deferPointerDownOutside,
        isDeferredPointerDownOutsideRef,
        dismissableSurfaces,
        shouldHandlePointerDownOutside
      ]);
      return {
        // ensures we check React component tree (not just DOM tree)
        onPointerDownCapture: /* @__PURE__ */ __name12(() => isPointerInsideReactTreeRef.current = true, "onPointerDownCapture")
      };
    }
    __name12(usePointerDownOutside, "usePointerDownOutside");
    function useFocusOutside(onFocusOutside, ownerDocument = globalThis?.document) {
      const handleFocusOutside = useCallbackRef(onFocusOutside);
      const isFocusInsideReactTreeRef = React12.useRef(false);
      React12.useEffect(() => {
        const handleFocus = /* @__PURE__ */ __name12((event) => {
          if (event.target && !isFocusInsideReactTreeRef.current) {
            const eventDetail = { originalEvent: event };
            handleAndDispatchCustomEvent(FOCUS_OUTSIDE, handleFocusOutside, eventDetail, {
              discrete: false
            });
          }
        }, "handleFocus");
        ownerDocument.addEventListener("focusin", handleFocus);
        return () => ownerDocument.removeEventListener("focusin", handleFocus);
      }, [ownerDocument, handleFocusOutside]);
      return {
        onFocusCapture: /* @__PURE__ */ __name12(() => isFocusInsideReactTreeRef.current = true, "onFocusCapture"),
        onBlurCapture: /* @__PURE__ */ __name12(() => isFocusInsideReactTreeRef.current = false, "onBlurCapture")
      };
    }
    __name12(useFocusOutside, "useFocusOutside");
    function dispatchUpdate() {
      const event = new CustomEvent(CONTEXT_UPDATE);
      document.dispatchEvent(event);
    }
    __name12(dispatchUpdate, "dispatchUpdate");
    function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
      const target = detail.originalEvent.target;
      const event = new CustomEvent(name, { bubbles: false, cancelable: true, detail });
      if (handler) target.addEventListener(name, handler, { once: true });
      if (discrete) {
        dispatchDiscreteCustomEvent(target, event);
      } else {
        target.dispatchEvent(event);
      }
    }
    __name12(handleAndDispatchCustomEvent, "handleAndDispatchCustomEvent");

    // node_modules/@radix-ui/react-focus-scope/dist/index.mjs
    var React13 = __toESM(require("react"), 1);
    var import_jsx_runtime5 = require("react/jsx-runtime");
    var __defProp14 = Object.defineProperty;
    var __name13 = (target, value) => __defProp14(target, "name", { value, configurable: true });
    var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
    var AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
    var EVENT_OPTIONS = { bubbles: false, cancelable: true };
    var FocusScope = /* @__PURE__ */ React13.forwardRef(
      /* @__PURE__ */ __name13(function FocusScope2(props, forwardedRef) {
        const {
          loop = false,
          trapped = false,
          branches,
          onMountAutoFocus: onMountAutoFocusProp,
          onUnmountAutoFocus: onUnmountAutoFocusProp,
          ...scopeProps
        } = props;
        const [container, setContainer] = React13.useState(null);
        const onMountAutoFocus = useCallbackRef(onMountAutoFocusProp);
        const onUnmountAutoFocus = useCallbackRef(onUnmountAutoFocusProp);
        const lastFocusedElementRef = React13.useRef(null);
        const composedRefs = useComposedRefs(forwardedRef, setContainer);
        const branchesRef = React13.useRef(branches);
        React13.useEffect(() => {
          branchesRef.current = branches;
        });
        const isTargetInScope = React13.useCallback(
          (target) => {
            if (!target) return false;
            if (container?.contains(target)) return true;
            return Boolean(branchesRef.current?.some((branch) => branch.contains(target)));
          },
          [container]
        );
        const focusScope = React13.useRef({
          paused: false,
          pause() {
            this.paused = true;
          },
          resume() {
            this.paused = false;
          }
        }).current;
        React13.useEffect(() => {
          if (trapped) {
            let handleFocusIn2 = function(event) {
              if (focusScope.paused || !container) return;
              const target = event.target;
              if (isTargetInScope(target)) {
                lastFocusedElementRef.current = target;
              } else {
                focus(lastFocusedElementRef.current, { select: true });
              }
            }, handleFocusOut2 = function(event) {
              if (focusScope.paused || !container) return;
              const relatedTarget = event.relatedTarget;
              if (relatedTarget === null) return;
              if (!isTargetInScope(relatedTarget)) {
                focus(lastFocusedElementRef.current, { select: true });
              }
            }, handleMutations2 = function(mutations) {
              const focusedElement = document.activeElement;
              if (focusedElement !== document.body) return;
              for (const mutation of mutations) {
                if (mutation.removedNodes.length > 0) focus(container);
              }
            };
            var handleFocusIn = handleFocusIn2, handleFocusOut = handleFocusOut2, handleMutations = handleMutations2;
            __name13(handleFocusIn2, "handleFocusIn");
            __name13(handleFocusOut2, "handleFocusOut");
            __name13(handleMutations2, "handleMutations");
            document.addEventListener("focusin", handleFocusIn2);
            document.addEventListener("focusout", handleFocusOut2);
            const mutationObserver = new MutationObserver(handleMutations2);
            if (container) mutationObserver.observe(container, { childList: true, subtree: true });
            return () => {
              document.removeEventListener("focusin", handleFocusIn2);
              document.removeEventListener("focusout", handleFocusOut2);
              mutationObserver.disconnect();
            };
          }
        }, [trapped, container, focusScope.paused, isTargetInScope]);
        React13.useEffect(() => {
          if (container) {
            focusScopesStack.add(focusScope);
            const previouslyFocusedElement = document.activeElement;
            const hasFocusedCandidate = container.contains(previouslyFocusedElement);
            if (!hasFocusedCandidate) {
              const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
              container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
              container.dispatchEvent(mountEvent);
              if (!mountEvent.defaultPrevented) {
                focusFirst(removeLinks(getTabbableCandidates(container)), { select: true });
                if (document.activeElement === previouslyFocusedElement) {
                  focus(container);
                }
              }
            }
            return () => {
              container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
              const ownerDocument = container.ownerDocument;
              const UnmountEvent = CustomEvent;
              setTimeout(() => {
                const unmountEvent = new UnmountEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
                container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
                container.dispatchEvent(unmountEvent);
                if (!unmountEvent.defaultPrevented) {
                  focus(previouslyFocusedElement ?? ownerDocument.body, { select: true });
                }
                container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
                focusScopesStack.remove(focusScope);
              }, 0);
            };
          }
        }, [container, onMountAutoFocus, onUnmountAutoFocus, focusScope]);
        const handleKeyDown = React13.useCallback(
          (event) => {
            if (!loop && !trapped) return;
            if (focusScope.paused) return;
            const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
            const focusedElement = document.activeElement;
            if (isTabKey && focusedElement) {
              const container2 = event.currentTarget;
              const [first, last] = getTabbableEdges(container2);
              const hasTabbableElementsInside = first && last;
              if (!hasTabbableElementsInside) {
                if (focusedElement === container2) event.preventDefault();
              } else {
                if (!event.shiftKey && focusedElement === last) {
                  event.preventDefault();
                  if (loop) focus(first, { select: true });
                } else if (event.shiftKey && focusedElement === first) {
                  event.preventDefault();
                  if (loop) focus(last, { select: true });
                }
              }
            }
          },
          [loop, trapped, focusScope.paused]
        );
        return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Primitive.div, { tabIndex: -1, ...scopeProps, ref: composedRefs, onKeyDown: handleKeyDown });
      }, "FocusScope")
    );
    var FocusScopeBranchContext = React13.createContext(null);
    function FocusScopeBranchProvider({ registry, children }) {
      if (!registry) {
        return children;
      }
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(FocusScopeBranchContext.Provider, { value: registry, children });
    }
    __name13(FocusScopeBranchProvider, "FocusScopeBranchProvider");
    function useFocusScopeBranchRegistry() {
      const [nodes, setNodes] = React13.useState([]);
      const registry = React13.useMemo(
        () => ({
          add: /* @__PURE__ */ __name13((node) => setNodes((prev) => prev.includes(node) ? prev : [...prev, node]), "add"),
          remove: /* @__PURE__ */ __name13((node) => setNodes((prev) => prev.filter((current) => current !== node)), "remove")
        }),
        []
      );
      return { nodes, registry };
    }
    __name13(useFocusScopeBranchRegistry, "useFocusScopeBranchRegistry");
    function useFocusScopeBranch(node) {
      const registry = React13.useContext(FocusScopeBranchContext);
      React13.useEffect(() => {
        if (!node || !registry) return;
        registry.add(node);
        return () => registry.remove(node);
      }, [node, registry]);
    }
    __name13(useFocusScopeBranch, "useFocusScopeBranch");
    function focusFirst(candidates, { select = false } = {}) {
      const previouslyFocusedElement = document.activeElement;
      for (const candidate of candidates) {
        focus(candidate, { select });
        if (document.activeElement !== previouslyFocusedElement) return;
      }
    }
    __name13(focusFirst, "focusFirst");
    function getTabbableEdges(container) {
      const candidates = getTabbableCandidates(container);
      const first = findVisible(candidates, container);
      const last = findVisible(candidates.reverse(), container);
      return [first, last];
    }
    __name13(getTabbableEdges, "getTabbableEdges");
    function getTabbableCandidates(container) {
      const nodes = [];
      const document2 = container.ownerDocument;
      const walker = document2.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
        acceptNode: /* @__PURE__ */ __name13((node) => {
          const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
          if (node.disabled || node.hidden || isHiddenInput) {
            return NodeFilter.FILTER_SKIP;
          }
          return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }, "acceptNode")
      });
      while (walker.nextNode()) {
        nodes.push(walker.currentNode);
      }
      return nodes;
    }
    __name13(getTabbableCandidates, "getTabbableCandidates");
    function findVisible(elements, container) {
      const canUseCheckVisibility = typeof container.checkVisibility === "function" && container.checkVisibility({ checkVisibilityCSS: true });
      for (const element of elements) {
        const hidden = canUseCheckVisibility ? !element.checkVisibility({ checkVisibilityCSS: true }) : isHidden(element, { upTo: container });
        if (!hidden) {
          return element;
        }
      }
    }
    __name13(findVisible, "findVisible");
    function isHidden(node, { upTo }) {
      if (getComputedStyle(node).visibility === "hidden") return true;
      while (node) {
        if (upTo !== void 0 && node === upTo) return false;
        if (getComputedStyle(node).display === "none") return true;
        node = node.parentElement;
      }
      return false;
    }
    __name13(isHidden, "isHidden");
    function isSelectableInput(element) {
      return element.tagName === "INPUT" && typeof element.select === "function";
    }
    __name13(isSelectableInput, "isSelectableInput");
    function focus(element, { select = false } = {}) {
      if (element && element.focus) {
        const ownerDocument = element.ownerDocument ?? document;
        const previouslyFocusedElement = ownerDocument.activeElement;
        element.focus({ preventScroll: true });
        if (element !== previouslyFocusedElement && isSelectableInput(element) && select)
          element.select();
      }
    }
    __name13(focus, "focus");
    var focusScopesStack = createFocusScopesStack();
    function createFocusScopesStack() {
      let stack = [];
      return {
        add(focusScope) {
          const activeFocusScope = stack[0];
          if (focusScope !== activeFocusScope) {
            activeFocusScope?.pause();
          }
          stack = arrayRemove(stack, focusScope);
          stack.unshift(focusScope);
        },
        remove(focusScope) {
          stack = arrayRemove(stack, focusScope);
          stack[0]?.resume();
        }
      };
    }
    __name13(createFocusScopesStack, "createFocusScopesStack");
    function arrayRemove(array, item) {
      const updatedArray = [...array];
      const index = updatedArray.indexOf(item);
      if (index !== -1) {
        updatedArray.splice(index, 1);
      }
      return updatedArray;
    }
    __name13(arrayRemove, "arrayRemove");
    function removeLinks(items) {
      return items.filter((item) => item.tagName !== "A");
    }
    __name13(removeLinks, "removeLinks");

    // node_modules/@radix-ui/react-portal/dist/index.mjs
    var React14 = __toESM(require("react"), 1);
    var ReactDOM2 = __toESM(require("react-dom"), 1);
    var import_jsx_runtime6 = require("react/jsx-runtime");
    var __defProp15 = Object.defineProperty;
    var __name14 = (target, value) => __defProp15(target, "name", { value, configurable: true });
    var Portal = /* @__PURE__ */ React14.forwardRef(
      /* @__PURE__ */ __name14(function Portal2(props, forwardedRef) {
        const { container: containerProp, ...portalProps } = props;
        const [mounted, setMounted] = React14.useState(false);
        useLayoutEffect2(() => setMounted(true), []);
        const container = containerProp || mounted && globalThis?.document?.body;
        return container ? ReactDOM2.createPortal(/* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Primitive.div, { ...portalProps, ref: forwardedRef }), container) : null;
      }, "Portal")
    );

    // node_modules/@radix-ui/react-presence/dist/index.mjs
    var React23 = __toESM(require("react"), 1);
    var React15 = __toESM(require("react"), 1);
    var __defProp16 = Object.defineProperty;
    var __name15 = (target, value) => __defProp16(target, "name", { value, configurable: true });
    function useStateMachine(initialState, machine) {
      return React15.useReducer((state, event) => {
        const nextState = machine[state][event];
        return nextState ?? state;
      }, initialState);
    }
    __name15(useStateMachine, "useStateMachine");
    var Presence = /* @__PURE__ */ __name15((props) => {
      const { present, children } = props;
      const presence = usePresence(present);
      const child = typeof children === "function" ? children({ present: presence.isPresent }) : React23.Children.only(children);
      const ref = useStableComposedRefs(presence.ref, getElementRef2(child));
      const forceMount = typeof children === "function";
      return forceMount || presence.isPresent ? React23.cloneElement(child, { ref }) : null;
    }, "Presence");
    function usePresence(present) {
      const [node, setNode] = React23.useState();
      const stylesRef = React23.useRef(null);
      const prevPresentRef = React23.useRef(present);
      const prevAnimationNameRef = React23.useRef("none");
      const mountAnimationNameRef = React23.useRef(void 0);
      const initialState = present ? "mounted" : "unmounted";
      const [state, send] = useStateMachine(initialState, {
        mounted: {
          UNMOUNT: "unmounted",
          ANIMATION_OUT: "unmountSuspended"
        },
        unmountSuspended: {
          MOUNT: "mounted",
          ANIMATION_END: "unmounted"
        },
        unmounted: {
          MOUNT: "mounted"
        }
      });
      React23.useEffect(() => {
        if (state === "mounted") {
          prevAnimationNameRef.current = mountAnimationNameRef.current ?? getAnimationName(stylesRef.current);
          mountAnimationNameRef.current = void 0;
        } else {
          prevAnimationNameRef.current = "none";
        }
      }, [state]);
      useLayoutEffect2(() => {
        const styles = stylesRef.current;
        const wasPresent = prevPresentRef.current;
        const hasPresentChanged = wasPresent !== present;
        if (hasPresentChanged) {
          const prevAnimationName = prevAnimationNameRef.current;
          const currentAnimationName = getAnimationName(styles);
          if (present) {
            mountAnimationNameRef.current = currentAnimationName;
            send("MOUNT");
          } else if (currentAnimationName === "none" || styles?.display === "none") {
            send("UNMOUNT");
          } else {
            const isAnimating = prevAnimationName !== currentAnimationName;
            if (wasPresent && isAnimating) {
              send("ANIMATION_OUT");
            } else {
              send("UNMOUNT");
            }
          }
          prevPresentRef.current = present;
        }
      }, [present, send]);
      useLayoutEffect2(() => {
        if (node) {
          let timeoutId;
          const ownerWindow = node.ownerDocument.defaultView ?? window;
          const handleAnimationEnd = /* @__PURE__ */ __name15((event) => {
            const currentAnimationName = getAnimationName(stylesRef.current);
            const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
            if (event.target === node && isCurrentAnimation) {
              send("ANIMATION_END");
              if (!prevPresentRef.current) {
                const currentFillMode = node.style.animationFillMode;
                node.style.animationFillMode = "forwards";
                timeoutId = ownerWindow.setTimeout(() => {
                  if (node.style.animationFillMode === "forwards") {
                    node.style.animationFillMode = currentFillMode;
                  }
                });
              }
            }
          }, "handleAnimationEnd");
          const handleAnimationStart = /* @__PURE__ */ __name15((event) => {
            if (event.target === node) {
              prevAnimationNameRef.current = getAnimationName(stylesRef.current);
            }
          }, "handleAnimationStart");
          node.addEventListener("animationstart", handleAnimationStart);
          node.addEventListener("animationcancel", handleAnimationEnd);
          node.addEventListener("animationend", handleAnimationEnd);
          return () => {
            ownerWindow.clearTimeout(timeoutId);
            node.removeEventListener("animationstart", handleAnimationStart);
            node.removeEventListener("animationcancel", handleAnimationEnd);
            node.removeEventListener("animationend", handleAnimationEnd);
          };
        } else {
          send("ANIMATION_END");
        }
      }, [node, send]);
      return {
        isPresent: ["mounted", "unmountSuspended"].includes(state),
        ref: React23.useCallback((node2) => {
          if (node2) {
            const styles = getComputedStyle(node2);
            stylesRef.current = styles;
            mountAnimationNameRef.current = getAnimationName(styles);
          } else {
            stylesRef.current = null;
          }
          setNode(node2);
        }, [])
      };
    }
    __name15(usePresence, "usePresence");
    function setRef2(ref, value) {
      if (typeof ref === "function") {
        return ref(value);
      } else if (ref !== null && ref !== void 0) {
        ref.current = value;
      }
    }
    __name15(setRef2, "setRef");
    function useStableComposedRefs(...refs) {
      const refsRef = React23.useRef(refs);
      refsRef.current = refs;
      return React23.useCallback((node) => {
        const currentRefs = refsRef.current;
        let hasCleanup = false;
        const cleanups = currentRefs.map((ref) => {
          const cleanup = setRef2(ref, node);
          if (!hasCleanup && typeof cleanup === "function") {
            hasCleanup = true;
          }
          return cleanup;
        });
        if (hasCleanup) {
          return () => {
            for (let i = 0; i < cleanups.length; i++) {
              const cleanup = cleanups[i];
              if (typeof cleanup === "function") {
                cleanup();
              } else {
                setRef2(currentRefs[i], null);
              }
            }
          };
        }
      }, []);
    }
    __name15(useStableComposedRefs, "useStableComposedRefs");
    function getAnimationName(styles) {
      return styles?.animationName || "none";
    }
    __name15(getAnimationName, "getAnimationName");
    function getElementRef2(element) {
      let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
      let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
      if (mayWarn) {
        return element.ref;
      }
      getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
      mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
      if (mayWarn) {
        return element.props.ref;
      }
      return element.props.ref || element.ref;
    }
    __name15(getElementRef2, "getElementRef");

    // node_modules/@radix-ui/react-focus-guards/dist/index.mjs
    var React16 = __toESM(require("react"), 1);
    var __defProp17 = Object.defineProperty;
    var __name16 = (target, value) => __defProp17(target, "name", { value, configurable: true });
    var count2 = 0;
    var guards = null;
    function FocusGuards(props) {
      useFocusGuards();
      return props.children;
    }
    __name16(FocusGuards, "FocusGuards");
    function useFocusGuards() {
      React16.useEffect(() => {
        if (!guards) {
          guards = { start: createFocusGuard(), end: createFocusGuard() };
        }
        const { start, end } = guards;
        if (document.body.firstElementChild !== start) {
          document.body.insertAdjacentElement("afterbegin", start);
        }
        if (document.body.lastElementChild !== end) {
          document.body.insertAdjacentElement("beforeend", end);
        }
        count2++;
        return () => {
          if (count2 === 1) {
            guards?.start.remove();
            guards?.end.remove();
            guards = null;
          }
          count2 = Math.max(0, count2 - 1);
        };
      }, []);
    }
    __name16(useFocusGuards, "useFocusGuards");
    function createFocusGuard() {
      const element = document.createElement("span");
      element.setAttribute("data-radix-focus-guard", "");
      element.tabIndex = 0;
      element.style.outline = "none";
      element.style.opacity = "0";
      element.style.position = "fixed";
      element.style.pointerEvents = "none";
      return element;
    }
    __name16(createFocusGuard, "createFocusGuard");

    // node_modules/tslib/tslib.es6.mjs
    var __assign = function() {
      __assign = Object.assign || function __assign2(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    }
    function __spreadArray(to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
      return to.concat(ar || Array.prototype.slice.call(from));
    }

    // node_modules/react-remove-scroll/dist/es2015/Combination.js
    var React25 = __toESM(require("react"));

    // node_modules/react-remove-scroll/dist/es2015/UI.js
    var React19 = __toESM(require("react"));

    // node_modules/react-remove-scroll-bar/dist/es2015/constants.js
    var zeroRightClassName = "right-scroll-bar-position";
    var fullWidthClassName = "width-before-scroll-bar";
    var noScrollbarsClassName = "with-scroll-bars-hidden";
    var removedBarSizeVariable = "--removed-body-scroll-bar-size";

    // node_modules/use-callback-ref/dist/es2015/assignRef.js
    function assignRef(ref, value) {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref) {
        ref.current = value;
      }
      return ref;
    }

    // node_modules/use-callback-ref/dist/es2015/useRef.js
    var import_react = require("react");
    function useCallbackRef2(initialValue, callback) {
      var ref = (0, import_react.useState)(function() {
        return {
          // value
          value: initialValue,
          // last callback
          callback,
          // "memoized" public interface
          facade: {
            get current() {
              return ref.value;
            },
            set current(value) {
              var last = ref.value;
              if (last !== value) {
                ref.value = value;
                ref.callback(value, last);
              }
            }
          }
        };
      })[0];
      ref.callback = callback;
      return ref.facade;
    }

    // node_modules/use-callback-ref/dist/es2015/useMergeRef.js
    var React17 = __toESM(require("react"));
    var useIsomorphicLayoutEffect = typeof window !== "undefined" ? React17.useLayoutEffect : React17.useEffect;
    var currentValues = /* @__PURE__ */ new WeakMap();
    function useMergeRefs(refs, defaultValue) {
      var callbackRef = useCallbackRef2(defaultValue || null, function(newValue) {
        return refs.forEach(function(ref) {
          return assignRef(ref, newValue);
        });
      });
      useIsomorphicLayoutEffect(function() {
        var oldValue = currentValues.get(callbackRef);
        if (oldValue) {
          var prevRefs_1 = new Set(oldValue);
          var nextRefs_1 = new Set(refs);
          var current_1 = callbackRef.current;
          prevRefs_1.forEach(function(ref) {
            if (!nextRefs_1.has(ref)) {
              assignRef(ref, null);
            }
          });
          nextRefs_1.forEach(function(ref) {
            if (!prevRefs_1.has(ref)) {
              assignRef(ref, current_1);
            }
          });
        }
        currentValues.set(callbackRef, refs);
      }, [refs]);
      return callbackRef;
    }

    // node_modules/use-sidecar/dist/es2015/medium.js
    function ItoI(a) {
      return a;
    }
    function innerCreateMedium(defaults, middleware) {
      if (middleware === void 0) {
        middleware = ItoI;
      }
      var buffer = [];
      var assigned = false;
      var medium = {
        read: function() {
          if (assigned) {
            throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
          }
          if (buffer.length) {
            return buffer[buffer.length - 1];
          }
          return defaults;
        },
        useMedium: function(data) {
          var item = middleware(data, assigned);
          buffer.push(item);
          return function() {
            buffer = buffer.filter(function(x) {
              return x !== item;
            });
          };
        },
        assignSyncMedium: function(cb) {
          assigned = true;
          while (buffer.length) {
            var cbs = buffer;
            buffer = [];
            cbs.forEach(cb);
          }
          buffer = {
            push: function(x) {
              return cb(x);
            },
            filter: function() {
              return buffer;
            }
          };
        },
        assignMedium: function(cb) {
          assigned = true;
          var pendingQueue = [];
          if (buffer.length) {
            var cbs = buffer;
            buffer = [];
            cbs.forEach(cb);
            pendingQueue = buffer;
          }
          var executeQueue = function() {
            var cbs2 = pendingQueue;
            pendingQueue = [];
            cbs2.forEach(cb);
          };
          var cycle = function() {
            return Promise.resolve().then(executeQueue);
          };
          cycle();
          buffer = {
            push: function(x) {
              pendingQueue.push(x);
              cycle();
            },
            filter: function(filter) {
              pendingQueue = pendingQueue.filter(filter);
              return buffer;
            }
          };
        }
      };
      return medium;
    }
    function createSidecarMedium(options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      var medium = innerCreateMedium(null);
      medium.options = __assign({ async: true, ssr: false }, options2);
      return medium;
    }

    // node_modules/use-sidecar/dist/es2015/exports.js
    var React18 = __toESM(require("react"));
    var SideCar = function(_a2) {
      var sideCar = _a2.sideCar, rest = __rest(_a2, ["sideCar"]);
      if (!sideCar) {
        throw new Error("Sidecar: please provide `sideCar` property to import the right car");
      }
      var Target = sideCar.read();
      if (!Target) {
        throw new Error("Sidecar medium not found");
      }
      return React18.createElement(Target, __assign({}, rest));
    };
    SideCar.isSideCarExport = true;
    function exportSidecar(medium, exported) {
      medium.useMedium(exported);
      return SideCar;
    }

    // node_modules/react-remove-scroll/dist/es2015/medium.js
    var effectCar = createSidecarMedium();

    // node_modules/react-remove-scroll/dist/es2015/UI.js
    var nothing = function() {
      return;
    };
    var RemoveScroll = React19.forwardRef(function(props, parentRef) {
      var ref = React19.useRef(null);
      var _a2 = React19.useState({
        onScrollCapture: nothing,
        onWheelCapture: nothing,
        onTouchMoveCapture: nothing
      }), callbacks = _a2[0], setCallbacks = _a2[1];
      var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noRelative = props.noRelative, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container = _b === void 0 ? "div" : _b, gapMode = props.gapMode, rest = __rest(props, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]);
      var SideCar2 = sideCar;
      var containerRef = useMergeRefs([ref, parentRef]);
      var containerProps = __assign(__assign({}, rest), callbacks);
      return React19.createElement(
        React19.Fragment,
        null,
        enabled && React19.createElement(SideCar2, { sideCar: effectCar, removeScrollBar, shards, noRelative, noIsolation, inert, setCallbacks, allowPinchZoom: !!allowPinchZoom, lockRef: ref, gapMode }),
        forwardProps ? React19.cloneElement(React19.Children.only(children), __assign(__assign({}, containerProps), { ref: containerRef })) : React19.createElement(Container, __assign({}, containerProps, { className, ref: containerRef }), children)
      );
    });
    RemoveScroll.defaultProps = {
      enabled: true,
      removeScrollBar: true,
      inert: false
    };
    RemoveScroll.classNames = {
      fullWidth: fullWidthClassName,
      zeroRight: zeroRightClassName
    };

    // node_modules/react-remove-scroll/dist/es2015/SideEffect.js
    var React24 = __toESM(require("react"));

    // node_modules/react-remove-scroll-bar/dist/es2015/component.js
    var React21 = __toESM(require("react"));

    // node_modules/react-style-singleton/dist/es2015/hook.js
    var React20 = __toESM(require("react"));

    // node_modules/get-nonce/dist/es2015/index.js
    var currentNonce;
    var getNonce = function() {
      if (currentNonce) {
        return currentNonce;
      }
      if (typeof __webpack_nonce__ !== "undefined") {
        return __webpack_nonce__;
      }
      return void 0;
    };

    // node_modules/react-style-singleton/dist/es2015/singleton.js
    function makeStyleTag() {
      if (!document)
        return null;
      var tag = document.createElement("style");
      tag.type = "text/css";
      var nonce = getNonce();
      if (nonce) {
        tag.setAttribute("nonce", nonce);
      }
      return tag;
    }
    function injectStyles(tag, css) {
      if (tag.styleSheet) {
        tag.styleSheet.cssText = css;
      } else {
        tag.appendChild(document.createTextNode(css));
      }
    }
    function insertStyleTag(tag) {
      var head = document.head || document.getElementsByTagName("head")[0];
      head.appendChild(tag);
    }
    var stylesheetSingleton = function() {
      var counter = 0;
      var stylesheet = null;
      return {
        add: function(style) {
          if (counter == 0) {
            if (stylesheet = makeStyleTag()) {
              injectStyles(stylesheet, style);
              insertStyleTag(stylesheet);
            }
          }
          counter++;
        },
        remove: function() {
          counter--;
          if (!counter && stylesheet) {
            stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
            stylesheet = null;
          }
        }
      };
    };

    // node_modules/react-style-singleton/dist/es2015/hook.js
    var styleHookSingleton = function() {
      var sheet = stylesheetSingleton();
      return function(styles, isDynamic) {
        React20.useEffect(function() {
          sheet.add(styles);
          return function() {
            sheet.remove();
          };
        }, [styles && isDynamic]);
      };
    };

    // node_modules/react-style-singleton/dist/es2015/component.js
    var styleSingleton = function() {
      var useStyle = styleHookSingleton();
      var Sheet = function(_a2) {
        var styles = _a2.styles, dynamic = _a2.dynamic;
        useStyle(styles, dynamic);
        return null;
      };
      return Sheet;
    };

    // node_modules/react-remove-scroll-bar/dist/es2015/utils.js
    var zeroGap = {
      left: 0,
      top: 0,
      right: 0,
      gap: 0
    };
    var parse = function(x) {
      return parseInt(x || "", 10) || 0;
    };
    var getOffset = function(gapMode) {
      var cs = window.getComputedStyle(document.body);
      var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
      var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
      var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
      return [parse(left), parse(top), parse(right)];
    };
    var getGapWidth = function(gapMode) {
      if (gapMode === void 0) {
        gapMode = "margin";
      }
      if (typeof window === "undefined") {
        return zeroGap;
      }
      var offsets = getOffset(gapMode);
      var documentWidth = document.documentElement.clientWidth;
      var windowWidth = window.innerWidth;
      return {
        left: offsets[0],
        top: offsets[1],
        right: offsets[2],
        gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0])
      };
    };

    // node_modules/react-remove-scroll-bar/dist/es2015/component.js
    var Style = styleSingleton();
    var lockAttribute = "data-scroll-locked";
    var getStyles = function(_a2, allowRelative, gapMode, important) {
      var left = _a2.left, top = _a2.top, right = _a2.right, gap = _a2.gap;
      if (gapMode === void 0) {
        gapMode = "margin";
      }
      return "\n  .".concat(noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body[").concat(lockAttribute, "] {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
        allowRelative && "position: relative ".concat(important, ";"),
        gapMode === "margin" && "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
        gapMode === "padding" && "padding-right: ".concat(gap, "px ").concat(important, ";")
      ].filter(Boolean).join(""), "\n  }\n  \n  .").concat(zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(zeroRightClassName, " .").concat(zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " .").concat(fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body[").concat(lockAttribute, "] {\n    ").concat(removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
    };
    var getCurrentUseCounter = function() {
      var counter = parseInt(document.body.getAttribute(lockAttribute) || "0", 10);
      return isFinite(counter) ? counter : 0;
    };
    var useLockAttribute = function() {
      React21.useEffect(function() {
        document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString());
        return function() {
          var newCounter = getCurrentUseCounter() - 1;
          if (newCounter <= 0) {
            document.body.removeAttribute(lockAttribute);
          } else {
            document.body.setAttribute(lockAttribute, newCounter.toString());
          }
        };
      }, []);
    };
    var RemoveScrollBar = function(_a2) {
      var noRelative = _a2.noRelative, noImportant = _a2.noImportant, _b = _a2.gapMode, gapMode = _b === void 0 ? "margin" : _b;
      useLockAttribute();
      var gap = React21.useMemo(function() {
        return getGapWidth(gapMode);
      }, [gapMode]);
      return React21.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : "") });
    };

    // node_modules/react-remove-scroll/dist/es2015/aggresiveCapture.js
    var passiveSupported = false;
    if (typeof window !== "undefined") {
      try {
        options = Object.defineProperty({}, "passive", {
          get: function() {
            passiveSupported = true;
            return true;
          }
        });
        window.addEventListener("test", options, options);
        window.removeEventListener("test", options, options);
      } catch (err) {
        passiveSupported = false;
      }
    }
    var options;
    var nonPassive = passiveSupported ? { passive: false } : false;

    // node_modules/react-remove-scroll/dist/es2015/handleScroll.js
    var alwaysContainsScroll = function(node) {
      return node.tagName === "TEXTAREA";
    };
    var elementCanBeScrolled = function(node, overflow) {
      if (!(node instanceof Element)) {
        return false;
      }
      var styles = window.getComputedStyle(node);
      return (
        // not-not-scrollable
        styles[overflow] !== "hidden" && // contains scroll inside self
        !(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node) && styles[overflow] === "visible")
      );
    };
    var elementCouldBeVScrolled = function(node) {
      return elementCanBeScrolled(node, "overflowY");
    };
    var elementCouldBeHScrolled = function(node) {
      return elementCanBeScrolled(node, "overflowX");
    };
    var locationCouldBeScrolled = function(axis, node) {
      var ownerDocument = node.ownerDocument;
      var current = node;
      do {
        if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) {
          current = current.host;
        }
        var isScrollable = elementCouldBeScrolled(axis, current);
        if (isScrollable) {
          var _a2 = getScrollVariables(axis, current), scrollHeight = _a2[1], clientHeight = _a2[2];
          if (scrollHeight > clientHeight) {
            return true;
          }
        }
        current = current.parentNode;
      } while (current && current !== ownerDocument.body);
      return false;
    };
    var getVScrollVariables = function(_a2) {
      var scrollTop = _a2.scrollTop, scrollHeight = _a2.scrollHeight, clientHeight = _a2.clientHeight;
      return [
        scrollTop,
        scrollHeight,
        clientHeight
      ];
    };
    var getHScrollVariables = function(_a2) {
      var scrollLeft = _a2.scrollLeft, scrollWidth = _a2.scrollWidth, clientWidth = _a2.clientWidth;
      return [
        scrollLeft,
        scrollWidth,
        clientWidth
      ];
    };
    var elementCouldBeScrolled = function(axis, node) {
      return axis === "v" ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
    };
    var getScrollVariables = function(axis, node) {
      return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
    };
    var getDirectionFactor = function(axis, direction) {
      return axis === "h" && direction === "rtl" ? -1 : 1;
    };
    var handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
      var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
      var delta = directionFactor * sourceDelta;
      var target = event.target;
      var targetInLock = endTarget.contains(target);
      var shouldCancelScroll = false;
      var isDeltaPositive = delta > 0;
      var availableScroll = 0;
      var availableScrollTop = 0;
      do {
        if (!target) {
          break;
        }
        var _a2 = getScrollVariables(axis, target), position = _a2[0], scroll_1 = _a2[1], capacity = _a2[2];
        var elementScroll = scroll_1 - capacity - directionFactor * position;
        if (position || elementScroll) {
          if (elementCouldBeScrolled(axis, target)) {
            availableScroll += elementScroll;
            availableScrollTop += position;
          }
        }
        var parent_1 = target.parentNode;
        target = parent_1 && parent_1.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? parent_1.host : parent_1;
      } while (
        // portaled content
        !targetInLock && target !== document.body || // self content
        targetInLock && (endTarget.contains(target) || endTarget === target)
      );
      if (isDeltaPositive && (noOverscroll && Math.abs(availableScroll) < 1 || !noOverscroll && delta > availableScroll)) {
        shouldCancelScroll = true;
      } else if (!isDeltaPositive && (noOverscroll && Math.abs(availableScrollTop) < 1 || !noOverscroll && -delta > availableScrollTop)) {
        shouldCancelScroll = true;
      }
      return shouldCancelScroll;
    };

    // node_modules/react-remove-scroll/dist/es2015/SideEffect.js
    var getTouchXY = function(event) {
      return "changedTouches" in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
    };
    var getDeltaXY = function(event) {
      return [event.deltaX, event.deltaY];
    };
    var extractRef = function(ref) {
      return ref && "current" in ref ? ref.current : ref;
    };
    var deltaCompare = function(x, y) {
      return x[0] === y[0] && x[1] === y[1];
    };
    var generateStyle = function(id) {
      return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n");
    };
    var idCounter = 0;
    var lockStack = [];
    function RemoveScrollSideCar(props) {
      var shouldPreventQueue = React24.useRef([]);
      var touchStartRef = React24.useRef([0, 0]);
      var activeAxis = React24.useRef();
      var id = React24.useState(idCounter++)[0];
      var Style2 = React24.useState(styleSingleton)[0];
      var lastProps = React24.useRef(props);
      React24.useEffect(function() {
        lastProps.current = props;
      }, [props]);
      React24.useEffect(function() {
        if (props.inert) {
          document.body.classList.add("block-interactivity-".concat(id));
          var allow_1 = __spreadArray([props.lockRef.current], (props.shards || []).map(extractRef), true).filter(Boolean);
          allow_1.forEach(function(el) {
            return el.classList.add("allow-interactivity-".concat(id));
          });
          return function() {
            document.body.classList.remove("block-interactivity-".concat(id));
            allow_1.forEach(function(el) {
              return el.classList.remove("allow-interactivity-".concat(id));
            });
          };
        }
        return;
      }, [props.inert, props.lockRef.current, props.shards]);
      var shouldCancelEvent = React24.useCallback(function(event, parent) {
        if ("touches" in event && event.touches.length === 2 || event.type === "wheel" && event.ctrlKey) {
          return !lastProps.current.allowPinchZoom;
        }
        var touch = getTouchXY(event);
        var touchStart = touchStartRef.current;
        var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
        var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
        var currentAxis;
        var target = event.target;
        var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
        if ("touches" in event && moveDirection === "h" && target.type === "range") {
          return false;
        }
        var selection = window.getSelection();
        var anchorNode = selection && selection.anchorNode;
        var isTouchingSelection = anchorNode ? anchorNode === target || anchorNode.contains(target) : false;
        if (isTouchingSelection) {
          return false;
        }
        var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
        if (!canBeScrolledInMainDirection) {
          return true;
        }
        if (canBeScrolledInMainDirection) {
          currentAxis = moveDirection;
        } else {
          currentAxis = moveDirection === "v" ? "h" : "v";
          canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
        }
        if (!canBeScrolledInMainDirection) {
          return false;
        }
        if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) {
          activeAxis.current = currentAxis;
        }
        if (!currentAxis) {
          return true;
        }
        var cancelingAxis = activeAxis.current || currentAxis;
        return handleScroll(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY, true);
      }, []);
      var shouldPrevent = React24.useCallback(function(_event) {
        var event = _event;
        if (!lockStack.length || lockStack[lockStack.length - 1] !== Style2) {
          return;
        }
        var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
        var sourceEvent = shouldPreventQueue.current.filter(function(e) {
          return e.name === event.type && (e.target === event.target || event.target === e.shadowParent) && deltaCompare(e.delta, delta);
        })[0];
        if (sourceEvent && sourceEvent.should) {
          if (event.cancelable) {
            event.preventDefault();
          }
          return;
        }
        if (!sourceEvent) {
          var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node) {
            return node.contains(event.target);
          });
          var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
          if (shouldStop) {
            if (event.cancelable) {
              event.preventDefault();
            }
          }
        }
      }, []);
      var shouldCancel = React24.useCallback(function(name, delta, target, should) {
        var event = { name, delta, target, should, shadowParent: getOutermostShadowParent(target) };
        shouldPreventQueue.current.push(event);
        setTimeout(function() {
          shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e) {
            return e !== event;
          });
        }, 1);
      }, []);
      var scrollTouchStart = React24.useCallback(function(event) {
        touchStartRef.current = getTouchXY(event);
        activeAxis.current = void 0;
      }, []);
      var scrollWheel = React24.useCallback(function(event) {
        shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
      }, []);
      var scrollTouchMove = React24.useCallback(function(event) {
        shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
      }, []);
      React24.useEffect(function() {
        lockStack.push(Style2);
        props.setCallbacks({
          onScrollCapture: scrollWheel,
          onWheelCapture: scrollWheel,
          onTouchMoveCapture: scrollTouchMove
        });
        document.addEventListener("wheel", shouldPrevent, nonPassive);
        document.addEventListener("touchmove", shouldPrevent, nonPassive);
        document.addEventListener("touchstart", scrollTouchStart, nonPassive);
        return function() {
          lockStack = lockStack.filter(function(inst) {
            return inst !== Style2;
          });
          document.removeEventListener("wheel", shouldPrevent, nonPassive);
          document.removeEventListener("touchmove", shouldPrevent, nonPassive);
          document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
        };
      }, []);
      var removeScrollBar = props.removeScrollBar, inert = props.inert;
      return React24.createElement(
        React24.Fragment,
        null,
        inert ? React24.createElement(Style2, { styles: generateStyle(id) }) : null,
        removeScrollBar ? React24.createElement(RemoveScrollBar, { noRelative: props.noRelative, gapMode: props.gapMode }) : null
      );
    }
    function getOutermostShadowParent(node) {
      var shadowParent = null;
      while (node !== null) {
        if (node instanceof ShadowRoot) {
          shadowParent = node.host;
          node = node.host;
        }
        node = node.parentNode;
      }
      return shadowParent;
    }

    // node_modules/react-remove-scroll/dist/es2015/sidecar.js
    var sidecar_default = exportSidecar(effectCar, RemoveScrollSideCar);

    // node_modules/react-remove-scroll/dist/es2015/Combination.js
    var ReactRemoveScroll = React25.forwardRef(function(props, ref) {
      return React25.createElement(RemoveScroll, __assign({}, props, { ref, sideCar: sidecar_default }));
    });
    ReactRemoveScroll.classNames = RemoveScroll.classNames;
    var Combination_default = ReactRemoveScroll;

    // node_modules/aria-hidden/dist/es2015/index.js
    var getDefaultParent = function(originalTarget) {
      if (typeof document === "undefined") {
        return null;
      }
      var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
      return sampleTarget.ownerDocument.body;
    };
    var counterMap = /* @__PURE__ */ new WeakMap();
    var uncontrolledNodes = /* @__PURE__ */ new WeakMap();
    var markerMap = {};
    var lockCount = 0;
    var unwrapHost = function(node) {
      return node && (node.host || unwrapHost(node.parentNode));
    };
    var correctTargets = function(parent, targets) {
      return targets.map(function(target) {
        if (parent.contains(target)) {
          return target;
        }
        var correctedTarget = unwrapHost(target);
        if (correctedTarget && parent.contains(correctedTarget)) {
          return correctedTarget;
        }
        console.error("aria-hidden", target, "in not contained inside", parent, ". Doing nothing");
        return null;
      }).filter(function(x) {
        return Boolean(x);
      });
    };
    var applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {
      var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
      if (!markerMap[markerName]) {
        markerMap[markerName] = /* @__PURE__ */ new WeakMap();
      }
      var markerCounter = markerMap[markerName];
      var hiddenNodes = [];
      var elementsToKeep = /* @__PURE__ */ new Set();
      var elementsToStop = new Set(targets);
      var keep = function(el) {
        if (!el || elementsToKeep.has(el)) {
          return;
        }
        elementsToKeep.add(el);
        keep(el.parentNode);
      };
      targets.forEach(keep);
      var deep = function(parent) {
        if (!parent || elementsToStop.has(parent)) {
          return;
        }
        Array.prototype.forEach.call(parent.children, function(node) {
          if (elementsToKeep.has(node)) {
            deep(node);
          } else {
            try {
              var attr = node.getAttribute(controlAttribute);
              var alreadyHidden = attr !== null && attr !== "false";
              var counterValue = (counterMap.get(node) || 0) + 1;
              var markerValue = (markerCounter.get(node) || 0) + 1;
              counterMap.set(node, counterValue);
              markerCounter.set(node, markerValue);
              hiddenNodes.push(node);
              if (counterValue === 1 && alreadyHidden) {
                uncontrolledNodes.set(node, true);
              }
              if (markerValue === 1) {
                node.setAttribute(markerName, "true");
              }
              if (!alreadyHidden) {
                node.setAttribute(controlAttribute, "true");
              }
            } catch (e) {
              console.error("aria-hidden: cannot operate on ", node, e);
            }
          }
        });
      };
      deep(parentNode);
      elementsToKeep.clear();
      lockCount++;
      return function() {
        hiddenNodes.forEach(function(node) {
          var counterValue = counterMap.get(node) - 1;
          var markerValue = markerCounter.get(node) - 1;
          counterMap.set(node, counterValue);
          markerCounter.set(node, markerValue);
          if (!counterValue) {
            if (!uncontrolledNodes.has(node)) {
              node.removeAttribute(controlAttribute);
            }
            uncontrolledNodes.delete(node);
          }
          if (!markerValue) {
            node.removeAttribute(markerName);
          }
        });
        lockCount--;
        if (!lockCount) {
          counterMap = /* @__PURE__ */ new WeakMap();
          counterMap = /* @__PURE__ */ new WeakMap();
          uncontrolledNodes = /* @__PURE__ */ new WeakMap();
          markerMap = {};
        }
      };
    };
    var hideOthers = function(originalTarget, parentNode, markerName) {
      if (markerName === void 0) {
        markerName = "data-aria-hidden";
      }
      var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
      var activeParentNode = parentNode || getDefaultParent(originalTarget);
      if (!activeParentNode) {
        return function() {
          return null;
        };
      }
      targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll("[aria-live], script")));
      return applyAttributeToOthers(targets, activeParentNode, markerName, "aria-hidden");
    };

    // node_modules/@radix-ui/react-dialog/dist/index.mjs
    var import_jsx_runtime7 = require("react/jsx-runtime");
    var __defProp18 = Object.defineProperty;
    var __name17 = (target, value) => __defProp18(target, "name", { value, configurable: true });
    var DIALOG_NAME = "Dialog";
    var [createDialogContext, createDialogScope] = createContextScope(DIALOG_NAME);
    var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
    var Dialog = /* @__PURE__ */ __name17((props) => {
      const {
        __scopeDialog,
        children,
        open: openProp,
        defaultOpen,
        onOpenChange,
        modal = true
      } = props;
      const triggerRef = React26.useRef(null);
      const contentRef = React26.useRef(null);
      const { nodes: branchNodes, registry: branchRegistry } = useFocusScopeBranchRegistry();
      const [open, setOpen] = useControllableState({
        prop: openProp,
        defaultProp: defaultOpen ?? false,
        onChange: onOpenChange,
        caller: DIALOG_NAME
      });
      const [titleCount, setTitleCount] = React26.useState(0);
      const [descriptionCount, setDescriptionCount] = React26.useState(0);
      return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        DialogProvider,
        {
          scope: __scopeDialog,
          triggerRef,
          contentRef,
          contentId: useId(),
          titleId: useId(),
          descriptionId: useId(),
          titlePresent: titleCount > 0,
          descriptionPresent: descriptionCount > 0,
          setTitleCount,
          setDescriptionCount,
          open,
          onOpenChange: setOpen,
          onOpenToggle: React26.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
          modal,
          branchNodes,
          branchRegistry,
          children
        }
      );
    }, "Dialog");
    var PORTAL_NAME = "DialogPortal";
    var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME, {
      forceMount: void 0
    });
    var DialogPortal = /* @__PURE__ */ __name17((props) => {
      const { __scopeDialog, forceMount, children, container } = props;
      const context = useDialogContext(PORTAL_NAME, __scopeDialog);
      return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(PortalProvider, { scope: __scopeDialog, forceMount, children: React26.Children.map(children, (child) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Portal, { asChild: true, container, children: child }) })) });
    }, "DialogPortal");
    var OVERLAY_NAME = "DialogOverlay";
    var DialogOverlay = /* @__PURE__ */ React26.forwardRef(
      /* @__PURE__ */ __name17(function DialogOverlay2(props, forwardedRef) {
        const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
        const { forceMount = portalContext.forceMount, ...overlayProps } = props;
        const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
        return context.modal ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(DialogOverlayImpl, { ...overlayProps, ref: forwardedRef }) }) : null;
      }, "DialogOverlay")
    );
    var Slot = createSlot("DialogOverlay.RemoveScroll");
    var DialogOverlayImpl = /* @__PURE__ */ React26.forwardRef(
      // blank line to reduce diff noise
      /* @__PURE__ */ __name17(function DialogOverlayImpl2(props, forwardedRef) {
        const { __scopeDialog, ...overlayProps } = props;
        const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
        const registerDismissableSurface = useDismissableLayerSurface();
        const composedRefs = useComposedRefs(forwardedRef, registerDismissableSurface);
        return (
          // Make sure `Content` is scrollable even when it doesn't live inside
          // `RemoveScroll` (eg. when `Overlay` and `Content` are siblings). Nested
          // layers are registered as branches and added as shards so they remain
          // scrollable too. See https://github.com/radix-ui/primitives/issues/3423
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            Combination_default,
            {
              as: Slot,
              allowPinchZoom: true,
              shards: React26.useMemo(
                () => [context.contentRef, ...context.branchNodes.map((node) => ({ current: node }))],
                [context.contentRef, context.branchNodes]
              ),
              children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                Primitive.div,
                {
                  "data-state": getState2(context.open),
                  ...overlayProps,
                  ref: composedRefs,
                  style: { pointerEvents: "auto", ...overlayProps.style }
                }
              )
            }
          )
        );
      }, "DialogOverlayImpl")
    );
    var CONTENT_NAME = "DialogContent";
    var DialogContent = /* @__PURE__ */ React26.forwardRef(
      /* @__PURE__ */ __name17(function DialogContent2(props, forwardedRef) {
        const portalContext = usePortalContext(CONTENT_NAME, props.__scopeDialog);
        const { forceMount = portalContext.forceMount, ...contentProps } = props;
        const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(DialogContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(DialogContentNonModal, { ...contentProps, ref: forwardedRef }) });
      }, "DialogContent")
    );
    var DialogContentModal = /* @__PURE__ */ React26.forwardRef(
      // blank line to reduce diff noise
      /* @__PURE__ */ __name17(function DialogContentModal2(props, forwardedRef) {
        const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
        const contentRef = React26.useRef(null);
        const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
        React26.useEffect(() => {
          const content = contentRef.current;
          if (content) return hideOthers(content);
        }, []);
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          DialogContentImpl,
          {
            ...props,
            ref: composedRefs,
            trapFocus: context.open,
            disableOutsidePointerEvents: context.open,
            onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
              event.preventDefault();
              context.triggerRef.current?.focus();
            }),
            onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
              const originalEvent = event.detail.originalEvent;
              const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
              const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
              if (isRightClick) event.preventDefault();
            }),
            onFocusOutside: composeEventHandlers(
              props.onFocusOutside,
              (event) => event.preventDefault()
            )
          }
        );
      }, "DialogContentModal")
    );
    var DialogContentNonModal = /* @__PURE__ */ React26.forwardRef(
      // blank line to reduce diff noise
      /* @__PURE__ */ __name17(function DialogContentNonModal2(props, forwardedRef) {
        const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
        const hasInteractedOutsideRef = React26.useRef(false);
        const hasPointerDownOutsideRef = React26.useRef(false);
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          DialogContentImpl,
          {
            ...props,
            ref: forwardedRef,
            trapFocus: false,
            disableOutsidePointerEvents: false,
            onCloseAutoFocus: (event) => {
              props.onCloseAutoFocus?.(event);
              if (!event.defaultPrevented) {
                if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
                event.preventDefault();
              }
              hasInteractedOutsideRef.current = false;
              hasPointerDownOutsideRef.current = false;
            },
            onInteractOutside: (event) => {
              props.onInteractOutside?.(event);
              if (!event.defaultPrevented) {
                hasInteractedOutsideRef.current = true;
                if (event.detail.originalEvent.type === "pointerdown") {
                  hasPointerDownOutsideRef.current = true;
                }
              }
              const target = event.target;
              const targetIsTrigger = context.triggerRef.current?.contains(target);
              if (targetIsTrigger) event.preventDefault();
              if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
                event.preventDefault();
              }
            }
          }
        );
      }, "DialogContentNonModal")
    );
    var DialogContentImpl = /* @__PURE__ */ React26.forwardRef(
      // blank line to reduce diff noise
      /* @__PURE__ */ __name17(function DialogContentImpl2(props, forwardedRef) {
        const {
          __scopeDialog,
          trapFocus,
          onOpenAutoFocus,
          onCloseAutoFocus,
          "aria-describedby": ariaDescribedby,
          children,
          ...contentProps
        } = props;
        const context = useDialogContext(CONTENT_NAME, __scopeDialog);
        useFocusGuards();
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(FocusScopeBranchProvider, { registry: context.branchRegistry, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          FocusScope,
          {
            asChild: true,
            loop: true,
            trapped: trapFocus,
            branches: context.branchNodes,
            onMountAutoFocus: onOpenAutoFocus,
            onUnmountAutoFocus: onCloseAutoFocus,
            children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              DismissableLayer,
              {
                role: "dialog",
                id: context.contentId,
                "aria-labelledby": context.titlePresent ? context.titleId : void 0,
                "aria-describedby": context.descriptionPresent ? concatAriaDescribedby2(ariaDescribedby, context.descriptionId) : ariaDescribedby,
                "data-state": getState2(context.open),
                ...contentProps,
                ref: forwardedRef,
                deferPointerDownOutside: true,
                onDismiss: () => context.onOpenChange(false),
                children
              }
            )
          }
        ) });
      }, "DialogContentImpl")
    );
    var DialogTitle = /* @__PURE__ */ React26.forwardRef(
      /* @__PURE__ */ __name17(function DialogTitle2(props, forwardedRef) {
        const { __scopeDialog, ...titleProps } = props;
        const context = useDialogContext("DialogTitle", __scopeDialog);
        const { setTitleCount } = context;
        useLayoutEffect2(() => {
          setTitleCount((count3) => count3 + 1);
          return () => setTitleCount((count3) => count3 - 1);
        }, [setTitleCount]);
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Primitive.h2, { id: context.titleId, ...titleProps, ref: forwardedRef });
      }, "DialogTitle")
    );
    function concatAriaDescribedby2(...values) {
      const ids = /* @__PURE__ */ new Set();
      for (const value of values) {
        if (typeof value !== "string") continue;
        for (const id of String(value).trim().split(/\s+/)) {
          if (id) ids.add(id);
        }
      }
      return ids.size > 0 ? Array.from(ids).join(" ") : void 0;
    }
    __name17(concatAriaDescribedby2, "concatAriaDescribedby");
    function getState2(open) {
      return open ? "open" : "closed";
    }
    __name17(getState2, "getState");

    // node_modules/@radix-ui/react-tabs/dist/index.mjs
    var React32 = __toESM(require("react"), 1);

    // node_modules/@radix-ui/react-roving-focus/dist/index.mjs
    var React31 = __toESM(require("react"), 1);

    // node_modules/@radix-ui/react-collection/dist/index.mjs
    var React27 = __toESM(require("react"), 1);
    var import_jsx_runtime8 = require("react/jsx-runtime");
    var React28 = __toESM(require("react"), 1);
    var import_jsx_runtime9 = require("react/jsx-runtime");
    var __defProp19 = Object.defineProperty;
    var __name18 = (target, value) => __defProp19(target, "name", { value, configurable: true });
    // @__NO_SIDE_EFFECTS__
    function createCollection(name) {
      const PROVIDER_NAME = name + "CollectionProvider";
      const [createCollectionContext, createCollectionScope2] = createContextScope(PROVIDER_NAME);
      const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(
        PROVIDER_NAME,
        { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
      );
      const CollectionProvider = /* @__PURE__ */ __name18((props) => {
        const { scope, children } = props;
        const ref = React27.useRef(null);
        const itemMap = React27.useRef(/* @__PURE__ */ new Map()).current;
        return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CollectionProviderImpl, { scope, itemMap, collectionRef: ref, children });
      }, "CollectionProvider");
      CollectionProvider.displayName = PROVIDER_NAME;
      const COLLECTION_SLOT_NAME = name + "CollectionSlot";
      const CollectionSlotImpl = createSlot(COLLECTION_SLOT_NAME);
      const CollectionSlot = React27.forwardRef(
        (props, forwardedRef) => {
          const { scope, children } = props;
          const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
          const composedRefs = useComposedRefs(forwardedRef, context.collectionRef);
          return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CollectionSlotImpl, { ref: composedRefs, children });
        }
      );
      CollectionSlot.displayName = COLLECTION_SLOT_NAME;
      const ITEM_SLOT_NAME = name + "CollectionItemSlot";
      const ITEM_DATA_ATTR = "data-radix-collection-item";
      const CollectionItemSlotImpl = createSlot(ITEM_SLOT_NAME);
      const CollectionItemSlot = React27.forwardRef(
        (props, forwardedRef) => {
          const { scope, children, ...itemData } = props;
          const ref = React27.useRef(null);
          const composedRefs = useComposedRefs(forwardedRef, ref);
          const context = useCollectionContext(ITEM_SLOT_NAME, scope);
          React27.useEffect(() => {
            context.itemMap.set(ref, { ref, ...itemData });
            return () => void context.itemMap.delete(ref);
          });
          return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CollectionItemSlotImpl, { ...{ [ITEM_DATA_ATTR]: "" }, ref: composedRefs, children });
        }
      );
      CollectionItemSlot.displayName = ITEM_SLOT_NAME;
      function useCollection2(scope) {
        const context = useCollectionContext(name + "CollectionConsumer", scope);
        const getItems = React27.useCallback(() => {
          const collectionNode = context.collectionRef.current;
          if (!collectionNode) return [];
          const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
          const items = Array.from(context.itemMap.values());
          const orderedItems = items.sort(
            (a, b) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current)
          );
          return orderedItems;
        }, [context.collectionRef, context.itemMap]);
        return getItems;
      }
      __name18(useCollection2, "useCollection");
      return [
        { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
        useCollection2,
        createCollectionScope2
      ];
    }
    __name18(createCollection, "createCollection");
    var __instanciated = /* @__PURE__ */ new WeakMap();
    var _keys, _a;
    var OrderedDict = (_a = class extends Map {
      constructor(entries) {
        super(entries);
        __privateAdd(this, _keys);
        __privateSet(this, _keys, [...super.keys()]);
        __instanciated.set(this, true);
      }
      set(key, value) {
        if (__instanciated.get(this) && !this.has(key)) {
          __privateGet(this, _keys).push(key);
        }
        super.set(key, value);
        return this;
      }
      /**
       * Sets a key-value pair so that it ends up at the given index.
       * - Existing keys are moved
       * - Negative indices count from the end of the resulting dictionary, so
       *   inserting at -1 makes the item the last one, -2 the second to last, etc.
       * - Out-of-range indices are clamped
       */
      insert(index, key, value) {
        const has = this.has(key);
        const finalSize = has ? this.size : this.size + 1;
        const relativeIndex = toSafeInteger(index);
        const targetIndex = relativeIndex >= 0 ? Math.min(relativeIndex, finalSize - 1) : Math.max(finalSize + relativeIndex, 0);
        if (has ? __privateGet(this, _keys).indexOf(key) === targetIndex : targetIndex === this.size) {
          this.set(key, value);
          return this;
        }
        const keys = __privateGet(this, _keys).filter((existingKey) => existingKey !== key);
        keys.splice(targetIndex, 0, key);
        const entries = keys.map((entryKey) => [
          entryKey,
          entryKey === key ? value : this.get(entryKey)
        ]);
        this.clear();
        for (const [entryKey, entryValue] of entries) {
          this.set(entryKey, entryValue);
        }
        return this;
      }
      with(index, key, value) {
        const copy = new _a(this);
        copy.insert(index, key, value);
        return copy;
      }
      before(key) {
        const index = __privateGet(this, _keys).indexOf(key) - 1;
        if (index < 0) {
          return void 0;
        }
        return this.entryAt(index);
      }
      /**
       * Sets a new key-value pair at the position before the given key.
       */
      setBefore(key, newKey, value) {
        const index = __privateGet(this, _keys).indexOf(key);
        if (index === -1) {
          return this;
        }
        const currentIndex = __privateGet(this, _keys).indexOf(newKey);
        const targetIndex = currentIndex !== -1 && currentIndex < index ? index - 1 : index;
        return this.insert(targetIndex, newKey, value);
      }
      after(key) {
        let index = __privateGet(this, _keys).indexOf(key);
        index = index === -1 || index === this.size - 1 ? -1 : index + 1;
        if (index === -1) {
          return void 0;
        }
        return this.entryAt(index);
      }
      /**
       * Sets a new key-value pair at the position after the given key.
       */
      setAfter(key, newKey, value) {
        const index = __privateGet(this, _keys).indexOf(key);
        if (index === -1) {
          return this;
        }
        const currentIndex = __privateGet(this, _keys).indexOf(newKey);
        const targetIndex = currentIndex !== -1 && currentIndex <= index ? index : index + 1;
        return this.insert(targetIndex, newKey, value);
      }
      first() {
        return this.entryAt(0);
      }
      last() {
        return this.entryAt(-1);
      }
      clear() {
        __privateSet(this, _keys, []);
        return super.clear();
      }
      delete(key) {
        const deleted = super.delete(key);
        if (deleted) {
          __privateGet(this, _keys).splice(__privateGet(this, _keys).indexOf(key), 1);
        }
        return deleted;
      }
      deleteAt(index) {
        const key = this.keyAt(index);
        if (key !== void 0) {
          return this.delete(key);
        }
        return false;
      }
      at(index) {
        const key = at(__privateGet(this, _keys), index);
        if (key !== void 0) {
          return this.get(key);
        }
      }
      entryAt(index) {
        const key = at(__privateGet(this, _keys), index);
        if (key !== void 0) {
          return [key, this.get(key)];
        }
      }
      indexOf(key) {
        return __privateGet(this, _keys).indexOf(key);
      }
      keyAt(index) {
        return at(__privateGet(this, _keys), index);
      }
      from(key, offset) {
        const index = this.indexOf(key);
        if (index === -1) {
          return void 0;
        }
        let dest = index + offset;
        if (dest < 0) dest = 0;
        if (dest >= this.size) dest = this.size - 1;
        return this.at(dest);
      }
      keyFrom(key, offset) {
        const index = this.indexOf(key);
        if (index === -1) {
          return void 0;
        }
        let dest = index + offset;
        if (dest < 0) dest = 0;
        if (dest >= this.size) dest = this.size - 1;
        return this.keyAt(dest);
      }
      find(predicate, thisArg) {
        let index = 0;
        for (const entry of this) {
          if (Reflect.apply(predicate, thisArg, [entry, index, this])) {
            return entry;
          }
          index++;
        }
        return void 0;
      }
      findIndex(predicate, thisArg) {
        let index = 0;
        for (const entry of this) {
          if (Reflect.apply(predicate, thisArg, [entry, index, this])) {
            return index;
          }
          index++;
        }
        return -1;
      }
      filter(predicate, thisArg) {
        const entries = [];
        let index = 0;
        for (const entry of this) {
          if (Reflect.apply(predicate, thisArg, [entry, index, this])) {
            entries.push(entry);
          }
          index++;
        }
        return new _a(entries);
      }
      map(callbackfn, thisArg) {
        const entries = [];
        let index = 0;
        for (const entry of this) {
          entries.push([entry[0], Reflect.apply(callbackfn, thisArg, [entry, index, this])]);
          index++;
        }
        return new _a(entries);
      }
      reduce(...args) {
        const [callbackfn, initialValue] = args;
        const hasInitialValue = args.length > 1;
        if (!hasInitialValue && this.size === 0) {
          throw new TypeError("Reduce of empty OrderedDict with no initial value");
        }
        let index = 0;
        let accumulator = initialValue;
        for (const entry of this) {
          if (index === 0 && !hasInitialValue) {
            accumulator = entry;
          } else {
            accumulator = Reflect.apply(callbackfn, this, [accumulator, entry, index, this]);
          }
          index++;
        }
        return accumulator;
      }
      reduceRight(...args) {
        const [callbackfn, initialValue] = args;
        const hasInitialValue = args.length > 1;
        if (!hasInitialValue && this.size === 0) {
          throw new TypeError("Reduce of empty OrderedDict with no initial value");
        }
        let accumulator = initialValue;
        for (let index = this.size - 1; index >= 0; index--) {
          const entry = this.entryAt(index);
          if (index === this.size - 1 && !hasInitialValue) {
            accumulator = entry;
          } else {
            accumulator = Reflect.apply(callbackfn, this, [accumulator, entry, index, this]);
          }
        }
        return accumulator;
      }
      /**
       * Sorts the dictionary in place. This method mutates the dictionary and
       * returns a reference to the same object
       *
       * @param compareFn Function used to determine the order of the elements. It
       * is expected to return a negative value if the first argument is less than
       * the second argument, zero if they're equal, and a positive value otherwise.
       */
      sort(compareFn) {
        if (typeof compareFn !== "function") {
          throw new TypeError(`OrderedDict.sort requires a compare function`);
        }
        const entries = [...this.entries()].sort(compareFn);
        this.clear();
        for (const [key, value] of entries) {
          this.set(key, value);
        }
        return this;
      }
      /**
       * Returns a copy of the dictionary with its elements sorted.
       *
       * @param compareFn Function used to determine the order of the elements. It
       * is expected to return a negative value if the first argument is less than
       * the second argument, zero if they're equal, and a positive value otherwise.
       */
      toSorted(compareFn) {
        if (typeof compareFn !== "function") {
          throw new TypeError(`OrderedDict.toSorted requires a compare function`);
        }
        const entries = [...this.entries()].sort(compareFn);
        return new _a(entries);
      }
      toReversed() {
        const reversed = new _a();
        for (let index = this.size - 1; index >= 0; index--) {
          const key = this.keyAt(index);
          const element = this.get(key);
          reversed.set(key, element);
        }
        return reversed;
      }
      toSpliced(...args) {
        const entries = [...this.entries()];
        entries.splice(...args);
        return new _a(entries);
      }
      slice(start, end) {
        const result = new _a();
        for (const key of __privateGet(this, _keys).slice(start, end)) {
          result.set(key, this.get(key));
        }
        return result;
      }
      every(predicate, thisArg) {
        let index = 0;
        for (const entry of this) {
          if (!Reflect.apply(predicate, thisArg, [entry, index, this])) {
            return false;
          }
          index++;
        }
        return true;
      }
      some(predicate, thisArg) {
        let index = 0;
        for (const entry of this) {
          if (Reflect.apply(predicate, thisArg, [entry, index, this])) {
            return true;
          }
          index++;
        }
        return false;
      }
    }, _keys = new WeakMap(), __name18(_a, "OrderedDict"), _a);
    function at(array, index) {
      if ("at" in Array.prototype) {
        return Array.prototype.at.call(array, index);
      }
      const actualIndex = toSafeIndex(array, index);
      return actualIndex === -1 ? void 0 : array[actualIndex];
    }
    __name18(at, "at");
    function toSafeIndex(array, index) {
      const length = array.length;
      const relativeIndex = toSafeInteger(index);
      const actualIndex = relativeIndex >= 0 ? relativeIndex : length + relativeIndex;
      return actualIndex < 0 || actualIndex >= length ? -1 : actualIndex;
    }
    __name18(toSafeIndex, "toSafeIndex");
    function toSafeInteger(number) {
      return number !== number || number === 0 ? 0 : Math.trunc(number);
    }
    __name18(toSafeInteger, "toSafeInteger");
    // @__NO_SIDE_EFFECTS__
    function createCollection2(name) {
      const PROVIDER_NAME = name + "CollectionProvider";
      const [createCollectionContext, createCollectionScope2] = createContextScope(PROVIDER_NAME);
      const [CollectionStableContextProvider, useStableCollectionContext] = createCollectionContext(PROVIDER_NAME);
      CollectionStableContextProvider.displayName = name + "CollectionStableContextProvider";
      const [CollectionStatefulContextProvider, useStatefulCollectionContext] = createCollectionContext(PROVIDER_NAME);
      CollectionStatefulContextProvider.displayName = name + "CollectionStatefulContextProvider";
      const CollectionProvider = /* @__PURE__ */ __name18(({ state, ...props }) => {
        return state ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(CollectionProviderImpl, { ...props, state }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(CollectionInit, { ...props });
      }, "CollectionProvider");
      CollectionProvider.displayName = PROVIDER_NAME;
      const CollectionInit = /* @__PURE__ */ __name18((props) => {
        const state = useInitCollection();
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(CollectionProviderImpl, { ...props, state });
      }, "CollectionInit");
      CollectionInit.displayName = name + "CollectionInit";
      const CollectionProviderImpl = /* @__PURE__ */ __name18((props) => {
        const { scope, children, state } = props;
        const ref = React28.useRef(null);
        const [collectionElement, setCollectionElement] = React28.useState(
          null
        );
        const composeRefs2 = useComposedRefs(ref, setCollectionElement);
        const [collection, setCollection] = state;
        const registryRef = React28.useRef(
          new OrderedDict()
        );
        const getCollection = React28.useCallback(() => {
          const registry = registryRef.current;
          if (!isInDocumentOrder(registry)) {
            registry.sort(sortByDocumentPosition);
          }
          return registry;
        }, []);
        React28.useEffect(() => {
          if (!collectionElement) {
            return;
          }
          const observer = getChildListObserver(() => {
            setCollection((map) => {
              const sorted = map.toSorted(sortByDocumentPosition);
              const orderChanged = sorted.some(([key], index) => map.keyAt(index) !== key);
              return orderChanged ? sorted : map;
            });
          });
          observer.observe(collectionElement, {
            childList: true,
            subtree: true
          });
          return () => {
            observer.disconnect();
          };
        }, [collectionElement, setCollection]);
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
          CollectionStableContextProvider,
          {
            scope,
            collectionElementRef: composeRefs2,
            collectionElementRefObject: ref,
            getCollection,
            setCollection,
            registryRef,
            children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
              CollectionStatefulContextProvider,
              {
                scope,
                collectionElement,
                collection,
                children
              }
            )
          }
        );
      }, "CollectionProviderImpl");
      CollectionProviderImpl.displayName = name + "CollectionProviderImpl";
      const COLLECTION_SLOT_NAME = name + "CollectionSlot";
      const CollectionSlotImpl = createSlot(COLLECTION_SLOT_NAME);
      const CollectionSlot = React28.forwardRef(
        (props, forwardedRef) => {
          const { scope, children } = props;
          const context = useStableCollectionContext(COLLECTION_SLOT_NAME, scope);
          const composedRefs = useComposedRefs(forwardedRef, context.collectionElementRef);
          return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(CollectionSlotImpl, { ref: composedRefs, children });
        }
      );
      CollectionSlot.displayName = COLLECTION_SLOT_NAME;
      const ITEM_SLOT_NAME = name + "CollectionItemSlot";
      const ITEM_DATA_ATTR = "data-radix-collection-item";
      const CollectionItemSlotImpl = createSlot(ITEM_SLOT_NAME);
      const CollectionItemSlot = React28.forwardRef(
        (props, forwardedRef) => {
          const { scope, children, ...itemData } = props;
          const ref = React28.useRef(null);
          const context = useStableCollectionContext(ITEM_SLOT_NAME, scope);
          const { setCollection, registryRef } = context;
          const itemDataRef = React28.useRef(itemData);
          if (!shallowEqual(itemDataRef.current, itemData)) {
            itemDataRef.current = itemData;
          }
          const memoizedItemData = itemDataRef.current;
          const registerElement = React28.useCallback(
            (node) => {
              const registry = registryRef.current;
              if (node) {
                registry.set(node, {
                  ...itemDataRef.current,
                  element: node
                });
              } else if (ref.current) {
                registry.delete(ref.current);
              }
            },
            [registryRef]
          );
          const composedRefs = useComposedRefs(forwardedRef, registerElement, ref);
          useLayoutEffect2(() => {
            const node = ref.current;
            const registry = registryRef.current;
            if (node && registry.has(node)) {
              registry.set(node, { ...memoizedItemData, element: node });
            }
          }, [memoizedItemData, registryRef]);
          const registeredRef = React28.useRef(null);
          React28.useEffect(() => {
            const element = ref.current;
            const registered = registeredRef.current;
            if ((registered?.element ?? null) === element && (!element || registered?.itemData === memoizedItemData)) {
              return;
            }
            registeredRef.current = element ? { element, itemData: memoizedItemData } : null;
            setCollection((map) => {
              const next = new OrderedDict(map);
              if (registered && registered.element !== element) {
                next.delete(registered.element);
              }
              if (element) {
                next.set(element, { ...memoizedItemData, element });
              }
              return next.sort(sortByDocumentPosition);
            });
          });
          React28.useEffect(() => {
            return () => {
              const registered = registeredRef.current;
              registeredRef.current = null;
              if (!registered) {
                return;
              }
              setCollection((map) => {
                if (!map.has(registered.element)) {
                  return map;
                }
                const next = new OrderedDict(map);
                next.delete(registered.element);
                return next;
              });
            };
          }, [setCollection]);
          return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(CollectionItemSlotImpl, { ...{ [ITEM_DATA_ATTR]: "" }, ref: composedRefs, children });
        }
      );
      CollectionItemSlot.displayName = ITEM_SLOT_NAME;
      function useInitCollection() {
        return React28.useState(new OrderedDict());
      }
      __name18(useInitCollection, "useInitCollection");
      function useCollection2(scope) {
        const { collection } = useStatefulCollectionContext(name + "CollectionConsumer", scope);
        return collection;
      }
      __name18(useCollection2, "useCollection");
      function useGetCollection(scope) {
        const { getCollection } = useStableCollectionContext(name + "CollectionConsumer", scope);
        return getCollection;
      }
      __name18(useGetCollection, "useGetCollection");
      const functions = {
        createCollectionScope: createCollectionScope2,
        useCollection: useCollection2,
        useGetCollection,
        useInitCollection
      };
      return [
        { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
        functions
      ];
    }
    __name18(createCollection2, "createCollection");
    function shallowEqual(a, b) {
      if (a === b) return true;
      if (typeof a !== "object" || typeof b !== "object") return false;
      if (a == null || b == null) return false;
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      if (keysA.length !== keysB.length) return false;
      for (const key of keysA) {
        if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
        if (a[key] !== b[key]) return false;
      }
      return true;
    }
    __name18(shallowEqual, "shallowEqual");
    function isElementPreceding(a, b) {
      return !!(b.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_PRECEDING);
    }
    __name18(isElementPreceding, "isElementPreceding");
    function isInDocumentOrder(dict) {
      let previous;
      for (const element of dict.keys()) {
        if (previous) {
          const position = previous.compareDocumentPosition(element);
          if (!(position & Node.DOCUMENT_POSITION_DISCONNECTED) && position & Node.DOCUMENT_POSITION_PRECEDING) {
            return false;
          }
        }
        previous = element;
      }
      return true;
    }
    __name18(isInDocumentOrder, "isInDocumentOrder");
    function sortByDocumentPosition(a, b) {
      return !a[1].element || !b[1].element ? 0 : isElementPreceding(a[1].element, b[1].element) ? -1 : 1;
    }
    __name18(sortByDocumentPosition, "sortByDocumentPosition");
    function getChildListObserver(callback) {
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === "childList") {
            callback();
            return;
          }
        }
      });
      return observer;
    }
    __name18(getChildListObserver, "getChildListObserver");

    // node_modules/@radix-ui/react-direction/dist/index.mjs
    var React29 = __toESM(require("react"), 1);
    var import_jsx_runtime10 = require("react/jsx-runtime");
    var __defProp20 = Object.defineProperty;
    var __name19 = (target, value) => __defProp20(target, "name", { value, configurable: true });
    var Direction = {
      LTR: "ltr",
      RTL: "rtl"
    };
    var DirectionContext = React29.createContext(void 0);
    function useDirection(localDir) {
      const globalDir = React29.useContext(DirectionContext);
      return localDir || globalDir || Direction.LTR;
    }
    __name19(useDirection, "useDirection");

    // node_modules/@radix-ui/react-use-is-hydrated/dist/index.mjs
    var React210 = __toESM(require("react"), 1);
    var React30 = __toESM(require("react"), 1);
    var __defProp21 = Object.defineProperty;
    var __name20 = (target, value) => __defProp21(target, "name", { value, configurable: true });
    var _isHydrated = false;
    function useIsHydrated() {
      const [isHydrated, setIsHydrated] = React30.useState(_isHydrated);
      React30.useEffect(() => {
        if (!_isHydrated) {
          _isHydrated = true;
          setIsHydrated(true);
        }
      }, []);
      return isHydrated;
    }
    __name20(useIsHydrated, "useIsHydrated");
    var useReactSyncExternalStore = React210[" useSyncExternalStore ".trim().toString()];
    function subscribe() {
      return () => {
      };
    }
    __name20(subscribe, "subscribe");
    function useIsHydratedModern() {
      return useReactSyncExternalStore(
        subscribe,
        () => true,
        () => false
      );
    }
    __name20(useIsHydratedModern, "useIsHydratedModern");
    var useIsHydrated2 = typeof useReactSyncExternalStore === "function" ? useIsHydratedModern : useIsHydrated;

    // node_modules/@radix-ui/react-roving-focus/dist/index.mjs
    var import_jsx_runtime11 = require("react/jsx-runtime");
    var __defProp22 = Object.defineProperty;
    var __name21 = (target, value) => __defProp22(target, "name", { value, configurable: true });
    var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
    var EVENT_OPTIONS2 = { bubbles: false, cancelable: true };
    var GROUP_NAME = "RovingFocusGroup";
    var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
    var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
      GROUP_NAME,
      [createCollectionScope]
    );
    var Orientation = {
      Vertical: "vertical",
      Horizontal: "horizontal"
    };
    var Direction2 = {
      LTR: "ltr",
      RTL: "rtl"
    };
    var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
    var RovingFocusGroup = /* @__PURE__ */ React31.forwardRef(
      // blank line to reduce diff noise
      /* @__PURE__ */ __name21(function RovingFocusGroup2(props, forwardedRef) {
        return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
      }, "RovingFocusGroup")
    );
    var RovingFocusGroupImpl = /* @__PURE__ */ React31.forwardRef(/* @__PURE__ */ __name21(function RovingFocusGroupImpl2(props, forwardedRef) {
      const {
        __scopeRovingFocusGroup,
        orientation,
        loop = false,
        dir,
        currentTabStopId: currentTabStopIdProp,
        defaultCurrentTabStopId,
        onCurrentTabStopIdChange,
        onEntryFocus,
        preventScrollOnEntryFocus = false,
        ...groupProps
      } = props;
      const ref = React31.useRef(null);
      const composedRefs = useComposedRefs(forwardedRef, ref);
      const direction = useDirection(dir);
      const [currentTabStopId, setCurrentTabStopId] = useControllableState({
        prop: currentTabStopIdProp,
        defaultProp: defaultCurrentTabStopId ?? null,
        onChange: onCurrentTabStopIdChange,
        caller: GROUP_NAME
      });
      const [isTabbingBackOut, setIsTabbingBackOut] = React31.useState(false);
      const handleEntryFocus = useCallbackRef(onEntryFocus);
      const getItems = useCollection(__scopeRovingFocusGroup);
      const isClickFocusRef = React31.useRef(false);
      const [focusableItemsCount, setFocusableItemsCount] = React31.useState(0);
      React31.useEffect(() => {
        const node = ref.current;
        if (node) {
          node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
          return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
        }
      }, [handleEntryFocus]);
      return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        RovingFocusProvider,
        {
          scope: __scopeRovingFocusGroup,
          orientation,
          dir: direction,
          loop,
          currentTabStopId,
          onItemFocus: React31.useCallback(
            (tabStopId) => setCurrentTabStopId(tabStopId),
            [setCurrentTabStopId]
          ),
          onItemShiftTab: React31.useCallback(() => setIsTabbingBackOut(true), []),
          onFocusableItemAdd: React31.useCallback(
            () => setFocusableItemsCount((prevCount) => prevCount + 1),
            []
          ),
          onFocusableItemRemove: React31.useCallback(
            () => setFocusableItemsCount((prevCount) => prevCount - 1),
            []
          ),
          children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
            Primitive.div,
            {
              tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
              "data-orientation": orientation,
              ...groupProps,
              ref: composedRefs,
              style: { outline: "none", ...props.style },
              onMouseDown: composeEventHandlers(props.onMouseDown, () => {
                isClickFocusRef.current = true;
              }),
              onFocus: composeEventHandlers(props.onFocus, (event) => {
                const isKeyboardFocus = !isClickFocusRef.current;
                if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
                  const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS2);
                  event.currentTarget.dispatchEvent(entryFocusEvent);
                  if (!entryFocusEvent.defaultPrevented) {
                    const items = getItems().filter((item) => item.focusable);
                    const activeItem = items.find((item) => item.active);
                    const currentItem = items.find((item) => item.id === currentTabStopId);
                    const candidateItems = [activeItem, currentItem, ...items].filter(
                      Boolean
                    );
                    const candidateNodes = candidateItems.map((item) => item.ref.current);
                    focusFirst2(candidateNodes, preventScrollOnEntryFocus);
                  }
                }
                isClickFocusRef.current = false;
              }),
              onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
            }
          )
        }
      );
    }, "RovingFocusGroupImpl"));
    var ITEM_NAME = "RovingFocusGroupItem";
    var RovingFocusGroupItem = /* @__PURE__ */ React31.forwardRef(
      // blank line to reduce diff noise
      /* @__PURE__ */ __name21(function RovingFocusGroupItem2(props, forwardedRef) {
        const {
          __scopeRovingFocusGroup,
          focusable = true,
          active = false,
          tabStopId,
          children,
          ...itemProps
        } = props;
        const autoId = useId();
        const id = tabStopId || autoId;
        const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
        const isCurrentTabStop = context.currentTabStopId === id;
        const getItems = useCollection(__scopeRovingFocusGroup);
        const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
        const isHydrated = useIsHydrated2();
        useLayoutEffect2(() => {
          if (!isHydrated || !focusable) {
            return;
          }
          onFocusableItemAdd();
          return () => onFocusableItemRemove();
        }, [isHydrated, focusable, onFocusableItemAdd, onFocusableItemRemove]);
        React31.useEffect(() => {
          if (isHydrated || !focusable) {
            return;
          }
          onFocusableItemAdd();
          return () => onFocusableItemRemove();
        }, [isHydrated, focusable, onFocusableItemAdd, onFocusableItemRemove]);
        return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
          Collection.ItemSlot,
          {
            scope: __scopeRovingFocusGroup,
            id,
            focusable,
            active,
            children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              Primitive.span,
              {
                tabIndex: isCurrentTabStop ? 0 : -1,
                "data-orientation": context.orientation,
                ...itemProps,
                ref: forwardedRef,
                onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
                  if (!focusable) event.preventDefault();
                  else context.onItemFocus(id);
                }),
                onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
                onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
                  if (event.key === "Tab" && event.shiftKey) {
                    context.onItemShiftTab();
                    return;
                  }
                  if (event.target !== event.currentTarget) return;
                  const focusIntent = getFocusIntent(event, context.orientation, context.dir);
                  if (focusIntent !== void 0) {
                    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                    event.preventDefault();
                    const items = getItems().filter((item) => item.focusable);
                    let candidateNodes = items.map((item) => item.ref.current);
                    if (focusIntent === "last") candidateNodes.reverse();
                    else if (focusIntent === "prev" || focusIntent === "next") {
                      if (focusIntent === "prev") candidateNodes.reverse();
                      const currentIndex = candidateNodes.indexOf(event.currentTarget);
                      candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                    }
                    setTimeout(() => focusFirst2(candidateNodes));
                  }
                }),
                children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
              }
            )
          }
        );
      }, "RovingFocusGroupItem")
    );
    var MAP_KEY_TO_FOCUS_INTENT = {
      ArrowLeft: "prev",
      ArrowUp: "prev",
      ArrowRight: "next",
      ArrowDown: "next",
      PageUp: "first",
      Home: "first",
      PageDown: "last",
      End: "last"
    };
    function getDirectionAwareKey(key, dir) {
      if (dir !== Direction2.RTL) return key;
      return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
    }
    __name21(getDirectionAwareKey, "getDirectionAwareKey");
    function getFocusIntent(event, orientation, dir) {
      const key = getDirectionAwareKey(event.key, dir);
      if (orientation === Orientation.Vertical && ["ArrowLeft", "ArrowRight"].includes(key)) {
        return void 0;
      }
      if (orientation === Orientation.Horizontal && ["ArrowUp", "ArrowDown"].includes(key)) {
        return void 0;
      }
      return MAP_KEY_TO_FOCUS_INTENT[key];
    }
    __name21(getFocusIntent, "getFocusIntent");
    function focusFirst2(candidates, preventScroll = false) {
      const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
      for (const candidate of candidates) {
        if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
        candidate.focus({ preventScroll });
        if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
      }
    }
    __name21(focusFirst2, "focusFirst");
    function wrapArray(array, startIndex) {
      return array.map((_, index) => array[(startIndex + index) % array.length]);
    }
    __name21(wrapArray, "wrapArray");

    // node_modules/@radix-ui/react-tabs/dist/index.mjs
    var import_jsx_runtime12 = require("react/jsx-runtime");
    var __defProp23 = Object.defineProperty;
    var __name22 = (target, value) => __defProp23(target, "name", { value, configurable: true });
    var ActivationMode = {
      Automatic: "automatic",
      Manual: "manual"
    };
    var TABS_NAME = "Tabs";
    var [createTabsContext, createTabsScope] = createContextScope(TABS_NAME, [
      createRovingFocusGroupScope
    ]);
    var useRovingFocusGroupScope = createRovingFocusGroupScope();
    var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
    var Tabs = /* @__PURE__ */ React32.forwardRef(
      // blank line to reduce diff noise
      /* @__PURE__ */ __name22(function Tabs2(props, forwardedRef) {
        const {
          __scopeTabs,
          value: valueProp,
          onValueChange,
          defaultValue,
          orientation = "horizontal",
          dir,
          activationMode = ActivationMode.Automatic,
          ...tabsProps
        } = props;
        const direction = useDirection(dir);
        const [value, setValue] = useControllableState({
          prop: valueProp,
          onChange: onValueChange,
          defaultProp: defaultValue ?? "",
          caller: TABS_NAME
        });
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          TabsProvider,
          {
            scope: __scopeTabs,
            baseId: useId(),
            value,
            onValueChange: setValue,
            orientation,
            dir: direction,
            activationMode,
            children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              Primitive.div,
              {
                dir: direction,
                "data-orientation": orientation,
                ...tabsProps,
                ref: forwardedRef
              }
            )
          }
        );
      }, "Tabs")
    );
    var TAB_LIST_NAME = "TabsList";
    var TabsList = /* @__PURE__ */ React32.forwardRef(
      // blank line to reduce diff noise
      /* @__PURE__ */ __name22(function TabsList2(props, forwardedRef) {
        const { __scopeTabs, loop = true, ...listProps } = props;
        const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
        const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          RovingFocusGroup,
          {
            asChild: true,
            ...rovingFocusGroupScope,
            orientation: context.orientation,
            dir: context.dir,
            loop,
            children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              Primitive.div,
              {
                role: "tablist",
                "aria-orientation": context.orientation,
                ...listProps,
                ref: forwardedRef
              }
            )
          }
        );
      }, "TabsList")
    );
    var TRIGGER_NAME2 = "TabsTrigger";
    var TabsTrigger = /* @__PURE__ */ React32.forwardRef(
      /* @__PURE__ */ __name22(function TabsTrigger2(props, forwardedRef) {
        const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
        const context = useTabsContext(TRIGGER_NAME2, __scopeTabs);
        const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
        const triggerId = makeTriggerId(context.baseId, value);
        const contentId = makeContentId(context.baseId, value);
        const isSelected = value === context.value;
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          RovingFocusGroupItem,
          {
            asChild: true,
            ...rovingFocusGroupScope,
            focusable: !disabled,
            active: isSelected,
            children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              Primitive.button,
              {
                type: "button",
                role: "tab",
                "aria-selected": isSelected,
                "aria-controls": contentId,
                "data-state": isSelected ? "active" : "inactive",
                "data-disabled": disabled ? "" : void 0,
                disabled,
                id: triggerId,
                ...triggerProps,
                ref: forwardedRef,
                onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
                  if (!disabled && event.button === 0 && event.ctrlKey === false) {
                    event.currentTarget.focus();
                    context.onValueChange(value);
                  } else {
                    event.preventDefault();
                  }
                }),
                onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
                  if (disabled || event.target !== event.currentTarget) {
                    return;
                  }
                  if ([" ", "Enter"].includes(event.key)) {
                    context.onValueChange(value);
                  }
                }),
                onFocus: composeEventHandlers(props.onFocus, () => {
                  const isAutomaticActivation = context.activationMode !== ActivationMode.Manual;
                  if (!isSelected && !disabled && isAutomaticActivation) {
                    context.onValueChange(value);
                  }
                })
              }
            )
          }
        );
      }, "TabsTrigger")
    );
    var CONTENT_NAME2 = "TabsContent";
    var TabsContent = /* @__PURE__ */ React32.forwardRef(
      /* @__PURE__ */ __name22(function TabsContent2(props, forwardedRef) {
        const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
        const context = useTabsContext(CONTENT_NAME2, __scopeTabs);
        const triggerId = makeTriggerId(context.baseId, value);
        const contentId = makeContentId(context.baseId, value);
        const isSelected = value === context.value;
        const isMountAnimationPreventedRef = React32.useRef(isSelected);
        React32.useEffect(() => {
          const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
          return () => cancelAnimationFrame(rAF);
        }, []);
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          Primitive.div,
          {
            "data-state": isSelected ? "active" : "inactive",
            "data-orientation": context.orientation,
            role: "tabpanel",
            "aria-labelledby": triggerId,
            hidden: !present,
            id: contentId,
            tabIndex: 0,
            ...contentProps,
            ref: forwardedRef,
            style: {
              ...props.style,
              animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
            },
            children: present && children
          }
        ) });
      }, "TabsContent")
    );
    function makeTriggerId(baseId, value) {
      return `${baseId}-trigger-${value}`;
    }
    __name22(makeTriggerId, "makeTriggerId");
    function makeContentId(baseId, value) {
      return `${baseId}-content-${value}`;
    }
    __name22(makeContentId, "makeContentId");

    // src/client.js
    var inject = ["slots", "locale"];
    var h = React33.createElement;
    var { useEffect: useEffect19, useRef: useRef17, useState: useState17 } = React33;
    var API = "/api/java-ops";
    var LANG = String(navigator && navigator.language || "en").toLowerCase().startsWith("zh") ? "zh" : "en";
    var TEXT = {
      zh: {
        view: "\u8FD0\u884C\u670D\u52A1",
        services: "\u670D\u52A1",
        sql: "SQL",
        settings: "\u8BBE\u7F6E",
        workspace: "\u5DE5\u4F5C\u533A",
        wsFollow: "\u8DDF\u968F\u5F53\u524D\u4F1A\u8BDD",
        wsScope: "\u670D\u52A1\u3001\u6570\u636E\u5E93\u8FDE\u63A5\u3001SQL \u6267\u884C\u8BB0\u5F55\u3001\u6743\u9650\u3001\u6784\u5EFA\u5F00\u5173\u90FD\u6309\u5DE5\u4F5C\u533A\u5404\u5B58\u4E00\u5957\uFF0C\u5207\u6362\u5DE5\u4F5C\u533A\u5373\u6574\u5957\u5207\u6362\u3002",
        add: "\u6DFB\u52A0\u670D\u52A1",
        addTitle: "\u6DFB\u52A0\u670D\u52A1",
        addHint: "\u8F93\u5165\u5305\u540D\u6216\u7C7B\u540D\uFF0C\u4E0B\u62C9\u91CC\u4F1A\u8054\u60F3\u5DF2\u626B\u5230\u7684\u542F\u52A8\u7C7B\uFF1B\u4E5F\u53EF\u4EE5\u76F4\u63A5\u586B\u5168\u9650\u5B9A\u7C7B\u540D\u3002",
        noCandidates: "\u8FD9\u4E2A\u5DE5\u4F5C\u533A\u91CC\u6CA1\u626B\u5230 Spring Boot \u542F\u52A8\u7C7B\uFF0C\u53EF\u4EE5\u76F4\u63A5\u624B\u586B\u7C7B\u540D\u3002",
        errMainClass: "\u8BF7\u586B\u5199\u5168\u9650\u5B9A\u7C7B\u540D",
        errMainClassMissing: "\u5728\u9879\u76EE\u91CC\u627E\u4E0D\u5230\u8FD9\u4E2A\u7C7B\uFF0C\u68C0\u67E5\u4E00\u4E0B\u62FC\u5199",
        errName: "\u8BF7\u586B\u5199\u670D\u52A1\u540D",
        errPort: "\u8BF7\u586B\u5199\u7AEF\u53E3",
        checking: "\u6821\u9A8C\u4E2D\u2026",
        scanned: "\u5019\u9009",
        manual: "\u7C7B\u540D",
        manualHint: "com.example.DemoApplication",
        port: "\u7AEF\u53E3",
        profile: "profile",
        name: "\u670D\u52A1\u540D",
        vmArgs: "VM \u53C2\u6570",
        vmArgsHint: "-Xmx512m -Dspring.profiles.active=dev",
        confirm: "\u786E\u5B9A",
        cancel: "\u53D6\u6D88",
        blockedHint: "\u7AEF\u53E3\u88AB\u5360\u7528\uFF0C\u5DF2\u53D6\u6D88",
        edit: "\u7F16\u8F91",
        editTitle: "\u7F16\u8F91\u670D\u52A1",
        editHint: "\u7AEF\u53E3\u6539\u52A8\u4F1A\u5728\u4E0B\u6B21\u542F\u52A8\u65F6\u751F\u6548\uFF1BVM \u53C2\u6570\u6BCF\u6B21\u542F\u52A8\u90FD\u4F1A\u91CD\u65B0\u8BFB\u53D6\u3002",
        portBusyTitle: "\u7AEF\u53E3\u88AB\u5360\u7528",
        portBusyLine: "\u7AEF\u53E3 {port} \u5DF2\u88AB {process}\uFF08PID {pid}\uFF09\u5360\u7528\u3002",
        portBusyOwnedLine: "\u5360\u7528\u8005\u662F\u672C\u5DE5\u4F5C\u533A\u7684\u670D\u52A1\u300C{name}\u300D\uFF0C\u5173\u95ED\u5B83\u4F1A\u5148\u505C\u6389\u90A3\u4E2A\u670D\u52A1\u3002",
        portBusyAsk: "\u5173\u95ED\u5360\u7528\u8FDB\u7A0B\uFF0C\u7136\u540E\u542F\u52A8\u5F53\u524D\u670D\u52A1\uFF1F",
        portBusyKill: "\u5173\u95ED\u5E76\u542F\u52A8",
        start: "\u542F\u52A8",
        stop: "\u505C\u6B62",
        forceStop: "\u5F3A\u5236\u505C\u6B62",
        restart: "\u91CD\u542F",
        build: "\u6784\u5EFA",
        remove: "\u79FB\u9664",
        module: "\u6A21\u5757",
        main: "\u4E3B\u7C7B",
        pid: "PID",
        lastStart: "\u4E0A\u6B21\u542F\u52A8\u8017\u65F6",
        buildSkipped: "\u5DF2\u8DF3\u8FC7",
        logs: "\u65E5\u5FD7",
        filter: "\u8FC7\u6EE4",
        wrap: "\u81EA\u52A8\u6362\u884C",
        follow: "\u8DDF\u8E2A\u6700\u65B0",
        logTheme: "\u65E5\u5FD7\u914D\u8272",
        logEmpty: "\u8FD8\u6CA1\u6709\u65E5\u5FD7\u3002",
        state_running: "\u8FD0\u884C\u4E2D",
        state_stopped: "\u5DF2\u505C\u6B62",
        state_starting: "\u542F\u52A8\u4E2D",
        state_stopping: "\u505C\u6B62\u4E2D",
        state_building: "\u6784\u5EFA\u4E2D",
        state_failed: "\u5931\u8D25",
        state_killed: "\u5DF2\u5F3A\u6740",
        noServices: "\u8FD8\u6CA1\u6709\u670D\u52A1\uFF0C\u70B9\u300C\u6DFB\u52A0\u670D\u52A1\u300D\u5F00\u59CB\u3002",
        emptyTitle: "\u6DFB\u52A0\u7B2C\u4E00\u4E2A\u670D\u52A1",
        emptySub: "\u626B\u63CF\u9879\u76EE\u91CC\u7684 Spring Boot \u542F\u52A8\u7C7B\uFF0C\u9009\u4E00\u4E2A\u5C31\u80FD\u7F16\u8BD1\u3001\u542F\u52A8\u3001\u770B\u65E5\u5FD7\u3002",
        ops: "\u64CD\u4F5C\u8BB0\u5F55",
        opsEmpty: "\u8FD9\u4E2A\u670D\u52A1\u8FD8\u6CA1\u6709\u64CD\u4F5C\u8BB0\u5F55\u3002",
        expandLog: "\u653E\u5927",
        close: "\u5173\u95ED",
        inProgress: "\u8FDB\u884C\u4E2D",
        act_scan: "\u626B\u63CF\u9879\u76EE",
        act_save: "\u4FDD\u5B58\u670D\u52A1",
        act_remove: "\u79FB\u9664\u670D\u52A1",
        act_start: "\u542F\u52A8\u670D\u52A1",
        act_stop: "\u505C\u6B62\u670D\u52A1",
        act_restart: "\u91CD\u542F\u670D\u52A1",
        act_build: "\u6784\u5EFA\u670D\u52A1",
        act_logs: "\u8BFB\u53D6\u65E5\u5FD7",
        act_refresh: "\u5237\u65B0\u72B6\u6001",
        sqlHistory: "SQL \u6267\u884C\u8BB0\u5F55",
        connTitle: "\u6570\u636E\u5E93\u8FDE\u63A5",
        connListLabel: "\u8FDE\u63A5",
        connNew: "\u65B0\u5EFA\u8FDE\u63A5",
        connDriver: "\u7C7B\u578B",
        connUrl: "\u8FDE\u63A5 URL",
        connName: "\u540D\u79F0",
        connHost: "\u4E3B\u673A",
        connPort: "\u7AEF\u53E3",
        connDb: "\u6570\u636E\u5E93",
        connUser: "\u7528\u6237",
        connPassword: "\u5BC6\u7801",
        connPasswordSaved: "\u5DF2\u4FDD\u5B58\uFF0C\u7559\u7A7A\u8868\u793A\u4E0D\u4FEE\u6539",
        connSecure: "\u914D\u7F6E\u53EA\u4FDD\u5B58\u5728\u672C\u673A\uFF0C\u4E0D\u4F1A\u4E0A\u4F20\u5230\u4EFB\u4F55\u670D\u52A1\u5668\u3002",
        connStatus: "\u72B6\u6001",
        connTest: "\u8FDE\u63A5\u6D4B\u8BD5",
        connTesting: "\u6D4B\u8BD5\u4E2D\u2026",
        connTestOk: "\u8FDE\u63A5\u6D4B\u8BD5\u901A\u8FC7",
        connTestFail: "\u8FDE\u63A5\u6D4B\u8BD5\u5931\u8D25",
        connRemove: "\u5220\u9664\u8FDE\u63A5",
        connNone: "\u8FD8\u6CA1\u6709\u6570\u636E\u5E93\u8FDE\u63A5\uFF0C\u70B9\u300C\u8FDE\u63A5\u300D\u6DFB\u52A0\u3002",
        connSaved: "\u5DF2\u4FDD\u5B58",
        connPick: "\u9009\u62E9\u8FDE\u63A5",
        sqlNote: "SQL \u7531 Agent \u5DE5\u5177\u6267\u884C\uFF0C\u8FD9\u91CC\u53EA\u8BB0\u5F55\u6267\u884C\u6D41\u6C34\u3002",
        http: "\u63A5\u53E3",
        httpHeaders: "\u8BF7\u6C42\u5934",
        httpHeadersHint: "\u4FDD\u5B58\u540E\u6BCF\u6B21\u8C03\u7528\u90FD\u4F1A\u81EA\u52A8\u5E26\u4E0A\uFF1BAgent \u4E34\u65F6\u4F20\u7684\u540C\u540D\u5934\u4F18\u5148\u3002",
        httpName: "\u540D\u79F0",
        httpValue: "\u503C",
        httpEnabled: "\u542F\u7528",
        httpAdd: "\u65B0\u589E\u4E00\u884C",
        httpSave: "\u4FDD\u5B58\u8BF7\u6C42\u5934",
        httpSaved: "\u5DF2\u4FDD\u5B58",
        httpSaveFailed: "\u4FDD\u5B58\u5931\u8D25",
        httpLog: "\u8C03\u7528\u8BB0\u5F55",
        httpNote: "Agent \u901A\u8FC7 java_ops_http_request \u8C03\u7528\uFF0C\u8FD9\u91CC\u53EA\u8BB0\u5F55\u3002",
        httpDetail: "\u8BE6\u60C5",
        httpReqHeaders: "\u8BF7\u6C42\u5934",
        httpResHeaders: "\u54CD\u5E94\u5934",
        httpReqParams: "\u8BF7\u6C42\u53C2\u6570",
        httpReqBody: "\u8BF7\u6C42\u4F53",
        httpResBody: "\u54CD\u5E94\u4F53",
        httpBodyEmpty: "\uFF08\u7A7A\uFF09",
        httpTruncated: "\uFF08\u8D85\u8FC7 64 KB\uFF0C\u5DF2\u622A\u65AD\uFF09",
        col_method: "\u65B9\u6CD5",
        col_url: "\u63A5\u53E3",
        col_ms: "\u8017\u65F6",
        col_status: "\u72B6\u6001",
        sqlEmpty: "\u8FD8\u6CA1\u6709\u6267\u884C\u8BB0\u5F55\u3002",
        sqlDetail: "\u6267\u884C\u8BE6\u60C5",
        sqlOpen: "\u67E5\u770B\u5B8C\u6574 SQL",
        col_at: "\u65F6\u95F4",
        col_op: "\u64CD\u4F5C\u7C7B\u578B",
        col_sql: "\u6267\u884C SQL",
        col_ok: "\u662F\u5426\u6210\u529F",
        col_affected: "\u5F71\u54CD\u6761\u6570",
        okYes: "\u6210\u529F",
        okNo: "\u5931\u8D25",
        settingsBuild: "\u542F\u52A8\u524D\u81EA\u52A8\u6784\u5EFA",
        proxyTitle: "\u7F51\u7EDC\u4EE3\u7406",
        proxyLabel: "\u4EE3\u7406\u5730\u5740",
        proxyHint: "\u7559\u7A7A\u8868\u793A\u76F4\u8FDE\u3002\u89C4\u5219\u5305\u4ECE GitHub \u4E0B\u8F7D\uFF0C\u8D70\u672C\u673A\u4EE3\u7406\u901A\u5E38\u5FEB\u5F88\u591A\u3002",
        proxySave: "\u4FDD\u5B58",
        proxySaved: "\u5DF2\u4FDD\u5B58",
        proxyInvalid: "\u4EE3\u7406\u5730\u5740\u683C\u5F0F\u4E0D\u5BF9",
        settingsBuildHint: "\u6E90\u7801\u6CA1\u53D8\u65F6\u81EA\u52A8\u8DF3\u8FC7\u6784\u5EFA\u3002",
        settingsData: "\u6570\u636E\u76EE\u5F55",
        settingsPerms: "SQL \u64CD\u4F5C\u6388\u6743",
        permAllow: "\u5141\u8BB8\u6267\u884C",
        permCat: "\u7C7B\u522B",
        permGrant: "\u6388\u6743",
        permConfirm: "\u9AD8\u98CE\u9669",
        permRead: "\u8BFB",
        permReadHint: "SELECT",
        permWrite: "\u5199",
        permWriteHint: "INSERT / UPDATE / ALTER / CREATE",
        permDelete: "\u5220",
        permDeleteHint: "DELETE / DROP / TRUNCATE",
        permDenied: "\u672A\u5141\u8BB8\u7684\u8BED\u53E5\u76F4\u63A5\u62D2\u7EDD\u6267\u884C\u3002",
        lintTitle: "Java \u4EE3\u7801\u6821\u9A8C",
        lintCheckAll: "\u68C0\u67E5\u5168\u90E8\u66F4\u65B0",
        lintRunning: "\u68C0\u67E5\u4E2D\u2026",
        lintLastRun: "\u4E0A\u6B21\u68C0\u67E5",
        lintRunClean: "\u672A\u53D1\u73B0\u95EE\u9898",
        lintRunFailed: "\u5931\u8D25",
        lintRuleSet: "\u89C4\u5219\u96C6",
        lintThreshold: "\u547D\u4E2D\u9608\u503C",
        lintCpd: "\u9644\u52A0\u68C0\u67E5",
        lintCpdText: "\u540C\u65F6\u67E5\u91CD\u590D\u4EE3\u7801\uFF08CPD\uFF0C\u2265 100 \u884C\uFF09",
        lintPremise: "\u524D\u63D0",
        lintPremiseText: "\u9700\u8981\u7F16\u8BD1\u4EA7\u7269\uFF08target/classes\uFF09\uFF0C\u590D\u7528\u6700\u8FD1\u4E00\u6B21\u6784\u5EFA\u3002",
        lintNotInstalled: "\u672A\u5B89\u88C5",
        lintDownloading: "\u4E0B\u8F7D\u4E2D",
        lintCheck: "\u68C0\u67E5\u66F4\u65B0",
        lintUpdate: "\u66F4\u65B0",
        lintCheckNow: "\u68C0\u67E5\u4E2D\u2026",
        lintUpToDate: "\u5DF2\u662F\u6700\u65B0",
        lintNewVersion: "\u6709\u65B0\u7248\u672C",
        lintCheckFailed: "\u68C0\u67E5\u5931\u8D25",
        lintUpdating: "\u66F4\u65B0\u4E2D",
        lintFailed: "\u4E0B\u8F7D\u5931\u8D25",
        lintBuildLock: "SpotBugs \u5DF2\u542F\u7528\uFF1A\u68C0\u67E5\u5FC5\u987B\u57FA\u4E8E\u7F16\u8BD1\u4EA7\u7269\uFF0C\u6240\u4EE5\u6784\u5EFA\u5F00\u5173\u4FDD\u6301\u5F00\u542F\u3002",
        lintStyle: "\u4EE3\u7801\u98CE\u683C\uFF1A\u547D\u540D\u3001\u884C\u5BBD\u3001import \u987A\u5E8F",
        lintSource: "\u6E90\u7801\u5199\u6CD5\uFF1A\u672A\u7528\u53D8\u91CF\u3001\u7A7A catch\u3001\u590D\u6742\u5EA6",
        lintBytecode: "\u7F16\u8BD1\u540E\u7F3A\u9677\uFF1ANPE \u98CE\u9669\u3001equals/hashCode\u3001\u8D44\u6E90\u6CC4\u6F0F",
        lintRsGoogle: "\u5185\u7F6E \xB7 Google \u98CE\u683C",
        lintRsSun: "\u5185\u7F6E \xB7 Sun \u98CE\u683C",
        lintRsAliyun: "\u5185\u7F6E \xB7 \u963F\u91CC\u5DF4\u5DF4\u89C4\u7EA6",
        lintRsPmd: "\u5185\u7F6E \xB7 \u6807\u51C6\u89C4\u5219\u96C6",
        lintRsPmdStrict: "\u5185\u7F6E \xB7 \u4E25\u683C\u89C4\u5219\u96C6\uFF08\u542B\u590D\u6742\u5EA6\u95E8\u7981\uFF09",
        lintRsSb: "\u5185\u7F6E \xB7 \u9ED8\u8BA4\u7F3A\u9677\u96C6",
        lintRsSbStrict: "\u5185\u7F6E \xB7 \u4E25\u683C\uFF08\u542B\u4F4E\u7F6E\u4FE1\u5EA6\uFF09",
        lintRsCustom: "\u5916\u90E8\u6587\u4EF6\u2026",
        lintRuleFile: "\u914D\u7F6E\u6587\u4EF6",
        lintPickFile: "\u9009\u62E9\u6587\u4EF6\u2026",
        lintLvWarn: "warn \u53CA\u4EE5\u4E0A",
        lintLvError: "error \u53CA\u4EE5\u4E0A",
        lintLvAll: "\u5168\u90E8",
        permConfirmHint: "\u5F00\u542F\u540E\u9AD8\u98CE\u9669\u8BED\u53E5\u6267\u884C\u524D\u4F1A\u5F39\u5BA1\u6279\u3002",
        confirmTitle: "\u6267\u884C {group} \u8BED\u53E5",
        confirmBody: "\u8FD9\u6761\u8BED\u53E5\u8981\u6539\u52A8 {connection}\uFF0C\u786E\u8BA4\u540E\u624D\u4F1A\u6267\u884C\u3002",
        confirmRun: "\u6267\u884C",
        confirmCancel: "\u53D6\u6D88",
        confirmWaiting: "\u7B49\u5F85\u786E\u8BA4\u2026",
        errPrefix: "\u51FA\u9519\u4E86\uFF1A",
        loading: "\u8F7D\u5165\u4E2D\u2026"
      },
      en: {
        view: "Services",
        services: "Services",
        sql: "SQL",
        settings: "Settings",
        workspace: "Workspace",
        wsFollow: "follows this session",
        wsScope: "Services, database connections, the SQL audit trail, permissions and the build toggle are all per workspace.",
        add: "Add service",
        addTitle: "Add service",
        addHint: "Type a package or class name to see matching scanned entry classes; a fully qualified name works too.",
        noCandidates: "No Spring Boot entry class in this workspace; type the class name.",
        errMainClass: "Enter the fully qualified class name",
        errMainClassMissing: "This class does not exist in the project",
        errName: "Enter a service name",
        errPort: "Enter a port",
        checking: "Checking\u2026",
        scanned: "Candidates",
        manual: "Class",
        manualHint: "com.example.DemoApplication",
        port: "Port",
        profile: "Profile",
        name: "Name",
        vmArgs: "VM args",
        vmArgsHint: "-Xmx512m -Dspring.profiles.active=dev",
        confirm: "OK",
        cancel: "Cancel",
        blockedHint: "port busy, cancelled",
        edit: "Edit",
        editTitle: "Edit service",
        editHint: "A new port takes effect on the next start; VM args are read on every start.",
        portBusyTitle: "Port in use",
        portBusyLine: "Port {port} is already used by {process} (PID {pid}).",
        portBusyOwnedLine: 'It belongs to the workspace service "{name}"; closing it stops that service first.',
        portBusyAsk: "Close that process and start this service?",
        portBusyKill: "Close and start",
        start: "Start",
        stop: "Stop",
        forceStop: "Force stop",
        restart: "Restart",
        build: "Build",
        remove: "Remove",
        module: "Module",
        main: "Main",
        pid: "PID",
        lastStart: "Last start",
        buildSkipped: "skipped",
        logs: "Logs",
        filter: "Filter",
        wrap: "Wrap lines",
        follow: "Follow",
        logTheme: "Log palette",
        logEmpty: "No logs yet.",
        state_running: "running",
        state_stopped: "stopped",
        state_starting: "starting",
        state_stopping: "stopping",
        state_building: "building",
        state_failed: "failed",
        state_killed: "killed",
        noServices: 'No services yet \u2014 use "Add service".',
        emptyTitle: "Add your first service",
        emptySub: "Scan the project for Spring Boot entry points, then build, start and follow the logs.",
        ops: "Activity",
        opsEmpty: "No operations recorded for this service yet.",
        expandLog: "Expand",
        close: "Close",
        inProgress: "in progress",
        act_scan: "Scan project",
        act_save: "Save service",
        act_remove: "Remove service",
        act_start: "Start service",
        act_stop: "Stop service",
        act_restart: "Restart service",
        act_build: "Build service",
        act_logs: "Read logs",
        act_refresh: "Refresh state",
        sqlHistory: "SQL history",
        connTitle: "Database connections",
        connListLabel: "Connections",
        connNew: "New connection",
        connDriver: "Driver",
        connUrl: "JDBC URL",
        connName: "Name",
        connHost: "Host",
        connPort: "Port",
        connDb: "Database",
        connUser: "User",
        connPassword: "Password",
        connPasswordSaved: "saved, leave blank to keep",
        connSecure: "Stored on this machine only; nothing is uploaded anywhere.",
        connStatus: "Status",
        connTest: "Test connection",
        connTesting: "Testing\u2026",
        connTestOk: "Connection OK",
        connTestFail: "Connection failed",
        connRemove: "Delete connection",
        connNone: 'No database connection yet \u2014 click "Connection" to add one.',
        connSaved: "Saved",
        connPick: "Pick a connection",
        sqlNote: "SQL runs through Agent tools; this page only records it.",
        http: "HTTP",
        httpHeaders: "Request headers",
        httpHeadersHint: "Saved headers are applied to every call; headers passed by the agent win on the same name.",
        httpName: "Name",
        httpValue: "Value",
        httpEnabled: "On",
        httpAdd: "Add row",
        httpSave: "Save headers",
        httpSaved: "Saved",
        httpSaveFailed: "Save failed",
        httpLog: "Calls",
        httpNote: "Sent by the agent through java_ops_http_request; this page only records them.",
        httpDetail: "Details",
        httpReqHeaders: "Request headers",
        httpResHeaders: "Response headers",
        httpReqParams: "Request parameters",
        httpReqBody: "Request body",
        httpResBody: "Response body",
        httpBodyEmpty: "(empty)",
        httpTruncated: "(over 64 KB, truncated)",
        col_method: "Method",
        col_url: "URL",
        col_ms: "Duration",
        col_status: "Status",
        sqlEmpty: "No statements executed yet.",
        sqlDetail: "Statement detail",
        sqlOpen: "Open the full statement",
        col_at: "Time",
        col_op: "Type",
        col_sql: "SQL",
        col_ok: "Result",
        col_affected: "Rows",
        okYes: "OK",
        okNo: "Failed",
        settingsBuild: "Build before start",
        proxyTitle: "Network proxy",
        proxyLabel: "Proxy URL",
        proxyHint: "Leave empty to connect directly. Rule packages come from GitHub; a local proxy is usually much faster.",
        proxySave: "Save",
        proxySaved: "Saved",
        proxyInvalid: "The proxy URL is not valid",
        settingsBuildHint: "Skipped automatically when sources are unchanged.",
        settingsData: "Data directory",
        settingsPerms: "SQL permissions",
        permAllow: "Allow",
        permCat: "Category",
        permGrant: "Grant",
        permConfirm: "High risk",
        permRead: "Read",
        permReadHint: "SELECT",
        permWrite: "Write",
        permWriteHint: "INSERT / UPDATE / ALTER / CREATE",
        permDelete: "Delete",
        permDeleteHint: "DELETE / DROP / TRUNCATE",
        permDenied: "Statements that are not allowed are rejected outright.",
        lintTitle: "Java checks",
        lintCheckAll: "Check all updates",
        lintRunning: "Checking...",
        lintLastRun: "Last run",
        lintRunClean: "No issues",
        lintRunFailed: "failed",
        lintRuleSet: "Rule set",
        lintThreshold: "Report from",
        lintCpd: "Extra check",
        lintCpdText: "Also look for duplicated code (CPD, >= 100 lines)",
        lintPremise: "Needs",
        lintPremiseText: "Compiled classes (target/classes); reuses the last build.",
        lintNotInstalled: "Not installed",
        lintDownloading: "Downloading",
        lintCheck: "Check for updates",
        lintUpdate: "Update",
        lintCheckNow: "Checking...",
        lintUpToDate: "Up to date",
        lintNewVersion: "New version",
        lintCheckFailed: "Check failed",
        lintUpdating: "Updating",
        lintFailed: "Download failed",
        lintBuildLock: "SpotBugs is on: it reads compiled classes, so the build switch stays on.",
        lintStyle: "Style: naming, line length, import order",
        lintSource: "Source: unused variables, empty catch, complexity",
        lintBytecode: "Bytecode: NPE risks, equals/hashCode, resource leaks",
        lintRsGoogle: "Built-in: Google style",
        lintRsSun: "Built-in: Sun style",
        lintRsAliyun: "Built-in: Alibaba guide",
        lintRsPmd: "Built-in: standard rules",
        lintRsPmdStrict: "Built-in: strict (with complexity gates)",
        lintRsSb: "Built-in: default bug set",
        lintRsSbStrict: "Built-in: strict (low confidence too)",
        lintRsCustom: "External file...",
        lintRuleFile: "Config file",
        lintPickFile: "Choose file\u2026",
        lintLvWarn: "warn and above",
        lintLvError: "error and above",
        lintLvAll: "Everything",
        permConfirmHint: "High-risk statements ask for approval before running.",
        confirmTitle: "Run this {group} statement",
        confirmBody: "It will change {connection}. Nothing runs until you confirm.",
        confirmRun: "Run",
        confirmCancel: "Cancel",
        confirmWaiting: "Waiting for confirmation\u2026",
        errPrefix: "Error: ",
        loading: "Loading\u2026"
      }
    };
    var STATE_KEY = {
      running: "state_running",
      starting: "state_starting",
      stopping: "state_stopping",
      building: "state_building",
      failed: "state_failed",
      killed: "state_killed",
      stopped: "state_stopped"
    };
    var txt = (key) => (LANG === "zh" ? TEXT.zh : TEXT.en)[key] ?? key;
    var LOCAL_LOG_LINES = 2e3;
    var VISIBLE_LOG_LINES = 400;
    var CSS2 = `
    /* ===================== \u8BBE\u8BA1\u53D8\u91CF =====================
       \u4E00\u5957\u53D8\u91CF\u7BA1\u4F4F\u5168\u7AD9\u7684\u95F4\u8DDD\u3001\u5706\u89D2\u3001\u63A7\u4EF6\u9AD8\u5EA6\u3001\u7070\u9636\u4E0E\u9634\u5F71\uFF0C
       \u5404\u9875\u7B7E\u53EA\u5F15\u7528\u53D8\u91CF\uFF0C\u4E0D\u518D\u5404\u81EA\u5199\u5177\u4F53\u6570\u503C\u3002 */
    /* Radix \u7ED9\u975E\u6FC0\u6D3B\u9875\u7B7E\u6302 hidden\uFF0C\u800C\u7C7B\u9009\u62E9\u5668\u7684 display:flex \u4F1A\u76D6\u6389\u5B83\uFF0C
       \u56DB\u4E2A\u9875\u7B7E\u5C31\u5404\u5206\u8D70\u56DB\u5206\u4E4B\u4E00\u9AD8\u5EA6\uFF0C\u754C\u9762\u770B\u8D77\u6765\u53EA\u663E\u793A\u4E86\u4E00\u5C0F\u6761\u3002 */
    .jops-tabpane[hidden],[role="tabpanel"][hidden]{display:none}
    .jops-tabpane{display:flex;flex-direction:column;min-height:0;flex:1}
    .jops-root{
      --jops-s1:4px;--jops-s2:8px;--jops-s3:12px;--jops-s4:16px;--jops-s5:20px;--jops-s6:24px;
      --jops-r-sm:4px;--jops-r:6px;--jops-r-lg:8px;--jops-r-xl:12px;--jops-r-full:999px;
      --jops-h:28px;--jops-h-sm:24px;
      --jops-bg:var(--dsw-alias-bg-base);
      --jops-surface:var(--dsw-alias-bg-layer-1);
      --jops-surface-2:var(--dsw-alias-bg-layer-2);
      --jops-line:var(--dsw-alias-border-l2);
      --jops-line-soft:var(--dsw-alias-border-l1);
      --jops-fg:var(--dsw-alias-label-primary);
      --jops-fg-muted:var(--dsw-alias-label-secondary);
      --jops-fg-subtle:var(--dsw-alias-label-tertiary);
      --jops-brand:var(--dsw-alias-brand-primary);
      --jops-ring:color-mix(in srgb, var(--dsw-alias-brand-primary) 22%, transparent);
      --jops-shadow-sm:0 1px 2px rgba(16,24,40,.05);
      --jops-shadow:0 1px 3px rgba(16,24,40,.07),0 1px 2px rgba(16,24,40,.04);
      --jops-shadow-lg:0 18px 48px rgba(16,24,40,.2),0 2px 8px rgba(16,24,40,.08);
      --jops-mono:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
      --jops-ease:cubic-bezier(.2,.8,.2,1);
      position:relative;display:flex;flex-direction:column;height:100%;min-height:0;overflow:hidden;
      background:var(--jops-bg);color:var(--jops-fg);font-size:13px;line-height:1.5;z-index:1;
    }
    .jops-log-wrap.jops-log-full{position:absolute;inset:var(--jops-s3);z-index:30;display:flex;flex-direction:column;background:var(--jops-bg);border:1px solid var(--jops-line);border-radius:var(--jops-r-xl);box-shadow:var(--jops-shadow-lg)}

    /* ===================== \u9876\u90E8\u9875\u7B7E ===================== */
    .jops-top{display:flex;align-items:center;gap:var(--jops-s2);padding:0 var(--jops-s4);border-bottom:1px solid var(--jops-line);flex:none;min-height:40px}
    .jops-seg{display:inline-flex;gap:2px;height:40px;align-items:stretch}
    .jops-seg [role="tablist"]{display:inline-flex;gap:2px;height:100%;align-items:stretch}
    .jops-seg [role="tab"]{position:relative;background:transparent;border:0;color:var(--jops-fg-muted);padding:0 var(--jops-s3);font:inherit;font-weight:500;cursor:pointer;transition:color .15s var(--jops-ease)}
    .jops-seg [role="tab"]:hover{color:var(--jops-fg)}
    .jops-seg [role="tab"][data-state="active"]{color:var(--jops-fg)}
    .jops-seg [role="tab"][data-state="active"]::after{content:'';position:absolute;left:8px;right:8px;bottom:0;height:2px;border-radius:2px 2px 0 0;background:var(--jops-brand);animation:jops-ink .22s var(--jops-ease)}
    .jops-seg [role="tab"]:focus-visible{outline:none;color:var(--jops-fg)}
    .jops-seg [role="tab"]:focus-visible::before{content:'';position:absolute;inset:9px 5px;border-radius:var(--jops-r-sm);box-shadow:var(--jops-ring)}
    @keyframes jops-ink{from{transform:scaleX(.4);opacity:.4}to{transform:none;opacity:1}}
    .jops-spacer{flex:1}
    .jops-ws{color:var(--jops-fg-muted);font-size:12px;display:inline-flex;align-items:center;gap:6px;height:var(--jops-h-sm);padding:0 10px;border:1px solid var(--jops-line);border-radius:var(--jops-r-full);background:var(--jops-surface);max-width:280px}
    .jops-ws b{color:var(--jops-fg);font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .jops-note{margin:var(--jops-s2) var(--jops-s4) 0;padding:var(--jops-s2) var(--jops-s3);border-radius:var(--jops-r);border:1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 28%, transparent);background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 8%, transparent);color:var(--dsw-alias-state-error-primary);font-size:12px;flex:none}
    .jops-pane{display:flex;flex-direction:column;min-height:0;flex:1}
    .jops-subtabs{display:flex;gap:2px;padding:0 var(--jops-s4);border-bottom:1px solid var(--jops-line);flex:none;height:32px;align-items:stretch}
    /* \u5185\u5BB9\u533A\u8981\u63A5\u4F4F\u5269\u4F59\u7684\u7AD6\u5411\u7A7A\u95F4\uFF0CLogPane \u9760\u5B83\u6491\u6EE1 */
    .jops-pane-body{display:flex;flex-direction:column;min-height:0;flex:1}
    .jops-pane-body>[role="tabpanel"]{display:flex;flex-direction:column;min-height:0;flex:1}
    .jops-pane-body>[role="tabpanel"][hidden]{display:none}
    .jops-subtabs [role="tab"]{position:relative;background:transparent;border:0;color:var(--jops-fg-muted);padding:0 10px;font:inherit;font-size:12px;font-weight:500;cursor:pointer;transition:color .15s var(--jops-ease)}
    .jops-subtabs [role="tab"]:hover{color:var(--jops-fg)}
    .jops-subtabs [role="tab"][data-state="active"]{color:var(--jops-fg)}
    .jops-subtabs [role="tab"][data-state="active"]::after{content:'';position:absolute;left:8px;right:8px;bottom:-1px;height:2px;border-radius:2px 2px 0 0;background:var(--jops-brand)}
    .jops-subtabs [role="tab"]:focus-visible{outline:none;box-shadow:var(--jops-ring)}
    .jops-oplog div{white-space:pre-wrap;word-break:break-all}
    .jops-oplog div[data-status="error"]{color:var(--dsw-alias-state-error-primary)}
    .jops-oplog div[data-status="blocked"]{color:var(--dsw-alias-state-warning-primary)}

    /* ===================== \u670D\u52A1\u9875 ===================== */
    .jops-body{display:flex;min-height:0;flex:1}
    .jops-side{width:248px;flex:none;display:flex;flex-direction:column;border-right:1px solid var(--jops-line);min-height:0;background:var(--jops-surface)}
    .jops-side-head{display:flex;align-items:center;gap:var(--jops-s2);padding:var(--jops-s3) var(--jops-s3) var(--jops-s2)}
    .jops-side-head b{font-weight:600;font-size:12px;color:var(--jops-fg-muted);letter-spacing:.01em}
    .jops-side-list{overflow:auto;min-height:0;flex:1;padding:0 var(--jops-s2) var(--jops-s3);display:flex;flex-direction:column;gap:1px}
    .jops-empty-center{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--jops-s2);text-align:center;padding:var(--jops-s6) var(--jops-s5)}
    .jops-empty-art{width:44px;height:44px;border-radius:var(--jops-r-full);display:flex;align-items:center;justify-content:center;background:var(--jops-surface-2);color:var(--jops-fg-subtle);font-size:22px;font-weight:300;margin-bottom:var(--jops-s1)}
    .jops-empty-title{font-size:14px;font-weight:600;color:var(--jops-fg)}
    .jops-empty-sub{font-size:12px;color:var(--jops-fg-muted);max-width:34em;line-height:1.6;margin-bottom:var(--jops-s2)}
    .jops-svc{display:flex;gap:var(--jops-s2);align-items:center;height:32px;padding:0 10px;border-radius:var(--jops-r);cursor:pointer;color:var(--jops-fg-muted);transition:background .12s var(--jops-ease),color .12s var(--jops-ease),box-shadow .12s var(--jops-ease)}
    .jops-svc:hover{background:var(--jops-surface-2);color:var(--jops-fg)}
    .jops-svc:focus-visible{outline:none;box-shadow:var(--jops-ring)}
    .jops-svc[data-on="true"]{background:var(--jops-bg);color:var(--jops-fg);box-shadow:inset 0 0 0 1px var(--jops-line),var(--jops-shadow-sm)}
    .jops-svc-name{font-weight:500;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .jops-svc-port{flex:none;color:var(--jops-fg-subtle);font-size:11.5px;font-family:var(--jops-mono);font-variant-numeric:tabular-nums;border-left:1px solid var(--jops-line);padding-left:var(--jops-s2);line-height:12px}
    .jops-dot{width:7px;height:7px;border-radius:50%;flex:none;background:var(--dsw-alias-state-idle-primary);color:var(--dsw-alias-state-idle-primary);box-shadow:0 0 0 2px color-mix(in srgb, currentColor 16%, transparent)}
    .jops-dot[data-state="running"]{background:var(--dsw-alias-state-success-primary);color:var(--dsw-alias-state-success-primary)}
    .jops-dot[data-state="starting"],.jops-dot[data-state="building"],.jops-dot[data-state="stopping"]{background:var(--dsw-alias-state-warn-primary);color:var(--dsw-alias-state-warn-primary)}
    .jops-dot[data-state="failed"],.jops-dot[data-state="killed"]{background:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-state-error-primary)}
    .jops-dot[data-busy="true"]{position:relative}
    .jops-dot[data-busy="true"]::after{content:'';position:absolute;inset:-3px;border-radius:50%;border:1.5px solid currentColor;animation:jops-ring 1.2s var(--jops-ease) infinite}
    @keyframes jops-ring{0%{transform:scale(.75);opacity:.75}70%{opacity:.15}100%{transform:scale(2);opacity:0}}
    .jops-spin{width:10px;height:10px;border-radius:50%;display:inline-block;vertical-align:-1px;margin-right:5px;border:1.5px solid color-mix(in srgb, currentColor 28%, transparent);border-top-color:currentColor;animation:jops-spin .7s linear infinite}
    @keyframes jops-spin{to{transform:rotate(360deg)}}
    .jops-btn[data-busy="true"]:disabled{opacity:1;cursor:progress}
    .jops-pill[data-state="starting"],.jops-pill[data-state="building"],.jops-pill[data-state="stopping"]{animation:jops-pulse 1.4s ease-in-out infinite}
    .jops-pulse{animation:jops-pulse 1.1s ease-in-out infinite}
    @keyframes jops-pulse{0%,100%{opacity:1}50%{opacity:.25}}
    .jops-main{flex:1;min-width:0;display:flex;flex-direction:column;min-height:0;padding:var(--jops-s3) var(--jops-s4);gap:var(--jops-s3)}
    .jops-detail-head{display:flex;align-items:center;gap:var(--jops-s2);flex-wrap:wrap}
    .jops-title{font-size:15px;font-weight:600;letter-spacing:-.01em}
    .jops-actions{display:flex;gap:var(--jops-s1);margin-left:auto;flex-wrap:wrap}

    /* ===================== \u63A7\u4EF6\uFF1A\u6309\u94AE / \u8F93\u5165 / \u590D\u9009 ===================== */
    .jops-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:var(--jops-h);padding:0 10px;font:inherit;font-size:12.5px;font-weight:500;line-height:1;white-space:nowrap;border-radius:var(--jops-r);border:1px solid var(--jops-line);background:var(--jops-bg);color:var(--jops-fg);cursor:pointer;transition:background .12s var(--jops-ease),border-color .12s var(--jops-ease),box-shadow .12s var(--jops-ease),opacity .12s var(--jops-ease)}
    .jops-btn:hover:not(:disabled){background:var(--jops-surface-2)}
    .jops-btn:focus-visible{outline:none;box-shadow:var(--jops-ring)}
    .jops-btn:disabled{opacity:.45;cursor:not-allowed}
    .jops-btn[data-primary="true"]{background:var(--jops-brand);border-color:transparent;color:#fff}
    .jops-btn[data-primary="true"]:hover:not(:disabled){background:color-mix(in srgb, var(--jops-brand) 84%, #000);border-color:transparent;color:#fff}
    .jops-btn[data-dark="true"]{background:#1f2328;border-color:transparent;color:#fff}
    .jops-btn[data-dark="true"]:hover:not(:disabled){background:#101317;border-color:transparent;color:#fff}
    .jops-btn[data-ghost="true"]{background:transparent;border-color:transparent;color:var(--jops-fg-muted)}
    .jops-btn[data-ghost="true"]:hover:not(:disabled){background:var(--jops-surface-2);color:var(--jops-fg)}
    /* \u8BED\u4E49\u64CD\u4F5C\uFF1A\u6DE1\u5E95 + \u540C\u8272\u63CF\u8FB9 + \u540C\u8272\u6587\u5B57\uFF0C\u6BD4\u7EAF\u5E95\u8272\u66F4\u597D\u8BFB */
    .jops-btn[data-act="start"]{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 10%, transparent);border-color:color-mix(in srgb, var(--dsw-alias-state-success-primary) 26%, transparent)}
    .jops-btn[data-act="start"]:hover:not(:disabled){background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 16%, transparent)}
    .jops-btn[data-act="stop"]{color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 9%, transparent);border-color:color-mix(in srgb, var(--dsw-alias-state-error-primary) 24%, transparent)}
    .jops-btn[data-act="stop"]:hover:not(:disabled){background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 15%, transparent)}
    .jops-btn[data-act="restart"]{color:var(--jops-brand);background:color-mix(in srgb, var(--jops-brand) 10%, transparent);border-color:color-mix(in srgb, var(--jops-brand) 26%, transparent)}
    .jops-btn[data-act="restart"]:hover:not(:disabled){background:color-mix(in srgb, var(--jops-brand) 16%, transparent)}
    .jops-btn[data-act="build"]{color:var(--dsw-alias-state-warning-primary);background:color-mix(in srgb, var(--dsw-alias-state-warning-primary) 10%, transparent);border-color:color-mix(in srgb, var(--dsw-alias-state-warning-primary) 26%, transparent)}
    .jops-btn[data-act="build"]:hover:not(:disabled){background:color-mix(in srgb, var(--dsw-alias-state-warning-primary) 16%, transparent)}
    .jops-btn[data-act="edit"]{color:#0d9488;background:color-mix(in srgb, #0d9488 10%, transparent);border-color:color-mix(in srgb, #0d9488 26%, transparent)}
    .jops-btn[data-act="edit"]:hover:not(:disabled){background:color-mix(in srgb, #0d9488 16%, transparent)}
    .jops-btn[data-act="remove"]{color:var(--dsw-alias-state-error-primary);background:transparent;border-color:color-mix(in srgb, var(--dsw-alias-state-error-primary) 22%, transparent)}
    .jops-btn[data-act="remove"]:hover:not(:disabled){background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 10%, transparent)}
    .jops-pill{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;font-weight:500;padding:1px 8px;border-radius:var(--jops-r-full);border:1px solid var(--jops-line);background:var(--jops-surface);color:var(--jops-fg-muted);line-height:17px}
    .jops-pill[data-state="running"]{color:var(--dsw-alias-state-success-primary);border-color:color-mix(in srgb, var(--dsw-alias-state-success-primary) 26%, transparent);background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 8%, transparent)}
    .jops-pill[data-state="failed"],.jops-pill[data-state="killed"]{color:var(--dsw-alias-state-error-primary);border-color:color-mix(in srgb, var(--dsw-alias-state-error-primary) 26%, transparent);background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 8%, transparent)}
    .jops-pill[data-state="starting"],.jops-pill[data-state="building"],.jops-pill[data-state="stopping"]{color:var(--dsw-alias-state-warning-primary);border-color:color-mix(in srgb, var(--dsw-alias-state-warning-primary) 26%, transparent);background:color-mix(in srgb, var(--dsw-alias-state-warning-primary) 8%, transparent)}
    .jops-meta{display:flex;gap:var(--jops-s4);flex-wrap:wrap;font-size:12px;color:var(--jops-fg-muted);align-items:center}
    .jops-meta b{color:var(--jops-fg);font-weight:500;font-family:var(--jops-mono);font-size:11.5px;font-variant-numeric:tabular-nums}
    .jops-input{box-sizing:border-box;font:inherit;font-size:12.5px;height:var(--jops-h);padding:0 10px;border-radius:var(--jops-r);border:1px solid var(--jops-line);background:var(--jops-bg);color:var(--jops-fg);min-width:0;transition:border-color .12s var(--jops-ease),box-shadow .12s var(--jops-ease)}
    .jops-input::placeholder{color:var(--jops-fg-subtle)}
    .jops-input:hover:not(:focus){border-color:color-mix(in srgb, var(--jops-fg) 22%, transparent)}
    .jops-input:focus{outline:none;border-color:var(--jops-brand);box-shadow:var(--jops-ring)}
    select.jops-input{appearance:none;padding-right:26px;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%236b7280' stroke-width='1.6' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 9px center}
    textarea.jops-input,textarea.jops-textarea{height:auto;padding:6px 10px;line-height:1.55}
    .jops-textarea{height:96px;min-height:96px;max-height:40vh;resize:vertical;overflow:auto;overscroll-behavior:contain;scrollbar-gutter:stable;font-family:var(--jops-mono)}
    .jops-check{display:inline-flex;align-items:center;gap:6px;cursor:pointer;font-size:12.5px}

    /* ===================== \u65E5\u5FD7\u533A ===================== */
    .jops-log-wrap{display:flex;flex-direction:column;min-height:0;flex:1;border:1px solid var(--jops-line);border-radius:var(--jops-r-lg);overflow:hidden;box-shadow:var(--jops-shadow-sm);--jops-log-bg:var(--dsw-alias-bg-base);--jops-log-fg:var(--dsw-alias-label-primary);--jops-log-dim:var(--dsw-alias-label-secondary);--jops-log-info:#1a6fd4;--jops-log-warn:#9a6700;--jops-log-err:#cf222e;--jops-log-exc:#a40e26;background:var(--jops-log-bg)}
    .jops-log-wrap[data-theme="paper"]{--jops-log-bg:#fdf6e3;--jops-log-fg:#586e75;--jops-log-dim:#93a1a1;--jops-log-info:#268bd2;--jops-log-warn:#b58900;--jops-log-err:#dc322f;--jops-log-exc:#cb4b16;border-color:#e6dfc8}
    .jops-log-wrap[data-theme="graphite"]{--jops-log-bg:#23272e;--jops-log-fg:#c9d1d9;--jops-log-dim:#7d8590;--jops-log-info:#79c0ff;--jops-log-warn:#e3b341;--jops-log-err:#ff7b72;--jops-log-exc:#ffa198;border-color:#333a44}
    .jops-log-wrap[data-theme="midnight"]{--jops-log-bg:#0d1117;--jops-log-fg:#c9d1d9;--jops-log-dim:#6e7681;--jops-log-info:#58a6ff;--jops-log-warn:#d29922;--jops-log-err:#f85149;--jops-log-exc:#ff7b72;border-color:#21262d}
    .jops-log-head{display:flex;align-items:center;gap:var(--jops-s2);padding:var(--jops-s2) var(--jops-s3);border-bottom:1px solid color-mix(in srgb, var(--jops-log-fg) 14%, transparent);font-size:12px;color:var(--jops-log-dim);background:var(--jops-log-bg)}
    .jops-log-head .jops-input,.jops-log-head .jops-btn{height:var(--jops-h-sm);background:color-mix(in srgb, var(--jops-log-fg) 7%, transparent);border-color:color-mix(in srgb, var(--jops-log-fg) 20%, transparent);color:var(--jops-log-fg)}
    .jops-log-head .jops-btn:hover:not(:disabled){background:color-mix(in srgb, var(--jops-log-fg) 14%, transparent)}
    .jops-log-head .jops-check{color:var(--jops-log-dim)}
    .jops-follow{display:inline-flex;align-items:center;gap:6px;color:var(--jops-log-dim)}
    .jops-follow-label{font-size:12.5px}
    .jops-log{flex:1;min-height:0;overflow:auto;padding:var(--jops-s2) var(--jops-s3);font-family:var(--jops-mono);font-size:12px;line-height:1.6;scrollbar-width:none;background:var(--jops-log-bg);color:var(--jops-log-fg);tab-size:4}
    .jops-log .lg-ts{color:var(--jops-log-dim);opacity:.8}
    .jops-log .lg-info{color:var(--jops-log-info);font-weight:600}
    .jops-log .lg-warn{color:var(--jops-log-warn);font-weight:600}
    .jops-log .lg-err{color:var(--jops-log-err);font-weight:700}
    .jops-log .lg-debug{color:var(--jops-log-dim)}
    .jops-log .lg-exc{color:var(--jops-log-exc)}
    .jops-log .lg-caused{color:var(--jops-log-err);font-weight:600}
    .jops-line[data-lvl="error"]{background:color-mix(in srgb, var(--jops-log-err) 8%, transparent);box-shadow:inset 2px 0 0 var(--jops-log-err)}
    .jops-line[data-lvl="warn"]{background:color-mix(in srgb, var(--jops-log-warn) 8%, transparent);box-shadow:inset 2px 0 0 var(--jops-log-warn)}
    .jops-log::-webkit-scrollbar{display:none}
    .jops-oplog{flex:1;min-height:0;overflow:auto;padding:var(--jops-s2) var(--jops-s3);font-family:var(--jops-mono);font-size:12px;line-height:1.75;scrollbar-width:none}
    .jops-oplog::-webkit-scrollbar{display:none}
    .jops-line{white-space:pre-wrap;word-break:break-all}
    .jops-log[data-wrap="off"] .jops-line{white-space:pre;word-break:normal;width:max-content;min-width:100%}

    /* ===================== \u7A7A\u6001 / \u63D0\u793A ===================== */
    .jops-empty{padding:var(--jops-s4);color:var(--jops-fg-muted);font-size:12px;line-height:1.7}
    .jops-log .jops-empty{color:var(--jops-log-dim)}
    .jops-hint{color:var(--jops-fg-muted);font-size:12px}
    .jops-hint[data-error="true"]{color:var(--dsw-alias-state-error-primary)}
    .jops-req{color:var(--dsw-alias-state-error-primary);font-weight:400;margin-left:2px}
    .jops-sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}

    /* ===================== \u5F39\u7A97 ===================== */
    .jops-overlay{position:absolute;inset:0;overflow:hidden;background:color-mix(in srgb, var(--dsw-alias-bg-base) 58%, transparent);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:20;padding:var(--jops-s4);overscroll-behavior:contain;animation:jops-fade .14s var(--jops-ease)}
    .jops-dialog{width:min(680px,100%);max-height:min(640px,calc(100% - 8px));display:flex;flex-direction:column;background:var(--jops-bg);border:1px solid var(--jops-line);border-radius:var(--jops-r-xl);overflow:hidden;box-shadow:var(--jops-shadow-lg);animation:jops-pop .16s var(--jops-ease)}
    @keyframes jops-pop{from{opacity:0;transform:translateY(6px) scale(.99)}to{opacity:1;transform:none}}
    .jops-dialog .jops-input{border-color:var(--jops-line)}
    .jops-dialog-head{padding:14px var(--jops-s4);border-bottom:1px solid var(--jops-line);font-weight:600;font-size:13.5px;letter-spacing:-.01em}
    .jops-dialog-body{padding:var(--jops-s4);display:flex;flex-direction:column;gap:var(--jops-s3);overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain;min-height:0}
    /* \u4E0B\u62C9\u6D6E\u5C42\u8981\u80FD\u76D6\u51FA\u5F39\u7A97\u4E0B\u7F18\uFF0C\u5426\u5219\u5217\u8868\u88AB dialog \u7684 overflow \u88C1\u6389\u3001\u70B9\u51FB\u843D\u7A7A */
    .jops-dialog[data-float="true"],.jops-dialog[data-float="true"] .jops-dialog-body{overflow:visible}
    .jops-dialog-foot{padding:var(--jops-s3) var(--jops-s4);border-top:1px solid var(--jops-line);display:flex;justify-content:flex-end;gap:var(--jops-s2);background:var(--jops-surface)}
    .jops-dialog.jops-dialog-wide{width:min(880px,100%);height:min(620px,calc(100% - 8px))}
    .jops-dialog[data-auto="true"]{height:auto;max-height:min(620px,calc(100% - 8px));align-self:center}
    .jops-dialog.jops-dialog-wide .jops-dialog-body{flex:1;min-height:0;overflow:hidden}

    /* ===================== \u8FDE\u63A5 / \u5B57\u6BB5 / \u4E0B\u62C9\u5019\u9009 ===================== */
    .jops-url{font-family:var(--jops-mono);font-size:12px;line-height:30px;color:var(--jops-fg-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .jops-conn{display:flex;gap:var(--jops-s4);min-height:0;flex:1;align-items:stretch}
    .jops-connlist{flex:0 0 216px;width:216px;display:flex;flex-direction:column;gap:var(--jops-s2);padding:var(--jops-s3);border:1px solid var(--jops-line);border-radius:var(--jops-r-lg);background:var(--jops-surface);min-height:0}
    .jops-connhead{display:flex;align-items:center;gap:var(--jops-s1)}
    .jops-connlabel{flex:1;font-size:12px;font-weight:600;color:var(--jops-fg-muted)}
    .jops-connicon{width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;line-height:1;border:1px solid var(--jops-line);border-radius:var(--jops-r);background:var(--jops-bg);color:var(--jops-fg-muted);cursor:pointer;font-size:13px;transition:background .12s var(--jops-ease),color .12s var(--jops-ease)}
    .jops-connicon:hover:not(:disabled){background:var(--jops-surface-2);color:var(--jops-fg)}
    .jops-connicon:disabled{opacity:.4;cursor:default}
    .jops-delcell{width:44px;text-align:center}
    .jops-rowdel{width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;padding:0;border:1px solid transparent;border-radius:var(--jops-r);background:transparent;color:var(--jops-fg-subtle);font-size:15px;line-height:1;cursor:pointer;transition:background .12s var(--jops-ease),color .12s var(--jops-ease),border-color .12s var(--jops-ease)}
    .jops-rowdel:hover{background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 12%, transparent);border-color:color-mix(in srgb, var(--dsw-alias-state-error-primary) 34%, transparent);color:var(--dsw-alias-state-error-primary)}
    .jops-rowdel:focus-visible{outline:none;box-shadow:var(--jops-ring)}
    .jops-connitems{display:flex;flex-direction:column;gap:2px;overflow:auto;min-height:0}
    .jops-connitem{display:block;width:100%;text-align:left;padding:7px 9px;border:1px solid transparent;border-radius:var(--jops-r);background:transparent;color:inherit;cursor:pointer;font:inherit;font-size:12px;transition:background .12s var(--jops-ease),box-shadow .12s var(--jops-ease)}
    .jops-connitem:hover{background:var(--jops-surface-2)}
    .jops-connitem[data-on="true"]{background:var(--jops-bg);box-shadow:inset 0 0 0 1px var(--jops-line),var(--jops-shadow-sm)}
    .jops-connitem:focus-visible{outline:none;box-shadow:var(--jops-ring)}
    .jops-connname{display:block;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .jops-connsub{display:block;font-size:11px;color:var(--jops-fg-muted);font-family:var(--jops-mono);font-variant-numeric:tabular-nums;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .jops-connnone{padding:6px 4px;font-size:12px;color:var(--jops-fg-muted);line-height:1.6}
    .jops-connform{display:flex;flex-direction:column;gap:var(--jops-s3);flex:1;min-width:0;overflow:auto;padding:2px 2px 2px 0}
    .jops-note-inline{margin:0;padding:0 8px;line-height:24px;background:transparent;font-size:12px}
    .jops-note[data-tone="ok"]{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 9%, transparent)}
    .jops-note[data-tone="fail"]{color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 9%, transparent)}
    .jops-note-inline[data-tone="ok"]{color:var(--dsw-alias-state-success-primary)}
    .jops-note-inline[data-tone="fail"]{color:var(--dsw-alias-state-error-primary)}
    .jops-field{display:grid;grid-template-columns:88px minmax(0,1fr);gap:var(--jops-s3);align-items:center}
    .jops-field[data-top="true"]{align-items:start}
    .jops-field > .jops-hint{line-height:var(--jops-h)}
    .jops-field[data-top="true"] > .jops-hint{line-height:1.6;padding-top:6px}
    .jops-field .jops-input{width:100%}
    .jops-combo{position:relative}
    .jops-combo-list{position:absolute;top:calc(100% + 4px);left:0;right:0;z-index:25;max-height:180px;overflow:auto;background:var(--jops-bg);border:1px solid var(--jops-line);border-radius:var(--jops-r-lg);padding:var(--jops-s1);box-shadow:var(--jops-shadow-lg);animation:jops-fade .1s var(--jops-ease)}
    .jops-combo-item{display:block;width:100%;padding:6px 8px;border:0;border-radius:var(--jops-r-sm);background:transparent;cursor:pointer;text-align:left;color:inherit;font-family:var(--jops-mono);font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .jops-combo-item:hover,.jops-combo-item[data-on="true"]{background:var(--jops-surface-2)}
    .jops-cand{display:flex;gap:var(--jops-s2);align-items:flex-start;padding:6px 8px;border-radius:var(--jops-r);cursor:pointer;font-size:12px}
    .jops-cand[data-on="true"]{background:var(--jops-surface)}
    .jops-cand code{font-family:var(--jops-mono);color:var(--jops-fg-muted)}
    .jops-row{display:flex;gap:var(--jops-s2);align-items:center;font-size:12px}
    .jops-row > .jops-field{flex:1;min-width:0}

    /* ===================== \u63A5\u53E3\u9875 / \u8868\u683C ===================== */
    .jops-http-top{display:flex;flex-direction:column;gap:var(--jops-s2);padding:var(--jops-s3) var(--jops-s4) 0;flex:none}
    .jops-http-top .jops-toolbar{padding:0}
    .jops-http-log .jops-toolbar{padding:0 var(--jops-s4)}
    .jops-http-top .jops-hint{padding:0}
    .jops-http-log{flex:1;min-height:0;display:flex;flex-direction:column;border-top:1px solid var(--jops-line);margin-top:var(--jops-s2)}
    .jops-http-log .jops-toolbar{padding-top:var(--jops-s3)}
    .jops-http-top .jops-tablewrap{padding:0 0 var(--jops-s1)}
    .jops-http-log .jops-tablewrap{padding:var(--jops-s3) var(--jops-s4)}
    .jops-detail-section{border:1px solid var(--jops-line);border-radius:var(--jops-r-lg);padding:var(--jops-s3);margin-bottom:var(--jops-s3);background:var(--jops-bg)}
    .jops-detail-section>h4{margin:0 0 var(--jops-s2);font-size:12px;font-weight:600;color:var(--jops-fg)}
    .jops-gridtable td.jops-kv-key{width:180px;color:var(--jops-fg-muted);word-break:break-all}
    .jops-gridtable td.jops-kv-val{word-break:break-all;font-family:var(--jops-mono)}
    .jops-detail-section .jops-pre{margin:0;border-color:var(--jops-line);background:var(--jops-surface)}
    .jops-http-top .jops-table td,.jops-http-log .jops-table td{padding:var(--jops-s1) var(--jops-s2);vertical-align:middle}
    .jops-http-top .jops-table th,.jops-http-log .jops-table th{padding:6px var(--jops-s2)}
    .jops-http-headwrap{overflow:visible}
    /* \u7F51\u683C\u8868\u683C\uFF1A\u9009\u62E9\u5668\u5E26\u4E24\u4E2A\u7C7B\uFF0C\u624D\u80FD\u538B\u8FC7\u540E\u9762\u7684 .jops-table{border-collapse:collapse} */
    .jops-table.jops-gridtable{border:1px solid var(--jops-line);border-radius:var(--jops-r-lg);border-collapse:separate;border-spacing:0;overflow:hidden}
    .jops-table.jops-gridtable th,.jops-table.jops-gridtable td{border-bottom:1px solid var(--jops-line);border-right:1px solid var(--jops-line)}
    .jops-table.jops-gridtable th:last-child,.jops-table.jops-gridtable td:last-child{border-right:0}
    .jops-table.jops-gridtable thead th{background:var(--jops-surface)}
    .jops-table.jops-gridtable tbody tr:last-child td{border-bottom:0}
    .jops-http-top .jops-table td .jops-input{border-color:transparent;background:transparent;box-shadow:none}
    .jops-http-top .jops-table td .jops-input:focus{border-color:var(--jops-brand);background:var(--jops-bg);box-shadow:var(--jops-ring)}
    .jops-http-top td .jops-input{width:100%}
    .jops-http-top td .jops-btn{padding:0 8px;min-width:0;height:var(--jops-h-sm)}
    .jops-section{margin-bottom:var(--jops-s3)}
    .jops-section h4{margin:0 0 6px;font-size:12px;font-weight:500;color:var(--jops-fg-muted)}
    .jops-pre{margin:0;padding:var(--jops-s2) 10px;border:1px solid var(--jops-line);border-radius:var(--jops-r-lg);background:var(--jops-surface);font-family:var(--jops-mono);font-size:12px;line-height:1.6;max-height:180px;overflow:auto;white-space:pre-wrap;word-break:break-all}
    .jops-tablewrap{flex:1;min-height:0;overflow:auto;padding:0 var(--jops-s4) var(--jops-s3)}
    .jops-table{width:100%;border-collapse:collapse;font-size:12.5px;table-layout:fixed}
    .jops-table th{text-align:left;font-weight:500;font-size:11.5px;letter-spacing:.02em;color:var(--jops-fg-muted);padding:var(--jops-s2) var(--jops-s2);border-bottom:1px solid var(--jops-line);position:sticky;top:0;background:var(--jops-bg);z-index:1}
    .jops-table td{padding:var(--jops-s2) var(--jops-s2);border-bottom:1px solid var(--jops-line-soft);vertical-align:top}
    .jops-table tbody tr{transition:background .1s var(--jops-ease)}
    .jops-table tbody tr:hover{background:color-mix(in srgb, var(--jops-surface) 70%, transparent)}
    .jops-table td code{font-family:var(--jops-mono)}
    .jops-toolbar{display:flex;align-items:center;gap:var(--jops-s2);padding:var(--jops-s2) var(--jops-s4);flex:none}
    .jops-nowrap{white-space:nowrap;font-variant-numeric:tabular-nums;color:var(--jops-fg-muted);font-family:var(--jops-mono);font-size:11.5px}
    .jops-num{text-align:right;font-variant-numeric:tabular-nums}
    .jops-sql-op{display:inline-block;font-size:11px;font-weight:600;letter-spacing:.02em;padding:1px 6px;border-radius:var(--jops-r-sm);background:var(--jops-surface-2);color:var(--jops-fg-muted)}
    .jops-sql-ok{font-size:12px;font-weight:500}
    .jops-sql-ok[data-ok="true"]{color:var(--dsw-alias-state-success-primary)}
    .jops-sql-ok[data-ok="false"]{color:var(--dsw-alias-state-error-primary)}
    .jops-sql-text{display:block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:var(--jops-mono);font-size:11.5px;color:var(--jops-fg-muted)}
    .jops-cell-btn{display:block;width:100%;text-align:left;background:transparent;border:0;padding:0;cursor:pointer;font:inherit;color:inherit;border-radius:var(--jops-r-sm)}
    .jops-cell-btn:hover .jops-sql-text{color:var(--jops-fg);text-decoration:underline;text-decoration-color:color-mix(in srgb, var(--jops-fg-muted) 40%, transparent)}
    .jops-cell-btn:focus-visible{outline:none;box-shadow:var(--jops-ring)}

    /* ===================== \u8BBE\u7F6E\u9875 ===================== */
    .jops-settings{padding:var(--jops-s4) var(--jops-s5) var(--jops-s6);display:flex;flex-direction:column;gap:var(--jops-s4);overflow:auto;min-height:0;flex:1}
    .jops-card{border:1px solid var(--jops-line);border-radius:var(--jops-r-lg);padding:var(--jops-s4);display:flex;flex-direction:column;gap:var(--jops-s3);background:var(--jops-bg);box-shadow:var(--jops-shadow-sm)}
    .jops-card b{font-size:13px;font-weight:600}
    .jops-lint{border:1px solid var(--jops-line);border-radius:var(--jops-r-lg);padding:var(--jops-s3);margin-top:var(--jops-s2);background:var(--jops-bg);transition:background .2s var(--jops-ease),border-color .2s var(--jops-ease);box-shadow:var(--jops-shadow-sm)}
    .jops-lint[data-off="true"]{background:var(--jops-surface);box-shadow:none}
    .jops-lint-head{display:flex;align-items:center;gap:var(--jops-s3)}
    .jops-lint-id{display:flex;flex-direction:column;gap:2px;min-width:0}
    .jops-lint-id b{font-size:13px;font-weight:600}
    .jops-lint-id span{font-size:12px;color:var(--jops-fg-muted)}
    .jops-lint-ver{height:22px;display:inline-flex;align-items:center;gap:6px;padding:0 9px;border-radius:var(--jops-r-full);border:1px solid var(--jops-line);background:var(--jops-surface);color:var(--jops-fg-muted);font-family:var(--jops-mono);font-size:11px;font-variant-numeric:tabular-nums;white-space:nowrap;transition:background .2s var(--jops-ease),border-color .2s var(--jops-ease),color .2s var(--jops-ease)}
    .jops-lint-ver[data-state="none"]{color:var(--jops-fg-subtle);background:var(--jops-surface-2);border-color:transparent}
    .jops-lint-ver[data-state="busy"]{border-color:color-mix(in srgb, var(--jops-brand) 40%, transparent);color:var(--jops-brand);background:color-mix(in srgb, var(--jops-brand) 8%, transparent)}
    .jops-lint-ver[data-state="old"]{border-color:color-mix(in srgb, var(--dsw-alias-state-warning-primary) 40%, transparent);color:var(--dsw-alias-state-warning-primary);background:color-mix(in srgb, var(--dsw-alias-state-warning-primary) 8%, transparent)}
    .jops-lint-ver[data-state="new"]{border-color:color-mix(in srgb, var(--dsw-alias-state-success-primary) 40%, transparent);color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 8%, transparent)}
    .jops-lint-body{display:grid;grid-template-columns:max-content minmax(0,1fr);column-gap:var(--jops-s3);row-gap:10px;align-items:center;margin-top:var(--jops-s3);padding-top:var(--jops-s3);border-top:1px solid var(--jops-line);animation:jops-fade .18s var(--jops-ease)}
    .jops-lint-body>.jops-lint-k{font-size:12.5px;color:var(--jops-fg-muted)}
    .jops-lint-body .jops-input{width:auto;min-width:180px}
    .jops-lint-progress{height:3px;border-radius:2px;background:var(--jops-surface-2);margin-top:10px;overflow:hidden}
    .jops-lint-progress i{display:block;height:100%;background:var(--jops-brand);transition:width .18s var(--jops-ease)}
    /* \u670D\u52A1\u7AEF\u8FD8\u6CA1\u56DE\u62A5\u767E\u5206\u6BD4\u65F6\u5148\u8DD1\u4E00\u6BB5\u4E0D\u786E\u5B9A\u8FDB\u5EA6\uFF0C\u70B9\u4E0B\u5F00\u5173\u5C31\u6709\u53CD\u9988 */
    .jops-lint-progress[data-indet="true"] i{width:35%;animation:jops-indet 1s ease-in-out infinite}
    @keyframes jops-indet{0%{transform:translateX(-100%)}100%{transform:translateX(320%)}}
    .jops-lint-pick{display:inline-flex;align-items:center;gap:6px;cursor:pointer;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .jops-lint-ver[data-state="busy"]::before{content:'\u25CC';display:inline-block;margin-right:4px;animation:jops-spin .8s linear infinite}
    .jops-lint-note{font-size:12px;white-space:nowrap;color:var(--jops-fg-muted)}
    .jops-lint-note[data-tone="same"]{color:var(--dsw-alias-state-success-primary)}
    .jops-lint-note[data-tone="new"]{color:var(--dsw-alias-state-warning-primary)}
    .jops-lint-note[data-tone="fail"]{color:var(--dsw-alias-state-error-primary)}
    .jops-lint-note[data-tone="none"]{color:var(--jops-fg-subtle)}
    .jops-lint-running{font-size:12px;color:var(--jops-fg-muted);display:inline-flex;align-items:center;gap:6px;animation:jops-pulse 1.1s ease-in-out infinite}
    .jops-lint-summary{font-size:12px;color:var(--jops-fg-muted);margin:0 0 var(--jops-s2);padding-left:2px;font-variant-numeric:tabular-nums}
    @keyframes jops-fade{from{opacity:0;transform:translateY(-2px)}to{opacity:1;transform:none}}
    @keyframes jops-flash{0%{box-shadow:0 0 0 0 rgba(22,163,74,.45)}100%{box-shadow:0 0 0 7px rgba(22,163,74,0)}}
    .jops-lint-ver[data-state="new"]{animation:jops-flash .6s ease-out}

    /* ===================== SQL \u6388\u6743\u8868 ===================== */
    .jops-permtable{width:100%;border-collapse:separate;border-spacing:0;border:1px solid var(--jops-line);border-radius:var(--jops-r-lg);overflow:hidden;font-size:12.5px}
    .jops-permtable th{height:34px;font-size:11.5px;font-weight:500;letter-spacing:.02em;color:var(--jops-fg-muted);background:var(--jops-surface);text-align:left;padding:0 var(--jops-s3);border-bottom:1px solid var(--jops-line);border-right:1px solid var(--jops-line)}
    .jops-permtable td{height:48px;padding:0 var(--jops-s3);border-bottom:1px solid var(--jops-line);border-right:1px solid var(--jops-line);vertical-align:middle;text-align:left}
    .jops-permtable th:last-child,.jops-permtable td:last-child{border-right:0}
    .jops-permtable tbody tr:last-child td{border-bottom:0}
    .jops-permtable tbody tr{transition:background .15s var(--jops-ease)}
    .jops-permtable tbody tr:hover{background:color-mix(in srgb, var(--jops-surface) 60%, transparent)}
    .jops-permtable th:first-child,.jops-permtable td:first-child{width:34%;min-width:220px}
    .jops-permcat b{font-weight:600;font-size:13px;margin-right:var(--jops-s2)}
    .jops-permcat span{font-family:var(--jops-mono);font-size:11.5px;color:var(--jops-fg-muted)}
    .jops-tgrow{display:flex;align-items:center;gap:var(--jops-s5);flex-wrap:wrap}
    .jops-tg{display:inline-flex;align-items:center;gap:var(--jops-s2)}
    .jops-tg .jops-tgl{font-size:12.5px;color:var(--jops-fg-muted);white-space:nowrap;line-height:20px}
    /* switch \u7684\u5916\u89C2\u5168\u5728 switchControl \u7684\u5185\u8054\u6837\u5F0F\u91CC\uFF1B\u8FD9\u91CC\u53EA\u8865\u7126\u70B9\u73AF\uFF0C
       \u907F\u514D\u6837\u5F0F\u8868\u5931\u6548\u65F6\u6CE8\u610F\u529B\u5168\u90E8\u843D\u5728\u5185\u8054\u6837\u5F0F\u4E0A */
    .jops-sw:focus-visible{outline:none;box-shadow:var(--jops-ring)}
    .jops-swrow{display:flex;align-items:center;gap:var(--jops-s3);cursor:pointer;padding:var(--jops-s2) 0;font-size:12.5px;color:var(--jops-fg)}
    .jops-swrow>span{flex:1;min-width:0}
    .jops-swrow[data-muted="true"]{cursor:not-allowed;color:var(--jops-fg-muted)}
    .jops-sw[data-muted="false"]:hover{filter:brightness(.97)}
    `;
    function StatusPill(props) {
      return h("span", { className: "jops-pill", "data-state": props.state }, props.label);
    }
    function OpsLog(props) {
      const items = props.items || [];
      const boxRef = useRef17(null);
      useEffect19(() => {
        const box = boxRef.current;
        if (box) box.scrollTop = box.scrollHeight;
      }, [items.length]);
      if (items.length === 0) return h("div", { className: "jops-empty" }, txt("opsEmpty"));
      return h(
        "div",
        { className: "jops-oplog", ref: boxRef },
        items.map((item, index) => h(
          "div",
          {
            key: String(item.at) + index,
            "data-status": item.status
          },
          new Date(item.at).toLocaleTimeString() + "  " + (txt("act_" + item.action) || item.action) + (item.status === "running" ? "  " + txt("inProgress") : item.status === "error" ? "  " + (item.error || "") : item.status === "blocked" ? "  " + txt("blockedHint") : "  ok  " + ((item.ms || 0) / 1e3).toFixed(1) + "s")
        ))
      );
    }
    var LOG_TOKEN_RE = /(\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2}[.,]\d{3})|\b(ERROR|FATAL|SEVERE|WARN|WARNING|INFO|DEBUG|TRACE)\b|\b(Caused by:)|\b([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*(?:Exception|Error))\b/g;
    var LEVEL_CLASS = { ERROR: "lg-err", FATAL: "lg-err", SEVERE: "lg-err", WARN: "lg-warn", WARNING: "lg-warn", INFO: "lg-info", DEBUG: "lg-debug", TRACE: "lg-debug" };
    function lineLevel(line) {
      if (/\b(ERROR|FATAL|SEVERE)\b/.test(line) || /Exception|Caused by:/.test(line)) return "error";
      if (/\b(WARN|WARNING)\b/.test(line)) return "warn";
      return "";
    }
    function logSpans(line) {
      const spans = [];
      let last = 0;
      let match;
      LOG_TOKEN_RE.lastIndex = 0;
      while ((match = LOG_TOKEN_RE.exec(line)) !== null) {
        if (match.index > last) spans.push(line.slice(last, match.index));
        const cls = match[1] ? "lg-ts" : match[2] ? LEVEL_CLASS[match[2]] : match[3] ? "lg-caused" : "lg-exc";
        spans.push(h("span", { className: cls || void 0 }, match[0]));
        last = match.index + match[0].length;
        if (match[0].length === 0) LOG_TOKEN_RE.lastIndex += 1;
      }
      if (last < line.length) spans.push(line.slice(last));
      return spans;
    }
    var LOG_THEMES = [
      { id: "theme", label: { zh: "\u8DDF\u968F\u4E3B\u9898", en: "Theme" } },
      { id: "paper", label: { zh: "\u62A4\u773C\u7C73\u8272", en: "Paper" } },
      { id: "graphite", label: { zh: "\u77F3\u58A8\u6DF1\u7070", en: "Graphite" } },
      { id: "midnight", label: { zh: "\u5348\u591C\u9ED1", en: "Midnight" } }
    ];
    var LOG_THEME_KEY = STATE_KEY + ":log-theme";
    function LogPane(props) {
      const logs = props.logs || [];
      const [query, setQuery] = useState17("");
      const [wrap, setWrap] = useState17(false);
      const [follow, setFollow] = useState17(true);
      const [expanded, setExpanded] = useState17(false);
      const [theme, setTheme] = useState17(() => localStorage.getItem(LOG_THEME_KEY) || "theme");
      const boxRef = useRef17(null);
      const shown = React33.useMemo(() => query ? logs.filter((line) => line.toLowerCase().includes(query.toLowerCase())) : logs, [logs, query]);
      const tail = shown.length > VISIBLE_LOG_LINES ? shown.slice(shown.length - VISIBLE_LOG_LINES) : shown;
      useEffect19(() => {
        const box = boxRef.current;
        if (box && follow) box.scrollTop = box.scrollHeight;
      }, [shown.length, expanded, follow]);
      useEffect19(() => {
        if (!expanded) return void 0;
        const onKey = (event) => {
          if (event.key === "Escape") {
            event.stopPropagation();
            setExpanded(false);
          }
        };
        window.addEventListener("keydown", onKey, true);
        return () => window.removeEventListener("keydown", onKey, true);
      }, [expanded]);
      const pickTheme = (id) => {
        setTheme(id);
        try {
          localStorage.setItem(LOG_THEME_KEY, id);
        } catch {
        }
      };
      return h(
        "div",
        {
          className: expanded ? "jops-log-wrap jops-log-full" : "jops-log-wrap",
          "data-theme": theme
        },
        h(
          "div",
          { className: "jops-log-head" },
          h("b", null, txt("logs")),
          h("span", null, String(shown.length)),
          h("span", { className: "jops-spacer" }),
          h("input", {
            className: "jops-input",
            style: { width: 160 },
            placeholder: txt("filter"),
            value: query,
            onChange: (e) => setQuery(e.target.value)
          }),
          h(
            "label",
            { className: "jops-check" },
            h("input", { type: "checkbox", checked: wrap, onChange: (e) => setWrap(e.target.checked) }),
            txt("wrap")
          ),
          h(
            "span",
            { className: "jops-follow" },
            h("span", { className: "jops-follow-label" }, txt("follow")),
            switchControl({
              on: follow,
              compact: true,
              label: txt("follow"),
              onChange: (next) => setFollow(next)
            })
          ),
          h("select", {
            className: "jops-input",
            style: { width: 108 },
            title: txt("logTheme"),
            "aria-label": txt("logTheme"),
            value: theme,
            onChange: (e) => pickTheme(e.target.value)
          }, LOG_THEMES.map((item) => h("option", { key: item.id, value: item.id }, item.label[LANG] || item.label.en))),
          h("button", {
            className: "jops-btn",
            "data-ghost": "true",
            title: expanded ? txt("close") : txt("expandLog"),
            "aria-label": expanded ? txt("close") : txt("expandLog"),
            onClick: () => setExpanded((value) => !value)
          }, expanded ? "\u2921" : "\u2922")
        ),
        h(
          "div",
          { className: "jops-log", ref: boxRef, "data-wrap": wrap ? "on" : "off" },
          shown.length === 0 ? h("div", { className: "jops-empty" }, txt("logEmpty")) : tail.map((line, index) => h("div", {
            key: shown.length - tail.length + index,
            className: "jops-line",
            "data-lvl": lineLevel(line) || void 0
          }, logSpans(line)))
        )
      );
    }
    function ServiceDetail(props) {
      const { svc, onStart, onStop, onForceStop, onRestart, onBuild, onRemove, onEdit, activities } = props;
      const [pane, setPane] = useState17("log");
      const [pending, setPending] = useState17("");
      const busy = svc.state === "starting" || svc.state === "stopping" || svc.state === "building";
      const running = svc.state === "running";
      const ops = (activities || []).filter((item) => item.id === svc.id).slice().reverse();
      useEffect19(() => {
        if (!busy) setPending("");
      }, [busy]);
      useEffect19(() => {
        setPending("");
      }, [svc.id]);
      const stateAct = svc.state === "starting" ? "start" : svc.state === "building" ? "build" : svc.state === "stopping" ? "stop" : "";
      const active = pending || stateAct;
      const act = (name, handler, text, extra) => h("button", {
        className: "jops-btn",
        "data-act": name,
        "data-busy": active === name ? "true" : "false",
        disabled: Boolean(extra && extra.disabled),
        onClick: () => {
          setPending(name);
          const result = handler(svc);
          if (result && typeof result.then === "function") result.then(() => setPending(""), () => setPending(""));
          else setPending("");
        }
      }, active === name ? h("span", { className: "jops-spin", "aria-hidden": "true" }) : null, text);
      return h(
        "div",
        { className: "jops-main" },
        h(
          "div",
          { className: "jops-detail-head" },
          h("span", { className: "jops-dot", "data-state": svc.state, "data-busy": busy ? "true" : "false" }),
          h("span", { className: "jops-title" }, svc.name),
          h(StatusPill, { state: svc.state, label: txt(STATE_KEY[svc.state] || "state_stopped") }),
          h(
            "span",
            { className: "jops-actions" },
            act("start", onStart, txt("start"), { disabled: busy || running }),
            svc.state === "stopping" ? act("stop", onForceStop, txt("forceStop"), { disabled: false }) : act("stop", onStop, txt("stop"), { disabled: busy || svc.state === "stopped" }),
            act("restart", onRestart, txt("restart"), { disabled: busy || !running }),
            act("build", onBuild, txt("build"), { disabled: busy }),
            act("edit", onEdit, txt("edit"), { disabled: busy, instant: true }),
            act("remove", onRemove, txt("remove"), { disabled: busy, instant: true })
          )
        ),
        h(
          "div",
          { className: "jops-meta" },
          h("span", null, txt("main") + " ", h("b", null, svc.mainClass || "\u2014")),
          h("span", null, txt("pid") + " ", h("b", null, svc.pid ? String(svc.pid) : "\u2014")),
          h("span", null, txt("lastStart") + " ", h("b", null, svc.startup ? svc.startup.seconds + "s" : "\u2014")),
          svc.build ? h("span", null, txt("build") + " ", h("b", null, svc.build.skipped ? txt("buildSkipped") : svc.build.seconds + "s")) : null
        ),
        svc.lastError ? h("div", { className: "jops-note" }, svc.lastError) : null,
        h(
          Tabs,
          { className: "jops-pane-body", value: pane, onValueChange: setPane },
          h(
            TabsList,
            { className: "jops-subtabs" },
            h(TabsTrigger, { value: "log" }, txt("logs")),
            h(TabsTrigger, { value: "ops" }, txt("ops") + (ops.length > 0 ? " (" + ops.length + ")" : ""))
          ),
          h(TabsContent, { value: "log" }, h(LogPane, { logs: svc.logs })),
          h(TabsContent, { value: "ops" }, h(OpsLog, { items: ops }))
        )
      );
    }
    function shortenClass(name) {
      if (name.length <= 52) return name;
      return name.slice(0, 18) + "\u2026" + name.slice(-32);
    }
    function SelfScrollTextarea(props) {
      const ref = React33.useRef(null);
      React33.useEffect(() => {
        const node = ref.current;
        if (!node) return void 0;
        const onWheel = (event) => {
          event.preventDefault();
          node.scrollTop += event.deltaY;
        };
        node.addEventListener("wheel", onWheel, { passive: false });
        return () => node.removeEventListener("wheel", onWheel);
      }, []);
      return h("textarea", { ...props, ref });
    }
    var DialogHost = React33.createContext(null);
    function JopsDialog(props) {
      const host = React33.useContext(DialogHost);
      return h(
        Dialog,
        {
          open: true,
          onOpenChange: (next) => {
            if (!next) props.onClose();
          }
        },
        h(
          DialogPortal,
          { container: host || void 0 },
          h(
            DialogOverlay,
            { className: "jops-overlay" },
            h(
              DialogContent,
              {
                className: "jops-dialog" + (props.wide ? " jops-dialog-wide" : ""),
                "data-float": props.float ? "true" : "false",
                "data-auto": props.auto ? "true" : "false",
                "aria-label": props.title
              },
              // 标题文字已经画在 .jops-dialog-head 里，这里只补读屏需要的名字
              h(DialogTitle, { className: "jops-sr" }, props.title),
              props.children
            )
          )
        )
      );
    }
    function AddDialog(props) {
      const { candidates, onClose, onAdd, verify } = props;
      const first = candidates[0];
      const [query, setQuery] = useState17(first && first.mainClass || "");
      const [open, setOpen] = useState17(false);
      const [port, setPort] = useState17(String(first && first.port || ""));
      const [name, setName] = useState17(first && first.suggestedName || "");
      const [vmArgs, setVmArgs] = useState17("");
      const [error, setError] = useState17("");
      const [busy, setBusy] = useState17(false);
      const needle = query.trim().toLowerCase();
      const matches = needle === "" ? candidates : candidates.filter((cand) => `${cand.mainClass} ${cand.moduleDir} ${cand.suggestedName || ""}`.toLowerCase().includes(needle));
      const choose = (cand) => {
        setQuery(cand.mainClass);
        setOpen(false);
        setError("");
        if (cand.port) setPort(String(cand.port));
        setName(cand.suggestedName || "");
      };
      const list = open && matches.length > 0 ? h("div", { className: "jops-combo-list" }, matches.slice(0, 12).map((cand) => h("button", {
        key: cand.mainClass,
        type: "button",
        className: "jops-combo-item",
        title: cand.mainClass,
        "data-on": String(cand.mainClass === query.trim()),
        onMouseDown: (event) => {
          event.preventDefault();
          choose(cand);
        }
      }, shortenClass(cand.mainClass)))) : null;
      const confirm = async () => {
        const mainClass = query.trim();
        if (mainClass === "") return setError(txt("errMainClass"));
        if (name.trim() === "") return setError(txt("errName"));
        setBusy(true);
        setError("");
        try {
          const found = await verify(mainClass);
          if (!found || !found.ok) {
            setError(found && found.error || txt("errMainClassMissing"));
            return;
          }
          const located = found.located || {};
          const chosenPort = Number(port) > 0 ? Number(port) : Number(located.port) || 0;
          if (chosenPort <= 0) {
            setError(txt("errPort"));
            return;
          }
          if (!(Number(port) > 0)) setPort(String(chosenPort));
          onAdd({
            mainClass,
            moduleDir: located.moduleDir,
            port: chosenPort,
            name: name.trim(),
            vmArgs: vmArgs.trim()
          });
        } finally {
          setBusy(false);
        }
      };
      return h(
        JopsDialog,
        { title: txt("addTitle"), float: open && matches.length > 0, onClose },
        h("div", { className: "jops-dialog-head" }, txt("addTitle")),
        h(
          "div",
          { className: "jops-dialog-body", "data-float": open && matches.length > 0 ? "true" : "false" },
          h("div", { className: "jops-hint" }, txt("addHint")),
          candidates.length === 0 ? h("div", { className: "jops-hint" }, txt("noCandidates")) : null,
          h(
            "div",
            { className: "jops-field" },
            h("span", null, txt("manual"), h("b", { className: "jops-req" }, "*")),
            h(
              "div",
              { className: "jops-combo" },
              h("input", {
                className: "jops-input",
                placeholder: txt("manualHint"),
                value: query,
                autoComplete: "off",
                onChange: (e) => {
                  setQuery(e.target.value);
                  setError("");
                  setOpen(true);
                },
                onFocus: () => setOpen(true),
                onBlur: () => setTimeout(() => setOpen(false), 120)
              }),
              list
            )
          ),
          h(
            "div",
            { className: "jops-field" },
            h("span", null, txt("port"), h("b", { className: "jops-req" }, "*")),
            h("input", {
              className: "jops-input",
              style: { width: 120 },
              inputMode: "numeric",
              value: port,
              onChange: (e) => {
                setPort(e.target.value.replace(/[^\d]/g, ""));
                setError("");
              }
            })
          ),
          h(
            "div",
            { className: "jops-field" },
            h("span", null, txt("name"), h("b", { className: "jops-req" }, "*")),
            h("input", {
              className: "jops-input",
              value: name,
              onChange: (e) => {
                setName(e.target.value);
                setError("");
              }
            })
          ),
          h(
            "div",
            { className: "jops-field", "data-top": "true" },
            h("span", null, txt("vmArgs")),
            h(SelfScrollTextarea, {
              className: "jops-input jops-textarea",
              placeholder: txt("vmArgsHint"),
              value: vmArgs,
              onChange: (e) => setVmArgs(e.target.value)
            })
          ),
          error === "" ? null : h("div", { className: "jops-hint", "data-error": "true" }, error)
        ),
        h(
          "div",
          { className: "jops-dialog-foot" },
          h("button", { className: "jops-btn", onClick: onClose }, txt("cancel")),
          h("button", {
            className: "jops-btn",
            "data-primary": "true",
            disabled: busy,
            onClick: () => void confirm()
          }, busy ? txt("checking") : txt("confirm"))
        )
      );
    }
    function EditDialog(props) {
      const { svc, onClose, onSave } = props;
      const [vmArgs, setVmArgs] = useState17(svc.vmArgs || "");
      const [port, setPort] = useState17(String(svc.port || ""));
      const [profile, setProfile] = useState17(svc.profile || "");
      return h(
        JopsDialog,
        { title: txt("editTitle") + " \xB7 " + svc.name, onClose },
        h("div", { className: "jops-dialog-head" }, txt("editTitle") + " \xB7 " + svc.name),
        h(
          "div",
          { className: "jops-dialog-body" },
          h(
            "div",
            { className: "jops-field", "data-top": "true" },
            h("span", { className: "jops-hint" }, txt("vmArgs")),
            h(SelfScrollTextarea, {
              className: "jops-input jops-textarea",
              placeholder: txt("vmArgsHint"),
              value: vmArgs,
              onChange: (e) => setVmArgs(e.target.value)
            })
          ),
          h(
            "div",
            { className: "jops-field" },
            h("span", { className: "jops-hint" }, txt("port")),
            h("input", {
              className: "jops-input",
              inputMode: "numeric",
              value: port,
              onChange: (e) => setPort(e.target.value.replace(/[^\d]/g, ""))
            })
          ),
          h(
            "div",
            { className: "jops-field" },
            h("span", { className: "jops-hint" }, txt("profile")),
            h("input", {
              className: "jops-input",
              value: profile,
              onChange: (e) => setProfile(e.target.value)
            })
          ),
          h("div", { className: "jops-hint" }, txt("editHint"))
        ),
        h(
          "div",
          { className: "jops-dialog-foot" },
          h("button", { className: "jops-btn", onClick: onClose }, txt("cancel")),
          h("button", {
            className: "jops-btn",
            "data-primary": "true",
            disabled: port === "" || Number(port) <= 0,
            onClick: () => onSave({ vmArgs, port: Number(port), profile })
          }, txt("confirm"))
        )
      );
    }
    function SqlConfirmDialog(props) {
      const item = props.item;
      const text = (key, vars) => fill(txt(key), vars);
      return h(
        JopsDialog,
        { title: text("confirmTitle", { group: item.group }), wide: true, onClose: () => props.onAnswer(item.id, false) },
        h("div", { className: "jops-dialog-head" }, text("confirmTitle", { group: item.group })),
        h(
          "div",
          { className: "jops-dialog-body" },
          h("p", { className: "jops-hint" }, text("confirmBody", { connection: item.connection })),
          h("pre", { className: "jops-pre" }, item.sql)
        ),
        h(
          "div",
          { className: "jops-dialog-foot" },
          h("button", {
            className: "jops-btn",
            onClick: () => props.onAnswer(item.id, false)
          }, txt("confirmCancel")),
          h("button", {
            className: "jops-btn",
            "data-primary": "true",
            onClick: () => props.onAnswer(item.id, true)
          }, txt("confirmRun"))
        )
      );
    }
    function PortConflictDialog(props) {
      const { svc, blocked, action, onCancel, onConfirm } = props;
      const fill2 = (key, vars) => txt(key).replace(/\{(\w+)\}/g, (whole, name) => vars[name] ?? whole);
      return h(
        JopsDialog,
        { title: `${txt("portBusyTitle")} \xB7 ${svc.name}`, onClose: onCancel },
        h("div", { className: "jops-dialog-head" }, `${txt("portBusyTitle")} \xB7 ${svc.name}`),
        h(
          "div",
          { className: "jops-dialog-body" },
          h(
            "div",
            { className: "jops-hint" },
            fill2("portBusyLine", { port: blocked.port, process: blocked.process || "process", pid: blocked.pid })
          ),
          blocked.serviceName ? h("div", { className: "jops-hint" }, fill2("portBusyOwnedLine", { name: blocked.serviceName })) : null,
          h("div", { className: "jops-hint" }, txt("portBusyAsk"))
        ),
        h(
          "div",
          { className: "jops-dialog-foot" },
          h("button", { className: "jops-btn", onClick: onCancel }, txt("cancel")),
          h("button", {
            className: "jops-btn",
            "data-primary": "true",
            onClick: () => onConfirm(action)
          }, txt("portBusyKill"))
        )
      );
    }
    function ServicesTab(props) {
      const { snapshot, selectedId, onSelect, onAddClick, handlers, logs } = props;
      const services = snapshot.services || [];
      const svc = services.find((item) => item.id === selectedId) || services[0];
      const rows = services.map((item) => h(
        "div",
        {
          key: item.id,
          className: "jops-svc",
          "data-on": svc && item.id === svc.id ? "true" : "false",
          role: "button",
          tabIndex: 0,
          onClick: () => onSelect(item.id),
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") onSelect(item.id);
          }
        },
        h("span", {
          className: "jops-dot",
          "data-state": item.state,
          "data-busy": item.state === "starting" || item.state === "building" || item.state === "stopping" ? "true" : "false"
        }),
        h("span", { className: "jops-svc-name" }, item.name),
        h("span", { className: "jops-spacer" }),
        h("span", { className: "jops-svc-port" }, ":" + item.port)
      ));
      const side = h(
        "div",
        { className: "jops-side" },
        h(
          "div",
          { className: "jops-side-head" },
          h("b", null, txt("services")),
          h("span", { className: "jops-spacer" }),
          h("button", { className: "jops-btn", "data-ghost": "true", onClick: onAddClick }, "+ " + txt("add"))
        ),
        h(
          "div",
          { className: "jops-side-list" },
          rows
        )
      );
      const detail = svc ? h(ServiceDetail, {
        svc: Object.assign({}, svc, { logs: logs[svc.id] || [] }),
        activities: snapshot.activities || [],
        onStart: handlers.start,
        onStop: handlers.stop,
        onForceStop: handlers.forceStop,
        onRestart: handlers.restart,
        onBuild: handlers.build,
        onRemove: handlers.remove,
        onEdit: handlers.edit
      }) : h(
        "div",
        { className: "jops-main" },
        h(
          "div",
          { className: "jops-empty-center" },
          h("div", { className: "jops-empty-art" }, "+"),
          h("div", { className: "jops-empty-title" }, txt("emptyTitle")),
          h("div", { className: "jops-empty-sub" }, txt("emptySub")),
          h("button", { className: "jops-btn", "data-primary": "true", onClick: onAddClick }, "+ " + txt("add"))
        )
      );
      return h(
        "div",
        { className: "jops-pane" },
        h("div", { className: "jops-body" }, side, detail)
      );
    }
    var BLANK_CONN = { id: "", name: "", driver: "mysql", host: "127.0.0.1", port: "3306", database: "", user: "root", password: "", hasPassword: false };
    function connDraft(record) {
      if (!record) return Object.assign({}, BLANK_CONN);
      return {
        id: record.id || "",
        name: record.name || "",
        driver: record.driver || "mysql",
        host: record.host || "",
        port: String(record.port || 3306),
        database: record.database || "",
        user: record.user || "",
        password: "",
        hasPassword: Boolean(record.hasPassword)
      };
    }
    function connUrl(draft) {
      const host = draft.host || "localhost";
      const port = draft.port || (draft.driver === "postgres" ? "5432" : "3306");
      const scheme = draft.driver === "postgres" ? "postgresql" : "mysql";
      return `jdbc:${scheme}://${host}:${port}${draft.database ? "/" + draft.database : ""}`;
    }
    function SqlConnDialog(props) {
      const connections = props.connections || [];
      const [draft, setDraft] = useState17(() => connDraft(connections[0]));
      const [note, setNote] = useState17({ tone: "", text: "" });
      const [busy, setBusy] = useState17("");
      const put = (key) => (e) => setDraft(Object.assign({}, draft, { [key]: e.target.value }));
      const field = (key, label, extra) => h(
        "label",
        { className: "jops-field" },
        h("span", null, label),
        h("input", Object.assign({
          className: "jops-input",
          value: draft[key] ?? "",
          onChange: put(key)
        }, extra || {}))
      );
      const quiet = () => setNote({ tone: "", text: "" });
      const pick = (record) => {
        setDraft(connDraft(record));
        quiet();
      };
      const blank = () => {
        setDraft(Object.assign({}, BLANK_CONN));
        quiet();
      };
      const save = async () => {
        setBusy("save");
        const data = await props.run("sqlConnSave", {
          id: draft.id,
          name: draft.name,
          driver: draft.driver,
          host: draft.host,
          port: Number(draft.port) || 3306,
          database: draft.database,
          user: draft.user,
          password: draft.password
        });
        setBusy("");
        const saved = data && data.sqlSaved;
        if (!saved) return;
        const kept = (data.sqlConnections || []).find((item) => item.id === saved.id);
        if (kept) setDraft(connDraft(kept));
        setNote({ tone: "ok", text: txt("connSaved") });
      };
      const test = async () => {
        setBusy("test");
        const data = await props.run("sqlConnTest", { host: draft.host, port: Number(draft.port) || 3306 });
        setBusy("");
        const result = data && data.test;
        if (!result) return;
        setNote(result.ok ? { tone: "ok", text: `${txt("connTestOk")} \xB7 ${result.ms}ms` } : { tone: "fail", text: `${txt("connTestFail")} \xB7 ${result.error}` });
      };
      const drop = async () => {
        if (!draft.id) return;
        const data = await props.run("sqlConnRemove", { id: draft.id });
        const rest = data && data.sqlConnections || [];
        setDraft(connDraft(rest[0] ?? connections.find((item) => item.id !== draft.id)));
        quiet();
      };
      const addButton = h("button", {
        className: "jops-connicon",
        title: txt("connNew"),
        "aria-label": txt("connNew"),
        onClick: blank
      }, "+");
      const removeButton = h("button", {
        className: "jops-connicon",
        title: txt("connRemove"),
        "aria-label": txt("connRemove"),
        disabled: !draft.id,
        onClick: drop
      }, "\u2212");
      const items = connections.length === 0 ? h("div", { className: "jops-connnone" }, txt("connNone")) : h("div", { className: "jops-connitems" }, connections.map((item) => h(
        "button",
        {
          key: item.id,
          className: "jops-connitem",
          "data-on": String(item.id === draft.id),
          title: `${item.host}:${item.port}/${item.database}`,
          onClick: () => pick(item)
        },
        h("span", { className: "jops-connname" }, item.name || item.id),
        h("span", { className: "jops-connsub" }, `${item.host}:${item.port}`)
      )));
      const connList = h(
        "div",
        { className: "jops-connlist" },
        h(
          "div",
          { className: "jops-connhead" },
          h("span", { className: "jops-connlabel" }, txt("connListLabel")),
          addButton,
          removeButton
        ),
        items
      );
      const statusRow = h(
        "div",
        { className: "jops-field" },
        h("span", null, txt("connStatus")),
        note.text ? h("span", { className: "jops-note jops-note-inline", "data-tone": note.tone }, note.text) : h("span", { className: "jops-hint" }, "\u2014")
      );
      const connForm = h(
        "div",
        { className: "jops-connform" },
        field("name", txt("connName")),
        h(
          "div",
          { className: "jops-row" },
          h(
            "label",
            { className: "jops-field" },
            h("span", null, txt("connDriver")),
            h(
              "select",
              { className: "jops-input", value: draft.driver, onChange: put("driver") },
              ["mysql", "postgres"].map((item) => h("option", { key: item, value: item }, item === "postgres" ? "PostgreSQL" : "MySQL"))
            )
          ),
          field("database", txt("connDb"))
        ),
        h(
          "div",
          { className: "jops-row" },
          field("host", txt("connHost")),
          field("port", txt("connPort"), { style: { width: 90 } })
        ),
        h(
          "div",
          { className: "jops-row" },
          field("user", txt("connUser")),
          field("password", txt("connPassword"), {
            type: "password",
            placeholder: draft.hasPassword ? txt("connPasswordSaved") : "",
            autoComplete: "new-password"
          })
        ),
        h(
          "label",
          { className: "jops-field" },
          h("span", null, txt("connUrl")),
          h("code", { className: "jops-url" }, connUrl(draft))
        ),
        statusRow,
        h("div", { className: "jops-hint" }, txt("connSecure"))
      );
      const body = h(
        "div",
        { className: "jops-dialog-body" },
        h("div", { className: "jops-conn" }, connList, connForm)
      );
      const foot = h(
        "div",
        { className: "jops-dialog-foot" },
        h(
          "button",
          { className: "jops-btn", disabled: busy !== "", onClick: test },
          busy === "test" ? txt("connTesting") : txt("connTest")
        ),
        h("button", { className: "jops-btn", disabled: busy !== "", onClick: () => props.onClose() }, txt("close")),
        h("button", { className: "jops-btn", "data-primary": "true", disabled: busy !== "", onClick: save }, txt("confirm"))
      );
      return h(
        JopsDialog,
        { title: txt("connTitle"), wide: true, onClose: props.onClose },
        h("div", { className: "jops-dialog-head" }, txt("connTitle")),
        body,
        foot
      );
    }
    function HttpDetailDialog(props) {
      const { row, onClose } = props;
      const emptyText = txt("httpBodyEmpty");
      const entriesOf = (obj) => obj ? Object.entries(obj) : [];
      const kvTable = (pairs) => {
        const list = pairs || [];
        if (list.length === 0) return h("div", { className: "jops-hint" }, emptyText);
        return h(
          "table",
          { className: "jops-table jops-gridtable" },
          h("thead", null, h(
            "tr",
            null,
            h("th", null, txt("httpName")),
            h("th", null, txt("httpValue"))
          )),
          h("tbody", null, list.map(([key, value], index) => h(
            "tr",
            { key: index },
            h("td", { className: "jops-kv-key" }, String(key)),
            h("td", { className: "jops-kv-val" }, String(value))
          )))
        );
      };
      const pretty = (text) => {
        const raw = String(text ?? "");
        const trimmed = raw.trim();
        if (!trimmed || trimmed[0] !== "{" && trimmed[0] !== "[") return raw;
        try {
          return JSON.stringify(JSON.parse(trimmed), null, 2);
        } catch {
          return raw;
        }
      };
      const paramsOf = (url2) => {
        const at2 = url2.indexOf("?");
        if (at2 < 0) return [];
        return url2.slice(at2 + 1).split("&").filter(Boolean).map((pair) => {
          const eq = pair.indexOf("=");
          const decode = (part) => {
            try {
              return decodeURIComponent(part);
            } catch {
              return part;
            }
          };
          return [decode(eq < 0 ? pair : pair.slice(0, eq)), decode(eq < 0 ? "" : pair.slice(eq + 1))];
        });
      };
      const card = (title, node) => h(
        "div",
        { className: "jops-detail-section" },
        h("h4", null, title),
        node
      );
      const code = (body) => h("pre", { className: "jops-pre" }, body);
      const method = String(row.method ?? "");
      const url = String(row.url ?? "");
      const params = paramsOf(url);
      const paramNode = kvTable(params);
      const resBody = row.error ? row.error : pretty(row.resBody || emptyText) + (row.truncated ? "\n" + txt("httpTruncated") : "");
      return h(
        JopsDialog,
        { title: method + " " + url, wide: true, onClose },
        h("div", { className: "jops-dialog-head" }, method + " " + url),
        h(
          "div",
          { className: "jops-dialog-body" },
          card(txt("httpReqParams"), paramNode),
          card(txt("httpReqHeaders"), kvTable(entriesOf(row.reqHeaders))),
          row.reqBody ? card(txt("httpReqBody"), code(pretty(row.reqBody))) : null,
          card(txt("httpResHeaders"), kvTable(entriesOf(row.resHeaders))),
          card(txt("httpResBody"), code(resBody))
        ),
        h(
          "div",
          { className: "jops-dialog-foot" },
          h("button", { className: "jops-btn", "data-primary": "true", onClick: onClose }, txt("close"))
        )
      );
    }
    function HttpTab(props) {
      const stored = props.headers || [];
      const log = props.log || [];
      const [draft, setDraft] = useState17([]);
      const [notice, setNotice] = useState17(null);
      const [detail, setDetail] = useState17(null);
      const noticeTimer = useRef17(null);
      const storedKey = JSON.stringify(stored);
      useEffect19(() => {
        setDraft(stored.map((row) => ({ ...row })));
      }, [storedKey]);
      useEffect19(() => () => clearTimeout(noticeTimer.current), []);
      const patchRow = (index, patch) => setDraft((list) => list.map((row, at2) => at2 === index ? { ...row, ...patch } : row));
      const addRow = () => setDraft((list) => [...list, { id: "", name: "", value: "", enabled: true }]);
      const dropRow = (index) => setDraft((list) => list.filter((_, at2) => at2 !== index));
      const flash = (tone, text) => {
        setNotice({ tone, text });
        clearTimeout(noticeTimer.current);
        noticeTimer.current = setTimeout(() => setNotice(null), 2e3);
      };
      const save = async () => {
        const data = await props.run("httpSave", { headers: draft });
        if (data) flash("ok", txt("httpSaved"));
        else flash("fail", txt("httpSaveFailed"));
      };
      const headerRows = draft.map((row, index) => {
        const nameCell = h("td", null, h("input", {
          className: "jops-input",
          value: row.name,
          spellCheck: false,
          placeholder: "Authorization",
          onChange: (e) => patchRow(index, { name: e.target.value })
        }));
        const valueCell = h("td", null, h("input", {
          className: "jops-input",
          value: row.value,
          spellCheck: false,
          placeholder: "Bearer ...",
          onChange: (e) => patchRow(index, { value: e.target.value })
        }));
        const enabledCell = h("td", null, h("input", {
          type: "checkbox",
          checked: row.enabled !== false,
          onChange: (e) => patchRow(index, { enabled: e.target.checked })
        }));
        const dropCell = h("td", { className: "jops-delcell" }, h("button", {
          className: "jops-rowdel",
          title: txt("remove"),
          "aria-label": txt("remove"),
          onClick: () => dropRow(index)
        }, "\xD7"));
        return h("tr", { key: row.id || `row-${index}` }, nameCell, valueCell, enabledCell, dropCell);
      });
      const headerTable = h(
        "table",
        { className: "jops-table jops-gridtable" },
        h("thead", null, h(
          "tr",
          null,
          h("th", { style: { width: 190 } }, txt("httpName")),
          h("th", null, txt("httpValue")),
          h("th", { style: { width: 64 } }, txt("httpEnabled")),
          h("th", { style: { width: 44 } }, "")
        )),
        h("tbody", null, headerRows)
      );
      const logRows = log.map((row, index) => {
        const status = row.status != null ? String(row.status) : row.error ? txt("okNo") : "\u2014";
        const statusCell = h("td", null, h("span", {
          className: "jops-sql-ok",
          "data-ok": String(Boolean(row.ok))
        }, status));
        const detailCell = h("td", null, h("button", {
          className: "jops-btn",
          onClick: () => setDetail(row)
        }, txt("httpDetail")));
        return h(
          "tr",
          { key: `${row.at}-${index}` },
          h("td", { className: "jops-nowrap" }, new Date(row.at).toLocaleString()),
          h("td", null, h("code", null, row.method)),
          h("td", null, h("code", { className: "jops-sql-text" }, row.url)),
          h("td", { className: "jops-num" }, row.ms != null ? `${row.ms} ms` : "\u2014"),
          statusCell,
          detailCell
        );
      });
      const logTable = h(
        "div",
        { className: "jops-tablewrap" },
        h(
          "table",
          { className: "jops-table" },
          h("thead", null, h(
            "tr",
            null,
            h("th", null, txt("col_at")),
            h("th", { style: { width: 70 } }, txt("col_method")),
            h("th", null, txt("col_url")),
            h("th", { style: { width: 82 } }, txt("col_ms")),
            h("th", { style: { width: 70 } }, txt("col_status")),
            h("th", { style: { width: 64 } }, "")
          )),
          h("tbody", null, logRows)
        )
      );
      const top = h(
        "div",
        { className: "jops-http-top" },
        h(
          "div",
          { className: "jops-toolbar" },
          h("b", null, txt("httpHeaders")),
          h("span", { className: "jops-spacer" }),
          notice ? h("span", { className: "jops-note-inline", "data-tone": notice.tone }, notice.text) : null,
          h("button", { className: "jops-btn", onClick: addRow }, txt("httpAdd")),
          h("button", { className: "jops-btn", "data-primary": "true", onClick: () => void save() }, txt("httpSave"))
        ),
        h("div", { className: "jops-hint" }, txt("httpHeadersHint")),
        h("div", { className: "jops-tablewrap jops-http-headwrap" }, headerTable)
      );
      const bottom = h(
        "div",
        { className: "jops-http-log" },
        h(
          "div",
          { className: "jops-toolbar", style: { padding: "0 12px" } },
          h("b", null, txt("httpLog")),
          h("span", { className: "jops-spacer" }),
          h("span", { className: "jops-hint" }, txt("httpNote"))
        ),
        logTable
      );
      return h(
        "div",
        { className: "jops-pane" },
        top,
        bottom,
        detail ? h(HttpDetailDialog, { row: detail, onClose: () => setDetail(null) }) : null
      );
    }
    function SqlTab(props) {
      const rows = props.sqlLog || [];
      const connections = props.connections || [];
      const [open, setOpen] = useState17(false);
      const [detail, setDetail] = useState17(null);
      const [connId, setConnId] = useState17("");
      const current = connections.find((item) => item.id === connId) || connections[0];
      const opOf = (row) => {
        if (row.op) return String(row.op).toUpperCase();
        const first = String(row.sql || "").trim().match(/^[A-Za-z]+/);
        return first ? first[0].toUpperCase() : "\u2014";
      };
      const okOf = (row) => typeof row.ok === "boolean" ? row.ok : row.status === "ok";
      return h(
        "div",
        { className: "jops-pane" },
        h(
          "div",
          { className: "jops-toolbar" },
          h("b", null, txt("sqlHistory")),
          h("span", { className: "jops-spacer" }),
          connections.length > 0 ? h("select", {
            className: "jops-input",
            style: { width: 200 },
            title: txt("connPick"),
            value: current ? current.id : "",
            onChange: (e) => setConnId(e.target.value)
          }, connections.map((item) => h("option", { key: item.id, value: item.id }, `${item.name} \xB7 ${item.database || item.host}`))) : h("span", { className: "jops-hint" }, txt("connNone")),
          h("button", { className: "jops-btn", "data-dark": "true", onClick: () => setOpen(true) }, "+ " + txt("connTitle")),
          h("span", { className: "jops-hint" }, txt("sqlNote"))
        ),
        rows.length === 0 ? h("div", { className: "jops-empty" }, txt("sqlEmpty")) : h(
          "div",
          { className: "jops-tablewrap" },
          h(
            "table",
            { className: "jops-table" },
            h("thead", null, h(
              "tr",
              null,
              h("th", { style: { width: 156 } }, txt("col_at")),
              h("th", { style: { width: 88 } }, txt("col_op")),
              h("th", null, txt("col_sql")),
              h("th", { style: { width: 72 } }, txt("col_ok")),
              h("th", { style: { width: 88 }, textAlign: "right" }, txt("col_affected"))
            )),
            h("tbody", null, rows.map((row, index) => h(
              "tr",
              { key: index },
              h("td", { className: "jops-nowrap" }, new Date(row.time ?? row.at).toLocaleString()),
              h("td", null, h("span", { className: "jops-sql-op", "data-op": opOf(row) }, opOf(row))),
              h("td", null, h("button", {
                className: "jops-cell-btn",
                title: txt("sqlOpen"),
                onClick: () => setDetail(row)
              }, h("code", { className: "jops-sql-text" }, row.sql))),
              h("td", null, h(
                "span",
                { className: "jops-sql-ok", "data-ok": String(okOf(row)) },
                okOf(row) ? txt("okYes") : txt("okNo")
              )),
              h(
                "td",
                { className: "jops-num" },
                row.affected != null ? String(row.affected) : "\u2014"
              )
            )))
          )
        ),
        open ? h(SqlConnDialog, { connections, run: props.run, onClose: () => setOpen(false) }) : null,
        detail ? h(SqlDetailDialog, { row: detail, onClose: () => setDetail(null) }) : null
      );
    }
    function SqlDetailDialog(props) {
      const row = props.row;
      const op = String(row.op || "").toUpperCase();
      const ok = typeof row.ok === "boolean" ? row.ok : row.status === "ok";
      const rows = [
        [txt("col_at"), new Date(row.time ?? row.at).toLocaleString()],
        [txt("col_op"), op || "\u2014"],
        [txt("col_ok"), ok ? txt("okYes") : txt("okNo")],
        [txt("col_affected"), row.affected != null ? String(row.affected) : "\u2014"],
        [txt("col_ms"), row.ms != null ? row.ms + " ms" : "\u2014"]
      ];
      return h(
        JopsDialog,
        { title: txt("sqlDetail"), wide: true, auto: true, onClose: props.onClose },
        h("div", { className: "jops-dialog-head" }, txt("sqlDetail")),
        h(
          "div",
          { className: "jops-dialog-body" },
          h(
            "table",
            { className: "jops-gridtable" },
            h("tbody", null, rows.map((pair, index) => h(
              "tr",
              { key: index },
              h("td", { className: "jops-kv-key" }, pair[0]),
              h("td", { className: "jops-kv-val" }, pair[1])
            )))
          ),
          h(
            "div",
            { className: "jops-detail-section" },
            h("h4", null, txt("col_sql")),
            h("pre", { className: "jops-pre" }, row.sql || "\u2014")
          ),
          row.error ? h("div", { className: "jops-detail-section" }, h("h4", null, "Error"), h("pre", { className: "jops-pre" }, String(row.error))) : null
        ),
        h(
          "div",
          { className: "jops-dialog-foot" },
          h("button", { className: "jops-btn", "data-primary": "true", onClick: props.onClose }, txt("close"))
        )
      );
    }
    function LintCard(props) {
      const lint = props.lint || { tools: {} };
      const tools = props.tools || [];
      const busy = props.busy;
      const [checkedAt, setCheckedAt] = useState17(0);
      const [pending, setPending] = useState17({});
      const [checking, setChecking] = useState17({});
      const [checkedMsg, setCheckedMsg] = useState17({});
      const run = props.run;
      const save = (tool, patch) => run("lintSave", Object.assign({ tool }, patch));
      const check = async (tool) => {
        const slot = tool || "all";
        setChecking((prev) => Object.assign({}, prev, { [slot]: true }));
        try {
          const data = await run("lintCheck", tool ? { tool } : {});
          const tools2 = data && data.lint && data.lint.tools || lint && lint.tools || {};
          const names = tool ? [tool] : Object.keys(tools2);
          const nextMsg = {};
          names.forEach((key) => {
            const info = tools2[key] || {};
            if (!info.version) {
              nextMsg[key] = { tone: "none", text: txt("lintNotInstalled") };
              return;
            }
            nextMsg[key] = info.latest && info.latest !== info.version ? { tone: "new", text: txt("lintNewVersion") + " v" + info.latest } : { tone: "same", text: txt("lintUpToDate") + " \xB7 v" + info.version };
          });
          if (!names.length || Object.keys(nextMsg).length === 0) {
            nextMsg[tool || "checkstyle"] = { tone: "fail", text: txt("lintCheckFailed") };
          }
          setCheckedMsg((prev) => Object.assign({}, prev, nextMsg));
          setCheckedAt(Date.now());
        } finally {
          setChecking((prev) => {
            const left = Object.assign({}, prev);
            delete left[slot];
            return left;
          });
        }
      };
      const toggle = async (tool, next) => {
        const tool_ = lint.tools[tool] || {};
        const download = next && !tool_.version && !tool_.progress;
        if (download) setPending((prev) => Object.assign({}, prev, { [tool]: true }));
        try {
          if (download) {
            await run("lintInstall", { tool });
            setCheckedAt(Date.now());
          } else {
            await save(tool, { enabled: next });
          }
        } finally {
          if (download) {
            setPending((prev) => {
              const nextPending = Object.assign({}, prev);
              delete nextPending[tool];
              return nextPending;
            });
          }
        }
      };
      const versionPill = (tool) => {
        const info = lint.tools[tool] || {};
        if (!info.progress && pending[tool]) {
          return h("span", { className: "jops-lint-ver", "data-state": "busy" }, txt("lintDownloading"));
        }
        if (info.progress) {
          return h(
            "span",
            { className: "jops-lint-ver", "data-state": "busy" },
            txt("lintDownloading") + " " + info.progress.percent + "%"
          );
        }
        if (!info.version) return h("span", { className: "jops-lint-ver", "data-state": "none" }, txt("lintNotInstalled"));
        const state = info.latest && info.latest !== info.version ? "old" : "new";
        return h(
          "span",
          { className: "jops-lint-ver", "data-state": state },
          "v" + info.version + (state === "old" ? " \u2192 " + info.latest : "")
        );
      };
      const ruleOptions = (tool) => {
        const info = lint.tools[tool] || {};
        const sets = info.ruleSets || [];
        const label = (id) => ({
          google: txt("lintRsGoogle"),
          sun: txt("lintRsSun"),
          aliyun: txt("lintRsAliyun"),
          standard: txt("lintRsPmd"),
          strict: tool === "pmd" ? txt("lintRsPmdStrict") : txt("lintRsSbStrict"),
          default: txt("lintRsSb"),
          custom: txt("lintRsCustom")
        })[id] || id;
        return sets.map((id) => h("option", { key: id, value: id }, label(id)));
      };
      const body = (tool) => {
        const info = lint.tools[tool] || {};
        if (!info.enabled) return null;
        const rows = [
          h("div", { key: "k-rs", className: "jops-lint-k" }, txt("lintRuleSet")),
          h(
            "div",
            { key: "v-rs" },
            !info.version ? h("span", { className: "jops-lint-note" }, txt("lintNotInstalled")) : h("select", {
              className: "jops-input",
              value: info.ruleSet,
              onChange: (e) => save(tool, { ruleSet: e.target.value })
            }, ruleOptions(tool))
          )
        ];
        if (info.ruleSet === "custom") {
          rows.push(h("div", { key: "k-rf", className: "jops-lint-k" }, txt("lintRuleFile")));
          rows.push(h(
            "div",
            { key: "v-rf" },
            h(
              "label",
              { className: "jops-btn jops-lint-pick" },
              info.ruleFile ? info.ruleFile.split(/[\\/]/).pop() : txt("lintPickFile"),
              h("input", {
                type: "file",
                accept: ".xml,text/xml,application/xml",
                style: { display: "none" },
                // 浏览器不给绝对路径，所以把文件内容交给主机校验并存一份，ruleFile 指向那份副本
                onChange: async (e) => {
                  const file = e.target.files && e.target.files[0];
                  e.target.value = "";
                  if (!file) return;
                  let content = "";
                  try {
                    content = await file.text();
                  } catch (err) {
                    setCheckedMsg((prev) => Object.assign({}, prev, { [tool]: { tone: "fail", text: String(err && err.message ? err.message : err) } }));
                    return;
                  }
                  const data = await run("lintRuleFile", { tool, name: file.name, content });
                  if (data && data.ok === false) {
                    setCheckedMsg((prev) => Object.assign({}, prev, { [tool]: { tone: "fail", text: data.error } }));
                  } else if (data) {
                    setCheckedMsg((prev) => {
                      const left = Object.assign({}, prev);
                      delete left[tool];
                      return left;
                    });
                  }
                }
              })
            )
          ));
        }
        if (tool === "checkstyle") {
          rows.push(h("div", { key: "k-lv", className: "jops-lint-k" }, txt("lintThreshold")));
          rows.push(h(
            "div",
            { key: "v-lv" },
            h(
              "select",
              {
                className: "jops-input",
                value: info.level || "error",
                onChange: (e) => save(tool, { level: e.target.value })
              },
              h("option", { value: "warn" }, txt("lintLvWarn")),
              h("option", { value: "error" }, txt("lintLvError")),
              h("option", { value: "all" }, txt("lintLvAll"))
            )
          ));
        }
        if (tool === "pmd") {
          rows.push(h("div", { key: "k-cpd", className: "jops-lint-k" }, txt("lintCpd")));
          rows.push(h(
            "div",
            { key: "v-cpd" },
            h(SwitchRow, {
              on: Boolean(info.cpd),
              label: txt("lintCpd"),
              compact: true,
              onChange: (next) => save(tool, { cpd: next })
            }, h("span", null, txt("lintCpdText")))
          ));
        }
        if (tool === "spotbugs") {
          rows.push(h("div", { key: "k-pre", className: "jops-lint-k" }, txt("lintPremise")));
          rows.push(h("div", { key: "v-pre", className: "jops-lint-note" }, txt("lintPremiseText")));
        }
        return h("div", { className: "jops-lint-body" }, rows);
      };
      const lastRun = lint.lastRun || null;
      const summaryOf = (row) => {
        const parts = Object.keys(row.tools || {}).map((tool) => {
          const info = row.tools[tool];
          const name = (lint.tools[tool] || {}).label || tool;
          return `${name} ${info.ok ? `${info.count} \u5904` : txt("lintRunFailed")}`;
        });
        return parts.join(" \xB7 ");
      };
      const lastLine = lastRun ? h(
        "div",
        { className: "jops-lint-summary" },
        h("span", null, `${txt("lintLastRun")} ${new Date(lastRun.at).toLocaleTimeString()} \xB7 ${summaryOf(lastRun)} \xB7 ${(lastRun.ms / 1e3).toFixed(1)}s`)
      ) : null;
      return h(
        "div",
        { className: "jops-card" },
        h(
          "div",
          { className: "jops-row" },
          h("b", null, txt("lintTitle")),
          h("span", { className: "jops-spacer" }),
          // 检查由 Agent 在改完代码后触发；这里只报告进度，不再给用户一个点了也没用的按钮
          props.running ? h("span", { className: "jops-lint-running" }, txt("lintRunning")) : null,
          h("button", {
            className: "jops-btn",
            disabled: busy || Boolean(checking.all),
            onClick: () => check()
          }, checking.all ? txt("lintCheckNow") : txt("lintCheckAll"))
        ),
        lastLine,
        props.error ? h("div", { className: "jops-note" }, txt("lintRunFailed") + "\uFF1A" + props.error) : null,
        tools.map((tool) => {
          const info = lint.tools[tool] || {};
          return h(
            "div",
            { key: tool, className: "jops-lint", "data-off": String(!info.enabled) },
            h(
              "div",
              { className: "jops-lint-head" },
              switchControl({
                on: Boolean(info.enabled),
                disabled: Boolean(info.progress) || Boolean(pending[tool]),
                label: (info.label || tool) + " " + txt("lintTitle"),
                onChange: (checked) => toggle(tool, checked)
              }),
              h(
                "div",
                { className: "jops-lint-id" },
                h("b", null, (lint.tools[tool] || {}).label || tool),
                h("span", null, tool === "checkstyle" ? txt("lintStyle") : tool === "pmd" ? txt("lintSource") : txt("lintBytecode"))
              ),
              h("span", { className: "jops-spacer" }),
              checkedMsg[tool] ? h("span", { className: "jops-lint-note", "data-tone": checkedMsg[tool].tone }, checkedMsg[tool].text) : null,
              versionPill(tool),
              info.version ? h("button", {
                className: "jops-btn",
                disabled: busy || Boolean(info.progress) || Boolean(pending[tool]) || Boolean(checking[tool]),
                onClick: async () => {
                  if (info.latest && info.latest !== info.version) await run("lintInstall", { tool });
                  else await check(tool);
                }
              }, checking[tool] ? txt("lintCheckNow") : info.latest && info.latest !== info.version ? txt("lintUpdate") : txt("lintCheck")) : null
            ),
            body(tool),
            info.progress ? h(
              "div",
              { className: "jops-lint-progress" },
              h("i", { style: { width: (info.progress.percent || 0) + "%" } })
            ) : pending[tool] ? h("div", { className: "jops-lint-progress", "data-indet": "true" }, h("i")) : null
          );
        }),
        lint.tools.spotbugs && lint.tools.spotbugs.enabled ? h("div", { className: "jops-hint", style: { marginTop: "10px" } }, txt("lintBuildLock")) : null
      );
    }
    function switchControl(props) {
      const on = Boolean(props.on);
      const compact = Boolean(props.compact);
      const width = compact ? 30 : 34;
      const height = compact ? 18 : 20;
      const knob = compact ? 14 : 16;
      const inset = 2;
      const shift = width - knob - inset * 2;
      return h(
        Switch,
        {
          className: "jops-sw",
          "data-on": String(on),
          "data-muted": String(Boolean(props.disabled)),
          checked: on,
          disabled: Boolean(props.disabled),
          "aria-label": props.label,
          onCheckedChange: (next) => props.onChange(Boolean(next)),
          style: {
            all: "unset",
            display: "inline-flex",
            alignItems: "center",
            flex: "none",
            width: width + "px",
            height: height + "px",
            borderRadius: "var(--jops-r-full)",
            position: "relative",
            cursor: props.disabled ? "not-allowed" : "pointer",
            background: on ? "var(--jops-brand)" : "color-mix(in srgb, var(--jops-fg-muted) 28%, transparent)",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,.04)",
            opacity: props.disabled ? ".45" : "1",
            transition: "background .18s var(--jops-ease)"
          }
        },
        h(SwitchThumb, {
          style: {
            display: "block",
            width: knob + "px",
            height: knob + "px",
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 1px 2px rgba(0,0,0,.24), 0 0 0 .5px rgba(0,0,0,.04)",
            position: "absolute",
            top: (height - knob) / 2 + "px",
            left: inset + "px",
            transform: on ? "translateX(" + shift + "px)" : "none",
            transition: "transform .18s var(--jops-ease)",
            willChange: "transform"
          }
        })
      );
    }
    function SwitchRow(props) {
      return h(
        "label",
        { className: "jops-swrow", "data-muted": String(Boolean(props.disabled)) },
        props.children,
        switchControl({
          on: props.on,
          disabled: props.disabled,
          label: props.label,
          compact: Boolean(props.compact),
          onChange: props.onChange
        })
      );
    }
    function SettingsTab(props) {
      const state = props.state || {};
      const perms = state.sqlPerms || {};
      const groups = [
        ["read", txt("permRead"), txt("permReadHint")],
        ["write", txt("permWrite"), txt("permWriteHint")],
        ["delete", txt("permDelete"), txt("permDeleteHint")]
      ];
      const patch = (group, field, value) => {
        const next = Object.assign({}, perms[group], { [field]: value });
        if (field === "allow" && value === false) next.confirm = false;
        props.run("settings", { sqlPerms: { [group]: next } });
      };
      const buildLocked = Boolean(state.lint && state.lint.tools && state.lint.tools.spotbugs && state.lint.tools.spotbugs.enabled);
      const [proxyNote, setProxyNote] = React33.useState("");
      const saveProxy = async (value) => {
        const data = await props.run("proxySave", { httpProxy: value });
        setProxyNote(data && data.ok === false ? String(data.error || txt("proxyInvalid")) : txt("proxySaved"));
      };
      return h(
        "div",
        { className: "jops-settings" },
        h("div", { className: "jops-hint" }, txt("wsScope")),
        h(
          "div",
          { className: "jops-card" },
          h("b", null, txt("settingsBuild")),
          h(SwitchRow, {
            on: buildLocked || state.buildEnabled !== false,
            disabled: buildLocked,
            label: txt("settingsBuild"),
            onChange: (next) => props.run("settings", { buildEnabled: next })
          }, h("span", null, txt("settingsBuildHint")))
        ),
        h(
          "div",
          { className: "jops-card" },
          h("b", null, txt("proxyTitle")),
          h(
            "div",
            { className: "jops-row" },
            h(
              "div",
              { className: "jops-field" },
              h("span", null, txt("proxyLabel")),
              h("input", {
                className: "jops-input",
                defaultValue: state.httpProxy || "",
                placeholder: "http://127.0.0.1:7890",
                onBlur: (e) => saveProxy(e.target.value)
              })
            )
          ),
          h(
            "div",
            { className: "jops-hint" },
            txt("proxyHint") + (proxyNote ? " \xB7 " + proxyNote : "")
          )
        ),
        h(
          "div",
          null,
          h(LintCard, {
            lint: state.lint,
            tools: ["checkstyle", "pmd", "spotbugs"],
            busy: false,
            running: state.lintRunning,
            error: state.lintError,
            run: props.run
          })
        ),
        h(
          "div",
          { className: "jops-card" },
          h("b", null, txt("settingsPerms")),
          h(
            "table",
            { className: "jops-permtable" },
            h(
              "thead",
              null,
              h("tr", null, h("th", null, txt("permCat")), h("th", null, txt("permGrant")))
            ),
            h(
              "tbody",
              null,
              groups.map(([key, label, hint]) => {
                const group = perms[key] || {};
                const off = !group.allow;
                return h(
                  "tr",
                  { key },
                  h(
                    "td",
                    null,
                    h(
                      "div",
                      { className: "jops-permcat" },
                      h("b", null, label),
                      h("span", null, hint)
                    )
                  ),
                  h(
                    "td",
                    null,
                    h(
                      "div",
                      { className: "jops-tgrow" },
                      h(
                        "span",
                        { className: "jops-tg" },
                        h("span", { className: "jops-tgl" }, txt("permAllow")),
                        switchControl({
                          on: Boolean(group.allow),
                          compact: true,
                          disabled: false,
                          label: label + " " + txt("permAllow"),
                          onChange: (checked) => patch(key, "allow", checked)
                        })
                      ),
                      h(
                        "span",
                        { className: "jops-tg" },
                        h("span", { className: "jops-tgl" }, txt("permConfirm")),
                        switchControl({
                          on: Boolean(group.confirm),
                          compact: true,
                          disabled: off,
                          label: label + " " + txt("permConfirm"),
                          onChange: (checked) => patch(key, "confirm", checked)
                        })
                      )
                    )
                  )
                );
              })
            )
          )
        ),
        h(
          "div",
          { className: "jops-hint" },
          txt("permDenied") + " \xB7 " + txt("permConfirmHint")
        )
      );
    }
    var TAB_IDS = ["services", "sql", "http", "settings"];
    function JavaOpsView(props) {
      const sessionId = props.sessionId;
      const [tab, setTab] = useState17("services");
      const [snapshot, setSnapshot] = useState17({
        loading: true,
        services: [],
        activities: [],
        sqlLog: [],
        workspace: "",
        candidates: []
      });
      const [logs, setLogs] = useState17({});
      const [selectedId, setSelectedId] = useState17("");
      const [adding, setAdding] = useState17(false);
      const [editing, setEditing] = useState17(null);
      const [conflict, setConflict] = useState17(null);
      const [error, setError] = useState17("");
      const offsets = useRef17({});
      const epochs = useRef17({});
      const rootRef = useRef17(null);
      const [paneH, setPaneH] = useState17(0);
      const [hostEl, setHostEl] = useState17(null);
      useEffect19(() => {
        setHostEl(rootRef.current);
      }, []);
      const apply2 = (next) => {
        if (next && next.ok) {
          setSnapshot((prev) => ({
            loading: false,
            services: (next.services || []).map((svc) => Object.assign({}, svc, {
              name: svc.mainClass ? svc.mainClass.split(".").pop() : svc.name,
              module: svc.moduleDir,
              main: svc.mainClass,
              state: svc.status
            })),
            activities: next.activities || [],
            sqlLog: next.sqlLog || [],
            sqlConnections: next.sqlConnections || prev.sqlConnections || [],
            // 接口页的数据同样会随 reload 丢字段：漏了它，面板会显示空表并可能把空列表存回去
            httpHeaders: next.httpHeaders || prev.httpHeaders || [],
            httpLog: next.httpLog || prev.httpLog || [],
            sqlPerms: next.sqlPerms || prev.sqlPerms,
            // 待确认的高风险 SQL：漏字段会让对话框永远不出现
            sqlConfirms: next.sqlConfirms || prev.sqlConfirms || [],
            lint: next.lint || prev.lint,
            // 检查要跑几十秒，面板靠这个字段显示「检查中」
            lintRunning: next.lintRunning || null,
            lintError: typeof next.lintError === "string" ? next.lintError : prev.lintError || "",
            // 代理地址同理：漏字段会让输入框在切页签后变空，看起来像没保存
            httpProxy: typeof next.httpProxy === "string" ? next.httpProxy : prev.httpProxy,
            buildEnabled: typeof next.buildEnabled === "boolean" ? next.buildEnabled : prev.buildEnabled,
            workspace: next.workspace || prev.workspace,
            candidates: next.candidates || prev.candidates
          }));
          setError("");
        } else if (next && next.error) {
          setError(String(next.error));
        }
      };
      const call = async (action, payload) => {
        const res = await fetch(API + "/action", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ session: sessionId, action, payload: payload || {} })
        });
        return res.json();
      };
      const refresh = async () => {
        try {
          const res = await fetch(API + "/state?session=" + encodeURIComponent(sessionId || ""));
          apply2(await res.json());
        } catch (err) {
          setError(String(err && err.message ? err.message : err));
        }
      };
      const run = async (action, payload) => {
        try {
          const data = await call(action, payload);
          apply2(data);
          return data;
        } catch (err) {
          setError(String(err && err.message ? err.message : err));
          return void 0;
        }
      };
      const pullLogs = async (id) => {
        try {
          for (let attempt = 0; attempt < 2; attempt += 1) {
            const offset = offsets.current[id] || 0;
            const res = await fetch(API + "/action", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ session: sessionId, action: "logs", payload: { id, offset } })
            });
            const data = await res.json();
            if (!data || !data.ok || !Array.isArray(data.lines)) return;
            const known = epochs.current[id];
            if (attempt === 0 && data.epoch !== void 0 && known !== void 0 && known !== data.epoch) {
              epochs.current[id] = data.epoch;
              offsets.current[id] = 0;
              setLogs((prev) => Object.assign({}, prev, { [id]: [] }));
              continue;
            }
            epochs.current[id] = data.epoch;
            offsets.current[id] = data.offset || 0;
            if (data.lines.length > 0) {
              setLogs((prev) => {
                const merged = (prev[id] || []).concat(data.lines);
                return Object.assign({}, prev, {
                  [id]: merged.length > LOCAL_LOG_LINES ? merged.slice(merged.length - LOCAL_LOG_LINES) : merged
                });
              });
            }
            return;
          }
        } catch {
        }
      };
      useEffect19(() => {
        void refresh();
        const timer = setInterval(() => {
          void refresh();
        }, 1500);
        return () => clearInterval(timer);
      }, [sessionId]);
      useEffect19(() => {
        const list = snapshot.services || [];
        if (list.length === 0) return;
        if (!selectedId || !list.some((svc) => svc.id === selectedId)) setSelectedId(list[0].id);
      }, [snapshot.services, selectedId]);
      useEffect19(() => {
        if (!selectedId || tab !== "services") return void 0;
        void pullLogs(selectedId);
        const timer = setInterval(() => {
          void pullLogs(selectedId);
        }, 1e3);
        return () => clearInterval(timer);
      }, [selectedId, tab]);
      useEffect19(() => {
        const measure = () => {
          const box = rootRef.current;
          if (!box) return;
          if (box.querySelector(".jops-overlay")) return;
          const rect = box.getBoundingClientRect();
          if (rect.top < -1) return;
          let bottom = window.innerHeight - 72;
          const composer = Array.prototype.find.call(
            document.querySelectorAll('textarea, [contenteditable="true"]'),
            (node) => !box.contains(node)
          );
          if (composer) {
            const composerRect = composer.getBoundingClientRect();
            if (composerRect.top > rect.top + 200) bottom = composerRect.top - 10;
          }
          setPaneH(Math.max(360, Math.floor(bottom - rect.top - 8)));
        };
        const frame = requestAnimationFrame(measure);
        const late = setTimeout(measure, 300);
        window.addEventListener("resize", measure);
        window.addEventListener("scroll", measure, true);
        return () => {
          cancelAnimationFrame(frame);
          clearTimeout(late);
          window.removeEventListener("resize", measure);
          window.removeEventListener("scroll", measure, true);
        };
      }, [tab]);
      const services = snapshot.services;
      const current = services.find((svc) => svc.id === selectedId) || services[0];
      const startOrRestart = (action) => async (svc) => {
        const data = await run(action, { id: svc.id, wait: false });
        if (data && data.blocked) setConflict({ svc, blocked: data.blocked, action });
      };
      const handlers = {
        start: startOrRestart("start"),
        stop: (svc) => run("stop", { id: svc.id }),
        forceStop: (svc) => run("stop", { id: svc.id, force: true }),
        restart: startOrRestart("restart"),
        build: (svc) => run("build", { id: svc.id, wait: false }),
        remove: (svc) => run("remove", { id: svc.id }),
        edit: (svc) => setEditing(svc)
      };
      const wsLabel = snapshot.workspace ? snapshot.workspace.split(/[\\/]/).filter(Boolean).pop() : "";
      const pane = (id) => {
        if (snapshot.loading) return h("div", { className: "jops-empty" }, txt("loading"));
        if (id === "services") {
          return h(ServicesTab, {
            snapshot,
            selectedId: current ? current.id : "",
            onSelect: setSelectedId,
            onAddClick: () => {
              setAdding(true);
              void run("scan", {});
            },
            handlers,
            logs
          });
        }
        if (id === "sql") return h(SqlTab, { sqlLog: snapshot.sqlLog, connections: snapshot.sqlConnections || [], run });
        if (id === "http") return h(HttpTab, { headers: snapshot.httpHeaders || [], log: snapshot.httpLog || [], run });
        return h(SettingsTab, { state: snapshot, run });
      };
      return h(
        DialogHost.Provider,
        { value: hostEl },
        h(
          Tabs,
          {
            className: "jops-root",
            ref: rootRef,
            style: paneH > 0 ? { height: paneH } : void 0,
            value: tab,
            onValueChange: setTab
          },
          h(
            "div",
            { className: "jops-top" },
            h(
              TabsList,
              { className: "jops-seg", "aria-label": txt("view") },
              TAB_IDS.map((id) => h(TabsTrigger, { key: id, value: id }, txt(id)))
            ),
            h("span", { className: "jops-spacer" }),
            h(
              "span",
              { className: "jops-ws", title: snapshot.workspace || txt("wsScope") },
              txt("workspace") + " ",
              h("b", null, wsLabel || txt("wsFollow"))
            )
          ),
          error ? h("div", { className: "jops-note" }, txt("errPrefix") + error) : null,
          TAB_IDS.map((id) => h(
            TabsContent,
            { key: id, className: "jops-tabpane", value: id },
            id === tab ? pane(id) : null
          )),
          adding ? h(AddDialog, {
            candidates: snapshot.candidates || [],
            onClose: () => setAdding(false),
            verify: (mainClass) => run("lookup", { mainClass }),
            onAdd: (input) => {
              setAdding(false);
              void run("save", { service: Object.assign({ buildEnabled: true }, input) });
            }
          }) : null,
          editing ? h(EditDialog, {
            svc: editing,
            onClose: () => setEditing(null),
            onSave: (patch) => {
              const id = editing.id;
              setEditing(null);
              void run("save", { service: Object.assign({ id }, patch) });
            }
          }) : null,
          (snapshot.sqlConfirms || [])[0] ? h(SqlConfirmDialog, {
            item: (snapshot.sqlConfirms || [])[0],
            onAnswer: (id, allow) => void run("sqlConfirm", { id, allow })
          }) : null,
          conflict ? h(PortConflictDialog, {
            svc: conflict.svc,
            blocked: conflict.blocked,
            action: conflict.action,
            onCancel: () => setConflict(null),
            onConfirm: (action) => {
              const svc = conflict.svc;
              setConflict(null);
              void run(action, { id: svc.id, wait: false, killOccupant: true });
            }
          }) : null
        )
      );
    }
    function apply(ctx) {
      const style = document.createElement("style");
      style.setAttribute("data-dsh-java-ops", "");
      style.textContent = CSS2;
      document.head.appendChild(style);
      ctx.effect(() => () => style.remove());
      ctx.slots.inject("conversation.view", () => ctx.slots.register(
        {
          name: "conversation.view",
          id: "java-ops",
          order: 40,
          label: () => txt("view")
        },
        JavaOpsView
      ));
    }

    return module.exports
  },
})
