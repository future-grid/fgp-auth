import FgpAuth from './fgp-auth';

test('init keycloak with wrong mode!', () =>{
    const fgpAuth = new FgpAuth();
    expect(fgpAuth.init('other', null)).toBe(null);
});