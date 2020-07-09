export const createUser = (vals)=>{
    
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(vals)
    };
    return fetch("/api/v1/join", requestOptions)
        .then(async response => {
            const data = await response.json();

            // Check for error response
            if (!response.ok) {
                // Get error message from body or default to response status
                const error = (data && data.message) || response.status;
                
                // Rejecting the promise will force the catch block to hit
                return Promise.reject(error);
            }
            
        })
        .catch(error => {
            throw error
        }); 
}

export const createMessage = (message) =>{
    
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message)
    };

    const url = `/api/v1/message?to=${message.to}&from=${message.from}`

    return fetch(url, requestOptions)
        .then(async response => {
            const data = await response.json();

            // Check for error response
            if (!response.ok) {
                // Get error message from body or default to response status
                const error = (data && data.message) || response.status;
                
                // Rejecting the promise will force the catch block to hit
                return Promise.reject(error);
            }
            
        })
        .catch(error => {
            throw error
        }); 
}

export const getMessages = (id) =>{
    
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
        },
    };
    return fetch("/api/v1/allmessages/"+id, requestOptions)
        .then(async response => {
            const data = await response.json();

            // Check for error response
            if (!response.ok) {
                // Get error message from body or default to response status
                const error = (data && data.message) || response.status;
                
                // Rejecting the promise will force the "catch" block to hit
                return Promise.reject(error);
            }
            
            return data
        })
        .catch(error => {
            throw error
        }); 
}

export const getProfile = (token, id)=>{
    
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization":'Bearer ' + token 
        },
    };
    return fetch("/api/v1/profile/"+id, requestOptions)
        .then(async response => {
            const data = await response.json();

            // Check for error response
            if (!response.ok) {
                // Get error message from body or default to response status
                const error = (data && data.message) || response.status;
                
                // Rejecting the promise will force the "catch" block to hit
                return Promise.reject(error);
            }
            
            return data
        })
        .catch(error => {
            throw error
        }); 
}

export const updateProfile = (vals, id)=>{
    
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            //"Authorization":'Bearer ' + token 
        },
        body: JSON.stringify(vals)
    };
    return fetch("/api/v1/profile/"+id, requestOptions)
        .then(async response => {
            const data = await response.json();

            // Check for error response
            if (!response.ok) {
                // Get error message from body or default to response status
                const error = (data && data.message) || response.status;
                
                // Rejecting the promise will force the "catch" block to hit
                return Promise.reject(error);
            }
            
            return data
        })
        .catch(error => {
            throw error
        }); 
}

export const getCoaches = (zipCode, radius, sport)=>{

    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json'
        },
    };

    let url = sport ? `/api/v1/coaches?zip=${zipCode}&radius=${radius}&sport=${sport}` :
    `/api/v1/coaches?zip=${zipCode}&radius=${radius}`

    return fetch(url, requestOptions)
        .then(async response => {
            const data = await response.json();

            // Check for error response
            if (!response.ok) {
                // Get error message from body or default to response status
                const error = (data && data.message) || response.status;
                
                // Rejecting the promise will force the "catch" block to hit
                return Promise.reject(error);
            }
            
            return data
        })
        .catch(error => {
            throw error
        }); 
}