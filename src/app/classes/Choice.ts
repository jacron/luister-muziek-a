export class Choice {
  name: string;
  visible: boolean;  // show or not
  label: string;  // placeholder
  displayfield: string;  // auto-complete display
  id: string;  // for navigation params
  items: any[];  // persons, collections etc.
}
