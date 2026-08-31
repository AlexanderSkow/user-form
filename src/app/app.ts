import { Component, signal, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { fromEvent, scan, of, map, delay } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from './services/users.service';
import { UserDTO } from './domains/user.dto';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);

  protected userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  protected username = signal<string>('');
  protected users = signal<UserDTO[]>([]);

  constructor() {
    fromEvent(document, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .pipe(scan(count => count + 1, 0))
      .subscribe(count => console.log(`Clicked ${count} time${count !== 1 ? 's' : ''}!`));

    of(1, 2, 3)
      .pipe(takeUntilDestroyed(this.destroyRef),
        map(x => x * 3),
        delay(2000))
        .subscribe(x => console.log('Current Value: ', x));
  }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users.set(users);
    });
  }

  public addUser(newUser: UserDTO) {
    this.userService.addUser(newUser).subscribe(response => {
      const { message, data } = response;

      console.log(message);
      console.log(data);

      this.users.update(users => [...users, data]);
    });
  }

  public noUsers() {
    return this.users().length === 0;
  }

  public updateName() {
    const nancy = {
      firstName: 'Nancy',
      lastName: 'Grace',
      email: 'nancygrace@gmail.com',
    };

    this.userForm.setValue(nancy);
    this.username.set(`${nancy.firstName} ${nancy.lastName}`);
  }

  public resetUserForm() {
    this.userForm.reset();
    this.username.set(``);
  }

  public onUserFormSubmit() {
    const newUser: UserDTO = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
    };
    
    console.log(newUser);
    this.addUser(newUser);
    this.username.set('');
    this.userForm.reset();

    console.log(this.users());
  }

  public dumpUsers() {
    if (this.noUsers()) {
      alert('There currently are no users...');
      return;
    }

    const areDeleted = confirm('Are you sure you want to do this? This will delete all your users.');
    if (areDeleted) this.users.set([]);
  }
}
