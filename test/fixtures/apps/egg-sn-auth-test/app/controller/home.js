'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        this.ctx.body = 'hi, ' + this.app.plugins.auth.name;
    }
}

module.exports = HomeController;
