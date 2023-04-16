const config: { [key: string]: { [key: string]: string } } = {
    ["main"]: {
        ['base']: 'http://127.0.0.1:80/api/v1'
    },
    ['auth']: {
        ['signin']: 'auth/signin',
        ['signup']: 'auth/signup'
    },
    ['product']: {
        ['find']: 'product',
        ['search']: 'product/search'
    },
    ['support']: {
        ['send']: 'support'
    }
}

export function GetApiRoute(category: string, key: string): string {
    return config[category][key];
}