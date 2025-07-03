// Configuration utility for environment variables
export const config = {
    apiKey: import.meta.env.VITE_API_KEY,

    // Helper function to check if API key is available
    hasApiKey: () => {
        return !!import.meta.env.VITE_API_KEY
    },

    // Helper function to get API key with error handling
    getApiKey: () => {
        const key = import.meta.env.VITE_API_KEY
        if (!key) {
            console.warn('VITE_API_KEY is not set. Some features may not work.')
        }
        return key
    }
} 