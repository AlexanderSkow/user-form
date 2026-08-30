import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected firstNameControl = new FormControl('');
  protected lastNameControl = new FormControl('');
  protected emailControl = new FormControl('');

  protected username = signal('');
}
