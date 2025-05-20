import { hasInjectionContext, getCurrentInstance, inject, createApp, provide, toRef, onErrorCaptured, onServerPrefetch, unref, createVNode, resolveDynamicComponent, shallowReactive, reactive, effectScope, computed, defineComponent, h, isReadonly, isRef, isShallow, isReactive, toRaw, defineAsyncComponent, mergeProps, ref, getCurrentScope, useSSRContext } from 'vue';
import { h as hasProtocol, i as isScriptProtocol, k as joinURL, w as withQuery, s as sanitizeStatusCode, l as getContext, $ as $fetch, m as createHooks, c as createError$1, n as isEqual, o as stringifyParsedURL, p as stringifyQuery, q as parseQuery, t as toRouteMatcher, r as createRouter, v as defu } from '../nitro/nitro.mjs';
import { u as useHead$1, h as headSymbol, b as baseURL } from '../routes/renderer.mjs';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode, ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  var _a;
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.17.3";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...((_a = options.ssrContext) == null ? void 0 : _a.payload) || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin) {
  if (plugin.hooks) {
    nuxtApp.hooks.addHooks(plugin.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b, _c, _d;
  const resolvedPlugins = [];
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin) {
    var _a2;
    const unresolvedPluginsForThisPlugin = ((_a2 = plugin.dependsOn) == null ? void 0 : _a2.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.includes(name))) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin).then(async () => {
        if (plugin._name) {
          resolvedPlugins.push(plugin._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin._name)) {
              dependsOn.delete(plugin._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin);
  }
  for (const plugin of plugins2) {
    if (((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) && ((_d = plugin.env) == null ? void 0 : _d.islands) === false) {
      continue;
    }
    await executePlugin(plugin);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin) {
  if (typeof plugin === "function") {
    return plugin;
  }
  const _name = plugin._name || plugin.name;
  delete plugin.name;
  return Object.assign(plugin.setup || (() => {
  }), plugin, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance || (nuxtAppInstance = getNuxtAppCtx(id).tryUse());
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  to || (to = "/");
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = (options == null ? void 0 : options.external) || isExternalHost;
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = useNuxtApp();
    const error2 = useError();
    if (false) ;
    error2.value || (error2.value = nuxtError);
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
const unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    nuxtApp.vueApp.use(head);
  }
});
async function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  {
    useNuxtApp().ssrContext._preloadManifest = true;
    const _routeRulesMatcher = toRouteMatcher(
      createRouter({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
  }
}
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  manifest_45route_45rule
];
function getRouteFromPath(fullPath) {
  const route = fullPath && typeof fullPath === "object" ? fullPath : {};
  if (typeof fullPath === "object") {
    fullPath = stringifyParsedURL({
      pathname: fullPath.path || "",
      search: stringifyQuery(fullPath.query || {}),
      hash: fullPath.hash || ""
    });
  }
  const url = new URL(fullPath.toString(), "http://localhost");
  return {
    path: url.pathname,
    fullPath,
    query: parseQuery(url.search),
    hash: url.hash,
    // stub properties for compat with vue-router
    params: route.params || {},
    name: void 0,
    matched: route.matched || [],
    redirectedFrom: void 0,
    meta: route.meta || {},
    href: fullPath
  };
}
const router_DclsWNDeVV7SyG4lslgLnjbQUK1ws8wgf2FHaAbo7Cw = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  setup(nuxtApp) {
    const initialURL = nuxtApp.ssrContext.url;
    const routes = [];
    const hooks = {
      "navigate:before": [],
      "resolve:before": [],
      "navigate:after": [],
      "error": []
    };
    const registerHook = (hook, guard) => {
      hooks[hook].push(guard);
      return () => hooks[hook].splice(hooks[hook].indexOf(guard), 1);
    };
    (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const route = reactive(getRouteFromPath(initialURL));
    async function handleNavigation(url, replace) {
      try {
        const to = getRouteFromPath(url);
        for (const middleware of hooks["navigate:before"]) {
          const result = await middleware(to, route);
          if (result === false || result instanceof Error) {
            return;
          }
          if (typeof result === "string" && result.length) {
            return handleNavigation(result, true);
          }
        }
        for (const handler of hooks["resolve:before"]) {
          await handler(to, route);
        }
        Object.assign(route, to);
        if (false) ;
        for (const middleware of hooks["navigate:after"]) {
          await middleware(to, route);
        }
      } catch (err) {
        for (const handler of hooks.error) {
          await handler(err);
        }
      }
    }
    const currentRoute = computed(() => route);
    const router = {
      currentRoute,
      isReady: () => Promise.resolve(),
      // These options provide a similar API to vue-router but have no effect
      options: {},
      install: () => Promise.resolve(),
      // Navigation
      push: (url) => handleNavigation(url),
      replace: (url) => handleNavigation(url),
      back: () => (void 0).history.go(-1),
      go: (delta) => (void 0).history.go(delta),
      forward: () => (void 0).history.go(1),
      // Guards
      beforeResolve: (guard) => registerHook("resolve:before", guard),
      beforeEach: (guard) => registerHook("navigate:before", guard),
      afterEach: (guard) => registerHook("navigate:after", guard),
      onError: (handler) => registerHook("error", handler),
      // Routes
      resolve: getRouteFromPath,
      addRoute: (parentName, route2) => {
        routes.push(route2);
      },
      getRoutes: () => routes,
      hasRoute: (name) => routes.some((route2) => route2.name === name),
      removeRoute: (name) => {
        const index = routes.findIndex((route2) => route2.name === name);
        if (index !== -1) {
          routes.splice(index, 1);
        }
      }
    };
    nuxtApp.vueApp.component("RouterLink", defineComponent({
      functional: true,
      props: {
        to: {
          type: String,
          required: true
        },
        custom: Boolean,
        replace: Boolean,
        // Not implemented
        activeClass: String,
        exactActiveClass: String,
        ariaCurrentValue: String
      },
      setup: (props, { slots }) => {
        const navigate = () => handleNavigation(props.to, props.replace);
        return () => {
          var _a;
          const route2 = router.resolve(props.to);
          return props.custom ? (_a = slots.default) == null ? void 0 : _a.call(slots, { href: props.to, navigate, route: route2 }) : h("a", { href: props.to, onClick: (e) => {
            e.preventDefault();
            return navigate();
          } }, slots);
        };
      }
    }));
    nuxtApp._route = route;
    nuxtApp._middleware || (nuxtApp._middleware = {
      global: [],
      named: {}
    });
    const initialLayout = nuxtApp.payload.state._layout;
    nuxtApp.hooks.hookOnce("app:created", async () => {
      router.beforeEach(async (to, from) => {
        var _a;
        to.meta = reactive(to.meta || {});
        if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
          to.meta.layout = initialLayout;
        }
        nuxtApp._processingMiddleware = true;
        if (!((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext)) {
          const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
          {
            const routeRules = await nuxtApp.runWithContext(() => getRouteRules({ path: to.path }));
            if (routeRules.appMiddleware) {
              for (const key in routeRules.appMiddleware) {
                const guard = nuxtApp._middleware.named[key];
                if (!guard) {
                  return;
                }
                if (routeRules.appMiddleware[key]) {
                  middlewareEntries.add(guard);
                } else {
                  middlewareEntries.delete(guard);
                }
              }
            }
          }
          for (const middleware of middlewareEntries) {
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            {
              if (result === false || result instanceof Error) {
                const error = result || createError$1({
                  statusCode: 404,
                  statusMessage: `Page Not Found: ${initialURL}`,
                  data: {
                    path: initialURL
                  }
                });
                delete nuxtApp._processingMiddleware;
                return nuxtApp.runWithContext(() => showError(error));
              }
            }
            if (result === true) {
              continue;
            }
            if (result || result === false) {
              return result;
            }
          }
        }
      });
      router.afterEach(() => {
        delete nuxtApp._processingMiddleware;
      });
      await router.replace(initialURL);
      if (!isEqual(route.fullPath, initialURL)) {
        await nuxtApp.runWithContext(() => navigateTo(route.fullPath));
      }
    });
    return {
      provide: {
        route,
        router
      }
    };
  }
});
function injectHead(nuxtApp) {
  var _a;
  const nuxt = nuxtApp || tryUseNuxtApp();
  return ((_a = nuxt == null ? void 0 : nuxt.ssrContext) == null ? void 0 : _a.head) || (nuxt == null ? void 0 : nuxt.runWithContext(() => {
    if (hasInjectionContext()) {
      return inject(headSymbol);
    }
  }));
}
function useHead(input, options = {}) {
  const head = injectHead(options.nuxt);
  if (head) {
    return useHead$1(input, { head, ...options });
  }
}
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
const components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const plugins = [
  unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU,
  router_DclsWNDeVV7SyG4lslgLnjbQUK1ws8wgf2FHaAbo7Cw,
  revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms,
  components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4
];
const _imports_0 = "" + __buildAssetsURL("4884785.Bi-TWgnR.jpg");
const categories = [
  {
    id: "color-tools",
    name: "Color Tools",
    description: "Color palettes, gradient generators, and other color-related tools",
    icon: "🎨",
    color: "bg-pink-500"
  },
  {
    id: "css-tools",
    name: "CSS Tools & Loaders",
    description: "CSS loaders, animations, and other CSS-related tools",
    icon: "💅",
    color: "bg-blue-500"
  },
  {
    id: "ui-components",
    name: "UI Components",
    description: "UI component libraries for React, Vue, and other frameworks",
    icon: "🧩",
    color: "bg-purple-500"
  },
  {
    id: "js-libraries",
    name: "JS Libraries",
    description: "JavaScript libraries for animations, effects, and functionality",
    icon: "📚",
    color: "bg-yellow-500"
  },
  {
    id: "sliders",
    name: "Sliders & Carousels",
    description: "JavaScript libraries for creating sliders and carousels",
    icon: "🎠",
    color: "bg-green-500"
  },
  {
    id: "dev-tools",
    name: "Development Tools",
    description: "Tools and resources for developers",
    icon: "🔧",
    color: "bg-red-500"
  },
  {
    id: "visual-tools",
    name: "Visual Tools",
    description: "Tools for creating and editing visuals",
    icon: "👁️",
    color: "bg-indigo-500"
  },
  {
    id: "learning",
    name: "Learning Resources",
    description: "Resources for learning web development",
    icon: "🧠",
    color: "bg-orange-500"
  },
  {
    id: "git-tools",
    name: "Git Tools",
    description: "Tools for working with Git repositories",
    icon: "🗂️",
    color: "bg-gray-500"
  }
];
const links = [
  // Color Tools
  {
    id: "picular",
    title: "Picular",
    url: "https://picular.co/",
    description: "Color palette generator tool",
    categoryId: "color-tools"
  },
  {
    id: "themecn",
    title: "ThemeCN",
    url: "https://themecn.dev/",
    description: "Colour tool for UI",
    categoryId: "color-tools"
  },
  {
    id: "colorize-design",
    title: "Colorize Design",
    url: "https://colorize.design/",
    description: "Generate color palettes for any website",
    categoryId: "color-tools"
  },
  {
    id: "gradientos",
    title: "Gradientos",
    url: "https://www.gradientos.app/",
    description: "CSS color palette",
    categoryId: "color-tools"
  },
  {
    id: "uicolors",
    title: "UI Colors",
    url: "https://uicolors.app/generate/1fa6f2",
    description: "UI color palette generator",
    categoryId: "color-tools"
  },
  {
    id: "shadow-gradients",
    title: "Shadow Gradients",
    url: "https://alvarotrigo.com/shadow-gradients/",
    description: "CSS shadow gradients",
    categoryId: "color-tools"
  },
  {
    id: "webgradients",
    title: "Web Gradients",
    url: "https://webgradients.com/",
    description: "CSS gradients massive library",
    categoryId: "color-tools"
  },
  {
    id: "palettemaker",
    title: "Palette Maker",
    url: "https://palettemaker.com/app",
    description: "Create color palette for UI",
    categoryId: "color-tools"
  },
  {
    id: "mybrandnewlogo",
    title: "My Brand New Logo",
    url: "https://mybrandnewlogo.com/color-gradient-generator",
    description: "CSS color generator",
    categoryId: "color-tools"
  },
  // CSS Tools & Loaders
  {
    id: "flexboxlabs",
    title: "Flexbox Labs",
    url: "https://flexboxlabs.netlify.app/",
    description: "Flex box tool",
    categoryId: "css-tools"
  },
  {
    id: "cssloaders-github",
    title: "CSS Loaders",
    url: "https://cssloaders.github.io/",
    description: "CSS loaders",
    categoryId: "css-tools"
  },
  {
    id: "css-text-circle",
    title: "CSS Text Circle",
    url: "https://codepen.io/donotfold/pen/ZYYYJRV",
    description: "CSS text circle",
    categoryId: "css-tools"
  },
  {
    id: "css-mesh-gradients",
    title: "CSS Mesh Gradients",
    url: "https://www.csshero.org/mesher",
    description: "CSS mesh gradients",
    categoryId: "css-tools"
  },
  {
    id: "css-grid-generator",
    title: "CSS Grid Generator",
    url: "https://cssgridgenerator.io/",
    description: "CSS grid generator tool",
    categoryId: "css-tools"
  },
  {
    id: "animista",
    title: "Animista",
    url: "https://animista.net/",
    description: "CSS Animations",
    categoryId: "css-tools"
  },
  {
    id: "fancy-border-radius",
    title: "Fancy Border Radius",
    url: "https://9elements.github.io/",
    description: "Fancy border radius generator",
    categoryId: "css-tools"
  },
  {
    id: "css-loaders",
    title: "CSS Loaders",
    url: "https://css-loaders.com/",
    description: "Massive CSS loaders",
    categoryId: "css-tools"
  },
  {
    id: "cssloaders-github-io",
    title: "CSS Loaders GitHub",
    url: "https://cssloaders.github.io/",
    description: "CSS Loaders",
    categoryId: "css-tools"
  },
  {
    id: "loading-io",
    title: "Loading.io",
    url: "https://loading.io/css/",
    description: "CSS Loaders",
    categoryId: "css-tools"
  },
  {
    id: "freefrontend-css-loaders",
    title: "Free Frontend CSS Loaders",
    url: "https://freefrontend.com/css-loaders/",
    description: "CSS Loaders",
    categoryId: "css-tools"
  },
  {
    id: "css-loader-generator",
    title: "CSS Loader Generator",
    url: "https://10015.io/tools/css-loader-generator",
    description: "CSS Loaders",
    categoryId: "css-tools"
  },
  {
    id: "animated-css-bg-generator",
    title: "Animated CSS Background Generator",
    url: "https://wweb.dev/resources/animated-css-background-generator",
    description: "CSS animated Backgrounds",
    categoryId: "css-tools"
  },
  {
    id: "loader-generator",
    title: "Loader Generator",
    url: "https://wweb.dev/resources/loader-generator",
    description: "Customized loaders",
    categoryId: "css-tools"
  },
  {
    id: "css-3d-buttons",
    title: "CSS 3D Buttons",
    url: "https://csspro.com/css-3d-buttons",
    description: "3D Buttons",
    categoryId: "css-tools"
  },
  {
    id: "animate-style",
    title: "Animate.style",
    url: "https://animate.style/",
    description: "CSS Animations",
    categoryId: "css-tools"
  },
  {
    id: "cssbuttons",
    title: "CSS Buttons",
    url: "https://cssbuttons.app/",
    description: "Button Animations",
    categoryId: "css-tools"
  },
  {
    id: "cssicon",
    title: "CSS Icon",
    url: "https://cssicon.space/#/icon/sun-solid",
    description: "CSS Icons black&white theme",
    categoryId: "css-tools"
  },
  {
    id: "animatiss",
    title: "Animatiss",
    url: "https://xsgames.co/animatiss/",
    description: "CSS Animations",
    categoryId: "css-tools"
  },
  {
    id: "toggles",
    title: "Toggles",
    url: "https://toggles.dev/",
    description: "Theme toggles",
    categoryId: "css-tools"
  },
  // UI Components
  {
    id: "ark-ui",
    title: "Ark UI",
    url: "https://ark-ui.com/",
    description: "React components",
    categoryId: "ui-components"
  },
  {
    id: "magui-live",
    title: "MageUI",
    url: "https://www.mageui.live/",
    description: "Animated JS library",
    categoryId: "ui-components"
  },
  {
    id: "prismane",
    title: "Prismane",
    url: "https://www.prismane.io/",
    description: "React components",
    categoryId: "ui-components"
  },
  {
    id: "spectrum",
    title: "Spectrum",
    url: "https://ui.spectrumhq.in/",
    description: "For high quality components",
    categoryId: "ui-components"
  },
  {
    id: "cuicui",
    title: "CuiCui",
    url: "https://cuicui.day/application-ui",
    description: "High quality components",
    categoryId: "ui-components"
  },
  {
    id: "uiverse",
    title: "UIverse",
    url: "https://uiverse.io/",
    description: "Open source UI component library",
    categoryId: "ui-components"
  },
  {
    id: "aceternity",
    title: "Aceternity UI",
    url: "https://ui.aceternity.com/components/sparkles",
    description: "UI components for React, Tailwind",
    categoryId: "ui-components"
  },
  {
    id: "shadcn",
    title: "Shadcn UI",
    url: "https://ui.shadcn.com/themes",
    description: "UI components",
    categoryId: "ui-components"
  },
  {
    id: "jqueryui",
    title: "jQuery UI",
    url: "https://jqueryui.com/",
    description: "jQuery UI interface",
    categoryId: "ui-components"
  },
  {
    id: "material-ui",
    title: "Material UI",
    url: "https://mui.com/",
    description: "Material UI component for React",
    categoryId: "ui-components"
  },
  {
    id: "revealjs",
    title: "Reveal.js",
    url: "https://revealjs.com/",
    description: "HTML components",
    categoryId: "ui-components"
  },
  {
    id: "uiball-loaders",
    title: "UI Ball Loaders",
    url: "https://uiball.com/ldrs/",
    description: "Loaders",
    categoryId: "ui-components"
  },
  {
    id: "flyonui",
    title: "FlyonUI",
    url: "https://flyonui.com/",
    description: "Tailwind CSS library",
    categoryId: "ui-components"
  },
  {
    id: "react-components",
    title: "React Components",
    url: "https://reactcomponents.com/",
    description: "Free React components",
    categoryId: "ui-components"
  },
  {
    id: "park-ui",
    title: "Park UI",
    url: "https://park-ui.com/",
    description: "React, Vue, Solid UI components library",
    categoryId: "ui-components"
  },
  {
    id: "magic-ui",
    title: "Magic UI",
    url: "https://magicui.design/",
    description: "UI components library for React, TypeScript, Tailwind CSS, and Motion",
    categoryId: "ui-components"
  },
  {
    id: "vaul",
    title: "Vaul",
    url: "https://vaul.emilkowal.ski/getting-started",
    description: "React Drawer components",
    categoryId: "ui-components"
  },
  {
    id: "reactbits",
    title: "React Bits",
    url: "https://www.reactbits.dev/",
    description: "Animated UI component",
    categoryId: "ui-components"
  },
  {
    id: "hyperui",
    title: "Hyper UI",
    url: "https://www.hyperui.dev/",
    description: "UI components",
    categoryId: "ui-components"
  },
  {
    id: "intentui",
    title: "Intent UI",
    url: "https://intentui.com/docs/2.x/getting-started/installation",
    description: "React UI library components",
    categoryId: "ui-components"
  },
  {
    id: "heroui",
    title: "Hero UI",
    url: "https://www.heroui.com/",
    description: "React/Next.js Framework",
    categoryId: "ui-components"
  },
  {
    id: "framer",
    title: "Framer",
    url: "https://www.framer.com/",
    description: "Portfolio Designs",
    categoryId: "ui-components"
  },
  {
    id: "inika-desktop",
    title: "Inika Desktop",
    url: "https://inikasdesktop.framer.website/",
    description: "Inspired by Mac UI using Framer",
    categoryId: "ui-components"
  },
  // JS Libraries
  {
    id: "lynxjs",
    title: "LynxJS",
    url: "https://lynxjs.org/",
    description: "React mobile framework",
    categoryId: "js-libraries"
  },
  {
    id: "animated-icons",
    title: "Animated Icons",
    url: "https://gradienty.codes/animated-icons",
    description: "Animated icon library",
    categoryId: "js-libraries"
  },
  {
    id: "frimousse",
    title: "Frimousse",
    url: "https://frimousse.liveblocks.io/",
    description: "Emojis in React",
    categoryId: "js-libraries"
  },
  {
    id: "echarts",
    title: "ECharts",
    url: "https://echarts.apache.org/",
    description: "Open source charts",
    categoryId: "js-libraries"
  },
  {
    id: "react-google-maps",
    title: "React Google Maps",
    url: "https://visgl.github.io/react-google-maps/examples",
    description: "React Google Maps",
    categoryId: "js-libraries"
  },
  {
    id: "react-haiku",
    title: "React Haiku",
    url: "https://www.reacthaiku.dev/",
    description: "React readymade hooks",
    categoryId: "js-libraries"
  },
  {
    id: "smooth-ui",
    title: "Smooth UI",
    url: "https://www.smoothui.dev/",
    description: "React animated components",
    categoryId: "js-libraries"
  },
  {
    id: "atroposjs",
    title: "Atropos JS",
    url: "https://atroposjs.com/",
    description: "3D hover JS animated library",
    categoryId: "js-libraries"
  },
  {
    id: "pragmatic-drag-and-drop",
    title: "Pragmatic Drag and Drop",
    url: "https://atlassian.design/components/pragmatic-drag-and-drop/",
    description: "Drag n drop",
    categoryId: "js-libraries"
  },
  {
    id: "react-beautiful-dnd",
    title: "React Beautiful DnD",
    url: "https://github.com/atlassian/react-beautiful-dnd",
    description: "Drag n drop for React",
    categoryId: "js-libraries"
  },
  {
    id: "animejs",
    title: "Anime.js",
    url: "https://animejs.com/",
    description: "JS animated library",
    categoryId: "js-libraries"
  },
  {
    id: "pressurejs",
    title: "Pressure.js",
    url: "https://pressurejs.com/",
    description: "Handle Long press events",
    categoryId: "js-libraries"
  },
  {
    id: "driverjs",
    title: "Driver.js",
    url: "https://driverjs.com/",
    description: "JS page tour",
    categoryId: "js-libraries"
  },
  {
    id: "roughnotation",
    title: "Rough Notation",
    url: "https://roughnotation.com/",
    description: "Which allows you to create animated sketch highlight",
    categoryId: "js-libraries"
  },
  {
    id: "shepherdjs",
    title: "Shepherd.js",
    url: "https://www.shepherdjs.dev/",
    description: "Page tours",
    categoryId: "js-libraries"
  },
  {
    id: "tempo",
    title: "Tempo",
    url: "https://tempo.formkit.com/",
    description: "For Dates",
    categoryId: "js-libraries"
  },
  {
    id: "gsap",
    title: "GSAP",
    url: "https://gsap.com/",
    description: "JS Animated",
    categoryId: "js-libraries"
  },
  {
    id: "maxwellito",
    title: "Maxwellito",
    url: "https://github.com/maxwellito",
    description: "JS Animated",
    categoryId: "js-libraries"
  },
  {
    id: "uv-canvas",
    title: "UV Canvas",
    url: "https://uvcanvas.com/docs",
    description: "Animated BG library for React",
    categoryId: "js-libraries"
  },
  {
    id: "cursify",
    title: "Cursify",
    url: "https://cursify.vercel.app/",
    description: "JS interactive cursor effects in React",
    categoryId: "js-libraries"
  },
  {
    id: "react-sounds",
    title: "React Sounds",
    url: "https://www.reactsounds.com/",
    description: "Add sounds for buttons in react",
    categoryId: "js-libraries"
  },
  {
    id: "vanta",
    title: "Vanta.js",
    url: "https://www.vantajs.com/",
    description: "Animated 3D backgrounds",
    categoryId: "js-libraries"
  },
  {
    id: "playcanvas-react",
    title: "PlayCanvas React",
    url: "https://playcanvas-react.vercel.app/docs",
    description: "3D app library React",
    categoryId: "js-libraries"
  },
  {
    id: "swapy",
    title: "Swapy",
    url: "https://swapy.tahazsh.com/",
    description: "JS library draggable boxes",
    categoryId: "js-libraries"
  },
  {
    id: "jj811208-repos",
    title: "JJ811208 Repos",
    url: "https://github.com/jj811208?tab=repositories",
    description: "Animated Login etc",
    categoryId: "js-libraries"
  },
  {
    id: "rosencharts",
    title: "RosenCharts",
    url: "https://rosencharts.com/",
    description: "React Charts",
    categoryId: "js-libraries"
  },
  {
    id: "threejs",
    title: "Three.js",
    url: "https://threejs.org/",
    description: "JavaScript 3D library",
    categoryId: "js-libraries"
  },
  {
    id: "babylonjs",
    title: "Babylon.js",
    url: "https://www.babylonjs.com/",
    description: "3D rendering engine",
    categoryId: "js-libraries"
  },
  {
    id: "pixijs",
    title: "Pixi.js",
    url: "https://pixijs.com/",
    description: "2D WebGL renderer",
    categoryId: "js-libraries"
  },
  {
    id: "matterjs",
    title: "Matter.js",
    url: "https://brm.io/matter-js/",
    description: "2D physics engine",
    categoryId: "js-libraries"
  },
  // Sliders & Carousels
  {
    id: "smooothy",
    title: "Smooothy",
    url: "https://smooothy.vercel.app/",
    description: "JS slider component",
    categoryId: "sliders"
  },
  {
    id: "simple-parallax",
    title: "Simple Parallax",
    url: "https://simpleparallax.com/",
    description: "Simple parallax animations",
    categoryId: "sliders"
  },
  {
    id: "gliderjs",
    title: "Glider.js",
    url: "https://nickpiscitelli.github.io/Glider.js/",
    description: "For slider carousel",
    categoryId: "sliders"
  },
  {
    id: "swiperjs",
    title: "Swiper.js",
    url: "https://swiperjs.com/",
    description: "For slider carousel",
    categoryId: "sliders"
  },
  {
    id: "swiffy-slider",
    title: "Swiffy Slider",
    url: "https://swiffyslider.com/",
    description: "Slider carousel",
    categoryId: "sliders"
  },
  {
    id: "keen-slider",
    title: "Keen Slider",
    url: "https://keen-slider.io/",
    description: "Slider carousel",
    categoryId: "sliders"
  },
  {
    id: "splide",
    title: "Splide",
    url: "https://splidejs.com/",
    description: "For slider carousel",
    categoryId: "sliders"
  },
  {
    id: "slider-effects",
    title: "Slider Effects",
    url: "https://philparsons.co.uk/slider/docs/effects/carousel",
    description: "Slider effect carousel",
    categoryId: "sliders"
  },
  {
    id: "bespoke",
    title: "Bespoke",
    url: "https://github.com/bespokejs/bespoke",
    description: "JS carousel library",
    categoryId: "sliders"
  },
  // Development Tools
  {
    id: "liambx",
    title: "LiamBX",
    url: "https://liambx.com/",
    description: "Visualize SQL Database",
    categoryId: "dev-tools"
  },
  {
    id: "freepublicapis",
    title: "Free Public APIs",
    url: "https://www.freepublicapis.com/",
    description: "Free public APIs",
    categoryId: "dev-tools"
  },
  {
    id: "roadmap",
    title: "Roadmap.sh",
    url: "https://roadmap.sh/",
    description: "Roadmap for Developers",
    categoryId: "dev-tools"
  },
  {
    id: "font-tester",
    title: "Font Tester",
    url: "https://font-tester.foxcraft.tech/",
    description: "Font tester chrome extension",
    categoryId: "dev-tools"
  },
  {
    id: "github-city",
    title: "GitHub City",
    url: "https://honzaap.github.io/GithubCity",
    description: "Tool to showcase your github contributions in 3D city",
    categoryId: "dev-tools"
  },
  {
    id: "devpedia",
    title: "DevPedia",
    url: "https://devpedia.dev/",
    description: "Explanation about tools for developers",
    categoryId: "dev-tools"
  },
  {
    id: "file-pizza",
    title: "File Pizza",
    url: "https://file.pizza/",
    description: "Transfer files securely. It is an open source",
    categoryId: "dev-tools"
  },
  {
    id: "firebase-studio",
    title: "Firebase Studio",
    url: "https://firebase.studio/",
    description: "Alternative to cursor",
    categoryId: "dev-tools"
  },
  {
    id: "githubtree",
    title: "GitHub Tree",
    url: "https://githubtree.mgks.dev/",
    description: "Git hub tree for visualization",
    categoryId: "dev-tools"
  },
  {
    id: "ikonate",
    title: "Ikonate",
    url: "https://ikonate.com/",
    description: "Icons",
    categoryId: "dev-tools"
  },
  {
    id: "gitzip",
    title: "GitZip",
    url: "https://chromewebstore.google.com/detail/gitzip-for-github",
    description: "Download GitHub files",
    categoryId: "dev-tools"
  },
  {
    id: "device-simulator",
    title: "Device Simulator",
    url: "https://chromewebstore.google.com/detail/device-simulator-tester/iacpblbgooifgclhbdcaonebhoadpmgj?hl=en",
    description: "For UI testing",
    categoryId: "dev-tools"
  },
  {
    id: "htmlrev",
    title: "HTML Rev",
    url: "https://htmlrev.com/",
    description: "Free 1500+ HTML templates",
    categoryId: "dev-tools"
  },
  {
    id: "uigenerator",
    title: "UI Generator",
    url: "https://uigenerator.org/",
    description: "UI generator",
    categoryId: "dev-tools"
  },
  {
    id: "os-js",
    title: "OS.js",
    url: "https://www.os-js.org/",
    description: "Desktop Experience",
    categoryId: "dev-tools"
  },
  {
    id: "web-dev",
    title: "Web.dev",
    url: "https://web.dev/",
    description: "By Google for web development",
    categoryId: "dev-tools"
  },
  {
    id: "hoppscotch",
    title: "Hoppscotch",
    url: "https://hoppscotch.io/",
    description: "Alternative to POSTMAN",
    categoryId: "dev-tools"
  },
  {
    id: "project-wallace",
    title: "Project Wallace",
    url: "https://www.projectwallace.com/",
    description: "Optimize CSS",
    categoryId: "dev-tools"
  },
  {
    id: "quickref",
    title: "QuickRef",
    url: "https://quickref.me/",
    description: "Cheatsheet reference for any language",
    categoryId: "dev-tools"
  },
  {
    id: "jsv9000",
    title: "JSV9000",
    url: "https://www.jsv9000.app/",
    description: "Learn & Master Javascript visually",
    categoryId: "dev-tools"
  },
  {
    id: "repofiles",
    title: "RepoFiles",
    url: "https://repofiles.com/",
    description: "Visualize for GitHub repos",
    categoryId: "dev-tools"
  },
  {
    id: "puter",
    title: "Puter",
    url: "https://puter.com/",
    description: "OS that runs in browser",
    categoryId: "dev-tools"
  },
  {
    id: "kaneo",
    title: "Kaneo",
    url: "https://kaneo.app/",
    description: "Open source alternative to Trello",
    categoryId: "dev-tools"
  },
  {
    id: "lucide",
    title: "Lucide",
    url: "https://lucide.dev/icons/",
    description: "Icons",
    categoryId: "dev-tools"
  },
  {
    id: "quizzes",
    title: "Quizzes",
    url: "https://quizzes.madza.dev/",
    description: "Quiz for any type of interview Basics",
    categoryId: "dev-tools"
  },
  {
    id: "bundlephobia",
    title: "Bundlephobia",
    url: "https://bundlephobia.com/",
    description: "Analyze size and impact of NPM",
    categoryId: "dev-tools"
  },
  {
    id: "toptal-gitignore",
    title: "Toptal Gitignore",
    url: "https://www.toptal.com/developers/gitignore",
    description: "It will give you a basic gitignore file",
    categoryId: "dev-tools"
  },
  {
    id: "tesseract",
    title: "Tesseract",
    url: "https://tesseract.projectnaptha.com/",
    description: "Extract text from images",
    categoryId: "dev-tools"
  },
  {
    id: "netlify-drop",
    title: "Netlify Drop",
    url: "https://app.netlify.com/drop",
    description: "Publish ur website in < 10 sec",
    categoryId: "dev-tools"
  },
  // Visual Tools
  {
    id: "summer-afternoon",
    title: "Summer Afternoon",
    url: "https://summer-afternoon.vlucendo.com/",
    description: "Three.js animated for childhood",
    categoryId: "visual-tools"
  },
  {
    id: "animated-icons",
    title: "Animated Icons",
    url: "https://icons.pqoqubbw.dev/",
    description: "Animated icons",
    categoryId: "visual-tools"
  },
  {
    id: "fluid-motion",
    title: "Fluid Motion",
    url: "https://fluidmotion.app/halo",
    description: "Background generator",
    categoryId: "visual-tools"
  },
  {
    id: "blobmaker",
    title: "Blob Maker",
    url: "https://www.blobmaker.app/",
    description: "Create customized SVG",
    categoryId: "visual-tools"
  },
  {
    id: "svg-shape-generator",
    title: "SVG Shape Generator",
    url: "https://www.softr.io/tools/svg-shape-generator",
    description: "Generate free SVG",
    categoryId: "visual-tools"
  },
  {
    id: "shots-so",
    title: "Shots.so",
    url: "https://shots.so/",
    description: "Edit images with animations",
    categoryId: "visual-tools"
  },
  {
    id: "wooz-store",
    title: "Wooz.store",
    url: "https://wooz.store/",
    description: "Animated 3D website using JS",
    categoryId: "visual-tools"
  },
  {
    id: "postspark",
    title: "PostSpark",
    url: "https://postspark.app/",
    description: "Create stunning images in a professional way",
    categoryId: "visual-tools"
  },
  {
    id: "undraw",
    title: "unDraw",
    url: "https://undraw.co/illustrations/5",
    description: "Customizable colors for SVG, Png",
    categoryId: "visual-tools"
  },
  {
    id: "vscode-theme-generator",
    title: "VS Code Theme Generator",
    url: "https://github.com/RodrigoLuglio/vscode-theme-generator",
    description: "VS Code theme generator",
    categoryId: "visual-tools"
  },
  {
    id: "screely",
    title: "Screely",
    url: "https://screely.com/editor",
    description: "Customize images/screenshots with high quality",
    categoryId: "visual-tools"
  },
  {
    id: "layout-bradwoods",
    title: "Layout",
    url: "https://layout.bradwoods.io/",
    description: "CSS Grid generator",
    categoryId: "visual-tools"
  },
  {
    id: "easing-wizard",
    title: "Easing Wizard",
    url: "https://easingwizard.com/",
    description: "Animated CSS",
    categoryId: "visual-tools"
  },
  // Learning Resources
  {
    id: "deepwiki",
    title: "DeepWiki",
    url: "https://deepwiki.com/android/architecture-templates",
    description: "For any github.com repo replace github with deepwiki",
    categoryId: "learning"
  },
  {
    id: "joshwcomeau-css-grid",
    title: "Josh W Comeau CSS Grid",
    url: "https://www.joshwcomeau.com/css/interactive-guide-to-grid/",
    description: "Interactive guide for CSS",
    categoryId: "learning"
  },
  {
    id: "idea-instructions",
    title: "Idea Instructions",
    url: "https://idea-instructions.com/",
    description: "It teaches you fun comics for algorithms",
    categoryId: "learning"
  },
  {
    id: "game-dev-websites",
    title: "Game Dev Websites",
    url: "https://phaser.io/",
    description: "Video Gaming Website",
    categoryId: "learning"
  },
  {
    id: "portfolio-websites",
    title: "Portfolio Websites",
    url: "https://www.prettyfolio.com/",
    description: "Portfolio websites",
    categoryId: "learning"
  },
  {
    id: "css-games",
    title: "CSS Games",
    url: "https://flexboxfroggy.com/",
    description: "Learn CSS through games",
    categoryId: "learning"
  },
  {
    id: "frontend-mentor",
    title: "Frontend Mentor",
    url: "https://www.frontendmentor.io/",
    description: "Code challenges for Frontend Developer",
    categoryId: "learning"
  },
  {
    id: "project-based-learning",
    title: "Project Based Learning",
    url: "https://github.com/practical-tutorials/project-based-learning",
    description: "Practice all type of programming languages",
    categoryId: "learning"
  },
  {
    id: "lookup-design",
    title: "Lookup Design",
    url: "https://lookup.design/",
    description: "UI examples for Developers",
    categoryId: "learning"
  },
  {
    id: "florin-pop-projects",
    title: "Florin Pop Projects",
    url: "https://www.florin-pop.com/blog/100-days-100-projects/",
    description: "JS projects 100 days",
    categoryId: "learning"
  },
  {
    id: "ui-design-daily",
    title: "UI Design Daily",
    url: "https://www.uidesigndaily.com/",
    description: "To practice CSS",
    categoryId: "learning"
  },
  {
    id: "call-to-inspiration",
    title: "Call to Inspiration",
    url: "https://calltoinspiration.com/",
    description: "Design ideas for Developers",
    categoryId: "learning"
  },
  {
    id: "andreasbm-github",
    title: "Andreas BM GitHub",
    url: "https://andreasbm.github.io/",
    description: "Learn almost everything in web development docs",
    categoryId: "learning"
  },
  {
    "id": "deepwiki-android-architecture-templates",
    "title": "DeepWiki Android Architecture Templates",
    "url": "https://deepwiki.com/android/architecture-templates",
    "description": "Replace github.com with deepwiki.com for any repo to get summarized insights.",
    "categoryId": "git-tools"
  },
  {
    "id": "gitsummarize-android-architecture-templates",
    "title": "GitSummarize Android Architecture Templates",
    "url": "https://gitsummarize.com/android/architecture-templates",
    "description": "Replace github.com with gitsummarize.com for any repo to get summarized insights.",
    "categoryId": "git-tools"
  },
  {
    "id": "chat-forgithub-android-architecture-templates",
    "title": "Chat for GitHub - Android Architecture Templates",
    "url": "https://chat.forgithub.com/android/architecture-templates",
    "description": "Replace github.com with chat.forgithub.com for any repo to get summarized insights.",
    "categoryId": "git-tools"
  },
  {
    "id": "deepwiki-ingest-android-architecture-templates",
    "title": "DeepWiki LLM Ingest - Android Architecture Templates",
    "url": "https://deepwiki.ingest.com/android/architecture-templates",
    "description": "Replace github.com with deepwiki.ingest.com for any repo to get summarized insights.",
    "categoryId": "git-tools"
  },
  {
    "id": "deepwiki-diagram-android-architecture-templates",
    "title": "DeepWiki Diagram - Android Architecture Templates",
    "url": "https://deepwiki.diagram.com/android/architecture-templates",
    "description": "Replace github.com with deepwiki.diagram.com for any repo to get summarized insights.",
    "categoryId": "git-tools"
  },
  {
    "id": "deepwiki-dev-android-architecture-templates",
    "title": "DeepWiki VS Code Dev - Android Architecture Templates",
    "url": "https://deepwiki.dev/android/architecture-templates",
    "description": "Replace github.com with deepwiki.dev for any repo to get summarized insights.",
    "categoryId": "git-tools"
  }
];
const _sfc_main$6 = {
  __name: "CategoryTab",
  __ssrInlineRender: true,
  props: {
    category: {
      type: Object,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  emits: ["select"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["px-4 py-3 rounded-lg cursor-pointer transition-all duration-200", [
          __props.isActive ? `${__props.category.color} text-white font-semibold` : "hover:bg-gray-100 dark:hover:bg-gray-800"
        ]]
      }, _attrs))}><div class="flex items-center gap-2"><span class="text-xl">${ssrInterpolate(__props.category.icon)}</span><span>${ssrInterpolate(__props.category.name)}</span></div></div>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CategoryTab.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "LinkCard",
  __ssrInlineRender: true,
  props: {
    link: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const isFavorite = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card p-4 h-full flex flex-col" }, _attrs))}><h3 class="text-lg font-medium mb-2">${ssrInterpolate(__props.link.title)}</h3><p class="text-sm text-gray-500 dark:text-gray-400 flex-1 mb-4">${ssrInterpolate(__props.link.description)}</p><div class="flex justify-between items-center mt-auto"><a${ssrRenderAttr("href", __props.link.url)} target="_blank" rel="noopener noreferrer" class="btn-primary text-sm px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2"><span>Visit</span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a><button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([isFavorite.value ? "text-yellow-500 fill-yellow-500" : "text-gray-400", "h-5 w-5"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg></button></div></div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LinkCard.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "SearchBar",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: ["update:modelValue"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative mb-6" }, _attrs))}><div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><svg class="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"></path></svg></div><input type="search" class="w-full p-4 pl-10 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200" placeholder="Search for resources..."${ssrRenderAttr("value", __props.modelValue)}>`);
      if (__props.modelValue) {
        _push(`<button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SearchBar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "ThemeToggle",
  __ssrInlineRender: true,
  setup(__props) {
    const isDark = ref(false);
    useHead({
      htmlAttrs: {
        // We'll control the 'dark' class through the toggleDarkMode function
        // This is just to ensure proper setup with nuxt head management
        class: ""
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: "p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200",
        "aria-label": "Toggle dark mode"
      }, _attrs))}>`);
      if (isDark.value) {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`);
      }
      _push(`</button>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ThemeToggle.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const searchQuery = ref("");
    const selectedCategory = ref("color-tools");
    const showFavorites = ref(false);
    const favoriteLinkIds = ref([]);
    const setCategory = (categoryId) => {
      selectedCategory.value = categoryId;
    };
    const currentCategoryName = computed(() => {
      if (showFavorites.value) return "Favorites";
      const category = categories.find((c) => c.id === selectedCategory.value);
      return category ? category.name : "";
    });
    const filteredLinks = computed(() => {
      let filtered = links;
      if (showFavorites.value) {
        filtered = filtered.filter((link) => favoriteLinkIds.value.includes(link.id));
      } else {
        filtered = filtered.filter((link) => link.categoryId === selectedCategory.value);
      }
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (link) => link.title.toLowerCase().includes(query) || link.description.toLowerCase().includes(query)
        );
      }
      return filtered;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300" }, _attrs))}><header class="sticky top-0 bg-white dark:bg-gray-900 shadow-sm backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 z-10"><div class="container mx-auto px-6 py-4 flex justify-between items-center"><div class="flex items-center gap-2"><img${ssrRenderAttr("src", _imports_0)} alt="Logo" class="w-8 h-8 rounded-md"><h1 class="text-xl font-bold text-gray-800 dark:text-white">Dev Resources Hub</h1></div><div class="flex items-center gap-4"><button class="text-sm flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([showFavorites.value ? "text-yellow-500 fill-yellow-500" : "", "h-4 w-4"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg><span>${ssrInterpolate(showFavorites.value ? "All Resources" : "Favorites")}</span></button>`);
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(`</div></div></header><main class="container mx-auto px-6 py-8">`);
      _push(ssrRenderComponent(_sfc_main$4, {
        modelValue: searchQuery.value,
        "onUpdate:modelValue": ($event) => searchQuery.value = $event
      }, null, _parent));
      _push(`<div class="grid grid-cols-1 md:grid-cols-12 gap-8"><div class="md:col-span-3 space-y-2"><div class="sticky top-24"><h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Categories</h2><div class="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto no-scrollbar pb-4"><!--[-->`);
      ssrRenderList(unref(categories), (category) => {
        _push(ssrRenderComponent(_sfc_main$6, {
          key: category.id,
          category,
          "is-active": selectedCategory.value === category.id,
          onSelect: setCategory
        }, null, _parent));
      });
      _push(`<!--]--></div></div></div><div class="md:col-span-9">`);
      if (filteredLinks.value.length > 0) {
        _push(`<div><div class="mb-6 flex justify-between items-center"><h2 class="text-xl font-semibold text-gray-900 dark:text-white">${ssrInterpolate(currentCategoryName.value)} <span class="text-sm text-gray-500 dark:text-gray-400 ml-2">(${ssrInterpolate(filteredLinks.value.length)} resources)</span></h2></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
        ssrRenderList(filteredLinks.value, (link) => {
          _push(ssrRenderComponent(_sfc_main$5, {
            key: link.id,
            link
          }, null, _parent));
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<div class="flex flex-col items-center justify-center py-16"><svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><h3 class="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No resources found</h3><p class="text-gray-500 dark:text-gray-400">${ssrInterpolate(searchQuery.value ? "Try a different search term or category." : "Select a category to see resources.")}</p></div>`);
      }
      _push(`</div></div></main><footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16"><div class="container mx-auto px-6 py-8"><div class="flex flex-col md:flex-row justify-between items-center gap-4"><div><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Dev Resources Hub</h3><p class="text-sm text-gray-500 dark:text-gray-400"> A curated collection of useful tools and resources for developers </p></div><div class="text-sm text-gray-500 dark:text-gray-400"> © 2025 Siva Mani Munaga. All rights reserved. </div></div></div></footer></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    _error.stack ? _error.stack.split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n") : "";
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-SO48PzaI.mjs'));
    const _Error = defineAsyncComponent(() => import('./error-500-C-drvTi7.mjs'));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    var _a;
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      (_a = nuxt.payload).error || (_a.error = createError(error));
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

export { useNuxtApp as a, useRuntimeConfig as b, nuxtLinkDefaults as c, useHead as d, entry$1 as default, navigateTo as n, resolveRouteObject as r, useRouter as u };
//# sourceMappingURL=server.mjs.map
