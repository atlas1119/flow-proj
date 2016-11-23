import router from './main';

// [auth,loan, account, account, article, payment,resource, safe, about_us, activity, util].map((item)=>{
//     router.use(item.routes());
//     router.use(item.allowedMethods());
// });

export default function use_router(app){
    app.use(router.routes()).use(router.allowedMethods());
}
