import { Component, Input, SimpleChanges } from '@angular/core';

enum PasswordStrength {
  EASY = 'easy',
  MEDIUM = 'medium',
  STRONG = 'strong',
}

@Component({
  selector: 'app-password-complexity',
  templateUrl: './password-complexity.component.html',
})
export class PasswordComplexityComponent {
  @Input()
  password!: string;

  readonly PASSWORD_LENGTH = 8;
  passwordIsShort: boolean = false;
  passwordStrength: PasswordStrength | null = null;

  ngOnChanges(changes: SimpleChanges) {
    this.setPassWordStrength(changes['password'].currentValue);
    this.passwordIsShort = this.password.length < this.PASSWORD_LENGTH && this.password != '';
  }

  // easy = letters/digits/symbols
  // strong = letters&digits&symbols
  // medium = letters&digits/letters&symbols/symbols&digits
  easyStrengthPasswordRegexp: RegExp = /^([a-z]|[0-9]|[#?!@$%^&*-]).{8,}$/;
  strongStrengthPasswordRegexp: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  mediumStrengthPasswordRegexp: RegExp =/^((?=.*?[a-z])(?=.*?[0-9])|(?=.*?[a-z])(?=.*?[#?!@$%^&*-])|(?=.*?[#?!@$%^&*-])(?=.*?[0-9])).{8,}$/;

  setPassWordStrength(password: string) {
    if (!password) {
      this.passwordStrength = null;
      return
    } 
    if (this.easyStrengthPasswordRegexp.test(password))
      this.passwordStrength = PasswordStrength.EASY;
    if (this.mediumStrengthPasswordRegexp.test(password))
      this.passwordStrength = PasswordStrength.MEDIUM;
    if (this.strongStrengthPasswordRegexp.test(password))
      this.passwordStrength = PasswordStrength.STRONG;
  }
}
