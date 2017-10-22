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
  },

  simpleCheck: (email: string): boolean => {
    const re = /\S+@\S+\.\S+/;
    return  re.test(email);
  }

};

interface EmailValidator {
  readonly validateEmail: (email: string) => Promise<EmailValidation>;
  readonly simpleCheck: (email: string) => boolean;
}

export interface EmailValidation {
  isValid: boolean;
}
