//capitalise first letter
export function FCapitalize(value: string): string{
  return value[0].toUpperCase() + value.slice(1);
}

export function CHECK_COOKIE_EXIST(cookieName: string): boolean{
  const allCookie = document.cookie.split(';');
  for(let cookie of allCookie){
    if(cookie.split('=')[0].trim() === cookieName) return true;
  }
  return false;
}

export function GET_COOKIE(cookieName: string): string{
  const allCookie = document.cookie.split(';');
  for(let cookie of allCookie){
    let [key, value] = cookie.split('=');
    if(key.trim() === cookieName) return value.trim();
  }
  return '';
}