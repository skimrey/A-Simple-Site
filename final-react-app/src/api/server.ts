import axios from 'axios';

let token = '5650c695baf0828f218c7dd99b831f868fa8453cee739908'

export const server_calls = {
    get: async () => {
        const response = await fetch(`https://sneaky-wholesale-hamster.glitch.me/api/books`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    },

    create: async(data: any = {}) => {
        
          try {
            await axios.post('https://sneaky-wholesale-hamster.glitch.me/api/books', JSON.stringify(data), {
              headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
              }
            });
      
            
            window.location.reload(); // Reload the page after creating the book
          } catch (error) {
            console.error('Error creating book:', error);
          }
        },
    update: async (id:string[], data:any = {}) => {
        const response = await fetch(`https://sneaky-wholesale-hamster.glitch.me/api/books/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
    },
    delete: async(id:string[]) => {
        const response = await fetch(`https://sneaky-wholesale-hamster.glitch.me/api/books/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        })
    }
}