import {EmailValidation, EmailValidator} from './email-validator.service';
describe('Email Validator', () => {

  it('should accept a good email', async (done) => {
    const emailValidation: EmailValidation = await EmailValidator.validateEmail('bersling@gmail.com');
    expect(emailValidation.isValid).toBe(true);
    done();
  });

  it('should reject a bad email address', async (done) => {
    const emailValidation: EmailValidation = await EmailValidator.validateEmail('kljaf');
    expect(emailValidation.isValid).toBe(false);
    done();
  });

});
