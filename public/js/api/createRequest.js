const createRequest = (options) => {
    const xhr = new XMLHttpRequest();
    xhr.open(options.method, options.url);
    xhr.responseType = 'json';
    try {
        if(options.method === "GET"){
            let stringFromData = '';
            for(let key in options.data){
                let { [Object.keys(options.data).pop()]: lastItem } = options.data;
                if(lastItem === options.data[key]){
                    stringFromData += key + '=' + options.data[key]
                    break
                }
                stringFromData += key + '=' + options.data[key] + '&';
            }
            xhr.open(options.method, options.url + '?' + stringFromData);
            xhr.send();
            xhr.addEventListener('load', ( err, response ) => {
                options.callback(err, response);
            });
        } else {              
            let formData = new FormData()  
            for (const key in options.data) {
                formData.append(key, options.data[key])
            }
            xhr.onload = () => {
                if(xhr.status === 200){
                    const response = xhr.response
                    const err = xhr.onerror
                    options.callback(err, response )
                }
            }
            xhr.send(formData);
            }
    } catch ( e ) {
        console.error("Произошла ошибка: ", e);
    }
};

// createRequest({
//     url: '/user/current',
//     method: 'GET',
//     data: {
//         email: 'demo@demo',
//         password: 'demo'
//     },
//     callback: (e,r)=>{
//         console.log(e,r)
//     }
// })
