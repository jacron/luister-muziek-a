import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {FormEditService} from '../../../../services/form-edit.service';
import {MusicService} from '../../services/music.service';
import {FormOption} from '../../../../classes/shared/FormOption';
import {environment} from '../../../../../environments/environment';
import {Componist} from '../../../../classes/music/Componist';
import {FormError} from '../../../../classes/shared/FormError';

const formErrors: FormError[] = [
  {
    name: 'LastName',
    validator: 'required',
    message: 'Achternaam is verplicht'
  },
  {
    name: 'Birth',
    validator: 'jaartal',
    message: 'Een jaartal mag uit twee of vier cijfers bestaan'
  },
  {
    name: 'Death',
    validator: 'jaartal',
    message: 'Een jaartal mag uit twee of vier cijfers bestaan'
  },
];

@Component({
  selector: 'app-componist-edit-card',
  templateUrl: './componist-edit-card.component.html',
  styleUrls: ['./componist-edit-card.component.scss']
})
export class ComponistEditCardComponent implements OnInit, OnChanges {
  @Input() composer: Componist;
  @Input() refresh;
  @Output() close = new EventEmitter();
  @Output() wiki = new EventEmitter();
  @Output() composerChange = new EventEmitter();
  formGroup: FormGroup;
  // options: FormOption[];
  errors;
  viewUrl;

  options: FormOption[] = [
    {
      name: 'FirstName',
      label: 'Voornaam'
    },
    {
      name: 'LastName',
      validators: [Validators.required],
      label: 'Achternaam',
    },
    {
      name: 'Birth',
      validators: [this.formEditService.jaartalValidator(),],
      label: 'Geboren',
      autocomplete: 'off'
    },
    {
      name: 'Death',
      validators: [this.formEditService.jaartalValidator(),],
      label: 'Gestorven',
      autocomplete: 'off'
    },
    {
      name: 'Country',
      label: 'Land'
    },
    // {
    //   name: 'Genre',
    //   label: 'Genre'
    // }
  ];

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private musicService: MusicService,
    private formEditService: FormEditService,
  ) { }

  toComposer() {
    this.router.navigate(['composer', this.composer.ID]).then(
      () => this.onClose('navigated')
    );
  }

  onClose(e) {
    this.close.emit(e);
  }

  closeDialog(msg) {
    this.close.emit(msg);
  }

  afterSave(composer: Componist) {
    this.composer = composer;
    this.toastr.success('opgeslagen!', this.composer.FirstName + ' ' +
      this.composer.LastName);
    this.composerChange.emit(composer);
    this.close.emit('saved');
  }

  save() {
    const current: Componist = this.formGroup.value;
    const Country = this.formEditService.fromShortCountry(current.Country);
    const {born, died} = this.formEditService.fromBornDied(current.Birth, current.Death);
    const composer: Componist = {
      ...current,
      Country,
      Birth: born,
      Death: died,
      ID: this.composer.ID,
    };
    this.musicService.saveComposer(composer).subscribe(
      () => this.afterSave(composer)
    )
  }

  initForm() {
    // this.options = formOptions;
    this.errors = formErrors;
    this.formGroup = this.formEditService.initForm(
      this.options, this.composer);
  }

  changeComposer() {
    this.refresh = '?now=' + new Date();
  }

  changeWiki(lng) {
    this.wiki.emit(lng);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // wiki component may have changed born/died and years
    if (changes.composer && this.formGroup) {
      const value: Componist = changes.composer.currentValue;
      this.formGroup.controls['Birth'].setValue(value.Birth);
      this.formGroup.controls['Death'].setValue(value.Death);
    }
  }

  ngOnInit() {
    this.initForm();
    this.viewUrl = environment.musicServer +
      `/image/${this.composer.ID}/componist/`;
  }

}
