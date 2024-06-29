export async function AuthClient(role: string, direction: string) {
    let token = localStorage.getItem('auth');
    if (token) {

        let check = await fetch('/api/auth/' + role, { method: 'GET', headers: { 'Content-Type': 'application/json', 'Auth': token } });
        let parsed = await check.json();
        if (parsed.stat === false) {
            location.href = direction;
        }

    } else {
        location.href = direction;
    }




}