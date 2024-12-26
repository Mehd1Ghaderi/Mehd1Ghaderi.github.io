globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseStatus, setResponseHeader, getRequestHeaders, createError, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { klona } from 'klona';
import defu, { defuFn } from 'defu';
import { hash } from 'ohash';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage, prefixStorage } from 'unstorage';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {}
};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const _sharedRuntimeConfig = _deepFreeze(
  _applyEnv(klona(_inlineRuntimeConfig))
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  _applyEnv(runtimeConfig);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _getEnv(key) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function _applyEnv(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = _getEnv(subKey);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      _applyEnv(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
  return obj;
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

storage.mount('/assets', assets$1);

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(key, () => fn(...args), shouldInvalidateCache);
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return key.replace(/[^\dA-Za-z]/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const key = await opts.getKey?.(event);
      if (key) {
        return escapeKey(key);
      }
      const url = event.node.req.originalUrl || event.node.req.url;
      const friendlyName = escapeKey(decodeURI(parseURL(url).pathname)).slice(
        0,
        16
      );
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const reqProxy = cloneWithProxy(incomingEvent.node.req, { headers: {} });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString();
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: $fetch.raw,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.node.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(path, useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('../error-500.mjs');
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  event.node.res.end(await res.text());
});

const assets = {
  "/ss.png": {
    "type": "image/png",
    "etag": "\"da661-XDRiIgBUczd770hIne8ZZyLzTIY\"",
    "mtime": "2023-06-20T16:15:05.000Z",
    "size": 894561,
    "path": "../public/ss.png"
  },
  "/fonts/Barlow-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"9e74-XXos9L6cGbcrZsyE2RY66DOpTeU\"",
    "mtime": "2023-06-20T16:15:05.000Z",
    "size": 40564,
    "path": "../public/fonts/Barlow-Medium.woff2"
  },
  "/fonts/Barlow-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"9e3c-idP3b3zFaH7FapTC4r+zmTR1AK4\"",
    "mtime": "2023-06-20T16:15:05.000Z",
    "size": 40508,
    "path": "../public/fonts/Barlow-Regular.woff2"
  },
  "/fonts/Barlow-SemiBoldItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"adcc-5jmJ8wNgXaPdA22Z+IGdE4G1bJY\"",
    "mtime": "2023-06-20T16:15:05.000Z",
    "size": 44492,
    "path": "../public/fonts/Barlow-SemiBoldItalic.woff2"
  },
  "/fonts/Inter-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"18618-74aLd/Gf45DZOHQL8K+DSWfijk4\"",
    "mtime": "2023-06-20T16:15:05.000Z",
    "size": 99864,
    "path": "../public/fonts/Inter-Regular.woff2"
  },
  "/fonts/Inter-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"19eb8-1Tn5cXHI4tGJ8Hohaw0U1UaKrGE\"",
    "mtime": "2023-06-20T16:15:05.000Z",
    "size": 106168,
    "path": "../public/fonts/Inter-SemiBold.woff2"
  },
  "/img/baryt-mobile.webp": {
    "type": "image/webp",
    "etag": "\"35e0-l8i8ceUGI8PySWR9hdd8Q/+VfD4\"",
    "mtime": "2023-06-20T16:15:05.000Z",
    "size": 13792,
    "path": "../public/img/baryt-mobile.webp"
  },
  "/img/baryt.webp": {
    "type": "image/webp",
    "etag": "\"69d6-/5a0ecMoJ6YMDXx5NwERmVmTm0k\"",
    "mtime": "2023-06-20T16:15:05.000Z",
    "size": 27094,
    "path": "../public/img/baryt.webp"
  },
  "/img/countries-mobile.webp": {
    "type": "image/webp",
    "etag": "\"1b4c-OMjSPyCNMkSz+/A6PdcoSgDSw/k\"",
    "mtime": "2023-06-20T16:15:05.000Z",
    "size": 6988,
    "path": "../public/img/countries-mobile.webp"
  },
  "/img/countries.webp": {
    "type": "image/webp",
    "etag": "\"2eb0-0g+V5A1lABleAIBtozqIkXCo+D8\"",
    "mtime": "2023-06-20T16:15:05.000Z",
    "size": 11952,
    "path": "../public/img/countries.webp"
  },
  "/img/donuts-mobile.webp": {
    "type": "image/webp",
    "etag": "\"1cfa-HrOlSixFtUX3VX+VPnrT8Z7BFGk\"",
    "mtime": "2023-06-20T16:15:05.000Z",
    "size": 7418,
    "path": "../public/img/donuts-mobile.webp"
  },
  "/img/donuts.webp": {
    "type": "image/webp",
    "etag": "\"3752-dMwIaRmRlSX6DZJgmyQBWERsq10\"",
    "mtime": "2023-06-20T16:15:05.000Z",
    "size": 14162,
    "path": "../public/img/donuts.webp"
  },
  "/img/memorize-mobile.webp": {
    "type": "image/webp",
    "etag": "\"294e-P0VdiArLx3kImBlbfhcm+I8fKNQ\"",
    "mtime": "2023-06-20T16:15:05.000Z",
    "size": 10574,
    "path": "../public/img/memorize-mobile.webp"
  },
  "/img/memorize.webp": {
    "type": "image/webp",
    "etag": "\"4a6c-BNw/xo6mMLjtZ/xa+QE4i+hAugQ\"",
    "mtime": "2023-06-20T16:15:05.000Z",
    "size": 19052,
    "path": "../public/img/memorize.webp"
  },
  "/_nuxt/Barlow-Medium.40c00d31.woff2": {
    "type": "font/woff2",
    "etag": "\"9e74-XXos9L6cGbcrZsyE2RY66DOpTeU\"",
    "mtime": "2024-12-26T12:25:14.284Z",
    "size": 40564,
    "path": "../public/_nuxt/Barlow-Medium.40c00d31.woff2"
  },
  "/_nuxt/Barlow-Regular.dc45a576.woff2": {
    "type": "font/woff2",
    "etag": "\"9e3c-idP3b3zFaH7FapTC4r+zmTR1AK4\"",
    "mtime": "2024-12-26T12:25:14.284Z",
    "size": 40508,
    "path": "../public/_nuxt/Barlow-Regular.dc45a576.woff2"
  },
  "/_nuxt/BaseTitle.8e83d79d.js": {
    "type": "application/javascript",
    "etag": "\"fb-8Bkfr3h2TcOhs4rbaDh0Mjj5PrM\"",
    "mtime": "2024-12-26T12:25:14.284Z",
    "size": 251,
    "path": "../public/_nuxt/BaseTitle.8e83d79d.js"
  },
  "/_nuxt/entry.dc4905c8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4588-8MYt8qxOHoD4+W78Q66KLw7r5tA\"",
    "mtime": "2024-12-26T12:25:14.285Z",
    "size": 17800,
    "path": "../public/_nuxt/entry.dc4905c8.css"
  },
  "/_nuxt/entry.e3fb9d01.js": {
    "type": "application/javascript",
    "etag": "\"22305-yQI4usKLsUyOEfMZoDxa8cS7cQ0\"",
    "mtime": "2024-12-26T12:25:14.287Z",
    "size": 140037,
    "path": "../public/_nuxt/entry.e3fb9d01.js"
  },
  "/_nuxt/error-404.23f2309d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-ivsbEmi48+s9HDOqtrSdWFvddYQ\"",
    "mtime": "2024-12-26T12:25:14.284Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.23f2309d.css"
  },
  "/_nuxt/error-404.9eff0cb0.js": {
    "type": "application/javascript",
    "etag": "\"8d2-uPOu6JM9cH9jX0uSq8VCwHP/ePo\"",
    "mtime": "2024-12-26T12:25:14.282Z",
    "size": 2258,
    "path": "../public/_nuxt/error-404.9eff0cb0.js"
  },
  "/_nuxt/error-500.aa16ed4d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-7j4Tsx89siDo85YoIs0XqsPWmPI\"",
    "mtime": "2024-12-26T12:25:14.284Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.aa16ed4d.css"
  },
  "/_nuxt/error-500.d9d02c33.js": {
    "type": "application/javascript",
    "etag": "\"756-ejVWpfpVwj8pqVOAszRySaVqQAA\"",
    "mtime": "2024-12-26T12:25:14.285Z",
    "size": 1878,
    "path": "../public/_nuxt/error-500.d9d02c33.js"
  },
  "/_nuxt/error-component.937501dc.js": {
    "type": "application/javascript",
    "etag": "\"478-T/P/yOsd6q6vkkCR6aJ8p/L38VY\"",
    "mtime": "2024-12-26T12:25:14.284Z",
    "size": 1144,
    "path": "../public/_nuxt/error-component.937501dc.js"
  },
  "/_nuxt/FooterCircle.090f3724.js": {
    "type": "application/javascript",
    "etag": "\"139-TQjUOILlNIvsWe4uVbJHcctHc38\"",
    "mtime": "2024-12-26T12:25:14.287Z",
    "size": 313,
    "path": "../public/_nuxt/FooterCircle.090f3724.js"
  },
  "/_nuxt/FooterContact.d183d91e.js": {
    "type": "application/javascript",
    "etag": "\"332-iptZJMxtMys3ERxnpBzKfxcsE4I\"",
    "mtime": "2024-12-26T12:25:14.288Z",
    "size": 818,
    "path": "../public/_nuxt/FooterContact.d183d91e.js"
  },
  "/_nuxt/FooterContactLinks.078aaa14.js": {
    "type": "application/javascript",
    "etag": "\"4f7-S9LZA0HBRHPJasKLNVgQwmCF2fE\"",
    "mtime": "2024-12-26T12:25:14.278Z",
    "size": 1271,
    "path": "../public/_nuxt/FooterContactLinks.078aaa14.js"
  },
  "/_nuxt/FooterContactLinks.ec5b107c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"154-ienTMfeJ5nqVX4jf544k7PsnQOE\"",
    "mtime": "2024-12-26T12:25:14.285Z",
    "size": 340,
    "path": "../public/_nuxt/FooterContactLinks.ec5b107c.css"
  },
  "/_nuxt/index.17614f3c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d4-jL307VGw37dRow6mSZPZ1jZwdiQ\"",
    "mtime": "2024-12-26T12:25:14.284Z",
    "size": 212,
    "path": "../public/_nuxt/index.17614f3c.css"
  },
  "/_nuxt/index.b08c0211.js": {
    "type": "application/javascript",
    "etag": "\"1cb7a-dlv6I0/MROEZaKaWZ2v2v/RtHfM\"",
    "mtime": "2024-12-26T12:25:14.287Z",
    "size": 117626,
    "path": "../public/_nuxt/index.b08c0211.js"
  },
  "/_nuxt/Inter-Regular.413a527c.woff2": {
    "type": "font/woff2",
    "etag": "\"18618-74aLd/Gf45DZOHQL8K+DSWfijk4\"",
    "mtime": "2024-12-26T12:25:14.284Z",
    "size": 99864,
    "path": "../public/_nuxt/Inter-Regular.413a527c.woff2"
  },
  "/_nuxt/Inter-SemiBold.07d60945.woff2": {
    "type": "font/woff2",
    "etag": "\"19eb8-1Tn5cXHI4tGJ8Hohaw0U1UaKrGE\"",
    "mtime": "2024-12-26T12:25:14.281Z",
    "size": 106168,
    "path": "../public/_nuxt/Inter-SemiBold.07d60945.woff2"
  },
  "/_nuxt/nuxt-link.bf497cbc.js": {
    "type": "application/javascript",
    "etag": "\"10db-6BP339JxMoWPXRT4tDgo92bQZSQ\"",
    "mtime": "2024-12-26T12:25:14.288Z",
    "size": 4315,
    "path": "../public/_nuxt/nuxt-link.bf497cbc.js"
  },
  "/_nuxt/useBreakpoints.fe6d9ac9.js": {
    "type": "application/javascript",
    "etag": "\"978-Bsg2JUE8wvr4bAQhfY3IJMMFxJ4\"",
    "mtime": "2024-12-26T12:25:14.284Z",
    "size": 2424,
    "path": "../public/_nuxt/useBreakpoints.fe6d9ac9.js"
  },
  "/_nuxt/_id_.d612864c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"48b-VjXP5EYDsYayQa5rewxu0w8YUWw\"",
    "mtime": "2024-12-26T12:25:14.285Z",
    "size": 1163,
    "path": "../public/_nuxt/_id_.d612864c.css"
  },
  "/_nuxt/_id_.d6768bff.js": {
    "type": "application/javascript",
    "etag": "\"10bd-HXY/XyPygPDJ0TBPSMu52o346ww\"",
    "mtime": "2024-12-26T12:25:14.285Z",
    "size": 4285,
    "path": "../public/_nuxt/_id_.d6768bff.js"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.node.req.method && !METHODS.has(event.node.req.method)) {
    return;
  }
  let id = decodeURIComponent(
    withLeadingSlash(
      withoutTrailingSlash(parseURL(event.node.req.url).pathname)
    )
  );
  let asset;
  const encodingHeader = String(
    event.node.req.headers["accept-encoding"] || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.node.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.node.res.removeHeader("cache-control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.node.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  const ifModifiedSinceH = event.node.req.headers["if-modified-since"];
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  if (asset.type && !event.node.res.getHeader("Content-Type")) {
    event.node.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.node.res.getHeader("ETag")) {
    event.node.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.node.res.getHeader("Last-Modified")) {
    event.node.res.setHeader("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.node.res.getHeader("Content-Encoding")) {
    event.node.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.node.res.getHeader("Content-Length")) {
    event.node.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_k6OTPQ = () => import('../handlers/renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_k6OTPQ, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_k6OTPQ, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || {};
      const envContext = event.node.req.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: $fetch });
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on(
    "unhandledRejection",
    (err) => console.error("[nitro] [dev] [unhandledRejection] " + err)
  );
  process.on(
    "uncaughtException",
    (err) => console.error("[nitro] [dev] [uncaughtException] " + err)
  );
}
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
