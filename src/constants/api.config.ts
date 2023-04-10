const config: { [key: string]: { [key: string]: string } } = {
    ["main"]: {
        ['base']: 'http://localhost:80',
        ['api']: 'api/v1'
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
    return `${config['main']['base']}/${config['main']['api']}/${config[category][key]}`;
}