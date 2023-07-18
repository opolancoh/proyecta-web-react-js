// implement a silent refresh function to use a refresh token   
async function silentRefresh() {
    try {
        const response = await fetch(
            'http://localhost:3000/api/v1/auth/refresh',
            {
                method: 'POST',
                credentials: 'include',
            }
        );
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        throw new Error('Something went wrong');
    } catch (error) {
        console.log(error);
    }
}