'use strict';

const { pagination } = require('@strapi/utils');
const product = require('../routes/product');

/**
 * product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product',()=>({
    async find(ctx){
        let {data, meta} = await super.find(ctx);
        const user = ctx.state.user;
        let filteredData = data;
        if(user){
            // const userRole = user.role.name;
            // if(userRole==='Authenticated'){
                // filteredData = data.filter(product=>product.attributes.visibility==='authenticated')
                filteredData = data
            // }
        }else{
            filteredData = data.filter(product=>product.attributes.visibility==='public')
        }
        const updatedMeta = {
            ...meta,
            pagination:{
                ...meta.pagination,
                total:filteredData.length,
                pageCount:Math.ceil(filteredData.length/meta.pagination.pageSize)
            }
        }
        data = filteredData
        meta = updatedMeta
        return {data,meta}
    }
}));
