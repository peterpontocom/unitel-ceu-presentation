globalThis.__nitro_main__ = import.meta.url;
import { PassThrough, Readable } from "node:stream";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __esmMin = (fn, res, err) => () => {
	if (err) throw err[0];
	try {
		return fn && (res = fn(fn = 0)), res;
	} catch (e) {
		throw err = [e], e;
	}
};
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/srvx/dist/_chunks/_url.mjs
function lazyInherit(target, source, sourceKey) {
	for (const key of [...Object.getOwnPropertyNames(source), ...Object.getOwnPropertySymbols(source)]) {
		if (key === "constructor") continue;
		const targetDesc = Object.getOwnPropertyDescriptor(target, key);
		const desc = Object.getOwnPropertyDescriptor(source, key);
		let modified = false;
		if (desc.get) {
			modified = true;
			desc.get = targetDesc?.get || function() {
				return this[sourceKey][key];
			};
		}
		if (desc.set) {
			modified = true;
			desc.set = targetDesc?.set || function(value) {
				this[sourceKey][key] = value;
			};
		}
		if (!targetDesc?.value && typeof desc.value === "function") {
			modified = true;
			desc.value = function(...args) {
				return this[sourceKey][key](...args);
			};
		}
		if (modified) Object.defineProperty(target, key, desc);
	}
}
var _needsNormRE, _searchNeedsNormRE, FastURL;
var init__url = __esmMin((() => {
	_needsNormRE = /(?:(?:^|\/)(?:\.|\.\.|%2e|%2e\.|\.%2e|%2e%2e)(?:\/|$))|[\\^#"<>{}`\x80-\uffff]/i;
	_searchNeedsNormRE = /[#"'<>]/;
	FastURL = /* @__PURE__ */ (() => {
		const NativeURL = globalThis.URL;
		const FastURL = class URL {
			#url;
			#href;
			#protocol;
			#host;
			#pathname;
			#search;
			#searchParams;
			#pos;
			constructor(url) {
				if (typeof url === "string") {
					const isOriginForm = url[0] === "/";
					if (isOriginForm && !_searchNeedsNormRE.test(url)) this.#href = url;
					else this.#url = new NativeURL(isOriginForm ? `http://localhost${url}` : url);
				} else if (_needsNormRE.test(url.pathname) || url.search && _searchNeedsNormRE.test(url.search)) this.#url = new NativeURL(`${url.protocol || "http:"}//${url.host || "localhost"}${url.pathname}${url.search || ""}`);
				else {
					this.#protocol = url.protocol;
					this.#host = url.host;
					this.#pathname = url.pathname;
					this.#search = url.search;
				}
			}
			static [Symbol.hasInstance](val) {
				return val instanceof NativeURL;
			}
			get _url() {
				if (this.#url) return this.#url;
				this.#url = new NativeURL(this.href);
				this.#href = void 0;
				this.#protocol = void 0;
				this.#host = void 0;
				this.#pathname = void 0;
				this.#search = void 0;
				this.#searchParams = void 0;
				this.#pos = void 0;
				return this.#url;
			}
			get href() {
				if (this.#url) return this.#url.href;
				if (!this.#href) this.#href = `${this.#protocol || "http:"}//${this.#host || "localhost"}${this.#pathname || "/"}${this.#search || ""}`;
				return this.#href;
			}
			#getPos() {
				if (!this.#pos) {
					const url = this.href;
					const protoIndex = url.indexOf("://");
					const pathnameIndex = protoIndex === -1 ? -1 : url.indexOf("/", protoIndex + 4);
					const qIndex = pathnameIndex === -1 ? -1 : url.indexOf("?", pathnameIndex);
					this.#pos = [
						protoIndex,
						pathnameIndex,
						qIndex
					];
				}
				return this.#pos;
			}
			get pathname() {
				if (this.#url) return this.#url.pathname;
				if (this.#pathname === void 0) {
					const [, pathnameIndex, queryIndex] = this.#getPos();
					if (pathnameIndex === -1) return this._url.pathname;
					this.#pathname = this.href.slice(pathnameIndex, queryIndex === -1 ? void 0 : queryIndex);
				}
				return this.#pathname;
			}
			get search() {
				if (this.#url) return this.#url.search;
				if (this.#search === void 0) {
					const [, pathnameIndex, queryIndex] = this.#getPos();
					if (pathnameIndex === -1) return this._url.search;
					const url = this.href;
					this.#search = queryIndex === -1 || queryIndex === url.length - 1 ? "" : url.slice(queryIndex);
				}
				return this.#search;
			}
			get searchParams() {
				if (this.#url) return this.#url.searchParams;
				if (!this.#searchParams) this.#searchParams = new URLSearchParams(this.search);
				return this.#searchParams;
			}
			get protocol() {
				if (this.#url) return this.#url.protocol;
				if (this.#protocol === void 0) {
					const [protocolIndex] = this.#getPos();
					if (protocolIndex === -1) return this._url.protocol;
					const url = this.href;
					this.#protocol = url.slice(0, protocolIndex + 1);
				}
				return this.#protocol;
			}
			toString() {
				return this.href;
			}
			toJSON() {
				return this.href;
			}
		};
		lazyInherit(FastURL.prototype, NativeURL.prototype, "_url");
		Object.setPrototypeOf(FastURL.prototype, NativeURL.prototype);
		Object.setPrototypeOf(FastURL, NativeURL);
		return FastURL;
	})();
}));
//#endregion
//#region node_modules/srvx/dist/adapters/node.mjs
var NodeResponse;
var init_node$1 = __esmMin((() => {
	init__url();
	NodeResponse = /* @__PURE__ */ (() => {
		const NativeResponse = globalThis.Response;
		const STATUS_CODES = globalThis.process?.getBuiltinModule?.("node:http")?.STATUS_CODES || {};
		class NodeResponse {
			#body;
			#init;
			#headers;
			#response;
			constructor(body, init) {
				this.#body = body;
				this.#init = init;
			}
			static [Symbol.hasInstance](val) {
				return val instanceof NativeResponse;
			}
			get status() {
				return this.#response?.status || this.#init?.status || 200;
			}
			get statusText() {
				return this.#response?.statusText || this.#init?.statusText || STATUS_CODES[this.status] || "";
			}
			get headers() {
				if (this.#response) return this.#response.headers;
				if (this.#headers) return this.#headers;
				const initHeaders = this.#init?.headers;
				return this.#headers = initHeaders instanceof Headers ? initHeaders : new Headers(initHeaders);
			}
			get ok() {
				if (this.#response) return this.#response.ok;
				const status = this.status;
				return status >= 200 && status < 300;
			}
			get _response() {
				if (this.#response) return this.#response;
				let body = this.#body;
				if (body && typeof body.pipe === "function" && !(body instanceof Readable)) {
					const stream = new PassThrough();
					body.pipe(stream);
					const abort = body.abort;
					if (abort) stream.once("close", () => abort());
					body = stream;
				}
				this.#response = new NativeResponse(body, this.#headers ? {
					...this.#init,
					headers: this.#headers
				} : this.#init);
				this.#init = void 0;
				this.#headers = void 0;
				this.#body = void 0;
				return this.#response;
			}
			_toNodeResponse() {
				const status = this.status;
				const statusText = this.statusText;
				let body;
				let contentType;
				let contentLength;
				if (this.#response) body = this.#response.body;
				else if (this.#body) if (this.#body instanceof ReadableStream) body = this.#body;
				else if (typeof this.#body === "string") {
					body = this.#body;
					contentType = "text/plain; charset=UTF-8";
					contentLength = Buffer.byteLength(this.#body);
				} else if (this.#body instanceof ArrayBuffer) {
					body = Buffer.from(this.#body);
					contentLength = this.#body.byteLength;
				} else if (this.#body instanceof Uint8Array) {
					body = this.#body;
					contentLength = this.#body.byteLength;
				} else if (this.#body instanceof DataView) {
					body = Buffer.from(this.#body.buffer);
					contentLength = this.#body.byteLength;
				} else if (this.#body instanceof Blob) {
					body = this.#body.stream();
					contentType = this.#body.type;
					contentLength = this.#body.size;
				} else if (typeof this.#body.pipe === "function") body = this.#body;
				else body = this._response.body;
				const headers = [];
				const initHeaders = this.#init?.headers;
				const headerEntries = this.#response?.headers || this.#headers || (initHeaders ? Array.isArray(initHeaders) ? initHeaders : initHeaders?.entries ? initHeaders.entries() : Object.entries(initHeaders) : void 0);
				let hasContentTypeHeader;
				let hasContentLength;
				if (headerEntries) for (const [key, value] of headerEntries) {
					const lowerKey = typeof key === "string" ? key.toLowerCase() : String(key);
					if (Array.isArray(value)) for (const v of value) headers.push(lowerKey, v);
					else headers.push(lowerKey, value);
					if (lowerKey === "content-type") hasContentTypeHeader = true;
					else if (lowerKey === "content-length") hasContentLength = true;
				}
				if (contentType && !hasContentTypeHeader) headers.push("content-type", contentType);
				if (contentLength && !hasContentLength) headers.push("content-length", String(contentLength));
				this.#init = void 0;
				this.#headers = void 0;
				this.#response = void 0;
				this.#body = void 0;
				return {
					status,
					statusText,
					headers,
					body
				};
			}
		}
		lazyInherit(NodeResponse.prototype, NativeResponse.prototype, "_response");
		Object.setPrototypeOf(NodeResponse, NativeResponse);
		Object.setPrototypeOf(NodeResponse.prototype, NativeResponse.prototype);
		return NodeResponse;
	})();
}));
//#endregion
//#region node_modules/rou3/dist/index.mjs
var NullProtoObj;
var init_dist = __esmMin((() => {
	NullProtoObj = /* @__PURE__ */ (() => {
		const e = function() {};
		return e.prototype = Object.create(null), Object.freeze(e.prototype), e;
	})();
}));
//#endregion
//#region node_modules/h3/dist/h3.mjs
function decodePathname(pathname) {
	return decodeURI(pathname.includes("%25") ? pathname.replace(/%25/g, "%2525") : pathname);
}
function sanitizeStatusMessage(statusMessage = "") {
	return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
	if (!statusCode) return defaultStatusCode;
	if (typeof statusCode === "string") statusCode = +statusCode;
	if (statusCode < 100 || statusCode > 599) return defaultStatusCode;
	return statusCode;
}
function isJSONSerializable(value, _type) {
	if (value === null || value === void 0) return true;
	if (_type !== "object") return _type === "boolean" || _type === "number" || _type === "string";
	if (typeof value.toJSON === "function") return true;
	if (Array.isArray(value)) return true;
	if (typeof value.pipe === "function" || typeof value.pipeTo === "function") return false;
	if (value instanceof NullProtoObj) return true;
	const proto = Object.getPrototypeOf(value);
	return proto === Object.prototype || proto === null;
}
function toResponse(val, event, config = {}) {
	if (typeof val?.then === "function") return val.then((resolvedVal) => toResponse(resolvedVal, event, config), (r) => toResponse(typeof r === "number" ? new HTTPError({ status: r }) : r, event, config));
	const response = prepareResponse(val, event, config);
	if (typeof response?.then === "function") return toResponse(response, event, config);
	const { onResponse } = config;
	return onResponse ? Promise.resolve(onResponse(response, event)).then(() => response) : response;
}
function prepareResponse(val, event, config, nested) {
	if (val === kHandled) return new NodeResponse(null);
	if (val === kNotFound) val = new HTTPError({
		status: 404,
		message: `Cannot find any route matching [${event.req.method}] ${event.url}`
	});
	if (val && val instanceof Error) {
		const isHTTPError = HTTPError.isError(val);
		const error = isHTTPError ? val : new HTTPError(val);
		if (!isHTTPError) {
			error.unhandled = true;
			if (val?.stack) error.stack = val.stack;
		}
		if (error.unhandled && !config.silent) console.error(error);
		const { onError } = config;
		const errHeaders = event[kEventRes]?.[kEventResErrHeaders];
		return onError && !nested ? Promise.resolve(onError(error, event)).catch((error) => error).then((newVal) => prepareResponse(newVal ?? val, event, config, true)) : errorResponse(error, config.debug, errHeaders);
	}
	const preparedRes = event[kEventRes];
	const preparedHeaders = preparedRes?.[kEventResHeaders];
	event[kEventRes] = void 0;
	if (!(val instanceof Response)) {
		const res = prepareResponseBody(val, event, config);
		const status = res.status || preparedRes?.status;
		return new NodeResponse(nullBody(event.req.method, status) ? null : res.body, {
			status,
			statusText: res.statusText || preparedRes?.statusText,
			headers: res.headers && preparedHeaders ? mergeHeaders$1(res.headers, preparedHeaders) : res.headers || preparedHeaders
		});
	}
	if (!preparedHeaders || nested || !val.ok) return val;
	try {
		mergeHeaders$1(val.headers, preparedHeaders, val.headers);
		return val;
	} catch {
		return new NodeResponse(nullBody(event.req.method, val.status) ? null : val.body, {
			status: val.status,
			statusText: val.statusText,
			headers: mergeHeaders$1(val.headers, preparedHeaders)
		});
	}
}
function mergeHeaders$1(base, overrides, target = new Headers(base)) {
	for (const [name, value] of overrides) if (name === "set-cookie") target.append(name, value);
	else target.set(name, value);
	return target;
}
function prepareResponseBody(val, event, config) {
	if (val === null || val === void 0) return {
		body: "",
		headers: emptyHeaders
	};
	const valType = typeof val;
	if (valType === "string") return { body: val };
	if (val instanceof Uint8Array) {
		event.res.headers.set("content-length", val.byteLength.toString());
		return { body: val };
	}
	if (val instanceof HTTPResponse || val?.constructor?.name === "HTTPResponse") return val;
	if (isJSONSerializable(val, valType)) return {
		body: JSON.stringify(val, void 0, config.debug ? 2 : void 0),
		headers: jsonHeaders
	};
	if (valType === "bigint") return {
		body: val.toString(),
		headers: jsonHeaders
	};
	if (val instanceof Blob) {
		const headers = new Headers({
			"content-type": val.type,
			"content-length": val.size.toString()
		});
		let filename = val.name;
		if (filename) {
			filename = encodeURIComponent(filename);
			headers.set("content-disposition", `filename="${filename}"; filename*=UTF-8''${filename}`);
		}
		return {
			body: val.stream(),
			headers
		};
	}
	if (valType === "symbol") return { body: val.toString() };
	if (valType === "function") return { body: `${val.name}()` };
	return { body: val };
}
function nullBody(method, status) {
	return method === "HEAD" || status === 100 || status === 101 || status === 102 || status === 204 || status === 205 || status === 304;
}
function errorResponse(error, debug, errHeaders) {
	let headers = error.headers ? mergeHeaders$1(jsonHeaders, error.headers) : new Headers(jsonHeaders);
	if (errHeaders) headers = mergeHeaders$1(headers, errHeaders);
	return new NodeResponse(JSON.stringify({
		...error.toJSON(),
		stack: debug && error.stack ? error.stack.split("\n").map((l) => l.trim()) : void 0
	}, void 0, debug ? 2 : void 0), {
		status: error.status,
		statusText: error.statusText,
		headers
	});
}
function callMiddleware(event, middleware, handler, index = 0) {
	if (index === middleware.length) return handler(event);
	const fn = middleware[index];
	let nextCalled;
	let nextResult;
	const next = () => {
		if (nextCalled) return nextResult;
		nextCalled = true;
		nextResult = callMiddleware(event, middleware, handler, index + 1);
		return nextResult;
	};
	const ret = fn(event, next);
	return isUnhandledResponse(ret) ? next() : typeof ret?.then === "function" ? ret.then((resolved) => isUnhandledResponse(resolved) ? next() : resolved) : ret;
}
function isUnhandledResponse(val) {
	return val === void 0 || val === kNotFound;
}
function defineHandler(input) {
	if (typeof input === "function") return handlerWithFetch(input);
	const handler = input.handler || (input.fetch ? function _fetchHandler(event) {
		return input.fetch(event.req);
	} : NoHandler);
	return Object.assign(handlerWithFetch(input.middleware?.length ? function _handlerMiddleware(event) {
		return callMiddleware(event, input.middleware, handler);
	} : handler), input);
}
function handlerWithFetch(handler) {
	if ("fetch" in handler) return handler;
	return Object.assign(handler, { fetch: (req) => {
		if (typeof req === "string") req = new URL(req, "http://_");
		if (req instanceof URL) req = new Request(req);
		const event = new H3Event(req);
		try {
			return Promise.resolve(toResponse(handler(event), event));
		} catch (error) {
			return Promise.resolve(toResponse(error, event));
		}
	} });
}
function defineLazyEventHandler(loader) {
	let handler;
	let promise;
	return defineHandler(function lazyHandler(event) {
		return handler ? handler(event) : (promise ??= Promise.resolve(loader()).then(function resolveLazyHandler(r) {
			handler = toEventHandler(r) || toEventHandler(r.default);
			if (typeof handler !== "function") throw new TypeError("Invalid lazy handler", { cause: { resolved: r } });
			return handler;
		})).then((r) => r(event));
	});
}
function toEventHandler(handler) {
	if (typeof handler === "function") return handler;
	if (typeof handler?.handler === "function" && handler.constructor?.["~h3"]) return handler.handler;
	if (typeof handler?.fetch === "function") return function _fetchHandler(event) {
		return handler.fetch(event.req);
	};
}
var kEventNS, kEventRes, kEventResHeaders, kEventResErrHeaders, H3Event, H3EventResponse, DISALLOWED_STATUS_CHARS, HTTPError, kNotFound, kHandled, HTTPResponse, frozen, FrozenHeaders, emptyHeaders, jsonHeaders, NoHandler, H3Core;
var init_h3 = __esmMin((() => {
	init_dist();
	init_node$1();
	kEventNS = "h3.internal.event.";
	kEventRes = /* @__PURE__ */ Symbol.for(`${kEventNS}res`);
	kEventResHeaders = /* @__PURE__ */ Symbol.for(`${kEventNS}res.headers`);
	kEventResErrHeaders = /* @__PURE__ */ Symbol.for(`${kEventNS}res.err.headers`);
	H3Event = class {
		app;
		req;
		url;
		context;
		static __is_event__ = true;
		constructor(req, context, app) {
			this.context = context || req.context || new NullProtoObj();
			this.req = req;
			this.app = app;
			const _url = req._url;
			const url = _url && _url instanceof URL ? _url : new FastURL(req.url);
			if (url.pathname.includes("%")) url.pathname = decodePathname(url.pathname);
			this.url = url;
		}
		get res() {
			return this[kEventRes] ||= new H3EventResponse();
		}
		get runtime() {
			return this.req.runtime;
		}
		waitUntil(promise) {
			this.req.waitUntil?.(promise);
		}
		toString() {
			return `[${this.req.method}] ${this.req.url}`;
		}
		toJSON() {
			return this.toString();
		}
		get node() {
			return this.req.runtime?.node;
		}
		get headers() {
			return this.req.headers;
		}
		get path() {
			return this.url.pathname + this.url.search;
		}
		get method() {
			return this.req.method;
		}
	};
	H3EventResponse = class {
		status;
		statusText;
		get headers() {
			return this[kEventResHeaders] ||= new Headers();
		}
		get errHeaders() {
			return this[kEventResErrHeaders] ||= new Headers();
		}
	};
	DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
	HTTPError = class HTTPError extends Error {
		get name() {
			return "HTTPError";
		}
		status;
		statusText;
		headers;
		cause;
		data;
		body;
		unhandled;
		static isError(input) {
			return input instanceof Error && input?.name === "HTTPError";
		}
		static status(status, statusText, details) {
			return new HTTPError({
				...details,
				statusText,
				status
			});
		}
		constructor(arg1, arg2) {
			let messageInput;
			let details;
			if (typeof arg1 === "string") {
				messageInput = arg1;
				details = arg2;
			} else details = arg1;
			const status = sanitizeStatusCode(details?.status || details?.statusCode || (details?.cause)?.status || (details?.cause)?.statusCode, 500);
			const statusText = sanitizeStatusMessage(details?.statusText || details?.statusMessage || (details?.cause)?.statusText || (details?.cause)?.statusMessage);
			const message = messageInput || details?.message || (details?.cause)?.message || details?.statusText || details?.statusMessage || [
				"HTTPError",
				status,
				statusText
			].filter(Boolean).join(" ");
			super(message, { cause: details });
			this.cause = details;
			this.status = status;
			this.statusText = statusText || void 0;
			const rawHeaders = details?.headers || (details?.cause)?.headers;
			this.headers = rawHeaders ? new Headers(rawHeaders) : void 0;
			this.unhandled = details?.unhandled ?? (details?.cause)?.unhandled ?? void 0;
			this.data = details?.data;
			this.body = details?.body;
		}
		get statusCode() {
			return this.status;
		}
		get statusMessage() {
			return this.statusText;
		}
		toJSON() {
			const unhandled = this.unhandled;
			return {
				status: this.status,
				statusText: this.statusText,
				unhandled,
				message: unhandled ? "HTTPError" : this.message,
				data: unhandled ? void 0 : this.data,
				...unhandled ? void 0 : this.body
			};
		}
	};
	kNotFound = /* @__PURE__ */ Symbol.for("h3.notFound");
	kHandled = /* @__PURE__ */ Symbol.for("h3.handled");
	HTTPResponse = class {
		#headers;
		#init;
		body;
		constructor(body, init) {
			this.body = body;
			this.#init = init;
		}
		get status() {
			return this.#init?.status || 200;
		}
		get statusText() {
			return this.#init?.statusText || "OK";
		}
		get headers() {
			return this.#headers ||= new Headers(this.#init?.headers);
		}
	};
	frozen = (name) => (...args) => {
		throw new Error(`Headers are frozen (${name} ${args.join(", ")})`);
	};
	FrozenHeaders = class extends Headers {
		set = frozen("set");
		append = frozen("append");
		delete = frozen("delete");
	};
	emptyHeaders = /* @__PURE__ */ new FrozenHeaders({ "content-length": "0" });
	jsonHeaders = /* @__PURE__ */ new FrozenHeaders({ "content-type": "application/json;charset=UTF-8" });
	NoHandler = () => kNotFound;
	H3Core = class {
		static "~h3" = true;
		config;
		"~middleware";
		"~routes" = [];
		constructor(config = {}) {
			this["~middleware"] = [];
			this.config = config;
			this.fetch = this.fetch.bind(this);
			this.handler = this.handler.bind(this);
		}
		fetch(request) {
			return this["~request"](request);
		}
		handler(event) {
			const route = this["~findRoute"](event);
			if (route) {
				event.context.params = route.params;
				event.context.matchedRoute = route.data;
			}
			const routeHandler = route?.data.handler || NoHandler;
			const middleware = this["~getMiddleware"](event, route);
			return middleware.length > 0 ? callMiddleware(event, middleware, routeHandler) : routeHandler(event);
		}
		"~request"(request, context) {
			const event = new H3Event(request, context, this);
			let handlerRes;
			try {
				if (this.config.onRequest) {
					const hookRes = this.config.onRequest(event);
					handlerRes = typeof hookRes?.then === "function" ? hookRes.then(() => this.handler(event)) : this.handler(event);
				} else handlerRes = this.handler(event);
			} catch (error) {
				handlerRes = Promise.reject(error);
			}
			return toResponse(handlerRes, event, this.config);
		}
		"~findRoute"(_event) {}
		"~addRoute"(_route) {
			this["~routes"].push(_route);
		}
		"~getMiddleware"(_event, route) {
			const routeMiddleware = route?.data.middleware;
			const globalMiddleware = this["~middleware"];
			return routeMiddleware ? [...globalMiddleware, ...routeMiddleware] : globalMiddleware;
		}
	};
}));
//#endregion
//#region node_modules/h3/dist/_entries/node.mjs
var init_node = __esmMin((() => {
	init_h3();
}));
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region scripts/install-page.html?raw
var install_page_default = "<!DOCTYPE html>\n<html lang=\"en\" class=\"device-desktop\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta\n      name=\"viewport\"\n      content=\"width=device-width, initial-scale=1, viewport-fit=cover\"\n    />\n    <meta name=\"color-scheme\" content=\"dark\" />\n    <meta name=\"theme-color\" content=\"#000000\" />\n    <meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\" />\n    <meta name=\"apple-mobile-web-app-title\" content=\"{{APP_NAME}}\" />\n    <title>Add {{APP_NAME}} to your Home Screen</title>\n    <link rel=\"manifest\" href=\"/__grok/manifest.webmanifest\" />\n    <link rel=\"apple-touch-icon\" href=\"/__grok/icon-180.png\" />\n    <link rel=\"stylesheet\" href=\"/__grok/install/styles.css\" />\n    <script>\n      (function () {\n        var ua = navigator.userAgent || \"\";\n        var touch = navigator.maxTouchPoints || 0;\n        var isiPad = /iPad/.test(ua) || (/Macintosh/.test(ua) && touch > 1);\n        var isiPhone = /iPhone|iPod/.test(ua);\n        var isIOS = isiPhone || isiPad;\n        var isAndroid = /Android/i.test(ua);\n        var isAndroidPhone = isAndroid && /Mobile/i.test(ua);\n        var isAndroidTablet = isAndroid && !/Mobile/i.test(ua);\n        var minSide = Math.min(screen.width || 0, screen.height || 0);\n        var maxSide = Math.max(screen.width || 0, screen.height || 0);\n\n        var type = \"desktop\";\n        if (isiPhone) type = \"phone\";\n        else if (isiPad || isAndroidTablet) type = \"tablet\";\n        else if (isAndroidPhone) type = \"phone\";\n        else if (touch > 0 && minSide > 0 && minSide <= 500) type = \"phone\";\n        else if (touch > 0 && minSide > 500 && maxSide <= 1400) type = \"tablet\";\n\n        var iosMajor = null;\n        var osToken = null;\n        var safariToken = null;\n        var iphoneOs = ua.match(/iPhone OS (\\d+)[._]/);\n        var ipadOs = ua.match(/CPU OS (\\d+)[._](\\d+) like Mac OS X/);\n        var safariVer = ua.match(/Version\\/(\\d+)[._]/);\n        if (iphoneOs) osToken = parseInt(iphoneOs[1], 10);\n        else if (ipadOs) osToken = parseInt(ipadOs[1], 10);\n        if (isIOS && safariVer) safariToken = parseInt(safariVer[1], 10);\n        if (osToken != null || safariToken != null) {\n          iosMajor = Math.max(osToken || 0, safariToken || 0);\n        }\n\n        var root = document.documentElement;\n        var classes = [\"device-\" + type];\n        if (iosMajor != null) {\n          root.dataset.ios = String(iosMajor);\n          classes.push(iosMajor >= 27 ? \"ios-27-plus\" : \"ios-below-27\");\n        }\n        root.className = classes.join(\" \");\n      })();\n    <\/script>\n  </head>\n  <body>\n    <div class=\"page\">\n      <header class=\"powered\" aria-label=\"Powered by Grok\">\n        <span class=\"powered-by\">Powered by</span>\n        <span class=\"powered-brand\">\n          <img\n            class=\"grok-logo\"\n            src=\"/__grok/install/assets/homescreen/logo-grok.svg\"\n            width=\"14\"\n            height=\"14\"\n            alt=\"\"\n          />\n          <span class=\"powered-grok\">Grok</span>\n        </span>\n      </header>\n\n      <main class=\"content\">\n        <div class=\"ob\" aria-hidden=\"true\">\n          <img\n            class=\"ob-img ob-phone\"\n            src=\"/__grok/install/assets/homescreen/ob-phone.png\"\n            width=\"338\"\n            height=\"294\"\n            alt=\"\"\n          />\n          <img\n            class=\"ob-img ob-ipad\"\n            src=\"/__grok/install/assets/homescreen/ob-ipad.png\"\n            width=\"634\"\n            height=\"294\"\n            alt=\"\"\n          />\n        </div>\n\n        <section class=\"copy\">\n          <h1>Add {{APP_NAME}} to your&nbsp;Home&nbsp;Screen</h1>\n\n          <div class=\"steps\">\n            <p class=\"step step-tap step-ios27\">\n              <span class=\"muted\">Tap</span>\n              <span class=\"glass glass--icon\" aria-hidden=\"true\">\n                <img src=\"/__grok/install/assets/homescreen/glass-puzzle.svg\" width=\"24\" height=\"24\" alt=\"\" />\n              </span>\n              <span class=\"muted loc loc-phone\">in the bottom bar, then</span>\n              <span class=\"muted loc loc-ipad\">in the tool bar, then</span>\n              <span class=\"glass glass--icon\" aria-hidden=\"true\">\n                <img src=\"/__grok/install/assets/homescreen/glass-share.svg\" width=\"24\" height=\"24\" alt=\"\" />\n              </span>\n            </p>\n\n            <p class=\"step step-tap step-ios-legacy\">\n              <span class=\"muted\">Tap</span>\n              <span class=\"glass glass--icon\" aria-hidden=\"true\">\n                <img src=\"/__grok/install/assets/homescreen/glass-share.svg\" width=\"24\" height=\"24\" alt=\"\" />\n              </span>\n              <span class=\"muted loc loc-phone\">in the bottom bar</span>\n              <span class=\"muted loc loc-ipad\">in the tool bar</span>\n            </p>\n\n            <p class=\"step step-select\">\n              <span class=\"muted\">Select</span>\n              <span class=\"add-label\">\n                <img\n                  class=\"plus-icon\"\n                  src=\"/__grok/install/assets/homescreen/plus.svg\"\n                  width=\"16\"\n                  height=\"16\"\n                  alt=\"\"\n                />\n                <span class=\"add-text\">Add to Home Screen</span>\n              </span>\n            </p>\n          </div>\n        </section>\n      </main>\n\n      <main class=\"content content-desktop\">\n        <section class=\"copy\">\n          <h1>Open this link on your iPhone&nbsp;or&nbsp;iPad</h1>\n          <p class=\"desktop-note\">\n            This page shows how to add {{APP_NAME}} to an iOS Home Screen.\n          </p>\n          <a class=\"desktop-open\" href=\"{{APP_URL}}\">Open {{APP_NAME}}</a>\n        </section>\n      </main>\n    </div>\n  </body>\n</html>\n";
//#endregion
//#region \0virtual:grok-og-identity
var grokOgIdentity = { "site": {
	"title": "UNITEL × CEU",
	"card": "custom",
	"color": "2155FF",
	"image": "/og.jpg"
} };
//#endregion
//#region scripts/grok-pwa-shared.mjs
/**
* Single source of truth for platform head chrome (PWA, extensions.js, OG),
* shared by the Vite plugin and Nitro middleware. Plain ESM so `node --test`
* and the Nitro bundler can both consume it.
*/
var DEFAULT_APP_NAME = "Grok App";
var OG_SITE_REL_PATH = "src/lib/og/site.json";
var SHARE_META_KEYS = /* @__PURE__ */ new Set([
	"og:title",
	"og:description",
	"og:image",
	"og:image:width",
	"og:image:height",
	"og:type",
	"og:url",
	"og:site_name",
	"twitter:card",
	"twitter:title",
	"twitter:image",
	"twitter:description",
	"x:game:image",
	"x:game:image:width",
	"x:game:image:height"
]);
function escapeHtml(value) {
	return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#39;");
}
/** Inverse of escapeHtml. Decode &amp; last so a single pass undoes one encode. */
function unescapeHtml(value) {
	return String(value).replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", "\"").replaceAll("&#39;", "'").replaceAll("&amp;", "&");
}
/** 6-digit hex for the og.grok.me placeholder, or "" if site.color is missing/invalid. */
function placeholderCardColor(site = {}) {
	const raw = String(site.color ?? "").trim();
	const hex = raw.startsWith("#") ? raw.slice(1) : raw;
	return /^[0-9a-fA-F]{6}$/.test(hex) ? hex : "";
}
/**
* "wild-race.grok.me" → "Wild Race". Only published app hosts encode the
* display name in the first label. Preview / guest hosts are image origins
* only — slugifying them produced internal names like "Hds Abc 3000 Xy".
*/
function appNameFromHost(hostHeader) {
	const host = String(hostHeader ?? "").split(",")[0].trim().split(":")[0].toLowerCase();
	if (!host.endsWith(".grok.me")) return DEFAULT_APP_NAME;
	const slug = host.split(".")[0] ?? "";
	if (!slug || slug === "www" || !/^[a-z0-9-]{1,63}$/.test(slug)) return DEFAULT_APP_NAME;
	return slug.split("-").filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ") || "Grok App";
}
/** True for Vercel system domains. Envoy rewrites origin Host to these; they SSO-protect `/og.jpg`. */
function isVercelSystemHost(host) {
	return host === "vercel.app" || host.endsWith(".vercel.app") || host === "vercel.com" || host.endsWith(".vercel.com");
}
/** Hostname suitable for absolute og:image URLs. Preview guests (X-Forwarded-Host) are allowed. */
function publicAppHost(hostHeader) {
	const host = String(hostHeader ?? "").split(",")[0].trim().split(":")[0].toLowerCase();
	if (!host || !/^[a-z0-9.-]+$/.test(host) || !host.includes(".")) return "";
	if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) return "";
	if (isVercelSystemHost(host)) return "";
	return host;
}
/**
* Published apps always use `VITE_PUBLIC_HOSTNAME` (the grok.me host the
* deployer injects). Live preview has no such env, so fall back to the
* request host / X-Forwarded-Host. Never prefer request Host on a published
* app — Envoy rewrites it to `*.vercel.app`.
*/
function resolvePublicHost(hostHeader) {
	return publicAppHost(process.env?.VITE_PUBLIC_HOSTNAME) || publicAppHost(hostHeader);
}
function isInstallQuery(url) {
	const query = String(url ?? "").split("?", 2)[1] ?? "";
	const params = new URLSearchParams(query);
	const install = params.get("install");
	const platform = (params.get("platform") ?? "").toLowerCase();
	return (install === "1" || install === "true") && platform === "ios";
}
/** Paths that can carry an app document (vs assets / API / internals). */
function isDocumentPath(pathname) {
	const path = String(pathname ?? "");
	return !path.startsWith("/__grok/") && !path.startsWith("/api/") && !path.startsWith("/@") && !path.startsWith("/node_modules") && !/\.[a-z0-9]+$/i.test(path);
}
function acceptsHtml(accept) {
	const value = String(accept ?? "");
	return value === "" || value.includes("text/html") || value.includes("*/*");
}
/** The same URL without the install-tutorial params (used as the app link). */
function stripInstallParams(url) {
	const [path = "/", query = ""] = String(url ?? "/").split("?", 2);
	const params = new URLSearchParams(query);
	params.delete("install");
	params.delete("platform");
	const rest = params.toString();
	return rest ? `${path}?${rest}` : path;
}
function renderInstallPageHtml(template, { host, url } = {}) {
	return String(template).replaceAll("{{APP_NAME}}", escapeHtml(appNameFromHost(host))).replaceAll("{{APP_URL}}", escapeHtml(stripInstallParams(url)));
}
function renderWebManifest(hostHeader) {
	const name = appNameFromHost(hostHeader);
	return JSON.stringify({
		name,
		short_name: name,
		id: "/",
		start_url: "/",
		scope: "/",
		display: "standalone",
		background_color: "#000000",
		theme_color: "#000000",
		icons: [{
			src: "/__grok/icon-180.png",
			sizes: "180x180",
			type: "image/png"
		}]
	}, null, 2);
}
function grokPwaHeadTags(appName = DEFAULT_APP_NAME) {
	return [
		["manifest", "<link rel=\"manifest\" href=\"/__grok/manifest.webmanifest\">"],
		["apple-touch-icon", "<link rel=\"apple-touch-icon\" href=\"/__grok/icon-180.png\">"],
		["apple-mobile-web-app-title", `<meta name="apple-mobile-web-app-title" content="${escapeHtml(appName)}">`],
		["apple-mobile-web-app-status-bar-style", "<meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\">"],
		["theme-color", "<meta name=\"theme-color\" content=\"#000000\">"]
	];
}
var GROK_EXTENSIONS_SCRIPT_SRC = "https://grok.com/grok-app-builder/extensions.js";
function readGrokProjectId() {
	const fromProcess = typeof process !== "undefined" ? process.env?.VITE_PROJECT_ID : "";
	return String(fromProcess ?? "").trim();
}
function readXCreator() {
	const fromProcess = typeof process !== "undefined" ? process.env?.X_CREATOR : "";
	return String(fromProcess ?? "").trim();
}
function readXCreatorId() {
	const fromProcess = typeof process !== "undefined" ? process.env?.X_CREATOR_ID : "";
	return String(fromProcess ?? "").trim();
}
function grokXCreatorHeadTags(creator = readXCreator(), creatorId = readXCreatorId()) {
	const name = String(creator ?? "").trim();
	const id = String(creatorId ?? "").trim();
	if (!name || !id) return [];
	return [`<meta property="x:creator" content="${escapeHtml(name)}">`, `<meta property="x:creator:id" content="${escapeHtml(id)}">`];
}
/** Platform "Created with Grok" banner — injected into every HTML document. */
function grokExtensionsHeadTags(projectId = readGrokProjectId()) {
	const id = escapeHtml(projectId);
	const tags = [];
	if (projectId) tags.push(`<meta name="grok-project-id" content="${id}">`);
	tags.push(`<script src="${GROK_EXTENSIONS_SCRIPT_SRC}"${projectId ? ` data-project-id="${id}"` : ""} defer><\/script>`);
	return tags;
}
function readOgSite(cwd = process.cwd()) {
	try {
		const raw = readFileSync(join(cwd, OG_SITE_REL_PATH), "utf8");
		const parsed = JSON.parse(raw);
		return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
	} catch {
		return {};
	}
}
/** Public path of an on-disk share card, or "" if neither file exists. */
function ogCardPublicPath(cwd = process.cwd()) {
	if (existsSync(join(cwd, "public/og.jpg"))) return "/og.jpg";
	if (existsSync(join(cwd, "public/og.png"))) return "/og.png";
	return "";
}
function detectCustomOgCard(cwd = process.cwd(), site = {}) {
	if (ogCardPublicPath(cwd)) return true;
	return siteHasCustomCard(site) || Boolean(String(site.image ?? "").trim());
}
/** Snapshot for Vite/Nitro to bake into the server bundle (Vercel has no workspace FS). */
function snapshotOgIdentity(cwd = process.cwd()) {
	const site = { ...readOgSite(cwd) };
	const disk = ogCardPublicPath(cwd);
	if (disk) {
		site.card = "custom";
		site.image = disk;
	} else {
		if (siteHasCustomCard(site)) delete site.card;
		if (site.image) delete site.image;
	}
	if (existsSync(join(cwd, "public/x-banner.jpg"))) site.banner = site.banner || "/x-banner.jpg";
	return { site };
}
function ogServiceUrl() {
	return (String(process.env?.VITE_OG_SERVICE_URL ?? "").trim() || "https://og.grok.me").replace(/\/+$/, "");
}
function titleFromDocument(html) {
	const match = String(html ?? "").match(/<title\b[^>]*>([^<]*)<\/title>/i);
	return match ? unescapeHtml(match[1]).trim() : "";
}
function resolveOgTitle(site = {}, appName = DEFAULT_APP_NAME, host = "", documentTitle = "") {
	const fromSite = String(site.title ?? "").trim();
	if (fromSite) return fromSite;
	const fromDoc = String(documentTitle ?? "").trim();
	if (fromDoc) return fromDoc;
	const fromHost = appNameFromHost(host);
	if (fromHost && fromHost !== "Grok App") return fromHost;
	return String(appName ?? "").trim() || "Grok App";
}
function siteHasCustomCard(site = {}) {
	return String(site.card ?? "").toLowerCase() === "custom";
}
/**
* Preview: public/og.jpg|png on disk.
* Vercel: the bake (`card=custom` / `image`) because the function cannot stat public/.
* Otherwise empty — caller emits the og.grok.me placeholder.
*/
function resolveOgCardAsset(site = {}, cwd = process.cwd()) {
	return ogCardPublicPath(cwd) || (detectCustomOgCard(cwd, site) ? String(site.image ?? "").trim() || "/og.jpg" : "");
}
/** Stamp `card=custom` when public/og.jpg or public/og.png is on disk. */
function applyCustomCardFromFs(site, cwd) {
	const disk = ogCardPublicPath(cwd);
	if (!disk) return site;
	return {
		...site,
		card: "custom",
		image: disk
	};
}
function grokOgHeadTags({ host = "", appName = DEFAULT_APP_NAME, site = {}, documentTitle = "", cwd = process.cwd() } = {}) {
	const title = resolveOgTitle(site, appName, host, documentTitle);
	const publicHost = resolvePublicHost(host);
	const tags = [`<meta name="twitter:card" content="summary_large_image">`, `<meta property="og:title" content="${escapeHtml(title)}">`];
	const description = String(site.description ?? "").trim();
	if (description) tags.push(`<meta property="og:description" content="${escapeHtml(description)}">`);
	if (String(site.type ?? "").toLowerCase() === "x:game") tags.push(`<meta property="og:type" content="x:game">`);
	if (publicHost) {
		const asset = resolveOgCardAsset(site, cwd);
		const custom = Boolean(asset);
		let image = custom ? `https://${publicHost}${asset.startsWith("/") ? asset : `/${asset}`}` : `${ogServiceUrl()}/v1/card.png?host=${encodeURIComponent(publicHost)}&title=${encodeURIComponent(title)}`;
		const color = !custom ? placeholderCardColor(site) : "";
		if (color) image += `&color=${encodeURIComponent(color)}`;
		tags.push(`<meta property="og:image" content="${escapeHtml(image)}">`);
		tags.push(`<meta property="og:image:width" content="1200">`);
		tags.push(`<meta property="og:image:height" content="630">`);
		const banner = String(site.banner ?? "").trim();
		if (banner) {
			const bannerUrl = `https://${publicHost}${banner.startsWith("/") ? banner : `/${banner}`}`;
			tags.push(`<meta property="x:game:image" content="${escapeHtml(bannerUrl)}">`);
			tags.push(`<meta property="x:game:image:width" content="1200">`);
			tags.push(`<meta property="x:game:image:height" content="264">`);
		}
	}
	return tags;
}
function stripShareMetaTags(html) {
	return String(html).replace(/<meta\b[^>]*>/gi, (tag) => {
		const attrs = [...tag.matchAll(/\b(?:property|name)\s*=\s*["']([^"']+)["']/gi)];
		for (const match of attrs) if (SHARE_META_KEYS.has(String(match[1]).toLowerCase())) return "";
		return tag;
	});
}
function insertAfterHeadOpen(html, snippet) {
	if (/<head\b[^>]*>/i.test(html)) return html.replace(/<head\b[^>]*>/i, (open) => `${open}${snippet}`);
	if (/<html\b[^>]*>/i.test(html)) return html.replace(/<html\b[^>]*>/i, (open) => `${open}<head>${snippet}</head>`);
	return `<!doctype html><html><head>${snippet}</head>${html}`;
}
function insertBeforeHeadClose(html, snippet) {
	if (/<\/head>/i.test(html)) return html.replace(/<\/head>/i, `${snippet}</head>`);
	return insertAfterHeadOpen(html, snippet);
}
function normalizeHeadContext(ctx = {}) {
	const cwd = ctx.cwd ?? process.cwd();
	const site = applyCustomCardFromFs(ctx.site !== void 0 ? ctx.site : snapshotOgIdentity(cwd).site, cwd);
	return {
		appName: resolveOgTitle(site, ctx.appName ?? "Grok App", ctx.host ?? ""),
		projectId: ctx.projectId ?? readGrokProjectId(),
		creator: ctx.creator ?? readXCreator(),
		creatorId: ctx.creatorId ?? readXCreatorId(),
		host: ctx.host ?? "",
		cwd,
		site
	};
}
function injectGrokPwaHead(html, ctx = {}) {
	if (typeof html !== "string") return html;
	const { site, projectId, creator, creatorId, host, cwd } = normalizeHeadContext(ctx);
	const documentTitle = titleFromDocument(html);
	const appName = resolveOgTitle(site, ctx.appName ?? "Grok App", host, documentTitle);
	let next = stripShareMetaTags(html);
	const missing = grokPwaHeadTags(appName).filter(([key]) => {
		if (key === "manifest") return !next.includes("href=\"/__grok/manifest.webmanifest\"");
		if (key === "apple-touch-icon") return !next.includes("href=\"/__grok/icon-180.png\"");
		return !next.includes(`name="${key}"`);
	}).map(([, tag]) => tag);
	next = insertAfterHeadOpen(next, grokOgHeadTags({
		host,
		appName,
		site,
		documentTitle,
		cwd
	}).join(""));
	if (!next.includes("/grok-app-builder/extensions.js")) missing.push(...grokExtensionsHeadTags(projectId));
	else if (projectId && !next.includes("name=\"grok-project-id\"")) missing.push(`<meta name="grok-project-id" content="${escapeHtml(projectId)}">`);
	if (projectId && !next.includes("property=\"grok:app_id\"") && !next.includes("property='grok:app_id'")) missing.push(`<meta property="grok:app_id" content="${escapeHtml(projectId)}">`);
	const creatorTags = grokXCreatorHeadTags(creator, creatorId);
	if (creatorTags.length > 0) {
		if (!(next.includes("property=\"x:creator\" content=") || next.includes("property='x:creator' content="))) missing.push(creatorTags[0]);
		if (!next.includes("property=\"x:creator:id\"")) missing.push(creatorTags[1]);
	}
	if (missing.length === 0) return next;
	return insertBeforeHeadClose(next, missing.join(""));
}
function findHeadClose(buf) {
	return buf.toString("latin1").search(/<\/head>/i);
}
/**
* Streaming head injector: buffers only until `</head>` (ASCII marker; never
* appears inside a UTF-8 continuation byte), overwrites share-card metas,
* then passes later chunks through so streaming SSR keeps streaming.
*/
function createHeadInjector(ctx = {}) {
	const normalized = normalizeHeadContext(ctx);
	/** @type {Buffer[]} */
	let pending = [];
	let done = false;
	const apply = (html) => injectGrokPwaHead(html, {
		appName: normalized.appName,
		projectId: normalized.projectId,
		creator: normalized.creator,
		creatorId: normalized.creatorId,
		host: normalized.host,
		cwd: normalized.cwd,
		site: normalized.site
	});
	return {
		/** @param {Uint8Array | string} chunk @returns {Buffer[]} chunks ready to emit */
		push(chunk) {
			const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
			if (done) return [buf];
			pending.push(buf);
			const joined = Buffer.concat(pending);
			const at = findHeadClose(joined);
			if (at === -1) return [];
			done = true;
			pending = [];
			const closeLen = joined.toString("latin1", at).match(/^<\/head>/i)[0].length;
			const head = apply(joined.subarray(0, at + closeLen).toString("utf8"));
			return [Buffer.concat([Buffer.from(head, "utf8"), joined.subarray(at + closeLen)])];
		},
		/** @returns {Buffer[]} whatever is still buffered (no `</head>` seen) */
		flush() {
			if (done || pending.length === 0) return [];
			const rest = Buffer.concat(pending);
			pending = [];
			done = true;
			return [Buffer.from(apply(rest.toString("utf8")), "utf8")];
		}
	};
}
//#endregion
//#region server/middleware/grok-pwa.ts
/**
* Deployed-app (Nitro) half of the platform PWA chrome. Auto-registered as
* global h3 middleware because vite.config.ts sets `serverDir: "./server"` —
* without that option Nitro v3 never scans this directory.
*
* - `?install=1&platform=ios` on a document path → the Home Screen tutorial,
*   bundled into the server build via `?raw` (the public/ directory is CDN
*   static output on Vercel and not readable from the function).
* - `/__grok/manifest.webmanifest` → per-app-named manifest (kept out of
*   public/ so this dynamic response is the only one).
* - Other HTML documents → stream-inject PWA + OG head tags at `</head>`.
*   OG identity is baked via `virtual:grok-og-identity` at `vite build`
*   (this function cannot read `src/lib/og/site.json` or `public/og.jpg`).
*   This must be a middleware transforming `next()`: h3 discards the `response`
*   runtime hook's return value, and `render:html` does not exist in Nitro v3.
*/
function requestHost(event) {
	return event.req.headers.get("x-forwarded-host") ?? event.req.headers.get("host") ?? event.url.host;
}
function injectHeadStreaming(response, host) {
	const injector = createHeadInjector({
		host,
		site: grokOgIdentity.site
	});
	const transformed = response.body.pipeThrough(new TransformStream({
		transform(chunk, controller) {
			for (const out of injector.push(chunk)) controller.enqueue(out);
		},
		flush(controller) {
			for (const out of injector.flush()) controller.enqueue(out);
		}
	}));
	const headers = new Headers(response.headers);
	headers.delete("content-length");
	return new Response(transformed, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
}
async function grokPwaMiddleware(event, next) {
	if ((event.req.method ?? "GET").toUpperCase() !== "GET") return next();
	const path = event.url.pathname;
	const urlWithQuery = path + event.url.search;
	if (path === "/__grok/manifest.webmanifest" || path === "/__grok/manifest.json") return new Response(renderWebManifest(requestHost(event)), { headers: {
		"content-type": "application/manifest+json; charset=utf-8",
		"cache-control": "no-cache"
	} });
	if (isInstallQuery(urlWithQuery) && isDocumentPath(path) && acceptsHtml(event.req.headers.get("accept"))) {
		const html = renderInstallPageHtml(install_page_default, {
			host: requestHost(event),
			url: urlWithQuery
		});
		return new Response(html, { headers: {
			"content-type": "text/html; charset=utf-8",
			"cache-control": "no-cache"
		} });
	}
	if (!isDocumentPath(path)) return next();
	const result = await next();
	if (result instanceof Response && result.body && String(result.headers.get("content-type") ?? "").includes("text/html") && !result.headers.get("content-encoding")) return injectHeadStreaming(result, requestHost(event));
	return result;
}
//#endregion
//#region #nitro/virtual/renderer-template
var rendererTemplate;
var init_renderer_template$1 = __esmMin((() => {
	init_node();
	rendererTemplate = () => new HTTPResponse("<!doctype html>\n<html lang=\"pt\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <link rel=\"icon\" type=\"image/svg+xml\" href=\"/src/favicon.svg\" />\n    <title>UNITEL x CEU</title>\n  </head>\n  <body>\n    <div id=\"app\"></div>\n    <script type=\"module\" src=\"/src/main.tsx\"><\/script>\n  </body>\n</html>", { headers: { "content-type": "text/html; charset=utf-8" } });
}));
//#endregion
//#region node_modules/nitro/dist/runtime/internal/routes/renderer-template.mjs
var renderer_template_exports = /* @__PURE__ */ __exportAll({ default: () => renderIndexHTML });
function renderIndexHTML(event) {
	return rendererTemplate(event.req);
}
var init_renderer_template = __esmMin((() => {
	init_renderer_template$1();
}));
//#endregion
//#region #nitro/virtual/routing
init_node();
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_BBRGjI = defineLazyEventHandler(() => Promise.resolve().then(() => (init_renderer_template(), renderer_template_exports)));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_BBRGjI
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(grokPwaMiddleware)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
init_node();
init_node$1();
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
init_node();
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/vercel/runtime/isr.mjs
var ISR_URL_PARAM = "__isr_route";
function isrRouteRewrite(reqUrl, xNowRouteMatches) {
	if (xNowRouteMatches) {
		const isrURL = new URLSearchParams(xNowRouteMatches).get(ISR_URL_PARAM);
		if (isrURL) return [decodeURIComponent(isrURL), ""];
	} else {
		const queryIndex = reqUrl.indexOf("?");
		if (queryIndex !== -1) {
			const params = new URLSearchParams(reqUrl.slice(queryIndex + 1));
			const isrURL = params.get(ISR_URL_PARAM);
			if (isrURL) {
				params.delete(ISR_URL_PARAM);
				return [decodeURIComponent(isrURL), params.toString()];
			}
		}
	}
}
//#endregion
//#region node_modules/nitro/dist/presets/vercel/runtime/vercel.web.mjs
var nitroApp = useNitroApp();
var vercel_web_default = { async fetch(req, context) {
	const isrURL = isrRouteRewrite(req.url, req.headers.get("x-now-route-matches"));
	if (isrURL) {
		const { routeRules } = getRouteRules("", isrURL[0]);
		if (routeRules?.isr) req = new Request(new URL(isrURL[0] + (isrURL[1] ? `?${isrURL[1]}` : ""), req.url).href, req);
	}
	req.runtime ??= { name: "vercel" };
	req.runtime.vercel = { context };
	let ip;
	Object.defineProperty(req, "ip", { get() {
		const h = req.headers.get("x-forwarded-for");
		return ip ??= h?.split(",").shift()?.trim();
	} });
	req.waitUntil = context?.waitUntil;
	return nitroApp.fetch(req);
} };
//#endregion
export { vercel_web_default as default };
