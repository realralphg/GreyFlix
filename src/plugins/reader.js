import { api } from "../boot/axios";
export default {
  /**
   * Parse an error response object
   *
   * @param { Object } error
   * @returns
   */
  error(error, debug = true) {
    if (error.response && error.response.data) {
      error = error.response.data;
    } else if (error.response) {
      error = error.response;
    } else if (error.statusText) {
      error = error.statusText;
    }
    if (
      debug === true &&
      process.env.LOG_LEVEL &&
      (process.env.DEBUG === "true" || process.env.DEBUG === true) &&
      typeof console[process.env.LOG_LEVEL] === "function"
    ) {
      console[process.env.LOG_LEVEL](error);
    }
    return error;
  },
  filePondServer(uploadType, uploadId, callback) {
    return {
      url: process.env.baseURL + "images/storage",
      process: (
        fieldName,
        file,
        metadata,
        load,
        error,
        progress,
        abort,
        transfer,
        options
      ) => {
        const controller = new AbortController();
        const formData = new FormData();

        formData.append(fieldName, file, file.name);
        formData.append("type", uploadType);
        formData.append("type_id", uploadId);
        if (uploadType.toLowerCase() === "vision") {
          formData.append("meta", JSON.stringify({ grid: {} }));
        }
        api
          .post("images/storage", formData, {
            onUploadProgress: (e) => {
              progress(e.lengthComputable, e.loaded, e.total);
            },
          })
          .then(function ({ data }) {
            // the load method accepts either a string (id) or an object
            load(data.data.file_id);
            if (typeof callback === "function") callback(data, null);
          })
          .catch((e) => {
            // Can call the error method if something is wrong, should exit after
            error("Upload failed!");
            if (typeof callback === "function") callback({}, e);
          });
        // Should expose an abort method so the request can be cancelled
        return {
          abort: () => {
            // This function is entered if the user has tapped the cancel button
            controller.abort();
            // Let FilePond know the request has been cancelled
            abort();
          },
        };
      },
      revert: null, //'/' + fileId,
      restore: null, //'/',
      load: null, //'/',
      fetch: null, //'/',
      patch: null, //'/',
    };
  },
};
