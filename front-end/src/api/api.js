export const createUser = (vals)=>{
    
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            //"Authorization":'Bearer ' + idToken 
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
                
                // Rejecting the promise will force the "catch" block to hit
                return Promise.reject(error);
            }
            
            return {}
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