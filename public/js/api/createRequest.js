const createRequest = (options) => {
    const xhr = new XMLHttpRequest();
    xhr.open(options.method, options.url);
    xhr.responseType = 'json';
    try {
        if(options.method === "GET"){
            xhr.open(options.method, options.url);
            xhr.send();
            xhr.addEventListener('load', ( err, response ) => {
                    options.callback(err, response);
            });
        } else {              
            let formData = new FormData()  
            
            for (const key in options.data) {
                formData[key] = options.data[key]
                // formData.append(key, options.data[key])
                console.log(formData)
            }
            formData = JSON.stringify(formData)
            console.log(formData)
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onload = () => {
                if(xhr.status === 200){
                    console.log(xhr)
                    const response = JSON.parse(xhr.responseText)
                    options.callback(xhr.response.error, xhr.response.responseText )
                } else {
                    console.log(xhr.status)
                    console.log(JSON.parse(xhr.responseText))
                }
            }
            xhr.send(formData);
            }
    } catch ( e ) {
        console.error("Произошла ошибка: ", e);
    }
};

createRequest({
    url: '/user/login',
    method: 'POST',
    data: {
        email: 'demo@demo',
        password: 'demo'
    },
    callback: (e,r)=>{
        console.log(e,r)
    }
})