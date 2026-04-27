import * as bcrypt from 'bcrypt';

async function encryptPassword(password:string) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}

async function checkPassword(password:string,hashedPassword:string) {
    const isMatch = await bcrypt.compare(password, hashedPassword)
    console.log("Password Match:", isMatch)
    return isMatch
}

export {encryptPassword,checkPassword}