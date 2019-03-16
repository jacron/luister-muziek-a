import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Director} from '../../../../classes/movies/Director';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormOption} from '../../../../classes/shared/FormOption';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Author} from '../../../../classes/book/author';
import {MoviesService} from '../../services/movies.service';
// import {MoviesService} from '../../services/movies.service';

@Component({
  selector: 'app-director-edit-card',
  templateUrl: './director-edit-card.component.html',
  styleUrls: ['./director-edit-card.component.scss']
})
export class DirectorEditCardComponent implements OnInit {
  @Input() director: Director;
  @Input() refresh: string;
  @Output() close = new EventEmitter();
  @Output() directorChange = new EventEmitter();
  @Output() toggleFilmsList = new EventEmitter();
  @Output() wiki = new EventEmitter();
  formGroup: FormGroup;
  options: FormOption[];

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private moviesService: MoviesService,
  ) { }

  toDirector() {
    this.router.navigate(['directors', this.director.id]).then(
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

  afterRemove() {
    this.toastr.success('verwijderd!', this.director.Voornaam +
      ' ' + this.director.Achternaam);
    this.close.emit('removed');
  }

  remove() {
    if (confirm('Remove this author?')) {
      // this.moviesService.removeDirector(this.director.id).subscribe(
      //   () => this.afterRemove()
      // )
    }
  }

  afterSave(id, director: Director) {
    this.director = director;
    this.toastr.success('opgeslagen!', this.director.Voornaam + ' ' +
      this.director.Achternaam);
    this.directorChange.emit(director);
    this.close.emit('saved');
  }

  save() {
    const a: Director = this.formGroup.value;

    const director: Director = {
      id: this.director.id,
      Voornaam: a.Voornaam,
      Achternaam: a.Achternaam,
      Geboortejaar: a.Geboortejaar,
      Sterfjaar: a.Sterfjaar,
      imdb_id: a.imdb_id,
      ImageUrl: a.ImageUrl
    };
    // this.moviesService.saveDirector(director).subscribe(
    //   response => this.afterSave(response, director)
    // )
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
      controls[option.name] = new FormControl(this.director[option.name], option.validators);
    });
    this.formGroup = new FormGroup(controls);
  }

  ngOnInit() {
    this.initForm();
  }

}
