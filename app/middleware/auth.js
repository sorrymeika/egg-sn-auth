// app类型: { 1: '平台', 2: '商户', 3: 'C端' }

module.exports = options => {
    const { permissions } = options;
    return async function auth(ctx, next) {
        const url = ctx.url;
        const permission = permissions.find((permission) => (
            typeof permission.url === 'string'
                ? url == permission.url
                : Array.isArray(permission.url)
                    ? permission.url.includes(url)
                    : permission.url.test(url))
        );

        if (!permission) {
            await next();
            return;
        }

        const res = await ctx.getAuth();
        if (res) {
            if (permission) {
                if (
                    // 超级管理员
                    (res.role === 1 && permission.apps.indexOf(1) !== -1)
                    // 商户超级管理员
                    || (res.role === 3 && permission.apps.indexOf(2) !== -1)
                    // 普通用户
                    || (res.role === 5 && permission.apps.indexOf(3) !== -1)
                ) {
                    await next();
                    return;
                }

                // 平台运营和商户运营需要通过 `permissionIds` 查询组权限
                if ((res.role === 2 && permission.apps.indexOf(1) !== -1) || (res.role === 4 && permission.apps.indexOf(2) !== -1)) {
                    // 不设置 `permissionIds` 表示允许访问
                    if (!permission.permissionIds || permission.permissionIds.length == 0) {
                        await next();
                        return;
                    }

                    // 查询是否有组权限
                    const hasPermissionRes = await ctx.authRPC.invoke('auth.hasPermission', [res.id, permission.permissionIds]);
                    if (hasPermissionRes && hasPermissionRes.success) {
                        await next();
                        return;
                    }
                }
            }
        }

        ctx.body = { success: false, code: 10002, message: '账号无权限' };
    };
};
