require('../../dep');

const { registerConsumer } = require('sonorpc');

const AUTH_RPC = Symbol('Application#authRPC');

module.exports = {
    get authRPC() {
        // this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
        if (!this[AUTH_RPC]) {
            console.log('init auth rpc consumer:', this.app.config.snauth.registry);
            this[AUTH_RPC] = registerConsumer({
                // 服务提供者名称
                providerName: 'auth',
                registry: {
                    port: 3006,
                    ...this.app.config.snauth.registry
                }
            });
        }
        return this[AUTH_RPC];
    },
};