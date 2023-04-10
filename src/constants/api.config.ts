const routes: { [key: string]: { [key: string]: string } } = {
    ["main"]: {
        ['url']: 'http://localhost/api/v1'
    },
    ['auth']: {
        ['signin']: 'auth/signin',
        ['signup']: 'auth/signup'
    },
    ['product']: {
        ['search']: 'product/search'
    },
}

export function GetApiRoute(category: string, key: string): string {
    return `${routes['main']['url']}/${routes[category][key]}`;
}