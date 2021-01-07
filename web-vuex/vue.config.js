module.exports = {
    // 选项...
    
        devServer:{
            port:8081,
            proxy: 'http://nike.th520.com'
        }
        // host:"localhost",
        // port:8081,
        // https:false,
        // open:true,
        // proxy: {
        //     "/api":{
        //         target:"http://nike.th520.com",
        //         ws:true,
        //         changeOrigin:true,
        //         pathRewrite:{
        //             '^/api':''
        //         }
        //     }
        // }
    
   
}