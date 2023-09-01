import { GeneralObject } from '@xlou/webtools';

interface AjaxOptions {
    (args: AjaxArguments): Promise<AjaxRequest>;
    getUrlParam?: (url: string, data: GeneralObject | string) => string;
    getHeaders?: (arg: string | null) => GeneralObject;
    ContentType?: ContentType;
}
interface AjaxArguments {
    method?: string;
    headers?: GeneralObject;
    url: string;
    params?: GeneralObject;
    data?: any;
    responseType?: ResType;
    withCredentials?: boolean;
    timeout?: number;
    uploadProgress?: (ev: Event) => any;
    downloadProgress?: (ev: Event) => any;
}
interface AjaxRequest {
    config: AjaxArguments;
    response: any;
    headers: GeneralObject;
    request: XMLHttpRequest;
    status: number;
    statusText: string;
}
declare enum ResType {
    DF = "",
    AB = "arraybuffer",
    Blob = "blob",
    DOC = "document",
    JSON = "json",
    TXT = "text"
}
declare enum ContentType {
    json = "application/json;charset=UTF-8",
    urlencoded = "application/x-www-form-urlencoded;charset=UTF-8",
    formData = "multipart/form-data",
    text = "text/plain;charset=UTF-8",
    xml = "application/xml;charset=UTF-8",
    stream = "application/octet-stream"
}
declare function getUrlParam(url: string, data: GeneralObject | string): string;
declare function getHeaders(arg: string | null): GeneralObject;
declare const ajax: AjaxOptions;

export { AjaxArguments, AjaxOptions, AjaxRequest, ContentType, ajax as default, getHeaders, getUrlParam };
