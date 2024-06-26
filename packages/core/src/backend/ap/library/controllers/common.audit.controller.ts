export const CommonAuditController = (Base) =>
    class extends Base {
        async getAuditLog(id: number) {
            this.api = `${this.endPoint}/${id}/audit`;
            return this.get();
        }
    };
