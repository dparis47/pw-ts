# How to share the authenticated state of the application

* Creating a new folder .auth and add it to gitignore. This folder will be used to save the information about authenticated state of our application, just as a placeholder where the playwright save the file.

* Create the new file auth.setup.ts that will be responsible for authentication setup.  
Creating a setup block that will be responsible for authentication  
Create a file where authenticated state will be saved .auth/user.json.  
After application is logged, this state is saved
```sh
await page.context().storageState({ path: authFile });
```

* Configure projects section of playwright.config.ts:  
  1- Create a new project that will be responsible for setup
  2- Add inside of the 'use' block the second property which called storage state and the storage state will use the state authenticated state of the application that will be created by this step
  3- Put the dependency on the project 'setup' (means that before running the chromium project, first run 'setup' project as precondition step)
```sh
 projects: [
  {
    name: 'setup',
    testMatch: 'auth.setup.ts',
  }
  {
    name: 'chromium',
    use: {
        browserName: 'chromium',
        storageState: '.auth/user.json',
      },
    dependencies: ['setup'],
  }
  ...
```


