/**
 * Captcha entity model
 */
export class Captcha {
  id?: number;
  sequence: string;
  createdOn: Date;
  checkedOn?: Date;
}
