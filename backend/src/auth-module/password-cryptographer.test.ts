import {PasswordCryptographerService} from './password-cryptographer';
import {Test} from '@nestjs/testing';

describe('bcrypt', () => {

  let passwordCryptographer: PasswordCryptographerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      components: [PasswordCryptographerService],
    }).compile();

    passwordCryptographer = module.get<PasswordCryptographerService>(PasswordCryptographerService);
  });

  it('should be able to encrypt & decrypt', (done) => {

    const mypw = 'Hello World';
    passwordCryptographer.doHash(mypw).then(encrypted => {
      passwordCryptographer.doCompare(mypw, encrypted).then((isMatching: boolean) => {
        expect(isMatching).toEqual(true);
        done();
      }, (err) => {
        console.error('Error while comparing:');
        console.error(err);
      });
    }, (err) => {
      console.error('Error while encrypting:');
      console.error(err);
    });

  });

  it('shouldnt match wrong passwords', (done) => {

    const mypw = 'Hello World';

    passwordCryptographer.doHash(mypw).then(encrypted => {
      passwordCryptographer.doCompare(mypw + ' is wrong', encrypted).then((isMatching: boolean) => {
        expect(isMatching).toEqual(false);
        done();
      }, (err) => {
        console.error('Error while comparing:');
        console.error(err);
      });
    }, (err) => {
      console.error('Error while encrypting:');
      console.error(err);
    });

  });

});
