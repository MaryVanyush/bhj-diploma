const createRequest = (options) => {
    const xhr = new XMLHttpRequest();
    xhr.open(options.method, options.url);
    xhr.responseType = 'json';
    try {
        if(options.method === "GET"){
            xhr.send();
            xhr.addEventListener('load', ( err, response ) => {
                    options.callback(err, response);
            });
        } else {              
            const formData = new FormData()
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            for (const key in options.data) {
                formData.append(key, options.data[key]);
                console.log(formData)
            }
            xhr.send(formData);
            options.callback(err, response);
            }
    } catch ( e ) {
        console.error("Произошла ошибка: ", e);
    }
};