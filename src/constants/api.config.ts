const config: { [key: string]: { [key: string]: string } } = {
    ["main"]: {
        ['base']: 'http://127.0.0.1/api/v1'
    },
    ['auth']: {
        ['signin']: 'auth/signin',
        ['signup']: 'auth/signup'
    },
    ['profile']: {
        ['fetch']: 'profile',
        ['update']: 'profile'
    },
    ['product']: {
        ['find']: 'product',
        ['search']: 'product/search'
    },
    ['support']: {
        ['send']: 'support'
    }
}

export function GET_API_ROUTE(category: string, key: string): string {
    return config[category][key];
}