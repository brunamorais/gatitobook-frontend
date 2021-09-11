import { FormGroup } from '@angular/forms';

//esas função recebe o formulário inteiro
export function usuarioSenhaIguaisValidator(formGroup: FormGroup) {
  //?? = se o valor for undefined o user name será vazio
  const username = formGroup.get('userName')?.value ?? '';
  const password = formGroup.get('password')?.value ?? '';

  if (username.trim() + password.trim()) {
    return username !== password ? null : { senhaIgualUsuario: true };
  } else {
    return null;
  }
}
