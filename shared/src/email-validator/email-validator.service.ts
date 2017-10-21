export namespace EmailValidator {
  export function validateEmail(email: string): Promise<EmailValidation> {
    return new Promise((resolve, reject) => {
      const re = /\S+@\S+\.\S+/;
      const isValid =  re.test(email);
      const emailValidation = {
        isValid: isValid
      };
      resolve(emailValidation);
    });
  }
}

export interface EmailValidation {
  isValid: boolean;
}
