const DEBUG = false;

export type ApiWorkerProps = {
  url: string;
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: any;
  extraHeaders?: any;
  abortController?: AbortController;
  onSuccess: (data: any) => void;
  onError: (data: any) => void;
  bearer?: string
};

/**
 * Handle request's
 * @param {ApiWorkerProps}
 */
export async function apiWorker({
  url,
  method,
  body,
  extraHeaders,
  abortController,
  onSuccess,
  onError,
  bearer
}: ApiWorkerProps) {
  try {
    let parsedUrl = url
    let isInternal = true;

    // if (url.startsWith('http')) {
    //   parsedUrl = url;
    // } else {
    //   isInternal = true;
    // }

    let requestInit: any = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (isInternal) {
      if (bearer && bearer?.length > 0) {
        requestInit.headers = {
          ...requestInit.headers,
          Authorization: 'Bearer ' + bearer
        };
      } else {
        requestInit.headers = {
          ...requestInit.headers,
        };
      }
    }

    // Body will not be setted if method is GET
    if (method !== 'GET') {
      if (typeof body == 'object') {
        requestInit['body'] = JSON.stringify(body);
      } else {
        requestInit['body'] = body;
      }
    }

    // If extra headers is present, set it
    if (extraHeaders) {
      requestInit.headers = {
        ...requestInit.headers,
        ...extraHeaders
      };
    }

    // If abortController is present, register signal to abort the request
    if (abortController) {
      requestInit['signal'] = abortController.signal;
    }

    // process request
    const request = await fetch(parsedUrl, requestInit);

    // parse response to json
    const response = await request.json();

    // If an error occurrers in backend
    if (response.code != null) {
      if (DEBUG) {
        console.log(`[API-WORKER] Error in ${method} ${url}`);
        console.log(response);
      }

      return onError && onError(response);
    }

    if (DEBUG) {
      console.log(`[API-WORKER] Response in ${method} ${url} `);
      console.log(response);
    }

    // if 'onSuccess' function is setted, call it
    onSuccess && onSuccess(response);
  } catch (err) {
    if (DEBUG) {
      console.log(`[API-WORKER] Error in ${method} ${url} `);
    }

    onError && onError(err);
  }
}
