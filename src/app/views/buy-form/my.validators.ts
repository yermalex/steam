import { FormGroup } from '@angular/forms';

export class MyValidators {

  static restrictedFullName(group: FormGroup): {[key: string]: boolean} {
    const surname = group.get('surname').value;
    const name = group.get('name').value;

    if (name && (name === surname)) {
      return {restrictedFullName: true};
    }
    return null;
  }

}
