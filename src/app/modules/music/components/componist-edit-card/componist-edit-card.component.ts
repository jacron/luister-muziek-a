import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {FormEditService} from '../../../shared/services/form-edit.service';
import {MusicService} from '../../services/music.service';
import {FormOption} from '../../../../classes/shared/FormOption';
import {environment} from '../../../../../environments/environment';
import {Componist} from '../../../../classes/music/Componist';

const formOptions: FormOption[] = [
  {
    name: 'FirstName',
    label: 'Voornaam'
  },
  {
    name: 'LastName',
    label: 'Achternaam'
  },
  {
    name: 'Birth',
    label: 'Geboren'
  },
  {
    name: 'Death',
    label: 'Gestorven'
  },
  {
    name: 'Country',
    label: 'Land'
  },
  {
    name: 'Genre',
    label: 'Genre'
  }
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
  options: FormOption[];
  viewUrl = environment.musicServer + '/image/composer/';

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

  hasError(controlName, errorName) {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  onClose(e) {
    this.close.emit(e);
  }

  closeDialog() {
    this.close.emit('canceled');
  }

  afterSave(id, composer: Componist) {
    this.composer = composer;
    this.toastr.success('opgeslagen!', this.composer.FirstName + ' ' +
      this.composer.LastName);
    this.composerChange.emit(composer);
    this.close.emit('saved');
  }

  save() {
    const current: Componist = this.formGroup.value;
    const Country = this.formEditService.fromShortCountry(current.Country);
    const Birth = this.formEditService.fromShortYear(current.Birth);
    const Death = this.formEditService.fromShortYear(current.Death);
    const composer: Componist = {
      ...current,
      Country,
      Birth,
      Death,
      ID: this.composer.ID,
    };
    this.musicService.saveComposer(composer).subscribe(
      response => this.afterSave(response, composer)
    )
  }

  initForm() {
    this.options = formOptions;
    const controls = {};
    this.options.forEach(option => {
      controls[option.name] = new FormControl({
        value: this.composer[option.name],
        disabled: false
      }, option.validators);
    });
    this.formGroup = new FormGroup(controls);
  }

  changeComposer() {
    this.refresh = '?now=' + new Date();
  }

  changeWiki(lng) {
    this.wiki.emit(lng);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // wiki component may have changed born/died
    if (changes.composer && this.formGroup) {
      const value: Componist = changes.composer.currentValue;
      this.formGroup.controls['Birth'].setValue(value.Birth);
      this.formGroup.controls['Death'].setValue(value.Death);
    }
  }

  ngOnInit() {
    this.initForm();
  }

}
