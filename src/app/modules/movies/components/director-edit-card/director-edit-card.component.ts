import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Director} from '../../../../classes/movies/Director';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormOption} from '../../../../classes/shared/FormOption';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {MoviesService} from '../../services/movies.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-director-edit-card',
  templateUrl: './director-edit-card.component.html',
  styleUrls: ['./director-edit-card.component.scss']
})
export class DirectorEditCardComponent implements OnInit, OnChanges {
  @Input() director: Director;
  @Input() refresh: string;
  @Output() close = new EventEmitter();
  @Output() directorChange = new EventEmitter();
  @Output() toggleFilmsList = new EventEmitter();
  @Output() wiki = new EventEmitter();
  formGroup: FormGroup;
  options: FormOption[];
  viewUrl = environment.moviesServer + '/image/director/';

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private moviesService: MoviesService,
  ) { }

  toDirector() {
    this.router.navigate(['director', this.director.id]).then(
      () => this.onClose('navigated')
    );
  }

  hasError(controlName, errorName) {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  onClose(e) {
    this.close.emit(e);
  }

  toggle() {
    this.toggleFilmsList.emit();
  }

  closeDialog() {
    this.close.emit('canceled');
  }

  afterSave(id, director: Director) {
    this.director = director;
    this.toastr.success('opgeslagen!', this.director.Voornaam + ' ' +
      this.director.Achternaam);
    this.directorChange.emit(director);
    this.close.emit('saved');
  }

  save() {
    const director: Director = {
      ...this.formGroup.value,
      id: this.director.id,
    };
    this.moviesService.saveDirector(director).subscribe(
      response => this.afterSave(response, director)
    )
  }

  initForm() {
    this.options = [
      {
        name: 'Voornaam',
        label: 'Voornaam',
      },
      {
        name: 'Achternaam',
        validators: [Validators.required],
        label: 'Achternaam',
      },
      {
        name: 'Geboortejaar',
        label: 'Geboren',
      },
      {
        name: 'Sterfjaar',
        label: 'Overleden',
      },
      {
        name: 'imdb_id',
        label: 'imdb_id',
      },
      {
        name: 'ImageUrl',
        label: 'Afbeelding'
      },
    ];
    const controls = {};
    this.options.forEach(option => {
      controls[option.name] = new FormControl({
        value: this.director[option.name],
        disabled: false
      }, option.validators);
    });
    this.formGroup = new FormGroup(controls);
  }

  changeDirector() {
    this.refresh = '?now=' + new Date();
  }

  changeWiki(lng) {
    this.wiki.emit(lng);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // wiki component may have changed image url
    if (changes.director && this.formGroup) {
      this.formGroup.controls['ImageUrl'].setValue(changes.director.currentValue.ImageUrl);
    }
  }

  ngOnInit() {
    this.initForm();
  }

}
