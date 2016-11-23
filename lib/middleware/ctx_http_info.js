export default function http_info(ctx){
    ctx.http_info={
        client_ip:ctx.request.ip,
        http_user_agent:ctx.request.headers['user-agent'] || '',
        http_accept_language: ctx.request.headers['accept-language'] || ''
    };
}
