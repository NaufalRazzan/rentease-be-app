const methodPath = {
    'post': ['/insert', '/auth/signup', '/auth/signin', '/auth/signout/:user_id', '/transactions/payment/:user_id/:product_id'],
    'get': ['/', '/profile/getProfile/:userId', '/products/filterByCategory', '/products/filterProduct/:page(?:\\?.*)?'],
    'patch': ['/profile/updateProfile/:userId']
}

export const checkMethod = (method: string, path: string): boolean => {
    const paths: string[] = methodPath[method.toLowerCase()]

    if(!paths) return false

    const normalizedPaths = paths.map(p => p.split('/').map(seg => seg.startsWith(':') ? '*' : seg));
    const pathSegments = path.split('/');

    return normalizedPaths.some(normPath => {
        // Ensure the lengths match
        if (normPath.length !== pathSegments.length) return false;

        // Compare segments
        return normPath.every((seg, index) => seg === '*' || seg === pathSegments[index]);
    });
}