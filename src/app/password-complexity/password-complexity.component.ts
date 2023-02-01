import { Component, Input, SimpleChanges } from '@angular/core';

enum PasswordStrength {
  EASY = 'easy',
  MEDIUM = 'medium',
  STRONG = 'strong',
}

enum InvalidPasswordStatus {
  EMPTY = 'empty',
  SHORT = 'short'
}

@Component({
  selector: 'app-password-complexity',
  templateUrl: './password-complexity.component.html',
})
export class PasswordComplexityComponent {
  @Input()
  password!: string;

  readonly PASSWORD_LENGTH = 8;
  passwordStrength: PasswordStrength | null = null;
  invalidPasswordStatus: InvalidPasswordStatus | null = null;

  ngOnChanges(changes: SimpleChanges) {
    this.passwordStrength = this.getPassWordStrength(changes['password'].currentValue);
    this.invalidPasswordStatus = this.getIvalidPasswordStatus(changes['password'].currentValue);
  }

  // All passwords must be greater than the given length - PASSWORD_LENGTH
  // easy = letters/digits/symbols
  // strong = letters&digits&symbols
  // medium = letters&digits/letters&symbols/symbols&digits
  easyStrengthPasswordRegexp: RegExp = new RegExp(`^([a-z]|[0-9]|[#?!@$%^&*-]).{${this.PASSWORD_LENGTH},}$`);
  strongStrengthPasswordRegexp: RegExp = new RegExp(`^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&]).{${this.PASSWORD_LENGTH},}$`);
  mediumStrengthPasswordRegexp: RegExp = new RegExp(`^((?=.*?[a-z])(?=.*?[0-9])|(?=.*?[a-z])(?=.*?[#?!@$%^&*-])|(?=.*?[#?!@$%^&*-])(?=.*?[0-9])).{${this.PASSWORD_LENGTH},}$`);

  getPassWordStrength(password: string): PasswordStrength | null {
    console.log(this.strongStrengthPasswordRegexp.source)
    if (this.strongStrengthPasswordRegexp.test(password)) return PasswordStrength.STRONG;
    if (this.mediumStrengthPasswordRegexp.test(password)) return PasswordStrength.MEDIUM;
    if (this.easyStrengthPasswordRegexp.test(password)) return PasswordStrength.EASY;
    return null;  
  }

  getIvalidPasswordStatus(password: string): InvalidPasswordStatus | null {
    if (!password) return InvalidPasswordStatus.EMPTY;
    if (password.length < this.PASSWORD_LENGTH) return InvalidPasswordStatus.SHORT;
    return null;
  }
}
