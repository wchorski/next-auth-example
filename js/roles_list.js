// const admin_code = process.env.ROLE_CODE_ADMIN
// const editor_code = process.env.ROLE_CODE_EDITOR
// const client_code = process.env.ROLE_CODE_CLIENT
const admin_code = process.env.NEXT_PUBLIC_ROLE_CODE_ADMIN
const editor_code = process.env.NEXT_PUBLIC_ROLE_CODE_EDITOR
const client_code = process.env.NEXT_PUBLIC_ROLE_CODE_CLIENT

const ROLES = {
    admin: 5250,
    editor: 1987,
    client: 2003,
    // admin: admin_code,
    // editor: editor_code,
    // client: client_code,
}

export default ROLES