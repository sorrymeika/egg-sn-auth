
module.exports = {
    async getAuth() {
        const { account } = this;
        if (account) {
            return account;
        }
        const tk = this.cookies.get('tk', {
            signed: false
        });
        const aid = this.cookies.get('aid', {
            signed: false
        });
        const res = await this.app.authRPC.invoke('auth.getRole', [aid, tk]);
        if (res && res.success) {
            this.accountId = Number(aid);
            this.account = {
                id: this.accountId,
                role: Number(res.role),
                name: res.account
            };
        }
        return this.account;
    }
};