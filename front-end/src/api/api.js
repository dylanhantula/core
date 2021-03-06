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

export const createEvent = (token, event, status) =>{
    
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization":'Bearer ' + token 
        },
        body: JSON.stringify(event)
    };
    return fetch("/api/v1/create/event/"+status, requestOptions)
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



export const createRepeatingEvent = (token, event) =>{
    
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization":'Bearer ' + token 
        },
        body: JSON.stringify(event)
    };
    return fetch("/api/v1/create/event/repeating", requestOptions)
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



export const updateEvent = (token, eventID, updates) =>{
    
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization":'Bearer ' + token 
        },
        body: JSON.stringify(updates)
    };
    return fetch("/api/v1/update/event/"+eventID, requestOptions)
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

export const getEvents = (token, id, date)=>{

    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization":'Bearer ' + token 
        },
    };

    let url = `/api/v1/events?id=${id}&date=${date}`;

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

export const getRepeatingEvents = (token, id, type)=>{

    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization":'Bearer ' + token 
        },
    };

    let url = `/api/v1/events/repeating?id=${id}&type=${type}`;

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

export const createMessage = (token, message) =>{
    
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization":'Bearer ' + token 
        },
        body: JSON.stringify(message)
    };

    return fetch("/api/v1/create/message", requestOptions)
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

export const getMessages = (token, id) =>{
    
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization":'Bearer ' + token 
        },
    };
    return fetch("/api/v1/messages/"+id, requestOptions)
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

export const updateProfile = (token, vals, id)=>{
    
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization":'Bearer ' + token 
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


export const createPaymentIntent = (token, items) =>{
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization":'Bearer ' + token
        },
        body: JSON.stringify(items)
    };

    return fetch("/api/v1/create/payment/intent", requestOptions)
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






export const createCustomer = (token, items) =>{
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization":'Bearer ' + token
        },
        body: JSON.stringify(items)
    };

    return fetch("/api/v1/create/customer", requestOptions)
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

export const createPaymentMethod = (token, items) =>{
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization":'Bearer ' + token 
        },
        body: JSON.stringify(items)
    };

    return fetch("/api/v1/create/payment/method", requestOptions)
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

export const getPaymentMethods = (token, id) =>{
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization":'Bearer ' + token 
        },
    };

    return fetch("/api/v1/get/payment/methods/"+id, requestOptions)
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