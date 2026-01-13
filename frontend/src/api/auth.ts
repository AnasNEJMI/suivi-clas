export async function getAuthStatus () : Promise<boolean> {
    const response = await fetch('/api/auth/login');

    const data = await response.json();

    return data.auth;
}