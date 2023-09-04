(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ajax = factory());
})(this, (function () { 'use strict';

    function i(e,t=!1){let r=[];for(let t in e)null!==e[t]&&void 0!==e[t]||(e[t]=""),r.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));let n=r.join("&");return n&&t?"?"+n:n}

    var ResType;
    (function (ResType) {
        ResType["DF"] = "";
        ResType["AB"] = "arraybuffer";
        ResType["Blob"] = "blob";
        ResType["DOC"] = "document";
        ResType["JSON"] = "json";
        ResType["TXT"] = "text";
    })(ResType || (ResType = {}));
    var ContentType;
    (function (ContentType) {
        ContentType["json"] = "application/json;charset=UTF-8";
        ContentType["urlencoded"] = "application/x-www-form-urlencoded;charset=UTF-8";
        ContentType["formData"] = "multipart/form-data";
        ContentType["text"] = "text/plain;charset=UTF-8";
        ContentType["xml"] = "application/xml;charset=UTF-8";
        ContentType["stream"] = "application/octet-stream";
    })(ContentType || (ContentType = {}));
    const bodySet = new Set([
        '[object String]',
        '[object FormData]',
        '[object Blob]',
        '[object ArrayBuffer]',
        '[object URLSearchParams]',
        '[object Null]',
        '[object Undefined]'
    ]);
    /* 将对象转换为可拼接在 URL 后的参数 */
    function getUrlParam(url, data) {
        if (!data) {
            return "";
        }
        let paramsString = typeof data === "string" ? data : i(data);
        if (!paramsString)
            return "";
        return url.indexOf('?') !== -1 ? ('&' + paramsString) : ('?' + paramsString);
    }
    /* 转换 POST 请求的 body 参数 */
    function convertData(data, type, xhr) {
        if (bodySet.has(Object.prototype.toString.call(data))) {
            return data;
        }
        if (type) {
            if (type.includes("application/json")) {
                data = JSON.stringify(data);
            }
            else if (type.includes("application/x-www-form-urlencoded")) {
                data = i(data);
            }
            else if (type.includes("multipart/form-data")) {
                const formData = new FormData();
                for (let i in data) {
                    formData.append(i, data[i]);
                }
                data = formData;
            }
        }
        else {
            xhr.setRequestHeader("Content-Type", ContentType.json);
            data = JSON.stringify(data);
        }
        return data;
    }
    /* 获取返回头参数 */
    function getHeaders(arg) {
        const headers = {};
        if (arg !== null) {
            const arr = arg.trim().split(/[\r\n]+/);
            for (const item of arr) {
                const parts = item.split(": ");
                headers[parts[0]] = parts[1];
            }
        }
        return headers;
    }
    /* 判断请求是否成功 */
    function getOk(status) {
        return status >= 200 && status <= 299;
    }
    const ajax = function (args) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            /* 监听请求成功返回结果 */
            xhr.addEventListener('load', ev => {
                console.log("load", ev, xhr);
                const headers = getHeaders(xhr.getAllResponseHeaders());
                const ajaxRequest = {
                    request: xhr,
                    config: args,
                    headers,
                    response: xhr.response,
                    status: xhr.status,
                    statusText: xhr.statusText
                };
                if (getOk(xhr.status)) {
                    resolve(ajaxRequest);
                }
                else {
                    reject(ajaxRequest);
                }
            });
            /* 监听请求发生错误 */
            xhr.addEventListener('error', ev => {
                console.log("error", ev, xhr);
                reject(ev);
            });
            /* 监听请求超时 */
            xhr.addEventListener('timeout', ev => {
                console.log("timeout", ev, xhr);
                reject(ev);
            });
            /* 添加上传进度的监听 */
            if (args.uploadProgress) {
                xhr.upload.addEventListener('loadstart', ev => {
                    args.uploadProgress(ev);
                });
                xhr.upload.addEventListener('progress', ev => {
                    args.uploadProgress(ev);
                });
                xhr.upload.addEventListener('load', ev => {
                    args.uploadProgress(ev);
                });
                xhr.upload.addEventListener('loadend', ev => {
                    args.uploadProgress(ev);
                });
                xhr.upload.addEventListener('error', ev => {
                    args.uploadProgress(ev);
                });
            }
            /* 添加下载监听 */
            if (args.downloadProgress) {
                xhr.addEventListener('loadstart', ev => {
                    args.downloadProgress(ev);
                });
                xhr.addEventListener('progress', ev => {
                    args.downloadProgress(ev);
                });
                xhr.addEventListener('loadend', ev => {
                    args.downloadProgress(ev);
                });
            }
            /* 处理请求参数 */
            let { method, url, params, data, headers, timeout, responseType, withCredentials } = args;
            /* 处理 method */
            method = method ? method.toUpperCase() : "GET";
            let simrequ = false;
            if (new Set(['GET', 'DELETE', 'HEAD', 'OPTIONS', 'TRACE']).has(method)) {
                simrequ = true;
            }
            /* 处理 url */
            if (params) {
                url += getUrlParam(url, params);
            }
            /* 开启请求 */
            xhr.open(method, url, true);
            console.log(xhr);
            /* 处理 withCredentials ，该参数控制请求是否支持携带 cookie */
            if (withCredentials !== undefined) {
                xhr.withCredentials = withCredentials;
            }
            /* 处理 responseType */
            xhr.responseType = responseType || ResType.JSON;
            /* 处理 headers ，并根据 Content-Type 处理 data 数据 */
            if (headers) {
                let type = "";
                for (const i in headers) {
                    let item = headers[i];
                    if (item === null || item === undefined) {
                        item = "";
                    }
                    else {
                        item = String(item);
                    }
                    xhr.setRequestHeader(i, item);
                    const key = i;
                    if (key.toLowerCase() === 'content-type') {
                        type = item;
                    }
                }
                data = simrequ ? null : convertData(data, type, xhr);
            }
            else {
                data = simrequ ? null : convertData(data, "", xhr);
            }
            /* 处理 timeout */
            xhr.timeout = timeout || 0;
            /* 发送请求 */
            // xhr.send()
        });
    };

    Object.assign(ajax, {
        getUrlParam,
        getHeaders,
        ContentType
    });

    return ajax;

}));
