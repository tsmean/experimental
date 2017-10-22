export const emailValidator: EmailValidator = {
  validateEmail: (email: string): Promise<EmailValidation> => {
    return new Promise((resolve, reject) => {
      const re = /\S+@\S+\.\S+/;
      const isValid =  re.test(email);
      const emailValidation = {
        isValid: isValid
      };
      resolve(emailValidation);
    });
  }
};

interface EmailValidator {
  readonly validateEmail: (email: string) => Promise<EmailValidation>;
}

export interface EmailValidation {
  isValid: boolean;
}
