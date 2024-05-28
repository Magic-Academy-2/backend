const bcrypt = require('bcryptjs');

async function getEncryptedPassword(passwordToEncrypt) {
    const hashedPassword = await bcrypt.hash(passwordToEncrypt, 10);
    return hashedPassword
}

const userPasswordList = [
    {
        userName: 'Daniel',
        password: 'Dan12345',
    },
    {
        userName: 'Juan Pablo',
        password: 'Juanpablo12345',
    },
    {
        userName: 'Omar',
        password: 'Omar12345',
    },
]

async function main() {
    for (const user of userPasswordList) {
        const hashedPassword = await getEncryptedPassword(user.password)
        console.log(`User: ${user.userName} - Password: ${hashedPassword}`)
        console.log(`Password length: ${hashedPassword.length}`)
        console.log()
    }
}

main()