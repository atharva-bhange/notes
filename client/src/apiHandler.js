class apiHandler {
    axiosPromise;
    codeResponseMapper = {};
    errorHandler = () => {};

    constructor(axiosPromise) {
        this.axiosPromise = axiosPromise;
    }
    code = (resposeCode, handler) => {
        this.codeResponseMapper[resposeCode] = handler;
        return this;
    };
    onError = (errorHandlerFunction) => {
        this.errorHandler = errorHandlerFunction;
        return this;
    };
    call = () => {
        this.axiosPromise
            .then((res) => {
                const actualResponseCode = res.status;
                const runner = this.codeResponseMapper[actualResponseCode];
                if (runner) runner(res);
            })
            .catch((err) => {
                if (!err.response) return this.errorHandler(err);
                const actualResponseCode = err.response.status;
                const runner = this.codeResponseMapper[actualResponseCode];
                if (runner) runner(err.response);
                this.errorHandler(err.response);
            });
    };
}

export default apiHandler;
