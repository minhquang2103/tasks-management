import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es/cloneDeep';
import { DateTime } from 'luxon';
@Injectable({
  providedIn: 'root'
})
export class FormatRequestService {
  readonly REQUEST_METHOD: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

  constructor() {

  }

  /**
   * 
   * @param method HTTP Methods
   * @param value Value to format
   * Why?
   * We could use an interceptor to format the http request, but with the GET method, it's already parsed to string by JSON.
   * So begin of any project we should tell people to use this function before making any http call
   * Anyone has improvement for the interceptor please mailme through: minhquang210397@gmail.com or sumit a changes. Thanks
   */
  formatRequest<T>(method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH", value: any): T {
    if (method === "GET") this.formatGETParams(value);
    else this.toISO(value)
    return value
  }

  private formatGETParams(params: any): any {
    return this.toISO(params)
  }

  private toISO(body: any): any {
    if (body === null || body === undefined) {
      return body;
    }
    if (typeof body !== 'object') {
      return body;
    }
    for (const key of Object.keys(body)) {
      const value = body[key];

      if (value instanceof Date) {
        body[key] = DateTime.fromJSDate(value).toISO();
      } else if (typeof value === 'object') {
        this.toISO(value);
      }
    }
    return body
  }
}
