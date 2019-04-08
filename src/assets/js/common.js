//提示必须登录
export const loginMsg = (obj) => {
        obj.$message.error("您必须先登录！")
}