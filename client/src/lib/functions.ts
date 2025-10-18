export type http_method = 'GET'|'POST'|'PUT'|'PATCH'|'DELETE'


export async function api_call<T>(method:http_method, url:string, body?:T) {
  const headers = body!== undefined ? { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem('access')}` } : undefined
  const response = await fetch(url, {
    method:method
    ,body:body!== undefined?JSON.stringify(body): undefined
    ,headers
  })
  return response
}

export async function touch(callback:()=>Promise<void>|void){
    const response = await fetch('http://127.0.0.1:8000/flux_wa/multichat/touch', {
        method:'GET'
        ,headers: {
          "Content-Type": "application/json"
          ,Authorization: `Bearer ${localStorage.getItem('access')}`
        }
      })

    const response_json = await response.json()
    if(response.ok) localStorage.setItem('access', response_json['access'])
    else if (response.status == 401){
        localStorage.removeItem('access')
        alert('Sesion expirada')
        window.location.href = '/login'
        return
    }
    await callback()
}