const assert = require('assert')
const PasswordHelper = require('../helpers/passwordHelper')

const SENHA = '123'
const HASH = '$2b$04$lH5lRs.mLUYToxwqMqqDG.LxMXOSm7cgkV9MfEcqIn5OeSK92AvCq'

describe('UserHelper test suite', function () {
    it('deve gerar um hash a partir de uma senha', async () =>{
        const result = await PasswordHelper.hashPassword(SENHA)
        console.log('result', result)
        assert.ok(result.length > 10)
    })
    it('deve comparar uma senha e seu hash', async () => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH)
        assert.ok(result)
    })
})