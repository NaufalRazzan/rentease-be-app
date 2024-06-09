const allowedPath = [
    '/',
    '/insert',
    '/auth/signup',
    '/auth/signin',
    '/auth/signout/:user_id',
    '/profile/getProfile/:userId',
    '/profile/updateProfile/:userId',
    '/products/filterProduct/:page(?:\\?.*)?',
    '/transactions/payment/:user_id/:product_id'
]

export const checkPath = (path: string): boolean => {
    return allowedPath.some(allowed => {
        const regex = new RegExp('^' + allowed.replace(/:\w+/g, '[^/]+') + '$');
        return regex.test(path);
    })
}