'use strict';

const { includes } = require('../../../../config/middlewares');

/**
 * blog controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::blog.blog');


module.exports = createCoreController('api::blog.blog', () => ({
    async find(ctx) {
        const user = ctx.state.user;
        if (!user) {
            return ctx.unauthorized('You are not logged in')
        }
        const userRole = user.role.name;
        console.log("userRole", userRole);
        if (userRole === 'Author') {
            const blogs = await strapi.db.query('api::blog.blog').findMany({
                where: {
                    status: {
                        $in: ['Draft', 'Published','Needs Changes'],
                    },
                    author:user.id
                },
            });
            console.log('blogs',blogs);
            return blogs
        } else if (userRole === 'Reviewer') {
            const blogs = await strapi.db.query('api::blog.blog').findMany({
                 where: {
                    status: {
                        $in: ['Under Review', 'Published'],
                    },
                    reviewer:user.id
                },
            })
            return blogs
        }
    }
}));